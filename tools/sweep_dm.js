// Backup for the instant webhook: every 10 minutes, DM anyone who commented on a recent reel in the last 7 days
// and doesn't have a DM thread with us yet (Instagram sometimes doesn't notify the webhook). Same DM text as the webhook.
// DRY=1 only prints what it would send. Usernames are masked in the log.
process.env.IG_TOKEN = process.env.IG_TOKEN || '';
const mask = u => (u || '?').slice(0, 3) + '***';
(async () => {
  const H = await require('../autodm/api/webhook.js')('helpers');   // the webhook's own logic, so both pick the same DM
  const meU = await H.me(); const myName = meU.username, myId = String(meU.user_id || meU.id);
  const media = (await H.ig('GET', 'me/media?fields=id,permalink,timestamp&limit=10')).data || [];
  const known = new Set(); let next = 'me/conversations?platform=instagram&fields=participants&limit=50';
  for (let i = 0; i < 10 && next; i++) { const c = await H.ig('GET', next); (c.data || []).forEach(cv => ((cv.participants || {}).data || []).forEach(p => { if (p.username !== myName) { known.add(String(p.id)); known.add(p.username); } }));
    next = c.paging && c.paging.next ? c.paging.next.replace(/^https:\/\/graph\.instagram\.com\/v[\d.]+\//, '').replace(/[&?]access_token=[^&]+/, '') : null; }
  let sent = 0, checked = 0; const now = Date.now();
  for (const m of media) {
    const cs = await H.ig('GET', `${m.id}/comments?fields=id,text,timestamp,from{id,username},replies{id,text,timestamp,from{id,username}}&limit=100`).catch(() => ({ data: [] }));
    for (const c of cs.data || []) for (const x of [c, ...(((c.replies || {}).data) || [])]) {
      const f = x.from || {}, age = now - new Date(x.timestamp);
      if (!f.id || f.username === myName || age > 6.9 * 864e5 || age < 4 * 60e3) continue;     // ours / too old for a private reply / let the webhook go first
      checked++; if (known.has(String(f.id)) || known.has(f.username)) continue;
      const a = await H.pickAuto(m.id, x.text); if (!a) continue;
      if (process.env.DRY) { console.log(`would DM (${a.id}) ${mask(f.username)} for "${(x.text || '').slice(0, 30)}"`); continue; }
      await H.ig('POST', `${myId}/messages`, { recipient: { comment_id: x.id }, message: { text: H.directText(a, f.username) } })
        .then(() => { sent++; known.add(String(f.id)); console.log(`DM sent (${a.id}) to ${mask(f.username)} for "${(x.text || '').slice(0, 30)}"`); })
        .catch(e => console.log(`DM failed (${a.id}) ${mask(f.username)}: ${e.message}`));
    }
  }
  console.log(`checked ${checked} recent comments, sent ${sent} missed DM(s)`);
})().catch(e => { console.error('error:', e.message); process.exit(1); });
