// Instant comment-to-DM for @maddiee.makess (Vercel serverless function). No branding, never hides comments.
//
// Instagram calls this URL the moment someone comments or messages:
//   comment containing a keyword  -> public reply under the comment + private-reply DM with a "Send it" button
//   they tap "Send it"/"I followed" -> follow check -> link (or "follow first", up to 3 tries, then link anyway)
//   they DM the keyword itself     -> same flow, starting in the DM
// Stateless: which reel/step someone is on travels inside the button payload, so no database is needed.
//
// Env (Vercel → Settings → Environment Variables):
//   IG_TOKEN      Instagram user token with instagram_business_basic, _manage_comments, _manage_messages
//   APP_SECRET    Instagram app secret (Meta app → Instagram → API setup → App secret), to verify requests
//   VERIFY_TOKEN  any word you choose; type the same word in the Meta webhook setup
//   NODEJS_HELPERS=0  keeps the raw request body so the signature check works
const crypto = require('crypto');
const CONFIG = require('../automations.json');

const GRAPH = 'https://graph.instagram.com/v26.0';
const MAX_TRIES = 3;
const autos = () => (CONFIG.automations || []).filter(a => a.active);
const fill = (t, name) => (t || '').split('{{name}}').join(name || '').replace(/\s+([!?.,])/g, '$1').trim();
const log = (...a) => console.log('[autodm]', ...a);

async function ig(method, path, body) {
  const url = `${GRAPH}/${path}${path.includes('?') ? '&' : '?'}access_token=${encodeURIComponent(process.env.IG_TOKEN)}`;
  const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || data.error) throw new Error(`${method} ${path.split('?')[0]}: ${(data.error && data.error.message) || r.status}`);
  return data;
}

let ME = null;
async function me() { return ME || (ME = await ig('GET', 'me?fields=user_id,username')); }

