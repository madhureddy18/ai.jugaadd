/* @maddiee.makess reel 27 — "AI did 3 crazy things this week" (22 Nov 2026). NEW STYLE: real 3D scenes act out each line —
   news studio (Maddie + hover-bot) → hair salon where an AI hologram phones in and books Sat 4 PM → a rainy Hyderabad street that builds
   itself from one typed line (Genie 4), Maddie & the bot end up inside it at a bus stop → a bank vault an AI agent empties ("you pay").
   Voices cloned from Maddyy's graduation reel. No comment keyword: "Follow for AI news every week". */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x0a0f24, fog: [10, 40], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
  lines: window.JR_LINES,

  build(K, T) {
    const L = T.lines, N = L.length;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[typeof id === 'number' ? id : IX(id)].t, E = id => L[typeof id === 'number' ? id : IX(id)].end;
    const D = E(N - 1) + 1.9;
    const cl = K.clamp, eo = K.easeOut, ei = K.easeIn, pr = K.prog, eb = K.easeBack, lerp = K.lerp, ez = K.ease;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const rng = K.rng(27);




    // ================= TIMELINE =================
    const C = { HOOK: 0, ONE: B('one') - 0.12, SALON: B('one') + 1.55, BOOKS: B('books') - 0.1, INDIA: B('india') - 0.1, TELLS: B('tells') - 0.1, TWO: B('two') - 0.12,
      STREET: B('two') + 1.9, INSIDE: B('inside') - 0.1, THREE: B('three') - 0.12, BANK: B('three') + 1.5, SUM: B('sum') - 0.1, CTA: B('cta') - 0.12 };
    const BOOKED = B('books') + (E('books') - B('books')) * 0.62;
    const TYPE0 = B('two') + 1.9, TYPE1 = TYPE0 + 1.3, RISE0 = TYPE1 + 0.15;
    const IN_STREET = t => t >= RISE0 + 0.4 && t < C.THREE;
    const SX = 20, GX = 60, BX = 80;   // salon, street (Genie), bank — far apart so each shot sees only its own set


    // ================= STUDIO (origin) =================
    const DY = 0.74;
    const stFloor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: 0x141a33, roughness: 0.25, metalness: 0.3 })); stFloor.rotation.x = -Math.PI / 2; stFloor.position.set(0, 0, -1); stFloor.receiveShadow = true; S.add(stFloor);
    const stWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), SM(0x111733, 0.8)); stWall.position.set(0, 2.5, -2.6); S.add(stWall);
    const ledTex = K.canvasTex(1024, 512, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#1b2d7a'); g.addColorStop(1, '#5b1f8f'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(255,255,255,0.08)'; for (let i = 0; i < w; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); }
      x.fillStyle = '#fff'; x.font = '900 120px sans-serif'; x.textAlign = 'center'; x.fillText('AI', w / 2, 210); x.fillStyle = '#ffd34a'; x.font = '900 92px sans-serif'; x.fillText('THIS WEEK', w / 2, 330);
      x.fillStyle = 'rgba(255,255,255,0.7)'; x.font = '600 34px sans-serif'; x.fillText('Nov 16 – 22, 2026', w / 2, 400); });
    const ledM = new THREE.MeshBasicMaterial({ map: ledTex, toneMapped: false, color: 0x000000 });
    const led = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.3), ledM); led.position.set(-0.05, 2.0, -2.55); S.add(led);
    rbox(2.76, 1.46, 0.05, SM(0x23283d, 0.4, { metalness: 0.5 }), -0.05, 2.0, -2.6, 0.02);
    const stripM = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x4fb3ff).multiplyScalar(1.6), toneMapped: false });
    [-2.0, 1.9].forEach(x => { const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.6, 0.04), stripM); s2.position.set(x, 1.5, -2.5); S.add(s2); });
    rbox(1.1, 0.06, 0.36, SM(0x2c3350, 0.5), -0.2, 0.5, -0.98, 0.02); [-0.65, 0.25].forEach(x => cyl(0.02, 0.02, 0.48, SM(0x9aa3ab, 0.3, { metalness: 0.7 }), x, 0.24, -0.98, 8));
    cyl(0.26, 0.3, DY, SM(0x23283d, 0.4, { metalness: 0.5 }), 0.36, DY / 2, -0.45, 32);
    const podRing = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.012, 8, 40), stripM); podRing.rotation.x = Math.PI / 2; podRing.position.set(0.36, DY + 0.005, -0.45); S.add(podRing);
    const spotA = new THREE.SpotLight(0xffffff, 2.2, 8, 0.5, 0.6, 1.2); spotA.position.set(0.0, 3.6, 1.4); spotA.target.position.set(0, 1, -0.8); S.add(spotA); S.add(spotA.target);

    // ================= SALON (x = SX): an AI hologram phones the shop =================
    const salon = new THREE.Group(); salon.position.x = SX; S.add(salon);
    const sTile = K.canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#efe6dc'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(0,0,0,0.12)'; x.lineWidth = 2; x.strokeRect(0, 0, 64, 64); x.strokeRect(64, 64, 64, 64); });
    sTile.wrapS = sTile.wrapT = THREE.RepeatWrapping; sTile.repeat.set(6, 6);
    const sf = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshStandardMaterial({ map: sTile, roughness: 0.4 })); sf.rotation.x = -Math.PI / 2; sf.position.z = -1; sf.receiveShadow = true; salon.add(sf);
    const sw = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), SM(0xd99aa6, 0.9)); sw.position.set(0, 2, -2.2); salon.add(sw);
    const signTex = K.canvasTex(512, 128, (x, w, h) => { x.fillStyle = '#2b1d2f'; x.fillRect(0, 0, w, h); x.fillStyle = '#ffb3c7'; x.font = '800 54px sans-serif'; x.textAlign = 'center'; x.fillText('GLOW SALON', w / 2, 62); x.fillStyle = '#fff'; x.font = '500 28px sans-serif'; x.fillText('Hyderabad · since 2009', w / 2, 104); });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.35), new THREE.MeshBasicMaterial({ map: signTex, toneMapped: false })); sign.position.set(-0.6, 2.35, -2.18); salon.add(sign);
    const mirror = new THREE.Mesh(new THREE.CircleGeometry(0.42, 40), new THREE.MeshStandardMaterial({ color: 0xcfe0ee, roughness: 0.05, metalness: 0.9 })); mirror.position.set(1.3, 1.55, -2.18); salon.add(mirror);
    const mirFrame = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.03, 10, 40), SM(0xd4a84b, 0.3, { metalness: 0.7 })); mirFrame.position.copy(mirror.position); salon.add(mirFrame);
    rbox(0.55, 0.12, 0.55, SM(0x1f1f24, 0.4), 1.3, 0.55, -1.5, 0.05, salon); rbox(0.55, 0.6, 0.12, SM(0x1f1f24, 0.4), 1.3, 0.9, -1.75, 0.05, salon); cyl(0.05, 0.12, 0.5, SM(0xaab0b8, 0.3, { metalness: 0.8 }), 1.3, 0.25, -1.5, 16, salon);
    // reception counter + landline
    rbox(1.4, 0.95, 0.55, SM(0xffffff, 0.5), 0, 0.475, -0.6, 0.03, salon); rbox(1.46, 0.04, 0.6, SM(0x2b1d2f, 0.4), 0, 0.97, -0.6, 0.01, salon);
    const phoneG = new THREE.Group(); phoneG.position.set(-0.1, 0.99, -0.55); salon.add(phoneG);
    rbox(0.24, 0.07, 0.18, SM(0xd94f5c, 0.4), 0, 0.035, 0, 0.02, phoneG);
    const handset = rbox(0.26, 0.05, 0.06, SM(0xd94f5c, 0.4), 0, 0.095, 0, 0.02, phoneG);
    const book = rbox(0.3, 0.03, 0.22, SM(0x3f7fbf, 0.6), 0.35, 1.0, -0.6, 0.01, salon); book.rotation.y = 0.2;
    // the AI hologram above the phone: glowing core, rings, sound bars
    const holo = new THREE.Group(); holo.position.set(-0.1, 1.42, -0.55); salon.add(holo);
    const holoM = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x6fd8ff).multiplyScalar(1.8), toneMapped: false, transparent: true, opacity: 0.9 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 16), holoM); holo.add(core);
    const rings = [0, 1].map(i => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.15 + i * 0.05, 0.006, 8, 48), holoM); r.rotation.x = 1.2 + i * 0.6; holo.add(r); return r; });
    const bars = Array.from({ length: 7 }, (_, i) => { const b = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.1, 0.018), holoM); b.position.set(-0.09 + i * 0.03, -0.2, 0.05); holo.add(b); return b; });
    const beam = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.38, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0x6fd8ff, transparent: true, opacity: 0.15, side: THREE.DoubleSide, depthWrite: false, toneMapped: false })); beam.position.set(-0.1, 1.2, -0.55); salon.add(beam);
    // wall clock (spins while on hold) + calendar
    const clockTex = K.canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#fff'; x.beginPath(); x.arc(64, 64, 60, 0, 7); x.fill(); x.strokeStyle = '#2b1d2f'; x.lineWidth = 6; x.stroke(); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; x.fillStyle = '#2b1d2f'; x.fillRect(64 + Math.sin(a) * 48 - 2, 64 - Math.cos(a) * 48 - 2, 4, 4); } });
    const clock = new THREE.Mesh(new THREE.CircleGeometry(0.2, 32), new THREE.MeshStandardMaterial({ map: clockTex, roughness: 0.6 })); clock.position.set(0.55, 2.0, -2.18); salon.add(clock);
    const handM = SM(0x2b1d2f, 0.5); const minHand = new THREE.Group(); minHand.position.set(0.55, 2.0, -2.16); salon.add(minHand); const mh = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.15, 0.005), handM); mh.position.y = 0.07; minHand.add(mh);
    const hrHand = new THREE.Group(); hrHand.position.set(0.55, 2.0, -2.165); salon.add(hrHand); const hh = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.1, 0.005), handM); hh.position.y = 0.045; hrHand.add(hh);
    const calCanvas = document.createElement('canvas'); calCanvas.width = 360; calCanvas.height = 300; const calX = calCanvas.getContext('2d'); const calTex = new THREE.CanvasTexture(calCanvas); calTex.colorSpace = THREE.SRGBColorSpace;
    const drawCal = (k) => { const x = calX; x.fillStyle = '#ffffff'; x.fillRect(0, 0, 360, 300); x.fillStyle = '#d94f5c'; x.fillRect(0, 0, 360, 56); x.fillStyle = '#fff'; x.font = '800 32px sans-serif'; x.textAlign = 'center'; x.fillText('APPOINTMENTS', 180, 40);
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((d, i) => { x.fillStyle = '#555'; x.font = '700 20px sans-serif'; x.fillText(d, 30 + i * 60, 86); });
      for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { x.fillStyle = (r + c) % 3 ? '#f2f2f2' : '#ffe3e8'; x.fillRect(6 + c * 60, 100 + r * 48, 52, 40); }
      if (k > 0) { x.save(); x.globalAlpha = k; x.fillStyle = '#2fbf71'; x.fillRect(306, 148, 52, 88); x.fillStyle = '#fff'; x.font = '900 30px sans-serif'; x.fillText('✓', 332, 182); x.font = '800 16px sans-serif'; x.fillText('4 PM', 332, 212); x.restore(); }
      calTex.needsUpdate = true; };
    drawCal(0);
    const cal = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.6), new THREE.MeshBasicMaterial({ map: calTex, toneMapped: false })); cal.position.set(-1.25, 1.55, -2.18); salon.add(cal);
    const sLight = new THREE.PointLight(0xfff0f3, 0.8, 6, 1.4); sLight.position.set(0, 2.6, 0.6); salon.add(sLight);
    const sHemi = new THREE.PointLight(0xffffff, 0.7, 6, 1.2); sHemi.position.set(-1, 1.6, 1.2); salon.add(sHemi);

    // ================= STREET (x = GX): Genie 4 builds a rainy Hyderabad street from one line =================
    const street = new THREE.Group(); street.position.x = GX; S.add(street);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(14, 16), new THREE.MeshStandardMaterial({ color: 0x1b1e26, roughness: 0.18, metalness: 0.5 })); road.rotation.x = -Math.PI / 2; road.position.z = -3; road.receiveShadow = true; street.add(road);
    const sideM = SM(0x6c6f76, 0.7);
    rbox(14, 0.12, 1.6, sideM, 0, 0.06, -1.0, 0.01, street);
    const lane = new THREE.MeshBasicMaterial({ color: 0xe8e2c0 });
    for (let i = -6; i < 7; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.08), lane); m.rotation.x = -Math.PI / 2; m.position.set(i * 1.1, 0.005, 0.9); street.add(m); }
    // bus stop with a bench (Maddie sits here)
    rbox(1.4, 0.06, 0.4, SM(0x2e8b57, 0.5), -0.2, 0.5, -1.0, 0.02, street); [-0.75, 0.35].forEach(x => cyl(0.025, 0.025, 0.5, SM(0x9aa3ab, 0.3, { metalness: 0.7 }), x, 0.25, -1.0, 8, street));
    rbox(1.8, 0.05, 0.9, SM(0x2e8b57, 0.4), -0.2, 2.15, -1.2, 0.02, street); [-1.05, 0.65].forEach(x => cyl(0.03, 0.03, 2.1, SM(0x9aa3ab, 0.3, { metalness: 0.7 }), x, 1.07, -1.55, 8, street));
    const busTex = K.canvasTex(256, 64, (x, w, h) => { x.fillStyle = '#2e8b57'; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.font = '800 30px sans-serif'; x.textAlign = 'center'; x.fillText('BUS STOP · 5K', w / 2, 43); });
    const busSign = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.22), new THREE.MeshBasicMaterial({ map: busTex, toneMapped: false })); busSign.position.set(-0.2, 2.3, -0.74); street.add(busSign);
    // buildings that rise out of the ground, with lit windows and shop signs
    const bldgs = [];
    const winTex = (seed, base) => K.canvasTex(128, 256, (x, w, h) => { const r = K.rng(seed); x.fillStyle = base; x.fillRect(0, 0, w, h); for (let yy = 10; yy < h - 40; yy += 24) for (let xx = 10; xx < w - 10; xx += 22) { x.fillStyle = r() < 0.5 ? '#ffd98a' : '#2a3048'; x.fillRect(xx, yy, 12, 14); } x.fillStyle = '#222'; x.fillRect(0, h - 36, w, 36); });
    const shopCols = ['#ff5a5f', '#ffb020', '#2fbf71', '#4f7fd9', '#c25aff', '#ff7a1a'];
    [[-4.2, -3.2, 1.4, 3.4], [-2.6, -3.6, 1.3, 4.6], [-1.1, -3.2, 1.2, 2.8], [0.4, -3.5, 1.4, 5.2], [1.9, -3.2, 1.2, 3.2], [3.4, -3.6, 1.4, 4.2], [4.9, -3.2, 1.3, 2.6],
     [-3.4, -6.5, 1.6, 6.0], [-1.2, -6.8, 1.8, 7.0], [1.2, -6.5, 1.6, 5.4], [3.6, -6.8, 1.8, 6.4]].forEach(([x, z, w, hgt], i) => {
      const base = ['#5b6b8c', '#8c6b5b', '#6b8c7a', '#7a6b8c', '#8c8a6b'][i % 5];
      const g = new THREE.Group(); g.position.set(x, 0, z); street.add(g);
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, hgt, 1.2), new THREE.MeshStandardMaterial({ map: winTex(30 + i, base), roughness: 0.8, emissive: 0xffd98a, emissiveIntensity: 0.25, emissiveMap: winTex(30 + i, '#000') })); m.position.y = hgt / 2; m.castShadow = true; g.add(m);
      if (i < 7) { const sTex = K.canvasTex(256, 64, (c, w2, h2) => { c.fillStyle = shopCols[i % 6]; c.fillRect(0, 0, w2, h2); c.fillStyle = '#fff'; c.font = '800 30px sans-serif'; c.textAlign = 'center'; c.fillText(['TEA STALL', 'MOBILES', 'BIRYANI', 'MEDICALS', 'XEROX', 'TIFFINS', 'SWEETS'][i], w2 / 2, 43); });
        const s3 = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, 0.24), new THREE.MeshBasicMaterial({ map: sTex, toneMapped: false })); s3.position.set(0, 0.75, 0.61); g.add(s3);
        const aw = new THREE.Mesh(new THREE.BoxGeometry(w * 0.95, 0.04, 0.4), SM(new THREE.Color(shopCols[(i + 2) % 6]).getHex(), 0.6)); aw.position.set(0, 1.0, 0.75); aw.rotation.x = 0.25; g.add(aw); }
      g.scale.y = 0.001; bldgs.push({ g, d: (i % 7) * 0.08 + (i >= 7 ? 0.3 : 0) }); });
    // street lights + an auto-rickshaw
    const lampsS = [-3.5, 0.3, 4.0].map(x => { cyl(0.03, 0.04, 2.6, SM(0x2a2a2a, 0.5), x, 1.3, -0.3, 8, street); const hd = rbox(0.4, 0.06, 0.12, SM(0x2a2a2a, 0.5), x + 0.15, 2.6, -0.3, 0.02, street);
      const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.08), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff1c2).multiplyScalar(2), toneMapped: false })); bulb.position.set(x + 0.15, 2.56, -0.3); street.add(bulb);
      const pl = new THREE.PointLight(0xffd59a, 1.1, 4.5, 1.6); pl.position.set(x + 0.15, 2.4, -0.2); street.add(pl); return pl; });
    const auto = new THREE.Group(); auto.position.set(2.2, 0, 0.5); street.add(auto);
    rbox(0.9, 0.5, 0.6, SM(0xf2c230, 0.5), 0, 0.45, 0, 0.12, auto); rbox(0.75, 0.32, 0.62, SM(0x2a7a3a, 0.5), -0.05, 0.86, 0, 0.12, auto);
    [[-0.32, -0.32], [-0.32, 0.32], [0.38, 0]].forEach(([x, z]) => { const w2 = cyl(0.13, 0.13, 0.08, SM(0x111111, 0.6), x, 0.13, z, 18, auto); w2.rotation.x = Math.PI / 2; });
    auto.scale.setScalar(0.001);
    // rain
    const RN = 900, rainG = new THREE.BufferGeometry(), rp = new Float32Array(RN * 6), rs = [];
    for (let i = 0; i < RN; i++) { const x = (rng() - 0.5) * 9, y = rng() * 5, z = -6 + rng() * 8; rs.push([x, y, z, 2.5 + rng() * 1.5]); }
    rainG.setAttribute('position', new THREE.BufferAttribute(rp, 3));
    const rain = new THREE.LineSegments(rainG, new THREE.LineBasicMaterial({ color: 0xb8d4ff, transparent: true, opacity: 0.45 })); street.add(rain);
    const stHemi = new THREE.HemisphereLight(0x5a6ea8, 0x1a1420, 0.0); stHemi.position.set(GX, 5, 0); S.add(stHemi);
    // the typed prompt bar floating in the air
    const pCan = document.createElement('canvas'); pCan.width = 1024; pCan.height = 160; const pX = pCan.getContext('2d'); const pTex = new THREE.CanvasTexture(pCan); pTex.colorSpace = THREE.SRGBColorSpace;
    const prompt = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.3), new THREE.MeshBasicMaterial({ map: pTex, transparent: true, toneMapped: false, depthWrite: false })); prompt.position.set(-0.1, 1.85, 0.4); street.add(prompt);
    const PROMPT = 'a rainy Hyderabad street at night';
    const drawPrompt = (n, t) => { const x = pX; x.clearRect(0, 0, 1024, 160); x.fillStyle = 'rgba(15,20,40,0.92)'; x.beginPath(); x.roundRect(8, 8, 1008, 144, 72); x.fill(); x.strokeStyle = '#6fd8ff'; x.lineWidth = 5; x.stroke();
      x.fillStyle = '#6fd8ff'; x.font = '800 46px sans-serif'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('✦', 50, 82); x.fillStyle = '#fff'; x.font = '600 50px sans-serif'; x.fillText(PROMPT.slice(0, n) + (Math.floor(t * 3) % 2 ? '|' : ''), 110, 84); pTex.needsUpdate = true; };

    // ================= BANK (x = BX): an AI agent empties the vault =================
    const bank = new THREE.Group(); bank.position.x = BX; S.add(bank);
    const bf = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshStandardMaterial({ color: 0x2a2c33, roughness: 0.3, metalness: 0.4 })); bf.rotation.x = -Math.PI / 2; bf.position.z = -1; bf.receiveShadow = true; bank.add(bf);
    const bw = new THREE.Mesh(new THREE.PlaneGeometry(8, 4.5), SM(0x5b5f6b, 0.7)); bw.position.set(0, 2.2, -2.2); bank.add(bw);
    const bankTex = K.canvasTex(512, 128, (x, w, h) => { x.fillStyle = '#0e2a47'; x.fillRect(0, 0, w, h); x.fillStyle = '#ffd34a'; x.font = '900 64px serif'; x.textAlign = 'center'; x.fillText('$  BIG US BANK', w / 2, 86); });
    const bsign = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), new THREE.MeshBasicMaterial({ map: bankTex, toneMapped: false })); bsign.position.set(0, 3.15, -2.18); bank.add(bsign);
    const steelV = SM(0xa9b0ba, 0.25, { metalness: 0.9 });
    const frameV = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.12, 16, 64), steelV); frameV.position.set(0, 1.35, -2.1); bank.add(frameV);
    const hinge = new THREE.Group(); hinge.position.set(-1.0, 1.35, -2.0); bank.add(hinge);
    const door = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.22, 64), steelV); door.rotation.x = Math.PI / 2; door.position.set(1.0, 0, 0); door.castShadow = true; hinge.add(door);
    const wheel = new THREE.Group(); wheel.position.set(1.0, 0, 0.14); hinge.add(wheel);
    for (let i = 0; i < 3; i++) { const sp = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 0.05), SM(0xd4a84b, 0.3, { metalness: 0.8 })); sp.rotation.z = i * Math.PI / 3; wheel.add(sp); }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 20), SM(0xd4a84b, 0.3, { metalness: 0.8 })); hub.rotation.x = Math.PI / 2; wheel.add(hub);
    const vaultIn = new THREE.Mesh(new THREE.CircleGeometry(0.95, 48), new THREE.MeshBasicMaterial({ color: 0x3a2a08 })); vaultIn.position.set(0, 1.35, -2.15); bank.add(vaultIn);
    const goldGlow = new THREE.PointLight(0xffc040, 0, 4, 1.4); goldGlow.position.set(0, 1.3, -1.6); bank.add(goldGlow);
    // the AI agent: a boxy bot with red eyes and an antenna, tapping the keypad
    const agent = new THREE.Group(); agent.position.set(1.35, 0, -1.2); agent.rotation.y = -0.7; bank.add(agent);
    rbox(0.42, 0.5, 0.32, SM(0x30343e, 0.4, { metalness: 0.4 }), 0, 0.75, 0, 0.06, agent); rbox(0.36, 0.3, 0.3, SM(0x30343e, 0.4, { metalness: 0.4 }), 0, 1.18, 0, 0.06, agent);
    const eyeM = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff3040).multiplyScalar(2), toneMapped: false });
    [-0.08, 0.08].forEach(x => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 8), eyeM); e.position.set(x, 1.2, 0.155); agent.add(e); });
    cyl(0.01, 0.01, 0.2, SM(0x888888, 0.4), 0, 1.42, 0, 6, agent); const tipA = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), eyeM); tipA.position.set(0, 1.53, 0); agent.add(tipA);
    [-0.1, 0.1].forEach(x => cyl(0.05, 0.05, 0.5, SM(0x30343e, 0.5), x, 0.25, 0, 10, agent));
    const armA = new THREE.Group(); armA.position.set(-0.24, 0.92, 0); agent.add(armA); const arm1 = cyl(0.035, 0.035, 0.42, SM(0x30343e, 0.5), 0, -0.2, 0, 10, armA);
    const keypad = rbox(0.22, 0.3, 0.05, SM(0x1b1d24, 0.4), 1.25, 1.3, -2.05, 0.02, bank);
    const keyLed = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.05), new THREE.MeshBasicMaterial({ color: 0xff3040, toneMapped: false })); keyLed.position.set(1.25, 1.4, -2.02); bank.add(keyLed);
    // coins
    const CN = 240, coinGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.022, 18), coinM = new THREE.MeshStandardMaterial({ color: 0xf5c542, roughness: 0.25, metalness: 0.9, emissive: 0x5a3a00, emissiveIntensity: 0.3 });
    const coins = new THREE.InstancedMesh(coinGeo, coinM, CN); coins.castShadow = true; coins.frustumCulled = false; bank.add(coins);
    const coinD = Array.from({ length: CN }, (_, i) => ({ t0: i * 0.012, vx: (rng() - 0.5) * 1.6, vz: 0.6 + rng() * 1.6, vy: 0.6 + rng() * 1.2, rx: rng() * 6, ry: rng() * 6, gx: (rng() - 0.5) * 2.2, gz: -1.2 + rng() * 2.2 }));
    const dummy = new THREE.Object3D();
    const bLight = new THREE.PointLight(0xfff4e0, 1.2, 7, 1.3); bLight.position.set(0.5, 3, 1.2); bank.add(bLight);
    const bLight2 = new THREE.PointLight(0xffffff, 0.6, 6, 1.2); bLight2.position.set(-1.5, 1.6, 1.0); bank.add(bLight2);

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: 0.56, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(-0.2, 0, -0.95); S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    // his phone (right hand), screen glowing PaisaMap mint
    const ph = new THREE.Group(); M.arms[1].hand.add(ph); ph.position.set(-0.05, 0.035, 0.03); ph.rotation.set(-1.05, 0.25, 0);
    rbox(0.085, 0.165, 0.012, SM(0x1b1d24, 0.3, { metalness: 0.3 }), 0, 0.06, 0, 0.012, ph);
    const phScr = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.152), new THREE.MeshBasicMaterial({ color: 0xbfe3d0, toneMapped: false })); phScr.position.set(0, 0.06, -0.0065); phScr.rotation.y = Math.PI; ph.add(phScr);
    const phL = new THREE.PointLight(0x9ff0cc, 0.0, 0.9, 1.6); S.add(phL);
    const R = (() => {   // the hover-bot with headphones (same design as every reel), floating above the books on the nightstand; no hands
      const g = new THREE.Group(); g.position.set(0.36, DY, -0.45); g.rotation.y = -0.55; S.add(g);
      const lift = new THREE.Group(); lift.position.y = 0.25; g.add(lift); lift.scale.setScalar(0.56);
      const head = new THREE.Group(); lift.add(head);
      const shellM = SM(0xd9d1c4, 0.55), orM = SM(0xe8692f, 0.5), visorM = SM(0x141a2e, 0.15, { metalness: 0.4 });
      const shell = sph(0.27, shellM, 0, 0, 0, head); shell.scale.set(1, 0.9, 0.92); shell.geometry = new THREE.SphereGeometry(0.27, 40, 28);
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.272, 40, 20, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), orM); belly.scale.set(1, 0.9, 0.92); head.add(belly);
      const visor = new THREE.Mesh(new THREE.SphereGeometry(0.255, 40, 24, -Math.PI * 0.36, Math.PI * 0.72, Math.PI * 0.3, Math.PI * 0.32), visorM); visor.scale.set(1.02, 0.92, 0.96); head.add(visor);
      const FW = 256, FH = 128, fc = document.createElement('canvas'); fc.width = FW; fc.height = FH; const fx = fc.getContext('2d');
      const fTex = new THREE.CanvasTexture(fc); fTex.colorSpace = THREE.SRGBColorSpace;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.15), new THREE.MeshBasicMaterial({ map: fTex, transparent: true, toneMapped: false })); face.position.set(0, 0.02, 0.247); head.add(face);
      const drawFace = (mood, talk, blink) => { fx.clearRect(0, 0, FW, FH); fx.fillStyle = '#ffb36b'; fx.strokeStyle = '#ffb36b'; fx.lineCap = 'round'; fx.lineWidth = 14; fx.shadowColor = '#ff8a3d'; fx.shadowBlur = 14;
        [76, 180].forEach(cx => { if (blink) { fx.beginPath(); fx.moveTo(cx - 20, 52); fx.lineTo(cx + 20, 52); fx.stroke(); }
          else if (mood === 'happy') { fx.beginPath(); fx.arc(cx, 62, 20, Math.PI * 1.1, Math.PI * 1.9); fx.stroke(); }
          else if (mood === 'flat') { fx.beginPath(); fx.moveTo(cx - 20, 50); fx.lineTo(cx + 20, 50); fx.stroke(); }
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
      const shTex = K.canvasTex(128, 128, (x, w, h) => { const gr = x.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(10,10,30,0.5)'); gr.addColorStop(1, 'rgba(10,10,30,0)'); x.fillStyle = gr; x.fillRect(0, 0, w, h); });
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.32), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false })); shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.004; g.add(shadow);
      const glowL = new THREE.PointLight(0xffa060, 0.0, 1.0, 2); lift.add(glowL);
      const noteTex = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#ffd34a'; x.font = '900 52px "DejaVu Sans"'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♪', 32, 34); });
      const notes = [0, 1].map(() => { const n = new THREE.Sprite(new THREE.SpriteMaterial({ map: noteTex, transparent: true, depthWrite: false })); n.scale.setScalar(0.08); lift.add(n); return n; });
      const r = { g, head };
      r.update = (t, { talk = 0, look = [0, 0], mood = 'calm' } = {}) => {
        const bob = Math.sin(t * 2.4) * 0.015; lift.position.y = 0.25 + bob;
        head.rotation.set(look[1] + Math.sin(t * 2.4 + 1) * 0.03, look[0] + Math.sin(t * 0.8) * 0.05, Math.sin(t * 1.7) * 0.04);
        const blink = ((t + 1.3) % 3.4) < 0.11;
        drawFace(mood === 'smile' ? 'happy' : mood === 'flat' ? 'flat' : 'open', talk * 1.3, blink && mood !== 'smile');
        thr.material.opacity = 0.7 + 0.3 * Math.sin(t * 20); thr.scale.setScalar(1 + 0.1 * Math.sin(t * 13)); shadow.scale.setScalar(1 - bob * 2);
        glowL.intensity = 0.15 + talk * 0.5;
        notes.forEach((n, i) => { const p = ((t * 0.45 + i * 0.5) % 1); n.position.set(-0.05 + i * 0.1, 0.3 + p * 0.25, 0); n.material.opacity = Math.sin(p * Math.PI) * 0.85; });
      };
      return r;
    })();
    // a short beard (fuller than reel 18): a thin shell over the skull, speckles only on the jaw, chin and a faint moustache
    (() => { const skull = M.head.children.find(o => o.isMesh && Math.abs(o.position.y - 0.24) < 1e-3 && Math.abs(o.position.x) < 1e-3);
      if (!skull) return; const sh = new THREE.Mesh(skull.geometry, new THREE.MeshStandardMaterial({ color: 0x2a1c15, roughness: 0.9, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
      sh.position.copy(skull.position); sh.scale.setScalar(1.012);
      sh.material.onBeforeCompile = s => { s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vSP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvSP = position;');
        s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vSP;\nfloat hsh(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }')
          .replace('#include <alphatest_fragment>', `
            float y = vSP.y, ax = abs(vSP.x), z = vSP.z;
            float jaw = 1.0 - smoothstep(-0.152, -0.112, y - smoothstep(0.1, 0.2, ax) * 0.09);        // chin + jaw, rising along the sides
            float must = 1.0 - smoothstep(0.55, 1.0, length(vec2(vSP.x / 0.072, (y + 0.0955) / 0.0135)));   // soft rounded moustache
            float lip = 1.0 - smoothstep(0.0, 1.0, length(vec2(vSP.x / 0.062, (y + 0.13) / 0.02)));   // keep the mouth clear
            float m = max(jaw, must * 0.62) * (1.0 - lip) * smoothstep(-0.06, 0.06, z);
            float sp = step(0.4, hsh(floor(vSP * 600.0)));
            diffuseColor.a = m * (0.24 + 0.6 * sp);
            #include <alphatest_fragment>`); };
      M.head.add(sh); })();




    // ================= LIGHT (shared) =================
    const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x302838, 0.75); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff2e6, 1.1); key.position.set(1.0, 2.8, 2.2); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xffffff, 0.55); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const rimB = new THREE.DirectionalLight(0x5a78ff, 1.0); rimB.position.set(-2, 2.2, -2.6); S.add(rimB);


    // ================= ACTING (characters + every set's animation) =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06], up = [0.05, -0.35];
    const M0 = M.g.position.clone(), R0 = R.g.position.clone();
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      // where the characters are: studio, or inside the Genie street (bus-stop bench) for the "I'm inside it" beat
      const inS = IN_STREET(t); M.g.position.set(M0.x + (inS ? GX : 0), M0.y, M0.z); R.g.position.set(R0.x + (inS ? GX : 0), R0.y, R0.z);
      let mL = toR, face = 'neutral', lean = 0.15;
      if (t < C.ONE) { mL = toCam; face = 'neutral'; lean = 0.1; }
      else if (t < C.INDIA) { mL = toR; face = 'neutral'; }
      else if (t < C.TELLS) { mL = toCam; face = 'shock'; lean = -0.1; }
      else if (t < C.TWO) { mL = toR; face = 'smile'; }
      else if (t < C.INSIDE) { mL = inS ? up : toR; face = inS ? 'shock' : 'neutral'; lean = inS ? -0.1 : 0.15; }
      else if (t < C.THREE) { mL = t < B('inside') + 0.9 ? up : toCam; face = 'shock'; lean = -0.12; }
      else if (t < C.SUM) { mL = toR; face = 'worried'; lean = 0.3; }
      else if (t < C.CTA) { mL = toCam; face = 'worried'; lean = 0.25; }
      else { mL = toCam; face = 'smile'; lean = 0; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type: 0, lean });
      phL.intensity = 0; phScr.material.color.setHex(0x45584f);
      let rL = [-0.15, 0.05]; if ((t >= C.ONE && t < C.INDIA) || (t >= C.TELLS && t < C.INSIDE) || (t >= C.THREE && t < C.SUM) || t >= C.CTA) rL = [0.42, 0.02];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      const mood = (t >= C.TELLS && t < C.TWO) || t >= C.CTA ? 'smile' : (t >= C.SUM && t < C.CTA) ? 'flat' : 'calm';
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      // studio LED wall switches on
      const on = fin(t, 0.15, 0.5); ledM.color.setRGB(on, on, on);
      // salon: ringing phone, hologram talking, clock spinning on hold, booking lands
      const ring = t >= C.SALON && t < B('books') + 0.4 ? Math.sin(t * 60) * 0.06 * (Math.floor(t * 2) % 2) : 0; phoneG.rotation.z = ring;
      const pick = eo(pr(t, B('books') + 0.2, B('books') + 0.6)); handset.position.set(-0.05 * pick, 0.095 + 0.12 * pick, 0.02 * pick); handset.rotation.z = 0.5 * pick;
      const hv = t >= C.SALON && t < C.TWO ? 1 : 0, hp = hv * (0.8 + 0.2 * Math.sin(t * 6)); holo.scale.setScalar(Math.max(0.001, hp)); beam.visible = hv > 0;
      core.scale.setScalar(1 + rT * 0.6); rings.forEach((r, i) => { r.rotation.z = t * (1.5 + i); }); bars.forEach((b, i) => { b.scale.y = 0.3 + Math.abs(Math.sin(t * 9 + i)) * (0.4 + rT * 3); });
      const holdSpin = t >= B('books') + 0.4 && t < BOOKED ? (t - B('books') - 0.4) * 18 : (t >= BOOKED ? (BOOKED - B('books') - 0.4) * 18 : 0); minHand.rotation.z = -holdSpin; hrHand.rotation.z = -holdSpin / 12 - 1.2;
      drawCal(eb(pr(t, BOOKED, BOOKED + 0.4)));
      // street: prompt types itself, buildings rise, rain falls, the auto pops in
      const n = Math.floor(cl((t - TYPE0) / (TYPE1 - TYPE0)) * PROMPT.length); drawPrompt(n, t); prompt.visible = t >= TYPE0 - 0.2 && t < RISE0 + 1.2; prompt.material.opacity = 1 - pr(t, RISE0 + 0.8, RISE0 + 1.2);
      bldgs.forEach(o => { o.g.scale.y = Math.max(0.001, eb(pr(t, RISE0 + o.d, RISE0 + o.d + 0.7))); });
      auto.scale.setScalar(Math.max(0.001, eb(pr(t, RISE0 + 0.8, RISE0 + 1.2)))); auto.position.x = 2.2 - Math.max(0, t - RISE0 - 1.2) * 0.6;
      const rainOn = pr(t, RISE0 + 0.5, RISE0 + 1.2); rain.material.opacity = 0.45 * rainOn; stHemi.intensity = 0.6 * pr(t, RISE0, RISE0 + 0.6);
      for (let i = 0; i < RN; i++) { const [x, y0, z, v] = rs[i]; const y = ((y0 - t * v) % 5 + 5) % 5; rp.set([x, y, z, x - 0.01, y + 0.18, z], i * 6); } rainG.attributes.position.needsUpdate = true;
      // bank: agent taps the keypad, wheel spins, door swings, coins pour out
      const tap = t >= C.BANK && t < C.BANK + 1.0; armA.rotation.x = tap ? -1.2 + Math.sin(t * 30) * 0.25 : -0.2; keyLed.material.color.setHex(t >= C.BANK + 0.9 ? 0x2fbf71 : 0xff3040);
      const open = eo(pr(t, C.BANK + 1.0, C.BANK + 2.2)); wheel.rotation.z = -pr(t, C.BANK + 0.9, C.BANK + 1.4) * 6.28; hinge.rotation.y = -open * 1.7; goldGlow.intensity = 1.4 * open;
      for (let i = 0; i < CN; i++) { const c = coinD[i], tt = t - (C.BANK + 1.6 + c.t0);
        if (tt <= 0) { dummy.position.set(0, -5, -2); } else { const fall = Math.min(tt, 1.2); let x = c.vx * fall, z = -2.0 + c.vz * fall, y = 1.3 + c.vy * fall - 4.9 * fall * fall;
          if (y < 0.03 + (i % 6) * 0.012) { y = 0.03 + (i % 6) * 0.012; x = c.gx; z = c.gz; } dummy.position.set(x, y, z); }
        dummy.rotation.set(c.rx + t * 3, c.ry, 0); dummy.updateMatrix(); coins.setMatrixAt(i, dummy.matrix); }
      coins.instanceMatrix.needsUpdate = true;
    };


    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const off = (p, dx) => ({ pos: [p.pos[0] + dx, p.pos[1], p.pos[2]], look: [p.look[0] + dx, p.look[1], p.look[2]], fov: p.fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.36, 1.1, -0.4];
    const sh = {
      est: [P([0.3, 1.7, 3.2], [-0.05, 1.5, -1.6], 44), P([-0.1, 1.47, 1.35], MHL, 33)],
      robo: [P([0.1, 1.22, 1.35], RHL, 30), P([0.12, 1.21, 1.18], RHL, 30)],
      wait: [P([-0.18, 1.43, 1.05], [-0.2, 1.4, -0.94], 30), P([-0.18, 1.42, 0.85], [-0.2, 1.4, -0.94], 30)],
      mad: [P([0.12, 1.44, 1.32], MHL, 32), P([0.1, 1.43, 1.15], MHL, 32)],
      cta: [P([0.06, 1.6, 2.6], [0.0, 1.45, -1.2], 44), P([0.06, 1.55, 2.3], [0.0, 1.4, -1.2], 44)],
      salonW: [P([SX + 0.2, 1.55, 1.9], [SX - 0.1, 1.2, -0.9], 40), P([SX + 0.05, 1.4, 0.7], [SX - 0.1, 1.25, -0.6], 34)],
      salonCal: [P([SX - 0.7, 1.55, 0.6], [SX - 1.25, 1.55, -2.18], 34), P([SX - 0.95, 1.55, -0.2], [SX - 1.25, 1.55, -2.18], 30)],
      salonHolo: [P([SX + 0.6, 1.5, 1.4], [SX - 0.1, 1.3, -0.55], 34), P([SX + 0.5, 1.45, 1.1], [SX - 0.1, 1.32, -0.55], 32)],
      streetW: [P([GX + 0.2, 2.0, 6.2], [GX, 2.2, -4], 50), P([GX - 0.1, 2.8, 5.0], [GX, 2.6, -5.5], 50)],
      bank: [P([BX + 1.3, 1.7, 5.6], [BX + 0.3, 1.25, -1.4], 48), P([BX + 1.0, 1.5, 4.4], [BX + 0.25, 1.05, -1.2], 46)],
    };
    const inStreetMad = [off(sh.mad[0], GX), off(sh.mad[1], GX)];
    const plan = [
      [C.HOOK, C.ONE, sh.est], [C.ONE, C.SALON, sh.robo], [C.SALON, B('books') + 1.2, sh.salonW], [B('books') + 1.2, C.INDIA, sh.salonCal], [C.INDIA, C.TELLS, sh.wait], [C.TELLS, C.TWO, sh.salonHolo],
      [C.TWO, TYPE0 - 0.1, sh.robo], [TYPE0 - 0.1, RISE0 + 1.6, sh.streetW], [RISE0 + 1.6, C.THREE, inStreetMad], [C.THREE, C.BANK - 0.1, sh.robo], [C.BANK - 0.1, C.SUM, sh.bank],
      [C.SUM, C.CTA, sh.mad], [C.CTA, D + 5, sh.cta],
    ].filter(p => p[1] > p[0]);
    const SHAKE = [C.INDIA, RISE0 + 1.6, C.SUM];
    const smooth = k => k * k * (3 - 2 * k);
    const lift = (p, dy) => ({ pos: [p.pos[0], p.pos[1] + dy, p.pos[2]], look: [p.look[0], p.look[1] + dy, p.look[2]], fov: p.fov });
    const DYS = new Map([[sh.mad, 0.085], [sh.wait, 0.075], [sh.robo, 0.035], [sh.est, 0.06], [sh.cta, 0.03], [inStreetMad, 0.085]]);
    plan.forEach(p => { if (DYS.has(p[2])) { const d = DYS.get(p[2]); p[2] = [lift(p[2][0], d), lift(p[2][1], d)]; } });
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth, shake: SHAKE.includes(a) ? (t => 0.006 * Math.exp(-(t - a) * 6)) : null }));
    const curFov = t => { const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; const k = smooth(cl((t - p[0]) / (p[1] - p[0]))); return lerp(p[2][0].fov, p[2][1].fov, k); };

    // ================= HUD =================
    S.add(K.cam);
    const HW = 1080, HH = 1920, hc = document.createElement('canvas'); hc.width = HW; hc.height = HH; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, depthTest: false, depthWrite: false, toneMapped: false, fog: false }));
    hud.renderOrder = 1000; K.cam.add(hud);
    // PaisaMap Fresh Mint palette
    const GRN = '#0b8f68', MINT = '#f2f7f3', MINT2 = '#e3eee7', BAR = '#9fd0b8', INKD = '#10261d', FOG = '#5b7366', RED = '#e5484d', GOLD = '#f5a524', WH = '#f6faf8';
    const FR = '"Fredoka Light", "Inter Display"';
    const F = (s, w = 400, fam = '"Inter", "DejaVu Sans"') => `${w} ${s}px ${fam}`;
    const txt = (s, x, y, size, col, w = 400, align = 'left', a = 1, fam) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam); h.fillStyle = col; h.textAlign = align; h.textBaseline = 'middle'; h.fillText(s, x, y); h.restore(); };
    const ft = (s, x, y, size, col, w = 700, align = 'left', a = 1) => txt(s, x, y, size, col, w, align, a, FR);
    const fin = (t, t0, d = 0.4) => eo(pr(t, t0, t0 + d));
    const pop = (t, t0, d = 0.4) => eb(pr(t, t0, t0 + d));
    const rr = (x, y, w, hh, r, fill) => { h.fillStyle = fill; h.beginPath(); h.roundRect(x, y, w, hh, r); h.fill(); };
    const wcard = (x, y, w, hh, r = 34, glow = 'rgba(80,230,170,0.75)') => { h.save(); h.shadowColor = glow; h.shadowBlur = 44; rr(x, y, w, hh, r, 'rgba(240,247,243,0.97)'); h.restore(); h.strokeStyle = 'rgba(11,143,104,0.35)'; h.lineWidth = 3; h.beginPath(); h.roundRect(x, y, w, hh, r); h.stroke(); };
    const chip = (s, x, y, size, bg, fg, a = 1, sc = 1, w = 800) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, FR); const tw = h.measureText(s).width + size * 1.3, th = size * 1.8;
      h.translate(x, y); h.scale(sc, sc); h.fillStyle = bg; h.beginPath(); h.roundRect(-tw / 2, -th / 2, tw, th, th / 2); h.fill(); h.fillStyle = fg; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 3); h.restore(); };
    const scaleAt = (x, y, s, fn) => { h.save(); h.translate(x, y); h.scale(s, s); h.translate(-x, -y); fn(); h.restore(); };
    const stamp = (s, x, y, size, col, t0, t, rot = -0.12, bg = null) => { const k = pop(t, t0, 0.3); if (k <= 0) return; h.save(); h.translate(x, y); h.rotate(rot); const sc = lerp(2.2, 1, k); h.scale(sc, sc); h.globalAlpha *= cl(k * 2);
      h.font = F(size, 700, FR); const w = h.measureText(s).width + size; if (bg) rr(-w / 2, -size * 0.85, w, size * 1.7, 14, bg); h.strokeStyle = col; h.lineWidth = 7; h.beginPath(); h.roundRect(-w / 2, -size * 0.85, w, size * 1.7, 14); h.stroke();
      h.fillStyle = col; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 4); h.restore(); };
    const inr = n => Math.round(n).toLocaleString('en-IN');
    const pin = (x, y, s, col = GRN) => { h.save(); h.translate(x, y); h.scale(s, s); h.fillStyle = col; h.beginPath(); h.moveTo(0, 22); h.bezierCurveTo(-4, 14, -14, 6, -14, -4); h.arc(0, -4, 14, Math.PI, 0); h.bezierCurveTo(14, 6, 4, 14, 0, 22); h.fill(); h.fillStyle = WH; h.beginPath(); h.arc(0, -4, 5.5, 0, 7); h.fill(); h.restore(); };


    // ---------- small HUD labels only (the story is told by the 3D scenes) ----------
    const BLUE = '#5a7cff', DARK = 'rgba(10,14,40,0.92)';
    const label = (t, t0, t1, s, bg = DARK, fg = '#fff', y = 230) => { if (t < t0 || t >= t1) return; chip(s, 540, y, 38, bg, fg, fin(t, t0, 0.25) * (1 - pr(t, t1 - 0.2, t1)), pop(t, t0, 0.35), 800); };
    const drawBeats = t => {
      label(t, 0.2, C.ONE, '🗞️ AI THIS WEEK · 3 things');
      label(t, C.ONE + 0.2, C.TWO, '1️⃣  Gemini makes calls for you', '#1a73e8');
      if (t >= BOOKED && t < C.INDIA) stamp('BOOKED ✓  Sat 4 PM', 540, 420, 52, '#2fbf71', BOOKED, t, -0.06, 'rgba(255,255,255,0.95)');
      label(t, C.INDIA + 0.1, C.TWO, '🇮🇳 Free in India too', '#ff9933', '#fff', 330);
      if (t >= C.TELLS + 0.3 && t < C.TWO) chip('"Hi, I\'m an AI assistant calling for Maddie"', 540, 440, 32, 'rgba(111,216,255,0.92)', '#06283a', fin(t, C.TELLS + 0.3, 0.25), pop(t, C.TELLS + 0.3, 0.35), 700);
      label(t, C.TWO + 0.2, C.THREE, '2️⃣  Genie 4: type a line → play the world', '#7b2ff7');
      if (t >= B('inside') + 0.2 && t < C.THREE) stamp('YOU\'RE INSIDE IT 🤯', 540, 420, 52, '#7b2ff7', B('inside') + 0.2, t, -0.06, 'rgba(255,255,255,0.95)');
      label(t, C.THREE + 0.2, C.CTA, '3️⃣  ⚠️ Your AI agent, your loss', RED);
      if (t >= C.BANK + 2.4 && t < C.SUM) stamp('YOU PAY 💸', 540, 420, 64, RED, C.BANK + 2.4, t, -0.08, 'rgba(255,255,255,0.95)');
      if (t >= C.SUM + 0.4 && t < C.CTA) ['📞 call', '🌍 build', '💸 lose'].forEach((s, i) => chip(s, [270, 540, 810][i], 430, 40, ['#1a73e8', '#7b2ff7', RED][i], '#fff', fin(t, C.SUM + 0.4 + i * 0.5, 0.2), pop(t, C.SUM + 0.4 + i * 0.5, 0.3), 800));
      if (t >= C.CTA) { const a = pop(t, C.CTA + 0.05, 0.45); scaleAt(540, 420, a, () => { h.save(); h.shadowColor = 'rgba(90,124,255,0.9)'; h.shadowBlur = 40; rr(170, 290, 740, 260, 40, DARK); h.restore();
        ft('🤖 AI news', 540, 370, 64, '#fff', 700, 'center'); ft('every week', 540, 445, 52, '#ffd34a', 700, 'center'); chip('FOLLOW ➕', 540, 600, 44, BLUE, '#fff', fin(t, B('cta') + 0.6, 0.2), 1 + 0.05 * Math.sin(t * 7), 800); }); }
    };


    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,10,0.35)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.SALON, TYPE0 - 0.1, C.BANK - 0.1, C.CTA];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.18) a = Math.max(a, 1 - d / 0.18); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawBeats(t);
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.55})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.25); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, '#5a7cff'); g.addColorStop(1, '#ffd34a'); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['riser', 0.1, 0.25], ['ding', 0.3, 0.3], ['whoosh', C.ONE, 0.25], ['pop', C.ONE + 0.2, 0.3]);
    sfx.push(['whoosh', C.SALON, 0.3]); for (let t2 = C.SALON + 0.1; t2 < B('books') + 0.3; t2 += 0.5) sfx.push(['beep', t2, 0.25]);
    sfx.push(['tick', B('books') + 0.5, 0.15], ['tick', B('books') + 0.9, 0.15], ['tick', B('books') + 1.3, 0.15], ['chime', BOOKED, 0.4], ['kaching', BOOKED + 0.05, 0.25]);
    sfx.push(['boing', C.INDIA, 0.25], ['pop', C.INDIA + 0.1, 0.3], ['zap', C.TELLS + 0.3, 0.15]);
    sfx.push(['whoosh', C.TWO, 0.25], ['type', TYPE0, 0.3], ['whoosh', TYPE0 - 0.1, 0.25], ['bass', RISE0, 0.45], ['riser', RISE0, 0.3], ['rain', RISE0 + 0.5, 0.25], ['thud', RISE0 + 0.8, 0.3]);
    sfx.push(['boing', B('inside') + 0.2, 0.3], ['chime', B('inside') + 0.2, 0.3]);
    sfx.push(['whoosh', C.THREE, 0.25], ['buzz', C.THREE + 0.2, 0.15]); for (let i = 0; i < 6; i++) sfx.push(['beep', C.BANK + i * 0.15, 0.2]);
    sfx.push(['crunch', C.BANK + 1.0, 0.3], ['bass', C.BANK + 1.0, 0.4]); for (let t2 = C.BANK + 1.6; t2 < C.BANK + 3.4; t2 += 0.05) sfx.push(['coin', t2, 0.07]); sfx.push(['thud', C.BANK + 2.4, 0.35], ['buzz', C.BANK + 2.4, 0.15]);
    sfx.push(['pop', C.SUM + 0.4, 0.25], ['pop', C.SUM + 0.9, 0.25], ['pop', C.SUM + 1.4, 0.25], ['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.6, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
