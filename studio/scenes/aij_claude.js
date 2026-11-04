/* @maddiee.makess reel 6 — "Claude made this" (recreation of the 'nobody shows you how' format).
   Dark navy neon-grid world. 3:12 AM, Maddie's reel got 69 views; Claude's got 2.2M. Claude walks him through it:
   STEP 1 one line + checks who posted it · STEP 2 sources · STEP 3 not AI video, it's code (Marine Drive builds itself, 418 cars)
   · STEP 4 fixes its own frames · STEP 5 renders · THE COST · 5 PROMPTS · result clip (every phone in India switches off) · comment PROMPT.
   Full 9:16, no bars, no blush dots, captions high with yellow keywords, no handle. */
const LN = (who, text, say, o = {}) => ({ who, text, say: say || text.replace(/\*/g, ''), ...o });
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x050920, fog: [6, 24], fov: 36, bloom: { strength: 0.42, radius: 0.55, threshold: 0.97 } },
  lines: [
    LN('maddie', 'Ugh.', 'Ugh.', { id: 'hook', speed: 0.9, pitch: -2.2, gap: 0 }),
    LN('maddie', 'Claude…', 'Claude...', { speed: 0.94, pitch: -1.6, gap: 0.16 }),
    LN('maddie', 'my last reel got *69 views*.', 'my last reel got sixty-nine views.', { speed: 0.97, pitch: -1.6, gap: 0.08 }),
    LN('claude', '*69.*', 'Sixty-nine.', { id: 'six', speed: 0.98, pitch: -0.6, gap: 0.2 }),
    LN('claude', 'This one got *2.2 million*.', 'This one got two point two million.', { id: 'two', speed: 1.06, pitch: 0.4, gap: 0.16 }),
    LN('maddie', 'Wait…', 'Wait...', { id: 'wait', speed: 1.0, pitch: 2.2, gap: 0.18, gain: 2 }),
    LN('maddie', '*YOU* made that?', 'You made that?', { speed: 1.08, pitch: 3.0, gap: 0.06, gain: 3 }),
    LN('claude', 'That one.', 'That one.', { id: 'that', speed: 1.06, gap: 0.18 }),
    LN('claude', 'And *47 more*.', 'And forty-seven more.', { speed: 1.1, gap: 0.08 }),
    LN('claude', 'Almost *28 million* views.', 'Almost twenty-eight million views.', { speed: 1.08, pitch: 0.5, gap: 0.08 }),
    LN('maddie', 'Okay.', 'Okay.', { id: 'okay', speed: 1.0, pitch: 0.4, gap: 0.22 }),
    LN('maddie', 'Nobody ever *shows how*.', 'Nobody ever shows how.', { speed: 1.04, pitch: 0.6, gap: 0.08 }),
    LN('maddie', '*Show me.*', 'Show me!', { id: 'show', speed: 1.06, pitch: 2.2, gap: 0.12, gain: 2 }),
    LN('claude', '*Step one.*', 'Step one.', { id: 's1', speed: 1.06, gap: 0.22 }),
    LN('claude', 'Give me *one line*.', 'Give me one line.', { speed: 1.1, gap: 0.06 }),
    LN('maddie', 'Um…', 'Umm...', { id: 'um', speed: 0.92, pitch: 0.6, gap: 0.18 }),
    LN('maddie', 'what if every *phone in India*', 'What if every phone in India', { id: 'idea', speed: 1.06, pitch: 1.2, gap: 0.1 }),
    LN('maddie', 'switched off for *5 seconds*?', 'switched off, for five seconds?', { speed: 1.06, pitch: 1.6, gap: 0.02 }),
    LN('claude', "*Nobody's* posted that yet.", "Nobody's posted that yet.", { id: 'check', speed: 1.08, gap: 0.22 }),
    LN('claude', 'I *checked*.', 'I checked.', { id: 'checked', speed: 1.0, pitch: -0.6, gap: 0.08 }),
    LN('claude', '*Step two.*', 'Step two.', { id: 's2', speed: 1.06, gap: 0.24 }),
    LN('claude', 'I find a *source* for every fact.', 'I find a source, for every fact.', { speed: 1.1, gap: 0.06 }),
    LN('maddie', 'And then you *generate* the video?', 'And then you generate the video?', { id: 'gen', speed: 1.07, pitch: 1.6, gap: 0.2 }),
    LN('claude', 'Nope.', 'Nope.', { id: 'nope', speed: 0.98, pitch: -1.2, gap: 0.16 }),
    LN('claude', '*Not AI video.*', 'Not, AI video.', { speed: 1.06, gap: 0.08 }),
    LN('claude', 'I write *code* that builds', 'I write code, that builds', { id: 'code', speed: 1.1, gap: 0.14 }),
    LN('claude', 'the *whole world*.', 'the whole world.', { speed: 1.06, pitch: 0.4, gap: 0.02 }),
    LN('claude', '*Marine Drive.*', 'Marine Drive.', { id: 'marine', speed: 1.0, pitch: 0.6, gap: 0.2 }),
    LN('claude', '*418 cars.*', 'Four hundred and eighteen cars.', { id: 'cars', speed: 1.08, pitch: 0.8, gap: 0.12 }),
    LN('maddie', "But I *can't code*.", "But I can't code.", { id: 'cant', speed: 1.02, pitch: 0.8, gap: 0.22 }),
    LN('claude', 'You never *touch it*.', 'You never touch it.', { id: 'touch', speed: 0.98, pitch: -0.6, gap: 0.12 }),
    LN('claude', '*Step four.*', 'Step four.', { id: 's4', speed: 1.06, gap: 0.26 }),
    LN('claude', 'I check my own frames…', 'I check my own frames...', { speed: 1.1, gap: 0.06 }),
    LN('claude', "and fix what's *weak*.", "and fix what's weak.", { speed: 1.06, gap: 0.04 }),
    LN('claude', '*Step five.*', 'Step five.', { id: 's5', speed: 1.06, gap: 0.26 }),
    LN('claude', 'I render it.', 'I render it.', { speed: 1.1, gap: 0.06 }),
    LN('claude', '*2,700 frames.*', 'Two thousand, seven hundred frames.', { id: 'frames', speed: 1.1, gap: 0.08 }),
    LN('claude', '*16 minutes.*', 'Sixteen minutes.', { speed: 1.04, gap: 0.08 }),
    LN('maddie', 'Okay…', 'Okay...', { id: 'cost', speed: 0.98, pitch: -0.4, gap: 0.26 }),
    LN('maddie', 'how much does that *cost*?', 'how much does that cost?', { speed: 1.05, pitch: 1.2, gap: 0.04 }),
    LN('claude', '*No extra cost.*', 'No extra cost.', { id: 'free', speed: 1.04, gap: 0.18 }),
    LN('claude', 'Just your *Claude plan*.', 'Just your Claude plan.', { speed: 1.04, gap: 0.08 }),
    LN('claude', "That's it.", "That's it.", { id: 'thats', speed: 1.02, gap: 0.26 }),
    LN('claude', '*Five prompts.*', 'Five prompts.', { id: 'five', speed: 0.98, pitch: 0.6, gap: 0.16 }),
    LN('maddie', 'Comment *PROMPT*.', 'Comment, prompt!', { id: 'cta', speed: 1.04, pitch: 1.6, gap: 3.5, gain: 1.5 }),
    LN('maddie', "I'll send all five to your *DM*.", "I'll send all five, to your D M.", { speed: 1.08, pitch: 1.2, gap: 0.1 }),
  ].map(l => ({ ...l, speed: +(l.speed * (l.who === 'claude' ? 1.12 : 1.07)).toFixed(3) })),

  build(K, T) {
    const L = T.lines, N = L.length;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[typeof id === 'number' ? id : IX(id)].t, E = id => L[typeof id === 'number' ? id : IX(id)].end;
    const D = E(N - 1) + 1.7;
    const cl = K.clamp, eo = K.easeOut, ei = K.easeIn, pr = K.prog, eb = K.easeBack, lerp = K.lerp, ez = K.ease;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const rng = K.rng(11);

    // ================= TIMELINE =================
    const C = {
      HOOK: 0, SIX: B('six') - 0.12, WAIT: B('wait') - 0.1, GRID: B('that') - 0.12, OKAY: B('okay') - 0.1, ST1: B('s1') - 0.12,
      CHK: B('check') - 0.12, SRC: B('s2') - 0.12, GEN: B('gen') - 0.1, NOPE: B('nope') - 0.1, CODE: B('code') - 0.15, MAR: B('marine') - 0.1,
      CANT: B('cant') - 0.12, TOUCH: B('touch') - 0.1, FIX: B('s4') - 0.12, REN: B('s5') - 0.12, COST: B('cost') - 0.12, FREE: B('free') - 0.1,
      FIVE: B('thats') - 0.12, RES: E('five') + 0.3, CTA: B('cta') - 0.15,
    };
    const inS = (t, a, b) => t >= C[a] && t < C[b];
    const OFF = C.RES + 1.05;                 // phones switch off in the result clip

    // ================= WORLD: navy void + glowing grid =================
    const gridTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#000'; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(90,120,255,1)'; x.lineWidth = 3; x.strokeRect(0, 0, w, h);
      x.strokeStyle = 'rgba(70,95,220,0.35)'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(w / 2, 0); x.lineTo(w / 2, h); x.moveTo(0, h / 2); x.lineTo(w, h / 2); x.stroke(); });
    gridTex.wrapS = gridTex.wrapT = THREE.RepeatWrapping; gridTex.repeat.set(160, 160); gridTex.anisotropy = 8;
    const floorM = new THREE.MeshStandardMaterial({ color: 0x0a1036, roughness: 0.85, metalness: 0, emissive: 0x4a64ff, emissiveIntensity: 0.55, emissiveMap: gridTex });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), floorM); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, -20); floor.receiveShadow = true; S.add(floor);
    // far horizon glow (ignores fog)
    const skyTex = K.canvasTex(64, 512, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#02040f'); g.addColorStop(0.55, '#08103a'); g.addColorStop(0.78, '#1b2a8a'); g.addColorStop(0.86, '#0a1240'); g.addColorStop(1, '#050920'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(120, 32, 16), new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false, toneMapped: false })); sky.position.set(0, -8, -20); S.add(sky);
    const starG = new THREE.BufferGeometry(), sp = []; for (let i = 0; i < 700; i++) { const a = rng() * Math.PI * 2, e = 0.08 + rng() * 1.2; sp.push(Math.cos(a) * Math.cos(e) * 110, Math.sin(e) * 110 - 8, Math.sin(a) * Math.cos(e) * 110 - 20); }
    starG.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
    S.add(new THREE.Points(starG, new THREE.PointsMaterial({ color: 0xbfd0ff, size: 0.35, fog: false, transparent: true, opacity: 0.7 })));
    // floating holo reel frames in the background (desk area)
    const holo = [];
    for (let i = 0; i < 9; i++) { const g = ['#ff6a88', '#4facfe', '#f6d365', '#a18cd1', '#43e97b', '#fa709a', '#30cfd0', '#f093fb', '#5ee7df'][i];
      const tx = K.canvasTex(90, 160, (x, w, h) => { const gr = x.createLinearGradient(0, 0, w, h); gr.addColorStop(0, g); gr.addColorStop(1, '#1a1f4a'); x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,255,255,0.85)'; x.beginPath(); x.moveTo(36, 66); x.lineTo(58, 80); x.lineTo(36, 94); x.fill(); x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 4; x.strokeRect(2, 2, w - 4, h - 4); });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.8), new THREE.MeshBasicMaterial({ map: tx, transparent: true, opacity: 0.55, toneMapped: false }));
      const a = -1.2 + i * 0.3; m.position.set(Math.sin(a) * (3.4 + (i % 3) * 0.8), 1.2 + (i % 4) * 0.45, -2.6 - Math.cos(a) * (1.5 + (i % 3) * 0.7)); m.lookAt(0, 1.1, 1); S.add(m); holo.push({ m, y: m.position.y, ph: i * 1.7 }); }

    // ================= DESK SET =================
    const DY = 0.74;
    const deskM = SM(0x2a2f4a, 0.55), deskD = SM(0x1d2136, 0.6), trim = new THREE.MeshStandardMaterial({ color: 0x55e0ff, emissive: 0x55e0ff, emissiveIntensity: 2.2 });
    rbox(1.9, 0.05, 0.8, deskM, 0, DY - 0.025, -0.45, 0.02);
    rbox(1.86, 0.62, 0.04, deskD, 0, DY - 0.36, -0.07, 0.015);
    rbox(1.86, 0.012, 0.012, trim, 0, DY - 0.06, -0.045, 0.004);                        // neon edge strip
    rbox(0.04, 0.7, 0.76, deskD, -0.92, DY - 0.37, -0.45, 0.015); rbox(0.04, 0.7, 0.76, deskD, 0.92, DY - 0.37, -0.45, 0.015);
    const chairM = SM(0x30323d, 0.6);
    rbox(0.5, 0.07, 0.46, chairM, -0.2, 0.53, -0.95, 0.03); rbox(0.5, 0.62, 0.07, chairM, -0.2, 0.92, -1.2, 0.04);
    cyl(0.03, 0.03, 0.45, SM(0x22232a, 0.4, { metalness: 0.5 }), -0.2, 0.27, -0.95, 10);
    // laptop: screen faces Maddie
    const lap = new THREE.Group(); lap.position.set(-0.2, DY, -0.5); S.add(lap);
    const alu = SM(0x9aa0aa, 0.35, { metalness: 0.5 });
    rbox(0.5, 0.025, 0.34, alu, 0, 0.012, 0, 0.01, lap);
    const lid = new THREE.Group(); lid.position.set(0, 0.025, 0.16); lid.rotation.x = 0.26; lap.add(lid);
    rbox(0.44, 0.27, 0.018, alu, 0, 0.135, 0, 0.01, lid);
    const stk = new THREE.Mesh(new THREE.CircleGeometry(0.045, 24), SM(0xe0663a, 0.5)); stk.position.set(0.09, 0.16, 0.011); lid.add(stk);
    const stk2 = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.05), SM(0x2ec4b6, 0.5)); stk2.position.set(-0.1, 0.09, 0.011); stk2.rotation.z = 0.2; lid.add(stk2);
    const stk3 = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.07), SM(0xffc53d, 0.5)); stk3.position.set(-0.08, 0.2, 0.011); stk3.rotation.z = -0.25; lid.add(stk3);
    const LSW = 960, LSH = 600, lsc = document.createElement('canvas'); lsc.width = LSW; lsc.height = LSH; const lx = lsc.getContext('2d');
    const lTex = new THREE.CanvasTexture(lsc); lTex.colorSpace = THREE.SRGBColorSpace; lTex.anisotropy = 8;
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.41, 0.256), new THREE.MeshBasicMaterial({ map: lTex, toneMapped: false })); scr.rotation.y = Math.PI; scr.position.set(0, 0.135, -0.0095); lid.add(scr);
    const scrL = new THREE.PointLight(0x9fc4ff, 0.18, 1.0, 1.8); scrL.position.set(-0.2, DY + 0.2, -0.65); S.add(scrL);
    // desk props: mug + steam, phone, notebook + pen, lamp, plant, headphones, sticky notes, cable
    const mug = cyl(0.04, 0.036, 0.09, SM(0xf2ece0, 0.5), -0.66, DY + 0.045, -0.36, 20);
    const hnd = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.008, 8, 16), SM(0xf2ece0, 0.5)); hnd.position.set(-0.705, DY + 0.05, -0.36); hnd.rotation.y = Math.PI / 2; S.add(hnd);
    const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.034, 18), SM(0x4a2a18, 0.3)); coffee.rotation.x = -Math.PI / 2; coffee.position.set(-0.66, DY + 0.086, -0.36); S.add(coffee);
    const puff = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 2, 32, 32, 30); g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const steam = Array.from({ length: 6 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puff, transparent: true, opacity: 0, depthWrite: false })); S.add(s); return s; });
    const dphone = new THREE.Group(); dphone.position.set(-0.52, DY + 0.006, -0.2); dphone.rotation.y = 0.3; S.add(dphone);
    rbox(0.08, 0.01, 0.16, SM(0x7b5cff, 0.4), 0, 0, 0, 0.004, dphone);
    const dpScr = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.15), new THREE.MeshBasicMaterial({ color: 0x0b0b10, toneMapped: false })); dpScr.rotation.x = -Math.PI / 2; dpScr.position.y = 0.0055; dphone.add(dpScr);
    rbox(0.22, 0.02, 0.28, SM(0x3b6ea8, 0.7), 0.62, DY + 0.01, -0.66, 0.008);
    rbox(0.2, 0.004, 0.26, SM(0xf4efe4, 0.9), 0.62, DY + 0.022, -0.66, 0.002);
    const pen = cyl(0.006, 0.006, 0.16, SM(0xffc53d, 0.4), 0.7, DY + 0.03, -0.6, 8); pen.rotation.set(Math.PI / 2, 0, 0.6);
    const lampM = SM(0x2b2e3a, 0.4, { metalness: 0.3 });
    cyl(0.07, 0.08, 0.02, lampM, 0.75, DY + 0.01, -0.78, 20);
    const la = cyl(0.008, 0.008, 0.36, lampM, 0.72, DY + 0.18, -0.76, 8); la.rotation.z = 0.25;
    const lh = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.1, 20, 1, true), SM(0x2b2e3a, 0.4, { side: THREE.DoubleSide })); lh.position.set(0.66, DY + 0.38, -0.7); lh.rotation.z = 0.7; S.add(lh);
    const lbulb = sph(0.025, BM(0xffe2a8), 0.64, DY + 0.35, -0.7); lbulb.castShadow = false;
    const pot = cyl(0.06, 0.05, 0.1, SM(0xc96a3f, 0.6), -0.82, DY + 0.05, -0.72, 18);
    for (let i = 0; i < 6; i++) { const lf = sph(0.05, SM(i % 2 ? 0x3f8f4e : 0x2f7a42, 0.8), -0.82 + Math.sin(i * 2.1) * 0.04, DY + 0.15 + (i % 3) * 0.035, -0.72 + Math.cos(i * 2.1) * 0.035); lf.scale.set(0.7, 1.4, 0.6); lf.rotation.z = Math.sin(i * 2.1) * 0.5; }
    const hp = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.012, 8, 24, Math.PI), SM(0x1a1b22, 0.5)); hp.position.set(0.5, DY + 0.012, -0.24); hp.rotation.set(-Math.PI / 2, 0, 0.4); S.add(hp);
    [[-1, 0.44], [1, 0.56]].forEach(([s, x]) => { const c = cyl(0.035, 0.035, 0.025, SM(0x1a1b22, 0.5), 0.5 + s * 0.072, DY + 0.014, -0.24 - s * 0.03, 16); });
    const notes = [[0xffc53d, -0.8, -0.2, 0.2], [0xff7a9a, -0.72, -0.12, -0.3], [0x6fe3b5, 0.84, -0.3, 0.15]];
    notes.forEach(([c, x, z, r]) => { const n = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.08), SM(c, 0.8)); n.rotation.set(-Math.PI / 2, 0, r); n.position.set(x, DY + 0.002, z); S.add(n); });
    const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V(0.02, DY + 0.01, -0.62), V(0.2, DY + 0.006, -0.72), V(0.4, DY + 0.006, -0.82), V(0.6, DY - 0.1, -0.86)]), 20, 0.006, 6), SM(0x15161c, 0.6)); S.add(cable);

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: 0.56, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(-0.2, 0, -0.95); S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    const R = K.makeRobo({ height: 0.46 }); R.g.position.set(0.36, DY, -0.4); R.g.rotation.y = -0.55; S.add(R.g);

    // ================= LIGHT =================
    const hemi = new THREE.HemisphereLight(0x8fa2ff, 0x1a1030, 0.75); S.add(hemi);
    const key = new THREE.DirectionalLight(0xffe2c0, 1.5); key.position.set(1.2, 2.8, 2.2); key.target.position.set(0, 0.9, -0.6); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.8); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const lampL = new THREE.PointLight(0xffc27a, 2.0, 2.5, 1.6); lampL.position.set(0.62, DY + 0.3, -0.66); S.add(lampL);
    const rimB = new THREE.DirectionalLight(0x5a78ff, 1.6); rimB.position.set(-2, 2.2, -2.6); S.add(rimB);
    const rimP = new THREE.DirectionalLight(0xc25aff, 0.9); rimP.position.set(2.2, 1.6, -2.4); S.add(rimP);

    // ================= MARINE DRIVE (code-built city) =================
    const CX = 0, CZ = -46, RR = 7.2, A0 = -2.05, A1 = 2.05;                 // arc centre, sea-wall radius, arc span (opens away from the desk)
    const city = new THREE.Group(); S.add(city);
    const P2 = (a, r, y = 0) => V(CX + Math.sin(a) * r, y, CZ + Math.cos(a) * r);
    // sea: disc + open water beyond the arc ends
    const seaTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#16367a'; x.fillRect(0, 0, w, h); const r = K.rng(4); for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(${150 + r() * 80},${190 + r() * 60},255,${0.15 + r() * 0.25})`; x.fillRect(r() * w, r() * h, 6 + r() * 18, 2); } });
    seaTex.wrapS = seaTex.wrapT = THREE.RepeatWrapping; seaTex.repeat.set(6, 6);
    const seaM = new THREE.MeshStandardMaterial({ color: 0x2a5ab0, roughness: 0.5, metalness: 0, emissive: 0x3a66d0, emissiveIntensity: 0.55, emissiveMap: seaTex, map: seaTex });
    const sea = new THREE.Mesh(new THREE.CircleGeometry(RR, 64), seaM); sea.rotation.x = -Math.PI / 2; sea.position.set(CX, 0.015, CZ); city.add(sea);
    const sea2 = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), seaM); sea2.rotation.x = -Math.PI / 2; sea2.position.set(CX, 0.014, CZ - 15); city.add(sea2);
    const ring = (r0, r1, m, y) => { const o = new THREE.Mesh(new THREE.RingGeometry(r0, r1, 96, 1, 0, A1 - A0), m); o.rotation.x = -Math.PI / 2; o.rotation.z = A0 - Math.PI / 2; o.position.set(CX, y, CZ); city.add(o); return o; };
    // RingGeometry angle is measured from +x in its plane; after rotation.x=-PI/2 that maps to world (x, -z). Our P2 uses angle from +z, so shift by -PI/2.
    const promM = SM(0xc9c4ba, 0.8), roadTex = K.canvasTex(64, 512, (x, w, h) => { x.fillStyle = '#26283a'; x.fillRect(0, 0, w, h); x.fillStyle = '#e8e2c8'; for (let i = 0; i < 3; i++) for (let y = 0; y < h; y += 64) x.fillRect(Math.round(w * (i + 1) / 4) - 1, y, 2, 30); });
    const prom = ring(RR, RR + 0.42, promM, 0.05);
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(RR + 0.02, RR + 0.02, 0.12, 96, 1, true, A0, A1 - A0), SM(0xa8a296, 0.8, { side: THREE.DoubleSide })); wall.position.set(CX, 0.06, CZ); city.add(wall);
    const tetra = new THREE.InstancedMesh(new THREE.TetrahedronGeometry(0.11), SM(0x8c877e, 0.9), 220);   // tetrapods along the sea wall
    { const dm = new THREE.Object3D(); for (let i = 0; i < 220; i++) { const a = lerp(A0 + 0.02, A1 - 0.02, i / 219); const p = P2(a, RR - 0.12 - (i % 2) * 0.1, 0.06); dm.position.copy(p); dm.rotation.set(i, i * 2, i * 3); dm.updateMatrix(); tetra.setMatrixAt(i, dm.matrix); } }
    city.add(tetra);
    const roadM = SM(0xffffff, 0.9, { map: roadTex });
    const road = ring(RR + 0.42, RR + 1.5, roadM, 0.04);
    const road2 = ring(RR + 6.3, RR + 6.9, SM(0x26283a, 0.9), 0.04);
    // streetlights: the Queen's Necklace
    const NL = 72, poleM = SM(0x3a3d4a, 0.5, { metalness: 0.4 });
    const poles = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.012, 0.016, 0.42, 6), poleM, NL), bulbs = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffd27a, toneMapped: false }), NL);
    city.add(poles); city.add(bulbs);
    const reflTex = K.canvasTex(32, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,210,122,0.9)'); g.addColorStop(1, 'rgba(255,210,122,0)'); x.fillStyle = g; for (let y = 0; y < h; y += 10) x.fillRect(6 + Math.sin(y) * 4, y, 20, 6); });
    const refl = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.16, 2.2).translate(0, -1.1, 0), new THREE.MeshBasicMaterial({ map: reflTex, transparent: true, depthWrite: false, toneMapped: false, opacity: 0.55 }), NL); city.add(refl);
    const necklace = Array.from({ length: NL }, (_, i) => lerp(A0 + 0.03, A1 - 0.03, i / (NL - 1)));
    // buildings: 3 height classes, each with its own window texture so windows don't stretch
    const winTex = rows => K.canvasTex(128, 32 * rows, (x, w, h) => { x.fillStyle = '#000'; x.fillRect(0, 0, w, h); const r = K.rng(rows * 7);
      for (let ry = 0; ry < rows; ry++) for (let cx = 0; cx < 5; cx++) { if (r() < 0.38) continue; x.fillStyle = r() < 0.75 ? '#ffd38a' : '#9fc8ff'; x.fillRect(8 + cx * 24, ry * 32 + 9, 14, 15); } });
    const BCLS = [{ rows: 4, h: [0.7, 1.4] }, { rows: 9, h: [1.6, 2.8] }, { rows: 18, h: [3.2, 5.6] }];
    const BLD = [];   // {cls, a, r, w, d, h, delay}
    const rowsR = [[RR + 2.1, 0.75, 0], [RR + 3.2, 0.9, 1], [RR + 4.5, 1.0, 1], [RR + 5.6, 0.95, 2], [RR + 8.0, 1.2, 2], [RR + 9.6, 1.3, 1], [RR + 11.2, 1.4, 2]];
    rowsR.forEach(([r, w, cls], ri) => { const step = (w + 0.22) / r; for (let a = A0 + step / 2; a < A1 - step / 2; a += step) { if (rng() < 0.12) continue;
      const c = ri === 0 ? 0 : (rng() < 0.3 ? Math.max(0, cls - 1) : cls); const hh = lerp(BCLS[c].h[0], BCLS[c].h[1], rng());
      BLD.push({ c, a: a + (rng() - 0.5) * step * 0.2, r: r + (rng() - 0.5) * 0.2, w: w * (0.8 + rng() * 0.25), d: 0.7 + rng() * 0.4, h: hh, delay: (Math.abs(a) / A1) * 0.55 + ri * 0.06 + rng() * 0.12 }); } });
    const bodyCols = [0xdfd6c4, 0xc9cbd6, 0xb7c3d6, 0xe8dcc8, 0x9fa8bd, 0xd6c3b0];
    const bMesh = BCLS.map((cl2, ci) => { const n = BLD.filter(b => b.c === ci).length; const tx = winTex(cl2.rows);
      const m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, emissive: 0xffffff, emissiveIntensity: 1.25, emissiveMap: tx });
      const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), m, Math.max(1, n)); im.castShadow = true; city.add(im);
      BLD.filter(b => b.c === ci).forEach((b, k) => { b.k = k; im.setColorAt(k, new THREE.Color(bodyCols[Math.floor(rng() * bodyCols.length)]).multiplyScalar(0.55)); });
      return im; });
    const roofs = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff3b3b, toneMapped: false }), BLD.length); city.add(roofs);   // red aircraft lights on the roofs
    // cars: 4 lanes on Marine Drive + 2 lanes on the back road = 418
    const CARS = [];
    [[RR + 0.62, 1], [RR + 0.88, 1], [RR + 1.12, -1], [RR + 1.36, -1]].forEach(([r, dir], li) => { const n = 55; for (let i = 0; i < n; i++) CARS.push({ r, dir, a0: lerp(A0, A1, (i + rng() * 0.5) / n), sp: 0.012 + rng() * 0.01 }); });
    [[RR + 6.45, 1], [RR + 6.75, -1]].forEach(([r, dir]) => { const n = 99; for (let i = 0; i < n; i++) CARS.push({ r, dir, a0: lerp(A0, A1, (i + rng() * 0.5) / n), sp: 0.008 + rng() * 0.006 }); });
    const NCAR = CARS.length;   // 418
    const carCols = [0xffd23a, 0x1a1a1a, 0xf2f2f2, 0xd9413a, 0x3b6ea8, 0x8a8f99, 0x1f8a6a];
    const carBody = new THREE.InstancedMesh(new RB(0.3, 0.1, 0.15, 2, 0.03).translate(0, 0.07, 0), SM(0xffffff, 0.4, { metalness: 0.2 }), NCAR);
    const carTop = new THREE.InstancedMesh(new RB(0.16, 0.07, 0.13, 2, 0.025).translate(-0.01, 0.15, 0), SM(0xffffff, 0.4), NCAR);
    const heads = new THREE.InstancedMesh(new THREE.BoxGeometry(0.02, 0.025, 0.11).translate(0.15, 0.08, 0), new THREE.MeshBasicMaterial({ color: 0xfff4d6, toneMapped: false }), NCAR);
    const tails = new THREE.InstancedMesh(new THREE.BoxGeometry(0.02, 0.025, 0.11).translate(-0.15, 0.08, 0), new THREE.MeshBasicMaterial({ color: 0xff2a2a, toneMapped: false }), NCAR);
    CARS.forEach((c, i) => { const col = rng() < 0.3 ? 'taxi' : carCols[Math.floor(rng() * carCols.length)]; c.col = col;
      carBody.setColorAt(i, new THREE.Color(col === 'taxi' ? 0x151515 : col)); carTop.setColorAt(i, new THREE.Color(col === 'taxi' ? 0xffcc1a : new THREE.Color(col).multiplyScalar(0.8))); });
    [carBody, carTop, heads, tails].forEach(m => { m.castShadow = false; city.add(m); });
    // people on the promenade (result clip): little toy figures holding glowing phones
    const FOLK = [];
    const folk = (i, a, r, yaw) => { const g = new THREE.Group(); city.add(g); const p = P2(a, r, 0.07); g.position.copy(p); g.rotation.y = yaw;
      const top = [0xd9413a, 0x3b6ea8, 0xffc53d, 0x2f9e7a, 0xf2f2f2, 0x8a5cc7, 0xff7a3d][i % 7], sk = [0xf0c4a0, 0xc98a5c, 0xa96f4c, 0xe0b08a][i % 4];
      const pM = SM([0x2b2f45, 0x6a5a48, 0x3a3d46][i % 3], 0.8), sM = SM(sk, 0.55), hM = SM(0x1d140f, 0.7);
      for (const sx of [-1, 1]) { const lg = new THREE.Mesh(new THREE.CapsuleGeometry(0.026, 0.09, 4, 8), pM); lg.position.set(sx * 0.035, 0.07, 0); g.add(lg); }
      rbox(0.13, 0.14, 0.08, SM(top, 0.8), 0, 0.2, 0, 0.03, g);
      const head = new THREE.Group(); head.position.set(0, 0.29, 0); g.add(head);
      rbox(0.12, 0.12, 0.11, sM, 0, 0.045, 0, 0.04, head); rbox(0.125, 0.05, 0.115, hM, 0, 0.095, -0.006, 0.02, head);
      [-1, 1].forEach(sx => { const e = sph(0.009, SM(0x111111, 0.4), sx * 0.025, 0.05, 0.056, head); e.castShadow = false; });
      for (const sx of [-1, 1]) { const ar = new THREE.Mesh(new THREE.CapsuleGeometry(0.02, 0.07, 4, 8), SM(top, 0.8)); ar.position.set(sx * 0.06, 0.2, 0.04); ar.rotation.x = -1.1; ar.rotation.z = -sx * 0.25; g.add(ar); }
      const ph = new THREE.Group(); ph.position.set(0, 0.22, 0.1); ph.rotation.x = -0.9; g.add(ph);
      rbox(0.045, 0.08, 0.008, SM(0x222222, 0.4), 0, 0, 0, 0.003, ph);
      const scr2 = new THREE.Mesh(new THREE.PlaneGeometry(0.038, 0.07), new THREE.MeshBasicMaterial({ color: 0x8fd0ff, toneMapped: false })); scr2.position.z = 0.0045; ph.add(scr2);
      const gl = new THREE.PointLight(0x8fd0ff, 0.12, 0.5, 2); gl.position.set(0, 0.03, 0.04); ph.add(gl);
      FOLK.push({ g, head, scr2, gl, k: i, col: [0x8fd0ff, 0xffb3d1, 0xbaffc9, 0xfff2a8][i % 4] }); };
    for (let i = 0; i < 16; i++) { const a = -0.05 + i * 0.045 + (rng() - 0.5) * 0.02; folk(i, a, RR + 0.08 + (i % 3) * 0.11, Math.atan2(-Math.cos(a), Math.sin(a)) + (rng() - 0.5) * 1.2); }
    const cityLight = new THREE.HemisphereLight(0x9fb2ff, 0x10142e, 0); S.add(cityLight);
    const moonL = new THREE.DirectionalLight(0xbcd0ff, 0); moonL.position.set(CX - 8, 12, CZ + 10); moonL.target.position.set(CX, 0, CZ); S.add(moonL); S.add(moonL.target);
    const promL = new THREE.PointLight(0xffc27a, 0, 3.5, 1.6); S.add(promL);

    const dm = new THREE.Object3D(), tmpC = new THREE.Color();
    const cityAt = t => {
      // build progress: buildings rise during the code lines, the road + necklace at "Marine Drive", cars at "418 cars"
      const kb = pr(t, B('code') - 0.05, B('marine') + 0.2), kr = pr(t, B('marine') - 0.15, B('marine') + 0.7), kc = pr(t, B('cars') - 0.1, E('cars') + 0.1);
      const built = t >= C.RES;     // result clip: everything there
      BLD.forEach(b => { const k = built ? 1 : eb(cl((kb - b.delay * 0.75) / 0.3)); const p = P2(b.a, b.r);
        dm.position.copy(p); dm.rotation.set(0, b.a, 0); dm.scale.set(b.w, Math.max(0.001, b.h * k), b.d); dm.updateMatrix(); bMesh[b.c].setMatrixAt(b.k, dm.matrix);
        dm.position.y = b.h * k + 0.02; dm.scale.set(0.05, 0.03, 0.05); if (b.c === 0 || k < 0.98) dm.scale.set(0.0001, 0.0001, 0.0001); dm.updateMatrix(); roofs.setMatrixAt(BLD.indexOf(b), dm.matrix); });
      bMesh.forEach(m => m.instanceMatrix.needsUpdate = true); roofs.instanceMatrix.needsUpdate = true;
      roofs.material.color.setRGB(Math.sin(t * 3) > 0 ? 1 : 0.25, 0.12, 0.12);
      const rk = built ? 1 : kr;
      prom.visible = road.visible = wall.visible = road2.visible = rk > 0.01; tetra.visible = rk > 0.5;
      necklace.forEach((a, i) => { const on = built || rk > i / NL ? 1 : 0; const p = P2(a, RR + 0.46, 0.05);
        dm.rotation.set(0, 0, 0); dm.position.copy(p).setY(0.26); dm.scale.setScalar(on ? 1 : 0.0001); dm.updateMatrix(); poles.setMatrixAt(i, dm.matrix);
        dm.position.y = 0.48; dm.scale.setScalar(on ? 1 + 0.25 * K.pulse(t, B('marine') - 0.15 + (i / NL) * 0.85, 0.3) : 0.0001); dm.updateMatrix(); bulbs.setMatrixAt(i, dm.matrix); });
      necklace.forEach((a, i) => { const on = built || rk > i / NL; const p = P2(a, RR - 0.3, 0.02); dm.position.copy(p); dm.rotation.set(-Math.PI / 2, 0, a + Math.PI); dm.scale.setScalar(on ? 1 : 0.0001); dm.updateMatrix(); refl.setMatrixAt(i, dm.matrix); });
      refl.instanceMatrix.needsUpdate = true;
      poles.instanceMatrix.needsUpdate = bulbs.instanceMatrix.needsUpdate = true;
      const nc = built ? NCAR : Math.floor(eo(kc) * NCAR);
      CARS.forEach((c, i) => { const vis = i < nc; const a = c.a0 + c.dir * c.sp * t; const aa = A0 + ((((a - A0) % (A1 - A0)) + (A1 - A0)) % (A1 - A0));
        const p = P2(aa, c.r, 0.04); const pop = vis ? (built ? 1 : eb(cl((kc * NCAR - i) / 25))) : 0.0001;
        dm.position.copy(p); dm.rotation.set(0, aa + (c.dir > 0 ? 0 : Math.PI), 0); dm.scale.setScalar(Math.max(0.0001, pop)); dm.updateMatrix();
        carBody.setMatrixAt(i, dm.matrix); carTop.setMatrixAt(i, dm.matrix); heads.setMatrixAt(i, dm.matrix); tails.setMatrixAt(i, dm.matrix); });
      [carBody, carTop, heads, tails].forEach(m => m.instanceMatrix.needsUpdate = true);
      seaTex.offset.set(t * 0.01, t * 0.004);
      // people: phones on, then all switch off; heads come up and look around
      FOLK.forEach(f => { const off = t >= OFF + f.k * 0.035; f.scr2.material.color.setHex(off ? 0x050505 : f.col); f.gl.intensity = off ? 0 : 0.15;
        const up = eo(pr(t, OFF + 0.25 + f.k * 0.04, OFF + 0.75 + f.k * 0.04)); f.head.rotation.x = lerp(0.45, -0.12, up); f.head.rotation.y = up * Math.sin(f.k * 1.7 + t * 1.5) * 0.5; });
    };

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const lapLook = [0.0, 0.3], toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      // Maddie: where he looks + face
      let mL = toR, face = 'neutral', lean = 0.15, type = 0;
      if (t < C.SIX) { mL = lapLook; face = 'worried'; lean = 0.45; }                                  // slumped at the laptop
      else if (t < C.WAIT) { mL = t < B('two') ? lapLook : toR; face = t < B('two') ? 'worried' : 'neutral'; lean = 0.35; }
      else if (t < C.GRID) { mL = toR; face = 'shock'; lean = -0.1; }
      else if (t < C.OKAY) { mL = toR; face = 'shock'; lean = 0; }
      else if (t < C.ST1) { mL = t < B('show') ? toCam : toR; face = t < B('show') ? 'neutral' : 'smile'; lean = 0.05; }
      else if (t < C.CHK) { mL = t < B('um') ? toR : lapLook; face = 'neutral'; type = t >= B('idea') && t < E(IX('idea') + 1) ? 1 : 0; lean = 0.3; if (t >= B('um') && t < B('idea')) { mL = [0.25, -0.2]; } }
      else if (t < C.GEN) { mL = t < C.SRC ? lapLook : toR; face = 'smile'; lean = 0.2; }
      else if (t < C.CANT) { mL = toR; face = t < C.NOPE ? 'smile' : 'shock'; }
      else if (t < C.FIX) { mL = toR; face = t < C.TOUCH ? 'worried' : 'smile'; }
      else if (t < C.COST) { mL = lapLook; face = 'shock'; lean = 0.3; }
      else if (t < C.FIVE) { mL = toR; face = t < C.FREE ? 'worried' : 'shock'; }
      else if (t < C.CTA) { mL = toR; face = 'smile'; }
      else { mL = toCam; face = 'smile'; lean = -0.05; }
      if (face === 'smile' && mT > 0.05 && t < C.CTA) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type, lean });
      // arms: on the keyboard by default; hands up on "YOU made that?" and on the CTA
      const [aL, aR] = M.arms, wave = t >= C.WAIT && t < C.GRID ? eo(pr(t, C.WAIT, C.WAIT + 0.3)) : t >= C.CTA ? eo(pr(t, C.CTA, C.CTA + 0.4)) : 0;
      if (wave > 0) { aL.sh.rotation.set(-0.3 - wave * 0.9, 0.2, -0.05 - wave * 0.3); aL.el.rotation.x = -0.1 - wave * 1.1; aR.sh.rotation.set(-0.3 - wave * 0.9, -0.2, 0.05 + wave * 0.3); aR.el.rotation.x = -0.1 - wave * 1.1; }
      // Claude
      let rL = [-0.15, 0.05];                                         // toward Maddie
      if (t >= C.SIX && t < C.WAIT) rL = [0.25, 0.0];
      if ((t >= C.ST1 && t < B('um')) || (t >= C.SRC && t < C.GEN) || (t >= C.FIX && t < C.COST) || (t >= C.FREE && t < C.CTA)) rL = [0.42, 0.02];   // explaining to us
      if (t >= C.CHK && t < C.SRC) rL = [-0.55, 0.25];                                                       // at the laptop
      if (t >= C.CTA) rL = [0.5, 0.0];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      const mood = (t >= C.NOPE && t < C.CODE) || (t >= C.FREE && t < C.FIVE) ? 'smile' : 'calm';
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood, glow: false });
      R.head.rotation.z += 0.14 * K.pulse(t, B('six') - 0.1, 0.9) - 0.12 * K.pulse(t, B('nope') - 0.05, 0.7);       // unimpressed tilt, head shake
      R.head.rotation.y += 0.25 * Math.sin((t - B('nope')) * 18) * K.pulse(t, B('nope') - 0.05, 0.6);
      R.head.rotation.x += 0.12 * K.pulse(t, B('touch') - 0.05, 0.6) + 0.12 * K.pulse(t, B('checked') - 0.05, 0.5);   // nods
      R.g.position.y = DY + Math.abs(Math.sin(t * 9)) * 0.012 * K.pulse(t, C.FIVE, 0.8);
      // desk details
      steam.forEach((s, i) => { const ph = ((t * 0.45 + i / steam.length) % 1); s.position.set(-0.66 + Math.sin(i * 2 + t * 1.3) * 0.015, DY + 0.12 + ph * 0.22, -0.36); s.scale.setScalar(0.03 + ph * 0.07); s.material.opacity = 0.32 * Math.sin(ph * Math.PI); });
      dpScr.material.color.setHex(t >= C.FIX && t < C.REN && Math.floor(t * 2) % 2 ? 0x3a6dff : 0x0b0b10);
      holo.forEach(o => { o.m.position.y = o.y + Math.sin(t * 0.7 + o.ph) * 0.06; });
    };

    // ================= LAPTOP SCREEN =================
    const typed = (t, s, a, b) => s.slice(0, Math.floor(s.length * cl((t - a) / (b - a))));
    const IDEA = 'What if every phone in India switched off for 5 seconds?';
    const lr = (X, Y, W, H, r, f) => { lx.fillStyle = f; lx.beginPath(); lx.roundRect(X, Y, W, H, r); lx.fill(); };
    const ltxt = (s, X, Y, size, col, w = 500, al = 'left', fam = '"Inter", sans-serif') => { lx.font = `${w} ${size}px ${fam}`; lx.fillStyle = col; lx.textAlign = al; lx.textBaseline = 'middle'; lx.fillText(s, X, Y); };
    const drawLaptop = t => {
      lx.fillStyle = '#14151c'; lx.fillRect(0, 0, LSW, LSH);
      if (t < C.WAIT) {                                // Instagram insights: 69 views
        lx.fillStyle = '#0f0f13'; lx.fillRect(0, 0, LSW, LSH); ltxt('Reel insights', 40, 50, 34, '#fff', 800);
        lr(40, 100, 200, 340, 18, '#2a2d3a'); ltxt('▶', 140, 270, 70, 'rgba(255,255,255,0.5)', 800, 'center');
        ltxt('Views', 290, 140, 30, '#9a9aa8', 600); ltxt('69', 290, 210, 96, '#fff', 900); ltxt('▼ 92% vs your average', 290, 285, 26, '#ff5a5f', 600);
        lx.strokeStyle = '#5a7cff'; lx.lineWidth = 5; lx.beginPath(); for (let i = 0; i <= 30; i++) { const X = 290 + i * 20, Y = 430 - (i < 4 ? i * 10 : 40 - (i - 4) * 1.2); i ? lx.lineTo(X, Y) : lx.moveTo(X, Y); } lx.stroke();
        ltxt('posted 3 days ago · 2 likes', 40, 520, 26, '#777', 500);
      } else if (t >= C.REN && t < C.COST) {           // render progress
        const kf = cl((t - B('s5') - 0.2) / (E('frames') - B('s5') - 0.2)); const fr = Math.round(kf * 2700);
        lx.fillStyle = '#0d1020'; lx.fillRect(0, 0, LSW, LSH); ltxt('Rendering  phones_off.mp4', 40, 60, 32, '#fff', 800);
        const W2 = 880, cols = 22; for (let i = 0; i < 110; i++) { const X = 40 + (i % cols) * 40, Y = 120 + Math.floor(i / cols) * 52; const on = i / 110 < kf; lr(X, Y, 34, 44, 5, on ? `hsl(${210 + (i % 7) * 8},70%,${40 + (i % 5) * 6}%)` : '#23263a'); }
        lr(40, 410, W2, 26, 13, '#23263a'); const gr = lx.createLinearGradient(40, 0, 40 + W2, 0); gr.addColorStop(0, '#ffc53d'); gr.addColorStop(1, '#ff7a3d'); lr(40, 410, Math.max(26, W2 * kf), 26, 13, gr);
        ltxt(`frame ${fr.toLocaleString('en-US')} / 2,700`, 40, 490, 34, '#fff', 700); ltxt(`${String(Math.floor(kf * 16)).padStart(2, '0')}:${String(Math.floor((kf * 16 * 60) % 60)).padStart(2, '0')}`, 920, 490, 34, '#ffc53d', 800, 'right');
      } else {                                          // Claude chat
        lx.fillStyle = '#1c1b22'; lx.fillRect(0, 0, LSW, LSH); lx.fillStyle = '#26252e'; lx.fillRect(0, 0, LSW, 70);
        lx.fillStyle = '#e0663a'; lx.beginPath(); lx.arc(46, 35, 16, 0, 7); lx.fill(); ltxt('Claude', 76, 36, 28, '#eee', 700);
        const msg = t >= B('idea') ? typed(t, IDEA, B('idea'), E(IX('idea') + 1) - 0.1) : '';
        if (t >= C.ST1 && t < C.CHK) { lr(40, 440, 880, 110, 24, '#2b2a33'); lx.strokeStyle = '#e0663a'; lx.lineWidth = 3; lx.beginPath(); lx.roundRect(40, 440, 880, 110, 24); lx.stroke();
          lx.font = '500 30px "Inter", sans-serif'; lx.fillStyle = msg ? '#fff' : '#77757f'; lx.textAlign = 'left'; lx.textBaseline = 'middle';
          const s2 = msg || 'Give me one line…'; const w1 = s2.length > 44 ? s2.slice(0, 44) : s2; lx.fillText(w1 + (s2.length <= 44 && Math.floor(t * 3) % 2 ? '|' : ''), 70, s2.length > 44 ? 478 : 495); if (s2.length > 44) lx.fillText(s2.slice(44) + (Math.floor(t * 3) % 2 ? '|' : ''), 70, 518); }
        else { lr(380, 110, 540, 90, 20, '#3a3946'); ltxt(IDEA.slice(0, 32) + '…', 400, 155, 26, '#fff', 500);
          const rows = ['Checking who posted it…', 'Finding sources…', 'Writing scene.js…', 'Checking frames…'], n = t < C.SRC ? 1 : t < C.CODE ? 2 : t < C.FIX ? 3 : 4;
          rows.slice(0, n).forEach((r, i) => { ltxt((i < n - 1 ? '✓ ' : '● ') + r, 60, 260 + i * 56, 28, i < n - 1 ? '#6fe3b5' : '#ffc53d', 600); }); }
      }
      lTex.needsUpdate = true;
    };

    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MH = [-0.2, 1.3, -0.94], RHd = [0.36, 1.03, -0.4], MHL = [-0.2, 1.42, -0.94], RHL = [0.36, 1.13, -0.4];
    const sh = {
      hook: [P([-0.1, 1.46, 1.45], MHL, 32), P([-0.12, 1.45, 1.22], MHL, 32)],
      robo: [P([0.1, 1.16, 0.85], RHL, 30), P([0.12, 1.15, 0.68], RHL, 30)],
      wait: [P([-0.18, 1.43, 1.05], [-0.2, 1.4, -0.94], 30), P([-0.18, 1.42, 0.85], [-0.2, 1.4, -0.94], 30)],
      two: [P([0.12, 1.5, 1.75], [0.05, 1.22, -0.6], 38), P([0.05, 1.5, 1.6], [0.05, 1.22, -0.6], 38)],
      mad: [P([0.12, 1.44, 1.32], MHL, 32), P([0.1, 1.43, 1.15], MHL, 32)],
      ots: [P([-1.2, 1.55, 0.95], [-0.28, 1.24, -0.68], 34), P([-1.1, 1.53, 0.82], [-0.28, 1.24, -0.68], 34)],
      robL: [P([-0.32, 1.15, 0.82], RHL, 30), P([-0.28, 1.14, 0.68], RHL, 30)],
      pair: [P([0.35, 1.38, 1.3], [0.1, 1.2, -0.6], 36), P([0.3, 1.36, 1.16], [0.1, 1.2, -0.6], 36)],
      city0: [P([CX - 1.0, 2.6, CZ - 8], [CX, 2.4, CZ + 8], 44), P([CX + 3.0, 7.0, CZ - 10], [CX, 2.0, CZ + 7], 46)],
      city1: [P([CX + 3.0, 7.0, CZ - 10], [CX, 2.0, CZ + 7], 46), P([CX - 2.5, 4.2, CZ - 6.5], [CX + 0.5, 1.8, CZ + 7], 44)],
      lapF: [P([-0.15, 1.08, -0.84], [-0.2, 0.89, -0.36], 30), P([-0.16, 1.06, -0.8], [-0.2, 0.89, -0.36], 30)],
      res: [P([...P2(-0.36, RR + 0.24, 0.44).toArray()], [...P2(0.2, RR + 0.18, 0.3).toArray()], 46), P([...P2(-0.31, RR + 0.24, 0.42).toArray()], [...P2(0.22, RR + 0.18, 0.3).toArray()], 46)],
      cta: [P([0.06, 1.5, 2.15], [0.06, 1.24, -0.6], 40), P([0.06, 1.48, 1.95], [0.06, 1.24, -0.6], 40)],
    };
    const plan = [
      [C.HOOK, C.SIX, sh.hook], [C.SIX, C.WAIT, sh.robo], [C.WAIT, C.GRID, sh.wait],
      [C.GRID, C.OKAY, sh.two], [C.OKAY, C.ST1, sh.mad], [C.ST1, B('um') - 0.1, sh.robL], [B('um') - 0.1, C.CHK, sh.ots],
      [C.CHK, C.SRC, sh.robo], [C.SRC, C.GEN, sh.pair], [C.GEN, C.NOPE, sh.mad], [C.NOPE, C.CODE, sh.robo],
      [C.CODE, C.MAR, sh.city0], [C.MAR, C.CANT, sh.city1], [C.CANT, C.TOUCH, sh.wait], [C.TOUCH, C.FIX, sh.robL],
      [C.FIX, C.REN, sh.pair], [C.REN, C.COST, sh.ots], [C.COST, C.FREE, sh.mad], [C.FREE, C.FIVE, sh.robo],
      [C.FIVE, C.RES, sh.two], [C.RES, C.CTA, sh.res], [C.CTA, D + 5, sh.cta],
    ];
    const smooth = k => k * k * (3 - 2 * k);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth,
      shake: s === sh.wait && a === C.WAIT ? (t => 0.006 * Math.exp(-(t - a) * 6)) : null }));
    const curFov = t => { const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; const k = smooth(cl((t - p[0]) / (p[1] - p[0]))); return lerp(p[2][0].fov, p[2][1].fov, k); };
    const inCity = t => t >= C.CODE && t < C.CANT || t >= C.RES && t < C.CTA;

    // ================= HUD =================
    S.add(K.cam);
    const HW = 1080, HH = 1920, hc = document.createElement('canvas'); hc.width = HW; hc.height = HH; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, depthTest: false, depthWrite: false, toneMapped: false, fog: false }));
    hud.renderOrder = 1000; K.cam.add(hud);
    const ACC = '#ffc53d', RED = '#ff4d5a', GRN = '#3ddc97', BLU = '#5a7cff', INK = 'rgba(10,14,40,0.96)', TXT = '#fbf7f0', DIM = 'rgba(251,247,240,0.62)';
    const FR = '"Fredoka Light", "Inter Display"';
    const F = (s, w = 400, fam = '"Inter", "DejaVu Sans"') => `${w} ${s}px ${fam}`;
    const txt = (s, x, y, size, col, w = 400, align = 'left', a = 1, fam) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam); h.fillStyle = col; h.textAlign = align; h.textBaseline = 'middle'; h.fillText(s, x, y); h.restore(); };
    const otxt = (s, x, y, size, col, a = 1, align = 'center', lw = 10) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, 700, FR); h.textAlign = align; h.textBaseline = 'middle'; h.lineJoin = 'round';
      h.strokeStyle = 'rgba(8,10,30,0.95)'; h.lineWidth = lw; h.strokeText(s, x, y); h.fillStyle = col; h.fillText(s, x, y); h.restore(); };
    const fin = (t, t0, d = 0.4) => eo(pr(t, t0, t0 + d));
    const pop = (t, t0, d = 0.4) => eb(pr(t, t0, t0 + d));
    const card = (x, y, w, hh, r = 30, fill = INK, stroke = 'rgba(120,150,255,0.35)') => { h.fillStyle = fill; h.beginPath(); h.roundRect(x, y, w, hh, r); h.fill(); if (stroke) { h.strokeStyle = stroke; h.lineWidth = 3; h.stroke(); } };
    const glowCard = (x, y, w, hh, r, col) => { h.save(); h.shadowColor = col; h.shadowBlur = 40; card(x, y, w, hh, r, INK, col); h.restore(); card(x, y, w, hh, r, INK, col); };
    const chip = (s, x, y, size, bg, fg, a = 1, sc = 1, w = 800, fam) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam); const tw = h.measureText(s).width + size * 1.3, th = size * 1.8;
      h.translate(x, y); h.scale(sc, sc); h.fillStyle = bg; h.beginPath(); h.roundRect(-tw / 2, -th / 2, tw, th, th / 2); h.fill(); h.fillStyle = fg; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 3); h.restore(); };
    const scaleAt = (x, y, s, fn) => { h.save(); h.translate(x, y); h.scale(s, s); h.translate(-x, -y); fn(); h.restore(); };
    const fmt = n => Math.round(n).toLocaleString('en-US');
    const thumbs = Array.from({ length: 48 }, (_, i) => { const c = document.createElement('canvas'); c.width = 180; c.height = 320; const x = c.getContext('2d'), r = K.rng(30 + i);
      r(); r(); const hue = (i * 47 + 200) % 360; const g = x.createLinearGradient(0, 0, 180, 320); g.addColorStop(0, `hsl(${hue},70%,55%)`); g.addColorStop(1, `hsl(${(hue + 60) % 360},65%,22%)`); x.fillStyle = g; x.fillRect(0, 0, 180, 320);
      x.fillStyle = 'rgba(0,0,0,0.25)'; for (let b = 0; b < 7; b++) { const bh = 40 + r() * 120; x.fillRect(b * 27, 320 - bh, 24, bh); }
      x.fillStyle = 'rgba(255,255,255,0.9)'; x.font = '900 70px "Inter"'; x.textAlign = 'center'; x.fillText(['🌍', '🚗', '📱', '🏙️', '🌊', '⚡', '🚀', '🧊', '🌋', '🛰️'][i % 10], 90, 150);
      x.font = '800 22px "Inter"'; x.fillText('▶ ' + (0.2 + r() * 1.6).toFixed(1) + 'M', 90, 300); return c; });
    thumbs[0] = (() => { const c = document.createElement('canvas'); c.width = 360; c.height = 640; const x = c.getContext('2d'); const g = x.createLinearGradient(0, 0, 0, 640); g.addColorStop(0, '#0b1240'); g.addColorStop(1, '#1d1240'); x.fillStyle = g; x.fillRect(0, 0, 360, 640);
      const r = K.rng(3); for (let b = 0; b < 12; b++) { const bh = 120 + r() * 260, bx = b * 31; x.fillStyle = '#141a44'; x.fillRect(bx, 640 - bh, 28, bh); x.fillStyle = 'rgba(255,211,138,0.85)'; for (let wy = 640 - bh + 10; wy < 630; wy += 20) for (let wx = bx + 4; wx < bx + 24; wx += 9) if (r() < 0.5) x.fillRect(wx, wy, 5, 8); }
      x.fillStyle = '#ffd27a'; for (let i = 0; i < 18; i++) { x.beginPath(); x.arc(10 + i * 20, 560 + Math.sin(i / 3) * 10, 4, 0, 7); x.fill(); }
      x.fillStyle = '#fff'; x.font = '700 34px "Fredoka Light"'; x.textAlign = 'center'; ['What if every phone', 'in India switched off', 'for 5 seconds?'].forEach((s, i) => { x.strokeStyle = '#000'; x.lineWidth = 7; x.strokeText(s, 180, 80 + i * 44); x.fillText(s, 180, 80 + i * 44); });
      x.font = '90px "Inter"'; x.fillText('📵', 180, 330); return c; })();

    const label = (t, s1, s2, t0) => { const a = fin(t, t0, 0.25); if (a <= 0) return; h.save(); h.globalAlpha = a; h.font = F(40, 800, FR); const w1 = h.measureText(s1).width; h.font = F(40, 700, FR); const w2 = s2 ? h.measureText(s2).width : 0;
      const W = w1 + w2 + (s2 ? 70 : 50), x0 = 540 - W / 2, y = 205 + (1 - a) * -20; h.shadowColor = 'rgba(90,124,255,0.8)'; h.shadowBlur = 24; card(x0, y - 38, W, 76, 38, 'rgba(8,12,40,0.92)', 'rgba(120,150,255,0.8)'); h.shadowBlur = 0;
      txt(s1, x0 + 25, y + 2, 40, ACC, 800, 'left', 1, FR); if (s2) { txt('·', x0 + 25 + w1 + 10, y + 2, 40, DIM, 800, 'left', 1, FR); txt(s2, x0 + 45 + w1 + 4, y + 2, 40, TXT, 700, 'left', 1, FR); } h.restore(); };
    const STEPS = [['ST1', 'CHK', 'STEP 1', 'ONE LINE'], ['CHK', 'SRC', 'STEP 1', 'IT CHECKS WHO POSTED IT'], ['SRC', 'GEN', 'STEP 2', 'SOURCES'], ['GEN', 'CODE', 'STEP 3', 'NOT AI VIDEO ❌'], ['CODE', 'CANT', 'STEP 3', "IT'S CODE"],
      ['CANT', 'FIX', 'STEP 3', 'YOU NEVER TOUCH IT'], ['FIX', 'REN', 'STEP 4', 'IT FIXES ITS OWN WORK'], ['REN', 'COST', 'STEP 5', 'IT RENDERS'], ['COST', 'FIVE', 'THE COST', ''], ['FIVE', 'RES', '5 PROMPTS', '']];

    const drawHook = t => { if (t >= C.SIX) return;
      chip('🌙  3:12 AM', 540, 215, 34, 'rgba(8,12,40,0.88)', TXT, fin(t, 0.05, 0.3), 1, 700);
      const a = pop(t, 0.25, 0.45); if (a <= 0) return; scaleAt(540, 420, a, () => {
        card(150, 300, 780, 250, 34); h.drawImage(thumbs[5], 180, 325, 112, 200); h.fillStyle = 'rgba(0,0,0,0.35)'; h.fillRect(180, 325, 112, 200);
        txt('your last reel', 330, 355, 32, DIM, 600); txt('▶', 330, 430, 54, TXT, 800); txt(fmt(lerp(0, 69, eo(pr(t, 0.6, 1.4)))), 395, 432, 88, TXT, 900, 'left', 1, FR); txt('views', 600, 445, 36, DIM, 600);
        txt('▼ 92% vs your average', 330, 505, 28, RED, 700); }); };
    const drawSix = t => { if (t < C.SIX || t >= C.WAIT) return;
      const a = pop(t, C.SIX + 0.05, 0.45); scaleAt(540, 470, a, () => {
        h.save(); h.shadowColor = 'rgba(255,197,61,0.7)'; h.shadowBlur = 40; h.drawImage(thumbs[0], 100, 250, 300, 533); h.restore(); h.strokeStyle = ACC; h.lineWidth = 5; h.strokeRect(100, 250, 300, 533);
        chip('CLAUDE MADE THIS', 715, 320, 34, ACC, '#1a1206', 1, 1, 900, FR);
        txt('▶', 450, 450, 58, TXT, 800); const v = lerp(0, 2214806, eo(pr(t, B('two') + 0.1, E('two') + 0.2)));
        txt(fmt(v), 510, 452, 78, ACC, 900, 'left', 1, FR); txt('views', 515, 520, 36, DIM, 600);
        const c2 = fin(t, B('two') + 0.4, 0.3); if (c2 > 0) { card(450, 590, 470, 110, 26, 'rgba(255,77,90,0.16)', 'rgba(255,77,90,0.6)'); txt('your reel:', 480, 645, 32, DIM, 600, 'left', c2); txt('69', 660, 645, 44, RED, 900, 'left', c2, FR); txt('😬', 860, 645, 44, '#000', 400, 'center', c2); } }); };
    const drawWait = t => { if (t < C.WAIT || t >= C.GRID) return;
      const k = pr(t, C.WAIT, C.WAIT + 0.35); h.save(); h.globalAlpha = 0.85 * (1 - pr(t, C.GRID - 0.3, C.GRID)); h.translate(540, 1080); h.rotate(t * 0.3);
      for (let i = 0; i < 24; i++) { h.rotate(Math.PI / 12); h.fillStyle = i % 2 ? `rgba(255,197,61,${0.35 * k})` : `rgba(90,124,255,${0.3 * k})`; h.beginPath(); h.moveTo(470, -14); h.lineTo(1400, -90); h.lineTo(1400, 90); h.lineTo(470, 14); h.fill(); } h.restore();
      const s = pop(t, B(IX('wait') + 1) - 0.05, 0.35); if (s > 0) scaleAt(540, 330, s, () => { otxt('YOU', 540, 330, 190, ACC, 1, 'center', 16); otxt('made that?!', 540, 470, 86, TXT, 1, 'center', 12); }); };
    const drawGrid = t => { if (t < C.GRID || t >= C.OKAY) return;
      const out = 1 - pr(t, C.OKAY - 0.25, C.OKAY); h.save(); h.globalAlpha = out;
      h.fillStyle = 'rgba(5,9,32,0.55)'; h.fillRect(0, 160, HW, 1150);
      const cols = 8, w = 116, hh = 206, gx = 12, x0 = (HW - (cols * w + (cols - 1) * gx)) / 2, y0 = 360;
      for (let i = 0; i < 48; i++) { const c = i % cols, r = Math.floor(i / cols); const t0 = B('that') + (i === 0 ? -0.05 : 0.35 + (r * 0.09 + c * 0.03) * 1.5 * (E(IX('that') + 1) - B('that')) / 1.2);
        const s = pop(t, t0, 0.3); if (s <= 0) continue; scaleAt(x0 + c * (w + gx) + w / 2, y0 + r * (hh + 10) + hh / 2, s, () => { h.drawImage(thumbs[i], x0 + c * (w + gx), y0 + r * (hh + 10), w, hh); if (i === 0) { h.strokeStyle = ACC; h.lineWidth = 5; h.strokeRect(x0, y0, w, hh); } }); }
      const v = lerp(0, 27904113, eo(pr(t, B(IX('that') + 1), E(IX('that') + 2) + 0.1))), n = Math.round(lerp(1, 48, eo(pr(t, B(IX('that') + 1) - 0.1, E(IX('that') + 1) + 0.2))));
      card(150, 195, 780, 130, 34, 'rgba(8,12,40,0.94)', 'rgba(255,197,61,0.7)');
      txt(`${n} REELS`, 200, 260, 50, TXT, 700, 'left', 1, FR); txt('·', 445, 260, 50, DIM, 700, 'left', 1, FR); txt(`${fmt(v)}`, 880, 252, 56, ACC, 700, 'right', 1, FR); txt('views', 880, 300, 26, DIM, 600, 'right');
      h.restore(); };
    const drawOkay = t => { if (t < C.OKAY || t >= C.ST1) return;
      const s = pop(t, B(IX('okay') + 1) + 0.1, 0.3); if (s <= 0) return; h.save(); h.translate(540, 360); h.rotate(-0.06); h.scale(lerp(1.6, 1, s), lerp(1.6, 1, s)); h.globalAlpha = cl(s * 2);
      h.strokeStyle = RED; h.lineWidth = 9; h.beginPath(); h.roundRect(-400, -85, 800, 170, 22); h.stroke(); txt('NOBODY SHOWS', 0, -28, 68, RED, 900, 'center', 1, FR); txt('YOU HOW', 0, 45, 68, RED, 900, 'center', 1, FR); h.restore(); };
    const drawPrompt = t => { if (t < C.ST1 || t >= C.CHK) return;
      const a = pop(t, B('s1') + 0.35, 0.4); scaleAt(540, 400, a, () => {
        glowCard(80, 300, 920, 220, 36, 'rgba(224,102,58,0.9)'); h.fillStyle = '#e0663a'; h.beginPath(); h.arc(140, 350, 22, 0, 7); h.fill(); txt('Claude', 178, 352, 34, TXT, 700);
        txt('1 line', 940, 352, 28, ACC, 800, 'right');
        const msg = t >= B('idea') ? typed(t, IDEA, B('idea'), E(IX('idea') + 1) - 0.1) : ''; const cur = Math.floor(t * 3) % 2 ? '|' : '';
        h.font = F(40, 600); const s2 = msg || 'Give me one line…'; const cut = s2.length > 34 ? s2.lastIndexOf(' ', 34) : -1;
        const l1 = cut > 0 ? s2.slice(0, cut) : s2, l2 = cut > 0 ? s2.slice(cut + 1) : ''; txt(l1 + (l2 ? '' : cur), 120, 425, 40, msg ? TXT : DIM, 600); if (l2) txt(l2 + cur, 120, 478, 40, TXT, 600); }); };
    const drawCheck = t => { if (t < C.CHK || t >= C.SRC) return;
      const rows = [['What if the Moon disappeared?', '4.1M', 0], ['What if the internet died for a day?', '2.7M', 0], ['What if India lost power for 1 hour?', '1.3M', 0], ['Every phone in India · off · 5 sec', '0 found', 1]];
      card(80, 290, 920, 470, 36); txt('🔎  searching reels…', 120, 345, 34, DIM, 700);
      rows.forEach(([s, v, ok], i) => { const t0 = C.CHK + 0.2 + i * (E('check') - C.CHK - 0.1) / 3.2; const a = fin(t, t0, 0.25); if (a <= 0) return; const y = 420 + i * 92;
        h.save(); h.globalAlpha = a; h.translate((1 - a) * 60, 0);
        if (ok) { const g2 = fin(t, B('checked'), 0.3); card(100, y - 38, 880, 76, 20, `rgba(61,220,151,${0.1 + g2 * 0.15})`, `rgba(61,220,151,${0.4 + g2 * 0.6})`); }
        txt(s, 125, y, 32, ok ? TXT : DIM, 600); txt(v, 820, y, 30, ok ? GRN : DIM, 700, 'right');
        if (!ok) { const st = fin(t, t0 + 0.25, 0.2); h.strokeStyle = RED; h.lineWidth = 4; h.beginPath(); h.moveTo(120, y); h.lineTo(120 + 600 * st, y); h.stroke(); chip('TAKEN', 905, y, 24, 'rgba(255,77,90,0.2)', RED, st, 1, 900); }
        else chip('NEW ✓', 905, y, 26, GRN, '#06281a', fin(t, B('checked'), 0.25), pop(t, B('checked'), 0.35), 900);
        h.restore(); }); };
    const drawSrc = t => { if (t < C.SRC || t >= C.GEN) return;
      const facts = [['1.1+ billion', 'mobile connections in India', 'TRAI'], ['600M+', 'UPI payments every day', 'NPCI'], ['5 seconds', 'Mumbai, Delhi, Bengaluru… all at once', 'scene plan']];
      facts.forEach(([big, small, src], i) => { const t0 = B(IX('s2') + 1) + i * 0.32; const a = fin(t, t0, 0.3); if (a <= 0) return; const y = 300 + i * 165;
        h.save(); h.globalAlpha = a; h.translate((1 - a) * -80, 0); card(90, y, 900, 140, 28);
        txt(big, 125, y + 50, 50, ACC, 700, 'left', 1, FR); txt(small, 125, y + 103, 30, DIM, 600);
        if (i < 2) { const st = pop(t, t0 + 0.35, 0.3); if (st > 0) { h.save(); h.translate(870, y + 70); h.rotate(-0.12); h.scale(lerp(1.8, 1, st), lerp(1.8, 1, st)); h.globalAlpha *= cl(st * 2);
          h.strokeStyle = GRN; h.lineWidth = 5; h.beginPath(); h.roundRect(-95, -40, 190, 80, 14); h.stroke(); txt('SOURCE ✓', 0, -8, 28, GRN, 900, 'center'); txt(src, 0, 22, 22, GRN, 700, 'center'); h.restore(); } }
        h.restore(); }); };
    const drawGen = t => { if (t < C.GEN || t >= C.CODE) return;
      const a = pop(t, C.GEN + 0.25, 0.4); if (a <= 0) return; scaleAt(540, 430, a, () => {
        card(190, 330, 700, 200, 36, 'rgba(8,12,40,0.9)', 'rgba(200,140,255,0.6)'); txt('✨', 260, 430, 70, '#000', 400, 'center'); txt('AI video generator', 320, 405, 44, TXT, 700, 'left', 1, FR); txt('type a prompt → get a clip', 320, 465, 28, DIM, 600); });
      const x = pop(t, B('nope') + 0.05, 0.3); if (x > 0) { h.save(); h.translate(540, 430); h.scale(lerp(2.2, 1, x), lerp(2.2, 1, x)); h.globalAlpha = cl(x * 2); h.strokeStyle = RED; h.lineWidth = 26; h.lineCap = 'round';
        h.beginPath(); h.moveTo(-170, -130); h.lineTo(170, 130); h.moveTo(170, -130); h.lineTo(-170, 130); h.stroke(); h.restore(); chip('NOT AI VIDEO', 540, 640, 44, RED, '#fff', fin(t, B(IX('nope') + 1), 0.25), pop(t, B(IX('nope') + 1), 0.3), 900, FR); } };
    const CODE = [['const ', 'city', ' = ', 'marineDrive', '({'], ['  blocks: ', '186', ','], ['  cars: ', '418', ','], ['  streetLights: ', '72', ','], ['  time: ', "'night'", ','], ['});'], ['city.', 'build', '();']];
    const CCOL = ['#c792ea', '#82aaff', '#89ddff', '#ffcb6b', '#89ddff'];
    const drawCode = t => { if (t < C.CODE || t >= C.CANT) return;
      const out = 1 - pr(t, B('marine') + 0.1, B('marine') + 0.45);
      if (out > 0) { h.save(); h.globalAlpha = out * fin(t, C.CODE, 0.25); card(80, 280, 920, 560, 30, 'rgba(10,12,28,0.94)', 'rgba(130,170,255,0.5)');
        ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { h.fillStyle = c; h.beginPath(); h.arc(125 + i * 34, 325, 11, 0, 7); h.fill(); }); txt('scene.js', 540, 326, 28, DIM, 700, 'center', 1, '"JetBrains Mono", "DejaVu Sans Mono"');
        const total = CODE.reduce((s, l) => s + l.join('').length, 0), k = pr(t, C.CODE + 0.15, B('marine') - 0.05); let left = Math.floor(total * k);
        CODE.forEach((ln, li) => { let x = 120; const y = 395 + li * 62; txt(String(li + 1), 100, y, 26, 'rgba(255,255,255,0.25)', 500, 'right', 1, '"DejaVu Sans Mono"');
          ln.forEach((seg, si) => { if (left <= 0) return; const s = seg.slice(0, left); left -= seg.length; const col = /^\d+$/.test(seg.trim().replace(',', '')) ? '#f78c6c' : seg.startsWith("'") ? '#c3e88d' : si % 2 ? CCOL[si % CCOL.length] : '#e6e6f0';
            h.font = F(34, 500, '"DejaVu Sans Mono"'); h.fillStyle = col; h.textAlign = 'left'; h.textBaseline = 'middle'; h.fillText(s, x, y); x += h.measureText(s).width; }); });
        h.restore(); }
      chip('📍  MARINE DRIVE, MUMBAI', 540, 330, 36, 'rgba(8,12,40,0.9)', TXT, fin(t, B('marine') + 0.2, 0.3), pop(t, B('marine') + 0.2, 0.35), 800, FR);
      const ck = pr(t, B('cars') - 0.1, E('cars') + 0.1); if (ck > 0) { const s = pop(t, B('cars') - 0.1, 0.35); scaleAt(540, 470, s, () => { otxt(fmt(Math.floor(eo(ck) * NCAR)), 540, 470, 150, ACC, 1, 'center', 14); otxt('CARS 🚕', 540, 580, 64, TXT, 1, 'center', 10); }); }
      const bk = pr(t, C.CODE + 0.3, B('marine')); if (bk > 0 && bk < 1) chip(`building… ${Math.floor(bk * 186)} blocks`, 540, 900, 30, 'rgba(8,12,40,0.85)', ACC, fin(t, C.CODE + 0.3, 0.2) * (1 - pr(t, B('marine') - 0.2, B('marine'))), 1, 700); };
    const drawTouch = t => { if (t < C.TOUCH || t >= C.FIX) return;
      const a = pop(t, B('touch') + 0.2, 0.4); scaleAt(540, 400, a, () => { card(200, 320, 680, 170, 36); txt('✋', 290, 405, 80, '#000', 400, 'center'); txt('lines you write', 370, 375, 32, DIM, 600); txt('0', 370, 440, 80, GRN, 700, 'left', 1, FR); txt('Claude writes them all', 470, 445, 30, TXT, 600); }); };
    const ISS = [['phones not visible in hands', 0], ['sky too dark behind the city', 1], ['taxi clipping through a bus', 2]];
    const drawFix = t => { if (t < C.FIX || t >= C.REN) return;
      card(80, 285, 920, 560, 34); txt('self-check · every frame', 120, 340, 32, DIM, 700);
      ISS.forEach(([s], i) => { const t0 = B(IX('s4') + 1) - 0.1 + i * 0.35, a = fin(t, t0, 0.25); if (a <= 0) return; const y = 400 + i * 145;
        h.save(); h.globalAlpha = a; h.drawImage(thumbs[0], 0, 180 + i * 90, 360, 220, 115, y, 190, 116); const fx = fin(t, B(IX('s4') + 2) - 0.05 + i * 0.22, 0.25);
        h.strokeStyle = fx > 0.5 ? GRN : RED; h.lineWidth = 4; h.strokeRect(115, y, 190, 116);
        txt(s, 335, y + 35, 30, TXT, 600); txt(fx > 0.5 ? '✓ FIXED' : '✗ weak', 335, y + 85, 32, fx > 0.5 ? GRN : RED, 800, 'left', 1, FR); h.restore(); }); };
    const drawRender = t => { if (t < C.REN || t >= C.COST) return;
      const kf = cl((t - B('s5') - 0.2) / (E('frames') - B('s5') - 0.2)), tm = cl((t - B('frames')) / (E(IX('frames') + 1) - B('frames') + 0.1));
      card(110, 290, 860, 300, 34); txt('frames rendered', 150, 345, 32, DIM, 700);
      otxt(fmt(kf * 2700), 150, 430, 110, ACC, 1, 'left', 12); txt('/ 2,700', 680, 445, 44, DIM, 700, 'left', 1, FR);
      h.fillStyle = 'rgba(255,255,255,0.12)'; h.beginPath(); h.roundRect(150, 505, 780, 24, 12); h.fill(); h.fillStyle = ACC; h.beginPath(); h.roundRect(150, 505, Math.max(24, 780 * kf), 24, 12); h.fill();
      const m = tm * 16; chip(`⏱  ${String(Math.floor(m)).padStart(2, '0')}:${String(Math.floor((m * 60) % 60)).padStart(2, '0')}`, 540, 660, 44, 'rgba(8,12,40,0.9)', TXT, fin(t, B('frames') - 0.1, 0.25), 1, 800, FR); };
    const drawCost = t => { if (t < C.FREE || t >= C.FIVE) return;
      const a = pop(t, B('free') + 0.05, 0.45); scaleAt(540, 420, a, () => { glowCard(170, 280, 740, 300, 40, 'rgba(61,220,151,0.8)');
        otxt('₹0', 400, 400, 150, GRN, 1, 'center', 14); txt('EXTRA', 600, 380, 60, TXT, 700, 'left', 1, FR); txt('per reel', 605, 435, 32, DIM, 600);
        txt('runs on your Claude plan 🤖', 540, 525, 34, TXT, 600, 'center', fin(t, B(IX('free') + 1), 0.3)); }); };
    const PR = [['1', 'Ideas', '💡'], ['2', 'Script', '✍️'], ['3', '3D reel', '🎬'], ['4', 'Caption', '#️⃣'], ['5', '30-day plan', '📅']];
    const drawFive = t => { if (t < C.FIVE || t >= C.RES) return;
      PR.forEach(([n, s, e], i) => { const t0 = B('five') + i * 0.11, k = pop(t, t0, 0.4); if (k <= 0) return; const ang = (i - 2) * 0.17, x = 540 + (i - 2) * 175 * k, y = 420 + Math.abs(i - 2) * 26 * k;
        h.save(); h.translate(x, y); h.rotate(ang * k); h.scale(k, k); card(-95, -150, 190, 300, 26, 'rgba(14,18,52,0.96)', i === 2 ? ACC : 'rgba(130,160,255,0.6)');
        txt(e, 0, -60, 70, '#000', 400, 'center'); txt(n, 0, 30, 60, ACC, 700, 'center', 1, FR); txt(s, 0, 95, 30, TXT, 700, 'center'); h.restore(); });
    };
    const drawResult = t => { if (t < C.RES || t >= C.CTA) return;
      const a = fin(t, C.RES, 0.2); h.save(); h.globalAlpha = a; const g = h.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, 'rgba(0,0,0,0.6)'); g.addColorStop(1, 'rgba(0,0,0,0)'); h.fillStyle = g; h.fillRect(0, 0, HW, 520);
      ['What if every phone in India', 'switched off for 5 seconds?'].forEach((s, i) => otxt(s, 540, 230 + i * 78, 62, TXT, 1, 'center', 12));
      const cd = Math.max(0, 5 - Math.floor(Math.max(0, t - OFF) * 2.2)); if (t >= OFF) chip(`📵  ${cd}`, 540, 420, 40, 'rgba(255,77,90,0.9)', '#fff', 1, pop(t, OFF, 0.3), 900, FR);
      h.restore(); };
    const drawCTA = t => { if (t < C.CTA) return;
      const k = pop(t, B('cta') + 0.05, 0.45), ca = fin(t, B('cta'), 0.3); if (ca <= 0) return; h.save(); h.globalAlpha = ca; glowCard(150, 270, 780, 290, 40, 'rgba(255,197,61,0.8)');
      txt('Comment', 540, 335, 42, DIM, 700, 'center', 1, FR); scaleAt(540, 425, 0.6 + 0.4 * k, () => otxt('PROMPT', 540, 425, 120, ACC, 1, 'center', 14));
      txt("I'll send all 5 to your DM 📩", 540, 515, 36, TXT, 600, 'center', fin(t, B(IX('cta') + 1), 0.3)); h.restore(); };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,10,0.45)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.CODE, C.CANT, C.RES, C.CTA];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.18) a = Math.max(a, 1 - d / 0.18); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawHook(t); drawSix(t); drawWait(t); drawGrid(t); drawOkay(t); drawPrompt(t); drawCheck(t); drawSrc(t); drawGen(t); drawCode(t); drawTouch(t); drawFix(t); drawRender(t); drawCost(t); drawFive(t); drawResult(t); drawCTA(t);
      STEPS.forEach(([a, b, s1, s2]) => { if (inS(t, a, b)) label(t, s1, s2, C[a]); });
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.7})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.3); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, '#5a7cff'); g.addColorStop(1, ACC); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const envAt = t => { const c = inCity(t); S.fog.near = c ? 14 : 6; S.fog.far = c ? 60 : 24;
      cityLight.intensity = c ? 0.9 : 0; moonL.intensity = c ? 0.7 : 0; hemi.intensity = c ? 0.25 : 0.75; key.intensity = c ? 0 : 1.5; front.intensity = c ? 0 : 0.8; lampL.intensity = c ? 0 : 2.0; scrL.intensity = c ? 0 : 0.18;
      promL.intensity = t >= C.RES && t < C.CTA ? 1.4 : 0; promL.position.copy(P2(0.15, RR + 0.5, 0.6)); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); envAt(t); cityAt(t); acting(t); drawLaptop(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['pop', 0.3, 0.35]); for (let i = 0; i < 6; i++) sfx.push(['tick', 0.65 + i * 0.12, 0.2]);
    sfx.push(['whoosh', C.SIX, 0.3], ['pop', C.SIX + 0.08, 0.4]); for (let t2 = B('two') + 0.1; t2 < E('two') + 0.2; t2 += 0.06) sfx.push(['coin', t2, 0.07]); sfx.push(['ding', E('two') + 0.2, 0.25]);
    sfx.push(['bass', C.WAIT, 0.5], ['boing', B(IX('wait') + 1) - 0.05, 0.3]);
    sfx.push(['whoosh', C.GRID, 0.3]); for (let i = 0; i < 16; i++) sfx.push(['pop', B('that') + 0.35 + i * 0.09, 0.12]); sfx.push(['kaching', E(IX('that') + 2), 0.35]);
    sfx.push(['thud', B(IX('okay') + 1) + 0.1, 0.6]);
    sfx.push(['whoosh', C.ST1, 0.3], ['pop', B('s1') + 0.35, 0.35]); for (let t2 = B('idea'); t2 < E(IX('idea') + 1) - 0.1; t2 += 0.075) sfx.push(['tick', t2, 0.16]);
    sfx.push(['whoosh', C.CHK, 0.25]); for (let i = 0; i < 3; i++) sfx.push(['buzz', C.CHK + 0.45 + i * (E('check') - C.CHK - 0.1) / 3.2, 0.1]); sfx.push(['chime', B('checked'), 0.35]);
    sfx.push(['whoosh', C.SRC, 0.25], ['thud', B(IX('s2') + 1) + 0.35, 0.35], ['thud', B(IX('s2') + 1) + 0.67, 0.35]);
    sfx.push(['pop', C.GEN + 0.25, 0.3], ['thud', B('nope') + 0.05, 0.7], ['zap', B('nope') + 0.08, 0.2]);
    sfx.push(['whoosh', C.CODE, 0.4]); for (let t2 = C.CODE + 0.15; t2 < B('marine') - 0.05; t2 += 0.07) sfx.push(['tick', t2, 0.13]);
    sfx.push(['riser', B('marine') - 2.4, 0.3], ['bass', B('marine') + 0.15, 0.5], ['chime', B('marine') + 0.2, 0.25]);
    for (let i = 0; i < 14; i++) sfx.push(['pop', B('cars') + i * 0.07, 0.1]); sfx.push(['ding', E('cars') + 0.1, 0.25]);
    sfx.push(['whoosh', C.CANT, 0.3], ['pop', B('touch') + 0.2, 0.3]);
    sfx.push(['whoosh', C.FIX, 0.25]); ISS.forEach((_, i) => { sfx.push(['buzz', B(IX('s4') + 1) - 0.1 + i * 0.35, 0.08], ['ding', B(IX('s4') + 2) - 0.05 + i * 0.22, 0.18]); });
    sfx.push(['whoosh', C.REN, 0.25]); for (let t2 = B('s5') + 0.2; t2 < E('frames'); t2 += 0.05) sfx.push(['tick', t2, 0.1]); sfx.push(['ding', E('frames'), 0.25]);
    sfx.push(['kaching', B('free') + 0.05, 0.35]);
    for (let i = 0; i < 5; i++) sfx.push(['pop', B('five') + i * 0.11, 0.25]);
    sfx.push(['riser', C.RES - 1.8, 0.3], ['whoosh', C.RES, 0.4], ['bass', OFF, 0.8], ['zap', OFF, 0.3]);
    sfx.push(['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.05, 0.4], ['pop', B(IX('cta') + 1) + 0.05, 0.3]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false,
      music: { muteFrom: OFF - 0.05, muteTo: OFF + 1.6 }, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
