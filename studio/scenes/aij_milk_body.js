/* @maddiee.makess 'Why?' series — milk boils over: proteins + fat form a skin that traps steam bubbles; water bubbles just pop. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x1a2030, fog: [9, 40], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
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

    const rng = K.rng(485);
    const C = {}; window.SCENE.lines.forEach(l => C[l.id] = B(l.id) - 0.1);
    const RY = 0.95; const dummy = new THREE.Object3D();
    // ================= HOME SET =================

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

    const hemi = new THREE.HemisphereLight(0xfff4e6, 0x6a5040, 0.8); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff0dc, 1.3); key.position.set(1.0, 2.8, 2.2); key.target.position.set(0.2, 0.9, -0.9); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.5); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const winL = new THREE.PointLight(0xffd9a0, 1.2, 4, 1.5); winL.position.set(-1.0, 1.8, -1.2); S.add(winL);

    // ================= EXPLAINER WORLD =================

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

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const FACE = { hook: 'shock', why: 'worried', pile: 'shock', stop: 'worried', villain: 'neutral' };
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

    };
    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.4, RY + 0.26, -0.8];
    const sh = {
      mad: [P([0.42, 1.46, 1.55], [-0.28, 1.4, -0.94], 32), P([0.38, 1.45, 1.35], [-0.28, 1.4, -0.94], 32)],
      two: [P([0.45, 1.45, 2.1], [-0.05, 1.2, -0.9], 40), P([0.4, 1.42, 1.85], [-0.05, 1.2, -0.9], 40)],
      robo: [P([-0.05, RY + 0.36, 0.75], RHL, 32), P([-0.02, RY + 0.35, 0.6], RHL, 32)],
      cta: [P([0.5, 1.5, 2.6], [-0.05, 1.25, -0.9], 42), P([0.45, 1.48, 2.3], [-0.05, 1.25, -0.9], 42)],

      stove: [P([1.0, 1.42, 0.55], [1.07, 1.1, -1.12], 40), P([0.95, 1.38, 0.35], [1.07, 1.1, -1.12], 36)],
      labW: [P([MX, 1.4, 4.2], [MX, 0.95, 0], 42), P([MX + 0.2, 1.35, 3.7], [MX, 0.95, 0], 42)],
      water: [P([MX - 0.55, 1.4, 3.0], [MX - 0.7, 0.95, 0], 40), P([MX - 0.6, 1.35, 2.7], [MX - 0.7, 0.95, 0], 40)],
      milk: [P([MX + 0.85, 1.45, 3.0], [MX + 0.7, 1.05, 0], 40), P([MX + 0.8, 1.4, 2.7], [MX + 0.7, 1.05, 0], 40)],
      milkUp: [P([MX + 0.9, 1.6, 3.5], [MX + 0.7, 1.15, 0], 42), P([MX + 0.85, 1.75, 3.2], [MX + 0.7, 1.25, 0], 42)],

    };
    const PLAN = [[0, 'two'], [1.6, 'stove'], [C.classic, 'robo'], [C.why, 'mad'], [C.skin, 'labW'], [C.water, 'water'], [C.trapped, 'milk'], [C.pile, 'mad'], [C.lid, 'milkUp'], [C.stop, 'mad'], [C.stir, 'milkUp'], [C.villain, 'mad'], [C.cta, 'cta']];
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

      label(t, 1.7, C.classic, '🥛 5 seconds. That\'s all it takes.');
      label(t, C.skin + 1.0, C.water, '🟡 proteins + fat → a skin on top', '#c98a00');
      label(t, C.water + 0.3, C.trapped, '💧 water: bubbles just pop', '#2a6fd6');
      label(t, C.trapped + 0.3, C.pile, '🥛 milk: bubbles get trapped', '#7b2ff7');
      if (t >= B('lid') + 4.3 && t < C.stop) stamp('BOILED OVER!', 540, 300, 60, '#e5484d', B('lid') + 4.3, t, -0.06, 'rgba(255,255,255,0.95)');
      if (t >= C.stir + 0.3 && t < C.villain) { chip('🔥 lower the flame', 540, 230, 38, DARK, '#ffd34a', fin(t, C.stir + 0.3, 0.3), pop(t, C.stir + 0.3, 0.35)); chip('🥄 keep stirring → skin breaks', 540, 320, 38, DARK, '#9dff7a', fin(t, B('stir') + 2.3, 0.3), pop(t, B('stir') + 2.3, 0.35)); }
      endCard(t, '🥛 The skin traps the steam', 'lower flame + stir = no mess', '📤 Send to your chai friend');

    };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), gr = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,10,0.32)'); x.fillStyle = gr; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.skin, C.water, C.trapped, C.lid, C.stir, C.cta];
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

    for (let t2 = 0.1; t2 < 2.4; t2 += 0.18) sfx.push(['pop', t2, 0.12]); sfx.push(['boing', 0.1, 0.2], ['whoosh', 1.6, 0.25]);
    sfx.push(['riser', C.skin + 0.5, 0.2], ['chime', B('skin') + 3.0, 0.3]); for (let t2 = C.water + 0.2; t2 < C.trapped; t2 += 0.2) sfx.push(['pop', t2, 0.1]);
    sfx.push(['thud', B('trapped') + 1.0, 0.3], ['boing', C.pile, 0.2], ['riser', C.lid + 0.3, 0.3], ['whoosh', B('lid') + 4.3, 0.4], ['bass', B('lid') + 4.3, 0.45]);
    sfx.push(['boing', C.stop, 0.2], ['whoosh', C.stir + 0.3, 0.2], ['chime', B('stir') + 3.9, 0.3], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