const mediaCache = {};
// Comments are normalised first so every way of typing the keyword works: Resume, RESUME, résumé, 𝗥𝗘𝗦𝗨𝗠𝗘, "H.R", "h r", "#hr"
const norm = t => String(t || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase();
const esc = k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// keyword must start a word ("hr" matches "HR", "hr!", "hrs" but not "three"); a short comment that is only the keyword with dots/spaces also counts
const hasKw = (a, text) => { const t = norm(text), flat = t.replace(/[^a-z0-9]/g, '');
  return (a.keywords || []).some(k => { k = norm(k); return new RegExp('(^|[^a-z0-9])' + esc(k)).test(t) || flat === k; }); };
async function permalink(mediaId) {
  if (!mediaId) return '';
  if (!(mediaId in mediaCache)) { const m = await ig('GET', `${mediaId}?fields=permalink`).catch(() => ({})); mediaCache[mediaId] = m.permalink || ''; }
  return mediaCache[mediaId];
}
const code = a => (a.reel || '').replace(/\/+$/, '').split('/').pop();
// Which DM a comment gets: 1) its keyword's DM, on any reel ("HR" under the resume reel -> HR prompt)
// 2) else the DM set up for that reel  3) else the default DM (CONFIG.default). Every comment, words or emoji, gets one.
async function pickAuto(mediaId, text) {
  const byKw = autos().find(a => hasKw(a, text));
  if (byKw) return byKw;
  const link = await permalink(mediaId);
  return autos().find(x => link && code(x) && link.includes(code(x))) || autos().find(x => x.id === CONFIG.default) || null;
}
const directText = (a, who) => `${fill(a.direct_text || a.final_text, who)}\n\n👉 ${a.link}\n\n${fill(a.direct_follow || CONFIG.direct_follow || 'Follow @maddiee.makess for new AI reels every day 🚀', who)}`;
const autoById = id => autos().find(a => a.id === id);
const autoByKeyword = text => autos().find(a => hasKw(a, text));

async function send(myId, recipient, message) {
  try {
    return await ig('POST', `${myId}/messages`, { recipient, message });
  } catch (e) {
    if (!/thread owner/i.test(e.message) || !recipient.id) throw e;
    // another app (e.g. Elev8or) owns this chat: take it over, then send again
    await ig('POST', `${myId}/take_thread_control`, { recipient: { id: recipient.id }, metadata: 'autodm' })
      .catch(e2 => log('take_thread_control failed:', e2.message));
    return ig('POST', `${myId}/messages`, { recipient, message });
  }
}
const qr = (title, payload) => [{ content_type: 'text', title: title.slice(0, 20), payload }];


// Keep comments visible: unhide any hidden comment on our recent reels (Instagram / old tools hid them).
let lastSweep = 0;
async function unhideSweep(force) {
  if (!force && Date.now() - lastSweep < 60000) return;
  lastSweep = Date.now();
  let n = 0;
  try {
    const media = await ig('GET', 'me/media?fields=id&limit=6');
    await Promise.all((media.data || []).map(async m => {
      const cs = await ig('GET', `${m.id}/comments?fields=id,text,hidden,username&limit=50`).catch(() => ({ data: [] }));
      await Promise.all((cs.data || []).filter(c => c.hidden).map(c => ig('POST', `${c.id}?hide=false`)
        .then(() => { n++; log(`unhid comment @${c.username}: ${c.text}`); }).catch(e => log('unhide failed:', e.message))));
    }));
  } catch (e) { log('unhide sweep failed:', e.message); }
  return n;
}

async function onComment(v) {
  const { id: myId, username: myName } = await me().then(m => ({ id: String(m.user_id || m.id), username: m.username }));
  const who = (v.from && v.from.username) || '';
  if (!v.id || who.toLowerCase() === (myName || '').toLowerCase()) return;     // never answer our own comments/replies
  const a = await pickAuto(v.media && v.media.id, v.text);
  if (!a) { log(`comment ignored (no DM set up) @${who}: ${v.text}`); return; }
  log(`comment ${a.id} @${who}: ${v.text}`);
  // one private-reply DM with the link in it (no button: buttons don't work while the DM sits in Message Requests)
  return send(myId, { comment_id: v.id }, { text: directText(a, who) })
    .then(() => log(`DM sent (${a.id}) to @${who}`))
    .catch(e => log(`DM FAILED (${a.id}) to @${who}:`, e.message));
}

async function finalMessage(myId, uid, a, name) {
  const text = fill(a.final_text, name);
  try {
    await send(myId, { id: uid }, { attachment: { type: 'template', payload: { template_type: 'button', text: text.slice(0, 640),
      buttons: [{ type: 'web_url', url: a.link, title: (a.link_label || 'Open').slice(0, 20) }] } } });
  } catch (e) {
    log('button template refused, sending link as text:', e.message);
    await send(myId, { id: uid }, { text: `${text}\n\n👉 ${a.link}` });
  }
}


// Which reel was this chat about? Look at our own last messages in the conversation.
async function lastAutoInChat(uid) {
  try {
    const conv = await ig('GET', `me/conversations?platform=instagram&user_id=${uid}&fields=messages.limit(10){message,from}`);
    const msgs = (((conv.data || [])[0] || {}).messages || {}).data || [];
    for (const msg of msgs) {
      const text = (msg.message || '').toLowerCase();
      const tail = x => fill(x, '').toLowerCase().slice(-28);   // the end of each template is unique per reel
      const hit = autos().find(a => [a.opening, a.final_text].some(x => x && text.includes(tail(x))));
      if (hit) return hit;
    }
  } catch (e) { log('chat lookup failed:', e.message); }
  return autos().length === 1 ? autos()[0] : null;
}

async function onMessage(m) {
  if (m.postback && !m.message) m.message = { text: m.postback.title || '', quick_reply: { payload: m.postback.payload } };
  if (!m.message || m.message.is_echo || !m.sender) return;
  const { id: myId } = await me().then(x => ({ id: String(x.user_id || x.id) }));
  const uid = String(m.sender.id);
  if (uid === myId) return;
  const payload = (m.message.quick_reply && m.message.quick_reply.payload) || '';
  let a, tries = 0;
  if (payload) {
    const [kind, id, n] = payload.split('|');
    if (kind !== 'SEND' && kind !== 'FOLLOWED') return;
    a = autoById(id); tries = Number(n) || 0;
  } else {
    const t = (m.message.text || '').toLowerCase();
    a = autoByKeyword(t);                          // they typed the keyword in DMs
    if (!a && /send it|i followed|followed|^yes|^done|^ok/.test(t)) a = await lastAutoInChat(uid);   // tapped an old button / typed yes
  }
  if (!a) { log('message ignored (no matching reel):', m.message.text); return; }
  let follows = true, name = '';
  try {
    const p = await ig('GET', `${uid}?fields=username,is_user_follow_business`);
    name = p.username || ''; follows = a.follow_gate ? !!p.is_user_follow_business : true;
  } catch (e) { log('profile check failed, sending link:', e.message); }
  if (follows || tries >= MAX_TRIES) {
    await finalMessage(myId, uid, a, name);
    log(`link sent (${a.id}) to @${name}`);
  } else {
    await send(myId, { id: uid }, { text: fill(a.follow_text, name), quick_replies: qr(a.follow_button || 'I followed ✅', `FOLLOWED|${a.id}|${tries + 1}`) });
    log(`asked @${name} to follow (try ${tries + 1})`);
  }
}

function validSignature(req, raw) {
  const secret = process.env.APP_SECRET;
  if (!secret) return true;
  const sig = req.headers['x-hub-signature-256'] || '';
  const want = 'sha256=' + crypto.createHmac('sha256', secret).update(raw).digest('hex');
  return sig.length === want.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(want));
}

