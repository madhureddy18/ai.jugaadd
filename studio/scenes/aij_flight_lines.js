/* reel 30 "Why flights curve" — great circles: shortest path on a sphere looks curved on a flat (Mercator) map. Delhi → New York goes up over the Arctic.
   Real 3D: a globe with a glowing string, a plane flying it, the globe peeling flat into a Mercator map, Greenland vs Africa. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', "Claude, why did my flight bend like a *banana*? A straight line is *shorter*, na?", "Claude, why did my flight bend like a banana? A straight line is shorter, na?", { id: 'hook', gap: 0 }),
  LN('claude', "On a *flat* map, yes. But the Earth is a *ball*.", "On a flat map, yes. But the Earth is a ball.", { id: 'ball', gap: 0.25 }),
  LN('maddie', "Obviously. *So?*", "Obviously. So?", { id: 'so', gap: 0.2 }),
  LN('claude', "Watch. Stretch a string from *Delhi* to *New York* on a globe.", "Watch. Stretch a string from Delhi to New York on a globe.", { id: 'string', gap: 0.25 }),
  LN('claude', "Pull it *tight*. It doesn't go across. It goes *up*, over the top of the world.", "Pull it tight. It doesn't go across. It goes up, over the top of the world.", { id: 'tight', gap: 0.2 }),
  LN('maddie', "Wait\u2026 *that's* the shortest path?", "Wait... that's the shortest path?", { id: 'wait', gap: 0.25 }),
  LN('claude', "Yes. Pilots call it a *great circle*. Now peel the globe *flat*.", "Yes. Pilots call it a great circle. Now peel the globe flat.", { id: 'great', gap: 0.2 }),
  LN('claude', "Same tight string. On a flat map, it looks *curved*.", "Same tight string. On a flat map, it looks curved.", { id: 'peel', gap: 0.2 }),
  LN('maddie', "So the curve\u2026 was the *shortcut*?", "So the curve... was the shortcut?", { id: 'short', gap: 0.25 }),
  LN('claude', "Exactly. Flat maps *lie*. Greenland looks as big as Africa. Africa is *fourteen times* bigger.", "Exactly. Flat maps lie. Greenland looks as big as Africa. Africa is fourteen times bigger.", { id: 'lie', gap: 0.2 }),
  LN('maddie', "Bro\u2026 my whole *geography* is fake.", "Bro... my whole geography is fake.", { id: 'fake', gap: 0.25 }),
  LN('claude', "Send this to the friend who *always* wants the window seat.", "Send this to the friend who always wants the window seat.", { id: 'cta', gap: 0.2 }),
];
