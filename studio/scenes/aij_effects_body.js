/* @maddiee.makess reel 13 — "One clip. 7 edits." (comment EFFECTS). Effects: free MIT repo Vibha-Ramprakash/claude-video-effects.
   NEW LOCATION: a small film set — curved green-screen cyclorama, cinema camera on a tripod, two softbox lights, a C-stand,
   clapperboard, director's chair (Maddie sits in it), sandbags, cables. Maddie in the blue tee from the viral reel.
   Each "/effects <name>" line transforms the set or the frame: spotlight, orbit, backdrop-word, cover-star, led-sign,
   countdown-flip, reject-stamp. Full 9:16, no bars, no blush dots, captions high, no handle, no name tags. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x101418, fog: [9, 30], fov: 34, bloom: null },
  lines: window.JR_LINES,

  build(K, T) {
    const L = T.lines, N = L.length;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[typeof id === 'number' ? id : IX(id)].t, E = id => L[typeof id === 'number' ? id : IX(id)].end;
    const D = E(N - 1) + 1.7;
    const cl = K.clamp, eo = K.easeOut, pr = K.prog, eb = K.easeBack;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const W = 1080, H = 1920;

    // ================= TIMELINE =================
    const FX = [['e1', 'spotlight', '#ffd76a'], ['e2', 'orbit', '#4fd8ff'], ['e3', 'backdrop-word', '#ff6b4a'], ['e4', 'cover-star', '#ff4fa8'], ['e5', 'led-sign', '#3ddc97'], ['e6', 'countdown-flip', '#c58bff'], ['e7', 'reject-stamp', '#ff4d5e']]
      .map(([id, name, col]) => ({ id, name, col, a: B(id) - 0.08 }));
    const C = { BORE: B('h2') - 0.05, TYPE: B('c1') + 0.3, SEVEN: B('m1') - 0.08, FREE: B('c2') - 0.05, CHEAT: B('m2') - 0.05, CTA: B('cta1') - 0.2, CRY: B('cta2') - 0.05 };
    const fxAt = t => { let k = -1; FX.forEach((f, i) => { if (t >= f.a && t < C.SEVEN) k = i; }); return k; };
    const fxOn = (t, name) => { const k = fxAt(t); return k >= 0 && FX[k].name === name; };
    const fxT = (t, name) => { const f = FX.find(x => x.name === name); return t - f.a; };

    // ================= FILM SET =================
    const floorTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#2a2d33'; x.fillRect(0, 0, w, h); const r = K.rng(4);
      for (let i = 0; i < 1400; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},${0.02 + r() * 0.04})`; x.fillRect(r() * w, r() * h, 2 + r() * 4, 2 + r() * 4); }
      x.strokeStyle = 'rgba(255,200,60,0.55)'; x.lineWidth = 6; [[120, 300], [380, 260]].forEach(([a, b]) => { x.beginPath(); x.moveTo(a - 22, b); x.lineTo(a + 22, b); x.moveTo(a, b - 22); x.lineTo(a, b + 22); x.stroke(); }); });
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(3, 3);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 12), SM(0xffffff, 0.55, { map: floorTex })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; S.add(floor);
    // the green-screen cyclorama: a flat wall + a curved cove into the floor
    const GZ = -1.75, greenM = SM(0x2a9a48, 0.92);
    const gWall = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 3.2), greenM); gWall.position.set(0, 1.9, GZ); gWall.receiveShadow = true; S.add(gWall);
    const cove = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 4.4, 24, 1, true, Math.PI, Math.PI / 2), greenM); cove.rotation.z = Math.PI / 2; cove.position.set(0, 0.3, GZ + 0.3); cove.receiveShadow = true; S.add(cove);
    const gFloor = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 1.3), greenM); gFloor.rotation.x = -Math.PI / 2; gFloor.position.set(0, 0.003, GZ + 0.95); gFloor.receiveShadow = true; S.add(gFloor);
    // studio walls (dark) around it
    const wallM = SM(0x1d2027, 0.95);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(14, 5), wallM); back.position.set(0, 2.5, GZ - 0.05); S.add(back);
    const side = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallM); side.rotation.y = Math.PI / 2; side.position.set(-3.2, 2.5, 0.5); S.add(side);
    // tracking marks on the green
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { const tm = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.06), BM(0xeef8ee)); tm.position.set(-1.2 + i * 1.2, 1.3 + j * 1.1, GZ + 0.004); tm.rotation.z = Math.PI / 4; S.add(tm); }
    // giant backdrop word (backdrop-word effect) + LED sign (led-sign effect), both live canvases on the green wall
    const bwc = document.createElement('canvas'); bwc.width = 1024; bwc.height = 512; const bwx = bwc.getContext('2d'); const bwTex = new THREE.CanvasTexture(bwc); bwTex.colorSpace = THREE.SRGBColorSpace;
    bwx.clearRect(0, 0, 1024, 512); bwx.font = '900 250px "Fredoka Light", "Inter Display"'; bwx.textAlign = 'center'; bwx.textBaseline = 'middle'; bwx.fillStyle = '#fff6e0'; bwx.fillText('BORING?', 512, 270); bwTex.needsUpdate = true;
    const bword = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 0.72), new THREE.MeshBasicMaterial({ map: bwTex, transparent: true, toneMapped: false, depthWrite: false })); bword.position.set(-0.15, 1.75, GZ + 0.02); bword.visible = false; S.add(bword);
    const ledc = document.createElement('canvas'); ledc.width = 1024; ledc.height = 256; const ledx = ledc.getContext('2d'); const ledTex = new THREE.CanvasTexture(ledc); ledTex.colorSpace = THREE.SRGBColorSpace;
    const ledBox = rbox(1.5, 0.42, 0.06, SM(0x08090c, 0.4), -0.1, 2.3, GZ + 0.04, 0.03); ledBox.visible = false;
    const ledM = new THREE.Mesh(new THREE.PlaneGeometry(1.44, 0.36), new THREE.MeshBasicMaterial({ map: ledTex, transparent: true, toneMapped: false })); ledM.position.set(-0.1, 2.3, GZ + 0.075); ledM.visible = false; S.add(ledM);
    const ledL = new THREE.PointLight(0xff3df0, 0, 3, 1.6); ledL.position.set(-0.1, 2.1, GZ + 0.6); S.add(ledL);
    const drawLED = (s) => { const w = 1024, hh = 256; ledx.fillStyle = '#050508'; ledx.fillRect(0, 0, w, hh);
      const cv = document.createElement('canvas'); cv.width = 128; cv.height = 32; const c2 = cv.getContext('2d'); c2.fillStyle = '#000'; c2.fillRect(0, 0, 128, 32); c2.font = '900 19px "DejaVu Sans Mono"'; c2.fillStyle = '#fff'; c2.textAlign = 'center'; c2.textBaseline = 'middle'; c2.fillText(s, 64, 17);
      const d = c2.getImageData(0, 0, 128, 32).data; for (let y = 0; y < 32; y++) for (let x = 0; x < 128; x++) { const on = d[(y * 128 + x) * 4] > 100; ledx.fillStyle = on ? '#ff5cf2' : 'rgba(255,80,240,0.08)'; ledx.beginPath(); ledx.arc(4 + x * 8, 4 + y * 8, on ? 3.4 : 2.2, 0, 7); ledx.fill(); }
      ledTex.needsUpdate = true; };
    let ledLast = null;

    // cinema camera on a tripod (front-left, pointing at Maddie)
    const metal = SM(0x1c1d22, 0.4, { metalness: 0.6 }), metalL = SM(0x6c707c, 0.4, { metalness: 0.6 });
    const camG = new THREE.Group(); camG.position.set(-1.25, 0, 0.35); camG.rotation.y = 0.85; S.add(camG);
    [0, 2.1, 4.2].forEach(a => { const leg = cyl(0.015, 0.015, 1.25, metalL, Math.sin(a) * 0.22, 0.6, Math.cos(a) * 0.22, 8, camG); leg.rotation.set(Math.cos(a) * 0.32, 0, -Math.sin(a) * 0.32); });
    rbox(0.1, 0.06, 0.1, metal, 0, 1.22, 0, 0.01, camG);
    rbox(0.22, 0.2, 0.36, metal, 0, 1.36, 0, 0.03, camG); const lens = cyl(0.07, 0.08, 0.2, SM(0x0d0e12, 0.25, { metalness: 0.5 }), 0, 1.36, -0.27, 24, camG); lens.rotation.x = Math.PI / 2;
    const glass = new THREE.Mesh(new THREE.CircleGeometry(0.06, 24), SM(0x2a4a8a, 0.05, { metalness: 0.9 })); glass.position.set(0, 1.36, -0.375); glass.rotation.y = Math.PI; camG.add(glass);
    rbox(0.16, 0.1, 0.02, SM(0x0a0a0a, 0.3), 0.14, 1.46, 0.12, 0.01, camG).rotation.y = 0.6;
    const tally = sph(0.018, BM(0xff2030), 0.0, 1.49, -0.12, camG);
    // two softboxes on stands
    const softbox = (x, z, ry) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; S.add(g);
      [0, 2.1, 4.2].forEach(a => { const leg = cyl(0.012, 0.012, 0.5, metalL, Math.sin(a) * 0.18, 0.22, Math.cos(a) * 0.18, 8, g); leg.rotation.set(Math.cos(a) * 0.5, 0, -Math.sin(a) * 0.5); });
      cyl(0.015, 0.015, 1.7, metalL, 0, 1.05, 0, 8, g);
      const box = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.4, 4, 1, true), SM(0x111216, 0.6, { side: THREE.DoubleSide })); box.rotation.set(-Math.PI / 2, Math.PI / 4, 0); box.position.set(0, 1.85, 0.1); g.add(box);
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.58), BM(0xfff4e2)); face.position.set(0, 1.85, 0.31); g.add(face);
      const l = new THREE.SpotLight(0xfff0dc, 2.2, 6, 0.9, 0.7, 1.4); l.position.set(0, 1.85, 0.35); g.add(l); const tg = new THREE.Object3D(); tg.position.set(0, 1.0, 3); g.add(tg); l.target = tg;
      return { face, l }; };
    const SB1 = softbox(-1.7, -0.6, 0.75), SB2 = softbox(1.85, -0.5, -0.8);
    // C-stand + flag, sandbags, cables, apple boxes, clapperboard
    cyl(0.012, 0.012, 2.2, metalL, 2.25, 1.1, -1.25, 8); const flag = rbox(0.5, 0.36, 0.01, SM(0x0a0a0c, 0.9), 2.05, 2.15, -1.2, 0.005); flag.rotation.y = -0.4;
    [[2.25, -1.2], [-1.6, -0.45], [1.75, -0.35]].forEach(([x, z]) => { const sb = rbox(0.24, 0.07, 0.14, SM(0x7a2d1e, 0.9), x + 0.15, 0.035, z, 0.03); sb.rotation.y = 0.5; });
    [[0.95, -0.95, 0.4], [1.12, -1.05, -0.2]].forEach(([x, z, r], i) => { const ab = rbox(0.36, 0.2 - i * 0.05, 0.24, SM(0xb88552, 0.6), x, 0.1 - i * 0.025, z, 0.01); ab.rotation.y = r; });
    const clap = new THREE.Group(); clap.position.set(1.0, 0.205, -0.95); clap.rotation.set(0, 0.3, 0); S.add(clap);
    const clTex = K.canvasTex(256, 200, (x, w, h) => { x.fillStyle = '#121214'; x.fillRect(0, 0, w, h); x.strokeStyle = '#fff'; x.lineWidth = 3; x.strokeRect(10, 60, w - 20, h - 70); x.beginPath(); x.moveTo(10, 120); x.lineTo(w - 10, 120); x.moveTo(128, 60); x.lineTo(128, h - 10); x.stroke();
      x.fillStyle = '#fff'; x.font = '700 26px "DejaVu Sans Mono"'; x.fillText('ROLL 1', 22, 100); x.fillText('TAKE 1', 140, 100); x.fillText('ONE CLIP', 22, 165);
      for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#fff' : '#121214'; x.beginPath(); x.moveTo(i * 44, 0); x.lineTo(i * 44 + 44, 0); x.lineTo(i * 44 + 24, 50); x.lineTo(i * 44 - 20, 50); x.fill(); } });
    const clapB = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.24, 0.02), SM(0xffffff, 0.6, { map: clTex })); clapB.rotation.x = -1.2; clapB.position.y = 0.02; clap.add(clapB);
    const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V(-1.25, 0.01, 0.35), V(-0.6, 0.01, 0.6), V(0.2, 0.01, 0.45), V(1.0, 0.01, 0.7), V(1.85, 0.01, -0.5)]), 40, 0.01, 6), SM(0x0c0c0e, 0.6)); S.add(cable);

    // director's chair (Maddie sits in it)
    const MX = -0.3, MZ = -0.85, SY = 0.5;
    const wood = SM(0x8a5a35, 0.55), canvasM = SM(0x161a24, 0.85);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => { const leg = rbox(0.04, 0.55, 0.04, wood, MX + sx * 0.24, 0.27, MZ + sz * 0.2, 0.01); leg.rotation.x = sz * 0.12; });
    rbox(0.5, 0.025, 0.42, canvasM, MX, SY - 0.02, MZ, 0.01);
    [-1, 1].forEach(s => { rbox(0.04, 0.5, 0.04, wood, MX + s * 0.26, SY + 0.28, MZ - 0.2, 0.01); rbox(0.05, 0.04, 0.44, wood, MX + s * 0.27, SY + 0.2, MZ, 0.01); });
    const backTex = K.canvasTex(256, 96, (x, w, h) => { x.fillStyle = '#161a24'; x.fillRect(0, 0, w, h); x.fillStyle = '#ffc53d'; x.font = '900 46px "Fredoka Light", "Inter Display"'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DIRECTOR', w / 2, h / 2 + 3); });
    rbox(0.54, 0.18, 0.02, SM(0xffffff, 0.85, { map: backTex }), MX, SY + 0.45, MZ - 0.205, 0.006);

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: SY, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(MX, 0, MZ + 0.04); M.g.rotation.y = 0.12; S.add(M.g);   // the blue tee from the viral reel
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    const RX = 0.62, RY = 0.95, RZ = -0.62;
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
          else if (mood === 'sad') { fx.beginPath(); fx.ellipse(cx, 56, 14, 17, 0, 0, 7); fx.fill(); fx.lineWidth = 9; fx.beginPath(); fx.moveTo(cx - 20, i ? 30 : 24); fx.lineTo(cx + 20, i ? 24 : 30); fx.stroke(); fx.lineWidth = 14; }
          else if (mood === 'wide') { fx.beginPath(); fx.ellipse(cx, 50, 20, 26, 0, 0, 7); fx.fill(); fx.fillStyle = 'rgba(255,255,255,0.85)'; fx.beginPath(); fx.arc(cx + 6, 40, 6, 0, 7); fx.fill(); fx.fillStyle = '#ffb36b'; }
          else if (mood === 'star') { fx.save(); fx.translate(cx, 52); fx.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 10 : 24; fx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } fx.closePath(); fx.fill(); fx.restore(); }
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
      const glowL = new THREE.PointLight(0xffa060, 0.0, 1.0, 2); lift.add(glowL);
      const r = { g, head, lift };
      r.update = (t, { talk = 0, look = [0, 0], mood = 'calm' } = {}) => {
        lift.position.y = 0.25 + Math.sin(t * 2.4) * 0.018;
        head.rotation.set(look[1] + Math.sin(t * 2.4 + 1) * 0.03, look[0] + Math.sin(t * 0.8) * 0.05, Math.sin(t * 1.7) * 0.04);
        const blink = ((t + 1.3) % 3.4) < 0.11;
        drawFace(mood === 'smile' ? 'happy' : mood, talk * 1.3, blink && !['smile', 'wink', 'flat', 'star', 'sad'].includes(mood));
        thr.material.opacity = 0.7 + 0.3 * Math.sin(t * 20); thr.scale.setScalar(1 + 0.1 * Math.sin(t * 13));
        glowL.intensity = 0.2 + talk * 0.6;
      };
      return r;
    })();

    // spotlight effect: a hard key from above + a visible cone
    const spot = new THREE.SpotLight(0xfff2d6, 0, 6, 0.32, 0.35, 1.2); spot.position.set(MX + 0.2, 3.2, MZ + 0.5); spot.target.position.set(MX, 0.9, MZ); spot.castShadow = true; S.add(spot); S.add(spot.target);
    const coneTex = K.canvasTex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,240,200,0.35)'); g.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.75, 2.6, 32, 1, true), new THREE.MeshBasicMaterial({ map: coneTex, transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false, opacity: 0 })); cone.position.set(MX + 0.1, 1.9, MZ + 0.25); cone.rotation.x = Math.PI; S.add(cone);
    // orbit effect: little reel cards circling Maddie's head
    const ORB = new THREE.Group(); ORB.visible = false; S.add(ORB);
    const cards = []; for (let i = 0; i < 8; i++) { const tx = K.canvasTex(180, 320, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, `hsl(${i * 45},70%,60%)`); g.addColorStop(1, `hsl(${i * 45 + 60},70%,35%)`); x.fillStyle = g; x.beginPath(); x.roundRect(0, 0, w, h, 22); x.fill();
        x.fillStyle = 'rgba(255,255,255,0.9)'; x.beginPath(); x.moveTo(72, 130); x.lineTo(72, 190); x.lineTo(122, 160); x.fill(); x.font = '800 26px "Fredoka Light"'; x.textAlign = 'center'; x.fillText(['12.4K', '3.1K', '88K', '540K', '9.9K', '1.2M', '47K', '210K'][i], w / 2, 280); });
      const c = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.32), new THREE.MeshBasicMaterial({ map: tx, transparent: true, toneMapped: false, side: THREE.DoubleSide })); ORB.add(c); cards.push(c); }
    R.g.traverse(o => { o.castShadow = false; });
    const DEF = { hemi: 0.5, fill: 0.85, sb: 2.2 };

    // ================= LIGHT =================
    const hemi = new THREE.HemisphereLight(0xc8d4ff, 0x1a1410, DEF.hemi); S.add(hemi);
    const fill = new THREE.DirectionalLight(0xffe2c4, DEF.fill); fill.position.set(0.8, 2.6, 2.6); fill.target.position.set(0, 0.9, -0.8); fill.castShadow = true; fill.shadow.mapSize.set(2048, 2048); fill.shadow.bias = -0.0006;
    fill.shadow.camera.left = -2.5; fill.shadow.camera.right = 2.5; fill.shadow.camera.top = 2.8; fill.shadow.camera.bottom = -2.5; S.add(fill); S.add(fill.target);
    const rim = new THREE.DirectionalLight(0x9ab4ff, 0.7); rim.position.set(1.8, 2.4, -3); S.add(rim);

    // ================= POST (bloom + saturation + glitch/flash + vignette) =================
    const rtMain = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
    const bloom = new POST.UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.5, 0.6, 0.95);
    const oCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postU = { tC: { value: rtMain.texture }, res: { value: new THREE.Vector2(W, H) }, time: { value: 0 }, glitch: { value: 0 }, flash: { value: 0 }, expo: { value: 1.0 }, sat: { value: 1.0 }, warm: { value: 0 } };
    const postM = new THREE.ShaderMaterial({ uniforms: postU, depthTest: false, depthWrite: false, toneMapped: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `
        precision highp float; varying vec2 vUv; uniform sampler2D tC; uniform vec2 res; uniform float time, glitch, flash, expo, sat, warm;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        vec3 aces(vec3 x){ x *= expo; return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0., 1.); }
        vec3 srgb(vec3 c){ c = clamp(c, 0., 1.); return mix(c*12.92, 1.055*pow(c, vec3(1./2.4))-0.055, step(0.0031308, c)); }
        void main(){ vec2 uv = vUv;
          if (glitch > 0.) { float row = floor(uv.y * 46.), h = hash(vec2(row, floor(time * 30.))); uv.x += (h - 0.5) * 0.14 * glitch * step(0.45, h); }
          vec3 c = aces(texture2D(tC, uv).rgb);
          if (glitch > 0.) { c.r = mix(c.r, aces(texture2D(tC, uv + vec2(0.012 * glitch, 0.)).rgb).r, 0.6 * glitch); c.b = mix(c.b, aces(texture2D(tC, uv - vec2(0.012 * glitch, 0.)).rgb).b, 0.6 * glitch); }
          float l = dot(c, vec3(0.299, 0.587, 0.114)); c = mix(vec3(l), c, sat); c += warm * vec3(0.05, 0.015, -0.04);
          vec2 vq = vUv - 0.5; c *= 1. - dot(vq, vq) * 0.55; c += (hash(vUv * res + time) - 0.5) * 0.025; c = mix(c, vec3(1.), flash);
          gl_FragColor = vec4(srgb(c), 1.); }` });
    const postScene = new THREE.Scene(); const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postM); quad.frustumCulled = false; postScene.add(quad);
    const hc = document.createElement('canvas'); hc.width = W; hc.height = H; const h = hc.getContext('2d');
    const hTex = new THREE.CanvasTexture(hc); hTex.colorSpace = THREE.SRGBColorSpace;
    const hudScene = new THREE.Scene(); const hudQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, toneMapped: false, depthTest: false })); hudQ.frustumCulled = false; hudScene.add(hudQ);
    K.draw = () => { const r = K.renderer; r.setRenderTarget(rtMain); r.clear(); r.render(S, K.cam); bloom.render(r, null, rtMain, 0, false);
      r.setRenderTarget(null); r.clear(); r.render(postScene, oCam); r.autoClear = false; r.render(hudScene, oCam); r.autoClear = true; };

    // ================= HUD helpers =================
    const ACC = '#ffc53d', INK = 'rgba(12,12,26,0.93)', GRN = '#3ddc97', RED = '#ff4d5e', IG = ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5'];
    const FR = '"Fredoka Light", "Inter Display"', MONO = '"DejaVu Sans Mono"';
    const rr = (x, y, w, hh, r, f, s, lw = 4, c = h) => { c.beginPath(); c.roundRect(x, y, w, hh, r); if (f) { c.fillStyle = f; c.fill(); } if (s) { c.strokeStyle = s; c.lineWidth = lw; c.stroke(); } };
    const txt = (s, x, y, size, col, wgt = 700, al = 'center', font = FR, c = h) => { c.font = `${wgt} ${size}px ${font}`; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y); };
    const otxt = (s, x, y, size, col, lw = 12, stroke = 'rgba(10,8,20,0.92)') => { h.font = `900 ${size}px ${FR}`; h.textAlign = 'center'; h.textBaseline = 'middle'; h.lineJoin = 'round'; h.lineWidth = lw; h.strokeStyle = stroke; h.strokeText(s, x, y); h.fillStyle = col; h.fillText(s, x, y); };
    const pop = (t, a, d = 0.35) => eb(pr(t, a, a + d));
    const scr = v3 => { const p = v3.clone().project(K.cam); return [(p.x * 0.5 + 0.5) * W, (1 - (p.y * 0.5 + 0.5)) * H]; };
    const headW = (o, dy) => { const v = new THREE.Vector3(); o.getWorldPosition(v); v.y += dy; return v; };
    const igGrad = (x0, y0, x1, y1) => { const g = h.createLinearGradient(x0, y0, x1, y1); IG.forEach((c, i) => g.addColorStop(i / 4, c)); return g; };
    const sticker = (t, a, s, x, y, rot, bg, fg, size = 54, padX = 34) => { const k = pop(t, a, 0.3); if (k <= 0) return; h.save(); h.translate(x, y); h.rotate(rot); h.scale(k, k);
      h.font = `900 ${size}px ${FR}`; const w = h.measureText(s).width + padX * 2; h.shadowColor = 'rgba(0,0,0,0.45)'; h.shadowBlur = 18; h.shadowOffsetY = 6; rr(-w / 2, -size * 0.85, w, size * 1.7, 22, bg, '#141414', 6); h.shadowColor = 'transparent'; txt(s, 0, 4, size, fg, 900); h.restore(); };
    const stamp = (t, a, s, x, y, rot, col, size = 92) => { const k = a > t ? 0 : 1 + 1.4 * (1 - eo(pr(t, a, a + 0.22))); if (!k) return; h.save(); h.translate(x, y); h.rotate(rot); h.scale(k, k); h.globalAlpha = cl((t - a) / 0.12);
      h.font = `900 ${size}px ${FR}`; const w = h.measureText(s).width + 50; h.lineWidth = 10; h.strokeStyle = col; h.strokeRect(-w / 2, -size * 0.75, w, size * 1.5); txt(s, 0, 6, size, col, 900); h.restore(); };
    const tag = (t, a, s, anchor, dx, dy, col = ACC) => { const k = pop(t, a, 0.3); if (k <= 0) return; const [x, y] = scr(anchor);
      h.globalAlpha = k; h.strokeStyle = '#fff'; h.lineWidth = 4; h.beginPath(); h.moveTo(x, y); h.lineTo(x + dx * 0.6, y + dy); h.lineTo(x + dx, y + dy); h.stroke();
      h.font = `900 44px ${FR}`; const w = h.measureText(s).width + 50, bx = dx > 0 ? x + dx : x + dx - w; rr(bx, y + dy - 40, w, 80, 20, INK, col, 4); txt(s, bx + w / 2, y + dy + 2, 44, col, 900); h.globalAlpha = 1; };
    const fmt = n => Math.round(n).toLocaleString('en-US');
    const confetti = (t, a, n = 60, seed = 7) => { if (t < a) return; const r3 = K.rng(seed); for (let i = 0; i < n; i++) { const ph = (t - a) * (0.6 + r3() * 0.5); const x = r3() * W, y = -40 + ph * (600 + r3() * 500) % 1500, s = 10 + r3() * 14; h.save(); h.translate(x, y); h.rotate(ph * 6 + i); h.fillStyle = ['#ffc53d', '#ff4fd8', '#4fd8ff', '#3ddc97', '#fff'][i % 5]; h.fillRect(-s / 2, -s / 4, s, s / 2); h.restore(); } };

    // a phone card (views)
    const phone = (t, x, y, s, views, mood, jit = 0) => { h.save(); h.translate(x + jit * Math.sin(t * 40) * 6, y); h.scale(s, s); h.rotate(0.05);
      rr(-200, -280, 400, 560, 50, '#111', '#2b2b33', 9); rr(-176, -254, 352, 508, 34, '#16161c');
      h.beginPath(); h.roundRect(-50, -248, 100, 22, 11); h.fillStyle = '#000'; h.fill();
      txt('your reel', 0, -170, 30, 'rgba(255,255,255,0.6)', 700); txt(fmt(views), 0, -40, 120, '#9aa0b8', 900); txt('views', 0, 50, 40, '#fff', 800); txt(mood, 0, 160, 96, '#fff', 400); h.restore(); };



    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const smv = (a, b, k) => a + (b - a) * k;
    const toR = [0.7, 0.05], toCam = [-0.16, 0.02], toLens = [-0.55, 0.0], up = [0.05, -0.32];
    const P0 = { L: [-0.3, 0, -0.05, -0.1], R: [-0.3, 0, 0.05, -0.1] };
    const POSE = { rest: P0, shrug: { L: [-0.55, 0.1, -0.55, -1.25], R: [-0.55, -0.1, 0.55, -1.25] }, both: { L: [-2.7, 0.15, -0.45, -0.35], R: [-2.7, -0.15, 0.45, -0.35] },
      chin: { L: [-0.3, 0, -0.05, -0.1], R: [-1.15, -0.55, 0.1, -2.0] }, cheeks: { L: [-1.35, 0.55, -0.2, -2.1], R: [-1.35, -0.55, 0.2, -2.1] }, slump: { L: [0.1, 0, -0.2, -0.05], R: [0.1, 0, 0.2, -0.05] },
      pose: { L: [-0.3, 0, -0.05, -0.1], R: [-2.2, -0.4, 0.2, -2.3] }, hip: { L: [-0.4, 0.5, -0.6, -1.9], R: [-0.4, -0.5, 0.6, -1.9] }, wave: { L: [-0.3, 0, -0.05, -0.1], R: [-2.35, -0.3, 0.55, -0.9] }, cover: { L: [-1.5, 0.3, -0.1, -2.4], R: [-1.5, -0.3, 0.1, -2.4] } };
    let curPose = JSON.parse(JSON.stringify(P0));
    const acting = (t) => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 || Math.abs(t - last) > 0.2 ? 1 : cl((t - last) * 5); last = t;
      let mL = toLens, face = 'neutral', lean = 0.05, pose = 'rest', bounce = 0, rL = [-0.4, 0.05], mood = 'calm';
      const fx = fxAt(t), fxn = fx >= 0 ? FX[fx].name : '';
      if (t < B('c1') - 0.05) { mL = t < C.BORE ? toLens : toR; face = t < C.BORE ? 'neutral' : 'worried'; pose = t < C.BORE ? 'rest' : 'slump'; lean = t < C.BORE ? 0.05 : 0.3; rL = [-0.45, 0.06]; mood = t < C.BORE ? 'calm' : 'flat'; }
      else if (fx < 0 && t < C.SEVEN) { mL = toR; face = 'neutral'; rL = [0.35, -0.2]; mood = 'smile'; }
      else if (t < C.SEVEN) { rL = [0.35, -0.2]; mood = 'happy';
        if (fxn === 'spotlight') { mL = t >= B('w1') ? toCam : up; face = 'shock'; pose = t >= B('w1') ? 'both' : 'rest'; lean = -0.1; }
        else if (fxn === 'orbit') { mL = [0.3 * Math.sin(t * 2.5), -0.25]; face = 'smile'; pose = 'rest'; }
        else if (fxn === 'backdrop-word') { const w2 = t >= B('w2'); mL = w2 ? toCam : [0.2, -0.3]; face = w2 ? 'shock' : 'neutral'; pose = w2 ? 'cheeks' : 'rest'; bounce = w2 ? 0.6 : 0; }
        else if (fxn === 'cover-star') { mL = toLens; face = 'smile'; pose = 'pose'; lean = 0; }
        else if (fxn === 'led-sign') { mL = [0.4, -0.35]; face = 'smile'; pose = 'hip'; }
        else if (fxn === 'countdown-flip') { mL = up; face = 'shock'; pose = 'rest'; }
        else { mL = toR; face = 'neutral'; pose = 'shrug'; } }
      else if (t < C.CHEAT) { mL = t < C.FREE ? toCam : toR; face = 'shock'; pose = t < C.FREE ? 'cheeks' : 'both'; bounce = t < C.FREE ? 0.4 : 0; rL = [-0.45, 0.05]; mood = t < C.FREE ? 'wink' : 'happy'; lean = -0.15; }
      else if (t < C.CTA) { mL = toCam; face = mT > 0.05 ? 'neutral' : 'smile'; pose = 'both'; bounce = 1.4; rL = [-0.45, 0.05]; mood = 'happy'; }
      else { mL = t < C.CRY ? toR : toCam; face = t < C.CRY ? 'smile' : 'worried'; pose = t >= C.CRY ? 'cover' : 'rest'; rL = t < C.CRY ? [0.25, 0.02] : [-0.45, 0.05]; mood = t >= C.CRY ? 'wink' : 'smile'; lean = t >= C.CRY ? 0.1 : 0.05; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = smv(mYaw, mL[0], k); mPitch = smv(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], lean });
      const tgt = POSE[pose]; ['L', 'R'].forEach(s => { for (let i = 0; i < 4; i++) curPose[s][i] = smv(curPose[s][i], tgt[s][i], k); });
      const [aL, aR] = M.arms; const bx = pose === 'both' ? 0.18 * Math.sin(t * 13) : 0, wv = pose === 'wave' ? 0.3 * Math.sin(t * 9) : 0;
      aL.sh.rotation.set(curPose.L[0] + bx, curPose.L[1], curPose.L[2]); aL.el.rotation.x = curPose.L[3];
      aR.sh.rotation.set(curPose.R[0] + bx, curPose.R[1], curPose.R[2] + wv); aR.el.rotation.x = curPose.R[3];
      M.g.position.y = bounce * 0.025 * Math.abs(Math.sin(t * 9));
      rYaw = smv(rYaw, rL[0], k); rPitch = smv(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.x += 0.12 * FX.reduce((m, f) => Math.max(m, K.pulse(t, f.a + 0.05, 0.4)), 0);
      R.g.position.y = RY + 0.06 * K.pulse(t, C.CHEAT, 0.8);
      R.g.rotation.y = -0.3 + 0.6 * K.pulse(t, C.FREE, 0.9);
      tally.material.color.setHex(Math.floor(t * 2) % 2 ? 0xff2030 : 0x400008);

      // ---- effects on the set ----
      const sp = fxOn(t, 'spotlight'), led = fxOn(t, 'led-sign');
      const dark = sp ? eo(pr(fxT(t, 'spotlight'), 0, 0.2)) : led ? eo(pr(fxT(t, 'led-sign'), 0, 0.25)) * 0.85 : 0;
      hemi.intensity = DEF.hemi * (1 - 0.85 * dark); fill.intensity = DEF.fill * (1 - 0.8 * dark); [SB1, SB2].forEach(s => { s.l.intensity = DEF.sb * (1 - dark); s.face.material.color.setScalar(1 - 0.85 * dark); });
      spot.intensity = sp ? 9 * eo(pr(fxT(t, 'spotlight'), 0.05, 0.25)) : 0; cone.material.opacity = sp ? 0.0 * eo(pr(fxT(t, 'spotlight'), 0.05, 0.25)) : 0;
      ORB.visible = fxOn(t, 'orbit'); if (ORB.visible) { const ot = fxT(t, 'orbit'), hp = new THREE.Vector3(); M.head.getWorldPosition(hp); const sc = eb(pr(ot, 0, 0.35));
        cards.forEach((c, i) => { const a = ot * 1.6 + i * Math.PI / 4; c.position.set(hp.x + Math.cos(a) * 0.48, hp.y + 0.12 + Math.sin(a * 2) * 0.04, hp.z + Math.sin(a) * 0.48); c.lookAt(hp.x + Math.cos(a) * 3, hp.y + 0.12, hp.z + Math.sin(a) * 3); c.scale.setScalar(sc); }); }
      const bw = fxOn(t, 'backdrop-word'); bword.visible = bw; if (bw) { const bt = fxT(t, 'backdrop-word'); const d = eo(pr(bt, 0, 0.35)); bword.position.y = 2.05 + (1 - d) * 1.6; bword.scale.setScalar(1 + 0.15 * (1 - eb(pr(bt, 0.25, 0.6)))); }
      ledBox.visible = ledM.visible = led; ledL.intensity = led ? 1.4 : 0; if (led) { const n = Math.floor(cl((fxT(t, 'led-sign') - 0.2) * 14, 0, 10)); const s = 'NOT BORING'.slice(0, n); if (s !== ledLast) { drawLED(s); ledLast = s; } }
    };

    // ================= CAMERA =================
    const Pp = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [MX + 0.04, 1.34, MZ], RHL = [RX, RY + 0.28, RZ];
    const sh = {
      hook: [Pp([0.05, 1.5, 3.4], [-0.05, 1.35, -1.2], 40), Pp([0.0, 1.45, 2.8], [-0.08, 1.3, -1.0], 38)],
      mad: [Pp([-0.12, 1.36, 1.3], MHL, 32), Pp([-0.14, 1.36, 1.08], MHL, 32)],
      robo: [Pp([0.45, 1.28, 1.25], RHL, 30), Pp([0.47, 1.28, 1.05], RHL, 30)],
      fxw: [Pp([0.05, 1.55, 3.4], [-0.1, 1.55, -1.2], 40), Pp([0.03, 1.53, 3.1], [-0.1, 1.52, -1.2], 40)],
      fxc: [Pp([-0.15, 1.4, 1.75], [MX, 1.32, MZ], 34), Pp([-0.16, 1.4, 1.5], [MX, 1.32, MZ], 34)],
      high: [Pp([0.5, 2.3, 2.3], [-0.1, 1.1, -0.8], 38), Pp([0.4, 2.15, 2.0], [-0.1, 1.1, -0.8], 38)],
      low: [Pp([-0.55, 0.9, 1.8], [-0.1, 1.35, -0.9], 36), Pp([-0.45, 0.93, 1.6], [-0.1, 1.37, -0.9], 36)],
      wide: [Pp([0.1, 1.6, 3.4], [0.0, 1.45, -1.2], 40), Pp([0.1, 1.56, 3.1], [0.0, 1.43, -1.2], 40)],
      cta: [Pp([0.25, 1.48, 3.0], [0.22, 1.25, -0.75], 40), Pp([0.22, 1.46, 2.7], [0.2, 1.24, -0.75], 40)],
    };
    const fxShot = { spotlight: sh.fxw, orbit: sh.fxc, 'backdrop-word': sh.fxw, 'cover-star': sh.fxc, 'led-sign': sh.wide, 'countdown-flip': sh.low, 'reject-stamp': sh.fxw };
    const plan = [[0, C.BORE, sh.hook], [C.BORE, B('c1') - 0.1, sh.mad], [B('c1') - 0.1, FX[0].a, sh.robo]];
    FX.forEach((f, i) => { const b = i < 6 ? FX[i + 1].a : C.SEVEN; if (f.name === 'backdrop-word') { plan.push([f.a, B('w2') - 0.05, sh.fxw], [B('w2') - 0.05, b, sh.mad]); } else plan.push([f.a, b, fxShot[f.name]]); });
    plan.push([C.SEVEN, C.FREE, sh.mad], [C.FREE, C.CHEAT, sh.robo], [C.CHEAT, C.CTA, sh.wide], [C.CTA, D + 5, sh.cta]);
    const smooth = q => q * q * (3 - 2 * q);
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth, shake: FX.some(f => f.a === a) || a === C.SEVEN ? (t => 0.01 * Math.exp(-(t - a) * 5)) : null }));

    // ================= HUD =================
    const viewfinder = (t, alpha) => { if (alpha <= 0) return; h.globalAlpha = alpha; h.strokeStyle = '#fff'; h.lineWidth = 6; const m = 60, l = 90;
      [[m, m, 1, 1], [W - m, m, -1, 1], [m, H - m, 1, -1], [W - m, H - m, -1, -1]].forEach(([x, y, sx, sy]) => { h.beginPath(); h.moveTo(x, y + sy * l); h.lineTo(x, y); h.lineTo(x + sx * l, y); h.stroke(); });
      if (Math.floor(t * 2) % 2 === 0) { h.fillStyle = RED; h.beginPath(); h.arc(110, 125, 14, 0, 7); h.fill(); } txt('REC', 140, 127, 38, '#fff', 800, 'left', MONO);
      txt('00:00:' + String(Math.floor(t * 30) % 60).padStart(2, '0'), W - 110, 127, 34, '#fff', 700, 'right', MONO); txt('TAKE 1', W / 2, H - 120, 32, 'rgba(255,255,255,0.8)', 800, 'center', MONO); h.globalAlpha = 1; };
    const fxChip = (t, i) => { const f = FX[i], k = pop(t, f.a, 0.3);
      h.save(); h.translate(W / 2, 210); h.scale(k, k); h.shadowColor = f.col; h.shadowBlur = 30; rr(-430, -66, 860, 132, 34, INK, f.col, 5); h.shadowBlur = 0;
      h.font = `700 50px ${MONO}`; const a = '/effects ', w1 = h.measureText(a).width, w2 = h.measureText(f.name).width; const x0 = -(w1 + w2) / 2;
      txt(a, x0, 4, 50, 'rgba(255,255,255,0.6)', 700, 'left', MONO); txt(f.name, x0 + w1, 4, 50, f.col, 800, 'left', MONO); h.restore();
      for (let j = 0; j < 7; j++) { h.beginPath(); h.arc(W / 2 - 108 + j * 36, 312, j <= i ? 10 : 8, 0, 7); h.fillStyle = j <= i ? FX[j].col : 'rgba(255,255,255,0.3)'; h.fill(); }
      txt(`${i + 1}/7`, W / 2 + 190, 312, 30, 'rgba(255,255,255,0.85)', 900); };
    const coverStar = (t) => { const ct = fxT(t, 'cover-star'), k = eo(pr(ct, 0, 0.25)); h.globalAlpha = k;
      h.strokeStyle = '#fff'; h.lineWidth = 26; h.strokeRect(13, 13, W - 26, H - 26);
      h.save(); h.font = `900 230px "Playfair Display", "Instrument Serif", Georgia, serif`; h.textAlign = 'center'; h.textBaseline = 'alphabetic'; h.fillStyle = '#ff2d55'; h.fillText('MADDIE', W / 2, 560); h.restore();
      txt('THE COMEBACK ISSUE', W / 2, 610, 40, '#fff', 900); txt('NOV 2026', 120, 380, 30, '#fff', 800, 'left');
      [['"I was', 1080], ['boring.', 1135], ['Now I\'m', 1190], ['not."', 1245]].forEach(([s, y]) => txt(s, 80, y, 50, '#fff', 900, 'left'));
      h.fillStyle = '#fff'; rr(W - 220, H - 330, 160, 110, 6, '#fff'); for (let i = 0; i < 26; i++) { h.fillStyle = '#111'; h.fillRect(W - 210 + i * 5.6, H - 320, i % 3 ? 2 : 4, 80); } h.globalAlpha = 1; };
    const flipClock = (t) => { const ft = fxT(t, 'countdown-flip'), k = pop(t, FX[5].a, 0.3); const n = 3 - Math.min(2, Math.floor(Math.max(0, ft - 0.15) / 0.45)); const ph = ((Math.max(0, ft - 0.15)) % 0.45) / 0.45;
      h.save(); h.translate(W / 2, 640); h.scale(k, k); rr(-150, -170, 300, 340, 30, '#14151b', '#000', 6); h.fillStyle = '#000'; h.fillRect(-150, -3, 300, 6);
      txt(String(n), 0, 12, 260, '#f4efe4', 900, 'center', MONO); if (ph < 0.25 && ft > 0.6) { h.save(); h.scale(1, 1 - ph * 4); rr(-150, -170, 300, 170, [30, 30, 0, 0], '#1d1f27'); h.restore(); } h.restore(); };
    const stampHud = (t) => { const st = fxT(t, 'reject-stamp'); const k = pop(t, FX[6].a, 0.3);
      h.save(); h.translate(W / 2, 640); h.rotate(-0.04); h.scale(k * 0.9, k * 0.9); rr(-260, -330, 520, 660, 26, '#2a2c33', '#fff', 8); h.filter = 'grayscale(1)'; txt('😐', 0, -40, 200, '#fff', 400); h.filter = 'none'; txt('BEFORE', 0, 230, 60, '#9aa0b8', 900); h.restore();
      if (st > 0.55) stamp(t, FX[6].a + 0.55, 'BORING ✗', W / 2, 640, -0.18, RED, 120); };
    const fanHud = (t) => { const a = C.SEVEN; FX.forEach((f, i) => { const kk = eo(pr(t, a + i * 0.07, a + 0.4 + i * 0.07)); const ang = (i - 3) * 0.16 * kk; h.save(); h.translate(W / 2, 1000); h.rotate(ang); h.translate(0, -520); h.scale(0.55 + 0.45 * kk, 0.55 + 0.45 * kk);
        h.shadowColor = 'rgba(0,0,0,0.5)'; h.shadowBlur = 20; rr(-80, -140, 160, 280, 24, '#111', f.col, 6); h.shadowBlur = 0; txt(String(i + 1), 0, -40, 80, f.col, 900); txt(f.name.split('-')[0], 0, 60, 26, '#fff', 800); h.restore(); }); };
    const freeHud = (t) => { const a = C.FREE; const n = Math.round(7 + 44 * eo(pr(t, a + 0.2, a + 1.1))); const k = pop(t, a, 0.3); h.save(); h.translate(W / 2, 520); h.scale(k, k); otxt(String(n), 0, 0, 230, ACC, 22); txt('EFFECTS', 0, 150, 60, '#fff', 900); h.restore();
      sticker(t, a + 1.1, 'FREE ✓', W / 2 - 220, 820, -0.08, GRN, '#0b2a1a', 60); sticker(t, a + 1.6, 'no editing app', W / 2 + 160, 900, 0.06, '#fff', '#141414', 44); };
    const ctaHud = (t) => { const a = C.CTA; h.fillStyle = `rgba(6,5,16,${0.32 * eo(pr(t, a, a + 0.4))})`; h.fillRect(0, 0, W, H);
      const k = pop(t, a + 0.05, 0.4); h.save(); h.translate(W / 2 + 170, 640); h.rotate(0.03); h.scale(k * 0.76, k * 0.76);
      h.shadowColor = 'rgba(0,0,0,0.5)'; h.shadowBlur = 40; h.shadowOffsetY = 16; rr(-300, -470, 600, 820, 30, '#f7f3ea'); h.shadowColor = 'transparent';
      rr(-300, -470, 600, 150, [30, 30, 0, 0], '#14151b'); txt('ONE CLIP.', 0, -425, 58, '#fff', 900); txt('51 FREE EFFECTS', 0, -362, 40, ACC, 900);
      FX.forEach((f, i) => { const kk = pop(t, a + 0.3 + i * 0.09, 0.25); const y = -265 + i * 60; h.globalAlpha = kk; h.beginPath(); h.arc(-220, y, 20, 0, 7); h.fillStyle = f.col; h.fill(); txt('/' + f.name, -185, y + 2, 34, '#1b1e2a', 800, 'left', MONO); h.globalAlpha = 1; });
      h.globalAlpha = pop(t, a + 1.0, 0.25); txt('+ 44 more', -185, 165, 34, '#8a7a62', 800, 'left'); h.globalAlpha = 1;
      const kb = pop(t, B('cta1') + 0.6, 0.35); h.save(); h.translate(0, 265); h.scale(kb, kb); h.shadowColor = 'rgba(255,197,61,0.6)'; h.shadowBlur = 40; rr(-265, -58, 530, 116, 30, ACC, '#141414', 6); h.shadowBlur = 0; txt('Comment EFFECTS', 0, 2, 58, '#141414', 900); h.restore();
      h.restore();
      if (t >= C.CRY) { const kp = pop(t, C.CRY, 0.35); h.save(); h.translate(200, 470); h.rotate(-0.08); h.scale(kp, kp); rr(-150, -110, 300, 220, 28, '#fff', '#141414', 6); txt('😭', 0, -20, 110, '#000', 400); txt('video editor', 0, 72, 32, '#141414', 900); h.restore(); } };
    const hudDraw = (t) => { if (h.reset) h.reset(); else { h.setTransform(1, 0, 0, 1, 0, 0); h.globalAlpha = 1; } h.clearRect(0, 0, W, H);
      if (t < B('c1') + 0.2) { viewfinder(t, 1 - pr(t, B('c1'), B('c1') + 0.2)); if (t >= C.BORE) sticker(t, C.BORE + 0.15, 'views: 😴', W - 250, 420, 0.06, '#fff', '#141414', 52); }
      else if (t < FX[0].a) { const n = Math.floor(cl((t - C.TYPE) * 22, 0, 9)); const k = pop(t, B('c1'), 0.3); h.save(); h.translate(W / 2, 360); h.scale(k, k); rr(-330, -80, 660, 160, 30, INK, 'rgba(255,255,255,0.25)', 3); txt('> ' + '/effects '.slice(0, n) + (Math.floor(t * 3) % 2 ? '▌' : ''), -290, 4, 60, '#d8e2ff', 700, 'left', MONO); h.restore(); }
      const fx = fxAt(t);
      if (fx >= 0) { const n = FX[fx].name;
        if (n === 'cover-star') coverStar(t); else if (n === 'countdown-flip') flipClock(t); else if (n === 'reject-stamp') stampHud(t);
        if (n === 'spotlight' && t >= B('w1')) sticker(t, B('w1') + 0.1, 'WHOA', 280, 760, -0.08, ACC, '#141414', 70);
        if (n === 'backdrop-word' && t >= B('w2')) sticker(t, B('w2') + 0.15, "that's ME?!", W - 300, 780, 0.07, '#fff', '#141414', 56);
        if (n !== 'cover-star') fxChip(t, fx); }
      if (t >= C.SEVEN && t < C.FREE) fanHud(t);
      if (t >= C.FREE && t < C.CTA) { freeHud(t); if (t >= C.CHEAT) { confetti(t, C.CHEAT, 70, 9); sticker(t, C.CHEAT + 0.2, 'basically CHEATING 😂', W / 2, 1080, -0.04, RED, '#fff', 52); } }
      if (t >= C.CTA) ctaHud(t);
      hTex.needsUpdate = true; };

    // ================= UPDATE =================
    const CUTS = FX.map(f => f.a).concat([C.SEVEN]);
    const update = t => {
      K.shoot(t, shots); acting(t);
      postU.time.value = t;
      postU.sat.value = t < C.BORE ? 0.8 : t < B('c1') ? 0.8 - 0.75 * eo(pr(t, C.BORE, C.BORE + 0.5)) : t < FX[0].a ? 0.05 + 0.95 * eo(pr(t, FX[0].a - 0.3, FX[0].a)) : fxOn(t, 'cover-star') ? 1.15 : fxOn(t, 'reject-stamp') ? 0.9 : 1.0;
      postU.warm.value = fxOn(t, 'cover-star') ? 0.6 : 0;
      postU.glitch.value = cl(CUTS.reduce((m, c) => Math.max(m, 1 - Math.abs(t - c) / 0.08), 0) * 0.7);
      postU.flash.value = Math.max(0, 0.4 - Math.abs(t - FX[3].a) / 0.08 * 0.4) + Math.max(0, 0.3 - Math.abs(t - C.CHEAT) / 0.1 * 0.3);
      K.cam.updateMatrixWorld(true);
      hudDraw(t);
    };

    // ================= SOUND =================
    const sfx = [['pop', 0.3, 0.2], ['thud', C.BORE + 0.1, 0.3], ['pop', C.BORE + 0.15, 0.25]];
    for (let i = 0; i < 9; i++) sfx.push(['tick', C.TYPE + i * 0.045, 0.18]);
    FX.forEach(f => sfx.push(['zap', f.a - 0.02, 0.3], ['whoosh', f.a, 0.3], ['ding', f.a + 0.08, 0.16]));
    sfx.push(['thud', FX[0].a + 0.02, 0.6], ['pop', B('w1') + 0.1, 0.3]);
    for (let i = 0; i < 4; i++) sfx.push(['whoosh', FX[1].a + 0.2 + i * 0.25, 0.12]);
    sfx.push(['bass', FX[2].a + 0.3, 0.55], ['boing', B('w2') + 0.15, 0.3]);
    sfx.push(['kaching', FX[3].a + 0.02, 0.35], ['chime', FX[3].a + 0.25, 0.25]);
    for (let i = 0; i < 10; i++) sfx.push(['tick', FX[4].a + 0.2 + i * 0.07, 0.16]); sfx.push(['buzz', FX[4].a + 0.15, 0.1]);
    [0, 1, 2].forEach(i => sfx.push(['tick', FX[5].a + 0.15 + i * 0.45, 0.35], ['pop', FX[5].a + 0.15 + i * 0.45, 0.15]));
    sfx.push(['thud', FX[6].a + 0.55, 0.75], ['bass', FX[6].a + 0.56, 0.4]);
    for (let i = 0; i < 7; i++) sfx.push(['pop', C.SEVEN + i * 0.07, 0.16]);
    sfx.push(['riser', C.FREE, 0.18], ['kaching', C.FREE + 1.1, 0.4], ['pop', C.FREE + 1.6, 0.25], ['chime', C.CHEAT, 0.35]);
    for (let i = 0; i < 8; i++) sfx.push(['pop', C.CHEAT + 0.1 + i * 0.07, 0.14]);
    sfx.push(['chime', C.CTA + 0.1, 0.3]); for (let i = 0; i < 7; i++) sfx.push(['pop', C.CTA + 0.3 + i * 0.09, 0.14]);
    sfx.push(['kaching', B('cta1') + 0.6, 0.35], ['boing', C.CRY, 0.35]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, music: { muteFrom: FX[0].a - 0.1, muteTo: FX[0].a + 0.5 }, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
