/* reel 22 "Nothing is saved" — PaisaMap promo, NEW SET: Maddie's bedroom at month-end, night. Real stats from Maddyy's own PhonePe statement
   (Jun–Nov 2026: ₹1,36,607 · Jul ₹50,328 👑 · 89% money to people · "The Generous One"). Payee names never shown. Comment PAISA -> paisamap.online. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… where did my *whole salary* go?', 'Hey Claude... where did my whole salary go?', { id: 'hook', gap: 0 }),
  LN('claude', 'Let\'s find out. Open *PaisaMap*.', "Let's find out. Open PaisaMap.", { id: 'open', gap: 0.30 }),
  LN('maddie', 'It wants my bank statement… what if they *save* it?', '[dissatisfaction-hnn] It wants my bank statement... what if they save it?', { id: 'save', gap: 0.25 }),
  LN('claude', '*Nothing* is saved. *Anywhere.*', 'Nothing is saved. Anywhere.', { id: 'nothing', gap: 0.25 }),
  LN('maddie', '…Seriously?', '[question-en] Seriously?', { id: 'serious', gap: 0.20 }),
  LN('claude', 'Your statement *never leaves* your phone.', 'Your statement never leaves your phone.', { id: 'never', gap: 0.25 }),
  LN('claude', 'No upload. No login. No account.', 'No upload. No login. No account.', { id: 'noup', gap: 0.10 }),
  LN('claude', 'Your phone reads the file *itself*.', 'Your phone reads the file itself.', { id: 'reads', gap: 0.10 }),
  LN('maddie', 'And when I close it?', 'And when I close it?', { id: 'close', gap: 0.25 }),
  LN('claude', '*Gone.* Like it never happened.', 'Gone. Like it never happened.', { id: 'gone', gap: 0.20 }),
  LN('maddie', 'Okay… WAIT. *₹1.36 lakh* in six months?!', '[surprise-wa] Okay... wait. One lakh thirty-six thousand in six months?!', { id: 'lakh', gap: 0.35 }),
  LN('claude', 'Every month. Every payment. Every small chai.', 'Every month. Every payment. Every small chai.', { id: 'every', gap: 0.25 }),
  LN('claude', '*July* was the worst. *₹50,328.* It gets a crown.', 'July was the worst. Fifty thousand rupees. It gets a crown.', { id: 'july', gap: 0.15 }),
  LN('claude', 'And *89%* went to other people.', 'And eighty-nine percent went to other people.', { id: 'people', gap: 0.20 }),
  LN('maddie', 'I\'m basically everyone\'s *ATM*…', "[sigh] I'm basically everyone's A T M...", { id: 'atm', gap: 0.25 }),
  LN('claude', 'Set a *monthly limit*. It warns you before you cross it.', 'Set a monthly limit. It warns you before you cross it.', { id: 'limit', gap: 0.30 }),
  LN('maddie', 'This is actually useful. Is it *free*?', 'This is actually useful. Is it free?', { id: 'freeq', gap: 0.30 }),
  LN('claude', '*Free.* PhonePe, Google Pay, or your bank statement.', 'Free. PhonePe, Google Pay, or your bank statement.', { id: 'free', gap: 0.20 }),
  LN('maddie', 'Can I ask for *new features*?', 'Can I ask for new features?', { id: 'ask', gap: 0.30 }),
  LN('claude', 'Rate it right there. Tell us what to add, and *we\'ll build it*.', "Rate it right there. Tell us what to add, and we'll build it.", { id: 'rate', gap: 0.20 }),
  LN('claude', 'Comment *PAISA*, and I\'ll send you the link.', "Comment paisa, and I'll send you the link.", { id: 'cta', gap: 0.30 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || (l.who === 'claude' ? 1.0 : 0.97) }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
