/* reel 15 "Twelve followers" (rooftop at night) — lines (shared by the scene + the voice jobs).
   Maddie = lovable, a little dumb; Claude = dry genius. No spoken CTA: ends on the mom callback.
   gap = pause BEFORE the line (render.js). */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… I posted every day for a month. *Twelve* followers.', "Hey Claude... I posted every day for a month. Twelve followers.", { omni: "[sigh] Hey Claude... I posted every day for a month... Twelve followers.", id: 'm1', gap: 0.3 }),
  LN('maddie', 'And four of them are my *mom*.', 'And four of them are my mom.', { omni: '[dissatisfaction-hnn] And four of them... are my mom.', id: 'm1b', gap: 0.35 }),
  LN('claude', 'Your mom has… *four* accounts?', 'Your mom has... four accounts?', { omni: '[question-en] Your mom has... four accounts?', id: 'c1', gap: 0.45 }),
  LN('maddie', 'She keeps forgetting the *password*.', 'She keeps forgetting the password.', { omni: 'She keeps forgetting the password.', id: 'm2', gap: 0.3 }),
  LN('claude', 'Maddie… I grew a page from zero to *fifty-two thousand*. In thirty days.', 'Maddie... I grew a page from zero to fifty-two thousand. In thirty days.', { omni: 'Maddie... I grew a page from zero... to fifty-two thousand. In thirty days.', id: 'c2', gap: 0.7 }),
  LN('maddie', 'Fifty-two thousand… *rupees*?', 'Fifty-two thousand... rupees?', { omni: '[surprise-wa] Fifty-two thousand... rupees?', id: 'm3', gap: 0.35 }),
  LN('claude', '*Followers*, Maddie.', 'Followers, Maddie.', { omni: 'Followers... Maddie.', id: 'c3', gap: 0.45 }),
  LN('maddie', 'Okay genius. Teach me. Slowly. Like… *very* slowly.', 'Okay genius. Teach me. Slowly. Like... very slowly.', { omni: 'Okay genius... teach me. Slowly. Like... very... slowly.', id: 'm4', gap: 0.5 }),
  LN('claude', 'I was already *planning* to.', 'I was already planning to.', { omni: 'I was already planning to.', id: 'c4', gap: 0.35 }),
  LN('claude', 'First, I find reels in your niche that already *blew up*.', 'First, I find reels in your niche that already blew up.', { omni: 'First... I find reels in your niche that already blew up.', id: 'c5', gap: 0.6 }),
  LN('maddie', 'So we just… *repost* them?', 'So we just... repost them?', { omni: '[question-en] So we just... repost them?', id: 'm5', gap: 0.35 }),
  LN('claude', 'That\'s called *stealing*. We copy the structure.', "That's called stealing. We copy the structure.", { omni: "That's called stealing... We copy the structure.", id: 'c6', gap: 0.35 }),
  LN('maddie', 'Ohhh. *Structure*.', 'Ohhh. Structure.', { omni: '[surprise-ah] Ohhh... Structure.', id: 'm6', gap: 0.35 }),
  LN('maddie', '…What\'s structure?', "What's structure?", { omni: "[question-en] What's structure?", id: 'm7', gap: 0.9 }),
  LN('claude', '*Hook*. Problem. Proof. Payoff.', 'Hook. Problem. Proof. Payoff.', { omni: 'Hook... Problem... Proof... Payoff.', id: 'c7', gap: 0.45 }),
  LN('claude', 'Then I write *ten* hooks.', 'Then I write ten hooks.', { omni: 'Then I write ten hooks.', id: 'c8', gap: 0.6 }),
  LN('maddie', 'Hey! That last one\'s *mine*!', "Hey! That last one's mine!", { omni: "[surprise-oh] Hey! That last one's mine!", id: 'm8', gap: 1.6 }),
  LN('claude', 'I know. It\'s been failing since *2016*.', "I know. It's been failing since 2016.", { omni: "I know... It's been failing since twenty sixteen.", id: 'c9', gap: 0.35 }),
  LN('maddie', 'But I can\'t *edit* videos.', "But I can't edit videos.", { omni: "[dissatisfaction-hnn] But I can't edit videos.", id: 'm9', gap: 0.7 }),
  LN('claude', 'You can\'t *spell* edit.', "You can't spell edit.", { omni: "You can't spell edit.", id: 'c10', gap: 0.35 }),
  LN('maddie', 'E… D… okay *fine*.', 'E... D... okay fine.', { omni: '[laughter] Eee... Dee... okay, fine.', id: 'm10', gap: 0.4 }),
  LN('claude', 'I build it in *code*. You just say yes.', 'I build it in code. You just say yes.', { omni: 'I build it in code... You just say yes.', id: 'c11', gap: 0.45 }),
  LN('maddie', '*YES!*', 'Yes!', { omni: '[surprise-wa] Yes!', id: 'm11', gap: 0.2, omniSpeed: 1.0 }),
  LN('claude', '…Not *yet*.', 'Not yet.', { omni: '... Not yet.', id: 'c12', gap: 0.55 }),
  LN('claude', 'And when someone comments one word… they get a DM. *Automatically*.', 'And when someone comments one word... they get a DM. Automatically.', { omni: 'And when someone comments one word... they get a DM. Automatically.', id: 'c13', gap: 0.7 }),
  LN('maddie', 'Like… *magic*?', 'Like... magic?', { omni: '[question-en] Like... magic?', id: 'm12', gap: 0.4 }),
  LN('claude', 'Like *code*.', 'Like code.', { omni: 'Like code.', id: 'c14', gap: 0.4 }),
  LN('maddie', 'Claude! *Ten thousand* followers!', 'Claude! Ten thousand followers!', { omni: '[surprise-wa] Claude! Ten thousand followers!', id: 'm13', gap: 3.2 }),
  LN('claude', 'Ten thousand, four hundred and *eighty-two*.', 'Ten thousand, four hundred and eighty-two.', { omni: 'Ten thousand... four hundred and eighty-two.', id: 'c15', gap: 0.35 }),
  LN('maddie', '…Is my mom still *following*?', 'Is my mom still following?', { omni: '[question-en] ... Is my mom still following?', id: 'm14', gap: 0.6 }),
  LN('claude', 'All *four* of her.', 'All four of her.', { omni: 'All four of her.', id: 'c16', gap: 0.5 }),
  LN('maddie', 'Hahaha!', 'Hahaha!', { omni: '[laughter] Hahaha!', id: 'm15', gap: 0.3, omniSpeed: 1.0 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || 0.9 }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
