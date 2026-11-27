import sys; sys.path.insert(0,'/home/claude/why'); from gen import build
SET=r"""
    // kitchen: Maddie on a stool, the stove on the counter beside him, milk boiling over
    const tileTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#e8eef0'; x.fillRect(0, 0, w, h); x.strokeStyle = '#b9c6cc'; x.lineWidth = 4; for (let i = 0; i <= w; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); } });
    tileTex.wrapS = tileTex.wrapT = THREE.RepeatWrapping; tileTex.repeat.set(10, 4);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(8, 3.2), new THREE.MeshStandardMaterial({ map: tileTex, roughness: 0.4 })); back.position.set(0.3, 1.6, -1.7); back.receiveShadow = true; S.add(back);
    const side = new THREE.Mesh(new THREE.PlaneGeometry(5, 3.2), SM(0xf3d9a8, 0.8)); side.rotation.y = Math.PI / 2; side.position.set(-1.6, 1.6, 0.5); S.add(side);
    const floorT = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#c99c6b'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(90,60,30,0.35)'; x.lineWidth = 3; for (let i = 0; i <= w; i += 32) { x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); } }); floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping; floorT.repeat.set(6, 6);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshStandardMaterial({ map: floorT, roughness: 0.8 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; S.add(floor);
    const counterM = SM(0x3f6f8f, 0.6), topM = SM(0x2b2f36, 0.3, { metalness: 0.2 });
    rbox(2.0, 0.86, 0.75, counterM, 1.25, 0.43, -1.2, 0.02); rbox(2.1, 0.06, 0.82, topM, 1.25, 0.89, -1.18, 0.01);
    rbox(2.0, 0.86, 0.75, counterM, -1.0, 0.43, -1.45, 0.02); rbox(2.1, 0.06, 0.8, topM, -1.0, 0.89, -1.42, 0.01);
    [0.6, 1.4].forEach(x => rbox(0.6, 0.5, 0.35, SM(0x7fb3cf, 0.6), x, 2.25, -1.5, 0.02));
    const winT = K.canvasTex(128, 128, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#7ec8ff'); g.addColorStop(1, '#ffe2a8'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.strokeStyle = '#fff'; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8); x.beginPath(); x.moveTo(64, 0); x.lineTo(64, h); x.moveTo(0, 64); x.lineTo(w, 64); x.stroke(); });
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.8), new THREE.MeshBasicMaterial({ map: winT })); win.position.set(-1.0, 1.75, -1.69); S.add(win);
    // stool
    cyl(0.22, 0.22, 0.06, SM(0xd0533a, 0.6), -0.2, 0.52, -0.95, 24); [[-0.12, -0.12], [0.12, -0.12], [-0.12, 0.12], [0.12, 0.12]].forEach(([dx, dz]) => cyl(0.02, 0.02, 0.5, SM(0x333333, 0.4, { metalness: 0.5 }), -0.2 + dx, 0.25, -0.95 + dz, 8));
    // stove + pan on the counter
    rbox(0.75, 0.08, 0.5, SM(0x1d1f24, 0.3, { metalness: 0.5 }), 1.25, 0.96, -1.15, 0.02);
    const flameTex = K.canvasTex(64, 128, (x, w, h) => { const g = x.createLinearGradient(0, h, 0, 0); g.addColorStop(0, 'rgba(60,120,255,1)'); g.addColorStop(0.6, 'rgba(120,180,255,0.6)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(8, h); x.quadraticCurveTo(32, 0, 56, h); x.fill(); });
    const hFl = Array.from({ length: 8 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: flameTex, transparent: true, depthWrite: false, toneMapped: false })); const a = i / 8 * 6.283; s.position.set(1.07 + Math.cos(a) * 0.1, 1.03, -1.12 + Math.sin(a) * 0.1); s.scale.set(0.05, 0.08, 1); S.add(s); return s; });
    const panM = SM(0x9aa1aa, 0.25, { metalness: 0.8 });
    const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.15, 32, 1, true), new THREE.MeshStandardMaterial({ color: 0x9aa1aa, roughness: 0.25, metalness: 0.8, side: THREE.DoubleSide })); pan.position.set(1.07, 1.1, -1.12); S.add(pan);
    cyl(0.14, 0.14, 0.01, panM, 1.07, 1.03, -1.12, 32); const handle = rbox(0.3, 0.03, 0.04, SM(0x222222, 0.5), 1.35, 1.14, -1.12, 0.01);
    const panMilk = new THREE.Mesh(new THREE.CircleGeometry(0.155, 32), SM(0xfffaf0, 0.5)); panMilk.rotation.x = -Math.PI / 2; panMilk.position.set(1.07, 1.15, -1.12); S.add(panMilk);
    const HF = 90, hFoam = new THREE.InstancedMesh(new THREE.SphereGeometry(0.03, 10, 8), SM(0xfffdf6, 0.5), HF); hFoam.frustumCulled = false; S.add(hFoam);
    const hfD = Array.from({ length: HF }, () => [rng() * 6.283, rng(), rng()]);
    const puddle = new THREE.Mesh(new THREE.CircleGeometry(0.32, 32), SM(0xfffaf0, 0.4)); puddle.rotation.x = -Math.PI / 2; puddle.position.set(1.07, 1.003, -1.12); S.add(puddle);
"""
LIGHTS=r"""
    const hemi = new THREE.HemisphereLight(0xfff4e6, 0x6a5040, 0.8); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff0dc, 1.3); key.position.set(1.0, 2.8, 2.2); key.target.position.set(0.2, 0.9, -0.9); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.5); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const winL = new THREE.PointLight(0xffd9a0, 1.2, 4, 1.5); winL.position.set(-1.0, 1.8, -1.2); S.add(winL);
"""
WORLD=r"""
    // ===== the science lab (x = MX): WATER vs MILK in two giant glass pots =====
    const MX = 40, VR = 0.5, VB = 0.32, VH = 1.25, SURF = VB + 0.8;
    const lab = new THREE.Group(); lab.position.x = MX; S.add(lab);
    const labBg = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ map: K.canvasTex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0c1a3a'); g.addColorStop(0.55, '#24407a'); g.addColorStop(1, '#0c1530'); x.fillStyle = g; x.fillRect(0, 0, w, h); }), side: THREE.BackSide, fog: false })); lab.add(labBg);
    const labFloor = new THREE.Mesh(new THREE.CircleGeometry(6, 48), SM(0x1b2440, 0.4, { metalness: 0.3 })); labFloor.rotation.x = -Math.PI / 2; lab.add(labFloor);
    const pots = [-0.7, 0.7].map((px, k) => { const g = new THREE.Group(); g.position.x = px; lab.add(g);
      rbox(1.3, 0.3, 1.3, SM(0x2b2f36, 0.3, { metalness: 0.5 }), 0, 0.15, 0, 0.04, g);
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(VR, VR, VH, 48, 1, true), new THREE.MeshStandardMaterial({ color: 0xdff3ff, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false })); glass.position.y = VB + VH / 2; g.add(glass);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(VR, 0.015, 8, 48), SM(0xffffff, 0.2)); rim.rotation.x = Math.PI / 2; rim.position.y = VB + VH; g.add(rim);
      const liq = new THREE.Mesh(new THREE.CylinderGeometry(VR - 0.02, VR - 0.02, 0.8, 48), new THREE.MeshStandardMaterial(k ? { color: 0xfffaf0, roughness: 0.5, transparent: true, opacity: 0.55, depthWrite: false } : { color: 0x5ab0ff, roughness: 0.1, transparent: true, opacity: 0.35, depthWrite: false })); liq.position.y = VB + 0.4; g.add(liq);
      const fl = Array.from({ length: 12 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: flameTex, transparent: true, depthWrite: false, toneMapped: false })); const a = i / 12 * 6.283; s.position.set(Math.cos(a) * 0.3, 0.37, Math.sin(a) * 0.3); s.scale.set(0.12, 0.2, 1); g.add(s); return s; });
      const lt = K.canvasTex(256, 96, (x, w, h) => { x.fillStyle = k ? '#fff5dc' : '#2a6fd6'; x.beginPath(); x.roundRect(4, 4, w - 8, h - 8, 40); x.fill(); x.fillStyle = k ? '#5a3a10' : '#fff'; x.font = '900 52px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(k ? 'MILK' : 'WATER', w / 2, h / 2 + 3); });
      const lb = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt, transparent: true, depthWrite: false, toneMapped: false })); lb.scale.set(0.55, 0.2, 1); lb.position.set(0, VB + VH + 0.28, 0); g.add(lb);
      return { g, fl, liq, lb }; });
    const BN = 70, bubGeo = new THREE.SphereGeometry(0.035, 10, 8), bubM = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, transparent: true, opacity: 0.7, depthWrite: false });
    const wB = new THREE.InstancedMesh(bubGeo, bubM, BN), mB = new THREE.InstancedMesh(bubGeo, bubM, BN); wB.frustumCulled = mB.frustumCulled = false; pots[0].g.add(wB); pots[1].g.add(mB);
    const bD = Array.from({ length: BN }, () => { const a = rng() * 6.283, r = Math.sqrt(rng()) * 0.42; return [Math.cos(a) * r, Math.sin(a) * r, rng(), 0.6 + rng() * 0.8]; });
    // proteins + fat (yellow specks) rising to make the skin
    const PN = 120, prot = new THREE.InstancedMesh(new THREE.SphereGeometry(0.018, 6, 5), BM(0xffc94a), PN); prot.frustumCulled = false; pots[1].g.add(prot);
    const pD = Array.from({ length: PN }, () => { const a = rng() * 6.283, r = Math.sqrt(rng()) * 0.45; return [Math.cos(a) * r, Math.sin(a) * r, VB + 0.05 + rng() * 0.7, rng() * 0.8]; });
    const skinSeg = Array.from({ length: 6 }, (_, i) => { const m = new THREE.Mesh(new THREE.CircleGeometry(VR - 0.015, 16, i / 6 * 6.283, 6.283 / 6), new THREE.MeshStandardMaterial({ color: 0xf5dc9a, roughness: 0.6, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })); m.rotation.x = -Math.PI / 2; pots[1].g.add(m); return m; });
    const FN = 260, foam = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 10, 8), SM(0xfffdf6, 0.5), FN); foam.frustumCulled = false; pots[1].g.add(foam);
    const fD = Array.from({ length: FN }, () => { const a = rng() * 6.283, r = Math.sqrt(rng()); return [a, r, rng(), 0.6 + rng() * 0.7]; });
    const spoon = new THREE.Group(); pots[1].g.add(spoon); const sp1 = rbox(0.06, 1.1, 0.03, SM(0xb07a45, 0.6), 0, 0.55, 0, 0.015, spoon); const sp2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 10), SM(0xb07a45, 0.6)); sp2.scale.set(1, 0.4, 0.6); spoon.add(sp2);
    const lKey = new THREE.DirectionalLight(0xffffff, 1.5); lKey.position.set(MX + 1.5, 3, 3); lKey.target.position.set(MX, 0.8, 0); S.add(lKey); S.add(lKey.target);
    const lRim = new THREE.PointLight(0x6fb8ff, 3, 6, 1.3); lRim.position.set(MX - 1.5, 2, -2); S.add(lRim); const lFire = new THREE.PointLight(0x5a8cff, 2.0, 2.5, 1.5); lFire.position.set(MX, 0.5, 0.6); S.add(lFire);
"""
ACT=r"""
      // home: the pan boils over in the hook, calm later
      const over = t < C.why + 0.5 ? cl(0.4 + t * 0.4) : 0;
      for (let i = 0; i < HF; i++) { const d = hfD[i]; const q = (d[1] + t * 0.15) % 1; let x, y, z;
        if (d[2] < 0.55) { const r = 0.14 * Math.sqrt(d[1]); x = Math.cos(d[0] + t * 0.3) * r; z = Math.sin(d[0] + t * 0.3) * r; y = 0.16 + d[2] * 0.12 + Math.sin(t * 5 + i) * 0.01; }
        else { const r = 0.165 + q * 0.12; x = Math.cos(d[0]) * r; z = Math.sin(d[0]) * r; y = 0.16 - q * 0.17; }
        dummy.position.set(1.07 + x, 1.03 + y * over, -1.12 + z); dummy.scale.setScalar(over > 0.05 ? (0.8 + d[2] * 0.7) : 0.0001); dummy.updateMatrix(); hFoam.setMatrixAt(i, dummy.matrix); }
      hFoam.instanceMatrix.needsUpdate = true; puddle.visible = over > 0.05;
      hFl.forEach((s, i) => { s.scale.set(0.05, 0.08 * (0.8 + 0.3 * Math.sin(t * 20 + i)), 1); });
      // lab
      const heat = t < C.stir + 1.0 ? 1 : 0.45; pots.forEach(p => p.lb.material.opacity = t < C.pile ? 1 : 0);
      pots.forEach(p => p.fl.forEach((s, i) => { s.scale.set(0.12 * heat, 0.2 * heat * (0.85 + 0.25 * Math.sin(t * 18 + i)), 1); }));
      const skinK = pr(t, C.skin + 0.8, B('skin') + 3.6);
      let fh = 0;                                                       // foam height above the milk surface
      if (t >= C.trapped) fh = 0.14 * eo(pr(t, C.trapped + 0.5, E('trapped')));
      if (t >= C.lid) fh = lerp(0.14, 0.62, ei(pr(t, C.lid + 0.3, B('lid') + 4.3)));
      if (t >= C.stir) fh = lerp(0.62, 0, eo(pr(t, B('stir') + 4.2, B('stir') + 5.8)));
      const skinY = SURF + fh, overflow = cl((skinY - (VB + VH)) / 0.12);
      const broken = pr(t, B('stir') + 3.9, B('stir') + 4.6);
      skinSeg.forEach((m, i) => { const a = (i + 0.5) / 6 * 6.283; m.position.set(Math.cos(a) * broken * 0.12, skinY + 0.005, -Math.sin(a) * broken * 0.12); m.material.opacity = skinK * (1 - broken) * 0.92; });
      for (let i = 0; i < PN; i++) { const d = pD[i]; const q = eo(pr(t, C.skin + 0.4 + d[3], C.skin + 1.8 + d[3])); dummy.position.set(d[0], lerp(d[2], skinY - 0.01, q), d[1]); dummy.scale.setScalar(t >= C.skin && t < C.water + 0.5 && q < 1 ? 1 : 0.0001); dummy.updateMatrix(); prot.setMatrixAt(i, dummy.matrix); }
      prot.instanceMatrix.needsUpdate = true;
      for (let i = 0; i < BN; i++) { const d = bD[i]; const q = (d[2] + t * 0.45 * d[3]) % 1; const y = VB + 0.05 + q * 0.78;
        dummy.position.set(d[0], y, d[1]); dummy.scale.setScalar(q > 0.94 ? (1 - q) / 0.06 * 1.4 : 0.5 + q * 0.6); dummy.updateMatrix(); wB.setMatrixAt(i, dummy.matrix);
        const trapped = skinK > 0.6 && t >= C.trapped && broken < 0.5; let my = y, ms = 0.5 + q * 0.6;
        if (trapped) { my = Math.min(y, skinY - 0.04 - d[2] * 0.06); } else if (q > 0.94) ms = (1 - q) / 0.06;
        dummy.position.set(d[0], my, d[1]); dummy.scale.setScalar(ms); dummy.updateMatrix(); mB.setMatrixAt(i, dummy.matrix); }
      wB.instanceMatrix.needsUpdate = mB.instanceMatrix.needsUpdate = true;
      for (let i = 0; i < FN; i++) { const d = fD[i]; let x = Math.cos(d[0]) * d[1] * (VR - 0.05), z = Math.sin(d[0]) * d[1] * (VR - 0.05), y = SURF + d[2] * fh, s = fh > 0.01 ? d[3] : 0.0001;
        if (overflow > 0 && d[2] > 0.75) { const q = ((d[2] - 0.75) * 4 + t * 0.35) % 1; const r = VR + 0.04 + q * 0.05; x = Math.cos(d[0]) * r; z = Math.sin(d[0]) * r; y = VB + VH - q * (VH - 0.05) * overflow; s = d[3] * overflow; }
        dummy.position.set(x, y, z); dummy.scale.setScalar(s); dummy.updateMatrix(); foam.setMatrixAt(i, dummy.matrix); }
      foam.instanceMatrix.needsUpdate = true;
      spoon.visible = t >= C.stir && t < C.villain + 0.3; const sa = t * 4; spoon.position.set(Math.cos(sa) * 0.22, VB + 0.2, Math.sin(sa) * 0.22); spoon.rotation.z = 0.25;
"""
SHOTS=r"""
      stove: [P([1.0, 1.42, 0.55], [1.07, 1.1, -1.12], 40), P([0.95, 1.38, 0.35], [1.07, 1.1, -1.12], 36)],
      labW: [P([MX, 1.4, 4.2], [MX, 0.95, 0], 42), P([MX + 0.2, 1.35, 3.7], [MX, 0.95, 0], 42)],
      water: [P([MX - 0.55, 1.4, 3.0], [MX - 0.7, 0.95, 0], 40), P([MX - 0.6, 1.35, 2.7], [MX - 0.7, 0.95, 0], 40)],
      milk: [P([MX + 0.85, 1.45, 3.0], [MX + 0.7, 1.05, 0], 40), P([MX + 0.8, 1.4, 2.7], [MX + 0.7, 1.05, 0], 40)],
      milkUp: [P([MX + 0.9, 1.6, 3.5], [MX + 0.7, 1.15, 0], 42), P([MX + 0.85, 1.75, 3.2], [MX + 0.7, 1.25, 0], 42)],
"""
PLAN="[0, 'two'], [1.6, 'stove'], [C.classic, 'robo'], [C.why, 'mad'], [C.skin, 'labW'], [C.water, 'water'], [C.trapped, 'milk'], [C.pile, 'mad'], [C.lid, 'milkUp'], [C.stop, 'mad'], [C.stir, 'milkUp'], [C.villain, 'mad'], [C.cta, 'cta']"
FACE="{ hook: 'shock', why: 'worried', pile: 'shock', stop: 'worried', villain: 'neutral' }"
BEATS=r"""
      label(t, 1.7, C.classic, '🥛 5 seconds. That\'s all it takes.');
      label(t, C.skin + 1.0, C.water, '🟡 proteins + fat → a skin on top', '#c98a00');
      label(t, C.water + 0.3, C.trapped, '💧 water: bubbles just pop', '#2a6fd6');
      label(t, C.trapped + 0.3, C.pile, '🥛 milk: bubbles get trapped', '#7b2ff7');
      if (t >= B('lid') + 4.3 && t < C.stop) stamp('BOILED OVER!', 540, 300, 60, '#e5484d', B('lid') + 4.3, t, -0.06, 'rgba(255,255,255,0.95)');
      if (t >= C.stir + 0.3 && t < C.villain) { chip('🔥 lower the flame', 540, 230, 38, DARK, '#ffd34a', fin(t, C.stir + 0.3, 0.3), pop(t, C.stir + 0.3, 0.35)); chip('🥄 keep stirring → skin breaks', 540, 320, 38, DARK, '#9dff7a', fin(t, B('stir') + 2.3, 0.3), pop(t, B('stir') + 2.3, 0.35)); }
      endCard(t, '🥛 The skin traps the steam', 'lower flame + stir = no mess', '📤 Send to your chai friend');
"""
SFX=r"""
    for (let t2 = 0.1; t2 < 2.4; t2 += 0.18) sfx.push(['pop', t2, 0.12]); sfx.push(['boing', 0.1, 0.2], ['whoosh', 1.6, 0.25]);
    sfx.push(['riser', C.skin + 0.5, 0.2], ['chime', B('skin') + 3.0, 0.3]); for (let t2 = C.water + 0.2; t2 < C.trapped; t2 += 0.2) sfx.push(['pop', t2, 0.1]);
    sfx.push(['thud', B('trapped') + 1.0, 0.3], ['boing', C.pile, 0.2], ['riser', C.lid + 0.3, 0.3], ['whoosh', B('lid') + 4.3, 0.4], ['bass', B('lid') + 4.3, 0.45]);
    sfx.push(['boing', C.stop, 0.2], ['whoosh', C.stir + 0.3, 0.2], ['chime', B('stir') + 3.9, 0.3], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);
"""
CUTS="C.skin, C.water, C.trapped, C.lid, C.stir, C.cta"
build('milk',"@maddiee.makess 'Why?' series — milk boils over: proteins + fat form a skin that traps steam bubbles; water bubbles just pop.","bg: 0x1a2030, fog: [9, 40]","0.95",SET,WORLD,ACT,SHOTS,PLAN,FACE,BEATS,SFX,CUTS,LIGHTS)
