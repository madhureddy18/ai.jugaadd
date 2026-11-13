/* reel 14 v2 "Faceless channels" (comment ANIMATE) — lines (shared by the scene + the voice jobs).
   Rules: open with "Hey Claude" (Maddie first) / "Hey Maddie" (bot first); a little slower speech; phone screen; say "faceless channel".
   gap = pause BEFORE the line (render.js). */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… everyone\'s running a *faceless* channel now. Videos like these get *millions* of views… and people are getting *paid* for them.', "Hey Claude... everyone's running a faceless channel now. Videos like these get millions of views... and people are getting paid for them.", { omni: "[sigh] Hey Claude... everyone's running a faceless channel now. Videos like these get millions of views... and people are getting paid for them.", id: 'h1', gap: 0.3 }),
  LN('maddie', 'But I can\'t *animate*. At all.', "But I can't animate. At all.", { omni: "[dissatisfaction-hnn] But I can't animate... At all.", id: 'h2', gap: 0.5 }),
  LN('claude', 'Hey Maddie… you don\'t need to. Just type… *one* line.', "Hey Maddie... you don't need to. Just type... one line.", { omni: "Hey Maddie... you don't need to. Just type... one line.", id: 'h3', gap: 0.55 }),
  LN('claude', 'Zack D style… *done*.', 'Zack D style... done.', { omni: 'Zack D style... done.', id: 'z1', gap: 5.6 }),
  LN('maddie', 'Wait… that\'s literally *Zack D Films*!', "Wait... that's literally Zack D Films!", { omni: "[surprise-wa] Wait... that's literally Zack D Films!", id: 'z2', gap: 0.5 }),
  LN('claude', 'Space explainer… ready to *post*.', 'Space explainer... ready to post.', { omni: 'Space explainer... ready to post.', id: 'k1', gap: 4.6 }),
  LN('maddie', '*Bro*… that\'s a whole channel right there.', "Bro... that's a whole channel right there.", { omni: "[surprise-oh] Bro... that's a whole channel right there.", id: 'k2', gap: 0.5 }),
  LN('claude', 'Storybook style. No camera… no face… no *editing*.', 'Storybook style. No camera... no face... no editing.', { omni: 'Storybook style. No camera... no face... no editing.', id: 't1', gap: 4.6 }),
  LN('maddie', 'I\'m starting my faceless channel *tonight*.', "I'm starting my faceless channel tonight.", { omni: "[laughter] Haha... I'm starting my faceless channel tonight.", id: 'e1', gap: 0.9 }),
  LN('claude', 'Comment *ANIMATE*… I\'ll send you all *ten* commands.', "Comment ANIMATE... I'll send you all ten commands.", { omni: "Comment... animate. I'll send you all ten commands.", id: 'cta', gap: 0.5 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 0.9 }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
