/* reel 25 "This website roasted me" — PaisaMap promo (name only on screen; dialogue says "the free website"). NEW SET: canteen at lunch.
   Real roast lines from PaisaMap on Maddyy's PhonePe statement (Jun–Nov 2026). Voices: graduation-reel clones (maddie_G 0.94x, claude_G 0.98x). Comment PAISA. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… a website just *roasted* me.', 'Hey Claude... a website just roasted me.', { id: 'hook', gap: 0 }),
  LN('claude', 'What did you do?', 'What did you do?', { id: 'what', gap: 0.25 }),
  LN('maddie', 'I uploaded my bank statement to see where my money went.', 'I uploaded my bank statement to see where my money went.', { id: 'upload', gap: 0.2 }),
  LN('claude', 'The *free* one? It reads your statement right on your phone. *Nothing* is saved.', "The free one? It reads your statement right on your phone. Nothing is saved.", { id: 'free', gap: 0.25 }),
  LN('maddie', 'Yeah. Then it said… "You\'re basically everyone\'s *ATM*."', "Yeah. Then it said... You're basically everyone's A T M.", { id: 'atm', gap: 0.25 }),
  LN('claude', 'Because *89%* of your money went to other people.', 'Because eighty-nine percent of your money went to other people.', { id: 'people', gap: 0.2 }),
  LN('maddie', 'Then it said… "July was *wild*."', '[sigh] Then it said... July was wild.', { id: 'wild', gap: 0.25 }),
  LN('claude', '*₹50,000.* In one month.', 'Fifty thousand rupees. In one month.', { id: 'fifty', gap: 0.2 }),
  LN('maddie', 'And then it gave me a personality… "*The Generous One*."', 'And then it gave me a personality... The Generous One.', { id: 'persona', gap: 0.25 }),
  LN('claude', 'That\'s the polite way of saying *broke*.', "That's the polite way of saying broke.", { id: 'broke', gap: 0.25 }),
  LN('maddie', 'Hey! …okay, fair.', 'Hey! ...Okay, fair.', { id: 'fair', gap: 0.2 }),
  LN('claude', 'It also shows *every month*, every payment, and warns you before you cross your *limit*.', 'It also shows every month, every payment, and warns you before you cross your limit.', { id: 'also', gap: 0.3 }),
  LN('maddie', 'I\'m sending this to my friends. Let them get *roasted* too.', "I'm sending this to my friends. Let them get roasted too.", { id: 'friends', gap: 0.25 }),
  LN('claude', 'Comment *PAISA*. I\'ll send you the *free* link.', "Comment paisa. I'll send you the free link.", { id: 'cta', gap: 0.2 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || (l.who === 'claude' ? 0.98 : 0.94) }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
