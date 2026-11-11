/* reel 11 "How we actually make these" — lines (shared by the scene + the voice jobs). voice = override cast voice for a line. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', "Everyone's asking how we make these *reels*.", "Everyone's asking how we make these reels!", { id: 'hook1', gap: 0.2 }),
  LN('claude', 'Should we tell them the *truth*?', 'Should we tell them the truth?', { omni: '[question-en] Should we tell them... the truth?', id: 'hook2', gap: 0.15 }),
  LN('maddie', '…Tell them the *nice* version.', 'Tell them the nice version.', { omni: '[dissatisfaction-hnn] Tell them the nice version.', id: 'hook3', gap: 0.45 }),
  LN('maddie', 'Step one. I write the *script*.', 'Step one. I write the script.', { id: 's1a', gap: 0.15, omniSpeed: 1.08 }),
  LN('claude', 'He types one word. *Build.*', 'He types one word. Build.', { omni: 'He types one word... Build.', id: 's1b', gap: 0.12 }),
  LN('maddie', "It's a very *powerful* word.", "It's a very powerful word.", { omni: "[laughter] It's a very powerful word.", id: 's1c', gap: 0.45 }),
  LN('maddie', 'Step two. Claude built me in *3D*.', 'Step two. Claude built me in 3D.', { omni: 'Step two. Claude built me in three D!', id: 's2a', gap: 0.15, omniSpeed: 1.08 }),
  LN('claude', 'Version one had *no arms*.', 'Version one had no arms.', { omni: 'Version one... had no arms.', id: 's2b', gap: 0.12 }),
  LN('maddie', 'I looked like a *potato*.', 'I looked like a potato.', { omni: '[sigh] I looked like a potato.', id: 's2c', gap: 0.45 }),
  LN('claude', 'Good evening, *human*.', 'Good evening, human.', { id: 's3a', gap: 0.12, voice: 'claude_C', omniSpeed: 0.95 }),
  LN('maddie', 'Why do I sound *five*?!', 'Why do I sound five?!', { omni: '[surprise-wa] Why do I sound five?!', id: 's3b', gap: 0.15, voice: 'maddie_D', omniSpeed: 1.1 }),
  LN('claude', "Fixed it. You're *welcome*.", "Fixed it. You're welcome.", { id: 's3c', gap: 0.45 }),
  LN('maddie', "Step four. Styles. Pixel— neon— anime— *stop, I'm dizzy!*", "Step four. Styles. Pixel, neon, anime, stop, I'm dizzy!", { omni: "Step four. Styles. Pixel! Neon! Anime! Stop, I'm dizzy!", id: 's4a', gap: 0.45, omniSpeed: 1.12 }),
  LN('maddie', 'Step five. *Render*. How long?', 'Step five. Render. How long?', { omni: '[question-en] Step five. Render. How long?', id: 's5a', gap: 0.12 }),
  LN('claude', 'One and a half *hours*.', 'One and a half hours.', { id: 's5b', gap: 0.12 }),
  LN('maddie', 'For a *thirty-second* video?!', 'For a thirty-second video?!', { omni: '[surprise-oh] For a thirty-second video?!', id: 's5c', gap: 0.12 }),
  LN('claude', 'You wanted lips that *move*.', 'You wanted lips that move.', { id: 's5d', gap: 0.45 }),
  LN('maddie', 'Step six. Post it. *Sixty-nine* views.', 'Step six. Post it. Sixty-nine views.', { omni: '[sigh] Step six. Post it... Sixty-nine views.', id: 's6a', gap: 0.15 }),
  LN('claude', 'Next one? *Thirteen thousand.*', 'Next one? Thirteen thousand.', { omni: 'Next one? Thirteen thousand.', id: 's6b', gap: 0.12 }),
  LN('maddie', "We're *famous*!", "We're famous!", { omni: "[surprise-wa] We're famous!", id: 's6c', gap: 0.45 }),
  LN('claude', 'Want every step, start to end? Comment *DOC*.', 'Want every step, start to end? Comment DOC.', { id: 'cta1', gap: 0.15 }),
  LN('maddie', 'Even the *potato* version?', 'Even the potato version?', { omni: '[question-en] Even the potato version?', id: 'cta2', gap: 0.12 }),
  LN('claude', '*Especially* the potato version.', 'Especially the potato version.', { omni: 'Especially... the potato version.', id: 'cta3', gap: 0.1 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 1.05 }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
