/* reel: Can your phone really blast a petrol pump? */
const LN = (who, text, say, o = {}) => { const sy = say || text.replace(/\*/g, ''); return { who, text, say: sy.replace(/\[[a-z-]+\]\s*/g, ''), omni: o.omni || sy, ...o }; };
window.JR_LINES = [
  LN('maddie', "Claude, why can't we use phones at petrol pumps? Will it really *blast*?", "Claude, why can't we use phones at petrol pumps? Will it really blast?", { id: 'hook', gap: 0 }),
  LN('claude', "Here's the twist. Experts have *never* found a single fire caused by a phone.", "Here's the twist. Experts have never found a single fire caused by a phone.", { id: 'twist', gap: 0.22 }),
  LN('maddie', "What?! Then why the *board*?", "What?! Then why the board?", { id: 'board', gap: 0.22 }),
  LN('claude', "Partly an old *rumour*. And partly because a phone *distracts* you near fuel.", "Partly an old rumour. And partly because a phone distracts you near fuel.", { id: 'rumour', gap: 0.22 }),
  LN('claude', "The real danger is something smaller. *Static electricity*.", "The real danger is something smaller. Static electricity.", { id: 'static', gap: 0.22 }),
  LN('maddie', "Static? Like the *shock* from a door handle?", "Static? Like the shock from a door handle?", { id: 'shock', gap: 0.22 }),
  LN('claude', "Exactly. Petrol gives off *vapour*. One tiny spark from your body can *light* it.", "Exactly. Petrol gives off vapour. One tiny spark from your body can light it.", { id: 'vapour', gap: 0.22 }),
  LN('claude', "Most of these fires happened when people got back into the car while filling, then touched the *nozzle*.", "Most of these fires happened when people got back into the car while filling, then touched the nozzle.", { id: 'nozzle', gap: 0.22 }),
  LN('maddie', "So the phone was *innocent* this whole time.", "So the phone was innocent this whole time.", { id: 'innocent', gap: 0.22 }),
  LN('claude', "Mostly. But still follow the board at the pump. And *never* smoke there.", "Mostly. But still follow the board at the pump. And never smoke there.", { id: 'follow', gap: 0.22 }),
  LN('claude', "Send this to the friend who always says, *phone off bro, it'll blast*.", "Send this to the friend who always says, phone off bro, it'll blast.", { id: 'cta', gap: 0.22 }),
];
