/* reel 14 "Type one line, get a Zack D-style video" (comment ANIMATE) — lines (shared by the scene + the voice jobs).
   3 commands shown (/zack-d-films, /kurzgesagt, /ted-ed); the DM page has 10. Emotion in the words + tags. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'I want to start a facts page… but I can\'t *animate*. At all.', "I want to start a facts page... but I can't animate. At all.", { omni: "[sigh] I want to start a facts page... but I can't animate. At all.", id: 'h1', gap: 0.3 }),
  LN('claude', 'You don\'t need to. Just type… *one* line.', "You don't need to. Just type... one line.", { omni: "You don't need to... Just type... one line.", id: 'h2', gap: 0.45 }),
  LN('claude', 'Zack D style. *Done*.', 'Zack D style. Done.', { omni: 'Zack D style... Done.', id: 'z1', gap: 5.2 }),
  LN('maddie', 'Wait… that\'s literally *Zack D Films*!', "Wait... that's literally Zack D Films!", { omni: "[surprise-wa] Wait... that's literally Zack D Films!", id: 'z2', gap: 0.35 }),
  LN('claude', 'Kurzgesagt style. 1.3 million Earths… fit inside the *Sun*.', 'Kurzgesagt style. One point three million Earths... fit inside the Sun.', { omni: 'Kurzgesagt style. One point three million Earths... fit inside the Sun.', id: 'k1', gap: 3.4 }),
  LN('maddie', '*Bro*!', 'Bro!', { omni: '[surprise-oh] Bro!', id: 'k2', gap: 0.3 }),
  LN('claude', 'TED-Ed style. Everest fits… with 2 km to *spare*.', 'TED-Ed style. Everest fits... with two kilometres to spare.', { omni: 'Ted Ed style. Everest fits... with two kilometres to spare.', id: 't1', gap: 3.4 }),
  LN('maddie', 'I\'m starting that page *tonight*.', "I'm starting that page tonight.", { omni: "[laughter] Haha... I'm starting that page tonight.", id: 'e1', gap: 1.2 }),
  LN('claude', 'Comment *ANIMATE*. I\'ll send you *ten* commands like these.', "Comment ANIMATE. I'll send you ten commands like these.", { omni: "Comment... animate. I'll send you ten commands like these.", id: 'cta', gap: 0.4 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 1.0 }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
