/* reel 12 "13 free Claude skills for Instagram" (comment SKILLS) — lines (shared by the scene + the voice jobs).
   Emotion lives in the words + tags; slow, natural pacing (speed 1.0, real pauses). */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Claude… I post every single day. Two hundred *views*.', 'Claude... I post every single day. Two hundred views.', { omni: '[sigh] Claude... I post every single day... and two hundred views.', id: 'h1', gap: 0.45 }),
  LN('maddie', 'What am I doing *wrong*?', 'What am I doing wrong?', { omni: '[dissatisfaction-hnn] What am I doing wrong?', id: 'h2', gap: 0.5 }),
  LN('claude', "You're doing it all *alone*.", "You're doing it all alone.", { omni: "You're doing it... all alone.", id: 'c1', gap: 0.4 }),
  LN('claude', 'Install this. Thirteen *free* Instagram skills.', 'Install this. Thirteen free Instagram skills.', { omni: 'Install this. Thirteen free... Instagram skills.', id: 'c2', gap: 0.45 }),
  LN('maddie', 'Thirteen?! Okay… *show me*.', 'Thirteen?! Okay... show me.', { omni: '[surprise-wa] Thirteen?! Okay... show me.', id: 'm1', gap: 0.5 }),
  LN('claude', 'Slash viral. Finds reels in your niche doing *three times* normal.', 'Slash viral. Finds reels in your niche doing three times normal.', { omni: 'Slash viral. It finds reels in your niche... doing three times normal.', id: 'k1', gap: 0.4 }),
  LN('claude', 'Slash reel. Writes the script… with the *hook*.', 'Slash reel. Writes the script... with the hook.', { omni: 'Slash reel. It writes the script... with the hook.', id: 'k2', gap: 0.35 }),
  LN('maddie', 'Wait… it writes my *hooks*?!', 'Wait... it writes my hooks?!', { omni: '[surprise-oh] Wait... it writes my hooks?!', id: 'm2', gap: 0.45 }),
  LN('claude', 'Slash human. Deletes the *AI words*.', 'Slash human. Deletes the AI words.', { omni: 'Slash human. It deletes the A I words.', id: 'k3', gap: 0.3 }),
  LN('maddie', 'Bye bye, *delve*!', 'Bye bye, delve!', { omni: '[laughter] Hehe! Bye bye, delve!', id: 'm3', gap: 0.45 }),
  LN('claude', 'Slash plan. Your whole *week*, planned.', 'Slash plan. Your whole week, planned.', { omni: 'Slash plan. Your whole week... planned.', id: 'k4', gap: 0.35 }),
  LN('claude', 'And slash DM… writes your *DMs*.', 'And slash DM... writes your DMs.', { omni: 'And slash D M... writes your D Ms.', id: 'k5', gap: 0.5 }),
  LN('maddie', 'Okay… how much does it *cost*?', 'Okay... how much does it cost?', { omni: '[question-en] Okay... how much does it cost?', id: 'm4', gap: 0.4 }),
  LN('claude', 'The skills? *Free.* No API key. No login.', 'The skills? Free. No API key. No login.', { omni: 'The skills? Free. No A P I key... no login.', id: 'c3', gap: 0.4 }),
  LN('maddie', 'No way! Send me the *link*!', 'No way! Send me the link!', { omni: '[surprise-wa] No way! Send me the link!', id: 'm5', gap: 0.5 }),
  LN('claude', "Comment *SKILLS*. I'll send the link and the setup.", "Comment SKILLS. I'll send the link and the setup.", { omni: "Comment... skills. I'll send the link, and the setup.", id: 'cta1', gap: 0.4 }),
  LN('maddie', 'Two hundred views… you are *done*.', 'Two hundred views... you are done.', { omni: '[laughter] Two hundred views... you are done.', id: 'cta2', gap: 0.2 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 1.0 }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
