/* reel 29 "My Instagram runs itself" — true story of this page's system: scheduled auto-posting, comment → DM bot, cloned voices, 3D video written
   in code and rendered frame by frame. Punchline: no team — "It's just Claude." Any comment → DM guide (p/autopilot/). Real 3D scenes. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… my reel just went *live*. But I was *sleeping*.', 'Hey Claude... my reel just went live. But I was sleeping.', { id: 'hook', gap: 0 }),
  LN('claude', 'I posted it. *Seven thirty.* Right on time.', 'I posted it. Seven thirty. Right on time.', { id: 'posted', gap: 0.25 }),
  LN('maddie', 'Wait… who\'s replying to all these *comments*?', "Wait... who's replying to all these comments?", { id: 'who', gap: 0.25 }),
  LN('claude', 'Me. Every comment gets a *DM* in seconds. Even at *3 AM*.', 'Me. Every comment gets a DM in seconds. Even at three A M.', { id: 'dm', gap: 0.2 }),
  LN('maddie', 'And the voices? The 3D? The *whole video*?', 'And the voices? The 3D? The whole video?', { id: 'video', gap: 0.25 }),
  LN('claude', 'I write *code* that builds every scene. Then I render it, frame by frame.', 'I write code that builds every scene. Then I render it, frame by frame.', { id: 'code', gap: 0.2 }),
  LN('maddie', 'So my Instagram… *runs itself*?', 'So my Instagram... runs itself?', { id: 'runs', gap: 0.25 }),
  LN('claude', 'Posting. Replies. DMs. Voices. Video. *All automatic.*', 'Posting. Replies. D Ms. Voices. Video. All automatic.', { id: 'all', gap: 0.2 }),
  LN('maddie', 'Who\'s doing all this? A *big team*?', "Who's doing all this? A big team?", { id: 'team', gap: 0.25 }),
  LN('claude', 'No team. It\'s just *Claude*. Me.', "No team. It's just Claude. Me.", { id: 'just', gap: 0.25 }),
  LN('maddie', 'Okay… that\'s actually *scary*.', "Okay... that's actually scary.", { id: 'scary', gap: 0.3 }),
  LN('claude', 'Comment *anything*. I\'ll send you how we built it.', "Comment anything. I'll send you how we built it.", { id: 'cta', gap: 0.25 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || (l.who === 'claude' ? 0.98 : 0.94) }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
