/* @maddiee.makess reel 10 — "Pick a style". The same cosy room, Maddie and the hover-bot snap through 7 animation styles:
   pixel art, voxel (real block models), comic book, paper cut-out, neon, anime/toon, tiny diorama — then back to toy 3D,
   a code reveal, and a CTA wall of styles (comment CLAUDE). All looks are made in this file: material swaps, voxelization
   and one post shader (edges from depth + normals, halftone, dithering, tilt-shift). No handle, no name tags, full 9:16. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x07060d, fog: [7, 22], fov: 34, bloom: null },
  lines: window.ST_LINES,

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
      const r = { g, head, lift, shellMesh: shell, face };
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

    // =====================================================================================================
    // ================= STYLES ============================================================================
    // =====================================================================================================
    const W = 1080, H = 1920;
    const ST = ['pixel', 'voxel', 'comic', 'paper', 'neon', 'toon', 'dio', 'toy', 'code'];
    const SID = n => ST.indexOf(n);
    const NAMES = { pixel: 'PIXEL ART', voxel: 'VOXEL', comic: 'COMIC BOOK', paper: 'PAPER CUT-OUT', neon: 'NEON', toon: 'ANIME', dio: 'TINY DIORAMA' };
    const ORDER = ['pixel', 'voxel', 'comic', 'paper', 'neon', 'toon', 'dio'];

    // timeline (snap cuts land just before each style's first line)
    const C = {
      HOOK: 0, PIX: B('pix1') - 0.3, VOX: B('vox1') - 0.3, COM: B('com1') - 0.3, PAP: B('pap1') - 0.3, NEO: B('neo1') - 0.3, TOON: B('toon1') - 0.3, DIO: B('dio1') - 0.3, TOY: B('toy1') - 0.3,
      REV1: B('toy2') - 0.1, CODE: B('rev2') - 0.1, REV3: B('rev3') - 0.1, REV4: B('rev4') - 0.08, CTA: B('cta2') - 0.2, CTA2: B('cta2') + 0.75, CTA3: B('cta3') - 0.1,
    };
    const CUTS = [C.PIX, C.VOX, C.COM, C.PAP, C.NEO, C.TOON, C.DIO, C.TOY, C.CODE, C.REV3];
    const styleAt = t => t < C.PIX ? 'toy' : t < C.VOX ? 'pixel' : t < C.COM ? 'voxel' : t < C.PAP ? 'comic' : t < C.NEO ? 'paper' : t < C.TOON ? 'neon' : t < C.DIO ? 'toon' : t < C.TOY ? 'dio' : (t >= C.CODE && t < C.REV3) ? 'code' : 'toy';
    const segStart = t => [0, ...CUTS].filter(c => c <= t).pop();

    // ---------- material registry: every mesh remembers its toy material; other looks are made from it once
    const grad = n => { const d = new Uint8Array(n * 4); for (let i = 0; i < n; i++) { const v = Math.round(255 * Math.pow((i + 0.6) / n, 0.9)); d.set([v, v, v, 255], i * 4); } const t = new THREE.DataTexture(d, n, 1); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; };
    const G3 = grad(3), G2 = grad(2), G4 = grad(4);
    const REG = [];
    S.traverse(o => { if ((o.isMesh) && !o.isInstancedMesh) REG.push({ o, m: o.material }); });
    const alt = new Map();
    const lookOf = (m, style) => {
      const key = m.uuid + style; if (alt.has(key)) return alt.get(key);
      let r = m;
      const base = { color: m.color ? m.color.clone() : new THREE.Color(1, 1, 1), map: m.map || null, transparent: m.transparent, opacity: m.opacity, side: m.side, depthWrite: m.depthWrite };
      if (['toon', 'comic', 'paper'].includes(style) && !m.isMeshBasicMaterial) { const hs = {}; base.color.getHSL(hs); if (hs.l < 0.16) base.color.setHSL(hs.h, Math.min(hs.s, 0.3), 0.15); }
      if (!m.isMeshBasicMaterial && !m.isSpriteMaterial) {
        if (style === 'toon' || style === 'comic') r = new THREE.MeshToonMaterial({ ...base, gradientMap: style === 'comic' ? G3 : G3 });
        else if (style === 'paper') r = new THREE.MeshToonMaterial({ ...base, gradientMap: G2 });
        else if (style === 'neon' || style === 'code') r = new THREE.MeshBasicMaterial({ ...base, map: null, color: style === 'code' ? new THREE.Color(0, 0, 0) : base.color.clone().multiplyScalar(0.018).add(new THREE.Color(0.01, 0.003, 0.022)) });
      } else if (style === 'code') r = new THREE.MeshBasicMaterial({ ...base, map: null, color: new THREE.Color(0, 0, 0), transparent: m.transparent, opacity: m.transparent ? 0 : 1 });
      alt.set(key, r); return r;
    };

    // ---------- VOXEL: real block versions of Maddie, the mascot and the furniture (built once)
    const dsMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const rc = new THREE.Raycaster(), rdir = new THREE.Vector3(1, 0.0131, 0.0071).normalize();
    const VOXELS = [], BOXSWAP = [], HIDE_VOX = [];
    const cubeG = new THREE.BoxGeometry(1, 1, 1);
    const isOpen = g => { const p = g.parameters || {}; return g.type === 'PlaneGeometry' || g.type === 'CircleGeometry' || g.type === 'TubeGeometry' || p.openEnded ||
      (g.type === 'SphereGeometry' && ((p.phiLength ?? 7) < 6.28 || (p.thetaLength ?? 4) < 3.14)); };
    const vox = (mesh, step, colorFn) => {
      const g = mesh.geometry; g.computeBoundingBox(); const bb = g.boundingBox;
      mesh.updateWorldMatrix(true, false); const ws = new THREE.Vector3(); mesh.getWorldScale(ws);
      const sx = step / Math.abs(ws.x), sy = step / Math.abs(ws.y), sz = step / Math.abs(ws.z);
      const helper = new THREE.Mesh(g, dsMat), pts = [], p = new THREE.Vector3();
      for (let x = bb.min.x + sx / 2; x < bb.max.x; x += sx) for (let y = bb.min.y + sy / 2; y < bb.max.y; y += sy) for (let z = bb.min.z + sz / 2; z < bb.max.z; z += sz) {
        p.set(x, y, z); rc.set(p, rdir); if (rc.intersectObject(helper, false).length % 2) pts.push([x, y, z]); }
      if (!pts.length) return false;
      const im = new THREE.InstancedMesh(cubeG, new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0 }), pts.length);
      const mx = new THREE.Matrix4(), col = new THREE.Color(), r2 = K.rng(pts.length + 3), base = mesh.material.color || new THREE.Color(1, 1, 1);
      pts.forEach((q, i) => { mx.makeScale(sx * 0.999, sy * 0.999, sz * 0.999); mx.setPosition(q[0], q[1], q[2]); im.setMatrixAt(i, mx);
        col.copy(colorFn ? colorFn(q) : base); const j = 0.9 + r2() * 0.16; col.multiplyScalar(j); im.setColorAt(i, col); });
      im.castShadow = im.receiveShadow = true; im.visible = false; mesh.add(im); VOXELS.push(im); HIDE_VOX.push(mesh); return true;
    };
    const boxSwap = mesh => { const g = mesh.geometry; g.computeBoundingBox(); const s = new THREE.Vector3(); g.boundingBox.getSize(s); const c = new THREE.Vector3(); g.boundingBox.getCenter(c);
      const bg = new THREE.BoxGeometry(Math.max(s.x, 0.005), Math.max(s.y, 0.005), Math.max(s.z, 0.005)); bg.translate(c.x, c.y, c.z); BOXSWAP.push({ mesh, g, bg }); };
    // Maddie: face parts stay as blocks (box-swapped) so the mouth still moves
    const faceParts = new Set(); M.eyes.forEach(e => e.traverse(o => o.isMesh && faceParts.add(o)));
    M.head.traverse(o => { if (o.isMesh && o.geometry && (o.geometry.type === 'SphereGeometry' || o.geometry.type === 'TorusGeometry') && o.parent !== M.head) faceParts.add(o); });
    M.head.children.forEach(o => { if (o.isMesh && o.geometry.type === 'SphereGeometry' && o.position.z > 0.15) faceParts.add(o); });   // nose
    M.g.traverse(o => { if (!o.isMesh) return; if (faceParts.has(o) || (o.parent && o.parent.type === 'Group' && o.parent !== M.head && o.parent.parent === M.head && o.parent.children.length <= 3)) { boxSwap(o); return; } });
    const skipM = new Set(BOXSWAP.map(b => b.mesh));
    M.g.traverse(o => { if (!o.isMesh || skipM.has(o) || o.isInstancedMesh) return; const gp = o.geometry.parameters || {};
      if (o.geometry.type === 'RoundedBoxGeometry' && Math.min(gp.width || 1, gp.height || 1, gp.depth || 1) < 0.03) { boxSwap(o); return; }
      if (o.parent === M.head && o.geometry.type === 'RoundedBoxGeometry' && o.position.y > 0.3 && o.position.z > 0.15) { boxSwap(o); return; }   // brows
      if (!vox(o, 0.026)) HIDE_VOX.push(o); });
    // mascot: shell becomes a block sphere with an orange belly and a dark visor band; the face screen floats just in front
    vox(R.shellMesh, 0.03, q => { const y = q[1], z = q[2]; if (y < -0.12) return new THREE.Color(0xe8692f); if (z > 0.12 && y > -0.1 && y < 0.15) return new THREE.Color(0x141a2e); return new THREE.Color(0xd9d1c4); });
    R.head.traverse(o => { if (o.isMesh && o !== R.shellMesh && !o.isInstancedMesh && !(o.material.isMeshBasicMaterial)) { if (isOpen(o.geometry)) HIDE_VOX.push(o); else if (!vox(o, 0.03)) HIDE_VOX.push(o); } });
    // furniture
    REG.forEach(({ o }) => { if (o.parent !== S) return; if (o === floor || o === wall || o === wallL || o === rug) return; const gt = o.geometry && o.geometry.type;
      if (!gt || o.material.isMeshBasicMaterial || gt === 'TubeGeometry' || gt === 'PlaneGeometry' || gt === 'CircleGeometry') return;
      o.geometry.computeBoundingBox(); const s = new THREE.Vector3(); o.geometry.boundingBox.getSize(s);
      if (isOpen(o.geometry) || Math.min(s.x * o.scale.x, s.y * o.scale.y, s.z * o.scale.z) < 0.06) { boxSwap(o); return; }
      if (!vox(o, 0.05)) boxSwap(o); });
    // block textures for floor / walls / rug
    const blockTex = (draw, rx, ry) => { const t = K.canvasTex(64, 64, draw); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); return t; };
    const noisyFill = (x, w, h, hue, sat, lit, n = 16) => { const r = K.rng(hue + 11); const c = w / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { x.fillStyle = `hsl(${hue},${sat}%,${lit + (r() - 0.5) * 9}%)`; x.fillRect(i * c, j * c, c, c); } };
    const plankT = blockTex((x, w, h) => { noisyFill(x, w, h, 26, 45, 30); x.fillStyle = 'rgba(0,0,0,0.35)'; for (let k = 0; k < 4; k++) x.fillRect(0, k * 16, w, 2); x.fillRect(30, 0, 2, 16); x.fillRect(10, 16, 2, 16); x.fillRect(44, 32, 2, 16); x.fillRect(22, 48, 2, 16); }, 48, 48);
    const stoneT = blockTex((x, w, h) => { noisyFill(x, w, h, 195, 22, 24); x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 2; x.strokeRect(1, 1, 62, 62); }, 40, 16);
    const woolT = blockTex((x, w, h) => { noisyFill(x, w, h, 252, 38, 26, 8); }, 11, 7);
    const VOXMAT = new Map([[floor, new THREE.MeshStandardMaterial({ map: plankT, roughness: 0.9 })], [wall, new THREE.MeshStandardMaterial({ map: stoneT, roughness: 0.9 })], [wallL, new THREE.MeshStandardMaterial({ map: stoneT, roughness: 0.9 })], [rug, new THREE.MeshStandardMaterial({ map: woolT, roughness: 0.95 })]]);

    // ---------- NEON-only set: synthwave grid floor + sunset in the window
    const gridG = new THREE.BufferGeometry(), gp = [];
    for (let i = -24; i <= 24; i++) { gp.push(i * 0.25, 0.01, -1.5, i * 0.25, 0.01, 6); }
    for (let j = 0; j <= 30; j++) { gp.push(-6, 0.01, -1.5 + j * 0.25, 6, 0.01, -1.5 + j * 0.25); }
    for (let i = -24; i <= 24; i++) { gp.push(i * 0.25, 0, WZ + 0.02, i * 0.25, 4, WZ + 0.02); }
    for (let j = 0; j <= 16; j++) { gp.push(-5, j * 0.25, WZ + 0.02, 5, j * 0.25, WZ + 0.02); }
    gridG.setAttribute('position', new THREE.Float32BufferAttribute(gp, 3));
    const grid = new THREE.LineSegments(gridG, new THREE.LineBasicMaterial({ color: new THREE.Color(0xff2fd0).multiplyScalar(0.55), toneMapped: false, fog: false, transparent: true, opacity: 0.8 })); grid.visible = false; S.add(grid);
    const sunsetTex = K.canvasTex(512, 640, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#12002a'); g.addColorStop(0.55, '#5a0a6e'); g.addColorStop(1, '#ff3c8a'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      const sg = x.createLinearGradient(0, 260, 0, 560); sg.addColorStop(0, '#ffe36b'); sg.addColorStop(1, '#ff2f8c'); x.fillStyle = sg; x.beginPath(); x.arc(256, 470, 190, Math.PI, 0); x.fill();
      x.fillStyle = '#5a0a6e'; for (let k = 0; k < 7; k++) x.fillRect(40, 340 + k * 26 + k * k * 1.2, 432, 6 + k * 1.6);
      x.fillStyle = '#12002a'; x.fillRect(0, 470, w, h); x.strokeStyle = '#ff4fd8'; x.lineWidth = 3; for (let k = 0; k < 9; k++) { x.beginPath(); x.moveTo(0, 480 + k * k * 2.2); x.lineTo(w, 480 + k * k * 2.2); x.stroke(); }
      for (let k = -8; k <= 8; k++) { x.beginPath(); x.moveTo(256 + k * 14, 470); x.lineTo(256 + k * 80, h); x.stroke(); } });
    const winMat0 = winPane.material, winMatNeon = new THREE.MeshBasicMaterial({ map: sunsetTex, toneMapped: false });

    // ---------- DIORAMA set: the room becomes a miniature on a wooden base
    const baseM = SM(0x7a5233, 0.6), base = new THREE.Group(); S.add(base); base.visible = false;
    const baseBox = new THREE.Mesh(new RB(4.9, 0.32, 3.3, 3, 0.04), baseM); baseBox.position.set(0, -0.165, -0.05); baseBox.receiveShadow = true; base.add(baseBox);
    const trim = new THREE.Mesh(new RB(5.0, 0.06, 3.4, 2, 0.02), SM(0x2a1c12, 0.5)); trim.position.set(0, -0.33, -0.05); base.add(trim);
    const DIOSAVE = [floor, wall, wallL].map(o => ({ o, p: o.position.clone(), s: o.scale.clone() }));
    const dioOn = on => {
      DIOSAVE.forEach(({ o, p, s }) => { o.position.copy(p); o.scale.copy(s); });
      if (on) { floor.scale.set(4.9 / 12, 3.3 / 12, 1); floor.position.set(0, 0.001, -0.05); wall.scale.set(0.49, 0.62, 1); wall.position.set(0, 1.24, WZ); wallL.scale.set(3.3 / 6, 0.62, 1); wallL.position.set(-2.4, 1.24, -0.05); }
      base.visible = on;
    };

    // ---------- apply a look
    let curStyle = null;
    const BG0 = S.background.clone(), FOG0 = S.fog;
    const NOEDGE = []; S.traverse(o => { if (o.isPoints || o.isSprite || (o.isMesh && o.material.transparent && o.material.depthWrite === false)) NOEDGE.push(o); });
    const applyStyle = st => {
      if (st === curStyle) return; curStyle = st;
      REG.forEach(({ o, m }) => { o.material = (st === 'toy' || st === 'pixel' || st === 'dio' || st === 'voxel') ? m : lookOf(m, st); });
      BOXSWAP.forEach(b => { b.mesh.geometry = st === 'voxel' ? b.bg : b.g; });
      VOXELS.forEach(v => v.visible = st === 'voxel');
      if (st === 'voxel') { HIDE_VOX.forEach(o => o.material = HIDDEN); VOXMAT.forEach((m, o) => o.material = m); R.face.position.z = 0.29; } else R.face.position.z = 0.247;
      grid.visible = st === 'neon';
      winPane.material = st === 'neon' ? winMatNeon : (st === 'code' ? lookOf(winMat0, 'code') : winMat0);
      dioOn(st === 'dio');
      S.background = st === 'dio' ? new THREE.Color(0x2b2547) : st === 'neon' ? new THREE.Color(0x0a0018) : st === 'code' ? new THREE.Color(0x000000) : BG0;
      S.fog = (st === 'dio' || st === 'code') ? null : FOG0;
      motes.visible = st !== 'code'; led.visible = pool.visible = wallGlow.visible = !(st === 'code');
    };
    const HIDDEN = new THREE.MeshBasicMaterial({ visible: false });

    // ---------- render pipeline: scene -> HDR target (+depth) -> bloom -> normals -> style shader -> HUD on top
    const rtMain = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 }); rtMain.depthTexture = new THREE.DepthTexture(W, H);
    const rtNorm = new THREE.WebGLRenderTarget(W, H, { samples: 0 });
    const bloom = new POST.UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.5, 0.6, 0.97);
    const normMat = new THREE.MeshNormalMaterial();
    const oCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postU = { tC: { value: rtMain.texture }, tD: { value: rtMain.depthTexture }, tN: { value: rtNorm.texture }, res: { value: new THREE.Vector2(W, H) },
      st: { value: 7 }, time: { value: 0 }, glitch: { value: 0 }, flash: { value: 0 }, near: { value: 0.1 }, far: { value: 600 }, expo: { value: 1.0 }, fy: { value: 0.5 }, fold: { value: 0 } };
    const postM = new THREE.ShaderMaterial({ uniforms: postU, depthTest: false, depthWrite: false, toneMapped: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `
        precision highp float; varying vec2 vUv;
        uniform sampler2D tC, tD, tN; uniform vec2 res; uniform float st, time, glitch, flash, near, far, expo, fy, fold;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f); return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
        float lin(float d){ return near * far / (far - d * (far - near)); }
        vec3 aces(vec3 x){ x *= expo; return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0., 1.); }
        vec3 srgb(vec3 c){ c = clamp(c, 0., 1.); return mix(c*12.92, 1.055*pow(c, vec3(1./2.4))-0.055, step(0.0031308, c)); }
        vec3 sat(vec3 c, float s){ float l = dot(c, vec3(0.299, 0.587, 0.114)); return mix(vec3(l), c, s); }
        vec3 col(vec2 uv){ return texture2D(tC, uv).rgb; }
        float edge(vec2 uv, float r){
          vec2 o = r / res; float d = lin(texture2D(tD, uv).r); vec3 n = texture2D(tN, uv).rgb * 2. - 1.; float e = 0.;
          for (int i = 0; i < 4; i++) { vec2 dir = i == 0 ? vec2(1,0) : i == 1 ? vec2(-1,0) : i == 2 ? vec2(0,1) : vec2(0,-1);
            vec2 q = uv + o * dir; float dq = lin(texture2D(tD, q).r); vec3 nq = texture2D(tN, q).rgb * 2. - 1.;
            e = max(e, step(0.04 * min(d, dq) + 0.006, abs(dq - d))); e = max(e, step(0.42, 1. - dot(n, nq))); }
          return e; }
        float bayer(vec2 p){ p = mod(p, 4.); int x = int(p.x), y = int(p.y); int i = x + y * 4;
          float m[16]; m[0]=0.;m[1]=8.;m[2]=2.;m[3]=10.;m[4]=12.;m[5]=4.;m[6]=14.;m[7]=6.;m[8]=3.;m[9]=11.;m[10]=1.;m[11]=9.;m[12]=15.;m[13]=7.;m[14]=13.;m[15]=5.;
          float v = 0.; for (int k = 0; k < 16; k++) if (k == i) v = m[k]; return v / 16.; }
        void main(){
          vec2 uv = vUv;
          if (glitch > 0.) { float row = floor(uv.y * 46.), h = hash(vec2(row, floor(time * 30.))); uv.x += (h - 0.5) * 0.16 * glitch * step(0.45, h); uv.y += (hash(vec2(floor(time*30.), 3.)) - 0.5) * 0.02 * glitch; }
          vec3 c;
          if (st < 0.5) {                                  // PIXEL ART
            vec2 cells = vec2(135., 240.), cell = floor(uv * cells), cuv = (cell + 0.5) / cells;
            c = aces(col(cuv)); c = sat(c, 1.35); c = pow(c, vec3(0.92));
            float e = edge(cuv, 2.); c *= 1. - 0.7 * e;
            c = floor(c * 6. + 0.5 + (bayer(cell) - 0.5) * 0.7) / 6.;
          } else if (st < 1.5) {                           // VOXEL (real blocks in 3D)
            c = aces(col(uv)); c = sat(c, 1.18);
          } else if (st < 2.5) {                           // COMIC
            c = aces(col(uv) * 1.25); c = sat(c, 1.55); float l = dot(c, vec3(0.299, 0.587, 0.114));
            c = floor(c * 4. + 0.5) / 4.;
            vec2 p = uv * res; p = mat2(0.7071, -0.7071, 0.7071, 0.7071) * p; vec2 cc = fract(p / 11.) - 0.5; float dotR = clamp((0.62 - l) * 0.9, 0., 0.6);
            c *= mix(1., 0.35, step(length(cc), dotR));
            float e = max(edge(uv, 1.5), edge(uv, 3.)); c = mix(c, vec3(0.03, 0.02, 0.05), e);
          } else if (st < 3.5) {                           // PAPER CUT-OUT
            c = aces(col(uv) * 1.2); c = sat(c, 1.25); c = pow(c, vec3(1.35)); c = floor(c * 5. + 0.5) / 5.;
            c = mix(vec3(0.09, 0.07, 0.06), vec3(1.0, 0.97, 0.9), c);
            float fib = noise(uv * vec2(300., 530.)) * 0.55 + noise(uv * vec2(36., 64.)) * 0.45; c *= 0.86 + 0.18 * fib;
            float cut = edge(uv, 3.5); float sh = edge(uv + vec2(-9., 9.) / res, 4.) * (1. - cut);
            c *= 1. - 0.38 * sh; c = mix(c, vec3(0.98, 0.95, 0.88), cut * 0.9);
          } else if (st < 4.5) {                           // NEON
            c = aces(col(uv)); float e = edge(uv, 1.2), g = edge(uv, 3.5) * 0.55 + edge(uv, 7.) * 0.3;
            vec3 nc = mix(vec3(0.15, 0.95, 1.0), vec3(1.0, 0.25, 0.85), clamp(uv.y * 1.2 - 0.1 + 0.15 * sin(time * 1.3), 0., 1.));
            c += nc * (e * 1.15 + g * 0.45); c *= 0.9 + 0.1 * sin(uv.y * res.y * 1.4);
          } else if (st < 5.5) {                           // ANIME / TOON
            c = aces(col(uv) * 1.15); c = sat(c, 1.35); c = (c - 0.5) * 1.12 + 0.52;
            float e = edge(uv, 1.3); c = mix(c, vec3(0.07, 0.04, 0.12), e * 0.92);
          } else if (st < 6.5) {                           // TINY DIORAMA (tilt-shift)
            float b = smoothstep(0.06, 0.32, abs(uv.y - fy)); vec3 a = vec3(0.); float wsum = 0.;
            for (int i = 0; i < 24; i++) { float an = float(i) * 2.399, r = sqrt(float(i) / 24.) * b * 16.; vec2 q = uv + vec2(cos(an), sin(an)) * r / res; a += col(q); wsum += 1.; }
            c = aces(a / wsum * 1.18); c = sat(c, 1.45); c = (c - 0.5) * 1.08 + 0.53;
          } else if (st < 7.5) {                           // TOY 3D (our normal look)
            c = aces(col(uv));
          } else {                                         // CODE / wireframe reveal
            float e = edge(uv, 1.), g = edge(uv, 3.5); c = vec3(0.02, 0.06, 0.04) + vec3(0.25, 1.0, 0.55) * (e * 1.1 + g * 0.25);
            c *= 0.88 + 0.12 * sin(uv.y * res.y * 1.2 + time * 40.);
          }
          if (glitch > 0.) { c.r = mix(c.r, aces(col(uv + vec2(0.012 * glitch, 0.))).r, 0.6 * glitch); c.b = mix(c.b, aces(col(uv - vec2(0.012 * glitch, 0.))).b, 0.6 * glitch); }
          vec2 vq = vUv - 0.5; c *= 1. - dot(vq, vq) * 0.55;
          c += (hash(vUv * res + time) - 0.5) * 0.025;
          c = mix(c, vec3(1.), flash);
          gl_FragColor = vec4(srgb(c), 1.);
        }` });
    const postScene = new THREE.Scene(); const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postM); quad.frustumCulled = false; postScene.add(quad);
    // HUD: own canvas, drawn on top of the styled picture (never pixelated or blurred)
    const hc = document.createElement('canvas'); hc.width = W; hc.height = H; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hudScene = new THREE.Scene(); const hudQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, toneMapped: false, depthTest: false })); hudQ.frustumCulled = false; hudScene.add(hudQ);
    let camFx = { roll: 0, jit: [0, 0, 0] };
    const pipeline = (target = null, withHud = true) => {
      const r = K.renderer;
      if (camFx.roll || camFx.jit[0]) { K.cam.position.x += camFx.jit[0]; K.cam.position.y += camFx.jit[1]; K.cam.rotateZ(camFx.roll); K.cam.updateMatrixWorld(true); }
      postU.near.value = K.cam.near; postU.far.value = K.cam.far;
      r.setRenderTarget(rtMain); r.clear(); r.render(S, K.cam);
      if (curStyle !== 'code') bloom.render(r, null, rtMain, 0, false);
      const needN = ['pixel', 'comic', 'paper', 'neon', 'toon', 'code'].includes(curStyle);
      if (needN) { const bg = S.background, fg = S.fog; NOEDGE.forEach(o => o.userData.v = o.visible); NOEDGE.forEach(o => o.visible = false); grid.userData.v = grid.visible; grid.visible = false;
        S.overrideMaterial = normMat; S.background = new THREE.Color(0.5, 0.5, 1.0); S.fog = null;
        r.setRenderTarget(rtNorm); r.clear(); r.render(S, K.cam);
        S.overrideMaterial = null; S.background = bg; S.fog = fg; NOEDGE.forEach(o => o.visible = o.userData.v); grid.visible = grid.userData.v; }
      r.setRenderTarget(target); r.clear(); r.render(postScene, oCam);
      if (withHud) { r.autoClear = false; r.render(hudScene, oCam); r.autoClear = true; }
      r.setRenderTarget(null);
    };
    K.draw = () => pipeline(null, true);

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const smv = (a, b, k) => a + (b - a) * k;
    const toR = [0.62, 0.05], toCam = [-0.12, 0.02], hands = [-0.05, 0.42], up = [-0.1, -0.42];
    const P0 = { L: [-0.3, 0, -0.05, -0.1], R: [-0.3, 0, 0.05, -0.1] };   // shoulder x,y,z + elbow x
    const POSE = {
      rest: P0,
      lookHands: { L: [-1.05, 0.25, -0.15, -1.0], R: [-1.05, -0.25, 0.15, -1.0] },
      shrug: { L: [-0.55, 0.1, -0.55, -1.25], R: [-0.55, -0.1, 0.55, -1.25] },
      fist: { L: [-0.3, 0, -0.05, -0.1], R: [-2.55, -0.2, 0.25, -1.25] },
      hug: { L: [-0.95, 0.75, -0.1, -1.75], R: [-0.95, -0.75, 0.1, -1.75] },
      both: { L: [-2.7, 0.15, -0.45, -0.35], R: [-2.7, -0.15, 0.45, -0.35] },
      wave: { L: [-0.3, 0, -0.05, -0.1], R: [-2.35, -0.3, 0.55, -0.9] },
      point: { L: [-0.3, 0, -0.05, -0.1], R: [-1.45, -0.18, 0.0, -0.08] },
      chin: { L: [-0.3, 0, -0.05, -0.1], R: [-1.15, -0.55, 0.1, -2.0] },
      grab: { L: [-1.1, 0.6, -0.35, -1.85], R: [-1.1, -0.6, 0.35, -1.85] },
    };
    let curPose = JSON.parse(JSON.stringify(P0));
    const acting = (t, tq) => {
      const st = styleAt(t);
      const mT = K.voice('maddie', tq), rT = K.voice('claude', tq) * 0.6;
      const k = last < 0 || Math.abs(t - last) > 0.2 ? 1 : cl((t - last) * 5); last = t;
      let mL = toR, face = 'neutral', lean = 0.1, pose = 'rest', bounce = 0;
      if (t < C.PIX) { const asked = t >= B('hook2') - 0.1; mL = toR; face = asked ? 'smile' : 'neutral'; pose = asked ? 'rest' : 'chin'; lean = asked ? -0.2 : 0.05; }
      else if (t < C.VOX) { const a = t < B('pix1') + 0.6; mL = a ? hands : toCam; face = 'shock'; pose = a ? 'lookHands' : 'both'; lean = a ? 0.25 : -0.1; }
      else if (t < C.COM) { const a = t < B('vox1') + 0.5; mL = a ? hands : toCam; pose = a ? 'lookHands' : 'chin'; face = a ? 'shock' : 'smile'; }
      else if (t < C.PAP) { mL = toCam; pose = t < B('com1') + 0.2 ? 'rest' : 'fist'; face = 'smile'; lean = -0.1; bounce = 1; }
      else if (t < C.NEO) { mL = t < B('pap2') ? hands : toCam; pose = t < B('pap2') ? 'lookHands' : 'hug'; face = t < B('pap2') ? 'shock' : 'worried'; lean = -0.2; }
      else if (t < C.TOON) { mL = t < B('neo2') ? toR : [0.25, -0.25 + 0.1 * Math.sin(t * 2)]; face = t < B('neo2') ? 'neutral' : 'shock'; pose = 'rest'; lean = -0.05; }
      else if (t < C.DIO) { mL = toCam; pose = t < B('toon1') + 0.15 ? 'rest' : 'both'; face = 'smile'; bounce = 1.6; lean = -0.12; }
      else if (t < C.TOY) { mL = up; pose = 'both'; face = 'shock'; lean = -0.25; }
      else if (t < C.REV1) { mL = toR; pose = t < B('toy1') + 0.9 ? 'rest' : 'shrug'; face = 'worried'; lean = t < B('toy1') + 0.9 ? -0.35 : 0.05; }
      else if (t < C.REV3) { mL = toR; face = 'neutral'; }
      else if (t < C.REV4) { mL = toR; face = 'shock'; pose = 'grab'; lean = -0.2; }
      else if (t < C.CTA) { mL = toR; face = 'shock'; pose = 'rest'; }
      else if (t < C.CTA3) { mL = toCam; face = 'smile'; }
      else { mL = toCam; face = 'smile'; pose = 'point'; lean = 0.05; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = smv(mYaw, mL[0], k); mPitch = smv(mPitch, mL[1], k);
      M.update(tq, { talk: mT * 0.95, face, look: [mYaw, mPitch], lean });
      const tgt = POSE[pose]; ['L', 'R'].forEach(s => { for (let i = 0; i < 4; i++) curPose[s][i] = smv(curPose[s][i], tgt[s][i], k); });
      const [aL, aR] = M.arms;
      let fx = pose === 'fist' ? 0.25 * Math.sin(tq * 16) : 0, bx = pose === 'both' ? 0.18 * Math.sin(tq * 13) : 0;
      aL.sh.rotation.set(curPose.L[0] + bx, curPose.L[1], curPose.L[2]); aL.el.rotation.x = curPose.L[3];
      aR.sh.rotation.set(curPose.R[0] + fx + bx, curPose.R[1], curPose.R[2]); aR.el.rotation.x = curPose.R[3];
      M.g.position.y = bounce * 0.025 * Math.abs(Math.sin(tq * 9));
      if (st === 'paper' && t >= B('pap2') - 0.1) M.head.rotation.z += 0.035 * Math.sin(tq * 55);           // shiver
      if (t >= C.REV3 && t < C.REV4) M.head.rotation.x -= 0.08;
      // mascot
      let rL = [-0.35, 0.05], mood = 'calm';
      if (t < C.PIX) { mood = t >= B('hook2') ? 'smile' : 'calm'; rL = t >= B('hook2') + 0.3 ? [0.3, 0.02] : [-0.35, 0.05]; }
      else if (t < C.VOX) { mood = 'smile'; }
      else if (t < C.COM) { mood = 'calm'; }
      else if (t < C.PAP) { mood = 'smile'; }
      else if (t < C.NEO) { mood = 'flat'; }
      else if (t < C.TOON) { rL = [0.3, 0.0]; mood = 'calm'; }
      else if (t < C.DIO) { mood = 'smile'; }
      else if (t < C.TOY) { rL = [0.1, -0.35]; mood = 'happy'; }
      else if (t < C.REV1) { mood = 'calm'; }
      else if (t < C.CODE) { rL = [0.35, 0.02]; mood = t >= B('toy2') + 0.6 ? 'wink' : 'calm'; }
      else if (t < C.REV3) { rL = [0.35, 0.02]; mood = 'calm'; }
      else if (t < C.REV4) { rL = [-0.4, 0.05]; mood = 'smile'; }
      else if (t < C.CTA) { rL = [0.35, 0.02]; mood = 'wink'; }
      else { rL = [0.35, 0.02]; mood = 'smile'; }
      rYaw = smv(rYaw, rL[0], k); rPitch = smv(rPitch, rL[1], k);
      R.update(tq, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.z += 0.22 * K.pulse(t, B('toy2'), 0.7) + 0.1 * K.pulse(t, B('hook2'), 0.8);       // head tilt "honestly?"
      R.head.rotation.x += 0.14 * K.pulse(t, B('rev4'), 0.45) + 0.1 * K.pulse(t, B('hook2') + 0.4, 0.4);
      R.g.position.y = 0.86 + 0.05 * K.pulse(t, C.CTA, 0.8) + 0.03 * K.pulse(t, B('cta2'), 0.6);
      FAIRY.forEach(f => { const v = 0.65 + 0.35 * Math.sin(tq * 2.2 + f.k * 1.3); f.b.material.color.setRGB(1 * v + 0.2, 0.83 * v + 0.12, 0.54 * v); });
      tv.intensity = 0.5 + 0.12 * Math.sin(tq * 7.3) * Math.sin(tq * 3.1);
      motes.rotation.y = tq * 0.02;
      steam.forEach((s, i) => { const ph = ((tq * 0.45 + i / steam.length) % 1); s.position.set(STX - 0.05 + Math.sin(i * 2 + tq * 1.3) * 0.015, 0.7 + ph * 0.2, SZ + 0.05); s.scale.setScalar(0.03 + ph * 0.07); s.material.opacity = 0.3 * Math.sin(ph * Math.PI); });
    };

    // ================= CAMERA =================
    const Pp = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [MX + 0.04, 1.4, MZ], RHL = [0.48, 1.3, -0.62];
    const sh = {
      pix: [Pp([0.02, 1.36, 1.75], [MX + 0.06, 1.2, MZ], 34), Pp([-0.04, 1.35, 1.5], [MX + 0.06, 1.22, MZ], 34)],
      vox: [Pp([0.25, 1.4, 2.35], [0.06, 1.12, -0.7], 36), Pp([0.18, 1.38, 2.05], [0.06, 1.12, -0.7], 36)],
      com: [Pp([-0.8, 1.12, 1.95], [MX + 0.12, 1.12, MZ], 36), Pp([-0.68, 1.15, 1.68], [MX + 0.12, 1.15, MZ], 36)],
      pap: [Pp([0.15, 1.36, 2.55], [0.02, 1.08, -0.7], 34), Pp([0.1, 1.36, 2.3], [0.02, 1.1, -0.7], 34)],
      neo: [Pp([0.55, 1.55, 3.6], [0.05, 1.2, -0.9], 40), Pp([0.35, 1.5, 3.1], [0.05, 1.2, -0.9], 40)],
      toon: [Pp([-0.15, 0.82, 1.15], [MX, 1.35, MZ], 40), Pp([-0.2, 0.86, 0.92], [MX, 1.38, MZ], 40)],
      dio: [Pp([3.4, 5.4, 5.2], [0.0, 0.35, -0.45], 50), Pp([2.6, 5.3, 5.7], [0.0, 0.35, -0.45], 50)],
      hook: [Pp([0.18, 1.4, 2.6], [0.06, 1.12, -0.7], 36), Pp([0.12, 1.38, 2.0], [0.06, 1.14, -0.7], 36)],
      toy: [Pp([0.2, 1.42, 2.4], [0.08, 1.15, -0.7], 36), Pp([0.15, 1.42, 2.15], [0.08, 1.15, -0.7], 36)],
      robo: [Pp([0.25, 1.26, 1.45], RHL, 30), Pp([0.27, 1.27, 1.25], RHL, 30)],
      code: [Pp([0.45, 1.62, 3.4], [0.05, 1.15, -0.9], 40), Pp([0.25, 1.55, 2.7], [0.05, 1.15, -0.9], 40)],
      mad: [Pp([0.0, 1.38, 1.3], MHL, 32), Pp([-0.02, 1.38, 1.05], MHL, 32)],
      cta: [Pp([0.12, 1.45, 2.7], [0.1, 1.2, -0.7], 38), Pp([0.12, 1.44, 2.5], [0.1, 1.2, -0.7], 38)],
    };
    const plan = [
      [C.HOOK, C.PIX, sh.hook], [C.PIX, C.VOX, sh.pix], [C.VOX, C.COM, sh.vox], [C.COM, C.PAP, sh.com], [C.PAP, C.NEO, sh.pap], [C.NEO, C.TOON, sh.neo], [C.TOON, C.DIO, sh.toon],
      [C.DIO, C.TOY, sh.dio], [C.TOY, C.REV1, sh.toy], [C.REV1, C.CODE, sh.robo], [C.CODE, C.REV3, sh.code], [C.REV3, C.REV4, sh.mad], [C.REV4, C.CTA, sh.robo], [C.CTA, D + 5, sh.cta],
    ];
    const smooth = k => k * k * (3 - 2 * k);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth,
      shake: [C.PIX, C.COM, C.REV3].includes(a) ? (t => 0.008 * Math.exp(-(t - a) * 5)) : null }));

    // ================= HUD =================
    const ACC = '#ffc53d', INK = 'rgba(14,12,24,0.92)', TXT = '#fbf7f0';
    const FR = '"Fredoka Light", "Inter Display"', MONO = '"DejaVu Sans Mono"';
    const rr = (x, y, w, hh, r, f, s, lw = 4) => { h.beginPath(); h.roundRect(x, y, w, hh, r); if (f) { h.fillStyle = f; h.fill(); } if (s) { h.strokeStyle = s; h.lineWidth = lw; h.stroke(); } };
    const txt = (s, x, y, size, c, wgt = 700, al = 'center', font = FR) => { h.font = `${wgt} ${size}px ${font}`; h.fillStyle = c; h.textAlign = al; h.textBaseline = 'middle'; h.fillText(s, x, y); };
    const pc = document.createElement('canvas'); pc.width = 540; pc.height = 140; const px = pc.getContext('2d');
    const pixText = (s, x, y, size, c, scale = 4, shadow = '#000') => {               // chunky 8-bit text: drawn tiny, scaled up without smoothing
      px.clearRect(0, 0, pc.width, pc.height); px.font = `700 ${Math.round(size / scale)}px ${MONO}`; px.textAlign = 'left'; px.textBaseline = 'top';
      const w = Math.ceil(px.measureText(s).width) + 2, hh = Math.round(size / scale) + 3;
      px.fillStyle = shadow; px.fillText(s, 1, 1); px.fillStyle = c; px.fillText(s, 0, 0);
      h.imageSmoothingEnabled = false; h.drawImage(pc, 0, 0, w, hh, Math.round(x - w * scale / 2), Math.round(y - hh * scale / 2), w * scale, hh * scale); h.imageSmoothingEnabled = true; };
    const scr = (v3) => { const p = v3.clone().project(K.cam); return [(p.x * 0.5 + 0.5) * W, (1 - (p.y * 0.5 + 0.5)) * H]; };
    const headPos = () => { const v = new THREE.Vector3(); M.head.getWorldPosition(v); v.y += 0.62; return v; };
    const pop = (t, a, d = 0.35) => eb(pr(t, a, a + d));
    // style chip at the top: same layout, themed per style
    const chip = (t, st, a) => {
      const k = pop(t, a, 0.3), idx = ORDER.indexOf(st) + 1; if (idx < 1) return;
      h.save(); h.translate(W / 2, 205); h.scale(k, k);
      const label = NAMES[st], tag = `STYLE #${idx}`;
      if (st === 'pixel') { h.fillStyle = '#000'; h.fillRect(-300, -78, 600, 156); h.fillStyle = '#fff'; h.fillRect(-292, -70, 584, 140); h.fillStyle = '#1b1b3a'; h.fillRect(-284, -62, 568, 124); pixText(tag, 0, -28, 34, '#9fe7ff'); pixText(label, 0, 26, 64, '#ffe14d'); }
      else if (st === 'voxel') { h.fillStyle = '#5b3a1e'; h.fillRect(-300, -78, 600, 156); h.fillStyle = '#6fb544'; h.fillRect(-300, -78, 600, 34); for (let i = 0; i < 20; i++) { h.fillStyle = i % 2 ? '#5aa035' : '#7cc451'; h.fillRect(-300 + i * 30, -44, 30, 10 + (i % 3) * 5); }
        txt(tag, 0, -2, 30, '#f3e3c4', 800, 'center', MONO); txt(label, 0, 40, 60, '#fff', 900, 'center', MONO); }
      else if (st === 'comic') { h.rotate(-0.04); h.fillStyle = '#000'; h.fillRect(-306, -84, 612, 168); h.fillStyle = '#ffe23a'; h.fillRect(-296, -74, 592, 148); txt(tag, 0, -30, 32, '#000', 900); h.font = `900 76px ${FR}`; h.lineWidth = 10; h.strokeStyle = '#000'; h.strokeText(label, 0, 26); h.fillStyle = '#ff3b3b'; h.fillText(label, 0, 26); }
      else if (st === 'paper') { h.rotate(0.03); h.shadowColor = 'rgba(0,0,0,0.35)'; h.shadowOffsetY = 8; h.shadowBlur = 14; h.fillStyle = '#f4ead6'; h.beginPath(); h.moveTo(-300, -70); for (let i = 0; i <= 20; i++) h.lineTo(-300 + i * 30, -76 + (i % 2) * 8); h.lineTo(300, 74); for (let i = 20; i >= 0; i--) h.lineTo(-300 + i * 30, 70 + (i % 2) * 8); h.closePath(); h.fill(); h.shadowColor = 'transparent';
        h.fillStyle = 'rgba(255,240,170,0.75)'; h.fillRect(-60, -96, 120, 36); txt(tag, 0, -24, 30, '#8a6b4a', 800); txt(label, 0, 26, 62, '#c2452d', 900); }
      else if (st === 'neon') { h.shadowColor = '#ff3ad6'; h.shadowBlur = 28; rr(-300, -78, 600, 156, 26, 'rgba(10,0,24,0.6)', '#ff6be3', 6); h.shadowColor = '#3ae8ff'; txt(tag, 0, -28, 32, '#7ff3ff', 700); h.shadowColor = '#ff3ad6'; h.shadowBlur = 30; txt(label, 0, 28, 78, '#ffd6f8', 800); h.shadowBlur = 0; }
      else if (st === 'toon') { h.rotate(-0.03); rr(-300, -78, 600, 156, 36, '#ff5fa2', '#fff', 10); txt(tag, 0, -28, 32, '#fff', 800); h.font = `900 84px ${FR}`; h.lineWidth = 12; h.strokeStyle = '#2a1050'; h.strokeText(label, 0, 26); h.fillStyle = '#fff'; h.fillText(label, 0, 26);
        for (let i = 0; i < 3; i++) { const a2 = t * 3 + i * 2.1; txt('✦', Math.cos(a2) * 330, Math.sin(a2) * 90, 40, '#fff6a8', 900); } }
      else if (st === 'dio') { rr(-300, -78, 600, 156, 16, '#efe6d2', '#3a2a1a', 5); txt(tag, 0, -28, 30, '#6b5a44', 800, 'center', MONO); txt(label, 0, 26, 62, '#3a2a1a', 900); }
      h.restore();
      const kb = pop(t, a + 0.08, 0.3) * (1 + 0.3 * (1 - eo(pr(t, a + 0.08, a + 0.45)))); h.save(); h.translate(W / 2 - 300, 190); h.rotate(-0.08); h.scale(kb, kb);
      h.beginPath(); h.arc(0, 0, 74, 0, 7); h.fillStyle = ACC; h.fill(); h.lineWidth = 8; h.strokeStyle = '#141414'; h.stroke(); txt(String(idx), 0, 6, 104, '#141414', 900); h.restore();
    };
    // style extras
    const burst = (cx, cy, r1, r2, n, fill, stroke, rot = 0) => { h.beginPath(); for (let i = 0; i < n * 2; i++) { const a2 = rot + i * Math.PI / n, r = i % 2 ? r1 : r2; h.lineTo(cx + Math.cos(a2) * r, cy + Math.sin(a2) * r); } h.closePath(); h.fillStyle = fill; h.fill(); if (stroke) { h.lineWidth = 9; h.strokeStyle = stroke; h.stroke(); } };
    const extras = (t, st) => {
      if (st === 'pixel') {                                         // health bar + score over Maddie
        const [x, y] = scr(headPos()); const hp = 3;
        pixText('MADDIE', x, y - 64, 30, '#fff'); for (let i = 0; i < 3; i++) { h.fillStyle = '#000'; h.fillRect(x - 78 + i * 54, y - 36, 44, 36); h.fillStyle = i < hp ? '#ff3b5c' : '#3a3a4a'; h.fillRect(x - 74 + i * 54, y - 32, 36, 28); }
        pixText('SCORE 008', 140, 1700 - 1340 + 1340, 30, '#ffe14d'); pixText('LIVES x3', 940, 1700, 30, '#9fe7ff');
        if (t < C.PIX + 0.5) { h.fillStyle = `rgba(255,255,255,${(1 - (t - C.PIX) / 0.5) * 0.6})`; h.fillRect(0, 0, W, H); }
      } else if (st === 'voxel') {                                  // hotbar
        const y0 = 1690; for (let i = 0; i < 9; i++) { const x0 = W / 2 - 4.5 * 84 + i * 84; h.fillStyle = 'rgba(0,0,0,0.55)'; h.fillRect(x0, y0, 80, 80); h.strokeStyle = i === 2 ? '#fff' : '#8b8b8b'; h.lineWidth = i === 2 ? 6 : 3; h.strokeRect(x0 + 2, y0 + 2, 76, 76);
          const cols = ['#6fb544', '#8a5a2b', '#5ec8c0', '#d9413a', '#ffc53d', '#9a9a9a', '#3b6ea8', '#e8dcc8', '#8a5cc7']; h.fillStyle = cols[i]; h.fillRect(x0 + 22, y0 + 22, 36, 36); h.fillStyle = 'rgba(0,0,0,0.25)'; h.fillRect(x0 + 22, y0 + 46, 36, 12); }
      } else if (st === 'comic') {                                  // panel frame, caption box, POW
        h.fillStyle = '#fff'; h.fillRect(0, 0, W, 26); h.fillRect(0, H - 26, W, 26); h.fillRect(0, 0, 26, H); h.fillRect(W - 26, 0, 26, H); h.lineWidth = 8; h.strokeStyle = '#000'; h.strokeRect(26, 26, W - 52, H - 52);
        h.save(); h.rotate(-0.02); h.fillStyle = '#fff6c8'; h.fillRect(70, 360, 460, 92); h.lineWidth = 5; h.strokeRect(70, 360, 460, 92); txt('MEANWHILE, ON THE SOFA…', 300, 406, 32, '#000', 900); h.restore();
        const pw = B('com1') + Math.max(0.6, (E('com1') - B('com1')) * 0.62), k = pop(t, pw, 0.25);
        if (t >= pw) { h.save(); h.translate(800, 690); h.rotate(0.15); h.scale(k * 0.8, k * 0.8); burst(0, 0, 150, 240, 12, '#ffe23a', '#000', t * 0.2); burst(0, 0, 100, 160, 12, '#ff3b3b', null, 0.3); h.font = `900 120px ${FR}`; h.lineWidth = 12; h.strokeStyle = '#000'; h.strokeText('POW!', 0, 6); h.fillStyle = '#fff'; h.fillText('POW!', 0, 6); h.restore(); }
      } else if (st === 'paper') {                                  // fold the corner on "don't fold me!"
        const f = eo(pr(t, B('pap2') + 0.05, B('pap2') + 0.5)) * 0.85 + 0.15 * Math.sin(t * 9) * pr(t, B('pap2'), B('pap2') + 0.3) * (1 - pr(t, E('pap2'), E('pap2') + 0.3)); const s2 = 380 * Math.max(0, f);
        if (s2 > 4) { h.fillStyle = '#16120e'; h.beginPath(); h.moveTo(W, 0); h.lineTo(W - s2, 0); h.lineTo(W, s2); h.closePath(); h.fill();
          h.shadowColor = 'rgba(0,0,0,0.45)'; h.shadowBlur = 24; h.fillStyle = '#efe4cf'; h.beginPath(); h.moveTo(W - s2, 0); h.lineTo(W, s2); h.lineTo(W - s2 * 0.98, s2 * 0.98); h.closePath(); h.fill(); h.shadowColor = 'transparent'; }
        h.fillStyle = 'rgba(255,240,170,0.7)'; h.save(); h.translate(90, 470); h.rotate(-0.5); h.fillRect(-70, -20, 140, 40); h.restore(); h.save(); h.translate(W - 110, 1560); h.rotate(0.6); h.fillRect(-70, -20, 140, 40); h.restore();
      } else if (st === 'toon') {                                   // speed lines + sparkles
        h.save(); h.translate(W / 2, 900); const r3 = K.rng(Math.floor(t * 12));
        for (let i = 0; i < 70; i++) { const a2 = r3() * Math.PI * 2, r0 = 520 + r3() * 200, len = 300 + r3() * 500; h.strokeStyle = `rgba(255,255,255,${0.25 + r3() * 0.35})`; h.lineWidth = 2 + r3() * 6; h.beginPath(); h.moveTo(Math.cos(a2) * r0, Math.sin(a2) * r0 * 1.6); h.lineTo(Math.cos(a2) * (r0 + len), Math.sin(a2) * (r0 + len) * 1.6); h.stroke(); }
        h.restore(); const [x, y] = scr(headPos()); for (let i = 0; i < 4; i++) { const ph = (t * 1.6 + i * 0.25) % 1; txt('✦', x + Math.cos(i * 1.7) * (150 + ph * 60), y + 40 + Math.sin(i * 2.3) * 120 - ph * 50, 40 + 30 * Math.sin(ph * Math.PI), `rgba(255,246,168,${Math.sin(ph * Math.PI)})`, 900); }
      } else if (st === 'dio') {                                    // scale tag pointing at tiny Maddie
        const [x, y] = scr(headPos()); const k = pop(t, C.DIO + 0.25, 0.4);
        h.globalAlpha = k; h.strokeStyle = '#fff'; h.lineWidth = 4; h.beginPath(); h.moveTo(x, y - 10); h.lineTo(x + 120, y - 190); h.lineTo(x + 230, y - 190); h.stroke();
        rr(x + 230, y - 240, 330, 100, 18, '#efe6d2', '#3a2a1a', 4); txt('ACTUAL SIZE:', x + 395, y - 212, 28, '#6b5a44', 800); txt('2 cm', x + 395, y - 170, 44, '#3a2a1a', 900); h.globalAlpha = 1;
      }
    };
    // code reveal: a code window types the scene's own code
    const CODE = [
      'const style = pick(["pixel","voxel","comic",', '  "paper","neon","anime","diorama"]);', 'maddie.voxelize(0.026);',
      'post.edges(depth, normals);', 'post.halftone(11, 45);', 'post.tiltShift(focus = 0.5);', 'for (f = 0; f < frames; f++)', '  render(scene, camera, style);',
    ];
    const codeWin = (t, a) => { const k = pop(t, a, 0.35); h.save(); h.translate(W / 2, 1000); h.scale(k, k);
      rr(-470, -290, 940, 580, 26, 'rgba(6,14,10,0.92)', '#3ddc97', 4); ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((c, i) => { h.beginPath(); h.arc(-430 + i * 34, -255, 10, 0, 7); h.fillStyle = c; h.fill(); }); txt('pick_a_style.js', 0, -255, 28, '#8fd9b0', 700, 'center', MONO);
      const n = (t - a) * 75; let left = n; CODE.forEach((ln, i) => { if (left <= 0) return; const s2 = ln.slice(0, Math.floor(left)); left -= ln.length + 3; txt(s2, -430, -190 + i * 58, 32, i === 0 || i === 1 ? '#ffd27a' : '#b8f5d0', 600, 'left', MONO); });
      if (Math.floor(t * 3) % 2 === 0) { h.fillStyle = '#3ddc97'; h.fillRect(-430 + Math.min(820, (n % 30) * 19), -205 + Math.min(7, Math.floor(n / 30)) * 58, 16, 32); }
      h.restore(); };
    // CTA: wall of styles (7 real thumbnails + locked, blurred "more")
    const THUMB = {}; const MORE = ['LOW-POLY', 'WATERCOLOR', 'CLAY', 'SKETCH', 'ISOMETRIC', 'VAPORWAVE', 'STOP-MOTION', 'GAMEBOY', 'BLUEPRINT'];
    const moreTile = (i) => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); const r = K.rng(i * 7 + 2);
      const g = x.createLinearGradient(0, 0, 64, 64); g.addColorStop(0, `hsl(${r() * 360},70%,55%)`); g.addColorStop(1, `hsl(${r() * 360},70%,35%)`); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
      for (let k = 0; k < 6; k++) { x.fillStyle = `hsla(${r() * 360},80%,70%,0.8)`; x.beginPath(); x.arc(r() * 64, r() * 64, 6 + r() * 14, 0, 7); x.fill(); } return c; };
    const MORET = MORE.map((_, i) => moreTile(i));
    const ctaWall = (t) => {
      const a = C.CTA, cols = 4, tw = 210, gap = 16, x0 = (W - (cols * tw + (cols - 1) * gap)) / 2, y0 = 290;
      h.fillStyle = `rgba(6,5,12,${0.72 * eo(pr(t, a, a + 0.4))})`; h.fillRect(0, 0, W, H);
      const head = pop(t, a, 0.4); h.save(); h.translate(W / 2, 205); h.scale(head, head); txt('PICK YOURS', 0, 0, 84, '#fff', 900); h.restore();
      const all = [...ORDER.map(s => ({ s })), ...MORE.map((m, i) => ({ m, i }))];
      all.forEach((it, i) => { const r = Math.floor(i / cols), c = i % cols, x = x0 + c * (tw + gap), y = y0 + r * (tw + gap), k = pop(t, a + 0.1 + i * 0.045, 0.3); if (k <= 0.01) return;
        h.save(); h.translate(x + tw / 2, y + tw / 2); h.scale(k, k); h.beginPath(); h.roundRect(-tw / 2, -tw / 2, tw, tw, 22); h.save(); h.clip();
        if (it.s) { const im = THUMB[it.s]; if (im) h.drawImage(im, 0, (im.height - im.width) * 0.62, im.width, im.width, -tw / 2, -tw / 2, tw, tw);
          h.fillStyle = 'rgba(0,0,0,0.55)'; h.fillRect(-tw / 2, tw / 2 - 48, tw, 48); txt(NAMES[it.s], 0, tw / 2 - 24, 24, '#fff', 800); }
        else { h.filter = 'blur(10px)'; h.drawImage(MORET[it.i], -tw / 2 - 20, -tw / 2 - 20, tw + 40, tw + 40); h.filter = 'none'; h.fillStyle = 'rgba(0,0,0,0.25)'; h.fillRect(-tw / 2, -tw / 2, tw, tw);
          h.fillStyle = '#fff'; rr(-26, -6, 52, 40, 8, '#fff'); h.lineWidth = 7; h.strokeStyle = '#fff'; h.beginPath(); h.arc(0, -8, 17, Math.PI, 0); h.stroke(); h.fillStyle = '#333'; h.beginPath(); h.arc(0, 12, 6, 0, 7); h.fill(); txt('???', 0, tw / 2 - 30, 28, '#fff', 900); }
        h.restore(); const hi = it.s && Math.floor((t - a) * 4) % 7 === ORDER.indexOf(it.s) && t > a + 1; rr(-tw / 2, -tw / 2, tw, tw, 22, null, hi ? ACC : 'rgba(255,255,255,0.35)', hi ? 8 : 3); h.restore(); });
      const plus = pop(t, a + 0.9, 0.4) * (t < C.CTA2 ? 1 : 0); h.save(); h.translate(W / 2, 1222); h.scale(plus, plus); txt('+ many more', 0, 0, 44, ACC, 800); h.restore();
      if (t >= C.CTA2) { const k = pop(t, C.CTA2, 0.35); h.save(); h.translate(W / 2, 1258); h.scale(k, k); h.shadowColor = 'rgba(255,197,61,0.6)'; h.shadowBlur = 40; rr(-330, -62, 660, 124, 30, ACC); h.shadowBlur = 0;
        txt('Comment CLAUDE', 0, -8, 62, '#141414', 900); txt('all styles + prompts in your DMs 📩', 0, 38, 26, '#141414', 700); h.restore(); }
    };

    // hook: the question, big, over the normal room
    const hookTitle = (t) => {
      h.fillStyle = `rgba(6,5,12,${0.35 * (1 - pr(t, C.PIX - 0.3, C.PIX))})`; h.fillRect(0, 0, W, 520);
      [['HOW MANY', 150, 0.05, '#fff', 92], ['ANIMATION STYLES', 255, 0.2, ACC, 92], ['CAN CLAUDE DO?', 360, 0.35, '#fff', 92]].forEach(([s2, y, d, c, sz]) => {
        const k = pop(t, d, 0.35); if (k <= 0) return; h.save(); h.translate(W / 2, y); h.scale(k, k); h.lineWidth = 14; h.strokeStyle = 'rgba(10,8,20,0.9)'; h.font = `900 ${sz}px ${FR}`; h.textAlign = 'center'; h.textBaseline = 'middle'; h.strokeText(s2, 0, 0); h.fillStyle = c; h.fillText(s2, 0, 0); h.restore(); });
    };
    // running count badge (top-right) during the styles
    const counter = (t, n, a) => { const k = 1 + 0.35 * (1 - eo(pr(t, a, a + 0.3))); h.save(); h.translate(W - 120, 400); h.scale(k, k);
      h.beginPath(); h.arc(0, 0, 70, 0, 7); h.fillStyle = INK; h.fill(); h.lineWidth = 6; h.strokeStyle = ACC; h.stroke(); txt(String(n), 0, 4, 78, ACC, 900); txt('COUNT', 0, -100, 26, '#fff', 800); h.restore(); };
    // the turn: 7 ... then it runs away to infinity
    const LA = B('toy2') + 0.4, LS = 0.13;
    const LADDER = ['7', '12', '30', '99', '500', '∞'];
    const ladderAt = t => { const a = LA; if (t < a) return 0; return Math.min(LADDER.length - 1, Math.floor((t - a) / LS)); };
    const bigCount = (t) => {
      const i = ladderAt(t), a = i ? LA + i * LS : C.TOY, inf = i === LADDER.length - 1;
      const k = pop(t, C.TOY, 0.3) * (1 + (inf ? 0.25 : 0.12) * (1 - eo(pr(t, a, a + 0.25))));
      h.save(); h.translate(W / 2, 300); h.scale(k, k); rr(-250, -150, 500, 300, 40, INK, inf ? ACC : 'rgba(255,255,255,0.45)', inf ? 8 : 4);
      txt('STYLES', 0, -100, 34, 'rgba(255,255,255,0.75)', 800); txt(LADDER[i], 0, 22, inf ? 230 : 170, inf ? ACC : '#fff', 900); h.restore(); };
    const hudDraw = (t, st) => {
      h.clearRect(0, 0, W, H);
      const a = segStart(t);
      if (t < C.PIX) hookTitle(t);
      else if (t < C.TOY) { extras(t, st); chip(t, st, a); }
      if (t >= C.TOY && t < C.CODE) bigCount(t);
      if (t >= C.CODE && t < C.REV3) { codeWin(t, C.CODE + 0.1); const k = pop(t, C.CODE, 0.3); h.save(); h.translate(W / 2, 205); h.scale(k, k); rr(-260, -54, 520, 108, 54, 'rgba(6,14,10,0.9)', '#3ddc97', 4); txt('IT\'S ALL CODE', 0, 2, 50, '#7dffb5', 900); h.restore(); }
      if (t >= C.REV3 && t < C.REV4) { const k = pop(t, C.REV3, 0.25); h.save(); h.translate(840, 470); h.rotate(0.12); h.scale(k, k); txt('?!', 0, 0, 170, ACC, 900); h.restore(); }
      if (t >= C.REV4 && t < C.CTA) { const k = pop(t, C.REV4, 0.3), f = Math.floor(t * 30); h.save(); h.translate(W / 2, 330); h.scale(k, k); rr(-330, -80, 660, 160, 24, INK, ACC, 4); txt('FRAME', 0, -36, 34, 'rgba(255,255,255,0.7)', 800, 'center', MONO); txt(String(f).padStart(4, '0') + ' / ' + String(Math.round(D * 30)).padStart(4, '0'), 0, 24, 66, ACC, 900, 'center', MONO); h.restore(); }
      if (t >= C.CTA) ctaWall(t);
      hTex.needsUpdate = true;
    };

    // ================= thumbnails of each style for the CTA wall (rendered once, live from this scene) =================
    const makeThumbs = () => {
      const rt = new THREE.WebGLRenderTarget(270, 480), buf = new Uint8Array(270 * 480 * 4);
      const keep = curStyle;
      ORDER.forEach((st, i) => {
        applyStyle(st); postU.st.value = SID(st); postU.glitch.value = 0; postU.flash.value = 0;
        const s = st === 'dio' ? sh.dio[1] : st === 'neon' ? sh.neo[1] : sh.vox[1];
        K.cam.position.set(...s.pos); K.cam.lookAt(...s.look); K.cam.fov = s.fov; K.cam.updateProjectionMatrix(); K.cam.updateMatrixWorld(true);
        M.update(3, { face: 'smile', look: [-0.1, 0.02] }); R.update(3, { mood: 'smile', look: [0.3, 0] }); postU.fy.value = 0.55; camFx = { roll: 0, jit: [0, 0, 0] };
        pipeline(rt, false); K.renderer.readRenderTargetPixels(rt, 0, 0, 270, 480, buf);
        const c = document.createElement('canvas'); c.width = 270; c.height = 480; const x = c.getContext('2d'); const id = x.createImageData(270, 480);
        for (let y = 0; y < 480; y++) id.data.set(buf.subarray((479 - y) * 270 * 4, (480 - y) * 270 * 4), y * 270 * 4); x.putImageData(id, 0, 0); THUMB[st] = c; });
      curStyle = null; if (keep) applyStyle(keep); last = -1;
    };
    let thumbsDone = false;

    // ================= UPDATE =================
    const update = t => {
      if (!thumbsDone) { makeThumbs(); thumbsDone = true; }
      const st = styleAt(t); applyStyle(st);
      const tq = st === 'paper' ? Math.floor(t * 10) / 10 : t;                       // stop-motion for paper
      K.shoot(tq, shots);
      acting(t, tq);
      postU.st.value = SID(st); postU.time.value = t;
      const g = CUTS.reduce((m, c) => Math.max(m, 1 - Math.abs(t - c) / 0.13), 0); postU.glitch.value = cl(g) * (t < C.REV3 + 0.2 ? 1 : 0) + 0;
      postU.flash.value = Math.max(0, 0.55 - Math.abs(t - C.TOY) / 0.12 * 0.55, 0.5 - Math.abs(t - C.CODE) / 0.1 * 0.5);
      postU.expo.value = st === 'dio' ? 1.05 : 1.0;
      postU.fy.value = 0.53;
      const pj = st === 'paper' ? K.rng(Math.floor(t * 10) + 5) : null;
      camFx = { roll: st === 'comic' ? -0.12 : 0, jit: pj ? [(pj() - 0.5) * 0.012, (pj() - 0.5) * 0.012, 0] : [0, 0, 0] };
      K.cam.updateMatrixWorld(true);
      hudDraw(t, st);
    };

    // ================= SOUND =================
    const sfx = [['pop', 0.05, 0.25], ['pop', 0.2, 0.25], ['pop', 0.35, 0.25], ['coin', C.PIX + 0.25, 0.3], ['bass', C.PIX + 0.02, 0.5]];
    [C.PIX, C.VOX, C.COM, C.PAP, C.NEO, C.TOON, C.DIO, C.TOY].forEach(c => sfx.push(['whoosh', c - 0.12, 0.35], ['zap', c - 0.02, 0.22]));
    sfx.push(['pop', C.VOX + 0.15, 0.3], ['thud', B('com1') + Math.max(0.6, (E('com1') - B('com1')) * 0.62), 0.6], ['boing', B('com1') + Math.max(0.6, (E('com1') - B('com1')) * 0.62) + 0.05, 0.35]);
    sfx.push(['rustle', C.PAP + 0.05, 0.35], ['rustle', B('pap2'), 0.5], ['buzz', C.NEO + 0.05, 0.12], ['chime', C.TOON + 0.1, 0.35], ['boing', C.DIO + 0.25, 0.25], ['ding', C.DIO + 0.3, 0.2]);
    sfx.push(...LADDER.slice(1).map((_, i) => ['beep', LA + (i + 1) * LS, 0.18]), ['bass', LA + 5 * LS, 0.6], ['riser', C.CODE - 0.4, 0.25], ['zap', C.CODE, 0.3], ['beep', C.REV4 + 0.05, 0.3], ['bass', C.REV3, 0.45]);
    for (let i = 0; i < 16; i++) sfx.push(['pop', C.CTA + 0.1 + i * 0.045, 0.12]);
    sfx.push(['kaching', C.CTA2 + 0.05, 0.35], ['chime', C.CTA3 + 0.2, 0.3]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, music: { muteFrom: B('toy2') + 0.4, muteTo: B('toy2') + 1.9 }, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
