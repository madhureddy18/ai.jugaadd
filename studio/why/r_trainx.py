import sys; sys.path.insert(0,'/home/claude/why'); from gen import build
SET=r"""
    // evening railway platform: Maddie on a bench, track behind him
    const platTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#9c978c'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(60,55,50,0.35)'; x.lineWidth = 3; for (let i = 0; i <= w; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); } });
    platTex.wrapS = platTex.wrapT = THREE.RepeatWrapping; platTex.repeat.set(15, 6);
    const plat = new THREE.Mesh(new THREE.BoxGeometry(30, 1.0, 5.4), new THREE.MeshStandardMaterial({ map: platTex, roughness: 0.85 })); plat.position.set(0, -0.5, 0.25); plat.receiveShadow = true; S.add(plat);
    const edge = new THREE.Mesh(new THREE.PlaneGeometry(30, 0.22), SM(0xf2c230, 0.6)); edge.rotation.x = -Math.PI / 2; edge.position.set(0, 0.003, -2.2); S.add(edge);
    const bed = new THREE.Mesh(new THREE.PlaneGeometry(30, 4), SM(0x5a4b3e, 1)); bed.rotation.x = -Math.PI / 2; bed.position.set(0, -1.0, -3.9); S.add(bed);
    [-4.4, -3.0].forEach(z => { const r = new THREE.Mesh(new THREE.BoxGeometry(30, 0.08, 0.08), SM(0xa9adb3, 0.3, { metalness: 0.8 })); r.position.set(0, -0.92, z); S.add(r); });
    const farTex = K.canvasTex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2b2a5c'); g.addColorStop(0.5, '#c9637a'); g.addColorStop(0.75, '#ffb36b'); g.addColorStop(1, '#3a2a3a'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const far = new THREE.Mesh(new THREE.PlaneGeometry(34, 14), new THREE.MeshBasicMaterial({ map: farTex, fog: false })); far.position.set(0, 3, -14); S.add(far);
    for (let i = 0; i < 12; i++) { const hgt = 1 + rng() * 4; const b = new THREE.Mesh(new THREE.BoxGeometry(1.5 + rng() * 2, hgt, 1), SM(0x2a2540, 0.9)); b.position.set(-14 + i * 2.4, -1 + hgt / 2, -11); S.add(b); }
    const roof = new THREE.Mesh(new THREE.BoxGeometry(30, 0.12, 4.2), SM(0x6b2f2f, 0.7)); roof.position.set(0, 3.1, 0.2); S.add(roof);
    [-3.2, 2.6, 8.4, -9].forEach(x => { cyl(0.08, 0.08, 3.1, SM(0x3d4a5c, 0.5, { metalness: 0.4 }), x, 1.55, -1.7, 12); });
    const lamps = []; [-3.2, 2.6].forEach(x => { const l = new THREE.PointLight(0xffd08a, 1.4, 6, 1.5); l.position.set(x, 2.8, -1.2); S.add(l); lamps.push(l); const b = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.16), BM(0xfff1c8)); b.position.set(x, 3.02, -1.2); S.add(b); });
    const boardTex = K.canvasTex(512, 128, (x, w, h) => { x.fillStyle = '#f4d23a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#111'; x.lineWidth = 8; x.strokeRect(6, 6, w - 12, h - 12); x.fillStyle = '#111'; x.font = '800 60px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HYDERABAD JN', w / 2, h / 2 + 3); });
    const board = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.6 })); board.position.set(-1.6, 2.55, -1.65); S.add(board);
    // bench
    const wood = SM(0x8a5a35, 0.7), iron = SM(0x2c2f36, 0.5, { metalness: 0.5 });
    rbox(1.7, 0.07, 0.5, wood, 0.1, 0.5, -0.95, 0.02); rbox(1.7, 0.4, 0.06, wood, 0.1, 0.82, -1.22, 0.02); [-0.65, 0.85].forEach(x => { rbox(0.06, 0.5, 0.45, iron, x, 0.25, -0.95, 0.01); });
    // the big train: Indian-blue coaches; the last coach has the yellow X, LV board and red lamp
    const coachTex = K.canvasTex(1024, 256, (x, w, h) => { x.fillStyle = '#2a4f9e'; x.fillRect(0, 0, w, h); x.fillStyle = '#e9e2c8'; x.fillRect(0, 70, w, 10); x.fillRect(0, 190, w, 8);
      for (let i = 0; i < 9; i++) { const px = 90 + i * 96; x.fillStyle = '#0d1a33'; x.fillRect(px, 96, 64, 70); x.strokeStyle = '#9aa3b5'; x.lineWidth = 3; for (let k = 1; k < 5; k++) { x.beginPath(); x.moveTo(px, 96 + k * 14); x.lineTo(px + 64, 96 + k * 14); x.stroke(); } }
      x.fillStyle = '#1c3a7a'; x.fillRect(20, 90, 50, 150); x.fillRect(w - 70, 90, 50, 150); });
    const rearTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#2a4f9e'; x.fillRect(0, 0, w, h); x.strokeStyle = '#ffd400'; x.lineWidth = 26; x.lineCap = 'square'; x.beginPath(); x.moveTo(60, 60); x.lineTo(196, 196); x.moveTo(196, 60); x.lineTo(60, 196); x.stroke(); x.strokeStyle = '#fff'; x.lineWidth = 6; x.beginPath(); x.moveTo(60, 60); x.lineTo(196, 196); x.moveTo(196, 60); x.lineTo(60, 196); x.stroke(); });
    const plainEnd = SM(0x24478f, 0.6), roofM = SM(0x8c929c, 0.5);
    const mkCoach = (last, scale = 1) => { const g = new THREE.Group(); const side = new THREE.MeshStandardMaterial({ map: coachTex, roughness: 0.55 });
      const mats = [last ? new THREE.MeshStandardMaterial({ map: rearTex, roughness: 0.5, emissive: 0x332200, emissiveIntensity: 0.3 }) : plainEnd, plainEnd, roofM, plainEnd, side, side];
      const b = new THREE.Mesh(new THREE.BoxGeometry(10, 3, 3), mats); b.castShadow = true; g.add(b);
      [-3.5, 3.5].forEach(x => { const wh = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 2.6), SM(0x222326, 0.6)); wh.position.set(x, -1.75, 0); g.add(wh); });
      let lamp = null, lv = null;
      if (last) { lamp = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), new THREE.MeshBasicMaterial({ color: 0xff2020, toneMapped: false })); lamp.position.set(5.05, -0.95, 0); g.add(lamp);
        const lvT = K.canvasTex(128, 96, (x, w, h) => { x.fillStyle = '#ffd400'; x.fillRect(0, 0, w, h); x.fillStyle = '#111'; x.font = '900 64px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LV', w / 2, h / 2 + 4); });
        lv = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.52), new THREE.MeshBasicMaterial({ map: lvT, toneMapped: false })); lv.rotation.y = Math.PI / 2; lv.position.set(5.03, -0.9, 0.95); g.add(lv); }
      g.scale.setScalar(scale); return { g, lamp, lv }; };
    const NC = 7, train = []; for (let i = 0; i < NC; i++) { const c = mkCoach(i === NC - 1); c.g.position.set(0, 0.85, -3.7); S.add(c.g); train.push(c); }
    const placeBig = xh => train.forEach((c, i) => { c.g.position.x = xh + 5 + i * 10.25; c.g.visible = Math.abs(c.g.position.x) < 22; });
"""
LIGHTS=r"""
    const hemi = new THREE.HemisphereLight(0xffd9c2, 0x3a2a40, 0.75); S.add(hemi);
    const key = new THREE.DirectionalLight(0xffc89a, 1.2); key.position.set(-2.5, 3, 2.5); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -4; key.shadow.camera.right = 4; key.shadow.camera.top = 4; key.shadow.camera.bottom = -4; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.6); front.position.set(0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const rimP = new THREE.DirectionalLight(0xff8fb0, 0.7); rimP.position.set(-2, 2, -4); S.add(rimP);
"""
WORLD=r"""
    // ===== diorama (x = TX): station, station master, signal, a model train =====
    const TX = 40, ST = 6;
    const dio = new THREE.Group(); dio.position.x = TX; S.add(dio);
    const grass = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), SM(0x6f9a52, 0.95)); grass.rotation.x = -Math.PI / 2; grass.receiveShadow = true; dio.add(grass);
    const dSky = new THREE.Mesh(new THREE.SphereGeometry(28, 32, 16), new THREE.MeshBasicMaterial({ map: farTex, fog: false, side: THREE.BackSide })); dSky.position.set(0, -4, 0); dio.add(dSky);
    const ballast = new THREE.Mesh(new THREE.PlaneGeometry(60, 0.7), SM(0x7a6a5a, 1)); ballast.rotation.x = -Math.PI / 2; ballast.position.y = 0.005; dio.add(ballast);
    const slp = new THREE.InstancedMesh(new THREE.BoxGeometry(0.08, 0.03, 0.55), SM(0x5a4030, 0.9), 300); slp.frustumCulled = false;
    for (let i = 0; i < 300; i++) { dummy.position.set(-30 + i * 0.2, 0.02, 0); dummy.updateMatrix(); slp.setMatrixAt(i, dummy.matrix); } dio.add(slp);
    [-0.18, 0.18].forEach(z => { const r = new THREE.Mesh(new THREE.BoxGeometry(60, 0.03, 0.03), SM(0xb8bcc4, 0.3, { metalness: 0.8 })); r.position.set(0, 0.05, z); dio.add(r); });
    rbox(3.2, 0.16, 0.9, SM(0xb7b0a2, 0.8), ST, 0.08, -0.85, 0.02, dio);
    const stB = rbox(1.0, 0.5, 0.5, SM(0xd9b48a, 0.7), ST - 0.6, 0.41, -1.5, 0.03, dio); rbox(1.15, 0.06, 0.65, SM(0x8b3a3a, 0.6), ST - 0.6, 0.69, -1.5, 0.02, dio);
    const sm_ = new THREE.Group(); sm_.position.set(ST + 0.6, 0.16, -0.75); dio.add(sm_);
    const smBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.22, 6, 12), SM(0xf2f2f2, 0.6)); smBody.position.y = 0.22; sm_.add(smBody);
    const smHead = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 12), SM(0xd8a47c, 0.6)); smHead.position.y = 0.48; sm_.add(smHead);
    const cap = cyl(0.09, 0.09, 0.05, SM(0x1d2a4a, 0.5), 0, 0.56, 0, 16, sm_);
    const arm = new THREE.Group(); arm.position.set(0.09, 0.32, 0); sm_.add(arm); const armM = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.16, 4, 8), SM(0xf2f2f2, 0.6)); armM.position.y = 0.09; arm.add(armM);
    const flagM = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide, toneMapped: false }); const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.11), flagM); flag.position.set(0.08, 0.2, 0); arm.add(flag);
    const sigP = cyl(0.025, 0.025, 1.2, SM(0x333333, 0.5), ST + 2.6, 0.6, -0.55, 8, dio); const sigBox = rbox(0.14, 0.3, 0.1, SM(0x111111, 0.5), ST + 2.6, 1.25, -0.5, 0.02, dio);
    const sigG = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), new THREE.MeshBasicMaterial({ color: 0x22c55e, toneMapped: false })); sigG.position.set(ST + 2.6, 1.18, -0.44); dio.add(sigG);
    const sigR = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), new THREE.MeshBasicMaterial({ color: 0x331010, toneMapped: false })); sigR.position.set(ST + 2.6, 1.32, -0.44); dio.add(sigR);
    for (let i = 0; i < 14; i++) { const tr = new THREE.Group(); tr.position.set(-14 + i * 2.3 + rng(), 0, -3 - rng() * 3); dio.add(tr); cyl(0.05, 0.07, 0.5, SM(0x6b4a2b, 0.9), 0, 0.25, 0, 8, tr); sph(0.35 + rng() * 0.2, SM(0x3f7a3a, 0.8), 0, 0.75, 0, tr); }
    const SC = 0.13, mk = last => { const c = mkCoach(last, SC); c.g.position.y = 0.32; dio.add(c.g); return c; };
    const engT = K.canvasTex(256, 128, (x, w, h) => { x.fillStyle = '#c0392b'; x.fillRect(0, 0, w, h); x.fillStyle = '#f2c230'; x.fillRect(0, 70, w, 10); });
    const mkEng = () => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.4, 0.4), new THREE.MeshStandardMaterial({ map: engT, roughness: 0.5 })); b.position.y = 0.32; b.castShadow = true; g.add(b); const cab = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.38), SM(0x8f2a20, 0.5)); cab.position.set(0.4, 0.58, 0); g.add(cab); dio.add(g); return g; };
    const eng = mkEng(), dc = [0, 1, 2, 3, 4].map(i => mk(i === 4)), eng2 = mkEng(), sc2 = [0, 1].map(() => mk(false));
    const placeTrain = (xe, det = null) => { eng.position.x = xe; dc.forEach((c, i) => { c.g.position.x = (det && i >= 3) ? det[i - 3] : xe - 1.32 * (i + 1); c.g.position.z = 0; }); };
    const tickTex = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#2fbf71'; x.beginPath(); x.arc(32, 32, 28, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(18, 33); x.lineTo(28, 43); x.lineTo(46, 22); x.stroke(); });
    const ticks = dc.map(() => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tickTex, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); s.scale.setScalar(0.3); dio.add(s); return s; });
    const sparkTex = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 1, 32, 32, 30); g.addColorStop(0, 'rgba(255,240,180,1)'); g.addColorStop(0.4, 'rgba(255,160,40,0.7)'); g.addColorStop(1, 'rgba(255,120,0,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sparks = Array.from({ length: 24 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTex, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); s.scale.setScalar(0.12); dio.add(s); return { s, v: [rng() * 2 - 1, rng() * 2, rng() * 2 - 1] }; });
    const warnTex = K.canvasTex(256, 128, (x, w, h) => { x.fillStyle = '#e5484d'; x.beginPath(); x.roundRect(4, 4, w - 8, h - 8, 30); x.fill(); x.fillStyle = '#fff'; x.font = '900 56px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NO X!', w / 2, h / 2 + 4); });
    const warn = new THREE.Sprite(new THREE.SpriteMaterial({ map: warnTex, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); warn.scale.set(0.9, 0.45, 1); warn.position.set(ST - 0.1, 1.15, -0.6); dio.add(warn);
    const dSun = new THREE.DirectionalLight(0xffd2a8, 1.6); dSun.position.set(TX - 4, 6, 5); dSun.target.position.set(TX + 2, 0, 0); dSun.castShadow = true; dSun.shadow.mapSize.set(2048, 2048); dSun.shadow.camera.left = -10; dSun.shadow.camera.right = 10; dSun.shadow.camera.top = 10; dSun.shadow.camera.bottom = -10; S.add(dSun); S.add(dSun.target);
    const dHemi = new THREE.HemisphereLight(0xffe0c8, 0x445533, 0.5); dHemi.position.set(TX, 5, 0); S.add(dHemi);
"""
ACT=r"""
      // home train: rushes past in the hook, parked with its rear on show from the LV line on
      if (t < C.safety + 0.3) placeBig(-71.9 - 12 * (t - 3.2)); else if (t >= C.lv) placeBig(-70); else placeBig(-500);
      const tail = train[NC - 1]; tail.lamp.material.color.setHex(Math.floor(t * 2.5) % 2 ? 0xff2020 : 0x330505);
      // diorama
      let xe = -100, det = null; const TB = B('breaks') + 1.0;
      if (t >= C.looks && t < C.bye + 0.2) xe = -2.3 + (t - C.looks) * 7;
      else if (t >= C.whole && t < C.left + 0.2) xe = -3 + (t - C.whole) * 3.6;
      else if (t >= C.breaks) { const tt = t - C.breaks, tb = TB - C.breaks; xe = -4 + tt * 3.6;
        if (t >= TB) { const x0 = -4 + tb * 3.6, T = 1.6, q = Math.min(t - TB, T); const dx = 3.6 * (q - q * q / (2 * T)); det = [x0 - 1.32 * 4 + dx, x0 - 1.32 * 5 + dx]; } }
      placeTrain(xe, det); eng.visible = dc[0].g.visible = xe > -60;
      dc.forEach((c, i) => { c.g.visible = xe > -60; const pass = c.g.position.x > ST + 0.6 && t >= C.whole && t < C.left + 0.2; const tk = ticks[i]; tk.position.set(c.g.position.x, 0.95, 0); tk.material.opacity = pass ? 1 : 0; });
      // the X is seen → green flag;  NO X → red flag, signal red, second train stops short
      const alarm = t >= C.nox + 0.2 && t < C.oneletter + 0.5;
      flagM.color.setHex(alarm ? 0xff2020 : 0x22c55e); arm.rotation.z = alarm ? -2.6 + Math.sin(t * 14) * 0.4 : (t >= C.looks ? -1.2 + Math.sin(t * 4) * 0.2 : 0);
      sigG.material.color.setHex(alarm ? 0x0a2a14 : 0x22c55e); sigR.material.color.setHex(alarm ? 0xff2020 : 0x331010);
      warn.material.opacity = alarm ? 1 : 0; warn.scale.set(0.9 * (1 + 0.08 * Math.sin(t * 10)), 0.45 * (1 + 0.08 * Math.sin(t * 10)), 1);
      const tt2 = t - (C.nox + 0.8), stopX = det ? det[1] - 1.7 : -12; let x2 = -100;
      if (t >= C.nox + 0.8 && t < C.oneletter + 0.5) { const T = 2.4, q = Math.min(tt2, T); x2 = stopX - 6 * (1 - (q / T)) * (1 - (q / T)) * 1.0 - 0.0; x2 = stopX - 6 * Math.pow(1 - q / T, 2); }
      eng2.position.x = x2; sc2.forEach((c, i) => { c.g.position.x = x2 - 1.32 * (i + 1); });
      sparks.forEach((p, i) => { const q = t - TB; const on = q > 0 && q < 0.8; const x0 = det ? det[0] + 0.66 : 0; p.s.position.set(x0 + p.v[0] * q * 0.8, 0.35 + p.v[1] * q * 0.7 - q * q, p.v[2] * q * 0.5); p.s.material.opacity = on ? 1 - q / 0.8 : 0; });
"""
SHOTS=r"""
      plat: [P([0.9, 1.35, 2.8], [-0.4, 1.0, -2.2], 46), P([0.8, 1.38, 2.4], [-0.3, 1.05, -2.2], 44)],
      dio: [P([TX + 12.5, 1.1, 0.7], [TX + 4.0, 0.4, -0.5], 48), P([TX + 12.0, 1.05, 0.65], [TX + 4.0, 0.4, -0.5], 48)],
      dio2: [P([TX + 7.4, 0.95, 3.4], [TX + 6.2, 0.45, -0.6], 42), P([TX + 7.2, 0.9, 3.0], [TX + 6.2, 0.45, -0.6], 42)],
      dioB: [P([TX - 3.6, 1.2, 3.2], [TX - 4.7, 0.35, 0], 42), P([TX - 4.0, 1.05, 2.8], [TX - 4.8, 0.35, 0], 42)],
      dioN: [P([TX + 11.5, 1.2, 0.35], [TX - 2.0, 0.3, -0.3], 50), P([TX + 11.0, 1.15, 0.35], [TX - 3.0, 0.3, -0.3], 50)],
      rear: [P([5.4, 0.9, -1.4], [1.5, 0.75, -3.7], 40), P([4.6, 0.85, -1.7], [1.5, 0.75, -3.7], 38)],
"""
PLAN="[0, 'plat'], [C.safety, 'robo'], [C.looks, 'dio'], [C.bye, 'mad'], [C.whole, 'dio2'], [C.left, 'mad'], [C.breaks, 'dioB'], [C.nox, 'dioN'], [C.oneletter, 'mad'], [C.lv, 'rear'], [C.style, 'mad'], [C.cta, 'cta']"
FACE="{ hook: 'worried', bye: 'neutral', left: 'shock', oneletter: 'shock', style: 'neutral' }"
BEATS=r"""
      label(t, 0.8, C.safety, '🚆 every last coach has this X');
      if (t >= C.safety + 0.5 && t < C.looks) stamp('SAFETY CHECK ✓', 540, 300, 56, '#2fbf71', C.safety + 0.5, t, -0.06, 'rgba(255,255,255,0.95)');
      label(t, C.looks + 0.3, C.bye, '👀 the station master looks for the X', '#2a6fd6');
      if (t >= C.whole + 2.2 && t < C.left) stamp('WHOLE TRAIN ✓', 540, 300, 56, '#2fbf71', C.whole + 2.2, t, -0.06, 'rgba(255,255,255,0.95)');
      label(t, C.breaks + 0.3, C.nox, '⚠️ the coupling breaks', '#e2711d');
      if (t >= C.nox + 0.3 && t < C.oneletter) stamp('NO X = STOP THE NEXT TRAIN', 540, 300, 44, '#e5484d', C.nox + 0.3, t, -0.05, 'rgba(255,255,255,0.95)');
      if (t >= C.lv + 0.6 && t < C.style) { chip('☀️ day: LV board = Last Vehicle', 540, 230, 36, DARK, '#ffd34a', fin(t, C.lv + 0.6, 0.3), pop(t, C.lv + 0.6, 0.35)); chip('🌙 night: blinking red lamp', 540, 320, 36, DARK, '#ff7a85', fin(t, B('lv') + 4.3, 0.3), pop(t, B('lv') + 4.3, 0.35)); }
      endCard(t, '🚆 The X = last coach', 'no X = coaches missing', '📤 Send to your sleeper-class friend');
"""
SFX=r"""
    sfx.push(['train', 0.0, 0.5], ['whoosh', 0.2, 0.35], ['whoosh', 3.4, 0.3], ['chime', C.safety + 0.5, 0.3]);
    sfx.push(['train', C.looks, 0.3], ['ding', C.looks + 2.2, 0.3], ['train', C.whole, 0.25]); [0, 1, 2, 3, 4].forEach(i => sfx.push(['pop', C.whole + 1.2 + i * 0.37, 0.2]));
    sfx.push(['chime', C.whole + 2.2, 0.3], ['boing', C.left, 0.2], ['train', C.breaks, 0.3], ['zap', B('breaks') + 1.0, 0.4], ['thud', B('breaks') + 1.0, 0.35]);
    sfx.push(['buzz', C.nox + 0.3, 0.25], ['bass', C.nox + 0.3, 0.4], ['riser', C.nox + 0.8, 0.2], ['thud', C.nox + 3.2, 0.3], ['boing', C.oneletter, 0.2], ['beep', C.lv + 0.6, 0.2], ['beep', B('lv') + 4.3, 0.2], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);
"""
CUTS="C.looks, C.whole, C.breaks, C.lv, C.cta"
build('trainx',"@maddiee.makess 'Why?' series — the X on the last coach (Ministry of Railways: X/LV board/red lamp = whole train has passed, no coaches left behind).","bg: 0x2a2540, fog: [10, 40]","0.62",SET,WORLD,ACT,SHOTS,PLAN,FACE,BEATS,SFX,CUTS,LIGHTS)
