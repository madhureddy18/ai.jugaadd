/* reel 13 "One clip. 7 edits." (comment EFFECTS) — lines (shared by the scene + the voice jobs).
   Effects from the free MIT repo Vibha-Ramprakash/claude-video-effects (/effects <name>). Emotion in the words + tags. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Claude… I filmed one clip. Just me… *talking*.', 'Claude... I filmed one clip. Just me... talking.', { omni: '[sigh] Claude... I filmed one clip. Just me... talking.', id: 'h1', gap: 0.4 }),
  LN('maddie', 'It looks so *boring*.', 'It looks so boring.', { omni: '[dissatisfaction-hnn] It looks so boring.', id: 'h2', gap: 0.45 }),
  LN('claude', 'Give it here. *Watch*.', 'Give it here. Watch.', { omni: 'Give it here... Watch.', id: 'c1', gap: 0.35 }),
  LN('claude', '*Spotlight*.', 'Spotlight.', { omni: 'Spotlight.', id: 'e1', gap: 0.3 }),
  LN('maddie', '*Whoa*—', 'Whoa!', { omni: '[surprise-oh] Whoa!', id: 'w1', gap: 1.0 }),
  LN('claude', '*Orbit*.', 'Orbit.', { omni: 'Orbit.', id: 'e2', gap: 1.5 }),
  LN('claude', '*Backdrop* word.', 'Backdrop word.', { omni: 'Backdrop word.', id: 'e3', gap: 1.0 }),
  LN('maddie', 'Wait wait— that\'s *me*?!', "Wait wait! That's me?!", { omni: "[surprise-wa] Wait, wait! That's me?!", id: 'w2', gap: 0.9 }),
  LN('claude', '*Cover* star.', 'Cover star.', { omni: 'Cover star.', id: 'e4', gap: 1.5 }),
  LN('claude', '*LED* sign.', 'LED sign.', { omni: 'L E D sign.', id: 'e5', gap: 1.5 }),
  LN('claude', '*Countdown* flip.', 'Countdown flip.', { omni: 'Countdown flip.', id: 'e6', gap: 1.6 }),
  LN('claude', 'And… *reject* stamp.', 'And... reject stamp.', { omni: 'And... reject stamp.', id: 'e7', gap: 1.6 }),
  LN('maddie', 'Seven edits… from *one* clip?!', 'Seven edits... from one clip?!', { omni: '[surprise-oh] Seven edits... from one clip?!', id: 'm1', gap: 0.4 }),
  LN('claude', 'Fifty-one effects. All *free*. No editing app.', 'Fifty-one effects. All free. No editing app.', { omni: 'Fifty-one effects. All free... No editing app.', id: 'c2', gap: 0.45 }),
  LN('maddie', 'This is basically *cheating*.', 'This is basically cheating.', { omni: '[laughter] Hehe... this is basically cheating.', id: 'm2', gap: 0.45 }),
  LN('claude', "Comment *EFFECTS*. I'll send the repo.", "Comment EFFECTS. I'll send the repo.", { omni: "Comment... effects. I'll send the repo.", id: 'cta1', gap: 0.35 }),
  LN('maddie', 'My video editor is *crying* right now.', 'My video editor is crying right now.', { omni: 'My video editor... is crying right now.', id: 'cta2', gap: 0.2 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 1.0 }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
