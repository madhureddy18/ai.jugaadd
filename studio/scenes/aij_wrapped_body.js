/* @maddiee.makess reel 19 — "Where did my salary go?" — FIXED TEMPLATE (reel 6 "Claude made this" look): navy neon-grid world, Maddie at
   his desk + the headphones hover-bot, hook card (salary ₹25,000 → ₹312 on day 12), reveal counter (₹2,41,860 spent), then Maddie's
   year as Wrapped story cards on a PHONE screen (food, chai, fashion, late night, money leaks, the fix, personality), then the
   product pitch: logo, 3 steps (upload statement → 7 cards → share), never leaves your phone, free, Dec 1, "Comment WRAPPED" CTA. Maddie has a slightly fuller beard (Maddyy, 15 Nov). NO burst rays anywhere (Maddyy, 15 Nov).
   Full 9:16, no bars, no blush dots, no handle. Numbers are a comedy example, not real data. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x050920, fog: [6, 24], fov: 36, bloom: { strength: 0.42, radius: 0.55, threshold: 0.97 } },
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
    const rng = K.rng(11);

    // ================= TIMELINE =================
    const C = { HOOK: 0, STMT: B('stmt') - 0.12, TOTAL: B('total') - 0.15, SWG: B('swg') - 0.12, CHAI: B('chai') - 0.12, FASH: B('fash') - 0.12, NIGHT: B('night') - 0.12,
      LEAK: B('leak') - 0.12, SAVE: B('save') - 0.12, PERS: B('pers') - 0.12, EVERY: B('every') - 0.12, PITCH: B('plan') - 0.1, STEPS: B('up') - 0.1, DEC: B('dec') - 0.1, CTA: B('cta') - 0.1 };
    const inS = (t, a, b) => t >= C[a] && t < C[b];

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
    const R = (() => {   // the hover-bot with headphones (same design as reel 7), floating above the desk; no hands
      const g = new THREE.Group(); g.position.set(0.36, DY, -0.4); g.rotation.y = -0.55; S.add(g);
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

    // ================= LIGHT =================
    const hemi = new THREE.HemisphereLight(0x8fa2ff, 0x1a1030, 0.75); S.add(hemi);
    const key = new THREE.DirectionalLight(0xffe2c0, 1.5); key.position.set(1.2, 2.8, 2.2); key.target.position.set(0, 0.9, -0.6); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.8); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const lampL = new THREE.PointLight(0xffc27a, 2.0, 2.5, 1.6); lampL.position.set(0.62, DY + 0.3, -0.66); S.add(lampL);
    const rimB = new THREE.DirectionalLight(0x5a78ff, 1.6); rimB.position.set(-2, 2.2, -2.6); S.add(rimB);
    const rimP = new THREE.DirectionalLight(0xc25aff, 0.9); rimP.position.set(2.2, 1.6, -2.4); S.add(rimP);


    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const lapLook = [0.0, 0.3], toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      let mL = toR, face = 'neutral', lean = 0.15, type = 0, up = 0;
      if (t < C.STMT) { mL = t < B('h3') ? lapLook : toCam; face = 'worried'; lean = 0.4; }
      else if (t < C.TOTAL) { mL = toR; face = t >= B('all') - 0.1 && t < B('all2') ? 'shock' : 'worried'; lean = 0.25; type = t >= B('all2') + 0.3 ? 0.7 : 0; }
      else if (t < C.SWG) { mL = t < B('unwrap') ? toCam : toR; face = 'shock'; lean = -0.1; up = eo(pr(t, B('total') + 0.6, B('total') + 0.95)) * (1 - pr(t, C.SWG - 0.3, C.SWG)); }
      else if (t < C.CHAI) { mL = t < B('swg2') - 0.1 ? toCam : toR; face = t < B('swg2') - 0.1 ? 'shock' : t < B('swg3') - 0.1 ? 'smile' : 'worried'; lean = 0.2; }
      else if (t < C.FASH) { mL = t < B('chai2') - 0.1 ? toCam : toR; face = t < B('chai2') - 0.1 ? 'worried' : 'smile'; lean = 0.05; }
      else if (t < C.NIGHT) { mL = toR; face = t < B('fash2') - 0.1 ? 'shock' : t < B('fash3') - 0.1 ? 'smile' : t < B('fash5') - 0.1 ? 'worried' : 'shock'; lean = 0.15; }
      else if (t < C.LEAK) { mL = t < B('night') + 1.0 ? lapLook : toCam; face = 'worried'; lean = 0.3; }
      else if (t < C.SAVE) { mL = t < B('gym') - 0.1 ? toR : toCam; face = t < B('gym') - 0.1 ? 'worried' : 'shock'; lean = -0.05; up = eo(pr(t, B('gym'), B('gym') + 0.3)) * (1 - pr(t, B('gym2'), B('gym2') + 0.3)); }
      else if (t < C.PERS) { mL = t < B('phone') - 0.1 ? toR : toCam; face = t < B('phone') - 0.1 ? 'neutral' : 'smile'; lean = 0.1; up = eo(pr(t, B('phone'), B('phone') + 0.3)) * (1 - pr(t, C.PERS - 0.3, C.PERS)); }
      else if (t < C.EVERY) { mL = toR; face = 'worried'; lean = 0.3; }
      else if (t < C.PITCH) { mL = toR; face = 'neutral'; lean = 0.1; }
      else if (t < B('when') - 0.1) { mL = toR; face = 'smile'; lean = 0.05; type = t >= B('up') && t < B('safe') ? 0.5 : 0; }
      else if (t < C.DEC) { mL = toR; face = 'shock'; lean = -0.1; up = eo(pr(t, B('when'), B('when') + 0.3)) * (1 - pr(t, C.DEC, C.DEC + 0.3)); }
      else if (t < C.CTA) { mL = toR; face = 'smile'; lean = 0.05; }
      else if (t < B('hide') - 0.1) { mL = toCam; face = 'smile'; lean = 0.0; }
      else if (t < B('no') + 0.1) { mL = toR; face = 'worried'; lean = 0.35; }
      else { mL = toCam; face = 'shock'; lean = -0.05; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type, lean });
      const [aL, aR] = M.arms; if (up > 0) { aL.sh.rotation.set(-0.3 - up * 0.9, 0.2, -0.05 - up * 0.3); aL.el.rotation.x = -0.1 - up * 1.1; aR.sh.rotation.set(-0.3 - up * 0.9, -0.2, 0.05 + up * 0.3); aR.el.rotation.x = -0.1 - up * 1.1; }
      let rL = [-0.15, 0.05];
      if ((t >= C.TOTAL && t < C.SWG) || (t >= C.SAVE && t < C.EVERY) || (t >= C.PITCH && t < C.CTA)) rL = [0.42, 0.02];   // explaining to us
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      const flat = [['swg3', 0.9], ['fash5', 1.2], ['gym2', 1.0], ['no', 3]].some(([id, d]) => t >= B(id) - 0.05 && t < B(id) + d);
      const mood = flat ? 'flat' : (t >= B('pers2') - 0.05 && t < C.EVERY) || (t >= C.PITCH && t < B('hide')) || (t >= B('unwrap') && t < C.SWG + 0.5) ? 'smile' : 'calm';
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.y += 0.25 * Math.sin((t - B('no')) * 18) * K.pulse(t, B('no') - 0.05, 0.6);   // head shake on the final "No."
      R.head.rotation.z += 0.12 * K.pulse(t, B('fash5') - 0.1, 0.9) + 0.1 * K.pulse(t, B('gym2') - 0.1, 0.8);
      steam.forEach((s, i) => { const ph = ((t * 0.45 + i / steam.length) % 1); s.position.set(-0.66 + Math.sin(i * 2 + t * 1.3) * 0.015, DY + 0.12 + ph * 0.22, -0.36); s.scale.setScalar(0.03 + ph * 0.07); s.material.opacity = 0.32 * Math.sin(ph * Math.PI); });
      dpScr.material.color.setHex(t >= C.SWG && t < C.EVERY && Math.floor(t * 2) % 2 ? 0xff7a1a : 0x0b0b10);
      holo.forEach(o => { o.m.position.y = o.y + Math.sin(t * 0.7 + o.ph) * 0.06; });
    };

    // ================= LAPTOP SCREEN (Wrapped reading the statement) =================
    const lr = (X, Y, W, H, r, f) => { lx.fillStyle = f; lx.beginPath(); lx.roundRect(X, Y, W, H, r); lx.fill(); };
    const ltxt = (s, X, Y, size, col, w = 500, al = 'left', fam = '"Inter", sans-serif') => { lx.font = `${w} ${size}px ${fam}`; lx.fillStyle = col; lx.textAlign = al; lx.textBaseline = 'middle'; lx.fillText(s, X, Y); };
    const drawLaptop = t => {
      lx.fillStyle = '#1c1b22'; lx.fillRect(0, 0, LSW, LSH);
      if (t < C.STMT) { ltxt('Bank · balance', 60, 70, 34, '#9a9aa8', 700); ltxt('₹312', 60, 190, 140, '#ff4d5a', 900); ltxt('12 Nov · salary was ₹25,000', 60, 320, 32, '#9a9aa8', 600);
        for (let i = 0; i < 6; i++) { lr(60, 380 + i * 34, 840, 24, 8, i % 2 ? '#26252e' : '#2c2b35'); } lTex.needsUpdate = true; return; }
      lx.fillStyle = '#26252e'; lx.fillRect(0, 0, LSW, 70); ltxt('🧾 Wrapped', 40, 36, 30, '#ffc53d', 800);
      const rows = ['Reading statement · 1,284 payments', 'Food + chai', 'Fashion', 'Late-night orders', 'Subscriptions', 'Savings plan'];
      const n = t < C.TOTAL ? 1 : t < C.CHAI ? 2 : t < C.NIGHT ? 3 : t < C.LEAK ? 4 : t < C.SAVE ? 5 : 6;
      rows.slice(0, n).forEach((r, i) => ltxt((i < n - 1 || t >= C.PERS ? '✓ ' : '● ') + r, 60, 130 + i * 70, 32, i < n - 1 || t >= C.PERS ? '#6fe3b5' : '#ffc53d', 600));
      lr(60, 540, 840, 18, 9, '#2c2b35'); lr(60, 540, 840 * cl((t - C.STMT) / (C.PERS - C.STMT)), 18, 9, '#ffc53d');
      lTex.needsUpdate = true; };

    // ================= CAMERA (same shot set as reel 6) =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.36, 1.1, -0.4];
    const sh = {
      hook: [P([-0.1, 1.46, 1.45], MHL, 32), P([-0.12, 1.45, 1.22], MHL, 32)],
      robo: [P([0.1, 1.22, 1.35], RHL, 30), P([0.12, 1.21, 1.18], RHL, 30)],
      wait: [P([-0.18, 1.43, 1.05], [-0.2, 1.4, -0.94], 30), P([-0.18, 1.42, 0.85], [-0.2, 1.4, -0.94], 30)],
      two: [P([0.12, 1.5, 1.75], [0.05, 1.22, -0.6], 38), P([0.05, 1.5, 1.6], [0.05, 1.22, -0.6], 38)],
      mad: [P([0.12, 1.44, 1.32], MHL, 32), P([0.1, 1.43, 1.15], MHL, 32)],
      ots: [P([-1.2, 1.55, 0.95], [-0.28, 1.24, -0.68], 34), P([-1.1, 1.53, 0.82], [-0.28, 1.24, -0.68], 34)],
      robL: [P([-0.36, 1.22, 1.3], RHL, 30), P([-0.32, 1.21, 1.15], RHL, 30)],
      pair: [P([0.35, 1.38, 1.3], [0.1, 1.2, -0.6], 36), P([0.3, 1.36, 1.16], [0.1, 1.2, -0.6], 36)],
      cta: [P([0.06, 1.5, 2.15], [0.06, 1.24, -0.6], 40), P([0.06, 1.48, 1.95], [0.06, 1.24, -0.6], 40)],
    };
    const plan = [
      [C.HOOK, C.STMT, sh.hook], [C.STMT, B('all') - 0.1, sh.robo], [B('all') - 0.1, B('all2') - 0.1, sh.wait], [B('all2') - 0.1, C.TOTAL, sh.robo],
      [C.TOTAL, B('unwrap') - 0.1, sh.two], [B('unwrap') - 0.1, C.SWG, sh.pair],
      [C.SWG, B('swg2') - 0.1, sh.robo], [B('swg2') - 0.1, B('swg3') - 0.1, sh.mad], [B('swg3') - 0.1, C.CHAI, sh.robL],
      [C.CHAI, B('chai2') - 0.1, sh.two], [B('chai2') - 0.1, C.FASH, sh.mad],
      [C.FASH, B('fash2') - 0.1, sh.robo], [B('fash2') - 0.1, B('fash3') - 0.1, sh.mad], [B('fash3') - 0.1, B('fash4') - 0.1, sh.robL], [B('fash4') - 0.1, B('fash5') - 0.1, sh.wait],
      [B('fash5') - 0.1, C.NIGHT, sh.robo],
      [C.NIGHT, C.LEAK, sh.ots],
      [C.LEAK, B('gym') - 0.1, sh.robo], [B('gym') - 0.1, B('gym2') - 0.1, sh.wait], [B('gym2') - 0.1, C.SAVE, sh.robL],
      [C.SAVE, B('phone') - 0.1, sh.pair], [B('phone') - 0.1, C.PERS, sh.mad],
      [C.PERS, C.EVERY, sh.robo], [C.EVERY, C.PITCH, sh.mad], [C.PITCH, C.STEPS, sh.robo], [C.STEPS, B('safe') - 0.1, sh.cta], [B('safe') - 0.1, B('when') - 0.1, sh.robL],
      [B('when') - 0.1, C.DEC, sh.wait], [C.DEC, C.CTA, sh.robo], [C.CTA, B('hide') - 0.1, sh.mad], [B('hide') - 0.1, B('no') - 0.05, sh.wait], [B('no') - 0.05, D + 5, sh.robo],
    ];
    const SHAKE = [B('all') - 0.1, B('gym') - 0.1, B('when') - 0.1];
    const smooth = k => k * k * (3 - 2 * k);
    const lift = (p, dy) => ({ pos: [p.pos[0], p.pos[1] + dy, p.pos[2]], look: [p.look[0], p.look[1] + dy, p.look[2]], fov: p.fov });   // pan up so faces sit under the phone
    const DYS = new Map([[sh.mad, 0.085], [sh.wait, 0.075], [sh.robo, 0.035], [sh.robL, 0.035], [sh.two, 0.05], [sh.pair, 0.05], [sh.ots, 0.05]]);
    plan.forEach(p => { if (((p[0] >= C.SWG - 0.2 && p[0] < C.EVERY) || p[0] >= C.PITCH - 0.05) && DYS.has(p[2])) { const d = DYS.get(p[2]); p[2] = [lift(p[2][0], d), lift(p[2][1], d)]; p[2].base = true; } });
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth,
      shake: SHAKE.includes(a) ? (t => 0.006 * Math.exp(-(t - a) * 6)) : null }));
    const curFov = t => { const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; const k = smooth(cl((t - p[0]) / (p[1] - p[0]))); return lerp(p[2][0].fov, p[2][1].fov, k); };

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
    const label = (t, s1, s2, t0) => { const a = fin(t, t0, 0.25); if (a <= 0) return; h.save(); h.globalAlpha = a; h.font = F(40, 800, FR); const w1 = h.measureText(s1).width; h.font = F(40, 700, FR); const w2 = s2 ? h.measureText(s2).width : 0;
      const W = w1 + w2 + (s2 ? 70 : 50), x0 = 540 - W / 2, y = 205 + (1 - a) * -20; h.shadowColor = 'rgba(90,124,255,0.8)'; h.shadowBlur = 24; card(x0, y - 38, W, 76, 38, 'rgba(8,12,40,0.92)', 'rgba(120,150,255,0.8)'); h.shadowBlur = 0;
      txt(s1, x0 + 25, y + 2, 40, ACC, 800, 'left', 1, FR); if (s2) { txt('·', x0 + 25 + w1 + 10, y + 2, 40, DIM, 800, 'left', 1, FR); txt(s2, x0 + 45 + w1 + 4, y + 2, 40, TXT, 700, 'left', 1, FR); } h.restore(); };

    const inr = n => Math.round(n).toLocaleString('en-IN');
    const LABELS = [['SWG', 'CHAI', 'WRAPPED #1', 'FOOD'], ['CHAI', 'FASH', 'WRAPPED #2', 'CHAI'], ['FASH', 'NIGHT', 'WRAPPED #3', 'FASHION'], ['NIGHT', 'LEAK', 'WRAPPED #4', 'LATE NIGHT'],
      ['LEAK', 'SAVE', 'WRAPPED #5', 'MONEY LEAKS'], ['SAVE', 'PERS', 'WRAPPED #6', 'THE FIX'], ['PERS', 'EVERY', 'WRAPPED #7', 'PERSONALITY']];

    // ---------- hook: salary → ₹312 ----------
    const drawHook = t => { if (t >= C.STMT) return;
      chip('💸  DAY 12 OF THE MONTH', 540, 215, 34, 'rgba(8,12,40,0.88)', TXT, fin(t, 0.05, 0.3), 1, 700);
      const a = pop(t, 0.25, 0.45); if (a <= 0) return; scaleAt(540, 440, a, () => {
        card(150, 300, 780, 290, 34);
        txt('salary credited', 200, 360, 30, DIM, 600); txt('₹25,000', 880, 360, 46, GRN, 700, 'right', 1, FR);
        h.fillStyle = 'rgba(255,255,255,0.12)'; h.fillRect(200, 405, 680, 3);
        const b = fin(t, B('h2'), 0.3); if (b > 0) { txt('left today', 200, 470, 30, DIM, 600, 'left', b);
          const v = lerp(25000, 312, eo(pr(t, B('h2') + 0.2, E('h2') - 0.1))); txt('₹' + inr(v), 880, 470, 76, v < 1000 ? RED : TXT, 700, 'right', b, FR); }
        const q = fin(t, B('h3'), 0.3); if (q > 0) txt('where did ₹24,688 go? 🤔', 540, 548, 32, ACC, 700, 'center', q, FR); }); };
    // ---------- the statement ----------
    const drawStmt = t => { if (t < C.STMT || t >= C.TOTAL) return;
      const a = pop(t, C.STMT + 0.05, 0.4); scaleAt(540, 470, a, () => { card(150, 280, 780, 400, 36, INK, 'rgba(255,197,61,0.7)');
        logo(540, 335, 40, TXT); h.fillStyle = 'rgba(255,255,255,0.1)'; h.fillRect(190, 372, 700, 2);
        h.save(); h.setLineDash([14, 10]); h.strokeStyle = 'rgba(170,190,255,0.6)'; h.lineWidth = 3; h.beginPath(); h.roundRect(200, 395, 680, 140, 24); h.stroke(); h.restore();
        const up = fin(t, B('stmt') + 0.6, 0.3);
        if (up < 1) txt('⬆ upload your statement', 540, 465, 36, DIM, 700, 'center', 1 - up, FR);
        if (up > 0) { txt('📄', 270, 465, 60, '#000', 400, 'center', up); txt('phonepe_statement.pdf', 320, 448, 32, TXT, 700, 'left', up, FR); txt('Jan – Nov 2026', 320, 492, 26, DIM, 600, 'left', up); }
        const p = eo(pr(t, B('all2'), E('all2') + 0.6)); h.fillStyle = 'rgba(255,255,255,0.12)'; h.beginPath(); h.roundRect(200, 565, 680, 20, 10); h.fill();
        if (p > 0) { h.fillStyle = ACC; h.beginPath(); h.roundRect(200, 565, 680 * p, 20, 10); h.fill(); }
        txt(p > 0 ? `reading ${inr(p * 1284)} payments… 🔒 on your phone` : '🔒 read on your phone, never uploaded', 540, 625, 28, p > 0 ? ACC : GRN, 700, 'center', 1, FR); });
      chip('ALL OF IT 😳', 540, 760, 40, RED, '#fff', fin(t, B('all2'), 0.25), pop(t, B('all2'), 0.3), 900, FR); };
    // ---------- the reveal ----------
    const drawTotal = t => { if (t < C.TOTAL || t >= C.SWG) return;
      const a = pop(t, C.TOTAL + 0.05, 0.45); scaleAt(540, 450, a, () => { glowCard(110, 300, 860, 320, 40, 'rgba(255,197,61,0.8)');
        txt('this year you spent', 540, 365, 34, DIM, 700, 'center');
        otxt('₹' + inr(lerp(0, 241860, eo(pr(t, B('total') + 0.5, E('total') + 0.2)))), 540, 480, 120, ACC, 1, 'center', 14);
        txt('that\'s 9.7 months of salary 💀', 540, 575, 30, TXT, 600, 'center', fin(t, E('total'), 0.3)); });
      chip('🎁  UNWRAPPING…', 540, 720, 40, ACC, '#1a1206', fin(t, B('unwrap'), 0.25), pop(t, B('unwrap'), 0.35), 900, FR); };

    // ---------- the phone: Wrapped story cards ----------
    const PSC = 0.82, PX = 290, PY = 250, PW = 500, PH = 700, BZ = 14, SX = PX + BZ, SY = PY + BZ, SW = PW - 2 * BZ, SHH = PH - 2 * BZ, CX = PX + PW / 2;
    const ORDER = ['SWG', 'CHAI', 'FASH', 'NIGHT', 'LEAK', 'SAVE', 'PERS'];
    const BG = { SWG: ['#f26b0f', '#c2185b'], CHAI: ['#9c5a2b', '#e9a15b'], FASH: ['#7b2ff7', '#f107a3'], NIGHT: ['#0b1a3a', '#3a4f9a'], LEAK: ['#ff416c', '#a8132e'], SAVE: ['#0f9b8e', '#2fd27a'], PERS: ['#1d2671', '#c33764'] };
    const sTxt = (s, x, y, size, col, w = 700, al = 'center', a = 1, fam = FR) => txt(s, x, y, size, col, w, al, a, fam);
    const bigNum = (s, x, y, size, a = 1) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, 700, FR); h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillStyle = '#fff'; h.shadowColor = 'rgba(0,0,0,0.35)'; h.shadowBlur = 18; h.fillText(s, x, y); h.restore(); };
    const stamp = (s, x, y, size, col, t0, t, rot = -0.12) => { const k = pop(t, t0, 0.3); if (k <= 0) return; h.save(); h.translate(x, y); h.rotate(rot); const sc = lerp(2.2, 1, k); h.scale(sc, sc); h.globalAlpha *= cl(k * 2);
      h.font = F(size, 700, FR); const w = h.measureText(s).width + size; h.strokeStyle = col; h.lineWidth = 7; h.beginPath(); h.roundRect(-w / 2, -size * 0.85, w, size * 1.7, 14); h.stroke();
      h.fillStyle = col; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 4); h.restore(); };
    const row = (e, s, v, y, a, hi = false) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.translate((1 - a) * 50, 0);
      h.fillStyle = hi ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.14)'; h.beginPath(); h.roundRect(SX + 30, y - 40, SW - 60, 80, 20); h.fill();
      txt(e, SX + 75, y, 40, '#000', 400, 'center'); txt(s, SX + 112, y, 31, '#fff', 700, 'left', 1, FR); txt(v, SX + SW - 50, y, 31, '#fff', 700, 'right', 1, FR); h.restore(); };
    const logo = (x, y, size, col, a = 1) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, 700, FR); const w1 = h.measureText('Wrapped').width; h.font = F(size * 0.6, 700, FR); const w2 = h.measureText(" '26").width;
      const W = size * 1.15 + w1 + w2, x0 = x - W / 2; txt('🧾', x0 + size * 0.5, y, size * 0.95, '#000', 400, 'center'); txt('Wrapped', x0 + size * 1.15, y + 2, size, col, 700, 'left', 1, FR); txt(" '26", x0 + size * 1.15 + w1, y + 2, size * 0.6, ACC, 700, 'left', 1, FR); h.restore(); };
    const content = (id, t) => {          // draws one story card inside the phone screen (screen space)
      const t0 = C[id];
      logo(CX, SY + 90, 30, '#fff');
      if (id === 'SWG') { sTxt('your top spend', CX, SY + 150, 34, '#fff');
        txt('🍔', CX, SY + 265, 110, '#000', 400, 'center'); bigNum(String(Math.round(lerp(0, 212, eo(pr(t, B('swg') + 0.15, E('swg')))))), CX, SY + 410, 150);
        sTxt('Swiggy orders', CX, SY + 510, 42, '#fff'); sTxt('₹38,160 on food delivery', CX, SY + 570, 28, 'rgba(255,255,255,0.85)', 600, 'center', fin(t, E('swg'), 0.3));
        if (t >= B('swg3')) stamp('EVERY 2ND DAY', CX, SY + 630, 34, '#fff', B('swg3') + 0.4, t); }
      if (id === 'CHAI') { sTxt('chai counter', CX, SY + 150, 34, '#fff');
        const n = Math.round(lerp(0, 640, eo(pr(t, B('chai') + 0.1, E('chai') + 0.2)))); txt('☕', CX, SY + 265, 110, '#000', 400, 'center'); bigNum(String(n), CX, SY + 410, 150);
        sTxt('chais at ₹10', CX, SY + 510, 42, '#fff'); sTxt('= ₹' + inr(n * 10), CX, SY + 570, 30, '#fff', 700, 'center', fin(t, E('chai'), 0.3));
        if (t >= B('chai2')) stamp('"A NEED" 🙏', CX, SY + 632, 32, '#fff', B('chai2') + 0.3, t, 0.08); }
      if (id === 'FASH') { sTxt('fashion', CX, SY + 150, 34, '#fff');
        txt('👕', CX, SY + 265, 110, '#000', 400, 'center'); bigNum(String(Math.round(lerp(0, 23, eo(pr(t, B('fash') + 0.1, E('fash')))))), CX, SY + 405, 140);
        sTxt('Myntra orders', CX, SY + 495, 40, '#fff');
        const r = fin(t, B('fash3') + 0.1, 0.3); if (r > 0) { h.save(); h.globalAlpha = r; h.fillStyle = 'rgba(0,0,0,0.25)'; h.beginPath(); h.roundRect(SX + 50, SY + 535, SW - 100, 70, 35); h.fill(); h.restore(); sTxt('↩ 14 returned', CX, SY + 571, 36, '#fff', 700, 'center', r); }
        if (t >= B('fash5')) { const k = pop(t, B('fash5') + 0.4, 0.4); h.save(); h.globalAlpha = cl(k * 2); h.translate(CX, SY + 330); h.scale(k, k);
          h.fillStyle = '#d9deea'; h.beginPath(); h.roundRect(-190, -95, 380, 190, 30); h.fill(); h.fillStyle = '#2f3e5c'; h.beginPath(); h.moveTo(-70, -55); h.lineTo(-30, -70); h.quadraticCurveTo(0, -50, 30, -70); h.lineTo(70, -55); h.lineTo(95, -15); h.lineTo(65, 0); h.lineTo(55, -15); h.lineTo(55, 60); h.lineTo(-55, 60); h.lineTo(-55, -15); h.lineTo(-65, 0); h.lineTo(-95, -15); h.closePath(); h.fill();
          txt('still wearing:', 0, -110 + 245, 26, '#1a1a2a', 700, 'center', 1, FR); h.restore(); stamp('SAME BLUE TEE', CX, SY + 230, 32, '#fff', B('fash5') + 0.9, t, -0.1); } }
      if (id === 'NIGHT') { sTxt('after midnight', CX, SY + 150, 34, '#fff');
        for (let i = 0; i < 26; i++) { const r = K.rng(90 + i); const x = SX + r() * SW, y = SY + 120 + r() * 300; h.fillStyle = `rgba(255,255,255,${0.3 + 0.5 * Math.abs(Math.sin(t * 2 + i))})`; h.beginPath(); h.arc(x, y, 2 + r() * 2, 0, 7); h.fill(); }
        txt('🌙', CX, SY + 265, 110, '#000', 400, 'center'); bigNum(String(Math.round(lerp(0, 47, eo(pr(t, B('night') + 0.1, E('night')))))), CX, SY + 410, 150);
        sTxt('orders after 12 AM', CX, SY + 510, 40, '#fff'); sTxt('peak: 1:47 AM 🍕', CX, SY + 570, 30, 'rgba(255,255,255,0.85)', 600, 'center', fin(t, E('night'), 0.3));
        if (t >= B('night') + 1.0) stamp('NIGHT MADDIE 😈', CX, SY + 632, 32, ACC, B('night') + 1.0, t, 0.08); }
      if (id === 'LEAK') { sTxt('money leaks', CX, SY + 150, 34, '#fff'); sTxt('3 subscriptions you forgot', CX, SY + 200, 28, 'rgba(255,255,255,0.85)', 600);
        row('🏋️', 'Gym', '₹999/mo', SY + 300, fin(t, B('leak') + 0.25, 0.25), t >= B('gym')); row('🎵', 'Music app', '₹119/mo', SY + 400, fin(t, B('leak') + 0.45, 0.25)); row('📺', 'OTT', '₹379/mo', SY + 500, fin(t, B('leak') + 0.65, 0.25));
        sTxt('= ₹1,497 every month', CX, SY + 600, 34, '#fff', 700, 'center', fin(t, E('leak'), 0.3));
        if (t >= B('gym2')) stamp('NEVER WENT', SX + SW - 130, SY + 262, 26, '#fff', B('gym2') + 0.3, t, 0.15); }
      if (id === 'SAVE') { sTxt('cut this', CX, SY + 150, 34, '#fff');
        row('🍔', 'Half Swiggy', '₹19,080', SY + 260, fin(t, B('save') + 0.2, 0.25)); row('🔁', 'Subscriptions', '₹17,964', SY + 360, fin(t, B('save') + 1.0, 0.25));
        const k = fin(t, B('save2'), 0.3); sTxt('you save every year', CX, SY + 455, 30, 'rgba(255,255,255,0.9)', 600, 'center', k);
        bigNum('₹' + inr(lerp(0, 37000, eo(pr(t, B('save2'), E('save2'))))), CX, SY + 545, 110, k);
        if (t >= B('phone')) stamp('= NEW PHONE 📱', CX, SY + 640, 32, '#fff', B('phone') + 0.5, t, -0.06); }
      if (id === 'PERS') { sTxt('your money personality', CX, SY + 150, 32, '#fff');
        for (let i = 0; i < 14; i++) { const a2 = i / 14 * Math.PI * 2 + t * 0.5; h.fillStyle = 'rgba(255,220,120,0.8)'; txt('✦', CX + Math.cos(a2) * 175, SY + 320 + Math.sin(a2) * 120, 22, 'rgba(255,230,150,0.9)', 400, 'center', fin(t, B('pers2'), 0.3)); }
        txt('🌙🍔', CX, SY + 320, 100, '#000', 400, 'center');
        const k = pop(t, B('pers2'), 0.45); if (k > 0) scaleAt(CX, SY + 500, k, () => { bigNum('The Midnight', CX, SY + 470, 62); bigNum('Swiggy Guy', CX, SY + 545, 62); });
        sTxt('share your card ↗', CX, SY + 640, 26, 'rgba(255,255,255,0.8)', 600, 'center', fin(t, E('pers2'), 0.3)); }
    };
    const drawPhone = t => { if (t < C.SWG - 0.05 || t >= C.EVERY + 0.4) return;
      const a = t < C.EVERY ? eb(pr(t, C.SWG - 0.05, C.SWG + 0.4)) : 1 - ei(pr(t, C.EVERY, C.EVERY + 0.4));
      const idx = ORDER.reduce((n, id, i) => t >= C[id] ? i : n, 0), cur = ORDER[idx];
      h.save(); h.globalAlpha = cl(a * 1.5); h.translate(CX, PY + (1 - a) * 260); h.scale(PSC * (0.85 + 0.15 * a), PSC * (0.85 + 0.15 * a)); h.translate(-CX, -PY);
      h.shadowColor = 'rgba(90,124,255,0.6)'; h.shadowBlur = 50; h.fillStyle = '#0b0c12'; h.beginPath(); h.roundRect(PX, PY, PW, PH, 58); h.fill(); h.shadowBlur = 0;
      h.strokeStyle = 'rgba(160,180,255,0.5)'; h.lineWidth = 3; h.stroke();
      h.save(); h.beginPath(); h.roundRect(SX, SY, SW, SHH, 46); h.clip();
      const sl = eo(pr(t, C[cur], C[cur] + 0.4)), prev = idx > 0 && sl < 1 ? ORDER[idx - 1] : null;
      const paint = (id, dx) => { h.save(); h.translate(dx, 0); const [c1, c2] = BG[id]; const g = h.createLinearGradient(SX, SY, SX + SW, SY + SHH); g.addColorStop(0, c1); g.addColorStop(1, c2); h.fillStyle = g; h.fillRect(SX, SY, SW, SHH);
        h.fillStyle = 'rgba(255,255,255,0.07)'; h.beginPath(); h.arc(SX + SW * 0.85, SY + 120, 150, 0, 7); h.fill(); h.beginPath(); h.arc(SX + SW * 0.1, SY + SHH - 80, 120, 0, 7); h.fill(); content(id, t); h.restore(); };
      if (prev) paint(prev, -SW * sl); paint(cur, prev ? SW * (1 - sl) : 0);
      ORDER.forEach((id, i) => { const x = SX + 22 + i * ((SW - 44) / 7), w = (SW - 44) / 7 - 8; h.fillStyle = 'rgba(255,255,255,0.35)'; h.fillRect(x, SY + 28, w, 6);
        const f = i < idx ? 1 : i > idx ? 0 : cl((t - C[id]) / ((i < 6 ? C[ORDER[i + 1]] : C.EVERY) - C[id])); h.fillStyle = '#fff'; h.fillRect(x, SY + 28, w * f, 6); });
      h.restore(); h.fillStyle = '#0b0c12'; h.beginPath(); h.roundRect(CX - 60, SY + 2, 120, 26, 13); h.fill();       // notch
      h.restore(); };
    // ---------- the pitch: what Wrapped is, how it works, when, how to get it ----------
    const drawPitch = t => { if (t < C.PITCH - 0.1) return;
      if (t < C.STEPS) { const a = pop(t, C.PITCH + 0.05, 0.5); scaleAt(540, 450, a, () => { glowCard(130, 280, 820, 360, 40, 'rgba(255,197,61,0.85)');
          txt('🧾', 540, 355, 74, '#000', 400, 'center'); otxt('Wrapped', 540, 470, 130, ACC, 1, 'center', 14); txt('your year of UPI, unwrapped', 540, 575, 36, TXT, 600, 'center'); }); return; }
      if (t < C.DEC) { logo(540, 215, 44, TXT, fin(t, C.STEPS, 0.25));
        card(110, 285, 860, 450, 34); txt('how it works', 150, 335, 30, DIM, 700);
        const ST = [['up', 0.05, '📄', 'Upload your statement', 'PhonePe or any bank'], ['cards', 0.05, '🎴', 'Get your 7 cards', 'food · chai · fashion · leaks…'], ['cards', 1.1, '📲', 'Share your story', 'your money personality']];
        ST.forEach(([id, d, e, s1, s2], i) => { const t0 = B(id) + d, r = fin(t, t0, 0.3); const y = 420 + i * 108;
          h.save(); h.globalAlpha = 0.35 + 0.65 * r; card(140, y - 46, 800, 92, 22, r > 0.5 ? 'rgba(255,197,61,0.12)' : 'rgba(255,255,255,0.04)', r > 0.5 ? 'rgba(255,197,61,0.7)' : 'rgba(130,160,255,0.3)');
          chip(String(i + 1), 195, y, 30, r > 0.5 ? ACC : 'rgba(255,255,255,0.15)', r > 0.5 ? '#1a1206' : TXT, 1, 1, 900, FR); txt(e, 265, y, 42, '#000', 400, 'center');
          txt(s1, 310, y - 14, 34, TXT, 700, 'left', 1, FR); txt(s2, 310, y + 24, 24, DIM, 600); h.restore(); });
        const sa = fin(t, B('safe'), 0.25); if (sa > 0) { chip('🔒 never leaves your phone', 400, 800, 30, 'rgba(8,12,40,0.92)', GRN, sa, pop(t, B('safe'), 0.35), 800, FR);
          chip('FREE', 800, 800, 34, GRN, '#06281a', fin(t, B('safe') + 1.0, 0.2), pop(t, B('safe') + 1.0, 0.35), 900, FR); }
        return; }
      if (t < C.CTA) { const a = pop(t, C.DEC + 0.05, 0.45); scaleAt(540, 450, a, () => { glowCard(190, 290, 700, 330, 40, 'rgba(61,220,151,0.85)');
          txt('🚀 launching', 540, 350, 36, DIM, 700, 'center', 1, FR); otxt('DEC 1', 540, 465, 150, GRN, 1, 'center', 14); txt('free for everyone', 540, 565, 34, TXT, 600, 'center'); }); return; }
      const a = pop(t, C.CTA + 0.05, 0.45); scaleAt(540, 450, a, () => { glowCard(110, 270, 860, 430, 40, 'rgba(255,197,61,0.85)');
        logo(540, 340, 56, TXT); chip('FREE · DEC 1', 540, 420, 30, GRN, '#06281a', 1, 1, 900, FR);
        const pl = 1 + 0.04 * Math.sin(t * 7) * fin(t, B('cta') + 0.4, 0.3); scaleAt(540, 530, pl, () => { h.save(); h.shadowColor = 'rgba(255,197,61,0.9)'; h.shadowBlur = 30; h.fillStyle = ACC; h.beginPath(); h.roundRect(170, 480, 740, 100, 50); h.fill(); h.restore();
          txt('💬 Comment', 395, 532, 44, '#1a1206', 700, 'center', 1, FR); txt('WRAPPED', 700, 532, 54, '#1a1206', 900, 'center', 1, FR); });
        txt('→ early access in your DMs', 540, 640, 32, TXT, 600, 'center', fin(t, B('cta') + 0.8, 0.3)); });
      if (t >= B('no')) stamp('SWIGGY NUMBER STAYS', 540, 780, 40, RED, B('no') + 0.15, t, -0.06); };

    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,10,0.45)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.TOTAL, C.SWG, C.LEAK, C.PITCH, C.CTA];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.18) a = Math.max(a, 1 - d / 0.18); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawHook(t); drawStmt(t); drawTotal(t); drawPhone(t); drawPitch(t);
      LABELS.forEach(([a, b, s1, s2]) => { if (inS(t, a, b)) label(t, s1, s2, C[a]); });
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.6})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.3); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, '#5a7cff'); g.addColorStop(1, ACC); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); drawLaptop(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['pop', 0.3, 0.35]); for (let t2 = B('h2') + 0.2; t2 < E('h2') - 0.1; t2 += 0.08) sfx.push(['tick', t2, 0.12]); sfx.push(['buzz', E('h2') - 0.1, 0.15], ['pop', B('h3'), 0.2]);
    sfx.push(['whoosh', C.STMT, 0.3], ['pop', C.STMT + 0.05, 0.35], ['boing', B('all'), 0.2], ['thud', B('all2'), 0.45]); for (let t2 = B('all2'); t2 < E('all2') + 0.5; t2 += 0.07) sfx.push(['tick', t2, 0.08]);
    sfx.push(['bass', C.TOTAL, 0.45], ['riser', C.TOTAL, 0.25]); for (let t2 = B('total') + 0.5; t2 < E('total') + 0.2; t2 += 0.06) sfx.push(['coin', t2, 0.07]); sfx.push(['kaching', E('total') + 0.2, 0.35], ['chime', B('unwrap'), 0.35]);
    ORDER.forEach(id => sfx.push(['whoosh', C[id], 0.3], ['pop', C[id] + 0.15, 0.25]));
    for (let t2 = B('swg') + 0.15; t2 < E('swg'); t2 += 0.07) sfx.push(['tick', t2, 0.08]); sfx.push(['thud', B('swg3') + 0.4, 0.5]);
    for (let t2 = B('chai') + 0.1; t2 < E('chai') + 0.2; t2 += 0.07) sfx.push(['tick', t2, 0.08]); sfx.push(['ding', B('chai2') + 0.3, 0.25]);
    sfx.push(['zap', B('fash3') + 0.1, 0.2], ['pop', B('fash5') + 0.4, 0.3], ['thud', B('fash5') + 0.9, 0.5]);
    sfx.push(['chime', B('night') + 0.1, 0.25], ['boing', B('night') + 1.0, 0.25]);
    [0.25, 0.45, 0.65].forEach(d => sfx.push(['pop', B('leak') + d, 0.2])); sfx.push(['buzz', E('leak'), 0.15], ['boing', B('gym'), 0.3], ['thud', B('gym2') + 0.3, 0.5]);
    sfx.push(['pop', B('save') + 0.2, 0.2], ['pop', B('save') + 1.0, 0.2]); for (let t2 = B('save2'); t2 < E('save2'); t2 += 0.06) sfx.push(['coin', t2, 0.07]); sfx.push(['kaching', E('save2'), 0.35], ['ding', B('phone') + 0.5, 0.3]);
    sfx.push(['riser', B('pers') , 0.2], ['chime', B('pers2'), 0.4]);
    sfx.push(['whoosh', C.PITCH, 0.3], ['riser', C.PITCH - 1.2, 0.18], ['kaching', C.PITCH + 0.1, 0.35], ['whoosh', C.STEPS, 0.25], ['pop', B('up') + 0.05, 0.3], ['pop', B('cards') + 0.05, 0.3], ['pop', B('cards') + 1.1, 0.3]);
    sfx.push(['ding', B('safe'), 0.3], ['ding', B('safe') + 1.0, 0.3], ['boing', B('when'), 0.3], ['bass', C.DEC, 0.4], ['kaching', C.DEC + 0.1, 0.35], ['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.4, 0.4], ['thud', B('no') + 0.15, 0.6]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
