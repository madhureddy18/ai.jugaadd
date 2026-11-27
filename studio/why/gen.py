import sys,os
W='/home/claude/why/'
rd=lambda f:open(W+f).read()
def build(k, comment, setup_bg, RY, SET, WORLD, ACT, SHOTS, PLAN, FACE, BEATS, SFX, CUTS, LIGHTS):
    head=rd('head.js').replace("bg: 0x0b0d1f, fog: [9, 40]", setup_bg)
    s=f"/* {comment} */\n"+head+f"""
    const rng = K.rng({abs(hash(k))%997});
    const C = {{}}; window.SCENE.lines.forEach(l => C[l.id] = B(l.id) - 0.1);
    const RY = {RY}; const dummy = new THREE.Object3D();
    // ================= HOME SET =================
{SET}
    // ================= CHARACTERS =================
""" + rd('chars.js').split('\n',1)[1] + f"""
    // ================= LIGHT =================
{LIGHTS}
    // ================= EXPLAINER WORLD =================
{WORLD}
    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const FACE = {FACE};
    const curLine = t => {{ let c = L[0]; for (const l of L) if (t >= l.t - 0.1) c = l; return c; }};
    const acting = t => {{
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      const cur = curLine(t), end = t >= C.cta;
      let face = 'neutral', mL = toR, lean = 0;
      if (cur.who === 'maddie') {{ face = FACE[cur.id] || 'neutral'; mL = (face === 'shock' || face === 'worried') ? toCam : toR; lean = face === 'shock' ? -0.1 : face === 'worried' ? 0.15 : 0; }}
      if (end) {{ face = 'smile'; mL = toCam; }}
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, {{ talk: mT * 0.95, face, look: [mYaw, mPitch], type: 0, lean }});
      phL.intensity = 0; ph.visible = false;
      const rL = cur.who === 'claude' || end ? [0.25, 0.03] : [-0.2, 0.05];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      R.update(t, {{ talk: rT, look: [rYaw, rPitch], mood: end ? 'smile' : 'calm' }});
{ACT}
    }};
    // ================= CAMERA =================
    const P = (pos, look, fov) => ({{ pos, look, fov }});
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.4, RY + 0.26, -0.8];
    const sh = {{
      mad: [P([0.42, 1.46, 1.55], [-0.28, 1.4, -0.94], 32), P([0.38, 1.45, 1.35], [-0.28, 1.4, -0.94], 32)],
      two: [P([0.45, 1.45, 2.1], [-0.05, 1.2, -0.9], 40), P([0.4, 1.42, 1.85], [-0.05, 1.2, -0.9], 40)],
      robo: [P([-0.05, RY + 0.36, 0.75], RHL, 32), P([-0.02, RY + 0.35, 0.6], RHL, 32)],
      cta: [P([0.5, 1.5, 2.6], [-0.05, 1.25, -0.9], 42), P([0.45, 1.48, 2.3], [-0.05, 1.25, -0.9], 42)],
{SHOTS}
    }};
    const PLAN = [{PLAN}];
    const plan = PLAN.map((p, i) => [p[0], i + 1 < PLAN.length ? PLAN[i + 1][0] : D + 5, sh[p[1]], p[1]]).filter(p => p[1] > p[0]);
    const smooth = k => k * k * (3 - 2 * k);
    const lift = (p, dy) => ({{ pos: [p.pos[0], p.pos[1] + dy, p.pos[2]], look: [p.look[0], p.look[1] + dy, p.look[2]], fov: p.fov }});
    const DYS = {{ mad: 0.085, robo: 0.035, two: 0.05, cta: 0.03 }};
    plan.forEach(p => {{ if (DYS[p[3]]) p[2] = [lift(p[2][0], DYS[p[3]]), lift(p[2][1], DYS[p[3]])]; }});
    const SHAKE = plan.filter(p => p[3] === 'mad' && L.some(l => l.who === 'maddie' && FACE[l.id] === 'shock' && Math.abs(B(l.id) - 0.1 - p[0]) < 0.3)).map(p => p[0]);
    const shots = plan.map(([a, b, s]) => ({{ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth, shake: SHAKE.includes(a) ? (t => 0.006 * Math.exp(-(t - a) * 6)) : null }}));
    const curFov = t => {{ const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; const k = smooth(cl((t - p[0]) / (p[1] - p[0]))); return lerp(p[2][0].fov, p[2][1].fov, k); }};
""" + rd('hud.js') + f"""
    const DARK = 'rgba(10,14,40,0.92)';
    const label = (t, t0, t1, s, bg = DARK, fg = '#fff', y = 230) => {{ if (t < t0 || t >= t1) return; chip(s, 540, y, 38, bg, fg, fin(t, t0, 0.25) * (1 - pr(t, t1 - 0.2, t1)), pop(t, t0, 0.35), 800); }};
    const endCard = (t, l1, l2, btn) => {{ if (t < C.cta) return; const a = pop(t, C.cta + 0.05, 0.45); scaleAt(540, 430, a, () => {{ h.save(); h.shadowColor = 'rgba(111,216,255,0.9)'; h.shadowBlur = 40; rr(140, 270, 800, 330, 40, DARK); h.restore();
        ft(l1, 540, 350, 50, '#fff', 700, 'center'); ft(l2, 540, 412, 40, '#ffd34a', 700, 'center');
        const pl = 1 + 0.05 * Math.sin(t * 7); scaleAt(540, 520, pl, () => {{ rr(170, 480, 740, 84, 42, '#ffd34a'); ft(btn, 540, 524, 36, '#1a1206', 800, 'center'); }}); }}); }};
    const drawBeats = t => {{
{BEATS}
    }};
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; {{ const x = vig.getContext('2d'), gr = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,10,0.32)'); x.fillStyle = gr; x.fillRect(0, 0, HW, HH); }}
    const cuts = [{CUTS}];
    const flash = t => {{ let a = 0; cuts.forEach(c => {{ const d = t - c; if (d >= 0 && d < 0.15) a = Math.max(a, 1 - d / 0.15); }}); return a; }};
    const hudDraw = t => {{
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawBeats(t);
      const f = flash(t); if (f > 0) {{ h.fillStyle = `rgba(255,255,255,${{f * 0.35}})`; h.fillRect(0, 0, HW, HH); }}
      const fi = 1 - pr(t, 0, 0.25); if (fi > 0) {{ h.fillStyle = `rgba(0,0,0,${{fi}})`; h.fillRect(0, 0, HW, HH); }}
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const gg = h.createLinearGradient(0, 0, HW, 0); gg.addColorStop(0, '#6fd8ff'); gg.addColorStop(1, '#ffd34a'); h.fillStyle = gg; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; }};
    const placeHud = t => {{ const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); }};
    const update = t => {{ K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); placeHud(t); hudDraw(t); }};
    const sfx = [];
{SFX}
    return {{ duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 }};
  }},
}};
"""
    open(f'/home/claude/ai.jugaadd/studio/scenes/aij_{k}_body.js','w').write(s)
