/* @maddiee.makess reel 9 — "The channel run by nobody" (YouTube automation, start to end).
   Cosy dark living room at night: velvet sofa, floor lamp, fairy lights, neon sign, window city, LED back-glow.
   Maddie on the sofa with the laptop on his lap, the headphones hover-bot floating beside him.
   The repo's name is NEVER shown or said: every name is a pixel-blur + lock (comment AUTO to get it).
   Full 9:16, no bars, no blush dots, captions high with yellow keywords, no handle, no name tags. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x07060d, fog: [7, 22], fov: 34, bloom: { strength: 0.5, radius: 0.6, threshold: 0.97 } },
  lines: window.YT_LINES,

  build(K, T) {
    const L = T.lines, N = L.length;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[typeof id === 'number' ? id : IX(id)].t, E = id => L[typeof id === 'number' ? id : IX(id)].end;
    const D = E(N - 1) + 1.8;
    const cl = K.clamp, eo = K.easeOut, pr = K.prog, eb = K.easeBack, lerp = K.lerp;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const rng = K.rng(19);

    // ================= TIMELINE =================
    const C = {
      HOOK: 0, NOB: B('nobody') - 0.12, REPO: B('repo') - 0.08, Q: B('q') - 0.1, STARS: B('stars') - 0.1, FREE: B('free') - 0.1, NAME: B('name') - 0.1, SEC: B('secret') - 0.08,
      S1: B('s1') - 0.12, S2: B('s2') - 0.12, CAP: B('cap') - 0.1, S3: B('s3') - 0.12, S4: B('s4') - 0.12, SUBS: B('subs') - 0.08, S5: B('s5') - 0.12,
      CHEAT: B('cheat') - 0.1, UP: B('up') - 0.12, BOTS: B('bots') - 0.1, SIGH: B('sigh') - 0.1, CLICK: B('click') - 0.08, CTA: B('cta') - 0.15,
    };
    const inS = (t, a, b) => t >= C[a] && t < C[b];

    // ================= ROOM =================
    const WZ = -1.55;                                                       // back wall
    const floorTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#3a2618'; x.fillRect(0, 0, w, h); const r = K.rng(7);
      for (let i = 0; i < 8; i++) { const y = i * 64; x.fillStyle = `hsl(24,${35 + r() * 10}%,${15 + r() * 6}%)`; x.fillRect(0, y + 1, w, 62); x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, y, w, 2);
        for (let k = 0; k < 40; k++) { x.fillStyle = `rgba(255,220,180,${0.02 + r() * 0.04})`; x.fillRect(r() * w, y + r() * 60, 40 + r() * 120, 1); } x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect((i * 173) % w, y, 2, 64); } });
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(5, 5);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), SM(0xffffff, 0.55, { map: floorTex })); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, -1); floor.receiveShadow = true; S.add(floor);
    const rugTex = K.canvasTex(512, 320, (x, w, h) => { x.fillStyle = '#2b2350'; x.fillRect(0, 0, w, h); x.strokeStyle = '#d8b46a'; x.lineWidth = 10; x.strokeRect(22, 22, w - 44, h - 44); x.strokeStyle = 'rgba(216,180,106,0.5)'; x.lineWidth = 4; x.strokeRect(46, 46, w - 92, h - 92);
      for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#ef7b5a' : '#5ec8c0'; x.beginPath(); x.moveTo(80 + i * 44, h / 2); x.lineTo(102 + i * 44, h / 2 - 30); x.lineTo(124 + i * 44, h / 2); x.lineTo(102 + i * 44, h / 2 + 30); x.fill(); } });
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.75), SM(0xffffff, 0.95, { map: rugTex })); rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.004, -0.15); rug.receiveShadow = true; S.add(rug);
    const wallTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#1a2a33'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,0.035)'; x.lineWidth = 2; for (let i = 0; i < 8; i++) { x.beginPath(); x.moveTo(i * 32 + 16, 0); x.lineTo(i * 32 + 16, h); x.stroke(); } });
    wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping; wallTex.repeat.set(10, 4);
    const wallM = SM(0xffffff, 0.92, { map: wallTex });
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), wallM); wall.position.set(0, 2, WZ); wall.receiveShadow = true; S.add(wall);
    const wallL = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), wallM); wallL.rotation.y = Math.PI / 2; wallL.position.set(-2.4, 2, WZ + 3); wallL.receiveShadow = true; S.add(wallL);
    rbox(10, 0.1, 0.03, SM(0x10181e, 0.6), 0, 0.05, WZ + 0.015, 0.01);                                // skirting
    // window (right) with the night city
    const winTex = K.canvasTex(512, 640, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#060a24'); g.addColorStop(0.6, '#1b1d5a'); g.addColorStop(1, '#3a2560'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      const r = K.rng(5); for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.6})`; x.fillRect(r() * w, r() * h * 0.45, 2, 2); }
      x.fillStyle = '#f6efd8'; x.beginPath(); x.arc(380, 120, 42, 0, 7); x.fill(); x.fillStyle = '#060a24'; x.beginPath(); x.arc(398, 108, 38, 0, 7); x.fill();
      for (let b = 0; b < 16; b++) { const bw = 26 + r() * 30, bh = 120 + r() * 300, bx = b * 33 - 10; x.fillStyle = `hsl(240,30%,${8 + r() * 6}%)`; x.fillRect(bx, h - bh, bw, bh);
        for (let wy = h - bh + 10; wy < h - 8; wy += 16) for (let wx = bx + 4; wx < bx + bw - 6; wx += 10) if (r() < 0.42) { x.fillStyle = r() < 0.8 ? 'rgba(255,205,130,0.95)' : 'rgba(150,200,255,0.9)'; x.fillRect(wx, wy, 5, 7); } } });
    const WX = 1.25, WY = 1.55;
    const winPane = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.2), new THREE.MeshBasicMaterial({ map: winTex, toneMapped: false })); winPane.position.set(WX, WY, WZ + 0.01); S.add(winPane);
    const frameM = SM(0xe8e2d6, 0.6);
    rbox(1.03, 0.05, 0.06, frameM, WX, WY + 0.62, WZ + 0.03); rbox(1.03, 0.05, 0.06, frameM, WX, WY - 0.62, WZ + 0.03); rbox(0.05, 1.27, 0.06, frameM, WX - 0.5, WY, WZ + 0.03); rbox(0.05, 1.27, 0.06, frameM, WX + 0.5, WY, WZ + 0.03);
    rbox(0.03, 1.2, 0.04, frameM, WX, WY, WZ + 0.03); rbox(1.12, 0.05, 0.14, frameM, WX, WY - 0.65, WZ + 0.07);
    const curtM = SM(0x6d2d3f, 0.9);
    [-1, 1].forEach(s => { for (let i = 0; i < 5; i++) { const c = cyl(0.05, 0.06, 1.75, curtM, WX + s * (0.58 + i * 0.07), 1.5, WZ + 0.12 + (i % 2) * 0.03, 10); } });
    cyl(0.015, 0.015, 1.7, SM(0x2a2a2a, 0.4, { metalness: 0.5 }), WX, 2.4, WZ + 0.12, 8).rotation.z = Math.PI / 2;
    const moonL = new THREE.SpotLight(0x9fb4ff, 1.2, 4, 0.6, 0.6, 1.4); moonL.position.set(WX, WY + 0.2, WZ + 0.2); moonL.target.position.set(0.4, 0.5, -0.4); S.add(moonL); S.add(moonL.target);
    // neon sign above the sofa
    const neonTex = K.canvasTex(1024, 256, (x, w, h) => { x.clearRect(0, 0, w, h); x.font = '700 150px "Fredoka Light"'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.shadowColor = '#ff4fa3'; x.shadowBlur = 30; x.strokeStyle = '#ff7cc0'; x.lineWidth = 10; x.strokeText('create.', w / 2 + 60, h / 2 + 8); x.fillStyle = '#ffe6f3'; x.fillText('create.', w / 2 + 60, h / 2 + 8);
      x.shadowColor = '#4fd8ff'; x.fillStyle = '#4fd8ff'; x.beginPath(); x.moveTo(110, 70); x.lineTo(110, 186); x.lineTo(210, 128); x.closePath(); x.fill(); });
    const neon = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.24), new THREE.MeshBasicMaterial({ map: neonTex, transparent: true, toneMapped: false, depthWrite: false })); neon.position.set(-0.05, 1.98, WZ + 0.02); S.add(neon);
    const neonL = new THREE.PointLight(0xff5fb0, 0.9, 2.2, 1.8); neonL.position.set(-0.05, 1.95, WZ + 0.3); S.add(neonL);
    // fairy lights: two sagging strings across the wall
    const FAIRY = [];
    [[1.62, 0.18, -1.15, 0.85], [1.5, 0.14, -2.3, -0.9]].forEach(([y0, sag, xa, xb], si) => { const n = 26; const pts = [];
      for (let i = 0; i <= n; i++) { const u = i / n, x = lerp(xa, xb, u), y = y0 - Math.sin(u * Math.PI) * sag; pts.push(V(x, y, WZ + 0.03)); }
      S.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.003, 4), SM(0x2a2a20, 0.6)));
      pts.forEach((p, i) => { if (i === 0 || i === n) return; const b = new THREE.Mesh(new THREE.SphereGeometry(0.014, 10, 8), BM(0xffd58a)); b.position.copy(p).add(V(0, -0.015, 0.005)); S.add(b); FAIRY.push({ b, k: i + si * 30 }); }); });
    const fairyL = new THREE.PointLight(0xffcf86, 0.7, 2.6, 1.6); fairyL.position.set(-0.2, 1.55, WZ + 0.35); S.add(fairyL);
    // shelf with books + plant (left)
    const SHX = -1.55;
    rbox(0.7, 0.03, 0.2, SM(0x5a3c26, 0.6), SHX, 1.32, WZ + 0.1, 0.008);
    for (let i = 0; i < 7; i++) rbox(0.05 + (i % 3) * 0.012, 0.18 + (i % 4) * 0.025, 0.15, SM([0xd9413a, 0x3b6ea8, 0xffc53d, 0x2f9e7a, 0xe8dcc8, 0x8a5cc7, 0xff7a3d][i], 0.7), SHX - 0.3 + i * 0.065, 1.43 + (i % 4) * 0.012, WZ + 0.1, 0.006);
    const pot = cyl(0.06, 0.05, 0.11, SM(0xc96a3f, 0.6), SHX + 0.22, 1.39, WZ + 0.1, 16);
    for (let i = 0; i < 6; i++) { const lf = sph(0.05, SM(i % 2 ? 0x3f8f4e : 0x2f7a42, 0.8), SHX + 0.22 + Math.sin(i * 2.1) * 0.05, 1.5 + (i % 3) * 0.03, WZ + 0.1 + Math.cos(i * 2.1) * 0.03); lf.scale.set(0.7, 1.5, 0.6); lf.rotation.z = Math.sin(i * 2.1) * 0.6; }
    // floor lamp (left of the sofa): warm key light
    const FLX = -1.2, FLZ = -1.05, lampM = SM(0x23242b, 0.4, { metalness: 0.5 });
    cyl(0.14, 0.16, 0.03, lampM, FLX, 0.015, FLZ, 24); cyl(0.012, 0.012, 1.45, lampM, FLX, 0.74, FLZ, 8);
    const shadeTex = K.canvasTex(64, 64, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffe4b0'); g.addColorStop(1, '#ffb45c'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.2, 0.26, 28, 1, true), new THREE.MeshBasicMaterial({ map: shadeTex, side: THREE.DoubleSide, toneMapped: false })); shade.position.set(FLX, 1.5, FLZ); S.add(shade);
    const lampL = new THREE.PointLight(0xffb469, 2.6, 4.2, 1.5); lampL.position.set(FLX, 1.42, FLZ + 0.05); lampL.castShadow = true; lampL.shadow.mapSize.set(1024, 1024); lampL.shadow.bias = -0.002; S.add(lampL);
    const poolTex = K.canvasTex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 64, 4, 64, 64, 62); g.addColorStop(0, 'rgba(255,190,110,0.35)'); g.addColorStop(1, 'rgba(255,190,110,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), new THREE.MeshBasicMaterial({ map: poolTex, transparent: true, depthWrite: false, toneMapped: false })); pool.rotation.x = -Math.PI / 2; pool.position.set(FLX + 0.2, 0.006, FLZ + 0.3); S.add(pool);
    const wallGlow = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), new THREE.MeshBasicMaterial({ map: poolTex, transparent: true, depthWrite: false, toneMapped: false })); wallGlow.position.set(FLX, 1.7, WZ + 0.01); S.add(wallGlow);

    // ================= SOFA =================
    const SY = 0.45, SZ = -0.68;                                            // seat top, seat centre z
    const velvet = SM(0x1d5c66, 0.85), velvetD = SM(0x164850, 0.85);
    rbox(2.1, 0.24, 0.86, velvetD, 0, 0.2, SZ - 0.05, 0.06);                 // base
    [-0.5, 0.5].forEach(x => rbox(0.99, 0.14, 0.7, velvet, x, SY - 0.07, SZ + 0.02, 0.06));     // seat cushions
    rbox(2.1, 0.56, 0.24, velvetD, 0, 0.62, SZ - 0.42, 0.09);                // back frame
    [-0.5, 0.5].forEach(x => { const c = rbox(0.96, 0.44, 0.17, velvet, x, 0.72, SZ - 0.27, 0.08); c.rotation.x = -0.12; });   // back cushions
    [-1, 1].forEach(s => rbox(0.2, 0.52, 0.88, velvetD, s * 1.06, 0.36, SZ - 0.04, 0.08));      // arms
    [-1, 1].forEach(s => [-1, 1].forEach(f => cyl(0.025, 0.018, 0.08, SM(0xc9a46a, 0.4, { metalness: 0.4 }), s * 0.98, 0.04, SZ - 0.05 + f * 0.36, 8)));
    const pil = (c, x, rz, ry) => { const p = rbox(0.34, 0.3, 0.1, SM(c, 0.9), x, 0.66, SZ - 0.15, 0.06); p.rotation.set(-0.2, ry, rz); return p; };
    pil(0xe6b34a, -0.82, 0.12, 0.25); pil(0xd96a7e, 0.85, -0.1, -0.25);
    const throwB = rbox(0.5, 0.025, 0.7, SM(0xe9dfcf, 0.95), 0.86, SY + 0.005, SZ + 0.02, 0.01); throwB.rotation.z = -0.04;
    // LED strip behind the sofa (purple back-glow on the wall)
    const ledTex = K.canvasTex(256, 128, (x, w, h) => { const g = x.createRadialGradient(128, 128, 10, 128, 128, 128); g.addColorStop(0, 'rgba(170,90,255,0.75)'); g.addColorStop(1, 'rgba(170,90,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const led = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.0), new THREE.MeshBasicMaterial({ map: ledTex, transparent: true, depthWrite: false, toneMapped: false })); led.position.set(0, 0.95, WZ + 0.012); S.add(led);
    const ledL = new THREE.PointLight(0x9a5cff, 1.2, 2.0, 1.6); ledL.position.set(0, 0.7, WZ + 0.2); S.add(ledL);
    // popcorn bowl on the seat between them
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), SM(0xd9413a, 0.5, { side: THREE.DoubleSide })); bowl.position.set(0.12, SY + 0.09, SZ + 0.08); S.add(bowl);
    for (let i = 0; i < 26; i++) { const a = rng() * Math.PI * 2, r = rng() * 0.075; sph(0.017 + rng() * 0.008, SM(0xfff1c9, 0.9), 0.12 + Math.cos(a) * r, SY + 0.09 + rng() * 0.02, SZ + 0.08 + Math.sin(a) * r); }
    // side table + mug (right)
    const STX = 1.38; cyl(0.2, 0.2, 0.03, SM(0x5a3c26, 0.5), STX, 0.56, SZ, 28); cyl(0.02, 0.02, 0.55, lampM, STX, 0.28, SZ, 8); cyl(0.12, 0.14, 0.02, lampM, STX, 0.01, SZ, 20);
    cyl(0.04, 0.036, 0.09, SM(0xf2ece0, 0.5), STX - 0.05, 0.62, SZ + 0.05, 18);
    const puff = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 2, 32, 32, 30); g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const steam = Array.from({ length: 5 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puff, transparent: true, opacity: 0, depthWrite: false })); S.add(s); return s; });
    // dust motes in the lamp light
    const moteG = new THREE.BufferGeometry(), mp = []; for (let i = 0; i < 160; i++) mp.push(-1.6 + rng() * 3.2, 0.3 + rng() * 1.9, -1.4 + rng() * 1.6);
    moteG.setAttribute('position', new THREE.Float32BufferAttribute(mp, 3));
    const motes = new THREE.Points(moteG, new THREE.PointsMaterial({ map: puff, color: 0xffd9a0, size: 0.018, transparent: true, opacity: 0.5, depthWrite: false })); S.add(motes);

    // ================= CHARACTERS =================
    const MX = -0.32, MZ = -0.8;
    const M = K.makeToyMaddie({ seatY: SY, shirt: 0x3a3f8f, pants: 0x2f3442 }); M.g.position.set(MX, 0, MZ); M.g.rotation.y = 0.12; S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    // laptop on his lap, screen towards him
    const lap = new THREE.Group(); lap.position.set(MX + 0.03, SY + 0.155, MZ + 0.3); lap.rotation.y = 0.12; S.add(lap);
    const alu = SM(0x9aa0aa, 0.35, { metalness: 0.5 });
    rbox(0.42, 0.022, 0.28, alu, 0, 0.011, 0, 0.01, lap);
    const lid = new THREE.Group(); lid.position.set(0, 0.022, 0.135); lid.rotation.x = 0.3; lap.add(lid);
    rbox(0.4, 0.25, 0.016, alu, 0, 0.125, 0, 0.01, lid);
    const stk = new THREE.Mesh(new THREE.CircleGeometry(0.04, 24), SM(0xe0663a, 0.5)); stk.position.set(0.08, 0.15, 0.0095); lid.add(stk);
    const stk2 = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.045), SM(0x2ec4b6, 0.5)); stk2.position.set(-0.09, 0.08, 0.0095); stk2.rotation.z = 0.2; lid.add(stk2);
    const LSW = 960, LSH = 600, lsc = document.createElement('canvas'); lsc.width = LSW; lsc.height = LSH; const lx = lsc.getContext('2d');
    const lTex = new THREE.CanvasTexture(lsc); lTex.colorSpace = THREE.SRGBColorSpace;
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.37, 0.231), new THREE.MeshBasicMaterial({ map: lTex, color: 0x9a9a9a })); scr.rotation.y = Math.PI; scr.position.set(0, 0.125, -0.0085); lid.add(scr);
    const scrL = new THREE.PointLight(0x9fc4ff, 0.05, 0.6, 2); scrL.position.set(MX, SY + 0.5, MZ + 0.3); S.add(scrL);
    const R = (() => {   // the headphones hover-bot, floating over the sofa next to Maddie; no hands
      const g = new THREE.Group(); g.position.set(0.48, 0.86, -0.62); g.rotation.y = -0.22; S.add(g);
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
          else if (mood === 'stern') { fx.beginPath(); fx.ellipse(cx, 54, 15, 15, 0, 0, 7); fx.fill(); fx.lineWidth = 10; fx.beginPath(); fx.moveTo(cx - 22, i ? 26 : 34); fx.lineTo(cx + 22, i ? 34 : 26); fx.stroke(); fx.lineWidth = 14; }
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
      const noteTex = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#ffd34a'; x.font = '900 52px "DejaVu Sans"'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♪', 32, 34); });
      const notes = [0, 1].map(() => { const n = new THREE.Sprite(new THREE.SpriteMaterial({ map: noteTex, transparent: true, depthWrite: false })); n.scale.setScalar(0.08); lift.add(n); return n; });
      const r = { g, head, lift };
      r.update = (t, { talk = 0, look = [0, 0], mood = 'calm' } = {}) => {
        const bob = Math.sin(t * 2.4) * 0.018; lift.position.y = 0.25 + bob;
        head.rotation.set(look[1] + Math.sin(t * 2.4 + 1) * 0.03, look[0] + Math.sin(t * 0.8) * 0.05, Math.sin(t * 1.7) * 0.04);
        const blink = ((t + 1.3) % 3.4) < 0.11;
        drawFace(mood === 'smile' ? 'happy' : mood, talk * 1.3, blink && !['smile', 'wink', 'flat'].includes(mood));
        thr.material.opacity = 0.7 + 0.3 * Math.sin(t * 20); thr.scale.setScalar(1 + 0.1 * Math.sin(t * 13));
        glowL.intensity = 0.2 + talk * 0.6;
        notes.forEach((n, i) => { const p = ((t * 0.45 + i * 0.5) % 1); n.position.set(-0.05 + i * 0.1, 0.3 + p * 0.25, 0); n.material.opacity = Math.sin(p * Math.PI) * 0.85; });
      };
      return r;
    })();

    // ================= LIGHT =================
    const hemi = new THREE.HemisphereLight(0x6d7bd6, 0x1a0f14, 0.32); S.add(hemi);
    const fill = new THREE.DirectionalLight(0xffe0c4, 0.55); fill.position.set(0.6, 2.2, 2.6); fill.target.position.set(0, 0.9, -0.7); fill.castShadow = true; fill.shadow.mapSize.set(2048, 2048); fill.shadow.bias = -0.0006;
    fill.shadow.camera.left = -2.5; fill.shadow.camera.right = 2.5; fill.shadow.camera.top = 2.5; fill.shadow.camera.bottom = -2.5; S.add(fill); S.add(fill.target);
    const tv = new THREE.DirectionalLight(0x6fa8ff, 0.55); tv.position.set(-0.4, 1.0, 3); tv.target.position.set(0, 0.9, -0.7); S.add(tv); S.add(tv.target);   // off-screen TV glow, flickers
    const rimW = new THREE.DirectionalLight(0xffb070, 0.9); rimW.position.set(-2.2, 1.8, -1.6); S.add(rimW);
    const rimC = new THREE.DirectionalLight(0x8a7bff, 0.8); rimC.position.set(2.2, 1.6, -1.8); S.add(rimC);

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const lapLook = [-0.05, 0.36], toR = [0.6, 0.05], toCam = [-0.1, 0.02];
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      let mL = toR, face = 'neutral', lean = 0.1, type = 0;
      if (t < C.NOB) { mL = t < B('posts') ? lapLook : toR; face = 'shock'; lean = t < B('posts') ? 0.35 : 0.05; }
      else if (t < C.Q) { mL = toR; face = 'neutral'; }
      else if (t < C.STARS) { mL = toR; face = 'shock'; lean = -0.05; }
      else if (t < C.NAME) { mL = t < C.FREE ? toR : lapLook; face = 'smile'; lean = 0.25; type = t >= C.FREE ? 0.6 : 0; }
      else if (t < C.S1) { mL = toR; face = t < C.SEC ? 'neutral' : 'worried'; }
      else if (t < C.CAP) { mL = lapLook; face = 'neutral'; lean = 0.3; type = t >= C.S1 && t < E('s1') + 0.5 ? 1 : 0; }
      else if (t < C.S3) { mL = toCam; face = 'worried'; lean = 0.05; }
      else if (t < C.CHEAT) { mL = t < C.S5 ? lapLook : toR; face = t < C.S5 ? 'neutral' : 'shock'; lean = 0.25; }
      else if (t < C.UP) { mL = toCam; face = 'smile'; lean = -0.1; }
      else if (t < C.SIGH) { mL = t < C.BOTS ? lapLook : toR; face = t < C.BOTS ? 'neutral' : 'shock'; lean = 0.2; }
      else if (t < C.CTA) { mL = t < C.CLICK ? toCam : lapLook; face = t < C.CLICK ? 'worried' : 'smile'; lean = t < C.CLICK ? 0.15 : 0.3; }
      else { mL = toCam; face = 'smile'; lean = -0.05; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type, lean });
      const [aL, aR] = M.arms;
      const wave = t >= C.HOOK && t < C.NOB ? eo(pr(t, 0.15, 0.5)) * (1 - pr(t, B('nobodyw'), B('nobodyw') + 0.4)) : t >= C.CHEAT && t < C.UP ? eo(pr(t, C.CHEAT, C.CHEAT + 0.3)) : t >= C.CTA ? eo(pr(t, C.CTA, C.CTA + 0.4)) * 0.6 : 0;
      if (wave > 0) { const w2 = wave * (1 + (t >= C.CHEAT && t < C.UP ? 0.15 * Math.sin(t * 14) : 0)); aL.sh.rotation.set(-0.3 - w2 * 1.0, 0.2, -0.05 - w2 * 0.35); aL.el.rotation.x = -0.1 - w2 * 1.1; aR.sh.rotation.set(-0.3 - w2 * 1.0, -0.2, 0.05 + w2 * 0.35); aR.el.rotation.x = -0.1 - w2 * 1.1; }
            // bot
      let rL = [-0.35, 0.05];                                         // toward Maddie
      if ((t >= C.STARS && t < C.NAME) || (t >= C.S1 && t < C.CAP) || (t >= C.S3 && t < C.CHEAT) || (t >= C.UP && t < C.SIGH) || t >= C.CTA) rL = [0.35, 0.0];   // to us
      if (t >= C.SEC && t < C.S1) rL = [0.45, 0.05];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      const mood = t >= C.SEC && t < C.S1 ? 'wink' : (t >= C.CAP && t < C.S3) || (t >= C.CHEAT && t < C.UP) || (t >= C.CLICK && t < C.CTA) ? 'smile' : (t >= C.BOTS && t < C.SIGH) ? 'stern' : t >= C.CTA ? 'smile' : 'calm';
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.z += 0.16 * K.pulse(t, B('nobody') - 0.05, 0.8) + 0.12 * K.pulse(t, B('secret') - 0.05, 0.9) - 0.1 * K.pulse(t, B('sched'), 0.6);
      R.head.rotation.y += 0.22 * Math.sin((t - B('ban')) * 16) * K.pulse(t, B('ban') - 0.05, 0.7);       // head shake on "banned"
      R.head.rotation.x += 0.12 * K.pulse(t, B('watch') - 0.05, 0.5) + 0.12 * K.pulse(t, B('job') - 0.05, 0.5);   // nods
      R.g.position.y = 0.86 + 0.05 * eb(K.pulse(t, C.CHEAT, 0.8)) + 0.04 * K.pulse(t, B('cta'), 0.6);
      R.lift.rotation.z = 0.25 * Math.sin((t - C.CHEAT) * 10) * K.pulse(t, C.CHEAT, 1.0);                  // happy wobble
      steam.forEach((s, i) => { const ph = ((t * 0.45 + i / steam.length) % 1); s.position.set(STX - 0.05 + Math.sin(i * 2 + t * 1.3) * 0.015, 0.7 + ph * 0.2, SZ + 0.05); s.scale.setScalar(0.03 + ph * 0.07); s.material.opacity = 0.3 * Math.sin(ph * Math.PI); });
      FAIRY.forEach(f => { const v = 0.65 + 0.35 * Math.sin(t * 2.2 + f.k * 1.3); f.b.material.color.setRGB(1 * v + 0.2, 0.83 * v + 0.12, 0.54 * v); });
      fairyL.intensity = 0.6 + 0.12 * Math.sin(t * 2.2);
      tv.intensity = 0.5 + 0.12 * Math.sin(t * 7.3) * Math.sin(t * 3.1) + 0.06 * Math.sin(t * 17);
      neon.material.opacity = 0.92 + 0.08 * Math.sin(t * 31) * (Math.sin(t * 0.9) > 0.97 ? 1 : 0);
      motes.rotation.y = t * 0.02; motes.position.y = Math.sin(t * 0.3) * 0.05;
    };

    // ================= LAPTOP SCREEN =================
    const typed = (t, s, a, b) => s.slice(0, Math.floor(s.length * cl((t - a) / (b - a))));
    const TOPIC = '5 facts about black holes';
    const lr = (X, Y, W, H, r, f) => { lx.fillStyle = f; lx.beginPath(); lx.roundRect(X, Y, W, H, r); lx.fill(); };
    const ltxt = (s, X, Y, size, col, w = 500, al = 'left') => { lx.font = `${w} ${size}px "Inter", sans-serif`; lx.fillStyle = col; lx.textAlign = al; lx.textBaseline = 'middle'; lx.fillText(s, X, Y); };
    const drawLaptop = t => {
      lx.fillStyle = '#121218'; lx.fillRect(0, 0, LSW, LSH);
      if (t < C.S1) { lx.fillStyle = '#0f0f0f'; lx.fillRect(0, 0, LSW, LSH); lr(30, 30, 160, 40, 10, '#ff2d3a'); ltxt('▶ videos', 110, 50, 24, '#fff', 800, 'center');
        for (let i = 0; i < 8; i++) lr(30 + (i % 4) * 230, 100 + Math.floor(i / 4) * 240, 210, 220, 12, `hsl(${230 + i * 18},45%,${20 + (i % 3) * 6}%)`); }
      else { lx.fillStyle = '#16161c'; lx.fillRect(0, 0, LSW, LSH); ltxt('localhost:8501', 40, 40, 24, '#777', 600);
        lr(40, 90, 880, 70, 14, '#23232c'); ltxt(typed(t, TOPIC, B('s1') + 0.5, E('s1')) || 'Video topic…', 66, 125, 30, '#fff', 600);
        const st = ['script', 'clips', 'voice', 'subtitles', 'music', 'render'], n = t < C.S2 ? 0 : t < C.S3 ? 1 : t < C.S4 ? 2 : t < C.SUBS ? 3 : t < C.S5 ? 5 : 6;
        st.forEach((s, i) => { lr(40, 200 + i * 62, 880, 50, 10, i < n ? 'rgba(61,220,151,0.18)' : '#1e1e26'); ltxt((i < n ? '✓ ' : '· ') + s, 66, 225 + i * 62, 26, i < n ? '#6fe3b5' : '#777', 700); }); }
      lTex.needsUpdate = true;
    };

    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [MX + 0.04, 1.47, MZ], RHL = [0.48, 1.3, -0.62];
    const sh = {
      hook: [P([-0.15, 1.42, 1.5], MHL, 30), P([-0.17, 1.41, 1.28], MHL, 30)],
      mad: [P([0.02, 1.42, 1.55], MHL, 32), P([0.0, 1.42, 1.36], MHL, 32)],
      madL: [P([-0.8, 1.42, 1.42], MHL, 32), P([-0.74, 1.42, 1.26], MHL, 32)],
      robo: [P([0.22, 1.28, 1.6], RHL, 30), P([0.24, 1.28, 1.42], RHL, 30)],
      roboLow: [P([0.95, 0.98, 1.45], [0.46, 1.32, -0.62], 34), P([0.9, 1.0, 1.3], [0.46, 1.32, -0.62], 34)],
      pair: [P([0.22, 1.45, 2.55], [0.08, 1.3, -0.7], 36), P([0.16, 1.44, 2.3], [0.08, 1.3, -0.7], 36)],
      room: [P([0.4, 1.62, 4.1], [0.05, 1.38, -1.0], 40), P([0.2, 1.55, 3.5], [0.05, 1.35, -0.9], 40)],
      roomR: [P([-1.25, 1.5, 3.0], [0.15, 1.3, -0.9], 38), P([-1.05, 1.48, 2.7], [0.15, 1.3, -0.9], 38)],
      lapC: [P([-0.08, 1.35, 0.85], [MX + 0.03, 0.95, MZ + 0.3], 34), P([-0.09, 1.3, 0.7], [MX + 0.03, 0.95, MZ + 0.3], 34)],
      cta: [P([0.1, 1.5, 2.75], [0.1, 1.32, -0.7], 38), P([0.1, 1.49, 2.5], [0.1, 1.32, -0.7], 38)],
    };
    const plan = [
      [C.HOOK, C.NOB, sh.hook], [C.NOB, C.Q, sh.robo], [C.Q, C.STARS, sh.mad], [C.STARS, C.NAME, sh.room],
      [C.NAME, C.SEC, sh.madL], [C.SEC, C.S1, sh.roboLow], [C.S1, C.S2, sh.lapC], [C.S2, C.CAP, sh.pair], [C.CAP, C.S3, sh.mad],
      [C.S3, C.S4, sh.roomR], [C.S4, C.S5, sh.robo], [C.S5, C.CHEAT, sh.pair], [C.CHEAT, C.UP, sh.hook],
      [C.UP, C.BOTS, sh.room], [C.BOTS, C.SIGH, sh.roboLow], [C.SIGH, C.CLICK, sh.madL], [C.CLICK, C.CTA, sh.pair], [C.CTA, D + 5, sh.cta],
    ];
    const smooth = k => k * k * (3 - 2 * k);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth,
      shake: (a === C.HOOK || a === C.CHEAT) ? (t => 0.006 * Math.exp(-(t - a - 0.1) * 5) * (t > a + 0.1 ? 1 : 0)) : null }));
    const curFov = t => { const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; return p[2][0].fov; };

    // ================= HUD =================
    S.add(K.cam);
    const HW = 1080, HH = 1920, hc = document.createElement('canvas'); hc.width = HW; hc.height = HH; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, depthTest: false, depthWrite: false, toneMapped: false, fog: false }));
    hud.renderOrder = 1000; K.cam.add(hud);
    const ACC = '#ffc53d', RED = '#ff4d5a', GRN = '#3ddc97', YT = '#ff2d3a', PINK = '#ff6fb5', INK = 'rgba(14,12,24,0.95)', TXT = '#fbf7f0', DIM = 'rgba(251,247,240,0.62)';
    const FR = '"Fredoka Light", "Inter Display"', MONO = '"DejaVu Sans Mono"';
    const F = (s, w = 400, fam = '"Inter", "DejaVu Sans"') => `${w} ${s}px ${fam}`;
    const txt = (s, x, y, size, col, w = 400, align = 'left', a = 1, fam) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam); h.fillStyle = col; h.textAlign = align; h.textBaseline = 'middle'; h.fillText(s, x, y); h.restore(); };
    const otxt = (s, x, y, size, col, a = 1, align = 'center', lw = 10) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, 700, FR); h.textAlign = align; h.textBaseline = 'middle'; h.lineJoin = 'round';
      h.strokeStyle = 'rgba(10,8,20,0.95)'; h.lineWidth = lw; h.strokeText(s, x, y); h.fillStyle = col; h.fillText(s, x, y); h.restore(); };
    const fin = (t, t0, d = 0.4) => eo(pr(t, t0, t0 + d));
    const pop = (t, t0, d = 0.4) => eb(pr(t, t0, t0 + d));
    const card = (x, y, w, hh, r = 30, fill = INK, stroke = 'rgba(255,255,255,0.14)') => { h.fillStyle = fill; h.beginPath(); h.roundRect(x, y, w, hh, r); h.fill(); if (stroke) { h.strokeStyle = stroke; h.lineWidth = 3; h.stroke(); } };
    const glowCard = (x, y, w, hh, r, col) => { h.save(); h.shadowColor = col; h.shadowBlur = 44; card(x, y, w, hh, r, INK, col); h.restore(); card(x, y, w, hh, r, INK, col); };
    const chip = (s, x, y, size, bg, fg, a = 1, sc = 1, w = 800, fam) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam); const tw = h.measureText(s).width + size * 1.3, th = size * 1.8;
      h.translate(x, y); h.scale(sc, sc); h.fillStyle = bg; h.beginPath(); h.roundRect(-tw / 2, -th / 2, tw, th, th / 2); h.fill(); h.fillStyle = fg; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 3); h.restore(); };
    const scaleAt = (x, y, s, fn) => { if (s <= 0) return; h.save(); h.translate(x, y); h.scale(s, s); h.translate(-x, -y); fn(); h.restore(); };
    const fmt = n => Math.round(n).toLocaleString('en-US');
    const stamp = (s, x, y, col, k, rot = -0.12, size = 60) => { if (k <= 0) return; h.save(); h.translate(x, y); h.rotate(rot); h.scale(lerp(2, 1, k), lerp(2, 1, k)); h.globalAlpha *= cl(k * 2); h.font = F(size, 700, FR);
      const tw = h.measureText(s).width + 50; h.strokeStyle = col; h.lineWidth = 8; h.beginPath(); h.roundRect(-tw / 2, -size * 0.75, tw, size * 1.5, 18); h.stroke(); h.fillStyle = col; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 4); h.restore(); };
    // pixel-blurred name: random glyphs drawn tiny then scaled up with no smoothing, so nothing can be read
    const blurC = document.createElement('canvas'); blurC.width = 22; blurC.height = 4; { const x = blurC.getContext('2d'); const r = K.rng(77); x.fillStyle = '#fff'; x.font = '700 4px "DejaVu Sans"'; x.textBaseline = 'middle';
      let s = ''; for (let i = 0; i < 18; i++) s += 'abcdefghkmnoprstuwxyz'[Math.floor(r() * 21)]; x.fillText(s.slice(0, 7) + ' / ' + s.slice(7), 0, 2); }
    const blurName = (x, y, w, hh, a = 1, col = '#fff', t = 0) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.imageSmoothingEnabled = false;
      h.filter = 'blur(9px)'; h.drawImage(blurC, x, y, w, hh); h.drawImage(blurC, x, y, w, hh); h.filter = 'none'; h.imageSmoothingEnabled = true; h.globalCompositeOperation = 'source-atop'; h.restore();
      h.save(); h.globalAlpha *= a * 0.55; h.fillStyle = 'rgba(160,140,255,0.35)'; h.fillRect(x, y, w, hh); const sx = x + ((t * 260) % (w + 120)) - 60; const g = h.createLinearGradient(sx - 60, 0, sx + 60, 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)'); h.fillStyle = g; h.fillRect(x, y, w, hh); h.restore();
      h.save(); h.globalAlpha *= a; h.fillStyle = col; h.font = F(hh * 0.7, 400); h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText('🔒', x + w + hh * 0.6, y + hh / 2 + 2); h.restore(); };
    // space thumbnails (the black-hole Short): procedural
    const spaceThumb = (i, W = 180, H = 320) => { const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'), r = K.rng(50 + i);
      const hue = [265, 220, 300, 200, 20, 250, 330, 180][i % 8]; const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, `hsl(${hue},60%,10%)`); g.addColorStop(1, `hsl(${(hue + 40) % 360},55%,4%)`); x.fillStyle = g; x.fillRect(0, 0, W, H);
      for (let k = 0; k < 70; k++) { x.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.7})`; x.fillRect(r() * W, r() * H, 1.5, 1.5); }
      const cx = W / 2, cy = H * 0.45, v = i % 4;
      if (v === 0) { const rg = x.createRadialGradient(cx, cy, 10, cx, cy, W * 0.42); rg.addColorStop(0, 'rgba(255,170,60,0)'); rg.addColorStop(0.35, 'rgba(255,170,60,0.95)'); rg.addColorStop(0.6, 'rgba(255,90,40,0.5)'); rg.addColorStop(1, 'rgba(255,90,40,0)');
        x.save(); x.translate(cx, cy); x.scale(1, 0.38); x.translate(-cx, -cy); x.fillStyle = rg; x.beginPath(); x.arc(cx, cy, W * 0.42, 0, 7); x.fill(); x.restore(); x.fillStyle = '#000'; x.beginPath(); x.arc(cx, cy, W * 0.13, 0, 7); x.fill();
        x.strokeStyle = 'rgba(255,200,120,0.9)'; x.lineWidth = 3; x.beginPath(); x.arc(cx, cy, W * 0.14, 0, 7); x.stroke(); }
      else if (v === 1) { for (let k = 0; k < 400; k++) { const a = k * 0.13, rr = k * 0.17; x.fillStyle = `hsla(${hue + 40},90%,${60 + r() * 30}%,${0.6})`; x.fillRect(cx + Math.cos(a) * rr * (W / 140), cy + Math.sin(a) * rr * (W / 140) * 0.6, 2, 2); } }
      else if (v === 2) { const pg = x.createRadialGradient(cx - 20, cy - 20, 6, cx, cy, W * 0.3); pg.addColorStop(0, `hsl(${hue + 20},70%,70%)`); pg.addColorStop(1, `hsl(${hue},60%,20%)`); x.fillStyle = pg; x.beginPath(); x.arc(cx, cy, W * 0.28, 0, 7); x.fill();
        x.strokeStyle = 'rgba(255,230,190,0.7)'; x.lineWidth = 4; x.beginPath(); x.ellipse(cx, cy, W * 0.42, W * 0.1, -0.3, 0, 7); x.stroke(); }
      else { const ng = x.createRadialGradient(cx, cy, 4, cx, cy, W * 0.5); ng.addColorStop(0, `hsla(${hue + 60},90%,70%,0.9)`); ng.addColorStop(0.5, `hsla(${hue},80%,45%,0.4)`); ng.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = ng; x.fillRect(0, 0, W, H); }
      return c; };
    const thumbs = Array.from({ length: 12 }, (_, i) => spaceThumb(i));
    const label = (t, s1, s2, t0) => { const a = fin(t, t0, 0.25); if (a <= 0) return; h.save(); h.globalAlpha = a; h.font = F(40, 800, FR); const w1 = h.measureText(s1).width; h.font = F(40, 700, FR); const w2 = s2 ? h.measureText(s2).width : 0;
      const W = w1 + w2 + (s2 ? 70 : 50), x0 = 540 - W / 2, y = 205 + (1 - a) * -20; h.shadowColor = 'rgba(255,111,181,0.7)'; h.shadowBlur = 24; card(x0, y - 38, W, 76, 38, 'rgba(14,10,26,0.92)', 'rgba(255,111,181,0.8)'); h.shadowBlur = 0;
      txt(s1, x0 + 25, y + 2, 40, ACC, 800, 'left', 1, FR); if (s2) { txt('·', x0 + 25 + w1 + 10, y + 2, 40, DIM, 800, 'left', 1, FR); txt(s2, x0 + 45 + w1 + 4, y + 2, 40, TXT, 700, 'left', 1, FR); } h.restore(); };
    const STEPS = [['S1', 'S2', 'STEP 1', 'TOPIC'], ['S2', 'S3', 'STEP 2', 'SCRIPT'], ['S3', 'S4', 'STEP 3', 'FOOTAGE'], ['S4', 'S5', 'STEP 4', 'VOICE · SUBS · MUSIC'], ['S5', 'CHEAT', 'STEP 5', 'BATCH'], ['UP', 'CTA', 'LAST STEP', 'IT POSTS']];

    // --- hook: the channel nobody runs
    const drawHook = t => { if (t >= C.STARS) return;
      const out = 1 - pr(t, C.REPO - 0.2, C.REPO); if (out <= 0) return;
      const a = pop(t, 0.2, 0.45); h.save(); h.globalAlpha = out; scaleAt(540, 470, a, () => {
        card(110, 260, 860, 450, 36, INK, 'rgba(255,45,58,0.6)');
        h.fillStyle = '#1b1b24'; h.beginPath(); h.arc(190, 335, 46, 0, 7); h.fill(); txt('?', 190, 337, 54, DIM, 800, 'center', 1, FR);
        txt('@space.in.60', 260, 318, 40, TXT, 700, 'left', 1, FR); txt(`${fmt(lerp(1, 412, eo(pr(t, 0.4, 1.6))))} videos · uploads daily`, 260, 362, 28, DIM, 600);
        for (let i = 0; i < 6; i++) { const s = pop(t, 0.5 + i * 0.1, 0.3); scaleAt(160 + i * 130 + 55, 540, s, () => { h.drawImage(thumbs[i], 160 + i * 130, 445, 110, 196); txt(['2h', '1d', '2d', '3d', '4d', '5d'][i] + ' ago', 160 + i * 130 + 55, 665, 22, DIM, 600, 'center'); }); }
      }); h.restore();
      const tm = pop(t, B('nobodyw') + 0.15, 0.4); scaleAt(540, 790, tm, () => { card(300, 745, 480, 92, 46, 'rgba(255,77,90,0.18)', RED); txt('👤', 365, 793, 44, '#000', 400, 'center'); txt('team:', 420, 793, 38, DIM, 700, 'left', 1, FR); txt('0', 560, 793, 56, RED, 700, 'left', 1, FR); txt('people', 610, 795, 34, DIM, 700, 'left', 1, FR); });
    };
    // --- "It's a repo": blurred GitHub card
    const ghCard = (t, cx, cy, s, starsK) => scaleAt(cx, cy, s, () => {
      glowCard(cx - 430, cy - 170, 860, 340, 36, 'rgba(160,140,255,0.8)');
      h.fillStyle = '#fff'; h.beginPath(); h.arc(cx - 360, cy - 95, 34, 0, 7); h.fill(); h.fillStyle = '#111'; h.beginPath(); h.arc(cx - 360, cy - 95, 26, 0, 7); h.fill(); txt('🐙', cx - 360, cy - 93, 34, '#fff', 400, 'center');
      txt('GitHub', cx - 305, cy - 95, 34, DIM, 700, 'left', 1, FR); blurName(cx - 380, cy - 40, 600, 64, 1, '#fff', t);
      chip(`⭐ ${starsK}`, cx - 290, cy + 85, 34, 'rgba(255,197,61,0.16)', ACC, 1, 1, 800, FR);
      chip('FREE', cx + 20, cy + 85, 30, 'rgba(61,220,151,0.16)', GRN, fin(t, B('free'), 0.25), pop(t, B('free'), 0.3), 900, FR);
      chip('OPEN SOURCE', cx + 255, cy + 85, 30, 'rgba(90,170,255,0.18)', '#7fc0ff', fin(t, B('free') + 0.3, 0.25), pop(t, B('free') + 0.3, 0.3), 900, FR); });
    const drawRepo = t => { if (t < C.REPO || t >= C.S1) return;
      const s = pop(t, C.REPO + 0.05, 0.45); const k = pr(t, B('stars') - 0.05, E('stars') + 0.1); const stars = k <= 0 ? '?' : fmt(lerp(0, 69000, eo(k)));
      const big = t >= C.SEC ? eo(pr(t, C.SEC, C.SEC + 0.4)) : 0; const out = 1 - pr(t, C.S1 - 0.25, C.S1);
      h.save(); h.globalAlpha = out; ghCard(t, 540, 470 + big * 30, s * (1 + big * 0.08), stars); h.restore();
      if (k > 0 && k < 1.2) for (let i = 0; i < 14; i++) { const p = cl(k * 1.4 - i * 0.05); if (p <= 0 || p >= 1) continue; const a = i * 2.4; txt('⭐', 250 + Math.cos(a) * 280 * p, 555 - Math.abs(Math.sin(a)) * 330 * p, 34, '#000', 400, 'center', 1 - p); }
      if (t >= C.SEC) { stamp('SECRET 🤫', 540, 760, PINK, pop(t, B('secret') + 0.1, 0.35), -0.08, 58); }
    };
    // --- step 1: the topic box
    const drawTopic = t => { if (t < C.S1 || t >= C.S2) return;
      const a = pop(t, C.S1 + 0.3, 0.4); scaleAt(540, 430, a, () => {
        glowCard(80, 320, 920, 230, 36, 'rgba(255,197,61,0.8)'); txt('VIDEO TOPIC', 125, 370, 28, DIM, 800, 'left', 1, FR);
        const s = typed(t, TOPIC, B('s1') + 0.5, E('s1') - 0.05), cur = Math.floor(t * 3) % 2 ? '|' : ''; txt((s || '') + cur, 125, 440, 46, TXT, 700, 'left', 1, FR);
        const pk = K.pulse(t, B('job') + 0.05, 0.3); chip('Generate ▶', 830, 500, 30, pk > 0 ? '#ffe08a' : ACC, '#1a1206', fin(t, E('s1') - 0.1, 0.2), 1 - pk * 0.12, 900, FR); });
      const one = fin(t, B('job'), 0.3); if (one > 0) stamp('= 1 JOB', 540, 650, GRN, pop(t, B('job') + 0.25, 0.35), -0.07, 54);
    };
    // --- step 2: script writes itself in 2 seconds
    const SCRIPT = ['1. Nothing escapes — not even light.', '2. Time slows down near the edge.', '3. The closest one: 1,560 light-years.', '4. Some are billions of suns heavy.', '5. They can spin near light speed.'];
    const drawScript = t => { if (t < C.S2 || t >= C.CAP) return;
      const a = fin(t, C.S2 + 0.2, 0.3); h.save(); h.globalAlpha = a * (1 - pr(t, C.CAP - 0.25, C.CAP)); h.translate(0, (1 - a) * 40);
      card(80, 290, 920, 520, 34, INK, 'rgba(255,255,255,0.2)'); txt('script.txt', 120, 340, 28, DIM, 700, 'left', 1, MONO);
      const k = pr(t, B('s2') + 0.7, B('twosec') + 0.6); const total = SCRIPT.join('').length; let left = Math.floor(total * k);
      SCRIPT.forEach((s, i) => { if (left <= 0) return; const v = s.slice(0, left); left -= s.length; txt(v, 120, 410 + i * 76, 32, i === 0 ? TXT : 'rgba(251,247,240,0.86)', 600); });
      const tm = Math.min(2, k * 2); chip(`⏱ ${tm.toFixed(1)}s`, 880, 340, 30, k >= 1 ? GRN : 'rgba(255,197,61,0.2)', k >= 1 ? '#062818' : ACC, 1, 1 + 0.15 * K.pulse(t, B('twosec'), 0.35), 900, FR);
      h.restore(); };
    const drawCap = t => { if (t < C.CAP || t >= C.S3) return;
      const a = pop(t, C.CAP + 0.1, 0.4), b = pop(t, C.CAP + 0.45, 0.4);
      scaleAt(300, 430, a, () => { card(110, 300, 380, 260, 30, 'rgba(255,77,90,0.16)', RED); txt('YOU', 300, 350, 32, DIM, 800, 'center', 1, FR); otxt('2 DAYS', 300, 435, 76, RED, 1, 'center', 10); txt('per caption 😩', 300, 510, 28, TXT, 600, 'center'); });
      scaleAt(780, 430, b, () => { card(590, 300, 380, 260, 30, 'rgba(61,220,151,0.16)', GRN); txt('IT', 780, 350, 32, DIM, 800, 'center', 1, FR); otxt('2 SEC', 780, 435, 76, GRN, 1, 'center', 10); txt('whole script ⚡', 780, 510, 28, TXT, 600, 'center'); });
      txt('vs', 540, 430, 44, ACC, 800, 'center', b, FR); };
    // --- step 3: a stock clip for every line
    const drawClips = t => { if (t < C.S3 || t >= C.S4) return;
      card(70, 280, 940, 640, 34, 'rgba(14,12,24,0.93)'); txt('🎞  free stock clips', 115, 335, 30, DIM, 700);
      SCRIPT.forEach((s, i) => { const t0 = B('s3') + 0.35 + i * (E('every') - B('s3') - 0.2) / 5; const a = fin(t, t0, 0.3); if (a <= 0) return; const y = 380 + i * 104;
        h.save(); h.globalAlpha = a; txt(s.length > 30 ? s.slice(0, 29) + '…' : s, 115, y + 45, 28, TXT, 600);
        const sx = 760 + (1 - a) * 300; h.drawImage(thumbs[i + 2], 0, 70, 180, 180, sx, y + 3, 84, 84); h.strokeStyle = GRN; h.lineWidth = 3; h.strokeRect(sx, y + 3, 84, 84);
        txt('✓', 900, y + 45, 40, GRN, 900, 'center', fin(t, t0 + 0.2, 0.2)); h.restore(); }); };
    // --- step 4: voice + subtitles + music
    const drawVoice = t => { if (t < C.S4 || t >= C.S5) return;
      const a = pop(t, C.S4 + 0.25, 0.4); scaleAt(540, 420, a, () => {
        card(110, 300, 860, 240, 34, INK, 'rgba(90,170,255,0.6)'); txt('🎙  voice', 150, 350, 32, TXT, 700); chip('FREE', 870, 350, 28, 'rgba(61,220,151,0.18)', GRN, fin(t, B('s4') + 0.9, 0.2), pop(t, B('s4') + 0.9, 0.3), 900, FR);
        for (let i = 0; i < 46; i++) { const v = Math.abs(Math.sin(i * 0.7 + t * 9) * Math.sin(i * 0.23 + t * 3)); const hh = 10 + v * 90; h.fillStyle = i / 46 < pr(t, C.S4 + 0.3, C.SUBS) ? '#7fc0ff' : 'rgba(255,255,255,0.2)'; h.beginPath(); h.roundRect(150 + i * 17.5, 455 - hh / 2, 9, hh, 4.5); h.fill(); } });
      if (t >= C.SUBS) { const items = [['SUBTITLES', '💬'], ['MUSIC', '🎵'], ['DONE', '✅']];
        items.forEach(([s, e], i) => { const t0 = B('subs') + i * (E('subs') - B('subs')) / 3; const k = pop(t, t0, 0.3); scaleAt(220 + i * 320, 680, k, () => { card(90 + i * 320, 610, 260, 140, 28, i === 2 ? 'rgba(61,220,151,0.2)' : INK, i === 2 ? GRN : 'rgba(255,255,255,0.25)'); txt(e, 220 + i * 320, 655, 44, '#000', 400, 'center'); txt(s, 220 + i * 320, 715, 30, i === 2 ? GRN : TXT, 700, 'center', 1, FR); }); }); }
    };
    // --- step 5: five versions, keep the best
    const drawBatch = t => { if (t < C.S5 || t >= C.CHEAT) return;
      for (let i = 0; i < 5; i++) { const t0 = B('s5') + 0.7 + i * 0.1, k = pop(t, t0, 0.4); if (k <= 0) continue; const best = i === 2 && t >= B('best') + 0.6;
        const ang = (i - 2) * 0.15, x = 540 + (i - 2) * 172 * k, y = 500 + Math.abs(i - 2) * 30 * k - (best ? 30 * eo(pr(t, B('best') + 0.6, B('best') + 0.9)) : 0);
        h.save(); h.translate(x, y); h.rotate(ang * k * (best ? 0 : 1)); const sc = k * (best ? 1.12 : 1) * (t >= B('best') + 0.6 && !best ? 0.92 : 1); h.scale(sc, sc);
        h.globalAlpha = t >= B('best') + 0.6 && !best ? 0.45 : 1; h.drawImage(thumbs[i], -90, -160, 180, 320); h.strokeStyle = best ? ACC : 'rgba(255,255,255,0.4)'; h.lineWidth = best ? 7 : 3; h.strokeRect(-90, -160, 180, 320);
        txt(`v${i + 1}`, 0, 130, 30, TXT, 800, 'center', 1, FR); h.restore();
        if (best) { chip('👑 BEST', x, y - 205, 32, ACC, '#1a1206', 1, pop(t, B('best') + 0.6, 0.35), 900, FR); } }
      chip('BATCH × 5', 540, 745, 34, 'rgba(255,111,181,0.2)', PINK, fin(t, B('s5') + 0.6, 0.25), 1, 900, FR); };
    // --- cheat code burst
    const drawCheat = t => { if (t < C.CHEAT || t >= C.UP) return;
      const k = pr(t, C.CHEAT, C.CHEAT + 0.35), out = 1 - pr(t, C.UP - 0.3, C.UP); h.save(); h.globalAlpha = 0.8 * out; h.translate(540, 1000); h.rotate(t * 0.35);
      for (let i = 0; i < 24; i++) { h.rotate(Math.PI / 12); h.fillStyle = i % 2 ? `rgba(255,197,61,${0.32 * k})` : `rgba(255,111,181,${0.28 * k})`; h.beginPath(); h.moveTo(470, -14); h.lineTo(1400, -90); h.lineTo(1400, 90); h.lineTo(470, 14); h.fill(); } h.restore();
      const s = pop(t, B('cheat') + 0.3, 0.35); scaleAt(540, 380, s, () => { otxt('CHEAT', 540, 330, 170, ACC, out, 'center', 16); otxt('CODE 🎮', 540, 470, 100, TXT, out, 'center', 12); }); };
    // --- last step: it can even post it (YouTube · Instagram · TikTok) + junk gets demonetized
    const PLAT = [['YouTube', YT, '▶'], ['Instagram', PINK, '◎'], ['TikTok', '#25f4ee', '♪']];
    const drawUpload = t => { if (t < C.UP || t >= C.SIGH) return;
      const dim = t >= C.BOTS ? 0.3 : 1; h.save(); h.globalAlpha = fin(t, C.UP + 0.15, 0.3) * dim;
      h.drawImage(thumbs[0], 400, 290, 280, 498); h.strokeStyle = 'rgba(255,255,255,0.5)'; h.lineWidth = 4; h.strokeRect(400, 290, 280, 498);
      const fly = pr(t, B('up') + 0.6, B('sched'));
      PLAT.forEach(([n, col, ic], i) => { const t0 = B('sched') + i * (E('sched') - B('sched')) / 3, k = pop(t, t0, 0.35); const x = 220 + i * 320, y = 870;
        if (fly > 0 && k < 1) { h.save(); h.globalAlpha *= 0.7; h.strokeStyle = col; h.setLineDash([10, 12]); h.lineWidth = 4; h.beginPath(); h.moveTo(540, 790); h.lineTo(x, y - 70); h.stroke(); h.restore(); }
        scaleAt(x, y, k, () => { card(x - 135, y - 60, 270, 120, 30, INK, col); h.fillStyle = col; h.beginPath(); h.arc(x - 85, y, 30, 0, 7); h.fill(); txt(ic, x - 85, y + 2, 32, '#fff', 900, 'center');
          txt(n, x - 45, y - 12, 30, TXT, 700, 'left', 1, FR); txt('posted ✓', x - 45, y + 26, 24, GRN, 700); }); });
      h.restore();
      if (t >= C.BOTS) { const k = pop(t, C.BOTS + 0.1, 0.4); scaleAt(540, 470, k, () => { glowCard(170, 330, 740, 280, 36, 'rgba(255,77,90,0.85)');
        for (let i = 0; i < 4; i++) { h.save(); h.globalAlpha = 0.85; h.drawImage(thumbs[(i * 3) % 12], 0, 60, 180, 200, 210 + i * 70, 375 + (i % 2) * 14, 64, 72); h.restore(); }
        txt('same junk', 520, 420, 40, TXT, 700, 'left', 1, FR); txt('every single day', 520, 475, 30, DIM, 600); txt('🗑️', 300, 545, 50, '#000', 400, 'center'); });
        stamp('DEMONETIZED 💸', 540, 690, RED, pop(t, B('ban') + 0.45, 0.3), -0.1, 56); }
    };
    // --- one good topic a day
    const drawClick = t => { if (t < C.SIGH || t >= C.CTA) return;
      const a = pop(t, B('click') + 0.05, 0.4); scaleAt(540, 460, a, () => { glowCard(160, 340, 760, 250, 40, 'rgba(255,197,61,0.85)');
        txt('💡', 280, 465, 100, '#000', 400, 'center'); txt('1 good topic', 370, 430, 58, ACC, 700, 'left', 1, FR); txt('a day = the real job', 372, 505, 34, TXT, 600); });
      const c = fin(t, E('click') - 0.5, 0.3); if (c > 0) chip("you'll survive 😌", 540, 650, 34, 'rgba(61,220,151,0.2)', GRN, c, pop(t, E('click') - 0.5, 0.35), 800, FR); };
    // --- CTA
    const drawCTA = t => { if (t < C.CTA) return;
      const k = pop(t, B('cta') + 0.05, 0.45), ca = fin(t, B('cta'), 0.3); if (ca <= 0) return; h.save(); h.globalAlpha = ca; glowCard(130, 250, 820, 400, 42, 'rgba(255,197,61,0.85)');
      txt('Comment', 540, 320, 44, DIM, 700, 'center', 1, FR); scaleAt(540, 420, 0.6 + 0.4 * k, () => otxt('AUTO', 540, 420, 140, ACC, 1, 'center', 14));
      const b = fin(t, B('send'), 0.3); blurName(250, 520, 520, 46, b, '#fff', t); txt("I'll DM you the name + full setup 📩", 540, 610, 32, TXT, 600, 'center', fin(t, B('send') + 0.3, 0.3)); h.restore(); };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.28, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,8,0.5)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.STARS, C.S1, C.CHEAT, C.CTA];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.16) a = Math.max(a, 1 - d / 0.16); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawHook(t); drawRepo(t); drawTopic(t); drawScript(t); drawCap(t); drawClips(t); drawVoice(t); drawBatch(t); drawCheat(t); drawUpload(t); drawClick(t); drawCTA(t);
      STEPS.forEach(([a, b, s1, s2]) => { if (inS(t, a, b) && !(a === 'UP' && t >= C.SIGH)) label(t, s1, s2, C[a]); });
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,240,250,${f * 0.55})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.3); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, PINK); g.addColorStop(1, ACC); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); drawLaptop(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['bass', 0.05, 0.5], ['pop', 0.2, 0.35]); for (let i = 0; i < 6; i++) sfx.push(['pop', 0.5 + i * 0.1, 0.12]);
    sfx.push(['thud', B('nobodyw') + 0.15, 0.5]);
    sfx.push(['whoosh', C.REPO, 0.3], ['pop', C.REPO + 0.05, 0.35]); for (let t2 = B('stars'); t2 < E('stars') + 0.1; t2 += 0.07) sfx.push(['coin', t2, 0.06]); sfx.push(['ding', E('stars') + 0.1, 0.25]);
    sfx.push(['pop', B('free'), 0.25], ['pop', B('free') + 0.3, 0.25], ['boing', B('secret') + 0.1, 0.25], ['thud', B('secret') + 0.12, 0.4]);
    sfx.push(['whoosh', C.S1, 0.3], ['pop', C.S1 + 0.3, 0.3]); for (let t2 = B('s1') + 0.5; t2 < E('s1') - 0.05; t2 += 0.08) sfx.push(['tick', t2, 0.14]); sfx.push(['beep', B('job') + 0.05, 0.3], ['thud', B('job') + 0.25, 0.35]);
    sfx.push(['whoosh', C.S2, 0.25]); for (let t2 = B('s2') + 0.7; t2 < B('twosec') + 0.6; t2 += 0.05) sfx.push(['tick', t2, 0.1]); sfx.push(['ding', B('twosec') + 0.6, 0.25]);
    sfx.push(['pop', C.CAP + 0.1, 0.3], ['pop', C.CAP + 0.45, 0.3]);
    sfx.push(['whoosh', C.S3, 0.25]); for (let i = 0; i < 5; i++) sfx.push(['chime', B('s3') + 0.55 + i * (E('every') - B('s3') - 0.2) / 5, 0.12]);
    sfx.push(['whoosh', C.S4, 0.25], ['pop', C.S4 + 0.25, 0.3], ['pop', B('s4') + 0.9, 0.25]); for (let i = 0; i < 3; i++) sfx.push(['pop', B('subs') + i * (E('subs') - B('subs')) / 3, 0.3]); sfx.push(['ding', E('subs'), 0.25]);
    sfx.push(['whoosh', C.S5, 0.25]); for (let i = 0; i < 5; i++) sfx.push(['pop', B('s5') + 0.7 + i * 0.1, 0.2]); sfx.push(['chime', B('best') + 0.6, 0.35]);
    sfx.push(['riser', C.CHEAT - 1.4, 0.25], ['bass', C.CHEAT, 0.6], ['boing', B('cheat') + 0.3, 0.3], ['kaching', B('cheat') + 0.35, 0.3]);
    sfx.push(['whoosh', C.UP, 0.3], ['riser', B('up') + 0.1, 0.2]); for (let i = 0; i < 3; i++) sfx.push(['ding', B('sched') + i * (E('sched') - B('sched')) / 3, 0.22]);
    sfx.push(['buzz', C.BOTS + 0.1, 0.15], ['thud', B('ban') + 0.45, 0.7], ['zap', B('ban') + 0.48, 0.2]);
    sfx.push(['pop', B('click') + 0.05, 0.35], ['chime', E('click') - 0.5, 0.3]);
    sfx.push(['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.05, 0.4], ['pop', B('send') + 0.05, 0.3]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, music: {}, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
