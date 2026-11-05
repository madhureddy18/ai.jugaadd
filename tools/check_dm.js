// Read-only check: every comment on the latest reels, and whether that person has a DM thread with us.
// Usernames are masked because Actions logs can be public.
const G = 'https://graph.instagram.com/v26.0', TOK = process.env.IG_TOKEN;
const ig = async p => { const r = await fetch(`${G}/${p}${p.includes('?') ? '&' : '?'}access_token=${TOK}`); const d = await r.json(); if (d.error) throw new Error(d.error.message); return d; };
const mask = u => (u || '?').slice(0, 3) + '***';
(async () => {
  const me = await ig('me?fields=user_id,username'); console.log('account:', me.username);
  const media = (await ig('me/media?fields=id,permalink,timestamp,comments_count&limit=8')).data;
  const convs = []; let next = 'me/conversations?platform=instagram&fields=participants,updated_time,messages.limit(6){message,from,created_time}&limit=50';
  for (let i = 0; i < 6 && next; i++) { const c = await ig(next).catch(e => { console.log('conversations:', e.message); return {}; }); convs.push(...(c.data || [])); next = c.paging && c.paging.next ? c.paging.next.replace(G + '/', '').replace(/[&?]access_token=[^&]+/, '') : null; }
  const byId = new Map(), byName = new Map();
  for (const c of convs) for (const p of (c.participants || {}).data || []) if (p.username !== me.username) { const ours = ((c.messages || {}).data || []).filter(m => m.from && m.from.username === me.username); byId.set(String(p.id), ours); byName.set(p.username, ours); }
  console.log(`conversations: ${convs.length}`);
  let total = 0, withDm = 0;
  for (const m of media) {
    console.log(`\n=== ${m.permalink}  ${m.timestamp.slice(0, 16)}  ${m.comments_count} comments`);
    const cs = await ig(`${m.id}/comments?fields=id,text,timestamp,hidden,from{id,username},replies{id,text,timestamp,from{id,username}}&limit=100`).catch(e => ({ error: e.message }));
    if (cs.error) { console.log('  comments error:', cs.error); continue; }
    for (const c of cs.data || []) for (const [x, pre] of [[c, ''], ...(((c.replies || {}).data) || []).map(r => [r, '  ↳ '])]) {
      const f = x.from || {}; if (f.username === me.username) continue; total++;
      const ours = byId.get(String(f.id)) || byName.get(f.username); if (ours) withDm++;
      console.log(`${pre}${x.timestamp.slice(5, 16)} ${mask(f.username)} "${(x.text || '').slice(0, 40)}"  -> ${ours ? `DM yes, our last: "${((ours[0] || {}).message || '').slice(0, 45)}"` : 'NO DM thread'}${x.hidden ? ' HIDDEN' : ''}`);
    }
  }
  console.log(`\nsummary: ${total} comments from others, ${withDm} have a DM thread with us`);
})().catch(e => { console.error('error:', e.message); process.exit(1); });
