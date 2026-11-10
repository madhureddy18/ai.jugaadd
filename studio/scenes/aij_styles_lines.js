/* reel 10 "Pick a style" — lines (shared by the scene + the voice jobs). fx = per-style voice effect applied after OmniVoice. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.ST_LINES = [
  LN('maddie', 'Bro, why am I *8-bit*?!', 'Bro, why am I eight-bit?!', { omni: '[surprise-wa] Bro, why am I eight-bit?!', id: 'pix1', gap: 0, fx: 'crush', omniSpeed: 1.08 }),
  LN('claude', 'You said make it *different*.', 'You said make it different.', { id: 'pix2', gap: 0.1, fx: 'crush' }),
  LN('maddie', 'Okay… *Minecraft* me is kinda cool.', 'Okay... Minecraft me is kinda cool.', { id: 'vox1', gap: 0.42 }),
  LN('claude', 'Keep going?', 'Keep going?', { omni: '[question-en] Keep going?', id: 'vox2', gap: 0.08 }),
  LN('maddie', '*Comic* Maddie! POW!', 'Comic Maddie! Pow!', { omni: '[laughter] Comic Maddie! Pow!', id: 'com1', gap: 0.42, omniSpeed: 1.08 }),
  LN('maddie', 'Wait. Am I made of *paper*?!', 'Wait. Am I made of paper?!', { omni: '[surprise-oh] Wait. Am I made of paper?!', id: 'pap1', gap: 0.42 }),
  LN('maddie', "Don't *fold* me!", "Don't fold me!", { id: 'pap2', gap: 0.06, omniSpeed: 1.15 }),
  LN('claude', '*Neon.* Night mode.', 'Neon. Night mode.', { id: 'neo1', gap: 0.42, fx: 'echo', omniSpeed: 0.95 }),
  LN('maddie', 'Ohhh.', 'Ohhh.', { omni: '[surprise-ah] Ohhh.', id: 'neo2', gap: 0.08 }),
  LN('maddie', '*Anime* me! Keep this one!', 'Anime me! Keep this one!', { id: 'toon1', gap: 0.42, omniSpeed: 1.12 }),
  LN('maddie', 'Why am I so *small*?!', 'Why am I so small?!', { omni: '[surprise-wa] Why am I so small?!', id: 'dio1', gap: 0.42, fx: 'tiny', omniSpeed: 1.1 }),
  LN('maddie', 'Okay. Okay. *How?*', 'Okay. Okay. How?', { omni: '[sigh] Okay. Okay. How?', id: 'toy1', gap: 0.42 }),
  LN('claude', 'No camera. No editor.', 'No camera. No editor.', { id: 'rev1', gap: 0.16 }),
  LN('claude', 'Every style you just saw is *code*. Claude wrote it.', 'Every style you just saw is code. Claude wrote it.', { id: 'rev2', gap: 0.1 }),
  LN('maddie', 'Wait. *This reel* too?', 'Wait. This reel too?', { omni: '[surprise-oh] Wait. This reel too?', id: 'rev3', gap: 0.12 }),
  LN('claude', 'Every *frame*.', 'Every frame.', { id: 'rev4', gap: 0.1 }),
  LN('claude', 'And there are *many more* like these.', 'And there are many more like these.', { id: 'cta1', gap: 0.24 }),
  LN('claude', 'Comment *CLAUDE*. I\'ll send them *all* to your DMs.', "Comment CLAUDE. I'll send them all to your DMs.", { id: 'cta2', gap: 0.08 }),
  LN('maddie', 'Pick yours.', 'Pick yours.', { id: 'cta3', gap: 0.14 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 1.05 }));
if (!window.SCENE) window.SCENE = { lines: window.ST_LINES };
