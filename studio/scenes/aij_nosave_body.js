/* @maddiee.makess reel 22 — "Nothing is saved" — PaisaMap promo. NEW SET (Maddyy asked for a change): Maddie's bedroom at month-end, night —
   fairy lights, window with the city at night, laundry pile, empty wallet, books on the nightstand under the headphones hover-bot.
   Maddie sits on the bed edge holding his phone (mint glow on his face). Phone screens use PaisaMap's Fresh Mint look.
   Real stats from Maddyy's own PhonePe statement (Jun–Nov 2026), payee names never shown. Comment PAISA -> paisamap.online. Full 9:16, no handle. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x0b0d1f, fog: [7, 26], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
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
    const rng = K.rng(22);

    // ================= TIMELINE =================
    const C = { HOOK: 0, OPEN: B('open') - 0.12, SAVE: B('save') - 0.1, NOTH: B('nothing') - 0.1, NEVER: B('never') - 0.1, NOUP: B('noup') - 0.1, CLOSE: B('close') - 0.1, GONE: B('gone') - 0.1,
      LAKH: B('lakh') - 0.12, EVERY: B('every') - 0.1, JULY: B('july') - 0.1, PEOPLE: B('people') - 0.1, ATM: B('atm') - 0.1, LIMIT: B('limit') - 0.12, FREEQ: B('freeq') - 0.1, FREE: B('free') - 0.1,
      ASK: B('ask') - 0.1, RATE: B('rate') - 0.1, CTA: B('cta') - 0.12 };

    // ================= BEDROOM (night, month-end) =================
    const WZ = -2.5;
    const plank = K.canvasTex(256, 256, (x, w, h) => { for (let i = 0; i < 8; i++) { const v = 52 + ((i * 37) % 23); x.fillStyle = `rgb(${v + 30},${v + 12},${v - 6})`; x.fillRect(0, i * 32, w, 32); x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, i * 32, w, 2); x.fillRect(((i * 97) % 200) + 20, i * 32, 2, 32); } });
    plank.wrapS = plank.wrapT = THREE.RepeatWrapping; plank.repeat.set(4, 4);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshStandardMaterial({ map: plank, roughness: 0.8 })); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, -1); floor.receiveShadow = true; S.add(floor);
    const wallTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#3a3f66'; x.fillRect(0, 0, w, h); for (let i = 0; i < 400; i++) { x.fillStyle = `rgba(255,255,255,${0.015 + rng() * 0.02})`; x.fillRect(rng() * w, rng() * h, 2, 2); } });
    const wallM = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.95 });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), wallM); back.position.set(0, 2, WZ); back.receiveShadow = true; S.add(back);
    const left = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), wallM); left.rotation.y = Math.PI / 2; left.position.set(-2.4, 2, -0.5); left.receiveShadow = true; S.add(left);
    const right = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), wallM); right.rotation.y = -Math.PI / 2; right.position.set(2.4, 2, -0.5); right.receiveShadow = true; S.add(right);
    rbox(8, 0.1, 0.03, SM(0x2a2d48, 0.8), 0, 0.05, WZ + 0.015, 0.01);   // skirting
    // rug
    const rugTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#c9a26b'; x.beginPath(); x.arc(128, 128, 126, 0, 7); x.fill(); x.strokeStyle = '#8f6a3e'; x.lineWidth = 8; for (let r = 30; r < 126; r += 26) { x.beginPath(); x.arc(128, 128, r, 0, 7); x.stroke(); } });
    const rug = new THREE.Mesh(new THREE.CircleGeometry(0.95, 48), new THREE.MeshStandardMaterial({ map: rugTex, roughness: 1, transparent: true })); rug.rotation.x = -Math.PI / 2; rug.position.set(0.1, 0.004, -0.35); rug.receiveShadow = true; S.add(rug);

    // bed: long side faces the camera; Maddie sits on the front edge
    const bedM = SM(0x6b4a33, 0.6), sheetM = SM(0xe9e4f2, 0.85), blanketM = SM(0x4f63c9, 0.9);
    rbox(2.5, 0.3, 1.6, bedM, -0.45, 0.17, -1.68, 0.03);
    rbox(2.42, 0.2, 1.52, sheetM, -0.45, 0.42, -1.68, 0.06);
    rbox(0.1, 1.05, 1.62, bedM, -1.72, 0.55, -1.68, 0.03);                // headboard (left end)
    const blanket = rbox(1.5, 0.12, 1.5, blanketM, -0.25, 0.55, -1.86, 0.06); blanket.rotation.z = 0.02;
    rbox(1.4, 0.08, 0.2, blanketM, -0.25, 0.56, -1.05, 0.04).rotation.x = 0.4;   // folded edge
    [[-1.4, -1.35], [-1.4, -2.0]].forEach(([x, z]) => { const p = rbox(0.42, 0.16, 0.56, SM(0xf3eee6, 0.9), x, 0.6, z, 0.07); p.rotation.y = 0.08; });
    const wallet = new THREE.Group(); wallet.position.set(0.32, 0.535, -1.12); wallet.rotation.y = -0.4; S.add(wallet);    // open, empty wallet
    rbox(0.16, 0.012, 0.1, SM(0x5a3520, 0.55), -0.082, 0, 0, 0.004, wallet); const wr = rbox(0.16, 0.012, 0.1, SM(0x5a3520, 0.55), 0.082, 0.004, 0, 0.004, wallet); wr.rotation.z = -0.25;
    rbox(0.14, 0.004, 0.08, SM(0x3d2416, 0.6), -0.082, 0.008, 0, 0.002, wallet);
    // laundry pile on the bed (behind Maddie's right)
    const lcols = [0xd94f5c, 0x3ba57a, 0xf0c04a, 0x6b7bd6, 0xeeeeee, 0x2b2f3a, 0xe58bb0, 0x48b4d6];
    for (let i = 0; i < 16; i++) { const a = rng() * 6.28, r = rng() * 0.28; const c = sph(0.1 + rng() * 0.06, SM(lcols[i % lcols.length], 0.95), 0.62 + Math.cos(a) * r, 0.6 + rng() * 0.12 + (0.28 - r) * 0.35, -1.85 + Math.sin(a) * r * 0.8); c.scale.set(1.4, 0.55, 1.1); c.rotation.set(rng(), rng() * 3, rng()); }
    // nightstand + books under the hover-bot
    const DY = 0.74;
    rbox(0.5, 0.6, 0.42, SM(0x7a5638, 0.6), 0.42, 0.3, -0.48, 0.02);
    rbox(0.42, 0.012, 0.012, SM(0xd8c3a0, 0.4), 0.42, 0.42, -0.268, 0.004);
    [[0xc94f4f, 0.0], [0x3f7fbf, 0.045], [0xe0b040, 0.09]].forEach(([c, y], i) => { const b = rbox(0.3 - i * 0.03, 0.045, 0.22, SM(c, 0.7), 0.42 + i * 0.01, 0.6 + 0.0225 + y, -0.5, 0.008); b.rotation.y = i * 0.12 - 0.1; });
    const mug = cyl(0.04, 0.036, 0.09, SM(0xf2ece0, 0.5), 0.6, 0.645, -0.36, 20);
    // floor lamp (back right) + its warm pool
    cyl(0.16, 0.18, 0.03, SM(0x22232a, 0.5, { metalness: 0.4 }), 1.65, 0.015, -2.05, 24); cyl(0.015, 0.015, 1.5, SM(0x22232a, 0.5, { metalness: 0.4 }), 1.65, 0.77, -2.05, 10);
    const shade = cyl(0.17, 0.24, 0.3, new THREE.MeshStandardMaterial({ color: 0xffe0b0, emissive: 0xffb060, emissiveIntensity: 0.9, roughness: 0.8, side: THREE.DoubleSide }), 1.65, 1.6, -2.05, 28, S); shade.geometry = new THREE.CylinderGeometry(0.17, 0.24, 0.3, 28, 1, true);
    // window with the city at night (back wall, right)
    const cityTex = K.canvasTex(512, 384, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0a0f2e'); g.addColorStop(0.7, '#1d2a6b'); g.addColorStop(1, '#3a3f8f'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.fillStyle = '#fff6d8'; x.beginPath(); x.arc(390, 80, 34, 0, 7); x.fill(); x.fillStyle = '#0a0f2e'; x.beginPath(); x.arc(405, 70, 30, 0, 7); x.fill();
      for (let i = 0; i < 60; i++) { x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(rng() * w, rng() * h * 0.5, 1.5, 1.5); }
      for (let i = 0; i < 14; i++) { const bw = 26 + rng() * 40, bh = 80 + rng() * 170, bx = i * 37 - 10; x.fillStyle = '#0c1030'; x.fillRect(bx, h - bh, bw, bh);
        for (let yy = h - bh + 8; yy < h - 6; yy += 13) for (let xx = bx + 5; xx < bx + bw - 5; xx += 9) if (rng() < 0.38) { x.fillStyle = rng() < 0.7 ? '#ffd98a' : '#8fe0ff'; x.fillRect(xx, yy, 4, 6); } } });
    const win = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.98), new THREE.MeshBasicMaterial({ map: cityTex, toneMapped: false })); win.position.set(1.05, 1.62, WZ + 0.01); S.add(win);
    const frM = SM(0xe8e2d6, 0.6);
    rbox(1.42, 0.06, 0.06, frM, 1.05, 2.13, WZ + 0.03, 0.01); rbox(1.42, 0.08, 0.1, frM, 1.05, 1.11, WZ + 0.05, 0.01); rbox(0.06, 1.04, 0.06, frM, 0.37, 1.62, WZ + 0.03, 0.01); rbox(0.06, 1.04, 0.06, frM, 1.73, 1.62, WZ + 0.03, 0.01); rbox(0.04, 1.0, 0.04, frM, 1.05, 1.62, WZ + 0.03, 0.01); rbox(1.3, 0.04, 0.04, frM, 1.05, 1.62, WZ + 0.03, 0.01);
    [0.25, 1.85].forEach((x, i) => { const cu = rbox(0.24, 1.3, 0.05, SM(0x8a3f5c, 0.95), x, 1.55, WZ + 0.09, 0.03); cu.rotation.y = i ? -0.05 : 0.05; });
    // poster + polaroids on the back wall (left)
    const posterTex = K.canvasTex(256, 360, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ff9a5a'); g.addColorStop(1, '#ff5f8f'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.fillStyle = '#ffe7a8'; x.beginPath(); x.arc(128, 150, 54, 0, 7); x.fill(); x.fillStyle = '#3a1f5c'; x.beginPath(); x.moveTo(0, 300); x.lineTo(80, 200); x.lineTo(140, 260); x.lineTo(200, 180); x.lineTo(256, 250); x.lineTo(256, 360); x.lineTo(0, 360); x.fill();
      x.fillStyle = '#fff'; x.font = '900 34px sans-serif'; x.textAlign = 'center'; x.fillText('GOA 2027?', 128, 60); });
    const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), new THREE.MeshStandardMaterial({ map: posterTex, roughness: 0.8 })); poster.position.set(-0.75, 1.55, WZ + 0.01); S.add(poster);
    // fairy lights: three drooping strands with polaroids clipped on
    const bulbs = [], bulbM = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffc879).multiplyScalar(2.2), toneMapped: false });
    const strand = (x0, x1, y, sag) => { const pts = []; for (let i = 0; i <= 24; i++) { const u = i / 24; pts.push(V(lerp(x0, x1, u), y - Math.sin(u * Math.PI) * sag, WZ + 0.04)); }
      S.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.004, 4), SM(0x2b2b2b, 0.6)));
      for (let i = 1; i < 24; i += 2) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), bulbM.clone()); b.position.copy(pts[i]); b.position.y -= 0.02; S.add(b); bulbs.push({ b, ph: bulbs.length * 1.3 }); } };
    strand(-2.0, -0.3, 2.35, 0.22); strand(-0.3, 0.3, 2.3, 0.12); strand(-2.0, 0.25, 2.0, 0.28);
    const pol = (x, y, rz, col) => { const tx = K.canvasTex(64, 76, (c, w, h) => { c.fillStyle = '#f6f2ea'; c.fillRect(0, 0, w, h); c.fillStyle = col; c.fillRect(6, 6, 52, 50); c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.arc(32, 30, 12, 0, 7); c.fill(); });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.155), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.8 })); m.position.set(x, y, WZ + 0.03); m.rotation.z = rz; S.add(m); };
    pol(-1.65, 2.08, 0.12, '#6fb3d9'); pol(-1.2, 2.0, -0.08, '#e3a05c'); pol(-1.62, 1.75, -0.1, '#7fcf8f'); pol(-1.15, 1.7, 0.1, '#d97aa8'); pol(-0.05, 2.12, 0.05, '#c9b25a');
    const fairyL1 = new THREE.PointLight(0xffb870, 0.9, 2.6, 1.6); fairyL1.position.set(-1.2, 2.0, WZ + 0.4); S.add(fairyL1);
    const fairyL2 = new THREE.PointLight(0xffb870, 0.6, 2.2, 1.6); fairyL2.position.set(0.0, 2.1, WZ + 0.4); S.add(fairyL2);
    // calendar on the right wall area: "30" circled
    const calTex = K.canvasTex(160, 200, (x, w, h) => { x.fillStyle = '#fbfaf6'; x.fillRect(0, 0, w, h); x.fillStyle = '#e5484d'; x.fillRect(0, 0, w, 44); x.fillStyle = '#fff'; x.font = '800 26px sans-serif'; x.textAlign = 'center'; x.fillText('NOV', 80, 31);
      x.fillStyle = '#333'; x.font = '600 15px sans-serif'; for (let i = 0; i < 30; i++) x.fillText(String(i + 1), 20 + (i % 6) * 24, 70 + Math.floor(i / 6) * 26); x.strokeStyle = '#e5484d'; x.lineWidth = 3; x.beginPath(); x.arc(20 + 5 * 24, 70 + 4 * 26 - 5, 13, 0, 7); x.stroke(); });
    const cal = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.32), new THREE.MeshStandardMaterial({ map: calTex, roughness: 0.8 })); cal.position.set(-0.05, 1.55, WZ + 0.01); S.add(cal);

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: 0.56, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(-0.2, 0, -0.95); S.add(M.g);
    M.head.traverse(o => { if (o.geometry && o.geometry.type === 'CircleGeometry') o.visible = false; });     // no blush dots
    // his phone (right hand), screen glowing PaisaMap mint
    const ph = new THREE.Group(); M.arms[1].hand.add(ph); ph.position.set(-0.05, 0.035, 0.03); ph.rotation.set(-1.05, 0.25, 0);
    rbox(0.085, 0.165, 0.012, SM(0x1b1d24, 0.3, { metalness: 0.3 }), 0, 0.06, 0, 0.012, ph);
    const phScr = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.152), new THREE.MeshBasicMaterial({ color: 0xbfe3d0, toneMapped: false })); phScr.position.set(0, 0.06, -0.0065); phScr.rotation.y = Math.PI; ph.add(phScr);
    const phL = new THREE.PointLight(0x9ff0cc, 0.0, 0.9, 1.6); S.add(phL);
    const R = (() => {   // the hover-bot with headphones (same design as every reel), floating above the books on the nightstand; no hands
      const g = new THREE.Group(); g.position.set(0.36, DY, -0.45); g.rotation.y = -0.55; S.add(g);
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

    // ================= LIGHT (night: moonlight + fairy lights + lamp + phone glow) =================
    const hemi = new THREE.HemisphereLight(0x7d86d8, 0x1a1020, 0.6); S.add(hemi);
    const key = new THREE.DirectionalLight(0xffe2c8, 1.05); key.position.set(1.0, 2.6, 2.2); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xfff0e0, 0.55); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const moon = new THREE.DirectionalLight(0x8fa8ff, 1.1); moon.position.set(1.4, 2.2, -3.5); moon.target.position.set(-0.2, 1.0, -0.9); S.add(moon); S.add(moon.target);
    const lampL = new THREE.PointLight(0xffb060, 1.6, 3.2, 1.6); lampL.position.set(1.65, 1.55, -2.0); S.add(lampL);
    const rimP = new THREE.DirectionalLight(0xc25aff, 0.6); rimP.position.set(-2.2, 1.6, -2.4); S.add(rimP);

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1, phK = 0; const sm = (a, b, k) => a + (b - a) * k;
    const phLook = [0.05, 0.42], toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const hp = new THREE.Vector3();
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      let mL = toR, face = 'neutral', lean = 0.15, up = 0, phone = 0;
      if (t < C.OPEN) { mL = toCam; face = 'worried'; lean = 0.3; }
      else if (t < C.SAVE) { mL = toR; face = 'neutral'; }
      else if (t < C.NOTH) { mL = t < B('save') + 0.9 ? phLook : toR; face = 'worried'; lean = 0.3; phone = 1; }
      else if (t < B('serious') - 0.1) { mL = toR; face = 'shock'; lean = -0.05; }
      else if (t < C.NEVER) { mL = toR; face = 'shock'; lean = -0.1; }
      else if (t < C.CLOSE) { mL = toR; face = t < B('reads') ? 'neutral' : 'smile'; lean = 0.1; }
      else if (t < C.GONE) { mL = phLook; face = 'neutral'; phone = 1; }
      else if (t < C.LAKH) { mL = toR; face = 'smile'; }
      else if (t < C.EVERY) { mL = t < B('lakh') + 0.7 ? phLook : toCam; face = t < B('lakh') + 0.7 ? 'neutral' : 'shock'; lean = t < B('lakh') + 0.7 ? 0.3 : -0.12; phone = 1; up = 0; }
      else if (t < C.PEOPLE) { mL = phLook; face = 'neutral'; lean = 0.3; phone = 1; }
      else if (t < C.ATM) { mL = t < B('people') + 0.8 ? phLook : toR; face = 'shock'; lean = 0.1; phone = 1; }
      else if (t < C.LIMIT) { mL = toCam; face = 'worried'; lean = 0.42; phone = 0.4; }
      else if (t < C.FREEQ) { mL = toR; face = 'neutral'; lean = 0.15; phone = 0.4; }
      else if (t < C.FREE) { mL = toR; face = 'smile'; lean = 0.05; }
      else if (t < C.ASK) { mL = toR; face = 'smile'; lean = 0.05; }
      else if (t < C.RATE) { mL = toR; face = 'neutral'; lean = 0.1; }
      else if (t < C.CTA) { mL = phLook; face = 'smile'; lean = 0.3; phone = 1; }
      else { mL = toCam; face = 'smile'; lean = 0; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k); phK = sm(phK, phone, k * 0.8);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type: 0, lean });
      const [aL, aR] = M.arms;     // hold the phone: right hand lifts it to the chest, left hand supports
      aR.sh.rotation.set(-0.3 - phK * 0.15, -0.15 - phK * 0.15, 0.05); aR.el.rotation.set(-0.15 - phK * 0.35, 0, 0);
      aL.sh.rotation.set(-0.3 - phK * 0.12, 0.15 + phK * 0.08, -0.05); aL.el.rotation.set(-0.1 - phK * 0.3, 0, 0);
      M.arms[1].hand.getWorldPosition(hp); phL.position.set(hp.x - 0.02, hp.y + 0.12, hp.z + 0.05); phL.intensity = 0.03 + phK * 0.07;
      phScr.material.color.setHex(phK > 0.3 ? 0x5f9a80 : 0x45584f);
      let rL = [-0.15, 0.05];
      const explain = (t >= C.NEVER && t < C.CLOSE) || (t >= C.EVERY && t < C.ATM) || (t >= C.LIMIT && t < C.FREEQ) || (t >= C.FREE && t < C.ASK) || t >= C.CTA;
      if (explain) rL = [0.42, 0.02];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      const mood = (t >= C.NOTH && t < C.CLOSE) || (t >= C.GONE && t < C.LAKH) || (t >= C.FREE && t < C.ASK) || t >= C.RATE ? 'smile' : (t >= C.ATM && t < C.LIMIT) ? 'flat' : 'calm';
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.y += 0.2 * Math.sin((t - B('nothing')) * 16) * K.pulse(t, B('nothing') - 0.05, 0.6);   // small "no" shake on "nothing is saved"
      bulbs.forEach(o => { const f = 0.85 + 0.15 * Math.sin(t * 2.2 + o.ph); o.b.material.color.setHex(0xffc879).multiplyScalar(2.2 * f); });
    };

    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.36, 1.1, -0.4];
    const sh = {
      est: [P([0.25, 1.55, 2.6], [-0.15, 1.3, -1.2], 42), P([-0.1, 1.47, 1.35], MHL, 33)],
      robo: [P([0.1, 1.22, 1.35], RHL, 30), P([0.12, 1.21, 1.18], RHL, 30)],
      wait: [P([-0.18, 1.43, 1.05], [-0.2, 1.4, -0.94], 30), P([-0.18, 1.42, 0.85], [-0.2, 1.4, -0.94], 30)],
      two: [P([0.12, 1.5, 1.75], [0.05, 1.22, -0.6], 38), P([0.05, 1.5, 1.6], [0.05, 1.22, -0.6], 38)],
      mad: [P([0.12, 1.44, 1.32], MHL, 32), P([0.1, 1.43, 1.15], MHL, 32)],
      side: [P([-1.35, 1.52, 1.3], [-0.25, 1.22, -0.8], 34), P([-1.25, 1.5, 1.15], [-0.25, 1.22, -0.8], 34)],
      robL: [P([-0.36, 1.22, 1.3], RHL, 30), P([-0.32, 1.21, 1.15], RHL, 30)],
      pair: [P([0.35, 1.38, 1.3], [0.1, 1.2, -0.6], 36), P([0.3, 1.36, 1.16], [0.1, 1.2, -0.6], 36)],
      cta: [P([0.06, 1.5, 2.3], [0.0, 1.28, -0.9], 42), P([0.06, 1.48, 2.05], [0.0, 1.28, -0.9], 42)],
    };
    const plan = [
      [C.HOOK, C.OPEN, sh.est], [C.OPEN, C.SAVE, sh.robo], [C.SAVE, C.NOTH, sh.wait], [C.NOTH, B('serious') - 0.1, sh.robL], [B('serious') - 0.1, C.NEVER, sh.wait],
      [C.NEVER, C.CLOSE, sh.two], [C.CLOSE, C.GONE, sh.mad], [C.GONE, C.LAKH, sh.robo], [C.LAKH, C.EVERY, sh.wait], [C.EVERY, C.PEOPLE, sh.side], [C.PEOPLE, C.ATM, sh.robL],
      [C.ATM, C.LIMIT, sh.mad], [C.LIMIT, C.FREEQ, sh.robo], [C.FREEQ, C.FREE, sh.mad], [C.FREE, C.ASK, sh.robL], [C.ASK, C.RATE, sh.mad], [C.RATE, C.CTA, sh.pair], [C.CTA, D + 5, sh.cta],
    ];
    const SHAKE = [C.LAKH, B('serious') - 0.1];
    const smooth = k => k * k * (3 - 2 * k);
    const lift = (p, dy) => ({ pos: [p.pos[0], p.pos[1] + dy, p.pos[2]], look: [p.look[0], p.look[1] + dy, p.look[2]], fov: p.fov });
    const DYS = new Map([[sh.mad, 0.085], [sh.wait, 0.075], [sh.robo, 0.035], [sh.robL, 0.035], [sh.two, 0.05], [sh.pair, 0.05], [sh.side, 0.05], [sh.est, 0.06], [sh.cta, 0.03]]);
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

    // ---------- the phone (PaisaMap, Fresh Mint) ----------
    const PSC = 0.84, PX = 290, PY = 250, PW = 500, PH = 760, BZ = 14, SX = PX + BZ, SY = PY + BZ, SW = PW - 2 * BZ, SHH = PH - 2 * BZ, CX = PX + PW / 2;
    const appBar = (t) => { pin(SX + 44, SY + 78, 0.95); ft('PaisaMap', SX + 66, SY + 80, 30, INKD, 700); txt('🔒', SX + SW - 40, SY + 80, 22, '#000', 400, 'center'); };
    const SCR = {
      home: (t, k) => { appBar(t);
        // mini route map
        h.strokeStyle = 'rgba(11,143,104,0.5)'; h.lineWidth = 5; h.setLineDash([2, 12]); h.lineCap = 'round'; h.beginPath(); h.moveTo(SX + 40, SY + 250); h.bezierCurveTo(SX + 120, SY + 150, SX + 200, SY + 260, SX + 250, SY + 210); h.bezierCurveTo(SX + 320, SY + 150, SX + 380, SY + 230, SX + 440, SY + 180); h.stroke(); h.setLineDash([]);
        [['💰', 40, 250], ['🍔', 160, 196], ['🛺', 250, 210], ['🛍️', 360, 186], ['🧾', 440, 180]].forEach(([e, x, y], i) => { rr(SX + x - 22, SY + y - 22, 44, 44, 22, WH); h.strokeStyle = GRN; h.lineWidth = 3; h.beginPath(); h.arc(SX + x, SY + y, 22, 0, 7); h.stroke(); txt(e, SX + x, SY + y + 2, 22, '#000', 400, 'center'); });
        const cx = SX + 40 + ((t * 0.25) % 1) * 400; h.fillStyle = GRN; h.beginPath(); h.arc(cx, SY + 120 + Math.sin(t * 2) * 6, 0, 0, 7); h.fill();
        ft('Where did your', SX + 34, SY + 330, 50, INKD, 700); ft('money go?', SX + 34, SY + 392, 50, INKD, 700);
        txt('Every month. Every payment.', SX + 34, SY + 446, 22, FOG, 500);
        const by = SY + 500; h.save(); h.shadowColor = 'rgba(11,143,104,0.5)'; h.shadowBlur = 24; rr(SX + 30, by, SW - 60, 100, 30, GRN); h.restore();
        rr(SX + 52, by + 25, 50, 50, 25, WH); ft('↑', SX + 77, by + 51, 30, GRN, 800, 'center'); ft('Upload your statement', SX + 120, by + 40, 27, WH, 700); txt('PDF, Excel or CSV', SX + 120, by + 72, 19, 'rgba(255,255,255,0.85)', 500);
        txt('🔒 read on this phone · nothing saved', SX + SW / 2, by + 150, 19, FOG, 600, 'center'); },
      spent: (t, k) => { appBar(t); txt('Jun – Nov 2026 · 81 payments', SX + 34, SY + 150, 21, FOG, 600);
        ft('You spent', SX + 34, SY + 210, 52, INKD, 700); const v = lerp(0, 136607, eo(pr(t, B('lakh') + 0.25, B('lakh') + 1.6))); ft('₹' + inr(v), SX + 34, SY + 285, 70, GRN, 700);
        [['per month', '₹27K'], ['small spends', '₹1.1K']].forEach(([a, b], i) => { const x = SX + 34 + i * 215; rr(x, SY + 350, 200, 100, 18, WH); txt(a, x + 18, SY + 380, 18, FOG, 600); ft(b, x + 18, SY + 420, 30, INKD, 700); });
        rr(SX + 34, SY + 480, SW - 68, 200, 22, WH); ft('📈 Every month', SX + 56, SY + 520, 26, INKD, 700); for (let i = 0; i < 6; i++) rr(SX + 60, SY + 560 + i * 18, (SW - 140) * [0.02, 1, 0.56, 0.33, 0.53, 0.26][i], 10, 5, MINT2); },
      months: (t, k) => { appBar(t); ft('📈 Every month', SX + 34, SY + 160, 34, INKD, 700);
        const MO = [['Jun', 1063], ['Jul', 50328], ['Aug', 28275], ['Sep', 16780], ['Oct', 26839], ['Nov', 13322]], jul = t >= B('july') + 0.4;
        MO.forEach(([m, v], i) => { const y = SY + 230 + i * 62, g = eo(pr(t, C.EVERY + 0.15 + i * 0.12, C.EVERY + 0.75 + i * 0.12)), hi = i === 1 && jul;
          ft(m, SX + 34, y, 24, hi ? GRN : FOG, 700); rr(SX + 100, y - 11, SW - 260, 22, 11, MINT2); rr(SX + 100, y - 11, (SW - 260) * (v / 50328) * g, 22, 11, hi ? GRN : BAR);
          ft('₹' + inr(v * g), SX + SW - 34, y, 22, hi ? GRN : INKD, 700, 'right'); if (hi) { const cp = pop(t, B('july') + 0.4, 0.4); scaleAt(SX + SW - 10, y - 30, cp, () => txt('👑', SX + SW - 10, y - 30, 40, '#000', 400, 'center')); } });
        if (jul) { const a = fin(t, B('july') + 0.7, 0.3); h.save(); h.globalAlpha = a; rr(SX + 34, SY + 615, SW - 68, 64, 18, 'rgba(245,165,36,0.16)'); ft('👑 Highest: Jul 2026 (₹50,328)', SX + SW / 2, SY + 648, 23, INKD, 700, 'center'); h.restore(); } },
      cats: (t, k) => { appBar(t); ft('📊 Where it all went', SX + 34, SY + 160, 34, INKD, 700);
        const CA = [['👥', 'Money to people', '₹1.2L', 0.89, GRN], ['🏪', 'Other shops', '₹7.1K', 0.05, BAR], ['🍽️', 'Eating out', '₹3.5K', 0.03, BAR], ['💡', 'Bills & recharges', '₹3K', 0.02, BAR]];
        CA.forEach(([e, n, v, p, col], i) => { const y = SY + 245 + i * 98, g = eo(pr(t, C.PEOPLE + 0.15 + i * 0.12, C.PEOPLE + 0.8 + i * 0.12)), big = i === 0;
          txt(e, SX + 50, y, 28, '#000', 400, 'center'); ft(n, SX + 80, y - 4, big ? 25 : 22, INKD, 700); ft(v, SX + SW - 34, y - 4, 24, big ? GRN : INKD, 700, 'right');
          rr(SX + 80, y + 22, SW - 120, 14, 7, MINT2); rr(SX + 80, y + 22, (SW - 120) * p * g, 14, 7, col); txt(Math.round(p * 100 * g) + '%', SX + SW - 34, y + 50, 18, FOG, 700, 'right'); });
        if (t >= B('people') + 0.9) stamp('89%', SX + SW - 70, SY + 640, 46, GRN, B('people') + 0.9, t, -0.1, 'rgba(240,247,243,0.9)'); },
      roast: (t, k) => { appBar(t); ft('🔥 Roast my spending', SX + 34, SY + 160, 32, INKD, 700);
        const a = fin(t, C.ATM + 0.1, 0.35); h.save(); h.globalAlpha = a; rr(SX + 34, SY + 210, SW - 68, 190, 20, 'rgba(229,72,77,0.10)'); rr(SX + 34, SY + 210, 7, 190, 3, RED);
        ['89% of your money went', 'to other people.', 'You\'re basically', 'everyone\'s ATM. 🏧'].forEach((l, i) => ft(l, SX + 60, SY + 250 + i * 44, 26, INKD, 700)); h.restore();
        const b = pop(t, B('atm') + 0.9, 0.45); if (b > 0) scaleAt(SX + SW / 2, SY + 560, b, () => { rr(SX + 34, SY + 440, SW - 68, 240, 26, 'rgba(11,143,104,0.12)'); txt('Your money personality', SX + SW / 2, SY + 480, 20, FOG, 600, 'center'); txt('👥', SX + SW / 2, SY + 555, 66, '#000', 400, 'center'); ft('The Generous One', SX + SW / 2, SY + 635, 36, GRN, 700, 'center'); }); },
      limit: (t, k) => { appBar(t); ft('📌 Nov 2026 so far', SX + 34, SY + 160, 34, INKD, 700);
        const g = eo(pr(t, B('limit') + 0.4, B('limit') + 1.8)), used = 13322 * g, pct = used / 15000;
        rr(SX + 34, SY + 220, SW - 68, 230, 22, WH); txt('Total this month', SX + 60, SY + 262, 22, FOG, 600); ft('₹' + inr(used) + ' / ₹15,000', SX + SW - 60, SY + 262, 24, INKD, 700, 'right');
        rr(SX + 60, SY + 300, SW - 120, 30, 15, MINT2); rr(SX + 60, SY + 300, (SW - 120) * pct, 30, 15, pct > 0.8 ? GOLD : GRN);
        ft('monthly limit', SX + 60, SY + 370, 22, GRN, 700); txt(Math.round(pct * 100) + '% used', SX + SW - 60, SY + 370, 22, FOG, 700, 'right');
        if (pct > 0.8) { const a = pop(t, B('limit') + 1.3, 0.4); scaleAt(SX + SW / 2, SY + 530, a, () => { rr(SX + 34, SY + 480, SW - 68, 100, 20, 'rgba(229,72,77,0.12)'); h.strokeStyle = 'rgba(229,72,77,0.5)'; h.lineWidth = 3; h.beginPath(); h.roundRect(SX + 34, SY + 480, SW - 68, 100, 20); h.stroke();
          ft('⚠️ 89% of your limit used', SX + SW / 2, SY + 515, 25, RED, 700, 'center'); txt('slow down for the rest of November', SX + SW / 2, SY + 552, 19, FOG, 600, 'center'); }); } },
      review: (t, k) => { appBar(t); ft('⭐ Rate PaisaMap', SX + 34, SY + 160, 34, INKD, 700); txt('Tell us what to add or fix.', SX + 34, SY + 205, 21, FOG, 500);
        for (let i = 0; i < 5; i++) { const lit = t >= B('rate') + 0.3 + i * 0.22, p = lit ? pop(t, B('rate') + 0.3 + i * 0.22, 0.3) : 1; scaleAt(SX + 70 + i * 82, SY + 280, p, () => txt('★', SX + 70 + i * 82, SY + 280, 66, lit ? GOLD : 'rgba(16,38,29,0.15)', 900, 'center')); }
        if (t >= B('rate') + 1.5) ft('Loved it 😍', SX + 34, SY + 345, 24, GRN, 700);
        rr(SX + 34, SY + 380, SW - 68, 130, 18, WH); h.strokeStyle = 'rgba(16,38,29,0.12)'; h.lineWidth = 2; h.beginPath(); h.roundRect(SX + 34, SY + 380, SW - 68, 130, 18); h.stroke();
        const msg = 'Add Paytm support 🙏', n = Math.floor(cl((t - B('rate') - 1.6) / 1.2) * msg.length); txt(n > 0 ? msg.slice(0, n) + (Math.floor(t * 3) % 2 ? '|' : '') : 'Anything we should add or fix?', SX + 56, SY + 420, 22, n > 0 ? INKD : 'rgba(16,38,29,0.4)', 500);
        ['PhonePe', 'Google Pay', 'Bank'].forEach((c, i) => { const x = SX + 34 + [0, 135, 290][i], on = i === 0 && t >= B('rate') + 2.6; rr(x, SY + 540, [120, 145, 90][i], 50, 25, on ? GRN : WH); ft(c, x + [60, 72, 45][i], SY + 566, 20, on ? WH : INKD, 700, 'center'); });
        const sent = t >= E('rate') - 0.3; rr(SX + 34, SY + 620, SW - 68, 76, 22, GRN); ft(sent ? '💚 Thanks! We read every one' : 'Send review', SX + SW / 2, SY + 659, 25, WH, 700, 'center'); },
    };
    const drawPhoneFrame = (t, a, screen, dissolve = 0) => { if (a <= 0) return;
      h.save(); h.globalAlpha = cl(a * 1.5); h.translate(CX, PY + (1 - a) * 260); const s = PSC * (0.85 + 0.15 * a); h.scale(s, s); h.translate(-CX, -PY);
      h.shadowColor = 'rgba(80,230,170,0.55)'; h.shadowBlur = 60; h.fillStyle = '#16181f'; h.beginPath(); h.roundRect(PX, PY, PW, PH, 58); h.fill(); h.shadowBlur = 0; h.strokeStyle = 'rgba(200,255,230,0.45)'; h.lineWidth = 3; h.stroke();
      h.save(); h.beginPath(); h.roundRect(SX, SY, SW, SHH, 46); h.clip();
      const g = h.createLinearGradient(SX, SY, SX, SY + SHH); g.addColorStop(0, '#d6eee1'); g.addColorStop(0.35, '#e9f2ec'); g.addColorStop(1, '#e9f2ec'); h.fillStyle = g; h.fillRect(SX, SY, SW, SHH);
      if (dissolve < 1) { h.save(); h.globalAlpha *= 1 - dissolve; screen(t); h.restore(); }
      if (dissolve > 0) { const r2 = K.rng(5); for (let i = 0; i < 140; i++) { const x = SX + r2() * SW, y = SY + 100 + r2() * (SHH - 120), sp = 0.4 + r2(), d = cl(dissolve * 1.6 - r2() * 0.6); if (d <= 0 || d >= 1) continue;
          h.globalAlpha = (1 - d) * 0.9; rr(x + (r2() - 0.5) * 80 * d, y - d * 260 * sp, 10, 10, 3, r2() < 0.5 ? GRN : BAR); } h.globalAlpha = 1; }
      h.restore(); h.fillStyle = '#16181f'; h.beginPath(); h.roundRect(CX - 60, SY + 2, 120, 26, 13); h.fill(); h.restore(); };

    // ---------- beats ----------
    const drawHook = t => { if (t >= C.OPEN) return;
      chip('📅 Nov 30 · month-end 🫠', 540, 230, 36, 'rgba(240,247,243,0.95)', INKD, fin(t, 0.15, 0.3), pop(t, 0.15, 0.4), 800);
      const a = pop(t, 0.5, 0.45); if (a <= 0) return; scaleAt(540, 420, a, () => { wcard(240, 320, 600, 200, 34); txt('💸', 330, 420, 70, '#000', 400, 'center');
        ft('salary', 400, 390, 34, FOG, 700); ft('→  ? ? ?', 400, 450, 58, GRN, 700); }); };
    const homeA = t => t < C.OPEN - 0.05 || t >= C.NOTH + 0.3 ? 0 : t < C.NOTH ? eb(pr(t, C.OPEN - 0.05, C.OPEN + 0.35)) : 1 - ei(pr(t, C.NOTH, C.NOTH + 0.3));
    const drawOpen = t => { const a = homeA(t); if (a <= 0) return; drawPhoneFrame(t, a, SCR.home);
      if (t >= C.SAVE && t < C.NOTH + 0.2) { const k = eo(pr(t, B('save') + 0.1, B('save') + 1.0)), bob = Math.sin(t * 4) * 6;     // statement PDF hovering over Upload
        h.save(); h.globalAlpha = fin(t, B('save') + 0.1, 0.25) * (1 - pr(t, C.NOTH, C.NOTH + 0.2)); const x = lerp(860, 600, k), y = lerp(330, 640, k) + bob;
        h.shadowColor = 'rgba(0,0,0,0.3)'; h.shadowBlur = 20; rr(x - 70, y - 85, 140, 170, 14, WH); h.shadowBlur = 0; rr(x - 70, y - 85, 140, 44, 14, RED); ft('PDF', x, y - 62, 26, WH, 800, 'center');
        for (let i = 0; i < 4; i++) rr(x - 50, y - 20 + i * 22, 100 - (i % 2) * 30, 10, 5, MINT2); txt('statement', x, y + 98, 22, WH, 700, 'center'); h.restore();
        if (t >= B('save') + 1.6) stamp('SAVED?? 😰', 540, 960, 50, RED, B('save') + 1.6, t, -0.08, 'rgba(240,247,243,0.95)'); } };
    const drawPrivacy = t => { if (t < C.NOTH || t >= C.CLOSE + 0.2) return; const out = 1 - pr(t, C.CLOSE, C.CLOSE + 0.2);
      h.save(); h.globalAlpha = out;
      if (t < C.NEVER) { const a = pop(t, C.NOTH + 0.05, 0.45); scaleAt(540, 470, a, () => { wcard(150, 290, 780, 380, 40); txt('🔒', 540, 390, 96, '#000', 400, 'center'); ft('NOTHING IS SAVED', 540, 510, 62, GRN, 700, 'center'); ft('anywhere.', 540, 585, 40, FOG, 700, 'center'); });
        if (t >= B('serious')) chip('seriously? 🤨', 540, 740, 38, RED, WH, fin(t, B('serious'), 0.2), pop(t, B('serious'), 0.3), 800); }
      else { const a = pop(t, C.NEVER + 0.05, 0.45); scaleAt(540, 470, a, () => { wcard(110, 260, 860, 640, 40);
          // phone with the file inside --x--> cloud
          rr(190, 320, 150, 250, 26, '#16181f'); rr(202, 332, 126, 226, 18, MINT); rr(225, 380, 80, 100, 8, WH); rr(225, 380, 80, 26, 8, RED); ft('PDF', 265, 394, 16, WH, 800, 'center'); ft('your phone', 265, 605, 26, INKD, 700, 'center');
          txt('☁️', 820, 430, 110, '#000', 400, 'center'); ft('servers', 820, 520, 26, FOG, 700, 'center');
          h.strokeStyle = 'rgba(16,38,29,0.35)'; h.lineWidth = 6; h.setLineDash([4, 16]); h.lineCap = 'round'; h.beginPath(); h.moveTo(360, 445); h.lineTo(730, 445); h.stroke(); h.setLineDash([]);
          const x1 = pop(t, B('never') + 0.9, 0.35); if (x1 > 0) scaleAt(545, 445, x1, () => { h.strokeStyle = RED; h.lineWidth = 18; h.lineCap = 'round'; h.beginPath(); h.moveTo(505, 405); h.lineTo(585, 485); h.moveTo(585, 405); h.lineTo(505, 485); h.stroke(); });
          [['No upload', 0], ['No login', 0.65], ['No account', 1.3]].forEach(([s, d], i) => { const r = pop(t, B('noup') + d, 0.35); if (r <= 0) return; const x = 175 + i * 250;
            scaleAt(x + 110, 720, r, () => { rr(x, 680, 225, 80, 40, 'rgba(11,143,104,0.12)'); ft('✓', x + 38, 722, 36, GRN, 800, 'center'); ft(s, x + 64, 722, 27, INKD, 700); }); });
          if (t >= B('reads')) { const r = fin(t, B('reads') + 0.1, 0.3); h.save(); h.globalAlpha *= r; ft('📄 → 📱  your phone reads it itself', 540, 835, 32, GRN, 700, 'center'); h.restore(); } }); }
      h.restore(); };
    const drawClose = t => { if (t < C.CLOSE - 0.05 || t >= C.LAKH) return;
      const a = eb(pr(t, C.CLOSE - 0.05, C.CLOSE + 0.35)), dis = eo(pr(t, B('gone') + 0.05, B('gone') + 1.1));
      drawPhoneFrame(t, a, SCR.home, dis);
      if (t < B('gone') + 0.05) { const b = pop(t, B('close') + 0.6, 0.3); if (b > 0) scaleAt(CX + 165, PY + 72, b, () => { rr(CX + 135, PY + 42, 60, 60, 30, RED); ft('✕', CX + 165, PY + 74, 34, WH, 800, 'center'); }); }
      if (t >= B('gone') + 0.6) stamp('GONE ✨', 540, 980, 60, GRN, B('gone') + 0.6, t, -0.08, 'rgba(240,247,243,0.95)'); };
    const resA = t => t < C.LAKH - 0.05 || t >= C.FREEQ + 0.3 ? 0 : t < C.FREEQ ? eb(pr(t, C.LAKH - 0.05, C.LAKH + 0.35)) : 1 - ei(pr(t, C.FREEQ, C.FREEQ + 0.3));
    const drawResults = t => { const a = resA(t); if (a <= 0) return;
      const scr = t < C.EVERY ? SCR.spent : t < C.PEOPLE ? SCR.months : t < C.ATM ? SCR.cats : t < C.LIMIT ? SCR.roast : SCR.limit;
      drawPhoneFrame(t, a, scr);
      if (t >= B('lakh') + 1.0 && t < C.EVERY) stamp('😱', 820, 330, 70, RED, B('lakh') + 1.0, t, 0.15); };
    const drawFree = t => { if (t < C.FREEQ || t >= C.ASK + 0.2) return; const out = 1 - pr(t, C.ASK, C.ASK + 0.2);
      h.save(); h.globalAlpha = out; const a = pop(t, C.FREEQ + 0.1, 0.45); scaleAt(540, 440, a, () => { wcard(170, 290, 740, 330, 40); pin(540, 380, 2.2); ft('paisamap.online', 540, 480, 52, INKD, 700, 'center'); ft('for everyone 🇮🇳', 540, 545, 34, FOG, 700, 'center'); });
      if (t >= C.FREE) { stamp('FREE  ₹0', 540, 700, 62, GRN, B('free') + 0.05, t, -0.06, 'rgba(240,247,243,0.97)');
        ['PhonePe', 'Google Pay', 'Bank statement'].forEach((s, i) => chip(s, [270, 520, 800][i], 850, 30, 'rgba(240,247,243,0.95)', INKD, fin(t, B('free') + 0.8 + i * 0.35, 0.2), pop(t, B('free') + 0.8 + i * 0.35, 0.3), 700)); }
      h.restore(); };
    const drawReview = t => { if (t < C.ASK - 0.05 || t >= C.CTA + 0.3) return;
      const a = t < C.CTA ? eb(pr(t, C.ASK - 0.05, C.ASK + 0.35)) : 1 - ei(pr(t, C.CTA, C.CTA + 0.3));
      if (t < C.RATE) { scaleAt(540, 440, pop(t, C.ASK + 0.05, 0.45), () => { wcard(200, 310, 680, 240, 36); txt('💡', 330, 430, 84, '#000', 400, 'center'); ft('new features?', 610, 410, 46, INKD, 700, 'center'); ft('you decide', 610, 470, 36, GRN, 700, 'center'); }); return; }
      drawPhoneFrame(t, a, SCR.review); };
    const drawCta = t => { if (t < C.CTA) return;
      const a = pop(t, C.CTA + 0.05, 0.45); scaleAt(540, 470, a, () => { wcard(110, 250, 860, 520, 44, 'rgba(80,230,170,0.95)');
        pin(540, 340, 2.4); ft('paisamap.online', 540, 440, 66, INKD, 700, 'center'); ft('🔒 Nothing is saved. Ever.', 540, 510, 36, GRN, 700, 'center');
        const pl = 1 + 0.04 * Math.sin(t * 7) * fin(t, B('cta') + 0.4, 0.3); scaleAt(540, 620, pl, () => { h.save(); h.shadowColor = 'rgba(11,143,104,0.7)'; h.shadowBlur = 30; rr(170, 570, 740, 100, 50, GRN); h.restore();
          ft('💬 Comment', 420, 622, 44, WH, 700, 'center'); ft('PAISA', 710, 622, 56, WH, 800, 'center'); });
        txt('→ link in your DMs', 540, 720, 30, FOG, 700, 'center', fin(t, B('cta') + 0.8, 0.3), FR); }); };

    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,10,0.42)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.NOTH, C.LAKH, C.CTA];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.18) a = Math.max(a, 1 - d / 0.18); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawHook(t); drawOpen(t); drawPrivacy(t); drawClose(t); drawResults(t); drawFree(t); drawReview(t); drawCta(t);
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.55})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.25); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, '#5fe0b0'); g.addColorStop(1, GRN); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['pop', 0.15, 0.3], ['pop', 0.5, 0.35], ['boing', 1.2, 0.2]);
    sfx.push(['whoosh', C.OPEN, 0.3], ['pop', C.OPEN + 0.1, 0.3], ['rustle', B('save') + 0.1, 0.3], ['buzz', B('save') + 1.6, 0.15], ['thud', B('save') + 1.6, 0.3]);
    sfx.push(['bass', C.NOTH, 0.4], ['chime', C.NOTH + 0.1, 0.35], ['boing', B('serious'), 0.25]);
    sfx.push(['whoosh', C.NEVER, 0.3], ['buzz', B('never') + 0.9, 0.12], ['thud', B('never') + 0.9, 0.3]); [0, 0.65, 1.3].forEach(d => sfx.push(['ding', B('noup') + d, 0.3])); sfx.push(['pop', B('reads') + 0.1, 0.25]);
    sfx.push(['whoosh', C.CLOSE, 0.25], ['pop', B('close') + 0.6, 0.3], ['riser', B('gone') + 0.05, 0.3], ['zap', B('gone') + 0.6, 0.2], ['chime', B('gone') + 0.6, 0.3]);
    sfx.push(['bass', C.LAKH, 0.4]); for (let t2 = B('lakh') + 0.25; t2 < B('lakh') + 1.6; t2 += 0.07) sfx.push(['coin', t2, 0.06]); sfx.push(['kaching', B('lakh') + 1.6, 0.35], ['boing', B('lakh') + 1.0, 0.2]);
    sfx.push(['whoosh', C.EVERY, 0.25]); for (let i = 0; i < 6; i++) sfx.push(['tick', C.EVERY + 0.2 + i * 0.12, 0.08]); sfx.push(['chime', B('july') + 0.4, 0.35]);
    sfx.push(['whoosh', C.PEOPLE, 0.25], ['thud', B('people') + 0.9, 0.3], ['pop', C.ATM + 0.1, 0.3], ['ding', B('atm') + 0.9, 0.3]);
    sfx.push(['whoosh', C.LIMIT, 0.25], ['riser', B('limit') + 0.4, 0.25], ['beep', B('limit') + 1.3, 0.25], ['beep', B('limit') + 1.5, 0.25]);
    sfx.push(['pop', C.FREEQ + 0.1, 0.3], ['kaching', B('free') + 0.05, 0.35]); [0, 1, 2].forEach(i => sfx.push(['pop', B('free') + 0.8 + i * 0.35, 0.25]));
    sfx.push(['pop', C.ASK + 0.05, 0.3], ['whoosh', C.RATE, 0.25]); for (let i = 0; i < 5; i++) sfx.push(['ding', B('rate') + 0.3 + i * 0.22, 0.18]); sfx.push(['type', B('rate') + 1.6, 0.25], ['chime', E('rate') - 0.3, 0.3]);
    sfx.push(['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.4, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
