// Read-only check: for each auto-DM reel, list recent comments, whether the keyword matched, and whether a DM went out.
// Usernames are masked because Actions logs can be public.
const CONFIG = require('../autodm/automations.json');
const G = 'https://graph.instagram.com/v26.0', TOK = process.env.IG_TOKEN;
const ig = async p => { const r = await fetch(`${G}/${p}${p.includes('?') ? '&' : '?'}access_token=${TOK}`); const d = await r.json(); if (d.error) throw new Error(d.error.message); return d; };
const mask = u => (u || '?').slice(0, 2) + '***';
const oldKw = (a, t) => (a.keywords || []).some(k => new RegExp('(^|[^a-z0-9])' + k).test(String(t || '').toLowerCase()));
(async () => {
  const me = await ig('me?fields=user_id,username'); console.log('account:', me.username);
  const media = []; let url = 'me/media?fields=id,permalink,timestamp,comments_count&limit=50'; media.push(...(await ig(url)).data);
  const convs = []; try { let c = await ig('me/conversations?platform=instagram&fields=participants,messages.limit(4){message,from,created_time}&limit=100'); convs.push(...(c.data || [])); } catch (e) { console.log('conversations:', e.message); }
  const dmTo = new Map(); for (const c of convs) { const other = (c.participants.data || []).find(p => p.username !== me.username); const ours = ((c.messages || {}).data || []).filter(m => m.from && m.from.username === me.username); if (other) dmTo.set(other.username, ours.map(m => m.created_time)); }
  console.log(`conversations found: ${convs.length}`);
  console.log('\nlatest posts:'); for (const x of media.slice(0, 10)) { const d = await ig(`${x.id}?fields=caption,media_product_type`).catch(() => ({})); console.log(`  ${x.timestamp.slice(0, 16)}  ${x.permalink}  ${x.comments_count} comments  ${d.media_product_type || ''}  "${(d.caption || '').replace(/\s+/g, ' ').slice(0, 50)}"`); }
  for (const a of CONFIG.automations.filter(x => x.reel)) {
    const code = a.reel.replace(/\/+$/, '').split('/').pop(); const m = media.find(x => (x.permalink || '').includes(code));
    console.log(`\n=== ${a.id.toUpperCase()}  ${a.reel}  ${m ? `posted ${m.timestamp}, ${m.comments_count} comments` : 'NOT FOUND in last 50 posts'}`);
    if (!m) continue;
    const cs = await ig(`${m.id}/comments?fields=id,text,username,timestamp,hidden,replies{id,text,username,timestamp}&limit=100`);
    for (const c of cs.data || []) {
      const rows = [[c, ''], ...(((c.replies || {}).data) || []).map(r => [r, '   ↳ reply ']) ];
      for (const [x, pre] of rows) { if (x.username === me.username) continue;
        const dm = dmTo.has(x.username) ? `DM thread: yes (${(dmTo.get(x.username) || []).length} msgs from us)` : 'DM thread: NO';
        const age = ((Date.now() - new Date(x.timestamp)) / 864e5).toFixed(1);
        console.log(`${pre}${x.timestamp.slice(0, 16)} (${age}d) ${mask(x.username)}  "${(x.text || '').slice(0, 60)}"  kw:${oldKw(a, x.text) ? 'yes' : 'no'}  ${dm}${x.hidden ? '  HIDDEN' : ''}`); }
    }
  }
})().catch(e => { console.error('error:', e.message); process.exit(1); });
