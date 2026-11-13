/* reel 16 "₹15,000 for a gaming chair" (PG room, rainy night; cinematic style) — lines (shared by the scene + the voice jobs).
   Maddie = lovable, a little dumb; Claude = dry genius. No prompts at the end: box breaks, "find me another bakery".
   gap = pause BEFORE the line (render.js). */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… I need *fifteen thousand* rupees by the end of the month.', 'Hey Claude... I need fifteen thousand rupees by the end of the month.', { omni: '[sigh] Hey Claude... I need fifteen thousand rupees... by the end of the month.', id: 'm1', gap: 0.4 }),
  LN('claude', 'For *what*?', 'For what?', { omni: '[question-en] For what?', id: 'c1', gap: 0.4 }),
  LN('maddie', '…A *gaming chair*.', 'A gaming chair.', { omni: '... A gaming chair.', id: 'm2', gap: 0.45 }),
  LN('claude', 'Of *course*.', 'Of course.', { omni: 'Of course.', id: 'c2', gap: 0.4 }),
  LN('claude', 'Open Google Maps. Search *"bakery near me"*.', 'Open Google Maps. Search bakery near me.', { omni: 'Open Google Maps... Search, bakery near me.', id: 'c3', gap: 0.55 }),
  LN('maddie', 'I\'m not *hungry*.', "I'm not hungry.", { omni: "[question-en] I'm not hungry.", id: 'm3', gap: 0.35 }),
  LN('claude', 'Look at the *listings*, Maddie. Not the cakes.', 'Look at the listings, Maddie. Not the cakes.', { omni: 'Look at the listings, Maddie... Not the cakes.', id: 'c4', gap: 0.4 }),
  LN('claude', '*Seven* of these have no website.', 'Seven of these have no website.', { omni: 'Seven of these... have no website.', id: 'c5', gap: 0.6 }),
  LN('maddie', 'So… they\'re *poor*?', "So... they're poor?", { omni: "[question-en] So... they're poor?", id: 'm4', gap: 0.4 }),
  LN('claude', 'They\'re *customers*.', "They're customers.", { omni: "They're customers.", id: 'c6', gap: 0.4 }),
  LN('claude', 'I build each one a site in *ten minutes*. You send them the link.', 'I build each one a site in ten minutes. You send them the link.', { omni: 'I build each one a site in ten minutes... You send them the link.', id: 'c7', gap: 0.5 }),
  LN('maddie', 'For *free*?!', 'For free?!', { omni: '[surprise-wa] For free?!', id: 'm5', gap: 0.3 }),
  LN('claude', 'Free preview. *Five thousand* to keep it.', 'Free preview. Five thousand to keep it.', { omni: 'Free preview... Five thousand to keep it.', id: 'c8', gap: 0.4 }),
  LN('maddie', 'Five thousand… times *three*…', 'Five thousand... times three...', { omni: 'Five thousand... times... three...', id: 'm6', gap: 0.5 }),
  LN('claude', '*Fifteen*.', 'Fifteen.', { omni: 'Fifteen.', id: 'c9', gap: 0.6 }),
  LN('maddie', 'I was *getting there*!', 'I was getting there!', { omni: '[dissatisfaction-hnn] I was getting there!', id: 'm7', gap: 0.25 }),
  LN('claude', 'You were on your *fingers*.', 'You were on your fingers.', { omni: 'You were on your fingers.', id: 'c10', gap: 0.35 }),
  LN('maddie', 'Claude! The bakery *replied*!', 'Claude! The bakery replied!', { omni: '[surprise-oh] Claude! The bakery replied!', id: 'm8', gap: 1.2 }),
  LN('claude', 'Say *five thousand*. And don\'t say "please".', "Say five thousand. And don't say please.", { omni: "Say five thousand... And don't say, please.", id: 'c11', gap: 0.5 }),
  LN('maddie', '…*Please*.', 'Please.', { omni: '... Please.', id: 'm9', gap: 0.6 }),
  LN('claude', '*Maddie*.', 'Maddie.', { omni: 'Maddie.', id: 'c12', gap: 0.45 }),
  LN('maddie', '*Fifteen thousand*! Gaming chair!', 'Fifteen thousand! Gaming chair!', { omni: '[surprise-wa] Fifteen thousand! Gaming chair!', id: 'm10', gap: 2.6, omniSpeed: 1.0 }),
  LN('maddie', 'Claude… this chair is *amazing*.', 'Claude... this chair is amazing.', { omni: 'Claude... this chair is amazing.', id: 'm11', gap: 2.2 }),
  LN('claude', 'It\'s still in the *box*.', "It's still in the box.", { omni: "It's still in the box.", id: 'c13', gap: 0.45 }),
  LN('maddie', 'I\'m sitting on the *box*.', "I'm sitting on the box.", { omni: "I'm sitting on the box.", id: 'm12', gap: 0.4 }),
  LN('claude', 'That\'ll be *five thousand* more.', "That'll be five thousand more.", { omni: "That'll be five thousand more.", id: 'c14', gap: 1.5 }),
  LN('maddie', '…Find me another *bakery*.', 'Find me another bakery.', { omni: '[sigh] ... Find me another bakery.', id: 'm13', gap: 0.5 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 0.9 }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
