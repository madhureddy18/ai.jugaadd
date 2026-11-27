/* reel: Why is there an X on the last train coach? */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', "Claude, why is there a big *X* on the last coach of every train?", "Claude, why is there a big X on the last coach of every train?", { id: 'hook', gap: 0 }),
  LN('claude', "It's not decoration. It's a *safety check*.", "It's not decoration. It's a safety check.", { id: 'safety', gap: 0.22 }),
  LN('claude', "When a train passes a station, the station master *looks* for that X.", "When a train passes a station, the station master looks for that X.", { id: 'looks', gap: 0.22 }),
  LN('maddie', "Why? To say *bye*?", "Why? To say bye?", { id: 'bye', gap: 0.22 }),
  LN('claude', "To make sure the *whole train* arrived. No coaches left behind.", "To make sure the whole train arrived. No coaches left behind.", { id: 'whole', gap: 0.22 }),
  LN('maddie', "Coaches can get *left behind*?!", "Coaches can get left behind?!", { id: 'left', gap: 0.22 }),
  LN('claude', "If a coupling *breaks*, the last coaches can detach and stop right on the track.", "If a coupling breaks, the last coaches can detach and stop right on the track.", { id: 'breaks', gap: 0.22 }),
  LN('claude', "No X means a *missing piece*. The next train is *stopped* before it hits them.", "No X means a missing piece. The next train is stopped before it hits them.", { id: 'nox', gap: 0.22 }),
  LN('maddie', "Wait\u2026 so *one letter* stops a crash?", "Wait... so one letter stops a crash?", { id: 'oneletter', gap: 0.22 }),
  LN('claude', "Yes. In the day there's also an *L V* board. Last Vehicle. At night, a blinking *red lamp*.", "Yes. In the day there's also an L V board. Last Vehicle. At night, a blinking red lamp.", { id: 'lv', gap: 0.22 }),
  LN('maddie', "And I thought it was just for *style*.", "And I thought it was just for style.", { id: 'style', gap: 0.22 }),
  LN('claude', "Send this to the friend who *always* takes the window in sleeper class.", "Send this to the friend who always takes the window in sleeper class.", { id: 'cta', gap: 0.22 }),
];
