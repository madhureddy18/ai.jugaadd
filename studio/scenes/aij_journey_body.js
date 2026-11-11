/* @maddiee.makess reel 11 — "How we actually make these" (comment DOC).
   NEW LOCATION: a creator studio loft — acoustic panels, a big wall screen behind them, ring light, ON AIR sign,
   gaming chair, desk with mic + snacks, a tall window whose sky goes from sunset to night during the render.
   Six steps, each with a STEP chip: script ("build"), 3D (version 1 was a potato with no arms), voices (old deep +
   kid voices as a joke), styles (pixel / neon / anime flashes -> dizzy), render (1.5 h for 30 s), post (69 -> 13,000).
   CTA: the guide doc card, potato cameo. Full 9:16, no bars, no blush dots, captions high, no handle, no name tags. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x0a0912, fog: [7, 22], fov: 34, bloom: null },
  lines: window.JR_LINES,

  build(K, T) {
    const L = T.lines, N = L.length;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[typeof id === 'number' ? id : IX(id)].t, E = id => L[typeof id === 'number' ? id : IX(id)].end;
    const D = E(N - 1) + 1.7;
    const cl = K.clamp, eo = K.easeOut, pr = K.prog, eb = K.easeBack, lerp = K.lerp;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const rng = K.rng(23);
    const W = 1080, H = 1920;

    // ================= TIMELINE =================
    const s4d = Math.max(0.6, E('s4a') - B('s4a'));
    const WF = window.JR_WORDS || [0.33, 0.45, 0.54, 0.69];            // where "pixel / neon / anime / stop" start inside line s4a
    const C = {
      HOOK: 0, NICE: B('hook3') - 0.05,
      S1: B('s1a') - 0.25, BUILD: E('s1b') - 0.42,
      S2: B('s2a') - 0.25, POT: B('s2b') - 0.05, POTOFF: E('s2c') + 0.12,
      S3: B('s3a') - 0.25, KID: B('s3b') - 0.05, FIX: B('s3c') - 0.1,
      S4: B('s4a') - 0.25, PX: B('s4a') + WF[0] * s4d, NE: B('s4a') + WF[1] * s4d, AN: B('s4a') + WF[2] * s4d, DIZ: B('s4a') + WF[3] * s4d,
      S5: B('s5a') - 0.25, S5Q: B('s5c') - 0.08,
      S6: B('s6a') - 0.25, BIG: B('s6b') - 0.08, FAME: B('s6c') - 0.05,
      CTA: B('cta1') - 0.2, CTAP: B('cta3') - 0.08,
    };
    const STEPS = [[C.S1, 1, 'SCRIPT'], [C.S2, 2, 'CHARACTER'], [C.S3, 3, 'VOICES'], [C.S4, 4, 'STYLES'], [C.S5, 5, 'RENDER'], [C.S6, 6, 'POST']];
    const stepAt = t => { let s = null; STEPS.forEach(x => { if (t >= x[0] && t < C.CTA) s = x; }); return s; };
    const styleAt = t => t >= C.PX && t < C.NE ? 'pixel' : t >= C.NE && t < C.AN ? 'neon' : t >= C.AN && t < C.DIZ ? 'toon' : 'toy';
    const CUTS = [C.PX, C.NE, C.AN, C.DIZ];

    // ================= STUDIO LOFT =================
    const WZ = -1.7;
    const floorTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#2b2a30'; x.fillRect(0, 0, w, h); const r = K.rng(4);
      for (let i = 0; i < 1600; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},${0.02 + r() * 0.04})`; x.fillRect(r() * w, r() * h, 2 + r() * 5, 2 + r() * 5); }
      x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 2; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 128); x.lineTo(w, i * 128); x.stroke(); } });
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(4, 4);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), SM(0xffffff, 0.45, { map: floorTex })); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, -1); floor.receiveShadow = true; S.add(floor);
    const rugTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#e8e0d0'; x.beginPath(); x.arc(256, 256, 250, 0, 7); x.fill();
      ['#1f6f78', '#f2b134', '#e4572e'].forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 22; x.beginPath(); x.arc(256, 256, 210 - i * 46, 0, 7); x.stroke(); });
      x.fillStyle = '#26324a'; x.beginPath(); x.arc(256, 256, 90, 0, 7); x.fill(); });
    const rug = new THREE.Mesh(new THREE.CircleGeometry(1.2, 48), SM(0xffffff, 0.95, { map: rugTex, transparent: true })); rug.rotation.x = -Math.PI / 2; rug.position.set(0.05, 0.004, -0.45); rug.receiveShadow = true; S.add(rug);
    const wallTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#1b1e2a'; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,255,255,0.025)'; for (let i = 0; i < 16; i++) x.fillRect(0, i * 16, w, 1); });
    wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping; wallTex.repeat.set(8, 3);
    const wallM = SM(0xffffff, 0.92, { map: wallTex });
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4.2), wallM); wall.position.set(0, 2.1, WZ); wall.receiveShadow = true; S.add(wall);
    const wallL = new THREE.Mesh(new THREE.PlaneGeometry(6, 4.2), wallM); wallL.rotation.y = Math.PI / 2; wallL.position.set(-2.5, 2.1, WZ + 3); wallL.receiveShadow = true; S.add(wallL);
    rbox(10, 0.1, 0.03, SM(0x0e1018, 0.6), 0, 0.05, WZ + 0.015, 0.01);
    // acoustic foam panels (left + right of the wall screen)
    const foamA = SM(0x4b2f7a, 0.95), foamB = SM(0x1f5f6b, 0.95), foamC = SM(0x2c2f45, 0.95);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) { const m = [foamA, foamB, foamC][(i + j * 2) % 3]; rbox(0.27, 0.27, 0.05, m, -1.55 + i * 0.3, 1.25 + j * 0.3, WZ + 0.03, 0.03); }
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const m = [foamB, foamA, foamC][(i + j) % 3]; rbox(0.27, 0.27, 0.05, m, 1.0 + i * 0.3, 2.35 + j * 0.3, WZ + 0.03, 0.03); }
    // the big wall screen (live canvas: shows each step)
    const SCX = 0.02, SCY = 1.98, SCW = 1.56, SCH = 0.88;
    const sc = document.createElement('canvas'); sc.width = 1024; sc.height = 576; const sx = sc.getContext('2d');
    const scTex = new THREE.CanvasTexture(sc); scTex.colorSpace = THREE.SRGBColorSpace;
    rbox(SCW + 0.08, SCH + 0.08, 0.05, SM(0x0b0b10, 0.35, { metalness: 0.3 }), SCX, SCY, WZ + 0.03, 0.02);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(SCW, SCH), new THREE.MeshBasicMaterial({ map: scTex, toneMapped: false })); screen.position.set(SCX, SCY, WZ + 0.058); S.add(screen);
    const scL = new THREE.PointLight(0x6fa8ff, 0.8, 3.2, 1.6); scL.position.set(SCX, SCY - 0.3, WZ + 0.6); S.add(scL);
    // LED strip glow under the screen
    const ledTex = K.canvasTex(256, 128, (x, w, h) => { const g = x.createRadialGradient(128, 64, 6, 128, 64, 128); g.addColorStop(0, 'rgba(140,90,255,0.8)'); g.addColorStop(1, 'rgba(140,90,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const led = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.3), new THREE.MeshBasicMaterial({ map: ledTex, transparent: true, depthWrite: false, toneMapped: false })); led.position.set(SCX, 1.25, WZ + 0.012); S.add(led);
    const ledL = new THREE.PointLight(0x8a5cff, 1.0, 2.2, 1.6); ledL.position.set(0, 1.0, WZ + 0.3); S.add(ledL);
    // ON AIR light box
    const onAirTex = K.canvasTex(512, 160, (x, w, h) => { x.fillStyle = '#2a0508'; x.fillRect(0, 0, w, h); x.font = '900 104px "Inter Display"'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = '#ff2a3a'; x.shadowBlur = 30; x.fillStyle = '#ffd9dc'; x.fillText('ON AIR', w / 2, h / 2 + 6); });
    rbox(0.66, 0.24, 0.06, SM(0x15151a, 0.4), -1.25, 2.72, WZ + 0.04, 0.02);
    const onAir = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.19), new THREE.MeshBasicMaterial({ map: onAirTex, toneMapped: false })); onAir.position.set(-1.25, 2.72, WZ + 0.075); S.add(onAir);
    const onAirL = new THREE.PointLight(0xff3040, 0.6, 1.4, 2); onAirL.position.set(-1.25, 2.6, WZ + 0.3); S.add(onAirL);
    // tall window (right) — sunset sky, fades to night during the render
    const skyline = (x, w, h, night) => { const r = K.rng(9); for (let b = 0; b < 18; b++) { const bw = 24 + r() * 34, bh = 140 + r() * 320, bx = b * 30 - 14; x.fillStyle = night ? `hsl(235,30%,${7 + r() * 5}%)` : `hsl(270,25%,${18 + r() * 8}%)`; x.fillRect(bx, h - bh, bw, bh);
      for (let wy = h - bh + 10; wy < h - 8; wy += 16) for (let wx = bx + 4; wx < bx + bw - 6; wx += 10) if (r() < (night ? 0.48 : 0.12)) { x.fillStyle = r() < 0.8 ? 'rgba(255,205,130,0.95)' : 'rgba(150,200,255,0.9)'; x.fillRect(wx, wy, 5, 7); } } };
    const dayTex = K.canvasTex(512, 768, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#3b4fa0'); g.addColorStop(0.45, '#f08a5d'); g.addColorStop(0.75, '#ffcf7a'); g.addColorStop(1, '#f6a86b'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(255,240,200,0.95)'; x.beginPath(); x.arc(330, 470, 60, 0, 7); x.fill(); skyline(x, w, h, false); });
    const nightTex = K.canvasTex(512, 768, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#050820'); g.addColorStop(0.65, '#1a1c55'); g.addColorStop(1, '#3a2560'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      const r = K.rng(5); for (let i = 0; i < 110; i++) { x.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.6})`; x.fillRect(r() * w, r() * h * 0.45, 2, 2); }
      x.fillStyle = '#f6efd8'; x.beginPath(); x.arc(370, 130, 40, 0, 7); x.fill(); x.fillStyle = '#050820'; x.beginPath(); x.arc(388, 118, 36, 0, 7); x.fill(); skyline(x, w, h, true); });
    const WX = 1.62, WY = 1.6, WW = 0.95, WH = 1.45;
    const winDay = new THREE.Mesh(new THREE.PlaneGeometry(WW, WH), new THREE.MeshBasicMaterial({ map: dayTex, toneMapped: false })); winDay.position.set(WX, WY, WZ + 0.01); S.add(winDay);
    const winNight = new THREE.Mesh(new THREE.PlaneGeometry(WW, WH), new THREE.MeshBasicMaterial({ map: nightTex, toneMapped: false, transparent: true, opacity: 0 })); winNight.position.set(WX, WY, WZ + 0.013); S.add(winNight);
    const frameM = SM(0x15161c, 0.5, { metalness: 0.3 });
    rbox(WW + 0.08, 0.05, 0.06, frameM, WX, WY + WH / 2 + 0.02, WZ + 0.03); rbox(WW + 0.08, 0.05, 0.06, frameM, WX, WY - WH / 2 - 0.02, WZ + 0.03);
    rbox(0.05, WH + 0.08, 0.06, frameM, WX - WW / 2 - 0.02, WY, WZ + 0.03); rbox(0.05, WH + 0.08, 0.06, frameM, WX + WW / 2 + 0.02, WY, WZ + 0.03);
    rbox(0.03, WH, 0.04, frameM, WX, WY, WZ + 0.03); rbox(WW, 0.03, 0.04, frameM, WX, WY + 0.2, WZ + 0.03);
    const sunL = new THREE.SpotLight(0xffa860, 2.2, 5, 0.7, 0.6, 1.3); sunL.position.set(WX, WY + 0.1, WZ + 0.25); sunL.target.position.set(0.2, 0.6, -0.4); S.add(sunL); S.add(sunL.target);
    // shelf (left) with little figures, books and a plant
    const SHX = -1.62;
    rbox(0.78, 0.03, 0.2, SM(0x6b4a2e, 0.6), SHX + 0.12, 0.98, WZ + 0.1, 0.008);
    for (let i = 0; i < 6; i++) rbox(0.05 + (i % 3) * 0.012, 0.17 + (i % 4) * 0.025, 0.15, SM([0xe4572e, 0x3b6ea8, 0xf2b134, 0x2f9e7a, 0xe8dcc8, 0x8a5cc7][i], 0.7), SHX - 0.18 + i * 0.062, 1.08 + (i % 4) * 0.012, WZ + 0.1, 0.006);
    const fig = (x, c) => { cyl(0.035, 0.04, 0.05, SM(0x222222, 0.5), x, 1.02, WZ + 0.1, 12); sph(0.05, SM(c, 0.5), x, 1.1, WZ + 0.1); };
    fig(SHX + 0.25, 0xffc53d); fig(SHX + 0.38, 0x4fd8ff);
    const pot = cyl(0.11, 0.09, 0.26, SM(0xd9d1c4, 0.6), -1.95, 0.13, -1.25, 18);
    for (let i = 0; i < 9; i++) { const lf = sph(0.09, SM(i % 2 ? 0x3f8f4e : 0x2f7a42, 0.8), -1.95 + Math.sin(i * 2.3) * 0.11, 0.42 + (i % 4) * 0.09, -1.25 + Math.cos(i * 2.3) * 0.08); lf.scale.set(0.6, 1.6, 0.5); lf.rotation.z = Math.sin(i * 2.3) * 0.6; }
    // ring light on a stand (front-left, facing them)
    const standM = SM(0x1d1e24, 0.4, { metalness: 0.5 });
    cyl(0.16, 0.18, 0.025, standM, -1.3, 0.013, -0.1, 24); cyl(0.012, 0.012, 1.45, standM, -1.3, 0.74, -0.1, 8);
    const ringG = new THREE.Group(); ringG.position.set(-1.3, 1.55, -0.1); ringG.rotation.y = 0.75; S.add(ringG);
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.028, 12, 48), BM(0xfff6e8)); ringG.add(ringMesh);
    ringG.add(new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.036, 10, 48), SM(0x1d1e24, 0.4)));  ringMesh.position.z = 0.012;
    const ringL = new THREE.SpotLight(0xfff2e0, 2.4, 5, 0.9, 0.7, 1.4); ringL.position.set(-1.3, 1.55, -0.1); ringL.target.position.set(-0.1, 1.2, -0.7); S.add(ringL); S.add(ringL.target);

    // ================= CHAIR + DESK =================
    const MX = -0.32, MZ = -0.82, SY = 0.48;
    const chairR = SM(0xc8323e, 0.55), chairK = SM(0x1a1a20, 0.6);
    rbox(0.62, 0.11, 0.6, chairK, MX, SY - 0.055, MZ + 0.02, 0.05);
    rbox(0.5, 0.03, 0.5, chairR, MX, SY - 0.002, MZ + 0.02, 0.012);
    const back = rbox(0.6, 0.95, 0.12, chairK, MX, SY + 0.48, MZ - 0.33, 0.06); back.rotation.x = -0.1;
    const backS = rbox(0.24, 0.86, 0.125, chairR, MX, SY + 0.48, MZ - 0.325, 0.03); backS.rotation.x = -0.1;
    rbox(0.42, 0.16, 0.1, chairR, MX, SY + 1.0, MZ - 0.37, 0.05).rotation.x = -0.1;
    cyl(0.03, 0.03, 0.3, standM, MX, 0.24, MZ + 0.02, 10); for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; const leg = rbox(0.3, 0.03, 0.04, standM, MX + Math.cos(a) * 0.15, 0.06, MZ + 0.02 + Math.sin(a) * 0.15, 0.01); leg.rotation.y = -a; sph(0.03, chairK, MX + Math.cos(a) * 0.3, 0.03, MZ + 0.02 + Math.sin(a) * 0.3); }
    [-1, 1].forEach(s => rbox(0.06, 0.04, 0.34, chairK, MX + s * 0.33, SY + 0.22, MZ - 0.02, 0.02));
    // desk (right) with mic arm, snack bowl, mug, keyboard
    const DX = 1.15, DZ = -0.95, DY = 0.74;
    rbox(1.0, 0.04, 0.55, SM(0x8a5a35, 0.5), DX, DY, DZ, 0.012);
    [-1, 1].forEach(s => rbox(0.04, DY, 0.5, standM, DX + s * 0.46, DY / 2, DZ, 0.01));
    rbox(0.42, 0.025, 0.14, SM(0x22232b, 0.5), DX - 0.08, DY + 0.03, DZ + 0.1, 0.01);
    for (let i = 0; i < 12; i++) rbox(0.026, 0.012, 0.026, SM(i % 5 === 0 ? 0xffc53d : 0xdddde6, 0.5), DX - 0.27 + i * 0.034, DY + 0.048, DZ + 0.1, 0.004);
    const mug = cyl(0.045, 0.04, 0.1, SM(0xffc53d, 0.5), DX + 0.3, DY + 0.07, DZ + 0.08, 18);
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), SM(0x2f6fd0, 0.5, { side: THREE.DoubleSide })); bowl.position.set(DX + 0.2, DY + 0.12, DZ - 0.1); S.add(bowl);
    const CHIPS = []; for (let i = 0; i < 22; i++) { const a = rng() * Math.PI * 2, r = rng() * 0.08; const c = sph(0.022, SM(0xf2c14e, 0.7), DX + 0.2 + Math.cos(a) * r, DY + 0.1 + rng() * 0.03, DZ - 0.1 + Math.sin(a) * r); c.scale.set(1, 0.35, 1); CHIPS.push(c); }
    cyl(0.012, 0.012, 0.45, standM, DX - 0.4, DY + 0.22, DZ - 0.15, 8);
    const micArm = rbox(0.4, 0.02, 0.02, standM, DX - 0.55, DY + 0.44, DZ - 0.05, 0.008); micArm.rotation.y = -0.6; micArm.rotation.z = 0.3;
    const mic = cyl(0.04, 0.04, 0.16, SM(0x2a2b33, 0.35, { metalness: 0.4 }), DX - 0.72, DY + 0.5, DZ + 0.1, 16); mic.rotation.z = 0.4;
    // dust motes
    const puff = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 2, 32, 32, 30); g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const moteG = new THREE.BufferGeometry(), mp = []; for (let i = 0; i < 140; i++) mp.push(-1.6 + rng() * 3.2, 0.3 + rng() * 2.0, -1.5 + rng() * 1.6);
    moteG.setAttribute('position', new THREE.Float32BufferAttribute(mp, 3));
    const motes = new THREE.Points(moteG, new THREE.PointsMaterial({ map: puff, color: 0xffd9a0, size: 0.016, transparent: true, opacity: 0.45, depthWrite: false })); S.add(motes);

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: SY, shirt: 0x2f6f5e, pants: 0x2f3442 }); M.g.position.set(MX, 0, MZ + 0.04); M.g.rotation.y = 0.14; S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    // VERSION 1: the potato (no arms)
    const POT = new THREE.Group(); POT.position.set(MX, 0, MZ + 0.04); POT.rotation.y = 0.14; POT.visible = false; S.add(POT);
    const potM = SM(0xc28f55, 0.85), potD = SM(0x8a5d33, 0.9);
    const potG = new THREE.SphereGeometry(0.3, 40, 30); { const p = potG.attributes.position, v = new THREE.Vector3(); for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); const n = 1 + 0.06 * Math.sin(v.x * 17 + v.y * 9) + 0.045 * Math.sin(v.y * 23 - v.z * 13) + 0.03 * Math.sin(v.z * 31); v.multiplyScalar(n); p.setXYZ(i, v.x, v.y, v.z); } potG.computeVertexNormals(); }
    const potB = new THREE.Mesh(potG, potM); potB.scale.set(0.95, 1.3, 0.85); potB.position.y = SY + 0.36; potB.castShadow = true; POT.add(potB);
    [[0.12, 0.2, 0.22], [-0.16, 0.05, 0.2], [0.05, -0.18, 0.23], [-0.2, 0.3, 0.12], [0.21, -0.05, 0.14]].forEach(([x, y, z]) => { const d = sph(0.024, potD, x, SY + 0.36 + y, z, POT); d.scale.set(1, 0.7, 0.4); });
    const pEyes = [-1, 1].map(s => { const e = new THREE.Group(); e.position.set(s * 0.085, SY + 0.5, 0.235); POT.add(e); sph(0.052, new THREE.MeshBasicMaterial({ color: 0xffffff }), 0, 0, 0, e).scale.set(1, 1.15, 0.5); sph(0.026, SM(0x111111, 0.3), s * 0.006, -0.005, 0.022, e).scale.set(1, 1.1, 0.5); return e; });
    const pMouth = sph(0.045, SM(0x4a1d18, 0.6), 0, SY + 0.37, 0.25, POT); pMouth.scale.set(1, 0.2, 0.35);
    const tuftP = rbox(0.12, 0.09, 0.1, SM(0x2a1c15, 0.7), 0.02, SY + 0.74, 0.02, 0.04, POT); tuftP.rotation.z = -0.35;
    [-1, 1].forEach(s => { cyl(0.045, 0.05, 0.16, potM, s * 0.1, SY - 0.02, 0.18, 12, POT).rotation.x = 1.2; rbox(0.1, 0.06, 0.15, SM(0x2b2b30, 0.6), s * 0.1, SY - 0.06, 0.32, 0.03, POT); });

    const R = (() => {   // the headphones hover-bot, floating next to Maddie; no hands
      const g = new THREE.Group(); g.position.set(0.5, 0.92, -0.68); g.rotation.y = -0.25; S.add(g);
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
          else if (mood === 'wide') { fx.beginPath(); fx.ellipse(cx, 50, 20, 26, 0, 0, 7); fx.fill(); fx.fillStyle = 'rgba(255,255,255,0.85)'; fx.beginPath(); fx.arc(cx + 6, 40, 6, 0, 7); fx.fill(); fx.fillStyle = '#ffb36b'; }
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
      const r = { g, head, lift, shellMesh: shell, face };
      r.update = (t, { talk = 0, look = [0, 0], mood = 'calm' } = {}) => {
        const bob = Math.sin(t * 2.4) * 0.018; lift.position.y = 0.25 + bob;
        head.rotation.set(look[1] + Math.sin(t * 2.4 + 1) * 0.03, look[0] + Math.sin(t * 0.8) * 0.05, Math.sin(t * 1.7) * 0.04);
        const blink = ((t + 1.3) % 3.4) < 0.11;
        drawFace(mood === 'smile' ? 'happy' : mood, talk * 1.3, blink && !['smile', 'wink', 'flat', 'stern'].includes(mood));
        thr.material.opacity = 0.7 + 0.3 * Math.sin(t * 20); thr.scale.setScalar(1 + 0.1 * Math.sin(t * 13));
        glowL.intensity = 0.2 + talk * 0.6;
      };
      return r;
    })();

    // ================= LIGHT =================
    const hemi = new THREE.HemisphereLight(0x8090e0, 0x1a1014, 0.34); S.add(hemi);
    const fill = new THREE.DirectionalLight(0xffe6cc, 0.6); fill.position.set(0.6, 2.4, 2.6); fill.target.position.set(0, 0.9, -0.8); fill.castShadow = true; fill.shadow.mapSize.set(2048, 2048); fill.shadow.bias = -0.0006;
    fill.shadow.camera.left = -2.5; fill.shadow.camera.right = 2.5; fill.shadow.camera.top = 2.8; fill.shadow.camera.bottom = -2.5; S.add(fill); S.add(fill.target);
    const rimW = new THREE.DirectionalLight(0xffb070, 0.8); rimW.position.set(-2.2, 1.8, -1.6); S.add(rimW);
    const rimC = new THREE.DirectionalLight(0x8a7bff, 0.9); rimC.position.set(2.2, 1.6, -1.8); S.add(rimC);
    const nightK = t => eo(pr(t, C.S5 + 0.3, C.S6 - 0.4));

    // ================= STYLE LOOKS (pixel / neon / anime flashes in step 4) =================
    const ST = ['pixel', 'voxel', 'comic', 'paper', 'neon', 'toon', 'dio', 'toy', 'code'], SID = n => ST.indexOf(n);
    const grad = n => { const d = new Uint8Array(n * 4); for (let i = 0; i < n; i++) { const v = Math.round(255 * Math.pow((i + 0.6) / n, 0.9)); d.set([v, v, v, 255], i * 4); } const t = new THREE.DataTexture(d, n, 1); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; };
    const G3 = grad(3);
    const REG = []; S.traverse(o => { if (o.isMesh && !o.isInstancedMesh) REG.push({ o, m: o.material }); });
    const alt = new Map();
    const lookOf = (m, style) => { const key = m.uuid + style; if (alt.has(key)) return alt.get(key); let r = m;
      const base = { color: m.color ? m.color.clone() : new THREE.Color(1, 1, 1), map: m.map || null, transparent: m.transparent, opacity: m.opacity, side: m.side, depthWrite: m.depthWrite };
      if (style === 'toon' && !m.isMeshBasicMaterial) { const hs = {}; base.color.getHSL(hs); if (hs.l < 0.16) base.color.setHSL(hs.h, Math.min(hs.s, 0.3), 0.15); }
      if (!m.isMeshBasicMaterial) { if (style === 'toon') r = new THREE.MeshToonMaterial({ ...base, gradientMap: G3 }); else if (style === 'neon') r = new THREE.MeshBasicMaterial({ ...base, map: null, color: base.color.clone().multiplyScalar(0.018).add(new THREE.Color(0.01, 0.003, 0.022)) }); }
      alt.set(key, r); return r; };
    const gridG = new THREE.BufferGeometry(), gp = [];
    for (let i = -24; i <= 24; i++) gp.push(i * 0.25, 0.01, -1.6, i * 0.25, 0.01, 6); for (let j = 0; j <= 30; j++) gp.push(-6, 0.01, -1.6 + j * 0.25, 6, 0.01, -1.6 + j * 0.25);
    gridG.setAttribute('position', new THREE.Float32BufferAttribute(gp, 3));
    const grid = new THREE.LineSegments(gridG, new THREE.LineBasicMaterial({ color: new THREE.Color(0xff2fd0).multiplyScalar(0.55), toneMapped: false, fog: false, transparent: true, opacity: 0.8 })); grid.visible = false; S.add(grid);
    let curStyle = null; const BG0 = S.background.clone(), FOG0 = S.fog;
    const NOEDGE = []; S.traverse(o => { if (o.isPoints || o.isSprite || (o.isMesh && o.material.transparent && o.material.depthWrite === false)) NOEDGE.push(o); });
    const applyStyle = st => { if (st === curStyle) return; curStyle = st;
      REG.forEach(({ o, m }) => { o.material = (st === 'toy' || st === 'pixel') ? m : lookOf(m, st); });
      grid.visible = st === 'neon'; S.background = st === 'neon' ? new THREE.Color(0x0a0018) : BG0; S.fog = FOG0; };
    const W2 = W, H2 = H;
    const rtMain = new THREE.WebGLRenderTarget(W2, H2, { type: THREE.HalfFloatType, samples: 4 }); rtMain.depthTexture = new THREE.DepthTexture(W2, H2);
    const rtNorm = new THREE.WebGLRenderTarget(W2, H2, { samples: 0 });
    const bloom = new POST.UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.5, 0.6, 0.97);
    const normMat = new THREE.MeshNormalMaterial(); const oCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postU = { tC: { value: rtMain.texture }, tD: { value: rtMain.depthTexture }, tN: { value: rtNorm.texture }, res: { value: new THREE.Vector2(W, H) },
      st: { value: 7 }, time: { value: 0 }, glitch: { value: 0 }, flash: { value: 0 }, near: { value: 0.1 }, far: { value: 600 }, expo: { value: 1.0 }, swirl: { value: 0 } };
    const postM = new THREE.ShaderMaterial({ uniforms: postU, depthTest: false, depthWrite: false, toneMapped: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `
        precision highp float; varying vec2 vUv;
        uniform sampler2D tC, tD, tN; uniform vec2 res; uniform float st, time, glitch, flash, near, far, expo, swirl;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float lin(float d){ return near * far / (far - d * (far - near)); }
        vec3 aces(vec3 x){ x *= expo; return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0., 1.); }
        vec3 srgb(vec3 c){ c = clamp(c, 0., 1.); return mix(c*12.92, 1.055*pow(c, vec3(1./2.4))-0.055, step(0.0031308, c)); }
        vec3 sat(vec3 c, float s){ float l = dot(c, vec3(0.299, 0.587, 0.114)); return mix(vec3(l), c, s); }
        vec3 col(vec2 uv){ return texture2D(tC, uv).rgb; }
        float edge(vec2 uv, float r){ vec2 o = r / res; float d = lin(texture2D(tD, uv).r); vec3 n = texture2D(tN, uv).rgb * 2. - 1.; float e = 0.;
          for (int i = 0; i < 4; i++) { vec2 dir = i == 0 ? vec2(1,0) : i == 1 ? vec2(-1,0) : i == 2 ? vec2(0,1) : vec2(0,-1);
            vec2 q = uv + o * dir; float dq = lin(texture2D(tD, q).r); vec3 nq = texture2D(tN, q).rgb * 2. - 1.;
            e = max(e, step(0.04 * min(d, dq) + 0.006, abs(dq - d))); e = max(e, step(0.42, 1. - dot(n, nq))); } return e; }
        float bayer(vec2 p){ p = mod(p, 4.); int x = int(p.x), y = int(p.y); int i = x + y * 4;
          float m[16]; m[0]=0.;m[1]=8.;m[2]=2.;m[3]=10.;m[4]=12.;m[5]=4.;m[6]=14.;m[7]=6.;m[8]=3.;m[9]=11.;m[10]=1.;m[11]=9.;m[12]=15.;m[13]=7.;m[14]=13.;m[15]=5.;
          float v = 0.; for (int k = 0; k < 16; k++) if (k == i) v = m[k]; return v / 16.; }
        void main(){
          vec2 uv = vUv;
          if (swirl > 0.) { vec2 p = (uv - vec2(0.5, 0.55)) * vec2(1., 1.78); float r = length(p), a = atan(p.y, p.x) + swirl * 2.2 * exp(-r * 2.2); uv = vec2(0.5, 0.55) + vec2(cos(a), sin(a)) * r / vec2(1., 1.78); }
          if (glitch > 0.) { float row = floor(uv.y * 46.), h = hash(vec2(row, floor(time * 30.))); uv.x += (h - 0.5) * 0.16 * glitch * step(0.45, h); }
          vec3 c;
          if (st < 0.5) { vec2 cells = vec2(135., 240.), cell = floor(uv * cells), cuv = (cell + 0.5) / cells;
            c = aces(col(cuv)); c = sat(c, 1.35); c = pow(c, vec3(0.92)); float e = edge(cuv, 2.); c *= 1. - 0.7 * e; c = floor(c * 6. + 0.5 + (bayer(cell) - 0.5) * 0.7) / 6.; }
          else if (st > 3.5 && st < 4.5) { c = aces(col(uv)); float e = edge(uv, 1.2), g = edge(uv, 3.5) * 0.55 + edge(uv, 7.) * 0.3;
            vec3 nc = mix(vec3(0.15, 0.95, 1.0), vec3(1.0, 0.25, 0.85), clamp(uv.y * 1.2 - 0.1 + 0.15 * sin(time * 1.3), 0., 1.)); c += nc * (e * 1.15 + g * 0.45); c *= 0.9 + 0.1 * sin(uv.y * res.y * 1.4); }
          else if (st > 4.5 && st < 5.5) { c = aces(col(uv) * 1.15); c = sat(c, 1.35); c = (c - 0.5) * 1.12 + 0.52; float e = edge(uv, 1.3); c = mix(c, vec3(0.07, 0.04, 0.12), e * 0.92); }
          else { c = aces(col(uv)); }
          if (glitch > 0.) { c.r = mix(c.r, aces(col(uv + vec2(0.012 * glitch, 0.))).r, 0.6 * glitch); c.b = mix(c.b, aces(col(uv - vec2(0.012 * glitch, 0.))).b, 0.6 * glitch); }
          vec2 vq = vUv - 0.5; c *= 1. - dot(vq, vq) * 0.55; c += (hash(vUv * res + time) - 0.5) * 0.025; c = mix(c, vec3(1.), flash);
          gl_FragColor = vec4(srgb(c), 1.);
        }` });
    const postScene = new THREE.Scene(); const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postM); quad.frustumCulled = false; postScene.add(quad);
    const hc = document.createElement('canvas'); hc.width = W; hc.height = H; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hudScene = new THREE.Scene(); const hudQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, toneMapped: false, depthTest: false })); hudQ.frustumCulled = false; hudScene.add(hudQ);
    let camRoll = 0;
    const pipeline = () => { const r = K.renderer;
      if (camRoll) { K.cam.rotateZ(camRoll); K.cam.updateMatrixWorld(true); }
      postU.near.value = K.cam.near; postU.far.value = K.cam.far;
      r.setRenderTarget(rtMain); r.clear(); r.render(S, K.cam); bloom.render(r, null, rtMain, 0, false);
      if (['pixel', 'neon', 'toon'].includes(curStyle)) { const bg = S.background, fg = S.fog; NOEDGE.forEach(o => o.userData.v = o.visible); NOEDGE.forEach(o => o.visible = false); grid.userData.v = grid.visible; grid.visible = false;
        S.overrideMaterial = normMat; S.background = new THREE.Color(0.5, 0.5, 1.0); S.fog = null; r.setRenderTarget(rtNorm); r.clear(); r.render(S, K.cam);
        S.overrideMaterial = null; S.background = bg; S.fog = fg; NOEDGE.forEach(o => o.visible = o.userData.v); grid.visible = grid.userData.v; }
      r.setRenderTarget(null); r.clear(); r.render(postScene, oCam); r.autoClear = false; r.render(hudScene, oCam); r.autoClear = true; };
    K.draw = pipeline;

    // ================= HUD helpers =================
    const ACC = '#ffc53d', INK = 'rgba(14,12,24,0.92)', GRN = '#3ddc97', RED = '#ff4d5e';
    const FR = '"Fredoka Light", "Inter Display"', MONO = '"DejaVu Sans Mono"';
    const rr = (x, y, w, hh, r, f, s, lw = 4, c = h) => { c.beginPath(); c.roundRect(x, y, w, hh, r); if (f) { c.fillStyle = f; c.fill(); } if (s) { c.strokeStyle = s; c.lineWidth = lw; c.stroke(); } };
    const txt = (s, x, y, size, col, wgt = 700, al = 'center', font = FR, c = h) => { c.font = `${wgt} ${size}px ${font}`; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y); };
    const otxt = (s, x, y, size, col, lw = 12, stroke = 'rgba(10,8,20,0.92)') => { h.font = `900 ${size}px ${FR}`; h.textAlign = 'center'; h.textBaseline = 'middle'; h.lineJoin = 'round'; h.lineWidth = lw; h.strokeStyle = stroke; h.strokeText(s, x, y); h.fillStyle = col; h.fillText(s, x, y); };
    const pop = (t, a, d = 0.35) => eb(pr(t, a, a + d));
    const scr = v3 => { const p = v3.clone().project(K.cam); return [(p.x * 0.5 + 0.5) * W, (1 - (p.y * 0.5 + 0.5)) * H]; };
    const headW = (o, dy) => { const v = new THREE.Vector3(); o.getWorldPosition(v); v.y += dy; return v; };
    const fmt = n => Math.round(n).toLocaleString('en-US');
    // the potato, drawn flat (for the doc card cameo)
    const potato2D = (c, x, y, s, t) => { c.save(); c.translate(x, y); c.rotate(Math.sin(t * 3) * 0.08); c.scale(s, s);
      c.fillStyle = '#c28f55'; c.beginPath(); c.ellipse(0, 0, 60, 78, 0.1, 0, 7); c.fill(); c.lineWidth = 6; c.strokeStyle = '#5a3a1e'; c.stroke();
      c.fillStyle = '#8a5d33'; [[22, -36], [-28, 18], [12, 40]].forEach(([a, b]) => { c.beginPath(); c.ellipse(a, b, 8, 5, 0, 0, 7); c.fill(); });
      [-20, 20].forEach(a => { c.fillStyle = '#fff'; c.beginPath(); c.ellipse(a, -14, 14, 17, 0, 0, 7); c.fill(); c.fillStyle = '#111'; c.beginPath(); c.arc(a + 2, -12, 7, 0, 7); c.fill(); });
      c.fillStyle = '#4a1d18'; c.beginPath(); c.ellipse(0, 20, 12, 7 + 4 * Math.abs(Math.sin(t * 9)), 0, 0, 7); c.fill();
      c.fillStyle = '#2a1c15'; c.beginPath(); c.ellipse(4, -80, 16, 10, -0.4, 0, 7); c.fill(); c.restore(); };

    // ================= WALL SCREEN CONTENT =================
    const scr2 = (t) => { const c = sx, w = 1024, hh = 576;
      c.fillStyle = '#0b0d16'; c.fillRect(0, 0, w, hh);
      const st = stepAt(t), n = st ? st[1] : 0;
      // top bar
      c.fillStyle = '#151a2a'; c.fillRect(0, 0, w, 56); ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((cc, i) => { c.fillStyle = cc; c.beginPath(); c.arc(30 + i * 30, 28, 9, 0, 7); c.fill(); });
      const title = t >= C.CTA ? 'the_full_guide.doc' : ['studio.app', 'script.txt', 'maddie_3d.obj', 'voice_test.wav', 'styles.glsl', 'render.mp4', 'insights'][n];
      txt(title, w / 2, 29, 26, '#9fb0d8', 700, 'center', MONO, c);
      if (t < C.S1) {                                           // REC + thumbnails mosaic
        for (let i = 0; i < 8; i++) { const x = 40 + (i % 4) * 240, y = 90 + Math.floor(i / 4) * 230; const g = c.createLinearGradient(x, y, x + 220, y + 210); g.addColorStop(0, `hsl(${(i * 47 + t * 20) % 360},65%,45%)`); g.addColorStop(1, `hsl(${(i * 47 + 120) % 360},65%,25%)`); c.fillStyle = g; c.beginPath(); c.roundRect(x, y, 220, 210, 16); c.fill();
          c.fillStyle = 'rgba(255,255,255,0.85)'; c.beginPath(); c.moveTo(x + 95, y + 80); c.lineTo(x + 95, y + 130); c.lineTo(x + 135, y + 105); c.fill(); }
        if (Math.floor(t * 2) % 2 === 0) { c.fillStyle = '#ff3040'; c.beginPath(); c.arc(w - 130, 28, 10, 0, 7); c.fill(); } txt('REC', w - 90, 29, 24, '#ff8a92', 900, 'center', MONO, c);
      } else if (n === 1) {                                      // script typing, then a giant BUILD
        const L1 = ['SCENE 1: couch. night.', 'MADDIE: Everyone\'s asking...', 'CLAUDE: Should we tell them', '        the truth?', '', '> '];
        const k = (t - C.S1) * 38; let left = k; L1.forEach((ln, i) => { if (left <= 0) return; const s = ln.slice(0, Math.floor(left)); left -= ln.length + 4; txt(s, 50, 110 + i * 62, 34, i === 5 ? ACC : '#d8e2ff', 600, 'left', MONO, c); });
        if (t >= C.BUILD) { const kb = pop(t, C.BUILD, 0.3); c.save(); c.translate(w / 2, 330); c.scale(kb, kb); c.shadowColor = ACC; c.shadowBlur = 40; txt('build', 0, 0, 170, ACC, 900, 'center', MONO, c); c.restore(); }
      } else if (n === 2) {                                      // wireframe model card: v1 -> v2
        c.strokeStyle = 'rgba(80,140,255,0.25)'; c.lineWidth = 2; for (let i = 0; i < 20; i++) { c.beginPath(); c.moveTo(i * 54, 60); c.lineTo(i * 54, hh); c.stroke(); c.beginPath(); c.moveTo(0, 60 + i * 30); c.lineTo(w, 60 + i * 30); c.stroke(); }
        const v2 = t >= C.POTOFF; txt(v2 ? 'MADDIE v2.0' : 'MADDIE v1.0', w / 2, 140, 64, v2 ? GRN : '#ff9b9b', 900, 'center', MONO, c);
        txt(v2 ? 'arms: 2   legs: 2   face: yes' : 'arms: 0   legs: ?   shape: potato', w / 2, 230, 36, '#d8e2ff', 600, 'center', MONO, c);
        if (!v2 && t >= C.POT) potato2D(c, w / 2, 400, 1.3, t); else { c.strokeStyle = GRN; c.lineWidth = 5; c.beginPath(); c.arc(w / 2, 340, 50, 0, 7); c.stroke(); c.beginPath(); c.roundRect(w / 2 - 60, 395, 120, 130, 30); c.stroke(); c.beginPath(); c.moveTo(w / 2 - 60, 420); c.lineTo(w / 2 - 120, 500); c.moveTo(w / 2 + 60, 420); c.lineTo(w / 2 + 120, 500); c.stroke(); }
      } else if (n === 3) {                                      // waveform
        const deep = t < C.KID, kid = t >= C.KID && t < C.FIX, lv = Math.max(K.voice('claude', t), K.voice('maddie', t));
        txt(deep ? 'VOICE: "deep robot"' : kid ? 'VOICE: "age 5"' : 'VOICE: v2  ✓', w / 2, 120, 50, deep ? '#ff9b9b' : kid ? '#ffd27a' : GRN, 900, 'center', MONO, c);
        for (let i = 0; i < 60; i++) { const a = (0.15 + lv * 0.85) * (0.4 + 0.6 * Math.abs(Math.sin(i * (kid ? 1.9 : deep ? 0.45 : 0.9) + t * (kid ? 26 : deep ? 7 : 14)))); const bh = 20 + a * 300; c.fillStyle = deep ? '#ff6b7a' : kid ? ACC : GRN; c.fillRect(52 + i * 15.4, 360 - bh / 2, 9, bh); }
      } else if (n === 4) {                                      // style swatches
        const names = [['PIXEL', '#4fd8ff'], ['NEON', '#ff4fd8'], ['ANIME', '#ff9bd0']]; const cur = t >= C.AN ? 2 : t >= C.NE ? 1 : t >= C.PX ? 0 : -1;
        names.forEach(([s, cc], i) => { const x = 90 + i * 300; rr(x, 140, 250, 300, 24, i === cur ? cc : '#1d2236', i === cur ? '#fff' : 'rgba(255,255,255,0.15)', 5, c); txt(s, x + 125, 290, 52, i === cur ? '#111' : '#8e9ac0', 900, 'center', FR, c); });
      } else if (n === 5) {                                      // render progress
        const p = cl(pr(t, C.S5 + 0.3, C.S6 - 0.2)), f = Math.floor(p * 1084);
        txt('RENDERING…', w / 2, 140, 64, '#d8e2ff', 900, 'center', MONO, c);
        rr(90, 240, 844, 70, 35, '#1d2236', 'rgba(255,255,255,0.2)', 3, c); rr(96, 246, Math.max(58, 832 * p), 58, 29, ACC, null, 0, c);
        txt(`frame ${String(f).padStart(4, '0')} / 1084`, w / 2, 380, 40, '#9fb0d8', 600, 'center', MONO, c);
        txt(`ETA ${Math.max(0, Math.round(90 * (1 - p)))} min`, w / 2, 450, 40, '#ff9b9b', 700, 'center', MONO, c);
      } else if (n === 6) {                                      // views
        const big = t >= C.BIG, v = big ? 69 + (13025 - 69) * eo(pr(t, C.BIG + 0.15, C.BIG + 1.3)) : 69;
        txt(fmt(v), w / 2, 260, big ? 190 : 170, big ? ACC : '#8e9ac0', 900, 'center', FR, c); txt('views', w / 2, 400, 54, '#d8e2ff', 700, 'center', FR, c);
      } else if (t >= C.CTA) {                                   // the doc
        c.fillStyle = '#f4efe4'; c.beginPath(); c.roundRect(300, 80, 424, 470, 16); c.fill(); txt('HOW WE MAKE REELS', w / 2, 140, 34, '#1b1e2a', 900, 'center', FR, c);
        for (let i = 0; i < 6; i++) { txt(`${i + 1}`, 345, 210 + i * 52, 30, '#c2452d', 900, 'center', FR, c); c.fillStyle = '#c9c1b0'; c.fillRect(380, 202 + i * 52, 280 - (i % 3) * 50, 16); }
      }
      scTex.needsUpdate = true; };

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const smv = (a, b, k) => a + (b - a) * k;
    const toR = [0.62, 0.05], toCam = [-0.14, 0.02], up = [0.05, -0.38], scrL = [0.2, -0.42];
    const P0 = { L: [-0.3, 0, -0.05, -0.1], R: [-0.3, 0, 0.05, -0.1] };
    const POSE = { rest: P0, shrug: { L: [-0.55, 0.1, -0.55, -1.25], R: [-0.55, -0.1, 0.55, -1.25] }, both: { L: [-2.7, 0.15, -0.45, -0.35], R: [-2.7, -0.15, 0.45, -0.35] },
      point: { L: [-0.3, 0, -0.05, -0.1], R: [-1.45, -0.18, 0.0, -0.08] }, chin: { L: [-0.3, 0, -0.05, -0.1], R: [-1.15, -0.55, 0.1, -2.0] },
      cheeks: { L: [-1.35, 0.55, -0.2, -2.1], R: [-1.35, -0.55, 0.2, -2.1] }, type: { L: [-0.7, 0.2, -0.1, -0.6], R: [-0.7, -0.2, 0.1, -0.6] }, slump: { L: [0.1, 0, -0.2, -0.05], R: [0.1, 0, 0.2, -0.05] },
      wave: { L: [-0.3, 0, -0.05, -0.1], R: [-2.35, -0.3, 0.55, -0.9] } };
    let curPose = JSON.parse(JSON.stringify(P0));
    const acting = (t) => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 || Math.abs(t - last) > 0.2 ? 1 : cl((t - last) * 5); last = t;
      let mL = toR, face = 'neutral', lean = 0.1, pose = 'rest', bounce = 0, typing = 0, rL = [-0.35, 0.05], mood = 'calm';
      if (t < C.S1) { mL = toR; face = t < C.NICE ? (t < B('hook2') ? 'smile' : 'neutral') : 'worried'; pose = t < C.NICE ? 'rest' : 'chin'; rL = [-0.45, 0.06]; mood = t < B('hook2') + 0.4 ? 'calm' : 'wink'; lean = -0.05; }
      else if (t < C.S2) { const bld = t >= B('s1b'); mL = t < B('s1b') ? toCam : t < B('s1c') ? toR : toCam; face = t >= B('s1c') ? 'smile' : 'neutral'; pose = t < B('s1b') ? 'type' : t < B('s1c') ? 'rest' : 'shrug'; typing = t < B('s1b') ? 1 : 0; rL = bld ? [-0.45, 0.06] : [0.3, -0.1]; mood = t >= C.BUILD ? 'smile' : 'calm'; bounce = t >= B('s1c') ? 0.6 : 0; }
      else if (t < C.S3) { mL = t < C.POT ? toCam : t < C.POTOFF ? toCam : toR; face = t < C.POT ? 'smile' : 'worried'; pose = t < C.POT ? 'point' : 'rest'; rL = [-0.5, 0.05]; mood = t >= B('s2b') ? 'flat' : 'smile'; lean = -0.05; }
      else if (t < C.S4) { const kid = t >= C.KID && t < C.FIX; mL = t < C.KID ? toR : kid ? toCam : toR; face = t < C.KID ? 'shock' : kid ? 'shock' : 'smile'; pose = kid ? 'cheeks' : t < C.KID ? 'rest' : 'rest'; lean = kid ? -0.25 : 0.05; rL = [-0.45, 0.04]; mood = t < C.KID ? 'stern' : kid ? 'wide' : 'smile'; bounce = kid ? 0.8 : 0; }
      else if (t < C.S5) { const dz = t >= C.DIZ; mL = dz ? [0.25 * Math.sin(t * 7), -0.2 + 0.08 * Math.sin(t * 5)] : toCam; face = dz ? 'worried' : 'smile'; pose = dz ? 'cheeks' : t >= C.PX ? 'both' : 'rest'; bounce = dz ? 0 : t >= C.PX ? 1.2 : 0; rL = [-0.45, 0.05]; mood = dz ? 'flat' : 'happy'; }
      else if (t < C.S6) { const q = t >= C.S5Q && t < B('s5d') - 0.05; mL = t < B('s5b') ? scrL : q ? toR : t >= B('s5d') ? toR : scrL; face = q ? 'shock' : t >= B('s5d') ? 'worried' : 'neutral'; pose = q ? 'both' : t >= B('s5d') + 0.5 ? 'slump' : 'chin'; lean = q ? -0.2 : t >= B('s5d') + 0.5 ? 0.35 : 0.05; rL = t >= B('s5d') ? [-0.45, 0.05] : [0.2, -0.3]; mood = t >= B('s5d') ? 'smile' : 'calm'; }
      else if (t < C.CTA) { const fam = t >= C.FAME; mL = t < C.BIG ? scrL : fam ? toCam : scrL; face = t < C.BIG ? 'worried' : 'shock'; if (fam) face = mT > 0.05 ? 'shock' : 'smile'; pose = t < C.BIG ? 'slump' : fam ? 'both' : 'rest'; lean = t < C.BIG ? 0.35 : -0.15; bounce = fam ? 1.6 : 0; rL = t < C.BIG ? [0.2, -0.3] : [-0.45, 0.05]; mood = t < C.BIG ? 'flat' : 'happy'; }
      else { mL = t < B('cta2') ? toR : t < C.CTAP ? toR : toCam; face = t >= B('cta2') && t < C.CTAP ? 'worried' : 'smile'; pose = t >= C.CTAP + 0.5 ? 'wave' : 'rest'; rL = t < B('cta2') ? [0.25, 0.02] : [-0.45, 0.05]; mood = t >= C.CTAP ? 'wink' : 'smile'; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = smv(mYaw, mL[0], k); mPitch = smv(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], lean, type: typing });
      const tgt = POSE[pose]; ['L', 'R'].forEach(s => { for (let i = 0; i < 4; i++) curPose[s][i] = smv(curPose[s][i], tgt[s][i], k); });
      const [aL, aR] = M.arms; const bx = pose === 'both' ? 0.18 * Math.sin(t * 13) : 0, ty = typing ? 0.12 * Math.sin(t * 22) : 0, wv = pose === 'wave' ? 0.3 * Math.sin(t * 9) : 0;
      aL.sh.rotation.set(curPose.L[0] + bx + ty, curPose.L[1], curPose.L[2]); aL.el.rotation.x = curPose.L[3];
      aR.sh.rotation.set(curPose.R[0] + bx - ty, curPose.R[1], curPose.R[2] + wv); aR.el.rotation.x = curPose.R[3];
      M.g.position.y = bounce * 0.025 * Math.abs(Math.sin(t * 9));
      if (t >= C.DIZ && t < C.S5) M.head.rotation.z += 0.12 * Math.sin(t * 6);
      // potato swap (version 1)
      const potOn = t >= C.POT && t < C.POTOFF; POT.visible = potOn; M.g.visible = !potOn;
      if (potOn) { const pk = eb(pr(t, C.POT, C.POT + 0.3)); POT.scale.setScalar(0.6 + 0.4 * pk); POT.rotation.z = Math.sin(t * 3) * 0.05; pMouth.scale.set(1, 0.2 + mT * 1.2, 0.35); const bl = ((t + 0.2) % 2.6) < 0.12 ? 0.1 : 1; pEyes.forEach(e => e.scale.y = bl);
        if (t >= B('s2c')) { potB.rotation.z = 0.06 * Math.sin(t * 8) * mT; } }
      rYaw = smv(rYaw, rL[0], k); rPitch = smv(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.z += 0.2 * K.pulse(t, B('hook2'), 0.8) + 0.18 * K.pulse(t, B('s5d'), 0.7) + 0.15 * K.pulse(t, C.CTAP, 0.7);
      R.head.rotation.x += 0.14 * K.pulse(t, C.BUILD, 0.45) + 0.12 * K.pulse(t, B('s3c'), 0.5);
      R.g.position.y = 0.92 + 0.06 * K.pulse(t, C.BIG, 0.8) + 0.04 * K.pulse(t, C.CTA, 0.8);
      R.g.rotation.y = -0.25 + 0.6 * K.pulse(t, B('s3c'), 0.9);                                                  // proud little spin on "fixed it"
      // the studio over time: sunset -> night during the render, snacks vanish
      const nk = nightK(t); winNight.material.opacity = nk; sunL.intensity = 2.2 * (1 - nk); scL.color.setHSL(0.6, 0.6, 0.6); hemi.intensity = 0.34 - 0.08 * nk;
      const eaten = Math.floor(cl(pr(t, C.S5 + 0.4, C.S6 - 0.5)) * CHIPS.length); CHIPS.forEach((c, i) => c.visible = i >= eaten);
      onAirL.intensity = 0.5 + 0.2 * Math.sin(t * 3); motes.rotation.y = t * 0.02;
      ringMesh.material.color.setScalar(1);
    };

    // ================= CAMERA =================
    const Pp = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [MX + 0.04, 1.36, MZ], RHL = [0.5, 1.2, -0.68];
    const sh = {
      hook: [Pp([0.12, 1.55, 3.05], [0.08, 1.5, -1.0], 38), Pp([0.1, 1.5, 2.55], [0.08, 1.45, -1.0], 38)],
      s1: [Pp([-0.75, 1.42, 1.9], [-0.05, 1.5, -1.2], 36), Pp([-0.62, 1.42, 1.65], [-0.05, 1.5, -1.2], 36)],
      robo: [Pp([0.32, 1.28, 1.42], RHL, 30), Pp([0.34, 1.28, 1.22], RHL, 30)],
      mad: [Pp([-0.1, 1.38, 1.3], MHL, 32), Pp([-0.12, 1.38, 1.08], MHL, 32)],
      madL: [Pp([0.02, 1.4, 1.6], [MX + 0.2, 1.3, MZ], 36), Pp([0.0, 1.4, 1.4], [MX + 0.2, 1.3, MZ], 36)],
      wide2L: [Pp([0.24, 1.5, 3.0], [0.2, 1.4, -1.0], 40), Pp([0.22, 1.48, 2.7], [0.2, 1.38, -1.0], 40)],
      two: [Pp([0.15, 1.35, 2.1], [0.05, 1.2, -0.75], 34), Pp([0.12, 1.35, 1.85], [0.05, 1.22, -0.75], 34)],
      potato: [Pp([-0.3, 1.0, 1.0], [MX, 0.95, MZ], 36), Pp([-0.3, 1.0, 0.82], [MX, 0.95, MZ], 36)],
      styles: [Pp([0.15, 1.42, 2.45], [0.05, 1.25, -0.8], 36), Pp([0.1, 1.42, 2.15], [0.05, 1.25, -0.8], 36)],
      wide: [Pp([0.75, 1.6, 3.2], [0.35, 1.5, -1.2], 40), Pp([0.6, 1.58, 2.8], [0.35, 1.5, -1.2], 40)],
      wide2: [Pp([0.12, 1.5, 2.9], [0.06, 1.42, -1.0], 38), Pp([0.12, 1.48, 2.5], [0.06, 1.4, -1.0], 38)],
      cta: [Pp([0.24, 1.45, 2.9], [0.22, 1.22, -0.75], 40), Pp([0.22, 1.44, 2.65], [0.2, 1.22, -0.75], 40)],
    };
    const plan = [
      [0, C.S1, sh.hook], [C.S1, B('s1b') - 0.1, sh.s1], [B('s1b') - 0.1, B('s1c') - 0.1, sh.robo], [B('s1c') - 0.1, C.S2, sh.mad],
      [C.S2, C.POT, sh.two], [C.POT, C.S3, sh.potato], [C.S3, C.KID, sh.robo], [C.KID, C.FIX, sh.mad], [C.FIX, C.S4, sh.robo],
      [C.S4, C.S5, sh.styles], [C.S5, C.S5Q, sh.wide], [C.S5Q, B('s5d') - 0.1, sh.mad], [B('s5d') - 0.1, C.S6, sh.robo],
      [C.S6, C.BIG, sh.madL], [C.BIG, C.CTA, sh.wide2L], [C.CTA, D + 5, sh.cta],
    ];
    const smooth = q => q * q * (3 - 2 * q);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth, shake: [C.POT, C.KID, C.BIG, C.S5Q].includes(a) ? (t => 0.01 * Math.exp(-(t - a) * 5)) : null }));

    // ================= HUD =================
    const stepChip = (t, st) => { const [a, n, label] = st, k = pop(t, a, 0.32);
      h.save(); h.translate(W / 2 + 40, 205); h.scale(k, k); rr(-300, -70, 600, 140, 34, INK, 'rgba(255,255,255,0.25)', 3);
      txt(`STEP ${n}`, -40, -30, 30, 'rgba(255,255,255,0.65)', 800); txt(label, -40, 22, 66, '#fff', 900); h.restore();
      const kb = pop(t, a + 0.06, 0.3) * (1 + 0.3 * (1 - eo(pr(t, a + 0.06, a + 0.45)))); h.save(); h.translate(W / 2 - 260, 195); h.rotate(-0.08); h.scale(kb, kb);
      h.beginPath(); h.arc(0, 0, 74, 0, 7); h.fillStyle = ACC; h.fill(); h.lineWidth = 8; h.strokeStyle = '#141414'; h.stroke(); txt(String(n), 0, 6, 104, '#141414', 900); h.restore();
      // progress pips under the chip
      for (let i = 1; i <= 6; i++) { h.beginPath(); h.arc(W / 2 - 125 + i * 36, 300, i === n ? 11 : 8, 0, 7); h.fillStyle = i < n ? GRN : i === n ? ACC : 'rgba(255,255,255,0.3)'; h.fill(); } };
    const sticker = (t, a, s, x, y, rot, bg, fg, size = 54, padX = 34) => { const k = pop(t, a, 0.3); if (k <= 0) return; h.save(); h.translate(x, y); h.rotate(rot); h.scale(k, k);
      h.font = `900 ${size}px ${FR}`; const w = h.measureText(s).width + padX * 2; h.shadowColor = 'rgba(0,0,0,0.45)'; h.shadowBlur = 18; h.shadowOffsetY = 6; rr(-w / 2, -size * 0.85, w, size * 1.7, 22, bg, '#141414', 6); h.shadowColor = 'transparent'; txt(s, 0, 4, size, fg, 900); h.restore(); };
    const stamp = (t, a, s, x, y, rot, col, size = 92) => { const k = a > t ? 0 : 1 + 1.4 * (1 - eo(pr(t, a, a + 0.22))); if (!k) return; h.save(); h.translate(x, y); h.rotate(rot); h.scale(k, k); h.globalAlpha = cl((t - a) / 0.12);
      h.font = `900 ${size}px ${FR}`; const w = h.measureText(s).width + 50; h.lineWidth = 10; h.strokeStyle = col; h.strokeRect(-w / 2, -size * 0.75, w, size * 1.5); txt(s, 0, 6, size, col, 900); h.restore(); };
    const tag = (t, a, s, anchor, dx, dy, col = ACC) => { const k = pop(t, a, 0.3); if (k <= 0) return; const [x, y] = scr(anchor);
      h.globalAlpha = k; h.strokeStyle = '#fff'; h.lineWidth = 4; h.beginPath(); h.moveTo(x, y); h.lineTo(x + dx * 0.6, y + dy); h.lineTo(x + dx, y + dy); h.stroke();
      h.font = `900 44px ${FR}`; const w = h.measureText(s).width + 50, bx = dx > 0 ? x + dx : x + dx - w; rr(bx, y + dy - 40, w, 80, 20, INK, col, 4); txt(s, bx + w / 2, y + dy + 2, 44, col, 900); h.globalAlpha = 1; };
    const hookTitle = (t) => {                                  // no big title: only two small joke stickers
      if (t >= B('hook2') + 0.5) sticker(t, B('hook2') + 0.5, 'the TRUTH?', 300, 250, -0.07, '#fff', '#141414', 50);
      if (t >= C.NICE + 0.3) { const k2 = pop(t, C.NICE + 0.3, 0.2); h.strokeStyle = RED; h.lineWidth = 12 * k2; h.beginPath(); h.moveTo(140, 232); h.lineTo(460, 270); h.stroke(); sticker(t, C.NICE + 0.5, 'the NICE version ✨', 700, 330, 0.06, ACC, '#141414', 52); } };
    const keyCap = (t) => { const a = C.BUILD - 0.25; if (t < a || t > B('s1c') + 0.8) return; const k = pop(t, a, 0.3), press = K.pulse(t, C.BUILD, 0.35);
      h.save(); h.translate(W / 2, 620 + press * 18); h.scale(k, k); rr(-230, -60, 460, 160, 34, '#2a2b33'); rr(-230, -86 + press * 18, 460, 160, 34, '#f4efe4', '#141414', 6); txt('BUILD', 0, -6 + press * 18, 92, '#141414', 900, 'center', MONO); h.restore();
      if (t >= C.BUILD) for (let i = 0; i < 10; i++) { const a2 = i * 0.63, r = 260 + eo(pr(t, C.BUILD, C.BUILD + 0.5)) * 140; h.globalAlpha = 1 - pr(t, C.BUILD + 0.2, C.BUILD + 0.7); h.fillStyle = i % 2 ? ACC : '#fff'; h.fillRect(W / 2 + Math.cos(a2) * r - 8, 620 + Math.sin(a2) * r * 0.6 - 8, 16, 16); h.globalAlpha = 1; }
      if (t >= B('s1c')) sticker(t, B('s1c') + 0.3, 'very powerful.', W / 2 + 150, 820, 0.08, '#fff', '#141414', 44); };
    const voiceHud = (t) => { sticker(t, C.S3 + 0.15, '🎙 VOICE TEST', 290, 400, -0.06, RED, '#fff', 46);
      if (t < C.KID) tag(t, B('s3a') + 0.3, 'BASS: MAX', headW(R.head, 0.2), 120, -200, '#ff9b9b');
      else if (t < C.FIX) tag(t, C.KID + 0.15, 'VOICE AGE: 5', headW(M.head, 0.55), 110, -180, ACC);
      else sticker(t, C.FIX + 0.2, 'FIXED ✓', 760, 520, 0.08, GRN, '#0b2a1a', 64); };
    const styleHud = (t) => { const fl = [[C.PX, 'PIXEL!', '#4fd8ff'], [C.NE, 'NEON!', '#ff4fd8'], [C.AN, 'ANIME!', '#ff9bd0']];
      fl.forEach(([a, s, c], i) => { const b = i < 2 ? fl[i + 1][0] : C.DIZ; if (t < a || t >= b) return; const k = 1 + 0.5 * (1 - eo(pr(t, a, a + 0.2))); h.save(); h.translate(W / 2, 560); h.rotate((i - 1) * 0.08); h.scale(k, k); otxt(s, 0, 0, 150, c, 18); h.restore(); });
      if (t >= C.DIZ) { const [x, y] = scr(headW(M.head, 0.62)); for (let i = 0; i < 5; i++) { const a2 = t * 6 + i * 1.256; txt('★', x + Math.cos(a2) * 150, y - 30 + Math.sin(a2) * 46, 60, i % 2 ? ACC : '#fff', 900); }
        sticker(t, C.DIZ + 0.1, 'STOP 😵', W / 2, 560, -0.05, RED, '#fff', 84); } };
    const renderHud = (t) => { const p = cl(pr(t, C.S5 + 0.3, C.S6 - 0.2)); const k = pop(t, C.S5 + 0.2, 0.35);
      h.save(); h.translate(W / 2, 450); h.scale(k, k); rr(-420, -90, 840, 180, 30, INK, 'rgba(255,255,255,0.25)', 3);
      txt('RENDERING', -390, -42, 34, 'rgba(255,255,255,0.75)', 800, 'left'); txt(`${Math.floor(p * 100)}%`, 390, -42, 34, ACC, 900, 'right');
      rr(-390, 0, 780, 56, 28, '#262a3d'); rr(-390, 0, Math.max(56, 780 * p), 56, 28, ACC); h.restore();
      // clock (hands spin = time flying)
      if (t >= B('s5b')) { const kc = pop(t, B('s5b'), 0.3); h.save(); h.translate(W - 190, 700); h.scale(kc, kc); h.beginPath(); h.arc(0, 0, 100, 0, 7); h.fillStyle = '#f4efe4'; h.fill(); h.lineWidth = 10; h.strokeStyle = '#141414'; h.stroke();
        for (let i = 0; i < 12; i++) { const a2 = i * Math.PI / 6; h.fillStyle = '#141414'; h.fillRect(Math.cos(a2) * 78 - 4, Math.sin(a2) * 78 - 4, 8, 8); }
        const sp = (t - B('s5b')) * 9; h.strokeStyle = '#141414'; h.lineCap = 'round'; h.lineWidth = 10; h.beginPath(); h.moveTo(0, 0); h.lineTo(Math.sin(sp / 12) * 46, -Math.cos(sp / 12) * 46); h.stroke(); h.lineWidth = 6; h.strokeStyle = RED; h.beginPath(); h.moveTo(0, 0); h.lineTo(Math.sin(sp) * 72, -Math.cos(sp) * 72); h.stroke(); h.restore();
        sticker(t, B('s5b') + 0.25, '1h 30m', W - 190, 850, 0.07, RED, '#fff', 48); }
      if (t >= C.S5Q && t < B('s5d') + 0.2) { const kq = pop(t, C.S5Q, 0.25); h.save(); h.translate(220, 760); h.rotate(-0.12); h.scale(kq, kq); otxt('30 sec?!', 0, 0, 96, ACC, 16); h.restore(); }
      if (t >= B('s5d')) sticker(t, B('s5d') + 0.35, 'LIP SYNC: ON 👄', 330, 760, -0.06, '#fff', '#141414', 46); };
    const postHud = (t) => { const big = t >= C.BIG, k = pop(t, C.S6 + 0.15, 0.35);
      h.save(); h.translate(W - 300, 700); h.scale(k * 0.74, k * 0.74); h.rotate(big ? 0.03 : 0.05);
      rr(-250, -330, 500, 660, 60, '#111', '#2b2b33', 10); rr(-222, -300, 444, 600, 40, big ? '#1a1030' : '#16161c');
      h.beginPath(); h.roundRect(-60, -292, 120, 26, 13); h.fillStyle = '#000'; h.fill();
      txt('your reel', 0, -220, 34, 'rgba(255,255,255,0.6)', 700);
      const v = big ? 69 + (13025 - 69) * eo(pr(t, C.BIG + 0.15, C.BIG + 1.3)) : 69;
      txt(fmt(v), 0, -60, big ? 130 : 150, big ? ACC : '#9aa0b8', 900); txt('views', 0, 40, 46, '#fff', 800);
      if (!big) { txt('😐', 0, 170, 110, '#fff', 400); }
      else { [['554', 'saves'], ['201', 'shares']].forEach(([n, l], i) => { const kk = pop(t, C.BIG + 0.9 + i * 0.2, 0.3); h.save(); h.translate(i ? 105 : -105, 190); h.scale(kk, kk); rr(-95, -55, 190, 110, 26, 'rgba(255,255,255,0.1)', ACC, 3); txt(n, 0, -12, 46, '#fff', 900); txt(l, 0, 30, 26, 'rgba(255,255,255,0.7)', 700); h.restore(); }); }
      h.restore();
      if (big) { const r3 = K.rng(7); for (let i = 0; i < 60; i++) { const ph = (t - C.BIG - 0.2) * (0.6 + r3() * 0.5); if (ph < 0) continue; const x = r3() * W, y = -40 + ph * (600 + r3() * 500) % 1400, s = 10 + r3() * 14; h.save(); h.translate(x, y); h.rotate(ph * 6 + i); h.fillStyle = ['#ffc53d', '#ff4fd8', '#4fd8ff', '#3ddc97', '#fff'][i % 5]; h.fillRect(-s / 2, -s / 4, s, s / 2); h.restore(); } }
      if (t >= C.FAME) sticker(t, C.FAME + 0.1, 'FAMOUS (237 followers)', W / 2, 1170, -0.04, ACC, '#141414', 44); };
    const ctaHud = (t) => { const a = C.CTA; h.fillStyle = `rgba(6,5,12,${0.3 * eo(pr(t, a, a + 0.4))})`; h.fillRect(0, 0, W, H);
      const k = pop(t, a + 0.05, 0.4); h.save(); h.translate(W / 2 + 175, 720); h.rotate(0.03); h.scale(k * 0.78, k * 0.78);
      h.shadowColor = 'rgba(0,0,0,0.5)'; h.shadowBlur = 40; h.shadowOffsetY = 16; rr(-300, -480, 600, 820, 26, '#f4efe4'); h.shadowColor = 'transparent';
      h.fillStyle = '#e1d8c6'; h.beginPath(); h.moveTo(220, -480); h.lineTo(300, -400); h.lineTo(220, -400); h.closePath(); h.fill();
      txt('THE FULL GUIDE', 0, -400, 54, '#1b1e2a', 900); txt('start → end', 0, -340, 34, '#8a7a62', 700);
      ['Script', '3D character', 'Voices', 'Styles', 'Render', 'Post'].forEach((s, i) => { const kk = pop(t, a + 0.35 + i * 0.12, 0.25); const y = -250 + i * 80; h.globalAlpha = kk;
        h.beginPath(); h.arc(-220, y, 24, 0, 7); h.fillStyle = GRN; h.fill(); h.strokeStyle = '#fff'; h.lineWidth = 6; h.beginPath(); h.moveTo(-232, y); h.lineTo(-222, y + 10); h.lineTo(-206, y - 10); h.stroke();
        txt(`${i + 1}. ${s}`, -180, y + 2, 42, '#1b1e2a', 800, 'left'); h.globalAlpha = 1; });
      const kb = pop(t, B('cta1') + 0.9, 0.35); h.save(); h.translate(0, 270); h.scale(kb, kb); h.shadowColor = 'rgba(255,197,61,0.6)'; h.shadowBlur = 40; rr(-250, -58, 500, 116, 30, ACC, '#141414', 6); h.shadowBlur = 0; txt('Comment DOC', 0, 2, 66, '#141414', 900); h.restore();
      h.restore();
      if (t >= C.CTAP) { const kp = pop(t, C.CTAP, 0.35); h.save(); h.translate(W / 2 + 400, 360); h.rotate(0.15); h.scale(kp, kp); rr(-95, -120, 190, 240, 18, '#fff', '#141414', 5); potato2D(h, 0, 0, 1.1, t); txt('v1.0', 0, 95, 30, '#c2452d', 900); h.restore();
        sticker(t, C.CTAP + 0.25, 'included.', W / 2 + 330, 560, 0.08, ACC, '#141414', 40); } };
    const hudDraw = (t) => { h.clearRect(0, 0, W, H);
      if (t < C.S1) hookTitle(t);
      const st = stepAt(t);
      if (st) stepChip(t, st);
      if (st && st[1] === 1) keyCap(t);
      if (st && st[1] === 2 && t >= C.POT) { stamp(t, C.POT + 0.12, 'VERSION 1.0', W / 2, 560, -0.12, RED, 84); if (t >= B('s2b') + 0.6) tag(t, B('s2b') + 0.6, 'ARMS: 0', headW(potB, 0.05), -140, -120, '#ff9b9b'); if (t >= C.POTOFF) sticker(t, C.POTOFF, 'v2.0 ✓ arms!', W / 2, 560, 0.05, GRN, '#0b2a1a', 64); }
      if (st && st[1] === 3) voiceHud(t);
      if (st && st[1] === 4) styleHud(t);
      if (st && st[1] === 5) renderHud(t);
      if (st && st[1] === 6) postHud(t);
      if (t >= C.CTA) ctaHud(t);
      hTex.needsUpdate = true; };

    // ================= UPDATE =================
    const update = t => {
      const st = styleAt(t); applyStyle(st);
      K.shoot(t, shots); acting(t); scr2(t);
      postU.st.value = SID(st); postU.time.value = t;
      postU.glitch.value = cl(CUTS.reduce((m, c) => Math.max(m, 1 - Math.abs(t - c) / 0.11), 0) + Math.max(0, 1 - Math.abs(t - C.POT) / 0.12) + Math.max(0, 1 - Math.abs(t - C.POTOFF) / 0.12));
      postU.flash.value = Math.max(0, 0.5 - Math.abs(t - C.BIG) / 0.1 * 0.5);
      postU.swirl.value = t >= C.DIZ && t < C.S5 ? 0.9 * Math.sin(pr(t, C.DIZ, C.S5) * Math.PI) * (0.6 + 0.4 * Math.sin(t * 5)) : 0;
      camRoll = t >= C.DIZ && t < C.S5 ? 0.1 * Math.sin(t * 6) * Math.sin(pr(t, C.DIZ, C.S5) * Math.PI) : 0;
      K.cam.updateMatrixWorld(true);
      hudDraw(t);
    };

    // ================= SOUND =================
    const sfx = [['pop', B('hook2') + 0.5, 0.2], ['pop', C.NICE + 0.5, 0.25]];
    STEPS.forEach(([a]) => sfx.push(['whoosh', a - 0.1, 0.3], ['pop', a + 0.05, 0.3], ['ding', a + 0.08, 0.15]));
    for (let i = 0; i < 14; i++) sfx.push(['tick', C.S1 + 0.2 + i * 0.11, 0.25]);
    sfx.push(['thud', C.BUILD, 0.7], ['kaching', C.BUILD + 0.02, 0.25], ['boing', B('s1c') + 0.3, 0.25]);
    sfx.push(['zap', C.POT, 0.35], ['boing', C.POT + 0.05, 0.45], ['thud', C.POT + 0.12, 0.6], ['pop', B('s2b') + 0.6, 0.3], ['zap', C.POTOFF, 0.3], ['chime', C.POTOFF + 0.05, 0.3]);
    sfx.push(['bass', B('s3a') + 0.05, 0.5], ['boing', C.KID + 0.1, 0.35], ['chime', C.FIX + 0.2, 0.35]);
    CUTS.forEach(c => sfx.push(['zap', c - 0.02, 0.3])); sfx.push(['coin', C.PX + 0.05, 0.3], ['buzz', C.NE + 0.05, 0.12], ['chime', C.AN + 0.05, 0.3], ['boing', C.DIZ + 0.05, 0.4], ['whoosh', C.DIZ + 0.2, 0.25]);
    sfx.push(['riser', C.S5 + 0.2, 0.15]); for (let i = 0; i < 18; i++) sfx.push(['tick', B('s5b') + i * 0.16, 0.15]);
    sfx.push(['bass', C.S5Q, 0.5], ['pop', B('s5d') + 0.35, 0.3]);
    sfx.push(['thud', B('s6a') + 0.8, 0.35], ['riser', C.BIG - 0.8, 0.2], ['bass', C.BIG, 0.6], ['kaching', C.BIG + 0.1, 0.4]);
    for (let i = 0; i < 8; i++) sfx.push(['pop', C.BIG + 0.2 + i * 0.07, 0.15]);
    sfx.push(['pop', C.FAME + 0.1, 0.3], ['chime', C.CTA + 0.1, 0.3]); for (let i = 0; i < 6; i++) sfx.push(['pop', C.CTA + 0.35 + i * 0.12, 0.15]);
    sfx.push(['kaching', B('cta1') + 0.9, 0.35], ['boing', C.CTAP, 0.4], ['pop', C.CTAP + 0.25, 0.3]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, music: { muteFrom: B('s6a') + 0.6, muteTo: C.BIG - 0.2 }, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
