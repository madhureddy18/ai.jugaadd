/* reel 10 v2 "Hey Claude, how many?" — lines (shared by the scene + the voice jobs). fx = per-style voice effect applied after OmniVoice. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.ST_LINES = [
  LN('maddie', 'Hey Claude… how many *animation styles* can you do?', 'Hey Claude... how many animation styles can you do?', { omni: '[question-en] Hey Claude... how many animation styles can you do?', id: 'hook1', gap: 0.25 }),
  LN('claude', 'Count with me.', 'Count with me.', { id: 'hook2', gap: 0.1 }),
  LN('maddie', 'ONE! I\'m *8-bit*!', "One! I'm eight-bit!", { omni: "[surprise-wa] One! I'm eight-bit!", id: 'pix1', gap: 0.35, fx: 'crush', omniSpeed: 1.08 }),
  LN('maddie', 'Two… *Minecraft* me!', 'Two... Minecraft me!', { id: 'vox1', gap: 0.42 }),
  LN('maddie', 'THREE! *POW!*', 'Three! Pow!', { omni: '[laughter] Three! Pow!', id: 'com1', gap: 0.42, omniSpeed: 1.08 }),
  LN('maddie', 'Four — wait, I\'m *paper*?!', "Four. Wait, I'm paper?!", { omni: "[surprise-oh] Four. Wait, I'm paper?!", id: 'pap1', gap: 0.42 }),
  LN('maddie', "Don't *fold* me!", "Don't fold me!", { id: 'pap2', gap: 0.06, omniSpeed: 1.15 }),
  LN('claude', 'Five. *Neon.*', 'Five. Neon.', { id: 'neo1', gap: 0.42, fx: 'echo', omniSpeed: 0.95 }),
  LN('maddie', 'Ohhh.', 'Ohhh.', { omni: '[surprise-ah] Ohhh.', id: 'neo2', gap: 0.08 }),
  LN('maddie', 'SIX! *Anime* me! Keep this one!', 'Six! Anime me! Keep this one!', { id: 'toon1', gap: 0.42, omniSpeed: 1.12 }),
  LN('maddie', 'Seven… Claude, why am I so *small*?!', 'Seven... Claude, why am I so small?!', { omni: '[surprise-wa] Seven... Claude, why am I so small?!', id: 'dio1', gap: 0.42, fx: 'tiny', omniSpeed: 1.1 }),
  LN('maddie', 'Okay Claude… how many can you *actually* do?', 'Okay Claude... how many can you actually do?', { omni: '[sigh] Okay Claude... how many can you actually do?', id: 'toy1', gap: 0.42 }),
  LN('claude', 'Honestly? I *lost count*.', 'Honestly? I lost count.', { id: 'toy2', gap: 0.12 }),
  LN('claude', 'Every style you saw is *code*. I wrote it.', 'Every style you saw is code. I wrote it.', { id: 'rev2', gap: 0.3 }),
  LN('maddie', '*This reel* too?!', 'This reel too?!', { omni: '[surprise-oh] This reel too?!', id: 'rev3', gap: 0.12 }),
  LN('claude', 'Every *frame*.', 'Every frame.', { id: 'rev4', gap: 0.1 }),
  LN('claude', 'Comment *CLAUDE*. I\'ll send you *all* of them.', "Comment CLAUDE. I'll send you all of them.", { id: 'cta2', gap: 0.3 }),
  LN('maddie', 'Pick yours.', 'Pick yours.', { id: 'cta3', gap: 0.14 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 1.05 }));
if (!window.SCENE) window.SCENE = { lines: window.ST_LINES };
