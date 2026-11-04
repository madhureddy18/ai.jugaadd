/* @ai.jugaadd "POV: you open Instagram for 5 minutes" v3 (new ending: post reels with Claude, comment PROMPT).
   Everything up to the BONK is identical to v2 (its frames are reused).
   Time-lapse 7:00 PM -> 9:07 PM: Maddie scrolls in different positions (sitting, legs up, curled, upside down, under the duvet)
   while Claude waddles around doing chores (sweep, water the plant, fold clothes, close curtains, lamp, fresh chai, trash).
   "Okay, last one." -> Claude throws a book: BONK. "It's called a book. There's no Part 2." Cover: HOW TO MAKE REELS.
   Meta reveal: the reel shrinks into a laptop editor, "This reel was made with Claude". CTA: comment BUILD.
   Full 9:16, no bars, no blush dots, subtitles higher, no handle. Maddie warm & young, Claude dry & British (no glow). */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x0b0d16, fog: null, fov: 40, bloom: { strength: 0.26, radius: 0.5, threshold: 0.97 } },
  lines: [
    { who: 'maddie', text: 'Just five minutes.', say: 'Just five minutes.' },
    { who: 'claude', text: '…Sure.', say: 'Sure.', gap: 0.45 },
    { who: 'maddie', text: 'Okay. Five minutes. Done.', say: 'Okay. Five minutes. Done.', gap: 11.2 },
    { who: 'claude', text: 'That was two hours.', say: 'That was two hours.', gap: 0.5 },
    { who: 'maddie', text: '…No way.', say: 'No way.', gap: 1.35 },
    { who: 'maddie', text: 'Okay, last one.', say: 'Okay. Last one.', gap: 0.65 },
    { who: 'claude', text: 'Stop watching reels. Start posting them… and earn from them.', say: 'Stop watching reels. Start posting them... and earn from them.', gap: 1.6 },
    { who: 'maddie', text: "But I don't know editing… and I don't know what to post!", say: "But I don't know editing... and I don't know what to post!", gap: 0.4 },
    { who: 'claude', text: "You don't need to. Claude finds the idea, writes it, and makes the whole reel.", say: "You don't need to. Claude finds the idea, writes it, and makes the whole reel.", gap: 0.45 },
    { who: 'claude', text: 'Free to start. Just a prompt and an Instagram page.', say: 'Free to start. Just a prompt, and an Instagram page.', gap: 0.25 },
    { who: 'claude', text: "Comment PROMPT. I'll send it to your DM.", say: "Comment, prompt. I'll send it to your D M.", gap: 3.5 },
  ].map((l, i) => ({ gap: 0.35, ...l, speed: l.who === 'claude' ? (i >= 6 ? 1.12 : 1.05) : (i >= 6 ? 1.06 : 1.0) })),

  build(K, T) {
    const L = T.lines, B = i => L[i].t, E = i => L[i].end, N = L.length, D = E(N - 1) + 1.7;
    const cl = K.clamp, eo = K.easeOut, ei = K.easeIn, pr = K.prog, eb = K.easeBack, lerp = K.lerp, ez = K.ease;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2, h / 2, d / 2)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);

    // ================= TIMELINE =================
    const TL0 = E(1) + 0.35, TL1 = B(2) - 0.45;                  // silent time-lapse
    const TLA = TL0 + 2.5;                                         // over-the-shoulder phone shot -> locked-off wide
    const NST = 7, stDur = (TL1 - TLA) / NST;
    const kT = t => cl((t - TL0) / (TL1 - TL0));
    const st = t => (t >= TLA && t < TL1) ? Math.min(NST - 1, Math.floor((t - TLA) / stDur)) : -1;   // jump-cut state in the wide
    const stK = t => st(t) < 0 ? 0 : ((t - TLA) - st(t) * stDur) / stDur;                              // 0..1 inside a state
    const MIN = t => t < TL0 ? 0 : Math.round(5 + Math.pow(kT(t), 1.2) * 122);
    const STATS = B(4) - 0.85;
    const WALK0 = B(5) + 0.1, WALK1 = WALK0 + 1.0, GRAB = WALK1, TURN = GRAB + 0.3, THROW = TURN + 0.25, HIT = THROW + 0.5;
    const COVER = HIT + 0.55, WORRY = B(7) - 0.3, CHECK = B(8) - 0.3, MONT = E(9) + 0.25, PROF = MONT + 0.85, REVEAL = B(10) - 1.15;
    const D2 = 36.43, J = HIT + 0.5;
    const TICKS = [0, 1, 2, 3, 4].map(i => B(8) + (E(8) - B(8)) * (0.1 + i * 0.19));   // v2 length and the join point (frames before J are reused from v2)

    // ================= ROOM =================
    const RX = 1.6, ZB = -1.6, ZF = 2.6, H = 2.7;
    const floorTex = K.canvasTex(1024, 1024, (x, w, h) => {
      for (let i = 0; i < 12; i++) { x.fillStyle = ['#7a5638', '#83603f', '#744f33'][i % 3]; x.fillRect(0, i * 86, w, 86); }
      const r = K.rng(3); x.strokeStyle = 'rgba(30,18,10,0.4)'; x.lineWidth = 2;
      for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(0, i * 86); x.lineTo(w, i * 86); x.stroke(); for (let k = 0; k < 2; k++) { const xx = r() * w; x.beginPath(); x.moveTo(xx, i * 86); x.lineTo(xx, i * 86 + 86); x.stroke(); } }
    });
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(2, 2.4);
    rbox(RX * 2, 0.1, ZF - ZB, SM(0xffffff, 0.7, { map: floorTex }), 0, -0.05, (ZF + ZB) / 2, 0.01).castShadow = false;
    const rug = new THREE.Mesh(new THREE.CircleGeometry(0.9, 48), SM(0x2f5d62, 0.95)); rug.rotation.x = -Math.PI / 2; rug.scale.set(1.35, 0.75, 1); rug.position.set(0.05, 0.003, 1.05); rug.receiveShadow = true; S.add(rug);
    const rug2 = new THREE.Mesh(new THREE.RingGeometry(0.76, 0.82, 48), SM(0xe9d9b6, 0.95)); rug2.rotation.x = -Math.PI / 2; rug2.scale.set(1.35, 0.75, 1); rug2.position.set(0.05, 0.005, 1.05); S.add(rug2);
    const wallTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#5f7f7a'; x.fillRect(0, 0, w, h); const r = K.rng(9); for (let i = 0; i < 1800; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},0.025)`; x.fillRect(r() * w, r() * h, 2, 2); } });
    const wallTM = SM(0xffffff, 0.95, { map: wallTex });
    const WX0 = 0.72, WX1 = 1.42, WY0 = 1.05, WY1 = 2.15;
    rbox(WX0 + RX, H, 0.08, wallTM, (-RX + WX0) / 2, H / 2, ZB, 0.005);
    rbox(RX - WX1, H, 0.08, wallTM, (WX1 + RX) / 2, H / 2, ZB, 0.005);
    rbox(WX1 - WX0, WY0, 0.08, wallTM, (WX0 + WX1) / 2, WY0 / 2, ZB, 0.005);
    rbox(WX1 - WX0, H - WY1, 0.08, wallTM, (WX0 + WX1) / 2, (H + WY1) / 2, ZB, 0.005);
    rbox(0.08, H, ZF - ZB, wallTM, -RX, H / 2, (ZF + ZB) / 2, 0.005);
    rbox(0.08, H, ZF - ZB, wallTM, RX, H / 2, (ZF + ZB) / 2, 0.005);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, ZF - ZB + 3), SM(0xe9e4da, 0.95)); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, H, (ZF + ZB) / 2 + 1.5); S.add(ceil);
    const skirtM = SM(0xf1ebe0, 0.6);
    rbox(RX * 2, 0.08, 0.02, skirtM, 0, 0.04, ZB + 0.05); rbox(0.02, 0.08, ZF - ZB, skirtM, -RX + 0.05, 0.04, (ZF + ZB) / 2); rbox(0.02, 0.08, ZF - ZB, skirtM, RX - 0.05, 0.04, (ZF + ZB) / 2);

    // sky (sunset -> night)
    const SW = 512, SH = 620, skyC = document.createElement('canvas'); skyC.width = SW; skyC.height = SH; const sx = skyC.getContext('2d');
    const skyTex = new THREE.CanvasTexture(skyC); skyTex.colorSpace = THREE.SRGBColorSpace;
    const sr = K.rng(5), stars = Array.from({ length: 90 }, () => [sr() * SW, sr() * SH * 0.6, 0.4 + sr() * 0.6]);
    const blds = []; for (let layer = 0; layer < 2; layer++) for (let bx = -20; bx < SW; bx += 30 + sr() * 50) { const bw = 40 + sr() * 70, bh = [190, 130][layer] + sr() * [170, 120][layer]; const wins = [];
      for (let wy = SH - bh + 14; wy < SH - 8; wy += 20) for (let wx = bx + 8; wx < bx + bw - 10; wx += 15) if (sr() < 0.55) wins.push([wx, wy, sr(), sr() < 0.75]); blds.push({ layer, bx, bw, bh, wins }); }
    const mixC = (a, b, k) => { const pa = a.match(/\w\w/g).map(h => parseInt(h, 16)), pb = b.match(/\w\w/g).map(h => parseInt(h, 16)); return `rgb(${pa.map((v, i) => Math.round(lerp(v, pb[i], k))).join(',')})`; };
    let lastSky = -1;
    const drawSky = k => {
      k = Math.round(k * 200) / 200; if (k === lastSky) return; lastSky = k;
      const g = sx.createLinearGradient(0, 0, 0, SH), k2 = k < 0.5 ? k * 2 : (k - 0.5) * 2;
      g.addColorStop(0, mixC(k < 0.5 ? '4a6fb0' : '1d2a5c', k < 0.5 ? '1d2a5c' : '0a1030', k2));
      g.addColorStop(0.55, mixC(k < 0.5 ? 'f2a46b' : '7a4e7e', k < 0.5 ? '7a4e7e' : '1a2250', k2));
      g.addColorStop(1, mixC(k < 0.5 ? 'ffcf7a' : 'c46a5a', k < 0.5 ? 'c46a5a' : '2a2a55', k2));
      sx.fillStyle = g; sx.fillRect(0, 0, SW, SH);
      const sy = lerp(330, 700, cl(k * 2.2)); if (sy < 640) { const sg = sx.createRadialGradient(330, sy, 6, 330, sy, 120); sg.addColorStop(0, 'rgba(255,240,200,0.95)'); sg.addColorStop(0.25, 'rgba(255,200,120,0.6)'); sg.addColorStop(1, 'rgba(255,170,100,0)'); sx.fillStyle = sg; sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#fff3d6'; sx.beginPath(); sx.arc(330, sy, 34, 0, 7); sx.fill(); }
      const sa = cl((k - 0.45) * 2.2); stars.forEach(([x, y, b]) => { if (sa <= 0) return; sx.fillStyle = `rgba(255,255,255,${sa * b})`; sx.fillRect(x, y, 2, 2); });
      const mk = cl((k - 0.4) / 0.6); if (mk > 0) { const mxp = lerp(90, 300, mk), myp = lerp(460, 120, Math.sin(mk * Math.PI / 2));
        const mg = sx.createRadialGradient(mxp, myp, 4, mxp, myp, 110); mg.addColorStop(0, `rgba(255,250,230,${0.45 * mk})`); mg.addColorStop(1, 'rgba(255,250,230,0)'); sx.fillStyle = mg; sx.fillRect(0, 0, SW, SH);
        sx.fillStyle = `rgba(255,248,226,${mk})`; sx.beginPath(); sx.arc(mxp, myp, 30, 0, 7); sx.fill(); }
      blds.forEach(b => { sx.fillStyle = mixC(b.layer ? '5a4a66' : '7a6a86', b.layer ? '0b0f24' : '151a35', cl(k * 1.3)); sx.fillRect(b.bx, SH - b.bh, b.bw, b.bh);
        b.wins.forEach(([wx, wy, th, warm]) => { if (k * 1.15 < th) return; sx.fillStyle = warm ? 'rgba(255,205,125,0.9)' : 'rgba(170,205,255,0.75)'; sx.fillRect(wx, wy, 7, 10); }); });
      skyTex.needsUpdate = true;
    };
    drawSky(0);
    const skyPlane = new THREE.Mesh(new THREE.PlaneGeometry(WX1 - WX0 + 0.7, WY1 - WY0 + 0.8), new THREE.MeshBasicMaterial({ map: skyTex, toneMapped: false })); skyPlane.position.set((WX0 + WX1) / 2, (WY0 + WY1) / 2, ZB - 0.3); S.add(skyPlane);
    const frameM = SM(0xf1ebe0, 0.6);
    rbox(WX1 - WX0 + 0.08, 0.06, 0.12, frameM, (WX0 + WX1) / 2, WY0, ZB + 0.03); rbox(WX1 - WX0 + 0.08, 0.05, 0.1, frameM, (WX0 + WX1) / 2, WY1, ZB + 0.02);
    rbox(0.05, WY1 - WY0, 0.1, frameM, WX0, (WY0 + WY1) / 2, ZB + 0.02); rbox(0.05, WY1 - WY0, 0.1, frameM, WX1, (WY0 + WY1) / 2, ZB + 0.02); rbox(0.035, WY1 - WY0, 0.08, frameM, (WX0 + WX1) / 2, (WY0 + WY1) / 2, ZB + 0.02);
    rbox(WX1 - WX0 + 0.22, 0.04, 0.2, frameM, (WX0 + WX1) / 2, WY0 - 0.02, ZB + 0.1);
    cyl(0.012, 0.012, 1.0, SM(0x2b2a2e, 0.4, { metalness: 0.5 }), (WX0 + WX1) / 2, 2.32, ZB + 0.13, 8).rotation.z = Math.PI / 2;
    // curtains (slide closed when Claude draws them)
    const curtM = SM(0xd9a066, 0.95);
    const curtL = new THREE.Group(), curtR = new THREE.Group(); S.add(curtL); S.add(curtR);
    for (let i = 0; i < 4; i++) { const c = cyl(0.04, 0.055, 1.45, curtM, -i * 0.06, 1.57, ZB + 0.13, 12, curtL); c.scale.z = 0.6; const d = cyl(0.04, 0.055, 1.45, curtM, i * 0.06, 1.57, ZB + 0.13, 12, curtR); d.scale.z = 0.6; }
    const curtains = k => { curtL.position.x = lerp(WX0 - 0.06, (WX0 + WX1) / 2 - 0.2, k); curtR.position.x = lerp(WX1 + 0.06, (WX0 + WX1) / 2 + 0.2, k); curtL.scale.x = curtR.scale.x = lerp(1, 1.5, k); };

    // bed (wide enough to lie across)
    const BX = -0.2, BW = 1.7, BZ0 = ZB + 0.05, BZ1 = 0.45, BTOP = 0.5;
    const bedWood = SM(0x6a4630, 0.6);
    rbox(BW + 0.06, 0.22, BZ1 - BZ0, bedWood, BX, 0.16, (BZ0 + BZ1) / 2, 0.03);
    rbox(BW + 0.1, 1.0, 0.08, bedWood, BX, 0.62, BZ0 + 0.02, 0.03);
    rbox(BW + 0.1, 0.3, 0.06, bedWood, BX, 0.24, BZ1 + 0.02, 0.03);
    rbox(BW, 0.2, BZ1 - BZ0 - 0.04, SM(0xf4f1ea, 0.9), BX, BTOP - 0.08, (BZ0 + BZ1) / 2, 0.06);
    const duvetBack = rbox(BW + 0.04, 0.1, 0.95, SM(0xe7a64a, 0.95), BX, BTOP + 0.03, -0.95, 0.05);
    for (let i = 0; i < 3; i++) { const f = cyl(0.06, 0.06, BW - 0.1, SM(0xd99a40, 0.95), BX, BTOP + 0.07, -1.25 + i * 0.25, 16); f.rotation.z = Math.PI / 2; }
    const pilM = SM(0xf7f3ec, 0.95);
    [-0.4, 0.4].forEach(dx => { const p = rbox(0.55, 0.12, 0.3, pilM, BX + dx, BTOP + 0.08, BZ0 + 0.25, 0.06); p.rotation.x = -0.25; });
    const cushion = rbox(0.34, 0.12, 0.3, SM(0x4fa38f, 0.95), BX - 0.62, BTOP + 0.07, -0.25, 0.05); cushion.rotation.set(0.05, 0.35, 0.05);
    // duvet over Maddie (for the "under the duvet" position)
    const duvetOver = new THREE.Group(); S.add(duvetOver);
    rbox(1.2, 0.44, 0.88, SM(0xe7a64a, 0.95), 0, 0, 0, 0.18, duvetOver);
    for (let i = 0; i < 4; i++) { const f = cyl(0.055, 0.055, 1.1, SM(0xd99a40, 0.95), 0, 0.21, -0.3 + i * 0.2, 14, duvetOver); f.rotation.z = Math.PI / 2; }
    duvetOver.visible = false;

    // side table + lamp (left, back)
    const stX = -1.36, stZ = -1.2;
    rbox(0.36, 0.5, 0.34, SM(0x7a5236, 0.6), stX, 0.25, stZ, 0.02);
    cyl(0.07, 0.09, 0.03, SM(0x2b2a2e, 0.4), stX, 0.515, stZ, 20); cyl(0.012, 0.012, 0.28, SM(0x2b2a2e, 0.4), stX, 0.66, stZ, 8);
    const shadeM = SM(0xf6e6c6, 0.8, { side: THREE.DoubleSide, emissive: 0xffb760, emissiveIntensity: 0 });
    const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 0.16, 28, 1, true), shadeM); shade.position.set(stX, 0.82, stZ); S.add(shade);
    const lampL = new THREE.PointLight(0xffb766, 0, 3.0, 1.5); lampL.position.set(stX, 0.82, stZ); S.add(lampL);
    // stool with the chai tray (front-left of the bed)
    const CX = -1.22, CZ = 0.42, CY = 0.44;
    cyl(0.17, 0.17, 0.04, SM(0x8a6040, 0.5), CX, CY - 0.02, CZ, 24); [0, 2.1, 4.2].forEach(a => { const l = cyl(0.012, 0.012, CY - 0.04, SM(0x2b2a2e, 0.4, { metalness: 0.5 }), CX + Math.sin(a) * 0.12, (CY - 0.04) / 2, CZ + Math.cos(a) * 0.12, 8); l.rotation.set(Math.cos(a) * 0.1, 0, -Math.sin(a) * 0.1); });
    const glassM = SM(0xffffff, 0.08, { transparent: true, opacity: 0.45 });
    const cup = (x, z) => { const g = new THREE.Group(); g.position.set(x, CY, z); S.add(g); cyl(0.035, 0.03, 0.09, glassM, 0, 0.045, 0, 20, g); const tea = cyl(0.031, 0.028, 0.07, SM(0xb7773f, 0.4), 0, 0.037, 0, 20, g);
      const skin = new THREE.Mesh(new THREE.CircleGeometry(0.031, 20), SM(0xc99a6a, 0.9)); skin.rotation.x = -Math.PI / 2; skin.position.y = 0.073; g.add(skin); return { g, tea, skin }; };
    const cup1 = cup(CX - 0.06, CZ - 0.03), cup2 = cup(CX + 0.07, CZ + 0.04);
    const puff = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 2, 32, 32, 30); g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const mkSteam = n => Array.from({ length: n }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puff, transparent: true, opacity: 0, depthWrite: false })); S.add(s); return s; });
    const steam1 = mkSteam(6), steam2 = mkSteam(6);
    const doSteam = (arr, base, hot, t) => arr.forEach((s, i) => { const ph = ((t * 0.5 + i / arr.length) % 1); s.position.set(base.x + Math.sin(i * 2 + t * 1.3) * 0.02, base.y + 0.1 + ph * 0.25, base.z); s.scale.setScalar(0.04 + ph * 0.09); s.material.opacity = 0.3 * Math.sin(ph * Math.PI) * hot; });

    // wall clock
    const clockG = new THREE.Group(); clockG.position.set(BX, 1.98, ZB + 0.06); S.add(clockG);
    cyl(0.19, 0.19, 0.04, SM(0x1d1d22, 0.4), 0, 0, 0, 40, clockG).rotation.x = Math.PI / 2;
    const cface = new THREE.Mesh(new THREE.CircleGeometry(0.165, 40), SM(0xf6f1e7, 0.6)); cface.position.z = 0.022; clockG.add(cface);
    for (let i = 0; i < 12; i++) { const tk = new THREE.Mesh(new THREE.PlaneGeometry(i % 3 ? 0.008 : 0.016, 0.03), BM(0x1d1d22)); const a = i / 12 * Math.PI * 2; tk.position.set(Math.sin(a) * 0.14, Math.cos(a) * 0.14, 0.024); tk.rotation.z = -a; clockG.add(tk); }
    const hand = (len, w, c = 0x1d1d22) => { const g = new THREE.Group(); g.position.z = 0.026; clockG.add(g); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, len), BM(c)); m.position.y = len / 2 - 0.015; g.add(m); return g; };
    const hH = hand(0.09, 0.014), hM = hand(0.13, 0.009), hS = hand(0.14, 0.004, 0xd94a3a);
    // poster + fairy lights
    const poster = K.canvasTex(400, 560, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffb347'); g.addColorStop(1, '#ff5e62'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(255,255,255,0.15)'; x.beginPath(); x.arc(w / 2, 220, 120, 0, 7); x.fill(); x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '900 80px "Inter Display"'; x.fillText('DO IT', w / 2, 420); x.fillText('TODAY', w / 2, 500); x.font = '600 26px "Inter"'; x.fillText('NO EXCUSES', w / 2, 80); });
    rbox(0.42, 0.58, 0.015, SM(0xffffff, 0.8, { map: poster }), -1.05, 1.72, ZB + 0.05, 0.004);
    const fairy = []; for (let i = 0; i < 16; i++) { const x = -1.5 + i * 0.19, y = 2.47 - Math.sin(i / 15 * Math.PI) * 0.12 - (i % 2) * 0.02; const b = sph(0.018, BM(0xffc770), x, y, ZB + 0.07); b.castShadow = false; fairy.push(b); }
    const fairyL = new THREE.PointLight(0xffb44a, 0, 2.4, 1.7); fairyL.position.set(-0.2, 2.3, ZB + 0.3); S.add(fairyL);
    // floor plant by the window (grows absurdly tall)
    const PX = 1.24, PZ = -1.12;
    cyl(0.12, 0.09, 0.22, SM(0xd47a4a, 0.6), PX, 0.11, PZ, 24); cyl(0.11, 0.11, 0.01, SM(0x3a2a1e, 0.9), PX, 0.215, PZ, 24);
    const plant = new THREE.Group(); plant.position.set(PX, 0.22, PZ); S.add(plant);
    const stem = cyl(0.01, 0.014, 1, SM(0x3f7a3a, 0.8), 0, 0.5, 0, 8, plant);
    const leaves = Array.from({ length: 14 }, (_, i) => { const lf = sph(0.06, SM(i % 2 ? 0x3f8f4e : 0x55a85a, 0.8), 0, 0, 0, plant); return { lf, h: (i + 1) / 14, a: i * 2.4 }; });
    // laundry basket + folded stack (right front)
    const LBX = 1.22, LBZ = 0.18;
    cyl(0.17, 0.14, 0.24, SM(0xc9a77a, 0.9), LBX, 0.12, LBZ, 20);
    [0xd94a3a, 0x3b6ea5, 0xf1e6d0, 0x4fa38f].forEach((c, i) => { const s = sph(0.07, SM(c, 0.95), LBX - 0.06 + (i % 2) * 0.1, 0.25 + Math.floor(i / 2) * 0.03, LBZ - 0.04 + (i % 3) * 0.04); s.scale.set(1.2, 0.5, 1); });
    const folded = Array.from({ length: 5 }, (_, i) => rbox(0.2, 0.035, 0.16, SM([0x3b6ea5, 0xd94a3a, 0xf1e6d0, 0x2f3e5c, 0x4fa38f][i], 0.95), 0.92, 0.018 + i * 0.037, 0.62, 0.012));
    // dustbin (left, near the stool)
    const bin = new THREE.Group(); S.add(bin);
    cyl(0.08, 0.065, 0.2, SM(0x3a3d46, 0.6), 0, 0.1, 0, 18, bin); cyl(0.085, 0.085, 0.015, SM(0x2a2c33, 0.5), 0, 0.2, 0, 18, bin);
    const crumple = sph(0.03, SM(0xf1ede4, 0.9), 0.02, 0.22, 0.01, bin);
    // bookshelf on the right wall (front) for the book throw
    const BSX = 1.42, BSZ = 0.88;
    rbox(0.28, 1.0, 0.42, SM(0x6a4630, 0.6), BSX, 0.5, BSZ, 0.02);
    [0.24, 0.52, 0.8].forEach(y => rbox(0.26, 0.02, 0.4, SM(0x5a3a26, 0.6), BSX - 0.01, y, BSZ, 0.005));
    for (let s = 0; s < 3; s++) for (let i = 0; i < 6; i++) { const bh = 0.14 + ((i * 7 + s * 3) % 5) * 0.015; const b = rbox(0.16, bh, 0.045, SM([0xd94a3a, 0x3b6ea5, 0xe9c46a, 0x4fa38f, 0x8a5cc7, 0xf28c28][(i + s) % 6], 0.7), BSX - 0.02, [0.25, 0.53, 0.81][s] + bh / 2, BSZ - 0.16 + i * 0.062, 0.006); }

    // ================= MADDIE + PHONE =================
    const MZ = 0.22;
    const M = K.makeToyMaddie({ seatY: BTOP + 0.02, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); S.add(M.g);
    M.g.rotation.order = 'YXZ';
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });   // no blush dots
    const SEAT = BTOP + 0.02;
    // phone: bigger, bright purple case so it reads in every shot
    const phone = new THREE.Group(); S.add(phone);
    rbox(0.11, 0.215, 0.014, SM(0x7b5cff, 0.4), 0, 0, -0.002, 0.016, phone);
    rbox(0.1, 0.205, 0.004, SM(0x0b0b10, 0.2), 0, 0, 0.006, 0.012, phone);
    rbox(0.035, 0.035, 0.006, SM(0x2a2140, 0.3), 0.025, 0.07, -0.011, 0.008, phone);       // camera bump
    const pScrC = document.createElement('canvas'); pScrC.width = 300; pScrC.height = 600; const psx = pScrC.getContext('2d');
    const pTex = new THREE.CanvasTexture(pScrC); pTex.colorSpace = THREE.SRGBColorSpace;
    const pScr = new THREE.Mesh(new THREE.PlaneGeometry(0.094, 0.196), new THREE.MeshBasicMaterial({ map: pTex, toneMapped: false })); pScr.position.z = 0.0085; phone.add(pScr);
    const phoneL = new THREE.PointLight(0xaecbff, 0.5, 0.9, 1.8); S.add(phoneL);
    // the book (on the shelf -> in Claude's hand -> flying -> in Maddie's lap)
    const coverTex = K.canvasTex(256, 340, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#ff8a4c'); g.addColorStop(1, '#e0563a'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(0, 0, 18, h); x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '900 34px "Inter Display"'; x.fillText('HOW TO', w / 2, 70); x.fillText('MAKE REELS', w / 2, 110);
      x.font = '600 20px "Inter"'; x.fillText('(not watch them)', w / 2, 140); x.fillStyle = '#ffd36a'; x.beginPath(); x.roundRect(88, 180, 80, 62, 14); x.fill(); x.fillStyle = '#3c3a3e'; x.beginPath(); x.arc(112, 210, 9, 0, 7); x.arc(144, 210, 9, 0, 7); x.fill(); });
    const book = new THREE.Group(); S.add(book);
    rbox(0.13, 0.17, 0.035, SM(0xe0663a, 0.6), 0, 0, 0, 0.006, book);
    rbox(0.122, 0.162, 0.03, SM(0xf6efe0, 0.8), 0.004, 0, 0, 0.004, book);
    const bc = new THREE.Mesh(new THREE.PlaneGeometry(0.128, 0.168), SM(0xffffff, 0.6, { map: coverTex })); bc.position.z = 0.0181; book.add(bc);

    // ================= CLAUDE (walks around) =================
    const RH = 0.58, R = K.makeRobo({ height: RH }); S.add(R.g);
    const RS = RH / 1.05;
    const hold = new THREE.Group(); hold.scale.setScalar(1 / RS); R.g.add(hold);        // world-unit props in Claude's "hands"
    // props
    const broom = new THREE.Group(); hold.add(broom); broom.position.set(0.17, 0.0, 0.12);
    cyl(0.008, 0.008, 0.62, SM(0xb07a4a, 0.6), 0, 0.31, 0, 8, broom); const bristle = rbox(0.13, 0.08, 0.05, SM(0xe9c46a, 0.9), 0, 0.03, 0, 0.01, broom);
    const can = new THREE.Group(); hold.add(can); can.position.set(0.17, 0.2, 0.12);
    cyl(0.045, 0.05, 0.08, SM(0x3fa58a, 0.5), 0, 0, 0, 18, can); const spout = cyl(0.008, 0.011, 0.12, SM(0x3fa58a, 0.5), 0, 0.02, 0.07, 8, can); spout.rotation.x = 1.0;
    const drops = Array.from({ length: 7 }, () => { const d = sph(0.008, SM(0x9fd3ff, 0.2, { transparent: true, opacity: 0.85 }), 0, 0, 0); d.castShadow = false; return d; });
    const shirt = rbox(0.2, 0.02, 0.16, SM(0xd94a3a, 0.95), 0, 0.24, 0.16, 0.01, hold);
    const heldCup = new THREE.Group(); hold.add(heldCup); heldCup.position.set(0.16, 0.2, 0.12);
    cyl(0.035, 0.03, 0.09, glassM, 0, 0, 0, 20, heldCup); cyl(0.031, 0.028, 0.07, SM(0xb7773f, 0.4), 0, -0.008, 0, 20, heldCup);
    const dusts = mkSteam(5); dusts.forEach(d => d.material.color.setHex(0xd8cbb0));

    // walking: keyframes [t, x, z, yaw]; between keys he waddles
    const yawTo = (x, z, tx, tz) => Math.atan2(tx - x, tz - z);
    const R_HOOK = [0.58, 0.56], R_STARE = [0.42, 1.02], S_YAW = -0.75;
    const SPOTS = [   // [x, z, yaw] per time-lapse state
      [0.25, 0.98, 0.4], [PX - 0.3, PZ + 0.32, yawTo(PX - 0.3, PZ + 0.32, PX, PZ)], [LBX - 0.32, LBZ + 0.3, yawTo(LBX - 0.32, LBZ + 0.3, 0.92, 0.62) + 0.5],
      [(WX0 + WX1) / 2, -1.1, Math.PI], [stX + 0.05, stZ + 0.62, Math.PI], [CX + 0.34, CZ + 0.16, yawTo(CX + 0.34, CZ + 0.16, CX, CZ)], [-0.9, 0.9, -1.2]];
    const robo = t => {
      // returns {x, z, yaw, walking}
      if (t < TLA) return { x: R_HOOK[0], z: R_HOOK[1], yaw: yawTo(R_HOOK[0], R_HOOK[1], BX, MZ) + (t > TL0 ? 0 : 0), walking: 0 };
      const s = st(t);
      if (s >= 0) { const [x, z, yaw] = SPOTS[s];
        if (s === 6) { const k = stK(t); return k < 0.5 ? { x: lerp(-0.9, -1.25, k * 2), z: lerp(0.9, 0.75, k * 2), yaw: -1.3, walking: 1 } : { x: R_STARE[0], z: R_STARE[1], yaw: S_YAW, walking: 0 }; }
        return { x, z, yaw, walking: s === 0 ? 0.35 : 0 }; }
      if (t < WALK0) return { x: R_STARE[0], z: R_STARE[1], yaw: S_YAW, walking: 0 };
      const SH = [BSX - 0.3, BSZ - 0.08];
      if (t < WALK1) { const k = ez(pr(t, WALK0, WALK1)); return { x: lerp(R_STARE[0], SH[0], k), z: lerp(R_STARE[1], SH[1], k), yaw: yawTo(R_STARE[0], R_STARE[1], SH[0], SH[1]), walking: 1 }; }
      const faceShelf = Math.PI / 2, faceMad = -1.2;
      if (t < TURN) return { x: SH[0], z: SH[1], yaw: faceShelf, walking: 0 };
      return { x: SH[0], z: SH[1], yaw: lerp(faceShelf, faceMad, eo(pr(t, TURN, TURN + 0.25))), walking: 0 };
    };

    // ================= LIGHT =================
    const hemi = new THREE.HemisphereLight(0xffe2c4, 0x3a2a1e, 0.9); S.add(hemi);
    const sun = new THREE.DirectionalLight(0xffa860, 1.6); sun.position.set(1.4, 1.6, -3.4); sun.target.position.set(-0.2, 0.7, 0.3); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0005; S.add(sun); S.add(sun.target);
    const moon = new THREE.DirectionalLight(0x9fb6ff, 0); moon.position.set(1.0, 2.4, -3.4); moon.target.position.set(-0.2, 0.6, 0.3); S.add(moon); S.add(moon.target);
    const key = new THREE.DirectionalLight(0xfff1e2, 0.8); key.position.set(-0.4, 2.2, 3.4); key.target.position.set(0.1, 0.8, 0); S.add(key); S.add(key.target);
    const fill = new THREE.DirectionalLight(0xcfe0ff, 0.3); fill.position.set(2.2, 1.2, 1.6); S.add(fill);
    const night = t => t < TL0 ? 0 : t < TL1 ? eo(kT(t)) : 1;
    const lampOnAt = TLA + 4 * stDur + stDur * 0.45, curtAt = TLA + 3 * stDur;
    const lights = t => { const n = night(t);
      hemi.intensity = lerp(0.9, 0.5, n); hemi.color.setHex(n > 0.5 ? 0x8fa0d8 : 0xffe2c4);
      sun.intensity = lerp(1.6, 0, cl(n * 1.6)); moon.intensity = lerp(0, 0.6, cl((n - 0.3) * 1.6));
      key.intensity = lerp(0.8, 0.5, n); key.color.setHex(n > 0.5 ? 0xc6d4ff : 0xfff1e2);
      const lampOn = t >= lampOnAt ? 1 : 0; lampL.intensity = 0.95 * lampOn; shadeM.emissiveIntensity = 0.55 * lampOn;
      fairyL.intensity = 0.55 * lampOn; fairy.forEach((b, i) => b.material.color.setHSL(0.1, 1, 0.2 + lampOn * (0.4 + 0.1 * Math.sin(t * 1.5 + i * 1.3))));
      curtains(t < curtAt ? 0 : ez(pr(t, curtAt + stDur * 0.15, curtAt + stDur * 0.85)));
      drawSky(n); };

    // ================= MADDIE POSES =================
    // SIT: on the bed edge. BACK: on his back across the bed, legs up. SIDE: curled on his side, facing us.
    // UPSIDE: on his back, head hanging off the foot of the bed. DUVET: SIDE, under the duvet.
    const POSES = ['SIT', 'BACK', 'SIDE', 'BED', 'DUVET', 'SIDE2', 'SIT'];
    const setPose = (p, t) => {
      const g = M.g; duvetOver.visible = false;
      if (p === 'SIT') { g.rotation.set(0, 0, 0); g.position.set(BX, 0, MZ); }
      else if (p === 'BACK') { g.rotation.set(-Math.PI / 2, Math.PI / 2, 0); g.position.set(0.12 + SEAT, BTOP + 0.16, -0.45); }
      else if (p === 'SIDE' || p === 'DUVET') { g.rotation.set(0, 0, Math.PI / 2); g.position.set(0.18 + SEAT, BTOP + 0.2, -0.32);
        if (p === 'DUVET') { duvetOver.visible = true; duvetOver.position.set(0.24, BTOP + 0.22, -0.2); } }
      else if (p === 'SIDE2') { g.rotation.set(0, 0, -Math.PI / 2); g.position.set(-0.42 - SEAT, BTOP + 0.2, -0.32); }
      else if (p === 'BED') { g.rotation.set(0, 0, 0); g.position.set(BX + 0.25, BTOP + 0.07 - SEAT, -1.12); }
      else if (p === 'UPSIDE') { g.rotation.set(-Math.PI / 2, Math.PI, 0); g.position.set(BX, BTOP + 0.16, -0.12 - SEAT); }
    };
    const LOOK = { BED: [0, 0.38], SIT: [0, 0.42], BACK: [0.0, -0.05], SIDE: [0.0, 0.18], SIDE2: [0.0, 0.18], UPSIDE: [0.0, -0.3], DUVET: [0.0, 0.18] };

    // ================= ACTING =================
    const hw = new THREE.Vector3(), hw2 = new THREE.Vector3(), headW = new THREE.Vector3(), camW = new THREE.Vector3(), mid = new THREE.Vector3(), tgt = new THREE.Vector3();
    const phoneDown = t => (t >= B(2) - 0.15 && t < B(5) - 0.2);
    const bonked = t => t >= HIT && t < MONT;
    let mYaw = 0, mPitch = 0.42, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.55;
      const k = last < 0 ? 1 : cl((t - last) * 3.5); last = t;
      const s = st(t), pose = s >= 0 ? POSES[s] : 'SIT';
      setPose(pose, t);
      const down = phoneDown(t) || bonked(t);
      const inTL = t >= TL0 && t < TL1;
      let [ty, tp] = LOOK[pose];
      if (pose === 'SIT') { if (down) { ty = (t >= B(3) - 0.2 && t < B(4) + 0.9) ? 0.4 : 0; tp = -0.02; }
        if (t >= WALK0 && t < THROW + 0.2 && !phoneDown(t)) { ty = 0; tp = 0.42; }
        if (bonked(t)) { if (t < COVER) { ty = 0.35; tp = 0.0; } else if (t < WORRY) { ty = 0; tp = 0.38; } else if (t < CHECK) { ty = 0.12; tp = 0.02; } else { ty = 0.55; tp = 0.08; } } }
      if (inTL) { mYaw = ty + Math.sin(t * 3) * 0.03; mPitch = tp; } else { mYaw = sm(mYaw, ty, k); mPitch = sm(mPitch, tp, k); }
      const face = (t >= B(4) - 0.3 && t < E(4) + 0.5) ? 'shock' : (t >= HIT && t < HIT + 1.0) ? 'shock' : (t >= WORRY && t < CHECK) ? 'worried' : (t >= CHECK + 1.5 && t < MONT) ? 'smile' : t >= MONT ? 'smile' : (t >= B(2) - 0.2 && t < B(3)) ? 'smile' : (t >= B(5) - 0.2 && t < E(5) + 0.3) ? 'smile'
        : t < E(0) + 0.3 ? 'smile' : (t >= COVER && t < WORRY) ? 'neutral' : (inTL && kT(t) > 0.6) ? 'worried' : 'neutral';
      M.update(t, { talk: mT * 0.9, face, look: [mYaw, mPitch], type: 0, lean: pose === 'BED' ? -0.25 : pose === 'SIT' && !down ? (inTL && t >= TLA ? 0.45 : 0.25) : (pose === 'SIT' ? 0.05 : 0) });
      if (bonked(t)) { const w = K.wobble(t, HIT, 0.22, 18, 4); M.head.rotation.z += w; M.head.rotation.x += Math.abs(w) * 0.5; }
      const [aL, aR] = M.arms;
      if (down && !(bonked(t))) {
        const k2 = eo(pr(t, B(2) - 0.15, B(2) + 0.5));
        aL.sh.rotation.set(lerp(-0.1, 0.05, k2), lerp(0.42, 0.2, k2), -0.05); aL.el.rotation.x = lerp(-1.05, -0.35, k2);
        aR.sh.rotation.set(lerp(-0.1, 0.05, k2), lerp(-0.42, -0.2, k2), 0.05); aR.el.rotation.x = lerp(-1.05, -0.35, k2);
      } else if (bonked(t)) {           // holding the book in his lap
        aL.sh.rotation.set(0.0, 0.42, -0.05); aL.el.rotation.x = t >= COVER ? -0.75 : -0.45; aR.sh.rotation.set(0.0, -0.42, 0.05); aR.el.rotation.x = t >= COVER ? -0.75 : -0.45;
      } else {
        const up = (t >= B(5) - 0.2 && t < HIT) ? eo(pr(t, B(5) - 0.2, B(5) + 0.4)) : 1;
        const scroll = Math.max(0, Math.sin(t * (inTL ? 9 : 2.6))) * 0.05;
        const lift = pose === 'SIT' ? 0 : 0.25;        // lying: arms reach a bit further to hold the phone up
        aL.sh.rotation.set(-0.1 - lift, lerp(0.2, 0.42, up), -0.05); aL.el.rotation.x = lerp(-0.35, -1.05, up) + lift * 0.6;
        aR.sh.rotation.set(-0.1 - lift, lerp(-0.2, -0.42, up), 0.05); aR.el.rotation.x = lerp(-0.35, -1.05, up) + lift * 0.6 - scroll;
      }
      M.g.updateMatrixWorld(true);
      aL.hand.getWorldPosition(hw); aR.hand.getWorldPosition(hw2); M.head.getWorldPosition(headW); K.cam.getWorldPosition(camW);
      mid.copy(hw).add(hw2).multiplyScalar(0.5);
      // phone: between his hands, screen turned halfway between his face and the camera so we can see it
      if (bonked(t)) { const k3 = eo(pr(t, HIT, HIT + 0.35)); phone.position.set(lerp(mid.x, BX + 0.38, k3), lerp(mid.y, BTOP + 0.012, ei(k3)), lerp(mid.z, MZ - 0.05, k3)); phone.rotation.set(lerp(0, -Math.PI / 2, k3), 0, lerp(0, 0.6, k3)); }
      else if (down) { phone.position.copy(mid).add(V(0, 0.03, 0.02)); phone.rotation.set(-1.25, 0, 0); }
      else { phone.position.copy(mid).add(tgt.copy(mid).sub(headW).normalize().multiplyScalar(0.02));
        tgt.copy(headW).lerp(camW, (t >= TL0 && t < TLA) ? 0.62 : pose === 'SIT' ? 0.35 : 0.5); phone.lookAt(tgt); }
      phoneL.position.copy(phone.position).add(tgt.copy(headW).sub(phone.position).multiplyScalar(0.4));
      phoneL.intensity = down ? 0 : lerp(0.35, 0.6, night(t)) + 0.06 * Math.sin(t * 7.3) * Math.sin(t * 2.1);

      // ---- Claude ----
      const r = robo(t), wk = r.walking, ph = t * 9;
      R.g.position.set(r.x, Math.abs(Math.sin(ph)) * 0.025 * wk, r.z); R.g.rotation.set(0, r.yaw, Math.sin(ph) * 0.09 * wk);
      let look = [0, 0.12];
      if (t < TLA || (t >= TL1 && t < WALK0) || (s === 6 && stK(t) >= 0.5)) look = [0, -0.35];         // looking up at Maddie
      if (s === 3) look = [0, -0.5]; if (s === 1) look = [0, -0.2]; if (s === 0 || s === 2 || s === 5) look = [0, 0.25];
      if (t >= TURN) look = [0, -0.3];
      if (t >= CHECK && t < MONT) look = [0.1, -0.15];
      R.update(t, { talk: rT, look, mood: 'calm', glow: false });
      R.head.rotation.z += 0.12 * K.pulse(t, B(1) - 0.1, 1.0) + K.wobble(t, B(3) - 0.25, 0.06, 20, 6);
      if (s === 6 && stK(t) >= 0.5) R.head.rotation.z += 0.12;
      TICKS.forEach(tk => { R.head.rotation.x += 0.14 * K.pulse(t, tk - 0.05, 0.35); });                                            // unimpressed tilt
      // props on/off per state
      broom.visible = s === 0; can.visible = s === 1; shirt.visible = s === 2; heldCup.visible = s === 5 && stK(t) < 0.55;
      if (s === 0) { broom.rotation.z = Math.sin(t * 10) * 0.35; broom.rotation.x = -0.35; }
      dusts.forEach((d, i) => { const p2 = ((t * 1.2 + i / dusts.length) % 1); d.position.set(r.x + 0.16 + Math.sin(i * 3) * 0.08, 0.03 + p2 * 0.12, r.z + 0.25 + Math.cos(i * 2) * 0.05); d.scale.setScalar(0.04 + p2 * 0.08); d.material.opacity = s === 0 ? 0.5 * Math.sin(p2 * Math.PI) : 0; });
      if (s === 1) { can.rotation.set(0.7 + Math.sin(t * 5) * 0.05, 0, 0); hold.updateMatrixWorld(true); const sp = V(0, 0.07, 0.14); can.localToWorld(sp);
        drops.forEach((d, i) => { const p2 = (t * 2.5 + i / drops.length) % 1; d.visible = true; d.position.set(sp.x + Math.sin(i) * 0.01, sp.y - p2 * 0.3, sp.z + p2 * 0.06); }); }
      else drops.forEach(d => d.visible = false);
      if (s === 2) { shirt.position.y = 0.24 + Math.abs(Math.sin(t * 6)) * 0.05; shirt.rotation.z = Math.sin(t * 6) * 0.3; }
      const stackN = t < TLA + 2 * stDur ? 2 : t < TLA + 3 * stDur ? 2 + Math.floor(stK(t) * 3.99) : 5;
      folded.forEach((f, i) => f.visible = i < stackN);
      // dustbin: by the stool, carried away in state 6, gone after
      if (s === 6 && stK(t) < 0.5) { bin.visible = true; hold.updateMatrixWorld(true); const bp = V(0.16, 0.0, 0.1); hold.localToWorld(bp); bin.position.copy(bp); }
      else { bin.visible = t < TLA + 6 * stDur; bin.position.set(-0.98, 0, 1.05); }
      // plant grows
      const pg = t < TLA ? 0.35 : t < TL1 ? lerp(0.35, 1.7, eo(pr(t, TLA, TL1))) : 1.7;
      stem.scale.y = pg; stem.position.y = pg / 2;
      leaves.forEach(({ lf, h, a }) => { lf.position.set(Math.sin(a) * 0.09 * (0.5 + h), pg * h, Math.cos(a) * 0.07 * (0.5 + h)); lf.rotation.set(0, a, 0.5); lf.scale.set(1.3, 0.35, 0.7); lf.visible = pg * h > 0.05; });
      // chai: cup 1 steams then goes cold; cup 2 arrives with Claude in state 5, steams, then cold
      const hot1 = t < TL0 ? 1 : 1 - cl(kT(t) / 0.3);
      doSteam(steam1, cup1.g.position, hot1, t); cup1.skin.visible = hot1 < 0.1; cup1.tea.material.color.setHex(hot1 > 0.3 ? 0xb7773f : 0xa77a55);
      const c2at = TLA + 5 * stDur + stDur * 0.55; cup2.g.visible = t >= c2at;
      const hot2 = t < c2at ? 0 : 1 - cl((t - c2at) / (stDur * 1.6)); doSteam(steam2, cup2.g.position, hot2, t); cup2.skin.visible = t >= c2at && hot2 < 0.1;
      // the book
      const SHB = V(BSX - 0.12, 0.6, BSZ + 0.02);
      if (t < GRAB) { book.position.copy(SHB); book.rotation.set(0, Math.PI / 2, 0); book.visible = t >= WALK0 - 0.01 || true; }
      else if (t < THROW) { hold.updateMatrixWorld(true); const bp = V(0.15, 0.28, 0.14); hold.localToWorld(bp); book.position.copy(bp); book.rotation.set(0, r.yaw, 0.3); }
      else if (t < HIT) { const k4 = pr(t, THROW, HIT); hold.updateMatrixWorld(true); const p0 = V(0.15, 0.32, 0.14); hold.localToWorld(p0); const p1 = V(BX + 0.05, 1.42, MZ + 0.05);
        book.position.lerpVectors(p0, p1, k4); book.position.y += Math.sin(k4 * Math.PI) * 0.45; book.rotation.set(k4 * 9, r.yaw + k4 * 2, k4 * 4); }
      else if (t >= MONT) { book.position.set(BX + 0.42, BTOP + 0.035, MZ - 0.12); book.rotation.set(-Math.PI / 2, 0, 0.5); }
      else { const k5 = eo(pr(t, HIT, HIT + 0.45)); const p1 = V(BX + 0.05, 1.42, MZ + 0.05);
        const lap = mid.clone().add(V(0, 0.06, 0.03)); book.position.lerpVectors(p1, lap, k5); book.position.y += Math.sin(k5 * Math.PI) * 0.1;
        book.rotation.set(lerp(9, t >= COVER ? -0.55 : -1.35, k5), 0, 0); }
      // wall clock 7:00 -> 9:07 PM, frantic seconds hand in the time-lapse
      const wall = 19 * 60 + (t >= TL0 ? MIN(t) - 5 : 0);
      hM.rotation.z = -((wall % 60) / 60) * Math.PI * 2; hH.rotation.z = -(((wall / 60) % 12) / 12) * Math.PI * 2;
      hS.rotation.z = inTL ? -t * 40 : -Math.floor(t) / 60 * Math.PI * 2;
    };

    // ================= PHONE SCREEN =================
    const REELS = [
      ['cat falls asleep mid-meow', '😹', '#ff9a8b', '#ff6a88'], ['PART 2', '👀', '#4facfe', '#00f2fe'], ['Hyderabad biryani ranking', '🍗', '#f6d365', '#fda085'],
      ['how pyramids were built', '🔺', '#c2a36b', '#7a5a2e'], ["cousin's friend's wedding", '💃', '#f093fb', '#f5576c'], ["10 signs you're a genius", '🧠', '#a18cd1', '#fbc2eb'],
      ['satisfying soap cutting', '🧼', '#84fab0', '#8fd3f4'], ['dog vs cucumber', '🐶', '#ffecd2', '#fcb69f'], ['street food in 60s', '🌶️', '#ff512f', '#dd2476'],
      ['PART 47', '👀', '#30cfd0', '#330867'], ['this ad again', '📢', '#d4fc79', '#96e6a1'], ['cricket edit', '🏏', '#667eea', '#764ba2']];
    const swipe = t => t < TL0 ? Math.min(1.2, Math.max(0, (t - (E(0) - 0.2)) * 0.25)) : 1.2 + Math.pow(kT(t), 1.6) * 60;
    const drawReel = (ctx, idx, x, y, w, h) => {
      const r = REELS[((idx % REELS.length) + REELS.length) % REELS.length];
      const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, r[2]); g.addColorStop(1, r[3]); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      ctx.save(); ctx.globalAlpha *= 0.18; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + w * 0.7, y + h * 0.25, w * 0.35, 0, 7); ctx.fill(); ctx.restore();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = `${Math.round(w * 0.34)}px "Noto Color Emoji", sans-serif`; ctx.fillText(r[1], x + w / 2, y + h * 0.42);
      ctx.fillStyle = '#fff'; ctx.font = `800 ${Math.round(w * 0.07)}px "Inter Display", sans-serif`; ctx.textAlign = 'left';
      const words = r[0].split(' '); let line = ''; const lines = [];
      words.forEach(wd => { const tt = line ? line + ' ' + wd : wd; if (ctx.measureText(tt).width > w * 0.72 && line) { lines.push(line); line = wd; } else line = tt; }); lines.push(line);
      lines.forEach((ln, i) => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 8; ctx.fillText(ln, x + w * 0.07, y + h * 0.78 + i * w * 0.085); ctx.restore(); });
      ['♥', '💬', '➤'].forEach((ic, i) => { ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.font = `${Math.round(w * 0.075)}px "Noto Color Emoji", "Inter", sans-serif`; ctx.textAlign = 'center'; ctx.fillText(ic, x + w * 0.9, y + h * (0.5 + i * 0.1)); });
    };
    const drawFeed = (ctx, x, y, w, h, t) => {
      const p = swipe(t), i = Math.floor(p), f = p - i, off = ez(cl(f / 0.4)) * h;
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
      drawReel(ctx, i, x, y - off, w, h); drawReel(ctx, i + 1, x, y + h - off, w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x, y + h - 6, w, 3); ctx.fillStyle = '#fff'; ctx.fillRect(x, y + h - 6, w * ((t * 0.7) % 1), 3);
      ctx.restore();
    };
    const drawPhoneScreen = t => { if (phoneDown(t) || bonked(t)) { psx.fillStyle = '#050507'; psx.fillRect(0, 0, 300, 600); } else drawFeed(psx, 0, 0, 300, 600, t); pTex.needsUpdate = true; };

    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const TWO = [P([0.24, 1.34, 4.7], [0.24, 0.98, -0.1], 40), P([0.24, 1.32, 4.45], [0.24, 0.98, -0.1], 40)];
    const OVER = [P([BX + 1.55, 1.25, MZ + 2.15], [BX - 0.05, 1.08, MZ + 0.3], 32), P([BX + 1.42, 1.23, MZ + 1.98], [BX - 0.05, 1.08, MZ + 0.3], 31)];
    const WIDE = [P([-0.04, 1.52, 5.0], [-0.04, 0.9, -0.3], 54), P([-0.04, 1.52, 5.0], [-0.04, 0.9, -0.3], 54)];
    const MAD = [P([BX - 0.05, 1.36, 2.85], [BX, 1.18, MZ], 32), P([BX - 0.05, 1.35, 2.65], [BX, 1.18, MZ], 32)];
    const ROBO = [P([R_STARE[0] - 0.92, 0.58, R_STARE[1] + 1.0], [R_STARE[0], 0.5, R_STARE[1]], 34), P([R_STARE[0] - 0.86, 0.58, R_STARE[1] + 0.92], [R_STARE[0], 0.5, R_STARE[1]], 34)];
    const STAT = [P([R_STARE[0] - 1.1, 0.62, R_STARE[1] + 1.25], [R_STARE[0], 0.74, R_STARE[1]], 38), P([R_STARE[0] - 1.04, 0.62, R_STARE[1] + 1.17], [R_STARE[0], 0.74, R_STARE[1]], 38)];
    const NOWAY = [P([BX + 0.02, 1.34, 2.95], [BX, 1.46, MZ], 30), P([BX + 0.02, 1.34, 2.75], [BX, 1.46, MZ], 30)];
    const THR = [P([0.36, 1.32, 4.75], [0.44, 0.92, 0.3], 48), P([0.36, 1.32, 4.6], [0.44, 0.92, 0.3], 48)];
    const SHELF = [P([BSX - 0.3 - 1.62, 0.7, BSZ - 0.08 + 0.68], [BSX - 0.3, 0.55, BSZ - 0.08], 34), P([BSX - 0.3 - 1.52, 0.7, BSZ - 0.08 + 0.64], [BSX - 0.3, 0.55, BSZ - 0.08], 34)];
    const WOR = [P([BX - 0.32, 1.32, 2.55], [BX + 0.2, 1.24, MZ], 32), P([BX - 0.3, 1.32, 2.4], [BX + 0.2, 1.24, MZ], 32)];
    const ROBO2 = [P([BSX - 0.3 - 1.95, 0.66, BSZ - 0.08 + 0.8], [BSX - 0.3, 0.6, BSZ - 0.08], 38), P([BSX - 0.3 - 1.82, 0.66, BSZ - 0.08 + 0.75], [BSX - 0.3, 0.6, BSZ - 0.08], 38)];
    const MPOST = [P([BX + 0.05, 1.3, 2.8], [BX, 1.12, MZ], 34), P([BX + 0.05, 1.3, 2.6], [BX, 1.12, MZ], 34)];
    const COV = [P([BX + 0.05, 1.25, 2.75], [BX, 1.52, MZ], 32), P([BX + 0.05, 1.25, 2.6], [BX, 1.52, MZ], 32)];
    const plan = [
      [0, TL0, TWO], [TL0, TLA, OVER], [TLA, TL1 + 0.15, WIDE],
      [TL1 + 0.15, B(3) - 0.3, MAD], [B(3) - 0.3, STATS - 0.05, ROBO], [STATS - 0.05, B(4) - 0.05, STAT], [B(4) - 0.05, B(5) - 0.35, NOWAY],
      [B(5) - 0.35, HIT + 0.55, THR], [COVER, WORRY, COV], [WORRY, CHECK, WOR], [CHECK, MONT, ROBO2], [MONT, REVEAL, MPOST], [REVEAL, D + 5, MPOST],
    ];
    const smooth = k => k * k * (3 - 2 * k);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth }));
    const cuts = [TL0, TLA, TL1 + 0.15];
    for (let i = 1; i < NST; i++) cuts.push(TLA + i * stDur);    // time-lapse jump cuts: quick flash
    const fade = t => { let a = 0; cuts.forEach((c, i) => { const d = Math.abs(t - c), w = i < 3 ? 0.2 : 0.06; if (d < w) a = Math.max(a, (1 - d / w) * (i < 3 ? 0.75 : 0.35)); }); return a; };

    // ================= HUD =================
    S.add(K.cam);
    const HW = 1080, HH = 1920, hc = document.createElement('canvas'); hc.width = HW; hc.height = HH; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, depthTest: false, depthWrite: false, toneMapped: false }));
    hud.renderOrder = 1000; K.cam.add(hud);
    const ACC = '#ffc53d', RED = '#ff5a5f', GRN = '#3ddc97', INK = 'rgba(14,14,20,0.88)', TXT = '#fbf7f0', DIM = 'rgba(251,247,240,0.65)', PAPER = 'rgba(236,232,224,0.97)';
    const IG = ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5'];
    const F = (s, w = 400, fam = '"Inter", "DejaVu Sans"') => `${w} ${s}px ${fam}`;
    const txt = (s, x, y, size, col, w = 400, align = 'left', a = 1, fam) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam); h.fillStyle = col; h.textAlign = align; h.textBaseline = 'middle'; h.fillText(s, x, y); h.restore(); };
    const fin = (t, t0, d = 0.5) => eo(pr(t, t0, t0 + d));
    const pop = (t, t0, d = 0.45) => eb(pr(t, t0, t0 + d));
    const card = (x, y, w, hh, r = 30, fill = INK, stroke = 'rgba(255,255,255,0.12)') => { h.fillStyle = fill; h.beginPath(); h.roundRect(x, y, w, hh, r); h.fill(); if (stroke) { h.strokeStyle = stroke; h.lineWidth = 2; h.stroke(); } };
    const chip = (s, x, y, size, bg, fg, a = 1, sc = 1, w = 700) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w); const tw = h.measureText(s).width + size * 1.2, th = size * 1.75;
      h.translate(x, y); h.scale(sc, sc); h.fillStyle = bg; h.beginPath(); h.roundRect(-tw / 2, -th / 2, tw, th, th / 2); h.fill(); h.fillStyle = fg; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 2); h.restore(); };
    const igGrad = (x0, x1) => { const g = h.createLinearGradient(x0, 0, x1, 0); IG.forEach((c, i) => g.addColorStop(i / (IG.length - 1), c)); return g; };
    const toScreen = v => { const p = v.clone().project(K.cam); return [(p.x + 1) / 2 * HW, (1 - p.y) / 2 * HH]; };
    const hm = m => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
    const clockStr = m => { const H24 = Math.floor(m / 60), mm = m % 60, h12 = ((H24 + 11) % 12) + 1; return `${h12}:${String(mm).padStart(2, '0')} ${H24 >= 12 ? 'PM' : 'AM'}`; };
    const wallMin = t => 19 * 60 + (t >= TL0 ? MIN(t) - 5 : 0);
    const clampX = (x, m = 150) => Math.min(HW - m, Math.max(m, x));

    const drawPOV = t => {
      const a = Math.min(fin(t, 0.05, 0.4), 1 - pr(t, TL0 - 0.3, TL0)); if (a <= 0) return;
      h.save(); h.globalAlpha = a; const y = 230 + (1 - fin(t, 0.05, 0.5)) * -30;
      card(90, y - 90, 900, 250, 34, PAPER, null);
      txt('POV: you open Instagram', 540, y - 18, 58, '#111', 800, 'center', 1, '"Inter Display"');
      txt('for 5 minutes', 540, y + 62, 58, '#111', 800, 'center', 1, '"Inter Display"');
      const ul = eo(pr(t, 0.45, 1.0)); h.fillStyle = igGrad(310, 770); h.fillRect(540 - 230 * ul, y + 108, 460 * ul, 9);
      chip('🕖  7:00 PM', 540, y + 230, 34, 'rgba(14,14,20,0.8)', TXT, fin(t, 0.6, 0.4), 1, 700);
      h.restore();
    };
    const drawOverHUD = t => {
      const a = Math.min(fin(t, TL0, 0.3), 1 - pr(t, TLA - 0.2, TLA)); if (a <= 0) return;
      const m = MIN(t); chip(`⏱  Screen time ${hm(m)}`, 540, 190, 40, m > 60 ? 'rgba(255,90,95,0.95)' : 'rgba(14,14,20,0.85)', '#fff', a, 1, 800);
      chip(`${Math.round(312 * Math.pow(kT(t), 1.2))} reels`, 540, 290, 32, 'rgba(14,14,20,0.7)', TXT, a, 1, 700);
    };
    const CHORES = ['🧹 sweeping', '🌱 watering', '👕 folding', '🌙 curtains', '💡 lamp on', '☕ chai #2', '🗑️ trash out'];
    const drawClockHUD = t => {
      const a = Math.min(fin(t, TLA, 0.25), 1 - pr(t, TL1 + 0.05, TL1 + 0.35)); if (a <= 0) return;
      h.save(); h.globalAlpha = a;
      card(130, 120, 820, 330, 38);
      txt('TIME NOW', 390, 175, 24, DIM, 700, 'center');
      txt(clockStr(wallMin(t)), 390, 255, 96, TXT, 800, 'center', 1, '"Inter Display"');
      const s = Math.max(0, st(t));
      txt(`positions ${Math.min(5, [1, 2, 3, 4, 5, 5, 5][s])}  ·  chores ${s + 1}`, 390, 345, 28, ACC, 700, 'center');
      txt('⏩ time flies', 390, 395, 24, DIM, 600, 'center');
      const m = MIN(t), cx = 790, cy = 285, rr2 = 105, k = cl(m / 127);
      h.lineWidth = 20; h.strokeStyle = 'rgba(255,255,255,0.12)'; h.beginPath(); h.arc(cx, cy, rr2, 0, 7); h.stroke();
      const g = h.createLinearGradient(cx - rr2, cy, cx + rr2, cy); g.addColorStop(0, ACC); g.addColorStop(1, RED); h.strokeStyle = g; h.lineCap = 'round';
      h.beginPath(); h.arc(cx, cy, rr2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.01, k)); h.stroke();
      txt(hm(m), cx, cy - 6, 40, TXT, 800, 'center', 1, '"Inter Display"'); txt('screen time', cx, cy + 36, 22, DIM, 500, 'center');
      h.restore();
      chip(`${Math.round(312 * Math.pow(kT(t), 1.2))} reels watched`, 540, 520, 34, 'rgba(14,14,20,0.82)', TXT, a, 1, 700);
    };
    const drawTags = t => {
      const s = st(t);
      if (s >= 0) {
        const r = robo(t), k = pop(t, TLA + s * stDur + 0.05, 0.35), [x, y] = toScreen(V(r.x, RH + 0.2, r.z));
        chip(CHORES[s], clampX(x), y - 20, 30, 'rgba(232,228,220,0.96)', '#1a1a22', cl(k * 1.6), 0.6 + 0.4 * k, 800);
        const ck = pop(t, TL0 + (TL1 - TL0) * 0.32, 0.4); if (ck > 0) { const [cx, cy] = toScreen(V(CX, CY + 0.2, CZ)); chip(t >= TLA + 5 * stDur + stDur * 0.55 && t >= TL1 - 0.6 ? 'chai #2: cold 🧊' : 'cold 🧊', clampX(cx + 30), cy - 20, 26, 'rgba(232,228,220,0.95)', '#123', cl(ck * 1.5), 1, 800); }
      }
    };
    const drawStats = t => {
      const a = Math.min(fin(t, STATS, 0.15), 1 - pr(t, B(5) - 0.6, B(5) - 0.3)); if (a <= 0) return;
      const k = pop(t, STATS, 0.45);
      h.save(); h.globalAlpha = a; h.translate(540, 470); h.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); h.translate(-540, -470);
      h.shadowColor = 'rgba(0,0,0,0.45)'; h.shadowBlur = 40; card(110, 150, 860, 640, 40, PAPER, null); h.shadowBlur = 0;
      h.fillStyle = igGrad(110, 970); h.beginPath(); h.roundRect(110, 150, 860, 14, [40, 40, 0, 0]); h.fill();
      txt('YOUR "5 MINUTES"', 540, 230, 30, '#6b6872', 800, 'center');
      txt('2h 07m', 540, 340, 140, '#15141a', 900, 'center', 1, '"Inter Display"');
      const row = (l, r, y, rc, i) => { const kk = fin(t, STATS + 0.25 + i * 0.18, 0.3); txt(l, 190, y, 40, '#4a4752', 500, 'left', kk); txt(r, 890, y, 44, rc, 800, 'right', kk); };
      row('Planned', '5 min', 480, '#15141a', 0); row('Reels watched', '312', 560, '#15141a', 1); row('Learned', 'nothing', 640, RED, 2);
      h.strokeStyle = 'rgba(0,0,0,0.08)'; h.lineWidth = 2; [520, 600].forEach(y => { h.beginPath(); h.moveTo(190, y); h.lineTo(890, y); h.stroke(); });
      h.restore();
    };
    // BONK: comic burst + stars circling his head
    const drawBonk = t => {
      if (t < HIT - 0.02 || t > HIT + 1.1) return;
      const [x, y] = toScreen(V(BX, 1.55, MZ)), k = pop(t, HIT, 0.25), a = 1 - pr(t, HIT + 0.8, HIT + 1.1);
      h.save(); h.globalAlpha = a; h.translate(clampX(x + 130, 260), y - 60); h.rotate(-0.15); h.scale(0.4 + 0.6 * k, 0.4 + 0.6 * k);
      h.fillStyle = '#ffd23d'; h.beginPath(); for (let i = 0; i < 24; i++) { const ang = i / 24 * Math.PI * 2, rad = i % 2 ? 95 : 150; h.lineTo(Math.cos(ang) * rad * 1.3, Math.sin(ang) * rad); } h.closePath(); h.fill();
      h.lineWidth = 8; h.strokeStyle = '#1a1208'; h.stroke();
      h.font = F(78, 900, '"Inter Display"'); h.textAlign = 'center'; h.textBaseline = 'middle'; h.lineWidth = 12; h.strokeStyle = '#1a1208'; h.strokeText('BONK!', 0, 4); h.fillStyle = '#ff5a3d'; h.fillText('BONK!', 0, 4);
      h.restore();
      for (let i = 0; i < 4; i++) { const ang = t * 7 + i * Math.PI / 2, sx2 = x + Math.cos(ang) * 120, sy2 = y - 150 + Math.sin(ang) * 30;
        h.save(); h.globalAlpha = a; h.translate(sx2, sy2); h.rotate(t * 4); h.fillStyle = '#ffd23d'; h.strokeStyle = '#1a1208'; h.lineWidth = 3; h.beginPath();
        for (let j = 0; j < 10; j++) { const r2 = j % 2 ? 9 : 22, aa = j / 10 * Math.PI * 2 - Math.PI / 2; h.lineTo(Math.cos(aa) * r2, Math.sin(aa) * r2); } h.closePath(); h.fill(); h.stroke(); h.restore(); }
    };
    // BOOK COVER close-up (graphic)
    const drawCover = t => {
      const a = Math.min(fin(t, COVER + 0.05, 0.3), 1 - pr(t, WORRY - 0.25, WORRY)); if (a <= 0) return;
      const k = pop(t, COVER + 0.05, 0.5);
      h.save(); h.globalAlpha = a; h.translate(540, 520); h.rotate(-0.05 + (1 - k) * 0.2); h.scale((0.6 + 0.4 * k) * 0.82, (0.6 + 0.4 * k) * 0.82);
      const W = 520, Hh = 700, x0 = -W / 2, y0 = -Hh / 2;
      h.shadowColor = 'rgba(0,0,0,0.5)'; h.shadowBlur = 50; h.shadowOffsetY = 20;
      h.fillStyle = '#f3ead6'; h.beginPath(); h.roundRect(x0 + 14, y0 + 10, W, Hh, 16); h.fill(); h.shadowBlur = 0; h.shadowOffsetY = 0;   // pages
      for (let i = 0; i < 6; i++) { h.fillStyle = i % 2 ? '#e8dcc2' : '#f6efde'; h.fillRect(x0 + W + 2, y0 + 20 + i * 2, 10, Hh - 30); }
      const g = h.createLinearGradient(x0, y0, x0 + W, y0 + Hh); g.addColorStop(0, '#ff8a4c'); g.addColorStop(1, '#d9472f'); h.fillStyle = g; h.beginPath(); h.roundRect(x0, y0, W, Hh, 16); h.fill();
      h.fillStyle = 'rgba(0,0,0,0.2)'; h.fillRect(x0, y0, 34, Hh); h.fillStyle = 'rgba(255,255,255,0.18)'; h.fillRect(x0 + 34, y0, 5, Hh);
      txt('HOW TO', 20, y0 + 120, 76, '#fff', 900, 'center', 1, '"Inter Display"');
      txt('MAKE REELS', 20, y0 + 205, 76, '#fff', 900, 'center', 1, '"Inter Display"');
      txt('(not watch them)', 20, y0 + 275, 36, 'rgba(255,255,255,0.9)', 600, 'center');
      // little robot illustration
      h.save(); h.translate(20, y0 + 450);
      h.fillStyle = '#c4532c'; h.beginPath(); h.roundRect(-70, 40, 140, 90, 22); h.fill();
      h.fillStyle = '#f0a63a'; h.beginPath(); h.roundRect(-118, -48, 22, 64, 8); h.roundRect(96, -48, 22, 64, 8); h.fill();
      h.fillStyle = '#ffb06a'; h.beginPath(); h.roundRect(-100, -80, 200, 130, 32); h.fill();
      h.strokeStyle = '#6c6a6e'; h.lineWidth = 5; h.beginPath(); h.moveTo(0, -80); h.lineTo(0, -112); h.stroke(); h.fillStyle = '#f0a63a'; h.beginPath(); h.arc(0, -118, 11, 0, 7); h.fill();
      [-40, 40].forEach(ex => { h.fillStyle = '#d9d6d0'; h.beginPath(); h.arc(ex, -22, 24, 0, 7); h.fill(); h.fillStyle = '#3c3a3e'; h.beginPath(); h.arc(ex, -22, 15, 0, 7); h.fill(); h.fillStyle = '#fff'; h.beginPath(); h.arc(ex + 5, -28, 4, 0, 7); h.fill(); });
      h.fillStyle = '#f2b544'; h.beginPath(); h.roundRect(-30, 18, 60, 12, 5); h.fill();
      h.restore();
      txt('by Claude', 20, y0 + Hh - 50, 30, 'rgba(255,255,255,0.85)', 600, 'center');
      // sticker
      h.save(); h.translate(x0 + W - 70, y0 + 70); h.rotate(0.25); const sk = pop(t, COVER + 0.6, 0.35); h.scale(sk, sk);
      h.fillStyle = '#fff'; h.beginPath(); h.arc(0, 0, 74, 0, 7); h.fill(); h.fillStyle = RED; h.beginPath(); h.arc(0, 0, 66, 0, 7); h.fill();
      txt('NO', 0, -16, 34, '#fff', 900, 'center', 1, '"Inter Display"'); txt('PART 2', 0, 20, 26, '#fff', 900, 'center', 1, '"Inter Display"'); h.restore();
      h.restore();
    };

    // ---- WORRY BUBBLES (line 7): thought clouds beside Maddie ----
    const cloud = (cx, cy, w, hh) => { h.beginPath(); const n = 9; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; h.moveTo(cx + Math.cos(a) * w * 0.38 + w * 0.2, cy + Math.sin(a) * hh * 0.32); h.arc(cx + Math.cos(a) * w * 0.38, cy + Math.sin(a) * hh * 0.32, hh * 0.3, 0, 7); } h.rect(cx - w * 0.38, cy - hh * 0.3, w * 0.76, hh * 0.6); h.fill(); };
    const drawWorry = t => {
      if (t < WORRY || t > CHECK + 0.2) return;
      const a = 1 - pr(t, CHECK - 0.15, CHECK + 0.1);
      const bub = (i, t0, emoji, label, y) => {
        const k = pop(t, t0, 0.5); if (k <= 0) return;
        const fl = Math.sin(t * 2.4 + i) * 8, x = 735, yy = y + fl;
        h.save(); h.globalAlpha = a * cl(k * 1.4);
        // trailing dots toward his head
        [[470, yy + 170, 14], [515, yy + 125, 20], [560, yy + 82, 26]].forEach(([dx, dy, r]) => { h.fillStyle = PAPER; h.beginPath(); h.arc(dx, dy, r * k, 0, 7); h.fill(); });
        h.translate(x, yy); h.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k);
        h.shadowColor = 'rgba(0,0,0,0.35)'; h.shadowBlur = 30; h.fillStyle = PAPER; cloud(0, 0, 560, 250); h.shadowBlur = 0;
        h.fillStyle = '#000'; h.font = '88px "Noto Color Emoji"'; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(emoji, -165, -14);
        const xk = eo(pr(t, t0 + 0.35, t0 + 0.6)); if (xk > 0) { h.strokeStyle = RED; h.lineWidth = 16; h.lineCap = 'round'; h.beginPath(); h.moveTo(-215, -64); h.lineTo(-215 + 100 * xk, -64 + 100 * xk); h.moveTo(-115, -64); h.lineTo(-115 - 100 * xk, -64 + 100 * xk); h.stroke(); }
        txt(label, -85, -14, 46, '#15141a', 900, 'left', 1, '"Inter Display"');
        h.restore();
      };
      bub(0, B(7) + 0.1, '✂️', "can't edit", 430);
      bub(1, B(7) + (E(7) - B(7)) * 0.55, '💡', 'no ideas', 830);
    };
    // ---- CHECKLIST (lines 8-9): Claude does it all ----
    const ITEMS = [['💡', 'Idea'], ['✍️', 'Script'], ['🎬', '3D video'], ['#️⃣', 'Caption'], ['📲', 'Post']];
    const drawChecklist = t => {
      const a = Math.min(fin(t, CHECK + 0.05, 0.35), 1 - pr(t, MONT - 0.25, MONT)); if (a <= 0) return;
      h.save(); h.globalAlpha = a; const y0 = 130 + (1 - fin(t, CHECK + 0.05, 0.45)) * -40;
      h.shadowColor = 'rgba(0,0,0,0.45)'; h.shadowBlur = 40; card(120, y0, 840, 700, 40, 'rgba(14,14,20,0.9)', 'rgba(255,197,61,0.3)'); h.shadowBlur = 0;
      txt('CLAUDE DOES IT ALL', 540, y0 + 62, 30, ACC, 900, 'center', 1, '"Inter Display"');
      ITEMS.forEach(([ic, label], i) => {
        const y = y0 + 150 + i * 112, tk = TICKS[i], on = fin(t, tk - 0.5, 0.35), done = eo(pr(t, tk, tk + 0.3));
        h.save(); h.globalAlpha *= 0.35 + 0.65 * on;
        h.fillStyle = done > 0 ? 'rgba(61,220,151,0.14)' : 'rgba(255,255,255,0.05)'; h.beginPath(); h.roundRect(170, y - 46, 740, 92, 22); h.fill();
        h.fillStyle = '#000'; h.font = '50px "Noto Color Emoji"'; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(ic, 232, y + 2);
        txt(label, 300, y, 48, TXT, 800, 'left', 1, '"Inter Display"');
        // check circle
        h.lineWidth = 6; h.strokeStyle = done > 0 ? GRN : 'rgba(255,255,255,0.35)'; h.beginPath(); h.arc(850, y, 30, 0, 7); h.stroke();
        if (done > 0) { const pk = eb(pr(t, tk, tk + 0.3)); h.fillStyle = GRN; h.beginPath(); h.arc(850, y, 30 * pk, 0, 7); h.fill();
          h.strokeStyle = '#0d1a12'; h.lineWidth = 7; h.lineCap = 'round'; h.lineJoin = 'round'; h.beginPath(); h.moveTo(836, y + 1); h.lineTo(847, y + 12); h.lineTo(866, y - 11); h.stroke(); }
        h.restore();
      });
      h.restore();
      // "1 prompt + 1 Instagram page = 🚀" + FREE stamp
      const ek = fin(t, B(9) + 0.2, 0.4); if (ek > 0) { const y = y0 + 790;
        chip('📝 1 prompt', 300, y, 36, 'rgba(14,14,20,0.9)', TXT, a * ek, 0.7 + 0.3 * pop(t, B(9) + 0.2), 800);
        txt('+', 505, y, 54, TXT, 800, 'center', a * fin(t, B(9) + 0.7, 0.3));
        chip('📱 1 Insta page', 715, y, 36, 'rgba(14,14,20,0.9)', TXT, a * fin(t, B(9) + 0.9, 0.3), 0.7 + 0.3 * pop(t, B(9) + 0.9), 800);
        const fk = pop(t, B(9) + 0.05, 0.35); if (fk > 0) { h.save(); h.globalAlpha = a; h.translate(830, y0 + 70); h.rotate(0.16); const sc = 1.6 - 0.6 * cl(fk); h.scale(sc, sc);
          h.strokeStyle = GRN; h.lineWidth = 7; h.beginPath(); h.roundRect(-95, -40, 190, 80, 14); h.stroke(); txt('FREE', 0, 3, 54, GRN, 900, 'center', 1, '"Inter Display"'); h.restore(); } }
    };
    // ---- MONTAGE: "Maddie posts reels!" -> his profile grows -> brand collab ----
    const TILES = [['😹', '#ff9a8b', '#ff6a88', '84K'], ['🤖', '#ffb06a', '#e0663a', '1.2M'], ['📱', '#4facfe', '#7b5cff', '230K'], ['⏰', '#f6d365', '#fda085', '512K'], ['📚', '#84fab0', '#3fa58a', '96K'], ['🍗', '#f093fb', '#f5576c', '348K']];
    const drawMontage = t => {
      if (t < MONT || t >= REVEAL) return;
      // banner over the 3D shot
      const ba = Math.min(fin(t, MONT + 0.05, 0.25), 1 - pr(t, PROF - 0.1, PROF + 0.05)); if (ba > 0) { const k = pop(t, MONT + 0.05, 0.4);
        h.save(); h.globalAlpha = ba; h.translate(540, 300); h.rotate(-0.05); h.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); h.fillStyle = ACC; h.beginPath(); h.roundRect(-400, -85, 800, 170, 30); h.fill();
        txt('Maddie posts reels! 🚀', 0, 4, 66, '#1a1208', 900, 'center', 1, '"Inter Display"'); h.restore(); }
      if (t < PROF) return;
      const pk = eo(pr(t, PROF, PROF + 0.35)), py = (1 - pk) * 400;
      h.save(); h.globalAlpha = cl(pk * 1.5); h.translate(0, py);
      h.fillStyle = '#0c0c10'; h.fillRect(0, 0, HW, HH + 400);
      txt('‹', 60, 150, 70, TXT, 400); txt('maddie.makes', 130, 152, 48, TXT, 800, 'left', 1, '"Inter Display"');
      h.fillStyle = '#4f9cff'; h.beginPath(); h.arc(470, 152, 17, 0, 7); h.fill(); txt('✓', 470, 154, 22, '#fff', 900, 'center');
      // avatar: Maddie's face
      const ax = 190, ay = 330; h.strokeStyle = igGrad(ax - 100, ax + 100); h.lineWidth = 10; h.beginPath(); h.arc(ax, ay, 100, 0, 7); h.stroke();
      h.fillStyle = '#1a2240'; h.beginPath(); h.arc(ax, ay, 88, 0, 7); h.fill();
      h.save(); h.beginPath(); h.arc(ax, ay, 88, 0, 7); h.clip();
      h.fillStyle = '#c98b62'; h.beginPath(); h.roundRect(ax - 52, ay - 40, 104, 110, 34); h.fill(); h.fillStyle = '#24170f'; h.beginPath(); h.roundRect(ax - 60, ay - 72, 120, 52, 22); h.fill();
      h.fillStyle = '#111'; [-20, 20].forEach(dx => { h.beginPath(); h.ellipse(ax + dx, ay + 8, 8, 11, 0, 0, 7); h.fill(); });
      h.strokeStyle = '#5a2420'; h.lineWidth = 5; h.beginPath(); h.arc(ax, ay + 30, 16, 0.2, Math.PI - 0.2); h.stroke(); h.restore();
      // stats
      const fk = pr(t, PROF + 0.3, REVEAL - 0.5), fol = fk < 0.45 ? Math.round(lerp(0, 1000, eo(fk / 0.45))) : Math.round(lerp(1000, 10200, eo((fk - 0.45) / 0.55)));
      const folS = fol >= 10000 ? (fol / 1000).toFixed(1) + 'K' : fol.toLocaleString('en-IN');
      const posts = TILES.filter((_, i) => t >= PROF + 0.2 + i * (0.8 / TILES.length)).length;
      [[String(posts), 'posts', 480], [folS, 'followers', 690], ['12', 'following', 900]].forEach(([v, l, x], i) => {
        const pulse = i === 1 ? 1 + 0.08 * Math.max(0, Math.sin(t * 18)) * (fk > 0 && fk < 1 ? 1 : 0) : 1;
        h.save(); h.translate(x, 310); h.scale(pulse, pulse); txt(v, 0, 0, 52, i === 1 && fol >= 10000 ? ACC : TXT, 900, 'center', 1, '"Inter Display"'); h.restore(); txt(l, x, 365, 28, DIM, 500, 'center'); });
      txt('Maddie 🤖 AI skits · made with Claude', 90, 490, 32, TXT, 600);
      txt('🔗 all my prompts', 90, 540, 30, '#7ab8ff', 600);
      [[90, 'Following ✓', 'rgba(255,255,255,0.12)'], [560, 'Message', 'rgba(255,255,255,0.12)']].forEach(([x, l, c]) => { h.fillStyle = c; h.beginPath(); h.roundRect(x, 590, 430, 76, 16); h.fill(); txt(l, x + 215, 628, 30, TXT, 700, 'center'); });
      // grid of his reels, popping in one by one
      const gw = (HW - 8) / 3, gh = gw * 1.4;
      TILES.forEach(([e, c1, c2, views], i) => {
        const t0 = PROF + 0.2 + i * (0.8 / TILES.length), k = pop(t, t0, 0.35); if (k <= 0) return;
        const col = i % 3, row = Math.floor(i / 3), x = col * (gw + 4), y = 700 + row * (gh + 4);
        h.save(); h.translate(x + gw / 2, y + gh / 2); h.scale(k, k); h.translate(-gw / 2, -gh / 2);
        const g = h.createLinearGradient(0, 0, gw, gh); g.addColorStop(0, c1); g.addColorStop(1, c2); h.fillStyle = g; h.fillRect(0, 0, gw, gh);
        h.fillStyle = '#000'; h.font = `${Math.round(gw * 0.4)}px "Noto Color Emoji"`; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(e, gw / 2, gh * 0.45);
        txt('▶ ' + views, 18, gh - 34, 30, '#fff', 800); h.restore();
      });
      h.restore();
      // brand collab notification
      const nk = eb(pr(t, REVEAL - 0.75, REVEAL - 0.35)); if (nk > 0) {
        const y = lerp(1960, 1440, nk); h.save(); h.shadowColor = 'rgba(0,0,0,0.5)'; h.shadowBlur = 40; card(50, y, 980, 220, 40, 'rgba(244,240,232,0.98)', null); h.shadowBlur = 0;
        h.fillStyle = igGrad(80, 170); h.beginPath(); h.roundRect(80, y + 40, 90, 90, 22); h.fill(); h.fillStyle = '#000'; h.font = '54px "Noto Color Emoji"'; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText('💌', 125, y + 87);
        txt('Brand collab request', 200, y + 70, 42, '#15141a', 900, 'left', 1, '"Inter Display"'); txt('now', 990, y + 70, 28, '#8a8790', 500, 'right');
        txt('"Hi Maddie! Loved your reels 😍', 200, y + 128, 32, '#2b2a30', 500); txt('Can we work together?"', 200, y + 172, 32, '#2b2a30', 500); h.restore(); }
    };
    // META REVEAL: the reel shrinks into a laptop editor; code scrolls; "made with Claude"; BUILD CTA
    const snap = document.createElement('canvas'); snap.width = 540; snap.height = 960; const snx = snap.getContext('2d'); let snapped = false;
    const CODE = [
      ['c', '// one prompt -> one reel'],
      ['k', 'const', 'p', ' idea = ', 'f', 'findIdea', 'p', '(', 's', "'relatable'", 'p', ');'],
      ['k', 'const', 'p', ' script = ', 'f', 'write', 'p', '(idea);'],
      ['k', 'const', 'p', ' reel = ', 'f', 'make3D', 'p', '(script);'],
      ['f', 'voices', 'p', '({ claude: ', 's', "'British'", 'p', ' });'],
      ['f', 'caption', 'p', '(reel);'],
      ['p', 'instagram.', 'f', 'post', 'p', '(reel);'],
      ['g', '✓ posted · reel.mp4']];
    const CC = { k: '#c792ea', p: '#e6e1f0', f: '#82aaff', n: '#f78c6c', s: '#c3e88d', c: '#6b7394', g: '#3ddc97' };
    const drawReveal = t => {
      if (t < REVEAL) return;
      if (!snapped) { snx.drawImage(K.renderer.domElement, 0, 0, 540, 960); snapped = true; }
      const k = ez(pr(t, REVEAL, REVEAL + 0.9));
      // background: desk at night
      h.save(); h.globalAlpha = cl((t - REVEAL) * 3);
      const bg = h.createLinearGradient(0, 0, 0, HH); bg.addColorStop(0, '#141826'); bg.addColorStop(0.62, '#1d2235'); bg.addColorStop(0.62, '#5a3d2b'); bg.addColorStop(1, '#3d2a1e'); h.fillStyle = bg; h.fillRect(0, 0, HW, HH);
      const lg = h.createRadialGradient(860, 300, 20, 860, 300, 700); lg.addColorStop(0, 'rgba(255,190,110,0.25)'); lg.addColorStop(1, 'rgba(255,190,110,0)'); h.fillStyle = lg; h.fillRect(0, 0, HW, HH);
      // mug + plant on the desk
      h.fillStyle = '#e0663a'; h.beginPath(); h.roundRect(870, 1060, 90, 110, 16); h.fill(); h.strokeStyle = '#e0663a'; h.lineWidth = 12; h.beginPath(); h.arc(965, 1110, 26, -1.2, 1.2); h.stroke();
      h.fillStyle = '#d47a4a'; h.beginPath(); h.roundRect(110, 1080, 90, 90, 12); h.fill(); h.fillStyle = '#3f8f4e'; [[-30, -40], [0, -70], [30, -45], [-10, -100], [20, -95]].forEach(([dx, dy]) => { h.beginPath(); h.ellipse(155 + dx, 1080 + dy, 22, 40, dx * 0.02, 0, 7); h.fill(); });
      h.restore();
      // laptop
      const lx = 90, ly = 330, lw = 900, lh = 600;
      const la = fin(t, REVEAL + 0.4, 0.5);
      if (la > 0) { h.save(); h.globalAlpha = la;
        h.fillStyle = '#2a2d36'; h.beginPath(); h.roundRect(lx - 24, ly - 24, lw + 48, lh + 48, 30); h.fill();
        h.fillStyle = '#0f111a'; h.fillRect(lx, ly, lw, lh);
        h.fillStyle = '#b9bdc6'; h.beginPath(); h.moveTo(lx - 90, ly + lh + 24); h.lineTo(lx + lw + 90, ly + lh + 24); h.lineTo(lx + lw + 40, ly + lh + 74); h.lineTo(lx - 40, ly + lh + 74); h.closePath(); h.fill();
        h.fillStyle = '#9da1aa'; h.fillRect(lx + lw / 2 - 90, ly + lh + 24, 180, 10);
        // editor chrome
        h.fillStyle = '#1a1d2b'; h.fillRect(lx, ly, lw, 46); [0, 1, 2].forEach(i => { h.fillStyle = ['#ff5f57', '#febc2e', '#28c840'][i]; h.beginPath(); h.arc(lx + 28 + i * 26, ly + 23, 8, 0, 7); h.fill(); });
        txt('scene.js', lx + 120, ly + 24, 22, '#c9cbe0', 600); txt('preview', lx + lw - 240, ly + 24, 22, '#c9cbe0', 600);
        // code
        const shown = Math.floor(lerp(0, CODE.length + 0.99, cl((t - REVEAL - 0.6) / 1.8)));
        CODE.slice(0, shown).forEach((row, i) => { let xx = lx + 26; const yy = ly + 96 + i * 60; txt(String(i + 1), xx, yy, 22, '#4a5070', 500); xx += 36;
          h.save(); h.font = F(25, 500, '"DejaVu Sans Mono", monospace'); h.textBaseline = 'middle';
          for (let j = 0; j < row.length; j += 2) { h.fillStyle = CC[row[j]]; h.fillText(row[j + 1], xx, yy); xx += h.measureText(row[j + 1]).width; } h.restore(); });
        if (shown < CODE.length && Math.floor(t * 3) % 2) { h.fillStyle = '#e6e1f0'; h.fillRect(lx + 62, ly + 82 + shown * 60, 11, 28); }
        h.restore(); }
      // the reel itself: full screen -> preview pane in the laptop
      const pw = lerp(HW, 240, k), ph2 = lerp(HH, 427, k), px2 = lerp(0, lx + lw - 262, k), py2 = lerp(0, ly + 66, k);
      h.save(); h.shadowColor = 'rgba(0,0,0,0.5)'; h.shadowBlur = 30 * k; h.beginPath(); h.roundRect(px2, py2, pw, ph2, 18 * k); h.clip(); h.drawImage(snap, px2, py2, pw, ph2); h.restore();
      if (k > 0.98) { h.strokeStyle = 'rgba(255,255,255,0.25)'; h.lineWidth = 2; h.beginPath(); h.roundRect(px2, py2, pw, ph2, 18); h.stroke(); txt('▶ reel.mp4', px2 + pw / 2, py2 + ph2 + 26, 20, '#c9cbe0', 600, 'center'); }
      // title
      const tk = fin(t, REVEAL + 0.7, 0.5);
      txt('This reel was made', 540, 175, 60, TXT, 800, 'center', tk, '"Inter Display"');
      txt('with Claude 🤖', 540, 250, 60, ACC, 900, 'center', tk, '"Inter Display"');
      // CTA
      const ck = pop(t, B(10) + 0.1, 0.55), ca = fin(t, B(10), 0.4);
      if (ca > 0) { h.save(); h.globalAlpha = ca; card(170, 1030, 740, 250, 36, INK, 'rgba(255,197,61,0.35)');
        txt('Comment', 395, 1105, 40, 'rgba(255,245,235,0.85)', 300, 'center');
        h.save(); h.translate(395, 1190); h.scale(0.6 + 0.4 * ck, 0.6 + 0.4 * ck); txt('PROMPT', 0, 0, 92, ACC, 900, 'center', 1, '"Inter Display"'); h.restore();
        txt("I'll send it", 765, 1120, 34, 'rgba(255,245,235,0.9)', 500, 'center', fin(t, B(10) + 0.5, 0.4));
        txt('to your DM 📩', 765, 1172, 34, 'rgba(255,245,235,0.9)', 500, 'center', fin(t, B(10) + 0.6, 0.4));
        h.fillStyle = igGrad(240, 560); h.fillRect(245, 1250, 300 * eo(pr(t, B(10) + 0.7, B(10) + 1.2)), 7);
        h.restore(); }
    };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.32, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.36)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1;
      if (t < REVEAL) {
        h.drawImage(vig, 0, 0);
        drawPOV(t); drawOverHUD(t); drawClockHUD(t); drawTags(t); drawStats(t); drawBonk(t); drawCover(t); drawWorry(t); drawChecklist(t); drawMontage(t);
        const f = fade(t); if (f > 0) { h.fillStyle = `rgba(${t >= TLA && t < TL1 ? '255,255,255' : '0,0,0'},${f})`; h.fillRect(0, 0, HW, HH); }
      } else drawReveal(t);
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 5); h.fillStyle = igGrad(0, HW); h.fillRect(0, 0, HW * cl(t < J ? t / D2 : J / D2 + (t - J) / (D - J) * (1 - J / D2)), 5);
      hTex.needsUpdate = true;
    };
    const curFov = t => { const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; const k = smooth(cl((t - p[0]) / (p[1] - p[0]))); return lerp(p[2][0].fov, p[2][1].fov, k); };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); lights(t); acting(t); drawPhoneScreen(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['pop', 0.15, 0.35], ['ding', 0.75, 0.15]);
    sfx.push(['whoosh', TL0 - 0.25, 0.3], ['riser', TL1 - 2.6, 0.45]);
    for (let t = TL0; t < TL1;) { const k = kT(t); sfx.push(['tick', t, 0.3]); t += lerp(0.42, 0.1, Math.pow(k, 0.8)); }
    sfx.push(['whoosh', TLA - 0.15, 0.25]); for (let i = 1; i < NST; i++) sfx.push(['pop', TLA + i * stDur, 0.22]);
    sfx.push(['beep', lampOnAt, 0.25]);
    sfx.push(['boing', B(3) - 0.25, 0.18]);
    sfx.push(['bass', STATS, 0.55], ['thud', STATS + 0.02, 0.5]); for (let i = 0; i < 3; i++) sfx.push(['tick', STATS + 0.25 + i * 0.18, 0.4]);
    for (let t = WALK0; t < WALK1; t += 0.18) sfx.push(['tick', t, 0.18]);
    sfx.push(['whoosh', THROW, 0.4], ['thud', HIT, 0.75], ['boing', HIT + 0.03, 0.4], ['thud', HIT + 0.35, 0.3]);
    sfx.push(['pop', COVER + 0.1, 0.4], ['pop', COVER + 0.65, 0.3]);
    sfx.push(['pop', B(7) + 0.1, 0.4], ['zap', B(7) + 0.5, 0.18], ['pop', B(7) + (E(7) - B(7)) * 0.55, 0.4]);
    sfx.push(['whoosh', CHECK, 0.25]); TICKS.forEach(tk => sfx.push(['ding', tk, 0.16])); sfx.push(['thud', B(9) + 0.05, 0.4], ['pop', B(9) + 0.2, 0.3], ['pop', B(9) + 0.9, 0.3]);
    sfx.push(['whoosh', MONT, 0.3], ['pop', MONT + 0.05, 0.35], ['whoosh', PROF, 0.25]);
    for (let i = 0; i < 6; i++) sfx.push(['tick', PROF + 0.2 + i * (0.8 / 6), 0.3]);
    for (let t2 = PROF + 0.3; t2 < REVEAL - 0.5; t2 += 0.07) sfx.push(['coin', t2, 0.08]);
    sfx.push(['chime', REVEAL - 1.0, 0.35]);
    sfx.push(['whoosh', REVEAL, 0.35]); for (let i = 0; i < 8; i++) sfx.push(['tick', REVEAL + 0.6 + i * 0.22, 0.22]);
    sfx.push(['ding', REVEAL + 2.45, 0.22], ['pop', B(10) + 0.1, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false,
      music: { muteFrom: B(3) - 0.35, muteTo: E(4) + 0.25 }, capFont: 'Inter Display', capMarginV: 520, capSize: 54 };
  },
};
