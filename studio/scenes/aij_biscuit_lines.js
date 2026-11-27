/* reel: Why do biscuits have holes? */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', "Claude, why do biscuits have these tiny *holes*? Is it just *design*?", "Claude, why do biscuits have these tiny holes? Is it just design?", { id: 'hook', gap: 0 }),
  LN('claude', "Nope. Those holes are there because of the *oven*.", "Nope. Those holes are there because of the oven.", { id: 'oven', gap: 0.22 }),
  LN('claude', "Biscuit dough has *water* in it. In the oven, that water turns into *steam*.", "Biscuit dough has water in it. In the oven, that water turns into steam.", { id: 'steam', gap: 0.22 }),
  LN('maddie', "Okay\u2026 *so*?", "Okay... so?", { id: 'so', gap: 0.22 }),
  LN('claude', "Steam needs a way *out*. With no holes, it gets *trapped* inside.", "Steam needs a way out. With no holes, it gets trapped inside.", { id: 'trapped', gap: 0.22 }),
  LN('claude', "The biscuit puffs up like a *balloon*, bakes uneven, and *cracks*.", "The biscuit puffs up like a balloon, bakes uneven, and cracks.", { id: 'balloon', gap: 0.22 }),
  LN('maddie', "Wait. So the holes are tiny *chimneys*?", "Wait. So the holes are tiny chimneys?", { id: 'chimney', gap: 0.22 }),
  LN('claude', "Exactly. Steam slips out through them, and the biscuit stays *flat and crisp*.", "Exactly. Steam slips out through them, and the biscuit stays flat and crisp.", { id: 'flat', gap: 0.22 }),
  LN('claude', "Bakers even have a name for it. It's called *docking*.", "Bakers even have a name for it. It's called docking.", { id: 'docking', gap: 0.22 }),
  LN('maddie', "My whole childhood\u2026 I was eating *chimneys*.", "My whole childhood... I was eating chimneys.", { id: 'childhood', gap: 0.22 }),
  LN('claude', "Send this to the friend who dips *every* biscuit in chai.", "Send this to the friend who dips every biscuit in chai.", { id: 'cta', gap: 0.22 }),
];
