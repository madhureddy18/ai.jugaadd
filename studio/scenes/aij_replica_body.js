/* @maddiee.makess reel 21 — "Replica apps" — FIXED TEMPLATE (reel 6 look): navy neon-grid world, Maddie at his desk + the headphones
   hover-bot. Hook: verified revenue card ($20,109/month, an idea → app designs app). Copy the idea, never the code or the name.
   TrustMRR (Stripe-verified revenue) on a PHONE screen → 3 steps (find, rebuild for India, ₹299) → replica app → 1,000 × ₹299 money card
   → "I'll get ten" → "Comment REPLICA" CTA (10 app ideas guide, p/replica/). Fuller beard, NO burst rays. Full 9:16, no handle. */
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
    const C = { HOOK: 0, COPY: B('copy') - 0.12, CODE: B('code') - 0.1, SITE: B('site') - 0.12, EX: B('ex') - 0.1, S1: B('s1') - 0.12, S2: B('s2') - 0.12, S3: B('s3') - 0.12,
      SAME: B('same') - 0.1, REP: B('rep') - 0.1, LAKH: B('lakh') - 0.12, TEN: B('ten') - 0.1, WHICH: B('which') - 0.12, CTA: B('cta') - 0.1 };

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
      if (t < C.COPY) { mL = toCam; face = 'worried'; lean = 0.35; }
      else if (t < C.CODE) { mL = toR; face = t < B('illegal') - 0.1 ? 'neutral' : 'shock'; lean = t < B('illegal') - 0.1 ? 0.15 : -0.1; }
      else if (t < C.SITE) { mL = toR; face = t < B('idea') ? 'worried' : 'smile'; }
      else if (t < C.S1) { mL = lapLook; face = t < C.EX + 1.2 ? 'neutral' : 'shock'; lean = 0.3; type = t < C.EX ? 0.5 : 0; }
      else if (t < C.SAME) { mL = t < C.S2 ? toR : lapLook; face = 'neutral'; lean = 0.25; type = t >= C.S2 ? 0.5 : 0; }
      else if (t < C.LAKH) { mL = toR; face = t < C.REP ? 'neutral' : 'smile'; lean = 0.1; }
      else if (t < B('if') - 0.1) { mL = toCam; face = 'shock'; lean = -0.1; up = eo(pr(t, B('lakh') + 0.8, B('lakh') + 1.1)) * (1 - pr(t, B('if') - 0.3, B('if'))); }
      else if (t < C.TEN) { mL = toR; face = 'worried'; lean = 0.2; }
      else if (t < C.WHICH) { mL = t < B('start') ? toCam : toR; face = t < B('start') ? 'worried' : 'smile'; lean = 0.15; }
      else if (t < C.CTA) { mL = toR; face = 'worried'; lean = 0.35; }
      else { mL = toCam; face = 'smile'; lean = 0; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type, lean });
      const [aL, aR] = M.arms; if (up > 0) { aL.sh.rotation.set(-0.3 - up * 0.9, 0.2, -0.05 - up * 0.3); aL.el.rotation.x = -0.1 - up * 1.1; aR.sh.rotation.set(-0.3 - up * 0.9, -0.2, 0.05 + up * 0.3); aR.el.rotation.x = -0.1 - up * 1.1; }
      let rL = [-0.15, 0.05];
      if ((t >= C.SITE && t < C.SAME) || (t >= C.CTA)) rL = [0.42, 0.02];   // explaining to us
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      const flat = t >= B('if') - 0.05 && t < B('if') + 1.2;
      const mood = flat ? 'flat' : (t >= C.REP && t < C.LAKH) || (t >= B('start') && t < C.WHICH) || t >= C.CTA ? 'smile' : 'calm';
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.y += 0.22 * Math.sin((t - B('code')) * 16) * K.pulse(t, B('code') - 0.05, 0.6);   // small "no" shake on "copying the code is"
      steam.forEach((s, i) => { const ph = ((t * 0.45 + i / steam.length) % 1); s.position.set(-0.66 + Math.sin(i * 2 + t * 1.3) * 0.015, DY + 0.12 + ph * 0.22, -0.36); s.scale.setScalar(0.03 + ph * 0.07); s.material.opacity = 0.32 * Math.sin(ph * Math.PI); });
      dpScr.material.color.setHex(t >= C.SITE && t < C.S1 && Math.floor(t * 2) % 2 ? 0x3ddc97 : 0x0b0b10);
      holo.forEach(o => { o.m.position.y = o.y + Math.sin(t * 0.7 + o.ph) * 0.06; });
    };

    // ================= LAPTOP SCREEN =================
    const lr = (X, Y, W, H, r, f) => { lx.fillStyle = f; lx.beginPath(); lx.roundRect(X, Y, W, H, r); lx.fill(); };
    const ltxt = (s, X, Y, size, col, w = 500, al = 'left', fam = '"Inter", sans-serif') => { lx.font = `${w} ${size}px ${fam}`; lx.fillStyle = col; lx.textAlign = al; lx.textBaseline = 'middle'; lx.fillText(s, X, Y); };
    const drawLaptop = t => {
      lx.fillStyle = '#1c1b22'; lx.fillRect(0, 0, LSW, LSH); lx.fillStyle = '#26252e'; lx.fillRect(0, 0, LSW, 70); ltxt('verified startup revenue', 40, 36, 28, '#ffc53d', 800);
      for (let i = 0; i < 6; i++) { lr(40, 100 + i * 78, 880, 62, 14, '#2c2b35'); ltxt(['$20.1k', '$7.3k', '$3.6k', '$2.5k', '$1.3k', '$550'][i] + ' /mo', 880, 131 + i * 78, 26, '#3ddc97', 800, 'right'); lr(60, 118 + i * 78, 300 - i * 30, 26, 8, '#3a3946'); }
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
      [C.HOOK, C.COPY, sh.hook], [C.COPY, B('illegal') - 0.1, sh.robo], [B('illegal') - 0.1, C.CODE, sh.wait], [C.CODE, C.SITE, sh.robL],
      [C.SITE, C.EX, sh.ots], [C.EX, C.S1, sh.robo], [C.S1, C.S2, sh.robL], [C.S2, C.S3, sh.pair], [C.S3, C.SAME, sh.robo],
      [C.SAME, C.REP, sh.mad], [C.REP, C.LAKH, sh.robo], [C.LAKH, B('if') - 0.1, sh.wait], [B('if') - 0.1, C.TEN, sh.robL], [C.TEN, B('start') - 0.1, sh.mad], [B('start') - 0.1, C.WHICH, sh.robo],
      [C.WHICH, C.CTA, sh.mad], [C.CTA, D + 5, sh.robo],
    ];
    const SHAKE = [B('illegal') - 0.1, C.LAKH];
    const smooth = k => k * k * (3 - 2 * k);
    const lift = (p, dy) => ({ pos: [p.pos[0], p.pos[1] + dy, p.pos[2]], look: [p.look[0], p.look[1] + dy, p.look[2]], fov: p.fov });   // pan up so faces sit under the HUD
    const DYS = new Map([[sh.mad, 0.085], [sh.wait, 0.075], [sh.robo, 0.035], [sh.robL, 0.035], [sh.two, 0.05], [sh.pair, 0.05], [sh.ots, 0.05], [sh.hook, 0.07]]);
    plan.forEach(p => { if (DYS.has(p[2])) { const d = DYS.get(p[2]); p[2] = [lift(p[2][0], d), lift(p[2][1], d)]; } });
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
    const PSC = 0.82, PX = 290, PY = 250, PW = 500, PH = 700, BZ = 14, SX = PX + BZ, SY = PY + BZ, SW = PW - 2 * BZ, SHH = PH - 2 * BZ, CX = PX + PW / 2;
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
    const bar = (x, y, w, hh, col, r = 10) => { h.fillStyle = col; h.beginPath(); h.roundRect(x, y, Math.max(0, w), hh, r); h.fill(); };
    const usd = n => '$' + Math.round(n).toLocaleString('en-US');

    // ---------- hook: verified revenue card ----------
    const drawHook = t => { if (t >= C.COPY) return;
      chip('💸  APPS THAT ACTUALLY EARN', 540, 210, 34, 'rgba(8,12,40,0.9)', TXT, fin(t, 0.05, 0.3), 1, 800, FR);
      const a = pop(t, 0.2, 0.45); if (a <= 0) return; scaleAt(540, 450, a, () => { glowCard(130, 290, 820, 360, 40, 'rgba(61,220,151,0.85)');
        txt('📱', 215, 365, 60, '#000', 400, 'center'); txt('an app that turns ideas', 270, 352, 30, DIM, 700, 'left', 1, FR); txt('into app designs', 270, 392, 30, DIM, 700, 'left', 1, FR);
        otxt(usd(lerp(0, 20109, eo(pr(t, 0.4, E('hook') - 0.2)))), 470, 510, 110, GRN, 1, 'center', 14); txt('/ month', 760, 525, 40, TXT, 700, 'left', 1, FR); });
      if (t > 0.9) stamp('VERIFIED REVENUE ✓', 540, 690, 36, GRN, 1.0, t, -0.06); };
    // ---------- copy the idea, not the code ----------
    const drawCopy = t => { if (t < C.COPY || t >= C.SITE) return;
      if (t < C.CODE) { const a = pop(t, B('copy') + 0.05, 0.4); scaleAt(540, 420, a, () => { card(200, 300, 680, 240, 36); txt('🧠', 330, 420, 100, '#000', 400, 'center'); otxt('COPY', 600, 400, 110, ACC, 1, 'center', 14); txt('apps that already earn', 600, 480, 30, TXT, 600, 'center'); });
        if (t >= B('illegal')) chip('ILLEGAL?! 😳', 540, 640, 46, RED, '#fff', fin(t, B('illegal'), 0.2), pop(t, B('illegal'), 0.3), 900, FR); return; }
      card(110, 290, 860, 440, 34);
      [['💻', 'the code', 'code'], ['🏷️', 'the name', 'code'], ['🎨', 'the logo', 'code']].forEach(([e, s, id], i) => { const r = fin(t, B(id) + 0.15 + i * 0.25, 0.25); if (r <= 0) return; const y = 370 + i * 95;
        h.save(); h.globalAlpha = r; txt(e, 180, y, 46, '#000', 400, 'center'); txt(s, 230, y, 40, TXT, 700, 'left', 1, FR); chip('✗ NOT OK', 830, y, 28, RED, '#fff', 1, pop(t, B(id) + 0.15 + i * 0.25, 0.3), 900, FR); h.restore(); });
      const r = fin(t, B('idea') + 0.05, 0.25); if (r > 0) { h.save(); h.globalAlpha = r; bar(130, 615, 820, 92, 'rgba(61,220,151,0.15)', 20); txt('💡', 180, 660, 46, '#000', 400, 'center'); txt('the idea', 230, 660, 44, GRN, 700, 'left', 1, FR); chip('✓ OK', 830, 660, 34, GRN, '#06281a', 1, pop(t, B('idea') + 0.05, 0.35), 900, FR); h.restore(); } };
    // ---------- the phone: TrustMRR-style verified list ----------
    const APPS = [['🎨', 'Idea → app designs', 20109], ['📈', 'Trading journal', 7300], ['💬', 'Video captions', 3600], ['🏡', 'Work-exchange', 2500], ['📍', 'Maps manager', 1300], ['🧪', 'Lab reports', 550], ['🗣️', 'Pronunciation app', 286]];
    const drawPhone = t => { if (t < C.SITE - 0.05 || t >= C.S1 + 0.3) return;
      const a = t < C.S1 ? eb(pr(t, C.SITE - 0.05, C.SITE + 0.35)) : 1 - ei(pr(t, C.S1, C.S1 + 0.3));
      h.save(); h.globalAlpha = cl(a * 1.5); h.translate(CX, PY + (1 - a) * 260); h.scale(PSC * (0.85 + 0.15 * a), PSC * (0.85 + 0.15 * a)); h.translate(-CX, -PY);
      h.shadowColor = 'rgba(90,124,255,0.6)'; h.shadowBlur = 50; h.fillStyle = '#0b0c12'; h.beginPath(); h.roundRect(PX, PY, PW, PH, 58); h.fill(); h.shadowBlur = 0; h.strokeStyle = 'rgba(160,180,255,0.5)'; h.lineWidth = 3; h.stroke();
      h.save(); h.beginPath(); h.roundRect(SX, SY, SW, SHH, 46); h.clip();
      const g = h.createLinearGradient(SX, SY, SX, SY + SHH); g.addColorStop(0, '#151a3c'); g.addColorStop(1, '#0b0e26'); h.fillStyle = g; h.fillRect(SX, SY, SW, SHH);
      txt('TrustMRR', SX + 34, SY + 80, 34, TXT, 800, 'left', 1, FR); txt('verified startup revenue', SX + 34, SY + 118, 22, DIM, 600);
      const sc = 0;
      APPS.slice(0, 6).forEach(([e, n, v], i) => { const ap = fin(t, C.SITE + 0.3 + i * 0.12, 0.25); if (ap <= 0) return; const y = SY + 180 + i * 82 + (1 - ap) * 30; if (y < SY + 140 || y > SY + SHH - 30) return; const hi = i === 0 && t >= C.EX;
        h.save(); if (hi) { h.shadowColor = 'rgba(61,220,151,0.9)'; h.shadowBlur = 24; } bar(SX + 24, y - 34, SW - 48, 70, hi ? 'rgba(61,220,151,0.18)' : 'rgba(255,255,255,0.07)', 16); h.restore();
        if (hi) { h.strokeStyle = GRN; h.lineWidth = 4; h.beginPath(); h.roundRect(SX + 24, y - 34, SW - 48, 70, 16); h.stroke(); }
        txt(e, SX + 62, y, 34, '#000', 400, 'center'); txt(n, SX + 92, y, 24, TXT, 700, 'left', 1, FR); txt(usd(v) + '/mo', SX + SW - 42, y, 24, GRN, 800, 'right', 1, FR); });
      h.restore(); h.fillStyle = '#0b0c12'; h.beginPath(); h.roundRect(CX - 60, SY + 2, 120, 26, 13); h.fill(); h.restore();
      if (t < C.S1) { const n = Math.round(lerp(0, 15000, eo(pr(t, B('real'), E('real'))))); chip(n >= 15000 ? '15,000+ apps · real earnings' : inr(n) + ' apps', 540, 205, 34, 'rgba(8,12,40,0.92)', ACC, fin(t, B('real'), 0.25), 1, 800, FR); }
      if (t >= C.EX && t < C.S1) stamp('$20,000 / MONTH', 540, 880, 40, GRN, B('ex') + 1.4, t, -0.05); };
    // ---------- the 3 steps ----------
    const STEPS = [['S1', '💸', 'Pick an app', 'that is already earning'], ['S2', '🇮🇳', 'Rebuild it for India', 'rupees · UPI · Hindi'], ['S3', '₹', 'Charge ₹299', 'not $20']];
    const drawSteps = t => { if (t < C.S1 || t >= C.SAME) return;
      const idx = t < C.S2 ? 0 : t < C.S3 ? 1 : 2; label(t, 'STEP ' + (idx + 1), ['FIND', 'REBUILD', 'PRICE'][idx], C[STEPS[idx][0]]);
      card(110, 290, 860, 420, 34);
      STEPS.forEach(([id, e, s1, s2], i) => { const r = fin(t, C[id] + 0.1, 0.3), y = 380 + i * 115, on = i === idx;
        h.save(); h.globalAlpha = 0.3 + 0.7 * r; card(140, y - 48, 800, 96, 22, on ? 'rgba(255,197,61,0.13)' : 'rgba(255,255,255,0.04)', on ? 'rgba(255,197,61,0.8)' : 'rgba(130,160,255,0.3)');
        chip(String(i + 1), 195, y, 30, r > 0.5 ? ACC : 'rgba(255,255,255,0.15)', r > 0.5 ? '#1a1206' : TXT, 1, 1, 900, FR); txt(e, 270, y, 44, e === '₹' ? ACC : '#000', 800, 'center', 1, FR);
        txt(s1, 320, y - 14, 38, TXT, 700, 'left', 1, FR); txt(s2, 320, y + 26, 26, DIM, 600); h.restore(); });
      if (t >= C.S3) { const k = pop(t, B('s3') + 1.0, 0.4); if (k > 0) scaleAt(540, 790, k, () => { otxt('$20', 380, 790, 70, RED, 1, 'center', 10); h.strokeStyle = RED; h.lineWidth = 8; h.beginPath(); h.moveTo(320, 790); h.lineTo(440, 790); h.stroke(); txt('→', 540, 790, 60, TXT, 700, 'center'); otxt('₹299', 700, 790, 80, GRN, 1, 'center', 10); }); } };
    // ---------- replica app ----------
    const drawRep = t => { if (t < C.SAME || t >= C.LAKH) return;
      const a = pop(t, C.SAME + 0.05, 0.45); scaleAt(540, 470, a, () => { card(110, 290, 860, 360, 36);
        card(150, 340, 320, 230, 26, 'rgba(255,255,255,0.05)', 'rgba(130,160,255,0.4)'); txt('🌍', 310, 405, 64, '#000', 400, 'center'); txt('their app', 310, 480, 34, TXT, 700, 'center', 1, FR); txt('$20 / month', 310, 528, 30, DIM, 700, 'center', 1, FR);
        txt('→', 540, 455, 70, ACC, 800, 'center');
        card(610, 340, 320, 230, 26, 'rgba(61,220,151,0.1)', 'rgba(61,220,151,0.7)'); txt('🇮🇳', 770, 405, 64, '#000', 400, 'center'); txt('your app', 770, 480, 34, TXT, 700, 'center', 1, FR); txt('₹299 / month', 770, 528, 30, GRN, 700, 'center', 1, FR); });
      if (t >= C.REP) { const k = pop(t, B('rep') + 0.2, 0.45); scaleAt(540, 720, k, () => otxt('= REPLICA APP', 540, 720, 80, ACC, cl(k * 2), 'center', 12)); } };
    // ---------- money ----------
    const drawMoney = t => { if (t < C.LAKH || t >= C.WHICH) return;
      const ten = t >= C.TEN, a = pop(t, C.LAKH + 0.05, 0.45);
      scaleAt(540, 460, a, () => { glowCard(110, 290, 860, 360, 40, ten ? 'rgba(255,197,61,0.85)' : 'rgba(61,220,151,0.85)');
        txt(ten ? '10 users × ₹299' : '1,000 users × ₹299', 540, 360, 42, TXT, 700, 'center', 1, FR);
        const v = ten ? lerp(0, 2990, eo(pr(t, B('start'), B('start') + 0.8))) : lerp(0, 299000, eo(pr(t, B('lakh') + 0.2, E('lakh'))));
        otxt('₹' + inr(v), 540, 480, 120, ten ? ACC : GRN, 1, 'center', 14); txt('/ month', 540, 580, 36, DIM, 700, 'center', 1, FR); });
      if (!ten && t >= B('if')) chip('IF you get 1,000 😅', 540, 730, 40, 'rgba(8,12,40,0.92)', ACC, fin(t, B('if'), 0.2), pop(t, B('if'), 0.3), 800, FR);
      if (ten && t >= B('start')) stamp('START HERE ✅', 540, 730, 44, GRN, B('start') + 1.0, t, -0.06); };
    const drawWhich = t => { if (t < C.WHICH || t >= C.CTA) return;
      const a = pop(t, C.WHICH + 0.05, 0.45); scaleAt(540, 440, a, () => { card(170, 300, 740, 280, 36); txt('🤔', 540, 380, 90, '#000', 400, 'center'); txt('which app do I make?', 540, 500, 46, TXT, 700, 'center', 1, FR); }); };
    const drawCta = t => { if (t < C.CTA) return;
      const a = pop(t, C.CTA + 0.05, 0.45); scaleAt(540, 450, a, () => { glowCard(110, 260, 860, 450, 40, 'rgba(255,197,61,0.85)');
        txt('📲', 540, 330, 64, '#000', 400, 'center'); txt('10 apps you can', 540, 405, 44, TXT, 700, 'center', 1, FR); txt('replicate for India', 540, 457, 44, ACC, 700, 'center', 1, FR);
        const pl = 1 + 0.04 * Math.sin(t * 7) * fin(t, B('cta') + 0.4, 0.3); scaleAt(540, 560, pl, () => { h.save(); h.shadowColor = 'rgba(255,197,61,0.9)'; h.shadowBlur = 30; h.fillStyle = ACC; h.beginPath(); h.roundRect(170, 510, 740, 100, 50); h.fill(); h.restore();
          txt('💬 Comment', 395, 562, 44, '#1a1206', 700, 'center', 1, FR); txt('REPLICA', 700, 562, 54, '#1a1206', 900, 'center', 1, FR); });
        txt('→ free list in your DMs', 540, 665, 32, TXT, 600, 'center', fin(t, B('cta') + 0.8, 0.3)); }); };

    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,10,0.45)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.SITE, C.S1, C.LAKH, C.CTA];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.18) a = Math.max(a, 1 - d / 0.18); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawHook(t); drawCopy(t); drawPhone(t); drawSteps(t); drawRep(t); drawMoney(t); drawWhich(t); drawCta(t);
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.6})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.25); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, '#5a7cff'); g.addColorStop(1, ACC); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); drawLaptop(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['pop', 0.2, 0.35]); for (let t2 = 0.4; t2 < E('hook') - 0.2; t2 += 0.06) sfx.push(['coin', t2, 0.06]); sfx.push(['kaching', E('hook') - 0.2, 0.35], ['ding', 1.0, 0.25]);
    sfx.push(['whoosh', C.COPY, 0.3], ['pop', B('copy') + 0.05, 0.3], ['boing', B('illegal'), 0.3], ['buzz', B('illegal') + 0.1, 0.12]);
    [0, 1, 2].forEach(i => sfx.push(['thud', B('code') + 0.15 + i * 0.25, 0.3])); sfx.push(['ding', B('idea') + 0.05, 0.35]);
    sfx.push(['whoosh', C.SITE, 0.3], ['pop', C.SITE + 0.1, 0.3]); for (let t2 = B('real'); t2 < E('real'); t2 += 0.07) sfx.push(['tick', t2, 0.07]); sfx.push(['chime', C.EX + 0.2, 0.3], ['kaching', B('ex') + 1.4, 0.35]);
    ['S1', 'S2', 'S3'].forEach(id => sfx.push(['whoosh', C[id], 0.25], ['pop', C[id] + 0.1, 0.3])); sfx.push(['zap', B('s3') + 1.0, 0.2], ['ding', B('s3') + 1.1, 0.3]);
    sfx.push(['whoosh', C.SAME, 0.25], ['chime', B('rep') + 0.2, 0.35]);
    sfx.push(['bass', C.LAKH, 0.4]); for (let t2 = B('lakh') + 0.2; t2 < E('lakh'); t2 += 0.06) sfx.push(['coin', t2, 0.06]); sfx.push(['kaching', E('lakh'), 0.35], ['buzz', B('if'), 0.15], ['boing', B('ten'), 0.25], ['ding', B('start') + 1.0, 0.3]);
    sfx.push(['pop', C.WHICH + 0.05, 0.3], ['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.4, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
