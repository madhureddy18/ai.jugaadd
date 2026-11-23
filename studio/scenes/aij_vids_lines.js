/* reel 28 "I made a movie with one sentence" — Google Vids (Gemini Omni 1.2 Flash): 15-sec video WITH SOUND from one line, 3 free a month with a
   Google account. Real 3D scenes: hero lands on Charminar at sunset, slow-motion biryani. Any comment → DM guide + 10 prompts (p/vids/). */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… I just made a *MOVIE*. With *ONE* sentence!', 'Hey Claude... I just made a MOVIE. With ONE sentence!', { id: 'hook', gap: 0 }),
  LN('claude', 'Show me.', 'Show me.', { id: 'show', gap: 0.2 }),
  LN('maddie', 'I typed: "a superhero landing on *Charminar* at sunset"…', 'I typed: a superhero landing on Charminar at sunset...', { id: 'typed', gap: 0.2 }),
  LN('maddie', '…and it made the whole thing. With *SOUND!*', '...and it made the whole thing. With SOUND!', { id: 'sound', gap: 0.15 }),
  LN('claude', 'That\'s *Google Vids*. Fifteen seconds of video. From one line.', "That's Google Vids. Fifteen seconds of video. From one line.", { id: 'vids', gap: 0.25 }),
  LN('maddie', 'And it\'s *FREE?!*', "And it's FREE?!", { id: 'free', gap: 0.2 }),
  LN('claude', '*Free.* Three videos every month. Just a Google account.', 'Free. Three videos every month. Just a Google account.', { id: 'three', gap: 0.2 }),
  LN('maddie', 'Okay, okay… second one: "*biryani* falling in slow motion."', 'Okay, okay... second one: biryani falling in slow motion.', { id: 'biryani', gap: 0.3 }),
  LN('maddie', 'I\'m never sleeping again.', "I'm never sleeping again.", { id: 'sleep', gap: 0.3 }),
  LN('claude', 'Comment anything. I\'ll send you the exact steps and *10 prompts* that look insane.', "Comment anything. I'll send you the exact steps and ten prompts that look insane.", { id: 'cta', gap: 0.25 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || (l.who === 'claude' ? 0.98 : 0.94) }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
