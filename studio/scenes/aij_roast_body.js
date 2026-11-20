/* @maddiee.makess reel 25 — "This website roasted me" — PaisaMap promo (dialogue says "the free website"; the name is only on screen).
   NEW SET: a college/office canteen at lunch (menu board, steel counter, tube lights, other tables). Real roast lines from PaisaMap
   on Maddyy's PhonePe statement (Jun–Nov 2026), no payee names. Voices cloned from his graduation reel. Comment PAISA. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0xd8e6dc, fog: [8, 30], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
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
    const rng = K.rng(25);



    // ================= TIMELINE =================
    const C = { HOOK: 0, WHAT: B('what') - 0.1, UP: B('upload') - 0.1, FREE: B('free') - 0.1, ATM: B('atm') - 0.12, PEOPLE: B('people') - 0.1, WILD: B('wild') - 0.12, FIFTY: B('fifty') - 0.1,
      PERSONA: B('persona') - 0.12, BROKE: B('broke') - 0.1, FAIR: B('fair') - 0.1, ALSO: B('also') - 0.12, FRIENDS: B('friends') - 0.1, CTA: B('cta') - 0.12 };
    C.EVERY = C.FIFTY;


    // ================= CANTEEN (lunch time) =================
    const WZ = -2.6;
    const tileTex = K.canvasTex(256, 256, (x, w, h) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#d9d4c7' : '#bfb8a8'; x.fillRect(i * 32, j * 32, 32, 32); } x.strokeStyle = 'rgba(0,0,0,0.12)'; x.lineWidth = 2; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 32, 0); x.lineTo(i * 32, h); x.moveTo(0, i * 32); x.lineTo(w, i * 32); x.stroke(); } });
    tileTex.wrapS = tileTex.wrapT = THREE.RepeatWrapping; tileTex.repeat.set(5, 5);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), new THREE.MeshStandardMaterial({ map: tileTex, roughness: 0.55 })); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, -1); floor.receiveShadow = true; S.add(floor);
    const wallTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#cfe8dc'; x.fillRect(0, 0, w, h); x.fillStyle = '#f3efe4'; x.fillRect(0, h * 0.62, w, h * 0.38); x.strokeStyle = 'rgba(0,0,0,0.08)'; x.lineWidth = 2;
      for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 32, h * 0.62); x.lineTo(i * 32, h); x.stroke(); } for (let j = 0; j < 4; j++) { x.beginPath(); x.moveTo(0, h * 0.62 + j * 24); x.lineTo(w, h * 0.62 + j * 24); x.stroke(); }
      x.fillStyle = '#5aa88a'; x.fillRect(0, h * 0.6, w, 6); });
    const wallM = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.9 });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(9, 4), wallM); back.position.set(0, 2, WZ); back.receiveShadow = true; S.add(back);
    [[-2.6, Math.PI / 2], [2.6, -Math.PI / 2]].forEach(([x, r]) => { const w = new THREE.Mesh(new THREE.PlaneGeometry(7, 4), wallM); w.rotation.y = r; w.position.set(x, 2, -0.6); w.receiveShadow = true; S.add(w); });
    // menu board
    const menuTex = K.canvasTex(512, 300, (x, w, h) => { x.fillStyle = '#20332b'; x.fillRect(0, 0, w, h); x.strokeStyle = '#c99a4a'; x.lineWidth = 12; x.strokeRect(6, 6, w - 12, h - 12);
      x.fillStyle = '#ffe9a8'; x.font = '800 40px sans-serif'; x.textAlign = 'center'; x.fillText('TODAY\'S MENU', w / 2, 58);
      x.font = '600 28px sans-serif'; x.textAlign = 'left'; x.fillStyle = '#f4f4ec';
      [['Veg Thali', '₹60'], ['Chicken Biryani', '₹120'], ['Samosa (2)', '₹20'], ['Chai', '₹10'], ['Cold Coffee', '₹40']].forEach(([a, b], i) => { x.fillText(a, 40, 108 + i * 40); x.textAlign = 'right'; x.fillText(b, w - 40, 108 + i * 40); x.textAlign = 'left'; }); });
    const menu = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.67), new THREE.MeshStandardMaterial({ map: menuTex, roughness: 0.8 })); menu.position.set(-0.55, 1.95, WZ + 0.02); S.add(menu);
    // serving counter with steel containers (back right)
    const steel = SM(0xc9ced4, 0.25, { metalness: 0.8 });
    rbox(1.9, 0.95, 0.6, SM(0x8a5a3c, 0.6), 1.15, 0.475, WZ + 0.35, 0.02); rbox(1.96, 0.05, 0.66, SM(0xe9e4da, 0.4), 1.15, 0.97, WZ + 0.35, 0.01);
    for (let i = 0; i < 4; i++) { cyl(0.13, 0.12, 0.18, steel, 0.5 + i * 0.43, 1.08, WZ + 0.35, 24); const lid = cyl(0.135, 0.135, 0.015, steel, 0.5 + i * 0.43, 1.18, WZ + 0.35, 24); }
    const steamPuff = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 2, 32, 32, 30); g.addColorStop(0, 'rgba(255,255,255,0.8)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const steam = Array.from({ length: 10 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: steamPuff, transparent: true, opacity: 0, depthWrite: false })); S.add(s); return { s, x: 0.5 + (i % 4) * 0.43, ph: i * 0.37 }; });
    // tube lights on the back wall + ceiling glow strips
    const tubeM = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xf4fff8).multiplyScalar(1.6), toneMapped: false });
    [-1.6, 0.6, 1.9].forEach(x => { const t = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 10), tubeM); t.rotation.z = Math.PI / 2; t.position.set(x, 2.55, WZ + 0.06); S.add(t); rbox(0.96, 0.03, 0.05, SM(0xeeeeee, 0.5), x, 2.58, WZ + 0.03, 0.005); });
    // poster + clock on the wall
    const posterTex = K.canvasTex(200, 280, (x, w, h) => { x.fillStyle = '#ffd25a'; x.fillRect(0, 0, w, h); x.fillStyle = '#20332b'; x.font = '900 34px sans-serif'; x.textAlign = 'center'; x.fillText('WASH', w / 2, 70); x.fillText('HANDS', w / 2, 110); x.font = '80px sans-serif'; x.fillText('🙌', w / 2, 210); });
    const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.48), new THREE.MeshStandardMaterial({ map: posterTex, roughness: 0.8 })); poster.position.set(-1.75, 1.75, WZ + 0.02); S.add(poster);
    const clockTex = K.canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#fff'; x.beginPath(); x.arc(64, 64, 60, 0, 7); x.fill(); x.strokeStyle = '#222'; x.lineWidth = 6; x.stroke(); x.lineCap = 'round'; x.beginPath(); x.moveTo(64, 64); x.lineTo(64, 24); x.moveTo(64, 64); x.lineTo(70, 92); x.stroke(); });
    const clock = new THREE.Mesh(new THREE.CircleGeometry(0.16, 32), new THREE.MeshStandardMaterial({ map: clockTex, roughness: 0.6 })); clock.position.set(0.55, 2.1, WZ + 0.02); S.add(clock);
    // Maddie's bench + table (table to his right, under the hover-bot), and background tables
    const benchM = SM(0x3f6f8f, 0.5), legM = SM(0x9aa3ab, 0.3, { metalness: 0.7 }), topM = SM(0xe7e2d6, 0.45);
    rbox(1.1, 0.06, 0.34, benchM, -0.2, 0.5, -0.98, 0.02); [-0.65, 0.25].forEach(x => cyl(0.02, 0.02, 0.48, legM, x, 0.24, -0.98, 8));
    const DY = 0.74;
    rbox(0.8, 0.04, 0.7, topM, 0.45, DY - 0.02, -0.5, 0.015); [[0.1, -0.2], [0.8, -0.2], [0.1, -0.8], [0.8, -0.8]].forEach(([x, z]) => cyl(0.02, 0.02, DY - 0.04, legM, x, (DY - 0.04) / 2, z, 8));
    // lunch tray: steel thali with rice, dal, sabzi, roti + a glass of water
    const tray = new THREE.Group(); tray.position.set(0.48, DY, -0.62); S.add(tray);
    cyl(0.17, 0.16, 0.02, steel, 0, 0.01, 0, 32, tray);
    [[-0.07, 0.05, 0xf7c548], [0.07, 0.05, 0x7aa83a], [0, -0.08, 0xc8752e]].forEach(([x, z, c]) => { cyl(0.045, 0.04, 0.035, steel, x, 0.035, z, 20, tray); const f = new THREE.Mesh(new THREE.CircleGeometry(0.04, 18), SM(c, 0.6)); f.rotation.x = -Math.PI / 2; f.position.set(x, 0.051, z); tray.add(f); });
    const rice = sph(0.05, SM(0xf6f2e8, 0.9), 0.09, 0.03, -0.06, tray); rice.scale.set(1, 0.5, 1);
    const roti = cyl(0.06, 0.06, 0.006, SM(0xd9a35a, 0.8), -0.09, 0.03, -0.06, 24, tray);
    const glass = cyl(0.03, 0.026, 0.1, new THREE.MeshStandardMaterial({ color: 0xdff4ff, roughness: 0.05, transparent: true, opacity: 0.45 }), 0.72, DY + 0.05, -0.35, 18);
    const bgT = (x, z, people) => { rbox(0.9, 0.04, 0.6, topM, x, DY - 0.02, z, 0.015); [[-0.38, -0.25], [0.38, -0.25], [-0.38, 0.25], [0.38, 0.25]].forEach(([dx, dz]) => cyl(0.02, 0.02, DY - 0.04, legM, x + dx, (DY - 0.04) / 2, z + dz, 8));
      rbox(0.9, 0.05, 0.25, benchM, x, 0.46, z - 0.45, 0.02); rbox(0.9, 0.05, 0.25, benchM, x, 0.46, z + 0.45, 0.02);
      people.forEach(([dx, dz, col]) => { const b = new THREE.Group(); b.position.set(x + dx, 0.5, z + dz); S.add(b); const body = cyl(0.13, 0.15, 0.42, SM(col, 0.8), 0, 0.22, 0, 16, b); const hd = sph(0.13, SM(0xd6a07c, 0.6), 0, 0.56, 0, b); const hr = sph(0.135, SM(0x241812, 0.8), 0, 0.6, -0.02, b); hr.scale.set(1, 0.7, 1); }); };
    bgT(-1.55, -1.75, [[-0.2, -0.45, 0xd9534f], [0.25, 0.45, 0x4f7fd9]]); bgT(0.95, -1.75, [[0.2, -0.45, 0x47a36b]]); bgT(-2.0, -0.5, []);
    const lampL0 = null;

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



    // ================= LIGHT (canteen: tube lights + window daylight) =================
    const hemi = new THREE.HemisphereLight(0xf2fff6, 0x8a8070, 1.05); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff6e8, 1.2); key.position.set(1.0, 2.8, 2.2); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xffffff, 0.6); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const tubeL = new THREE.PointLight(0xeafff4, 1.1, 5, 1.4); tubeL.position.set(0.2, 2.4, WZ + 0.6); S.add(tubeL);
    const warm = new THREE.PointLight(0xffd9a8, 0.6, 3, 1.5); warm.position.set(1.2, 1.4, WZ + 0.9); S.add(warm);


    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1, phK = 0; const sm = (a, b, k) => a + (b - a) * k;
    const phLook = [0.05, 0.42], toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const hp = new THREE.Vector3();
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      let mL = toR, face = 'neutral', lean = 0.15, phone = 0;
      if (t < C.WHAT) { mL = toCam; face = 'shock'; lean = 0.05; phone = 0.5; }
      else if (t < C.UP) { mL = toR; face = 'worried'; }
      else if (t < C.FREE) { mL = toR; face = 'neutral'; phone = 0.6; }
      else if (t < C.ATM) { mL = toR; face = 'neutral'; lean = 0.1; }
      else if (t < C.PEOPLE) { mL = t < B('atm') + 1.0 ? phLook : toCam; face = 'worried'; lean = 0.3; phone = 1; }
      else if (t < C.WILD) { mL = toR; face = 'shock'; lean = -0.05; phone = 0.5; }
      else if (t < C.FIFTY) { mL = phLook; face = 'worried'; lean = 0.35; phone = 1; }
      else if (t < C.PERSONA) { mL = toR; face = 'shock'; lean = -0.1; }
      else if (t < C.BROKE) { mL = phLook; face = 'smile'; lean = 0.2; phone = 1; }
      else if (t < C.FAIR) { mL = toR; face = 'shock'; lean = -0.12; }
      else if (t < C.ALSO) { mL = t < B('fair') + 0.5 ? toR : toCam; face = t < B('fair') + 0.5 ? 'shock' : 'worried'; lean = 0.2; }
      else if (t < C.FRIENDS) { mL = toR; face = 'neutral'; lean = 0.15; }
      else if (t < C.CTA) { mL = phLook; face = 'smile'; lean = 0.25; phone = 1; }
      else { mL = toCam; face = 'smile'; lean = 0; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k); phK = sm(phK, phone, k * 0.8);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type: 0, lean });
      const [aL, aR] = M.arms;
      aR.sh.rotation.set(-0.3 - phK * 0.15, -0.15 - phK * 0.15, 0.05); aR.el.rotation.set(-0.15 - phK * 0.35, 0, 0);
      aL.sh.rotation.set(-0.3 - phK * 0.12, 0.15 + phK * 0.08, -0.05); aL.el.rotation.set(-0.1 - phK * 0.3, 0, 0);
      M.arms[1].hand.getWorldPosition(hp); phL.position.set(hp.x - 0.02, hp.y + 0.12, hp.z + 0.05); phL.intensity = 0.02 + phK * 0.05;
      phScr.material.color.setHex(phK > 0.3 ? 0x7fb89c : 0x45584f);
      let rL = [-0.15, 0.05];
      const explain = (t >= C.FREE && t < C.ATM) || (t >= C.PEOPLE && t < C.WILD) || (t >= C.FIFTY && t < C.PERSONA) || (t >= C.ALSO && t < C.FRIENDS) || t >= C.CTA;
      if (explain) rL = [0.42, 0.02];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      const mood = (t >= C.BROKE && t < C.ALSO) || t >= C.FRIENDS ? 'smile' : (t >= C.PEOPLE && t < C.WILD) ? 'flat' : 'calm';
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      steam.forEach(o => { const p = ((t * 0.35 + o.ph) % 1); o.s.position.set(o.x + Math.sin(o.ph * 5 + t) * 0.03, 1.25 + p * 0.45, WZ + 0.35); o.s.scale.setScalar(0.08 + p * 0.18); o.s.material.opacity = 0.3 * Math.sin(p * Math.PI); });
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
      [C.HOOK, C.WHAT, sh.est], [C.WHAT, C.UP, sh.robo], [C.UP, C.FREE, sh.mad], [C.FREE, C.ATM, sh.two], [C.ATM, C.PEOPLE, sh.wait], [C.PEOPLE, C.WILD, sh.robL],
      [C.WILD, C.FIFTY, sh.side], [C.FIFTY, C.PERSONA, sh.robo], [C.PERSONA, C.BROKE, sh.mad], [C.BROKE, C.FAIR, sh.robL], [C.FAIR, C.ALSO, sh.wait],
      [C.ALSO, C.FRIENDS, sh.pair], [C.FRIENDS, C.CTA, sh.mad], [C.CTA, D + 5, sh.cta],
    ];
    const SHAKE = [C.ATM, C.WILD, C.BROKE];
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
        const MO = [['Jun', 1063], ['Jul', 50328], ['Aug', 28275], ['Sep', 16780], ['Oct', 26839], ['Nov', 13322]], jul = t >= B('fifty') + 0.4;
        MO.forEach(([m, v], i) => { const y = SY + 230 + i * 62, g = eo(pr(t, C.EVERY + 0.15 + i * 0.12, C.EVERY + 0.75 + i * 0.12)), hi = i === 1 && jul;
          ft(m, SX + 34, y, 24, hi ? GRN : FOG, 700); rr(SX + 100, y - 11, SW - 260, 22, 11, MINT2); rr(SX + 100, y - 11, (SW - 260) * (v / 50328) * g, 22, 11, hi ? GRN : BAR);
          ft('₹' + inr(v * g), SX + SW - 34, y, 22, hi ? GRN : INKD, 700, 'right'); if (hi) { const cp = pop(t, B('fifty') + 0.4, 0.4); scaleAt(SX + SW - 10, y - 30, cp, () => txt('👑', SX + SW - 10, y - 30, 40, '#000', 400, 'center')); } });
        if (jul) { const a = fin(t, B('fifty') + 0.7, 0.3); h.save(); h.globalAlpha = a; rr(SX + 34, SY + 615, SW - 68, 64, 18, 'rgba(245,165,36,0.16)'); ft('👑 Highest: Jul 2026 (₹50,328)', SX + SW / 2, SY + 648, 23, INKD, 700, 'center'); h.restore(); } },
      cats: (t, k) => { appBar(t); ft('📊 Where it all went', SX + 34, SY + 160, 34, INKD, 700);
        const CA = [['👥', 'Money to people', '₹1.2L', 0.89, GRN], ['🏪', 'Other shops', '₹7.1K', 0.05, BAR], ['🍽️', 'Eating out', '₹3.5K', 0.03, BAR], ['💡', 'Bills & recharges', '₹3K', 0.02, BAR]];
        CA.forEach(([e, n, v, p, col], i) => { const y = SY + 245 + i * 98, g = eo(pr(t, C.PEOPLE + 0.15 + i * 0.12, C.PEOPLE + 0.8 + i * 0.12)), big = i === 0;
          txt(e, SX + 50, y, 28, '#000', 400, 'center'); ft(n, SX + 80, y - 4, big ? 25 : 22, INKD, 700); ft(v, SX + SW - 34, y - 4, 24, big ? GRN : INKD, 700, 'right');
          rr(SX + 80, y + 22, SW - 120, 14, 7, MINT2); rr(SX + 80, y + 22, (SW - 120) * p * g, 14, 7, col); txt(Math.round(p * 100 * g) + '%', SX + SW - 34, y + 50, 18, FOG, 700, 'right'); });
        if (t >= B('people') + 0.9) stamp('89%', SX + SW - 70, SY + 640, 46, GRN, B('people') + 0.9, t, -0.1, 'rgba(240,247,243,0.9)'); },
      small: (t, k) => { appBar(t); ft('🪙 Small spends add up', SX + 34, SY + 160, 32, INKD, 700); txt('35 payments under ₹100', SX + 34, SY + 215, 23, FOG, 600);
        ft('₹' + inr(lerp(0, 1110, eo(pr(t, B('tiny') + 0.3, B('tiny') + 1.4)))), SX + 34, SY + 290, 72, GRN, 700);
        for (let i = 0; i < 35; i++) { const r = pop(t, B('tiny') + 0.2 + i * 0.04, 0.25); if (r <= 0) continue; const x = SX + 62 + (i % 7) * 62, y = SY + 395 + Math.floor(i / 7) * 62; scaleAt(x, y, r, () => txt(i % 3 ? '☕' : '🫖', x, y, 38, '#000', 400, 'center')); }
        txt('tea, snacks, auto… one tiny payment at a time', SX + SW / 2, SY + 715, 18, FOG, 600, 'center'); },
      roast: (t, k) => { appBar(t); ft('🔥 Roast my spending', SX + 34, SY + 160, 32, INKD, 700);
        const a = fin(t, C.ATM + 0.1, 0.35); h.save(); h.globalAlpha = a; rr(SX + 34, SY + 210, SW - 68, 190, 20, 'rgba(229,72,77,0.10)'); rr(SX + 34, SY + 210, 7, 190, 3, RED);
        ['89% of your money went', 'to other people.', 'You\'re basically', 'everyone\'s ATM. 🏧'].forEach((l, i) => ft(l, SX + 60, SY + 250 + i * 44, 26, INKD, 700)); h.restore();
        const b = pop(t, B('atm') + 0.9, 0.45); if (b > 0) scaleAt(SX + SW / 2, SY + 560, b, () => { rr(SX + 34, SY + 440, SW - 68, 240, 26, 'rgba(11,143,104,0.12)'); txt('Your money personality', SX + SW / 2, SY + 480, 20, FOG, 600, 'center'); txt('👥', SX + SW / 2, SY + 555, 66, '#000', 400, 'center'); ft('The Generous One', SX + SW / 2, SY + 635, 36, GRN, 700, 'center'); }); },
      limit: (t, k) => { appBar(t); ft('📌 Nov 2026 so far', SX + 34, SY + 160, 34, INKD, 700);
        const g = eo(pr(t, B('also') + 0.4, B('also') + 1.8)), used = 13322 * g, pct = used / 15000;
        rr(SX + 34, SY + 220, SW - 68, 230, 22, WH); txt('Total this month', SX + 60, SY + 262, 22, FOG, 600); ft('₹' + inr(used) + ' / ₹15,000', SX + SW - 60, SY + 262, 24, INKD, 700, 'right');
        rr(SX + 60, SY + 300, SW - 120, 30, 15, MINT2); rr(SX + 60, SY + 300, (SW - 120) * pct, 30, 15, pct > 0.8 ? GOLD : GRN);
        ft('monthly limit', SX + 60, SY + 370, 22, GRN, 700); txt(Math.round(pct * 100) + '% used', SX + SW - 60, SY + 370, 22, FOG, 700, 'right');
        if (pct > 0.8) { const a = pop(t, B('also') + 1.3, 0.4); scaleAt(SX + SW / 2, SY + 530, a, () => { rr(SX + 34, SY + 480, SW - 68, 100, 20, 'rgba(229,72,77,0.12)'); h.strokeStyle = 'rgba(229,72,77,0.5)'; h.lineWidth = 3; h.beginPath(); h.roundRect(SX + 34, SY + 480, SW - 68, 100, 20); h.stroke();
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
    const roastCard = (t, t0, lines, y = 470) => { const a = pop(t, t0, 0.45); if (a <= 0) return; scaleAt(540, y, a, () => {
        h.save(); h.shadowColor = 'rgba(255,90,60,0.8)'; h.shadowBlur = 50; rr(110, y - 170, 860, 340, 40, 'rgba(255,240,236,0.97)'); h.restore(); h.strokeStyle = RED; h.lineWidth = 5; h.beginPath(); h.roundRect(110, y - 170, 860, 340, 40); h.stroke();
        chip('🔥 ROAST', 540, y - 165, 32, RED, WH, 1, 1, 800); lines.forEach((l, i) => ft(l, 540, y - 60 + i * 72 - (lines.length - 2) * 36, 52, INKD, 700, 'center')); });
      const n = Math.floor((t - t0) * 9); for (let i = 0; i < 6; i++) { const ang = i * 1.05 + 0.3, r2 = 120 + ((t - t0) * 600) % 260; const fa = cl(1 - (t - t0) / 1.2); if (fa > 0) txt('🔥', 540 + Math.cos(ang) * (300 + r2 * 0.6), y + Math.sin(ang) * (150 + r2 * 0.3), 48, '#000', 400, 'center', fa); } };
    const drawHook = t => { if (t >= C.UP) return;
      chip('🔥 ROASTED BY A WEBSITE', 540, 230, 36, RED, WH, fin(t, 0.15, 0.3), pop(t, 0.15, 0.4), 800);
      const a = pop(t, 0.5, 0.45); if (a > 0) scaleAt(540, 430, a, () => { wcard(240, 320, 600, 220, 34, 'rgba(255,110,80,0.7)'); txt('😭', 340, 430, 90, '#000', 400, 'center'); ft('a website', 430, 400, 40, FOG, 700); ft('roasted me', 430, 460, 52, RED, 700); });
      if (t >= C.WHAT) chip('what did you do? 🤨', 540, 650, 36, 'rgba(240,247,243,0.95)', INKD, fin(t, B('what') + 0.2, 0.2), pop(t, B('what') + 0.2, 0.3), 800); };
    const upA = t => t < C.UP - 0.05 || t >= C.FREE + 0.2 ? 0 : t < C.FREE ? eb(pr(t, C.UP - 0.05, C.UP + 0.35)) : 1 - ei(pr(t, C.FREE, C.FREE + 0.2));
    const drawUp = t => { const a = upA(t); if (a <= 0) return; drawPhoneFrame(t, a, SCR.home);
      const k = eo(pr(t, B('upload') + 0.3, B('upload') + 1.2)); h.save(); h.globalAlpha = a * (1 - pr(t, B('upload') + 1.6, B('upload') + 1.9)); const x = lerp(860, 600, k), y = lerp(330, 640, k);
      rr(x - 70, y - 85, 140, 170, 14, WH); rr(x - 70, y - 85, 140, 44, 14, RED); ft('PDF', x, y - 62, 26, WH, 800, 'center'); for (let i = 0; i < 4; i++) rr(x - 50, y - 20 + i * 22, 100 - (i % 2) * 30, 10, 5, MINT2); txt('bank statement', x, y + 100, 22, INKD, 700, 'center'); h.restore(); };
    const drawFree = t => { if (t < C.FREE || t >= C.ATM + 0.2) return; const out = 1 - pr(t, C.ATM, C.ATM + 0.2);
      h.save(); h.globalAlpha = out; const a = pop(t, C.FREE + 0.05, 0.45);
      scaleAt(540, 460, a, () => { wcard(150, 300, 780, 330, 40); txt('📱', 290, 440, 110, '#000', 400, 'center'); ft('read on your phone', 380, 410, 40, INKD, 700); ft('🔒 nothing is saved', 380, 475, 40, GRN, 700); ft('no upload · no login', 380, 535, 30, FOG, 700); });
      if (t >= B('free') + 0.25) stamp('FREE  ₹0', 540, 720, 64, GRN, B('free') + 0.25, t, -0.06, 'rgba(240,247,243,0.97)'); h.restore(); };
    const drawAtm = t => { if (t < C.ATM || t >= C.PEOPLE) return; roastCard(t, B('atm') + 0.9, ['"You\'re basically', 'everyone\'s ATM." 🏧']); };
    const drawPeople = t => { if (t < C.PEOPLE - 0.05 || t >= C.WILD) return; drawPhoneFrame(t, eb(pr(t, C.PEOPLE - 0.05, C.PEOPLE + 0.35)), SCR.cats); };
    const drawWild = t => { if (t < C.WILD || t >= C.FIFTY) return; roastCard(t, B('wild') + 1.1, ['"Jul was wild:', '₹50,328 gone', 'in one month."'], 480); };
    const drawFifty = t => { if (t < C.FIFTY - 0.05 || t >= C.PERSONA) return; drawPhoneFrame(t, eb(pr(t, C.FIFTY - 0.05, C.FIFTY + 0.35)), SCR.months); };
    const drawPersona = t => { if (t < C.PERSONA || t >= C.ALSO) return; const a = pop(t, B('persona') + 1.3, 0.5);
      if (a > 0) scaleAt(540, 470, a, () => { h.save(); h.shadowColor = 'rgba(80,230,170,0.8)'; h.shadowBlur = 50; rr(170, 290, 740, 380, 44, 'rgba(240,247,243,0.97)'); h.restore();
        txt('Your money personality', 540, 345, 30, FOG, 700, 'center', 1, FR); txt('👥', 540, 450, 120, '#000', 400, 'center'); ft('The Generous One', 540, 580, 62, GRN, 700, 'center'); });
      if (t >= B('broke') + 0.9) stamp('= BROKE 💀', 540, 760, 64, RED, B('broke') + 0.9, t, -0.1, 'rgba(240,247,243,0.97)');
      if (t >= B('fair') + 0.6) chip('…okay, fair 🫠', 540, 900, 38, 'rgba(240,247,243,0.95)', INKD, fin(t, B('fair') + 0.6, 0.2), pop(t, B('fair') + 0.6, 0.3), 800); };
    const drawAlso = t => { if (t < C.ALSO - 0.05 || t >= C.FRIENDS + 0.2) return; const a = t < C.FRIENDS ? eb(pr(t, C.ALSO - 0.05, C.ALSO + 0.35)) : 1 - ei(pr(t, C.FRIENDS, C.FRIENDS + 0.2));
      const sh2 = B('also'); drawPhoneFrame(t, a, t < sh2 + 1.6 ? (() => SCR.months(C.FIFTY + 3)) : SCR.limit);
      ['📅 every month', '💳 every payment', '⚠️ limit alerts'].forEach((s, i) => chip(s, [250, 540, 830][i], 960, 27, 'rgba(240,247,243,0.95)', INKD, fin(t, sh2 + 0.3 + i * 0.9, 0.2), pop(t, sh2 + 0.3 + i * 0.9, 0.3), 700)); };
    const drawFriends = t => { if (t < C.FRIENDS || t >= C.CTA + 0.2) return; const out = 1 - pr(t, C.CTA, C.CTA + 0.2);
      h.save(); h.globalAlpha = out; const a = pop(t, C.FRIENDS + 0.05, 0.45);
      scaleAt(540, 480, a, () => { h.save(); h.translate(540, 480); h.rotate(-0.05); h.translate(-540, -480);
        const g = h.createLinearGradient(330, 240, 750, 720); g.addColorStop(0, '#fff1f1'); g.addColorStop(1, '#e3f3ea'); h.fillStyle = g; h.shadowColor = 'rgba(0,0,0,0.3)'; h.shadowBlur = 30; h.beginPath(); h.roundRect(330, 240, 420, 480, 30); h.fill(); h.shadowBlur = 0;
        pin(540, 300, 1.1); ft('roasted my own spending', 540, 350, 26, FOG, 700, 'center'); txt('🔥', 540, 440, 90, '#000', 400, 'center');
        rr(360, 500, 360, 60, 14, 'rgba(229,72,77,0.12)'); ft('everyone\'s ATM 🏧', 540, 531, 28, INKD, 700, 'center'); rr(360, 575, 360, 60, 14, 'rgba(229,72,77,0.12)'); ft('July was wild', 540, 606, 28, INKD, 700, 'center');
        ft('paisamap.online', 540, 685, 24, GRN, 700, 'center'); h.restore(); });
      chip('📲 sending to the group chat', 540, 820, 34, GRN, WH, fin(t, B('friends') + 0.8, 0.2), pop(t, B('friends') + 0.8, 0.3), 800); h.restore(); };
    const drawCta = t => { if (t < C.CTA) return;
      const a = pop(t, C.CTA + 0.05, 0.45); scaleAt(540, 470, a, () => { wcard(110, 230, 860, 560, 44, 'rgba(255,120,90,0.9)');
        chip('🔥 GET ROASTED FOR FREE', 540, 290, 32, RED, WH, 1, 1, 800); pin(540, 365, 2.0); ft('paisamap.online', 540, 450, 66, INKD, 700, 'center'); ft('see where your money went 📍', 540, 515, 34, FOG, 700, 'center');
        const pl = 1 + 0.04 * Math.sin(t * 7) * fin(t, B('cta') + 0.4, 0.3); scaleAt(540, 625, pl, () => { h.save(); h.shadowColor = 'rgba(11,143,104,0.7)'; h.shadowBlur = 30; rr(170, 575, 740, 100, 50, GRN); h.restore();
          ft('💬 Comment', 420, 627, 44, WH, 700, 'center'); ft('PAISA', 710, 627, 56, WH, 800, 'center'); });
        txt('🔒 nothing uploaded · nothing saved', 540, 730, 28, FOG, 700, 'center', fin(t, B('cta') + 0.8, 0.3), FR); }); };


    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,10,0.22)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.ATM, C.WILD, C.CTA];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.18) a = Math.max(a, 1 - d / 0.18); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawHook(t); drawUp(t); drawFree(t); drawAtm(t); drawPeople(t); drawWild(t); drawFifty(t); drawPersona(t); drawAlso(t); drawFriends(t); drawCta(t);
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.55})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.25); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, '#5fe0b0'); g.addColorStop(1, GRN); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); placeHud(t); hudDraw(t); };



    // ================= SOUND =================
    const sfx = [];
    sfx.push(['pop', 0.15, 0.3], ['zap', 0.5, 0.2], ['pop', 0.5, 0.35], ['boing', B('what') + 0.2, 0.25]);
    sfx.push(['whoosh', C.UP, 0.25], ['pop', C.UP + 0.1, 0.3], ['rustle', B('upload') + 0.3, 0.3]);
    sfx.push(['whoosh', C.FREE, 0.25], ['ding', C.FREE + 0.1, 0.3], ['kaching', B('free') + 0.25, 0.35]);
    sfx.push(['bass', C.ATM, 0.4], ['zap', B('atm') + 0.9, 0.25], ['crunch', B('atm') + 0.9, 0.3], ['whoosh', C.PEOPLE, 0.25], ['thud', B('people') + 0.9, 0.3]);
    sfx.push(['bass', C.WILD, 0.4], ['zap', B('wild') + 1.1, 0.25], ['crunch', B('wild') + 1.1, 0.3], ['whoosh', C.FIFTY, 0.25], ['chime', B('fifty') + 0.4, 0.35]);
    sfx.push(['riser', B('persona') + 0.6, 0.25], ['chime', B('persona') + 1.3, 0.35], ['buzz', B('broke') + 0.9, 0.15], ['thud', B('broke') + 0.9, 0.35], ['boing', B('fair') + 0.6, 0.25]);
    sfx.push(['whoosh', C.ALSO, 0.25]); [0, 1, 2].forEach(i => sfx.push(['ding', B('also') + 0.3 + i * 0.9, 0.2])); sfx.push(['beep', B('also') + 3.0, 0.2]);
    sfx.push(['whoosh', C.FRIENDS, 0.25], ['pop', C.FRIENDS + 0.05, 0.3], ['pop', B('friends') + 0.8, 0.3], ['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.4, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