async function readRaw(req) {        // needs NODEJS_HELPERS=0 on Vercel so the raw body (for the signature) is untouched
  if (typeof req.body === 'string') return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString('utf8');
  if (req.body && typeof req.body === 'object') return JSON.stringify(req.body);
  const chunks = []; for await (const c of req) chunks.push(c); return Buffer.concat(chunks).toString('utf8');
}

const reply = (res, code, text) => { res.statusCode = code; res.setHeader('Content-Type', 'text/plain'); res.end(String(text)); };

module.exports = async (req, res) => {
  if (req === 'helpers') return { pickAuto, directText, ig, me };
  if (req.method === 'GET') {                       // Meta's webhook verification
    const q = Object.fromEntries(new URL(req.url, 'http://x').searchParams);
    if (q.check === '1') {                         // read-only report: which comments the API says are hidden
      const out = [];
      try {
        const media = await ig('GET', 'me/media?fields=id,permalink,comments_count&limit=3');
        for (const m of media.data || []) {
          const cs = await ig('GET', `${m.id}/comments?fields=id,text,hidden,username&limit=50`).catch(e => ({ error: e.message, data: [] }));
          out.push(`${m.permalink}  count=${m.comments_count}  api_returned=${(cs.data || []).length}${cs.error ? '  ERROR ' + cs.error : ''}`);
          (cs.data || []).forEach(c => out.push(`   ${c.hidden ? 'HIDDEN ' : 'visible'}  @${c.username}: ${c.text}`));
        }
      } catch (e) { out.push('error: ' + e.message); }
      return reply(res, 200, out.join('\n'));
    }
    if (q.unhide === '1') { const n = await unhideSweep(true); return reply(res, 200, `unhid ${n || 0} comment(s)`); }
    if (q['hub.mode'] === 'subscribe' && q['hub.verify_token'] === process.env.VERIFY_TOKEN) return reply(res, 200, q['hub.challenge']);
    return reply(res, 200, 'ai.jugaadd autodm is running');
  }
  const raw = await readRaw(req);
  if (!validSignature(req, raw)) { log('bad signature'); return reply(res, 401, 'bad signature'); }
  let body = {}; try { body = JSON.parse(raw || '{}'); } catch (e) { return reply(res, 400, 'bad json'); }
  log('event:', JSON.stringify(body).slice(0, 600));
  const jobs = [];
  for (const entry of body.entry || []) {
    for (const ch of entry.changes || []) if (ch.field === 'comments' && ch.value) { jobs.push(onComment(ch.value)); jobs.push(new Promise(r => setTimeout(r, 2500)).then(() => Promise.race([unhideSweep(), new Promise(r => setTimeout(r, 6000))]))); }
    // 'standby' = another connected app (e.g. Elev8or) owns the chat; we still handle it
    for (const m of [...(entry.messaging || []), ...(entry.standby || [])]) jobs.push(onMessage(m));
  }
  const results = await Promise.allSettled(jobs);
  results.filter(r => r.status === 'rejected').forEach(r => log('error:', r.reason && r.reason.message));
  reply(res, 200, 'ok');
};
