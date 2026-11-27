/* @maddiee.makess 'Why?' series — biscuit holes (docking): let steam escape so the biscuit bakes flat and crisp instead of puffing and cracking. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x1a1410, fog: [9, 40], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
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

    const rng = K.rng(652);
    const C = {}; window.SCENE.lines.forEach(l => C[l.id] = B(l.id) - 0.1);
    const RY = 0.86; const dummy = new THREE.Object3D();
    // ================= HOME SET =================

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

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: 0.56, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(-0.2, 0, -0.95); S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    // his phone (right hand), screen glowing PaisaMap mint
    const ph = new THREE.Group(); M.arms[1].hand.add(ph); ph.position.set(-0.05, 0.035, 0.03); ph.rotation.set(-1.05, 0.25, 0);
    rbox(0.085, 0.165, 0.012, SM(0x1b1d24, 0.3, { metalness: 0.3 }), 0, 0.06, 0, 0.012, ph);
    const phScr = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.152), new THREE.MeshBasicMaterial({ color: 0xbfe3d0, toneMapped: false })); phScr.position.set(0, 0.06, -0.0065); phScr.rotation.y = Math.PI; ph.add(phScr);
    const phL = new THREE.PointLight(0x9ff0cc, 0.0, 0.9, 1.6); S.add(phL);
    const R = (() => {   // the hover-bot with headphones (same design as every reel), floating above the books on the nightstand; no hands
      const g = new THREE.Group(); g.position.set(0.4, RY, -0.8); g.rotation.y = -0.6; S.add(g);
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

    const hemi = new THREE.HemisphereLight(0xfff0dc, 0x6a4a30, 0.8); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff0dc, 1.3); key.position.set(-1.0, 2.6, 2.0); key.target.position.set(0.3, 0.9, -0.9); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.5); front.position.set(0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const winL = new THREE.PointLight(0xffe0a8, 1.4, 4, 1.4); winL.position.set(-0.9, 1.8, -1.2); S.add(winL);

    // ================= EXPLAINER WORLD =================

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

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const FACE = { hook: 'neutral', so: 'neutral', chimney: 'shock', childhood: 'shock' };
    const curLine = t => { let c = L[0]; for (const l of L) if (t >= l.t - 0.1) c = l; return c; };
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      const cur = curLine(t), end = t >= C.cta;
      let face = 'neutral', mL = toR, lean = 0;
      if (cur.who === 'maddie') { face = FACE[cur.id] || 'neutral'; mL = (face === 'shock' || face === 'worried') ? toCam : toR; lean = face === 'shock' ? -0.1 : face === 'worried' ? 0.15 : 0; }
      if (end) { face = 'smile'; mL = toCam; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type: 0, lean });
      phL.intensity = 0; ph.visible = false;
      const rL = cur.who === 'claude' || end ? [0.25, 0.03] : [-0.2, 0.05];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood: end ? 'smile' : 'calm' });

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
      burst.forEach((b, i) => { const q = t - crackT; const on = q > 0 && q < 1.4 && t < C.chimney + 1.1; b.s.position.set(0.62 + b.v[0] * q * 0.8, TY + puff + b.v[1] * q * 0.8, -0.4 + b.v[2] * q * 0.8); b.s.material.opacity = on ? (1 - q / 1.4) * 0.9 : 0; });
      // with holes: steam streams out of every hole, stays flat
      const holesOut = (t >= C.flat && t < C.docking + 0.2) || (t >= C.trapped && t < C.so + 99 && t < C.flat && false);
      stm.forEach(m => { const q = (t * 0.9 + m.o + m.h[0]) % 1; m.s.position.set(-0.62 + m.h[0] * bigR * 0.78, TY + bH + 0.05 + q * 0.5, -0.4 + m.h[1] * bigR * 0.78); m.s.material.opacity = holesOut ? Math.sin(q * Math.PI) * 0.45 : 0; });
      [lA, lB].forEach(s => s.material.opacity = t < C.docking ? 1 : 0);
      // docking roller
      const dock = t >= C.docking && t < C.childhood + 0.3; sheet.visible = dock; roller.visible = dock; bA.visible = bB.visible = dome.visible = !dock;
      const rx = lerp(-1.3, 1.3, pr(t, C.docking + 0.3, E('docking') - 0.2)); roller.position.set(rx, TY + 0.25, -0.4); rc.rotation.y = 0; rc.rotation.z = 0; roller.children[0].rotation.y = -rx / 0.14;
      let hi = 0; for (let i = 0; i < 11; i++) for (let k = 0; k < 6; k++) { const x = -1.0 + i * 0.2, z = -0.4 - 0.5 + k * 0.2; dummy.position.set(x, TY + 0.06, z); dummy.scale.setScalar(dock && x < rx - 0.05 ? 1 : 0.0001); dummy.updateMatrix(); holeI.setMatrixAt(hi++, dummy.matrix); }
      holeI.instanceMatrix.needsUpdate = true;

    };
    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.4, RY + 0.26, -0.8];
    const sh = {
      mad: [P([0.42, 1.46, 1.55], [-0.28, 1.4, -0.94], 32), P([0.38, 1.45, 1.35], [-0.28, 1.4, -0.94], 32)],
      two: [P([0.45, 1.45, 2.1], [-0.05, 1.2, -0.9], 40), P([0.4, 1.42, 1.85], [-0.05, 1.2, -0.9], 40)],
      robo: [P([-0.05, RY + 0.36, 0.75], RHL, 32), P([-0.02, RY + 0.35, 0.6], RHL, 32)],
      cta: [P([0.5, 1.5, 2.6], [-0.05, 1.25, -0.9], 42), P([0.45, 1.48, 2.3], [-0.05, 1.25, -0.9], 42)],

      plate: [P([0.95, 1.25, -0.25], [0.75, 0.82, -0.95], 40), P([0.9, 1.15, -0.4], [0.75, 0.82, -0.95], 36)],
      oven: [P([BX, 1.5, 4.6], [BX, 0.75, -0.4], 44), P([BX, 1.4, 4.2], [BX, 0.75, -0.4], 44)],
      ovB: [P([BX + 0.62, 1.3, 2.6], [BX + 0.62, 0.8, -0.4], 42), P([BX + 0.62, 1.3, 2.3], [BX + 0.62, 0.85, -0.4], 42)],
      ovA: [P([BX - 0.62, 1.4, 2.5], [BX - 0.62, 0.8, -0.4], 42), P([BX - 0.62, 1.4, 2.2], [BX - 0.62, 0.85, -0.4], 42)],
      dock: [P([BX + 0.2, 1.7, 3.4], [BX, 0.6, -0.4], 44), P([BX + 0.1, 1.6, 3.0], [BX, 0.6, -0.4], 44)],

    };
    const PLAN = [[0, 'two'], [1.8, 'plate'], [C.oven, 'robo'], [C.steam, 'oven'], [C.so, 'mad'], [C.trapped, 'ovB'], [C.chimney + 0.9, 'mad'], [C.flat, 'ovA'], [C.docking, 'dock'], [C.childhood, 'mad'], [C.cta, 'cta']];
    const plan = PLAN.map((p, i) => [p[0], i + 1 < PLAN.length ? PLAN[i + 1][0] : D + 5, sh[p[1]], p[1]]).filter(p => p[1] > p[0]);
    const smooth = k => k * k * (3 - 2 * k);
    const lift = (p, dy) => ({ pos: [p.pos[0], p.pos[1] + dy, p.pos[2]], look: [p.look[0], p.look[1] + dy, p.look[2]], fov: p.fov });
    const DYS = { mad: 0.085, robo: 0.035, two: 0.05, cta: 0.03 };
    plan.forEach(p => { if (DYS[p[3]]) p[2] = [lift(p[2][0], DYS[p[3]]), lift(p[2][1], DYS[p[3]])]; });
    const SHAKE = plan.filter(p => p[3] === 'mad' && L.some(l => l.who === 'maddie' && FACE[l.id] === 'shock' && Math.abs(B(l.id) - 0.1 - p[0]) < 0.3)).map(p => p[0]);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth, shake: SHAKE.includes(a) ? (t => 0.006 * Math.exp(-(t - a) * 6)) : null }));
    const curFov = t => { const p = plan.find(([a, b]) => t >= a && t < b) || plan[plan.length - 1]; const k = smooth(cl((t - p[0]) / (p[1] - p[0]))); return lerp(p[2][0].fov, p[2][1].fov, k); };
    // ================= HUD =================
    S.add(K.cam);
    const HW = 1080, HH = 1920, hc = document.createElement('canvas'); hc.width = HW; hc.height = HH; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, depthTest: false, depthWrite: false, toneMapped: false, fog: false }));
    hud.renderOrder = 1000; K.cam.add(hud);
    // PaisaMap Fresh Mint palette
    const GRN = '#0b8f68', MINT = '#f2f7f3', MINT2 = '#e3eee7', BAR = '#9fd0b8', INKD = '#10261d', FOG = '#5b7366', RED = '#e5484d', GOLD = '#f5a524', WH = '#f6faf8';
    const FR = '"Fredoka Light", "Inter Display"';
    const F = (s, w = 400, fam = '"Inter", "DejaVu Sans"') => `${w} ${s}px ${fam}`;
    const txt = (s, x, y, size, col, w = 400, align = 'left', a = 1, fam) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, fam); h.fillStyle = col; h.textAlign = align; h.textBaseline = 'middle'; h.fillText(s, x, y); h.restore(); };
    const ft = (s, x, y, size, col, w = 700, align = 'left', a = 1) => txt(s, x, y, size, col, w, align, a, FR);
    const fin = (t, t0, d = 0.4) => eo(pr(t, t0, t0 + d));
    const pop = (t, t0, d = 0.4) => eb(pr(t, t0, t0 + d));
    const rr = (x, y, w, hh, r, fill) => { h.fillStyle = fill; h.beginPath(); h.roundRect(x, y, w, hh, r); h.fill(); };
    const wcard = (x, y, w, hh, r = 34, glow = 'rgba(80,230,170,0.75)') => { h.save(); h.shadowColor = glow; h.shadowBlur = 44; rr(x, y, w, hh, r, 'rgba(240,247,243,0.97)'); h.restore(); h.strokeStyle = 'rgba(11,143,104,0.35)'; h.lineWidth = 3; h.beginPath(); h.roundRect(x, y, w, hh, r); h.stroke(); };
    const chip = (s, x, y, size, bg, fg, a = 1, sc = 1, w = 800) => { if (a <= 0) return; h.save(); h.globalAlpha *= a; h.font = F(size, w, FR); const tw = h.measureText(s).width + size * 1.3, th = size * 1.8;
      h.translate(x, y); h.scale(sc, sc); h.fillStyle = bg; h.beginPath(); h.roundRect(-tw / 2, -th / 2, tw, th, th / 2); h.fill(); h.fillStyle = fg; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 3); h.restore(); };
    const scaleAt = (x, y, s, fn) => { h.save(); h.translate(x, y); h.scale(s, s); h.translate(-x, -y); fn(); h.restore(); };
    const stamp = (s, x, y, size, col, t0, t, rot = -0.12, bg = null) => { const k = pop(t, t0, 0.3); if (k <= 0) return; h.save(); h.translate(x, y); h.rotate(rot); const sc = lerp(2.2, 1, k); h.scale(sc, sc); h.globalAlpha *= cl(k * 2);
      h.font = F(size, 700, FR); const w = h.measureText(s).width + size; if (bg) rr(-w / 2, -size * 0.85, w, size * 1.7, 14, bg); h.strokeStyle = col; h.lineWidth = 7; h.beginPath(); h.roundRect(-w / 2, -size * 0.85, w, size * 1.7, 14); h.stroke();
      h.fillStyle = col; h.textAlign = 'center'; h.textBaseline = 'middle'; h.fillText(s, 0, 4); h.restore(); };
    const inr = n => Math.round(n).toLocaleString('en-IN');
    const pin = (x, y, s, col = GRN) => { h.save(); h.translate(x, y); h.scale(s, s); h.fillStyle = col; h.beginPath(); h.moveTo(0, 22); h.bezierCurveTo(-4, 14, -14, 6, -14, -4); h.arc(0, -4, 14, Math.PI, 0); h.bezierCurveTo(14, 6, 4, 14, 0, 22); h.fill(); h.fillStyle = WH; h.beginPath(); h.arc(0, -4, 5.5, 0, 7); h.fill(); h.restore(); };

    const DARK = 'rgba(10,14,40,0.92)';
    const label = (t, t0, t1, s, bg = DARK, fg = '#fff', y = 230) => { if (t < t0 || t >= t1) return; chip(s, 540, y, 38, bg, fg, fin(t, t0, 0.25) * (1 - pr(t, t1 - 0.2, t1)), pop(t, t0, 0.35), 800); };
    const endCard = (t, l1, l2, btn) => { if (t < C.cta) return; const a = pop(t, C.cta + 0.05, 0.45); scaleAt(540, 430, a, () => { h.save(); h.shadowColor = 'rgba(111,216,255,0.9)'; h.shadowBlur = 40; rr(140, 270, 800, 330, 40, DARK); h.restore();
        ft(l1, 540, 350, 50, '#fff', 700, 'center'); ft(l2, 540, 412, 40, '#ffd34a', 700, 'center');
        const pl = 1 + 0.05 * Math.sin(t * 7); scaleAt(540, 520, pl, () => { rr(170, 480, 740, 84, 42, '#ffd34a'); ft(btn, 540, 524, 36, '#1a1206', 800, 'center'); }); }); };
    const drawBeats = t => {

      label(t, 1.9, C.oven, '🍪 the tiny holes in every biscuit');
      label(t, C.steam + 0.6, C.so, '💧 water in the dough → 💨 steam', '#2a6fd6');
      label(t, C.trapped + 0.3, C.balloon, '❌ no holes: steam is trapped', '#e5484d');
      if (t >= B('balloon') + 4.3 && t < C.chimney + 0.9) stamp('CRACK!', 540, 300, 64, '#e5484d', B('balloon') + 4.3, t, -0.08, 'rgba(255,255,255,0.95)');
      label(t, C.flat + 0.3, C.docking, '✅ holes = steam escapes → flat + crisp', '#2fbf71');
      if (t >= C.docking + 1.0 && t < C.childhood) stamp('IT\'S CALLED "DOCKING"', 540, 300, 50, '#ffd34a', C.docking + 1.0, t, -0.05, 'rgba(10,14,40,0.95)');
      endCard(t, '🍪 The holes are steam vents', 'no holes = puffed + cracked', '📤 Send to your chai-biscuit friend');

    };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), gr = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,10,0.32)'); x.fillStyle = gr; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.steam, C.trapped, C.flat, C.docking, C.cta];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.15) a = Math.max(a, 1 - d / 0.15); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawBeats(t);
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.35})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.25); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const gg = h.createLinearGradient(0, 0, HW, 0); gg.addColorStop(0, '#6fd8ff'); gg.addColorStop(1, '#ffd34a'); h.fillStyle = gg; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); placeHud(t); hudDraw(t); };
    const sfx = [];

    sfx.push(['chime', 0.3, 0.2], ['whoosh', 1.8, 0.25], ['riser', C.steam + 0.6, 0.25], ['boing', C.so, 0.2]);
    sfx.push(['riser', C.balloon + 0.2, 0.3], ['zap', B('balloon') + 4.3, 0.35], ['thud', B('balloon') + 4.3, 0.4], ['boing', C.chimney, 0.2], ['whoosh', C.flat + 0.3, 0.25], ['chime', C.flat + 0.6, 0.3]);
    for (let t2 = C.docking + 0.3; t2 < C.docking + 2.2; t2 += 0.12) sfx.push(['tick', t2, 0.08]); sfx.push(['thud', C.docking + 1.0, 0.3], ['boing', C.childhood, 0.2], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
