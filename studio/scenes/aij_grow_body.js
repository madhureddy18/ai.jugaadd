/* @maddiee.makess reel 15 — "Twelve followers". Comedy: Maddie (clueless) + Claude (dry genius). No spoken CTA; ends on the mom callback.
   NEW LOCATION: a Hyderabad rooftop terrace at night — city skyline with lit windows + a blinking tower, moon, stars, a black water
   tank, fairy-light string, washing line, potted tulsi, satellite dish, low parapet; Maddie on a red plastic chair.
   A phone floats in the top half and shows every beat (profile → 4 mom accounts → 52K graph → lesson speed → viral reels → structure
   → 10 hooks → "ED…" → code → comment-to-DM → 30 DAYS LATER → 10,482 → moms still following). Zoom punches + slow pushes on
   the jokes, content zooms inside the phone. Clean night grade (no film look). Full 9:16, no bars, no blush dots, no handle. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x060a18, fog: null, fov: 38, bloom: null },
  lines: window.JR_LINES,

  build(K, T) {
    const L = T.lines;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[IX(id)].t, E = id => L[IX(id)].end, at = (id, f) => B(id) + f * (E(id) - B(id));
    const D = E('m15') + 1.6;
    const cl = K.clamp, eo = K.easeOut, pr = K.prog, eb = K.easeBack;
    const sm = q => q * q * (3 - 2 * q), lerp = (a, b, k) => a + (b - a) * k;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S, seg = 18) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.7)), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const W = 1080, H = 1920;

    // ================= TIMELINE =================
    const C = { PH: B('m1') + 0.15, LATER: E('c14') + 0.35, COUNT: B('m13') - 0.35 };
    const SCR = [   // [name, start]
      ['profile', 0], ['followers', B('m1b') - 0.05], ['graph', B('c2') - 0.1], ['slow', B('m4') - 0.1], ['viral', B('c5') - 0.1],
      ['struct', B('m6') - 0.1], ['hooks', B('c8') - 0.1], ['edit', B('m9') - 0.1], ['build', B('c11') - 0.1], ['dm', B('c13') - 0.1],
      ['later', C.LATER], ['count', C.COUNT], ['final', B('m14') - 0.1]];
    const scrAt = t => { let k = 0; SCR.forEach((s, i) => { if (t >= s[1]) k = i; }); return k; };
    const TR = 0.32;   // screen swipe duration

    // ================= ROOFTOP =================
    const GZ = -1.75;  // parapet line behind the characters
    const tileTex = K.canvasTex(512, 512, (x, w, h) => { const r = K.rng(5); for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { const c = 92 + r() * 22; x.fillStyle = `rgb(${c},${c - 6},${c - 14})`; x.fillRect(i * 64, j * 64, 64, 64);
      x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(i * 64, j * 64, 64, 3); x.fillRect(i * 64, j * 64, 3, 64); for (let k = 0; k < 6; k++) { x.fillStyle = `rgba(0,0,0,${0.05 + r() * 0.08})`; x.beginPath(); x.arc(i * 64 + r() * 64, j * 64 + r() * 64, 2 + r() * 7, 0, 7); x.fill(); } } });
    tileTex.wrapS = tileTex.wrapT = THREE.RepeatWrapping; tileTex.repeat.set(5, 4);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), SM(0xffffff, 0.85, { map: tileTex })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; S.add(floor);
    // parapet (low wall) with a painted top + side walls
    const wallTex = K.canvasTex(256, 128, (x, w, h) => { x.fillStyle = '#c9b9a3'; x.fillRect(0, 0, w, h); const r = K.rng(9); for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '90,70,60' : '255,250,240'},${0.05 + r() * 0.08})`; x.fillRect(r() * w, r() * h, 2 + r() * 10, 1 + r() * 3); }
      x.fillStyle = 'rgba(60,40,30,0.25)'; for (let i = 0; i < 6; i++) x.fillRect(r() * w, h * 0.55 + r() * h * 0.4, 1.5, 10 + r() * 30); });
    wallTex.wrapS = THREE.RepeatWrapping; wallTex.repeat.set(6, 1);
    const wallM = SM(0xffffff, 0.92, { map: wallTex }), capM = SM(0x9a4a3c, 0.8);
    rbox(12, 0.95, 0.2, wallM, 0, 0.475, GZ, 0.02); rbox(12.1, 0.07, 0.28, capM, 0, 0.98, GZ, 0.02);
    [-1, 1].forEach(s => { const sw = rbox(0.2, 0.95, 5, wallM, s * 2.9, 0.475, GZ + 2.4, 0.02); sw.material = wallM; });
    // city skyline far away: buildings with lit windows, a TV tower with a blinking red light, moon + stars on the sky gradient
    const skyTex = K.canvasTex(1024, 1024, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#04081a'); g.addColorStop(0.55, '#0d1838'); g.addColorStop(0.82, '#2a2d55'); g.addColorStop(1, '#5a3a4a'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      const r = K.rng(77); for (let i = 0; i < 260; i++) { const a = r(); x.fillStyle = `rgba(255,255,255,${0.2 + a * 0.7})`; x.beginPath(); x.arc(r() * w, r() * h * 0.6, a < 0.92 ? 1.1 : 2, 0, 7); x.fill(); }
      const mg = x.createRadialGradient(780, 210, 10, 780, 210, 150); mg.addColorStop(0, 'rgba(255,240,210,0.45)'); mg.addColorStop(1, 'rgba(255,240,210,0)'); x.fillStyle = mg; x.fillRect(600, 40, 360, 360);
      x.fillStyle = '#fff4dc'; x.beginPath(); x.arc(780, 210, 46, 0, 7); x.fill(); x.fillStyle = 'rgba(200,190,170,0.35)'; [[765, 200, 9], [795, 225, 6], [775, 230, 4]].forEach(([a, b, c]) => { x.beginPath(); x.arc(a, b, c, 0, 7); x.fill(); }); });
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), new THREE.MeshBasicMaterial({ map: skyTex, toneMapped: false, depthWrite: false })); sky.position.set(0, 6, -16); S.add(sky);
    const cityC = document.createElement('canvas'); cityC.width = 2048; cityC.height = 512; const cx2 = cityC.getContext('2d'); const cityTex = new THREE.CanvasTexture(cityC); cityTex.colorSpace = THREE.SRGBColorSpace;
    const bld = []; { const r = K.rng(31); let x = 0; while (x < 2048) { const bw = 50 + r() * 110, bh = 90 + r() * (r() < 0.15 ? 330 : 200); bld.push({ x, w: bw, h: bh, c: 14 + r() * 14, seed: Math.floor(r() * 1e6) }); x += bw + r() * 8; } }
    const drawCity = (t) => { const x = cx2, w = 2048, h = 512; x.clearRect(0, 0, w, h);
      const hz = x.createLinearGradient(0, h * 0.5, 0, h); hz.addColorStop(0, 'rgba(255,140,90,0)'); hz.addColorStop(1, 'rgba(255,140,90,0.25)'); x.fillStyle = hz; x.fillRect(0, 0, w, h);
      bld.forEach((b, i) => { const y0 = h - b.h; x.fillStyle = `rgb(${b.c},${b.c + 4},${b.c + 18})`; x.fillRect(b.x, y0, b.w, b.h); const r = K.rng(b.seed);
        for (let yy = y0 + 10; yy < h - 8; yy += 16) for (let xx = b.x + 6; xx < b.x + b.w - 8; xx += 13) { const on = r(), tw = Math.sin(t * 0.7 + b.seed % 97 + xx * 0.3) > 0.97; if (on < 0.38 || tw) { const warm = r() < 0.75; x.fillStyle = warm ? `rgba(255,${200 + Math.floor(r() * 40)},120,${0.55 + r() * 0.4})` : 'rgba(170,215,255,0.75)'; x.fillRect(xx, yy, 6, 8); } else r(); } });
      // TV tower with blinking light
      x.fillStyle = '#121a30'; x.beginPath(); x.moveTo(1320, h); x.lineTo(1336, 70); x.lineTo(1344, 70); x.lineTo(1360, h); x.fill(); x.fillRect(1318, 150, 44, 16); x.fillRect(1324, 230, 32, 12);
      if ((t % 1.4) < 0.5) { const gg = x.createRadialGradient(1340, 64, 0, 1340, 64, 26); gg.addColorStop(0, 'rgba(255,60,50,1)'); gg.addColorStop(1, 'rgba(255,60,50,0)'); x.fillStyle = gg; x.fillRect(1310, 34, 60, 60); }
      cityTex.needsUpdate = true; };
    const city = new THREE.Mesh(new THREE.PlaneGeometry(26, 6.5), new THREE.MeshBasicMaterial({ map: cityTex, transparent: true, toneMapped: false, depthWrite: false })); city.position.set(0, 2.2, -13); S.add(city);
    // plane crossing the sky (blinking)
    const planeL = sph(0.05, BM(0xff5050), -9, 6.5, -12, S, 8);
    // black water tank on a stand (left back) + pipe
    const tankM = SM(0x1b1d22, 0.55), standM = SM(0x55504a, 0.8);
    rbox(1.0, 0.5, 1.0, standM, -2.1, 0.25, -1.15, 0.03);
    const tank = cyl(0.48, 0.48, 1.0, tankM, -2.1, 1.0, -1.15, 32); for (let i = 0; i < 4; i++) cyl(0.49, 0.49, 0.03, SM(0x2a2c33, 0.5), -2.1, 0.62 + i * 0.25, -1.15, 32);
    cyl(0.16, 0.16, 0.08, tankM, -2.1, 1.54, -1.15, 20);
    const pipe = cyl(0.025, 0.025, 1.4, SM(0xeeeeee, 0.6), -1.62, 0.7, -1.15, 8); pipe.rotation.z = 0.05;
    // satellite dish on the parapet (right)
    const dishG = new THREE.Group(); dishG.position.set(-1.35, 1.0, GZ + 0.05); S.add(dishG);
    const dish = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 12, 0, Math.PI * 2, 0, 0.6), SM(0xe9e6e0, 0.5, { side: THREE.DoubleSide })); dish.rotation.x = -1.9; dish.position.y = 0.42; dishG.add(dish);
    cyl(0.02, 0.02, 0.45, SM(0x777777, 0.5), 0, 0.2, 0, 8, dishG); const arm = cyl(0.012, 0.012, 0.4, SM(0x777777, 0.5), 0, 0.5, 0.18, 6, dishG); arm.rotation.x = 1.0;
    // washing line with clothes (right back)
    const lineY = 1.7, LX = 2.2; [-1, 1].forEach(s => cyl(0.02, 0.02, lineY, SM(0x6a6a6a, 0.5), LX + s * 0.58, lineY / 2, -1.45, 8));
    const rope = cyl(0.006, 0.006, 1.16, SM(0xdddddd, 0.6), LX, lineY - 0.03, -1.45, 6); rope.rotation.z = Math.PI / 2;
    const cloth = []; [[1.8, 0.26, 0.4, 0xd9534f], [2.08, 0.24, 0.46, 0xf2c14e], [2.34, 0.22, 0.32, 0x3a7bd5], [2.6, 0.24, 0.42, 0xf4f1ea]].forEach(([x, w, hh, c], i) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, hh, 6, 6), SM(c, 0.9, { side: THREE.DoubleSide })); m.position.set(x, lineY - 0.04 - hh / 2, -1.45); m.castShadow = true; S.add(m); cloth.push(m); });
    // potted tulsi (left of the chair) + a small stool with a chai glass
    const potM = SM(0xa0522d, 0.8); cyl(0.17, 0.13, 0.3, potM, -1.15, 0.15, -0.95, 20);
    const leafM = SM(0x3f8a3a, 0.7); const lr = K.rng(13); for (let i = 0; i < 26; i++) { const a = lr() * 7, rr2 = lr() * 0.13; sph(0.05 + lr() * 0.03, leafM, -1.15 + Math.cos(a) * rr2, 0.36 + lr() * 0.3, -0.95 + Math.sin(a) * rr2, S, 8); }
    const stool = new THREE.Group(); stool.position.set(0.15, 0, -0.35); S.add(stool);
    cyl(0.16, 0.14, 0.04, SM(0x2e6bd1, 0.5), 0, 0.42, 0, 20, stool); [0, 1, 2, 3].forEach(i => { const a = i * Math.PI / 2 + 0.78; const lg = cyl(0.015, 0.02, 0.42, SM(0x2e6bd1, 0.5), Math.cos(a) * 0.1, 0.2, Math.sin(a) * 0.1, 6, stool); });
    const glass = cyl(0.035, 0.03, 0.09, new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.1 }), 0.02, 0.49, 0, 16, stool); cyl(0.031, 0.027, 0.06, SM(0xb07a3e, 0.4), 0.02, 0.475, 0, 16, stool);
    // fairy lights: a sagging string across the back
    const fairy = []; const fy = (u) => 1.95 - Math.sin(u * Math.PI) * 0.32;
    for (let i = 0; i <= 34; i++) { const u = i / 34, x = -2.6 + u * 5.2; const b = sph(0.028, BM(0xffd27a), x, fy(u), GZ + 0.15, S, 8); fairy.push(b); }
    for (let i = 0; i < 34; i++) { const u0 = i / 34, u1 = (i + 1) / 34; const a = V(-2.6 + u0 * 5.2, fy(u0) + 0.03, GZ + 0.15), b = V(-2.6 + u1 * 5.2, fy(u1) + 0.03, GZ + 0.15); const wseg = cyl(0.004, 0.004, a.distanceTo(b), BM(0x222222), (a.x + b.x) / 2, (a.y + b.y) / 2, a.z, 4); wseg.lookAt(b); wseg.rotateX(Math.PI / 2); }
    [-1.6, 0, 1.6].forEach(x => { const l = new THREE.PointLight(0xffc56a, 0.55, 3.2, 1.6); l.position.set(x, 1.75, GZ + 0.4); S.add(l); });

    // red plastic chair (Maddie sits) — seat at SY
    const MX = -0.22, MZ = -0.62, SY = 0.47;
    const chairM = SM(0xc8232c, 0.45), chG = new THREE.Group(); chG.position.set(MX, 0, MZ - 0.02); chG.rotation.y = 0.1; S.add(chG);
    rbox(0.56, 0.05, 0.5, chairM, 0, SY - 0.05, 0.02, 0.03, chG);
    const backr = rbox(0.56, 0.5, 0.05, chairM, 0, SY + 0.27, -0.24, 0.04, chG); backr.rotation.x = -0.12;
    for (let i = 0; i < 4; i++) rbox(0.38, 0.03, 0.055, SM(0xa51c24, 0.5), 0, SY + 0.1 + i * 0.1, -0.2, 0.01, chG).rotation.x = -0.12;
    [[-0.25, 0.22], [0.25, 0.22], [-0.25, -0.2], [0.25, -0.2]].forEach(([x, z]) => { const lg = rbox(0.05, SY - 0.06, 0.05, chairM, x, (SY - 0.06) / 2, z, 0.015, chG); lg.rotation.z = x > 0 ? -0.06 : 0.06; });
    [-1, 1].forEach(s => rbox(0.05, 0.05, 0.44, chairM, s * 0.28, SY + 0.17, 0.0, 0.02, chG));

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: SY, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(MX, 0, MZ + 0.05); M.g.rotation.y = 0.1; S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    const RX = 0.62, RY = 0.98, RZ = -0.36;
    const R = (() => {   // the headphones hover-bot; no hands
      const g = new THREE.Group(); g.position.set(RX, RY, RZ); g.rotation.y = -0.3; S.add(g);
      const lift = new THREE.Group(); lift.position.y = 0.25; g.add(lift); lift.scale.setScalar(0.6);
      const head = new THREE.Group(); lift.add(head);
      const shellM = SM(0xd9d1c4, 0.55), orM = SM(0xe8692f, 0.5), visorM = SM(0x141a2e, 0.15, { metalness: 0.4 });
      const shell = sph(0.27, shellM, 0, 0, 0, head); shell.scale.set(1, 0.9, 0.92); shell.geometry = new THREE.SphereGeometry(0.27, 40, 28);
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.272, 40, 20, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), orM); belly.scale.set(1, 0.9, 0.92); head.add(belly);
      const visor = new THREE.Mesh(new THREE.SphereGeometry(0.255, 40, 24, -Math.PI * 0.36, Math.PI * 0.72, Math.PI * 0.3, Math.PI * 0.32), visorM); visor.scale.set(1.02, 0.92, 0.96); head.add(visor);
      const FW = 256, FH = 128, fc = document.createElement('canvas'); fc.width = FW; fc.height = FH; const fx = fc.getContext('2d');
      const fTex = new THREE.CanvasTexture(fc); fTex.colorSpace = THREE.SRGBColorSpace;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.15), new THREE.MeshBasicMaterial({ map: fTex, transparent: true, toneMapped: false })); face.position.set(0, 0.02, 0.247); head.add(face);
      const drawFace = (mood, talk, blink) => { fx.clearRect(0, 0, FW, FH); fx.fillStyle = '#ffb36b'; fx.strokeStyle = '#ffb36b'; fx.lineCap = 'round'; fx.lineWidth = 14; fx.shadowColor = '#ff8a3d'; fx.shadowBlur = 14;
        [76, 180].forEach((cx, i) => { if (blink) { fx.beginPath(); fx.moveTo(cx - 20, 52); fx.lineTo(cx + 20, 52); fx.stroke(); }
          else if (mood === 'happy') { fx.beginPath(); fx.arc(cx, 62, 20, Math.PI * 1.1, Math.PI * 1.9); fx.stroke(); }
          else if (mood === 'flat') { fx.beginPath(); fx.moveTo(cx - 20, 50); fx.lineTo(cx + 20, 50); fx.stroke(); }
          else if (mood === 'wink' && i === 1) { fx.beginPath(); fx.arc(cx, 58, 18, Math.PI * 1.1, Math.PI * 1.9); fx.stroke(); }
          else if (mood === 'star') { fx.save(); fx.translate(cx, 52); fx.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 10 : 24; fx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } fx.closePath(); fx.fill(); fx.restore(); }
          else if (mood === 'side') { fx.beginPath(); fx.moveTo(cx - 20, 46); fx.lineTo(cx + 20, 46); fx.stroke(); fx.beginPath(); fx.arc(cx + 8, 56, 8, 0, 7); fx.fill(); }
          else { fx.beginPath(); fx.ellipse(cx, 50, 15, 21, 0, 0, 7); fx.fill(); fx.fillStyle = 'rgba(255,255,255,0.8)'; fx.beginPath(); fx.arc(cx + 5, 42, 5, 0, 7); fx.fill(); fx.fillStyle = '#ffb36b'; } });
        const o = K.clamp(talk); fx.lineWidth = 9; if (o > 0.08) { fx.beginPath(); fx.ellipse(128, 100, 16, 4 + o * 12, 0, 0, 7); fx.fill(); } else if (mood === 'flat' || mood === 'side') { fx.beginPath(); fx.moveTo(114, 94); fx.lineTo(142, 94); fx.stroke(); } else { fx.beginPath(); fx.arc(128, 88, 12, Math.PI * 0.15, Math.PI * 0.85); fx.stroke(); }
        fTex.needsUpdate = true; };
      const hpM = SM(0x2f5fd0, 0.35), hpD = SM(0x1b2f6e, 0.4);
      head.add(new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.03, 12, 40, Math.PI), hpM));
      const band2 = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.018, 8, 40, Math.PI), SM(0xdfe8ff, 0.4)); band2.scale.set(0.97, 0.97, 1); head.add(band2);
      [-1, 1].forEach(sx => { const cup = new THREE.Group(); cup.position.set(sx * 0.29, -0.02, 0); head.add(cup);
        const c1 = cyl(0.1, 0.1, 0.09, hpM, 0, 0, 0, 28, cup); c1.rotation.z = Math.PI / 2; const c2 = cyl(0.075, 0.075, 0.1, hpD, sx * 0.012, 0, 0, 28, cup); c2.rotation.z = Math.PI / 2;
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.012, 8, 28), SM(0xdfe8ff, 0.4)); ring.rotation.y = Math.PI / 2; ring.position.x = sx * 0.046; cup.add(ring); });
      const ringTex = K.canvasTex(128, 128, (x, w, h) => { const gr = x.createRadialGradient(64, 64, 10, 64, 64, 62); gr.addColorStop(0, 'rgba(120,220,255,0.9)'); gr.addColorStop(0.5, 'rgba(90,180,255,0.35)'); gr.addColorStop(1, 'rgba(90,180,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, w, h); });
      const thr = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, depthWrite: false, toneMapped: false })); thr.rotation.x = Math.PI / 2; thr.position.y = -0.27; lift.add(thr);
      const glowL = new THREE.PointLight(0xffa060, 0.0, 1.0, 2); lift.add(glowL);
      const r = { g, head, lift };
      r.update = (t, { talk = 0, look = [0, 0], mood = 'calm', bob = 0 } = {}) => {
        lift.position.y = 0.25 + Math.sin(t * 2.4) * 0.018 + bob;
        head.rotation.set(look[1] + Math.sin(t * 2.4 + 1) * 0.03, look[0] + Math.sin(t * 0.8) * 0.05, Math.sin(t * 1.7) * 0.04);
        const blink = ((t + 1.3) % 3.4) < 0.11;
        drawFace(mood === 'smile' ? 'happy' : mood, talk * 1.3, blink && !['smile', 'wink', 'flat', 'star', 'side'].includes(mood));
        thr.material.opacity = 0.7 + 0.3 * Math.sin(t * 20); thr.scale.setScalar(1 + 0.1 * Math.sin(t * 13));
        glowL.intensity = 0.2 + talk * 0.6;
      };
      return r;
    })();
    R.g.traverse(o => { o.castShadow = false; });

    // ================= LIGHT (moonlit night + warm fairy lights + phone glow) =================
    const hemi = new THREE.HemisphereLight(0x9fb4ff, 0x2a2018, 0.55); S.add(hemi);
    const moon = new THREE.DirectionalLight(0xbcd0ff, 0.75); moon.position.set(2.2, 3.4, -1.0); moon.target.position.set(0, 0.8, -0.5); moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); moon.shadow.bias = -0.0006;
    moon.shadow.camera.left = -3; moon.shadow.camera.right = 3; moon.shadow.camera.top = 3; moon.shadow.camera.bottom = -3; S.add(moon); S.add(moon.target);
    const key = new THREE.DirectionalLight(0xffd9b8, 0.8); key.position.set(1.0, 2.4, 3.0); key.target.position.set(0, 1.0, -0.6); S.add(key); S.add(key.target);
    const phoneL = new THREE.PointLight(0x9fd0ff, 0.0, 2.6, 1.6); phoneL.position.set(0.1, 1.9, 0.35); S.add(phoneL);
    const faceFill = new THREE.PointLight(0xffe2c8, 0.75, 4.5, 1.6); faceFill.position.set(0.0, 1.75, 1.3); S.add(faceFill);
    const rim = new THREE.DirectionalLight(0x7f9cff, 0.6); rim.position.set(-1.8, 2.2, -2.5); S.add(rim);

    // ================= POST: clean night grade =================
    const rtMain = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
    const bloom = new POST.UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.7, 0.55, 0.82);
    const oCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postU = { tC: { value: rtMain.texture }, res: { value: new THREE.Vector2(W, H) }, time: { value: 0 }, flash: { value: 0 }, dark: { value: 0 } };
    const postM = new THREE.ShaderMaterial({ uniforms: postU, depthTest: false, depthWrite: false, toneMapped: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `
        precision highp float; varying vec2 vUv; uniform sampler2D tC; uniform vec2 res; uniform float time, flash, dark;
        vec3 aces(vec3 x){ return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0., 1.); }
        vec3 srgb(vec3 c){ c = clamp(c, 0., 1.); return mix(c*12.92, 1.055*pow(c, vec3(1./2.4))-0.055, step(0.0031308, c)); }
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        void main(){ vec3 c = srgb(aces(texture2D(tC, vUv).rgb * 1.12));
          float l = dot(c, vec3(0.299, 0.587, 0.114));
          c = mix(c, c * vec3(0.92, 0.98, 1.08), smoothstep(0.5, 0.0, l));      // cool shadows
          c = mix(c, c * vec3(1.06, 1.0, 0.92), smoothstep(0.45, 1.0, l));      // warm highlights
          vec2 q = vUv - 0.5; c *= 1.0 - 0.38 * smoothstep(0.35, 0.95, length(q * vec2(0.95, 0.78)));
          c += (hash(vUv * res + time * 61.0) - 0.5) * 0.022;                  // fine grain
          c = mix(c, vec3(1.), flash); c *= 1.0 - dark;
          gl_FragColor = vec4(clamp(c, 0., 1.), 1.); }` });
    const postScene = new THREE.Scene(); const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postM); quad.frustumCulled = false; postScene.add(quad);
    const mkCanvas = (w = W, hh = H) => { const cv = document.createElement('canvas'); cv.width = w; cv.height = hh; const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; return [cv, cv.getContext('2d'), tx]; };
    const [hc, h, hTex] = mkCanvas();
    const hudScene = new THREE.Scene();
    const hudQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, toneMapped: false, depthTest: false })); hudQ.frustumCulled = false; hudScene.add(hudQ);
    K.draw = () => { const r = K.renderer;
      r.setRenderTarget(rtMain); r.clear(); r.render(S, K.cam); bloom.render(r, null, rtMain, 0, false);
      r.setRenderTarget(null); r.clear(); r.render(postScene, oCam); r.autoClear = false; r.render(hudScene, oCam); r.autoClear = true; };

    // ================= HUD helpers =================
    const INK = '#111318', YEL = '#ffd23f', RED = '#ff3b4a', GRN = '#2fc26b', BLU = '#3b82f6', CLA = '#d97757', MUT = '#8a8f99';
    const SERIF = '"Fraunces", "DM Serif Display", serif', MONO = '"Courier Prime", "DejaVu Sans Mono"', SANS = '"Inter Display"', EMO = '"Noto Color Emoji", "DejaVu Sans"';
    const rr = (c, x, y, w, hh, r, f, s, lw = 4) => { c.beginPath(); c.roundRect(x, y, w, hh, r); if (f) { c.fillStyle = f; c.fill(); } if (s) { c.strokeStyle = s; c.lineWidth = lw; c.stroke(); } };
    const txt = (c, s, x, y, size, col, wgt = 700, al = 'center', font = SANS) => { c.font = `${wgt} ${size}px ${font}`; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y); };
    const emo = (c, s, x, y, size) => { c.font = `${size}px ${EMO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#000'; c.fillText(s, x, y); };
    const pop = (t, a, d = 0.32) => eb(pr(t, a, a + d));
    const fmt = n => Math.round(n).toLocaleString('en-US');
    const stamp = (c, s, x, y, k, col, size = 56, rot = -0.14) => { if (k <= 0) return; const sc = lerp(2.4, 1, eo(k)); c.save(); c.globalAlpha = cl(k * 3); c.translate(x, y); c.rotate(rot); c.scale(sc, sc);
      c.font = `900 ${size}px ${SANS}`; const w = c.measureText(s).width + 44; rr(c, -w / 2, -size * 0.75, w, size * 1.5, 14, null, col, 7); c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, 0, 2); c.restore(); };
    // the phone geometry
    const PCX = 540, PCY = 596, PWd = 580, PHt = 1040, SW = 540, SH = 1000;
    const statusBar = (c, dark = true) => { const col = dark ? '#f2f2f2' : '#111'; txt(c, '11:47', 62, 44, 26, col, 700); rr(c, SW - 92, 33, 44, 22, 6, null, col, 2.5); rr(c, SW - 88, 37, 22, 14, 3, col); c.fillStyle = col; c.fillRect(SW - 46, 40, 3, 8);
      for (let k = 0; k < 4; k++) c.fillRect(SW - 150 + k * 9, 52 - k * 5, 6, 6 + k * 5); };
    const avatar = (c, x, y, r, kind) => { c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.clip();
      if (kind === 'maddie') { c.fillStyle = '#ffd9b0'; c.fillRect(x - r, y - r, 2 * r, 2 * r); c.fillStyle = '#2a1c15'; c.fillRect(x - r, y - r, 2 * r, r * 0.75); c.fillStyle = '#111'; [-1, 1].forEach(s => { c.beginPath(); c.ellipse(x + s * r * 0.3, y + r * 0.05, r * 0.09, r * 0.13, 0, 0, 7); c.fill(); }); c.fillStyle = '#2f3e5c'; c.fillRect(x - r, y + r * 0.62, 2 * r, r); }
      else if (kind === 'mom') { c.fillStyle = '#ffcfd6'; c.fillRect(x - r, y - r, 2 * r, 2 * r); emo(c, '👩', x, y + r * 0.08, r * 1.3); }
      else { c.fillStyle = kind; c.fillRect(x - r, y - r, 2 * r, 2 * r); }
      c.restore(); };
    // offscreen screen canvases (so a screen can be zoomed and swiped)
    const [sA, xA] = (() => { const cv = document.createElement('canvas'); cv.width = SW; cv.height = SH; return [cv, cv.getContext('2d')]; })();
    const [sB, xB] = (() => { const cv = document.createElement('canvas'); cv.width = SW; cv.height = SH; return [cv, cv.getContext('2d')]; })();

    // ---------- screen: profile (12 followers, or the 10,482 roll) ----------
    const GRID = ['#3b3f4a', '#4a3b3f', '#3f4a3b', '#4a463b', '#3b464a', '#463b4a', '#3f3b4a', '#4a3f3b', '#3b4a46'];
    const drawProfile = (c, t, win) => { c.fillStyle = '#0e0f13'; c.fillRect(0, 0, SW, SH); statusBar(c);
      txt(c, 'maddie.posts ▾', 34, 104, 32, '#fff', 800, 'left'); txt(c, '≡', SW - 44, 104, 40, '#fff', 700);
      avatar(c, 92, 214, 62, 'maddie'); c.lineWidth = 5; c.strokeStyle = win ? GRN : '#555'; c.beginPath(); c.arc(92, 214, 70, 0, 7); c.stroke();
      const fol = win ? lerp(12, 10482, eo(pr(t, C.COUNT + 0.15, B('m13') - 0.05) ** 0.8)) : 12;
      const stats = [[win ? '60' : '30', 'posts'], [fmt(fol), 'followers'], ['41', 'following']];
      stats.forEach(([n, l], i) => { const x = 236 + i * 108; txt(c, n, x, 200, i === 1 ? 40 : 34, i === 1 && win ? YEL : '#fff', 900); txt(c, l, x, 238, 20, '#c7c9cf', 600); });
      txt(c, win ? 'Day 60 · it finally worked 🙏' : 'Posting every day 💪 · day 30', 34, 316, 23, '#e8e8ea', 600, 'left');
      rr(c, 30, 352, SW - 60, 56, 12, '#262830'); txt(c, 'Edit profile', SW / 2, 380, 24, '#fff', 700);
      const g = 3, tw = (SW - 4) / 3;
      for (let i = 0; i < 9; i++) { const x = (i % 3) * (tw + 2), y = 430 + Math.floor(i / 3) * (tw * 1.25 + 2); c.fillStyle = GRID[i]; c.fillRect(x, y, tw, tw * 1.25);
        const sad = ['3', '7', '2', '11', '4', '1', '6', '0', '5'][i], big = ['1.2M', '380K', '96K', '2.1M', '54K', '710K', '45K', '120K', '3.4M'][i];
        if (win) { const gg = c.createLinearGradient(x, y, x, y + tw * 1.25); gg.addColorStop(0, ['#2b5876', '#7a2c3a', '#1f5a66', '#5a3a14', '#3a2b6e', '#6e2b4f', '#2b6e44', '#6e5a2b', '#2b3a6e'][i]); gg.addColorStop(1, '#0e0f13'); c.fillStyle = gg; c.fillRect(x, y, tw, tw * 1.25); }
        txt(c, '▶ ' + (win ? big : sad), x + 12, y + tw * 1.25 - 22, 22, win ? '#fff' : '#9a9da5', 800, 'left'); }
      if (win) { const k = pr(t, B('m13') - 0.05, B('m13') + 2.5); if (k > 0 && k < 1) { const r = K.rng(5); for (let i = 0; i < 46; i++) { const x0 = r() * SW, sp = 300 + r() * 500; const y = -20 + k * sp * 2.2 * (0.6 + r()); c.save(); c.translate(x0 + Math.sin(t * 6 + i) * 20, y); c.rotate(t * 5 + i); c.fillStyle = [YEL, RED, GRN, BLU, '#fff'][i % 5]; c.fillRect(-7, -4, 14, 8); c.restore(); } } }
      return [312, 200]; };   // zoom focus: the followers number
    // ---------- screen: followers list ----------
    const FOL = [['mom_1', 'Mom', 'mom'], ['mom.official', 'Mom (official)', 'mom'], ['mom_new_acc', 'Mom NEW ACCOUNT', 'mom'], ['mom_pls_work', 'mom pls work', 'mom'], ['rahul_77', 'Rahul', '#5b8def'], ['spam_bot_9182', 'Win iPhone 15 🎁', '#9a9a9a'], ['aunty_shanti', 'Shanti Aunty', '#e89b5b'], ['cricket_fan_99', 'Cricket Fan', '#4bb07a']];
    const drawFollowers = (c, t, fin) => { c.fillStyle = '#0e0f13'; c.fillRect(0, 0, SW, SH); statusBar(c);
      txt(c, '←', 40, 104, 36, '#fff', 700); txt(c, 'maddie.posts', SW / 2, 104, 30, '#fff', 800);
      txt(c, (fin ? '10,482' : '12') + ' followers', SW / 2 - 110, 166, 24, '#fff', 800); txt(c, '41 following', SW / 2 + 120, 166, 24, '#8a8f99', 700); rr(c, 40, 188, SW / 2 - 60, 4, 2, '#fff');
      rr(c, 30, 214, SW - 60, 52, 12, '#22242b'); txt(c, '🔍 Search', 56, 240, 22, '#8a8f99', 600, 'left', `${SANS}`);
      if (fin) txt(c, 'TOP FANS 💛', 34, 300, 22, YEL, 900, 'left');
      const y0 = fin ? 332 : 300;
      FOL.forEach(([u, n, a], i) => { const y = y0 + i * 84; if (y > SH - 40) return; const k = fin ? 1 : pop(t, SCR[1][1] + 0.05 + i * 0.05, 0.25); c.save(); c.globalAlpha = cl(k); c.translate((1 - k) * 60, 0);
        if (i < 4 && t > B('c1') + 0.1 && !fin) { rr(c, 18, y - 36, SW - 36, 76, 14, 'rgba(255,59,74,0.13)'); }
        avatar(c, 70, y, 30, a); txt(c, u, 118, y - 13, 24, '#fff', 800, 'left'); txt(c, n, 118, y + 17, 21, '#9a9da5', 600, 'left');
        if (fin && i < 4) { const hk = pop(t, at('c16', i * 0.22), 0.3); rr(c, SW - 150, y - 24, 120, 48, 12, '#2a2c34'); txt(c, 'Following', SW - 90, y, 20, '#fff', 700); if (hk > 0) { c.save(); c.translate(SW - 176, y); c.scale(hk * 1.2, hk * 1.2); emo(c, '❤️', 0, 0, 34); c.restore(); } }
        else { rr(c, SW - 150, y - 24, 120, 48, 12, i < 4 ? '#2a2c34' : '#2a2c34'); txt(c, 'Remove', SW - 90, y, 20, '#fff', 700); }
        c.restore(); });
      if (!fin) { // the ×4 circle (c1) and the "Forgot password?" toasts (m2)
        const k = pr(t, B('c1') + 0.05, B('c1') + 0.6); if (k > 0) { c.save(); c.strokeStyle = RED; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); const cx = SW / 2, cy = y0 + 1.5 * 84, rx = SW / 2 - 6, ry = 190; for (let a = 0; a <= k * 6.6; a += 0.05) { const px = cx + Math.cos(a - 2.2) * rx * (1 + 0.02 * Math.sin(a * 5)), py = cy + Math.sin(a - 2.2) * ry; a === 0 ? c.moveTo(px, py) : c.lineTo(px, py); } c.stroke(); c.restore();
          stamp(c, '×4 MOM', SW - 96, y0 - 26, pr(t, B('c1') + 0.4, B('c1') + 0.75), RED, 34, 0.12); }
        for (let i = 0; i < 4; i++) { const tk = pop(t, at('m2', 0.12 + i * 0.16), 0.28); if (tk <= 0) continue; const y = 640 + i * 78; c.save(); c.translate(SW / 2 + (i % 2 ? 14 : -14), y); c.scale(tk, tk); c.rotate((i % 2 ? 1 : -1) * 0.03);
          c.shadowColor = 'rgba(0,0,0,0.5)'; c.shadowBlur = 18; rr(c, -220, -32, 440, 64, 18, '#f4f4f6'); c.shadowBlur = 0; txt(c, '🔑  Forgot password?' + (i ? '  (again)' : ''), 0, 1, 25, INK, 800); c.restore(); } }
      else if (t > B('m15')) { const k = pr(t, B('m15'), B('m15') + 2.2), r = K.rng(9); for (let i = 0; i < 40; i++) { const x0 = r() * SW, y = -20 + k * (500 + r() * 900); c.save(); c.translate(x0, y); c.rotate(t * 4 + i); c.fillStyle = [YEL, RED, GRN, BLU, '#fff'][i % 5]; c.fillRect(-7, -4, 14, 8); c.restore(); } }
      return [SW / 2, y0 + 120]; };
    // ---------- screen: Claude's test page analytics (0 → 52,000) ----------
    const drawGraph = (c, t) => { c.fillStyle = '#f5f6fa'; c.fillRect(0, 0, SW, SH); statusBar(c, false);
      txt(c, 'Insights', 34, 104, 34, INK, 900, 'left'); rr(c, SW - 176, 84, 142, 42, 21, '#e4e7ef'); txt(c, 'Last 30 days', SW - 105, 105, 19, '#3a3f4a', 700);
      txt(c, "Claude's test page", 34, 160, 24, '#6b7280', 700, 'left');
      const k = eo(pr(t, at('c2', 0.25), at('c2', 0.95))), n = 52000 * k;
      const rup = t > B('m3') - 0.05 && t < B('c3') + 0.25, fix = t >= B('c3') + 0.05;
      c.font = `900 96px ${SANS}`; c.textAlign = 'left'; c.textBaseline = 'alphabetic'; c.fillStyle = INK; const ns = (rup ? '₹' : '') + fmt(n); c.fillText(ns, 34, 300);
      if (rup) { const q = pop(t, B('m3'), 0.3); c.save(); c.translate(360, 170); c.scale(q, q); emo(c, '🤔', 0, 0, 64); c.restore(); }
      if (t > B('c3')) { const sk = pr(t, B('c3'), B('c3') + 0.3); c.strokeStyle = RED; c.lineWidth = 8; c.beginPath(); c.moveTo(30, 262); c.lineTo(30 + 70 * sk, 262 - 40 * sk); c.stroke(); }
      txt(c, fix ? 'FOLLOWERS' : 'Followers', 36, 336, fix ? 30 : 26, fix ? GRN : '#6b7280', 900, 'left');
      if (fix) stamp(c, 'NOT RUPEES', 250, 392, pr(t, B('c3') + 0.15, B('c3') + 0.45), RED, 28, -0.08);
      // chart
      const gx = 40, gy = 420, gw = SW - 80, gh = 360; rr(c, 20, gy - 30, SW - 40, gh + 90, 24, '#ffffff'); c.strokeStyle = '#e6e8ef'; c.lineWidth = 2; for (let i = 0; i <= 4; i++) { c.beginPath(); c.moveTo(gx, gy + i * gh / 4); c.lineTo(gx + gw, gy + i * gh / 4); c.stroke(); }
      const curve = u => Math.pow(u, 2.6) * 0.92 + u * 0.08; c.beginPath(); const N = 60; let lx = gx, ly = gy + gh;
      const gp = c.createLinearGradient(0, gy, 0, gy + gh); gp.addColorStop(0, 'rgba(47,194,107,0.35)'); gp.addColorStop(1, 'rgba(47,194,107,0)');
      c.moveTo(gx, gy + gh); for (let i = 0; i <= N * k; i++) { const u = i / N; lx = gx + u * gw; ly = gy + gh - curve(u) * gh; c.lineTo(lx, ly); } c.lineTo(lx, gy + gh); c.closePath(); c.fillStyle = gp; c.fill();
      c.beginPath(); for (let i = 0; i <= N * k; i++) { const u = i / N, x = gx + u * gw, y = gy + gh - curve(u) * gh; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.strokeStyle = GRN; c.lineWidth = 7; c.lineJoin = 'round'; c.stroke();
      if (k > 0.02) { c.beginPath(); c.arc(lx, ly, 11, 0, 7); c.fillStyle = GRN; c.fill(); c.beginPath(); c.arc(lx, ly, 20 + 6 * Math.sin(t * 8), 0, 7); c.strokeStyle = 'rgba(47,194,107,0.4)'; c.lineWidth = 4; c.stroke(); }
      txt(c, 'Day 1', gx, gy + gh + 30, 18, '#9aa0ab', 700, 'left'); txt(c, 'Day 30', gx + gw, gy + gh + 30, 18, '#9aa0ab', 700, 'right');
      [['Reach', '4.8M'], ['Saves', '61K'], ['Shares', '38K']].forEach(([a, b], i) => { const x = 34 + i * 162, kk = pop(t, at('c2', 0.6) + i * 0.12, 0.3); c.save(); c.globalAlpha = cl(kk); rr(c, x, 880, 148, 92, 18, '#ffffff'); txt(c, b, x + 74, 912, 32, INK, 900); txt(c, a, x + 74, 948, 18, '#6b7280', 700); c.restore(); });
      return [200, 250]; };
    // ---------- screen: "teach me slowly" (lesson speed) ----------
    const drawSlow = (c, t) => { const g = c.createLinearGradient(0, 0, 0, SH); g.addColorStop(0, '#1b1530'); g.addColorStop(1, '#0d0b17'); c.fillStyle = g; c.fillRect(0, 0, SW, SH); statusBar(c);
      txt(c, 'GROWTH SCHOOL', SW / 2, 130, 24, CLA, 900); c.font = `900 72px ${SERIF}`; c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.fillText('Lesson 1', SW / 2, 230);
      txt(c, 'Student: Maddie', SW / 2, 280, 24, '#b9b3cf', 600);
      rr(c, 30, 340, SW - 60, 300, 28, '#2a2343'); txt(c, 'Playback speed', SW / 2, 384, 26, '#fff', 800);
      const opts = ['2×', '1×', '0.5×', '🐢'], sel = t > at('m4', 0.72) ? 3 : t > at('m4', 0.45) ? 2 : 1;
      opts.forEach((o, i) => { const x = 66 + i * 112, s = i === sel; rr(c, x, 440, 96, 96, 22, s ? YEL : '#3a3258'); if (i === 3) { emo(c, '🐢', x + 48, 490, 50); } else txt(c, o, x + 48, 488, 32, s ? INK : '#fff', 900); });
      if (t > B('c4') - 0.05) { const k = pop(t, B('c4') + 0.1, 0.35); c.save(); c.translate(SW / 2, 590); c.scale(k, k); txt(c, 'Speed set by Claude:  🐢🐢🐢', 0, 0, 24, YEL, 800, 'center', `${SANS}, ${EMO}`); c.restore(); }
      rr(c, 30, 680, SW - 60, 270, 28, '#2a2343'); txt(c, 'Today:', 60, 726, 24, '#b9b3cf', 700, 'left');
      ['1  Find what already worked', '2  Copy the structure', '3  Write 10 hooks', '4  Build it in code', '5  The comment trick'].forEach((s, i) => { const k = pop(t, at('c4', 0.1) + i * 0.1, 0.25); c.save(); c.globalAlpha = cl(k); txt(c, s, 60, 770 + i * 36, 24, '#fff', 700, 'left'); c.restore(); });
      return [SW / 2, 488]; };
    // ---------- screen: viral reels in your niche (sorted) ----------
    const VR = [['3.4M', '#ff6b4a', 'POV: you finally get it'], ['870K', '#3b82f6', '1 trick nobody uses'], ['1.9M', '#a855f7', 'I tried this for 7 days'], ['45K', '#22a06b', 'Stop doing this'], ['12K', '#f59e0b', 'Day 1 of posting'], ['210K', '#ec4899', 'Wait for the end']];
    const vOrder = [0, 2, 1, 5, 3, 4];   // sorted by views
    const drawViral = (c, t) => { c.fillStyle = '#0e0f13'; c.fillRect(0, 0, SW, SH); statusBar(c);
      rr(c, 30, 84, SW - 60, 54, 14, '#22242b'); txt(c, '🔍  ai tools reels', 56, 111, 24, '#c7c9cf', 600, 'left', `${SANS}, ${EMO}`);
      txt(c, 'Sorted by: views ↓', 34, 168, 22, YEL, 800, 'left');
      const sk = sm(pr(t, at('c5', 0.55), at('c5', 0.95))), cw = (SW - 72) / 2, ch = 238;
      VR.forEach((v, i) => { const p0 = i, p1 = vOrder.indexOf(i), p = lerp(p0, p1, sk); const col = Math.round(p) % 2, row = Math.floor(p / 2);
        const x0 = 24 + (p0 % 2) * (cw + 24), y0 = 196 + Math.floor(p0 / 2) * (ch + 22), x1 = 24 + (p1 % 2) * (cw + 24), y1 = 196 + Math.floor(p1 / 2) * (ch + 22);
        const x = lerp(x0, x1, sk), y = lerp(y0, y1, sk) - Math.sin(sk * Math.PI) * 40 * (i % 2 ? 1 : -1);
        const gg = c.createLinearGradient(x, y, x, y + ch); gg.addColorStop(0, v[1]); gg.addColorStop(1, '#121318'); rr(c, x, y, cw, ch, 18, gg);
        txt(c, v[2], x + 16, y + ch - 66, 19, '#fff', 800, 'left'); txt(c, '▶ ' + v[0], x + 16, y + ch - 30, 26, '#fff', 900, 'left');
        if (i === 0 && sk > 0.95) { const gl = 0.5 + 0.5 * Math.sin(t * 8); c.save(); c.shadowColor = YEL; c.shadowBlur = 30 * gl; rr(c, x - 3, y - 3, cw + 6, ch + 6, 20, null, YEL, 6); c.restore(); emo(c, '🔥', x + cw - 34, y + 34, 40); } });
      if (t > B('m5') - 0.05 && t < B('c6') + 0.6) { const k = pop(t, B('m5') + 0.2, 0.3); c.save(); c.translate(24 + cw / 2, 196 + ch / 2); c.scale(k, k); rr(c, -100, -32, 200, 64, 32, '#fff'); txt(c, '↻ Repost', 0, 1, 28, INK, 900); c.restore(); }
      stamp(c, 'STEALING ✗', SW / 2, 520, pr(t, at('c6', 0.05), at('c6', 0.25)), RED, 52, -0.16);
      if (t > at('c6', 0.6)) { const k = pop(t, at('c6', 0.6), 0.3); c.save(); c.translate(SW / 2, 900); c.scale(k, k); rr(c, -230, -36, 460, 72, 36, GRN); txt(c, 'COPY THE STRUCTURE ✓', 0, 1, 28, '#fff', 900); c.restore(); }
      return [24 + cw / 2, 196 + ch / 2]; };
    // ---------- screen: structure (Hook / Problem / Proof / Payoff) ----------
    const BLK = [['HOOK', '0–2s', '#ff4d5e', '"I posted 30 days…"'], ['PROBLEM', '2–8s', '#ff9f1c', '"…12 followers"'], ['PROOF', '8–15s', '#3b82f6', '"…52K in 30 days"'], ['PAYOFF', '15–45s', '#2fc26b', '"…here\'s how"']];
    const drawStruct = (c, t) => { c.fillStyle = '#0e0f13'; c.fillRect(0, 0, SW, SH); statusBar(c);
      const gg = c.createLinearGradient(0, 90, 0, 330); gg.addColorStop(0, '#ff6b4a'); gg.addColorStop(1, '#2a1410'); rr(c, 30, 90, SW - 60, 230, 22, gg); txt(c, '▶ 3.4M', 56, 290, 30, '#fff', 900, 'left'); txt(c, 'POV: you finally get it', 56, 250, 22, '#fff', 700, 'left'); emo(c, '🔥', SW - 72, 130, 40);
      txt(c, 'Why it went viral:', 34, 370, 26, '#fff', 800, 'left');
      const think = t >= B('m7') - 0.2 && t < B('c7');
      BLK.forEach(([n, s, col, ex], i) => { const y = 410 + i * 140; const on = t > at('c7', i * 0.24); const kk = on ? pop(t, at('c7', i * 0.24), 0.3) : 0;
        rr(c, 30, y, SW - 60, 120, 20, '#1d1f26'); if (on) { c.save(); c.globalAlpha = cl(kk); rr(c, 30, y, SW - 60, 120, 20, col); c.restore(); }
        if (on) { c.save(); c.translate(60, y + 60); c.scale(lerp(1.3, 1, cl(kk)), lerp(1.3, 1, cl(kk))); txt(c, n, 0, -16, 40, '#fff', 900, 'left'); c.restore(); txt(c, ex, 60, y + 88, 20, 'rgba(255,255,255,0.9)', 700, 'left'); txt(c, s, SW - 60, y + 44, 22, 'rgba(255,255,255,0.85)', 800, 'right'); }
        else { txt(c, t > B('m6') + 0.2 ? '? ? ?' : '', SW / 2, y + 60, 34, '#555a66', 900); } });
      if (think) { const k = pop(t, B('m7') - 0.1, 0.3); c.save(); c.translate(SW / 2, 700); c.scale(k, k); c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 30; rr(c, -230, -110, 460, 220, 26, '#f4f4f6'); c.shadowBlur = 0;
        emo(c, '🧠', -150, -30, 64); txt(c, 'Maddie is thinking…', 30, -40, 26, INK, 800); rr(c, -60, 0, 260, 22, 11, '#dcdde3'); rr(c, -60, 0, 260 * 0.03 + Math.max(0, Math.sin(t * 2)) * 4, 22, 11, RED); txt(c, '3%', 70, 52, 22, RED, 900); c.restore(); }
      return [SW / 2, 410 + 1.5 * 140]; };
    // ---------- screen: 10 hooks (the last one is Maddie's) ----------
    const HK = ['I posted 30 days. 12 followers.', 'Your mom is your only fan?', 'Nobody tells you this about reels', 'Stop posting every day.', 'I copied a viral reel (legally)', 'POV: an AI runs your page', 'This hook got 3.4M views', '3 seconds. That\'s all you get.', 'Why your reels die at 200 views', 'Hi guys, welcome back to my channel'];
    const drawHooks = (c, t) => { c.fillStyle = '#fbf6e9'; c.fillRect(0, 0, SW, SH); statusBar(c, false);
      txt(c, '‹ Notes', 30, 104, 26, '#c48a1a', 700, 'left'); c.font = `900 50px ${SERIF}`; c.fillStyle = INK; c.textAlign = 'left'; c.textBaseline = 'alphabetic'; c.fillText('10 hooks', 34, 184);
      const t0 = at('c8', 0.1), per = 0.2;
      HK.forEach((s, i) => { const a = i < 9 ? t0 + i * per : B('m8') - 0.45; if (t < a) return; const y = 236 + i * 72, n = Math.floor(cl((t - a) / 0.25) * s.length);
        const mine = i === 9; if (mine && t > B('m8')) { rr(c, 18, y - 30, SW - 36, 62, 12, 'rgba(255,210,63,0.6)'); }
        txt(c, (i + 1) + '.', 34, y, 23, '#b0a58c', 800, 'left'); c.font = `700 23px ${SANS}`; c.fillStyle = INK; c.textAlign = 'left'; c.fillText(s.slice(0, n), 74, y + 1);
        if (mine && t > B('m8') + 0.1) txt(c, 'mine! ↓', 74, y - 44, 24, '#c48a1a', 900, 'left');
        if (mine && t > B('c9')) { const k = pr(t, B('c9'), B('c9') + 0.25); c.strokeStyle = RED; c.lineWidth = 6; c.beginPath(); c.moveTo(70, y + 2); c.lineTo(70 + (SW - 120) * k, y + 2); c.stroke(); } });
      stamp(c, 'FAILING SINCE 2016', SW / 2, 830, pr(t, at('c9', 0.55), at('c9', 0.8)), RED, 40, -0.12);
      return [0, 236 + 9 * 72]; };
    // ---------- screen: "can't edit" → typing E… D… ----------
    const drawEdit = (c, t) => { c.fillStyle = '#16171c'; c.fillRect(0, 0, SW, SH); statusBar(c);
      txt(c, 'Video Editor', SW / 2, 104, 30, '#fff', 800); rr(c, 30, 150, SW - 60, 300, 18, '#000'); emo(c, '🎬', SW / 2, 290, 90);
      for (let i = 0; i < 3; i++) { rr(c, 30, 480 + i * 56, SW - 60, 42, 8, '#23252c'); for (let k = 0; k < 5; k++) rr(c, 40 + k * 96 + (i * 31) % 50, 486 + i * 56, 70 + (k * 17 + i * 11) % 30, 30, 6, [BLU, '#a855f7', GRN][i]); }
      if (t > B('m9') + 0.3) { const k = pop(t, B('m9') + 0.3, 0.3); c.save(); c.translate(SW / 2, 300); c.scale(k, k); rr(c, -200, -60, 400, 120, 20, RED); txt(c, '⚠ 247 errors', 0, -14, 32, '#fff', 900); txt(c, 'skill not found', 0, 26, 22, '#ffe2e5', 700); c.restore(); }
      // the spelling test
      if (t > B('c10') - 0.05) { const k = pop(t, B('c10'), 0.3); c.save(); c.globalAlpha = cl(k * 1.5); rr(c, 0, 660, SW, SH - 660, 0, '#f4f4f6'); c.restore();
        txt(c, 'Spell it:', 40, 702, 22, '#6b7280', 800, 'left');
        const s = t > at('m10', 0.42) ? 'E D …' : t > at('m10', 0.1) ? 'E' : ''; c.font = `900 ${s.length > 2 ? 110 : 120}px ${SANS}`; c.fillStyle = INK; c.textAlign = 'left'; c.textBaseline = 'alphabetic'; c.fillText(s + (Math.floor(t * 3) % 2 ? '|' : ''), 40, 830);
        if (t > at('m10', 0.75)) { const k2 = pop(t, at('m10', 0.75), 0.3); c.save(); c.translate(SW / 2, 900); c.scale(k2, k2); rr(c, -170, -34, 340, 68, 34, BLU); txt(c, 'Did you mean: edit?', 0, 1, 24, '#fff', 800); c.restore(); } }
      return [SW / 2, 780]; };
    // ---------- screen: Claude builds it in code → YES → not yet ----------
    const CODE = ['const reel = new Reel("12 followers")', 'reel.hook("I posted every day…")', 'reel.scene(rooftop, { night: true })', 'reel.add(maddie, claude)', 'reel.captions({ keyword: "yellow" })', 'reel.render(1080, 1920)'];
    const drawBuild = (c, t) => { c.fillStyle = '#1e1d1b'; c.fillRect(0, 0, SW, SH); statusBar(c);
      txt(c, '✻', SW / 2 - 66, 106, 38, CLA, 700); txt(c, 'Claude', SW / 2 + 14, 106, 34, '#f2efe9', 800);
      rr(c, 24, 150, SW - 48, 300, 16, '#121110'); const tc = (t - at('c11', 0.0)) * 34; let used = 0;
      CODE.forEach((s, i) => { const n = Math.floor(cl(tc - used, 0, s.length)); used += s.length; if (n <= 0) return; c.font = `700 19px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = i % 2 ? '#e6c07b' : '#9cdcfe'; c.fillText(s.slice(0, n), 44, 186 + i * 44); });
      // the scene building itself (isometric blocks)
      const bk = cl((tc - 30) / (used - 30)); rr(c, 24, 470, SW - 48, 300, 16, '#0b1024'); const r = K.rng(4);
      for (let i = 0; i < 14; i++) { const kk = cl(bk * 14 - i); if (kk <= 0) continue; const bx = 60 + (i % 7) * 62, bh = 40 + r() * 120, by = 740 - 0; const yy = lerp(by - bh - 120, by - bh, eo(kk)); c.globalAlpha = cl(kk * 2);
        c.fillStyle = ['#2b3a6e', '#3a2b6e', '#22305a'][i % 3]; c.fillRect(bx, yy, 52, bh); for (let w = 0; w < bh - 16; w += 18) for (let q = 0; q < 2; q++) if (r() < 0.6) { c.fillStyle = '#ffd27a'; c.fillRect(bx + 10 + q * 20, yy + 10 + w, 8, 8); } c.globalAlpha = 1; }
      if (bk >= 1) { emo(c, '🧑', SW / 2 - 40, 700, 54); emo(c, '🎧', SW / 2 + 40, 690, 44); }
      // YES button
      const yes = t > B('m11') - 0.05 && t < B('c12') - 0.02, wait = t >= B('c12') - 0.02;
      const bkk = pop(t, at('c11', 0.7), 0.3); c.save(); c.translate(SW / 2, 870); c.scale(bkk * (yes ? 0.92 + 0.08 * cl((t - B('m11')) * 6) : 1), bkk);
      rr(c, -200, -50, 400, 100, 50, wait ? '#3a3a40' : GRN); txt(c, wait ? '⏳ Rendering… ' + Math.min(99, Math.floor(40 + (t - B('c12')) * 30)) + '%' : yes ? 'YES ✓' : 'Post it?  YES', 0, 1, 34, '#fff', 900, 'center', `${SANS}, ${EMO}`); c.restore();
      if (yes) { const k = pr(t, B('m11'), B('m11') + 0.6), r2 = K.rng(3); for (let i = 0; i < 18; i++) { const a = r2() * 7, d = 60 + k * 220 * (0.5 + r2()); c.save(); c.globalAlpha = 1 - k; emo(c, '✨', SW / 2 + Math.cos(a) * d, 870 + Math.sin(a) * d * 0.6, 28); c.restore(); } }
      if (wait) stamp(c, 'NOT YET', SW / 2, 780, pr(t, at('c12', 0.3), at('c12', 0.6)), RED, 40, -0.12);
      return [SW / 2, 870]; };
    // ---------- screen: the comment trick (comment → auto DM → follow) ----------
    const CMT = [['priya.k', 'GROW', '#f472b6'], ['arjun_23', 'GROW 🔥', '#60a5fa'], ['neha.codes', 'GROW pls', '#34d399'], ['vik_ram', 'GROW', '#fbbf24']];
    const drawDM = (c, t) => { c.fillStyle = '#0e0f13'; c.fillRect(0, 0, SW, SH); statusBar(c);
      txt(c, 'Comments', SW / 2, 104, 30, '#fff', 800);
      CMT.forEach(([u, m, col], i) => { const a = at('c13', 0.08 + i * 0.1); if (t < a) return; const k = pop(t, a, 0.25), y = 170 + i * 82; c.save(); c.globalAlpha = cl(k); c.translate((1 - k) * 80, 0);
        avatar(c, 62, y, 28, col); txt(c, u, 104, y - 13, 22, '#fff', 800, 'left'); txt(c, m, 104, y + 15, 26, YEL, 900, 'left', `${SANS}, ${EMO}`); c.restore(); });
      // the DM sliding up
      const dk = eo(pr(t, at('c13', 0.5), at('c13', 0.7))); if (dk > 0) { const y0 = lerp(SH, 520, dk); rr(c, 0, y0, SW, SH, 30, '#1b1d24'); txt(c, '✉  Message to priya.k', SW / 2, y0 + 40, 22, '#9aa0ab', 800);
        const bubbles = [[at('c13', 0.72), 'Hey Priya 👋 follow to unlock your guide', false], [at('c13', 0.9), 'Followed ✅', true], [B('m12') + 0.1, 'Here you go 📩 growth-kit.pdf', false]];
        bubbles.forEach(([a, s, me], i) => { if (t < a) return; const k = pop(t, a, 0.25), y = y0 + 90 + i * 92; c.save(); c.font = `800 22px ${SANS}, ${EMO}`; const w = Math.min(SW - 80, c.measureText(s).width + 44); const x = me ? SW - 30 - w : 30; c.translate(x + w / 2, y); c.scale(k, k); rr(c, -w / 2, -32, w, 64, 30, me ? BLU : '#2e313a'); txt(c, s, 0, 1, 22, '#fff', 800, 'center', `${SANS}, ${EMO}`); c.restore(); }); }
      // +1 followers floating
      for (let i = 0; i < 6; i++) { const a = at('c13', 0.92) + i * 0.32; if (t < a || t > a + 1.2) continue; const k = (t - a) / 1.2; c.save(); c.globalAlpha = 1 - k; txt(c, '+1 follower', 120 + (i * 97) % 300, 480 - k * 160, 26, GRN, 900); c.restore(); }
      if (t > B('m12')) { const r = K.rng(8); for (let i = 0; i < 16; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 9 + i * 1.7); c.save(); c.globalAlpha = tw; const x = r() * SW, y = 140 + r() * 700; if (t > B('c14') + 0.1) txt(c, ['{ }', '</>', ';', '=>'][i % 4], x, y, 30, '#9cdcfe', 900, 'center', MONO); else emo(c, '✨', x, y, 28); c.restore(); } }
      return [SW / 2, 600]; };
    const SCREENS = { profile: (c, t) => drawProfile(c, t, false), followers: (c, t) => drawFollowers(c, t, false), graph: drawGraph, slow: drawSlow, viral: drawViral, struct: drawStruct, hooks: drawHooks, edit: drawEdit, build: drawBuild, dm: drawDM,
      later: (c, t) => drawProfile(c, t, false), count: (c, t) => drawProfile(c, t, true), final: (c, t) => drawFollowers(c, t, true) };
    // in-phone content zooms: [screen, t0, t1, scale]
    const ZM = [['profile', at('m1', 0.62), E('m1') + 0.1, 2.1], ['graph', B('m3') - 0.05, E('c3') + 0.1, 1.32], ['hooks', B('m8') - 0.05, E('c9') + 0.2, 1.15], ['count', B('m13') - 0.25, E('c15') + 0.1, 1.7], ['struct', B('m7') - 0.1, B('c7') - 0.05, 1.12]];
    const zoomOf = (name, t) => { let z = 1; ZM.forEach(([n, a, b, s]) => { if (n === name && t > a - 0.3 && t < b + 0.35) { const k = t < a ? 0 : t < a + 0.3 ? eo(pr(t, a, a + 0.3)) : t < b ? 1 : 1 - sm(pr(t, b, b + 0.35)); z = Math.max(z, lerp(1, s, k)); } }); return z; };
    const renderScreen = (cv, cx, name, t) => { cx.setTransform(1, 0, 0, 1, 0, 0); cx.clearRect(0, 0, SW, SH);
      // measure the focus point first (draw at 1×), then redraw zoomed about it
      const z = zoomOf(name, t); const foc = SCREENS[name](cx, t);
      if (z > 1.001 && foc) { cx.clearRect(0, 0, SW, SH); cx.save(); cx.translate(SW / 2, SH / 2); cx.scale(z, z); const fx = cl(lerp(SW / 2, foc[0], 0.85), SW / (2 * z), SW - SW / (2 * z)), fy = cl(lerp(SH / 2, foc[1], 0.85), SH / (2 * z), SH - SH / (2 * z)); cx.translate(-fx, -fy); SCREENS[name](cx, t); cx.restore(); } };
    // the phone
    const phoneAt = t => { const k = pop(t, C.PH, 0.5); const out = 1 - sm(pr(t, D - 0.9, D - 0.25)); const lat = t >= C.LATER && t < C.COUNT ? 1 - sm(pr(t, C.LATER, C.LATER + 0.3)) + sm(pr(t, C.COUNT - 0.3, C.COUNT)) : 1; return k * out * cl(lat); };
    const bump = t => { let b = 0; SCR.forEach(([n, a]) => { if (a > 0) b = Math.max(b, K.pulse(t, a, 0.3) * 0.035); }); ['m3', 'm8', 'm11', 'm13'].forEach(id => { b = Math.max(b, K.pulse(t, B(id), 0.28) * 0.045); }); return b; };
    const drawPhone = (t) => { const c = h, k = phoneAt(t); if (k <= 0.001) return;
      const si = scrAt(t), name = SCR[si][0], ts = t - SCR[si][1], swipe = si > 0 && ts < TR && SCR[si][0] !== 'later' && SCR[si - 1][0] !== 'later' ? sm(ts / TR) : 1;
      renderScreen(sA, xA, name, t); if (swipe < 1) renderScreen(sB, xB, SCR[si - 1][0], t);
      const s = lerp(0.15, 1, k) * (1 + bump(t)), bob = Math.sin(t * 1.3) * 5, tilt = Math.sin(t * 0.9) * 0.012;
      c.save(); c.translate(PCX, PCY + bob + (1 - k) * 200); c.rotate(tilt); c.scale(s, s); c.globalAlpha = cl(k * 1.4);
      c.shadowColor = 'rgba(0,0,0,0.65)'; c.shadowBlur = 70; c.shadowOffsetY = 30; rr(c, -PWd / 2, -PHt / 2, PWd, PHt, 84, '#0c0d10'); c.shadowColor = 'transparent';
      rr(c, -PWd / 2 + 2, -PHt / 2 + 2, PWd - 4, PHt - 4, 82, null, '#3a3d46', 4); rr(c, PWd / 2 - 2, -260, 6, 110, 3, '#2a2c33'); rr(c, -PWd / 2 - 4, -300, 6, 70, 3, '#2a2c33'); rr(c, -PWd / 2 - 4, -210, 6, 70, 3, '#2a2c33');
      c.save(); c.beginPath(); c.roundRect(-SW / 2, -SH / 2, SW, SH, 62); c.clip();
      if (swipe < 1) { c.drawImage(sB, -SW / 2 - swipe * SW * 0.35, -SH / 2); c.globalAlpha = 1; c.drawImage(sA, -SW / 2 + (1 - swipe) * SW, -SH / 2); c.fillStyle = `rgba(0,0,0,${0.3 * (1 - swipe)})`; }
      else c.drawImage(sA, -SW / 2, -SH / 2);
      c.restore(); rr(c, -62, -SH / 2 + 16, 124, 36, 18, '#000');
      // screen glare
      const gl = c.createLinearGradient(-PWd / 2, -PHt / 2, PWd / 2, PHt / 2); gl.addColorStop(0, 'rgba(255,255,255,0.0)'); gl.addColorStop(0.45, 'rgba(255,255,255,0.05)'); gl.addColorStop(0.5, 'rgba(255,255,255,0.0)'); c.fillStyle = gl; c.beginPath(); c.roundRect(-SW / 2, -SH / 2, SW, SH, 62); c.fill();
      c.restore(); };
    // "30 DAYS LATER" full-frame card
    const drawLater = (t) => { const a = C.LATER, b = C.COUNT; if (t < a - 0.01 || t > b + 0.3) return; const k = t < a + 0.3 ? sm(pr(t, a, a + 0.3)) : t > b - 0.15 ? 1 - sm(pr(t, b - 0.15, b + 0.3)) : 1; const c = h;
      c.save(); c.globalAlpha = k * 0.93; c.fillStyle = '#05070f'; c.fillRect(0, 0, W, H); c.globalAlpha = k;
      const day = Math.min(30, 1 + Math.floor(eo(pr(t, a + 0.25, b - 0.45)) * 29));
      c.save(); c.translate(W / 2, 760); const fl = (t * 12) % 1; rr(c, -170, -190, 340, 380, 28, '#f4f4f6'); rr(c, -170, -190, 340, 92, 28, RED); c.fillStyle = RED; c.fillRect(-170, -130, 340, 32); txt(c, 'DAY', 0, -142, 40, '#fff', 900); txt(c, String(day), 0, 60, 190, INK, 900); c.restore();
      const tk = pop(t, a + 0.2, 0.4); c.save(); c.translate(W / 2, 1110); c.scale(tk, tk); c.font = `900 110px ${SERIF}`; c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.fillText('30 DAYS', 0, 0); c.fillStyle = YEL; c.fillText('LATER…', 0, 120); c.restore();
      c.restore(); };
    const hudDraw = t => { h.setTransform(1, 0, 0, 1, 0, 0); h.clearRect(0, 0, W, H); drawPhone(t); drawLater(t); hTex.needsUpdate = true; };

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const smv = (a, b, k) => a + (b - a) * k;
    const toR = [0.75, 0.05], toCam = [-0.12, 0.02], up = [0.08, -0.4], toM = [-0.45, 0.06], rUp = [-0.15, -0.35], rCam = [0.25, 0.0];
    const P0 = { L: [-0.3, 0, -0.05, -0.1], R: [-0.3, 0, 0.05, -0.1] };
    const POSE = { rest: P0, shrug: { L: [-0.55, 0.1, -0.55, -1.25], R: [-0.55, -0.1, 0.55, -1.25] }, both: { L: [-2.7, 0.15, -0.45, -0.35], R: [-2.7, -0.15, 0.45, -0.35] },
      chin: { L: [-0.3, 0, -0.05, -0.1], R: [-1.15, -0.55, 0.1, -2.0] }, slump: { L: [0.1, 0, -0.2, -0.05], R: [0.1, 0, 0.2, -0.05] },
      point: { L: [-0.3, 0, -0.05, -0.1], R: [-2.4, -0.2, 0.1, -0.2] }, hold: { L: [-0.75, 0.3, -0.25, -1.35], R: [-0.75, -0.3, 0.25, -1.35] },
      head: { L: [-2.4, 0.1, -0.9, -2.2], R: [-2.4, -0.1, 0.9, -2.2] } };
    // per line: Maddie [face, pose, look, lean, bounce], Claude [mood, look, bob]
    const ACT = {
      m1: [['worried', 'slump', toCam, 0.25, 0], ['calm', toM]], m1b: [['worried', 'shrug', toCam, 0.15, 0], ['calm', toM]],
      c1: [['neutral', 'rest', toR, 0.05, 0], ['side', toM]], m2: [['smile', 'shrug', toR, 0.05, 0], ['flat', toM]],
      c2: [['neutral', 'hold', up, -0.05, 0], ['smile', rUp]], m3: [['shock', 'both', toR, -0.1, 1.2], ['calm', toM]],
      c3: [['shock', 'rest', toR, 0.0, 0], ['flat', rCam]], m4: [['smile', 'point', toR, 0.1, 0], ['calm', toM]],
      c4: [['neutral', 'rest', toR, 0.05, 0], ['wink', toM]], c5: [['neutral', 'hold', up, -0.05, 0], ['smile', rUp]],
      m5: [['neutral', 'shrug', toR, 0.05, 0], ['calm', toM]], c6: [['worried', 'rest', toR, 0.1, 0], ['flat', toM]],
      m6: [['smile', 'point', up, 0.0, 0], ['calm', toM]], m7: [['worried', 'rest', toCam, 0.0, 0], ['side', rCam]],
      c7: [['neutral', 'hold', up, -0.05, 0], ['smile', rUp]], c8: [['neutral', 'hold', up, -0.05, 0], ['smile', rUp]],
      m8: [['shock', 'point', up, -0.1, 0.8], ['calm', toM]], c9: [['worried', 'slump', toR, 0.2, 0], ['flat', toM]],
      m9: [['worried', 'slump', toR, 0.25, 0], ['calm', toM]], c10: [['shock', 'rest', toR, 0.0, 0], ['wink', toM]],
      m10: [['smile', 'chin', up, 0.05, 0.4], ['calm', toM]], c11: [['neutral', 'hold', up, -0.05, 0], ['smile', rUp]],
      m11: [['shock', 'both', toR, -0.15, 1.6], ['calm', toM]], c12: [['worried', 'slump', toR, 0.15, 0], ['flat', rCam]],
      c13: [['neutral', 'hold', up, -0.05, 0], ['smile', rUp]], m12: [['shock', 'both', toR, -0.05, 0.5], ['calm', toM]],
      c14: [['smile', 'rest', toR, 0.0, 0], ['wink', toM]], m13: [['shock', 'both', toCam, -0.15, 1.8], ['star', toM, 0.04]],
      c15: [['smile', 'both', toR, -0.05, 1.0], ['star', toM]], m14: [['worried', 'chin', toR, 0.1, 0], ['calm', toM]],
      c16: [['neutral', 'rest', toR, 0.0, 0], ['wink', rCam]], m15: [['smile', 'head', toCam, -0.1, 1.2], ['happy', toM, 0.03]],
    };
    const curLine = t => { let id = 'm1'; window.SCENE.lines.forEach((l, i) => { if (t >= L[i].t - 0.12) id = l.id; }); return id; };
    let curPose = JSON.parse(JSON.stringify(P0));
    const acting = (t) => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 || Math.abs(t - last) > 0.2 ? 1 : cl((t - last) * 6); last = t;
      const id = curLine(t); let [[face, pose, mL, lean, bounce], [mood, rL, bob = 0]] = ACT[id];
      if (t >= C.LATER && t < B('m13') - 0.2) { face = 'neutral'; pose = 'hold'; mL = up; lean = -0.05; bounce = 0; mood = 'smile'; rL = rUp; }
      if (face === 'smile' && mT > 0.05 && id[0] === 'm') face = 'neutral';
      mYaw = smv(mYaw, mL[0], k); mPitch = smv(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.9, face, look: [mYaw, mPitch], lean });
      const tgt = POSE[pose]; ['L', 'R'].forEach(s => { for (let i = 0; i < 4; i++) curPose[s][i] = smv(curPose[s][i], tgt[s][i], k); });
      const [aL, aR] = M.arms; const bx = (pose === 'both' || pose === 'head') ? 0.14 * Math.sin(t * 12) : 0;
      aL.sh.rotation.set(curPose.L[0] + bx, curPose.L[1], curPose.L[2]); aL.el.rotation.x = curPose.L[3];
      aR.sh.rotation.set(curPose.R[0] + bx, curPose.R[1], curPose.R[2]); aR.el.rotation.x = curPose.R[3];
      M.g.position.y = bounce * 0.022 * Math.abs(Math.sin(t * 9));
      rYaw = smv(rYaw, rL[0], k); rPitch = smv(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood, bob: bob * Math.abs(Math.sin(t * 7)) });
      // world life
      fairy.forEach((b, i) => { const on = 0.55 + 0.45 * Math.sin(t * 3 + i * 1.3); b.material.color.setRGB(1 * on + 0.2, 0.82 * on + 0.1, 0.48 * on); });
      cloth.forEach((m2, i) => { m2.rotation.y = Math.sin(t * 1.4 + i) * 0.12; m2.rotation.x = Math.sin(t * 1.1 + i * 2) * 0.05; });
      planeL.position.x = -9 + ((t * 0.55) % 18); planeL.visible = (t % 1.1) < 0.18;
      phoneL.intensity = 0.9 * phoneAt(t);
    };

    // ================= CAMERA (cuts per speaker, zoom punches + slow pushes on the jokes) =================
    const Pp = (pos, look) => ({ pos, look });
    const sh = {
      two: [Pp([0.2, 1.52, 4.55], [0.2, 1.98, -0.6]), Pp([0.18, 1.51, 4.3], [0.2, 1.96, -0.6])],
      twoL: [Pp([-0.35, 1.5, 4.35], [0.15, 1.96, -0.6]), Pp([-0.3, 1.49, 4.1], [0.15, 1.94, -0.6])],
      mad: [Pp([-0.02, 1.47, 3.65], [MX + 0.08, 1.87, MZ]), Pp([-0.04, 1.46, 3.45], [MX + 0.08, 1.85, MZ])],
      rob: [Pp([0.38, 1.47, 3.65], [RX - 0.18, 1.87, RZ]), Pp([0.4, 1.46, 3.45], [RX - 0.18, 1.85, RZ])],
      end: [Pp([0.2, 1.52, 4.3], [0.2, 1.98, -0.6]), Pp([0.2, 1.56, 5.0], [0.2, 2.02, -0.6])],
    };
    const SHOT = { m1: 'two', m1b: 'mad', c1: 'rob', m2: 'mad', c2: 'twoL', m3: 'mad', c3: 'rob', m4: 'mad', c4: 'rob', c5: 'two', m5: 'mad', c6: 'rob', m6: 'mad', m7: 'mad', c7: 'two',
      c8: 'two', m8: 'mad', c9: 'rob', m9: 'mad', c10: 'rob', m10: 'mad', c11: 'two', m11: 'mad', c12: 'rob', c13: 'two', m12: 'mad', c14: 'rob', m13: 'mad', c15: 'rob', m14: 'mad', c16: 'rob', m15: 'end' };
    const ids = window.SCENE.lines.map(l => l.id);
    const plan = []; ids.forEach((id, i) => { const a = i ? B(id) - 0.12 : 0, b = i < ids.length - 1 ? B(ids[i + 1]) - 0.12 : D + 5; let s = SHOT[id];
      if (id === 'm13') plan.push([C.LATER, a, sh.two]);
      plan.push([a, b, sh[s]]); });
    // merge identical consecutive shots so the move continues instead of restarting
    const shots = []; plan.forEach(([a, b, s]) => { const p = shots[shots.length - 1]; if (p && p.s === s && Math.abs(p.t[1] - a) < 0.01) { p.t[1] = b; } else shots.push({ t: [a, b], s, from: s[0], to: s[1], ease: sm, shake: null }); });
    shots.forEach(x => { x.shake = t => shakeAt(t); });
    const PUNCH = ['m3', 'm8', 'm11', 'm13', 'c10'], PUSH = ['m7', 'c12', 'm14', 'c3', 'c16'];
    const fovAt = t => { let f = 38; PUNCH.forEach(id => { const a = B(id) - 0.05, b = E(id) + 0.25; if (t > a && t < b) f = Math.min(f, lerp(38, 33, eo(pr(t, a, a + 0.16)))); });
      PUSH.forEach(id => { const a = B(id) - 0.1, b = E(id) + 0.35; if (t > a && t < b) f = Math.min(f, lerp(38, 33.5, sm(pr(t, a, b)))); });
      if (t > B('m15')) f = lerp(38, 41, sm(pr(t, B('m15'), D))); return f; };
    const shakeAt = t => { let s = 0; ['m13', 'm11'].forEach(id => { s = Math.max(s, 0.012 * K.pulse(t, B(id), 0.5)); }); return s; };

    // ================= UPDATE =================
    const update = t => {
      K.shoot(t, shots);
      K.cam.fov = fovAt(t); K.cam.updateProjectionMatrix(); K.cam.updateMatrixWorld(true);
      acting(t); drawCity(t);
      postU.time.value = t;
      postU.flash.value = Math.max(0.35 * Math.max(0, 1 - Math.abs(t - (B('m13') - 0.3)) / 0.1), 0.25 * Math.max(0, 1 - Math.abs(t - B('m11')) / 0.08));
      postU.dark.value = 0;
      hudDraw(t);
    };

    // ================= SOUND =================
    const sfx = [['whoosh', C.PH - 0.05, 0.35], ['pop', C.PH + 0.25, 0.3]];
    SCR.forEach(([n, a], i) => { if (i > 0 && n !== 'later' && n !== 'count') sfx.push(['whoosh', a, 0.22]); });
    sfx.push(['bass', at('m1', 0.62), 0.35], ['ding', at('m1', 0.64), 0.2]);
    for (let i = 0; i < 4; i++) sfx.push(['pop', SCR[1][1] + 0.05 + i * 0.05, 0.14]);
    sfx.push(['zap', B('c1') + 0.1, 0.18], ['boing', B('c1') + 0.45, 0.3]);
    for (let i = 0; i < 4; i++) sfx.push(['pop', at('m2', 0.12 + i * 0.16), 0.2]);
    sfx.push(['riser', at('c2', 0.25), 0.18], ['kaching', at('c2', 0.95), 0.3]);
    sfx.push(['boing', B('m3') + 0.05, 0.35], ['thud', B('c3') + 0.2, 0.4]);
    sfx.push(['tick', at('m4', 0.45), 0.4], ['tick', at('m4', 0.72), 0.4], ['ding', B('c4') + 0.1, 0.25]);
    sfx.push(['whoosh', at('c5', 0.55), 0.3], ['chime', at('c5', 0.95), 0.25], ['pop', B('m5') + 0.2, 0.25], ['thud', at('c6', 0.08), 0.6], ['bass', at('c6', 0.1), 0.35], ['ding', at('c6', 0.6), 0.3]);
    sfx.push(['tick', B('m7') - 0.1, 0.3]); for (let i = 0; i < 4; i++) sfx.push(['pop', at('c7', i * 0.24), 0.32], ['bass', at('c7', i * 0.24), 0.12]);
    for (let i = 0; i < 9; i++) sfx.push(['tick', at('c8', 0.1) + i * 0.2, 0.25]); sfx.push(['tick', B('m8') - 0.45, 0.3], ['boing', B('m8'), 0.3], ['zap', B('c9'), 0.25], ['thud', at('c9', 0.55), 0.5]);
    sfx.push(['bass', B('m9') + 0.3, 0.3], ['zap', B('m9') + 0.3, 0.2], ['boing', B('c10') + 0.1, 0.3], ['tick', at('m10', 0.1), 0.35], ['tick', at('m10', 0.42), 0.35], ['ding', at('m10', 0.75), 0.3]);
    for (let i = 0; i < 16; i++) sfx.push(['tick', at('c11', 0) + i * 0.13, 0.12]); sfx.push(['chime', B('m11'), 0.35], ['kaching', B('m11') + 0.05, 0.3], ['thud', at('c12', 0.3), 0.5]);
    for (let i = 0; i < 4; i++) sfx.push(['pop', at('c13', 0.08 + i * 0.1), 0.22]); sfx.push(['whoosh', at('c13', 0.5), 0.3], ['ding', at('c13', 0.72), 0.25], ['ding', at('c13', 0.9), 0.25]); for (let i = 0; i < 6; i++) sfx.push(['pop', at('c13', 0.92) + i * 0.32, 0.12]);
    sfx.push(['chime', B('m12') + 0.1, 0.3], ['zap', B('c14') + 0.1, 0.25]);
    sfx.push(['whoosh', C.LATER, 0.4], ['riser', C.LATER + 0.3, 0.25]); for (let i = 0; i < 18; i++) sfx.push(['tick', C.LATER + 0.3 + i * ((C.COUNT - C.LATER - 0.8) / 18), 0.18]);
    sfx.push(['whoosh', C.COUNT, 0.35], ['riser', C.COUNT + 0.15, 0.2], ['kaching', B('m13') - 0.05, 0.45], ['bass', B('m13') - 0.05, 0.4]); for (let i = 0; i < 6; i++) sfx.push(['pop', B('m13') + i * 0.1, 0.14]);
    sfx.push(['ding', at('c15', 0.95), 0.25]); for (let i = 0; i < 4; i++) sfx.push(['pop', at('c16', i * 0.22), 0.28]); sfx.push(['chime', B('m15'), 0.3]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Inter Display', capMarginV: 690, capSize: 64 };
  },
};
