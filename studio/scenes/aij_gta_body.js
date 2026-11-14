/* @maddiee.makess reel 18 — "GTA 6 pays you to play?" — FIXED TEMPLATE (same look as reel 6 "Claude made this"):
   dark navy neon-grid world, Maddie at his desk + the headphones hover-bot, hook card (GTA 6 ₹5,999 vs balance ₹312), reveal counter
   ($0 → $120,000), REAL #1 / REAL #2 / STEP chips, close-ups, captions high with yellow keywords, progress bar on top.
   Maddie now has a little beard. Ends on a share card (no comment prompt). Full 9:16, no bars, no blush dots, no handle. */
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
    const C = { HOOK: 0, PAID: B('paid') - 0.12, WAIT: B('wait') - 0.1, NO: B('no') - 0.1, JOB: B('k1') - 0.12, APPLY: B('apply') - 0.1, REQ: B('req1') - 0.1,
      CLIP: B('clip') - 0.12, RATE: B('rate') - 0.1, S1: B('s1') - 0.12, S2: B('s2') - 0.12, S3: B('s3') - 0.12, LAP: B('lap') - 0.1, NOPC: B('nopc') - 0.1, PS5: B('ps5') - 0.12, SHARE: B('share') - 0.15 };
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
    // a little beard (stubble): a thin shell over the skull, speckles only on the jaw, chin and a faint moustache
    (() => { const skull = M.head.children.find(o => o.isMesh && Math.abs(o.position.y - 0.24) < 1e-3 && Math.abs(o.position.x) < 1e-3);
      if (!skull) return; const sh = new THREE.Mesh(skull.geometry, new THREE.MeshStandardMaterial({ color: 0x2a1c15, roughness: 0.9, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
      sh.position.copy(skull.position); sh.scale.setScalar(1.012);
      sh.material.onBeforeCompile = s => { s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vSP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvSP = position;');
        s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vSP;\nfloat hsh(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }')
          .replace('#include <alphatest_fragment>', `
            float y = vSP.y, ax = abs(vSP.x), z = vSP.z;
            float jaw = 1.0 - smoothstep(-0.165, -0.13, y - smoothstep(0.1, 0.2, ax) * 0.07);        // chin + jaw, rising along the sides
            float must = smoothstep(-0.112, -0.103, y) * (1.0 - smoothstep(-0.088, -0.078, y)) * (1.0 - smoothstep(0.045, 0.07, ax));
            float lip = 1.0 - smoothstep(0.0, 1.0, length(vec2(vSP.x / 0.062, (y + 0.13) / 0.02)));   // keep the mouth clear
            float m = max(jaw, must * 0.8) * (1.0 - lip) * smoothstep(-0.06, 0.06, z);
            float sp = step(0.56, hsh(floor(vSP * 560.0)));
            diffuseColor.a = m * (0.12 + 0.46 * sp);
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
      if (t < C.PAID) { mL = t < B('h3') ? lapLook : toCam; face = 'worried'; lean = 0.4; }
      else if (t < C.WAIT) { mL = toR; face = 'neutral'; lean = 0.2; }
      else if (t < C.NO) { mL = toR; face = 'shock'; lean = -0.1; up = eo(pr(t, C.WAIT, C.WAIT + 0.3)); }
      else if (t < C.JOB) { mL = toR; face = t < B('one') ? 'worried' : 'neutral'; }
      else if (t < C.APPLY) { mL = t < B('k3') ? toR : lapLook; face = 'shock'; lean = 0.3; }
      else if (t < C.REQ) { mL = toCam; face = 'shock'; lean = -0.1; up = eo(pr(t, C.APPLY, C.APPLY + 0.3)) * (1 - pr(t, C.REQ - 0.25, C.REQ)); }
      else if (t < B('have') - 0.1) { mL = toR; face = 'worried'; }
      else if (t < B('zero') - 0.1) { mL = toR; face = 'smile'; lean = -0.05; }
      else if (t < C.CLIP) { mL = toCam; face = 'worried'; lean = 0.35; }
      else if (t < C.S1) { mL = t < C.RATE ? toR : lapLook; face = t < C.RATE ? 'neutral' : 'shock'; lean = 0.25; type = t >= C.RATE ? 1 : 0; }
      else if (t < C.LAP) { mL = t < C.S3 ? lapLook : toR; face = 'neutral'; lean = 0.3; type = t < C.S3 ? 0.6 : 0; }
      else if (t < C.NOPC) { mL = toR; face = 'smile'; lean = -0.05; }
      else if (t < C.PS5) { mL = toR; face = 'shock'; }
      else if (t < C.SHARE) { mL = toCam; face = 'worried'; lean = 0.4; }
      else { mL = toCam; face = 'smile'; lean = 0; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type, lean });
      const [aL, aR] = M.arms; if (up > 0) { aL.sh.rotation.set(-0.3 - up * 0.9, 0.2, -0.05 - up * 0.3); aL.el.rotation.x = -0.1 - up * 1.1; aR.sh.rotation.set(-0.3 - up * 0.9, -0.2, 0.05 + up * 0.3); aR.el.rotation.x = -0.1 - up * 1.1; }
      let rL = [-0.15, 0.05];
      if ((t >= C.PAID && t < C.WAIT) || (t >= C.JOB && t < C.APPLY) || (t >= C.CLIP && t < C.LAP) || t >= C.SHARE) rL = [0.42, 0.02];   // explaining to us
      if (t >= C.NO && t < C.JOB) rL = [0.25, 0.0];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      const mood = (t >= B('zero') - 0.05 && t < C.CLIP) || (t >= C.NOPC && t < C.PS5) ? 'flat' : (t >= C.SHARE || (t >= C.JOB && t < C.APPLY)) ? 'smile' : 'calm';
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.y += 0.25 * Math.sin((t - B('no')) * 18) * K.pulse(t, B('no') - 0.05, 0.6) + 0.2 * Math.sin((t - B('nopc')) * 18) * K.pulse(t, B('nopc') - 0.05, 0.5);   // head shakes
      R.head.rotation.z += 0.14 * K.pulse(t, B('zero') - 0.1, 0.9);
      steam.forEach((s, i) => { const ph = ((t * 0.45 + i / steam.length) % 1); s.position.set(-0.66 + Math.sin(i * 2 + t * 1.3) * 0.015, DY + 0.12 + ph * 0.22, -0.36); s.scale.setScalar(0.03 + ph * 0.07); s.material.opacity = 0.32 * Math.sin(ph * Math.PI); });
      dpScr.material.color.setHex(t >= C.CLIP && t < C.S1 && Math.floor(t * 2) % 2 ? 0x3a6dff : 0x0b0b10);
      holo.forEach(o => { o.m.position.y = o.y + Math.sin(t * 0.7 + o.ph) * 0.06; });
    };

    // ================= LAPTOP SCREEN =================
    const lr = (X, Y, W, H, r, f) => { lx.fillStyle = f; lx.beginPath(); lx.roundRect(X, Y, W, H, r); lx.fill(); };
    const ltxt = (s, X, Y, size, col, w = 500, al = 'left', fam = '"Inter", sans-serif') => { lx.font = `${w} ${size}px ${fam}`; lx.fillStyle = col; lx.textAlign = al; lx.textBaseline = 'middle'; lx.fillText(s, X, Y); };
    const sunset = (c, x, y, w, hh) => { const g = c.createLinearGradient(x, y, x, y + hh); g.addColorStop(0, '#ff3fa4'); g.addColorStop(0.5, '#ff9a3c'); g.addColorStop(1, '#2a1250'); c.fillStyle = g; c.fillRect(x, y, w, hh);
      c.fillStyle = 'rgba(255,240,180,0.9)'; c.beginPath(); c.arc(x + w / 2, y + hh * 0.62, w * 0.22, Math.PI, 0); c.fill();
      c.fillStyle = '#1a0b2e'; c.fillRect(x, y + hh * 0.62, w, hh * 0.38);
      [[0.18, 0.3], [0.8, 0.22]].forEach(([u, s]) => { const px = x + w * u, py = y + hh * 0.62; c.fillRect(px - 3, py - hh * s, 6, hh * s); for (let i = 0; i < 5; i++) { c.save(); c.translate(px, py - hh * s); c.rotate(-1.2 + i * 0.6); c.fillRect(0, -3, w * 0.12, 6); c.restore(); } });
      c.fillStyle = '#fff'; c.font = `900 ${Math.round(w * 0.3)}px "Fredoka Light"`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.strokeStyle = 'rgba(0,0,0,0.6)'; c.lineWidth = 6; c.strokeText('VI', x + w / 2, y + hh * 0.36); c.fillText('VI', x + w / 2, y + hh * 0.36); };
    const drawLaptop = t => {
      lx.fillStyle = '#14151c'; lx.fillRect(0, 0, LSW, LSH);
      if (t < C.WAIT) { lx.fillStyle = '#0f0f13'; lx.fillRect(0, 0, LSW, LSH); ltxt('Store', 40, 50, 34, '#fff', 800); sunset(lx, 40, 100, 260, 380);
        ltxt('Grand Theft Auto VI', 340, 150, 40, '#fff', 800); ltxt('Standard Edition', 340, 205, 28, '#9a9aa8', 600); ltxt('₹5,999', 340, 290, 86, '#fff', 900);
        lr(340, 360, 300, 70, 35, '#2f6bff'); ltxt('Pre-order', 490, 396, 30, '#fff', 800, 'center'); ltxt('Releases 19 Nov', 340, 470, 28, '#ffc53d', 700); }
      else { lx.fillStyle = '#1c1b22'; lx.fillRect(0, 0, LSW, LSH); lx.fillStyle = '#26252e'; lx.fillRect(0, 0, LSW, 70);
        lx.fillStyle = '#e0663a'; lx.beginPath(); lx.arc(46, 35, 16, 0, 7); lx.fill(); ltxt('Claude', 76, 36, 28, '#eee', 700);
        lr(380, 110, 540, 90, 20, '#3a3946'); ltxt('is GTA 6 really paying people?', 400, 155, 26, '#fff', 500);
        const rows = ['Searching "paid to play GTA 6"…', 'Reading the Kalshi job post…', 'Checking clipping campaigns…', 'Checking platforms + price…'], n = t < C.JOB ? 1 : t < C.CLIP ? 2 : t < C.LAP ? 3 : 4;
        rows.slice(0, n).forEach((r, i) => { ltxt((i < n - 1 ? '✓ ' : '● ') + r, 60, 260 + i * 56, 28, i < n - 1 ? '#6fe3b5' : '#ffc53d', 600); }); }
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
      [C.HOOK, C.PAID, sh.hook], [C.PAID, C.WAIT, sh.robo], [C.WAIT, C.NO, sh.wait], [C.NO, C.JOB, sh.robo],
      [C.JOB, C.APPLY, sh.pair], [C.APPLY, C.REQ, sh.mad], [C.REQ, B('have') - 0.1, sh.robL], [B('have') - 0.1, B('zero') - 0.1, sh.mad], [B('zero') - 0.1, C.CLIP, sh.robo],
      [C.CLIP, C.RATE, sh.two], [C.RATE, C.S1, sh.ots], [C.S1, C.S2, sh.robL], [C.S2, C.S3, sh.pair], [C.S3, C.LAP, sh.robo],
      [C.LAP, C.NOPC, sh.mad], [C.NOPC, C.PS5, sh.robo], [C.PS5, C.SHARE, sh.wait], [C.SHARE, D + 5, sh.cta],
    ];
    const smooth = k => k * k * (3 - 2 * k);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth,
      shake: s === sh.wait && a === C.WAIT ? (t => 0.006 * Math.exp(-(t - a) * 6)) : null }));
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

    const STEPS = [['JOB', 'CLIP', 'REAL #1', 'THE $120K JOB'], ['CLIP', 'S1', 'REAL #2', 'CLIPPING'], ['S1', 'S2', 'STEP 1', 'YOUR OWN FOOTAGE'], ['S2', 'S3', 'STEP 2', 'ADD THE AD LABEL'],
      ['S3', 'LAP', 'STEP 3', 'NEVER BUY VIEWS'], ['LAP', 'PS5', 'PLATFORMS', ''], ['PS5', 'SHARE', 'THE COST', '']];
    const sunTile = (() => { const c = document.createElement('canvas'); c.width = 240; c.height = 400; sunset(c.getContext('2d'), 0, 0, 240, 400); return c; })();

    const drawHook = t => { if (t >= C.PAID) return;
      chip('🎮  GTA 6 · NOV 19', 540, 215, 34, 'rgba(8,12,40,0.88)', TXT, fin(t, 0.05, 0.3), 1, 700);
      const a = pop(t, 0.25, 0.45); if (a <= 0) return; scaleAt(540, 430, a, () => {
        card(150, 300, 780, 270, 34); h.drawImage(sunTile, 180, 322, 132, 220);
        txt('GTA 6 · standard', 340, 350, 30, DIM, 600); txt('₹5,999', 340, 418, 76, TXT, 700, 'left', 1, FR);
        const b = fin(t, B('h3'), 0.3); if (b > 0) { txt('your balance', 340, 482, 28, DIM, 600, 'left', b); txt('₹' + fmt(lerp(0, 312, eo(pr(t, B('h3') + 0.2, E('h3'))))), 560, 482, 44, RED, 900, 'left', b, FR); txt('😬', 880, 482, 44, '#000', 400, 'center', b); } }); };
    const drawPaid = t => { if (t < C.PAID || t >= C.WAIT) return;
      const a = pop(t, C.PAID + 0.05, 0.45); scaleAt(540, 440, a, () => { glowCard(130, 300, 820, 300, 40, 'rgba(255,197,61,0.8)');
        chip('PAID TO PLAY GTA 6?', 540, 360, 34, ACC, '#1a1206', 1, 1, 900, FR);
        otxt('$' + fmt(lerp(0, 120000, eo(pr(t, B('paid') + 0.2, E('paid') + 0.3)))), 540, 480, 130, ACC, 1, 'center', 14); txt('🎮', 870, 480, 60, '#000', 400, 'center'); }); };
    const drawWait = t => { if (t < C.WAIT || t >= C.NO) return;
      const k = pr(t, C.WAIT, C.WAIT + 0.35); h.save(); h.globalAlpha = 0.85 * (1 - pr(t, C.NO - 0.3, C.NO)); h.translate(540, 1080); h.rotate(t * 0.3);
      for (let i = 0; i < 24; i++) { h.rotate(Math.PI / 12); h.fillStyle = i % 2 ? `rgba(255,197,61,${0.35 * k})` : `rgba(90,124,255,${0.3 * k})`; h.beginPath(); h.moveTo(470, -14); h.lineTo(1400, -90); h.lineTo(1400, 90); h.lineTo(470, 14); h.fill(); } h.restore();
      const s = pop(t, B('wait2') - 0.05, 0.35); if (s > 0) scaleAt(540, 330, s, () => { otxt('ROCKSTAR', 540, 320, 130, ACC, 1, 'center', 16); otxt('pays us to play?!', 540, 450, 74, TXT, 1, 'center', 12); }); };
    const drawNo = t => { if (t < C.NO || t >= C.JOB) return;
      const a = pop(t, C.NO + 0.05, 0.35); scaleAt(540, 430, a, () => { card(190, 330, 700, 200, 36, 'rgba(8,12,40,0.9)', 'rgba(255,77,90,0.6)'); txt('⭐', 260, 430, 64, '#000', 400, 'center'); txt('Rockstar pays you', 320, 405, 44, TXT, 700, 'left', 1, FR); txt('to play GTA 6', 320, 465, 30, DIM, 600); });
      const x = pop(t, B('no') + 0.05, 0.3); if (x > 0) { h.save(); h.translate(540, 430); h.scale(lerp(2.2, 1, x), lerp(2.2, 1, x)); h.globalAlpha = cl(x * 2); h.strokeStyle = RED; h.lineWidth = 26; h.lineCap = 'round';
        h.beginPath(); h.moveTo(-170, -130); h.lineTo(170, 130); h.moveTo(170, -130); h.lineTo(-170, 130); h.stroke(); h.restore(); }
      chip('NOT ROCKSTAR', 540, 640, 44, RED, '#fff', fin(t, B('no2'), 0.25), pop(t, B('no2'), 0.3), 900, FR);
      chip('BUT 1 COMPANY DOES 👀', 540, 740, 40, GRN, '#06281a', fin(t, B('one') + 0.1, 0.25), pop(t, B('one') + 0.1, 0.3), 900, FR); };
    const JOBROWS = [['k2', '🌙', 'Play from 12:00 AM, Nov 19'], ['k2', '🎥', 'Stream the whole game'], ['k3', '📊', 'Weekly reports on the game economy']];
    const drawJob = t => { if (t < C.JOB || t >= C.CLIP) return;
      const out = t < C.REQ ? 1 : 0; if (out) { const a = fin(t, C.JOB, 0.3); h.save(); h.globalAlpha = a; card(80, 285, 920, 600, 34);
        txt('kalshi · careers', 120, 340, 30, DIM, 700); txt('GTA VI Researcher', 120, 405, 54, TXT, 700, 'left', 1, FR); chip('REAL JOB POST', 820, 340, 24, 'rgba(61,220,151,0.2)', GRN, 1, 1, 900);
        JOBROWS.forEach(([id, e, s], i) => { const t0 = B(id) + (i === 1 ? 0.6 : 0.05), r = fin(t, t0, 0.25); if (r <= 0) return; const y = 490 + i * 78; h.save(); h.globalAlpha = r; h.translate((1 - r) * 60, 0); txt(e, 140, y, 40, '#000', 400, 'center'); txt(s, 190, y, 34, TXT, 600); h.restore(); });
        const pk = pop(t, B('k4') - 0.05, 0.4); if (pk > 0) { scaleAt(540, 800, pk, () => { otxt('$' + fmt(lerp(0, 120000, eo(pr(t, B('k4'), E('k4'))))), 470, 790, 92, ACC, 1, 'center', 12); txt('+ $15K bonus', 760, 800, 32, GRN, 800, 'left', 1, FR); }); }
        h.restore(); }
      if (t >= C.REQ) { card(80, 300, 920, 440, 34); txt('to get the job you need…', 120, 355, 32, DIM, 700);
        const RQ = [['req1', '🎮', '10+ years of gaming', 'have', true], ['req2', '📡', '3+ years of streaming', 'zero', false]];
        RQ.forEach(([id, e, s, mid, ok], i) => { const r = fin(t, B(id), 0.25); if (r <= 0) return; const y = 450 + i * 130; h.save(); h.globalAlpha = r; card(110, y - 50, 860, 100, 22, 'rgba(255,255,255,0.04)', 'rgba(130,160,255,0.35)');
          txt(e, 165, y, 46, '#000', 400, 'center'); txt(s, 215, y, 36, TXT, 600); const m = pop(t, B(mid) + (ok ? 0.1 : 0.3), 0.3);
          if (m > 0) chip(ok ? 'MADDIE ✓' : 'MADDIE: 0 YRS ✗', 820, y, 26, ok ? GRN : RED, ok ? '#06281a' : '#fff', 1, m, 900); h.restore(); }); } };
    const CLIPS = [[0.2, 12400], [0.45, 48200], [0.7, 3100]];
    const drawClip = t => { if (t < C.CLIP || t >= C.S1) return;
      if (t < C.RATE) { CLIPS.forEach(([f, v], i) => { const t0 = B('clip3') + i * 0.25, a = pop(t, t0, 0.4); if (a <= 0) return; const x = 200 + i * 340, y = 560;
          scaleAt(x, y, a, () => { h.save(); h.translate(x, y); h.rotate((i - 1) * 0.08); h.drawImage(sunTile, -120, -200, 240, 400); h.strokeStyle = 'rgba(255,255,255,0.8)'; h.lineWidth = 4; h.strokeRect(-120, -200, 240, 400);
            otxt('▶ ' + fmt(v * eo(pr(t, t0 + 0.2, t0 + 1.4))), 0, 160, 40, TXT, 1, 'center', 8); h.restore(); }); });
        chip('CLIPPING 🎬', 540, 300, 44, ACC, '#1a1206', fin(t, B('clip2'), 0.25), pop(t, B('clip2'), 0.35), 900, FR); }
      else { const a = pop(t, C.RATE + 0.05, 0.45); scaleAt(540, 470, a, () => { glowCard(110, 300, 860, 380, 40, 'rgba(61,220,151,0.8)');
          txt('one GTA 6 campaign pays', 540, 360, 32, DIM, 700, 'center'); otxt('$0.70', 400, 470, 130, GRN, 1, 'center', 14); txt('per 1,000', 620, 450, 44, TXT, 700, 'left', 1, FR); txt('views', 620, 500, 36, DIM, 600);
          const b = fin(t, B('rate2'), 0.3); if (b > 0) chip('MAX $35 PER CLIP', 540, 610, 36, 'rgba(8,12,40,0.9)', ACC, b, pop(t, B('rate2'), 0.3), 900, FR); }); } };
    const RULES = [['s1', '🎮', 'your own gameplay', '✓ OK', GRN], ['s2', '🏷️', '"ad" label at the start', '✓ OK', GRN], ['s3', '💸', 'buying views', '✗ BANNED', RED]];
    const drawSteps = t => { if (t < C.S1 || t >= C.LAP) return;
      card(80, 285, 920, 520, 34); txt('the 3 rules', 120, 340, 32, DIM, 700);
      RULES.forEach(([id, e, s, tag, col], i) => { const a = fin(t, B(id) + 0.2, 0.25); if (a <= 0) return; const y = 430 + i * 130;
        h.save(); h.globalAlpha = a; h.translate((1 - a) * 60, 0); card(110, y - 52, 860, 104, 22, 'rgba(255,255,255,0.04)', col === RED ? 'rgba(255,77,90,0.6)' : 'rgba(61,220,151,0.5)');
        txt(e, 165, y, 46, '#000', 400, 'center'); txt(s, 215, y, 36, TXT, 600); const st = pop(t, B(id) + 0.6, 0.3); chip(tag, 850, y, 28, col, col === RED ? '#fff' : '#06281a', 1, st, 900); h.restore(); });
      const rj = fin(t, B('s2b'), 0.25); if (rj > 0 && t < C.S3) chip('or REJECTED', 540, 860, 32, 'rgba(255,77,90,0.2)', RED, rj, 1, 900); };
    const drawLap = t => { if (t < C.LAP || t >= C.PS5) return;
      const a = pop(t, C.LAP + 0.05, 0.4); scaleAt(540, 420, a, () => { card(170, 290, 740, 260, 36); txt('💻', 300, 420, 120, '#000', 400, 'center'); txt('GTA 6 on', 420, 390, 40, DIM, 700, 'left', 1, FR); txt('my laptop?', 420, 450, 56, TXT, 700, 'left', 1, FR); });
      const x = pop(t, B('nopc'), 0.3); if (x > 0) { h.save(); h.translate(300, 420); h.scale(lerp(2, 1, x), lerp(2, 1, x)); h.globalAlpha = cl(x * 2); h.strokeStyle = RED; h.lineWidth = 18; h.lineCap = 'round'; h.beginPath(); h.moveTo(-80, -80); h.lineTo(80, 80); h.moveTo(80, -80); h.lineTo(-80, 80); h.stroke(); h.restore(); }
      [['PS5 ✓', GRN, '#06281a', 300], ['XBOX SERIES ✓', GRN, '#06281a', 600], ['PC ✗', RED, '#fff', 870]].forEach(([s, bg, fg, x2], i) => { const t0 = (i < 2 ? B('cons') : B('nopc') + 0.2) + i * 0.08; chip(s, x2, 640, 34, bg, fg, fin(t, t0, 0.2), pop(t, t0, 0.3), 900, FR); }); };
    const drawCost = t => { if (t < C.PS5 || t >= C.SHARE) return;
      const a = pop(t, C.PS5 + 0.05, 0.4); scaleAt(540, 440, a, () => { card(130, 290, 820, 360, 36);
        txt('🎮 PS5', 180, 370, 44, TXT, 700, 'left', 1, FR); txt('₹ ₹ ₹', 900, 370, 40, DIM, 700, 'right', 1, FR);
        const g = fin(t, B('ps5b'), 0.25); txt('+ GTA 6', 180, 450, 44, TXT, 700, 'left', g, FR); txt('₹5,999', 900, 450, 44, TXT, 700, 'right', g, FR);
        h.fillStyle = 'rgba(255,255,255,0.15)'; h.fillRect(180, 500, 720, 3); txt('your balance', 180, 570, 36, DIM, 600, 'left', g); otxt('₹312', 900, 570, 64, RED, g, 'right', 10); }); };
    const drawShare = t => { if (t < C.SHARE) return;
      const ca = fin(t, B('share') - 0.05, 0.3), k = pop(t, B('share'), 0.45); if (ca <= 0) return; h.save(); h.globalAlpha = ca; glowCard(130, 260, 820, 330, 40, 'rgba(255,197,61,0.8)');
      txt('📤', 540, 330, 60, '#000', 400, 'center'); scaleAt(540, 430, 0.6 + 0.4 * k, () => otxt('Send this to a friend', 540, 430, 66, ACC, 1, 'center', 12));
      txt("who's waiting for GTA 6 🎮", 540, 515, 40, TXT, 600, 'center', fin(t, B('share') + 0.5, 0.3)); h.restore(); };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,10,0.45)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.WAIT, C.JOB, C.CLIP, C.SHARE];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.18) a = Math.max(a, 1 - d / 0.18); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawHook(t); drawPaid(t); drawWait(t); drawNo(t); drawJob(t); drawClip(t); drawSteps(t); drawLap(t); drawCost(t); drawShare(t);
      STEPS.forEach(([a, b, s1, s2]) => { if (inS(t, a, b)) label(t, s1, s2, C[a]); });
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.6})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.3); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, '#5a7cff'); g.addColorStop(1, ACC); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); drawLaptop(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['pop', 0.3, 0.35], ['buzz', B('h3') + 0.2, 0.15]); for (let i = 0; i < 6; i++) sfx.push(['tick', B('h3') + 0.25 + i * 0.1, 0.18]);
    sfx.push(['whoosh', C.PAID, 0.3], ['pop', C.PAID + 0.08, 0.4]); for (let t2 = B('paid') + 0.2; t2 < E('paid') + 0.3; t2 += 0.06) sfx.push(['coin', t2, 0.07]); sfx.push(['kaching', E('paid') + 0.3, 0.3]);
    sfx.push(['bass', C.WAIT, 0.5], ['boing', B('wait2') - 0.05, 0.3]);
    sfx.push(['thud', B('no') + 0.05, 0.7], ['zap', B('no') + 0.08, 0.2], ['pop', B('no2'), 0.3], ['chime', B('one') + 0.1, 0.3]);
    sfx.push(['whoosh', C.JOB, 0.3]); JOBROWS.forEach(([id], i) => sfx.push(['pop', B(id) + (i === 1 ? 0.6 : 0.05), 0.2])); for (let t2 = B('k4'); t2 < E('k4'); t2 += 0.06) sfx.push(['coin', t2, 0.07]); sfx.push(['kaching', E('k4'), 0.35]);
    sfx.push(['boing', B('apply'), 0.25], ['whoosh', C.REQ, 0.25], ['pop', B('req1'), 0.25], ['pop', B('req2'), 0.25], ['ding', B('have') + 0.1, 0.3], ['thud', B('zero') + 0.3, 0.6], ['buzz', B('zero') + 0.3, 0.15]);
    sfx.push(['whoosh', C.CLIP, 0.35], ['pop', B('clip2'), 0.35]); CLIPS.forEach((c, i) => sfx.push(['pop', B('clip3') + i * 0.25, 0.25]));
    sfx.push(['whoosh', C.RATE, 0.25], ['kaching', C.RATE + 0.1, 0.3], ['ding', B('rate2'), 0.25]);
    RULES.forEach(([id, e, s, tag, col]) => sfx.push(['whoosh', B(id), 0.15], ['pop', B(id) + 0.2, 0.2], col === RED ? ['thud', B(id) + 0.6, 0.6] : ['ding', B(id) + 0.6, 0.25])); sfx.push(['buzz', B('s2b'), 0.12], ['zap', B('s3b'), 0.2]);
    sfx.push(['pop', C.LAP + 0.05, 0.3], ['thud', B('nopc'), 0.6], ['pop', B('cons'), 0.2], ['pop', B('cons') + 0.08, 0.2]);
    sfx.push(['pop', C.PS5 + 0.05, 0.3], ['kaching', B('ps5b'), 0.25], ['buzz', B('ps5b') + 0.3, 0.15]);
    sfx.push(['whoosh', C.SHARE, 0.3], ['chime', B('share') + 0.05, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
