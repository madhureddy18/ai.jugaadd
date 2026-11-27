/* reel: Why does milk boil over but water doesn't? */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', "Claude! I looked away for *five seconds* and the milk *exploded*!", "Claude! I looked away for five seconds and the milk exploded!", { id: 'hook', gap: 0 }),
  LN('claude', "Classic. Water never does that. *Milk* does.", "Classic. Water never does that. Milk does.", { id: 'classic', gap: 0.22 }),
  LN('maddie', "Why though? Now I have to *clean* all this.", "Why though? Now I have to clean all this.", { id: 'why', gap: 0.22 }),
  LN('claude', "When milk heats up, its *proteins and fat* float up and form a thin *skin* on top.", "When milk heats up, its proteins and fat float up and form a thin skin on top.", { id: 'skin', gap: 0.22 }),
  LN('claude', "In water, bubbles reach the top and just *pop*.", "In water, bubbles reach the top and just pop.", { id: 'water', gap: 0.22 }),
  LN('claude', "But milk bubbles hit that skin\u2026 and get *trapped*.", "But milk bubbles hit that skin... and get trapped.", { id: 'trapped', gap: 0.22 }),
  LN('maddie', "So they *pile up*?", "So they pile up?", { id: 'pile', gap: 0.22 }),
  LN('claude', "More and more steam pushes the skin up like a *lid*. Then *whoosh*. All over the stove.", "More and more steam pushes the skin up like a lid. Then whoosh. All over the stove.", { id: 'lid', gap: 0.22 }),
  LN('maddie', "How do I *stop* it?", "How do I stop it?", { id: 'stop', gap: 0.22 }),
  LN('claude', "Lower the flame and keep *stirring*. That breaks the skin, so the steam can escape.", "Lower the flame and keep stirring. That breaks the skin, so the steam can escape.", { id: 'stir', gap: 0.22 }),
  LN('maddie', "So the skin was the *villain* all along.", "So the skin was the villain all along.", { id: 'villain', gap: 0.22 }),
  LN('claude', "Send this to the friend whose chai *always* boils over.", "Send this to the friend whose chai always boils over.", { id: 'cta', gap: 0.22 }),
];
