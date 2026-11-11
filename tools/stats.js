// Read-only: account followers + per-reel likes/comments/insights + comment texts (usernames masked; Actions logs can be public).
const G = 'https://graph.instagram.com/v26.0', TOK = process.env.IG_TOKEN;
const ig = async p => { const r = await fetch(`${G}/${p}${p.includes('?') ? '&' : '?'}access_token=${TOK}`); const d = await r.json(); if (d.error) throw new Error(d.error.message); return d; };
(async () => {
  const me = await ig('me?fields=username,followers_count,media_count'); console.log(`account: ${me.username}  followers ${me.followers_count}  posts ${me.media_count}`);
  const ai = await ig('me/insights?metric=follows_and_unfollows&period=day&metric_type=total_value&breakdown=follow_type').catch(e => ({ e: e.message })); console.log('follows (last day):', JSON.stringify(ai.data || ai.e));
  const media = (await ig('me/media?fields=id,permalink,timestamp,like_count,comments_count,caption&limit=8')).data;
  for (const m of media) {
    const ins = await ig(`${m.id}/insights?metric=views,reach,likes,comments,shares,saved,total_interactions,ig_reels_avg_watch_time`).catch(e => ({ e: e.message }));
    const v = ins.data ? Object.fromEntries(ins.data.map(x => [x.name, x.values[0].value])) : ins.e;
    console.log(`\n=== ${m.timestamp.slice(0, 16)} ${m.permalink}\n  ${(m.caption || '').split('\n')[0].slice(0, 70)}\n  likes ${m.like_count} comments ${m.comments_count} | ${JSON.stringify(v)}`);
  }
  const top = media.find(m => m.timestamp.startsWith('2026-11-10T07')) || media[1];
  const cs = (await ig(`${top.id}/comments?fields=text,timestamp,like_count&limit=100`)).data || [];
  console.log(`\n--- comments on ${top.permalink} (${cs.length} shown)`); for (const c of cs) console.log(`  ${c.timestamp.slice(5, 16)} [${c.like_count}] ${(c.text || '').replace(/\n/g, ' ').slice(0, 90)}`);
})().catch(e => { console.error('error:', e.message); process.exit(1); });
