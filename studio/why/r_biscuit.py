import sys; sys.path.insert(0,'/home/claude/why'); from gen import build
SET=r"""
    // living room tea-time: Maddie at the table, a plate of biscuits and chai
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(8, 3.4), SM(0xe9c9a0, 0.85)); wall.position.set(0.3, 1.7, -1.8); wall.receiveShadow = true; S.add(wall);
    const wall2 = new THREE.Mesh(new THREE.PlaneGeometry(5, 3.4), SM(0xd9b48a, 0.85)); wall2.rotation.y = Math.PI / 2; wall2.position.set(-1.7, 1.7, 0.6); S.add(wall2);
    const floorT = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#b5835a'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(70,40,20,0.3)'; x.lineWidth = 3; for (let i = 0; i <= w; i += 32) { x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); } }); floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping; floorT.repeat.set(6, 6);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshStandardMaterial({ map: floorT, roughness: 0.8 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; S.add(floor);
    const winT = K.canvasTex(128, 160, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#8fd0ff'); g.addColorStop(1, '#ffe9b8'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.strokeStyle = '#fff'; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8); x.beginPath(); x.moveTo(64, 0); x.lineTo(64, h); x.stroke(); });
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.1), new THREE.MeshBasicMaterial({ map: winT })); win.position.set(-0.9, 1.75, -1.79); S.add(win);
    const curtain = rbox(0.25, 1.4, 0.05, SM(0x2f8f6b, 0.8), -1.45, 1.75, -1.75, 0.02);
    const clockT = K.canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#fff'; x.beginPath(); x.arc(64, 64, 60, 0, 7); x.fill(); x.strokeStyle = '#333'; x.lineWidth = 6; x.stroke(); x.lineWidth = 5; x.beginPath(); x.moveTo(64, 64); x.lineTo(64, 26); x.moveTo(64, 64); x.lineTo(92, 74); x.stroke(); });
    const clk = new THREE.Mesh(new THREE.CircleGeometry(0.17, 32), new THREE.MeshBasicMaterial({ map: clockT })); clk.position.set(0.9, 2.3, -1.79); S.add(clk);
    const pot = cyl(0.14, 0.11, 0.3, SM(0xc0623a, 0.7), 1.55, 0.15, -1.45, 16); for (let i = 0; i < 6; i++) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), SM(0x3f8a3f, 0.8)); l.position.set(1.55 + (rng() - 0.5) * 0.25, 0.42 + rng() * 0.3, -1.45 + (rng() - 0.5) * 0.25); S.add(l); }
    // chair + table
    const woodM = SM(0x7a4a2a, 0.6);
    rbox(0.5, 0.06, 0.5, woodM, -0.2, 0.5, -0.95, 0.02); rbox(0.5, 0.7, 0.06, woodM, -0.2, 0.85, -1.2, 0.02); [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].forEach(([dx, dz]) => rbox(0.05, 0.5, 0.05, woodM, -0.2 + dx, 0.25, -0.95 + dz, 0.01));
    rbox(1.3, 0.05, 0.9, SM(0x9a5f34, 0.5), 0.75, 0.76, -1.0, 0.02); [[-0.55, -0.35], [0.55, -0.35], [-0.55, 0.35], [0.55, 0.35]].forEach(([dx, dz]) => rbox(0.06, 0.74, 0.06, woodM, 0.75 + dx, 0.37, -1.0 + dz, 0.01));
    // biscuits with docking holes
    const bTopTex = (holes, crack = false) => K.canvasTex(256, 256, (x, w, h) => { const g = x.createRadialGradient(128, 128, 20, 128, 128, 128); g.addColorStop(0, '#e9b56a'); g.addColorStop(0.85, '#d9963f'); g.addColorStop(1, '#b8722a'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 300; i++) { x.fillStyle = 'rgba(140,80,20,0.12)'; x.fillRect(Math.random() * w, Math.random() * h, 3, 3); }
      if (holes) HOLES.forEach(([u, v]) => { x.fillStyle = '#7a4416'; x.beginPath(); x.arc(128 + u * 100, 128 + v * 100, 8, 0, 7); x.fill(); x.fillStyle = 'rgba(255,230,180,0.5)'; x.beginPath(); x.arc(126 + u * 100, 126 + v * 100, 3, 0, 7); x.fill(); });
      if (crack) { x.strokeStyle = '#5a2e0a'; x.lineWidth = 7; x.beginPath(); x.moveTo(30, 120); x.lineTo(80, 140); x.lineTo(120, 110); x.lineTo(160, 150); x.lineTo(226, 128); x.moveTo(120, 110); x.lineTo(110, 50); x.moveTo(160, 150); x.lineTo(170, 215); x.stroke(); } });
    const HOLES = []; for (let r = 0; r < 3; r++) { const n = r === 0 ? 1 : r * 6; for (let i = 0; i < n; i++) { const a = i / n * 6.283 + r * 0.3; HOLES.push([Math.cos(a) * r * 0.35, Math.sin(a) * r * 0.35]); } }
    const sideM = SM(0xc98a3c, 0.75), holeTex = bTopTex(true);
    const biscuit = (r, parent, x, y, z, tex = holeTex) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, r * 0.22, 40), [sideM, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.75 }), sideM]); m.position.set(x, y, z); m.castShadow = true; parent.add(m); return m; };
    cyl(0.2, 0.17, 0.02, SM(0xf4f4f0, 0.3), 0.75, 0.795, -0.95, 32);
    [[0, 0, 0.82], [0.06, 0.03, 0.835], [-0.05, 0.05, 0.85], [0.01, -0.06, 0.865]].forEach(([dx, dz, y], i) => { const b = biscuit(0.07, S, 0.75 + dx, y, -0.95 + dz); b.rotation.set((rng() - 0.5) * 0.2, rng() * 3, (rng() - 0.5) * 0.2); });
    const cup = new THREE.Group(); cup.position.set(1.15, 0.79, -1.1); S.add(cup); cyl(0.06, 0.05, 0.12, SM(0xffffff, 0.3), 0, 0.06, 0, 24, cup); const chai = cyl(0.055, 0.055, 0.005, SM(0xc68a52, 0.4), 0, 0.115, 0, 24, cup);
    const sTex = K.canvasTex(64, 128, (x, w, h) => { const g = x.createLinearGradient(0, h, 0, 0); g.addColorStop(0, 'rgba(255,255,255,0.6)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.beginPath(); x.ellipse(32, 64, 18, 60, 0, 0, 7); x.fill(); });
    const cupSteam = [0, 1, 2].map(i => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: sTex, transparent: true, depthWrite: false })); s.scale.set(0.06, 0.14, 1); cup.add(s); return s; });
"""
LIGHTS=r"""
    const hemi = new THREE.HemisphereLight(0xfff0dc, 0x6a4a30, 0.8); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff0dc, 1.3); key.position.set(-1.0, 2.6, 2.0); key.target.position.set(0.3, 0.9, -0.9); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.5); front.position.set(0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const winL = new THREE.PointLight(0xffe0a8, 1.4, 4, 1.4); winL.position.set(-0.9, 1.8, -1.2); S.add(winL);
"""
WORLD=r"""
    // ===== inside the oven (x = BX): a biscuit WITH holes vs one WITHOUT =====
    const BX = 40, TY = 0.55;
    const ov = new THREE.Group(); ov.position.x = BX; S.add(ov);
    const ovM = new THREE.MeshStandardMaterial({ color: 0x2a2624, roughness: 0.5, metalness: 0.6, side: THREE.BackSide });
    const box = new THREE.Mesh(new THREE.BoxGeometry(4, 2.4, 3.4), ovM); box.position.set(0, 1.1, -0.6); ov.add(box);
    const rodM = new THREE.MeshBasicMaterial({ color: 0xff5a1a, toneMapped: false });
    const rods = [2.2, 0.0].flatMap(y => [-0.9, -0.3, 0.3, 0.9].map(z => { const r = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.6, 10), rodM); r.rotation.z = Math.PI / 2; r.position.set(0, y + 0.02, z - 0.6); ov.add(r); return r; }));
    const tray = rbox(3.2, 0.04, 1.8, SM(0x8a8f98, 0.35, { metalness: 0.7 }), 0, TY - 0.02, -0.4, 0.01, ov);
    const bigR = 0.5, bH = bigR * 0.22;
    const bA = biscuit(bigR, ov, -0.62, TY + bH / 2, -0.4), noTex = bTopTex(false), crTex = bTopTex(false, true);
    const bB = biscuit(bigR, ov, 0.62, TY + bH / 2, -0.4, noTex);
    const domeM = new THREE.MeshStandardMaterial({ map: noTex, roughness: 0.75 });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(bigR, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), domeM); dome.position.set(0.62, TY + bH, -0.4); dome.scale.set(1, 0.001, 1); ov.add(dome);
    const lt = (s, bg, fg) => K.canvasTex(320, 96, (x, w, h) => { x.fillStyle = bg; x.beginPath(); x.roundRect(4, 4, w - 8, h - 8, 40); x.fill(); x.fillStyle = fg; x.font = '900 46px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, w / 2, h / 2 + 3); });
    const lA = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt('WITH HOLES', '#2fbf71', '#fff'), transparent: true, depthWrite: false, toneMapped: false })), lB = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt('NO HOLES', '#e5484d', '#fff'), transparent: true, depthWrite: false, toneMapped: false }));
    [lA, lB].forEach((s, i) => { s.scale.set(0.7, 0.21, 1); s.position.set(i ? 0.62 : -0.62, TY + 0.72, -0.4); ov.add(s); });
    // water droplets in the dough → steam
    const DN = 60, drops = new THREE.InstancedMesh(new THREE.SphereGeometry(0.02, 8, 6), new THREE.MeshBasicMaterial({ color: 0x6fd0ff, toneMapped: false }), DN * 2); drops.frustumCulled = false; ov.add(drops);
    const dD = Array.from({ length: DN * 2 }, (_, i) => { const a = rng() * 6.283, r = Math.sqrt(rng()) * 0.45; return [(i < DN ? -0.62 : 0.62) + Math.cos(a) * r, Math.sin(a) * r - 0.4, rng()]; });
    const stm = Array.from({ length: HOLES.length * 2 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: sTex, transparent: true, depthWrite: false, opacity: 0 })); s.scale.set(0.07, 0.2, 1); ov.add(s); return { s, h: HOLES[i % HOLES.length], o: i >= HOLES.length ? 0.5 : 0 }; });
    const burst = Array.from({ length: 14 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: sTex, transparent: true, depthWrite: false, opacity: 0 })); s.scale.set(0.25, 0.5, 1); ov.add(s); return { s, v: [rng() - 0.5, 0.6 + rng(), rng() - 0.5] }; });
    // docking: a dough sheet and a spiked roller
    const sheet = rbox(2.4, 0.05, 1.2, SM(0xf0d6a0, 0.8), 0, TY + 0.03, -0.4, 0.02, ov); sheet.visible = false;
    const roller = new THREE.Group(); ov.add(roller); const rc = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.2, 24), SM(0xd9d9d9, 0.3, { metalness: 0.7 })); rc.rotation.x = Math.PI / 2; roller.add(rc);
    for (let i = 0; i < 6; i++) for (let k = 0; k < 8; k++) { const p = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.08, 6), SM(0xbfbfbf, 0.3, { metalness: 0.8 })); const a = k / 8 * 6.283; p.position.set(Math.cos(a) * 0.17, Math.sin(a) * 0.17, -0.5 + i * 0.2); p.rotation.z = a - Math.PI / 2; rc.add(p); p.position.applyAxisAngle(V(1, 0, 0), 0); }
    const hdl = rbox(0.05, 0.6, 0.05, SM(0x7a4a2a, 0.6), 0, 0.35, 0, 0.02, roller); hdl.rotation.z = -0.5; hdl.position.set(0.15, 0.3, 0);
    const holeI = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.022, 0.022, 0.01, 10), BM(0x7a4416), 11 * 6); holeI.frustumCulled = false; ov.add(holeI);
    const ovL = new THREE.PointLight(0xff7a30, 3.0, 6, 1.3); ovL.position.set(BX, 1.6, 0.4); S.add(ovL); const ovF = new THREE.DirectionalLight(0xfff0e0, 0.9); ovF.position.set(BX, 2, 4); ovF.target.position.set(BX, 0.6, -0.4); S.add(ovF); S.add(ovF.target);
"""
ACT=r"""
      cupSteam.forEach((s, i) => { const q = (t * 0.4 + i / 3) % 1; s.position.set(Math.sin(q * 6 + i) * 0.02, 0.18 + q * 0.18, 0); s.material.opacity = Math.sin(q * Math.PI) * 0.7; });
      rods.forEach((r, i) => r.material.color.setRGB(1.0 + 0.2 * Math.sin(t * 3 + i), 0.35, 0.1));
      // water drops glow then become steam
      const dK = pr(t, C.steam + 0.6, B('steam') + 2.6);
      for (let i = 0; i < DN * 2; i++) { const d = dD[i]; const on = t >= C.steam && t < C.so + 0.2; dummy.position.set(d[0], TY + bH * 0.5 + dK * 0.05 * d[2], d[1]); dummy.scale.setScalar(on ? 1 - dK * 0.6 : 0.0001); dummy.updateMatrix(); drops.setMatrixAt(i, dummy.matrix); }
      drops.instanceMatrix.needsUpdate = true; drops.material.color.setHex(dK > 0.5 ? 0xffffff : 0x6fd0ff);
      // no holes: puffs up like a balloon, then cracks
      const puff = t < C.trapped ? 0 : t < C.balloon ? 0.12 * pr(t, C.trapped + 0.5, E('trapped')) : lerp(0.12, 0.55, eo(pr(t, C.balloon + 0.2, B('balloon') + 3.0)));
      const crackT = B('balloon') + 4.3, cracked = t >= crackT;
      dome.scale.set(1, Math.max(0.001, puff * (cracked ? 0.8 : 1) / bigR), 1); domeM.map = cracked ? crTex : noTex; bB.material[1].map = cracked ? crTex : noTex;
      burst.forEach((b, i) => { const q = t - crackT; const on = q > 0 && q < 1.4 && t < C.chimney + 0.2; b.s.position.set(0.62 + b.v[0] * q * 0.8, TY + puff + b.v[1] * q * 0.8, -0.4 + b.v[2] * q * 0.8); b.s.material.opacity = on ? (1 - q / 1.4) * 0.9 : 0; });
      // with holes: steam streams out of every hole, stays flat
      const holesOut = (t >= C.flat && t < C.docking + 0.2) || (t >= C.trapped && t < C.so + 99 && t < C.flat && false);
      stm.forEach(m => { const q = (t * 0.9 + m.o + m.h[0]) % 1; m.s.position.set(-0.62 + m.h[0] * bigR * 0.78, TY + bH + 0.05 + q * 0.5, -0.4 + m.h[1] * bigR * 0.78); m.s.material.opacity = holesOut ? Math.sin(q * Math.PI) * 0.45 : 0; });
      [lA, lB].forEach(s => s.material.opacity = t < C.docking ? 1 : 0);
      // docking roller
      const dock = t >= C.docking && t < C.childhood + 0.3; sheet.visible = dock; roller.visible = dock; bA.visible = bB.visible = dome.visible = !dock;
      const rx = lerp(-1.3, 1.3, pr(t, C.docking + 0.3, E('docking') - 0.2)); roller.position.set(rx, TY + 0.25, -0.4); rc.rotation.y = 0; rc.rotation.z = 0; roller.children[0].rotation.y = -rx / 0.14;
      let hi = 0; for (let i = 0; i < 11; i++) for (let k = 0; k < 6; k++) { const x = -1.0 + i * 0.2, z = -0.4 - 0.5 + k * 0.2; dummy.position.set(x, TY + 0.06, z); dummy.scale.setScalar(dock && x < rx - 0.05 ? 1 : 0.0001); dummy.updateMatrix(); holeI.setMatrixAt(hi++, dummy.matrix); }
      holeI.instanceMatrix.needsUpdate = true;
"""
SHOTS=r"""
      plate: [P([0.95, 1.25, -0.25], [0.75, 0.82, -0.95], 40), P([0.9, 1.15, -0.4], [0.75, 0.82, -0.95], 36)],
      oven: [P([BX, 1.5, 4.6], [BX, 0.75, -0.4], 44), P([BX, 1.4, 4.2], [BX, 0.75, -0.4], 44)],
      ovB: [P([BX + 0.62, 1.3, 2.6], [BX + 0.62, 0.8, -0.4], 42), P([BX + 0.62, 1.3, 2.3], [BX + 0.62, 0.85, -0.4], 42)],
      ovA: [P([BX - 0.62, 1.4, 2.5], [BX - 0.62, 0.8, -0.4], 42), P([BX - 0.62, 1.4, 2.2], [BX - 0.62, 0.85, -0.4], 42)],
      dock: [P([BX + 0.2, 1.7, 3.4], [BX, 0.6, -0.4], 44), P([BX + 0.1, 1.6, 3.0], [BX, 0.6, -0.4], 44)],
"""
PLAN="[0, 'two'], [1.8, 'plate'], [C.oven, 'robo'], [C.steam, 'oven'], [C.so, 'mad'], [C.trapped, 'ovB'], [C.chimney, 'mad'], [C.flat, 'ovA'], [C.docking, 'dock'], [C.childhood, 'mad'], [C.cta, 'cta']"
FACE="{ hook: 'neutral', so: 'neutral', chimney: 'shock', childhood: 'shock' }"
BEATS=r"""
      label(t, 1.9, C.oven, '🍪 the tiny holes in every biscuit');
      label(t, C.steam + 0.6, C.so, '💧 water in the dough → 💨 steam', '#2a6fd6');
      label(t, C.trapped + 0.3, C.balloon, '❌ no holes: steam is trapped', '#e5484d');
      if (t >= B('balloon') + 4.3 && t < C.chimney) stamp('CRACK!', 540, 300, 64, '#e5484d', B('balloon') + 4.3, t, -0.08, 'rgba(255,255,255,0.95)');
      label(t, C.flat + 0.3, C.docking, '✅ holes = steam escapes → flat + crisp', '#2fbf71');
      if (t >= C.docking + 1.0 && t < C.childhood) stamp('IT\'S CALLED "DOCKING"', 540, 300, 50, '#ffd34a', C.docking + 1.0, t, -0.05, 'rgba(10,14,40,0.95)');
      endCard(t, '🍪 The holes are steam vents', 'no holes = puffed + cracked', '📤 Send to your chai-biscuit friend');
"""
SFX=r"""
    sfx.push(['chime', 0.3, 0.2], ['whoosh', 1.8, 0.25], ['riser', C.steam + 0.6, 0.25], ['boing', C.so, 0.2]);
    sfx.push(['riser', C.balloon + 0.2, 0.3], ['zap', B('balloon') + 4.3, 0.35], ['thud', B('balloon') + 4.3, 0.4], ['boing', C.chimney, 0.2], ['whoosh', C.flat + 0.3, 0.25], ['chime', C.flat + 0.6, 0.3]);
    for (let t2 = C.docking + 0.3; t2 < C.docking + 2.2; t2 += 0.12) sfx.push(['tick', t2, 0.08]); sfx.push(['thud', C.docking + 1.0, 0.3], ['boing', C.childhood, 0.2], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);
"""
CUTS="C.steam, C.trapped, C.flat, C.docking, C.cta"
build('biscuit',"@maddiee.makess 'Why?' series — biscuit holes (docking): let steam escape so the biscuit bakes flat and crisp instead of puffing and cracking.","bg: 0x1a1410, fog: [9, 40]","0.86",SET,WORLD,ACT,SHOTS,PLAN,FACE,BEATS,SFX,CUTS,LIGHTS)
