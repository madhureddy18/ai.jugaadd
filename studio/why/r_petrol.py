import sys; sys.path.insert(0,'/home/claude/why'); from gen import build
SET=r"""
    // petrol pump at dusk: Maddie on his scooty next to the dispenser
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(24, 16), SM(0x5d6168, 0.9)); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; S.add(ground);
    const isl = rbox(1.0, 0.12, 2.6, SM(0xd9d9d9, 0.6), 1.15, 0.06, -1.2, 0.03);
    const skyT = K.canvasTex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1d2b5a'); g.addColorStop(0.55, '#ff8a5a'); g.addColorStop(0.8, '#ffc27a'); g.addColorStop(1, '#3a2a3a'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(30, 12), new THREE.MeshBasicMaterial({ map: skyT, fog: false })); sky.position.set(0, 4, -9); S.add(sky);
    for (let i = 0; i < 10; i++) { const hgt = 1 + rng() * 3; const b = new THREE.Mesh(new THREE.BoxGeometry(1.4 + rng() * 1.5, hgt, 1), SM(0x2a2540, 0.9)); b.position.set(-12 + i * 2.6, hgt / 2, -7.5); S.add(b); }
    // canopy
    const can = rbox(8, 0.3, 4, SM(0xf2f2f2, 0.5), 0.5, 3.0, -0.8, 0.03); const band = new THREE.Mesh(new THREE.BoxGeometry(8.04, 0.18, 4.04), new THREE.MeshBasicMaterial({ color: 0x1fa463, toneMapped: false })); band.position.set(0.5, 2.92, -0.8); S.add(band);
    [-2.5, 3.5].forEach(x => rbox(0.25, 3, 0.25, SM(0xe5e5e5, 0.5), x, 1.5, -2.2, 0.03));
    const cl_ = []; for (let i = 0; i < 4; i++) { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.12), BM(0xfff6e0)); p.rotation.x = Math.PI / 2; p.position.set(-1.5 + i * 1.5, 2.84, -0.8); S.add(p); }
    // dispenser
    const disp = new THREE.Group(); disp.position.set(1.15, 0.12, -1.35); S.add(disp);
    rbox(0.6, 1.5, 0.45, SM(0xffffff, 0.5), 0, 0.75, 0, 0.04, disp); rbox(0.62, 0.3, 0.47, new THREE.MeshBasicMaterial({ color: 0x1fa463, toneMapped: false }), 0, 1.35, 0, 0.03, disp);
    const scrT = K.canvasTex(128, 96, (x, w, h) => { x.fillStyle = '#0a1a10'; x.fillRect(0, 0, w, h); x.fillStyle = '#5aff8a'; x.font = '700 30px monospace'; x.fillText('₹ 250', 10, 40); x.fillText('2.37 L', 10, 80); });
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.28), new THREE.MeshBasicMaterial({ map: scrT, toneMapped: false })); scr.position.set(0, 0.95, 0.226); disp.add(scr);
    const noz = rbox(0.06, 0.2, 0.08, SM(0x222222, 0.4), -0.25, 0.7, 0.24, 0.02, disp);
    // the "no mobile" board
    const signT = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = '#222'; x.beginPath(); x.roundRect(96, 50, 64, 120, 10); x.fill(); x.fillStyle = '#9ad'; x.fillRect(104, 66, 48, 84); x.strokeStyle = '#e5484d'; x.lineWidth = 18; x.beginPath(); x.arc(128, 110, 84, 0, 7); x.stroke(); x.beginPath(); x.moveTo(68, 50); x.lineTo(188, 170); x.stroke(); x.fillStyle = '#e5484d'; x.font = '900 28px sans-serif'; x.textAlign = 'center'; x.fillText('NO MOBILE', 128, 230); });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshStandardMaterial({ map: signT, roughness: 0.6 })); sign.position.set(-1.1, 1.9, -2.15); S.add(sign); rbox(0.05, 1.7, 0.05, SM(0x666666, 0.5), -1.1, 0.85, -2.2, 0.01);
    // Maddie's scooty (front toward the camera)
    const scoot = new THREE.Group(); scoot.position.set(-0.2, 0, -0.95); S.add(scoot); const sc1 = SM(0x2a6fd6, 0.35, { metalness: 0.3 }), blk = SM(0x1d1f24, 0.6);
    rbox(0.32, 0.12, 0.62, blk, 0, 0.5, -0.05, 0.05, scoot); rbox(0.34, 0.25, 0.75, sc1, 0, 0.32, -0.1, 0.08, scoot); rbox(0.3, 0.1, 0.4, sc1, 0, 0.18, 0.35, 0.04, scoot);
    const apron = rbox(0.36, 0.75, 0.1, sc1, 0, 0.55, 0.55, 0.06, scoot); apron.rotation.x = 0.25;
    const bar = rbox(0.6, 0.04, 0.04, SM(0x999999, 0.3, { metalness: 0.7 }), 0, 0.98, 0.5, 0.02, scoot); const hl = new THREE.Mesh(new THREE.CircleGeometry(0.05, 16), BM(0xfff6d0)); hl.position.set(0, 0.88, 0.62); scoot.add(hl);
    [0.55, -0.5].forEach(z => { const w = cyl(0.17, 0.17, 0.1, blk, 0, 0.17, z, 20, scoot); w.rotation.z = Math.PI / 2; });
"""
LIGHTS=r"""
    const hemi = new THREE.HemisphereLight(0xffe2cc, 0x30303a, 0.75); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff4e6, 1.2); key.position.set(0.5, 2.8, 1.5); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.6); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const rimP = new THREE.DirectionalLight(0xff8a5a, 0.8); rimP.position.set(-2, 2, -4); S.add(rimP);
"""
WORLD=r"""
    // ===== the experiment forecourt (x = PX): a car, petrol vapour, a phone, and a person full of static =====
    const PX = 40;
    const fc = new THREE.Group(); fc.position.x = PX; S.add(fc);
    const fBg = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ map: skyT, side: THREE.BackSide, fog: false })); fBg.position.y = -3; fc.add(fBg);
    const fG = new THREE.Mesh(new THREE.CircleGeometry(7, 48), SM(0x5d6168, 0.9)); fG.rotation.x = -Math.PI / 2; fG.receiveShadow = true; fc.add(fG);
    const car = new THREE.Group(); fc.add(car); const carM = SM(0xd94f5c, 0.35, { metalness: 0.3 });
    rbox(2.2, 0.5, 1.0, carM, 0, 0.45, 0, 0.12, car); rbox(1.2, 0.42, 0.92, SM(0x9fc7e8, 0.15, { metalness: 0.3 }), 0.1, 0.88, 0, 0.12, car); rbox(1.22, 0.06, 0.94, carM, 0.1, 1.1, 0, 0.03, car);
    [[-0.7, 0.5], [0.7, 0.5], [-0.7, -0.5], [0.7, -0.5]].forEach(([x, z]) => { const w = cyl(0.2, 0.2, 0.14, SM(0x1d1f24, 0.6), x, 0.2, z, 20, car); w.rotation.x = Math.PI / 2; });
    const door = rbox(0.55, 0.42, 0.03, carM, 0.25, 0.48, 0.51, 0.04, car);
    const fill = new THREE.Mesh(new THREE.CircleGeometry(0.06, 16), SM(0x111111, 0.5)); fill.position.set(-0.85, 0.58, 0.505); car.add(fill);
    const pump2 = new THREE.Group(); pump2.position.set(-1.7, 0, 0.9); fc.add(pump2); rbox(0.5, 1.4, 0.4, SM(0xffffff, 0.5), 0, 0.7, 0, 0.04, pump2); rbox(0.52, 0.26, 0.42, new THREE.MeshBasicMaterial({ color: 0x1fa463, toneMapped: false }), 0, 1.26, 0, 0.03, pump2);
    const nozz = rbox(0.06, 0.08, 0.2, SM(0x222222, 0.4), -0.85, 0.6, 0.6, 0.02, fc);
    const hose = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V(-1.6, 0.9, 0.9), V(-1.4, 0.35, 0.95), V(-1.05, 0.4, 0.8), V(-0.85, 0.6, 0.68)]), 24, 0.025, 8), SM(0x111111, 0.6)); fc.add(hose);
    // vapour
    const vTex = K.canvasTex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 64, 4, 64, 64, 62); g.addColorStop(0, 'rgba(160,255,140,0.55)'); g.addColorStop(1, 'rgba(160,255,140,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const vap = Array.from({ length: 16 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: vTex, transparent: true, depthWrite: false, opacity: 0 })); fc.add(s); return { s, o: [rng() - 0.5, rng(), rng() - 0.5], p: rng() * 6 }; });
    // a phone, ringing right in the vapour
    const phone = new THREE.Group(); fc.add(phone); rbox(0.09, 0.17, 0.015, SM(0x1b1d24, 0.3), 0, 0, 0, 0.012, phone); const phS = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.15), new THREE.MeshBasicMaterial({ color: 0x6fd8ff, toneMapped: false })); phS.position.z = 0.009; phone.add(phS);
    const ringT = K.canvasTex(128, 128, (x, w, h) => { x.strokeStyle = 'rgba(111,216,255,0.9)'; x.lineWidth = 6; x.beginPath(); x.arc(64, 64, 58, 0, 7); x.stroke(); });
    const rings = [0, 1, 2].map(() => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: ringT, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); fc.add(s); return s; });
    // the person
    const per = new THREE.Group(); fc.add(per); const pBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.45, 6, 12), SM(0x4f7fd9, 0.6)); pBody.position.y = 0.55; per.add(pBody);
    const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), SM(0xd8a47c, 0.6)); pHead.position.y = 1.0; per.add(pHead); const pHair = new THREE.Mesh(new THREE.SphereGeometry(0.125, 16, 8, 0, 6.283, 0, 1.3), SM(0x2a1c15, 0.7)); pHair.position.y = 1.02; per.add(pHair); [-0.045, 0.045].forEach(x => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), BM(0x111111)); e.position.set(x, 1.02, 0.11); per.add(e); });
    const pArm = new THREE.Group(); pArm.position.set(-0.12, 0.75, 0); per.add(pArm); const pa = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.3, 4, 8), SM(0x4f7fd9, 0.6)); pa.position.y = -0.17; pArm.add(pa);
    [-0.06, 0.06].forEach(x => { const l = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.25, 4, 8), SM(0x2b2f3a, 0.6)); l.position.set(x, 0.18, 0); per.add(l); });
    const plusT = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#ffd34a'; x.font = '900 56px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+', 32, 36); });
    const pluses = Array.from({ length: 14 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: plusT, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); s.scale.setScalar(0.1); per.add(s); return { s, a: rng() * 6.283, y: 0.2 + rng() * 0.9 }; });
    const spkT = K.canvasTex(128, 128, (x, w, h) => { x.strokeStyle = '#fff6a0'; x.lineWidth = 8; x.shadowColor = '#ffd34a'; x.shadowBlur = 16; x.beginPath(); x.moveTo(70, 8); x.lineTo(46, 62); x.lineTo(74, 62); x.lineTo(50, 120); x.stroke(); });
    const spark = new THREE.Sprite(new THREE.SpriteMaterial({ map: spkT, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); spark.scale.setScalar(0.22); spark.position.set(-0.85, 0.62, 0.72); fc.add(spark);
    const fireT = K.canvasTex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 80, 4, 64, 64, 62); g.addColorStop(0, 'rgba(255,240,160,1)'); g.addColorStop(0.4, 'rgba(255,140,40,0.85)'); g.addColorStop(1, 'rgba(255,60,0,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const fire = Array.from({ length: 10 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: fireT, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); fc.add(s); return { s, o: [rng() - 0.5, rng(), rng() - 0.5] }; });
    const fKey = new THREE.DirectionalLight(0xfff0e0, 1.4); fKey.position.set(PX + 1, 3, 4); fKey.target.position.set(PX - 0.4, 0.6, 0.5); fKey.castShadow = true; fKey.shadow.mapSize.set(2048, 2048); fKey.shadow.camera.left = -4; fKey.shadow.camera.right = 4; fKey.shadow.camera.top = 4; fKey.shadow.camera.bottom = -4; S.add(fKey); S.add(fKey.target);
    const fHemi = new THREE.HemisphereLight(0xffd9c2, 0x30303a, 0.5); fHemi.position.set(PX, 4, 0); S.add(fHemi);
    const fireL = new THREE.PointLight(0xff8a30, 0, 3, 1.4); fireL.position.set(PX - 0.85, 0.8, 0.9); S.add(fireL);
"""
ACT=r"""
      // vapour shimmering at the filler
      const vOn = t >= C.twist ? 1 : 0, vBig = t >= C.vapour ? 1.6 : 1;
      vap.forEach((v, i) => { const q = (t * 0.25 + v.p) % 1; v.s.position.set(-0.85 + v.o[0] * 0.3 * vBig, 0.6 + q * 0.45 * vBig, 0.75 + v.o[2] * 0.25 * vBig); v.s.scale.setScalar(0.25 * vBig * (0.7 + q)); v.s.material.opacity = vOn * Math.sin(q * Math.PI) * 0.8; });
      // the phone test: rings in the vapour, nothing happens
      const phOn = t >= C.twist && t < C.static; phone.visible = phOn; phone.position.set(-0.6, 0.78, 0.85); phone.rotation.set(0, -0.3, Math.sin(t * 40) * 0.08 * (phOn ? 1 : 0));
      rings.forEach((r, i) => { const q = (t * 0.9 + i / 3) % 1; r.position.copy(phone.position); r.scale.setScalar(0.1 + q * 0.4); r.material.opacity = phOn ? (1 - q) * 0.8 : 0; });
      // the person: stands at the nozzle, gets back in the car, charges up, comes back, touches the nozzle → spark
      const t0 = C.nozzle + 2.3; const q = t - t0; let px = -0.25, pz = 1.05, inCar = false;
      if (t >= C.nozzle) { if (q < 0) {} else if (q < 1.0) { px = lerp(-0.25, 0.3, q); pz = lerp(1.05, 0.85, q); } else if (q < 2.2) { px = 0.3; pz = 0.35; inCar = true; } else if (q < 3.2) { const k = q - 2.2; px = lerp(0.3, -0.45, k); pz = lerp(0.85, 1.0, k); } else { px = -0.45; pz = 1.0; } }
      per.position.set(px, inCar ? 0.15 : 0, pz); per.rotation.y = t >= C.nozzle && q > 0 && q < 1 ? -1.3 : t >= C.nozzle && q > 2.2 && q < 3.2 ? 1.3 : 0.3; per.visible = t >= C.static;
      door.rotation.y = t >= C.nozzle && q > 0.8 && q < 2.4 ? -0.9 : 0; door.position.x = t >= C.nozzle && q > 0.8 && q < 2.4 ? 0.0 : 0.25;
      const touch = t >= C.nozzle && q > 3.2; pArm.rotation.x = touch ? -1.2 : 0;
      let charge = 0; if (t >= C.static && t < C.nozzle) charge = pr(t, C.static + 0.6, C.static + 1.6) * 0.6; if (t >= C.nozzle && q > 1.0) charge = q < 3.4 ? pr(q, 1.0, 2.2) : 0;
      pluses.forEach((p, i) => { p.s.position.set(Math.cos(p.a + t * 2) * 0.22, p.y, Math.sin(p.a + t * 2) * 0.22); p.s.material.opacity = i / pluses.length < charge ? 1 : 0; });
      const sT = t >= C.nozzle ? t0 + 3.4 : C.vapour + 2.6; const sq = t - sT; spark.material.opacity = sq > 0 && sq < 0.35 && t < C.innocent ? 1 - sq / 0.35 : 0; spark.scale.setScalar(0.22 * (1 + Math.random() * 0.3));
      const fq = t - (t0 + 3.45), fOn = t >= C.nozzle && fq > 0 && fq < 1.4;
      fire.forEach(f => { f.s.position.set(-0.85 + f.o[0] * 0.35, 0.7 + f.o[1] * 0.5 * cl(fq * 3), 0.95 + f.o[2] * 0.2); f.s.scale.setScalar(0.7 * eo(cl(fq * 3)) * (1 - pr(fq, 0.9, 1.4))); f.s.material.opacity = fOn ? 0.95 : 0; });
      fireL.intensity = fOn ? 9 * (1 - pr(fq, 0.9, 1.4)) : 0;
"""
SHOTS=r"""
      pump: [P([-1.0, 1.7, 0.4], [-1.05, 1.8, -2.15], 40), P([-1.0, 1.75, 0.0], [-1.08, 1.85, -2.15], 40)],
      lab: [P([PX - 0.3, 1.2, 3.6], [PX - 0.4, 0.65, 0.4], 42), P([PX - 0.4, 1.1, 3.2], [PX - 0.5, 0.65, 0.4], 42)],
      ph: [P([PX - 0.45, 0.95, 2.1], [PX - 0.7, 0.75, 0.8], 38), P([PX - 0.5, 0.9, 1.8], [PX - 0.7, 0.75, 0.8], 38)],
      vap: [P([PX - 0.6, 1.0, 2.3], [PX - 0.8, 0.75, 0.75], 40), P([PX - 0.65, 0.95, 2.0], [PX - 0.82, 0.75, 0.75], 40)],
      wide: [P([PX - 0.4, 1.4, 4.6], [PX - 0.45, 0.65, 0.6], 44), P([PX - 0.45, 1.35, 4.3], [PX - 0.5, 0.65, 0.6], 44)],
"""
PLAN="[0, 'two'], [2.2, 'pump'], [C.twist, 'ph'], [C.board, 'mad'], [C.rumour, 'pump'], [C.static, 'lab'], [C.shock, 'mad'], [C.vapour, 'vap'], [C.nozzle, 'wide'], [C.innocent + 0.9, 'mad'], [C.follow, 'two'], [C.cta, 'cta']"
FACE="{ hook: 'worried', board: 'shock', shock: 'neutral', innocent: 'shock' }"
BEATS=r"""
      label(t, 0.8, C.twist, '⛽ the "no mobile" board at every pump');
      if (t >= C.twist + 1.2 && t < C.board) stamp('PHONE FIRES CONFIRMED: 0', 540, 300, 48, '#2fbf71', C.twist + 1.2, t, -0.05, 'rgba(255,255,255,0.95)');
      if (t >= C.rumour + 0.3 && t < C.static) { chip('📰 an old rumour', 540, 230, 38, DARK, '#ffd34a', fin(t, C.rumour + 0.3, 0.3), pop(t, C.rumour + 0.3, 0.35)); chip('📵 phones distract you near fuel', 540, 320, 38, DARK, '#9fd8ff', fin(t, B('rumour') + 2.0, 0.3), pop(t, B('rumour') + 2.0, 0.35)); }
      if (t >= C.static + 0.8 && t < C.shock) stamp('⚡ STATIC ELECTRICITY', 540, 300, 54, '#ffd34a', C.static + 0.8, t, -0.05, 'rgba(10,14,40,0.95)');
      label(t, C.vapour + 0.3, C.nozzle, '💨 petrol vapour + ⚡ one spark', '#e2711d');
      label(t, C.nozzle + 0.7, C.innocent, '🚗 back in the car → ⚡ charged → touches nozzle', '#e5484d');
      if (t >= C.follow + 0.3 && t < C.cta) { chip('✅ still follow the pump rules', 540, 230, 38, DARK, '#9dff7a', fin(t, C.follow + 0.3, 0.3), pop(t, C.follow + 0.3, 0.35)); chip('🚭 never smoke there', 540, 320, 38, DARK, '#ff7a85', fin(t, B('follow') + 2.0, 0.3), pop(t, B('follow') + 2.0, 0.35)); }
      endCard(t, '⛽ The real risk: static, not phones', 'don\'t get back in mid-fill', '📤 Send to your "it\'ll blast" friend');
"""
SFX=r"""
    sfx.push(['chime', 0.3, 0.2], ['whoosh', 2.2, 0.25]); for (let t2 = C.twist + 0.2; t2 < C.twist + 1.2; t2 += 0.3) sfx.push(['beep', t2, 0.15]); sfx.push(['ding', C.twist + 1.2, 0.35]);
    sfx.push(['boing', C.board, 0.2], ['chime', B('rumour') + 2.0, 0.25], ['zap', C.static + 0.8, 0.3], ['boing', C.shock, 0.2], ['riser', C.vapour + 0.3, 0.2], ['zap', C.vapour + 2.6, 0.25]);
    sfx.push(['whoosh', C.nozzle + 2.3, 0.2], ['thud', C.nozzle + 3.1, 0.2], ['riser', C.nozzle + 3.3, 0.2], ['zap', C.nozzle + 5.7, 0.4], ['whoosh', C.nozzle + 5.75, 0.4], ['bass', C.nozzle + 5.75, 0.4]);
    sfx.push(['boing', C.innocent, 0.2], ['chime', C.follow + 0.3, 0.25], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);
"""
CUTS="C.twist, C.static, C.vapour, C.nozzle, C.cta"
build('petrol',"@maddiee.makess 'Why?' series — phones at petrol pumps: PEI has no documented case of a phone causing a refuelling fire; static discharge (re-entering the car mid-fill) does. Still follow pump rules.","bg: 0x1d2b5a, fog: [9, 40]","0.92",SET,WORLD,ACT,SHOTS,PLAN,FACE,BEATS,SFX,CUTS,LIGHTS)
