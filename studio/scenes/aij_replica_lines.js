/* reel 21 "Replica apps" — FIXED TEMPLATE (reel 6 look). Apps already earning (TrustMRR verified revenue) rebuilt for India.
   Copy the idea, never the code or the name. Comment REPLICA -> DM with 10 replica app ideas for India (p/replica/). No burst rays. */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', 'Hey Claude… how do people actually make *money* with apps?', 'Hey Claude... how do people actually make money with apps?', { id: 'hook', gap: 0 }),
  LN('claude', 'They *copy* the ones that are already making money.', 'They copy the ones that are already making money.', { id: 'copy', gap: 0.3 }),
  LN('maddie', 'Isn\'t that *illegal*?!', "Isn't that illegal?!", { id: 'illegal', gap: 0.2 }),
  LN('claude', 'Copying the *code* or the *name* is.', 'Copying the code or the name is.', { id: 'code', gap: 0.25 }),
  LN('claude', 'Copying the *idea* isn\'t.', "Copying the idea isn't.", { id: 'idea', gap: 0.1 }),
  LN('claude', 'There\'s a site called *TrustMRR*.', "There's a site called Trust M R R.", { id: 'site', gap: 0.35 }),
  LN('claude', 'Thousands of apps… with their *real earnings*.', 'Thousands of apps... with their real earnings.', { id: 'real', gap: 0.1 }),
  LN('claude', 'This one makes app designs from an idea. *$20,000 a month.*', 'This one makes app designs from an idea. Twenty thousand dollars a month.', { id: 'ex', gap: 0.2 }),
  LN('claude', '*Step one.* Pick an app that\'s *already earning*.', "Step one. Pick an app that's already earning.", { id: 's1', gap: 0.35 }),
  LN('claude', '*Step two.* Rebuild it for *India*. Rupees, UPI, Hindi.', 'Step two. Rebuild it for India. Rupees, U P I, Hindi.', { id: 's2', gap: 0.25 }),
  LN('claude', '*Step three.* Charge *₹299* instead of twenty dollars.', 'Step three. Charge two hundred ninety-nine rupees instead of twenty dollars.', { id: 's3', gap: 0.25 }),
  LN('maddie', 'So… the same app, but made *for us*?', 'So... the same app, but made for us?', { id: 'same', gap: 0.3 }),
  LN('claude', 'That\'s a *replica app*.', "That's a replica app.", { id: 'rep', gap: 0.2 }),
  LN('maddie', 'A thousand users… that\'s *three lakhs* a month!', "A thousand users... that's three lakhs a month!", { id: 'lakh', gap: 0.35 }),
  LN('claude', '*If* you get a thousand.', 'If you get a thousand.', { id: 'if', gap: 0.2 }),
  LN('maddie', '…Okay, I\'ll get *ten*.', "Okay, I'll get ten.", { id: 'ten', gap: 0.25 }),
  LN('claude', 'Ten is three thousand rupees. *Start there.*', 'Ten is three thousand rupees. Start there.', { id: 'start', gap: 0.2 }),
  LN('maddie', 'But Claude… what apps can I even make? I *don\'t know*.', "But Claude... what apps can I even make? I don't know.", { id: 'which', gap: 0.35 }),
  LN('claude', 'Comment *REPLICA*. I\'ll send you *ten* app ideas.', "Comment replica. I'll send you ten app ideas.", { id: 'cta', gap: 0.25 }),
].map(l => ({ ...l, omniSpeed: l.omniSpeed || (l.who === 'claude' ? 1.02 : 1.0) }));
if (!window.SCENE) window.SCENE = { lines: window.JR_LINES };
