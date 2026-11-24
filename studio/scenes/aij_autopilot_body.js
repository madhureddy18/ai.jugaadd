/* @maddiee.makess reel 29 — "My Instagram runs itself" (true: scheduled posting, comment→DM bot, cloned voices, 3D video in code, renderer).
   Real 3D scenes: night bedroom, Maddie asleep, a reel card rockets out at 7:30 → city at night: firework + comments rain down and fold into
   paper-plane DMs to lit windows → code lines snap into a 3D Charminar + a tower of frames → a 5-machine factory → spotlight: "It's just Claude". */
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
    const rng = K.rng(29);


    // ================= TIMELINE =================
    const C = { HOOK: 0, POSTED: B('posted') - 0.12, WHO: B('who') - 0.1, DM: B('dm') - 0.12, VIDEO: B('video') - 0.1, CODE: B('code') - 0.12, RUNS: B('runs') - 0.1,
      ALL: B('all') - 0.12, TEAM: B('team') - 0.1, JUST: B('just') - 0.12, SCARY: B('scary') - 0.1, CTA: B('cta') - 0.12 };
    const LAUNCH = 0.35, RAIN0 = B('who') + 0.9, FOLD = B('dm') + 0.6;
    const CTX = 60, KX = 80, FX = 100;

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


    // alarm clock on the nightstand: 7:30 PM
    const acTex = K.canvasTex(256, 128, (x, w, h) => { x.fillStyle = '#111'; x.fillRect(0, 0, w, h); x.fillStyle = '#ff3b30'; x.font = '800 76px monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('7:30', w / 2 - 14, h / 2 + 4); x.font = '700 26px monospace'; x.fillText('PM', w - 34, h / 2 + 20); });
    rbox(0.2, 0.1, 0.08, SM(0x222222, 0.4), 0.62, 0.785, -0.32, 0.02); const ac = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.085), new THREE.MeshBasicMaterial({ map: acTex, toneMapped: false })); ac.position.set(0.62, 0.785, -0.279); S.add(ac);
    // the reel card that rockets out of the window
    const reelTex = K.canvasTex(180, 320, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#ff5a8a'); g.addColorStop(1, '#5a7cff'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,255,255,0.9)'; x.beginPath(); x.moveTo(70, 130); x.lineTo(118, 160); x.lineTo(70, 190); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8); x.fillStyle = '#fff'; x.font = '800 22px sans-serif'; x.textAlign = 'center'; x.fillText('NEW REEL', w / 2, 290); });
    const reelCard = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.32), new THREE.MeshBasicMaterial({ map: reelTex, transparent: true, side: THREE.DoubleSide, toneMapped: false })); S.add(reelCard);
    const sparkTex = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 1, 32, 32, 30); g.addColorStop(0, 'rgba(255,240,200,1)'); g.addColorStop(0.3, 'rgba(255,200,120,0.6)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const trail = Array.from({ length: 16 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTex, transparent: true, opacity: 0, depthWrite: false, toneMapped: false })); S.add(s); return s; });
    const zzzTex = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#cfe0ff'; x.font = '900 44px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('z', 32, 34); });
    const zzz = [0, 1, 2].map(() => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: zzzTex, transparent: true, opacity: 0, depthWrite: false })); S.add(s); return s; });
    const spot = new THREE.SpotLight(0x9fd8ff, 0, 4, 0.35, 0.5, 1.2); spot.position.set(0.36, 2.6, 0.2); spot.target.position.set(0.36, 1.0, -0.45); S.add(spot); S.add(spot.target);

    // ================= CITY AT NIGHT (x = CTX): firework, comments rain, DMs fly to windows =================
    const city = new THREE.Group(); city.position.x = CTX; S.add(city);
    const cSky = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), new THREE.MeshBasicMaterial({ color: 0x070b22, fog: false })); cSky.position.set(0, 10, -18); city.add(cSky);
    const stG = new THREE.BufferGeometry(), stP = []; for (let i = 0; i < 400; i++) stP.push((rng() - 0.5) * 50, 4 + rng() * 22, -17); stG.setAttribute('position', new THREE.Float32BufferAttribute(stP, 3));
    city.add(new THREE.Points(stG, new THREE.PointsMaterial({ color: 0xcfd8ff, size: 0.08, fog: false })));
    const cGround = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), SM(0x10131c, 0.6)); cGround.rotation.x = -Math.PI / 2; cGround.position.z = -6; city.add(cGround);
    const winTex = (seed, base) => K.canvasTex(128, 256, (x, w, h) => { const r = K.rng(seed); x.fillStyle = base; x.fillRect(0, 0, w, h); for (let yy = 10; yy < h - 10; yy += 24) for (let xx = 10; xx < w - 10; xx += 22) { x.fillStyle = r() < 0.45 ? '#ffd98a' : '#1a1f33'; x.fillRect(xx, yy, 12, 14); } });
    const winSpots = [];
    for (let i = 0; i < 16; i++) { const w = 1.6 + rng() * 1.6, hgt = 3 + rng() * 7, x = -12 + i * 1.7 + (rng() - 0.5), z = -8 - rng() * 6;
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, hgt, 1.5), new THREE.MeshStandardMaterial({ map: winTex(60 + i, '#2a3048'), emissive: 0xffd98a, emissiveIntensity: 0.6, emissiveMap: winTex(60 + i, '#000'), roughness: 0.8 })); m.position.set(x, hgt / 2, z); city.add(m);
      for (let k = 0; k < 3; k++) winSpots.push(new THREE.Vector3(x + (rng() - 0.5) * w * 0.8, 1 + rng() * (hgt - 1.5), z + 0.8)); }
    const bubTex = ['🔥 wow', 'send pls 🙏', '😍😍', 'how??', 'link?', '🤯🤯', 'need this', 'bro 🔥'].map(s => K.canvasTex(256, 96, (x, w, h) => { x.fillStyle = '#ffffff'; x.beginPath(); x.roundRect(4, 4, w - 8, h - 22, 30); x.fill(); x.beginPath(); x.moveTo(40, h - 20); x.lineTo(30, h - 2); x.lineTo(64, h - 20); x.fill(); x.fillStyle = '#111'; x.font = '700 38px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, w / 2, 40); }));
    const BN = 36, bubs = Array.from({ length: BN }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: bubTex[i % bubTex.length], transparent: true, opacity: 0, depthWrite: false })); s.scale.set(1.2, 0.45, 1); city.add(s);
      return { s, x: (rng() - 0.5) * 12, z: -3 - rng() * 5, d: rng() * 1.4, sp: 1.6 + rng(), tgt: winSpots[Math.floor(rng() * winSpots.length)] }; });
    const planeGeo = new THREE.BufferGeometry(); planeGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0.3, -0.2, 0, -0.15, 0, 0.06, -0.1, 0, 0, 0.3, 0, 0.06, -0.1, 0.2, 0, -0.15], 3)); planeGeo.computeVertexNormals();
    const planeM = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide, emissive: 0x6fd8ff, emissiveIntensity: 0.4 });
    const planes = bubs.map(() => { const p = new THREE.Mesh(planeGeo, planeM); p.visible = false; city.add(p); return p; });
    const tickTex = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#2fbf71'; x.beginPath(); x.arc(32, 32, 28, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(18, 33); x.lineTo(28, 43); x.lineTo(46, 22); x.stroke(); });
    const ticks = bubs.map(() => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tickTex, transparent: true, opacity: 0, depthWrite: false, toneMapped: false })); s.scale.setScalar(0.45); city.add(s); return s; });
    const FW = 220, fwG = new THREE.BufferGeometry(), fwP = new Float32Array(FW * 3), fwC = new Float32Array(FW * 3), fwD = [];
    for (let i = 0; i < FW; i++) { const th = rng() * 6.283, ph = Math.acos(2 * rng() - 1), sp = 2.5 + rng() * 2; fwD.push([Math.sin(ph) * Math.cos(th) * sp, Math.cos(ph) * sp, Math.sin(ph) * Math.sin(th) * sp]); const c = new THREE.Color().setHSL(rng(), 0.9, 0.65); fwC.set([c.r * 2, c.g * 2, c.b * 2], i * 3); }
    fwG.setAttribute('position', new THREE.BufferAttribute(fwP, 3)); fwG.setAttribute('color', new THREE.BufferAttribute(fwC, 3));
    const fw = new THREE.Points(fwG, new THREE.PointsMaterial({ size: 0.16, vertexColors: true, transparent: true, toneMapped: false, depthWrite: false })); fw.frustumCulled = false; city.add(fw);
    const fwCard = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.6), new THREE.MeshBasicMaterial({ map: reelTex, transparent: true, toneMapped: false })); fwCard.position.set(0, 7, -6); city.add(fwCard);
    const cMoon = new THREE.DirectionalLight(0x9fb4ff, 0.8); cMoon.position.set(CTX + 3, 8, 4); cMoon.target.position.set(CTX, 2, -6); S.add(cMoon); S.add(cMoon.target);

    // ================= CODE → 3D (x = KX): code lines snap into blocks, a mini Charminar builds, frames stack =================
    const code = new THREE.Group(); code.position.x = KX; S.add(code);
    const gridT = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#000'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(90,124,255,1)'; x.lineWidth = 3; x.strokeRect(0, 0, w, h); });
    gridT.wrapS = gridT.wrapT = THREE.RepeatWrapping; gridT.repeat.set(40, 40);
    const kFloor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0x0a1036, emissive: 0x4a64ff, emissiveIntensity: 0.6, emissiveMap: gridT })); kFloor.rotation.x = -Math.PI / 2; kFloor.position.z = -4; code.add(kFloor);
    const kSky = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), new THREE.MeshBasicMaterial({ color: 0x050920, fog: false })); kSky.position.set(0, 8, -16); code.add(kSky);
    const codeLines = ['const scene = new THREE.Scene();', 'charminar.addMinaret(4);', 'camera.flyTo(sunset);', 'render(frame++);', 'voice.say("Hey Claude");', 'hero.land(roof);'];
    const codeMeshes = codeLines.map((s, i) => { const tx = K.canvasTex(512, 64, (x, w, h) => { x.fillStyle = 'rgba(0,0,0,0)'; x.clearRect(0, 0, w, h); x.fillStyle = ['#ff7ab6', '#7ee0ff', '#ffd34a', '#9dff7a', '#c59bff', '#ffa94d'][i]; x.font = '600 30px monospace'; x.textBaseline = 'middle'; x.fillText(s, 8, 34); });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.3), new THREE.MeshBasicMaterial({ map: tx, transparent: true, toneMapped: false, depthWrite: false })); code.add(m); return m; });
    const voxM = new THREE.MeshStandardMaterial({ color: 0xe8d4b0, roughness: 0.7, emissive: 0x332211, emissiveIntensity: 0.2 });
    const voxTargets = [];
    for (let x = -3; x <= 3; x++) for (let z = -3; z <= 3; z++) for (let y = 0; y < 5; y++) { const edge = Math.abs(x) === 3 || Math.abs(z) === 3; if (!edge && y < 4) continue; if (edge && y < 3 && Math.abs(x) < 2 && Math.abs(z) === 3) continue; voxTargets.push([x * 0.2, y * 0.2 + 0.1, -4 + z * 0.2]); }
    [[-3, -3], [3, -3], [-3, 3], [3, 3]].forEach(([x, z]) => { for (let y = 0; y < 12; y++) voxTargets.push([x * 0.22, y * 0.2 + 0.1, -4 + z * 0.22]); });
    const VN = voxTargets.length, vox = new THREE.InstancedMesh(new THREE.BoxGeometry(0.19, 0.19, 0.19), voxM, VN); vox.frustumCulled = false; code.add(vox);
    const voxFrom = voxTargets.map(() => [(rng() - 0.5) * 6, 3 + rng() * 3, -2 - rng() * 3]); const voxD = voxTargets.map((_, i) => i / VN * 1.6 + rng() * 0.2);
    const frameTex = K.canvasTex(90, 160, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ff9a3d'); g.addColorStop(1, '#5a3a8f'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.strokeStyle = '#fff'; x.lineWidth = 4; x.strokeRect(2, 2, w - 4, h - 4); });
    const FR_N = 60, frames3 = Array.from({ length: FR_N }, (_, i) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.8), new THREE.MeshBasicMaterial({ map: frameTex, side: THREE.DoubleSide, toneMapped: false })); m.rotation.x = -Math.PI / 2; m.visible = false; code.add(m); return m; });
    const kKey = new THREE.PointLight(0xffffff, 2.2, 12, 1.2); kKey.position.set(1.5, 4, 0); code.add(kKey); const kRim = new THREE.PointLight(0x5a7cff, 2, 10, 1.3); kRim.position.set(-2, 2, -6); code.add(kRim);

    // ================= THE FACTORY (x = FX): 5 machines whirring on a conveyor =================
    const fac = new THREE.Group(); fac.position.x = FX; S.add(fac);
    const fFloor = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), SM(0x23262e, 0.5, { metalness: 0.3 })); fFloor.rotation.x = -Math.PI / 2; fFloor.position.z = -3; fac.add(fFloor);
    const fWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), SM(0x1a1d26, 0.8)); fWall.position.set(0, 5, -6); fac.add(fWall);
    const beltTex = K.canvasTex(64, 64, (x, w, h) => { x.fillStyle = '#2b2b2b'; x.fillRect(0, 0, w, h); x.fillStyle = '#3d3d3d'; x.fillRect(0, 0, w, 10); }); beltTex.wrapS = beltTex.wrapT = THREE.RepeatWrapping; beltTex.repeat.set(1, 30);
    const belt = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 14), new THREE.MeshStandardMaterial({ map: beltTex, roughness: 0.7 })); belt.rotation.set(-Math.PI / 2, 0, Math.PI / 2); belt.position.set(0, 0.62, -2.6); fac.add(belt);
    rbox(14, 0.6, 1.0, SM(0x3a3f4b, 0.5, { metalness: 0.4 }), 0, 0.3, -2.6, 0.03, fac);
    const lblTex = s => K.canvasTex(256, 64, (x, w, h) => { x.fillStyle = '#0e1430'; x.beginPath(); x.roundRect(2, 2, w - 4, h - 4, 30); x.fill(); x.strokeStyle = '#6fd8ff'; x.lineWidth = 4; x.stroke(); x.fillStyle = '#fff'; x.font = '800 30px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, w / 2, h / 2 + 2); });
    const mach = [];
    const MX = [-2.2, -1.1, 0, 1.1, 2.2];
    ['🚀 POSTING', '💬 REPLIES', '✉️ DMs', '🎙️ VOICES', '🎬 VIDEO'].forEach((s, i) => { const g = new THREE.Group(); g.position.set(MX[i], 0.62, -2.9); fac.add(g);
      rbox(0.85, 0.8, 0.8, SM([0xd94f5c, 0x4f7fd9, 0x2fbf71, 0xc25aff, 0xf5a524][i], 0.45, { metalness: 0.3 }), 0, 0.45, 0, 0.08, g);
      const lb = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.24), new THREE.MeshBasicMaterial({ map: lblTex(s), toneMapped: false })); lb.position.set(0, 1.25, 0.2); g.add(lb);
      const top = new THREE.Group(); top.position.y = 0.9; g.add(top);
      if (i === 0) { const r = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.5, 16), SM(0xffffff, 0.4)); r.position.y = 0.3; top.add(r); }
      if (i === 1) { for (let k = 0; k < 3; k++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 8), SM(0xffffff, 0.4)); b.scale.set(1.4, 1, 0.5); b.position.set(-0.2 + k * 0.2, 0.2, 0); top.add(b); } }
      if (i === 2) { const env = rbox(0.4, 0.26, 0.04, SM(0xffffff, 0.4), 0, 0.2, 0, 0.02, top); }
      if (i === 3) { cyl(0.03, 0.03, 0.3, SM(0x999999, 0.3, { metalness: 0.7 }), 0, 0.15, 0, 8, top); const mic = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), SM(0x333333, 0.3, { metalness: 0.6 })); mic.position.y = 0.38; top.add(mic); }
      if (i === 4) { const reel = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.06, 10, 24), SM(0x222222, 0.4, { metalness: 0.6 })); reel.position.y = 0.3; top.add(reel); }
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshBasicMaterial({ color: 0x2fbf71, toneMapped: false })); lamp.position.set(0.4, 0.75, 0.46); g.add(lamp);
      mach.push({ g, top, lamp }); });
    const boxes = Array.from({ length: 14 }, () => { const b = rbox(0.22, 0.22, 0.22, SM(0xc8a46a, 0.7), 0, 0.75, -2.6, 0.02, fac); return b; });
    const fLight = new THREE.PointLight(0xfff2e0, 2.4, 14, 1.2); fLight.position.set(0, 4, 1.5); fac.add(fLight); const fRim = new THREE.PointLight(0x6fd8ff, 1.5, 10, 1.3); fRim.position.set(-4, 2.5, -4.5); fac.add(fRim);


    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06], down = [0.05, 0.45];
    const winPos = new THREE.Vector3(1.05, 1.62, -2.45);
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      const asleep = t < 0.4;
      let mL = toR, face = 'neutral', lean = 0.15;
      if (asleep) { mL = down; lean = 0.45; }
      else if (t < C.POSTED) { mL = toCam; face = 'shock'; lean = -0.1; }
      else if (t < C.WHO) { mL = toR; face = 'neutral'; }
      else if (t < C.DM) { mL = toCam; face = 'shock'; lean = -0.05; }
      else if (t < C.VIDEO) { mL = toR; face = 'neutral'; }
      else if (t < C.CODE) { mL = toR; face = 'shock'; lean = 0.1; }
      else if (t < C.RUNS) { mL = toR; face = 'neutral'; }
      else if (t < C.ALL) { mL = toCam; face = 'shock'; lean = -0.12; }
      else if (t < C.TEAM) { mL = toR; face = 'neutral'; }
      else if (t < C.JUST) { mL = toR; face = 'worried'; lean = 0.2; }
      else if (t < C.SCARY) { mL = toR; face = 'shock'; lean = -0.1; }
      else if (t < C.CTA) { mL = toCam; face = 'worried'; lean = 0.3; }
      else { mL = toCam; face = 'smile'; lean = 0; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type: 0, lean });
      if (asleep) M.eyes.forEach(e => e.scale.y = 0.08);
      phL.intensity = 0.03; phScr.material.color.setHex(0x5f9a80);
      zzz.forEach((s, i) => { const p = ((t * 0.6 + i / 3) % 1); s.position.set(-0.05 + p * 0.2, 1.75 + p * 0.35, -0.9); s.scale.setScalar(0.06 + p * 0.08); s.material.opacity = t < 0.5 ? Math.sin(p * Math.PI) : 0; });
      let rL = [-0.15, 0.05]; if ((t >= C.POSTED && t < C.WHO) || (t >= C.DM && t < C.VIDEO) || (t >= C.CODE && t < C.RUNS) || (t >= C.ALL && t < C.TEAM) || (t >= C.JUST && t < C.SCARY) || t >= C.CTA) rL = [0.42, 0.02];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood: (t >= C.JUST && t < C.SCARY) || t >= C.CTA ? 'smile' : 'calm' });
      bulbs.forEach(o => { const f = 0.85 + 0.15 * Math.sin(t * 2.2 + o.ph); o.b.material.color.setHex(0xffc879).multiplyScalar(2.2 * f); });
      // the "just Claude" spotlight
      const sp = pr(t, C.JUST, C.JUST + 0.4) * (1 - pr(t, C.SCARY, C.SCARY + 0.3)); spot.intensity = 9 * sp; hemi.intensity = 0.6 * (1 - 0.6 * sp); key.intensity = 1.05 * (1 - 0.7 * sp);
      // the reel card rockets out of the window at 7:30
      const lp = pr(t, LAUNCH, LAUNCH + 1.6), start = new THREE.Vector3(-0.05, 1.05, -0.65);
      const cpos = new THREE.Vector3().lerpVectors(start, winPos, ei(lp)); cpos.y += Math.sin(lp * Math.PI) * 0.5;
      reelCard.position.copy(cpos); reelCard.rotation.set(0, t * 6, 0); reelCard.visible = t >= LAUNCH && lp < 1; reelCard.scale.setScalar(1 + lp * 0.6);
      trail.forEach((s, i) => { const q = cl(lp - i * 0.03); const p2 = new THREE.Vector3().lerpVectors(start, winPos, ei(q)); p2.y += Math.sin(q * Math.PI) * 0.5; s.position.copy(p2); s.scale.setScalar(0.08 + (16 - i) * 0.006); s.material.opacity = t >= LAUNCH && lp < 1 && q > 0 ? (1 - i / 16) * 0.9 : 0; });
      // city: firework of the reel, comments rain, fold into paper planes, fly to windows, ticks pop
      const fwT = t - (C.POSTED + 0.3); const fwOn = fwT > 0 && fwT < 3.5;
      fwCard.position.y = 7 + Math.max(0, fwT) * 0.3; fwCard.material.opacity = fwT > 0 ? 1 - pr(t, C.POSTED + 0.6, C.POSTED + 1.2) : 0; fwCard.visible = fwT > -1 && fwT < 1.5;
      for (let i = 0; i < FW; i++) { const d = fwD[i], q = Math.max(0, fwT - 0.3); fwP.set([d[0] * q * 1.4, 7 + d[1] * q * 1.4 - 1.2 * q * q, -6 + d[2] * q * 1.4], i * 3); }
      fwG.attributes.position.needsUpdate = true; fw.material.opacity = fwOn && fwT > 0.3 ? 1 - pr(fwT, 1.5, 3.2) : 0;
      bubs.forEach((b, i) => { const rt = t - RAIN0 - b.d, ft = t - FOLD - b.d * 0.5; const p = planes[i], tk = ticks[i];
        if (rt < 0) { b.s.material.opacity = 0; p.visible = false; tk.material.opacity = 0; return; }
        const y = Math.max(1.2, 9 - rt * b.sp * 2.2);
        if (ft < 0) { b.s.position.set(b.x, y, b.z); b.s.material.opacity = 1; p.visible = false; tk.material.opacity = 0; return; }
        b.s.material.opacity = Math.max(0, 1 - ft * 4); const q = eo(cl(ft / 1.3)); const from = new THREE.Vector3(b.x, y, b.z);
        p.visible = q < 1; p.position.lerpVectors(from, b.tgt, q); p.position.y += Math.sin(q * Math.PI) * 1.2; p.lookAt(b.tgt.x + CTX, b.tgt.y, b.tgt.z); p.scale.setScalar(1.6);
        tk.position.copy(b.tgt); tk.position.z += 0.2; tk.material.opacity = q >= 1 ? Math.min(1, (ft - 1.3) * 4) : 0; });
      // code → 3D: code lines float, blocks fly in and snap, frames stack into a tower
      codeMeshes.forEach((m, i) => { const ct = t - C.CODE - i * 0.12; m.position.set(-0.3 + (i % 2) * 0.4, 2.7 - i * 0.3 + Math.max(0, ct) * 0.05, -3.0); m.scale.setScalar(0.75); m.material.opacity = ct > 0 ? Math.min(1, ct * 3) * (1 - pr(t, C.CODE + 1.6, C.CODE + 2.2)) : 0; });
      for (let i = 0; i < VN; i++) { const q = eo(pr(t, C.CODE + 0.8 + voxD[i], C.CODE + 1.3 + voxD[i])); const a = voxFrom[i], b = voxTargets[i];
        dummy.position.set(lerp(a[0], b[0], q), lerp(a[1], b[1], q), lerp(a[2], b[2], q)); dummy.rotation.set((1 - q) * 3, (1 - q) * 2, 0); dummy.scale.setScalar(q > 0 ? 1 : 0.001); dummy.updateMatrix(); vox.setMatrixAt(i, dummy.matrix); }
      vox.instanceMatrix.needsUpdate = true;
      frames3.forEach((m, i) => { const ft2 = t - (B('code') + 2.4) - i * 0.03; m.visible = ft2 > 0; m.position.set(1.15, 0.05 + Math.min(i, Math.floor((t - B('code') - 2.4) / 0.03)) * 0.04 * (ft2 > 0 ? 1 : 0) + (ft2 > 0 && ft2 < 0.2 ? (0.2 - ft2) * 4 : 0), -3.4); m.position.y = 0.05 + i * 0.04 + (ft2 > 0 && ft2 < 0.2 ? (0.2 - ft2) * 4 : 0); m.rotation.z = i * 0.05; });
      // factory: belt moves, machines bob and spin, lamps blink
      beltTex.offset.y = -t * 0.8;
      mach.forEach((m, i) => { m.top.position.y = 0.9 + Math.abs(Math.sin(t * 6 + i)) * 0.12; m.top.rotation.y = t * (1 + i * 0.3); m.lamp.material.color.setHex(Math.floor(t * 4 + i) % 2 ? 0x2fbf71 : 0x0e5a34); });
      boxes.forEach((b, i) => { b.position.x = ((t * 0.9 + i * 0.5) % 7) - 3.5; });
    };
    const dummy = new THREE.Object3D();


    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.36, 1.1, -0.4];
    const sh = {
      est: [P([0.3, 1.55, 2.4], [0.1, 1.2, -1.2], 42), P([-0.05, 1.5, 1.5], [-0.1, 1.3, -1.0], 38)],
      robo: [P([0.1, 1.22, 1.35], RHL, 30), P([0.12, 1.21, 1.18], RHL, 30)],
      wait: [P([-0.18, 1.43, 1.05], [-0.2, 1.4, -0.94], 30), P([-0.18, 1.42, 0.85], [-0.2, 1.4, -0.94], 30)],
      mad: [P([0.12, 1.44, 1.32], MHL, 32), P([0.1, 1.43, 1.15], MHL, 32)],
      spot: [P([0.25, 1.3, 1.1], RHL, 30), P([0.3, 1.25, 0.9], RHL, 28)],
      cta: [P([0.06, 1.5, 2.3], [0.0, 1.28, -0.9], 42), P([0.06, 1.48, 2.05], [0.0, 1.28, -0.9], 42)],
      city: [P([CTX, 2.2, 8], [CTX, 5.5, -6], 50), P([CTX + 0.5, 2.0, 6.5], [CTX, 4.5, -6], 50)],
      cityLow: [P([CTX - 1, 1.6, 5], [CTX + 0.5, 3.2, -8], 50), P([CTX - 0.5, 1.8, 4], [CTX + 0.5, 3.0, -9], 50)],
      code: [P([KX + 1.0, 2.1, 3.6], [KX + 0.3, 1.1, -3.6], 46), P([KX + 0.7, 1.7, 2.2], [KX + 0.4, 0.9, -3.7], 46)],
      fac: [P([FX + 0.6, 2.8, 7.2], [FX, 1.1, -2.8], 50), P([FX - 0.4, 2.3, 5.8], [FX, 1.1, -2.8], 50)],
    };
    const plan = [
      [C.HOOK, C.POSTED, sh.est], [C.POSTED, C.WHO, sh.city], [C.WHO, RAIN0 - 0.2, sh.wait], [RAIN0 - 0.2, C.VIDEO, sh.cityLow], [C.VIDEO, C.CODE, sh.mad],
      [C.CODE, C.RUNS, sh.code], [C.RUNS, C.ALL, sh.wait], [C.ALL, C.TEAM, sh.fac], [C.TEAM, C.JUST, sh.mad], [C.JUST, C.SCARY, sh.spot], [C.SCARY, C.CTA, sh.wait], [C.CTA, D + 5, sh.cta],
    ].filter(p => p[1] > p[0]);
    const SHAKE = [C.WHO, C.RUNS, C.SCARY];
    const smooth = k => k * k * (3 - 2 * k);
    const lift = (p, dy) => ({ pos: [p.pos[0], p.pos[1] + dy, p.pos[2]], look: [p.look[0], p.look[1] + dy, p.look[2]], fov: p.fov });
    const DYS = new Map([[sh.mad, 0.085], [sh.wait, 0.075], [sh.robo, 0.035], [sh.spot, 0.035], [sh.est, 0.05], [sh.cta, 0.03]]);
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


    // ---------- small HUD labels ----------
    const DARK = 'rgba(10,14,40,0.92)';
    const label = (t, t0, t1, s, bg = DARK, fg = '#fff', y = 230) => { if (t < t0 || t >= t1) return; chip(s, 540, y, 38, bg, fg, fin(t, t0, 0.25) * (1 - pr(t, t1 - 0.2, t1)), pop(t, t0, 0.35), 800); };
    const drawBeats = t => {
      label(t, 0.3, C.POSTED, '😴 7:30 PM · asleep');
      if (t >= C.POSTED + 0.4 && t < C.WHO) stamp('POSTED ✓ 7:30 PM', 540, 400, 54, '#2fbf71', C.POSTED + 0.4, t, -0.06, 'rgba(255,255,255,0.95)');
      label(t, RAIN0, C.VIDEO, '💬 every comment → DM in seconds', '#4f7fd9');
      if (t >= FOLD + 1.6 && t < C.VIDEO) stamp('3:00 AM ✓', 540, 420, 52, '#2fbf71', FOLD + 1.6, t, 0.06, 'rgba(255,255,255,0.95)');
      label(t, C.CODE + 0.1, C.RUNS, '💻 code → 3D → frame by frame', '#7b2ff7');
      label(t, C.ALL + 0.1, C.TEAM, '⚙️ all automatic', '#f5a524', '#1a1206');
      if (t >= C.JUST + 0.4 && t < C.SCARY) stamp('NO TEAM. JUST CLAUDE 🤖', 540, 400, 50, '#ffd34a', B('just') + 0.5, t, -0.06, 'rgba(10,14,40,0.95)');
      if (t >= C.CTA) { const a = pop(t, C.CTA + 0.05, 0.45); scaleAt(540, 430, a, () => { h.save(); h.shadowColor = 'rgba(111,216,255,0.9)'; h.shadowBlur = 40; rr(140, 270, 800, 330, 40, DARK); h.restore();
        ft('🤖 How our Instagram', 540, 350, 50, '#fff', 700, 'center'); ft('runs itself', 540, 412, 48, '#ffd34a', 700, 'center');
        const pl = 1 + 0.05 * Math.sin(t * 7); scaleAt(540, 520, pl, () => { rr(190, 480, 700, 84, 42, '#ffd34a'); ft('💬 Comment anything', 540, 524, 42, '#1a1206', 800, 'center'); }); }); }
    };


    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,10,0.38)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.POSTED, RAIN0 - 0.2, C.CODE, C.ALL, C.CTA];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.18) a = Math.max(a, 1 - d / 0.18); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawBeats(t);
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.5})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.25); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, '#6fd8ff'); g.addColorStop(1, '#ffd34a'); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['beep', 0.2, 0.25], ['beep', 0.4, 0.25], ['riser', LAUNCH, 0.3], ['whoosh', LAUNCH + 1.2, 0.3], ['boing', 0.45, 0.2]);
    sfx.push(['whoosh', C.POSTED, 0.25], ['zap', C.POSTED + 0.55, 0.25], ['bass', C.POSTED + 0.6, 0.5], ['kaching', C.POSTED + 0.5, 0.3], ['chime', C.POSTED + 0.4, 0.3]);
    sfx.push(['boing', C.WHO, 0.2]); for (let t2 = RAIN0; t2 < RAIN0 + 1.6; t2 += 0.12) sfx.push(['pop', t2, 0.12]);
    sfx.push(['whoosh', FOLD, 0.3]); for (let t2 = FOLD + 1.2; t2 < FOLD + 2.2; t2 += 0.09) sfx.push(['ding', t2, 0.12]);
    sfx.push(['type', C.CODE, 0.3], ['riser', C.CODE + 0.8, 0.25]); for (let t2 = C.CODE + 0.8; t2 < C.CODE + 2.4; t2 += 0.06) sfx.push(['tick', t2, 0.07]); sfx.push(['chime', C.CODE + 2.4, 0.3]);
    sfx.push(['boing', C.RUNS, 0.2], ['whoosh', C.ALL, 0.3], ['train', C.ALL, 0.15]); [0, 1, 2, 3, 4].forEach(i => sfx.push(['beep', B('all') + 0.2 + i * 0.6, 0.2]));
    sfx.push(['bass', C.JUST, 0.45], ['chime', B('just') + 0.5, 0.4], ['thud', B('just') + 0.5, 0.3], ['buzz', C.SCARY + 0.3, 0.12], ['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.5, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
