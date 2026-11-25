/* @maddiee.makess reel 30 — "Why do flights curve?" Great circles: on a ball the shortest path between Delhi and New York bends up over the Arctic
   (≈11,750 km); the 'straight' line on a flat Mercator map is ≈13,850 km. Real 3D: a plane flying a banana curve over a flat map that wraps into
   a globe, a string pulled tight, the globe peeling flat, Greenland vs Africa (Africa ≈14× bigger). Cabin set: Maddie in the window seat. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x0b0d1f, fog: [9, 40], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
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
    const rng = K.rng(30);


    // ================= TIMELINE =================
    const C = { HOOK: 0, BALL: B('ball') - 0.12, SO: B('so') - 0.1, STRING: B('string') - 0.12, TIGHT: B('tight') - 0.05, WAIT: B('wait') - 0.1, GREAT: B('great') - 0.12,
      PEEL: B('peel') - 0.05, SHORT: B('short') - 0.1, LIE: B('lie') - 0.12, FAKE: B('fake') - 0.1, CTA: B('cta') - 0.12 };
    const HOOKMAP = Math.min(B('hook') + 2.4, C.BALL - 0.5), LIE2 = B('lie') + 5.4, PEEL0 = E('great') - 0.9;
    const GX = 40, G0 = V(GX, 1.45, -3), R0 = 1.0, LON0 = 1.5;

    // ================= CABIN (window seat, daytime above the clouds) =================
    const DY = 0.86;
    const seatM = SM(0x2b3a67, 0.85), seatM2 = SM(0x24325a, 0.85), coverM = SM(0xcfcfc8, 0.8), plastic = SM(0xd9d4ca, 0.5), dark = SM(0x3a3f4a, 0.6);
    const seat = (x, z) => { rbox(0.52, 0.13, 0.52, seatM, x, 0.47, z, 0.05); const bk = rbox(0.52, 1.05, 0.16, seatM2, x, 1.0, z - 0.3, 0.06); bk.rotation.x = -0.1;
      const cv = rbox(0.42, 0.22, 0.03, coverM, x, 1.38, z - 0.2, 0.02); cv.rotation.x = -0.1;
      [-0.28, 0.28].forEach(dx => rbox(0.06, 0.06, 0.45, plastic, x + dx, 0.68, z - 0.02, 0.025)); rbox(0.5, 0.36, 0.08, dark, x, 0.24, z, 0.02); };
    seat(-0.2, -0.95); seat(0.38, -0.95);
    [-1.95, -2.95, -3.95, -4.95].forEach(z => { seat(-0.2, z); seat(0.38, z); seat(1.55, z); seat(2.13, z); });
    seat(1.55, -0.95); seat(2.13, -0.95);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 14), SM(0x5a6275, 0.95)); floor.rotation.x = -Math.PI / 2; floor.position.set(0.8, 0, -3); floor.receiveShadow = true; S.add(floor);
    const aisle = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 14), SM(0x7b4a5a, 0.95)); aisle.rotation.x = -Math.PI / 2; aisle.position.set(0.97, 0.002, -3); S.add(aisle);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(6, 14), SM(0xf2eee7, 0.8)); ceil.rotation.x = Math.PI / 2; ceil.position.set(0.95, 2.2, -3); S.add(ceil);
    const rwall = new THREE.Mesh(new THREE.PlaneGeometry(14, 2.4), SM(0xebe6dc, 0.8)); rwall.rotation.y = -Math.PI / 2; rwall.position.set(2.7, 1.1, -3); S.add(rwall);
    const bwall = new THREE.Mesh(new THREE.PlaneGeometry(4, 2.4), SM(0xd9d2c4, 0.8)); bwall.position.set(1, 1.1, -7.5); S.add(bwall);
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 13), BM(0xfff1d6)); strip.rotation.x = Math.PI / 2; strip.position.set(0.97, 2.19, -3); S.add(strip);
    // left wall with oval windows (alpha holes) → sky outside
    const wallTex = K.canvasTex(256, 512, (x, w, h) => { x.fillStyle = '#ebe6dc'; x.fillRect(0, 0, w, h); x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.ellipse(128, 236, 62, 92, 0, 0, 7); x.fill(); });
    wallTex.wrapS = THREE.RepeatWrapping; wallTex.repeat.set(14 / 0.95, 1);
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(14, 2.0), new THREE.MeshStandardMaterial({ map: wallTex, alphaTest: 0.5, roughness: 0.7, side: THREE.DoubleSide })); wall.rotation.y = Math.PI / 2; wall.position.set(-0.68, 1.15, -3); S.add(wall);
    wallTex.offset.x = 0.12;
    const winRims = []; for (let z = -6.6; z < 1; z += 0.95) { }
    const skyTex = K.canvasTex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#3d8fe0'); g.addColorStop(0.55, '#9fd3ff'); g.addColorStop(0.62, '#ffffff'); g.addColorStop(1, '#e8f1ff'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(20, 8), new THREE.MeshBasicMaterial({ map: skyTex, fog: false })); sky.rotation.y = Math.PI / 2; sky.position.set(-4.5, 1.2, -3); S.add(sky);
    const cloudTex = K.canvasTex(256, 128, (x, w, h) => { for (let i = 0; i < 14; i++) { const cx = 30 + Math.random() * 196, cy = 60 + Math.random() * 30, r = 18 + Math.random() * 26; const g = x.createRadialGradient(cx, cy, 2, cx, cy, r); g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); } });
    const clouds = Array.from({ length: 10 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTex, transparent: true, depthWrite: false, fog: false })); s.scale.set(3, 1.5, 1); s.position.set(-3 - rng() * 1.2, 0.3 + rng() * 1.0, 0); S.add(s); return { s, o: rng() * 16 }; });
    const wing = rbox(4, 0.05, 0.9, SM(0xd8dde6, 0.35, { metalness: 0.4 }), -2.9, 0.75, -2.3, 0.02); wing.rotation.y = 0.25;
    rbox(0.5, 0.25, 6.5, SM(0xe6e1d6, 0.6), -0.4, 2.0, -3.2, 0.06);                       // overhead bins
    const rl = []; [-0.95, -1.95, -2.95].forEach(z => { const b = new THREE.Mesh(new THREE.CircleGeometry(0.03, 16), BM(0xfff3d6)); b.position.set(-0.05, 1.86, z + 0.3); b.rotation.x = Math.PI / 2; S.add(b); rl.push(b); });
    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: 0.56, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(-0.2, 0, -0.95); S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    // his phone (right hand), screen glowing PaisaMap mint
    const ph = new THREE.Group(); M.arms[1].hand.add(ph); ph.position.set(-0.05, 0.035, 0.03); ph.rotation.set(-1.05, 0.25, 0);
    rbox(0.085, 0.165, 0.012, SM(0x1b1d24, 0.3, { metalness: 0.3 }), 0, 0.06, 0, 0.012, ph);
    const phScr = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.152), new THREE.MeshBasicMaterial({ color: 0xbfe3d0, toneMapped: false })); phScr.position.set(0, 0.06, -0.0065); phScr.rotation.y = Math.PI; ph.add(phScr);
    const phL = new THREE.PointLight(0x9ff0cc, 0.0, 0.9, 1.6); S.add(phL);
    const R = (() => {   // the hover-bot with headphones (same design as every reel), floating above the books on the nightstand; no hands
      const g = new THREE.Group(); g.position.set(0.4, 0.86, -0.8); g.rotation.y = -0.6; S.add(g);
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

    // ================= LIGHT (cabin + sunlight through the windows) =================
    const hemi = new THREE.HemisphereLight(0xeaf2ff, 0x5a5048, 0.85); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff4e6, 1.2); key.position.set(1.2, 2.6, 2.2); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const sun = new THREE.DirectionalLight(0xfff0d0, 1.3); sun.position.set(-3, 1.8, -0.5); sun.target.position.set(0, 1.2, -1); S.add(sun); S.add(sun.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.5); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);

    // ================= THE WORLD (x = GX): one mesh that is a flat Mercator map OR a globe, and everything in between =================
    const W = window.WORLD, D2R = Math.PI / 180;
    const wrapL = l => ((l - LON0 + 540) % 360) - 180;
    const worldTex = (draw) => K.canvasTex(2048, 1024, (x, w, h) => draw(x, w, h));
    const tracePolys = (x, w, h, polys) => { polys.forEach(p => { x.beginPath(); let prev = null; for (let i = 0; i < p.length; i += 2) { const lx = (wrapL(p[i]) + 180) / 360 * w, ly = (90 - p[i + 1]) / 180 * h;
        if (i === 0 || (prev !== null && Math.abs(lx - prev) > w / 2)) x.moveTo(lx, ly); else x.lineTo(lx, ly); prev = lx; } x.closePath(); x.fill(); x.stroke(); }); };
    const baseTex = worldTex((x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1d5d9e'); g.addColorStop(0.5, '#1a6fb8'); g.addColorStop(1, '#1d5d9e'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(255,255,255,0.14)'; x.lineWidth = 2; for (let lo = -180; lo <= 180; lo += 15) { const px = (lo + 180) / 360 * w; x.beginPath(); x.moveTo(px, 0); x.lineTo(px, h); x.stroke(); }
      for (let la = -90; la <= 90; la += 15) { const py = (90 - la) / 180 * h; x.beginPath(); x.moveTo(0, py); x.lineTo(w, py); x.stroke(); }
      x.fillStyle = '#4fb36a'; x.strokeStyle = '#2f8a4e'; x.lineWidth = 2; x.lineJoin = 'round'; tracePolys(x, w, h, W.land);
      x.fillStyle = '#eef6ff'; x.strokeStyle = '#eef6ff'; tracePolys(x, w, h, W.land.filter(p => { let s = 0; for (let i = 1; i < p.length; i += 2) s += p[i]; return s / (p.length / 2) < -62; })); });
    const hiTex = worldTex((x, w, h) => { x.clearRect(0, 0, w, h); x.lineWidth = 6; x.lineJoin = 'round'; x.fillStyle = '#ffffff'; x.strokeStyle = '#ffffff'; tracePolys(x, w, h, W.grl); x.fillStyle = '#ffb02e'; x.strokeStyle = '#ffb02e'; tracePolys(x, w, h, W.afr); });
    const NX = 180, NY = 90, wGeo = new THREE.PlaneGeometry(1, 1, NX, NY), wPos = wGeo.attributes.position, wLL = [];
    for (let j = 0; j <= NY; j++) for (let i = 0; i <= NX; i++) wLL.push([-180 + i / NX * 360, 89.5 - j / NY * 179]);
    const merc = la => Math.log(Math.tan(Math.PI / 4 + Math.max(-82, Math.min(82, la)) * D2R / 2));
    const sstep = k => k * k * (3 - 2 * k);
    const wpt = (lr, la, m, lift, out) => { const k = sstep(cl(m * 1.5 - Math.abs(lr) / 180 * 0.5)), r = R0 + lift, a = la * D2R, b = lr * D2R;
      const sx = r * Math.cos(a) * Math.sin(b), sy = r * Math.sin(a), sz = r * Math.cos(a) * Math.cos(b);
      const fx = R0 * b, fy = R0 * merc(la), fz = R0 + lift + Math.sin(k * Math.PI) * 0.25 * Math.abs(b) / Math.PI;
      return out.set(lerp(sx, fx, k), lerp(sy, fy, k), lerp(sz, fz, k)); };
    const world = new THREE.Group(); world.position.copy(G0); S.add(world);
    const tilt = new THREE.Group(); world.add(tilt);
    const wMesh = new THREE.Mesh(wGeo, new THREE.MeshStandardMaterial({ map: baseTex, roughness: 0.75, side: THREE.DoubleSide, emissive: 0x0a1a30, emissiveIntensity: 0.25 })); wMesh.frustumCulled = false; tilt.add(wMesh);
    const hiMesh = new THREE.Mesh(wGeo, new THREE.MeshBasicMaterial({ map: hiTex, transparent: true, opacity: 0, depthWrite: false, toneMapped: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -4 })); hiMesh.frustumCulled = false; tilt.add(hiMesh);
    const tmpV = new THREE.Vector3();
    let lastM = -1;
    const setWorld = m => { if (Math.abs(m - lastM) < 1e-5) return; lastM = m; for (let i = 0; i < wLL.length; i++) { wpt(wLL[i][0], wLL[i][1], m, 0, tmpV); wPos.setXYZ(i, tmpV.x, tmpV.y, tmpV.z); } wPos.needsUpdate = true; wGeo.computeVertexNormals(); };
    // space around it
    const spaceSky = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 16), new THREE.MeshBasicMaterial({ color: 0x050818, side: THREE.BackSide, fog: false })); spaceSky.position.copy(G0); S.add(spaceSky);
    const stG = new THREE.BufferGeometry(), stP = []; for (let i = 0; i < 900; i++) { const v = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize().multiplyScalar(25); stP.push(v.x, v.y, v.z); }
    stG.setAttribute('position', new THREE.Float32BufferAttribute(stP, 3)); const stars = new THREE.Points(stG, new THREE.PointsMaterial({ color: 0xcfd8ff, size: 0.07, fog: false })); stars.position.copy(G0); stars.frustumCulled = false; S.add(stars);
    const glowTex = K.canvasTex(256, 256, (x, w, h) => { const g = x.createRadialGradient(128, 128, 60, 128, 128, 128); g.addColorStop(0, 'rgba(90,170,255,0.5)'); g.addColorStop(0.45, 'rgba(90,170,255,0.18)'); g.addColorStop(1, 'rgba(90,170,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const atm = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, toneMapped: false })); atm.scale.setScalar(3.4); atm.position.copy(G0).add(V(0, 0, -0.2)); S.add(atm);
    const gSun = new THREE.DirectionalLight(0xffffff, 1.6); gSun.position.copy(G0).add(V(-3, 3, 6)); gSun.target.position.copy(G0); S.add(gSun); S.add(gSun.target);
    const gRim = new THREE.PointLight(0x6fb8ff, 3, 9, 1.4); gRim.position.copy(G0).add(V(3, 1, -2.5)); S.add(gRim);

    // routes: Delhi → New York
    const DEL = [77.21, 28.61], NYC = [-74.01, 40.71];
    const vec = (lo, la) => V(Math.cos(la * D2R) * Math.cos(lo * D2R), Math.cos(la * D2R) * Math.sin(lo * D2R), Math.sin(la * D2R));
    const A3 = vec(...DEL), B3 = vec(...NYC), ANG = A3.angleTo(B3);
    const gcAt = s => { const p = A3.clone().multiplyScalar(Math.sin((1 - s) * ANG)).add(B3.clone().multiplyScalar(Math.sin(s * ANG))).divideScalar(Math.sin(ANG)); return [Math.atan2(p.y, p.x) / D2R, Math.asin(p.z) / D2R]; };
    const yA = merc(DEL[1]), yB = merc(NYC[1]);
    const rhAt = s => { const y = lerp(yA, yB, s); return [lerp(DEL[0], NYC[0], s), (2 * Math.atan(Math.exp(y)) - Math.PI / 2) / D2R]; };
    const BEADS = 170, beadGeo = new THREE.SphereGeometry(0.011, 8, 6);
    const gold = new THREE.InstancedMesh(beadGeo, BM(0xffd34a), BEADS), red = new THREE.InstancedMesh(beadGeo, BM(0xff4d5a), BEADS); gold.frustumCulled = red.frustumCulled = false; tilt.add(gold); tilt.add(red);
    const dmy = new THREE.Object3D();
    const routeLL = (s, tau) => { const g = gcAt(s), r = rhAt(s); return [lerp(r[0], g[0], tau), lerp(r[1], g[1], tau)]; };
    const drawBeads = (im, m, reveal, tau, sag, dashed) => { for (let i = 0; i < BEADS; i++) { const s = i / (BEADS - 1); let [lo, la] = routeLL(s, tau);
        const on = s <= reveal && (!dashed || (i % 6) < 4); wpt(wrapL(lo), la, m, 0.018 + sag * Math.sin(s * Math.PI), dmy.position); dmy.scale.setScalar(on ? 1 : 0.0001); dmy.updateMatrix(); im.setMatrixAt(i, dmy.matrix); } im.instanceMatrix.needsUpdate = true; };
    const pinMk = col => { const g = new THREE.Group(); const head = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 12), BM(col)); head.position.y = 0.09; g.add(head);
      const st = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.09, 8), SM(0xffffff, 0.4)); st.position.y = 0.045; g.add(st); tilt.add(g); return g; };
    const pinD = pinMk(0xff9933), pinN = pinMk(0x5ab0ff);
    const lblTex = (s, bg) => K.canvasTex(512, 128, (x, w, h) => { x.fillStyle = bg; x.beginPath(); x.roundRect(8, 16, w - 16, h - 32, 46); x.fill(); x.fillStyle = '#fff'; x.font = '800 54px "Fredoka Light", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, w / 2, h / 2 + 3); });
    const mkLbl = (s, bg) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: lblTex(s, bg), transparent: true, depthTest: false, depthWrite: false, toneMapped: false })); sp.renderOrder = 50; sp.scale.set(0.44, 0.11, 1); tilt.add(sp); return sp; };
    const lDel = mkLbl('DELHI', '#e2711d'), lNyc = mkLbl('NEW YORK', '#2a6fd6'), lGrl = mkLbl('GREENLAND', 'rgba(20,30,60,0.9)'), lAfr = mkLbl('AFRICA', '#c56a00');
    const placePin = (p, lo, la, m) => { wpt(wrapL(lo), la, m, 0, p.position); const n = tmpV.copy(p.position).normalize(); const k = sstep(cl(m * 1.5 - Math.abs(wrapL(lo)) / 180 * 0.5));
      const up = V(0, 0, 1).lerp(n, 1 - k).normalize(); p.quaternion.setFromUnitVectors(V(0, 1, 0), up); };
    // the little plane
    const plane = new THREE.Group(); tilt.add(plane); const pM = SM(0xffffff, 0.35, { metalness: 0.2 }), pA = SM(0xe2711d, 0.5);
    const fus = new THREE.Mesh(new THREE.CapsuleGeometry(0.022, 0.13, 6, 12), pM); fus.rotation.x = Math.PI / 2; plane.add(fus);
    const wg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.006, 0.045), pM); wg.position.z = 0.005; plane.add(wg);
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.004, 0.025), pM); tl.position.z = -0.075; plane.add(tl);
    const fin2 = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.045, 0.03), pA); fin2.position.set(0, 0.025, -0.075); plane.add(fin2);
    plane.scale.setScalar(1.5);
    const flyPlane = (s, m, tau, on) => { plane.visible = on; if (!on) return; const [lo, la] = routeLL(s, tau), [lo2, la2] = routeLL(Math.min(1, s + 0.01), tau);
      wpt(wrapL(lo), la, m, 0.06, plane.position); const nx = wpt(wrapL(lo2), la2, m, 0.06, V()); const k = sstep(cl(m * 1.5 - Math.abs(wrapL(lo)) / 180 * 0.5));
      plane.up.copy(V(0, 0, 1).lerp(plane.position.clone().normalize(), 1 - k).normalize()); plane.lookAt(nx.applyMatrix4(tilt.matrixWorld)); };

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06], toWin = [-0.6, 0.05];
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      let mL = toR, face = 'neutral', lean = 0;
      if (t < C.BALL) { mL = t < HOOKMAP + 0.6 ? toWin : toR; face = 'worried'; }
      else if (t < C.SO) { mL = toR; }
      else if (t < C.STRING) { mL = toCam; face = 'neutral'; lean = 0.1; }
      else if (t < C.WAIT) { mL = toR; }
      else if (t < C.GREAT) { mL = toCam; face = 'shock'; lean = -0.12; }
      else if (t < C.SHORT) { mL = toR; }
      else if (t < C.LIE) { mL = toCam; face = 'shock'; lean = -0.08; }
      else if (t < C.FAKE) { mL = toR; face = 'shock'; }
      else if (t < C.CTA) { mL = toCam; face = 'worried'; lean = 0.25; }
      else { mL = toCam; face = 'smile'; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type: 0, lean });
      phL.intensity = 0; phScr.material.color.setHex(0x6a8fb0);
      let rL = [-0.2, 0.05]; if (t >= C.CTA || (t >= C.BALL && t < C.SO)) rL = [0.45, 0.02];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood: t >= C.CTA ? 'smile' : 'calm' });
      clouds.forEach(c => { c.s.position.z = 2 - ((t * 1.6 + c.o) % 16); });
      wing.position.y = 0.75 + Math.sin(t * 1.3) * 0.012;

      // ---- the world: m = 1 flat map, 0 = globe ----
      let m = 1;
      m = 1 - sstep(pr(t, B('ball') + 0.5, B('ball') + 2.1));                          // map wraps into a ball
      if (t >= PEEL0) m = sstep(pr(t, PEEL0, PEEL0 + 2.0));                               // peel flat
      if (t >= LIE2 - 0.1) m = 1 - sstep(pr(t, LIE2 - 0.1, LIE2 + 1.3));                   // back to a ball: true sizes
      setWorld(m);
      // tilt the globe so the Arctic route faces us (only while it's a ball)
      const tiltAmt = t < C.TIGHT ? 0.35 : t < PEEL0 ? 0.75 : t >= LIE2 ? 0.42 : 0.5;
      tilt.rotation.x = (1 - m) * tiltAmt; tilt.rotation.y = (1 - m) * (t >= LIE2 ? -0.32 : 0.05 * Math.sin(t * 0.4)); tilt.updateMatrixWorld(true);
      atm.material.opacity = 1 - m;
      // the string: grows loose along the map-straight path, then snaps tight to the great circle
      let reveal = 1, tau = 1, sag = 0, gOn = true;
      if (t < C.BALL) { reveal = pr(t, 0.2, HOOKMAP - 0.2); tau = 1; }
      else if (t < C.STRING + 0.6) { gOn = t < C.BALL + 0.6; }
      else if (t < C.TIGHT + 0.2) { reveal = eo(pr(t, C.STRING + 0.6, B('string') + 2.6)); tau = 0; sag = 0.06; }
      else { const q = pr(t, C.TIGHT + 0.2, C.TIGHT + 0.9); tau = eb(q); sag = 0.06 * (1 - q); }
      if (t >= C.LIE) gOn = false; gold.visible = gOn; drawBeads(gold, m, reveal, tau, sag, false);
      const redOn = t >= PEEL0 + 1.6 && t < C.SHORT + 0.2; red.visible = redOn; if (redOn) drawBeads(red, m, eo(pr(t, PEEL0 + 1.8, PEEL0 + 2.8)), 0, 0, true);
      // pins + labels
      const pinOn = t < C.BALL || (t >= B('string') + 0.3 && t < C.LIE);
      [[pinD, DEL, lDel, 0.13], [pinN, NYC, lNyc, 0.13]].forEach(([p, ll, lb, dy], i) => { placePin(p, ll[0], ll[1], m); const pk = t < C.BALL ? 1 : eb(pr(t, B('string') + 0.3 + i * 0.5, B('string') + 0.7 + i * 0.5));
        p.scale.setScalar(pinOn ? Math.max(0.0001, pk) : 0.0001); lb.position.copy(p.position).add(tmpV.set(0, 0, 0)); wpt(wrapL(ll[0]), ll[1] + (i ? -9 : -9), m, 0.12, lb.position); lb.material.opacity = pinOn ? cl(pk) : 0; });
      // plane: flies the curve in the hook, and along the tight string later
      if (t < C.BALL) flyPlane(pr(t, 0.2, HOOKMAP - 0.2), 1, 1, true);
      else if (t >= C.TIGHT + 1.0 && t < C.WAIT + 0.3) flyPlane(pr(t, C.TIGHT + 1.0, E('tight') + 0.2), m, 1, true);
      else if (t >= PEEL0 + 2.2 && t < C.SHORT) flyPlane(pr(t, PEEL0 + 2.2, E('peel') + 0.3), m, 1, true);
      else flyPlane(0, m, 1, false);
      // Greenland vs Africa glow
      const hi = t >= C.LIE ? pr(t, B('lie') + 3.2, B('lie') + 3.7) * (0.85 + 0.15 * Math.sin(t * 6)) : 0; hiMesh.material.opacity = hi;
      wpt(wrapL(-42), 76, m, 0.15, lGrl.position); wpt(wrapL(20), 8, m, 0.15, lAfr.position); lGrl.material.opacity = lAfr.material.opacity = hi > 0.05 ? 1 : 0;
    };

    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const g = (x, y, z) => [GX + x, G0.y + y, G0.z + z];
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.4, 1.12, -0.8];
    const sh = {
      hook: [P(g(0.1, -0.6, 8.4), g(0.05, 0.6, 1), 46), P(g(0, -0.5, 7.6), g(0.05, 0.6, 1), 46)],
      mad: [P([0.42, 1.46, 1.55], [-0.28, 1.4, -0.94], 32), P([0.38, 1.45, 1.35], [-0.28, 1.4, -0.94], 32)],
      two: [P([0.45, 1.45, 2.1], [-0.05, 1.2, -0.9], 40), P([0.4, 1.42, 1.85], [-0.05, 1.2, -0.9], 40)],
      robo: [P([0.05, 1.22, 0.75], RHL, 32), P([0.07, 1.21, 0.6], RHL, 32)],
      wrap: [P(g(0, 0.2, 7.2), g(0, 0.25, 0.5), 42), P(g(0, 0.2, 6.2), g(0, 0.1, 0), 42)],
      globe: [P(g(0.4, 0.5, 6.0), g(0, 0.1, 0), 40), P(g(-0.3, 0.6, 5.6), g(0, 0.15, 0), 40)],
      top: [P(g(0.2, 1.6, 5.4), g(0, 0.35, 0), 40), P(g(-0.2, 2.6, 4.4), g(0, 0.45, 0), 40)],
      flat: [P(g(0, 0.2, 7.0), g(0, 0.4, 0.5), 42), P(g(0, 0.3, 8.4), g(0, 0.5, 1), 42)],
      lie: [P(g(0.0, 0.7, 7.0), g(0.0, 0.7, 1), 42), P(g(-0.05, 0.7, 6.4), g(-0.05, 0.65, 1), 42)],
      lie2: [P(g(0.1, 0.4, 6.4), g(0, 0.2, 0), 40), P(g(0.05, 0.3, 5.4), g(0, 0.15, 0), 40)],
      cta: [P([0.5, 1.5, 2.6], [-0.05, 1.25, -0.9], 42), P([0.45, 1.48, 2.3], [-0.05, 1.25, -0.9], 42)],
    };
    const plan = [
      [C.HOOK, HOOKMAP, sh.hook], [HOOKMAP, C.BALL, sh.mad], [C.BALL, C.SO, sh.wrap], [C.SO, C.STRING, sh.two], [C.STRING, C.TIGHT, sh.globe], [C.TIGHT, C.WAIT, sh.top],
      [C.WAIT, C.GREAT, sh.mad], [C.GREAT, PEEL0, sh.globe], [PEEL0, C.SHORT, sh.flat], [C.SHORT, C.LIE, sh.mad], [C.LIE, LIE2, sh.lie], [LIE2, C.FAKE, sh.lie2], [C.FAKE, C.CTA, sh.mad], [C.CTA, D + 5, sh.cta],
    ].filter(p => p[1] > p[0]);
    const SHAKE = [C.WAIT, C.FAKE];
    const smooth = k => k * k * (3 - 2 * k);
    const lift = (p, dy) => ({ pos: [p.pos[0], p.pos[1] + dy, p.pos[2]], look: [p.look[0], p.look[1] + dy, p.look[2]], fov: p.fov });
    const DYS = new Map([[sh.mad, 0.085], [sh.robo, 0.035], [sh.two, 0.05], [sh.cta, 0.03]]);
    plan.forEach(p => { if (DYS.has(p[2])) { const d = DYS.get(p[2]); p[2] = [lift(p[2][0], d), lift(p[2][1], d)]; } });
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
    const drawBeats = t => {
      label(t, 0.3, HOOKMAP, '✈️ Delhi → New York');
      label(t, C.BALL + 0.4, C.SO, '🌍 the Earth is a ball', '#2a6fd6');
      label(t, B('string') + 0.8, C.TIGHT, '🧵 a string from Delhi to New York', '#e2711d');
      if (t >= C.TIGHT + 0.9 && t < C.WAIT) stamp('SHORTEST PATH ✓', 540, 300, 54, '#2fbf71', C.TIGHT + 0.9, t, -0.06, 'rgba(255,255,255,0.95)');
      if (t >= B('great') + 0.4 && t < PEEL0 + 0.2) stamp('GREAT CIRCLE · ≈11,750 km', 540, 300, 46, '#ffd34a', B('great') + 0.4, t, -0.05, 'rgba(10,14,40,0.95)');
      if (t >= PEEL0 + 2.0 && t < C.SHORT) { chip('🟡 the curve ≈ 11,750 km ✅', 540, 230, 36, DARK, '#ffd34a', fin(t, PEEL0 + 2.0, 0.3), pop(t, PEEL0 + 2.0, 0.35)); chip('🔴 "straight" line ≈ 13,850 km ❌', 540, 320, 36, DARK, '#ff7a85', fin(t, PEEL0 + 2.8, 0.3), pop(t, PEEL0 + 2.8, 0.35)); }
      label(t, B('lie') + 1.6, LIE2 - 0.1, '🗺️ flat maps stretch the top', '#7b2ff7');
      if (t >= LIE2 + 1.0 && t < C.FAKE) stamp('AFRICA ≈ 14× GREENLAND', 540, 300, 50, '#ffb02e', LIE2 + 1.0, t, -0.06, 'rgba(10,14,40,0.95)');
      if (t >= C.CTA) { const a = pop(t, C.CTA + 0.05, 0.45); scaleAt(540, 430, a, () => { h.save(); h.shadowColor = 'rgba(111,216,255,0.9)'; h.shadowBlur = 40; rr(140, 270, 800, 330, 40, DARK); h.restore();
        ft('✈️ Why flights curve', 540, 350, 52, '#fff', 700, 'center'); ft('the curve IS the shortcut', 540, 412, 40, '#ffd34a', 700, 'center');
        const pl = 1 + 0.05 * Math.sin(t * 7); scaleAt(540, 520, pl, () => { rr(170, 480, 740, 84, 42, '#ffd34a'); ft('📤 Send to your window-seat friend', 540, 524, 36, '#1a1206', 800, 'center'); }); }); }
    };
    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), gr = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,10,0.32)'); x.fillStyle = gr; x.fillRect(0, 0, HW, HH); }
    const cuts = [HOOKMAP, C.BALL, C.STRING, PEEL0, C.LIE, C.CTA];
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

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['whoosh', 0.2, 0.3], ['riser', 0.4, 0.2], ['boing', HOOKMAP, 0.15]);
    sfx.push(['whoosh', B('ball') + 0.5, 0.3], ['chime', B('ball') + 2.0, 0.3]);
    sfx.push(['pop', B('string') + 0.3, 0.3], ['pop', B('string') + 0.8, 0.3], ['riser', C.STRING + 0.6, 0.2]);
    sfx.push(['zap', C.TIGHT + 0.2, 0.35], ['bass', C.TIGHT + 0.25, 0.45], ['whoosh', C.TIGHT + 1.0, 0.25], ['chime', C.TIGHT + 0.9, 0.3]);
    sfx.push(['boing', C.WAIT, 0.2], ['thud', B('great') + 0.4, 0.3], ['riser', PEEL0, 0.3], ['whoosh', PEEL0 + 0.8, 0.3], ['ding', PEEL0 + 2.0, 0.3], ['buzz', PEEL0 + 2.8, 0.15]);
    sfx.push(['chime', B('lie') + 3.2, 0.3], ['whoosh', LIE2, 0.3], ['bass', LIE2 + 1.0, 0.45], ['thud', LIE2 + 1.0, 0.3], ['boing', C.FAKE, 0.2], ['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.5, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
