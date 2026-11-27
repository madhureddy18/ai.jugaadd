/* @maddiee.makess 'Why?' series — the X on the last coach (Ministry of Railways: X/LV board/red lamp = whole train has passed, no coaches left behind). */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x2a2540, fog: [10, 40], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
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

    const rng = K.rng(937);
    const C = {}; window.SCENE.lines.forEach(l => C[l.id] = B(l.id) - 0.1);
    const RY = 0.62; const dummy = new THREE.Object3D();
    // ================= HOME SET =================

    // evening railway platform: Maddie on a bench, track behind him
    const platTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#9c978c'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(60,55,50,0.35)'; x.lineWidth = 3; for (let i = 0; i <= w; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); } });
    platTex.wrapS = platTex.wrapT = THREE.RepeatWrapping; platTex.repeat.set(15, 6);
    const plat = new THREE.Mesh(new THREE.BoxGeometry(30, 1.0, 5.4), new THREE.MeshStandardMaterial({ map: platTex, roughness: 0.85 })); plat.position.set(0, -0.5, 0.25); plat.receiveShadow = true; S.add(plat);
    const edge = new THREE.Mesh(new THREE.PlaneGeometry(30, 0.22), SM(0xf2c230, 0.6)); edge.rotation.x = -Math.PI / 2; edge.position.set(0, 0.003, -2.2); S.add(edge);
    const bed = new THREE.Mesh(new THREE.PlaneGeometry(30, 4), SM(0x5a4b3e, 1)); bed.rotation.x = -Math.PI / 2; bed.position.set(0, -1.0, -3.9); S.add(bed);
    [-4.4, -3.0].forEach(z => { const r = new THREE.Mesh(new THREE.BoxGeometry(30, 0.08, 0.08), SM(0xa9adb3, 0.3, { metalness: 0.8 })); r.position.set(0, -0.92, z); S.add(r); });
    const farTex = K.canvasTex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2b2a5c'); g.addColorStop(0.5, '#c9637a'); g.addColorStop(0.75, '#ffb36b'); g.addColorStop(1, '#3a2a3a'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const far = new THREE.Mesh(new THREE.PlaneGeometry(34, 14), new THREE.MeshBasicMaterial({ map: farTex, fog: false })); far.position.set(0, 3, -14); S.add(far);
    for (let i = 0; i < 12; i++) { const hgt = 1 + rng() * 4; const b = new THREE.Mesh(new THREE.BoxGeometry(1.5 + rng() * 2, hgt, 1), SM(0x2a2540, 0.9)); b.position.set(-14 + i * 2.4, -1 + hgt / 2, -11); S.add(b); }
    const roof = new THREE.Mesh(new THREE.BoxGeometry(30, 0.12, 4.2), SM(0x6b2f2f, 0.7)); roof.position.set(0, 3.1, 0.2); S.add(roof);
    [-3.2, 2.6, 8.4, -9].forEach(x => { cyl(0.08, 0.08, 3.1, SM(0x3d4a5c, 0.5, { metalness: 0.4 }), x, 1.55, -1.7, 12); });
    const lamps = []; [-3.2, 2.6].forEach(x => { const l = new THREE.PointLight(0xffd08a, 1.4, 6, 1.5); l.position.set(x, 2.8, -1.2); S.add(l); lamps.push(l); const b = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.16), BM(0xfff1c8)); b.position.set(x, 3.02, -1.2); S.add(b); });
    const boardTex = K.canvasTex(512, 128, (x, w, h) => { x.fillStyle = '#f4d23a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#111'; x.lineWidth = 8; x.strokeRect(6, 6, w - 12, h - 12); x.fillStyle = '#111'; x.font = '800 60px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HYDERABAD JN', w / 2, h / 2 + 3); });
    const board = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.6 })); board.position.set(-1.6, 2.55, -1.65); S.add(board);
    // bench
    const wood = SM(0x8a5a35, 0.7), iron = SM(0x2c2f36, 0.5, { metalness: 0.5 });
    rbox(1.7, 0.07, 0.5, wood, 0.1, 0.5, -0.95, 0.02); rbox(1.7, 0.4, 0.06, wood, 0.1, 0.82, -1.22, 0.02); [-0.65, 0.85].forEach(x => { rbox(0.06, 0.5, 0.45, iron, x, 0.25, -0.95, 0.01); });
    // the big train: Indian-blue coaches; the last coach has the yellow X, LV board and red lamp
    const coachTex = K.canvasTex(1024, 256, (x, w, h) => { x.fillStyle = '#2a4f9e'; x.fillRect(0, 0, w, h); x.fillStyle = '#e9e2c8'; x.fillRect(0, 70, w, 10); x.fillRect(0, 190, w, 8);
      for (let i = 0; i < 9; i++) { const px = 90 + i * 96; x.fillStyle = '#0d1a33'; x.fillRect(px, 96, 64, 70); x.strokeStyle = '#9aa3b5'; x.lineWidth = 3; for (let k = 1; k < 5; k++) { x.beginPath(); x.moveTo(px, 96 + k * 14); x.lineTo(px + 64, 96 + k * 14); x.stroke(); } }
      x.fillStyle = '#1c3a7a'; x.fillRect(20, 90, 50, 150); x.fillRect(w - 70, 90, 50, 150); });
    const rearTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#2a4f9e'; x.fillRect(0, 0, w, h); x.strokeStyle = '#ffd400'; x.lineWidth = 26; x.lineCap = 'square'; x.beginPath(); x.moveTo(60, 60); x.lineTo(196, 196); x.moveTo(196, 60); x.lineTo(60, 196); x.stroke(); x.strokeStyle = '#fff'; x.lineWidth = 6; x.beginPath(); x.moveTo(60, 60); x.lineTo(196, 196); x.moveTo(196, 60); x.lineTo(60, 196); x.stroke(); });
    const plainEnd = SM(0x24478f, 0.6), roofM = SM(0x8c929c, 0.5);
    const mkCoach = (last, scale = 1) => { const g = new THREE.Group(); const side = new THREE.MeshStandardMaterial({ map: coachTex, roughness: 0.55 });
      const mats = [last ? new THREE.MeshStandardMaterial({ map: rearTex, roughness: 0.5, emissive: 0x332200, emissiveIntensity: 0.3 }) : plainEnd, plainEnd, roofM, plainEnd, side, side];
      const b = new THREE.Mesh(new THREE.BoxGeometry(10, 3, 3), mats); b.castShadow = true; g.add(b);
      [-3.5, 3.5].forEach(x => { const wh = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 2.6), SM(0x222326, 0.6)); wh.position.set(x, -1.75, 0); g.add(wh); });
      let lamp = null, lv = null;
      if (last) { lamp = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), new THREE.MeshBasicMaterial({ color: 0xff2020, toneMapped: false })); lamp.position.set(5.05, -0.95, 0); g.add(lamp);
        const lvT = K.canvasTex(128, 96, (x, w, h) => { x.fillStyle = '#ffd400'; x.fillRect(0, 0, w, h); x.fillStyle = '#111'; x.font = '900 64px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LV', w / 2, h / 2 + 4); });
        lv = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.52), new THREE.MeshBasicMaterial({ map: lvT, toneMapped: false })); lv.rotation.y = Math.PI / 2; lv.position.set(5.03, -0.9, 0.95); g.add(lv); }
      g.scale.setScalar(scale); return { g, lamp, lv }; };
    const NC = 7, train = []; for (let i = 0; i < NC; i++) { const c = mkCoach(i === NC - 1); c.g.position.set(0, 0.85, -3.7); S.add(c.g); train.push(c); }
    const placeBig = xh => train.forEach((c, i) => { c.g.position.x = xh + 5 + i * 10.25; c.g.visible = Math.abs(c.g.position.x) < 22; });

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

    const hemi = new THREE.HemisphereLight(0xffd9c2, 0x3a2a40, 0.75); S.add(hemi);
    const key = new THREE.DirectionalLight(0xffc89a, 1.2); key.position.set(-2.5, 3, 2.5); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -4; key.shadow.camera.right = 4; key.shadow.camera.top = 4; key.shadow.camera.bottom = -4; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.6); front.position.set(0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const rimP = new THREE.DirectionalLight(0xff8fb0, 0.7); rimP.position.set(-2, 2, -4); S.add(rimP);

    // ================= EXPLAINER WORLD =================

    // ===== diorama (x = TX): station, station master, signal, a model train =====
    const TX = 40, ST = 6;
    const dio = new THREE.Group(); dio.position.x = TX; S.add(dio);
    const grass = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), SM(0x6f9a52, 0.95)); grass.rotation.x = -Math.PI / 2; grass.receiveShadow = true; dio.add(grass);
    const dSky = new THREE.Mesh(new THREE.SphereGeometry(28, 32, 16), new THREE.MeshBasicMaterial({ map: farTex, fog: false, side: THREE.BackSide })); dSky.position.set(0, -4, 0); dio.add(dSky);
    const ballast = new THREE.Mesh(new THREE.PlaneGeometry(60, 0.7), SM(0x7a6a5a, 1)); ballast.rotation.x = -Math.PI / 2; ballast.position.y = 0.005; dio.add(ballast);
    const slp = new THREE.InstancedMesh(new THREE.BoxGeometry(0.08, 0.03, 0.55), SM(0x5a4030, 0.9), 300); slp.frustumCulled = false;
    for (let i = 0; i < 300; i++) { dummy.position.set(-30 + i * 0.2, 0.02, 0); dummy.updateMatrix(); slp.setMatrixAt(i, dummy.matrix); } dio.add(slp);
    [-0.18, 0.18].forEach(z => { const r = new THREE.Mesh(new THREE.BoxGeometry(60, 0.03, 0.03), SM(0xb8bcc4, 0.3, { metalness: 0.8 })); r.position.set(0, 0.05, z); dio.add(r); });
    rbox(3.2, 0.16, 0.9, SM(0xb7b0a2, 0.8), ST, 0.08, -0.85, 0.02, dio);
    const stB = rbox(1.0, 0.5, 0.5, SM(0xd9b48a, 0.7), ST - 0.6, 0.41, -1.5, 0.03, dio); rbox(1.15, 0.06, 0.65, SM(0x8b3a3a, 0.6), ST - 0.6, 0.69, -1.5, 0.02, dio);
    const sm_ = new THREE.Group(); sm_.position.set(ST + 0.6, 0.16, -0.75); dio.add(sm_);
    const smBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.22, 6, 12), SM(0xf2f2f2, 0.6)); smBody.position.y = 0.22; sm_.add(smBody);
    const smHead = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 12), SM(0xd8a47c, 0.6)); smHead.position.y = 0.48; sm_.add(smHead);
    const cap = cyl(0.09, 0.09, 0.05, SM(0x1d2a4a, 0.5), 0, 0.56, 0, 16, sm_);
    const arm = new THREE.Group(); arm.position.set(0.09, 0.32, 0); sm_.add(arm); const armM = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.16, 4, 8), SM(0xf2f2f2, 0.6)); armM.position.y = 0.09; arm.add(armM);
    const flagM = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide, toneMapped: false }); const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.11), flagM); flag.position.set(0.08, 0.2, 0); arm.add(flag);
    const sigP = cyl(0.025, 0.025, 1.2, SM(0x333333, 0.5), ST + 2.6, 0.6, -0.55, 8, dio); const sigBox = rbox(0.14, 0.3, 0.1, SM(0x111111, 0.5), ST + 2.6, 1.25, -0.5, 0.02, dio);
    const sigG = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), new THREE.MeshBasicMaterial({ color: 0x22c55e, toneMapped: false })); sigG.position.set(ST + 2.6, 1.18, -0.44); dio.add(sigG);
    const sigR = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), new THREE.MeshBasicMaterial({ color: 0x331010, toneMapped: false })); sigR.position.set(ST + 2.6, 1.32, -0.44); dio.add(sigR);
    for (let i = 0; i < 14; i++) { const tr = new THREE.Group(); tr.position.set(-14 + i * 2.3 + rng(), 0, -3 - rng() * 3); dio.add(tr); cyl(0.05, 0.07, 0.5, SM(0x6b4a2b, 0.9), 0, 0.25, 0, 8, tr); sph(0.35 + rng() * 0.2, SM(0x3f7a3a, 0.8), 0, 0.75, 0, tr); }
    const SC = 0.13, mk = last => { const c = mkCoach(last, SC); c.g.position.y = 0.32; dio.add(c.g); return c; };
    const engT = K.canvasTex(256, 128, (x, w, h) => { x.fillStyle = '#c0392b'; x.fillRect(0, 0, w, h); x.fillStyle = '#f2c230'; x.fillRect(0, 70, w, 10); });
    const mkEng = () => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.4, 0.4), new THREE.MeshStandardMaterial({ map: engT, roughness: 0.5 })); b.position.y = 0.32; b.castShadow = true; g.add(b); const cab = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.38), SM(0x8f2a20, 0.5)); cab.position.set(0.4, 0.58, 0); g.add(cab); dio.add(g); return g; };
    const eng = mkEng(), dc = [0, 1, 2, 3, 4].map(i => mk(i === 4)), eng2 = mkEng(), sc2 = [0, 1].map(() => mk(false));
    const placeTrain = (xe, det = null) => { eng.position.x = xe; dc.forEach((c, i) => { c.g.position.x = (det && i >= 3) ? det[i - 3] : xe - 1.32 * (i + 1); c.g.position.z = 0; }); };
    const tickTex = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#2fbf71'; x.beginPath(); x.arc(32, 32, 28, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(18, 33); x.lineTo(28, 43); x.lineTo(46, 22); x.stroke(); });
    const ticks = dc.map(() => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tickTex, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); s.scale.setScalar(0.3); dio.add(s); return s; });
    const sparkTex = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 1, 32, 32, 30); g.addColorStop(0, 'rgba(255,240,180,1)'); g.addColorStop(0.4, 'rgba(255,160,40,0.7)'); g.addColorStop(1, 'rgba(255,120,0,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sparks = Array.from({ length: 24 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTex, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); s.scale.setScalar(0.12); dio.add(s); return { s, v: [rng() * 2 - 1, rng() * 2, rng() * 2 - 1] }; });
    const warnTex = K.canvasTex(256, 128, (x, w, h) => { x.fillStyle = '#e5484d'; x.beginPath(); x.roundRect(4, 4, w - 8, h - 8, 30); x.fill(); x.fillStyle = '#fff'; x.font = '900 56px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NO X!', w / 2, h / 2 + 4); });
    const warn = new THREE.Sprite(new THREE.SpriteMaterial({ map: warnTex, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); warn.scale.set(0.9, 0.45, 1); warn.position.set(ST - 0.1, 1.15, -0.6); dio.add(warn);
    const dSun = new THREE.DirectionalLight(0xffd2a8, 1.6); dSun.position.set(TX - 4, 6, 5); dSun.target.position.set(TX + 2, 0, 0); dSun.castShadow = true; dSun.shadow.mapSize.set(2048, 2048); dSun.shadow.camera.left = -10; dSun.shadow.camera.right = 10; dSun.shadow.camera.top = 10; dSun.shadow.camera.bottom = -10; S.add(dSun); S.add(dSun.target);
    const dHemi = new THREE.HemisphereLight(0xffe0c8, 0x445533, 0.5); dHemi.position.set(TX, 5, 0); S.add(dHemi);

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const FACE = { hook: 'worried', bye: 'neutral', left: 'shock', oneletter: 'shock', style: 'neutral' };
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

      // home train: rushes past in the hook, parked with its rear on show from the LV line on
      if (t < C.safety + 0.3) placeBig(-71.9 - 12 * (t - 3.2)); else if (t >= C.lv) placeBig(-70); else placeBig(-500);
      const tail = train[NC - 1]; tail.lamp.material.color.setHex(Math.floor(t * 2.5) % 2 ? 0xff2020 : 0x330505);
      // diorama
      let xe = -100, det = null; const TB = B('breaks') + 1.0;
      if (t >= C.looks && t < C.bye + 0.2) xe = -2.3 + (t - C.looks) * 7;
      else if (t >= C.whole && t < C.left + 0.2) xe = -3 + (t - C.whole) * 3.6;
      else if (t >= C.breaks) { const tt = t - C.breaks, tb = TB - C.breaks; xe = -4 + tt * 3.6;
        if (t >= TB) { const x0 = -4 + tb * 3.6, T = 1.6, q = Math.min(t - TB, T); const dx = 3.6 * (q - q * q / (2 * T)); det = [x0 - 1.32 * 4 + dx, x0 - 1.32 * 5 + dx]; } }
      placeTrain(xe, det); eng.visible = dc[0].g.visible = xe > -60;
      dc.forEach((c, i) => { c.g.visible = xe > -60; const pass = c.g.position.x > ST + 0.6 && t >= C.whole && t < C.left + 0.2; const tk = ticks[i]; tk.position.set(c.g.position.x, 0.95, 0); tk.material.opacity = pass ? 1 : 0; });
      // the X is seen → green flag;  NO X → red flag, signal red, second train stops short
      const alarm = t >= C.nox + 0.2 && t < C.oneletter + 0.5;
      flagM.color.setHex(alarm ? 0xff2020 : 0x22c55e); arm.rotation.z = alarm ? -2.6 + Math.sin(t * 14) * 0.4 : (t >= C.looks ? -1.2 + Math.sin(t * 4) * 0.2 : 0);
      sigG.material.color.setHex(alarm ? 0x0a2a14 : 0x22c55e); sigR.material.color.setHex(alarm ? 0xff2020 : 0x331010);
      warn.material.opacity = alarm ? 1 : 0; warn.scale.set(0.9 * (1 + 0.08 * Math.sin(t * 10)), 0.45 * (1 + 0.08 * Math.sin(t * 10)), 1);
      const tt2 = t - (C.nox + 0.8), stopX = det ? det[1] - 1.7 : -12; let x2 = -100;
      if (t >= C.nox + 0.8 && t < C.oneletter + 0.5) { const T = 2.4, q = Math.min(tt2, T); x2 = stopX - 6 * (1 - (q / T)) * (1 - (q / T)) * 1.0 - 0.0; x2 = stopX - 6 * Math.pow(1 - q / T, 2); }
      eng2.position.x = x2; sc2.forEach((c, i) => { c.g.position.x = x2 - 1.32 * (i + 1); });
      sparks.forEach((p, i) => { const q = t - TB; const on = q > 0 && q < 0.8; const x0 = det ? det[0] + 0.66 : 0; p.s.position.set(x0 + p.v[0] * q * 0.8, 0.35 + p.v[1] * q * 0.7 - q * q, p.v[2] * q * 0.5); p.s.material.opacity = on ? 1 - q / 0.8 : 0; });

    };
    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.4, RY + 0.26, -0.8];
    const sh = {
      mad: [P([0.42, 1.46, 1.55], [-0.28, 1.4, -0.94], 32), P([0.38, 1.45, 1.35], [-0.28, 1.4, -0.94], 32)],
      two: [P([0.45, 1.45, 2.1], [-0.05, 1.2, -0.9], 40), P([0.4, 1.42, 1.85], [-0.05, 1.2, -0.9], 40)],
      robo: [P([-0.05, RY + 0.36, 0.75], RHL, 32), P([-0.02, RY + 0.35, 0.6], RHL, 32)],
      cta: [P([0.5, 1.5, 2.6], [-0.05, 1.25, -0.9], 42), P([0.45, 1.48, 2.3], [-0.05, 1.25, -0.9], 42)],

      plat: [P([0.9, 1.35, 2.8], [-0.4, 1.0, -2.2], 46), P([0.8, 1.38, 2.4], [-0.3, 1.05, -2.2], 44)],
      dio: [P([TX + 12.5, 1.1, 0.7], [TX + 4.0, 0.4, -0.5], 48), P([TX + 12.0, 1.05, 0.65], [TX + 4.0, 0.4, -0.5], 48)],
      dio2: [P([TX + 7.4, 0.95, 3.4], [TX + 6.2, 0.45, -0.6], 42), P([TX + 7.2, 0.9, 3.0], [TX + 6.2, 0.45, -0.6], 42)],
      dioB: [P([TX - 3.6, 1.2, 3.2], [TX - 4.7, 0.35, 0], 42), P([TX - 4.0, 1.05, 2.8], [TX - 4.8, 0.35, 0], 42)],
      dioN: [P([TX + 11.5, 1.2, 0.35], [TX - 2.0, 0.3, -0.3], 50), P([TX + 11.0, 1.15, 0.35], [TX - 3.0, 0.3, -0.3], 50)],
      rear: [P([5.4, 0.9, -1.4], [1.5, 0.75, -3.7], 40), P([4.6, 0.85, -1.7], [1.5, 0.75, -3.7], 38)],

    };
    const PLAN = [[0, 'plat'], [C.safety, 'robo'], [C.looks, 'dio'], [C.bye, 'mad'], [C.whole, 'dio2'], [C.left, 'mad'], [C.breaks, 'dioB'], [C.nox, 'dioN'], [C.oneletter, 'mad'], [C.lv, 'rear'], [C.style, 'mad'], [C.cta, 'cta']];
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

      label(t, 0.8, C.safety, '🚆 every last coach has this X');
      if (t >= C.safety + 0.5 && t < C.looks) stamp('SAFETY CHECK ✓', 540, 300, 56, '#2fbf71', C.safety + 0.5, t, -0.06, 'rgba(255,255,255,0.95)');
      label(t, C.looks + 0.3, C.bye, '👀 the station master looks for the X', '#2a6fd6');
      if (t >= C.whole + 2.2 && t < C.left) stamp('WHOLE TRAIN ✓', 540, 300, 56, '#2fbf71', C.whole + 2.2, t, -0.06, 'rgba(255,255,255,0.95)');
      label(t, C.breaks + 0.3, C.nox, '⚠️ the coupling breaks', '#e2711d');
      if (t >= C.nox + 0.3 && t < C.oneletter) stamp('NO X = STOP THE NEXT TRAIN', 540, 300, 44, '#e5484d', C.nox + 0.3, t, -0.05, 'rgba(255,255,255,0.95)');
      if (t >= C.lv + 0.6 && t < C.style) { chip('☀️ day: LV board = Last Vehicle', 540, 230, 36, DARK, '#ffd34a', fin(t, C.lv + 0.6, 0.3), pop(t, C.lv + 0.6, 0.35)); chip('🌙 night: blinking red lamp', 540, 320, 36, DARK, '#ff7a85', fin(t, B('lv') + 4.3, 0.3), pop(t, B('lv') + 4.3, 0.35)); }
      endCard(t, '🚆 The X = last coach', 'no X = coaches missing', '📤 Send to your sleeper-class friend');

    };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), gr = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,10,0.32)'); x.fillStyle = gr; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.looks, C.whole, C.breaks, C.lv, C.cta];
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

    sfx.push(['train', 0.0, 0.5], ['whoosh', 0.2, 0.35], ['whoosh', 3.4, 0.3], ['chime', C.safety + 0.5, 0.3]);
    sfx.push(['train', C.looks, 0.3], ['ding', C.looks + 2.2, 0.3], ['train', C.whole, 0.25]); [0, 1, 2, 3, 4].forEach(i => sfx.push(['pop', C.whole + 1.2 + i * 0.37, 0.2]));
    sfx.push(['chime', C.whole + 2.2, 0.3], ['boing', C.left, 0.2], ['train', C.breaks, 0.3], ['zap', B('breaks') + 1.0, 0.4], ['thud', B('breaks') + 1.0, 0.35]);
    sfx.push(['buzz', C.nox + 0.3, 0.25], ['bass', C.nox + 0.3, 0.4], ['riser', C.nox + 0.8, 0.2], ['thud', C.nox + 3.2, 0.3], ['boing', C.oneletter, 0.2], ['beep', C.lv + 0.6, 0.2], ['beep', B('lv') + 4.3, 0.2], ['whoosh', C.cta, 0.3], ['chime', B('cta') + 0.5, 0.4]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
