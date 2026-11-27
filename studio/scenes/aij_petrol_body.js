/* @maddiee.makess 'Why?' series — phones at petrol pumps: PEI has no documented case of a phone causing a refuelling fire; static discharge (re-entering the car mid-fill) does. Still follow pump rules. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x1d2b5a, fog: [9, 40], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
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

    const rng = K.rng(330);
    const C = {}; window.SCENE.lines.forEach(l => C[l.id] = B(l.id) - 0.1);
    const RY = 0.92; const dummy = new THREE.Object3D();
    // ================= HOME SET =================

    // petrol pump at dusk: Maddie on his scooty next to the dispenser
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(24, 16), SM(0x5d6168, 0.9)); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; S.add(ground);
    const isl = rbox(1.0, 0.12, 2.6, SM(0xd9d9d9, 0.6), 1.15, 0.06, -1.2, 0.03);
    const skyT = K.canvasTex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1d2b5a'); g.addColorStop(0.55, '#ff8a5a'); g.addColorStop(0.8, '#ffc27a'); g.addColorStop(1, '#3a2a3a'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(30, 12), new THREE.MeshBasicMaterial({ map: skyT, fog: false })); sky.position.set(0, 4, -9); S.add(sky);
    for (let i = 0; i < 10; i++) { const hgt = 1 + rng() * 3; const b = new THREE.Mesh(new THREE.BoxGeometry(1.4 + rng() * 1.5, hgt, 1), SM(0x2a2540, 0.9)); b.position.set(-12 + i * 2.6, hgt / 2, -7.5); S.add(b); }
    // canopy
    const can = rbox(8, 0.3, 4, SM(0xf2f2f2, 0.5), 0.5, 3.0, -0.8, 0.03); const band = new THREE.Mesh(new THREE.BoxGeometry(8.04, 0.18, 4.04), new THREE.MeshBasicMaterial({ color: 0x1fa463, toneMapped: false })); band.position.set(0.5, 2.92, -0.8); S.add(band);
    [-2.5, 3.5].forEach(x => rbox(0.25, 3, 0.25, SM(0xe5e5e5, 0.5), x, 1.5, -2.2, 0.03));
    const cl_ = []; for (let i = 0; i < 4; i++) { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.12), BM(0xfff6e0)); p.rotation.x = Math.PI / 2; p.position.set(-1.5 + i * 1.5, 2.84, -0.8); S.add(p); }
    // dispenser
    const disp = new THREE.Group(); disp.position.set(1.15, 0.12, -1.35); S.add(disp);
    rbox(0.6, 1.5, 0.45, SM(0xffffff, 0.5), 0, 0.75, 0, 0.04, disp); rbox(0.62, 0.3, 0.47, new THREE.MeshBasicMaterial({ color: 0x1fa463, toneMapped: false }), 0, 1.35, 0, 0.03, disp);
    const scrT = K.canvasTex(128, 96, (x, w, h) => { x.fillStyle = '#0a1a10'; x.fillRect(0, 0, w, h); x.fillStyle = '#5aff8a'; x.font = '700 30px monospace'; x.fillText('₹ 250', 10, 40); x.fillText('2.37 L', 10, 80); });
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.28), new THREE.MeshBasicMaterial({ map: scrT, toneMapped: false })); scr.position.set(0, 0.95, 0.226); disp.add(scr);
    const noz = rbox(0.06, 0.2, 0.08, SM(0x222222, 0.4), -0.25, 0.7, 0.24, 0.02, disp);
    // the "no mobile" board
    const signT = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = '#222'; x.beginPath(); x.roundRect(96, 50, 64, 120, 10); x.fill(); x.fillStyle = '#9ad'; x.fillRect(104, 66, 48, 84); x.strokeStyle = '#e5484d'; x.lineWidth = 18; x.beginPath(); x.arc(128, 110, 84, 0, 7); x.stroke(); x.beginPath(); x.moveTo(68, 50); x.lineTo(188, 170); x.stroke(); x.fillStyle = '#e5484d'; x.font = '900 28px sans-serif'; x.textAlign = 'center'; x.fillText('NO MOBILE', 128, 230); });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshStandardMaterial({ map: signT, roughness: 0.6 })); sign.position.set(-1.1, 1.9, -2.15); S.add(sign); rbox(0.05, 1.7, 0.05, SM(0x666666, 0.5), -1.1, 0.85, -2.2, 0.01);
    // Maddie's scooty (front toward the camera)
    const scoot = new THREE.Group(); scoot.position.set(-0.2, 0, -0.95); S.add(scoot); const sc1 = SM(0x2a6fd6, 0.35, { metalness: 0.3 }), blk = SM(0x1d1f24, 0.6);
    rbox(0.32, 0.12, 0.62, blk, 0, 0.5, -0.05, 0.05, scoot); rbox(0.34, 0.25, 0.75, sc1, 0, 0.32, -0.1, 0.08, scoot); rbox(0.3, 0.1, 0.4, sc1, 0, 0.18, 0.35, 0.04, scoot);
    const apron = rbox(0.36, 0.75, 0.1, sc1, 0, 0.55, 0.55, 0.06, scoot); apron.rotation.x = 0.25;
    const bar = rbox(0.6, 0.04, 0.04, SM(0x999999, 0.3, { metalness: 0.7 }), 0, 0.98, 0.5, 0.02, scoot); const hl = new THREE.Mesh(new THREE.CircleGeometry(0.05, 16), BM(0xfff6d0)); hl.position.set(0, 0.88, 0.62); scoot.add(hl);
    [0.55, -0.5].forEach(z => { const w = cyl(0.17, 0.17, 0.1, blk, 0, 0.17, z, 20, scoot); w.rotation.z = Math.PI / 2; });

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

    const hemi = new THREE.HemisphereLight(0xffe2cc, 0x30303a, 0.75); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff4e6, 1.2); key.position.set(0.5, 2.8, 1.5); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.6); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const rimP = new THREE.DirectionalLight(0xff8a5a, 0.8); rimP.position.set(-2, 2, -4); S.add(rimP);

    // ================= EXPLAINER WORLD =================

    // ===== the experiment forecourt (x = PX): a car, petrol vapour, a phone, and a person full of static =====
    const PX = 40;
    const fc = new THREE.Group(); fc.position.x = PX; S.add(fc);
    const fBg = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ map: skyT, side: THREE.BackSide, fog: false })); fBg.position.y = -3; fc.add(fBg);
    const fG = new THREE.Mesh(new THREE.CircleGeometry(7, 48), SM(0x5d6168, 0.9)); fG.rotation.x = -Math.PI / 2; fG.receiveShadow = true; fc.add(fG);
    const car = new THREE.Group(); fc.add(car); const carM = SM(0xd94f5c, 0.35, { metalness: 0.3 });
    rbox(2.2, 0.5, 1.0, carM, 0, 0.45, 0, 0.12, car); rbox(1.2, 0.42, 0.92, SM(0x9fc7e8, 0.15, { metalness: 0.3 }), 0.1, 0.88, 0, 0.12, car); rbox(1.22, 0.06, 0.94, carM, 0.1, 1.1, 0, 0.03, car);
    [[-0.7, 0.5], [0.7, 0.5], [-0.7, -0.5], [0.7, -0.5]].forEach(([x, z]) => { const w = cyl(0.2, 0.2, 0.14, SM(0x1d1f24, 0.6), x, 0.2, z, 20, car); w.rotation.x = Math.PI / 2; });
    const door = rbox(0.55, 0.42, 0.03, carM, 0.25, 0.48, 0.51, 0.04, car);
    const fill = new THREE.Mesh(new THREE.CircleGeometry(0.06, 16), SM(0x111111, 0.5)); fill.position.set(-0.85, 0.58, 0.505); car.add(fill);
    const pump2 = new THREE.Group(); pump2.position.set(-1.7, 0, 0.9); fc.add(pump2); rbox(0.5, 1.4, 0.4, SM(0xffffff, 0.5), 0, 0.7, 0, 0.04, pump2); rbox(0.52, 0.26, 0.42, new THREE.MeshBasicMaterial({ color: 0x1fa463, toneMapped: false }), 0, 1.26, 0, 0.03, pump2);
    const nozz = rbox(0.06, 0.08, 0.2, SM(0x222222, 0.4), -0.85, 0.6, 0.6, 0.02, fc);
    const hose = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V(-1.6, 0.9, 0.9), V(-1.4, 0.35, 0.95), V(-1.05, 0.4, 0.8), V(-0.85, 0.6, 0.68)]), 24, 0.025, 8), SM(0x111111, 0.6)); fc.add(hose);
    // vapour
    const vTex = K.canvasTex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 64, 4, 64, 64, 62); g.addColorStop(0, 'rgba(160,255,140,0.55)'); g.addColorStop(1, 'rgba(160,255,140,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const vap = Array.from({ length: 16 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: vTex, transparent: true, depthWrite: false, opacity: 0 })); fc.add(s); return { s, o: [rng() - 0.5, rng(), rng() - 0.5], p: rng() * 6 }; });
    // a phone, ringing right in the vapour
    const phone = new THREE.Group(); fc.add(phone); rbox(0.09, 0.17, 0.015, SM(0x1b1d24, 0.3), 0, 0, 0, 0.012, phone); const phS = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.15), new THREE.MeshBasicMaterial({ color: 0x6fd8ff, toneMapped: false })); phS.position.z = 0.009; phone.add(phS);
    const ringT = K.canvasTex(128, 128, (x, w, h) => { x.strokeStyle = 'rgba(111,216,255,0.9)'; x.lineWidth = 6; x.beginPath(); x.arc(64, 64, 58, 0, 7); x.stroke(); });
    const rings = [0, 1, 2].map(() => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: ringT, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); fc.add(s); return s; });
    // the person
    const per = new THREE.Group(); fc.add(per); const pBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.45, 6, 12), SM(0x4f7fd9, 0.6)); pBody.position.y = 0.55; per.add(pBody);
    const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), SM(0xd8a47c, 0.6)); pHead.position.y = 1.0; per.add(pHead); const pHair = new THREE.Mesh(new THREE.SphereGeometry(0.125, 16, 8, 0, 6.283, 0, 1.3), SM(0x2a1c15, 0.7)); pHair.position.y = 1.02; per.add(pHair); [-0.045, 0.045].forEach(x => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), BM(0x111111)); e.position.set(x, 1.02, 0.11); per.add(e); });
    const pArm = new THREE.Group(); pArm.position.set(-0.12, 0.75, 0); per.add(pArm); const pa = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.3, 4, 8), SM(0x4f7fd9, 0.6)); pa.position.y = -0.17; pArm.add(pa);
    [-0.06, 0.06].forEach(x => { const l = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.25, 4, 8), SM(0x2b2f3a, 0.6)); l.position.set(x, 0.18, 0); per.add(l); });
    const plusT = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#ffd34a'; x.font = '900 56px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+', 32, 36); });
    const pluses = Array.from({ length: 14 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: plusT, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); s.scale.setScalar(0.1); per.add(s); return { s, a: rng() * 6.283, y: 0.2 + rng() * 0.9 }; });
    const spkT = K.canvasTex(128, 128, (x, w, h) => { x.strokeStyle = '#fff6a0'; x.lineWidth = 8; x.shadowColor = '#ffd34a'; x.shadowBlur = 16; x.beginPath(); x.moveTo(70, 8); x.lineTo(46, 62); x.lineTo(74, 62); x.lineTo(50, 120); x.stroke(); });
    const spark = new THREE.Sprite(new THREE.SpriteMaterial({ map: spkT, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); spark.scale.setScalar(0.22); spark.position.set(-0.85, 0.62, 0.72); fc.add(spark);
    const fireT = K.canvasTex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 80, 4, 64, 64, 62); g.addColorStop(0, 'rgba(255,240,160,1)'); g.addColorStop(0.4, 'rgba(255,140,40,0.85)'); g.addColorStop(1, 'rgba(255,60,0,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const fire = Array.from({ length: 10 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: fireT, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); fc.add(s); return { s, o: [rng() - 0.5, rng(), rng() - 0.5] }; });
    const fKey = new THREE.DirectionalLight(0xfff0e0, 1.4); fKey.position.set(PX + 1, 3, 4); fKey.target.position.set(PX - 0.4, 0.6, 0.5); fKey.castShadow = true; fKey.shadow.mapSize.set(2048, 2048); fKey.shadow.camera.left = -4; fKey.shadow.camera.right = 4; fKey.shadow.camera.top = 4; fKey.shadow.camera.bottom = -4; S.add(fKey); S.add(fKey.target);
    const fHemi = new THREE.HemisphereLight(0xffd9c2, 0x30303a, 0.5); fHemi.position.set(PX, 4, 0); S.add(fHemi);
    const fireL = new THREE.PointLight(0xff8a30, 0, 3, 1.4); fireL.position.set(PX - 0.85, 0.8, 0.9); S.add(fireL);

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const FACE = { hook: 'worried', board: 'shock', shock: 'neutral', innocent: 'shock' };
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

      // vapour shimmering at the filler
      const vOn = t >= C.twist ? 1 : 0, vBig = t >= C.vapour ? 1.6 : 1;
      vap.forEach((v, i) => { const q = (t * 0.25 + v.p) % 1; v.s.position.set(-0.85 + v.o[0] * 0.3 * vBig, 0.6 + q * 0.45 * vBig, 0.75 + v.o[2] * 0.25 * vBig); v.s.scale.setScalar(0.25 * vBig * (0.7 + q)); v.s.material.opacity = vOn * Math.sin(q * Math.PI) * 0.8; });
      // the phone test: rings in the vapour, nothing happens
      const phOn = t >= C.twist && t < C.static; phone.visible = phOn; phone.position.set(-0.6, 0.78, 0.85); phone.rotation.set(0, -0.3, Math.sin(t * 40) * 0.08 * (phOn ? 1 : 0));
      rings.forEach((r, i) => { const q = (t * 0.9 + i / 3) % 1; r.position.copy(phone.position); r.scale.setScalar(0.1 + q * 0.4); r.material.opacity = phOn ? (1 - q) * 0.8 : 0; });
      // the person: stands at the nozzle, gets back in the car, charges up, comes back, touches the nozzle → spark
      const t0 = C.nozzle + 2.3; const q = t - t0; let px = -0.25, pz = 1.05, inCar = false;
      if (t >= C.nozzle) { if (q < 0) {} else if (q < 1.0) { px = lerp(-0.25, 0.3, q); pz = lerp(1.05, 0.85, q); } else if (q < 2.2) { px = 0.3; pz = 0.35; inCar = true; } else if (q < 3.2) { const k = q - 2.2; px = lerp(0.3, -0.45, k); pz = lerp(0.85, 1.0, k); } else { px = -0.45; pz = 1.0; } }
      per.position.set(px, inCar ? 0.15 : 0, pz); per.rotation.y = t >= C.nozzle && q > 0 && q < 1 ? -1.3 : t >= C.nozzle && q > 2.2 && q < 3.2 ? 1.3 : 0.3; per.visible = t >= C.static;
      door.rotation.y = t >= C.nozzle && q > 0.8 && q < 2.4 ? -0.9 : 0; door.position.x = t >= C.nozzle && q > 0.8 && q < 2.4 ? 0.0 : 0.25;
      const touch = t >= C.nozzle && q > 3.2; pArm.rotation.x = touch ? -1.2 : 0;
      let charge = 0; if (t >= C.static && t < C.nozzle) charge = pr(t, C.static + 0.6, C.static + 1.6) * 0.6; if (t >= C.nozzle && q > 1.0) charge = q < 3.4 ? pr(q, 1.0, 2.2) : 0;
      pluses.forEach((p, i) => { p.s.position.set(Math.cos(p.a + t * 2) * 0.22, p.y, Math.sin(p.a + t * 2) * 0.22); p.s.material.opacity = i / pluses.length < charge ? 1 : 0; });
      const sT = t >= C.nozzle ? t0 + 3.4 : C.vapour + 2.6; const sq = t - sT; spark.material.opacity = sq > 0 && sq < 0.35 && t < C.innocent ? 1 - sq / 0.35 : 0; spark.scale.setScalar(0.22 * (1 + Math.random() * 0.3));
      const fq = t - (t0 + 3.45), fOn = t >= C.nozzle && fq > 0 && fq < 1.4;
      fire.forEach(f => { f.s.position.set(-0.85 + f.o[0] * 0.35, 0.7 + f.o[1] * 0.5 * cl(fq * 3), 0.95 + f.o[2] * 0.2); f.s.scale.setScalar(0.7 * eo(cl(fq * 3)) * (1 - pr(fq, 0.9, 1.4))); f.s.material.opacity = fOn ? 0.95 : 0; });
      fireL.intensity = fOn ? 9 * (1 - pr(fq, 0.9, 1.4)) : 0;

    };
    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.4, RY + 0.26, -0.8];
    const sh = {
      mad: [P([0.42, 1.46, 1.55], [-0.28, 1.4, -0.94], 32), P([0.38, 1.45, 1.35], [-0.28, 1.4, -0.94], 32)],
      two: [P([0.45, 1.45, 2.1], [-0.05, 1.2, -0.9], 40), P([0.4, 1.42, 1.85], [-0.05, 1.2, -0.9], 40)],
      robo: [P([-0.05, RY + 0.36, 0.75], RHL, 32), P([-0.02, RY + 0.35, 0.6], RHL, 32)],
      cta: [P([0.5, 1.5, 2.6], [-0.05, 1.25, -0.9], 42), P([0.45, 1.48, 2.3], [-0.05, 1.25, -0.9], 42)],

      pump: [P([-1.0, 1.7, 0.4], [-1.05, 1.8, -2.15], 40), P([-1.0, 1.75, 0.0], [-1.08, 1.85, -2.15], 40)],
      lab: [P([PX - 0.3, 1.2, 3.6], [PX - 0.4, 0.65, 0.4], 42), P([PX - 0.4, 1.1, 3.2], [PX - 0.5, 0.65, 0.4], 42)],
      ph: [P([PX - 0.45, 0.95, 2.1], [PX - 0.7, 0.75, 0.8], 38), P([PX - 0.5, 0.9, 1.8], [PX - 0.7, 0.75, 0.8], 38)],
      vap: [P([PX - 0.6, 1.0, 2.3], [PX - 0.8, 0.75, 0.75], 40), P([PX - 0.65, 0.95, 2.0], [PX - 0.82, 0.75, 0.75], 40)],
      wide: [P([PX - 0.4, 1.4, 4.6], [PX - 0.45, 0.65, 0.6], 44), P([PX - 0.45, 1.35, 4.3], [PX - 0.5, 0.65, 0.6], 44)],

    };
    const PLAN = [[0, 'two'], [2.2, 'pump'], [C.twist, 'ph'], [C.board, 'mad'], [C.rumour, 'pump'], [C.static, 'lab'], [C.shock, 'mad'], [C.vapour, 'vap'], [C.nozzle, 'wide'], [C.innocent + 0.9, 'mad'], [C.follow, 'two'], [C.cta, 'cta']];
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

      label(t, 0.8, C.twist, '⛽ the "no mobile" board at every pump');
      if (t >= C.twist + 1.2 && t < C.board) stamp('PHONE FIRES CONFIRMED: 0', 540, 300, 48, '#2fbf71', C.twist + 1.2, t, -0.05, 'rgba(255,255,255,0.95)');
      if (t >= C.rumour + 0.3 && t < C.static) { chip('📰 an old rumour', 540, 230, 38, DARK, '#ffd34a', fin(t, C.rumour + 0.3, 0.3), pop(t, C.rumour + 0.3, 0.35)); chip('📵 phones distract you near fuel', 540, 320, 38, DARK, '#9fd8ff', fin(t, B('rumour') + 2.0, 0.3), pop(t, B('rumour') + 2.0, 0.35)); }
      if (t >= C.static + 0.8 && t < C.shock) stamp('⚡ STATIC ELECTRICITY', 540, 300, 54, '#ffd34a', C.static + 0.8, t, -0.05, 'rgba(10,14,40,0.95)');
      label(t, C.vapour + 0.3, C.nozzle, '💨 petrol vapour + ⚡ one spark', '#e2711d');
      label(t, C.nozzle + 0.7, C.innocent, '🚗 back in the car → ⚡ charged → touches nozzle', '#e5484d');
      if (t >= C.follow + 0.3 && t < C.cta) { chip('✅ still follow the pump rules', 540, 230, 38, DARK, '#9dff7a', fin(t, C.follow + 0.3, 0.3), pop(t, C.follow + 0.3, 0.35)); chip('🚭 never smoke there', 540, 320, 38, DARK, '#ff7a85', fin(t, B('follow') + 2.0, 0.3), pop(t, B('follow') + 2.0, 0.35)); }
      endCard(t, '⛽ The real risk: static, not phones', 'don\'t get back in mid-fill', '📤 Send to your "it\'ll blast" friend');

    };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), gr = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,10,0.32)'); x.fillStyle = gr; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.twist, C.static, C.vapour, C.nozzle, C.cta];
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

    sfx.push(['chime', 0.3, 0.2], ['whoosh', 2.2, 0.25]); for (let t2 = C.twist + 0.2; t2 < C.twist + 1.2; t2 += 0.3) sfx.push(['beep', t2, 0.15]); sfx.push(['ding', C.twist + 1.2, 0.35]);
    sfx.push(['boing', C.board, 0.2], ['chime', B('rumour') + 2.0, 0.25], ['zap', C.static + 0.8, 0.3], ['boing', C.shock, 0.2], ['riser', C.vapour + 0.3, 0.2], ['zap', C.vapour + 2.6, 0.25]);
    sfx.push(['whoosh', C.nozzle + 2.3, 0.2], ['thud', C.nozzle + 3.1, 0.2], ['riser', C.nozzle + 3.3, 0.2], ['zap', C.nozzle + 5.7, 0.4], ['whoosh', C.nozzle + 5.75, 0.4], ['bass', C.nozzle + 5.75, 0.4]);
    sfx.push(['boing', C.innocent, 0.2], ['chime', C.follow + 0.3, 0.25], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
