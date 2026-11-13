/* @maddiee.makess reel 16 — "₹15,000 for a gaming chair". Comedy: Maddie (clueless) + Claude (dry genius). No prompts at the end.
   NEW LOOK (cinematic, like the film-style AI skit pages): moody warm lamp light, haze + light cone, depth-of-field blur, teal/orange
   film grade + grain, serif captions with orange keywords, a dark app PANEL in the top half that only comes in when a beat needs it
   (GOAL → FIND → BUILD → SELL → EARN tabs), stamps ("REAL"), a gauge, slow push-ins, punch zooms, robot face close-ups.
   NEW LOCATION: a PG room on a rainy night — rain on the window grill, desk lamp, laptop, fairy lights, sticky notes, a bed.
   Maddie now has very light stubble. Ending: he sits on the gaming-chair BOX, it caves in, "find me another bakery". */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x0d0b09, fog: null, fov: 38, bloom: null },
  lines: window.JR_LINES,

  build(K, T) {
    const L = T.lines;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[IX(id)].t, E = id => L[IX(id)].end, at = (id, f) => B(id) + f * (E(id) - B(id));
    const D = E('m13') + 1.6;
    const cl = K.clamp, eo = K.easeOut, pr = K.prog, eb = K.easeBack;
    const sm = q => q * q * (3 - 2 * q), lerp = (a, b, k) => a + (b - a) * k;
    const S = K.scene, SM = (c, r = 0.7, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: 0 }, o));
    const BM = c => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
    const RB = window.RoundedBoxGeometry;
    const rbox = (w, h, d, m, x, y, z, rad = 0.02, parent = S) => { const o = new THREE.Mesh(new RB(w, h, d, 3, Math.min(rad, w / 2.01, h / 2.01, d / 2.01)), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const cyl = (rt, rb, h, m, x, y, z, seg = 20, parent = S) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; };
    const sph = (r, m, x, y, z, parent = S, seg = 18) => { const o = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.7)), m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; };
    const plane = (w, h, m, x, y, z, parent = S) => { const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); o.position.set(x, y, z); o.receiveShadow = true; parent.add(o); return o; };
    const W = 1080, H = 1920;
    const noDepth = [];   // objects hidden in the depth pass (glows, haze, particles)

    // ================= TIMELINE =================
    const C = { PAY: E('c12') + 0.3, BOX: E('m10') + 0.85, CR: E('m12') + 0.32 };
    // the PANEL: only for the beats that need a screen. [screen, start]; PON = when the panel is up
    const SCR = [['goal', B('m2') - 0.15], ['find', B('c3') - 0.1], ['build', B('c7') - 0.1], ['chat', B('m8') - 0.12], ['pay', C.PAY]];
    const PON = [[B('m2') - 0.15, E('m2') + 0.05], [B('c3') - 0.1, E('c5') + 0.1], [B('c7') - 0.1, E('c8') + 0.1], [B('m8') - 0.12, E('m9') + 0.05], [C.PAY, E('m10') + 0.4]];
    const panelOn = t => PON.some(([a, b]) => t >= a && t < b);
    const scrAt = t => { let k = 0; SCR.forEach((s, i) => { if (t >= s[1]) k = i; }); return k; };
    const TABS = ['GOAL', 'FIND', 'BUILD', 'SELL', 'EARN'];

    // ================= THE ROOM (PG room, rainy night) =================
    const BZ = -1.6, LXW = -2.3;   // back wall z, left wall x
    const wallTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#4c605a'; x.fillRect(0, 0, w, h); const r = K.rng(4);
      for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '20,30,28' : '200,215,205'},${0.02 + r() * 0.05})`; x.beginPath(); x.arc(r() * w, r() * h, 1 + r() * 9, 0, 7); x.fill(); }
      for (let i = 0; i < 7; i++) { const sx = r() * w; const g = x.createLinearGradient(0, h * 0.55, 0, h); g.addColorStop(0, 'rgba(30,40,35,0)'); g.addColorStop(1, 'rgba(30,40,35,0.25)'); x.fillStyle = g; x.fillRect(sx, h * 0.55, 6 + r() * 26, h * 0.45); } });
    wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping; wallTex.repeat.set(3, 1.6);
    const wallM = SM(0xffffff, 0.95, { map: wallTex });
    plane(7, 3.4, wallM, 0, 1.7, BZ);
    const lw = plane(5, 3.4, wallM, LXW, 1.7, 0.6); lw.rotation.y = Math.PI / 2;
    const rw = plane(5, 3.4, wallM, 2.6, 1.7, 0.6); rw.rotation.y = -Math.PI / 2;
    const ceil = plane(7, 5, SM(0x2a2622, 0.95), 0, 3.1, 0.6); ceil.rotation.x = Math.PI / 2;
    rbox(7, 0.1, 0.03, SM(0x2c2a27, 0.7), 0, 0.05, BZ + 0.015, 0.005);   // skirting
    // grey mosaic floor (typical rented flat)
    const floorTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#6c6862'; x.fillRect(0, 0, w, h); const r = K.rng(8);
      for (let i = 0; i < 2600; i++) { const c = 70 + r() * 90; x.fillStyle = `rgba(${c},${c - 4},${c - 10},0.55)`; x.fillRect(r() * w, r() * h, 2 + r() * 5, 2 + r() * 4); }
      x.strokeStyle = 'rgba(30,28,25,0.55)'; x.lineWidth = 3; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 128); x.lineTo(w, i * 128); x.stroke(); } });
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(4, 3);
    const floor = plane(7, 5, SM(0xffffff, 0.6, { map: floorTex, roughness: 0.55 }), 0, 0, 0.6); floor.rotation.x = -Math.PI / 2;

    // window with an iron grill, rain on the glass, a blurry night city behind
    const WX = 1.25, WY = 1.72, WW = 1.15, WH = 1.25;
    const winC = document.createElement('canvas'); winC.width = 512; winC.height = 560; const wx = winC.getContext('2d'); const winTex = new THREE.CanvasTexture(winC); winTex.colorSpace = THREE.SRGBColorSpace;
    const city = []; { const r = K.rng(21); for (let i = 0; i < 70; i++) city.push([r() * 512, 230 + r() * 330, 6 + r() * 26, r() < 0.7 ? [255, 170 + r() * 60, 90] : [140, 190, 255], 0.25 + r() * 0.55]); }
    const drops = []; { const r = K.rng(5); for (let i = 0; i < 90; i++) drops.push([r() * 512, r() * 560, 2 + r() * 5, 0.3 + r() * 1.2, r()]); }
    const drawWin = t => { const x = wx; const g = x.createLinearGradient(0, 0, 0, 560); g.addColorStop(0, '#060a16'); g.addColorStop(0.6, '#101830'); g.addColorStop(1, '#2a2230'); x.fillStyle = g; x.fillRect(0, 0, 512, 560);
      city.forEach(([cx, cy, r, c, a], i) => { const fl = a * (0.85 + 0.15 * Math.sin(t * 0.8 + i)); const gg = x.createRadialGradient(cx, cy, 0, cx, cy, r); gg.addColorStop(0, `rgba(${c[0]},${c[1] | 0},${c[2]},${fl})`); gg.addColorStop(1, `rgba(${c[0]},${c[1] | 0},${c[2]},0)`); x.fillStyle = gg; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); });
      x.strokeStyle = 'rgba(190,210,255,0.22)'; x.lineWidth = 1.4; const r = K.rng(Math.floor(t * 24)); for (let i = 0; i < 70; i++) { const sx = r() * 540 - 20, sy = r() * 560; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx - 6, sy + 34); x.stroke(); }
      drops.forEach(([dx, dy, rr2, sp, ph]) => { const y = (dy + t * sp * 40 * (ph < 0.3 ? 1 : 0.15)) % 560; x.fillStyle = 'rgba(210,225,255,0.35)'; x.beginPath(); x.ellipse(dx, y, rr2 * 0.7, rr2, 0, 0, 7); x.fill(); x.fillStyle = 'rgba(255,255,255,0.4)'; x.beginPath(); x.arc(dx - rr2 * 0.25, y - rr2 * 0.3, rr2 * 0.25, 0, 7); x.fill(); });
      winTex.needsUpdate = true; };
    const glass = plane(WW, WH, new THREE.MeshBasicMaterial({ map: winTex, toneMapped: false }), WX, WY, BZ + 0.005);
    const frameM = SM(0x3b3027, 0.6);
    rbox(WW + 0.14, 0.07, 0.09, frameM, WX, WY + WH / 2 + 0.03, BZ + 0.04); rbox(WW + 0.14, 0.07, 0.12, frameM, WX, WY - WH / 2 - 0.03, BZ + 0.05);
    [-1, 1].forEach(s => rbox(0.07, WH + 0.12, 0.09, frameM, WX + s * (WW / 2 + 0.035), WY, BZ + 0.04));
    const grillM = SM(0x1d1f22, 0.45, { metalness: 0.5 });
    for (let i = 1; i < 6; i++) cyl(0.008, 0.008, WH, grillM, WX - WW / 2 + i * WW / 6, WY, BZ + 0.07, 6);
    for (let j = 1; j < 3; j++) { const b = cyl(0.008, 0.008, WW, grillM, WX, WY - WH / 2 + j * WH / 3, BZ + 0.07, 6); b.rotation.z = Math.PI / 2; }
    // curtain (half drawn, sways)
    const curtTex = K.canvasTex(256, 256, (x, w, h) => { for (let i = 0; i < w; i++) { const v = 0.75 + 0.25 * Math.sin(i * 0.19); x.fillStyle = `rgb(${Math.floor(150 * v)},${Math.floor(70 * v)},${Math.floor(48 * v)})`; x.fillRect(i, 0, 1, h); } });
    const curtain = new THREE.Mesh(new THREE.PlaneGeometry(0.42, WH + 0.25, 10, 10), SM(0xffffff, 0.9, { map: curtTex, side: THREE.DoubleSide })); curtain.position.set(WX + WW / 2 - 0.12, WY - 0.05, BZ + 0.12); curtain.castShadow = true; S.add(curtain);
    const cPos = curtain.geometry.attributes.position, cBase = cPos.array.slice();

    // desk against the back wall + laptop + lamp + mug + books + plant + tent card
    const DX = -0.45, DZ = -1.22, DY = 0.76;
    const woodM = SM(0x5a3b26, 0.55);
    rbox(1.5, 0.05, 0.62, woodM, DX, DY, DZ, 0.012);
    [[-0.7, -0.27], [0.7, -0.27], [-0.7, 0.27], [0.7, 0.27]].forEach(([x, z]) => rbox(0.05, DY, 0.05, SM(0x2a2622, 0.6), DX + x, DY / 2, DZ + z, 0.01));
    // laptop (screen faces the room, glows)
    const lapM = SM(0x2b2d33, 0.35, { metalness: 0.5 });
    rbox(0.42, 0.018, 0.29, lapM, DX + 0.05, DY + 0.035, DZ + 0.02, 0.006);
    const lid = new THREE.Group(); lid.position.set(DX + 0.05, DY + 0.045, DZ - 0.12); lid.rotation.x = -0.22; S.add(lid);
    rbox(0.42, 0.28, 0.012, lapM, 0, 0.14, 0, 0.006, lid);
    const lapTex = K.canvasTex(420, 280, (x, w, h) => { x.fillStyle = '#10131a'; x.fillRect(0, 0, w, h); x.fillStyle = '#1a2230'; x.fillRect(0, 0, w, 26); x.fillStyle = '#d97757'; x.fillRect(12, 8, 60, 10);
      const r = K.rng(3); for (let i = 0; i < 9; i++) { x.fillStyle = ['#9cdcfe', '#e6c07b', '#c586c0', '#6a9955'][i % 4]; x.fillRect(16 + (i % 3) * 8, 44 + i * 24, 80 + r() * 200, 9); } });
    const lapScr = plane(0.39, 0.25, new THREE.MeshBasicMaterial({ map: lapTex, toneMapped: false }), 0, 0.14, 0.008, lid);
    // desk lamp (left): base, arm, head + bulb; the warm KEY light of the whole room
    const lampM = SM(0x1f1d1b, 0.4, { metalness: 0.4 });
    const LPX = DX - 0.55, LPZ = DZ - 0.05;
    cyl(0.09, 0.1, 0.03, lampM, LPX, DY + 0.04, LPZ, 24);
    const a1 = cyl(0.012, 0.012, 0.42, lampM, LPX + 0.06, DY + 0.24, LPZ, 8); a1.rotation.z = -0.3;
    const a2 = cyl(0.012, 0.012, 0.32, lampM, LPX + 0.2, DY + 0.5, LPZ + 0.04, 8); a2.rotation.z = 1.1;
    const LH = new THREE.Vector3(LPX + 0.33, DY + 0.52, LPZ + 0.06);
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.14, 24, 1, true), SM(0x1f1d1b, 0.4, { metalness: 0.4, side: THREE.DoubleSide })); shade.position.copy(LH); shade.rotation.z = 0.5; S.add(shade);
    sph(0.035, BM(0xffe2b0), LH.x + 0.02, LH.y - 0.04, LH.z, S, 12);
    // light cone (haze) under the lamp
    const coneTex = K.canvasTex(4, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.5, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.62, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0xffb070, alphaMap: coneTex, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
    cone.position.set(LH.x + 0.12, LH.y - 0.33, LH.z); cone.rotation.z = 0.5; S.add(cone); noDepth.push(cone);
    // mug, books, plant
    const mug = cyl(0.04, 0.036, 0.09, SM(0xe9e2d6, 0.4), DX + 0.45, DY + 0.07, DZ + 0.1, 20); const hnd = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.007, 8, 16), SM(0xe9e2d6, 0.4)); hnd.position.set(0.045, 0, 0); hnd.rotation.y = 0; mug.add(hnd);
    [[0xb5443a, 0.3], [0x2f5d8a, 0.26], [0xd8b04a, 0.28]].forEach(([c, w], i) => rbox(w, 0.045, 0.2, SM(c, 0.7), DX + 0.55, DY + 0.05 + i * 0.047, DZ - 0.12, 0.006).rotation.y = (i - 1) * 0.12);
    cyl(0.05, 0.04, 0.08, SM(0x8a4b2f, 0.8), DX - 0.32, DY + 0.065, DZ - 0.15, 16); const pr2 = K.rng(9); for (let i = 0; i < 12; i++) sph(0.025 + pr2() * 0.02, SM(0x3f7a3a, 0.7), DX - 0.32 + (pr2() - 0.5) * 0.08, DY + 0.13 + pr2() * 0.1, DZ - 0.15 + (pr2() - 0.5) * 0.08, S, 8);
    // tent card on the desk: progress to the chair (updates when the money comes)
    const tentC = document.createElement('canvas'); tentC.width = 300; tentC.height = 170; const tx2 = tentC.getContext('2d'); const tentTex = new THREE.CanvasTexture(tentC); tentTex.colorSpace = THREE.SRGBColorSpace;
    const drawTent = done => { const x = tx2; x.fillStyle = '#f3e7cf'; x.fillRect(0, 0, 300, 170); x.fillStyle = '#d0532a'; x.fillRect(0, 0, 300, 30); x.font = '700 20px "Courier Prime"'; x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText('CHAIR FUND', 150, 22);
      x.fillStyle = '#2a1f17'; x.font = '900 46px "Fraunces"'; x.fillText(done ? '₹15,312' : '₹312', 150, 92); x.font = '700 22px "Courier Prime"'; x.fillStyle = done ? '#2f8a4a' : '#8a3a2a'; x.fillText(done ? 'GOAL ✓' : 'of ₹15,000', 150, 140); tentTex.needsUpdate = true; };
    drawTent(false); let tentDone = false;
    const tent = new THREE.Group(); tent.position.set(DX + 0.32, DY + 0.025, DZ + 0.2); tent.rotation.y = -0.25; S.add(tent);
    const tp = plane(0.2, 0.113, SM(0xffffff, 0.8, { map: tentTex }), 0, 0.055, 0.01, tent); tp.rotation.x = -0.25; tp.castShadow = true;
    // sticky notes on the wall above the desk (handwritten goal + a chair doodle)
    const note = (lines, col, x, y, rot, size = 0.2) => { const tex = K.canvasTex(256, 256, (c, w, h) => { c.fillStyle = col; c.fillRect(0, 0, w, h); c.fillStyle = 'rgba(0,0,0,0.08)'; c.fillRect(0, 0, w, 26);
        c.fillStyle = '#2a2a33'; c.textAlign = 'center'; lines.forEach(([s, fs, y0]) => { c.font = `700 ${fs}px "Fredoka"`; c.fillText(s, w / 2, y0); }); });
      const m = plane(size, size, SM(0xffffff, 0.9, { map: tex }), x, y, BZ + 0.012); m.rotation.z = rot; return m; };
    note([['₹15,000', 60, 110], ['by the 30th!!', 34, 160], ['🎮', 50, 225]], '#ffd65a', DX - 0.2, 1.55, 0.08);
    note([['ASK', 44, 100], ['CLAUDE', 48, 160], ['→', 50, 215]], '#ff9fb2', DX + 0.15, 1.62, -0.1, 0.17);
    note([['rent ✓', 38, 95], ['wifi ✓', 38, 145], ['chair ✗', 38, 195]], '#9fe0c2', DX + 0.45, 1.5, 0.06, 0.17);
    // fairy lights across the back wall (bokeh in the blur)
    const fairy = []; const fy = u => 2.45 - Math.sin(u * Math.PI) * 0.22;
    for (let i = 0; i <= 26; i++) { const u = i / 26, x = -2.1 + u * 3.0; const b = sph(0.022, BM(0xffc46a), x, fy(u), BZ + 0.04, S, 8); fairy.push(b); }
    // bed on the left (blanket + pillow)
    const BDX = -1.85; rbox(0.95, 0.32, 1.9, SM(0x3a2c22, 0.7), BDX, 0.16, -0.35, 0.03);
    const blTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#7a2f3a'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,210,150,0.25)'; x.lineWidth = 6; for (let i = 0; i < 8; i++) { x.beginPath(); x.moveTo(i * 32, 0); x.lineTo(i * 32, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 32); x.lineTo(w, i * 32); x.stroke(); } });
    rbox(0.98, 0.12, 1.3, SM(0xffffff, 0.9, { map: blTex }), BDX, 0.38, 0.0, 0.05);
    rbox(0.6, 0.1, 0.32, SM(0xe8e2d8, 0.85), BDX, 0.42, -1.05, 0.05);
    // a poster above the bed
    const postTex = K.canvasTex(256, 360, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1d2b4a'); g.addColorStop(1, '#d0532a'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#ffd65a'; x.beginPath(); x.arc(w / 2, 150, 60, 0, 7); x.fill();
      x.fillStyle = '#10131a'; x.beginPath(); x.moveTo(0, 260); x.lineTo(70, 190); x.lineTo(130, 240); x.lineTo(190, 170); x.lineTo(256, 230); x.lineTo(256, 360); x.lineTo(0, 360); x.fill(); x.fillStyle = '#fff'; x.font = '900 40px "Fraunces"'; x.textAlign = 'center'; x.fillText('LEVEL UP', w / 2, 60); });
    const poster = plane(0.42, 0.59, SM(0xffffff, 0.8, { map: postTex }), LXW + 0.01, 1.75, -0.6); poster.rotation.y = Math.PI / 2;
    // backpack on a hook (right of the window)
    rbox(0.3, 0.42, 0.14, SM(0x2f4a3a, 0.8), 2.2, 1.35, BZ + 0.1, 0.06); rbox(0.22, 0.14, 0.05, SM(0x26392e, 0.8), 2.2, 1.27, BZ + 0.18, 0.03);

    // old blue plastic chair (Maddie) — seat at SY
    const MX = -0.32, MZ = -0.38, SY = 0.47;
    const chairM = SM(0x2c62b8, 0.5), chG = new THREE.Group(); chG.position.set(MX, 0, MZ - 0.02); chG.rotation.y = 0.15; S.add(chG);
    rbox(0.56, 0.05, 0.5, chairM, 0, SY - 0.05, 0.02, 0.03, chG);
    const backr = rbox(0.56, 0.5, 0.05, chairM, 0, SY + 0.27, -0.24, 0.04, chG); backr.rotation.x = -0.12;
    [[-0.25, 0.22], [0.25, 0.22], [-0.25, -0.2], [0.25, -0.2]].forEach(([x, z]) => { const lg = rbox(0.05, SY - 0.06, 0.05, chairM, x, (SY - 0.06) / 2, z, 0.015, chG); lg.rotation.z = x > 0 ? -0.06 : 0.06; });
    [-1, 1].forEach(s => rbox(0.05, 0.05, 0.44, chairM, s * 0.28, SY + 0.17, 0.0, 0.02, chG));
    // the gaming-chair BOX (ending) — sits where the chair was
    const boxTex = K.canvasTex(512, 360, (x, w, h) => { x.fillStyle = '#b98a55'; x.fillRect(0, 0, w, h); const r = K.rng(2); for (let i = 0; i < 500; i++) { x.fillStyle = `rgba(90,60,30,${r() * 0.08})`; x.fillRect(r() * w, r() * h, 1 + r() * 4, 1 + r() * 30); }
      x.fillStyle = '#d9c39a'; x.fillRect(0, 150, w, 54); x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(0, 150, w, 4);
      x.fillStyle = '#2a1f17'; x.font = '900 54px "Fraunces"'; x.textAlign = 'center'; x.fillText('GAMING CHAIR', w / 2, 110); x.font = '700 26px "Courier Prime"'; x.fillText('APEXTHRONE PRO  ·  THIS SIDE UP ↑', w / 2, 290);
      x.strokeStyle = '#2a1f17'; x.lineWidth = 7; x.beginPath(); x.moveTo(60, 60); x.lineTo(60, 140); x.lineTo(110, 140); x.moveTo(60, 100); x.lineTo(100, 100); x.moveTo(85, 140); x.lineTo(85, 170); x.stroke(); });
    const boxG = new THREE.Group(); boxG.position.set(MX, 0, MZ - 0.02); boxG.visible = false; S.add(boxG);
    const boxM = SM(0xffffff, 0.85, { map: boxTex }), boxPlain = SM(0xb98a55, 0.88);
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.72, SY, 0.58), [boxPlain, boxPlain, SM(0xc0915c, 0.9), boxPlain, boxM, boxPlain]); box.position.y = SY / 2; box.castShadow = box.receiveShadow = true; boxG.add(box);
    const flap = rbox(0.74, 0.012, 0.08, SM(0xd9c39a, 0.8), 0, SY + 0.004, 0, 0.004, boxG);   // tape strip on top

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: SY, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(MX, 0, MZ + 0.05); M.g.rotation.y = 0.15; S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    // very light stubble: a thin shell over the skull, speckles only on the jaw, chin and a faint moustache
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
            float sp = step(0.62, hsh(floor(vSP * 560.0)));
            diffuseColor.a = m * (0.07 + 0.34 * sp);
            #include <alphatest_fragment>`); };
      M.head.add(sh); })();
    // a phone in Maddie's right hand (only while he holds it)
    const phone = new THREE.Group(); M.arms[1].hand.add(phone); phone.position.set(-0.03, 0.04, 0.03); phone.rotation.set(-1.2, 0, 0.1);
    rbox(0.075, 0.15, 0.01, SM(0x15161a, 0.3), 0, 0, 0, 0.008, phone); const pScr = plane(0.068, 0.138, BM(0x7fb0ff), 0, 0, 0.0055, phone); pScr.material = new THREE.MeshBasicMaterial({ color: 0x9fc4ff, toneMapped: false });
    const RX = 0.55, RY = 0.98, RZ = -0.22;
    const R = (() => {   // the headphones hover-bot; no hands
      const g = new THREE.Group(); g.position.set(RX, RY, RZ); g.rotation.y = -0.3; S.add(g);
      const lift = new THREE.Group(); lift.position.y = 0.25; g.add(lift); lift.scale.setScalar(0.6);
      const head = new THREE.Group(); lift.add(head);
      const shellM = SM(0xd9d1c4, 0.5), orM = SM(0xe8692f, 0.45), visorM = SM(0x141a2e, 0.12, { metalness: 0.5 });
      const shell = sph(0.27, shellM, 0, 0, 0, head); shell.scale.set(1, 0.9, 0.92); shell.geometry = new THREE.SphereGeometry(0.27, 48, 32);
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.272, 48, 20, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), orM); belly.scale.set(1, 0.9, 0.92); head.add(belly);
      const visor = new THREE.Mesh(new THREE.SphereGeometry(0.255, 48, 28, -Math.PI * 0.36, Math.PI * 0.72, Math.PI * 0.3, Math.PI * 0.32), visorM); visor.scale.set(1.02, 0.92, 0.96); head.add(visor);
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
      const thr = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, depthWrite: false, toneMapped: false })); thr.rotation.x = Math.PI / 2; thr.position.y = -0.27; lift.add(thr); noDepth.push(thr);
      const glowL = new THREE.PointLight(0xffa060, 0.0, 1.0, 2); lift.add(glowL);
      const r = { g, head, lift };
      r.update = (t, { talk = 0, look = [0, 0], mood = 'calm', bob = 0 } = {}) => {
        lift.position.y = 0.25 + Math.sin(t * 2.4) * 0.018 + bob;
        head.rotation.set(look[1] + Math.sin(t * 2.4 + 1) * 0.03, look[0] + Math.sin(t * 0.8) * 0.05, Math.sin(t * 1.7) * 0.04);
        const blink = ((t + 1.3) % 3.4) < 0.11;
        drawFace(mood === 'smile' ? 'happy' : mood, talk * 1.3, blink && !['smile', 'wink', 'flat', 'star', 'side', 'happy'].includes(mood));
        thr.material.opacity = 0.7 + 0.3 * Math.sin(t * 20); thr.scale.setScalar(1 + 0.1 * Math.sin(t * 13));
        glowL.intensity = 0.25 + talk * 0.7;
      };
      return r;
    })();
    R.g.traverse(o => { o.castShadow = false; });

    // dust motes floating in the lamp light + the box-crunch dust puff
    const dotTex = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 0, 32, 32, 30); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const motes = (() => { const n = 90, pos = new Float32Array(n * 3), base = []; const r = K.rng(12); for (let i = 0; i < n; i++) base.push([LH.x - 0.3 + r() * 1.3, 0.85 + r() * 1.3, DZ - 0.1 + r() * 1.4, r() * 7]);
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const p = new THREE.Points(g, new THREE.PointsMaterial({ map: dotTex, color: 0xffcf99, size: 0.012, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })); S.add(p); noDepth.push(p);
      return t => { base.forEach(([x, y, z, ph], i) => { pos[i * 3] = x + Math.sin(t * 0.21 + ph) * 0.06; pos[i * 3 + 1] = y + Math.sin(t * 0.13 + ph * 2) * 0.05; pos[i * 3 + 2] = z + Math.cos(t * 0.17 + ph) * 0.05; }); g.attributes.position.needsUpdate = true; }; })();
    const puff = (() => { const n = 46, pos = new Float32Array(n * 3), dir = []; const r = K.rng(31); for (let i = 0; i < n; i++) { const a = r() * 7; dir.push([Math.cos(a) * (0.4 + r() * 0.9), 0.2 + r() * 0.6, Math.sin(a) * (0.4 + r() * 0.9)]); }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ map: dotTex, color: 0xcfb08a, size: 0.09, transparent: true, opacity: 0, depthWrite: false }); const p = new THREE.Points(g, mat); S.add(p); noDepth.push(p);
      return t => { const k = pr(t, C.CR, C.CR + 1.3); p.visible = k > 0 && k < 1; if (!p.visible) return; const e = eo(k); dir.forEach(([dx, dy, dz], i) => { pos[i * 3] = MX + dx * e * 0.55; pos[i * 3 + 1] = 0.12 + dy * e * 0.5 - k * k * 0.1; pos[i * 3 + 2] = MZ + dz * e * 0.45; }); g.attributes.position.needsUpdate = true; mat.opacity = 0.75 * (1 - k); mat.size = 0.07 + k * 0.12; }; })();

    // ================= LIGHT (warm lamp key, cool window rim, laptop glow) =================
    S.fog = new THREE.FogExp2(0x231b14, 0.055);
    const hemi = new THREE.HemisphereLight(0x7a8fa0, 0x1a120c, 0.45); S.add(hemi);
    const lamp = new THREE.PointLight(0xffa458, 2.4, 5.5, 1.5); lamp.position.copy(LH).add(new THREE.Vector3(0.06, -0.08, 0.1)); lamp.castShadow = true; lamp.shadow.mapSize.set(1024, 1024); lamp.shadow.bias = -0.002; S.add(lamp);
    const keyW = new THREE.SpotLight(0xffcfa8, 2.1, 7, 0.55, 0.7, 1.2); keyW.position.set(-1.1, 2.3, 1.6); keyW.target.position.set(0.1, 1.0, -0.4); keyW.castShadow = true; keyW.shadow.mapSize.set(2048, 2048); keyW.shadow.bias = -0.0008; S.add(keyW); S.add(keyW.target);
    const rimW = new THREE.DirectionalLight(0x7f9cff, 0.75); rimW.position.set(1.6, 2.4, -3.0); rimW.target.position.set(0, 1.0, -0.3); S.add(rimW); S.add(rimW.target);
    const lapL = new THREE.PointLight(0x8fb8ff, 0.45, 2.2, 1.6); lapL.position.set(DX + 0.05, DY + 0.25, DZ + 0.15); S.add(lapL);
    const fill = new THREE.PointLight(0xe8ecff, 0.75, 5, 1.4); fill.position.set(0.6, 1.45, 2.0); S.add(fill);
    const panelL = new THREE.PointLight(0xffa060, 0.0, 3.5, 1.4); panelL.position.set(0.1, 2.3, 0.9); S.add(panelL);   // panel spill (warm)
    const fairyL = [-1.5, -0.3, 0.8].map(x => { const l = new THREE.PointLight(0xffc46a, 0.25, 1.8, 1.8); l.position.set(x, 2.3, BZ + 0.3); S.add(l); return l; });

    // ================= POST: depth-of-field + haze + teal/orange film grade + grain =================
    const rtMain = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
    const rtDepth = new THREE.WebGLRenderTarget(W / 2, H / 2);
    const depthMat = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
    const bloom = new POST.UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.55, 0.65, 0.78);
    const oCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postU = { tC: { value: rtMain.texture }, tD: { value: rtDepth.texture }, res: { value: new THREE.Vector2(W, H) }, time: { value: 0 }, flash: { value: 0 }, dark: { value: 0 },
      focus: { value: 2.5 }, aper: { value: 1 }, near: { value: 0.1 }, far: { value: 600 } };
    const postM = new THREE.ShaderMaterial({ uniforms: postU, depthTest: false, depthWrite: false, toneMapped: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `
        precision highp float; varying vec2 vUv; uniform sampler2D tC, tD; uniform vec2 res; uniform float time, flash, dark, focus, aper, near, far;
        #include <packing>
        vec3 aces(vec3 x){ return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0., 1.); }
        vec3 srgb(vec3 c){ c = clamp(c, 0., 1.); return mix(c*12.92, 1.055*pow(c, vec3(1./2.4))-0.055, step(0.0031308, c)); }
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float dist(vec2 uv){ float d = unpackRGBAToDepth(texture2D(tD, uv)); if (d > 0.9999) return 60.0; return -perspectiveDepthToViewZ(d, near, far); }
        float coc(vec2 uv){ float z = dist(uv); return clamp(abs(z - focus) / max(z, 0.2) * 2.4 * aper, 0., 1.); }
        void main(){
          float c0 = coc(vUv); vec3 col = texture2D(tC, vUv).rgb;
          if (c0 > 0.02) { float R = c0 * 13.0; vec3 acc = col; float wsum = 1.0;
            for (int i = 0; i < 24; i++) { float a = float(i) * 2.39996; float r = sqrt(float(i) + 0.5) / sqrt(24.0); vec2 o = vec2(cos(a), sin(a)) * r * R / res;
              float cs = coc(vUv + o); float w = smoothstep(0.0, 0.25, cs + 0.05);   // sharp foreground does not bleed into the blur
              vec3 s = texture2D(tC, vUv + o).rgb; acc += s * w; wsum += w; }
            col = acc / wsum; }
          vec3 c = srgb(aces(col * 1.08));
          float l = dot(c, vec3(0.299, 0.587, 0.114));
          c = mix(c, c * vec3(0.8, 0.98, 1.06), smoothstep(0.55, 0.0, l) * 0.8);     // teal shadows
          c = mix(c, c * vec3(1.12, 0.99, 0.84), smoothstep(0.3, 1.0, l) * 0.75);    // warm highlights
          c = (c - 0.5) * 1.07 + 0.5; c = c * 0.96 + vec3(0.012, 0.016, 0.02);       // contrast + lifted blacks
          vec2 q = vUv - 0.5; c *= 1.0 - 0.5 * smoothstep(0.3, 0.92, length(q * vec2(1.0, 0.72)));
          c += (hash(vUv * res + fract(time * 7.13) * 91.0) - 0.5) * 0.04;            // film grain
          c = mix(c, vec3(1.), flash); c *= 1.0 - dark;
          gl_FragColor = vec4(clamp(c, 0., 1.), 1.); }` });
    const postScene = new THREE.Scene(); const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postM); quad.frustumCulled = false; postScene.add(quad);
    const mkCanvas = (w = W, hh = H) => { const cv = document.createElement('canvas'); cv.width = w; cv.height = hh; const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; return [cv, cv.getContext('2d'), tx]; };
    const [hc, h, hTex] = mkCanvas();
    const hudScene = new THREE.Scene();
    const hudQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, toneMapped: false, depthTest: false })); hudQ.frustumCulled = false; hudScene.add(hudQ);
    const cc = new THREE.Color();
    K.draw = () => { const r = K.renderer;
      // depth pass (half res): glows/haze/particles hidden
      const fogS = S.fog; S.fog = null; const vis = noDepth.map(o => o.visible); noDepth.forEach(o => { o.visible = false; });
      r.getClearColor(cc); const ca = r.getClearAlpha(); r.setClearColor(0xffffff, 1); S.overrideMaterial = depthMat;
      r.setRenderTarget(rtDepth); r.clear(); r.render(S, K.cam);
      S.overrideMaterial = null; r.setClearColor(cc, ca); noDepth.forEach((o, i) => { o.visible = vis[i]; }); S.fog = fogS;
      postU.near.value = K.cam.near; postU.far.value = K.cam.far;
      r.setRenderTarget(rtMain); r.clear(); r.render(S, K.cam); bloom.render(r, null, rtMain, 0, false);
      r.setRenderTarget(null); r.clear(); r.render(postScene, oCam); r.autoClear = false; r.render(hudScene, oCam); r.autoClear = true; };

    // ================= HUD: the dark app panel =================
    const INK = '#15120f', ORG = '#ff7a2e', RED = '#ff4b4b', GRN = '#3ccf7a', TEAL = '#38d0c0', MUT = '#8f877c', CRM = '#f3ead8';
    const SERIF = '"Fraunces", serif', MONO = '"Courier Prime", "DejaVu Sans Mono"', SANS = '"Inter Display"', EMO = '"Noto Color Emoji", "DejaVu Sans"';
    const rr = (c, x, y, w, hh, r, f, s, lw = 4) => { c.beginPath(); c.roundRect(x, y, w, hh, r); if (f) { c.fillStyle = f; c.fill(); } if (s) { c.strokeStyle = s; c.lineWidth = lw; c.stroke(); } };
    const txt = (c, s, x, y, size, col, wgt = 700, al = 'center', font = SANS) => { c.font = `${wgt} ${size}px ${font}`; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y); };
    const emo = (c, s, x, y, size) => { c.font = `${size}px ${EMO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#000'; c.fillText(s, x, y); };
    const pop = (t, a, d = 0.32) => eb(pr(t, a, a + d));
    const fmt = n => Math.round(n).toLocaleString('en-IN');
    const stamp = (c, s, x, y, k, col, size = 56, rot = -0.14, fill = null) => { if (k <= 0) return; const sc = lerp(2.4, 1, eo(k)); c.save(); c.globalAlpha = cl(k * 3); c.translate(x, y); c.rotate(rot); c.scale(sc, sc);
      c.font = `900 ${size}px ${SANS}`; const w = c.measureText(s).width + 44; rr(c, -w / 2, -size * 0.75, w, size * 1.5, 14, fill, fill ? null : col, 7); c.fillStyle = fill ? INK : col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, 0, 2); c.restore(); };
    const PX = 36, PY = 92, PW = 1008, PH = 800, CY0 = 92, CW = PW, CH = PH - CY0;     // panel rect; content area under the tab row
    const [sA, xA] = (() => { const cv = document.createElement('canvas'); cv.width = CW; cv.height = CH; return [cv, cv.getContext('2d')]; })();
    const [sB, xB] = (() => { const cv = document.createElement('canvas'); cv.width = CW; cv.height = CH; return [cv, cv.getContext('2d')]; })();
    const bg = c => { c.fillStyle = '#17130f'; c.fillRect(0, 0, CW, CH); };

    // ---------- GOAL: the gaming chair product card ----------
    const drawChair = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); c.lineCap = 'round';
      c.strokeStyle = '#2b2b30'; c.lineWidth = 16; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5 + Math.PI; c.beginPath(); c.moveTo(0, 230); c.lineTo(Math.cos(a) * 120, 230 + Math.sin(a) * 18 + 20); c.stroke(); c.fillStyle = '#111'; c.beginPath(); c.arc(Math.cos(a) * 120, 230 + Math.sin(a) * 18 + 34, 13, 0, 7); c.fill(); }
      rr(c, -12, 150, 24, 85, 8, '#3a3a40');
      rr(c, -110, 110, 220, 56, 26, '#1d1d22'); rr(c, -110, 110, 220, 14, 8, ORG);
      [-1, 1].forEach(sx => { rr(c, sx * 118 - 14, 60, 28, 64, 10, '#26262c'); rr(c, sx * 118 - 26, 50, 52, 18, 9, '#1d1d22'); });
      rr(c, -95, -190, 190, 310, 50, '#1d1d22'); rr(c, -95, -190, 30, 310, [50, 0, 0, 50], ORG); rr(c, 65, -190, 30, 310, [0, 50, 50, 0], ORG);
      rr(c, -55, -170, 110, 60, 24, '#2c2c33'); rr(c, -60, 20, 120, 70, 30, '#2c2c33');
      c.fillStyle = ORG; c.font = `900 26px ${SERIF}`; c.textAlign = 'center'; c.fillText('AT', 0, -40); c.restore(); };
    const drawGoal = (c, t) => { bg(c);
      rr(c, 28, 24, 430, CH - 48, 26, '#211b16'); const g = c.createRadialGradient(243, 330, 20, 243, 330, 300); g.addColorStop(0, 'rgba(255,122,46,0.25)'); g.addColorStop(1, 'rgba(255,122,46,0)'); c.fillStyle = g; c.fillRect(28, 24, 430, CH - 48);
      drawChair(c, 243, 300, 1.05 + 0.02 * Math.sin(t * 2));
      txt(c, 'WISHLIST · 1 ITEM', 500, 70, 22, ORG, 800, 'left'); txt(c, 'ApexThrone', 500, 140, 62, CRM, 900, 'left', SERIF); txt(c, 'Pro', 500, 210, 62, CRM, 900, 'left', SERIF);
      txt(c, 'Gaming chair · recline 155° · RGB', 500, 268, 24, MUT, 600, 'left'); txt(c, '★★★★☆  4.6', 500, 312, 26, '#ffcf5a', 800, 'left');
      const pk = pop(t, B('m2') + 0.05, 0.4); c.save(); c.translate(500, 400); c.scale(1, 1); c.globalAlpha = cl(pk); txt(c, '₹14,999', 0, 0, 96, '#fff', 900, 'left', SERIF); c.restore();
      rr(c, 500, 470, 420, 76, 38, ORG); txt(c, 'Add to cart', 710, 509, 30, INK, 900);
      const wk = pop(t, at('m2', 0.55), 0.35); if (wk > 0) { c.save(); c.translate(710, 600); c.scale(wk, wk); rr(c, -210, -36, 420, 72, 18, 'rgba(255,75,75,0.14)', RED, 3); txt(c, 'Your balance: ₹312 😬', 0, 1, 28, RED, 900, 'center', `${SANS}, ${EMO}`); c.restore(); }
      return [700, 420]; };
    // ---------- FIND: Google-Maps-style search, pins, listings, "NO WEBSITE" tags ----------
    const SHOPS = [['Sweet Crumbs Bakery', '🎂', 0], ["Rao's Bakes", '🥐', 0], ['Cake Point', '🍰', 0], ['Hyderabad Bakers', '🍞', 1], ['Daily Bread Co.', '🥖', 0], ['Bun & Butter', '🧁', 1], ['Sugar Rush Cakes', '🍩', 0], ['The Crust House', '🥧', 1]];
    const NOSITE = SHOPS.map((s, i) => i).filter(i => !SHOPS[i][2]);
    const PINS = (() => { const r = K.rng(77); return Array.from({ length: 12 }, () => [70 + r() * (CW - 140), 150 + r() * 200]); })();
    const drawFind = (c, t) => { bg(c);
      // map
      c.save(); c.beginPath(); c.roundRect(28, 112, CW - 56, 250, 22); c.clip(); c.fillStyle = '#1d2422'; c.fillRect(28, 112, CW - 56, 250);
      const r = K.rng(4); c.strokeStyle = '#2f3a37'; c.lineWidth = 3; for (let i = 0; i < 14; i++) { c.beginPath(); const y = 112 + r() * 250; c.moveTo(28, y); c.lineTo(CW, y + (r() - 0.5) * 120); c.stroke(); }
      c.strokeStyle = '#4a5450'; c.lineWidth = 9; c.beginPath(); c.moveTo(28, 300); c.bezierCurveTo(300, 200, 600, 360, CW, 180); c.stroke(); c.strokeStyle = '#25485a'; c.lineWidth = 22; c.beginPath(); c.moveTo(200, 112); c.bezierCurveTo(260, 220, 180, 300, 240, 362); c.stroke();
      const typed = t > at('c3', 0.92);
      PINS.forEach(([px, py], i) => { const k = pop(t, at('c3', 0.95) + i * 0.05, 0.3); if (k <= 0) return; const bad = i < 7 && t > at('c5', 0.15 + i * 0.08); c.save(); c.translate(px, py - (1 - cl(k)) * 40); c.scale(k, k);
        if (bad) { c.strokeStyle = `rgba(255,75,75,${0.5 + 0.5 * Math.sin(t * 8 + i)})`; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 24, 0, 7); c.stroke(); }
        c.fillStyle = bad ? RED : ORG; c.beginPath(); c.arc(0, -22, 14, 0, 7); c.fill(); c.beginPath(); c.moveTo(-10, -14); c.lineTo(0, 0); c.lineTo(10, -14); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, -22, 5, 0, 7); c.fill(); c.restore(); });
      c.restore();
      // search bar (typing "bakery near me")
      rr(c, 28, 26, CW - 56, 70, 35, '#262019'); emo(c, '🔍', 70, 61, 30);
      const q = 'bakery near me', n = Math.floor(cl(pr(t, at('c3', 0.42), at('c3', 0.92))) * q.length);
      txt(c, n ? q.slice(0, n) : 'Search Google Maps', 108, 62, 30, n ? CRM : MUT, 700, 'left'); if (!typed && (t * 2) % 1 < 0.5 && n) { c.font = `700 30px ${SANS}`; c.fillStyle = ORG; c.fillRect(110 + c.measureText(q.slice(0, n)).width, 44, 3, 36); }
      // listings (slide in at c4), tags pop at c5
      const cw = (CW - 56 - 14) / 2;
      SHOPS.forEach(([name, ic, site], i) => { const a = at('c4', 0.05) + i * 0.07; const k = pop(t, a, 0.3); if (k <= 0) return; const x = 28 + (i % 2) * (cw + 14), y = 380 + Math.floor(i / 2) * 76;
        c.save(); c.globalAlpha = cl(k); c.translate((1 - k) * 60, 0); rr(c, x, y, cw, 66, 16, '#221c17'); c.fillStyle = '#2e261f'; c.beginPath(); c.arc(x + 36, y + 33, 22, 0, 7); c.fill(); emo(c, ic, x + 36, y + 35, 26);
        txt(c, name, x + 70, y + 24, 22, CRM, 800, 'left'); txt(c, `${(4.1 + (i * 0.13) % 0.8).toFixed(1)} ★ · ${(0.4 + i * 0.3).toFixed(1)} km`, x + 70, y + 48, 18, MUT, 600, 'left');
        const ti = NOSITE.indexOf(i);
        if (site) { rr(c, x + cw - 112, y + 18, 96, 30, 15, '#2e3a33'); txt(c, '🌐 site', x + cw - 64, y + 33, 17, '#9fd7b2', 800, 'center', `${SANS}, ${EMO}`); }
        else { const tk = pop(t, at('c5', 0.1 + ti * 0.11), 0.28); if (tk > 0) { c.save(); c.translate(x + cw - 72, y + 33); c.scale(tk, tk); rr(c, -62, -16, 124, 32, 16, RED); txt(c, 'NO WEBSITE', 0, 1, 16, '#fff', 900); c.restore(); } }
        c.restore(); });
      stamp(c, '7 / 12  NO SITE', CW - 200, 150, pr(t, at('c5', 0.72), at('c5', 0.95)), RED, 34, 0.1, null);
      return [CW / 2, 520]; };
    // ---------- BUILD: the site builds itself + timer + price + REAL ----------
    const drawBuild = (c, t) => { bg(c); const k0 = at('c7', 0.05), k1 = at('c7', 0.92), bk = pr(t, k0, k1);
      // browser
      rr(c, 28, 24, 600, CH - 48, 22, '#f6efe6'); c.save(); c.beginPath(); c.roundRect(28, 24, 600, CH - 48, 22); c.clip();
      c.fillStyle = '#e4dbcf'; c.fillRect(28, 24, 600, 52); ['#ff5f57', '#febc2e', '#28c840'].forEach((cc2, i) => { c.fillStyle = cc2; c.beginPath(); c.arc(56 + i * 24, 50, 8, 0, 7); c.fill(); }); rr(c, 140, 36, 400, 28, 14, '#fff'); txt(c, '🔒 sweetcrumbs.in', 340, 51, 17, '#5b5147', 700, 'center', `${SANS}, ${EMO}`);
      const part = (i, n = 7) => cl(bk * n - i);   // element i appears
      const sk = (x, y, w, hh, i) => { const p = part(i); if (p >= 1) return false; c.fillStyle = `rgba(200,190,175,${0.6 + 0.3 * Math.sin(t * 9 + i)})`; c.beginPath(); c.roundRect(x, y, w, hh, 10); c.fill(); return true; };
      if (!sk(48, 92, 560, 210, 0)) { const g = c.createLinearGradient(48, 92, 608, 302); g.addColorStop(0, '#f6b8c4'); g.addColorStop(1, '#f2d39b'); c.fillStyle = g; c.beginPath(); c.roundRect(48, 92, 560, 210, 14); c.fill(); emo(c, '🎂', 328, 192, 110); }
      if (!sk(48, 318, 420, 50, 1)) txt(c, 'Sweet Crumbs Bakery', 48, 344, 42, '#3a241a', 900, 'left', SERIF);
      if (!sk(48, 378, 330, 26, 2)) txt(c, 'Fresh every morning · since 1998', 48, 392, 21, '#7a6556', 600, 'left');
      if (!sk(48, 420, 300, 60, 3)) { rr(c, 48, 420, 300, 60, 30, '#25a35a'); txt(c, '💬 Order on WhatsApp', 198, 451, 22, '#fff', 800, 'center', `${SANS}, ${EMO}`); }
      [['🧁', '₹60'], ['🍰', '₹450'], ['🥐', '₹40']].forEach(([e, p], i) => { const x = 48 + i * 190; if (!sk(x, 500, 176, 150, 4 + i)) { rr(c, x, 500, 176, 150, 16, '#fff', '#eadfcf', 2); emo(c, e, x + 88, 556, 56); txt(c, p, x + 88, 622, 24, '#3a241a', 900, 'center', SERIF); } });
      c.restore();
      // timer
      rr(c, 650, 24, 330, 190, 22, '#211b16'); txt(c, '⏱  BUILD TIME', 815, 64, 22, MUT, 800, 'center', `${SANS}, ${EMO}`);
      const secs = Math.floor(lerp(0, 581, eo(cl(bk)))); const done = bk >= 1;
      txt(c, `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`, 815, 128, 76, done ? GRN : CRM, 900, 'center', SERIF); txt(c, done ? 'DONE ✓  under 10 min' : 'building…', 815, 186, 22, done ? GRN : MUT, 800);
      // price cards at c8
      const f1 = pop(t, at('c8', 0.02), 0.3), f2 = pop(t, at('c8', 0.42), 0.32);
      if (f1 > 0) { c.save(); c.translate(815, 270); c.scale(f1, f1); rr(c, -165, -38, 330, 76, 18, 'rgba(60,207,122,0.15)', GRN, 3); txt(c, 'FREE PREVIEW', 0, 1, 30, GRN, 900); c.restore(); }
      if (f2 > 0) { c.save(); c.translate(815, 384); c.scale(f2, f2); rr(c, -165, -62, 330, 124, 18, ORG); txt(c, '₹5,000', 0, -12, 56, INK, 900, 'center', SERIF); txt(c, 'to keep it', 0, 36, 22, INK, 800); c.restore(); }
      // fact check: REAL
      const rk = pr(t, at('c8', 0.78), at('c8', 0.98)); if (rk > 0) { rr(c, 650, 470, 330, 196, 22, '#14201e'); txt(c, 'FACT CHECK', 815, 504, 20, MUT, 800); stamp(c, 'REAL', 815, 568, rk, TEAL, 54, -0.06, TEAL); c.globalAlpha = cl(rk * 2); txt(c, 'small shops pay ₹3K–15K', 815, 636, 20, '#cfe9e4', 700); c.globalAlpha = 1; }
      return [CW / 2, 400]; };
    // ---------- SELL: the chat with the bakery ----------
    const drawChat = (c, t) => { c.fillStyle = '#0d1418'; c.fillRect(0, 0, CW, CH); const r = K.rng(6); c.fillStyle = 'rgba(255,255,255,0.025)'; for (let i = 0; i < 60; i++) { c.beginPath(); c.arc(r() * CW, r() * CH, 6 + r() * 10, 0, 7); c.fill(); }
      c.fillStyle = '#1b252b'; c.fillRect(0, 0, CW, 92); txt(c, '←', 40, 46, 34, CRM, 700); c.fillStyle = '#f6b8c4'; c.beginPath(); c.arc(110, 46, 30, 0, 7); c.fill(); emo(c, '🎂', 110, 48, 34);
      txt(c, 'Sweet Crumbs Bakery', 158, 34, 28, '#fff', 800, 'left'); txt(c, 'online', 158, 64, 20, GRN, 700, 'left');
      const bub = (y, w, hh, me, k, draw) => { if (k <= 0) return; const x = me ? CW - 36 - w : 36; c.save(); c.translate(x + (me ? w : 0), y); c.scale(k, k); c.translate(-(me ? w : 0), 0); rr(c, 0, 0, w, hh, 22, me ? '#1f5c4a' : '#232d33'); draw(c); c.restore(); };
      // my sent preview (already there)
      bub(120, 520, 226, true, 1, c2 => { rr(c2, 14, 14, 492, 120, 14, '#f6b8c4'); emo(c2, '🎂', 70, 74, 60); txt(c2, 'sweetcrumbs.in', 130, 56, 26, '#3a241a', 900, 'left', SERIF); txt(c2, 'Your new website · preview', 130, 94, 19, '#6a4a3a', 700, 'left');
        txt(c2, 'Made this for you 🙂', 22, 168, 26, '#fff', 700, 'left', `${SANS}, ${EMO}`); txt(c2, '9:41 PM ✓✓', 500, 206, 17, '#7fd0ff', 700, 'right'); });
      bub(370, 360, 70, false, pop(t, B('m8') - 0.08, 0.28), c2 => txt(c2, 'Wow 😍 this is so nice', 22, 36, 24, '#fff', 700, 'left', `${SANS}, ${EMO}`));
      bub(454, 230, 70, false, pop(t, at('m8', 0.5), 0.28), c2 => txt(c2, 'How much?', 22, 36, 28, '#fff', 900, 'left'));
      // input: "₹5,000 please 🙏" typed during c11, more 🙏 on m9
      rr(c, 24, CH - 96, CW - 140, 72, 36, '#1b252b'); rr(c, CW - 104, CH - 96, 72, 72, 36, '#25a35a'); txt(c, '➤', CW - 68, CH - 60, 30, '#fff', 900);
      const s1 = '₹5,000 please 🙏', s2 = ' 🙏🙏'; const n1 = Math.floor(cl(pr(t, at('c11', 0.5), E('c11'))) * [...s1].length), n2 = Math.floor(cl(pr(t, at('m9', 0.3), E('m9') + 0.1)) * [...s2].length);
      const typed = [...s1].slice(0, n1).join('') + [...s2].slice(0, n2).join('');
      txt(c, typed || 'Message', 56, CH - 59, 30, typed ? '#fff' : MUT, 700, 'left', `${SANS}, ${EMO}`);
      if (typed && (t * 2.2) % 1 < 0.55) { c.font = `700 30px ${SANS}, ${EMO}`; c.fillStyle = TEAL; c.fillRect(58 + c.measureText(typed).width, CH - 78, 3, 38); }
      return [CW / 2, t > at('c11', 0.45) ? CH - 120 : 480]; };
    // ---------- EARN: three payments + the chair-fund gauge ----------
    const PAYS = [['Sweet Crumbs Bakery', '🎂'], ["Rao's Bakes", '🥐'], ['Cake Point', '🍰']], PT = [0.35, 0.95, 1.55].map(d => C.PAY + d);
    const drawPay = (c, t) => { bg(c);
      if (t < B('m10') - 0.05) txt(c, 'CHAIR FUND', CW / 2, 44, 24, MUT, 900);
      const got = PT.filter(a => t > a).length, kk = got ? eo(pr(t, PT[got - 1], PT[got - 1] + 0.45)) : 0, val = (got - 1 + kk) * 5000 * (got > 0 ? 1 : 0), frac = cl(val / 15000);
      const cx = CW / 2, cy = 300, rad = 200; c.lineCap = 'round';
      c.strokeStyle = '#2a231c'; c.lineWidth = 34; c.beginPath(); c.arc(cx, cy, rad, Math.PI, 0); c.stroke();
      c.strokeStyle = frac >= 1 ? GRN : ORG; c.beginPath(); c.arc(cx, cy, rad, Math.PI, Math.PI + Math.PI * frac + 0.0001); c.stroke();
      for (let i = 0; i <= 10; i++) { const a = Math.PI + i * Math.PI / 10; c.strokeStyle = '#5a4f44'; c.lineWidth = 3; c.beginPath(); c.moveTo(cx + Math.cos(a) * (rad - 34), cy + Math.sin(a) * (rad - 34)); c.lineTo(cx + Math.cos(a) * (rad - 50), cy + Math.sin(a) * (rad - 50)); c.stroke(); }
      const na = Math.PI + Math.PI * frac + Math.sin(t * 30) * 0.01 * (frac > 0 && frac < 1 ? 1 : 0); c.strokeStyle = CRM; c.lineWidth = 7; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(na) * (rad - 60), cy + Math.sin(na) * (rad - 60)); c.stroke(); c.fillStyle = CRM; c.beginPath(); c.arc(cx, cy, 14, 0, 7); c.fill();
      txt(c, '₹' + fmt(val), cx, cy + 62, 74, frac >= 1 ? GRN : '#fff', 900, 'center', SERIF); txt(c, 'goal ₹15,000', cx, cy + 112, 22, MUT, 700);
      PAYS.forEach(([n, e], i) => { const k = pop(t, PT[i], 0.32); if (k <= 0) return; const y = 452 + i * 78; c.save(); c.globalAlpha = cl(k); c.translate((1 - k) * 160, 0); rr(c, 60, y, CW - 120, 66, 18, '#211b16', '#3a2f25', 2);
        c.fillStyle = '#2b3b31'; c.beginPath(); c.arc(100, y + 33, 22, 0, 7); c.fill(); emo(c, e, 100, y + 35, 24); txt(c, '₹5,000 received', 136, y + 22, 24, GRN, 900, 'left'); txt(c, 'from ' + n + ' · UPI', 136, y + 47, 18, MUT, 700, 'left'); txt(c, 'just now', CW - 80, y + 33, 18, MUT, 700, 'right'); c.restore(); });
      if (t > B('m10') - 0.05) { c.save(); const gk = pop(t, B('m10') - 0.05, 0.35); c.translate(CW / 2, 52); c.rotate(-0.03); c.scale(gk, gk); rr(c, -230, -36, 460, 72, 36, ORG); txt(c, 'GOAL REACHED ✓', 0, 2, 34, INK, 900, 'center', `${SERIF}, ${EMO}`); c.restore(); }
      if (t > B('m10')) { const k = pr(t, B('m10'), B('m10') + 2.0), r = K.rng(11); for (let i = 0; i < 44; i++) { const x0 = r() * CW, y = -20 + k * (400 + r() * 700); c.save(); c.translate(x0 + Math.sin(t * 6 + i) * 20, y); c.rotate(t * 5 + i); c.fillStyle = [ORG, '#ffcf5a', GRN, TEAL, CRM][i % 5]; c.fillRect(-8, -4, 16, 8); c.restore(); } }
      return [CW / 2, 330]; };
    const SCREENS = { goal: drawGoal, find: drawFind, build: drawBuild, chat: drawChat, pay: drawPay };
    // content zooms: [screen, t0, t1, scale]
    const ZM = [['goal', at('m2', 0.25), E('m2') + 0.3, 1.07], ['find', at('c5', 0.0), E('c5') + 0.3, 1.05], ['build', B('c8') - 0.05, E('c8') + 0.3, 1.06], ['chat', at('m8', 0.45), E('m9') + 0.2, 1.07], ['pay', B('m10') - 0.2, E('m10') + 0.4, 1.06]];
    const zoomOf = (name, t) => { let z = 1; ZM.forEach(([n, a, b, s]) => { if (n === name && t > a - 0.3 && t < b + 0.35) { const k = t < a ? 0 : t < a + 0.4 ? sm(pr(t, a, a + 0.4)) : t < b ? 1 : 1 - sm(pr(t, b, b + 0.35)); z = Math.max(z, lerp(1, s, k)); } }); return z; };
    const renderScreen = (cv, cx, name, t) => { cx.setTransform(1, 0, 0, 1, 0, 0); cx.clearRect(0, 0, CW, CH);
      const z = zoomOf(name, t); const foc = SCREENS[name](cx, t);
      if (z > 1.001 && foc) { cx.clearRect(0, 0, CW, CH); cx.save(); cx.translate(CW / 2, CH / 2); cx.scale(z, z); const fx = cl(lerp(CW / 2, foc[0], 0.85), CW / (2 * z), CW - CW / (2 * z)), fy = cl(lerp(CH / 2, foc[1], 0.85), CH / (2 * z), CH - CH / (2 * z)); cx.translate(-fx, -fy); SCREENS[name](cx, t); cx.restore(); } };
    const panelAt = t => { let v = 0; PON.forEach(([a, b]) => { if (t >= a - 0.01 && t < b + 0.35) v = Math.max(v, t < b ? eo(pr(t, a, a + 0.45)) : 1 - sm(pr(t, b, b + 0.32))); }); return cl(v); };
    const bump = t => { let b = 0; SCR.forEach(([n, a]) => { b = Math.max(b, K.pulse(t, a, 0.3) * 0.02); }); PT.forEach(a => { b = Math.max(b, K.pulse(t, a, 0.22) * 0.02); }); return b; };
    let tabX = 0;
    const drawPanel = t => { const k = panelAt(t); if (k <= 0.001) return; const c = h;
      // dark scrim over the top half that melts into the 3D below
      const g = c.createLinearGradient(0, 0, 0, 1010); g.addColorStop(0, `rgba(12,10,8,${0.96 * k})`); g.addColorStop(0.86, `rgba(12,10,8,${0.9 * k})`); g.addColorStop(1, 'rgba(12,10,8,0)'); c.fillStyle = g; c.fillRect(0, 0, W, 1010);
      const si = scrAt(t), name = SCR[si][0], ts = t - SCR[si][1], swipe = si > 0 && ts < 0.36 && panelOn(SCR[si][1] - 0.05) ? sm(ts / 0.36) : 1;
      renderScreen(sA, xA, name, t); if (swipe < 1) renderScreen(sB, xB, SCR[si - 1][0], t);
      const s = lerp(0.9, 1, k) * (1 + bump(t));
      c.save(); c.globalAlpha = k; c.translate(W / 2, PY + PH / 2 - (1 - k) * 90); c.scale(s, s); c.translate(-W / 2, -(PY + PH / 2));
      c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 60; c.shadowOffsetY = 24; rr(c, PX, PY, PW, PH, 30, '#17130f'); c.shadowColor = 'transparent'; rr(c, PX, PY, PW, PH, 30, null, 'rgba(255,255,255,0.07)', 2);
      // tab row (the active pill slides)
      const TI = { goal: 0, find: 1, build: 2, chat: 3, pay: 4 }, ti = TI[name]; tabX = si > 0 && ts < 0.4 ? lerp(TI[SCR[si - 1][0]], ti, sm(ts / 0.4)) : ti;
      const tw = (PW - 48) / 5; rr(c, PX + 24 + tabX * tw + 3, PY + 22, tw - 6, 50, 25, ORG);
      TABS.forEach((s2, i) => { const on = Math.abs(i - tabX) < 0.5; txt(c, (i < ti ? '✓ ' : '') + s2, PX + 24 + i * tw + tw / 2, PY + 48, 22, on ? INK : i < ti ? '#c9b8a3' : MUT, 900, 'center', `${SANS}, ${EMO}`); });
      c.save(); c.beginPath(); c.roundRect(PX, PY + CY0, PW, CH, [0, 0, 30, 30]); c.clip();
      if (swipe < 1) { c.drawImage(sB, PX - swipe * CW * 0.4, PY + CY0); c.drawImage(sA, PX + (1 - swipe) * CW, PY + CY0); } else c.drawImage(sA, PX, PY + CY0);
      c.restore(); c.restore(); };
    // "3 days later…" (film subtitle) when we cut to the box
    const drawLater = t => { const a = C.BOX + 0.05, b = B('m11') - 0.05; if (t < a || t > b + 0.3) return; const k = t < a + 0.35 ? sm(pr(t, a, a + 0.35)) : t > b ? 1 - sm(pr(t, b, b + 0.3)) : 1; const c = h;
      c.save(); c.globalAlpha = k; c.font = `italic 600 64px ${SERIF}`; c.fillStyle = CRM; c.textAlign = 'center'; c.textBaseline = 'middle'; c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 18; c.fillText('3 days later…', W / 2, 300); c.shadowBlur = 0; c.fillStyle = ORG; c.fillRect(W / 2 - 70 * k, 352, 140 * k, 5); c.restore(); };
    const hudDraw = t => { h.setTransform(1, 0, 0, 1, 0, 0); h.clearRect(0, 0, W, H); drawPanel(t); drawLater(t); hTex.needsUpdate = true; };

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const smv = (a, b, k) => a + (b - a) * k;
    const toR = [0.75, 0.05], toCam = [-0.1, 0.02], down = [0.15, 0.35], toM = [-0.45, 0.06], rCam = [0.25, 0.0];
    const P0 = { L: [-0.3, 0, -0.05, -0.1], R: [-0.3, 0, 0.05, -0.1] };
    const POSE = { rest: P0, shrug: { L: [-0.55, 0.1, -0.55, -1.25], R: [-0.55, -0.1, 0.55, -1.25] }, both: { L: [-2.7, 0.15, -0.45, -0.35], R: [-2.7, -0.15, 0.45, -0.35] },
      chin: { L: [-0.3, 0, -0.05, -0.1], R: [-1.15, -0.55, 0.1, -2.0] }, slump: { L: [0.1, 0, -0.2, -0.05], R: [0.1, 0, 0.2, -0.05] },
      point: { L: [-0.3, 0, -0.05, -0.1], R: [-2.4, -0.2, 0.1, -0.2] }, hold: { L: [-0.75, 0.3, -0.25, -1.35], R: [-0.75, -0.3, 0.25, -1.35] },
      count: { L: [-0.75, 0.3, -0.25, -1.35], R: [-1.9, -0.35, 0.2, -1.3] }, head: { L: [-2.4, 0.1, -0.9, -2.2], R: [-2.4, -0.1, 0.9, -2.2] } };
    // per line: Maddie [face, pose, look, lean, bounce, type], Claude [mood, look, bob]
    const ACT = {
      m1: [['worried', 'slump', toCam, 0.25, 0], ['calm', toM]], c1: [['neutral', 'rest', toR, 0.05, 0], ['side', toM]],
      m2: [['smile', 'shrug', toR, 0.05, 0], ['flat', toM]], c2: [['smile', 'rest', toR, 0.0, 0], ['flat', rCam]],
      c3: [['neutral', 'hold', down, 0.1, 0, 0.8], ['smile', toM]], m3: [['neutral', 'shrug', toR, 0.05, 0], ['calm', toM]],
      c4: [['worried', 'hold', down, 0.1, 0], ['flat', toM]], c5: [['neutral', 'hold', down, 0.1, 0], ['smile', toM]],
      m4: [['worried', 'chin', toR, 0.1, 0], ['calm', toM]], c6: [['shock', 'rest', toR, 0.0, 0], ['wink', rCam]],
      c7: [['neutral', 'hold', down, 0.05, 0], ['smile', toM]], m5: [['shock', 'both', toR, -0.15, 1.1], ['calm', toM]],
      c8: [['smile', 'rest', toR, 0.0, 0], ['smile', toM]], m6: [['worried', 'count', toCam, 0.05, 0], ['flat', toM]],
      c9: [['shock', 'rest', toR, 0.0, 0], ['flat', rCam]], m7: [['worried', 'point', toR, -0.05, 0.4], ['calm', toM]],
      c10: [['worried', 'slump', toR, 0.2, 0], ['wink', toM]], m8: [['shock', 'hold', toR, -0.1, 1.2], ['calm', toM]],
      c11: [['neutral', 'hold', down, 0.1, 0, 1], ['flat', toM]], m9: [['smile', 'hold', toCam, 0.05, 0, 0.6], ['calm', toM]],
      c12: [['worried', 'hold', toR, 0.1, 0], ['flat', rCam]], m10: [['shock', 'both', toCam, -0.15, 1.8], ['star', toM, 0.04]],
      m11: [['smile', 'shrug', toR, -0.12, 0], ['calm', toM]], c13: [['neutral', 'rest', toR, -0.05, 0], ['flat', toM]],
      m12: [['smile', 'chin', toR, -0.05, 0], ['side', rCam]], c14: [['worried', 'slump', toR, 0.2, 0], ['flat', toM]],
      m13: [['worried', 'slump', toCam, 0.25, 0], ['happy', toM, 0.02]],
    };
    const curLine = t => { let id = 'm1'; window.SCENE.lines.forEach((l, i) => { if (t >= L[i].t - 0.12) id = l.id; }); return id; };
    let curPose = JSON.parse(JSON.stringify(P0));
    const crunchK = t => eo(pr(t, C.CR, C.CR + 0.2));
    const acting = (t) => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 || Math.abs(t - last) > 0.2 ? 1 : cl((t - last) * 6); last = t;
      const id = curLine(t); let [[face, pose, mL, lean, bounce, type = 0], [mood, rL, bob = 0]] = ACT[id];
      if (t >= C.PAY && t < B('m10') - 0.1) { face = 'shock'; pose = t > PT[1] ? 'both' : 'hold'; mL = down; lean = 0; bounce = t > PT[1] ? 0.8 : 0; mood = 'smile'; }
      if (t >= C.BOX && t < B('m11') - 0.1) { face = 'smile'; pose = 'shrug'; mL = toCam; lean = -0.15; bounce = 0; mood = 'flat'; }
      if (t >= C.CR && t < B('c14') - 0.1) { face = 'shock'; pose = 'both'; mL = toCam; lean = 0.1; bounce = 0; mood = 'side'; rL = rCam; }
      if (face === 'smile' && mT > 0.05 && id[0] === 'm') face = 'neutral';
      mYaw = smv(mYaw, mL[0], k); mPitch = smv(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.9, face, look: [mYaw, mPitch], lean, type });
      const tgt = POSE[pose]; ['L', 'R'].forEach(s => { for (let i = 0; i < 4; i++) curPose[s][i] = smv(curPose[s][i], tgt[s][i], k); });
      const [aL, aR] = M.arms; const bx = (pose === 'both' || pose === 'head') ? 0.14 * Math.sin(t * 12) : 0, cnt = pose === 'count' ? 0.18 * Math.sin(t * 7) : 0;
      const ty = type * 0.08 * Math.max(0, Math.sin(t * 15));
      aL.sh.rotation.set(curPose.L[0] + bx, curPose.L[1], curPose.L[2]); aL.el.rotation.x = curPose.L[3] + ty;
      aR.sh.rotation.set(curPose.R[0] + bx, curPose.R[1], curPose.R[2] + cnt); aR.el.rotation.x = curPose.R[3] + cnt * 0.5 + ty * 0.7;
      phone.visible = pose === 'hold' || (pose === 'both' && t >= C.PAY && t < B('m10') - 0.1);
      // seat: plastic chair, then the box; the box caves in
      const onBox = t >= C.BOX; chG.visible = !onBox; boxG.visible = onBox;
      const ck = onBox ? crunchK(t) : 0, wob = ck > 0 ? Math.sin(pr(t, C.CR, C.CR + 0.5) * Math.PI * 3) * (1 - pr(t, C.CR, C.CR + 0.5)) * 0.05 : 0;
      boxG.scale.set(1 + ck * 0.12, Math.max(0.36, 1 - ck * 0.64) + wob, 1 + ck * 0.1); flap.rotation.z = ck * 0.3;
      M.g.position.y = bounce * 0.022 * Math.abs(Math.sin(t * 9)) - ck * 0.29; M.g.rotation.z = ck * 0.06;
      rYaw = smv(rYaw, rL[0], k); rPitch = smv(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood, bob: bob * Math.abs(Math.sin(t * 7)) });
      if (!tentDone && t > PT[2] + 0.3) { drawTent(true); tentDone = true; } else if (tentDone && t < PT[2] + 0.3) { drawTent(false); tentDone = false; }
      // world life
      fairy.forEach((b, i) => { const on = 0.6 + 0.4 * Math.sin(t * 2.2 + i * 1.3); b.material.color.setRGB(1.2 * on, 0.8 * on, 0.42 * on); });
      for (let i = 0; i < cPos.count; i++) { const x0 = cBase[i * 3], y0 = cBase[i * 3 + 1]; cPos.array[i * 3 + 2] = Math.sin(x0 * 18 + t * 0.9) * 0.025 + Math.sin(y0 * 3 + t * 1.3) * 0.012 * (0.5 - y0 / WH); } cPos.needsUpdate = true;
      panelL.intensity = 0.6 * panelAt(t);
      motes(t); puff(t);
    };

    // ================= CAMERA =================
    const Pp = (pos, look) => ({ pos, look });
    const MH = [MX, 1.22, MZ], RH = [RX, 1.23, RZ];
    // panel up: characters framed in the lower half
    const up = {
      two: [Pp([0.13, 1.56, 5.0], [0.12, 1.92, -0.6]), Pp([0.12, 1.55, 4.75], [0.12, 1.91, -0.6])],
      mad: [Pp([MX + 0.5, 1.5, MZ + 4.3], [MX + 0.24, 1.88, MZ]), Pp([MX + 0.48, 1.49, MZ + 4.05], [MX + 0.24, 1.87, MZ])],
      rob: [Pp([RX - 0.5, 1.5, RZ + 4.1], [RX - 0.34, 1.88, RZ]), Pp([RX - 0.48, 1.49, RZ + 3.85], [RX - 0.34, 1.87, RZ])],
    };
    // full-frame cinematic shots
    const fs = {
      open: [Pp([0.55, 1.62, 4.2], [0.0, 1.2, -0.8]), Pp([0.25, 1.38, 3.0], [-0.05, 1.12, -0.6])],
      two: [Pp([0.12, 1.32, 3.2], [0.08, 1.1, -0.5]), Pp([0.1, 1.31, 2.95], [0.08, 1.1, -0.5])],
      mad: [Pp([MX + 0.62, 1.32, MZ + 2.25], [MX - 0.02, 1.17, MZ]), Pp([MX + 0.58, 1.31, MZ + 2.02], [MX - 0.02, 1.17, MZ])],
      madcu: [Pp([MX + 0.48, 1.3, MZ + 3.0], [MX + 0.04, 1.16, MZ]), Pp([MX + 0.46, 1.3, MZ + 2.8], [MX + 0.04, 1.16, MZ])],
      rob: [Pp([RX - 0.75, 1.3, RZ + 3.0], [RX - 0.15, 1.15, RZ]), Pp([RX - 0.72, 1.3, RZ + 2.75], [RX - 0.15, 1.15, RZ])],
      robcu: [Pp([RX - 0.42, 1.3, RZ + 2.4], [RX - 0.05, 1.2, RZ]), Pp([RX - 0.4, 1.3, RZ + 2.15], [RX - 0.05, 1.2, RZ])],
      box: [Pp([0.9, 1.05, 3.4], [-0.1, 0.8, -0.5]), Pp([0.7, 1.0, 2.9], [-0.15, 0.82, -0.5])],
      madbox: [Pp([MX + 0.95, 1.1, MZ + 3.4], [MX + 0.05, 0.82, MZ]), Pp([MX + 0.9, 1.09, MZ + 3.15], [MX + 0.05, 0.82, MZ])],
      crash: [Pp([MX + 0.85, 0.95, MZ + 3.6], [MX + 0.05, 0.55, MZ]), Pp([MX + 0.8, 0.94, MZ + 3.3], [MX + 0.05, 0.55, MZ])],
      end: [Pp([MX + 0.8, 0.94, MZ + 3.3], [MX + 0.05, 0.55, MZ]), Pp([0.5, 1.3, 4.6], [0.0, 0.8, -0.5])],
    };
    const SHOT = { m1: ['fs', 'open', 'm'], c1: ['fs', 'rob', 'r'], m2: ['up', 'mad', 'm'], c2: ['fs', 'robcu', 'r'], c3: ['up', 'two', 'two'], m3: ['up', 'mad', 'm'], c4: ['up', 'rob', 'r'], c5: ['up', 'two', 'two'],
      m4: ['fs', 'madcu', 'm'], c6: ['fs', 'robcu', 'r'], c7: ['up', 'two', 'two'], m5: ['up', 'mad', 'm'], c8: ['up', 'rob', 'r'], m6: ['fs', 'madcu', 'm'], c9: ['fs', 'robcu', 'r'], m7: ['fs', 'mad', 'm'], c10: ['fs', 'rob', 'r'],
      m8: ['up', 'mad', 'm'], c11: ['up', 'rob', 'r'], m9: ['up', 'mad', 'm'], c12: ['fs', 'robcu', 'r'], m10: ['up', 'mad', 'm'], m11: ['fs', 'madbox', 'm'], c13: ['fs', 'rob', 'r'], m12: ['fs', 'madbox', 'm'], c14: ['fs', 'robcu', 'r'], m13: ['fs', 'crash', 'm'] };
    const ids = window.SCENE.lines.map(l => l.id);
    const plan = []; ids.forEach((id, i) => { const a = i ? B(id) - 0.12 : 0, b = i < ids.length - 1 ? B(ids[i + 1]) - 0.12 : D + 5; let [set, s, f] = SHOT[id];
      const ins = (x, sh2, f2) => { const p = plan[plan.length - 1]; if (p) p[1] = Math.min(p[1], x); plan.push([x, a, sh2, f2]); };
      if (id === 'm10') ins(C.PAY, up.two, 'two');
      if (id === 'm11') ins(C.BOX, fs.box, 'm');
      if (id === 'c14') ins(C.CR - 0.02, fs.crash, 'm');
      if (id === 'm13') { plan.push([a, E('m13') + 0.2, fs.crash, 'm']); plan.push([E('m13') + 0.2, D + 5, fs.end, 'm']); return; }
      plan.push([a, b, (set === 'up' ? up : fs)[s], f]); });
    const shots = []; plan.forEach(([a, b, s, f]) => { const p = shots[shots.length - 1]; if (p && p.s === s && Math.abs(p.t[1] - a) < 0.01) { p.t[1] = b; } else shots.push({ t: [a, b], s, f, from: s[0], to: s[1], ease: sm, shake: null }); });
    shots.forEach(x => { x.shake = t => shakeAt(t); });
    const PUNCH = ['m5', 'm8', 'm10', 'c9', 'c6'], PUSH = ['c2', 'm4', 'm6', 'm9', 'c12', 'm12', 'c14'];
    const fovAt = t => { let f = 38; PUNCH.forEach(id => { const a = B(id) - 0.05, b = E(id) + 0.25; if (t > a && t < b) f = Math.min(f, lerp(38, 32.5, eo(pr(t, a, a + 0.16)))); });
      PUSH.forEach(id => { const a = B(id) - 0.1, b = E(id) + 0.35; if (t > a && t < b) f = Math.min(f, lerp(38, 33, sm(pr(t, a, b)))); });
      if (t > C.CR - 0.02 && t < B('c14') - 0.12) f = Math.min(f, lerp(30, 38, eo(pr(t, C.CR, C.CR + 0.8))));     // crunch: punch in, ease out
      if (t > E('m13') + 0.2) f = lerp(38, 42, sm(pr(t, E('m13') + 0.2, D)));
      return f; };
    const shakeAt = t => { let s = 0; ['m10', 'm5'].forEach(id => { s = Math.max(s, 0.01 * K.pulse(t, B(id), 0.5)); }); s = Math.max(s, 0.028 * K.pulse(t, C.CR, 0.6)); return s; };
    const shotAt = t => { let s = shots[shots.length - 1]; for (const x of shots) if (t >= x.t[0] && t < x.t[1]) { s = x; break; } return s; };
    const capZones = PON.map(([a, b]) => [a + 0.15, b, 1040]);

    // ================= UPDATE =================
    const tmp = new THREE.Vector3();
    const update = t => {
      K.shoot(t, shots);
      K.cam.fov = fovAt(t); K.cam.updateProjectionMatrix(); K.cam.updateMatrixWorld(true);
      acting(t); drawWin(t);
      const f = shotAt(t).f, tgt = f === 'r' ? RH : f === 'm' ? [MH[0], MH[1] + M.g.position.y, MH[2]] : [(MX + RX) / 2, 1.22, (MZ + RZ) / 2];
      postU.focus.value = K.cam.position.distanceTo(tmp.set(...tgt)); postU.aper.value = f === 'two' ? 0.7 : 1.0;
      postU.time.value = t;
      postU.flash.value = Math.max(0.22 * Math.max(0, 1 - Math.abs(t - B('m10')) / 0.09), 0.18 * Math.max(0, 1 - Math.abs(t - C.CR) / 0.07));
      postU.dark.value = 1 - sm(pr(t, 0, 0.5));
      hudDraw(t);
    };

    // ================= SOUND =================
    const sfx = [['rain', 0, 0.16]];
    PON.forEach(([a, b]) => sfx.push(['whoosh', a - 0.05, 0.3], ['whoosh', b, 0.16]));
    SCR.forEach(([n, a], i) => { if (i > 0 && panelOn(a - 0.05)) sfx.push(['whoosh', a, 0.2]); });
    sfx.push(['pop', B('m2') + 0.05, 0.3], ['buzz', at('m2', 0.55), 0.25], ['boing', B('c2') + 0.05, 0.25]);
    for (let i = 0; i < 14; i++) sfx.push(['type', at('c3', 0.42) + i * ((at('c3', 0.92) - at('c3', 0.42)) / 14), 0.5]);
    for (let i = 0; i < 12; i++) sfx.push(['pop', at('c3', 0.95) + i * 0.05, 0.12]);
    for (let i = 0; i < 8; i++) sfx.push(['pop', at('c4', 0.05) + i * 0.07, 0.15]);
    NOSITE.forEach((s, i) => sfx.push(['zap', at('c5', 0.1 + i * 0.11), 0.16])); sfx.push(['thud', at('c5', 0.72), 0.5], ['bass', at('c5', 0.72), 0.3]);
    sfx.push(['tick', B('m4') - 0.1, 0.3], ['ding', B('c6') + 0.1, 0.3]);
    for (let i = 0; i < 7; i++) sfx.push(['pop', at('c7', 0.05) + i * (at('c7', 0.92) - at('c7', 0.05)) / 7, 0.18]); sfx.push(['chime', at('c7', 0.92), 0.3]);
    sfx.push(['boing', B('m5'), 0.3], ['pop', at('c8', 0.02), 0.3], ['kaching', at('c8', 0.42), 0.3], ['thud', at('c8', 0.8), 0.6], ['bass', at('c8', 0.8), 0.3]);
    for (let i = 0; i < 3; i++) sfx.push(['tick', at('m6', 0.3 + i * 0.22), 0.4]); sfx.push(['ding', B('c9') + 0.05, 0.3], ['boing', B('m7'), 0.25], ['zap', B('c10') + 0.1, 0.2]);
    sfx.push(['ding', B('m8') - 0.08, 0.3], ['ding', at('m8', 0.5), 0.35]);
    for (let i = 0; i < 12; i++) sfx.push(['type', at('c11', 0.5) + i * ((E('c11') - at('c11', 0.5)) / 12), 0.5]); for (let i = 0; i < 3; i++) sfx.push(['type', at('m9', 0.3) + i * 0.12, 0.5]);
    sfx.push(['thud', B('c12') + 0.05, 0.4]);
    PT.forEach(a => sfx.push(['kaching', a, 0.35], ['pop', a, 0.2])); sfx.push(['riser', C.PAY + 0.3, 0.2], ['bass', B('m10') - 0.05, 0.45], ['chime', B('m10'), 0.3]);
    sfx.push(['whoosh', C.BOX - 0.05, 0.3], ['chime', C.BOX + 0.15, 0.2]);
    sfx.push(['crunch', C.CR, 0.9], ['thud', C.CR + 0.02, 0.9], ['bass', C.CR + 0.02, 0.6], ['boing', C.CR + 0.3, 0.2]);
    sfx.push(['tick', B('m13') - 0.15, 0.3]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fraunces', capMarginV: 470, capSize: 62, capKey: '&H002E7AFF&', capOutline: 2, capShadow: 3, capZones };
  },
};
