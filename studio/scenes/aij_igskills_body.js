/* @maddiee.makess reel 12 — "13 free Claude skills that run your Instagram" (comment SKILLS).
   NEW LOCATION: a rooftop terrace at night — city skyline + moon behind, string lights, outdoor sofa, coffee table
   with a laptop, a neon "POST · REPEAT" sign, water tank, plants. Maddie in the blue tee from the viral reel.
   Beats: 200 views -> install 13 skills (terminal + chip grid) -> /ig-viral, /ig-reel, /ig-human, /ig-plan, /ig-dm
   (one visual each) -> price? ZERO -> CTA card "Comment SKILLS". Full 9:16, no bars, no blush dots, captions high,
   no handle, no name tags. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x070a1c, fog: [9, 30], fov: 34, bloom: null },
  lines: window.JR_LINES,

  build(K, T) {
    const L = T.lines, N = L.length;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[typeof id === 'number' ? id : IX(id)].t, E = id => L[typeof id === 'number' ? id : IX(id)].end;
    const D = E(N - 1) + 1.7;
    const cl = K.clamp, eo = K.easeOut, pr = K.prog, eb = K.easeBack;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const rng = K.rng(31);
    const W = 1080, H = 1920;

    // ================= TIMELINE =================
    const C = {
      SOLO: B('c1') - 0.05, INST: B('c2') - 0.1, DONE: B('c2') + 0.55 * (E('c2') - B('c2')), THIR: B('m1') - 0.05,
      K1: B('k1') - 0.12, K2: B('k2') - 0.12, HOOKQ: B('m2') - 0.05, K3: B('k3') - 0.12, DELV: B('m3') - 0.05, K4: B('k4') - 0.12, K5: B('k5') - 0.12,
      COST: B('m4') - 0.1, ZERO: B('c3') - 0.05, YAY: B('m5') - 0.05, CTA: B('cta1') - 0.2, DONE2: B('cta2') - 0.05,
    };
    const CMDS = [[C.K1, 'ig-viral', '#ff6b4a'], [C.K2, 'ig-reel', '#4fd8ff'], [C.K3, 'ig-human', '#3ddc97'], [C.K4, 'ig-plan', '#c58bff'], [C.K5, 'ig-dm', '#ffc53d']];
    const cmdAt = t => { let c = -1; CMDS.forEach((x, i) => { if (t >= x[0] && t < C.COST) c = i; }); return c; };
    const SKILLS = ['ig-reel', 'ig-carousel', 'ig-story', 'ig-caption', 'ig-human', 'ig-viral', 'ig-profile', 'ig-plan', 'ig-repurpose', 'ig-audit', 'ig-comment', 'ig-reply', 'ig-dm'];

    // ================= ROOFTOP =================
    const deckTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#5a3d2a'; x.fillRect(0, 0, w, h); const r = K.rng(6);
      for (let i = 0; i < 8; i++) { x.fillStyle = `hsl(24,${32 + r() * 10}%,${22 + r() * 7}%)`; x.fillRect(0, i * 64 + 3, w, 58);
        for (let k = 0; k < 40; k++) { x.fillStyle = `rgba(0,0,0,${0.05 + r() * 0.08})`; x.fillRect(r() * w, i * 64 + 6 + r() * 50, 30 + r() * 120, 2); } } });
    deckTex.wrapS = deckTex.wrapT = THREE.RepeatWrapping; deckTex.repeat.set(3, 3);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), SM(0xffffff, 0.6, { map: deckTex })); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, 0); floor.receiveShadow = true; S.add(floor);
    const rugTex = K.canvasTex(512, 320, (x, w, h) => { x.fillStyle = '#1f2f5c'; x.beginPath(); x.roundRect(0, 0, w, h, 30); x.fill(); x.strokeStyle = '#f2b134'; x.lineWidth = 14; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 18); x.stroke();
      for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#e4572e' : '#f4efe4'; x.beginPath(); x.moveTo(60 + i * 46, h / 2); x.lineTo(83 + i * 46, h / 2 - 40); x.lineTo(106 + i * 46, h / 2); x.lineTo(83 + i * 46, h / 2 + 40); x.fill(); } });
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.35), SM(0xffffff, 0.95, { map: rugTex, transparent: true })); rug.rotation.x = -Math.PI / 2; rug.position.set(0.05, 0.004, -0.35); rug.receiveShadow = true; S.add(rug);
    // skyline backdrop (far)
    const BZ = -5.2;
    const skyTex = K.canvasTex(2048, 1152, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#04061a'); g.addColorStop(0.5, '#141b4d'); g.addColorStop(0.8, '#3a2a6a'); g.addColorStop(1, '#6a3a6e'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      const r = K.rng(12); for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(255,255,255,${0.25 + r() * 0.6})`; const s = r() < 0.1 ? 3 : 2; x.fillRect(r() * w, r() * h * 0.5, s, s); }
      const mg = x.createRadialGradient(1500, 230, 40, 1500, 230, 220); mg.addColorStop(0, 'rgba(255,240,210,0.45)'); mg.addColorStop(1, 'rgba(255,240,210,0)'); x.fillStyle = mg; x.fillRect(1250, 0, 500, 480);
      x.fillStyle = '#fbf3dc'; x.beginPath(); x.arc(1500, 230, 78, 0, 7); x.fill(); x.fillStyle = 'rgba(200,190,160,0.35)'; [[1480, 210, 14], [1530, 255, 10], [1495, 270, 8]].forEach(([a, b, c]) => { x.beginPath(); x.arc(a, b, c, 0, 7); x.fill(); });
      const layer = (n, baseY, minH, maxH, l, lit, seed) => { const rr2 = K.rng(seed); let bx = -20; while (bx < w) { const bw = 50 + rr2() * 110, bh = minH + rr2() * (maxH - minH); x.fillStyle = `hsl(240,32%,${l + rr2() * 4}%)`; x.fillRect(bx, baseY - bh, bw, bh + 400);
          if (rr2() < 0.25) { x.fillRect(bx + bw / 2 - 3, baseY - bh - 60, 6, 60); x.fillStyle = '#ff3b4a'; x.beginPath(); x.arc(bx + bw / 2, baseY - bh - 62, 6, 0, 7); x.fill(); }
          for (let wy = baseY - bh + 12; wy < h; wy += 16) for (let wx = bx + 6; wx < bx + bw - 8; wx += 11) if (rr2() < lit) { x.fillStyle = rr2() < 0.78 ? 'rgba(255,206,130,0.85)' : 'rgba(140,200,255,0.8)'; x.fillRect(wx, wy, 4, 6); }
          bx += bw + 4 + rr2() * 10; } };
      layer(0, 900, 200, 520, 12, 0.12, 3); layer(1, 1000, 160, 460, 8, 0.2, 8); layer(2, 1100, 80, 300, 5, 0.26, 13);
      // a billboard with a heart (the IG world)
      x.fillStyle = '#10142e'; x.fillRect(260, 420, 300, 170); x.fillStyle = '#ff3d7f'; x.font = '900 120px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = '#ff3d7f'; x.shadowBlur = 30; x.fillText('♥', 410, 505); x.shadowBlur = 0; });
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(16, 9), new THREE.MeshBasicMaterial({ map: skyTex, toneMapped: false, fog: false })); sky.position.set(0, 3.0, BZ); S.add(sky);
    // parapet + glass rail along the back
    const PZ = -1.75, conc = SM(0x6d6f80, 0.9), railM = SM(0x2a2c36, 0.35, { metalness: 0.6 });
    rbox(9, 0.5, 0.22, conc, 0, 0.25, PZ, 0.02); rbox(9, 0.05, 0.28, SM(0x8a8c9c, 0.8), 0, 0.52, PZ, 0.01);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(9, 0.55), new THREE.MeshStandardMaterial({ color: 0x9fc4ff, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.12, depthWrite: false })); glass.position.set(0, 0.84, PZ); S.add(glass);
    rbox(9, 0.035, 0.05, railM, 0, 1.12, PZ, 0.01); for (let i = -8; i <= 8; i++) rbox(0.03, 0.6, 0.03, railM, i * 0.55, 0.82, PZ, 0.006);
    // side wall (left) with door + lamp
    const wallM = SM(0x3b3f55, 0.9); const sideW = new THREE.Mesh(new THREE.PlaneGeometry(5, 3.4), wallM); sideW.rotation.y = Math.PI / 2; sideW.position.set(-2.4, 1.7, 0.2); sideW.receiveShadow = true; S.add(sideW);
    rbox(0.06, 2.0, 0.9, SM(0x22253a, 0.6), -2.37, 1.0, -0.6, 0.02); sph(0.06, BM(0xffd79a), -2.3, 2.15, -0.05);
    const wallLamp = new THREE.PointLight(0xffc27a, 0.9, 2.6, 1.8); wallLamp.position.set(-2.15, 2.1, -0.05); S.add(wallLamp);
    // water tank + AC unit (right, behind)
    cyl(0.42, 0.42, 1.0, SM(0x2f6fb0, 0.6), 2.1, 0.95, -1.35, 28); cyl(0.44, 0.44, 0.06, SM(0x24557f, 0.6), 2.1, 1.47, -1.35, 28);
    for (let i = 0; i < 4; i++) rbox(0.05, 0.45, 0.05, railM, 2.1 + (i % 2 ? 0.3 : -0.3), 0.22, -1.35 + (i < 2 ? 0.3 : -0.3), 0.01);
    rbox(0.7, 0.5, 0.4, SM(0xd9dbe4, 0.6), 1.55, 0.25, -1.3, 0.03); const fan = cyl(0.17, 0.17, 0.02, SM(0x2a2c36, 0.5), 1.55, 0.36, -1.09, 24); fan.rotation.x = Math.PI / 2;
    // plants in pots
    const plant = (x, z, s) => { cyl(0.13 * s, 0.1 * s, 0.3 * s, SM(0xc96a3f, 0.6), x, 0.15 * s, z, 18); for (let i = 0; i < 10; i++) { const lf = sph(0.1 * s, SM(i % 2 ? 0x3f8f4e : 0x2f7a42, 0.8), x + Math.sin(i * 2.3) * 0.12 * s, 0.42 * s + (i % 4) * 0.1 * s, z + Math.cos(i * 2.3) * 0.09 * s); lf.scale.set(0.6, 1.6, 0.5); lf.rotation.z = Math.sin(i * 2.3) * 0.6; } };
    plant(-1.85, -1.35, 1.2); plant(1.05, -1.45, 0.9); plant(-1.55, 0.6, 1.0);
    // neon sign on a frame (right)
    const neonTex = K.canvasTex(1024, 300, (x, w, h) => { x.clearRect(0, 0, w, h); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = '900 150px "Fredoka Light", "Inter Display"';
      x.shadowColor = '#ff3df0'; x.shadowBlur = 40; x.strokeStyle = '#ff7af5'; x.lineWidth = 12; x.strokeText('POST · REPEAT', w / 2, h / 2 + 8); x.shadowBlur = 16; x.fillStyle = '#ffe1fd'; x.fillText('POST · REPEAT', w / 2, h / 2 + 8); });
    rbox(1.3, 0.42, 0.04, SM(0x0d0e18, 0.5), 1.25, 1.95, -1.6, 0.02); [-0.55, 0.55].forEach(dx => rbox(0.03, 1.4, 0.03, railM, 1.25 + dx, 1.15, -1.62, 0.006));
    const neon = new THREE.Mesh(new THREE.PlaneGeometry(1.22, 0.36), new THREE.MeshBasicMaterial({ map: neonTex, transparent: true, toneMapped: false, depthWrite: false })); neon.position.set(1.25, 1.95, -1.575); S.add(neon);
    const neonL = new THREE.PointLight(0xff4df0, 1.1, 2.6, 1.6); neonL.position.set(1.25, 1.8, -1.2); S.add(neonL);
    // string lights (catenaries between poles)
    const poles = [[-2.2, -1.6], [2.2, -1.6], [-2.2, 1.0], [2.2, 1.0]]; poles.forEach(([x, z]) => cyl(0.025, 0.03, 2.75, railM, x, 1.375, z, 8));
    const BULBS = [], bulbM = BM(0xffd48a);
    const strand = (a, b, n, sag) => { for (let i = 0; i <= n; i++) { const u = i / n; const x = a[0] + (b[0] - a[0]) * u, z = a[1] + (b[1] - a[1]) * u, y = 2.7 - sag * 4 * u * (1 - u); const s = sph(0.028, bulbM, x, y, z); s.castShadow = false; BULBS.push(s); }
      const pts = []; for (let i = 0; i <= 24; i++) { const u = i / 24; pts.push(V(a[0] + (b[0] - a[0]) * u, 2.73 - sag * 4 * u * (1 - u), a[1] + (b[1] - a[1]) * u)); }
      S.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.005, 5), SM(0x15161c, 0.6))); };
    strand([-2.2, -1.6], [2.2, -1.6], 18, 0.3); strand([-2.2, -1.6], [-2.2, 1.0], 8, 0.15);
    const glowTex = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 2, 32, 32, 30); g.addColorStop(0, 'rgba(255,210,140,0.9)'); g.addColorStop(1, 'rgba(255,210,140,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    BULBS.forEach(b => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, toneMapped: false })); sp.scale.setScalar(0.11); sp.position.copy(b.position); S.add(sp); });
    [[-1.0, 2.35, -1.5], [1.0, 2.35, -1.5], [0, 2.3, -0.3]].forEach(([x, y, z]) => { const l = new THREE.PointLight(0xffc27a, 0.9, 3.4, 1.6); l.position.set(x, y, z); S.add(l); });

    // ================= SOFA + TABLE + LAPTOP =================
    const MX = -0.32, MZ = -0.85, SY = 0.46;
    const sofaF = SM(0x2b2f3d, 0.6), cush = SM(0xe0a53a, 0.85), cush2 = SM(0xe4573e, 0.85);
    rbox(1.5, 0.3, 0.72, sofaF, MX + 0.2, 0.2, MZ, 0.04); rbox(1.4, 0.12, 0.62, cush, MX + 0.2, SY - 0.06, MZ + 0.03, 0.05);
    rbox(1.5, 0.62, 0.18, sofaF, MX + 0.2, 0.55, MZ - 0.32, 0.05); rbox(1.36, 0.4, 0.14, cush, MX + 0.2, 0.62, MZ - 0.24, 0.06);
    [-1, 1].forEach(s => rbox(0.16, 0.48, 0.72, sofaF, MX + 0.2 + s * 0.75, 0.4, MZ, 0.05));
    const pil = rbox(0.2, 0.18, 0.07, cush2, MX + 0.72, 0.6, MZ - 0.16, 0.035); pil.rotation.set(-0.25, -0.4, 0.2);
    const TX = 0.35, TZ = -0.15, TY = 0.36;
    cyl(0.36, 0.36, 0.035, SM(0xb88552, 0.5), TX, TY, TZ, 36); cyl(0.04, 0.06, TY, railM, TX, TY / 2, TZ, 12); cyl(0.2, 0.22, 0.02, railM, TX, 0.01, TZ, 24);
    const mug = cyl(0.04, 0.035, 0.09, SM(0xff6b4a, 0.5), TX + 0.2, TY + 0.06, TZ + 0.1, 18);
    // laptop (screen = live canvas)
    const lap = new THREE.Group(); lap.position.set(TX - 0.05, TY + 0.02, TZ); lap.rotation.y = 0.35; S.add(lap);
    rbox(0.42, 0.016, 0.28, SM(0x9aa0b0, 0.35, { metalness: 0.6 }), 0, 0, 0, 0.01, lap);
    const lid = new THREE.Group(); lid.position.set(0, 0.008, -0.14); lid.rotation.x = -1.82; lap.add(lid);
    rbox(0.42, 0.28, 0.012, SM(0x9aa0b0, 0.35, { metalness: 0.6 }), 0, 0.14, 0, 0.01, lid);
    const lc = document.createElement('canvas'); lc.width = 512; lc.height = 340; const lx = lc.getContext('2d');
    const lTex = new THREE.CanvasTexture(lc); lTex.colorSpace = THREE.SRGBColorSpace;
    const lscr = new THREE.Mesh(new THREE.PlaneGeometry(0.39, 0.25), new THREE.MeshBasicMaterial({ map: lTex, toneMapped: false })); lscr.position.set(0, 0.14, -0.008); lscr.rotation.y = Math.PI; lid.add(lscr);
    const lapL = new THREE.PointLight(0x7fb6ff, 0.6, 1.4, 1.8); lapL.position.set(TX - 0.15, TY + 0.25, TZ - 0.2); S.add(lapL);

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: SY, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(MX, 0, MZ + 0.06); M.g.rotation.y = 0.16; S.add(M.g);   // the blue tee from the viral reel
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    const RX = 0.62, RY = 0.95, RZ = -0.62;
    const R = (() => {   // the headphones hover-bot; no hands
      const g = new THREE.Group(); g.position.set(RX, RY, RZ); g.rotation.y = -0.3; S.add(g);
      const lift = new THREE.Group(); lift.position.y = 0.25; g.add(lift); lift.scale.setScalar(0.6);
      const head = new THREE.Group(); lift.add(head);
      const shellM = SM(0xd9d1c4, 0.55), orM = SM(0xe8692f, 0.5), visorM = SM(0x141a2e, 0.15, { metalness: 0.4 });
      const shell = sph(0.27, shellM, 0, 0, 0, head); shell.scale.set(1, 0.9, 0.92); shell.geometry = new THREE.SphereGeometry(0.27, 40, 28);
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.272, 40, 20, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), orM); belly.scale.set(1, 0.9, 0.92); head.add(belly);
      const visor = new THREE.Mesh(new THREE.SphereGeometry(0.255, 40, 24, -Math.PI * 0.36, Math.PI * 0.72, Math.PI * 0.3, Math.PI * 0.32), visorM); visor.scale.set(1.02, 0.92, 0.96); head.add(visor);
      const FW = 256, FH = 128, fc = document.createElement('canvas'); fc.width = FW; fc.height = FH; const fx = fc.getContext('2d');
      const fTex = new THREE.CanvasTexture(fc); fTex.colorSpace = THREE.SRGBColorSpace;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.15), new THREE.MeshBasicMaterial({ map: fTex, transparent: true, toneMapped: false })); face.position.set(0, 0.02, 0.247); head.add(face);
      const drawFace = (mood, talk, blink) => { fx.clearRect(0, 0, FW, FH); fx.fillStyle = '#ffb36b'; fx.strokeStyle = '#ffb36b'; fx.lineCap = 'round'; fx.lineWidth = 14; fx.shadowColor = '#ff8a3d'; fx.shadowBlur = 14;
        [76, 180].forEach((cx, i) => { if (blink) { fx.beginPath(); fx.moveTo(cx - 20, 52); fx.lineTo(cx + 20, 52); fx.stroke(); }
          else if (mood === 'happy') { fx.beginPath(); fx.arc(cx, 62, 20, Math.PI * 1.1, Math.PI * 1.9); fx.stroke(); }
          else if (mood === 'flat') { fx.beginPath(); fx.moveTo(cx - 20, 50); fx.lineTo(cx + 20, 50); fx.stroke(); }
          else if (mood === 'wink' && i === 1) { fx.beginPath(); fx.arc(cx, 58, 18, Math.PI * 1.1, Math.PI * 1.9); fx.stroke(); }
          else if (mood === 'sad') { fx.beginPath(); fx.ellipse(cx, 56, 14, 17, 0, 0, 7); fx.fill(); fx.lineWidth = 9; fx.beginPath(); fx.moveTo(cx - 20, i ? 30 : 24); fx.lineTo(cx + 20, i ? 24 : 30); fx.stroke(); fx.lineWidth = 14; }
          else if (mood === 'wide') { fx.beginPath(); fx.ellipse(cx, 50, 20, 26, 0, 0, 7); fx.fill(); fx.fillStyle = 'rgba(255,255,255,0.85)'; fx.beginPath(); fx.arc(cx + 6, 40, 6, 0, 7); fx.fill(); fx.fillStyle = '#ffb36b'; }
          else if (mood === 'star') { fx.save(); fx.translate(cx, 52); fx.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 10 : 24; fx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } fx.closePath(); fx.fill(); fx.restore(); }
          else { fx.beginPath(); fx.ellipse(cx, 50, 15, 21, 0, 0, 7); fx.fill(); fx.fillStyle = 'rgba(255,255,255,0.8)'; fx.beginPath(); fx.arc(cx + 5, 42, 5, 0, 7); fx.fill(); fx.fillStyle = '#ffb36b'; } });
        const o = K.clamp(talk); fx.lineWidth = 9; if (o > 0.08) { fx.beginPath(); fx.ellipse(128, 100, 16, 4 + o * 12, 0, 0, 7); fx.fill(); } else { fx.beginPath(); fx.arc(128, 88, 12, Math.PI * 0.15, Math.PI * 0.85); fx.stroke(); }
        fTex.needsUpdate = true; };
      const hpM = SM(0x2f5fd0, 0.35), hpD = SM(0x1b2f6e, 0.4);
      head.add(new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.03, 12, 40, Math.PI), hpM));
      const band2 = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.018, 8, 40, Math.PI), SM(0xdfe8ff, 0.4)); band2.scale.set(0.97, 0.97, 1); head.add(band2);
      [-1, 1].forEach(sx => { const cup = new THREE.Group(); cup.position.set(sx * 0.29, -0.02, 0); head.add(cup);
        const c1 = cyl(0.1, 0.1, 0.09, hpM, 0, 0, 0, 28, cup); c1.rotation.z = Math.PI / 2; const c2 = cyl(0.075, 0.075, 0.1, hpD, sx * 0.012, 0, 0, 28, cup); c2.rotation.z = Math.PI / 2;
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.012, 8, 28), SM(0xdfe8ff, 0.4)); ring.rotation.y = Math.PI / 2; ring.position.x = sx * 0.046; cup.add(ring); });
      const ringTex = K.canvasTex(128, 128, (x, w, h) => { const gr = x.createRadialGradient(64, 64, 10, 64, 64, 62); gr.addColorStop(0, 'rgba(120,220,255,0.9)'); gr.addColorStop(0.5, 'rgba(90,180,255,0.35)'); gr.addColorStop(1, 'rgba(90,180,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, w, h); });
      const thr = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, depthWrite: false, toneMapped: false })); thr.rotation.x = Math.PI / 2; thr.position.y = -0.27; lift.add(thr);
      const glowL = new THREE.PointLight(0xffa060, 0.0, 1.0, 2); lift.add(glowL);
      const r = { g, head, lift };
      r.update = (t, { talk = 0, look = [0, 0], mood = 'calm' } = {}) => {
        lift.position.y = 0.25 + Math.sin(t * 2.4) * 0.018;
        head.rotation.set(look[1] + Math.sin(t * 2.4 + 1) * 0.03, look[0] + Math.sin(t * 0.8) * 0.05, Math.sin(t * 1.7) * 0.04);
        const blink = ((t + 1.3) % 3.4) < 0.11;
        drawFace(mood === 'smile' ? 'happy' : mood, talk * 1.3, blink && !['smile', 'wink', 'flat', 'star', 'sad'].includes(mood));
        thr.material.opacity = 0.7 + 0.3 * Math.sin(t * 20); thr.scale.setScalar(1 + 0.1 * Math.sin(t * 13));
        glowL.intensity = 0.2 + talk * 0.6;
      };
      return r;
    })();

    // ================= LIGHT =================
    const hemi = new THREE.HemisphereLight(0x6f84d8, 0x1a1014, 0.42); S.add(hemi);
    const fill = new THREE.DirectionalLight(0xffe2c4, 0.85); fill.position.set(0.8, 2.6, 2.6); fill.target.position.set(0, 0.9, -0.8); fill.castShadow = true; fill.shadow.mapSize.set(2048, 2048); fill.shadow.bias = -0.0006;
    fill.shadow.camera.left = -2.5; fill.shadow.camera.right = 2.5; fill.shadow.camera.top = 2.8; fill.shadow.camera.bottom = -2.5; S.add(fill); S.add(fill.target);
    const moonRim = new THREE.DirectionalLight(0x9ab4ff, 0.9); moonRim.position.set(1.8, 2.4, -3); S.add(moonRim);
    const rimP = new THREE.DirectionalLight(0xc070ff, 0.55); rimP.position.set(-2.2, 1.6, -1.8); S.add(rimP);

    // ================= POST (bloom + glitch/flash + vignette) =================
    const rtMain = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
    const bloom = new POST.UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.55, 0.6, 0.95);
    const oCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postU = { tC: { value: rtMain.texture }, res: { value: new THREE.Vector2(W, H) }, time: { value: 0 }, glitch: { value: 0 }, flash: { value: 0 }, expo: { value: 1.0 } };
    const postM = new THREE.ShaderMaterial({ uniforms: postU, depthTest: false, depthWrite: false, toneMapped: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `
        precision highp float; varying vec2 vUv; uniform sampler2D tC; uniform vec2 res; uniform float time, glitch, flash, expo;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        vec3 aces(vec3 x){ x *= expo; return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0., 1.); }
        vec3 srgb(vec3 c){ c = clamp(c, 0., 1.); return mix(c*12.92, 1.055*pow(c, vec3(1./2.4))-0.055, step(0.0031308, c)); }
        void main(){ vec2 uv = vUv;
          if (glitch > 0.) { float row = floor(uv.y * 46.), h = hash(vec2(row, floor(time * 30.))); uv.x += (h - 0.5) * 0.14 * glitch * step(0.45, h); }
          vec3 c = aces(texture2D(tC, uv).rgb);
          if (glitch > 0.) { c.r = mix(c.r, aces(texture2D(tC, uv + vec2(0.012 * glitch, 0.)).rgb).r, 0.6 * glitch); c.b = mix(c.b, aces(texture2D(tC, uv - vec2(0.012 * glitch, 0.)).rgb).b, 0.6 * glitch); }
          vec2 vq = vUv - 0.5; c *= 1. - dot(vq, vq) * 0.55; c += (hash(vUv * res + time) - 0.5) * 0.025; c = mix(c, vec3(1.), flash);
          gl_FragColor = vec4(srgb(c), 1.); }` });
    const postScene = new THREE.Scene(); const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postM); quad.frustumCulled = false; postScene.add(quad);
    const hc = document.createElement('canvas'); hc.width = W; hc.height = H; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hudScene = new THREE.Scene(); const hudQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, toneMapped: false, depthTest: false })); hudQ.frustumCulled = false; hudScene.add(hudQ);
    K.draw = () => { const r = K.renderer; r.setRenderTarget(rtMain); r.clear(); r.render(S, K.cam); bloom.render(r, null, rtMain, 0, false);
      r.setRenderTarget(null); r.clear(); r.render(postScene, oCam); r.autoClear = false; r.render(hudScene, oCam); r.autoClear = true; };

    // ================= HUD helpers =================
    const ACC = '#ffc53d', INK = 'rgba(12,12,26,0.93)', GRN = '#3ddc97', RED = '#ff4d5e', IG = ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5'];
    const FR = '"Fredoka Light", "Inter Display"', MONO = '"DejaVu Sans Mono"';
    const rr = (x, y, w, hh, r, f, s, lw = 4, c = h) => { c.beginPath(); c.roundRect(x, y, w, hh, r); if (f) { c.fillStyle = f; c.fill(); } if (s) { c.strokeStyle = s; c.lineWidth = lw; c.stroke(); } };
    const txt = (s, x, y, size, col, wgt = 700, al = 'center', font = FR, c = h) => { c.font = `${wgt} ${size}px ${font}`; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y); };
    const otxt = (s, x, y, size, col, lw = 12, stroke = 'rgba(10,8,20,0.92)') => { h.font = `900 ${size}px ${FR}`; h.textAlign = 'center'; h.textBaseline = 'middle'; h.lineJoin = 'round'; h.lineWidth = lw; h.strokeStyle = stroke; h.strokeText(s, x, y); h.fillStyle = col; h.fillText(s, x, y); };
    const pop = (t, a, d = 0.35) => eb(pr(t, a, a + d));
    const scr = v3 => { const p = v3.clone().project(K.cam); return [(p.x * 0.5 + 0.5) * W, (1 - (p.y * 0.5 + 0.5)) * H]; };
    const headW = (o, dy) => { const v = new THREE.Vector3(); o.getWorldPosition(v); v.y += dy; return v; };
    const igGrad = (x0, y0, x1, y1) => { const g = h.createLinearGradient(x0, y0, x1, y1); IG.forEach((c, i) => g.addColorStop(i / 4, c)); return g; };
    const sticker = (t, a, s, x, y, rot, bg, fg, size = 54, padX = 34) => { const k = pop(t, a, 0.3); if (k <= 0) return; h.save(); h.translate(x, y); h.rotate(rot); h.scale(k, k);
      h.font = `900 ${size}px ${FR}`; const w = h.measureText(s).width + padX * 2; h.shadowColor = 'rgba(0,0,0,0.45)'; h.shadowBlur = 18; h.shadowOffsetY = 6; rr(-w / 2, -size * 0.85, w, size * 1.7, 22, bg, '#141414', 6); h.shadowColor = 'transparent'; txt(s, 0, 4, size, fg, 900); h.restore(); };
    const stamp = (t, a, s, x, y, rot, col, size = 92) => { const k = a > t ? 0 : 1 + 1.4 * (1 - eo(pr(t, a, a + 0.22))); if (!k) return; h.save(); h.translate(x, y); h.rotate(rot); h.scale(k, k); h.globalAlpha = cl((t - a) / 0.12);
      h.font = `900 ${size}px ${FR}`; const w = h.measureText(s).width + 50; h.lineWidth = 10; h.strokeStyle = col; h.strokeRect(-w / 2, -size * 0.75, w, size * 1.5); txt(s, 0, 6, size, col, 900); h.restore(); };
    const tag = (t, a, s, anchor, dx, dy, col = ACC) => { const k = pop(t, a, 0.3); if (k <= 0) return; const [x, y] = scr(anchor);
      h.globalAlpha = k; h.strokeStyle = '#fff'; h.lineWidth = 4; h.beginPath(); h.moveTo(x, y); h.lineTo(x + dx * 0.6, y + dy); h.lineTo(x + dx, y + dy); h.stroke();
      h.font = `900 44px ${FR}`; const w = h.measureText(s).width + 50, bx = dx > 0 ? x + dx : x + dx - w; rr(bx, y + dy - 40, w, 80, 20, INK, col, 4); txt(s, bx + w / 2, y + dy + 2, 44, col, 900); h.globalAlpha = 1; };
    const fmt = n => Math.round(n).toLocaleString('en-US');
    const confetti = (t, a, n = 60, seed = 7) => { if (t < a) return; const r3 = K.rng(seed); for (let i = 0; i < n; i++) { const ph = (t - a) * (0.6 + r3() * 0.5); const x = r3() * W, y = -40 + ph * (600 + r3() * 500) % 1500, s = 10 + r3() * 14; h.save(); h.translate(x, y); h.rotate(ph * 6 + i); h.fillStyle = ['#ffc53d', '#ff4fd8', '#4fd8ff', '#3ddc97', '#fff'][i % 5]; h.fillRect(-s / 2, -s / 4, s, s / 2); h.restore(); } };

    // a phone card (views)
    const phone = (t, x, y, s, views, mood, jit = 0) => { h.save(); h.translate(x + jit * Math.sin(t * 40) * 6, y); h.scale(s, s); h.rotate(0.05);
      rr(-200, -280, 400, 560, 50, '#111', '#2b2b33', 9); rr(-176, -254, 352, 508, 34, '#16161c');
      h.beginPath(); h.roundRect(-50, -248, 100, 22, 11); h.fillStyle = '#000'; h.fill();
      txt('your reel', 0, -170, 30, 'rgba(255,255,255,0.6)', 700); txt(fmt(views), 0, -40, 120, '#9aa0b8', 900); txt('views', 0, 50, 40, '#fff', 800); txt(mood, 0, 160, 96, '#fff', 400); h.restore(); };

    // ================= LAPTOP SCREEN =================
    const lapDraw = (t) => { const c = lx, w = 512, hh = 340; c.fillStyle = '#0b0d16'; c.fillRect(0, 0, w, hh);
      c.fillStyle = '#151a2a'; c.fillRect(0, 0, w, 34); ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((cc, i) => { c.fillStyle = cc; c.beginPath(); c.arc(20 + i * 20, 17, 6, 0, 7); c.fill(); });
      if (t < C.INST) { const g = c.createLinearGradient(0, 40, w, hh); IG.forEach((cc, i) => g.addColorStop(i / 4, cc)); c.fillStyle = g; c.globalAlpha = 0.25; c.fillRect(0, 34, w, hh); c.globalAlpha = 1; txt('200', w / 2, 170, 120, '#ffffff', 900, 'center', FR, c); txt('views', w / 2, 250, 38, '#d8e2ff', 700, 'center', FR, c); }
      else { const lines = ['$ claude', '> /plugin install instagram-agent', '  13 skills installed ✓']; const k = (t - C.INST) * 30; let left = k;
        lines.forEach((ln, i) => { if (left <= 0) return; const s = ln.slice(0, Math.floor(left)); left -= ln.length + 6; txt(s, 18, 70 + i * 40, 22, i === 2 ? GRN : '#d8e2ff', 600, 'left', MONO, c); });
        const ci = cmdAt(t); if (ci >= 0) { txt('> /' + CMDS[ci][1], 18, 210, 30, CMDS[ci][2], 700, 'left', MONO, c); if (Math.floor(t * 3) % 2) c.fillRect(18 + c.measureText('> /' + CMDS[ci][1]).width + 6, 196, 14, 28); } }
      lTex.needsUpdate = true; };

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const smv = (a, b, k) => a + (b - a) * k;
    const toR = [0.7, 0.05], toCam = [-0.16, 0.02], down = [0.35, -0.42], up = [0.05, -0.32];
    const P0 = { L: [-0.3, 0, -0.05, -0.1], R: [-0.3, 0, 0.05, -0.1] };
    const POSE = { rest: P0, shrug: { L: [-0.55, 0.1, -0.55, -1.25], R: [-0.55, -0.1, 0.55, -1.25] }, both: { L: [-2.7, 0.15, -0.45, -0.35], R: [-2.7, -0.15, 0.45, -0.35] },
      point: { L: [-0.3, 0, -0.05, -0.1], R: [-1.45, -0.18, 0.0, -0.08] }, chin: { L: [-0.3, 0, -0.05, -0.1], R: [-1.15, -0.55, 0.1, -2.0] },
      cheeks: { L: [-1.35, 0.55, -0.2, -2.1], R: [-1.35, -0.55, 0.2, -2.1] }, slump: { L: [0.1, 0, -0.2, -0.05], R: [0.1, 0, 0.2, -0.05] },
      phone: { L: [-0.95, 0.35, -0.15, -1.55], R: [-0.95, -0.35, 0.15, -1.55] }, wave: { L: [-0.3, 0, -0.05, -0.1], R: [-2.35, -0.3, 0.55, -0.9] }, fist: { L: [-0.3, 0, -0.05, -0.1], R: [-2.5, -0.2, 0.3, -1.6] } };
    let curPose = JSON.parse(JSON.stringify(P0));
    const acting = (t) => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 || Math.abs(t - last) > 0.2 ? 1 : cl((t - last) * 5); last = t;
      let mL = toR, face = 'neutral', lean = 0.1, pose = 'rest', bounce = 0, rL = [-0.4, 0.05], mood = 'calm';
      if (t < C.SOLO) { mL = t < B('h2') - 0.1 ? down : toR; face = 'worried'; pose = t < B('h2') - 0.1 ? 'phone' : 'shrug'; lean = 0.3; rL = [-0.45, 0.08]; mood = 'sad'; }
      else if (t < C.THIR) { mL = toR; face = t < C.INST ? 'worried' : 'neutral'; pose = t < C.INST ? 'slump' : 'rest'; lean = t < C.INST ? 0.3 : 0.05; rL = t < C.INST ? [-0.45, 0.05] : [0.35, -0.25]; mood = t < C.INST ? 'calm' : 'smile'; }
      else if (t < C.K1) { mL = toCam; face = 'shock'; pose = 'both'; lean = -0.2; bounce = 1.0; rL = [-0.45, 0.05]; mood = 'wink'; }
      else if (t < C.COST) { const ci = cmdAt(t);
        mL = t >= C.HOOKQ && t < C.K3 ? toCam : t >= C.DELV && t < C.K4 ? toCam : toR; rL = [0.3, -0.25]; mood = 'happy';
        if (t >= C.HOOKQ && t < C.K3) { face = 'shock'; pose = 'cheeks'; lean = -0.2; bounce = 0.6; }
        else if (t >= C.DELV && t < C.K4) { face = mT > 0.05 ? 'neutral' : 'smile'; pose = 'wave'; bounce = 0.9; }
        else { face = ci === 4 ? 'smile' : 'neutral'; pose = ci % 2 ? 'chin' : 'rest'; lean = 0.05; }
        if (t >= B('k1') && t < E('k1')) rL = [0.35, -0.3]; }
      else if (t < C.YAY) { const z = t >= C.ZERO; mL = z ? toR : toR; face = z ? 'shock' : 'neutral'; pose = z ? 'rest' : 'chin'; rL = [-0.45, 0.05]; mood = z ? 'flat' : 'calm'; lean = z ? -0.15 : 0.05; }
      else if (t < C.CTA) { mL = toCam; face = mT > 0.05 ? 'shock' : 'smile'; pose = 'both'; bounce = 1.6; rL = [-0.45, 0.05]; mood = 'star'; lean = -0.15; }
      else { mL = t < C.DONE2 ? toR : toCam; face = t < C.DONE2 ? 'smile' : (mT > 0.05 ? 'neutral' : 'smile'); pose = t >= C.DONE2 ? 'fist' : 'rest'; rL = t < C.DONE2 ? [0.25, 0.02] : [-0.45, 0.05]; mood = t >= C.DONE2 ? 'wink' : 'smile'; bounce = t >= C.DONE2 ? 0.5 : 0; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = smv(mYaw, mL[0], k); mPitch = smv(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], lean });
      const tgt = POSE[pose]; ['L', 'R'].forEach(s => { for (let i = 0; i < 4; i++) curPose[s][i] = smv(curPose[s][i], tgt[s][i], k); });
      const [aL, aR] = M.arms; const bx = pose === 'both' ? 0.18 * Math.sin(t * 13) : 0, wv = pose === 'wave' ? 0.3 * Math.sin(t * 9) : 0;
      aL.sh.rotation.set(curPose.L[0] + bx, curPose.L[1], curPose.L[2]); aL.el.rotation.x = curPose.L[3];
      aR.sh.rotation.set(curPose.R[0] + bx, curPose.R[1], curPose.R[2] + wv); aR.el.rotation.x = curPose.R[3];
      M.g.position.y = bounce * 0.025 * Math.abs(Math.sin(t * 9));
      rYaw = smv(rYaw, rL[0], k); rPitch = smv(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.z += 0.18 * K.pulse(t, C.SOLO, 0.8) + 0.15 * K.pulse(t, C.CTA, 0.7);
      R.head.rotation.x += 0.14 * K.pulse(t, C.ZERO, 0.45);
      R.g.position.y = RY + 0.08 * K.pulse(t, C.INST, 0.9) + 0.06 * K.pulse(t, C.YAY, 0.8);
      R.g.rotation.y = -0.3 + 0.6 * K.pulse(t, C.DONE, 0.9);
      BULBS.forEach((b, i) => b.material.color.setScalar(1));
      neonL.intensity = 1.0 + 0.15 * Math.sin(t * 9) * (Math.sin(t * 1.3) > 0.9 ? 1 : 0.1);
      fan.rotation.y = t * 8;
    };

    // ================= CAMERA =================
    const Pp = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [MX + 0.04, 1.32, MZ], RHL = [RX, RY + 0.28, RZ];
    const sh = {
      hook: [Pp([0.25, 1.62, 3.4], [0.1, 1.45, -1.2], 40), Pp([0.2, 1.55, 2.8], [0.08, 1.4, -1.0], 38)],
      mad: [Pp([-0.12, 1.36, 1.3], MHL, 32), Pp([-0.14, 1.36, 1.08], MHL, 32)],
      robo: [Pp([0.45, 1.28, 1.25], RHL, 30), Pp([0.47, 1.28, 1.05], RHL, 30)],
      two: [Pp([0.18, 1.38, 2.2], [0.1, 1.22, -0.75], 34), Pp([0.14, 1.36, 1.95], [0.1, 1.22, -0.75], 34)],
      high: [Pp([0.6, 2.2, 2.2], [0.1, 1.0, -0.7], 38), Pp([0.45, 2.05, 1.95], [0.1, 1.0, -0.7], 38)],
      low: [Pp([-0.5, 0.95, 1.8], [0.05, 1.3, -0.9], 36), Pp([-0.42, 0.98, 1.6], [0.05, 1.32, -0.9], 36)],
      wide: [Pp([0.1, 1.6, 3.3], [0.08, 1.5, -1.2], 40), Pp([0.1, 1.56, 3.0], [0.08, 1.48, -1.2], 40)],
      cta: [Pp([0.25, 1.48, 3.0], [0.22, 1.25, -0.75], 40), Pp([0.22, 1.46, 2.7], [0.2, 1.24, -0.75], 40)],
    };
    const plan = [
      [0, B('h2') - 0.1, sh.hook], [B('h2') - 0.1, C.SOLO, sh.mad], [C.SOLO, C.INST, sh.robo], [C.INST, C.THIR, sh.high], [C.THIR, C.K1, sh.mad],
      [C.K1, C.K2, sh.two], [C.K2, C.HOOKQ, sh.robo], [C.HOOKQ, C.K3, sh.mad], [C.K3, C.DELV, sh.two], [C.DELV, C.K4, sh.mad], [C.K4, C.K5, sh.low], [C.K5, C.COST, sh.two],
      [C.COST, C.ZERO, sh.mad], [C.ZERO, C.YAY, sh.robo], [C.YAY, C.CTA, sh.wide], [C.CTA, D + 5, sh.cta],
    ];
    const smooth = q => q * q * (3 - 2 * q);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth, shake: [C.THIR, C.HOOKQ, C.ZERO, C.YAY].includes(a) ? (t => 0.01 * Math.exp(-(t - a) * 5)) : null }));

    // ================= HUD =================
    const hookHud = (t) => { const k = pop(t, 0.15, 0.4); phone(t, 230, 520, 0.62 * k, 200, '😐', t >= B('h2') ? 0 : 0.4);
      sticker(t, B('h1') + 1.0, 'every. single. day.', 700, 330, 0.05, '#fff', '#141414', 46);
      if (t >= B('h2')) sticker(t, B('h2') + 0.2, 'what am I doing wrong?? 😩', W / 2 + 40, 860, -0.04, RED, '#fff', 42); };
    const soloHud = (t) => { tag(t, C.SOLO + 0.3, 'TEAM SIZE: 1', headW(M.head, 0.5), 110, -190, '#ff9b9b'); };
    const installHud = (t) => {   // terminal card + 13 skill chips filling in
      const k = pop(t, C.INST, 0.4); h.save(); h.translate(W / 2, 430); h.scale(k, k);
      rr(-470, -230, 940, 460, 34, INK, 'rgba(255,255,255,0.22)', 3); rr(-470, -230, 940, 62, [34, 34, 0, 0], '#151a2a');
      ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((cc, i) => { h.fillStyle = cc; h.beginPath(); h.arc(-430 + i * 32, -199, 10, 0, 7); h.fill(); }); txt('terminal', 0, -198, 28, '#9fb0d8', 700, 'center', MONO);
      const cmd = '/plugin install instagram-agent', n = Math.floor(cl((t - C.INST - 0.2) * 34, 0, cmd.length));
      txt('> ' + cmd.slice(0, n), -430, -120, 38, '#d8e2ff', 700, 'left', MONO);
      const filled = Math.floor(cl(pr(t, C.INST + 1.0, C.DONE + 0.4)) * 13);
      for (let i = 0; i < 13; i++) { const col = i % 5, row = Math.floor(i / 5), x = -430 + col * 176, y = -40 + row * 76; const on = i < filled, kk = on ? pop(t, C.INST + 1.0 + (C.DONE + 0.4 - C.INST - 1.0) * (i / 13), 0.25) : 0;
        rr(x, y - 28, 164, 56, 28, on ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)', on ? IG[i % 5] : 'rgba(255,255,255,0.12)', 3); h.globalAlpha = 0.25 + 0.75 * kk; txt('/' + SKILLS[i], x + 82, y + 1, 24, on ? '#fff' : '#5a6080', 800, 'center', MONO); h.globalAlpha = 1; }
      if (t >= C.DONE) { const kd = pop(t, C.DONE, 0.3); h.save(); h.translate(0, 180); h.scale(kd, kd); txt('✓ 13 skills installed', 0, 0, 40, GRN, 900, 'center', MONO); h.restore(); }
      h.restore();
      if (t >= C.THIR) { const kk = 1 + 1.2 * (1 - eo(pr(t, C.THIR, C.THIR + 0.25))); h.save(); h.translate(W / 2, 880); h.rotate(-0.06); h.scale(kk, kk); h.globalAlpha = cl((t - C.THIR) / 0.1); otxt('13?!', 0, 0, 210, ACC, 22); h.restore(); h.globalAlpha = 1; } };
    const cmdChip = (t, i) => { const [a, name, col] = CMDS[i], k = pop(t, a, 0.32);
      h.save(); h.translate(W / 2, 200); h.scale(k, k); h.shadowColor = col; h.shadowBlur = 30; rr(-330, -70, 660, 140, 36, INK, col, 5); h.shadowBlur = 0;
      txt('/' + name, 0, 4, 82, '#fff', 900, 'center', MONO); h.restore();
      for (let j = 0; j < 13; j++) { const on = j <= i; h.beginPath(); h.arc(W / 2 - 216 + j * 36, 305, on ? 9 : 7, 0, 7); h.fillStyle = on ? CMDS[Math.min(j, 4)][2] : 'rgba(255,255,255,0.3)'; h.fill(); }
      txt(`${i + 1} of 13`, W / 2 + 290, 305, 28, 'rgba(255,255,255,0.75)', 800); };
    const panel = (t, a, x, y, w, hh) => { const k = pop(t, a + 0.15, 0.35); h.save(); h.translate(x, y); h.scale(k, k); h.shadowColor = 'rgba(0,0,0,0.5)'; h.shadowBlur = 30; h.shadowOffsetY = 10; rr(-w / 2, -hh / 2, w, hh, 30, '#f7f3ea'); h.shadowColor = 'transparent'; return k; };
    const viralHud = (t) => { const a = C.K1; panel(t, a, W / 2, 600, 900, 520);
      const r3 = K.rng(4), hot = [1, 3, 4], mult = ['3.4×', '5.1×', '8.2×'];
      for (let i = 0; i < 6; i++) { const x = -405 + (i % 3) * 280, y = -230 + Math.floor(i / 3) * 240; const g = h.createLinearGradient(x, y, x + 250, y + 210); g.addColorStop(0, `hsl(${200 + i * 30},55%,55%)`); g.addColorStop(1, `hsl(${260 + i * 25},55%,32%)`); rr(x, y, 250, 210, 18, g);
        h.fillStyle = 'rgba(255,255,255,0.85)'; h.beginPath(); h.moveTo(x + 110, y + 80); h.lineTo(x + 110, y + 130); h.lineTo(x + 150, y + 105); h.fill();
        const hi = hot.indexOf(i), lit = hi >= 0 ? pr(t, a + 0.7 + hi * 0.35, a + 0.95 + hi * 0.35) : 0;
        if (lit > 0) { rr(x - 6, y - 6, 262, 222, 22, null, ACC, 10 * lit); const kk = eb(lit); h.save(); h.translate(x + 200, y + 30); h.scale(kk, kk); rr(-70, -34, 140, 68, 22, RED, '#141414', 4); txt(mult[hi] + ' 🔥', 0, 2, 32, '#fff', 900); h.restore(); }
        else txt(['1.0×', '0.8×', '1.2×'][i % 3], x + 125, y + 185, 26, 'rgba(255,255,255,0.75)', 800); }
      h.restore(); };
    const reelHud = (t) => { const a = C.K2; panel(t, a, W / 2, 600, 900, 520);
      txt('REEL SCRIPT', -400, -200, 34, '#c2452d', 900, 'left');
      rr(-410, -150, 820, 120, 20, '#fff2c8', ACC, 4); txt('HOOK', -380, -118, 26, '#8a6a1a', 900, 'left');
      const hk = 'POV: you posted 30 days straight…', n = Math.floor(cl((t - a - 0.5) * 26, 0, hk.length)); txt(hk.slice(0, n), -380, -70, 38, '#1b1e2a', 800, 'left');
      ['BEAT 1 · the problem', 'BEAT 2 · the switch', 'BEAT 3 · the result', 'CTA · comment one word'].forEach((s, i) => { const kk = pop(t, a + 1.0 + i * 0.22, 0.25); h.globalAlpha = kk; txt(s, -380, 30 + i * 60, 34, '#3a3f55', 700, 'left'); h.globalAlpha = 1; });
      h.restore();
      if (t >= C.HOOKQ) { const kq = pop(t, C.HOOKQ, 0.25); h.save(); h.translate(W / 2, 960); h.rotate(-0.05); h.scale(kq, kq); otxt('MY HOOKS?!', 0, 0, 110, ACC, 18); h.restore(); } };
    const humanHud = (t) => { const a = C.K3; panel(t, a, W / 2, 600, 900, 520);
      txt('CAPTION', -400, -200, 34, '#c2452d', 900, 'left');
      const rows = [['Let\'s ', 'delve', ' into my'], ['', 'game-changing', ' morning routine'], ['to ', 'unlock your potential', ' ✨'], ['made it myself. comment ROUTINE', '', '']];
      rows.forEach(([p, bad, s], i) => { const y = -110 + i * 80; h.font = `800 40px ${FR}`; h.textAlign = 'left'; const w1 = h.measureText(p).width, w2 = h.measureText(bad).width; txt(p, -400, y, 40, '#1b1e2a', 800, 'left');
        if (bad) { const cut = pr(t, a + 0.6 + i * 0.3, a + 0.85 + i * 0.3); const gone = i === 0 && t >= C.DELV; h.globalAlpha = gone ? 1 - pr(t, C.DELV + 0.2, C.DELV + 0.5) : 1; const yy = y - (gone ? eo(pr(t, C.DELV + 0.1, C.DELV + 0.6)) * 160 : 0);
          txt(bad, -400 + w1, yy, 40, cut > 0 ? '#b0a89a' : '#1b1e2a', 800, 'left'); if (cut > 0) { h.strokeStyle = RED; h.lineWidth = 7; h.beginPath(); h.moveTo(-404 + w1, yy); h.lineTo(-404 + w1 + (w2 + 8) * cut, yy); h.stroke(); } h.globalAlpha = 1; }
        txt(s, -400 + w1 + w2, y, 40, '#1b1e2a', 800, 'left'); });
      const ki = pop(t, a + 1.6, 0.3); h.save(); h.translate(300, 180); h.scale(ki, ki); rr(-120, -40, 240, 80, 24, GRN, '#141414', 4); txt('HUMAN ✓', 0, 2, 38, '#0b2a1a', 900); h.restore();
      h.restore();
      if (t >= C.DELV) stamp(t, C.DELV + 0.15, 'BYE, DELVE 👋', W / 2, 960, -0.08, RED, 74); };
    const planHud = (t) => { const a = C.K4; panel(t, a, W / 2, 600, 900, 520);
      txt('THIS WEEK', -400, -200, 34, '#c2452d', 900, 'left');
      const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'], ic = ['🎬', '🖼', '📖', '🎬', '💬', '🖼', '🎬'], cols = ['#ff6b4a', '#4fd8ff', '#c58bff', '#ff6b4a', '#3ddc97', '#4fd8ff', '#ff6b4a'];
      days.forEach((d, i) => { const x = -400 + i * 117; txt(d, x + 50, -130, 28, '#3a3f55', 900); rr(x, -100, 100, 300, 18, '#ece5d6');
        const kk = pop(t, a + 0.5 + i * 0.16, 0.3); if (kk > 0) { h.save(); h.translate(x + 50, 30); h.scale(kk, kk); rr(-44, -110, 88, 220, 16, cols[i]); txt(ic[i], 0, -10, 54, '#fff', 400); h.restore(); } });
      h.restore(); };
    const dmHud = (t) => { const a = C.K5; panel(t, a, W / 2, 600, 900, 520);
      txt('DMs', -400, -200, 34, '#c2452d', 900, 'left');
      const k1 = pop(t, a + 0.4, 0.3); h.globalAlpha = k1; rr(-400, -150, 520, 90, 40, '#e6e0d2'); txt('is the guide free?? 🙏', -370, -104, 38, '#1b1e2a', 800, 'left'); h.globalAlpha = 1;
      const k2 = pop(t, a + 0.9, 0.3); h.globalAlpha = k2; h.fillStyle = igGrad(-120, -20, 400, 60); h.beginPath(); h.roundRect(-140, -30, 540, 140, 40); h.fill();
      txt('Yes! It\'s free. Sending', -110, 12, 36, '#fff', 800, 'left'); txt('the link now 👇', -110, 62, 36, '#fff', 800, 'left'); h.globalAlpha = 1;
      const k3 = pop(t, a + 1.3, 0.3); h.save(); h.translate(300, 170); h.scale(k3, k3); rr(-100, -34, 200, 68, 22, ACC, '#141414', 4); txt('DRAFTED ✍', 0, 2, 32, '#141414', 900); h.restore();
      h.restore(); };
    const costHud = (t) => { // price tag swings in, then a giant ZERO
      if (t < C.ZERO) { const k = pop(t, C.COST + 0.2, 0.4); h.save(); h.translate(W - 250, 520); h.rotate(0.25 * Math.sin(t * 3)); h.scale(k, k); rr(-120, -90, 240, 180, 22, '#f4efe4', '#141414', 6); h.beginPath(); h.arc(-80, -50, 14, 0, 7); h.fillStyle = '#141414'; h.fill(); txt('₹ ???', 10, 20, 64, '#141414', 900); h.restore(); return; }
      const kk = 1 + 1.4 * (1 - eo(pr(t, C.ZERO, C.ZERO + 0.25))); h.save(); h.translate(W / 2, 520); h.rotate(-0.05); h.scale(kk, kk); h.globalAlpha = cl((t - C.ZERO) / 0.1);
      h.shadowColor = '#3ddc97'; h.shadowBlur = 50; otxt('FREE', 0, 0, 230, GRN, 24); h.restore(); h.globalAlpha = 1;
      [['No API key', 0.9], ['No login', 1.5], ['Open source', 2.1]].forEach(([s, d], i) => { if (t < C.ZERO + d) return; sticker(t, C.ZERO + d, s + ' ✓', W / 2 + (i - 1) * 40, 760 + i * 120, (i - 1) * 0.05, '#fff', '#0b2a1a', 46); }); };
    const ctaHud = (t) => { const a = C.CTA; h.fillStyle = `rgba(6,5,16,${0.32 * eo(pr(t, a, a + 0.4))})`; h.fillRect(0, 0, W, H);
      const k = pop(t, a + 0.05, 0.4); h.save(); h.translate(W / 2 + 170, 640); h.rotate(0.03); h.scale(k * 0.76, k * 0.76);
      h.shadowColor = 'rgba(0,0,0,0.5)'; h.shadowBlur = 40; h.shadowOffsetY = 16; rr(-300, -470, 600, 800, 30, '#f7f3ea'); h.shadowColor = 'transparent';
      h.fillStyle = igGrad(-300, -470, 300, -330); h.beginPath(); h.roundRect(-300, -470, 600, 150, [30, 30, 0, 0]); h.fill();
      txt('13 FREE', 0, -425, 60, '#fff', 900); txt('INSTAGRAM SKILLS', 0, -362, 40, '#fff', 900);
      ['/ig-viral', '/ig-reel', '/ig-human', '/ig-plan', '/ig-dm'].forEach((s, i) => { const kk = pop(t, a + 0.35 + i * 0.12, 0.25); const y = -250 + i * 74; h.globalAlpha = kk;
        h.beginPath(); h.arc(-220, y, 22, 0, 7); h.fillStyle = GRN; h.fill(); h.strokeStyle = '#fff'; h.lineWidth = 6; h.beginPath(); h.moveTo(-231, y); h.lineTo(-222, y + 9); h.lineTo(-207, y - 9); h.stroke();
        txt(s, -180, y + 2, 40, '#1b1e2a', 800, 'left', MONO); h.globalAlpha = 1; });
      h.globalAlpha = pop(t, a + 1.0, 0.25); txt('+ 8 more', -180, 120, 36, '#8a7a62', 800, 'left'); h.globalAlpha = 1;
      const kb = pop(t, B('cta1') + 0.6, 0.35); h.save(); h.translate(0, 250); h.scale(kb, kb); h.shadowColor = 'rgba(255,197,61,0.6)'; h.shadowBlur = 40; rr(-260, -58, 520, 116, 30, ACC, '#141414', 6); h.shadowBlur = 0; txt('Comment SKILLS', 0, 2, 60, '#141414', 900); h.restore();
      h.restore();
      if (t >= C.DONE2) { const kp = pop(t, C.DONE2, 0.35); phone(t, 175, 430, 0.5 * kp, 200, '😰', 1); sticker(t, C.DONE2 + 0.45, 'you are DONE.', 230, 680, -0.08, RED, '#fff', 42); } };
    const hudDraw = (t) => { if (h.reset) h.reset(); else { h.setTransform(1, 0, 0, 1, 0, 0); h.globalAlpha = 1; h.shadowBlur = 0; } h.clearRect(0, 0, W, H);
      if (t < C.SOLO) hookHud(t);
      else if (t < C.INST) soloHud(t);
      else if (t < C.K1) installHud(t);
      else if (t < C.COST) { const ci = cmdAt(t); cmdChip(t, ci); [viralHud, reelHud, humanHud, planHud, dmHud][ci](t); }
      else if (t < C.YAY) costHud(t);
      else if (t < C.CTA) { costHud(t); confetti(t, C.YAY, 70, 9); sticker(t, C.YAY + 0.2, 'SEND IT!! 🔥', W / 2, 1000, 0.04, ACC, '#141414', 60); }
      if (t >= C.CTA) ctaHud(t);
      hTex.needsUpdate = true; };

    // ================= UPDATE =================
    const CUTS = [C.INST, ...CMDS.map(c => c[0]), C.ZERO];
    const update = t => {
      K.shoot(t, shots); acting(t); lapDraw(t);
      postU.time.value = t;
      postU.glitch.value = cl(CUTS.reduce((m, c) => Math.max(m, 1 - Math.abs(t - c) / 0.09), 0) * 0.8);
      postU.flash.value = Math.max(0, 0.45 - Math.abs(t - C.ZERO) / 0.1 * 0.45) + Math.max(0, 0.3 - Math.abs(t - C.YAY) / 0.1 * 0.3);
      K.cam.updateMatrixWorld(true);
      hudDraw(t);
    };

    // ================= SOUND =================
    const sfx = [['pop', 0.2, 0.25], ['pop', B('h1') + 1.0, 0.25], ['boing', B('h2') + 0.2, 0.25], ['pop', C.SOLO + 0.3, 0.3]];
    sfx.push(['whoosh', C.INST - 0.05, 0.35], ['pop', C.INST + 0.05, 0.3]); for (let i = 0; i < 16; i++) sfx.push(['tick', C.INST + 0.2 + i * 0.06, 0.18]);
    for (let i = 0; i < 13; i++) sfx.push(['pop', C.INST + 1.0 + (C.DONE + 0.4 - C.INST - 1.0) * (i / 13), 0.12]);
    sfx.push(['chime', C.DONE, 0.35], ['bass', C.THIR, 0.55], ['boing', C.THIR + 0.05, 0.35]);
    CMDS.forEach(([a]) => sfx.push(['zap', a - 0.02, 0.25], ['whoosh', a, 0.25], ['ding', a + 0.1, 0.18]));
    [0, 1, 2].forEach(i => sfx.push(['coin', C.K1 + 0.7 + i * 0.35, 0.25]));
    for (let i = 0; i < 10; i++) sfx.push(['tick', C.K2 + 0.5 + i * 0.09, 0.14]);
    sfx.push(['boing', C.HOOKQ, 0.35]); [0, 1, 2].forEach(i => sfx.push(['buzz', C.K3 + 0.6 + i * 0.3, 0.08]));
    sfx.push(['thud', C.DELV + 0.15, 0.45], ['whoosh', C.DELV + 0.2, 0.25]);
    for (let i = 0; i < 7; i++) sfx.push(['pop', C.K4 + 0.5 + i * 0.16, 0.14]);
    sfx.push(['pop', C.K5 + 0.4, 0.25], ['pop', C.K5 + 0.9, 0.25], ['kaching', C.K5 + 1.3, 0.25]);
    sfx.push(['pop', C.COST + 0.2, 0.3], ['riser', C.ZERO - 0.9, 0.18], ['bass', C.ZERO, 0.65], ['kaching', C.ZERO + 0.05, 0.45]);
    [0.9, 1.5, 2.1].forEach(d => sfx.push(['pop', C.ZERO + d, 0.25]));
    sfx.push(['chime', C.YAY, 0.35]); for (let i = 0; i < 8; i++) sfx.push(['pop', C.YAY + 0.1 + i * 0.07, 0.14]);
    sfx.push(['chime', C.CTA + 0.1, 0.3]); for (let i = 0; i < 5; i++) sfx.push(['pop', C.CTA + 0.35 + i * 0.12, 0.15]);
    sfx.push(['kaching', B('cta1') + 0.6, 0.35], ['boing', C.DONE2, 0.35], ['thud', C.DONE2 + 0.45, 0.35]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, music: { muteFrom: C.ZERO - 0.1, muteTo: C.ZERO + 0.6 }, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
