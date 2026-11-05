/* @maddiee.makess reel 7 — "4 days after graduation" (job search with career-ops).
   Sunset beach promenade walk. Maddie (graduated 4 days ago, degree tube) + an original hover-bot with headphones.
   5 step cards: install · scan · score · tailor · apply (you press submit) + tracker. No place names, no end card.
   Voices: OmniVoice Option 3 cast (voice/aij_jobs/NN.wav), emotion tags in `omni`. */
const LN = (who, text, omni, o = {}) => ({ who, text, say: (omni || text).replace(/\[[a-z-]+\]\s*/g, '').replace(/\*/g, ''), omni: omni || text.replace(/\*/g, ''), ...o });
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0xf4a46a, fog: [18, 70], fov: 36, bloom: { strength: 0.35, radius: 0.55, threshold: 0.97 } },
  lines: [
    LN('maddie', 'Four days since graduation…', '[sigh] Four days since graduation...', { id: 'hook', gap: 0 }),
    LN('maddie', "and I've applied to *60 jobs*.", "and I've applied to sixty jobs.", { gap: 0.12 }),
    LN('claude', 'Replies?', 'Replies?', { id: 'rep', gap: 0.2 }),
    LN('maddie', '…Zero.', '...Zero.', { id: 'zero', gap: 0.2 }),
    LN('claude', 'Because you sent the *same resume* sixty times.', 'Because you sent the same resume, sixty times.', { id: 'same', gap: 0.18 }),
    LN('maddie', 'What else am I supposed to do?!', '[dissatisfaction-hnn] What else am I supposed to do?!', { id: 'what', gap: 0.15 }),
    LN('claude', 'Let a *free tool* do the boring part.', 'Let a free tool do the boring part.', { id: 'tool', gap: 0.18 }),
    LN('claude', "It's called *career-ops*.", "It's called career ops.", { id: 'name', gap: 0.1 }),
    LN('claude', '*80,000 stars* on GitHub.', 'Eighty thousand stars on GitHub.', { id: 'stars', gap: 0.08 }),
    LN('maddie', '*80,000?!*', '[surprise-wa] Eighty thousand?!', { id: 'wow', gap: 0.12 }),
    LN('claude', '*Step one.* One line in Claude Code. Done.', 'Step one. One line in Claude Code. Done.', { id: 's1', gap: 0.22 }),
    LN('claude', '*Step two.* It checks career pages of *100+ companies*.', 'Step two. It checks the career pages of a hundred plus companies.', { id: 's2', gap: 0.22 }),
    LN('claude', '*Step three.* Every job gets a *score*, one to five, against your CV.', 'Step three. Every job gets a score, one to five, against your C V.', { id: 's3', gap: 0.22 }),
    LN('claude', 'And it flags the *fake ones*.', 'And it flags the fake ones.', { id: 'fake', gap: 0.08 }),
    LN('maddie', 'Fake jobs?', '[question-en] Fake jobs?', { id: 'fakeq', gap: 0.12 }),
    LN('claude', '*Ghost postings.* They exist. It skips them.', 'Ghost postings. They exist. It skips them.', { id: 'ghost', gap: 0.12 }),
    LN('claude', '*Step four.* A *new resume* for every job.', 'Step four. A new resume, for every job.', { id: 's4', gap: 0.22 }),
    LN('claude', 'ATS-friendly. Plus the *cover letter*.', 'A T S friendly. Plus the cover letter.', { id: 'ats', gap: 0.08 }),
    LN('claude', '*Step five.* It fills the whole form.', 'Step five. It fills the whole form.', { id: 's5', gap: 0.22 }),
    LN('maddie', 'And submits it?', 'And submits it?', { id: 'sub', gap: 0.1 }),
    LN('claude', 'No. *You press submit.* Your name, your call.', 'No. You press submit. Your name, your call.', { id: 'press', gap: 0.12 }),
    LN('claude', 'Everything goes in *one tracker*. Free. Open source.', 'Everything goes in one tracker. Free. Open source.', { id: 'track', gap: 0.18 }),
    LN('maddie', 'So I just… press it?', 'So I just... press it?', { id: 'just', gap: 0.2 }),
    LN('claude', 'Yes. *Hardest thing* you\'ll do this week.', "Yes. Hardest thing you'll do this week.", { id: 'hard', gap: 0.1 }),
    LN('maddie', 'Okay… I\'m getting *hired!*', "[laughter] Okay... I'm getting hired!", { id: 'hired', gap: 0.25 }),
  ],
  build(K, T) {
    const L = T.lines, N = L.length;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[typeof id === 'number' ? id : IX(id)].t, E = id => L[typeof id === 'number' ? id : IX(id)].end;
    const D = E(N - 1) + 2.0;
    const cl = K.clamp, eo = K.easeOut, ei = K.easeIn, pr = K.prog, eb = K.easeBack, lerp = K.lerp, ez = K.ease;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = (c, o = {}) => new THREE.MeshBasicMaterial(Object.assign({ color: c, toneMapped: false }, o));
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S, seg = 18) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.ceil(seg * 0.7)), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const rng = K.rng(21);
    const C = { HOOK: 0, ZERO: B('rep') - 0.1, SAME: B('same') - 0.12, WHAT: B('what') - 0.1, TOOL: B('tool') - 0.12, STARS: B('name') - 0.1, WOW: B('wow') - 0.08,
      S1: B('s1') - 0.15, S2: B('s2') - 0.15, S3: B('s3') - 0.15, FAKEQ: B('fakeq') - 0.08, S4: B('s4') - 0.15, S5: B('s5') - 0.15, SUB: B('sub') - 0.08, PRESS: B('press') - 0.08,
      TRACK: B('track') - 0.12, JUST: B('just') - 0.12, HARD: B('hard') - 0.08, HIRED: B('hired') - 0.2 };

    // ================= WORLD: sunset beach promenade (path along +x, sea toward -z) =================
    S.fog.color.setHex(0xf2a274);
    const skyTex = K.canvasTex(64, 1024, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#2b3f86'); g.addColorStop(0.3, '#6d5fa8'); g.addColorStop(0.44, '#d97a9a'); g.addColorStop(0.5, '#f6a070'); g.addColorStop(0.535, '#ffd08a'); g.addColorStop(0.56, '#f2a274'); g.addColorStop(1, '#7a5a7a'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(300, 40, 20), BM(0xffffff, { map: skyTex, side: THREE.BackSide, fog: false })); S.add(sky);
    const glowTex = K.canvasTex(256, 256, (x, w, h) => { const g = x.createRadialGradient(128, 128, 8, 128, 128, 128); g.addColorStop(0, 'rgba(255,240,200,1)'); g.addColorStop(0.18, 'rgba(255,214,140,0.9)'); g.addColorStop(0.45, 'rgba(255,160,100,0.35)'); g.addColorStop(1, 'rgba(255,140,90,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, fog: false, toneMapped: false, depthWrite: false, transparent: true })); sun.scale.set(70, 70, 1); S.add(sun);
    const sunDisc = new THREE.Mesh(new THREE.CircleGeometry(5.5, 48), BM(0xfff1c8, { fog: false })); S.add(sunDisc);
    const cloudTex = K.canvasTex(256, 96, (x, w, h) => { const r = K.rng(5); for (let i = 0; i < 14; i++) { const g = x.createRadialGradient(30 + r() * 196, 50 + r() * 20, 2, 30 + r() * 196, 50 + r() * 20, 30 + r() * 20); g.addColorStop(0, 'rgba(255,214,190,0.85)'); g.addColorStop(1, 'rgba(255,190,170,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); } });
    const clouds = Array.from({ length: 9 }, (_, i) => { const c = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTex, fog: false, transparent: true, opacity: 0.75, depthWrite: false })); c.scale.set(60 + (i % 3) * 20, 18 + (i % 2) * 6, 1); S.add(c); return { c, x: -120 + i * 34, y: 22 + (i % 4) * 9, z: -210 + (i % 3) * 20 }; });
    // sea: big plane with moving ripples + sun glitter
    const seaTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#3b5f9a'; x.fillRect(0, 0, w, h); const r = K.rng(8); for (let i = 0; i < 1400; i++) { x.fillStyle = `rgba(${200 + r() * 55},${180 + r() * 60},${190 + r() * 50},${0.06 + r() * 0.18})`; x.fillRect(r() * w, r() * h, 8 + r() * 30, 2); } });
    seaTex.wrapS = seaTex.wrapT = THREE.RepeatWrapping; seaTex.repeat.set(30, 30);
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(600, 300), SM(0x4a6fa8, 0.35, { map: seaTex, emissive: 0x2a3560, emissiveIntensity: 0.4 })); sea.rotation.x = -Math.PI / 2; sea.position.set(0, -0.35, -160); S.add(sea);
    const glitTex = K.canvasTex(128, 512, (x, w, h) => { const r = K.rng(12); for (let i = 0; i < 420; i++) { const yy = r() * h, a = Math.pow(1 - yy / h, 0.6); x.fillStyle = `rgba(255,${200 + r() * 50},${140 + r() * 60},${a * (0.3 + r() * 0.6)})`; x.fillRect(64 + (r() - 0.5) * (30 + yy * 0.25), yy, 6 + r() * 14, 2); } });
    const glitter = new THREE.Mesh(new THREE.PlaneGeometry(40, 160), BM(0xffffff, { map: glitTex, transparent: true, depthWrite: false, fog: false })); glitter.rotation.x = -Math.PI / 2; glitter.position.set(0, -0.33, -95); S.add(glitter);
    // sand + shoreline foam that washes in and out
    const sandTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#e9c48f'; x.fillRect(0, 0, w, h); const r = K.rng(3); for (let i = 0; i < 3000; i++) { x.fillStyle = `rgba(${150 + r() * 80},${110 + r() * 60},${70 + r() * 40},0.18)`; x.fillRect(r() * w, r() * h, 2, 2); } });
    sandTex.wrapS = sandTex.wrapT = THREE.RepeatWrapping; sandTex.repeat.set(80, 6);
    const sand = new THREE.Mesh(new THREE.PlaneGeometry(400, 16, 1, 8), SM(0xffffff, 0.95, { map: sandTex })); sand.rotation.x = -Math.PI / 2; sand.position.set(40, -0.3, -9.2); sand.receiveShadow = true;
    { const p = sand.geometry.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, (p.getY(i) + 8) / 16 * 0.0); } S.add(sand);
    const wetSand = new THREE.Mesh(new THREE.PlaneGeometry(400, 3), SM(0xb88a5c, 0.3)); wetSand.rotation.x = -Math.PI / 2; wetSand.position.set(40, -0.31, -17.6); S.add(wetSand);
    const foamTex = K.canvasTex(512, 64, (x, w, h) => { const r = K.rng(9); for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(255,255,255,${0.4 + r() * 0.5})`; x.beginPath(); x.ellipse(r() * w, 20 + r() * 28, 6 + r() * 16, 3 + r() * 5, 0, 0, 7); x.fill(); } });
    foamTex.wrapS = THREE.RepeatWrapping; foamTex.repeat.set(30, 1);
    const foams = [0, 1, 2].map(i => { const f = new THREE.Mesh(new THREE.PlaneGeometry(400, 1.4), BM(0xffffff, { map: foamTex, transparent: true, depthWrite: false })); f.rotation.x = -Math.PI / 2; f.position.set(40, -0.29 + i * 0.002, -18); S.add(f); return f; });
    // promenade: paver footpath, kerb, railing, palms, lamps, benches
    const paveTex = K.canvasTex(256, 256, (x, w, h) => { const cols = ['#c7837a', '#b9746c', '#d39a8c', '#a8655f']; const r = K.rng(4); for (let yy = 0; yy < 8; yy++) for (let xx = 0; xx < 8; xx++) { x.fillStyle = cols[Math.floor(r() * 4)]; x.fillRect(xx * 32 + (yy % 2) * 16, yy * 32, 31, 31); }
      x.strokeStyle = 'rgba(80,40,30,0.35)'; x.lineWidth = 2; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(0, i * 32); x.lineTo(w, i * 32); x.stroke(); } });
    paveTex.wrapS = paveTex.wrapT = THREE.RepeatWrapping; paveTex.repeat.set(200, 2);
    const path = new THREE.Mesh(new THREE.PlaneGeometry(400, 3.2), SM(0xffffff, 0.85, { map: paveTex })); path.rotation.x = -Math.PI / 2; path.position.set(40, 0, 0.1); path.receiveShadow = true; S.add(path);
    rbox(400, 0.16, 0.25, SM(0xe9e3d6, 0.7), 40, 0.02, 1.8, 0.02); rbox(400, 0.3, 0.3, SM(0xd9d2c4, 0.8), 40, -0.12, -1.55, 0.02);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(400, 8), SM(0x3c3f4a, 0.9)); road.rotation.x = -Math.PI / 2; road.position.set(40, -0.06, 6); road.receiveShadow = true; S.add(road);
    for (let i = 0; i < 70; i++) { const d = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.12), BM(0xf2efe6)); d.rotation.x = -Math.PI / 2; d.position.set(-100 + i * 4.5, -0.05, 6); S.add(d); }
    // railing (instanced posts + 2 rails)
    const RX0 = -100, RX1 = 220, NP = Math.floor((RX1 - RX0) / 1.2);
    const posts = new THREE.InstancedMesh(new RB(0.08, 0.95, 0.08, 2, 0.02), SM(0xf4f1ea, 0.5), NP); { const dm = new THREE.Object3D(); for (let i = 0; i < NP; i++) { dm.position.set(RX0 + i * 1.2, 0.47, -1.5); dm.updateMatrix(); posts.setMatrixAt(i, dm.matrix); } } posts.castShadow = true; S.add(posts);
    [0.9, 0.5].forEach(y => { const r = cyl(0.035, 0.035, RX1 - RX0, SM(y > 0.7 ? 0x2f6fb0 : 0xf4f1ea, 0.4, { metalness: 0.3 }), (RX0 + RX1) / 2, y, -1.5, 10); r.rotation.z = Math.PI / 2; });
    const palms = [], lamps = [];
    const palm = (x, z, s = 1) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); S.add(g);
      const trunkM = SM(0x8a6440, 0.9); for (let i = 0; i < 9; i++) { const seg = cyl(0.11 - i * 0.006, 0.12 - i * 0.006, 0.42, trunkM, Math.sin(i * 0.22) * 0.18, 0.21 + i * 0.4, 0, 10, g); seg.rotation.z = -0.05 - i * 0.012; }
      const top = new THREE.Group(); top.position.set(0.62, 3.75, 0); g.add(top); const leafM = SM(0x3f8a4a, 0.7, { side: THREE.DoubleSide }), leafM2 = SM(0x2f7a3c, 0.7, { side: THREE.DoubleSide });
      for (let i = 0; i < 9; i++) { const lf = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.36, 6, 1), i % 2 ? leafM : leafM2); const p = lf.geometry.attributes.position; for (let k = 0; k < p.count; k++) { const xx = p.getX(k) + 0.85; p.setX(k, xx); p.setY(k, p.getY(k) * (1 - xx / 1.9) - xx * xx * 0.22); } lf.geometry.computeVertexNormals();
        const piv = new THREE.Group(); piv.rotation.set(0, i / 9 * Math.PI * 2, 0.25); piv.add(lf); lf.rotation.x = Math.PI / 2 * 0; lf.castShadow = true; top.add(piv); }
      for (let i = 0; i < 4; i++) sph(0.09, SM(0x6b4a24, 0.6), 0.62 + Math.sin(i * 1.6) * 0.12, 3.62, Math.cos(i * 1.6) * 0.12, g, 10);
      palms.push({ top, ph: x }); return g; };
    const lamp = (x, z) => { const g = new THREE.Group(); g.position.set(x, 0, z); S.add(g); cyl(0.05, 0.08, 3.2, SM(0x2c3240, 0.4, { metalness: 0.5 }), 0, 1.6, 0, 10, g); const arm = cyl(0.03, 0.03, 0.6, SM(0x2c3240, 0.4), 0, 3.15, 0.25, 8, g); arm.rotation.x = Math.PI / 2;
      const head = rbox(0.34, 0.12, 0.2, SM(0x2c3240, 0.4), 0, 3.12, 0.52, 0.03, g); const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.03, 0.14), BM(0xffe2a6)); bulb.position.set(0, 3.05, 0.52); g.add(bulb); lamps.push(bulb); };
    for (let x = -60; x < 160; x += 7) { palm(x + (rng() - 0.5) * 1.2, -2.35 - rng() * 0.4, 0.9 + rng() * 0.25); if (Math.round(x / 7) % 2 === 0) lamp(x + 3.5, -1.85); }
    for (let x = -50; x < 160; x += 23) { const b = new THREE.Group(); b.position.set(x, 0, 1.45); S.add(b); rbox(1.4, 0.06, 0.4, SM(0x8a5a3a, 0.6), 0, 0.42, 0, 0.02, b); rbox(1.4, 0.36, 0.05, SM(0x8a5a3a, 0.6), 0, 0.64, 0.2, 0.02, b); [-0.6, 0.6].forEach(dx => rbox(0.06, 0.42, 0.36, SM(0x2c3240, 0.5), dx, 0.21, 0, 0.01, b)); }
    // coconut cart
    const cart = new THREE.Group(); cart.position.set(22, 0, 2.7); S.add(cart);
    rbox(1.2, 0.5, 0.6, SM(0x2f9e7a, 0.6), 0, 0.6, 0, 0.04, cart); [-0.45, 0.45].forEach(dx => { const w = cyl(0.22, 0.22, 0.06, SM(0x222, 0.6), dx, 0.22, 0.32, 16, cart); w.rotation.x = Math.PI / 2; });
    for (let i = 0; i < 14; i++) sph(0.11, SM(0x5f8a2a, 0.6), -0.45 + (i % 5) * 0.22, 0.95 + Math.floor(i / 5) * 0.14, -0.12 + (i % 2) * 0.2, cart, 12);
    cyl(0.025, 0.025, 1.4, SM(0x888, 0.4), 0, 1.5, 0, 8, cart); const umb = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.4, 12, 1, true), SM(0xff7a3d, 0.6, { side: THREE.DoubleSide })); umb.position.set(0, 2.2, 0); cart.add(umb);
    // display submarine on the sand (seen in the wide shots)
    const sub = new THREE.Group(); sub.position.set(30, 0.1, -7.8); sub.rotation.y = 0.08; S.add(sub);
    const subM = SM(0x3a4250, 0.6, { metalness: 0.3 }); const hull = new THREE.Mesh(new THREE.CapsuleGeometry(1.0, 9, 8, 20), subM); hull.rotation.z = Math.PI / 2; hull.position.y = 1.15; hull.castShadow = true; sub.add(hull);
    rbox(1.6, 1.3, 0.8, subM, -0.6, 2.6, 0, 0.15, sub); rbox(0.15, 0.7, 0.15, subM, -0.6, 3.5, 0, 0.04, sub);
    for (let i = 0; i < 10; i++) { const w = new THREE.Mesh(new THREE.CircleGeometry(0.1, 12), BM(0xffd38a)); w.position.set(-4 + i * 0.85, 1.25, 1.01); sub.add(w); }
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(1.01, 1.01, 9, 20, 1, true, -0.6, 1.2), SM(0xc0392b, 0.6)); stripe.rotation.z = Math.PI / 2; stripe.position.y = 1.15; sub.add(stripe);
    [-2, 0, 2, 4].forEach(dx => rbox(0.5, 0.7, 1.4, SM(0x6a5a4a, 0.8), dx, 0.2, 0, 0.04, sub));
    // distant green hill with a cable car line (ahead, down the coast)
    const hillM = SM(0x4f7a46, 0.95); const hill = new THREE.Mesh(new THREE.SphereGeometry(28, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), hillM); hill.scale.set(1.4, 0.6, 1); hill.position.set(150, -2, -40); S.add(hill);
    const hill2 = new THREE.Mesh(new THREE.SphereGeometry(20, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), SM(0x5a8650, 0.95)); hill2.scale.set(1.3, 0.55, 1); hill2.position.set(118, -2, -20); S.add(hill2);
    const cableA = V(108, 1.5, -6), cableB = V(150, 16.5, -36);
    const cable = cyl(0.04, 0.04, cableA.distanceTo(cableB), BM(0x333333), 0, 0, 0, 6); cable.position.copy(cableA).lerp(cableB, 0.5); cable.lookAt(cableB); cable.rotateX(Math.PI / 2);
    const gondolas = [0, 1, 2].map(i => { const g = new THREE.Group(); S.add(g); rbox(0.9, 0.8, 0.8, SM([0xd94a3a, 0xffc53d, 0x3b6ea8][i], 0.5), 0, -0.6, 0, 0.12, g); cyl(0.02, 0.02, 0.5, BM(0x333333), 0, -0.1, 0, 6, g); return g; });
    // birds
    const birdM = BM(0x2a2230, { side: THREE.DoubleSide });
    const birds = Array.from({ length: 7 }, (_, i) => { const g = new THREE.Group(); S.add(g); const w1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.08), birdM), w2 = w1.clone(); w1.position.x = -0.25; w2.position.x = 0.25; g.add(w1); g.add(w2); return { g, w1, w2, k: i }; });
    // a few other walkers far away (simple toy people)
    const walkers = Array.from({ length: 5 }, (_, i) => { const g = new THREE.Group(); S.add(g); const col = [0xd94a3a, 0x3b6ea8, 0xffc53d, 0x8a5cc7, 0x2f9e7a][i];
      rbox(0.34, 0.5, 0.22, SM(col, 0.8), 0, 0.95, 0, 0.08, g); rbox(0.26, 0.26, 0.24, SM([0xf0c4a0, 0xc98a5c, 0xa96f4c][i % 3], 0.6), 0, 1.38, 0, 0.1, g); rbox(0.28, 0.1, 0.26, SM(0x2a1c15, 0.7), 0, 1.5, -0.01, 0.04, g);
      [-0.08, 0.08].forEach(dx => rbox(0.1, 0.7, 0.12, SM(0x2b2f45, 0.8), dx, 0.35, 0, 0.04, g)); return { g, x0: 6 + i * 9 + rng() * 4, z: [0.9, -0.9, 1.0, -0.8, 0.7][i], dir: i % 2 ? -1 : 1, sp: 0.6 + rng() * 0.3 }; });

    // ================= MADDIE (standing, walking; degree tube) =================
    const SEAT = 0.5;
    const M = K.makeToyMaddie({ seatY: SEAT, shirt: 0x2f6fb0, pants: 0xd8c9a8 }); S.add(M.g); M.g.rotation.order = 'YXZ';
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    M.g.children.forEach(o => { if (o !== M.body) o.visible = false; });                                         // drop the seated shins/shoes
    M.body.children.forEach(o => { if (o.isMesh && o.geometry.type === 'CapsuleGeometry') o.visible = false; });  // ...and the seated thighs
    const pantsM = SM(0xd8c9a8, 0.8), shoeM = SM(0xf4f4f4, 0.5), soleM = SM(0x2a2a30, 0.6);
    const legs = [-1, 1].map(sx => { const hip = new THREE.Group(); hip.position.set(sx * 0.095, 0.03, 0); M.body.add(hip);
      const th = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.16, 8, 16), pantsM); th.position.y = -0.11; th.castShadow = true; hip.add(th);
      const knee = new THREE.Group(); knee.position.y = -0.24; hip.add(knee);
      const sh = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.15, 8, 16), pantsM); sh.position.y = -0.1; sh.castShadow = true; knee.add(sh);
      const foot = new THREE.Group(); foot.position.y = -0.22; knee.add(foot);
      rbox(0.13, 0.085, 0.25, shoeM, 0, -0.012, 0.05, 0.04, foot); rbox(0.135, 0.022, 0.255, soleM, 0, -0.05, 0.05, 0.008, foot);
      return { hip, knee, foot, sx }; });
    // degree tube in his left hand
    const tube = new THREE.Group(); M.arms[0].hand.add(tube); tube.position.set(0, 0.02, 0.02);
    cyl(0.035, 0.035, 0.42, SM(0x7a1f2a, 0.5), 0, 0, 0, 16, tube); [-0.2, 0.2].forEach(y => cyl(0.038, 0.038, 0.03, SM(0xe8c24a, 0.3, { metalness: 0.6 }), 0, y, 0, 16, tube));

    // ================= MASCOT: original hover-bot with headphones =================
    const bot = new THREE.Group(); S.add(bot);
    const botBody = new THREE.Group(); bot.add(botBody);
    const shellM = SM(0xf6efe3, 0.35), orM = SM(0xff7a3d, 0.45), visorM = SM(0x141a2e, 0.15, { metalness: 0.4 });
    const shell = sph(0.27, shellM, 0, 0, 0, botBody, 40); shell.scale.set(1, 0.9, 0.92);
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.272, 40, 20, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), orM); belly.scale.set(1, 0.9, 0.92); botBody.add(belly);
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.255, 40, 24, -Math.PI * 0.36, Math.PI * 0.72, Math.PI * 0.3, Math.PI * 0.32), visorM); visor.scale.set(1.02, 0.92, 0.96); visor.rotation.y = 0; botBody.add(visor);
    // face is drawn on a canvas so the eyes can blink, squint, smile, widen
    const FW = 256, FH = 128, fc = document.createElement('canvas'); fc.width = FW; fc.height = FH; const fx = fc.getContext('2d');
    const fTex = new THREE.CanvasTexture(fc); fTex.colorSpace = THREE.SRGBColorSpace;
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.15), BM(0xffffff, { map: fTex, transparent: true })); face.position.set(0, 0.02, 0.247); botBody.add(face);
    const drawFace = (mood, talk, blink) => { fx.clearRect(0, 0, FW, FH); fx.fillStyle = '#ffb36b'; fx.strokeStyle = '#ffb36b'; fx.lineCap = 'round'; fx.lineWidth = 14; fx.shadowColor = '#ff8a3d'; fx.shadowBlur = 14;
      [76, 180].forEach(cx => { if (blink) { fx.beginPath(); fx.moveTo(cx - 20, 52); fx.lineTo(cx + 20, 52); fx.stroke(); }
        else if (mood === 'happy') { fx.beginPath(); fx.arc(cx, 62, 20, Math.PI * 1.1, Math.PI * 1.9); fx.stroke(); }
        else if (mood === 'flat') { fx.beginPath(); fx.moveTo(cx - 20, 50); fx.lineTo(cx + 20, 50); fx.stroke(); }
        else { const s = mood === 'wide' ? 1.3 : 1; fx.beginPath(); fx.ellipse(cx, 50, 15 * s, 21 * s, 0, 0, 7); fx.fill(); fx.fillStyle = 'rgba(255,255,255,0.8)'; fx.beginPath(); fx.arc(cx + 5, 42, 5, 0, 7); fx.fill(); fx.fillStyle = '#ffb36b'; } });
      const o = cl(talk); fx.lineWidth = 9; if (o > 0.08) { fx.beginPath(); fx.ellipse(128, 100, 16, 4 + o * 12, 0, 0, 7); fx.fill(); } else { fx.beginPath(); fx.arc(128, 88, 12, Math.PI * 0.15, Math.PI * 0.85); fx.stroke(); }
      fTex.needsUpdate = true; };
    // headphones
    const hpM = SM(0x2f5fd0, 0.35), hpD = SM(0x1b2f6e, 0.4);
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.03, 12, 40, Math.PI), hpM); band.position.y = 0.0; botBody.add(band);
    const band2 = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.018, 8, 40, Math.PI), SM(0xdfe8ff, 0.4)); band2.position.y = 0.0; band2.scale.set(0.97, 0.97, 1); band2.position.z = 0.0; botBody.add(band2);
    [-1, 1].forEach(sx => { const cup = new THREE.Group(); cup.position.set(sx * 0.29, -0.02, 0); botBody.add(cup);
      const c1 = cyl(0.1, 0.1, 0.09, hpM, 0, 0, 0, 28, cup); c1.rotation.z = Math.PI / 2; const c2 = cyl(0.075, 0.075, 0.1, hpD, sx * 0.012, 0, 0, 28, cup); c2.rotation.z = Math.PI / 2;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.012, 8, 28), SM(0xdfe8ff, 0.4)); ring.rotation.y = Math.PI / 2; ring.position.x = sx * 0.046; cup.add(ring); });
    // floating mitten hands
    const hands = [-1, 1].map(sx => { const g = new THREE.Group(); bot.add(g); const m = sph(0.065, shellM, 0, 0, 0, g, 20); m.scale.set(0.85, 1, 0.75); const cuff = cyl(0.05, 0.05, 0.03, orM, 0, -0.06, 0, 16, g); return { g, sx }; });
    // hover glow + soft ground shadow
    const ringTex = K.canvasTex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 64, 10, 64, 64, 62); g.addColorStop(0, 'rgba(120,220,255,0.9)'); g.addColorStop(0.5, 'rgba(90,180,255,0.35)'); g.addColorStop(1, 'rgba(90,180,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const thr = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), BM(0xffffff, { map: ringTex, transparent: true, depthWrite: false })); thr.rotation.x = Math.PI / 2; thr.position.y = -0.27; bot.add(thr);
    const shTex = K.canvasTex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 64, 4, 64, 64, 62); g.addColorStop(0, 'rgba(40,20,30,0.45)'); g.addColorStop(1, 'rgba(40,20,30,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const botShadow = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.7), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false })); botShadow.rotation.x = -Math.PI / 2; S.add(botShadow);
    const noteTex = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#ffd34a'; x.font = '900 52px "DejaVu Sans"'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♪', 32, 34); });
    const notes = [0, 1].map(i => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: noteTex, transparent: true, depthWrite: false })); s.scale.setScalar(0.13); S.add(s); return s; });

    // ================= LIGHT =================
    const hemi = new THREE.HemisphereLight(0xffd8c0, 0x6a5060, 0.95); S.add(hemi);
    const sunL = new THREE.DirectionalLight(0xffb070, 2.0); sunL.castShadow = true; sunL.shadow.mapSize.set(1024, 1024); sunL.shadow.bias = -0.0006;
    sunL.shadow.camera.left = -4; sunL.shadow.camera.right = 4; sunL.shadow.camera.top = 4; sunL.shadow.camera.bottom = -4; sunL.shadow.camera.far = 30; S.add(sunL); S.add(sunL.target);
    const fill = new THREE.DirectionalLight(0xc8d4ff, 0.75); S.add(fill); S.add(fill.target);
    const rimP = new THREE.DirectionalLight(0xff8fb0, 0.6); S.add(rimP); S.add(rimP.target);
    const botL = new THREE.PointLight(0xffa060, 0.0, 1.2, 2); bot.add(botL);

    // ================= WALK + ACTING =================
    const SPEED = 0.85, STOP0 = B('just') - 0.4, STOP1 = STOP0 + 1.0;           // stroll, then slow to a stop by the railing
    const walkX = t => t < STOP0 ? t * SPEED : STOP0 * SPEED + SPEED * (STOP1 - STOP0) * 0.5 * (1 - Math.pow(1 - cl((t - STOP0) / (STOP1 - STOP0)), 2)) * 1;
    const walkAmt = t => t < STOP0 ? 1 : 1 - cl((t - STOP0) / (STOP1 - STOP0));
    const TURN0 = C.HIRED, faceSea = t => eo(pr(t, TURN0, TURN0 + 0.7));
    const MZ = -0.1, BZ = -0.6, BDX = 0.72;
    let mYaw = 0, mPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const hw = V(0, 0, 0), headW = V(0, 0, 0);
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t);
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      const X = walkX(t), wa = walkAmt(t), fs = faceSea(t);
      // ---- Maddie
      const ph = X / 0.62 * Math.PI;
      M.g.position.set(X, 0, MZ); M.g.rotation.y = lerp(Math.PI / 2, Math.PI, fs);
      const botTalks = K.speaking('claude', t), LK = botTalks ? [0.32, 0.02] : [-0.28, 0.04];   // talks toward us, glances at the bot when it speaks
      let face = 'neutral', look = LK, lean = -0.05;
      if (t < C.ZERO) { face = 'worried'; look = [-0.15, 0.14]; }
      else if (t < C.SAME) { face = 'worried'; }
      else if (t < C.TOOL) { face = t < C.WHAT ? 'worried' : 'shock'; }
      else if (t < C.S1) { face = t >= C.WOW ? 'shock' : 'neutral'; }
      else if (t < C.JUST) { face = (t >= C.FAKEQ && t < B('ghost')) || (t >= C.SUB && t < C.PRESS) ? 'shock' : 'smile'; }
      else if (t < C.HIRED) { face = 'neutral'; }
      else { face = 'smile'; look = [0, -0.18]; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, look[0] * (1 - fs), k); mPitch = sm(mPitch, look[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type: 0, lean });
      M.body.position.y = SEAT + Math.abs(Math.cos(ph)) * 0.022 * wa; M.chest.rotation.z = Math.sin(ph) * 0.03 * wa;
      legs.forEach(l => { const p = ph + (l.sx > 0 ? Math.PI : 0); l.hip.rotation.x = -0.42 * Math.sin(p) * wa; l.knee.rotation.x = 0.55 * Math.max(0, Math.sin(p - 1.1)) * wa; l.foot.rotation.x = -l.hip.rotation.x - l.knee.rotation.x * 0.6; });
      const [aL, aR] = M.arms;
      const sw = Math.sin(ph) * 0.38 * wa;
      aL.sh.rotation.set(sw, 0.0, -0.12); aL.el.rotation.x = 1.05;                         // left hand carries the tube, swings
      const gest = mT > 0.05 ? 0.5 + 0.2 * Math.sin(t * 5) : 0;                           // right hand talks
      aR.sh.rotation.set(-sw - gest * 0.9, -0.15 * gest, 0.12 + gest * 0.2); aR.el.rotation.x = 1.05 - gest * 1.1;
      if (t >= C.HIRED) { const o = eb(pr(t, C.HIRED + 0.3, C.HIRED + 0.9)); aL.sh.rotation.set(-0.3 * o, 0, -0.12 - 1.5 * o); aR.sh.rotation.set(-0.3 * o, 0, 0.12 + 1.5 * o); aL.el.rotation.x = 1.05 - 0.9 * o; aR.el.rotation.x = 1.05 - 0.9 * o; }
      if (t >= C.WOW && t < C.WOW + 0.8) M.head.position.y = 0.38 + 0.04 * K.pulse(t, C.WOW, 0.6);
      tube.rotation.set(Math.PI / 2, 0, 0);
      // ---- bot: hovers beside him, a little ahead, turns to talk
      const bob = Math.sin(t * 2.4) * 0.04, BX = X + BDX * (1 - fs) + 0.7 * fs, bz = lerp(BZ, MZ - 0.1, fs);
      bot.position.set(BX, 1.3 + bob, bz);
      const talkTurn = rT > 0.03 || K.speaking('claude', t) ? 1 : 0, yawTarget = lerp(Math.PI / 2 - 0.45 - 0.75 * talkTurn, Math.PI, fs);
      bot.rotation.y = sm(bot.rotation.y || Math.PI / 2, yawTarget, k * 0.8);
      bot.scale.setScalar(0.85); botBody.rotation.z = Math.sin(t * 1.7) * 0.05 * wa; botBody.rotation.x = 0.08 * wa + Math.sin(t * 2.4 + 1) * 0.03;
      const happy = t >= C.HARD || (t >= C.TOOL && t < C.S1) || (t >= C.TRACK && t < C.JUST), flat = (t >= C.SAME && t < C.WHAT) || (t >= B('ghost') && t < C.S4) || (t >= C.PRESS && t < B('press') + 0.6);
      const blink = ((t + 1.3) % 3.4) < 0.11;
      drawFace(happy ? 'happy' : flat ? 'flat' : t >= C.ZERO && t < C.SAME ? 'wide' : 'open', rT * 1.2, blink && !happy);
      hands.forEach(hd => { const g = rT > 0.03 ? 1 : 0; hd.g.position.set(-0.05 + Math.sin(t * 3 + hd.sx) * 0.03, -0.12 + g * (0.05 + 0.05 * Math.sin(t * 6 + hd.sx * 2)), hd.sx * 0.36); hd.g.rotation.z = hd.sx * 0.3; });
      if (t >= C.HIRED) hands.forEach(hd => { hd.g.position.y = 0.12 + 0.05 * Math.sin(t * 8); });
      thr.material.opacity = 0.7 + 0.3 * Math.sin(t * 20); thr.scale.setScalar(1 + 0.1 * Math.sin(t * 13));
      botShadow.position.set(BX, 0.01, bz); botShadow.scale.setScalar(0.9 - bob);
      notes.forEach((n, i) => { const p = ((t * 0.45 + i * 0.5) % 1); n.position.set(BX - 0.05 + i * 0.12 + Math.sin(t * 2 + i) * 0.04, 1.6 + bob + p * 0.35, bz); n.material.opacity = Math.sin(p * Math.PI) * 0.9; });
      // ---- world animation
      foams.forEach((f, i) => { const p = ((t * 0.16 + i / 3) % 1); f.position.z = -17.3 - p * 2.2; f.material.opacity = Math.sin(p * Math.PI) * 0.85; foamTex.offset.x = t * 0.01; });
      seaTex.offset.set(t * 0.004, -t * 0.012); glitTex.offset.y = (t * 0.05) % 1;
      palms.forEach(p => { p.top.rotation.z = Math.sin(t * 1.1 + p.ph) * 0.05; p.top.rotation.x = Math.sin(t * 0.8 + p.ph * 0.7) * 0.04; });
      birds.forEach(b => { const a = Math.sin(t * 7 + b.k) * 0.5; b.w1.rotation.z = a; b.w2.rotation.z = -a; b.g.position.set(X - 18 + ((t * 1.5 + b.k * 3.1) % 40), 7.5 + Math.sin(t * 0.7 + b.k) * 0.6 + (b.k % 3) * 0.6, -14 - (b.k % 4) * 3); });
      walkers.forEach((w, i) => { const wx = w.x0 + w.dir * w.sp * t; w.g.position.set(wx, Math.abs(Math.sin(t * 6 + i)) * 0.03, w.z); w.g.rotation.y = w.dir > 0 ? Math.PI / 2 : -Math.PI / 2; });
      gondolas.forEach((g, i) => { const p = ((t * 0.02 + i / 3) % 1); g.position.copy(cableA).lerp(cableB, p); });
      clouds.forEach(c => c.c.position.set(c.x + t * 0.3 + X * 0.6, c.y, c.z));
      lamps.forEach(l => l.material.color.setHex(0xffe2a6));
      // sun + lights follow along the walk
      sun.position.set(X - 10, 9, -230); sunDisc.position.set(X - 10, 9, -229); sky.position.set(X, 0, 0); sea.position.x = X; glitter.position.x = X - 6;
      sunL.position.set(X - 3, 6, -9); sunL.target.position.set(X, 0.8, 0); fill.position.set(X + 3, 3, 8); fill.target.position.set(X, 1, 0); rimP.position.set(X + 6, 3, -6); rimP.target.position.set(X, 1, 0);
      botL.intensity = 0.25 + rT * 0.6;
    };

    // ================= CAMERA (follows the walk) =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    // shot definitions are relative to the walkers' x (dx), resolved every frame
    const REL = {
      est: [P([4.2, 3.0, 4.6], [0.2, 1.0, -1.2], 44), P([2.9, 1.75, 3.3], [0.3, 1.15, -0.4], 40)],
      two: [P([2.2, 1.45, 2.9], [0.35, 1.22, -0.2], 36), P([2.0, 1.45, 2.6], [0.35, 1.22, -0.2], 36)],
      twoF: [P([3.3, 1.45, 1.7], [0.3, 1.2, -0.3], 36), P([3.0, 1.45, 1.55], [0.3, 1.2, -0.3], 36)],
      mad: [P([2.2, 1.5, 2.0], [0.1, 1.28, MZ], 32), P([2.05, 1.5, 1.85], [0.1, 1.28, MZ], 32)],
      botC: [P([1.55, 1.4, 1.35], [0.62, 1.3, BZ], 30), P([1.45, 1.4, 1.2], [0.62, 1.3, BZ], 30)],
      side: [P([0.4, 1.35, 3.4], [0.35, 1.18, -0.3], 38), P([0.7, 1.35, 3.3], [0.55, 1.18, -0.3], 38)],
      wide: [P([-3, 2.6, 5.5], [1.5, 1.2, -4], 46), P([-1.5, 2.3, 5.2], [2.0, 1.2, -4], 46)],
      back: [P([0.4, 1.55, 3.4], [0.4, 1.5, -8], 44), P([0.4, 1.65, 4.2], [0.4, 1.9, -10], 46)],
    };
    const plan = [
      [C.HOOK, C.ZERO, REL.est], [C.ZERO, C.SAME, REL.mad], [C.SAME, C.WHAT, REL.botC], [C.WHAT, C.TOOL, REL.mad], [C.TOOL, C.WOW, REL.twoF], [C.WOW, C.S1, REL.mad],
      [C.S1, C.S2, REL.two], [C.S2, C.S3, REL.wide], [C.S3, C.FAKEQ, REL.side], [C.FAKEQ, C.S4, REL.mad], [C.S4, C.S5, REL.twoF], [C.S5, C.PRESS, REL.two],
      [C.PRESS, C.TRACK, REL.botC], [C.TRACK, C.JUST, REL.wide], [C.JUST, C.HARD, REL.mad], [C.HARD, C.HIRED, REL.botC], [C.HIRED, D + 5, REL.back],
    ];
    const smooth = x => x * x * (3 - 2 * x);
    let curFovV = 36;
    const shots = [{ t: [0, D + 5], from: { pos: [0, 1, 3], look: [0, 1, 0] } }];
    const camAt = t => { const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; const kk = smooth(cl((t - p[0]) / (p[1] - p[0]))); const [f, to] = p[2]; const X = walkX(t);
      const pos = f.pos.map((v, i) => lerp(v, to.pos[i], kk)), lk = f.look.map((v, i) => lerp(v, to.look[i], kk)); curFovV = lerp(f.fov, to.fov, kk);
      const shake = 0.004 * Math.sin(t * 1.7) + 0.003 * Math.sin(t * 2.9);
      const sh0 = shots[0]; sh0.from.pos = [X + pos[0], pos[1] + shake, pos[2]]; sh0.from.look = [X + lk[0], lk[1], lk[2]]; sh0.fov = curFovV;   // render.js applies it via K.shoot
      K.cam.position.set(...sh0.from.pos); K.cam.lookAt(...sh0.from.look); K.cam.fov = curFovV; K.cam.updateProjectionMatrix(); };

    // ================= HUD =================
    S.add(K.cam);
    const HW = 1080, HH = 1920, hc = document.createElement('canvas'); hc.width = HW; hc.height = HH; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, depthTest: false, depthWrite: false, toneMapped: false, fog: false }));
    hud.renderOrder = 1000; K.cam.add(hud);
    const ACC = '#ffc53d', OR = '#ff7a3d', RED = '#ff4d5a', GRN = '#2fbf7f', INK = '#1d1b2e', PAPER = 'rgba(255,251,244,0.97)', DIMK = 'rgba(29,27,46,0.55)', TXT = '#fbf7f0';
    const FR = '"Fredoka Light", "Inter Display"', MONO = '"DejaVu Sans Mono", monospace';
    const F = (s, w = 400, fam = '"Inter", "DejaVu Sans"') => `${w} ${s}px ${fam}`;
    const txt = (s, x, y, size, col, w = 400, align = 'left', a = 1, fam) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam); h.fillStyle = col; h.textAlign = align; h.textBaseline = 'middle'; h.fillText(s, x, y); h.restore(); };
    const otxt = (s, x, y, size, col, a = 1, align = 'center', lw = 10) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, 700, FR); h.textAlign = align; h.textBaseline = 'middle'; h.lineJoin = 'round'; h.strokeStyle = 'rgba(30,20,40,0.9)'; h.lineWidth = lw; h.strokeText(s, x, y); h.fillStyle = col; h.fillText(s, x, y); h.restore(); };
    const fin = (t, t0, d = 0.35) => eo(pr(t, t0, t0 + d));
    const pop = (t, t0, d = 0.4) => eb(pr(t, t0, t0 + d));
    const rr = (x, y, w, hh, r, fill, stroke, lw = 3) => { h.beginPath(); h.roundRect(x, y, w, hh, r); if (fill) { h.fillStyle = fill; h.fill(); } if (stroke) { h.strokeStyle = stroke; h.lineWidth = lw; h.stroke(); } };
    const shadowCard = (x, y, w, hh, r = 30, fill = PAPER) => { h.save(); h.shadowColor = 'rgba(60,20,40,0.35)'; h.shadowBlur = 40; h.shadowOffsetY = 14; rr(x, y, w, hh, r, fill); h.restore(); };
    const chip = (s, x, y, size, bg, fg, a = 1, sc = 1, w = 800, fam = FR) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam); const tw = h.measureText(s).width + size * 1.2, th = size * 1.7; h.translate(x, y); h.scale(sc, sc); rr(-tw / 2, -th / 2, tw, th, th / 2, bg); h.fillStyle = fg; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 2); h.restore(); };
    const scaleAt = (x, y, s, fn) => { if (s <= 0) return; h.save(); h.translate(x, y); h.scale(s, s); h.translate(-x, -y); fn(); h.restore(); };
    const fmt = n => Math.round(n).toLocaleString('en-US');
    const typed = (t, s, a, b) => s.slice(0, Math.floor(s.length * cl((t - a) / (b - a))));
    const win = (x, y, w, hh, title, step, a) => { h.save(); h.globalAlpha *= a; shadowCard(x, y, w, hh, 28); rr(x, y, w, 64, [28, 28, 0, 0], '#efe8dc');
      ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { h.fillStyle = c; h.beginPath(); h.arc(x + 34 + i * 30, y + 32, 9, 0, 7); h.fill(); }); txt(title, x + w / 2, y + 33, 26, DIMK, 700, 'center', 1, MONO);
      if (step) chip(step, x + w - 92, y + 32, 22, OR, '#fff', 1, 1, 800); h.restore(); };
    const stepLabel = (t, n, name, t0, t1) => { const a = Math.min(fin(t, t0, 0.3), 1 - pr(t, t1 - 0.2, t1)); if (a <= 0) return; h.save(); h.globalAlpha = a;
      chip(`STEP ${n}/5`, 540, 190 + (1 - a) * -20, 30, OR, '#fff', 1, 1, 800); otxt(name, 540, 262 + (1 - a) * -20, 56, TXT, 1, 'center', 10); h.restore(); };
    const CYAN = '#1f8ec2';

    const drawHook = t => { if (t >= C.SAME) return; const a = Math.min(fin(t, 0.15, 0.4), 1 - pr(t, C.SAME - 0.3, C.SAME));
      chip('🎓  4 DAYS SINCE GRADUATION', 540, 200, 32, 'rgba(29,27,46,0.85)', TXT, a, pop(t, 0.15, 0.4));
      const b = pop(t, B(1) + 0.1, 0.4); scaleAt(540, 430, b * a, () => { shadowCard(200, 300, 680, 270, 34);
        txt('Applications sent', 250, 360, 30, DIMK, 600); txt(fmt(lerp(0, 60, eo(pr(t, B(1) + 0.2, E(1))))), 250, 440, 96, INK, 700, 'left', 1, FR);
        h.strokeStyle = 'rgba(29,27,46,0.12)'; h.lineWidth = 3; h.beginPath(); h.moveTo(560, 330); h.lineTo(560, 540); h.stroke();
        txt('Replies', 600, 360, 30, DIMK, 600); txt(t >= B('zero') ? '0' : '…', 600, 440, 96, t >= B('zero') ? RED : DIMK, 700, 'left', 1, FR);
        txt('📭 inbox empty', 600, 520, 26, DIMK, 600, 'left', fin(t, B('zero'), 0.3)); }); };
    const drawSame = t => { if (t < C.SAME || t >= C.TOOL) return; const a = 1 - pr(t, C.TOOL - 0.3, C.TOOL);
      h.save(); h.globalAlpha = a; for (let i = 0; i < 9; i++) { const k = pop(t, C.SAME + 0.1 + i * 0.06, 0.35); if (k <= 0) continue; h.save(); h.translate(540 + (i - 4) * 46 * k, 450 + Math.abs(i - 4) * 10 * k); h.rotate((i - 4) * 0.07 * k);
        shadowCard(-120, -160, 240, 320, 14); txt('RESUME.pdf', 0, -125, 22, INK, 800, 'center', 1, MONO); for (let r = 0; r < 7; r++) { h.fillStyle = 'rgba(29,27,46,0.13)'; h.fillRect(-90, -90 + r * 30, r % 3 === 2 ? 110 : 180, 12); } h.restore(); }
      chip('× 60  same file', 540, 680, 38, RED, '#fff', fin(t, C.SAME + 0.6, 0.3), pop(t, C.SAME + 0.6, 0.35)); h.restore(); };
    const drawRepo = t => { if (t < C.TOOL || t >= C.S1) return; const a = 1 - pr(t, C.S1 - 0.25, C.S1);
      const k = pop(t, B('name') - 0.05, 0.45); scaleAt(540, 430, k * a, () => { shadowCard(130, 290, 820, 290, 34, '#ffffff');
        h.fillStyle = INK; h.beginPath(); h.arc(200, 360, 30, 0, 7); h.fill(); txt('🐙', 200, 362, 34, '#fff', 400, 'center'); txt('career-ops-hq /', 250, 345, 28, DIMK, 600); txt('career-ops', 250, 385, 46, INK, 800, 'left', 1, FR);
        txt('Open-source AI job search agent', 170, 450, 28, DIMK, 600);
        const st = lerp(0, 80000, eo(pr(t, B('stars'), E('stars') + 0.1))); rr(170, 490, 330, 64, 18, '#fff4dc', '#f2c96b', 3); txt('⭐', 205, 523, 34, '#000', 400, 'center'); txt(fmt(st), 240, 523, 40, INK, 700, 'left', 1, FR);
        rr(520, 490, 180, 64, 18, '#e8f7ef', '#7fd3a8', 3); txt('MIT · free', 610, 523, 28, GRN, 800, 'center'); rr(720, 490, 190, 64, 18, '#efeafd', '#b7a6f2', 3); txt('Claude Code', 815, 523, 26, '#6a4fd0', 800, 'center'); });
      if (t >= C.WOW) { const s = pop(t, C.WOW, 0.35); scaleAt(540, 690, s * a, () => otxt('80,000 ⭐', 540, 690, 110, ACC, 1, 'center', 14)); } };
    const drawS1 = t => { if (t < C.S1 || t >= C.S2) return; const a = 1 - pr(t, C.S2 - 0.2, C.S2); stepLabel(t, 1, 'INSTALL', C.S1, C.S2);
      const k = pop(t, C.S1 + 0.25, 0.4); scaleAt(540, 470, k * a, () => { h.save(); h.shadowColor = 'rgba(0,0,0,0.4)'; h.shadowBlur = 40; rr(90, 340, 900, 270, 26, '#15131f'); h.restore();
        ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { h.fillStyle = c; h.beginPath(); h.arc(124 + i * 30, 372, 9, 0, 7); h.fill(); }); txt('Claude Code', 540, 373, 24, 'rgba(255,255,255,0.5)', 700, 'center', 1, MONO);
        const cmd = '/plugin marketplace add career-ops-hq/career-ops'; const s = typed(t, cmd, B('s1') + 0.5, E('s1') - 0.5);
        txt('>', 120, 440, 30, OR, 700, 'left', 1, MONO); h.font = F(27, 600, MONO); h.fillStyle = '#f3efe6'; h.textBaseline = 'middle'; h.fillText(s.slice(0, 26), 150, 440); h.fillText(s.slice(26), 150, 482);
        const ok = fin(t, E('s1') - 0.35, 0.25); txt('✓ career-ops installed', 120, 560, 30, '#4fe0a0', 700, 'left', ok, MONO); }); };
    const COS = ['Northwind', 'Lumenfold', 'Brightpath', 'Quillstone', 'Fernway', 'Orbitline', 'Mossgate', 'Pixelcraft'];
    const drawS2 = t => { if (t < C.S2 || t >= C.S3) return; const a = 1 - pr(t, C.S3 - 0.2, C.S3); stepLabel(t, 2, 'SCAN CAREER PAGES', C.S2, C.S3);
      h.save(); h.globalAlpha = a * fin(t, C.S2 + 0.2, 0.3); win(90, 330, 900, 470, 'careers · scanning', '', 1);
      const k = cl((t - C.S2 - 0.3) / (E('s2') - C.S2 - 0.3)); const n = Math.floor(lerp(0, 104, eo(k)));
      COS.forEach((c, i) => { const y = 430 + i * 44; if (i / COS.length > k * 1.15) return; txt(c + ' · careers', 130, y, 28, INK, 600); txt(`${1 + (i * 7) % 6} new roles`, 950, y, 26, GRN, 700, 'right'); });
      rr(90, 742, 900, 58, [0, 0, 28, 28], '#fff4dc'); txt('companies scanned', 130, 771, 28, DIMK, 700); txt(`${n}${k >= 1 ? '+' : ''}`, 950, 771, 40, OR, 700, 'right', 1, FR); h.restore(); };
    const JOBS = [['Data Analyst · Fresher', 4.6], ['Backend Dev · New Grad', 4.2], ['Senior ML Eng · 8 yrs', 1.4], ['Cloud Intern · Remote', 3.9], ['"Urgent hiring!!" · no company', 0]];
    const drawS3 = t => { if (t < C.S3 || t >= C.S4) return; const a = 1 - pr(t, C.S4 - 0.2, C.S4); stepLabel(t, 3, 'SCORE EVERY JOB', C.S3, C.S4);
      h.save(); h.globalAlpha = a * fin(t, C.S3 + 0.2, 0.3); win(90, 330, 900, 420, 'match vs your CV', '', 1);
      JOBS.forEach(([j, sc], i) => { const t0 = C.S3 + 0.5 + i * 0.3, ra = fin(t, t0, 0.25); if (ra <= 0) return; const y = 430 + i * 64; const ghost = sc === 0;
        h.save(); h.globalAlpha *= ra; txt(j, 130, y, 28, ghost ? DIMK : INK, 600);
        if (!ghost) { const col = sc >= 4 ? GRN : sc >= 3 ? '#e0a020' : RED; rr(800, y - 22, 150, 44, 22, col); txt(sc.toFixed(1) + ' / 5', 875, y, 26, '#fff', 800, 'center'); }
        else { const g = fin(t, B('fake') + 0.1, 0.3); chip('👻 GHOST · SKIPPED', 820, y, 22, '#5a4fd0', '#fff', g, pop(t, B('fake') + 0.1, 0.35), 800, '"Inter"'); h.strokeStyle = RED; h.lineWidth = 4; h.beginPath(); h.moveTo(125, y); h.lineTo(125 + 560 * fin(t, B('fake') + 0.1, 0.3), y); h.stroke(); }
        h.restore(); });
      if (t >= B('ghost')) chip('fake postings skipped automatically', 540, 800, 28, 'rgba(29,27,46,0.85)', TXT, fin(t, B('ghost'), 0.3), 1, 700, '"Inter"'); h.restore(); };
    const drawS4 = t => { if (t < C.S4 || t >= C.S5) return; const a = 1 - pr(t, C.S5 - 0.2, C.S5); stepLabel(t, 4, 'TAILOR RESUME', C.S4, C.S5);
      h.save(); h.globalAlpha = a; ['Northwind', 'Brightpath', 'Lumenfold'].forEach((c, i) => { const k = pop(t, B('s4') + 0.5 + i * 0.25, 0.4); if (k <= 0) return; h.save(); h.translate(250 + i * 290, 500); h.rotate((i - 1) * 0.06); h.scale(k, k);
        shadowCard(-125, -170, 250, 340, 16); txt('RESUME', 0, -135, 22, INK, 800, 'center', 1, MONO); txt(`for ${c}`, 0, -102, 22, OR, 700, 'center'); for (let r = 0; r < 6; r++) { h.fillStyle = r === 1 || r === 3 ? 'rgba(255,122,61,0.35)' : 'rgba(29,27,46,0.13)'; h.fillRect(-95, -65 + r * 30, r % 3 === 2 ? 120 : 190, 12); }
        chip('ATS ✓', 0, 130, 24, GRN, '#fff', fin(t, B('ats'), 0.3), 1, 800, '"Inter"'); h.restore(); });
      const cv = pop(t, B('ats') + 0.6, 0.4); scaleAt(540, 760, cv, () => chip('+ cover letter for each ✉️', 540, 760, 32, OR, '#fff', 1, 1, 800)); h.restore(); };
    const FIELDS = ['Full name', 'Email', 'Degree · 2026', 'Resume', 'Why this company?'];
    const drawS5 = t => { if (t < C.S5 || t >= C.TRACK) return; const a = 1 - pr(t, C.TRACK - 0.2, C.TRACK); stepLabel(t, 5, 'FILL THE FORM · YOU SUBMIT', C.S5, C.TRACK);
      h.save(); h.globalAlpha = a * fin(t, C.S5 + 0.2, 0.3); win(140, 330, 800, 560, 'apply · Northwind', '', 1);
      FIELDS.forEach((f, i) => { const y = 420 + i * 72, ok = fin(t, B('s5') + 0.5 + i * 0.22, 0.2); txt(f, 180, y - 18, 22, DIMK, 700); rr(180, y - 2, 600, 40, 10, '#f6f1e8', ok > 0.5 ? '#7fd3a8' : '#e2d9c8', 2); if (ok > 0.5) txt('✓', 810, y + 18, 30, GRN, 800, 'center'); });
      const press = t >= B('press') + 0.2, pk = pop(t, B('press') + 0.2, 0.3), pulse = t >= C.HARD ? 1 + 0.06 * Math.sin(t * 9) : 1;
      scaleAt(540, 832, pulse * (press ? 0.95 + 0.05 * pk : 1), () => { rr(380, 800, 320, 64, 32, press ? GRN : OR); txt(press ? 'Submitted ✓' : 'Submit', 540, 832, 32, '#fff', 800, 'center', 1, FR); });
      if (t >= B('sub') && !press) chip('waiting for YOU', 540, 930, 26, 'rgba(29,27,46,0.85)', TXT, fin(t, B('sub'), 0.3), 1, 700, '"Inter"');
      if (t >= B('press')) { const hk = eo(pr(t, B('press'), B('press') + 0.25)); txt('👆', 640 + (1 - hk) * 60, 880 + (1 - hk) * 60, 64, '#000', 400, 'center'); } h.restore(); };
    const drawTrack = t => { if (t < C.TRACK || t >= C.JUST) return; const a = 1 - pr(t, C.JUST - 0.25, C.JUST);
      h.save(); h.globalAlpha = a * fin(t, C.TRACK + 0.1, 0.3); chip('ONE TRACKER', 540, 200, 30, OR, '#fff', 1, 1, 800); win(90, 290, 900, 420, 'tracker', '', 1);
      [['Evaluated', 48, '#8a8aa0'], ['Applied', 14, OR], ['Interview', 3, GRN], ['Offer', 1, '#5a4fd0']].forEach(([s, n, c], i) => { const x = 130 + i * 212, k = fin(t, C.TRACK + 0.4 + i * 0.15, 0.3);
        rr(x, 390, 190, 280, 18, '#f6f1e8'); txt(s, x + 95, 425, 24, DIMK, 800, 'center'); txt(fmt(n * k), x + 95, 500, 64, c, 700, 'center', 1, FR); for (let r = 0; r < 3; r++) rr(x + 20, 560 + r * 34, 150, 24, 8, `rgba(29,27,46,${0.06 + 0.03 * r})`); });
      ['FREE', 'OPEN SOURCE'].forEach((s, i) => chip(s, 400 + i * 260, 780, 34, i ? '#5a4fd0' : GRN, '#fff', fin(t, B('track') + 0.9 + i * 0.35, 0.25), pop(t, B('track') + 0.9 + i * 0.35, 0.35), 800)); h.restore(); };
    const drawJust = t => { if (t < C.JUST || t >= C.HIRED) return; const k = pop(t, C.HARD + 0.1, 0.4);
      scaleAt(540, 420, k, () => { h.save(); h.shadowColor = 'rgba(47,191,127,0.7)'; h.shadowBlur = 40; rr(340, 380, 400, 90, 45, GRN); h.restore(); txt('Submit', 540, 425, 46, '#fff', 800, 'center', 1, FR); txt('👆', 690, 480, 70, '#000', 400, 'center'); });
      chip('hardest part of the week 😅', 540, 560, 30, 'rgba(29,27,46,0.85)', TXT, fin(t, C.HARD + 0.5, 0.3), 1, 700, '"Inter"'); };
    // confetti burst at the end
    const conf = Array.from({ length: 70 }, (_, i) => { const r = K.rng(100 + i); return { x: 540 + (r() - 0.5) * 300, vx: (r() - 0.5) * 900, vy: -700 - r() * 700, c: ['#ffc53d', '#ff7a3d', '#2fbf7f', '#5a8cff', '#ff5aa0'][i % 5], s: 10 + r() * 12, rot: r() * 6 }; });
    const drawHired = t => { if (t < C.HIRED) return; const dt = t - (B('hired') + 0.35); if (dt > 0) conf.forEach(c => { const x = c.x + c.vx * dt, y = 900 + c.vy * dt + 900 * dt * dt; if (y > HH) return; h.save(); h.translate(x, y); h.rotate(c.rot + dt * 6); h.fillStyle = c.c; h.fillRect(-c.s / 2, -c.s / 4, c.s, c.s / 2); h.restore(); }); };
    // speaker tag above the caption
    const drawTag = t => { const l = L.find(l => t >= l.t - 0.05 && t < l.end + 0.1); if (!l || t >= C.HIRED + 3) return; const me = l.who === 'maddie';
      chip(me ? 'MADDIE' : 'BOT', 540, 1308, 24, me ? 'rgba(255,251,244,0.95)' : OR, me ? INK : '#fff', fin(t, l.t - 0.05, 0.15), 1, 800, '"Inter"'); };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.32, HW / 2, HH * 0.5, HH * 0.78); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(40,10,30,0.32)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const hudDraw = t => { h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawHook(t); drawSame(t); drawRepo(t); drawS1(t); drawS2(t); drawS3(t); drawS4(t); drawS5(t); drawTrack(t); drawJust(t); drawHired(t); drawTag(t);
      const fi = 1 - pr(t, 0, 0.35); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      const fo = pr(t, D - 0.6, D); if (fo > 0) { h.fillStyle = `rgba(0,0,0,${fo})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.25)'; h.fillRect(0, 0, HW, 6); h.fillStyle = OR; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = () => { const visH = 2 * Math.tan(curFovV * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { acting(t); camAt(t); K.cam.updateMatrixWorld(true); placeHud(); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    for (let t2 = 0.4; t2 < D - 1; t2 += 2.6) sfx.push(['rustle', t2, 0.05]);                       // soft sea air
    sfx.push(['pop', 0.2, 0.3], ['pop', B(1) + 0.1, 0.3]); for (let i = 0; i < 8; i++) sfx.push(['tick', B(1) + 0.2 + i * 0.12, 0.15]); sfx.push(['thud', B('zero'), 0.4]);
    for (let i = 0; i < 9; i++) sfx.push(['pop', C.SAME + 0.1 + i * 0.06, 0.12]); sfx.push(['buzz', C.SAME + 0.6, 0.12]);
    sfx.push(['whoosh', B('name') - 0.1, 0.3], ['pop', B('name'), 0.35]); for (let t2 = B('stars'); t2 < E('stars'); t2 += 0.06) sfx.push(['coin', t2, 0.06]); sfx.push(['kaching', C.WOW, 0.3]);
    sfx.push(['whoosh', C.S1, 0.25], ['pop', C.S1 + 0.25, 0.3]); for (let t2 = B('s1') + 0.5; t2 < E('s1') - 0.5; t2 += 0.07) sfx.push(['tick', t2, 0.12]); sfx.push(['ding', E('s1') - 0.35, 0.25]);
    sfx.push(['whoosh', C.S2, 0.25]); for (let i = 0; i < 8; i++) sfx.push(['pop', C.S2 + 0.4 + i * 0.18, 0.1]);
    sfx.push(['whoosh', C.S3, 0.25]); JOBS.forEach((_, i) => sfx.push(['tick', C.S3 + 0.5 + i * 0.3, 0.25])); sfx.push(['zap', B('fake') + 0.1, 0.2]);
    sfx.push(['whoosh', C.S4, 0.25]); for (let i = 0; i < 3; i++) sfx.push(['pop', B('s4') + 0.5 + i * 0.25, 0.3]); sfx.push(['ding', B('ats') + 0.6, 0.2]);
    sfx.push(['whoosh', C.S5, 0.25]); FIELDS.forEach((_, i) => sfx.push(['tick', B('s5') + 0.5 + i * 0.22, 0.25])); sfx.push(['pop', B('press') + 0.2, 0.4], ['chime', B('press') + 0.3, 0.3]);
    sfx.push(['whoosh', C.TRACK, 0.25]); for (let i = 0; i < 4; i++) sfx.push(['pop', C.TRACK + 0.4 + i * 0.15, 0.2]); sfx.push(['kaching', B('track') + 1.0, 0.25]);
    sfx.push(['pop', C.HARD + 0.1, 0.35], ['riser', C.HIRED - 1.6, 0.25], ['whoosh', C.HIRED, 0.35], ['kaching', B('hired') + 0.35, 0.35], ['thud', B('hired') + 0.3, 0.3]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 62 };
  },

};
