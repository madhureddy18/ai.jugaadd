/* reel 27 "AI did 3 crazy things this week" (22 Nov 2026): Gemini phones businesses for you (free in India), Genie 4 playable worlds from one line,
   US banks: your AI agent's mistakes are on you. NEW STYLE: real 3D scenes act out each line (no phone/TV pop-ups). Voices: graduation-reel clones. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… what happened in *AI* this week?', 'Hey Claude... what happened in A I this week?', { id: 'hook', gap: 0 }),
  LN('claude', 'Three things. *Number one:* Gemini can now make *phone calls* for you.', 'Three things. Number one: Gemini can now make phone calls for you.', { id: 'one', gap: 0.25 }),
  LN('claude', 'It calls the shop, waits on hold, *books* your appointment, and adds it to your calendar.', 'It calls the shop, waits on hold, books your appointment, and adds it to your calendar.', { id: 'books', gap: 0.15 }),
  LN('maddie', 'In *India* too?!', 'In India too?!', { id: 'india', gap: 0.25 }),
  LN('claude', 'India too. And it tells them it\'s an *AI*.', "India too. And it tells them it's an A I.", { id: 'tells', gap: 0.2 }),
  LN('claude', '*Number two:* Google\'s Genie 4. Type one line… and it builds a *world* you can play.', "Number two: Google's Genie four. Type one line... and it builds a world you can play.", { id: 'two', gap: 0.3 }),
  LN('maddie', 'Wait… I\'m *inside* it?!', "Wait... I'm inside it?!", { id: 'inside', gap: 0.25 }),
  LN('claude', '*Number three* is a warning. Big US banks just said: if your AI agent messes up your bank account… *you pay.*', 'Number three is a warning. Big U S banks just said: if your A I agent messes up your bank account... you pay.', { id: 'three', gap: 0.3 }),
  LN('maddie', 'So AI can call, build… and *lose my money.*', 'So A I can call, build... and lose my money.', { id: 'sum', gap: 0.3 }),
  LN('claude', 'Welcome to 2026. *Follow* for AI news every week.', 'Welcome to twenty twenty-six. Follow for A I news every week.', { id: 'cta', gap: 0.25 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || (l.who === 'claude' ? 0.98 : 0.94) }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
