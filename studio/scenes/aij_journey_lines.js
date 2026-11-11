/* reel 11 v2 "How we actually make these" — lines (shared by the scene + the voice jobs). voice = override cast voice for a line.
   v2: Maddie opens with "Hey Claude…", slower (speed ~1.0, longer beats), emotion written into the words + tags. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… everyone keeps asking me how we make these *reels*.', 'Hey Claude... everyone keeps asking me how we make these reels.', { omni: 'Hey Claude... everyone keeps asking me, how do we make these reels?', id: 'hook1', gap: 0.5 }),
  LN('claude', 'Hmm… should we tell them the *truth*?', 'Hmm... should we tell them the truth?', { omni: '[question-en] Hmm... should we tell them... the truth?', id: 'hook2', gap: 0.5 }),
  LN('maddie', 'Ehh… tell them the *nice* version.', 'Ehh... tell them the nice version.', { omni: '[dissatisfaction-hnn] Ehh... tell them the nice version.', id: 'hook3', gap: 0.8 }),
  LN('maddie', 'Okay! Step one. I write the *script*.', 'Okay! Step one. I write the script.', { id: 's1a', gap: 0.35 }),
  LN('claude', 'He types… one word. *Build.*', 'He types... one word. Build.', { omni: 'He types... one word... Build.', id: 's1b', gap: 0.45 }),
  LN('maddie', "Hehe! It's a very *powerful* word!", "Hehe! It's a very powerful word!", { omni: "[laughter] Hehe! It's a very powerful word!", id: 's1c', gap: 0.8 }),
  LN('maddie', 'Step two! Claude built me in *3D*!', 'Step two! Claude built me in 3D!', { omni: 'Step two! Claude built me in three D!', id: 's2a', gap: 0.4 }),
  LN('claude', 'Version one… had *no arms*.', 'Version one... had no arms.', { omni: 'Version one... had no arms.', id: 's2b', gap: 0.5 }),
  LN('maddie', 'Ugh… I looked like a *potato*.', 'Ugh... I looked like a potato.', { omni: '[sigh] Ugh... I looked like a potato.', id: 's2c', gap: 0.8 }),
  LN('claude', 'Good evening… *human*.', 'Good evening... human.', { omni: 'Good evening... human.', id: 's3a', gap: 0.45, voice: 'claude_C', omniSpeed: 0.9 }),
  LN('maddie', 'Wait— why do I sound *five*?!', 'Wait! Why do I sound five?!', { omni: '[surprise-wa] Wait! Why do I sound five?!', id: 's3b', gap: 0.5, voice: 'maddie_D' }),
  LN('claude', "Fixed it. You're *welcome*.", "Fixed it. You're welcome.", { id: 's3c', gap: 0.8 }),
  LN('maddie', "Step four! Styles! Pixel! Neon! Anime! *Stop, I'm dizzy!*", "Step four! Styles! Pixel! Neon! Anime! Stop, I'm dizzy!", { omni: "Step four! Styles! Pixel! Neon! Anime! Stop... I'm dizzy!", id: 's4a', gap: 0.8 }),
  LN('maddie', 'Step five. *Render*. How long?', 'Step five. Render. How long?', { omni: '[question-en] Step five. Render. How long?', id: 's5a', gap: 0.4 }),
  LN('claude', 'One and a half… *hours*.', 'One and a half... hours.', { omni: 'One and a half... hours.', id: 's5b', gap: 0.4 }),
  LN('maddie', 'What?! For a *thirty-second* video?!', 'What?! For a thirty-second video?!', { omni: '[surprise-oh] What?! For a thirty-second video?!', id: 's5c', gap: 0.45 }),
  LN('claude', 'You wanted lips… that *move*.', 'You wanted lips... that move.', { omni: 'You wanted lips... that move.', id: 's5d', gap: 0.8 }),
  LN('maddie', 'Step six. Post it… *sixty-nine* views.', 'Step six. Post it... sixty-nine views.', { omni: '[sigh] Step six. Post it... sixty-nine views.', id: 's6a', gap: 0.5 }),
  LN('claude', 'Next one? Thirteen… *thousand.*', 'Next one? Thirteen... thousand.', { omni: 'Next one? Thirteen... thousand.', id: 's6b', gap: 0.45 }),
  LN('maddie', "What?! We're *famous*!", "What?! We're famous!", { omni: "[surprise-wa] What?! We're famous!", id: 's6c', gap: 0.8 }),
  LN('claude', 'Want every step, start to end? Comment *DOC*.', 'Want every step, start to end? Comment DOC.', { omni: 'Want every step, start to end? Comment... dock.', id: 'cta1', gap: 0.45 }),
  LN('maddie', 'Even… the *potato* version?', 'Even... the potato version?', { omni: '[question-en] Even... the potato version?', id: 'cta2', gap: 0.4 }),
  LN('claude', '*Especially* the potato version.', 'Especially the potato version.', { omni: 'Especially... the potato version.', id: 'cta3', gap: 0.2 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 1.0 }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
