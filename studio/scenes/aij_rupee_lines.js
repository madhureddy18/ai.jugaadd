/* reel: The secret lines on your rupee notes */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', "Claude, why do our notes have these little *lines* on the sides?", "Claude, why do our notes have these little lines on the sides?", { id: 'hook', gap: 0 }),
  LN('claude', "Close your eyes. Now *touch* them.", "Close your eyes. Now touch them.", { id: 'touch', gap: 0.22 }),
  LN('maddie', "Wait\u2026 they're *raised*?", "Wait... they're raised?", { id: 'raised', gap: 0.22 }),
  LN('claude', "Yes. They're for people who *can't see*.", "Yes. They're for people who can't see.", { id: 'blind', gap: 0.22 }),
  LN('claude', "Count them. The hundred rupee note has *four*. The five hundred has *five*.", "Count them. The hundred rupee note has four. The five hundred has five.", { id: 'count', gap: 0.22 }),
  LN('maddie', "So you can tell the note just by *touch*?!", "So you can tell the note just by touch?!", { id: 'bytouch', gap: 0.22 }),
  LN('claude', "Yes. There's also a raised *mark* to feel, and every note is a different *size*.", "Yes. There's also a raised mark to feel, and every note is a different size.", { id: 'size', gap: 0.22 }),
  LN('maddie', "My wallet had a *secret code* this whole time.", "My wallet had a secret code this whole time.", { id: 'code', gap: 0.22 }),
  LN('claude', "Next time you get a note, close your eyes and *feel* the edges.", "Next time you get a note, close your eyes and feel the edges.", { id: 'feel', gap: 0.22 }),
  LN('claude', "Send this to someone who still counts money *twice*.", "Send this to someone who still counts money twice.", { id: 'cta', gap: 0.22 }),
];
