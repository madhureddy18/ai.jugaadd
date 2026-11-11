// Read-only: which DM would each kind of comment get on each recent reel?
const h = require('../autodm/api/webhook.js')('helpers');
(async () => {
  const { pickAuto, ig } = await h;
  const media = (await ig('GET', 'me/media?fields=id,permalink,caption&limit=8')).data;
  for (const m of media) {
    const r = [];
    for (const t of ['claude', 'prompt', 'doc', '🔥', 'nice']) { const a = await pickAuto(m.id, t); r.push(`${t}->${a ? a.id : 'none'}`); }
    console.log(m.permalink, (m.caption || '').split('\n')[0].slice(0, 40), '|', r.join('  '));
  }
})().catch(e => { console.error('error:', e.message); process.exit(1); });
