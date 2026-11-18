/* reel 23 "I don't even spend money" — PaisaMap promo without saying the name: "a FREE website that shows where your money went".
   Bedroom set in DAYTIME. Real stats (Maddyy's PhonePe, Jun–Nov 2026). Voices cloned from his graduation reel (maddie_G 0.94x, claude_G 0.98x). Comment PAISA. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… I don\'t even *spend* money. So where is my salary going?', "Hey Claude... I don't even spend money. So where is my salary going?", { id: 'hook', gap: 0 }),
  LN('claude', 'There\'s a *free website* that shows you exactly where your money went.', "There's a free website that shows you exactly where your money went.", { id: 'free', gap: 0.25 }),
  LN('maddie', '*Free?* What does it do?', 'Free? What does it do?', { id: 'what', gap: 0.2 }),
  LN('claude', 'Upload your bank or PhonePe statement.', 'Upload your bank or PhonePe statement.', { id: 'how', gap: 0.2 }),
  LN('claude', 'It shows *every month*, every payment, and where it all went.', 'It shows every month, every payment, and where it all went.', { id: 'shows', gap: 0.1 }),
  LN('maddie', 'Wait… will they *save* my statement?', 'Wait... will they save my statement?', { id: 'save', gap: 0.25 }),
  LN('claude', 'No. It\'s read on your phone. *Nothing* is uploaded. *Nothing* is saved.', "No. It's read on your phone. Nothing is uploaded. Nothing is saved.", { id: 'no', gap: 0.2 }),
  LN('maddie', 'Okay… See? *Nothing.*', 'Okay... See? Nothing.', { id: 'see', gap: 0.3 }),
  LN('claude', '*₹1.36 lakh.* In six months.', 'One lakh thirty-six thousand. In six months.', { id: 'lakh', gap: 0.25 }),
  LN('maddie', '…That\'s not me.', "That's not me.", { id: 'notme', gap: 0.25 }),
  LN('claude', '*July.* ₹50,000.', 'July. Fifty thousand.', { id: 'july', gap: 0.25 }),
  LN('maddie', 'July was… a mistake.', 'July was... a mistake.', { id: 'mistake', gap: 0.2 }),
  LN('claude', '*35* tiny payments under ₹100.', 'Thirty-five tiny payments under a hundred rupees.', { id: 'tiny', gap: 0.25 }),
  LN('maddie', 'That\'s just *chai!* Chai is not spending. Chai is *oxygen.*', "That's just chai! Chai is not spending. Chai is oxygen.", { id: 'chai', gap: 0.2 }),
  LN('claude', 'And *89%* went to other people.', 'And eighty-nine percent went to other people.', { id: 'people', gap: 0.25 }),
  LN('maddie', 'They said they\'ll *pay me back.*', "[sigh] They said they'll pay me back.", { id: 'payback', gap: 0.2 }),
  LN('claude', 'They won\'t.', "They won't.", { id: 'wont', gap: 0.2 }),
  LN('claude', 'Set a *monthly limit*. The website warns you before you cross it.', 'Set a monthly limit. The website warns you before you cross it.', { id: 'limit', gap: 0.15 }),
  LN('maddie', 'It\'s *free?* Send me the link!', "It's free? Send me the link!", { id: 'link', gap: 0.25 }),
  LN('claude', 'Comment *PAISA*. I\'ll send you the link.', "Comment paisa. I'll send you the link.", { id: 'cta', gap: 0.2 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || (l.who === 'claude' ? 0.98 : 0.94) }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
