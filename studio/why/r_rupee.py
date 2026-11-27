import sys; sys.path.insert(0,'/home/claude/why'); from gen import build
SET=r"""
    // Maddie's room at night: desk, lamp, wallet with notes
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(8, 3.4), SM(0x3d4a7a, 0.85)); wall.position.set(0.3, 1.7, -1.8); wall.receiveShadow = true; S.add(wall);
    const wall2 = new THREE.Mesh(new THREE.PlaneGeometry(5, 3.4), SM(0x34406a, 0.85)); wall2.rotation.y = Math.PI / 2; wall2.position.set(-1.7, 1.7, 0.6); S.add(wall2);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), SM(0x6b4a3a, 0.8)); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; S.add(floor);
    const rug = new THREE.Mesh(new THREE.CircleGeometry(1.0, 40), SM(0xc2553a, 0.95)); rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.003, -0.5); S.add(rug);
    const posterT = K.canvasTex(128, 180, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#ff7a59'); g.addColorStop(1, '#7b2ff7'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.font = '900 34px sans-serif'; x.textAlign = 'center'; x.fillText('DREAM', 64, 80); x.fillText('BIG', 64, 120); });
    const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.78), new THREE.MeshStandardMaterial({ map: posterT, roughness: 0.7 })); poster.position.set(-0.7, 1.9, -1.79); S.add(poster);
    const shelf = rbox(0.9, 0.04, 0.22, SM(0x8a5a35, 0.6), 1.0, 1.75, -1.68, 0.01); [0.7, 0.85, 0.98, 1.1, 1.25].forEach((x, i) => rbox(0.08, 0.22 + (i % 2) * 0.05, 0.16, SM([0xe5484d, 0x2a6fd6, 0xf5a524, 0x2fbf71, 0x7b2ff7][i], 0.7), x, 1.88 + (i % 2) * 0.025, -1.68, 0.01));
    const woodM = SM(0x7a4a2a, 0.6);
    rbox(0.5, 0.06, 0.5, SM(0x222831, 0.5), -0.2, 0.5, -0.95, 0.03); rbox(0.5, 0.7, 0.06, SM(0x222831, 0.5), -0.2, 0.85, -1.2, 0.03); cyl(0.03, 0.03, 0.47, SM(0x555555, 0.4, { metalness: 0.6 }), -0.2, 0.24, -0.95, 8);
    rbox(1.3, 0.05, 0.8, SM(0x9a6a44, 0.5), 0.8, 0.76, -1.1, 0.02); [[-0.58, -0.32], [0.58, -0.32], [-0.58, 0.32], [0.58, 0.32]].forEach(([dx, dz]) => rbox(0.06, 0.74, 0.06, woodM, 0.8 + dx, 0.37, -1.1 + dz, 0.01));
    const lampG = new THREE.Group(); lampG.position.set(1.3, 0.79, -1.3); S.add(lampG); cyl(0.09, 0.1, 0.03, SM(0x222222, 0.4), 0, 0.015, 0, 16, lampG); const lArm = rbox(0.025, 0.5, 0.025, SM(0x222222, 0.4), 0, 0.27, 0, 0.01, lampG); const shade = cyl(0.04, 0.12, 0.12, SM(0xf5a524, 0.5), -0.08, 0.52, 0.06, 16, lampG); shade.rotation.z = 0.5;
    const bulbL = new THREE.PointLight(0xffc878, 2.0, 3, 1.4); bulbL.position.set(1.15, 1.2, -1.15); S.add(bulbL);
    const wallet = rbox(0.24, 0.04, 0.17, SM(0x5a3418, 0.6), 0.75, 0.8, -0.95, 0.02); wallet.rotation.y = 0.3;
    const noteTex = (val, c1, c2) => K.canvasTex(512, 236, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, c1); g.addColorStop(1, c2); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 2; for (let i = 0; i < 26; i++) { x.beginPath(); x.ellipse(w * 0.62, h / 2, 30 + i * 8, 18 + i * 5, 0, 0, 7); x.stroke(); }
      x.fillStyle = 'rgba(255,255,255,0.25)'; x.beginPath(); x.arc(w * 0.3, h / 2, 62, 0, 7); x.fill();
      x.fillStyle = 'rgba(30,20,40,0.85)'; x.font = '900 70px sans-serif'; x.textAlign = 'right'; x.fillText('₹' + val, w - 40, h - 40); x.font = '700 26px sans-serif'; x.textAlign = 'left'; x.fillText('₹' + val, 40, 52); });
    const NOTES = { 10: [1.23, 0.63, '#8a5a3a', '#c9926a'], 20: [1.29, 0.63, '#b8c44a', '#e5ea8a'], 50: [1.35, 0.66, '#3ab0c9', '#8ee0ea'], 100: [1.42, 0.66, '#9a86c9', '#cbbde8'], 200: [1.46, 0.66, '#f2b632', '#ffe08a'], 500: [1.5, 0.66, '#8a8f98', '#c9ccd2'] };
    const texOf = {}; Object.entries(NOTES).forEach(([v, n]) => texOf[v] = noteTex(v, n[2], n[3]));
    const pk = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.09), new THREE.MeshStandardMaterial({ map: texOf[500], roughness: 0.7 })); pk.rotation.set(-Math.PI / 2, 0, -0.3); pk.position.set(0.8, 0.825, -0.97); S.add(pk);
"""
LIGHTS=r"""
    const hemi = new THREE.HemisphereLight(0x9fb0ff, 0x30202a, 0.65); S.add(hemi);
    const key = new THREE.DirectionalLight(0xffe2c8, 1.1); key.position.set(1.0, 2.6, 2.2); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.55); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const rimP = new THREE.DirectionalLight(0xc25aff, 0.6); rimP.position.set(-2.2, 1.6, -2.4); S.add(rimP);
"""
WORLD=r"""
    // ===== the note museum (x = NX): giant notes, raised edge lines, a finger that counts them =====
    const NX = 40;
    const mus = new THREE.Group(); mus.position.x = NX; S.add(mus);
    const mBg = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ map: K.canvasTex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#120a24'); g.addColorStop(0.5, '#2a1450'); g.addColorStop(1, '#0a0614'); x.fillStyle = g; x.fillRect(0, 0, w, h); }), side: THREE.BackSide, fog: false })); mus.add(mBg);
    const velvet = new THREE.Mesh(new THREE.CircleGeometry(5, 48), SM(0x3a1030, 0.95)); velvet.rotation.x = -Math.PI / 2; mus.add(velvet);
    const NS = 0.8;   // notes are shown 1.6× (1 unit = 100 mm before scaling)
    const mkNote = (val, parent) => { const n = NOTES[val]; const g = new THREE.Group(); parent.add(g);
      const body = new THREE.Mesh(new THREE.BoxGeometry(n[0] * NS, n[1] * NS, 0.01), [SM(0xdddddd, 0.8), SM(0xdddddd, 0.8), SM(0xdddddd, 0.8), SM(0xdddddd, 0.8), new THREE.MeshStandardMaterial({ map: texOf[val], roughness: 0.75 }), SM(0xcfcfcf, 0.8)]); body.castShadow = true; g.add(body);
      return { g, w: n[0] * NS, h: n[1] * NS }; };
    const lineM = new THREE.MeshStandardMaterial({ color: 0x2a1c40, roughness: 0.4, emissive: 0xffd34a, emissiveIntensity: 0 });
    const addLines = (note, count) => { const ls = []; [-1, 1].forEach(side => { for (let i = 0; i < count; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.022, 0.018), lineM.clone()); m.scale.setScalar(0.55); m.position.set(side * (note.w / 2 - 0.06), note.h / 2 - 0.07 - i * 0.042, 0.008); m.rotation.z = side * 0.5; note.g.add(m); if (side < 0) ls.push(m); } }); return ls; };
    const n100 = mkNote(100, mus), n500 = mkNote(500, mus);
    n100.g.position.set(-0.05, 1.25, -0.2); n500.g.position.set(0.05, 1.25, -0.2);
    const l100 = addLines(n100, 4), l500 = addLines(n500, 5);
    const markM = new THREE.MeshStandardMaterial({ color: 0x2a1c40, roughness: 0.4, emissive: 0x6fd8ff, emissiveIntensity: 0 });
    const mark = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 24), markM); mark.rotation.x = Math.PI / 2; mark.scale.setScalar(0.5); mark.position.set(0.28, -0.06, 0.008); n500.g.add(mark);
    // the finger
    const finger = new THREE.Group(); mus.add(finger); const fM = SM(0xe0a878, 0.6);
    const f1 = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.5, 8, 16), fM); f1.rotation.x = -0.9; f1.position.set(0, 0.2, 0.18); finger.add(f1);
    const nail = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), SM(0xf5d6c4, 0.3)); nail.scale.set(1, 0.5, 1.3); nail.position.set(0, 0.06, 0.06); finger.add(nail);
    const cntTex = [1, 2, 3, 4, 5].map(n => K.canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#ffd34a'; x.beginPath(); x.arc(64, 64, 58, 0, 7); x.fill(); x.fillStyle = '#1a1206'; x.font = '900 80px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), 64, 70); }));
    const cnt = new THREE.Sprite(new THREE.SpriteMaterial({ map: cntTex[0], transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); cnt.scale.setScalar(0.22); mus.add(cnt);
    // the size line-up
    const row = new THREE.Group(); mus.add(row); const rowN = [10, 20, 50, 100, 200, 500].map((v, i) => { const n = mkNote(v, row); n.g.position.set(n.w / 2 - 0.62, 0.35 + i * 0.2, -1.0 + i * 0.03); return n; });
    const mKey = new THREE.SpotLight(0xffffff, 18, 9, 0.5, 0.5, 1.2); mKey.position.set(NX + 0.8, 3.4, 2.6); mKey.target.position.set(NX, 1.1, -0.3); S.add(mKey); S.add(mKey.target);
    const mFill = new THREE.PointLight(0xc25aff, 2.5, 7, 1.3); mFill.position.set(NX - 2, 1.6, 1); S.add(mFill);
"""
ACT=r"""
      if (t >= C.touch + 0.4 && t < C.raised + 0.6) M.eyes.forEach(e => e.scale.y = 0.08);
      if (t >= C.feel && t < C.cta) M.eyes.forEach(e => e.scale.y = 0.08);
      // which note is on show
      const show500 = t >= B('count') + 3.7;
      n100.g.visible = t < C.size && !show500; n500.g.visible = t < C.size && show500; row.visible = t >= C.size && t < C.code + 0.3;
      n100.g.rotation.y = Math.sin(t * 0.6) * 0.15; n500.g.rotation.y = Math.sin(t * 0.6) * 0.15;
      // the finger slides down the left edge, lines light up one by one
      let fOn = false, fy = 0, lines = null, t0 = 0, n = 0;
      if (t >= C.touch && t < C.blind) { lines = l100; t0 = C.touch + 0.4; n = 4; }
      else if (t >= C.count && !show500 && t < C.size) { lines = l100; t0 = B('count') + 1.4; n = 4; }
      else if (show500 && t < C.size) { lines = l500; t0 = B('count') + 3.9; n = 5; }
      [...l100, ...l500].forEach(m => m.material.emissiveIntensity = 0);
      if (lines) { const note = lines === l100 ? n100 : n500; const q = cl((t - t0) / (0.45 * n)); const k = Math.min(n - 1, Math.floor(q * n));
        lines.forEach((m, i) => m.material.emissiveIntensity = i <= k && t >= t0 ? 1.2 : 0);
        const lp = new THREE.Vector3(); lines[k].getWorldPosition(lp); finger.position.copy(lp).sub(mus.position).add(V(0, 0.01, 0.03)); finger.scale.setScalar(0.5); fOn = true;
        cnt.material.map = cntTex[k]; cnt.position.copy(finger.position).add(V(0.22, 0.12, 0.1)); cnt.material.opacity = t >= t0 && (t < C.blind || t >= C.count) ? 1 : 0; cnt.scale.setScalar(0.14 * (1 + 0.15 * Math.exp(-((t - t0) % (0.45)) * 8))); }
      else cnt.material.opacity = 0;
      finger.visible = fOn;
      markM.emissiveIntensity = t >= C.size - 1 && t < C.size ? 1.2 : 0;
      rowN.forEach((r, i) => { const q = eb(pr(t, C.size + 0.2 + i * 0.15, C.size + 0.6 + i * 0.15)); r.g.scale.setScalar(Math.max(0.001, q)); });
"""
SHOTS=r"""
      desk: [P([0.95, 1.25, -0.2], [0.78, 0.82, -0.97], 40), P([0.9, 1.15, -0.35], [0.78, 0.82, -0.97], 36)],
      note: [P([NX, 1.3, 3.1], [NX, 1.25, -0.2], 40), P([NX, 1.28, 2.8], [NX, 1.25, -0.2], 40)],
      edge: [P([NX - 0.3, 1.4, 1.2], [NX - 0.42, 1.33, -0.2], 40), P([NX - 0.32, 1.38, 1.0], [NX - 0.45, 1.34, -0.2], 40)],
      row: [P([NX, 1.05, 2.4], [NX, 0.85, -0.9], 42), P([NX, 1.0, 2.2], [NX, 0.85, -0.9], 42)],
"""
PLAN="[0, 'two'], [1.8, 'desk'], [C.touch, 'mad'], [C.touch + 1.0, 'edge'], [C.raised, 'mad'], [C.blind, 'note'], [C.count, 'edge'], [C.bytouch, 'mad'], [C.size, 'row'], [C.code, 'mad'], [C.feel, 'two'], [C.cta, 'cta']"
FACE="{ hook: 'neutral', raised: 'shock', bytouch: 'shock', code: 'shock' }"
BEATS=r"""
      label(t, 1.9, C.touch, '💵 the little lines on the sides');
      label(t, C.touch + 1.2, C.raised, '👆 close your eyes. touch.', '#7b2ff7');
      if (t >= C.blind + 0.3 && t < C.count) stamp('MADE FOR PEOPLE WHO CAN\'T SEE', 540, 300, 42, '#ffd34a', C.blind + 0.3, t, -0.04, 'rgba(10,14,40,0.95)');
      if (t >= B('count') + 1.4 && t < C.bytouch) { chip('₹100 → 4 lines', 540, 230, 40, DARK, '#cbbde8', fin(t, B('count') + 1.4, 0.3), pop(t, B('count') + 1.4, 0.35)); if (t >= B('count') + 3.9) chip('₹500 → 5 lines', 540, 320, 40, DARK, '#e5e7eb', fin(t, B('count') + 3.9, 0.3), pop(t, B('count') + 3.9, 0.35)); }
      label(t, C.size + 0.3, C.code, '📏 bigger value → bigger note', '#2a6fd6');
      endCard(t, '💵 Feel the edges of your notes', '₹100 = 4 · ₹500 = 5', '📤 Send to someone who counts twice');
"""
SFX=r"""
    sfx.push(['chime', 0.3, 0.2], ['whoosh', 1.8, 0.25], ['bass', C.touch + 0.4, 0.3], ['boing', C.raised, 0.2], ['chime', C.blind + 0.3, 0.35]);
    for (let i = 0; i < 4; i++) sfx.push(['ding', C.touch + 0.4 + i * 0.45, 0.2]); for (let i = 0; i < 4; i++) sfx.push(['ding', B('count') + 1.4 + i * 0.45, 0.25]); for (let i = 0; i < 5; i++) sfx.push(['ding', B('count') + 3.9 + i * 0.45, 0.25]);
    sfx.push(['boing', C.bytouch, 0.2]); for (let i = 0; i < 6; i++) sfx.push(['pop', C.size + 0.2 + i * 0.15, 0.2]); sfx.push(['boing', C.code, 0.2], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);
"""
CUTS="C.blind, C.count, C.size, C.cta"
build('rupee',"@maddiee.makess 'Why?' series — raised angular bleed lines on rupee notes for the visually impaired (RBI: ₹100 four lines, ₹500 five), raised identification mark, note size grows with value.","bg: 0x120a24, fog: [9, 40]","0.86",SET,WORLD,ACT,SHOTS,PLAN,FACE,BEATS,SFX,CUTS,LIGHTS)
