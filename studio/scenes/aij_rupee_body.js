/* @maddiee.makess 'Why?' series — raised angular bleed lines on rupee notes for the visually impaired (RBI: ₹100 four lines, ₹500 five), raised identification mark, note size grows with value. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x120a24, fog: [9, 40], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
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

    const rng = K.rng(923);
    const C = {}; window.SCENE.lines.forEach(l => C[l.id] = B(l.id) - 0.1);
    const RY = 0.86; const dummy = new THREE.Object3D();
    // ================= HOME SET =================

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

    const hemi = new THREE.HemisphereLight(0x9fb0ff, 0x30202a, 0.65); S.add(hemi);
    const key = new THREE.DirectionalLight(0xffe2c8, 1.1); key.position.set(1.0, 2.6, 2.2); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.55); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const rimP = new THREE.DirectionalLight(0xc25aff, 0.6); rimP.position.set(-2.2, 1.6, -2.4); S.add(rimP);

    // ================= EXPLAINER WORLD =================

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

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const FACE = { hook: 'neutral', raised: 'shock', bytouch: 'shock', code: 'shock' };
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

    };
    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.4, RY + 0.26, -0.8];
    const sh = {
      mad: [P([0.42, 1.46, 1.55], [-0.28, 1.4, -0.94], 32), P([0.38, 1.45, 1.35], [-0.28, 1.4, -0.94], 32)],
      two: [P([0.45, 1.45, 2.1], [-0.05, 1.2, -0.9], 40), P([0.4, 1.42, 1.85], [-0.05, 1.2, -0.9], 40)],
      robo: [P([-0.05, RY + 0.36, 0.75], RHL, 32), P([-0.02, RY + 0.35, 0.6], RHL, 32)],
      cta: [P([0.5, 1.5, 2.6], [-0.05, 1.25, -0.9], 42), P([0.45, 1.48, 2.3], [-0.05, 1.25, -0.9], 42)],

      desk: [P([0.95, 1.25, -0.2], [0.78, 0.82, -0.97], 40), P([0.9, 1.15, -0.35], [0.78, 0.82, -0.97], 36)],
      note: [P([NX, 1.3, 3.1], [NX, 1.25, -0.2], 40), P([NX, 1.28, 2.8], [NX, 1.25, -0.2], 40)],
      edge: [P([NX - 0.3, 1.4, 1.2], [NX - 0.42, 1.33, -0.2], 40), P([NX - 0.32, 1.38, 1.0], [NX - 0.45, 1.34, -0.2], 40)],
      row: [P([NX, 1.05, 2.4], [NX, 0.85, -0.9], 42), P([NX, 1.0, 2.2], [NX, 0.85, -0.9], 42)],

    };
    const PLAN = [[0, 'two'], [1.8, 'desk'], [C.touch, 'mad'], [C.touch + 1.0, 'edge'], [C.raised, 'mad'], [C.blind, 'note'], [C.count, 'edge'], [C.bytouch, 'mad'], [C.size, 'row'], [C.code, 'mad'], [C.feel, 'two'], [C.cta, 'cta']];
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

      label(t, 1.9, C.touch, '💵 the little lines on the sides');
      label(t, C.touch + 1.2, C.raised, '👆 close your eyes. touch.', '#7b2ff7');
      if (t >= C.blind + 0.3 && t < C.count) stamp('MADE FOR PEOPLE WHO CAN\'T SEE', 540, 300, 42, '#ffd34a', C.blind + 0.3, t, -0.04, 'rgba(10,14,40,0.95)');
      if (t >= B('count') + 1.4 && t < C.bytouch) { chip('₹100 → 4 lines', 540, 230, 40, DARK, '#cbbde8', fin(t, B('count') + 1.4, 0.3), pop(t, B('count') + 1.4, 0.35)); if (t >= B('count') + 3.9) chip('₹500 → 5 lines', 540, 320, 40, DARK, '#e5e7eb', fin(t, B('count') + 3.9, 0.3), pop(t, B('count') + 3.9, 0.35)); }
      label(t, C.size + 0.3, C.code, '📏 bigger value → bigger note', '#2a6fd6');
      endCard(t, '💵 Feel the edges of your notes', '₹100 = 4 · ₹500 = 5', '📤 Send to someone who counts twice');

    };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), gr = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,10,0.32)'); x.fillStyle = gr; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.blind, C.count, C.size, C.cta];
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

    sfx.push(['chime', 0.3, 0.2], ['whoosh', 1.8, 0.25], ['bass', C.touch + 0.4, 0.3], ['boing', C.raised, 0.2], ['chime', C.blind + 0.3, 0.35]);
    for (let i = 0; i < 4; i++) sfx.push(['ding', C.touch + 0.4 + i * 0.45, 0.2]); for (let i = 0; i < 4; i++) sfx.push(['ding', B('count') + 1.4 + i * 0.45, 0.25]); for (let i = 0; i < 5; i++) sfx.push(['ding', B('count') + 3.9 + i * 0.45, 0.25]);
    sfx.push(['boing', C.bytouch, 0.2]); for (let i = 0; i < 6; i++) sfx.push(['pop', C.size + 0.2 + i * 0.15, 0.2]); sfx.push(['boing', C.code, 0.2], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
