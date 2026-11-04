/* @ai.jugaadd "POV: you open Instagram for 5 minutes" — and lose 2 hours.
   Room at 7 PM sunset -> 9:07 PM night in a locked-off time-lapse. Phone feed HUD, screen-time ring, chai goes cold,
   Claude reads / waters a growing plant / plays chess / dozes off. Stats card. "Okay, last one." Claude flops onto a pillow.
   Full 9:16 (no bars). Maddie warm & young, Claude dry & British (no glow). No handle. Subtitles higher. CTA: comment STOP. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x0b0d16, fog: null, fov: 38, bloom: { strength: 0.26, radius: 0.5, threshold: 0.97 } },
  lines: [
    { who: 'maddie', text: 'Just five minutes.', say: 'Just five minutes.' },
    { who: 'claude', text: '…Sure.', say: 'Sure.', gap: 0.45 },
    { who: 'maddie', text: 'Okay. Five minutes. Done.', say: 'Okay. Five minutes. Done.', gap: 10.4 },
    { who: 'claude', text: 'That was two hours.', say: 'That was two hours.', gap: 0.55 },
    { who: 'maddie', text: '…No way.', say: 'No way.', gap: 1.35 },
    { who: 'maddie', text: 'Okay, last one.', say: 'Okay. Last one.', gap: 0.7 },
    { who: 'claude', text: "I'll get a pillow.", say: "I'll get a pillow.", gap: 0.35 },
    { who: 'claude', text: "Comment STOP. I'll send the 3 settings that give you those 2 hours back.", say: "Comment, stop. I'll send the three settings that give you those two hours back.", gap: 1.2 },
  ].map(l => ({ gap: 0.35, ...l, speed: l.who === 'claude' ? 1.05 : 1.0 })),

  build(K, T) {
    const L = T.lines, B = i => L[i].t, E = i => L[i].end, N = L.length, D = E(N - 1) + 1.9;
    const cl = K.clamp, eo = K.easeOut, ei = K.easeIn, pr = K.prog, eb = K.easeBack, lerp = K.lerp;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2, h / 2, d / 2)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };

    // ================= TIMELINE =================
    const TL0 = E(1) + 0.35, TL1 = B(2) - 0.45;          // the time-lapse (silent, music + ticks)
    const TLM = TL0 + (TL1 - TL0) * 0.42;                  // cut from phone feed to the wide locked-off room
    const kT = t => cl((t - TL0) / (TL1 - TL0));           // 0..1 through the time-lapse
    const MIN = t => Math.round(5 + Math.pow(kT(t), 1.25) * 122) * (t >= TL0 ? 1 : 0);   // screen-time minutes (0 before)
    const STATS = B(4) - 0.85;                             // stats card slams on the silence after "That was two hours."
    const FLOP = B(6) + 0.35;                              // Claude tips over onto the pillow
    const CTA = B(7) - 0.35;

    // ================= BEDROOM =================
    const RX = 1.6, ZB = -1.6, ZF = 2.6, H = 2.7;
    const floorTex = K.canvasTex(1024, 1024, (x, w, h) => {
      for (let i = 0; i < 12; i++) { x.fillStyle = ['#7a5638', '#83603f', '#744f33'][i % 3]; x.fillRect(0, i * 86, w, 86); }
      const r = K.rng(3); x.strokeStyle = 'rgba(30,18,10,0.4)'; x.lineWidth = 2;
      for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(0, i * 86); x.lineTo(w, i * 86); x.stroke(); for (let k = 0; k < 2; k++) { const xx = r() * w; x.beginPath(); x.moveTo(xx, i * 86); x.lineTo(xx, i * 86 + 86); x.stroke(); } }
    });
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(2, 2.4);
    rbox(RX * 2, 0.1, ZF - ZB, SM(0xffffff, 0.7, { map: floorTex }), 0, -0.05, (ZF + ZB) / 2, 0.01).castShadow = false;
    const rug = new THREE.Mesh(new THREE.CircleGeometry(0.9, 48), SM(0x2f5d62, 0.95)); rug.rotation.x = -Math.PI / 2; rug.scale.set(1.3, 0.8, 1); rug.position.set(0.0, 0.003, 0.95); rug.receiveShadow = true; S.add(rug);
    const rug2 = new THREE.Mesh(new THREE.RingGeometry(0.76, 0.82, 48), SM(0xe9d9b6, 0.95)); rug2.rotation.x = -Math.PI / 2; rug2.scale.set(1.3, 0.8, 1); rug2.position.set(0.0, 0.005, 0.95); S.add(rug2);
    // walls: soft sage-teal paint
    const wallTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#5f7f7a'; x.fillRect(0, 0, w, h); const r = K.rng(9); for (let i = 0; i < 1800; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},0.025)`; x.fillRect(r() * w, r() * h, 2, 2); } });
    const wallTM = SM(0xffffff, 0.95, { map: wallTex });
    const WX0 = 0.42, WX1 = 1.32, WY0 = 1.02, WY1 = 2.12;
    rbox(WX0 + RX, H, 0.08, wallTM, (-RX + WX0) / 2, H / 2, ZB, 0.005);
    rbox(RX - WX1, H, 0.08, wallTM, (WX1 + RX) / 2, H / 2, ZB, 0.005);
    rbox(WX1 - WX0, WY0, 0.08, wallTM, (WX0 + WX1) / 2, WY0 / 2, ZB, 0.005);
    rbox(WX1 - WX0, H - WY1, 0.08, wallTM, (WX0 + WX1) / 2, (H + WY1) / 2, ZB, 0.005);
    rbox(0.08, H, ZF - ZB, wallTM, -RX, H / 2, (ZF + ZB) / 2, 0.005);
    rbox(0.08, H, ZF - ZB, wallTM, RX, H / 2, (ZF + ZB) / 2, 0.005);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, ZF - ZB + 3), SM(0xe9e4da, 0.95)); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, H, (ZF + ZB) / 2 + 1.5); S.add(ceil);
    const skirtM = SM(0xf1ebe0, 0.6);
    rbox(RX * 2, 0.08, 0.02, skirtM, 0, 0.04, ZB + 0.05); rbox(0.02, 0.08, ZF - ZB, skirtM, -RX + 0.05, 0.04, (ZF + ZB) / 2); rbox(0.02, 0.08, ZF - ZB, skirtM, RX - 0.05, 0.04, (ZF + ZB) / 2);

    // ---- the sky through the window: sunset (7 PM) -> night (9:07 PM), redrawn every frame ----
    const SW = 512, SH = 620, skyC = document.createElement('canvas'); skyC.width = SW; skyC.height = SH; const sx = skyC.getContext('2d');
    const skyTex = new THREE.CanvasTexture(skyC); skyTex.colorSpace = THREE.SRGBColorSpace;
    const sr = K.rng(5), stars = Array.from({ length: 90 }, () => [sr() * SW, sr() * SH * 0.6, 0.4 + sr() * 0.6, sr() * 6]);
    const blds = []; for (let layer = 0; layer < 2; layer++) for (let bx = -20; bx < SW; bx += 30 + sr() * 50) { const bw = 40 + sr() * 70, bh = [190, 130][layer] + sr() * [170, 120][layer]; const wins = [];
      for (let wy = SH - bh + 14; wy < SH - 8; wy += 20) for (let wx = bx + 8; wx < bx + bw - 10; wx += 15) if (sr() < 0.55) wins.push([wx, wy, sr(), sr() < 0.75]); blds.push({ layer, bx, bw, bh, wins }); }
    const mixC = (a, b, k) => { const pa = a.match(/\w\w/g).map(h => parseInt(h, 16)), pb = b.match(/\w\w/g).map(h => parseInt(h, 16)); return `rgb(${pa.map((v, i) => Math.round(lerp(v, pb[i], k))).join(',')})`; };
    const drawSky = k => {      // k: 0 sunset .. 1 deep night
      const g = sx.createLinearGradient(0, 0, 0, SH);
      g.addColorStop(0, mixC(k < 0.5 ? '4a6fb0' : '1d2a5c', k < 0.5 ? '1d2a5c' : '0a1030', k < 0.5 ? k * 2 : (k - 0.5) * 2));
      g.addColorStop(0.55, mixC(k < 0.5 ? 'f2a46b' : '7a4e7e', k < 0.5 ? '7a4e7e' : '1a2250', k < 0.5 ? k * 2 : (k - 0.5) * 2));
      g.addColorStop(1, mixC(k < 0.5 ? 'ffcf7a' : 'c46a5a', k < 0.5 ? 'c46a5a' : '2a2a55', k < 0.5 ? k * 2 : (k - 0.5) * 2));
      sx.fillStyle = g; sx.fillRect(0, 0, SW, SH);
      // sun sinking
      const sy = lerp(330, 700, cl(k * 2.2)); if (sy < 640) { const sg = sx.createRadialGradient(330, sy, 6, 330, sy, 120); sg.addColorStop(0, 'rgba(255,240,200,0.95)'); sg.addColorStop(0.25, 'rgba(255,200,120,0.6)'); sg.addColorStop(1, 'rgba(255,170,100,0)'); sx.fillStyle = sg; sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#fff3d6'; sx.beginPath(); sx.arc(330, sy, 34, 0, 7); sx.fill(); }
      // stars + moon rising
      const sa = cl((k - 0.45) * 2.2); stars.forEach(([x, y, b, ph]) => { if (sa <= 0) return; sx.fillStyle = `rgba(255,255,255,${sa * b})`; sx.fillRect(x, y, 2, 2); });
      const mk = cl((k - 0.4) / 0.6); if (mk > 0) { const mxp = lerp(90, 300, mk), myp = lerp(460, 120, Math.sin(mk * Math.PI / 2));
        const mg = sx.createRadialGradient(mxp, myp, 4, mxp, myp, 110); mg.addColorStop(0, `rgba(255,250,230,${0.45 * mk})`); mg.addColorStop(1, 'rgba(255,250,230,0)'); sx.fillStyle = mg; sx.fillRect(0, 0, SW, SH);
        sx.fillStyle = `rgba(255,248,226,${mk})`; sx.beginPath(); sx.arc(mxp, myp, 30, 0, 7); sx.fill(); }
      // city: silhouettes darken, windows switch on one by one
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
    const curtM = SM(0xd9a066, 0.95);
    for (let i = 0; i < 4; i++) { const c = cyl(0.045, 0.06, 1.45, curtM, WX1 + 0.1 + i * 0.065, 1.55, ZB + 0.12, 12); c.scale.z = 0.6; }
    for (let i = 0; i < 3; i++) { const c = cyl(0.045, 0.06, 1.45, curtM, WX0 - 0.1 - i * 0.065, 1.55, ZB + 0.12, 12); c.scale.z = 0.6; }
    cyl(0.012, 0.012, 1.5, SM(0x2b2a2e, 0.4, { metalness: 0.5 }), (WX0 + WX1) / 2, 2.3, ZB + 0.12, 8).rotation.z = Math.PI / 2;

    // bed against the back wall (foot toward camera)
    const BX = -0.2, BW = 1.3, BZ0 = ZB + 0.05, BZ1 = 0.45, BTOP = 0.5;
    const bedWood = SM(0x6a4630, 0.6);
    rbox(BW + 0.06, 0.22, BZ1 - BZ0, bedWood, BX, 0.16, (BZ0 + BZ1) / 2, 0.03);
    rbox(BW + 0.1, 1.0, 0.08, bedWood, BX, 0.62, BZ0 + 0.02, 0.03);
    rbox(BW + 0.1, 0.36, 0.06, bedWood, BX, 0.27, BZ1 + 0.02, 0.03);
    rbox(BW, 0.2, BZ1 - BZ0 - 0.04, SM(0xf4f1ea, 0.9), BX, BTOP - 0.08, (BZ0 + BZ1) / 2, 0.06);
    rbox(BW + 0.04, 0.1, 1.15, SM(0xe7a64a, 0.95), BX, BTOP + 0.03, -0.62, 0.05);
    for (let i = 0; i < 4; i++) { const f = cyl(0.06, 0.06, BW - 0.1, SM(0xd99a40, 0.95), BX, BTOP + 0.07, -0.95 + i * 0.25, 16); f.rotation.z = Math.PI / 2; }
    const pilM = SM(0xf7f3ec, 0.95);
    [-0.3, 0.3].forEach(dx => { const p = rbox(0.5, 0.12, 0.3, pilM, BX + dx, BTOP + 0.08, BZ0 + 0.25, 0.06); p.rotation.x = -0.25; });
    const cush = rbox(0.28, 0.1, 0.28, SM(0x4fa38f, 0.95), BX - 0.48, BTOP + 0.07, -0.15, 0.05); cush.rotation.set(0.1, 0.5, 0.06);
    // chai: tray + glass on the bed beside Maddie (steams, then goes cold)
    const CHAI = new THREE.Vector3(BX - 0.47, BTOP + 0.02, 0.2);
    rbox(0.22, 0.015, 0.16, SM(0x9a6a44, 0.5), CHAI.x, CHAI.y + 0.01, CHAI.z, 0.006);
    cyl(0.035, 0.03, 0.09, SM(0xffffff, 0.08, { transparent: true, opacity: 0.45 }), CHAI.x, CHAI.y + 0.06, CHAI.z, 20);
    const tea = cyl(0.031, 0.028, 0.07, SM(0xb7773f, 0.4), CHAI.x, CHAI.y + 0.05, CHAI.z, 20);
    const skinTop = new THREE.Mesh(new THREE.CircleGeometry(0.031, 20), SM(0xc99a6a, 0.9)); skinTop.rotation.x = -Math.PI / 2; skinTop.position.set(CHAI.x, CHAI.y + 0.086, CHAI.z); skinTop.visible = false; S.add(skinTop);
    rbox(0.04, 0.012, 0.03, SM(0xe9c46a, 0.6), CHAI.x + 0.07, CHAI.y + 0.024, CHAI.z + 0.02, 0.005).rotation.y = 0.4;   // biscuit
    const puff = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 2, 32, 32, 30); g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const steam = Array.from({ length: 7 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puff, transparent: true, opacity: 0, depthWrite: false })); S.add(s); return s; });

    // side table + lamp (left)
    const stX = -1.25, stZ = -1.25;
    rbox(0.4, 0.5, 0.36, SM(0x7a5236, 0.6), stX, 0.25, stZ, 0.02);
    cyl(0.07, 0.09, 0.03, SM(0x2b2a2e, 0.4), stX, 0.515, stZ, 20); cyl(0.012, 0.012, 0.28, SM(0x2b2a2e, 0.4), stX, 0.66, stZ, 8);
    const shadeM = SM(0xf6e6c6, 0.8, { side: THREE.DoubleSide, emissive: 0xffb760, emissiveIntensity: 0 });
    const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 0.16, 28, 1, true), shadeM); shade.position.set(stX, 0.82, stZ); S.add(shade);
    const lampL = new THREE.PointLight(0xffb766, 0, 2.8, 1.5); lampL.position.set(stX, 0.82, stZ); S.add(lampL);

    // wall clock above the bed (hands spin through the time-lapse)
    const clockG = new THREE.Group(); clockG.position.set(BX, 1.98, ZB + 0.06); S.add(clockG);
    cyl(0.19, 0.19, 0.04, SM(0x1d1d22, 0.4), 0, 0, 0, 40, clockG).rotation.x = Math.PI / 2;
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.165, 40), SM(0xf6f1e7, 0.6)); face.position.z = 0.022; clockG.add(face);
    for (let i = 0; i < 12; i++) { const tk = new THREE.Mesh(new THREE.PlaneGeometry(i % 3 ? 0.008 : 0.016, 0.03), BM(0x1d1d22)); const a = i / 12 * Math.PI * 2; tk.position.set(Math.sin(a) * 0.14, Math.cos(a) * 0.14, 0.024); tk.rotation.z = -a; clockG.add(tk); }
    const hand = (len, w, c = 0x1d1d22) => { const g = new THREE.Group(); g.position.z = 0.026; clockG.add(g); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, len), BM(c)); m.position.y = len / 2 - 0.015; g.add(m); return g; };
    const hH = hand(0.09, 0.014), hM = hand(0.13, 0.009), hS = hand(0.14, 0.004, 0xd94a3a);
    // posters + fairy lights + shelf
    const poster = K.canvasTex(400, 560, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffb347'); g.addColorStop(1, '#ff5e62'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(255,255,255,0.15)'; x.beginPath(); x.arc(w / 2, 220, 120, 0, 7); x.fill(); x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '900 80px "Inter Display"'; x.fillText('DO IT', w / 2, 420); x.fillText('TODAY', w / 2, 500); x.font = '600 26px "Inter"'; x.fillText('NO EXCUSES', w / 2, 80); });
    rbox(0.42, 0.58, 0.015, SM(0xffffff, 0.8, { map: poster }), -1.15, 1.62, ZB + 0.05, 0.004);
    const fairy = []; for (let i = 0; i < 16; i++) { const x = -1.5 + i * 0.19, y = 2.45 - Math.sin(i / 15 * Math.PI) * 0.12 - (i % 2) * 0.02; const b = sph(0.018, BM(0xffc770), x, y, ZB + 0.07); b.castShadow = false; fairy.push(b); }
    const fairyL = new THREE.PointLight(0xffb44a, 0, 2.4, 1.7); fairyL.position.set(-0.2, 2.3, ZB + 0.3); S.add(fairyL);

    // ---- Claude's stand (right of the bed, in front of the window) + his props ----
    const SX = 0.8, SZ = 0.02, STOP = 0.62;
    rbox(0.62, 0.04, 0.46, SM(0x8a6040, 0.5), SX, STOP - 0.02, SZ, 0.012);
    [[-0.27, -0.19], [0.27, -0.19], [-0.27, 0.19], [0.27, 0.19]].forEach(([dx, dz]) => rbox(0.035, STOP - 0.04, 0.035, SM(0x2b2a2e, 0.4, { metalness: 0.5 }), SX + dx, (STOP - 0.04) / 2, SZ + dz, 0.01));
    rbox(0.56, 0.02, 0.4, SM(0x7a5236, 0.6), SX, 0.2, SZ, 0.008);   // lower shelf
    for (let i = 0; i < 5; i++) rbox(0.04, 0.12 + (i % 3) * 0.02, 0.15, SM([0xd94a3a, 0x3b6ea5, 0xe9c46a, 0x4fa38f, 0x8a5cc7][i], 0.7), SX - 0.2 + i * 0.05, 0.27 + (i % 3) * 0.01, SZ, 0.006);
    const R = K.makeRobo({ height: 0.42 }); R.g.position.set(SX + 0.12, STOP, SZ - 0.02); S.add(R.g);
    // book (open, in front of Claude)
    const bookG = new THREE.Group(); bookG.position.set(SX - 0.06, STOP + 0.012, SZ + 0.14); S.add(bookG);
    const pageM = SM(0xf7f1e3, 0.8);
    [-1, 1].forEach(s => { const pg = rbox(0.09, 0.012, 0.12, pageM, s * 0.047, 0.004, 0, 0.004, bookG); pg.rotation.z = -s * 0.12; });
    rbox(0.2, 0.008, 0.13, SM(0x3b6ea5, 0.6), 0, -0.004, 0, 0.003, bookG);
    // plant (grows through the time-lapse)
    const potX = SX - 0.2, potZ = SZ - 0.12;
    cyl(0.055, 0.045, 0.09, SM(0xd47a4a, 0.6), potX, STOP + 0.045, potZ, 20);
    cyl(0.05, 0.05, 0.01, SM(0x3a2a1e, 0.9), potX, STOP + 0.088, potZ, 20);
    const plant = new THREE.Group(); plant.position.set(potX, STOP + 0.09, potZ); S.add(plant);
    const stem = cyl(0.006, 0.008, 1, SM(0x3f7a3a, 0.8), 0, 0.5, 0, 8, plant);
    const leaves = Array.from({ length: 10 }, (_, i) => { const lf = sph(0.035, SM(i % 2 ? 0x3f8f4e : 0x55a85a, 0.8), 0, 0, 0, plant); lf.scale.set(1.1, 0.35, 0.6); return { lf, h: (i + 1) / 10, a: i * 2.4 }; });
    // watering can (appears at Claude's arm)
    const can = new THREE.Group(); S.add(can);
    cyl(0.04, 0.045, 0.07, SM(0x3fa58a, 0.5), 0, 0, 0, 18, can);
    const spout = cyl(0.007, 0.01, 0.1, SM(0x3fa58a, 0.5), -0.06, 0.02, 0, 8, can); spout.rotation.z = 1.0;
    const handleC = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.006, 6, 16, Math.PI), SM(0x3fa58a, 0.5)); handleC.position.set(0.02, 0.04, 0); can.add(handleC);
    const drops = Array.from({ length: 6 }, () => { const d = sph(0.006, SM(0x9fd3ff, 0.2, { transparent: true, opacity: 0.8 }), 0, 0, 0); d.castShadow = false; return d; });
    // chess board + pieces (in front of Claude)
    const chessG = new THREE.Group(); chessG.position.set(SX - 0.05, STOP + 0.006, SZ + 0.13); S.add(chessG);
    const chessTex = K.canvasTex(256, 256, (x, w, h) => { for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) { x.fillStyle = (r + c) % 2 ? '#7a5236' : '#f1e0c0'; x.fillRect(c * 32, r * 32, 32, 32); } });
    rbox(0.19, 0.01, 0.19, SM(0xffffff, 0.6, { map: chessTex }), 0, 0, 0, 0.003, chessG);
    const pieces = Array.from({ length: 8 }, (_, i) => { const g = new THREE.Group(); const m = SM(i < 4 ? 0xf6f1e7 : 0x2b2a2e, 0.4);
      cyl(0.008, 0.011, 0.012, m, 0, 0.008, 0, 12, g); cyl(0.005, 0.008, 0.02, m, 0, 0.022, 0, 10, g); sph(0.007, m, 0, 0.036, 0, g); chessG.add(g); return g; });
    // pillow for the flop (pops in on "I'll get a pillow")
    const pillow = rbox(0.2, 0.06, 0.14, SM(0xf7f3ec, 0.95), SX - 0.12, STOP + 0.035, SZ + 0.0, 0.03); pillow.scale.setScalar(0.001);

    // ================= MADDIE + PHONE =================
    const MZ = 0.22;
    const M = K.makeToyMaddie({ seatY: BTOP + 0.02, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(BX, 0, MZ); S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });   // no blush dots
    const phone = new THREE.Group(); S.add(phone);
    rbox(0.085, 0.17, 0.01, SM(0x15161b, 0.3), 0, 0, 0, 0.012, phone);
    const pScrC = document.createElement('canvas'); pScrC.width = 170; pScrC.height = 340; const psx = pScrC.getContext('2d');
    const pTex = new THREE.CanvasTexture(pScrC); pTex.colorSpace = THREE.SRGBColorSpace;
    const pScr = new THREE.Mesh(new THREE.PlaneGeometry(0.077, 0.158), new THREE.MeshBasicMaterial({ map: pTex, toneMapped: false })); pScr.position.z = 0.0056; phone.add(pScr);
    const phoneL = new THREE.PointLight(0xaecbff, 0.45, 0.9, 1.8); S.add(phoneL);

    // ================= LIGHT (sunset -> night) =================
    const hemi = new THREE.HemisphereLight(0xffe2c4, 0x3a2a1e, 0.9); S.add(hemi);
    const sun = new THREE.DirectionalLight(0xffa860, 1.6); sun.position.set(1.4, 1.6, -3.4); sun.target.position.set(-0.2, 0.7, 0.3); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0005; S.add(sun); S.add(sun.target);
    const moon = new THREE.DirectionalLight(0x9fb6ff, 0); moon.position.set(0.9, 2.4, -3.4); moon.target.position.set(-0.2, 0.6, 0.3); S.add(moon); S.add(moon.target);
    const key = new THREE.DirectionalLight(0xfff1e2, 0.75); key.position.set(-0.4, 2.0, 3.2); key.target.position.set(0.1, 0.9, 0); S.add(key); S.add(key.target);
    const fill = new THREE.DirectionalLight(0xcfe0ff, 0.25); fill.position.set(2.2, 1.2, 1.6); S.add(fill);
    const night = t => t < TL0 ? 0 : t < TL1 ? eo(kT(t)) : 1;   // 0 sunset .. 1 night (stays night after)
    const lights = t => { const n = night(t);
      hemi.intensity = lerp(0.9, 0.42, n); hemi.color.setHex(n > 0.5 ? 0x8fa0d8 : 0xffe2c4);
      sun.intensity = lerp(1.6, 0, cl(n * 1.6)); moon.intensity = lerp(0, 0.75, cl((n - 0.3) * 1.6));
      key.intensity = lerp(0.75, 0.42, n); key.color.setHex(n > 0.5 ? 0xc6d4ff : 0xfff1e2);
      const lampOn = cl((n - 0.35) * 4); lampL.intensity = 0.85 * lampOn; shadeM.emissiveIntensity = 0.5 * lampOn;
      fairyL.intensity = 0.55 * lampOn; fairy.forEach((b, i) => b.material.color.setHSL(0.1, 1, 0.2 + lampOn * (0.4 + 0.1 * Math.sin(t * 1.5 + i * 1.3))));
      drawSky(n); };

    // ================= ACTING =================
    const hw = new THREE.Vector3(), hw2 = new THREE.Vector3(), headW = new THREE.Vector3(), rhead = new THREE.Vector3();
    const rr = K.rng(42), jumps = Array.from({ length: 30 }, () => [rr() - 0.5, rr() - 0.5, rr()]);
    const phoneDown = t => t >= B(2) - 0.15 && t < B(5) - 0.2;              // "Okay. Five minutes. Done." -> until "Okay, last one."
    let mYaw = 0, mPitch = 0.4, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.55;
      const k = last < 0 ? 1 : cl((t - last) * 3.5); last = t;
      const inTL = t >= TL0 && t < TL1;
      // time-lapse "jump cut" poses: a new slouch / tilt every ~0.45 s
      const j = inTL ? jumps[Math.floor((t - TL0) / 0.45) % jumps.length] : [0, 0, 0];
      const slump = inTL ? 0.15 + 0.45 * kT(t) : t >= TL1 && t < B(2) ? 0.6 : 0.2;
      const down = phoneDown(t);
      const tYaw = down ? (t >= B(3) - 0.2 && t < B(4) + 0.9 ? 0.38 : 0.0) : (t < E(0) + 0.1 ? 0.0 : j[0] * 0.25);
      const tPitch = down ? -0.02 : 0.42 + j[1] * 0.12;
      mYaw = inTL ? tYaw : sm(mYaw, tYaw, k); mPitch = inTL ? tPitch : sm(mPitch, tPitch, k);
      const face = (t >= B(4) - 0.3 && t < E(4) + 0.5) ? 'shock' : (t >= B(2) - 0.2 && t < B(3)) ? 'smile' : (t >= B(5) - 0.2 && t < E(5) + 0.4) ? 'smile'
        : t < E(0) + 0.3 ? 'smile' : (inTL && kT(t) > 0.6) ? 'worried' : 'neutral';
      M.update(t, { talk: mT * 0.9, face, look: [mYaw + Math.sin(t * 0.4) * 0.015, mPitch], type: 0, lean: down ? 0.05 : slump });
      if (inTL) M.head.rotation.z += j[2] * 0.12 - 0.06;
      const [aL, aR] = M.arms;
      if (down) {
        const k2 = eo(pr(t, B(2) - 0.15, B(2) + 0.5));
        aL.sh.rotation.set(lerp(-0.1, 0.05, k2), lerp(0.42, 0.2, k2), -0.05); aL.el.rotation.x = lerp(-1.05, -0.35, k2);
        aR.sh.rotation.set(lerp(-0.1, 0.05, k2), lerp(-0.42, -0.2, k2), 0.05); aR.el.rotation.x = lerp(-1.05, -0.35, k2);
      } else {
        const up = t >= B(5) - 0.2 ? eo(pr(t, B(5) - 0.2, B(5) + 0.4)) : 1;
        const scroll = Math.max(0, Math.sin(t * (inTL ? 9 : 2.6))) * 0.05;
        aL.sh.rotation.set(-0.1, lerp(0.2, 0.42, up), -0.05); aL.el.rotation.x = lerp(-0.35, -1.05, up);
        aR.sh.rotation.set(-0.1, lerp(-0.2, -0.42, up), 0.05); aR.el.rotation.x = lerp(-0.35, -1.05, up) - scroll;
      }
      M.g.updateMatrixWorld(true);
      aL.hand.getWorldPosition(hw); aR.hand.getWorldPosition(hw2); M.head.getWorldPosition(headW);
      phone.position.copy(hw).add(hw2).multiplyScalar(0.5); phone.position.y += 0.05;
      if (down) phone.rotation.set(-1.2, 0, 0); else phone.lookAt(headW.x, headW.y + 0.12, headW.z);
      phoneL.position.copy(phone.position).add(new THREE.Vector3(0, 0.12, 0.16));
      phoneL.intensity = down ? 0 : lerp(0.3, 0.55, night(t)) + 0.06 * Math.sin(t * 7.3) * Math.sin(t * 2.1);

      // ---- Claude ----
      const kt = kT(t), tl2 = t >= TLM && t < TL1;
      const reading = tl2 && kt < 0.6, watering = tl2 && kt >= 0.6 && kt < 0.75, chess = tl2 && kt >= 0.75 && kt < 0.87, dozing = (tl2 && kt >= 0.87) || (t >= TL1 && t < B(3) - 0.25);
      let look = [-0.55, 0.0];                                         // toward Maddie
      if (reading) look = [0.15, 0.42]; if (watering) look = [0.55, 0.25]; if (chess) look = [0.1 + Math.sin(t * 6) * 0.2, 0.45];
      if (t >= B(3) - 0.25 && t < FLOP) look = [-0.55, 0.02];
      R.update(t, { talk: rT, look, mood: 'calm', glow: false });
      R.head.rotation.z += 0.12 * K.pulse(t, B(1) - 0.1, 1.0);             // skeptical tilt on "…Sure."
      if (dozing) { R.eyes.forEach(e => e.scale.y = 0.12); R.head.rotation.x = 0.32 + Math.sin(t * 2.2) * 0.04; R.head.rotation.z = 0.18; }
      // wake-up jolt
      const wake = K.wobble(t, B(3) - 0.25, 0.08, 20, 6); R.head.rotation.z += wake;
      // flop onto the pillow
      const fk = eb(pr(t, FLOP, FLOP + 0.55)) * (t >= FLOP ? 1 : 0);
      R.g.rotation.z = lerp(0, 1.42, Math.min(1, fk)); R.g.position.x = SX + 0.12 + 0.02 * fk;
      if (t >= FLOP + 0.6) { R.eyes.forEach(e => e.scale.y = 0.12); }
      pillow.scale.setScalar(t < B(6) + 0.05 ? 0.001 : Math.max(0.001, eb(pr(t, B(6) + 0.05, B(6) + 0.4))));
      bookG.visible = reading; chessG.visible = chess; can.visible = watering;
      R.head.getWorldPosition(rhead);
      if (watering) { can.position.set(rhead.x - 0.17, rhead.y - 0.16, rhead.z + 0.06); can.rotation.set(0, 0.2, 0.55 + Math.sin(t * 5) * 0.05);
        drops.forEach((d, i) => { const ph = (t * 2.5 + i / drops.length) % 1; d.visible = true; d.position.set(can.position.x - 0.1 - ph * 0.03, can.position.y - ph * 0.22, can.position.z); }); }
      else drops.forEach(d => d.visible = false);
      if (chess) pieces.forEach((p, i) => { const jj = jumps[(Math.floor((t - TL0) / 0.3) + i) % jumps.length]; p.position.set((jj[0]) * 0.16, 0.005, (jj[1]) * 0.16); });
      // plant grows (only seen in the wide shot)
      const g = t < TL0 ? 0.12 : t < TL1 ? lerp(0.12, 0.75, eo(kt)) : 0.75;
      stem.scale.y = g; stem.position.y = g / 2;
      leaves.forEach(({ lf, h, a }) => { const y = g * h; lf.position.set(Math.sin(a) * 0.05 * (0.4 + h), y, Math.cos(a) * 0.04 * (0.4 + h)); lf.rotation.y = a; lf.visible = h <= 0.25 || g > 0.2; lf.scale.setScalar(1).multiply(new THREE.Vector3(1.1 * (0.6 + g), 0.35, 0.6 * (0.6 + g))); });
      // chai steam -> cold
      const hot = t < TL0 ? 1 : 1 - cl(kt / 0.35);
      steam.forEach((s, i) => { const ph = ((t * 0.5 + i / steam.length) % 1); s.position.set(CHAI.x + Math.sin(i * 2 + t * 1.3) * 0.02, CHAI.y + 0.1 + ph * 0.25, CHAI.z); s.scale.setScalar(0.04 + ph * 0.09); s.material.opacity = 0.28 * Math.sin(ph * Math.PI) * hot; });
      tea.material.color.setHex(hot > 0.3 ? 0xb7773f : 0xa77a55); skinTop.visible = hot < 0.1;
      // wall clock: 7:00 PM -> 9:07 PM
      const mins = 19 * 60 + MIN(t) - 5 * (t >= TL0 ? 1 : 0) + (t >= TL0 ? 0 : 0);
      const wall = 19 * 60 + (t >= TL0 ? MIN(t) - 5 : 0) + Math.min(t, TL0) / 60 * 0;
      hM.rotation.z = -((wall % 60) / 60) * Math.PI * 2; hH.rotation.z = -(((wall / 60) % 12) / 12) * Math.PI * 2;
      hS.rotation.z = inTL ? -t * 40 : -Math.floor(t) / 60 * Math.PI * 2;
    };

    // ================= PHONE SCREEN (3D) =================
    const REELS = [
      ['cat falls asleep mid-meow', '😹', '#ff9a8b', '#ff6a88'], ['PART 2', '👀', '#4facfe', '#00f2fe'], ['Hyderabad biryani ranking', '🍗', '#f6d365', '#fda085'],
      ['how pyramids were built', '🔺', '#c2a36b', '#7a5a2e'], ["cousin's friend's wedding", '💃', '#f093fb', '#f5576c'], ['10 signs you\'re a genius', '🧠', '#a18cd1', '#fbc2eb'],
      ['satisfying soap cutting', '🧼', '#84fab0', '#8fd3f4'], ['dog vs cucumber', '🐶', '#ffecd2', '#fcb69f'], ['street food in 60s', '🌶️', '#ff512f', '#dd2476'],
      ['PART 47', '👀', '#30cfd0', '#330867'], ['this ad again', '📢', '#d4fc79', '#96e6a1'], ['cricket edit', '🏏', '#667eea', '#764ba2']];
    const swipe = t => {            // reel position (float): slow at first, faster and faster
      if (t < TL0) return Math.min(1.2, Math.max(0, (t - (E(0) - 0.2)) * 0.25));
      const k = kT(t); return 1.2 + Math.pow(k, 1.7) * 60;
    };
    const drawReel = (ctx, idx, x, y, w, h, scale = 1) => {
      const r = REELS[((idx % REELS.length) + REELS.length) % REELS.length];
      const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, r[2]); g.addColorStop(1, r[3]); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      ctx.save(); ctx.globalAlpha *= 0.18; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + w * 0.7, y + h * 0.25, w * 0.35, 0, 7); ctx.fill(); ctx.restore();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = `${Math.round(w * 0.32)}px "Noto Color Emoji", sans-serif`; ctx.fillText(r[1], x + w / 2, y + h * 0.42);
      ctx.fillStyle = '#fff'; ctx.font = `800 ${Math.round(w * 0.066)}px "Inter Display", sans-serif`; ctx.textAlign = 'left';
      const words = r[0].split(' '); let line = '', ly = y + h * 0.78; const lines = [];
      words.forEach(wd => { const tt = line ? line + ' ' + wd : wd; if (ctx.measureText(tt).width > w * 0.72 && line) { lines.push(line); line = wd; } else line = tt; }); lines.push(line);
      lines.forEach((ln, i) => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 8; ctx.fillText(ln, x + w * 0.07, ly + i * w * 0.08); ctx.restore(); });
      ctx.fillStyle = 'rgba(255,255,255,0.9)'; ['♥', '💬', '➤'].forEach((ic, i) => { ctx.font = `${Math.round(w * 0.07)}px "Noto Color Emoji", "Inter", sans-serif`; ctx.textAlign = 'center'; ctx.fillText(ic, x + w * 0.9, y + h * (0.5 + i * 0.1)); });
    };
    const drawFeed = (ctx, x, y, w, h, t) => {
      const p = swipe(t), i = Math.floor(p), f = p - i, e = K.ease(cl(f / 0.4)), off = e * h;
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
      drawReel(ctx, i, x, y - off, w, h); drawReel(ctx, i + 1, x, y + h - off, w, h);
      // progress line at the bottom of the reel
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x, y + h - 6, w, 3); ctx.fillStyle = '#fff'; ctx.fillRect(x, y + h - 6, w * ((t * 0.7) % 1), 3);
      ctx.restore();
    };
    const drawPhoneScreen = t => { if (phoneDown(t)) { psx.fillStyle = '#050507'; psx.fillRect(0, 0, 170, 340); } else drawFeed(psx, 0, 0, 170, 340, t); pTex.needsUpdate = true; };

    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const HY = 1.3;   // Maddie's head height
    const TWO = [P([0.26, 1.34, 4.75], [0.26, 1.08, -0.1], 40), P([0.26, 1.32, 4.5], [0.26, 1.08, -0.1], 40)];
    const FEED = [P([BX, 1.0, 2.55], [BX, 1.52, MZ], 36), P([BX, 1.0, 2.4], [BX, 1.52, MZ], 36)];          // low, face sits low in frame under the phone graphic
    const WIDE = [P([0.26, 1.34, 4.85], [0.26, 1.16, -0.2], 40), P([0.26, 1.34, 4.85], [0.26, 1.16, -0.2], 40)]; // locked off: it's a time-lapse
    const MAD = [P([BX - 0.05, 1.36, 2.85], [BX, 1.18, MZ], 32), P([BX - 0.05, 1.35, 2.65], [BX, 1.18, MZ], 32)];
    const ROBO = [P([SX - 0.1, 0.98, 1.45], [SX + 0.1, 0.84, SZ], 32), P([SX - 0.1, 0.97, 1.33], [SX + 0.1, 0.84, SZ], 32)];
    const STAT = [P([SX - 0.15, 0.82, 1.55], [SX + 0.1, 0.96, SZ], 34), P([SX - 0.14, 0.82, 1.45], [SX + 0.1, 0.96, SZ], 34)];
    const NOWAY = [P([BX + 0.02, 1.34, 2.95], [BX, 1.46, MZ], 30), P([BX + 0.02, 1.34, 2.75], [BX, 1.46, MZ], 30)];
    const OUTW = [P([0.26, 1.32, 4.5], [0.26, 1.1, -0.1], 40), P([0.26, 1.45, 5.1], [0.26, 1.24, -0.1], 40)];
    const plan = [
      [0, TL0, TWO], [TL0, TLM, FEED], [TLM, TL1 + 0.15, WIDE],
      [TL1 + 0.15, B(3) - 0.3, MAD], [B(3) - 0.3, STATS - 0.05, ROBO], [STATS - 0.05, B(4) - 0.05, STAT], [B(4) - 0.05, B(5) - 0.35, NOWAY],
      [B(5) - 0.35, CTA, TWO], [CTA, D + 5, OUTW],
    ];
    const smooth = k => k * k * (3 - 2 * k);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth }));
    const fadeAt = [TL0, TLM, TL1 + 0.15, CTA];
    const fade = t => { let a = 0; fadeAt.forEach(c => { const d = Math.abs(t - c); if (d < 0.2) a = Math.max(a, (1 - d / 0.2) * 0.75); }); return a; };

    // ================= HUD =================
    S.add(K.cam);
    const HW = 1080, HH = 1920, hc = document.createElement('canvas'); hc.width = HW; hc.height = HH; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, depthTest: false, depthWrite: false, toneMapped: false }));
    hud.renderOrder = 1000; K.cam.add(hud);
    const ACC = '#ffc53d', RED = '#ff5a5f', GRN = '#3ddc97', INK = 'rgba(14,14,20,0.88)', TXT = '#fbf7f0', DIM = 'rgba(251,247,240,0.65)';
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

    // 0: POV hook
    const drawPOV = t => {
      const a = Math.min(fin(t, 0.05, 0.4), 1 - pr(t, TL0 - 0.3, TL0)); if (a <= 0) return;
      h.save(); h.globalAlpha = a; const y = 230 + (1 - fin(t, 0.05, 0.5)) * -30;
      card(90, y - 90, 900, 250, 34, 'rgba(236,232,224,0.97)', null);
      txt('POV: you open Instagram', 540, y - 18, 58, '#111', 800, 'center', 1, '"Inter Display"');
      txt('for 5 minutes', 540, y + 62, 58, '#111', 800, 'center', 1, '"Inter Display"');
      const ul = eo(pr(t, 0.45, 1.0)); h.fillStyle = igGrad(310, 770); h.fillRect(540 - 230 * ul, y + 108, 460 * ul, 9);
      chip('🕖  7:00 PM', 540, y + 230, 34, 'rgba(14,14,20,0.8)', TXT, fin(t, 0.6, 0.4), 1, 700);
      h.restore();
    };
    // 1: big phone feed (first half of the time-lapse)
    const drawFeedHUD = t => {
      const a = Math.min(fin(t, TL0, 0.3), 1 - pr(t, TLM - 0.25, TLM)); if (a <= 0) return;
      h.save(); h.globalAlpha = a;
      const pw = 470, ph = 836, x = 540 - pw / 2, y = 250 + (1 - fin(t, TL0, 0.5)) * 60;
      h.shadowColor = 'rgba(0,0,0,0.55)'; h.shadowBlur = 50; card(x - 16, y - 16, pw + 32, ph + 32, 62, '#101115', null); h.shadowBlur = 0;
      h.save(); h.beginPath(); h.roundRect(x, y, pw, ph, 48); h.clip(); drawFeed(h, x, y, pw, ph, t);
      h.fillStyle = 'rgba(0,0,0,0.25)'; h.fillRect(x, y, pw, 60); txt('Reels', x + 28, y + 32, 28, '#fff', 800); h.restore();
      // screen time chip above the phone
      const m = MIN(t); chip(`⏱  Screen time ${hm(m)}`, 540, 175, 36, m > 60 ? 'rgba(255,90,95,0.95)' : 'rgba(14,14,20,0.85)', '#fff', 1, 1 + 0.06 * Math.max(0, Math.sin(t * 9)) * (m > 60 ? 1 : 0), 800);
      h.restore();
    };
    // 2: time-lapse clock + screen-time ring (second half, wide room)
    const drawClockHUD = t => {
      const a = Math.min(fin(t, TLM, 0.3), 1 - pr(t, TL1 + 0.05, TL1 + 0.35)); if (a <= 0) return;
      h.save(); h.globalAlpha = a;
      card(150, 130, 780, 300, 36);
      txt(clockStr(wallMin(t)), 400, 255, 96, TXT, 800, 'center', 1, '"Inter Display"');
      txt('TIME NOW', 400, 180, 24, DIM, 700, 'center');
      txt('⏩ time flies', 400, 350, 30, ACC, 700, 'center');
      // ring
      const m = MIN(t), cx = 760, cy = 280, rr2 = 105, k = cl(m / 127);
      h.lineWidth = 20; h.strokeStyle = 'rgba(255,255,255,0.12)'; h.beginPath(); h.arc(cx, cy, rr2, 0, 7); h.stroke();
      const g = h.createLinearGradient(cx - rr2, cy, cx + rr2, cy); g.addColorStop(0, ACC); g.addColorStop(1, RED); h.strokeStyle = g; h.lineCap = 'round';
      h.beginPath(); h.arc(cx, cy, rr2, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.01, k)); h.stroke();
      txt(hm(m), cx, cy - 6, 40, TXT, 800, 'center', 1, '"Inter Display"'); txt('screen time', cx, cy + 36, 22, DIM, 500, 'center');
      h.restore();
      // reels counter chip
      chip(`${Math.round(312 * Math.pow(kT(t), 1.25))} reels watched`, 540, 500, 34, 'rgba(14,14,20,0.82)', TXT, a, 1, 700);
    };
    // 3: in-world tags: "cold 🧊" at the chai, "Zzz" at Claude, "+ growing" plant
    const drawTags = t => {
      const wideOn = (t >= TLM && t < TL1 + 0.15);
      if (wideOn) {
        const ck = pop(t, TL0 + (TL1 - TL0) * 0.5, 0.4); if (ck > 0) { const [x, y] = toScreen(new THREE.Vector3(CHAI.x, CHAI.y + 0.2, CHAI.z)); chip('cold 🧊', Math.max(150, x + 40), y - 30, 30, 'rgba(232,228,220,0.95)', '#123', cl(ck * 1.5), 0.6 + 0.4 * ck, 800); }
        const kt = kT(t);
        if (kt > 0.6 && kt < 0.75) { const [x, y] = toScreen(new THREE.Vector3(potX, STOP + 0.65, potZ)); chip('🌱 growing', x, y, 26, 'rgba(61,220,151,0.95)', '#0d1a12', 1, 1, 800); }
        if (kt > 0.75 && kt < 0.87) { const [x, y] = toScreen(new THREE.Vector3(SX, STOP + 0.62, SZ)); chip('♟️ vs himself', x, y, 26, 'rgba(232,228,220,0.95)', '#222', 1, 1, 800); }
      }
      const doz = (t >= TLM && kT(t) >= 0.87 && t < B(3) - 0.25);
      if (doz) { const [x, y] = toScreen(new THREE.Vector3(R.g.position.x + 0.02, STOP + 0.62, SZ));
        ['Z', 'z', 'z'].forEach((z, i) => { const ph = ((t * 0.9 + i * 0.33) % 1); txt(z, x + 30 + ph * 60 + i * 8, y - ph * 120, 40 + i * 6 - ph * 10, '#fff', 900, 'center', Math.sin(ph * Math.PI), '"Inter Display"'); }); }
      if (t >= FLOP + 0.7 && t < CTA) { const [x, y] = toScreen(new THREE.Vector3(SX - 0.12, STOP + 0.3, SZ));
        ['Z', 'z'].forEach((z, i) => { const ph = ((t * 0.9 + i * 0.5) % 1); txt(z, x + ph * 50 + i * 10, y - ph * 100, 38 - ph * 10, '#fff', 900, 'center', Math.sin(ph * Math.PI), '"Inter Display"'); }); }
    };
    // 4: stats card
    const drawStats = t => {
      const a = Math.min(fin(t, STATS, 0.15), 1 - pr(t, B(5) - 0.6, B(5) - 0.3)); if (a <= 0) return;
      const k = pop(t, STATS, 0.45);
      h.save(); h.globalAlpha = a; h.translate(540, 470); h.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); h.translate(-540, -470);
      h.shadowColor = 'rgba(0,0,0,0.45)'; h.shadowBlur = 40; card(110, 150, 860, 640, 40, 'rgba(236,232,224,0.98)', null); h.shadowBlur = 0;
      h.fillStyle = igGrad(110, 970); h.beginPath(); h.roundRect(110, 150, 860, 14, [40, 40, 0, 0]); h.fill();
      txt('YOUR "5 MINUTES"', 540, 230, 30, '#6b6872', 800, 'center');
      txt('2h 07m', 540, 340, 140, '#15141a', 900, 'center', 1, '"Inter Display"');
      const row = (l, r, y, rc = '#15141a', i = 0) => { const kk = fin(t, STATS + 0.25 + i * 0.18, 0.3); txt(l, 190, y, 40, '#4a4752', 500, 'left', kk); txt(r, 890, y, 44, rc, 800, 'right', kk); };
      row('Planned', '5 min', 480, '#15141a', 0); row('Reels watched', '312', 560, '#15141a', 1); row('Learned', 'nothing', 640, RED, 2);
      h.strokeStyle = 'rgba(0,0,0,0.08)'; h.lineWidth = 2; [520, 600].forEach(y => { h.beginPath(); h.moveTo(190, y); h.lineTo(890, y); h.stroke(); });
      h.restore();
    };
    // 5: CTA (no handle)
    const drawCTA = t => {
      const a = fin(t, CTA + 0.1, 0.5); if (a <= 0) return;
      const k = pop(t, B(7) + 0.15, 0.6);
      h.save(); h.globalAlpha = a; card(160, 160, 760, 470, 38);
      txt('Comment', 540, 250, 46, 'rgba(255,245,235,0.85)', 300, 'center');
      h.save(); h.translate(540, 370); h.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); txt('STOP', 0, 0, 150, ACC, 900, 'center', 1, '"Inter Display"'); h.restore();
      const ul = eo(pr(t, B(7) + 0.7, B(7) + 1.3)); h.fillStyle = igGrad(380, 700); h.fillRect(540 - 160 * ul, 458, 320 * ul, 8);
      txt('3 settings to get your', 540, 520, 38, 'rgba(255,245,235,0.85)', 400, 'center', fin(t, B(7) + 0.9, 0.4));
      txt('2 hours back 📵', 540, 572, 38, 'rgba(255,245,235,0.85)', 400, 'center', fin(t, B(7) + 1.0, 0.4));
      h.restore();
    };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.32, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.38)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1;
      h.drawImage(vig, 0, 0);
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 5); h.fillStyle = igGrad(0, HW); h.fillRect(0, 0, HW * cl(t / D), 5);
      drawPOV(t); drawFeedHUD(t); drawClockHUD(t); drawTags(t); drawStats(t); drawCTA(t);
      const f = fade(t); if (f > 0) { h.fillStyle = `rgba(0,0,0,${f})`; h.fillRect(0, 0, HW, HH); }
      hTex.needsUpdate = true;
    };
    const curFov = t => { const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; const k = smooth(cl((t - p[0]) / (p[1] - p[0]))); return lerp(p[2][0].fov, p[2][1].fov, k); };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { lights(t); acting(t); drawPhoneScreen(t); K.shoot(t, shots); K.cam.updateMatrixWorld(true); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['pop', 0.15, 0.35], ['ding', 0.75, 0.15]);
    sfx.push(['whoosh', TL0 - 0.25, 0.3], ['riser', TL1 - 2.6, 0.5]);
    // reel swipes + clock ticks speeding up through the time-lapse
    for (let t = TL0; t < TL1; ) { const k = kT(t); sfx.push(['tick', t, 0.32]); t += lerp(0.42, 0.09, Math.pow(k, 0.8)); }
    sfx.push(['whoosh', TLM - 0.2, 0.25]);
    sfx.push(['pop', TL0 + (TL1 - TL0) * 0.5, 0.3]);
    sfx.push(['boing', B(3) - 0.25, 0.18]);
    sfx.push(['bass', STATS, 0.55], ['thud', STATS + 0.02, 0.5]);
    for (let i = 0; i < 3; i++) sfx.push(['tick', STATS + 0.25 + i * 0.18, 0.4]);
    sfx.push(['pop', B(6) + 0.05, 0.35], ['thud', FLOP + 0.4, 0.45]);
    sfx.push(['whoosh', CTA - 0.1, 0.22], ['pop', B(7) + 0.15, 0.4]);
    return { duration: D, update: t => update(t), shots, sfx, watermark: false, endCard: false,
      music: { muteFrom: B(3) - 0.35, muteTo: E(4) + 0.25 }, capFont: 'Inter Display', capMarginV: 520, capSize: 54 };
  },
};
