/* reel 20 "37 people asked which app this is" — FIXED TEMPLATE (reel 6 look). Product-first teaser for Wrapped (free money summary site, Dec 1):
   monthly + yearly expenses, small spends, name a shop once, savings plan, never leaves your phone. Comment WRAPPED -> waitlist DM. No burst rays. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… I posted my *money summary* on my story…', 'Hey Claude... I posted my money summary on my story...', { id: 'hook', gap: 0 }),
  LN('maddie', 'and *37 people* asked "which app is this?"', 'and thirty-seven people asked, which app is this?', { id: 'h2', gap: 0.1 }),
  LN('claude', 'Tell them it\'s *ours*.', "Tell them it's ours.", { id: 'ours', gap: 0.3 }),
  LN('maddie', 'Ours?!', 'Ours?!', { id: 'ours2', gap: 0.2 }),
  LN('claude', '*Wrapped.* We built it.', 'Wrapped. We built it.', { id: 'name', gap: 0.2 }),
  LN('claude', 'Upload your *bank statement*…', 'Upload your bank statement...', { id: 'up', gap: 0.35 }),
  LN('claude', '…see *every month*, and your *whole year*.', '...see every month, and your whole year.', { id: 'months', gap: 0.1 }),
  LN('claude', 'All your ₹20 and ₹50 payments? *₹14,800* a year.', 'All your twenty and fifty rupee payments? Fourteen thousand eight hundred a year.', { id: 'small', gap: 0.3 }),
  LN('maddie', 'My *tiffin* money?!', 'My tiffin money?!', { id: 'tiffin', gap: 0.2 }),
  LN('claude', 'Name a shop *once*… it remembers.', 'Name a shop once... it remembers.', { id: 'label', gap: 0.25 }),
  LN('claude', 'Then it shows how to save *₹37,000* a year.', 'Then it shows how to save thirty-seven thousand rupees a year.', { id: 'save', gap: 0.3 }),
  LN('claude', 'And it *never leaves your phone*.', 'And it never leaves your phone.', { id: 'safe', gap: 0.25 }),
  LN('maddie', 'Okay… how much?', 'Okay... how much?', { id: 'much', gap: 0.3 }),
  LN('claude', '*Zero.* Free. *December 1st.*', 'Zero. Free. December first.', { id: 'free', gap: 0.2 }),
  LN('maddie', 'Comment *WRAPPED*. We\'ll send it to you first.', "Comment wrapped. We'll send it to you first.", { id: 'cta', gap: 0.3 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || (l.who === 'claude' ? 1.02 : 1.0) }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
