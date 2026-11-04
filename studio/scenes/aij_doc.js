/* @ai.jugaadd "Maddie: A Documentary" — Claude narrates Maddie's 2 AM life like a wildlife documentary.
   Night bedroom, phone glow, slow push-ins, letterbox + film grain + doc lower-thirds. Twist: Maddie looks into the lens,
   reverse shot reveals Claude in the doorway with a mic and a camcorder. Pillow. Deadpan.
   Maddie warm & young, Claude dry & British (no glow). No handle on the reel. Subtitles higher. CTA: comment ROAST. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x07080f, fog: null, fov: 34, bloom: { strength: 0.32, radius: 0.55, threshold: 0.88 } },
  lines: [
    { who: 'claude', text: 'Here we observe the engineering graduate, in his natural habitat.', say: 'Here we observe the engineering graduate, in his natural habitat.' },
    { who: 'claude', text: '2:47 AM. "Five more minutes"… nine times.', say: 'Two forty seven, A M. Five more minutes. Nine times.', gap: 0.45 },
    { who: 'claude', text: 'Today, he bought a gym membership.', say: 'Today, he bought a gym membership.', gap: 0.45 },
    { who: 'claude', text: 'He has not yet located the gym.', say: 'He has not yet located the gym.', gap: 0.3 },
    { who: 'claude', text: 'Fourteen startup ideas. Zero started.', say: 'Fourteen startup ideas. Zero started.', gap: 0.45 },
    { who: 'claude', text: 'Remarkable.', say: 'Remarkable.', gap: 0.5 },
    { who: 'maddie', text: 'Bro… are you narrating me?', say: 'Bro... are you narrating me?', gap: 0.95 },
    { who: 'claude', text: 'The subject has detected the narrator.', say: 'The subject has detected the narrator.', gap: 0.45 },
    { who: 'claude', text: 'Aggression. Common after midnight.', say: 'Aggression. Common after midnight.', gap: 1.3 },
    { who: 'claude', text: 'Comment ROAST. Your documentary is next.', say: 'Comment, roast. Your documentary is next.', gap: 0.6 },
  ].map(l => ({ gap: 0.35, ...l, speed: l.who === 'claude' ? 1.1 : 1.0 })),

  build(K, T) {
    const L = T.lines, B = i => L[i].t, E = i => L[i].end, N = L.length, D = E(N - 1) + 1.9;
    const cl = K.clamp, eo = K.easeOut, pr = K.prog, eb = K.easeBack;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = (c) => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2, h / 2, d / 2)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const plane = (w, h, m, x, y, z, ry = 0, parent = S) => { const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); o.position.set(x, y, z); o.rotation.y = ry; o.receiveShadow = true; parent.add(o); return o; };

    // ================= TIMELINE =================
    const S2 = B(1) - 0.4, S3 = B(2) - 0.35, S3B = B(3) - 0.25, S4 = B(4) - 0.35, S4B = B(5) - 0.3;
    const S5 = B(6) - 0.85;                 // Maddie slowly looks up into the lens
    const S6 = B(7) - 0.35;                 // reverse shot: the narrator
    const THROW = E(7) + 0.3, HIT = THROW + 0.5;
    const S6C = HIT + 0.25;                 // Claude close-up, deadpan
    const S7 = B(9) - 0.35;                 // CTA

    // ================= BEDROOM (night) =================
    const RX = 1.6, ZB = -1.6, ZF = 2.2, H = 2.7;
    const floorTex = K.canvasTex(1024, 1024, (x, w, h) => {
      for (let i = 0; i < 12; i++) { x.fillStyle = ['#6b4a34', '#735039', '#664630'][i % 3]; x.fillRect(0, i * 86, w, 86); }
      const r = K.rng(3); x.strokeStyle = 'rgba(30,18,10,0.45)'; x.lineWidth = 2;
      for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(0, i * 86); x.lineTo(w, i * 86); x.stroke(); for (let k = 0; k < 2; k++) { const xx = r() * w; x.beginPath(); x.moveTo(xx, i * 86); x.lineTo(xx, i * 86 + 86); x.stroke(); } }
    });
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(2, 2.4);
    rbox(RX * 2, 0.1, ZF - ZB, SM(0xffffff, 0.7, { map: floorTex }), 0, -0.05, (ZF + ZB) / 2, 0.01).castShadow = false;
    // rug under the bed foot
    const rug = new THREE.Mesh(new THREE.CircleGeometry(0.85, 48), SM(0x3b4a6b, 0.95)); rug.rotation.x = -Math.PI / 2; rug.scale.set(1.25, 0.85, 1); rug.position.set(-0.45, 0.003, 0.95); rug.receiveShadow = true; S.add(rug);
    const rug2 = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.76, 48), SM(0xd9c7a2, 0.95)); rug2.rotation.x = -Math.PI / 2; rug2.scale.set(1.25, 0.85, 1); rug2.position.set(-0.45, 0.005, 0.95); S.add(rug2);
    // walls: deep teal-navy paint
    const wallM = SM(0x2c3a4f, 0.95);
    const wallTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#34445c'; x.fillRect(0, 0, w, h); const r = K.rng(9); for (let i = 0; i < 1800; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},0.025)`; x.fillRect(r() * w, r() * h, 2, 2); } });
    const wallTM = SM(0xffffff, 0.95, { map: wallTex });
    // back wall with a window cut out (x 0.45..1.25, y 1.0..2.0)
    const WX0 = 0.45, WX1 = 1.25, WY0 = 1.0, WY1 = 2.0;
    rbox(WX0 + RX, H, 0.08, wallTM, (-RX + WX0) / 2, H / 2, ZB, 0.005);
    rbox(RX - WX1, H, 0.08, wallTM, (WX1 + RX) / 2, H / 2, ZB, 0.005);
    rbox(WX1 - WX0, WY0, 0.08, wallTM, (WX0 + WX1) / 2, WY0 / 2, ZB, 0.005);
    rbox(WX1 - WX0, H - WY1, 0.08, wallTM, (WX0 + WX1) / 2, (H + WY1) / 2, ZB, 0.005);
    // night city through the window
    const nightTex = K.canvasTex(800, 1000, (x, w, h) => {
      const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0b1230'); g.addColorStop(0.6, '#1b2552'); g.addColorStop(1, '#3a3060'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      const r = K.rng(5); for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.6})`; x.fillRect(r() * w, r() * h * 0.55, 2, 2); }
      const mg = x.createRadialGradient(560, 220, 10, 560, 220, 160); mg.addColorStop(0, 'rgba(255,250,230,0.5)'); mg.addColorStop(1, 'rgba(255,250,230,0)'); x.fillStyle = mg; x.fillRect(0, 0, w, h);
      x.fillStyle = '#fff6dc'; x.beginPath(); x.arc(560, 220, 62, 0, 7); x.fill(); x.fillStyle = '#1b2552'; x.beginPath(); x.arc(585, 205, 58, 0, 7); x.fill();
      for (let layer = 0; layer < 2; layer++) for (let bx = -20; bx < w; bx += 40 + r() * 70) {
        const bw = 60 + r() * 100, bh = [300, 200][layer] + r() * [260, 180][layer], top = h - bh;
        x.fillStyle = ['#151a35', '#0c1026'][layer]; x.fillRect(bx, top, bw, bh);
        for (let wy = top + 16; wy < h - 10; wy += 26) for (let wx = bx + 10; wx < bx + bw - 12; wx += 20) if (r() < (layer ? 0.18 : 0.28)) { x.fillStyle = r() < 0.7 ? 'rgba(255,200,120,0.85)' : 'rgba(170,200,255,0.7)'; x.fillRect(wx, wy, 9, 13); }
      }
    });
    plane(WX1 - WX0 + 0.6, WY1 - WY0 + 0.7, BM(0xffffff).clone(), (WX0 + WX1) / 2, (WY0 + WY1) / 2, ZB - 0.3).material.map = nightTex;
    const frameM = SM(0xe9e1d2, 0.6);
    rbox(WX1 - WX0 + 0.08, 0.06, 0.12, frameM, (WX0 + WX1) / 2, WY0, ZB + 0.03); rbox(WX1 - WX0 + 0.08, 0.05, 0.1, frameM, (WX0 + WX1) / 2, WY1, ZB + 0.02);
    rbox(0.05, WY1 - WY0, 0.1, frameM, WX0, (WY0 + WY1) / 2, ZB + 0.02); rbox(0.05, WY1 - WY0, 0.1, frameM, WX1, (WY0 + WY1) / 2, ZB + 0.02); rbox(0.035, WY1 - WY0, 0.08, frameM, (WX0 + WX1) / 2, (WY0 + WY1) / 2, ZB + 0.02);
    rbox(WX1 - WX0 + 0.2, 0.04, 0.2, frameM, (WX0 + WX1) / 2, WY0 - 0.02, ZB + 0.1);   // sill
    // curtain
    const curtM = SM(0x8a5a44, 0.95);
    for (let i = 0; i < 4; i++) { const c = cyl(0.045, 0.06, 1.4, curtM, WX1 + 0.1 + i * 0.07, 1.55, ZB + 0.12, 12); c.scale.z = 0.6; }
    cyl(0.012, 0.012, 1.3, SM(0x2b2a2e, 0.4, { metalness: 0.5 }), 0.95, 2.28, ZB + 0.12, 8).rotation.z = Math.PI / 2;
    // left + right walls
    rbox(0.08, H, ZF - ZB, wallTM, -RX, H / 2, (ZF + ZB) / 2, 0.005);
    rbox(0.08, H, ZF - ZB, wallTM, RX, H / 2, (ZF + ZB) / 2, 0.005);
    // front wall (faces -z) with the doorway (x -0.85..-0.05, height 2.05) — only rendered from inside
    const DX0 = -0.85, DX1 = -0.05, DH = 2.05;
    const fw = (w, h, x, y) => plane(w, h, wallTM, x, y, ZF, Math.PI);
    fw(DX0 + RX, H, (-RX + DX0) / 2, H / 2); fw(RX - DX1, H, (DX1 + RX) / 2, H / 2); fw(DX1 - DX0, H - DH, (DX0 + DX1) / 2, (H + DH) / 2);
    const trimM = SM(0xe9e1d2, 0.6);
    const nFront0 = S.children.length;
    rbox(0.07, DH, 0.1, trimM, DX0 - 0.035, DH / 2, ZF - 0.02); rbox(0.07, DH, 0.1, trimM, DX1 + 0.035, DH / 2, ZF - 0.02); rbox(DX1 - DX0 + 0.14, 0.07, 0.1, trimM, (DX0 + DX1) / 2, DH + 0.035, ZF - 0.02);
    // hallway behind the door: warm light
    rbox(1.6, 0.05, 1.4, SM(0x7a5a40, 0.7), -0.45, -0.02, ZF + 0.7, 0.01);
    plane(1.6, 2.6, SM(0xd9b38a, 0.9), -0.45, 1.3, ZF + 1.35, Math.PI);
    plane(1.4, 2.6, SM(0xcfa57c, 0.9), -1.2, 1.3, ZF + 0.7, Math.PI / 2); plane(1.4, 2.6, SM(0xcfa57c, 0.9), 0.3, 1.3, ZF + 0.7, -Math.PI / 2);
    const door = new THREE.Group(); door.position.set(DX1, 0, ZF + 0.02); S.add(door); door.rotation.y = -1.9;   // swung open into the hallway
    rbox(0.8, DH - 0.02, 0.04, SM(0xe2d6c4, 0.7), -0.4, DH / 2, 0, 0.01, door);
    cyl(0.025, 0.025, 0.03, SM(0xc9a24a, 0.3, { metalness: 0.8 }), -0.72, 1.0, 0.04, 12, door).rotation.x = Math.PI / 2;
    const front = new THREE.Group(); S.children.slice(nFront0).forEach(o => front.add(o)); S.add(front);   // doorway trim + hallway: only shown in reverse shots
    // skirting
    const skirtM = SM(0xe9e1d2, 0.6);
    rbox(RX * 2, 0.08, 0.02, skirtM, 0, 0.04, ZB + 0.05); rbox(0.02, 0.08, ZF - ZB, skirtM, -RX + 0.05, 0.04, (ZF + ZB) / 2); rbox(0.02, 0.08, ZF - ZB, skirtM, RX - 0.05, 0.04, (ZF + ZB) / 2);

    // bed (headboard on the back wall, foot toward camera)
    const BX = -0.45, BW = 1.3, BZ0 = ZB + 0.05, BZ1 = 0.45, BTOP = 0.5;
    const bedWood = SM(0x5a3d2b, 0.6);
    rbox(BW + 0.06, 0.22, BZ1 - BZ0, bedWood, BX, 0.16, (BZ0 + BZ1) / 2, 0.03);
    rbox(BW + 0.1, 1.0, 0.08, bedWood, BX, 0.62, BZ0 + 0.02, 0.03);                         // headboard
    rbox(BW + 0.1, 0.36, 0.06, bedWood, BX, 0.27, BZ1 + 0.02, 0.03);                         // footboard low
    rbox(BW, 0.2, BZ1 - BZ0 - 0.04, SM(0xf1ede6, 0.9), BX, BTOP - 0.1 + 0.02, (BZ0 + BZ1) / 2, 0.06);  // mattress
    // duvet: rumpled, mustard
    const duv = rbox(BW + 0.04, 0.1, 1.15, SM(0xd29b3c, 0.95), BX, BTOP + 0.03, -0.62, 0.05);
    for (let i = 0; i < 4; i++) { const f = cyl(0.06, 0.06, BW - 0.1, SM(0xc58f34, 0.95), BX, BTOP + 0.07, -0.95 + i * 0.25, 16); f.rotation.z = Math.PI / 2; f.scale.y = 1; }
    // pillows at head
    const pilM = SM(0xf6f2ea, 0.95);
    [-0.3, 0.3].forEach(dx => { const p = rbox(0.5, 0.12, 0.3, pilM, BX + dx, BTOP + 0.08, BZ0 + 0.25, 0.06); p.rotation.x = -0.25; });
    // the throwable cushion (beside Maddie)
    const cush = new THREE.Group(); S.add(cush);
    rbox(0.3, 0.1, 0.3, SM(0x4fa38f, 0.95), 0, 0, 0, 0.05, cush);
    const CUSH0 = new THREE.Vector3(BX + 0.42, BTOP + 0.08, 0.12);
    cush.position.copy(CUSH0); cush.rotation.set(0.1, 0.4, 0.05);
    // charger cable snaking off the bed
    const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(BX - 0.2, BTOP + 0.08, 0.2), new THREE.Vector3(BX - 0.5, BTOP + 0.07, 0.0), new THREE.Vector3(BX - 0.68, 0.4, -0.1), new THREE.Vector3(BX - 0.7, 0.2, -0.5), new THREE.Vector3(-RX + 0.08, 0.3, -0.7)]), 40, 0.006, 6), SM(0xf0f0f0, 0.5)); S.add(cable);

    // side table + lamp (left of bed)
    const stX = -1.32, stZ = -1.25;
    rbox(0.4, 0.5, 0.36, SM(0x6e4a33, 0.6), stX, 0.25, stZ, 0.02);
    cyl(0.07, 0.09, 0.03, SM(0x2b2a2e, 0.4), stX, 0.515, stZ, 20); cyl(0.012, 0.012, 0.28, SM(0x2b2a2e, 0.4), stX, 0.66, stZ, 8);
    const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 0.16, 28, 1, true), SM(0xf2e2c2, 0.8, { side: THREE.DoubleSide, emissive: 0xffb760, emissiveIntensity: 0.35 })); shade.position.set(stX, 0.82, stZ); S.add(shade);
    const lampL = new THREE.PointLight(0xffb766, 0.7, 2.6, 1.6); lampL.position.set(stX, 0.82, stZ); S.add(lampL);
    // empty Maggi packet + water bottle on table
    const pack = K.canvasTex(256, 200, (x, w, h) => { x.fillStyle = '#f6c21c'; x.fillRect(0, 0, w, h); x.fillStyle = '#d6271b'; x.fillRect(0, 0, w, 70); x.fillStyle = '#fff'; x.font = '900 52px "Inter Display"'; x.textAlign = 'center'; x.fillText('NOODLES', w / 2, 54); x.fillStyle = '#7a3b10'; x.font = '700 30px "Inter"'; x.fillText('2-minute', w / 2, 130); });
    const pk = rbox(0.16, 0.012, 0.12, SM(0xffffff, 0.6, { map: pack }), stX + 0.06, 0.508, stZ + 0.08, 0.004); pk.rotation.y = 0.5;
    cyl(0.03, 0.03, 0.2, SM(0x8fd0ff, 0.15, { transparent: true, opacity: 0.6 }), stX - 0.11, 0.6, stZ - 0.04, 16);

    // wall clock above the bed (hands at 2:47)
    const clockG = new THREE.Group(); clockG.position.set(BX, 1.95, ZB + 0.06); S.add(clockG);
    cyl(0.19, 0.19, 0.04, SM(0x1d1d22, 0.4), 0, 0, 0, 40, clockG).rotation.x = Math.PI / 2;
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.165, 40), SM(0xf6f1e7, 0.6)); face.position.z = 0.022; clockG.add(face);
    for (let i = 0; i < 12; i++) { const tk = new THREE.Mesh(new THREE.PlaneGeometry(i % 3 ? 0.008 : 0.016, 0.03), BM(0x1d1d22)); const a = i / 12 * Math.PI * 2; tk.position.set(Math.sin(a) * 0.14, Math.cos(a) * 0.14, 0.024); tk.rotation.z = -a; clockG.add(tk); }
    const hand = (len, w, a, c = 0x1d1d22) => { const g = new THREE.Group(); g.position.z = 0.026; g.rotation.z = -a; clockG.add(g); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, len), BM(c)); m.position.y = len / 2 - 0.015; g.add(m); return g; };
    const hH = hand(0.09, 0.014, (2 + 47 / 60) / 12 * Math.PI * 2), hM = hand(0.13, 0.009, 47 / 60 * Math.PI * 2), hS = hand(0.14, 0.004, 0, 0xd94a3a);
    // poster + fairy lights on back wall
    const poster = K.canvasTex(400, 560, (x, w, h) => {
      const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ff7a45'); g.addColorStop(1, '#a8325a'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(255,255,255,0.12)'; x.beginPath(); x.arc(w / 2, 230, 130, 0, 7); x.fill();
      x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '900 86px "Inter Display"'; x.fillText('RISE', w / 2, 420); x.fillText('& GRIND', w / 2, 500);
      x.font = '600 26px "Inter"'; x.fillText('5 AM CLUB', w / 2, 80);
    });
    rbox(0.42, 0.58, 0.015, SM(0xffffff, 0.8, { map: poster }), 1.05 - 1.75 - 0.2, 1.62, ZB + 0.05, 0.004).position.x = -1.3 + 0.0;
    const fairy = [];
    for (let i = 0; i < 16; i++) { const x = -1.5 + i * 0.19, y = 2.42 - Math.sin(i / 15 * Math.PI) * 0.12 - (i % 2) * 0.02;
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), BM(0xffc770)); b.position.set(x, y, ZB + 0.07); S.add(b); fairy.push(b); }
    const fairyL = new THREE.PointLight(0xffb44a, 0.5, 2.2, 1.7); fairyL.position.set(-0.3, 2.3, ZB + 0.3); S.add(fairyL);
    // gym bag + new shoes with tags (right side, by the wall)
    const bagG = new THREE.Group(); bagG.position.set(0.72, 0, -0.35); bagG.rotation.y = -0.35; S.add(bagG);
    const bagM = SM(0x34405c, 0.75);
    const bagB = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.42, 10, 20), bagM); bagB.rotation.z = Math.PI / 2; bagB.position.y = 0.17; bagB.scale.z = 0.85; bagB.castShadow = true; bagG.add(bagB);
    rbox(0.5, 0.025, 0.05, SM(0xe0663a, 0.6), 0, 0.33, 0.0, 0.01, bagG);   // zip stripe
    const strap = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.014, 8, 30, Math.PI), SM(0x14171f, 0.7)); strap.position.set(0, 0.32, 0); bagG.add(strap);
    const tagTex = K.canvasTex(256, 160, (x, w, h) => { x.fillStyle = '#fffaf0'; x.fillRect(0, 0, w, h); x.fillStyle = '#d6271b'; x.font = '900 46px "Inter Display"'; x.textAlign = 'center'; x.fillText('NEW', w / 2, 56); x.fillStyle = '#222'; x.font = '700 34px "Inter"'; x.fillText('₹2,999', w / 2, 112); x.font = '500 22px "Inter"'; x.fillText('12 MONTHS', w / 2, 145); });
    const tag = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.07), SM(0xffffff, 0.6, { map: tagTex, side: THREE.DoubleSide })); tag.position.set(0.18, 0.22, 0.18); tag.rotation.set(0, 0.3, 0.12); bagG.add(tag);
    cyl(0.0015, 0.0015, 0.08, SM(0xdddddd), 0.2, 0.28, 0.17, 4, bagG).rotation.z = 0.4;
    // shoes in a box
    const boxG = new THREE.Group(); boxG.position.set(1.1, 0, 0.1); boxG.rotation.y = -0.6; S.add(boxG);
    rbox(0.36, 0.12, 0.22, SM(0xe9e4da, 0.8), 0, 0.06, 0, 0.01, boxG);
    rbox(0.38, 0.03, 0.24, SM(0xe0663a, 0.7), 0.06, 0.24, -0.08, 0.01, boxG).rotation.z = 0.5;
    [-0.08, 0.08].forEach(dx => { rbox(0.11, 0.07, 0.26, SM(0xf4f4f6, 0.6), dx, 0.13, 0.01, 0.03, boxG); rbox(0.112, 0.02, 0.262, SM(0xe0663a, 0.6), dx, 0.1, 0.01, 0.008, boxG); });
    // desk corner (right back) with laptop closed + plant
    rbox(0.7, 0.04, 0.5, SM(0x8a6040, 0.55), 1.2, 0.74, -1.25, 0.01);
    [[0.9, -1.45], [1.5, -1.45], [0.9, -1.05], [1.5, -1.05]].forEach(([x, z]) => rbox(0.035, 0.72, 0.035, SM(0x2b2a2e, 0.4, { metalness: 0.5 }), x, 0.36, z, 0.01));
    rbox(0.36, 0.025, 0.25, SM(0xb7bcc4, 0.35, { metalness: 0.5 }), 1.15, 0.775, -1.25, 0.008);
    cyl(0.08, 0.06, 0.14, SM(0xd8cfc2, 0.6), 1.42, 0.83, -1.35, 20);
    const leafM = [SM(0x3f8f4e, 0.8), SM(0x2f7a42, 0.8)];
    for (let i = 0; i < 9; i++) { const lf = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), leafM[i % 2]); const a = i * 2.3; lf.position.set(1.42 + Math.sin(a) * 0.06, 0.95 + (i % 3) * 0.05, -1.35 + Math.cos(a) * 0.05); lf.scale.set(0.6, 1.6, 0.4); lf.rotation.z = Math.sin(a) * 0.6; S.add(lf); }

    // ================= CHARACTERS =================
    const MZ = 0.22;
    const M = K.makeToyMaddie({ seatY: BTOP + 0.02, shirt: 0x2b2f3a, pants: 0x6d7f9c }); M.g.position.set(BX, 0, MZ); S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });   // no blush dots on the cheeks
    // phone (held in both hands, screen toward his face)
    const phone = new THREE.Group(); S.add(phone);
    rbox(0.085, 0.17, 0.01, SM(0x15161b, 0.3), 0, 0, 0, 0.012, phone);
    const PW = 340, PH = 680, pc = document.createElement('canvas'); pc.width = PW; pc.height = PH; const px = pc.getContext('2d');
    const pTex = new THREE.CanvasTexture(pc); pTex.colorSpace = THREE.SRGBColorSpace;
    const pScr = new THREE.Mesh(new THREE.PlaneGeometry(0.077, 0.158), new THREE.MeshBasicMaterial({ map: pTex, toneMapped: false })); pScr.position.z = 0.0056; phone.add(pScr);
    const phoneL = new THREE.PointLight(0x9fc4ff, 0.5, 0.9, 1.8); S.add(phoneL);
    // Maggi bowl (left hand) + fork (right hand)
    const bowl = new THREE.Group(); S.add(bowl);
    const bwl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), SM(0xd8473a, 0.5, { side: THREE.DoubleSide })); bwl.rotation.x = 0; bwl.castShadow = true; bowl.add(bwl);
    const noodM = SM(0xf0c040, 0.6);
    const nd = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.082, 0.02, 24), noodM); nd.position.y = -0.02; bowl.add(nd);
    for (let i = 0; i < 9; i++) { const sq = new THREE.Mesh(new THREE.TorusGeometry(0.018 + (i % 3) * 0.006, 0.0045, 6, 16), noodM); sq.position.set(Math.sin(i * 2.1) * 0.05, -0.01, Math.cos(i * 2.1) * 0.05); sq.rotation.x = Math.PI / 2 + Math.sin(i) * 0.4; bowl.add(sq); }
    const fork = new THREE.Group(); S.add(fork);
    rbox(0.012, 0.16, 0.006, SM(0xc9ccd2, 0.25, { metalness: 0.8 }), 0, 0.06, 0, 0.003, fork);
    const forkNood = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.004, 6, 14), noodM); forkNood.position.set(0, 0.15, 0.005); fork.add(forkNood);
    // steam puffs
    const steam = []; for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.02, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0, depthWrite: false })); S.add(s); steam.push(s); }

    // Claude: the narrator, in the doorway, with a tiny mic stand and a camcorder on a tripod (hidden until the reveal)
    const narr = new THREE.Group(); narr.position.set(-0.45, 0, ZF - 0.02); narr.rotation.y = Math.PI; S.add(narr);
    const R = K.makeRobo({ height: 0.52 }); narr.add(R.g);
    const mic = new THREE.Group(); mic.position.set(-0.13, 0, 0.24); narr.add(mic);
    const metal = SM(0x2b2a2e, 0.35, { metalness: 0.6 });
    cyl(0.07, 0.08, 0.015, metal, 0, 0.008, 0, 24, mic); cyl(0.006, 0.006, 0.19, metal, 0, 0.1, 0, 8, mic);
    const boom = cyl(0.005, 0.005, 0.12, metal, 0.05, 0.2, -0.02, 8, mic); boom.rotation.z = -1.0;
    const micHead = new THREE.Group(); micHead.position.set(0.1, 0.22, -0.03); micHead.rotation.set(-0.5, 0, -0.9); mic.add(micHead);
    cyl(0.018, 0.012, 0.07, SM(0x1a1a1e, 0.4), 0, 0, 0, 16, micHead);
    const grill = new THREE.Mesh(new THREE.SphereGeometry(0.024, 16, 12), SM(0x8a8d94, 0.3, { metalness: 0.7 })); grill.position.y = 0.045; micHead.add(grill);
    const cam = new THREE.Group(); cam.position.set(0.3, 0, 0.1); cam.rotation.y = -0.12; narr.add(cam);
    [0, 2.1, 4.2].forEach(a => { const leg = cyl(0.005, 0.005, 0.56, metal, Math.sin(a) * 0.08, 0.27, Math.cos(a) * 0.08, 6, cam); leg.rotation.set(Math.cos(a) * 0.28, 0, -Math.sin(a) * 0.28); });
    const body = rbox(0.09, 0.08, 0.16, SM(0x23252c, 0.4), 0, 0.6, 0, 0.015, cam);
    cyl(0.03, 0.03, 0.05, SM(0x111114, 0.3), 0, 0.6, 0.1, 18, cam).rotation.x = Math.PI / 2;
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.022, 18), SM(0x3a4a7a, 0.1, { metalness: 0.6 })); lens.position.set(0, 0.6, 0.126); cam.add(lens);
    const rec = new THREE.Mesh(new THREE.SphereGeometry(0.008, 10, 8), BM(0xff3030)); rec.position.set(0.035, 0.635, 0.081); cam.add(rec);
    const recL = new THREE.PointLight(0xff2020, 0.15, 0.3, 2); recL.position.set(0.035, 0.635, 0.1); cam.add(recL);
    narr.visible = false;

    // ================= LIGHT (moonlight + phone glow + warm hallway) =================
    S.add(new THREE.HemisphereLight(0x5b6fa8, 0x2a1d14, 0.55));
    const moon = new THREE.DirectionalLight(0x9fb6ff, 0.9); moon.position.set(1.2, 2.4, -3.4); moon.target.position.set(-0.4, 0.6, 0.2); moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); moon.shadow.bias = -0.0005; S.add(moon); S.add(moon.target);
    const key = new THREE.DirectionalLight(0xc9d6ff, 0.55); key.position.set(-0.6, 2.0, 3.2); key.target.position.set(-0.45, 0.9, 0); S.add(key); S.add(key.target);
    const hall = new THREE.PointLight(0xffb36b, 1.0, 3.6, 1.6); hall.position.set(-0.45, 1.9, ZF + 0.8); S.add(hall);
    const hallSpot = new THREE.SpotLight(0xffb36b, 0.9, 4.0, 0.55, 0.6, 1.4); hallSpot.position.set(-0.45, 1.8, ZF + 0.6); hallSpot.target.position.set(-0.45, 0, ZF - 1.2); S.add(hallSpot); S.add(hallSpot.target);
    const rim = new THREE.DirectionalLight(0xffc28a, 0.0); rim.position.set(-0.45, 1.6, 3.0); rim.target.position.set(-0.45, 0.4, ZF); S.add(rim); S.add(rim.target);

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.4, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const hw = new THREE.Vector3(), hw2 = new THREE.Vector3(), headW = new THREE.Vector3();
    const eating = t => t >= S3 && t < S4 - 0.05;
    const throwing = t => t >= THROW - 0.25 && t < HIT + 0.4;
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.55;
      const k = last < 0 ? 1 : cl((t - last) * 2.2); last = t;
      const lookUp = t >= S5 + 0.5;
      const atPhone = !lookUp && !eating(t);
      mYaw = sm(mYaw, lookUp ? 0.0 : eating(t) ? -0.08 : 0.02, k * (lookUp ? 0.35 : 1));
      mPitch = sm(mPitch, lookUp ? -0.04 : eating(t) ? 0.22 : 0.42, k * (lookUp ? 0.35 : 1));
      const face = t >= S6C ? 'worried' : (t >= B(6) - 0.2 && t < E(6) + 0.6) ? 'worried' : lookUp ? 'neutral' : eating(t) ? 'smile' : 'neutral';
      M.update(t, { talk: mT * 0.9, face, look: [mYaw + Math.sin(t * 0.4) * 0.02, mPitch], type: 0, lean: lookUp ? 0.05 : 0.3 });
      // arms: hold the phone up, or bowl + fork, or throw
      const [aL, aR] = M.arms[0].sx < 0 ? M.arms : [M.arms[1], M.arms[0]];
      if (eating(t)) {
        const bite = Math.max(0, Math.sin((t - S3) * 3.4));
        aL.sh.rotation.set(-0.2, 0.35, -0.05); aL.el.rotation.x = -0.55;
        aR.sh.rotation.set(-0.35 - bite * 0.35, -0.45, 0.05); aR.el.rotation.x = -0.9 - bite * 0.75;
      } else if (throwing(t) && lookUp) {
        const w = pr(t, THROW - 0.25, THROW + 0.05), back = pr(t, THROW + 0.05, THROW + 0.6);
        aL.sh.rotation.set(-0.15, 0.3, -0.05); aL.el.rotation.x = -0.4;
        aR.sh.rotation.set(-0.3 - 2.1 * Math.sin(w * Math.PI * 0.5) * (1 - back * 0.6), -0.2, 0.15); aR.el.rotation.x = -0.3 - 0.6 * (1 - w);
      } else if (lookUp) {
        const k2 = eo(pr(t, S5 + 0.5, S5 + 1.4));
        aL.sh.rotation.set(K.lerp(-0.1, 0.05, k2), K.lerp(0.42, 0.2, k2), -0.05); aL.el.rotation.x = K.lerp(-1.05, -0.35, k2);
        aR.sh.rotation.set(K.lerp(-0.1, 0.05, k2), K.lerp(-0.42, -0.2, k2), 0.05); aR.el.rotation.x = K.lerp(-1.05, -0.35, k2);
      } else {
        const scroll = Math.max(0, Math.sin(t * 2.6)) * 0.04;
        aL.sh.rotation.set(-0.1, 0.42, -0.05); aL.el.rotation.x = -1.05;
        aR.sh.rotation.set(-0.1, -0.42, 0.05); aR.el.rotation.x = -1.05 - scroll;
      }
      M.g.updateMatrixWorld(true);
      aL.hand.getWorldPosition(hw); aR.hand.getWorldPosition(hw2); M.head.getWorldPosition(headW);
      // phone between the hands (lowered onto the bed while eating)
      const showPhone = !eating(t);
      phone.visible = true;
      if (showPhone) {
        phone.position.copy(hw).add(hw2).multiplyScalar(0.5); phone.position.y += 0.05; phone.lookAt(headW.x, headW.y + 0.12, headW.z);
      } else { phone.position.set(BX - 0.35, BTOP + 0.085, 0.12); phone.rotation.set(-Math.PI / 2, 0, 0.4); }
      phoneL.position.copy(phone.position).add(new THREE.Vector3(0, 0.12, 0.16)); phoneL.intensity = showPhone && !lookUp ? 0.42 + 0.06 * Math.sin(t * 7.3) * Math.sin(t * 2.1) : 0.0;
      bowl.visible = fork.visible = eating(t);
      if (eating(t)) {
        bowl.position.copy(hw).add(new THREE.Vector3(0.05, 0.07, 0.02)); bowl.rotation.set(0, 0, 0);
        fork.position.copy(hw2).add(new THREE.Vector3(-0.02, 0.02, 0.0)); fork.rotation.set(0.5, 0, 0.5);
        steam.forEach((s, i) => { const ph = ((t * 0.6 + i / steam.length) % 1); s.position.set(bowl.position.x + Math.sin(i * 2 + t) * 0.03, bowl.position.y + 0.04 + ph * 0.22, bowl.position.z + Math.cos(i * 3) * 0.02); s.scale.setScalar(0.6 + ph * 1.6); s.material.opacity = 0; });
      } else steam.forEach(s => s.material.opacity = 0);
      // narrator
      narr.visible = t >= S6 - 0.01;
      front.visible = t >= S6 - 0.01 && t < S7;
      R.update(t, { talk: rT, look: [0.0, -0.08], mood: 'calm', glow: false });
      const hit = K.wobble(t, HIT, 0.07, 22, 7);
      R.head.rotation.z += hit; R.head.rotation.x += hit * 0.5 + 0.14 * K.pulse(t, B(9) - 0.2, 0.8);
      rec.material.color.setHex(Math.floor(t * 1.6) % 2 ? 0x400000 : 0xff3030); recL.intensity = Math.floor(t * 1.6) % 2 ? 0 : 0.2;
      // cushion: flies from the bed to Claude's face, drops at his feet
      if (t < THROW) { cush.position.copy(CUSH0); cush.rotation.set(0.1, 0.4, 0.05); }
      else {
        const target = new THREE.Vector3(-0.45, 0.42, ZF - 0.12), k3 = pr(t, THROW, HIT);
        if (t < HIT) { const p0 = new THREE.Vector3(hw2.x, hw2.y + 0.1, hw2.z); cush.position.lerpVectors(p0, target, k3); cush.position.y += Math.sin(k3 * Math.PI) * 0.35; cush.rotation.set(k3 * 7, k3 * 3, k3 * 2); }
        else { const k4 = eo(pr(t, HIT, HIT + 0.45)); cush.position.set(-0.45 + 0.12 * k4, K.lerp(0.42, 0.05, K.easeIn(pr(t, HIT, HIT + 0.4))), ZF - 0.12 - 0.22 * k4); cush.rotation.set(7 + k4 * 1.1, 3, 2 + k4 * 0.4); }
      }
      // clock seconds hand ticks
      hS.rotation.z = -Math.floor(t) / 60 * Math.PI * 2;
      fairy.forEach((b, i) => b.material.color.setHSL(0.1, 1, 0.55 + 0.12 * Math.sin(t * 1.5 + i * 1.3)));
    };

    // ================= PHONE SCREEN (reels scrolling / notes) =================
    const reelCols = ['#ff5f6d', '#ffc371', '#4facfe', '#43e97b', '#a18cd1', '#f093fb', '#30cfd0'];
    const drawPhone = t => {
      const notes = t >= S4 && t < S4B;
      if (notes) {
        px.fillStyle = '#fbfaf6'; px.fillRect(0, 0, PW, PH);
        px.fillStyle = '#e8b23a'; px.font = '700 26px "Inter"'; px.fillText('< Notes', 20, 50);
        px.fillStyle = '#111'; px.font = '800 34px "Inter Display"'; px.fillText('Startup ideas', 20, 110);
        for (let i = 0; i < 12; i++) { px.fillStyle = 'rgba(0,0,0,0.55)'; px.fillRect(20, 150 + i * 40, 30 + ((i * 37) % 200) + 60, 10); }
      } else {
        const off = (t * 260) % PH, idx = Math.floor(t * 260 / PH);
        for (let k = -1; k < 2; k++) { const y = k * PH - off; const c = reelCols[((idx + k) % reelCols.length + reelCols.length) % reelCols.length];
          const g = px.createLinearGradient(0, y, PW, y + PH); g.addColorStop(0, c); g.addColorStop(1, '#1a1a2e'); px.fillStyle = g; px.fillRect(0, y, PW, PH);
          px.fillStyle = 'rgba(255,255,255,0.85)'; px.beginPath(); px.arc(PW / 2, y + PH * 0.42, 60, 0, 7); px.fill();
          px.fillStyle = 'rgba(255,255,255,0.6)'; px.fillRect(24, y + PH - 120, 200, 14); px.fillRect(24, y + PH - 90, 140, 12); }
        // heart icons column
        px.fillStyle = 'rgba(255,255,255,0.9)'; [0, 1, 2].forEach(i => { px.beginPath(); px.arc(PW - 34, PH - 250 + i * 70, 14, 0, 7); px.fill(); });
      }
      pTex.needsUpdate = true;
    };

    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const HEAD = [BX, 1.1, MZ];
    const OPEN = [P([BX + 0.05, 1.38, 3.9], [BX, 1.02, -0.2], 36), P([BX, 1.32, 3.05], [BX, 1.05, -0.1], 36)];
    const MCU1 = [P([BX + 0.12, 1.36, 2.75], [BX, 1.36, MZ], 32), P([BX + 0.07, 1.35, 2.5], [BX, 1.35, MZ], 32)];
    const BAG = [P([1.12, 0.62, 1.0], [0.85, 0.3, -0.2], 38), P([1.06, 0.56, 0.85], [0.85, 0.28, -0.2], 38)];
    const EAT = [P([BX - 0.5, 1.28, 2.05], [BX, 1.15, MZ], 34), P([BX - 0.44, 1.26, 1.85], [BX, 1.14, MZ], 34)];
    const HIGH = [P([BX + 0.35, 1.95, 2.25], [BX, 1.12, MZ], 40), P([BX + 0.3, 1.9, 2.05], [BX, 1.12, MZ], 40)];
    const REMARK = [P([BX, 1.34, 2.55], [BX, 1.26, MZ], 30), P([BX, 1.33, 2.3], [BX, 1.26, MZ], 30)];
    const LENS = [P([BX, 1.33, 2.2], [BX, 1.27, MZ], 30), P([BX, 1.33, 2.02], [BX, 1.27, MZ], 30)];
    const REV = [P([BX + 0.42, 1.3, -0.15], [BX + 0.02, 0.5, ZF], 34), P([BX + 0.38, 1.27, 0.0], [BX + 0.02, 0.48, ZF], 34)];
    const NARR = [P([BX + 0.07, 0.5, ZF - 1.75], [BX + 0.02, 0.33, ZF], 30), P([BX + 0.06, 0.49, ZF - 1.58], [BX + 0.02, 0.33, ZF], 30)];
    const OUTW = [P([BX, 1.36, 2.6], [BX, 1.22, -0.1], 36), P([BX + 0.1, 1.5, 3.8], [BX, 1.2, -0.1], 38)];
    const plan = [
      [0, S2, OPEN], [S2, S3, MCU1], [S3, S3B, BAG], [S3B, S4, EAT],
      [S4, S4B, HIGH], [S4B, S5, REMARK], [S5, S6, LENS], [S6, S6C, REV], [S6C, S7, NARR], [S7, D + 5, OUTW],
    ];
    const smooth = k => k * k * (3 - 2 * k);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth }));
    const fadeAt = [S2, S3, S3B, S4, S7];
    const fade = t => { let a = 0; fadeAt.forEach(c => { const d = Math.abs(t - c); if (d < 0.26) a = Math.max(a, (1 - d / 0.26) * 0.9); }); return a; };

    // ================= HUD: documentary graphics =================
    S.add(K.cam);
    const HW = 1080, HH = 1920, hc = document.createElement('canvas'); hc.width = HW; hc.height = HH; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, depthTest: false, depthWrite: false, toneMapped: false }));
    hud.renderOrder = 1000; K.cam.add(hud);
    const ACC = '#f2b544', RED = '#ff5a52', GRN = '#3ddc97', INK = 'rgba(10,11,16,0.86)', TXT = '#f5f0e6', DIM = 'rgba(245,240,230,0.62)';
    const SERIF = '"FreeSerif", "DejaVu Serif", serif';
    const F = (s, w = 400, fam = '"Inter", "DejaVu Sans"', it = false) => `${it ? 'italic ' : ''}${w} ${s}px ${fam}`;
    const txt = (s, x, y, size, col, w = 400, align = 'left', a = 1, fam, it, ls = 0) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam, it); h.fillStyle = col; h.textAlign = align; h.textBaseline = 'middle'; if (ls) h.letterSpacing = ls + 'px'; h.fillText(s, x, y); h.restore(); };
    const fin = (t, t0, d = 0.5) => eo(pr(t, t0, t0 + d));
    const pop = (t, t0, d = 0.45) => eb(pr(t, t0, t0 + d));
    const card = (x, y, w, hh, r = 28, fill = INK, stroke = 'rgba(242,181,68,0.25)') => { h.fillStyle = fill; h.beginPath(); h.roundRect(x, y, w, hh, r); h.fill(); if (stroke) { h.strokeStyle = stroke; h.lineWidth = 2; h.stroke(); } };
    const chip = (s, x, y, size, bg, fg, a = 1, sc = 1, w = 700) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w); const tw = h.measureText(s).width + size * 1.2, th = size * 1.75;
      h.translate(x, y); h.scale(sc, sc); h.fillStyle = bg; h.beginPath(); h.roundRect(-tw / 2, -th / 2, tw, th, th / 2); h.fill(); h.fillStyle = fg; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 2); h.restore(); };
    const stamp = (s, x, y, size, col, k, rot = -0.14) => { if (k <= 0) return; h.save(); h.translate(x, y); h.rotate(rot); const sc = 1.7 - 0.7 * cl(k); h.scale(sc, sc); h.globalAlpha *= cl(k * 1.6);
      h.font = F(size, 900, '"Inter Display"'); const tw = h.measureText(s).width; h.strokeStyle = col; h.lineWidth = size * 0.1; h.beginPath(); h.roundRect(-tw / 2 - size * 0.4, -size * 0.75, tw + size * 0.8, size * 1.5, size * 0.2); h.stroke();
      h.fillStyle = col; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, size * 0.05); h.restore(); };
    // film grain tiles + vignette (prebaked)
    const grain = [0, 1, 2, 3].map(s => { const c = document.createElement('canvas'); c.width = 360; c.height = 640; const x = c.getContext('2d'), im = x.createImageData(360, 640), r = K.rng(77 + s);
      for (let i = 0; i < im.data.length; i += 4) { const v = r() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } x.putImageData(im, 0, 0); return c; });
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.46, HH * 0.28, HW / 2, HH * 0.5, HH * 0.72); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.62)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }

    // letterbox: documentary bars, ripped away when Maddie spots the narrator
    const BAR = 132;
    const barsK = t => 1 - eo(pr(t, B(6) - 0.15, B(6) + 0.25)) + eo(pr(t, S6C - 0.05, S6C + 0.5)) * (t < S7 ? 1 : 1 - eo(pr(t, S7, S7 + 0.6)));
    const drawBars = t => { const k = cl(barsK(t)); if (k <= 0) return; h.fillStyle = '#000'; h.fillRect(0, 0, HW, BAR * k); h.fillRect(0, HH - BAR * k, HW, BAR * k); };

    // 0: title card
    const drawTitle = t => {
      const a = 1 - pr(t, 2.15, 3.0); if (a <= 0) return;
      h.save(); h.globalAlpha = a; h.fillStyle = '#000'; h.fillRect(0, 0, HW, HH); h.restore();
      const k1 = fin(t, 0.25, 1.2), k2 = fin(t, 0.9, 0.9), ln = eo(pr(t, 0.6, 1.8));
      h.save(); h.globalAlpha = a;
      txt('MADDIE', 540, 880 + (1 - k1) * 20, 150, TXT, 400, 'center', k1, SERIF, false, 24);
      h.fillStyle = ACC; h.fillRect(540 - 170 * ln, 980, 340 * ln, 3);
      txt('A  DOCUMENTARY', 540, 1040, 38, DIM, 400, 'center', k2, '"Inter"', false, 12);
      h.restore();
    };
    // 1: lower-third species label
    const drawSpecies = t => {
      const a = Math.min(fin(t, 2.9, 0.6), 1 - pr(t, S2 - 0.5, S2 - 0.1)); if (a <= 0) return;
      const x = 80, y = 1095, wipe = eo(pr(t, 2.9, 3.6));
      h.save(); h.globalAlpha = a;
      h.fillStyle = ACC; h.fillRect(x, y, 8, 168 * wipe);
      h.beginPath(); h.rect(x + 8, y - 10, 860 * wipe, 200); h.clip();
      txt('SPECIES', x + 36, y + 22, 26, ACC, 700, 'left', 1, '"Inter"', false, 6);
      txt('Engineerus graduatus', x + 36, y + 82, 62, TXT, 400, 'left', 1, SERIF, true);
      txt('Active hours: 1 AM – 5 AM', x + 36, y + 142, 32, DIM, 400);
      h.restore();
    };
    // 2: field timestamp + "five more minutes" tally
    const drawTally = t => {
      const a = Math.min(fin(t, S2 + 0.1, 0.5), 1 - pr(t, S3 - 0.4, S3 - 0.05)); if (a <= 0) return;
      h.save(); h.globalAlpha = a;
      const y0 = 190 + (1 - fin(t, S2 + 0.1, 0.6)) * -30;
      card(170, y0, 740, 440, 30);
      txt('LOCAL TIME', 540, y0 + 60, 26, DIM, 600, 'center', 1, '"Inter"', false, 6);
      const colon = Math.floor(t * 2) % 2 ? ':' : ' ';
      txt('02' + colon + '47', 540, y0 + 160, 136, TXT, 300, 'center', 1, '"Inter Display"');
      txt('AM', 790, y0 + 185, 34, ACC, 700, 'left');
      h.fillStyle = 'rgba(255,255,255,0.12)'; h.fillRect(230, y0 + 250, 620, 2);
      txt('"five more minutes"', 540, y0 + 300, 40, TXT, 400, 'center', fin(t, B(1) + (E(1) - B(1)) * 0.38, 0.4), SERIF, true);
      // tally marks: 9 strokes, synced to the end of the line
      const t0 = B(1) + (E(1) - B(1)) * 0.6, t1 = E(1) - 0.05;
      for (let i = 0; i < 9; i++) { const k = eo(pr(t, t0 + (t1 - t0) * i / 9, t0 + (t1 - t0) * (i + 0.6) / 9)); if (k <= 0) continue;
        h.save(); h.strokeStyle = i === 8 ? RED : ACC; h.lineWidth = 9; h.lineCap = 'round'; h.beginPath();
        if (i === 4) { h.moveTo(300, y0 + 395); h.lineTo(300 + (520 - 300) * k, y0 + 395 - 50 * k); }
        else { const gi = i < 4 ? i : i - 5, gx = (i < 4 ? 320 : 600) + gi * 44; h.moveTo(gx, y0 + 355); h.lineTo(gx, y0 + 355 + 70 * k); }
        h.stroke(); h.restore(); }
      chip('×9', 860, y0 + 390, 34, RED, '#fff', fin(t, t1 - 0.05, 0.3), 0.7 + 0.3 * pop(t, t1 - 0.05), 800);
      h.restore();
    };
    // 3: gym receipt -> "locating gym…" -> visits 0
    const drawGym = t => {
      const a = Math.min(fin(t, S3 + 0.2, 0.5), 1 - pr(t, S4 - 0.4, S4 - 0.05)); if (a <= 0) return;
      h.save(); h.globalAlpha = a;
      const x = 190, y = 200 + (1 - fin(t, S3 + 0.2, 0.6)) * 40, w = 700;
      // receipt (paper, zig-zag bottom)
      h.save(); h.fillStyle = '#fbf7ee'; h.beginPath(); h.moveTo(x, y); h.lineTo(x + w, y); h.lineTo(x + w, y + 470);
      for (let i = 0; i <= 14; i++) h.lineTo(x + w - i * (w / 14), y + 470 + (i % 2 ? 0 : 18)); h.closePath(); h.fill(); h.restore();
      txt('IRON PARADISE GYM', 540, y + 70, 40, '#1d1b17', 800, 'center', 1, '"Inter Display"', false, 3);
      txt('- - - - - - - - - - - - - - - - - - -', 540, y + 120, 30, '#b9b1a1', 400, 'center');
      txt('Membership', x + 60, y + 180, 38, '#3a362e', 500); txt('12 months', x + w - 60, y + 180, 38, '#3a362e', 500, 'right');
      txt('Paid', x + 60, y + 245, 38, '#3a362e', 500); txt('₹2,999', x + w - 60, y + 245, 44, '#1d1b17', 800, 'right');
      txt('Visits', x + 60, y + 330, 38, '#3a362e', 500);
      // visits: spinner "locating…" then 0
      const v = pr(t, B(3), B(3) + 1.0);
      if (t < B(3) + 1.0) { const sp = t * 6; h.save(); h.strokeStyle = '#8a8478'; h.lineWidth = 6; h.lineCap = 'round'; h.beginPath(); h.arc(x + w - 85, y + 330, 18, sp, sp + 4.2); h.stroke(); h.restore();
        txt(t >= B(3) ? 'locating gym…' : '—', x + w - 125, y + 330, 30, '#8a8478', 500, 'right', 1, undefined, true); }
      else txt('0', x + w - 60, y + 330, 64, RED, 900, 'right', fin(t, B(3) + 1.0, 0.2));
      stamp('PAID', x + 520, y + 120, 54, GRN, pop(t, B(2) + 1.0, 0.4), 0.18);
      stamp('NOT FOUND', 540, y + 610, 66, RED, pop(t, E(3) - 0.35, 0.4), -0.1);
      h.restore();
    };
    // 4: notes app phone mock — 14 ideas, 0 started
    const IDEAS = ['Uber for chai', 'AI that writes excuses', 'Swiggy but for mom\'s food', 'LinkedIn for pets', 'Crypto for college fees', 'App to find my charger', 'Tinder for roommates', 'Netflix for lectures', 'Zomato for gym diets', 'Blockchain biryani', 'Alarm that roasts you', 'Uber for queues', 'AI astrologer', 'Startup idea generator'];
    const drawNotes = t => {
      const a = Math.min(fin(t, S4 + 0.1, 0.5), 1 - pr(t, S4B - 0.35, S4B)); if (a <= 0) return;
      h.save(); h.globalAlpha = a;
      const pw = 560, ph = 900, x = 540 - pw / 2, y = 175 + (1 - fin(t, S4 + 0.1, 0.6)) * 80;
      h.shadowColor = 'rgba(0,0,0,0.5)'; h.shadowBlur = 50; card(x - 16, y - 16, pw + 32, ph + 32, 64, '#15161b', null); h.shadowBlur = 0;
      card(x, y, pw, ph, 50, '#fbfaf6', null);
      h.save(); h.beginPath(); h.roundRect(x, y, pw, ph, 50); h.clip();
      txt('‹ Notes', x + 34, y + 62, 30, '#d9a12a', 600);
      txt('Startup ideas 🚀', x + 34, y + 130, 46, '#111', 800, 'left', 1, '"Inter Display"');
      const n = Math.min(14, Math.floor(K.lerp(0, 14.99, eo(pr(t, S4 + 0.3, B(4) + 0.9)))));
      const scroll = Math.max(0, (n - 11)) * 52 * eo(pr(t, B(4) + 0.5, B(4) + 1.2));
      for (let i = 0; i < n; i++) { const yy = y + 200 + i * 52 - scroll; if (yy < y + 165 || yy > y + ph - 30) continue;
        h.save(); h.globalAlpha *= cl((t - (S4 + 0.3) - i * 0.06) * 6);
        txt(`${i + 1}. ${IDEAS[i]}`, x + 34, yy, 30, '#2a2a2e', 500); h.restore();
        h.strokeStyle = 'rgba(0,0,0,0.06)'; h.lineWidth = 1; h.beginPath(); h.moveTo(x + 34, yy + 26); h.lineTo(x + pw - 34, yy + 26); h.stroke(); }
      h.restore();
      // counters beside the phone
      const k14 = pop(t, B(4) + 0.2), k0 = pop(t, B(4) + (E(4) - B(4)) * 0.58);
      chip(`IDEAS  ${n}`, 540, y + ph + 70, 40, 'rgba(10,11,16,0.9)', ACC, cl(k14 * 2), 0.6 + 0.4 * k14, 800);
      stamp('STARTED: 0', 540, y + ph / 2 + 40, 78, RED, k0, -0.12);
      h.restore();
    };
    // 5: "Remarkable." — a tiny field-note in italics
    const drawRemark = t => {
      const a = Math.min(fin(t, B(5) + 0.1, 0.6), 1 - pr(t, S5 + 0.2, S5 + 0.6)); if (a <= 0) return;
      txt('— field note #47', 120, 1150, 34, DIM, 400, 'left', a, SERIF, true);
    };
    // 6: the reveal — lower third for the narrator
    const drawNarrator = t => {
      const a = Math.min(fin(t, S6 + 0.35, 0.5), 1 - pr(t, THROW - 0.2, THROW + 0.1)); if (a <= 0) return;
      const x = 80, y = 290, wipe = eo(pr(t, S6 + 0.35, S6 + 1.0));
      h.save(); h.globalAlpha = a;
      h.fillStyle = ACC; h.fillRect(x, y, 8, 150 * wipe);
      h.beginPath(); h.rect(x + 8, y - 10, 900 * wipe, 190); h.clip();
      txt('THE NARRATOR', x + 36, y + 30, 30, ACC, 800, 'left', 1, '"Inter"', false, 6);
      txt('has been here the whole time', x + 36, y + 95, 50, TXT, 400, 'left', 1, SERIF, true);
      h.restore();
      // REC dot top-left (his camcorder)
      const on = Math.floor(t * 1.6) % 2 === 0;
      h.save(); h.globalAlpha = a; if (on) { h.fillStyle = RED; h.beginPath(); h.arc(110, 210, 16, 0, 7); h.fill(); } txt('REC', 140, 212, 34, TXT, 700); txt('02:51:07', 960, 212, 30, DIM, 500, 'right'); h.restore();
    };
    // impact lines on the hit
    const drawHit = t => {
      const k = pr(t, HIT - 0.02, HIT + 0.3); if (k <= 0 || k >= 1) return;
      h.save(); h.globalAlpha = 1 - k; h.strokeStyle = TXT; h.lineWidth = 7; h.lineCap = 'round';
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, r0 = 70 + k * 60, r1 = r0 + 50; h.beginPath(); h.moveTo(540 + Math.cos(a) * r0, 980 + Math.sin(a) * r0); h.lineTo(540 + Math.cos(a) * r1, 980 + Math.sin(a) * r1); h.stroke(); }
      h.restore();
    };
    // 7: "Aggression." species-behaviour label, then CTA
    const drawBehaviour = t => {
      const a = Math.min(fin(t, B(8) + 0.1, 0.4), 1 - pr(t, S7 - 0.35, S7)); if (a <= 0) return;
      const x = 80, y = 250, wipe = eo(pr(t, B(8) + 0.1, B(8) + 0.7));
      h.save(); h.globalAlpha = a;
      h.fillStyle = RED; h.fillRect(x, y, 8, 150 * wipe);
      h.beginPath(); h.rect(x + 8, y - 10, 900 * wipe, 190); h.clip();
      txt('OBSERVED BEHAVIOUR', x + 36, y + 30, 28, RED, 800, 'left', 1, '"Inter"', false, 6);
      txt('Pillow, thrown. 02:51 AM.', x + 36, y + 95, 50, TXT, 400, 'left', 1, SERIF, true);
      h.restore();
    };
    const drawCTA = t => {
      const a = fin(t, S7 + 0.15, 0.6); if (a <= 0) return;
      const k = pop(t, B(9) + 0.2, 0.6);
      h.save(); h.globalAlpha = a; card(170, 200, 740, 470, 34);
      txt('Comment', 540, 290, 46, 'rgba(255,240,225,0.85)', 300, 'center');
      h.save(); h.translate(540, 410); h.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); txt('ROAST', 0, 0, 140, ACC, 800, 'center', 1, '"Inter Display"'); h.restore();
      const ul = eo(pr(t, B(9) + 0.7, B(9) + 1.3)); h.fillStyle = ACC; h.fillRect(540 - 170 * ul, 495, 340 * ul, 6);
      txt('your documentary is next 🎬', 540, 575, 40, 'rgba(255,240,225,0.85)', 300, 'center', fin(t, B(9) + 0.9, 0.5), SERIF, true);
      h.restore();
    };
    let gi = 0;
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1;
      h.drawImage(vig, 0, 0);
      drawSpecies(t); drawTally(t); drawGym(t); drawNotes(t); drawNarrator(t); drawHit(t); drawBehaviour(t); drawCTA(t);
      drawBars(t);
      // grain
      h.save(); h.globalAlpha = 0.035; h.globalCompositeOperation = 'overlay'; h.drawImage(grain[(gi = (gi + 1) % 4)], 0, 0, HW, HH); h.restore();
      drawTitle(t);
      const f = fade(t); if (f > 0) { h.fillStyle = `rgba(0,0,0,${f})`; h.fillRect(0, 0, HW, HH); }
      hTex.needsUpdate = true;
    };
    const curFov = t => { const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; const k = smooth(cl((t - p[0]) / (p[1] - p[0]))); return K.lerp(p[2][0].fov, p[2][1].fov, k); };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { acting(t); drawPhone(t); placeHud(t); hudDraw(t); lampL.intensity = 0.7 + 0.02 * Math.sin(t * 3); };

    const sfx = [];
    sfx.push(['timpani', 0.25, 0.55]);
    sfx.push(['swoosh', 2.85, 0.25], ['swoosh', S2 + 0.05, 0.25]);
    { const t0 = B(1) + (E(1) - B(1)) * 0.6, t1 = E(1) - 0.05; for (let i = 0; i < 9; i++) sfx.push(['tick', t0 + (t1 - t0) * (i + 0.3) / 9, 0.45]); sfx.push(['pop', t1 - 0.05, 0.35]); }
    sfx.push(['swoosh', S3 + 0.15, 0.25], ['thud', B(2) + 1.0, 0.45], ['beep', B(3) + 1.0, 0.35], ['thud', E(3) - 0.35, 0.55]);
    sfx.push(['swoosh', S4 + 0.05, 0.25]); for (let i = 0; i < 8; i++) sfx.push(['tick', S4 + 0.35 + i * 0.12, 0.3]); sfx.push(['thud', B(4) + (E(4) - B(4)) * 0.58, 0.6]);
    sfx.push(['scratch', B(6) - 0.2, 0.55]);
    sfx.push(['ding', S6 + 0.35, 0.12]);
    sfx.push(['whoosh', THROW, 0.35], ['thud', HIT, 0.7], ['boing', HIT + 0.02, 0.25]);
    sfx.push(['swoosh', S7 + 0.05, 0.25], ['pop', B(9) + 0.2, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, music: { style: 'doc', vol: 0.75, muteFrom: B(6) - 0.15, muteTo: B(8) - 0.05 },
      capFont: 'Inter Display', capMarginV: 520, capSize: 54 };
  },
};
