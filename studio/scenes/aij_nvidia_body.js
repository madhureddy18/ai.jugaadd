/* @maddiee.makess reel 17 — "How Nvidia's CEO lost his job in 2 weeks". Straight news explainer, no jokes (Maddie asks, Claude explains).
   Facts as reported by 14 Nov 2026. Spy claim shown as ALLEGED, secrets as NOT PROVEN; candidate odds dated (Kalshi, 12 Nov). No photos of
   real people — initials only. Cinematic style (DOF, haze, teal/orange grade, serif captions, dark app panel with tabs).
   NEW LOCATION: a Hyderabad Metro coach at night — long bench, big windows with city lights + track pillars streaking past,
   LED strip lights, grab handles swaying, steel poles, route map strip + "NEXT STATION" LED board. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x0b0d10, fog: null, fov: 38, bloom: null },
  lines: window.JR_LINES,

  build(K, T) {
    const L = T.lines;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[IX(id)].t, E = id => L[IX(id)].end, at = (id, f) => B(id) + f * (E(id) - B(id));
    const D = E('c12') + 1.8;
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
    const noDepth = [];

    // ================= TIMELINE =================
    const SCR = [['hook', B('c1') - 0.1], ['timeline', B('c2') - 0.1], ['proof', B('c6') - 0.1], ['stock', B('c8') - 0.1], ['interim', B('c9') - 0.1], ['next', B('c10') - 0.1]];
    const PON = [[B('c1') - 0.1, B('m2') - 0.15], [B('c6') - 0.1, B('m3') - 0.15], [B('c8') - 0.1, B('m4') - 0.15], [B('c9') - 0.1, B('m5') - 0.15], [B('c10') - 0.1, B('m6') - 0.15]];
    const panelOn = t => PON.some(([a, b]) => t >= a && t < b);
    const scrAt = t => { let k = 0; SCR.forEach((s, i) => { if (t >= s[1]) k = i; }); return k; };
    const TABS = ['THE NEWS', 'TIMELINE', 'PROOF?', 'STOCK', "WHO'S NEXT"], TI = { hook: 0, timeline: 1, proof: 2, stock: 3, interim: 4, next: 4 };

    // ================= THE METRO COACH (night) =================
    const BZ = -1.42;   // the window wall behind the bench
    const panelTex = K.canvasTex(512, 256, (x, w, h) => { x.fillStyle = '#d9dcd8'; x.fillRect(0, 0, w, h); const r = K.rng(3); for (let i = 0; i < 300; i++) { x.fillStyle = `rgba(80,90,90,${r() * 0.05})`; x.fillRect(r() * w, r() * h, 2 + r() * 20, 1 + r() * 3); }
      x.strokeStyle = 'rgba(60,70,70,0.25)'; x.lineWidth = 2; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 128, 0); x.lineTo(i * 128, h); x.stroke(); } });
    panelTex.wrapS = THREE.RepeatWrapping; panelTex.repeat.set(3, 1);
    const wallM = SM(0x9ea4a2, 0.55, { map: panelTex });
    // window wall = lower panel + upper panel + window band (y 0.95..1.78) with pillars between windows
    const WY0 = 0.95, WY1 = 1.8;
    plane(7, WY0, wallM, 0, WY0 / 2, BZ); plane(7, 2.9 - WY1, wallM, 0, WY1 + (2.9 - WY1) / 2, BZ);
    rbox(7, 0.06, 0.05, SM(0x1f7a8c, 0.5), 0, WY0 - 0.05, BZ + 0.02, 0.01);   // teal accent stripe
    const WINS = [-2.1, -0.7, 0.7, 2.1];
    // outside: night city + track pillars, streaking past (one canvas, scrolled)
    const outC = document.createElement('canvas'); outC.width = 1024; outC.height = 256; const ox = outC.getContext('2d'); const outTex = new THREE.CanvasTexture(outC); outTex.colorSpace = THREE.SRGBColorSpace;
    const lights = []; { const r = K.rng(41); for (let i = 0; i < 120; i++) lights.push([r() * 4000, 40 + r() * 200, 2 + r() * 9, r() < 0.72 ? [255, 160 + r() * 70, 80] : [130, 190, 255], 0.3 + r() * 0.6, 0.35 + r() * 0.8]); }
    const drawOut = t => { const x = ox; const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#05070d'); g.addColorStop(0.7, '#0f1424'); g.addColorStop(1, '#2a1f24'); x.fillStyle = g; x.fillRect(0, 0, 1024, 256);
      const v = 520;   // px per second
      lights.forEach(([lx, ly, r0, c, a, depth]) => { const px = ((lx - t * v * depth) % 4000 + 4000) % 4000 - 1500; if (px < -60 || px > 1084) return; const len = 26 + depth * 70;
        const gg = x.createLinearGradient(px, 0, px + len, 0); gg.addColorStop(0, `rgba(${c[0]},${c[1] | 0},${c[2]},0)`); gg.addColorStop(0.7, `rgba(${c[0]},${c[1] | 0},${c[2]},${a})`); gg.addColorStop(1, `rgba(${c[0]},${c[1] | 0},${c[2]},0)`); x.fillStyle = gg; x.fillRect(px, ly - r0 / 2, len, r0); });
      for (let i = 0; i < 3; i++) { const px = ((1300 * i + 400 - t * v * 2.4) % 3900 + 3900) % 3900 - 1400; if (px > -200 && px < 1100) { x.fillStyle = 'rgba(8,8,10,0.92)'; x.fillRect(px, 0, 150, 256); } }   // track pillars whoosh by
      outTex.needsUpdate = true; };
    const outM = new THREE.MeshBasicMaterial({ map: outTex, toneMapped: false });
    WINS.forEach((wx, i) => { const m = plane(1.2, WY1 - WY0, outM, wx, (WY0 + WY1) / 2, BZ - 0.02); m.material = outM;
      const fr = SM(0x9aa3a6, 0.35, { metalness: 0.6 }); rbox(1.26, 0.04, 0.05, fr, wx, WY1, BZ + 0.01); rbox(1.26, 0.04, 0.06, fr, wx, WY0 + 0.01, BZ + 0.02); [-1, 1].forEach(s => rbox(0.04, WY1 - WY0, 0.05, fr, wx + s * 0.62, (WY0 + WY1) / 2, BZ + 0.01));
      const ref = plane(1.2, WY1 - WY0, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.05, toneMapped: false, depthWrite: false }), wx, (WY0 + WY1) / 2, BZ + 0.005); noDepth.push(ref); });
    [-1.4, 0, 1.4].forEach(x => plane(0.16, WY1 - WY0, wallM, x, (WY0 + WY1) / 2, BZ));
    plane(0.4, WY1 - WY0, wallM, -2.9, (WY0 + WY1) / 2, BZ); plane(0.4, WY1 - WY0, wallM, 2.9, (WY0 + WY1) / 2, BZ);
    // route map strip above the windows + the LED "next station" board
    const routeTex = K.canvasTex(2048, 96, (x, w, h) => { x.fillStyle = '#f2f2ee'; x.fillRect(0, 0, w, h); x.fillStyle = '#d23a3a'; x.fillRect(60, 40, w - 120, 10);
      const ST = ['Miyapur', 'JNTU College', 'KPHB Colony', 'Kukatpally', 'Balanagar', 'Moosapet', 'Bharat Nagar', 'Erragadda', 'ESI Hospital', 'S.R. Nagar', 'Ameerpet', 'Punjagutta', 'Irrum Manzil', 'Khairatabad', 'Lakdikapul'];
      ST.forEach((s, i) => { const px = 60 + i * (w - 120) / (ST.length - 1); x.fillStyle = s === 'Ameerpet' ? '#ff7a2e' : '#fff'; x.strokeStyle = '#d23a3a'; x.lineWidth = 5; x.beginPath(); x.arc(px, 45, s === 'Ameerpet' ? 15 : 10, 0, 7); x.fill(); x.stroke(); x.fillStyle = '#2a2a2a'; x.font = '700 20px "Inter Display"'; x.textAlign = 'center'; x.fillText(s, px, 84); }); });
    plane(5.6, 0.26, SM(0xffffff, 0.6, { map: routeTex }), 0, 2.02, BZ + 0.01);
    const ledC = document.createElement('canvas'); ledC.width = 512; ledC.height = 64; const lx2 = ledC.getContext('2d'); const ledTex = new THREE.CanvasTexture(ledC); ledTex.colorSpace = THREE.SRGBColorSpace;
    const drawLED = t => { const x = lx2; x.fillStyle = '#0a0a0a'; x.fillRect(0, 0, 512, 64); x.font = '700 34px "Courier Prime"'; x.fillStyle = '#ff8a2e'; x.textBaseline = 'middle'; const s = 'NEXT STATION: AMEERPET  ·  అమీర్‌పేట్  ·  NEXT STATION: AMEERPET  ·  ';
      const wv = x.measureText(s).width; const off = (t * 70) % wv; x.fillText(s, -off, 34); x.fillText(s, wv - off, 34); x.fillStyle = 'rgba(0,0,0,0.35)'; for (let i = 0; i < 64; i += 4) x.fillRect(0, i, 512, 1); ledTex.needsUpdate = true; };
    rbox(1.3, 0.2, 0.06, SM(0x222326, 0.4), 0.6, 2.36, BZ + 0.05, 0.02); plane(1.2, 0.15, new THREE.MeshBasicMaterial({ map: ledTex, toneMapped: false }), 0.6, 2.36, BZ + 0.085);
    // long bench (steel + blue seat pads)
    const SY = 0.46, BCZ = -1.12;
    rbox(6.2, 0.06, 0.48, SM(0x3a6fb0, 0.45), 0, SY - 0.03, BCZ, 0.02);
    rbox(6.2, 0.36, 0.05, SM(0x3a6fb0, 0.45), 0, SY + 0.2, BZ + 0.06, 0.02);
    rbox(6.2, SY - 0.06, 0.4, SM(0xa9b0b3, 0.35, { metalness: 0.6 }), 0, (SY - 0.06) / 2, BCZ - 0.03, 0.01);
    [-1.75, 1.6].forEach(x => rbox(0.06, 0.36, 0.48, SM(0xa9b0b3, 0.3, { metalness: 0.7 }), x, SY + 0.18, BCZ, 0.02));   // seat dividers
    // floor + ceiling + LED strips + grab rail with hanging handles + steel poles
    const flTex = K.canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#54585b'; x.fillRect(0, 0, w, h); const r = K.rng(7); for (let i = 0; i < 2500; i++) { const c = 60 + r() * 70; x.fillStyle = `rgba(${c},${c + 3},${c + 6},0.5)`; x.fillRect(r() * w, r() * h, 2, 2); } x.fillStyle = 'rgba(255,200,40,0.6)'; x.fillRect(0, h * 0.2, w, 10); });
    flTex.wrapS = flTex.wrapT = THREE.RepeatWrapping; flTex.repeat.set(4, 2);
    const fl = plane(7, 6, SM(0xffffff, 0.5, { map: flTex }), 0, 0, 1.5); fl.rotation.x = -Math.PI / 2;
    const ce = plane(7, 6, SM(0xcfd3d2, 0.6), 0, 2.85, 1.5); ce.rotation.x = Math.PI / 2;
    [-0.6, 0.9].forEach(z => { const s = rbox(7, 0.03, 0.12, BM(0xeaf2ff), 0, 2.82, z, 0.01); noDepth.push(s); });
    const railY = 2.3, railZ = -0.35;
    const rail = cyl(0.018, 0.018, 7, SM(0xc7cdd0, 0.25, { metalness: 0.8 }), 0, railY, railZ, 10); rail.rotation.z = Math.PI / 2;
    const handles = []; for (let i = -6; i <= 6; i++) { const g = new THREE.Group(); g.position.set(i * 0.42 + 0.1, railY, railZ); S.add(g);
      rbox(0.04, 0.22, 0.012, SM(0x2b2d31, 0.5), 0, -0.12, 0, 0.006, g); const ring = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 8, 20), SM(0xe8e8e2, 0.4)); ring.position.y = -0.28; ring.castShadow = true; g.add(ring); handles.push(g); }
    const poleM = SM(0xd6dadc, 0.2, { metalness: 0.85 }); [-2.0, 1.75].forEach(x => cyl(0.022, 0.022, 2.85, poleM, x, 1.425, -0.6, 14));

    // ================= CHARACTERS =================
    const MX = -0.38, MZ = -0.98;

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
    const RX = 0.48, RY = 0.95, RZ = -0.88;
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


    // ================= LIGHT (cool LED ceiling, warm city light sweeping through the windows) =================
    S.fog = new THREE.FogExp2(0x12161c, 0.06);
    const hemi = new THREE.HemisphereLight(0xb8c8e0, 0x2a2622, 0.3); S.add(hemi);
    const top = new THREE.DirectionalLight(0xdfeaff, 0.65); top.position.set(0.4, 3.4, 1.4); top.target.position.set(0, 0.8, -0.8); top.castShadow = true; top.shadow.mapSize.set(2048, 2048); top.shadow.bias = -0.0008;
    top.shadow.camera.left = -3; top.shadow.camera.right = 3; top.shadow.camera.top = 3; top.shadow.camera.bottom = -3; S.add(top); S.add(top.target);
    const keyW = new THREE.SpotLight(0xffc89c, 2.0, 7, 0.55, 0.7, 1.2); keyW.position.set(-1.2, 2.2, 1.8); keyW.target.position.set(0.0, 1.0, -0.9); S.add(keyW); S.add(keyW.target);
    const fill = new THREE.PointLight(0xe8ecff, 0.6, 5, 1.4); fill.position.set(0.7, 1.45, 1.6); S.add(fill);
    const sweep = new THREE.PointLight(0xffa25a, 0.0, 4.2, 1.4); sweep.position.set(0, 1.4, BZ - 0.4); S.add(sweep);   // street lights passing outside
    const panelL = new THREE.PointLight(0xffa060, 0.0, 3.5, 1.4); panelL.position.set(0.1, 2.3, 0.9); S.add(panelL);

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


    const NVG = '#76b900', AMB = '#ffb02e', BLUG = '#8fa8c8';
    const wrap = (c, s, x, y, maxW, lh, size, col, wgt = 700, font = SANS) => { c.font = `${wgt} ${size}px ${font}`; c.fillStyle = col; c.textAlign = 'left'; c.textBaseline = 'middle'; const words = s.split(' '); let line = '', yy = y;
      words.forEach(w => { const tst = line ? line + ' ' + w : w; if (c.measureText(tst).width > maxW && line) { c.fillText(line, x, yy); line = w; yy += lh; } else line = tst; }); if (line) c.fillText(line, x, yy); return yy; };
    const pill = (c, s, x, y, col, txtCol = INK, size = 18) => { c.font = `900 ${size}px ${SANS}`; const w = c.measureText(s).width + 28; rr(c, x, y - size * 0.85, w, size * 1.7, size * 0.85, col); txt(c, s, x + w / 2, y + 1, size, txtCol, 900); return w; };
    const ini = (c, s, x, y, r, col) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); txt(c, s, x, y + 2, r * 0.8, INK, 900, 'center', SERIF); };

    // ---------- THE NEWS: 33 years → 2 weeks ----------
    const drawHook = (c, t) => { bg(c);
      pill(c, 'BREAKING · NOV 12, 2026', 40, 50, RED, '#fff', 20);
      const n = Math.round(33 * eo(pr(t, B('c1'), at('c1', 0.55))));
      txt(c, `${n} YEARS`, CW / 2, 190, 128, CRM, 900, 'center', SERIF); txt(c, "running Nvidia", CW / 2, 280, 30, MUT, 700);
      const k2 = pop(t, at('c1', 0.5), 0.4); if (k2 > 0) { c.save(); c.globalAlpha = cl(k2); txt(c, '↓', CW / 2, 352, 54, MUT, 700); c.translate(CW / 2, 470); c.scale(k2, k2); txt(c, '2 WEEKS', 0, 0, 128, ORG, 900, 'center', SERIF); c.restore(); txt(c, 'to lose it', CW / 2, 562, 30, MUT, 700); }
      const k3 = pr(t, at('c1', 0.6), E('c1')); if (k3 > 0) { c.strokeStyle = '#3a3229'; c.lineWidth = 6; c.beginPath(); c.moveTo(200, 640); c.lineTo(808, 640); c.stroke(); c.strokeStyle = ORG; c.beginPath(); c.moveTo(200, 640); c.lineTo(lerp(200, 808, eo(k3)), 640); c.stroke();
        [['OCT 29', 200], ['NOV 12', 808]].forEach(([s, x]) => { c.fillStyle = ORG; c.beginPath(); c.arc(x, 640, 12, 0, 7); c.fill(); txt(c, s, x, 676, 20, CRM, 800); }); }
      return [CW / 2, 330]; };
    // ---------- TIMELINE: four dated cards with source tags ----------
    const TL = [['c2', 'OCT 29', 'NYT reports his relationship with a woman described as a Chinese intelligence asset.', 'ALLEGED', AMB, 'New York Times'],
      ['c3', 'NOV 8', 'Emails all staff: admits an affair and apologises. Board opens an investigation.', 'CONFIRMED', GRN, 'Nvidia staff email'],
      ['c4', 'NOV 11', 'Reports of a second affair, with an Nvidia employee.', 'REPORTED', BLUG, 'Reuters · NYT'],
      ['c5', 'NOV 12', 'Resigns as CEO, president and board member. Effective immediately.', 'OFFICIAL', RED, 'SEC filing']];
    const drawTimeline = (c, t) => { bg(c); let act = 0; TL.forEach(([id], i) => { if (t >= B(id) - 0.15) act = i; });
      c.strokeStyle = '#3a3229'; c.lineWidth = 4; c.beginPath(); c.moveTo(66, 70); c.lineTo(66, 640); c.stroke();
      TL.forEach(([id, d, s, tag, col, src], i) => { const a = B(id) - 0.15, k = pop(t, a, 0.35); if (k <= 0) return; const y = 26 + i * 170, on = i === act;
        c.save(); c.globalAlpha = cl(k) * (on ? 1 : 0.5); c.translate((1 - cl(k)) * 80, 0);
        c.fillStyle = on ? ORG : '#5a4f44'; c.beginPath(); c.arc(66, y + 72, on ? 14 : 10, 0, 7); c.fill();
        rr(c, 100, y, CW - 128, 150, 20, on ? '#231c16' : '#1c1713', on ? ORG : 'rgba(255,255,255,0.06)', on ? 3 : 2);
        txt(c, d, 130, y + 40, 40, on ? CRM : MUT, 900, 'left', SERIF); pill(c, tag, CW - 60 - (tag.length * 13 + 28), y + 38, col, INK, 18);
        wrap(c, s, 130, y + 86, CW - 200, 34, 27, on ? '#efe7da' : MUT, 700); txt(c, 'Source: ' + src, CW - 52, y + 130, 16, MUT, 700, 'right'); c.restore(); });
      if (t > at('c5', 0.5)) stamp(c, 'RESIGNED', CW / 2 + 60, 26 + 3 * 170 + 75, pr(t, at('c5', 0.5), at('c5', 0.75)), RED, 64, -0.08);
      return [CW / 2, 26 + act * 170 + 75]; };
    // ---------- PROOF?: not proven + board + Congress ----------
    const drawProof = (c, t) => { bg(c);
      wrap(c, 'Did he share secrets with China?', 48, 70, CW - 96, 62, 52, CRM, 900, SERIF);
      stamp(c, 'NOT PROVEN', CW / 2, 250, pr(t, at('c6', 0.02), at('c6', 0.22)), AMB, 70, -0.06);
      const k = pop(t, at('c6', 0.3), 0.35); if (k > 0) { c.save(); c.globalAlpha = cl(k); c.translate(0, (1 - cl(k)) * 40); rr(c, 48, 350, CW - 96, 170, 22, '#1d2422', 'rgba(56,208,192,0.35)', 2);
        txt(c, "NVIDIA'S BOARD", 80, 388, 20, TEAL, 900, 'left'); wrap(c, 'No reason to believe national security was compromised.', 80, 436, CW - 170, 40, 32, '#e6f2ef', 700); c.restore(); }
      const k2 = pop(t, B('c7'), 0.35); if (k2 > 0) { c.save(); c.translate(CW / 2, 610); c.scale(k2, k2); rr(c, -330, -54, 660, 108, 22, '#231c16', ORG, 3); emo(c, '🏛️', -270, 0, 46); txt(c, 'Congress briefing', -220, -16, 30, CRM, 900, 'left'); txt(c, 'DEC 1, 2026', -220, 24, 26, ORG, 900, 'left', SERIF); c.restore(); }
      return [CW / 2, t > B('c7') ? 520 : 330]; };
    // ---------- STOCK: the drop ----------
    const SP = [[0, 0.1], [0.08, 0.12], [0.16, 0.2], [0.24, 0.24], [0.32, 0.34], [0.4, 0.38], [0.48, 0.47], [0.56, 0.52], [0.64, 0.58], [0.7, 0.6], [0.78, 0.66], [0.84, 0.72], [0.88, 0.98], [0.93, 0.9], [1, 0.86]];   // x, drop (0 top .. 1 bottom)
    const drawStock = (c, t) => { bg(c);
      txt(c, 'NVDA', 48, 60, 48, CRM, 900, 'left', SERIF); txt(c, '▼ falling since late October', 200, 62, 24, RED, 800, 'left');
      const x0 = 60, x1 = CW - 60, y0 = 130, y1 = 560, k = eo(pr(t, B('c8') - 0.05, at('c8', 0.8)));
      c.strokeStyle = '#2a231c'; c.lineWidth = 2; for (let i = 0; i <= 4; i++) { const y = y0 + i * (y1 - y0) / 4; c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); }
      const pts = SP.map(([u, v]) => [lerp(x0, x1, u), lerp(y0, y1, v)]), n = Math.max(2, Math.ceil(k * pts.length));
      const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, 'rgba(255,75,75,0.28)'); g.addColorStop(1, 'rgba(255,75,75,0)');
      c.beginPath(); c.moveTo(pts[0][0], y1); pts.slice(0, n).forEach(([x, y]) => c.lineTo(x, y)); c.lineTo(pts[n - 1][0], y1); c.closePath(); c.fillStyle = g; c.fill();
      c.strokeStyle = RED; c.lineWidth = 6; c.lineJoin = 'round'; c.beginPath(); pts.slice(0, n).forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
      txt(c, 'OCT 28', x0, y1 + 34, 20, MUT, 800, 'left'); txt(c, 'NOV 12', pts[12][0], y1 + 34, 20, MUT, 800);
      const dk = pop(t, at('c8', 0.55), 0.35); if (dk > 0 && n > 12) { const [px, py] = pts[12]; c.save(); c.translate(px - 150, py - 70); c.scale(dk, dk); rr(c, -140, -40, 280, 80, 18, RED); txt(c, '−14% at one point', 0, 1, 28, '#fff', 900); c.restore(); c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py, 10, 0, 7); c.fill(); }
      txt(c, 'Intraday, the day he resigned', CW / 2, 660, 20, MUT, 700);
      return [CW / 2, 400]; };
    // ---------- WHO'S IN CHARGE: interim CEO ----------
    const drawInterim = (c, t) => { bg(c); const k = pop(t, B('c9') - 0.05, 0.4);
      txt(c, 'RUNNING NVIDIA RIGHT NOW', CW / 2, 60, 24, MUT, 900);
      c.save(); c.translate(CW / 2, 290); c.scale(k, k); rr(c, -400, -170, 800, 340, 30, '#211b16', 'rgba(255,255,255,0.08)', 2); ini(c, 'CK', -270, -20, 90, TEAL);
      txt(c, 'Colette Kress', -150, -80, 56, CRM, 900, 'left', SERIF); pill(c, 'INTERIM CEO', -150, -10, ORG, INK, 24); txt(c, 'Nvidia CFO since 2013', -150, 60, 26, MUT, 700, 'left'); txt(c, 'stays CFO too', -150, 100, 24, MUT, 700, 'left'); c.restore();
      const k2 = pop(t, at('c9', 0.6), 0.35); if (k2 > 0) { c.save(); c.globalAlpha = cl(k2); rr(c, 104, 520, CW - 208, 80, 20, '#1c1713'); txt(c, 'New board chair: Harvey Jones', CW / 2, 561, 26, CRM, 800); c.restore(); }
      return [CW / 2, 300]; };
    // ---------- WHO'S NEXT: odds + names ----------
    const ODDS = [['Ian Buck', 'Nvidia · the engineer behind CUDA', 42, 'IB', NVG], ['Colette Kress', 'Interim CEO', 12, 'CK', TEAL], ['Johny Srouji', 'Apple · hardware chief', 9, 'JS', '#c9c2b8']];
    const ALSO = [['Rene Haas', 'Arm CEO', 'RH', 0.32], ['Tim Cook', 'Apple', 'TC', 0.5], ['Nikesh Arora', 'Palo Alto Networks', 'NA', 0.72]];
    const drawNext = (c, t) => { bg(c);
      txt(c, "WHO'S NEXT?", 48, 54, 44, CRM, 900, 'left', SERIF); txt(c, 'Kalshi odds · Nov 12', CW - 48, 58, 20, MUT, 800, 'right');
      ODDS.forEach(([n, sub, p, inn, col], i) => { const a = at('c10', 0.05) + i * 0.18, k = pop(t, a, 0.3); if (k <= 0) return; const y = 130 + i * 104, hl = i === 2 && t > at('c11', 0.05) && t < at('c11', 0.3);
        c.save(); c.globalAlpha = cl(k); rr(c, 40, y, CW - 80, 90, 18, hl ? '#2a2119' : '#1e1914', hl ? ORG : null, 3); ini(c, inn, 90, y + 45, 30, col); txt(c, n, 136, y + 30, 30, CRM, 900, 'left'); txt(c, sub, 136, y + 64, 19, MUT, 700, 'left');
        const bw = 260 * (p / 42) * eo(pr(t, a, a + 0.6)); rr(c, CW - 360, y + 32, 260, 26, 13, '#2a231c'); rr(c, CW - 360, y + 32, Math.max(26, bw), 26, 13, i === 0 ? NVG : col); txt(c, `${Math.round(p * eo(pr(t, a, a + 0.6)))}%`, CW - 60, y + 45, 28, CRM, 900, 'right'); c.restore(); });
      if (t > B('c11') - 0.1) { txt(c, 'ALSO NAMED BY ANALYSTS', 48, 470, 20, MUT, 900, 'left');
        ALSO.forEach(([n, sub, inn, f], i) => { const k = pop(t, at('c11', f - 0.04), 0.3); if (k <= 0) return; const x = 40 + i * 316, y = 500, ind = n === 'Nikesh Arora';
          c.save(); c.translate(x + 150, y + 85); c.scale(k, k); c.translate(-150, -85); rr(c, 0, 0, 300, 170, 20, ind ? '#2a2119' : '#1e1914', ind ? ORG : null, 3); ini(c, inn, 54, 56, 30, ind ? ORG : '#c9c2b8');
          txt(c, n, 100, 46, 26, CRM, 900, 'left'); txt(c, sub, 100, 76, 17, MUT, 700, 'left'); if (ind) { const w = pill(c, '🇮🇳 INDIAN-ORIGIN', 24, 130, ORG, INK, 18); } c.restore(); }); }
      return [CW / 2, t > B('c11') ? 470 : 280]; };
    const SCREENS = { hook: drawHook, timeline: drawTimeline, proof: drawProof, stock: drawStock, interim: drawInterim, next: drawNext };
    const ZM = [['proof', B('c6'), E('c7'), 1.04], ['next', B('c11'), E('c11') + 0.15, 1.06]];

    const zoomOf = (name, t) => { let z = 1; ZM.forEach(([n, a, b, s]) => { if (n === name && t > a - 0.3 && t < b + 0.35) { const k = t < a ? 0 : t < a + 0.4 ? sm(pr(t, a, a + 0.4)) : t < b ? 1 : 1 - sm(pr(t, b, b + 0.35)); z = Math.max(z, lerp(1, s, k)); } }); return z; };
    const renderScreen = (cv, cx, name, t) => { cx.setTransform(1, 0, 0, 1, 0, 0); cx.clearRect(0, 0, CW, CH);
      const z = zoomOf(name, t); const foc = SCREENS[name](cx, t);
      if (z > 1.001 && foc) { cx.clearRect(0, 0, CW, CH); cx.save(); cx.translate(CW / 2, CH / 2); cx.scale(z, z); const fx = cl(lerp(CW / 2, foc[0], 0.85), CW / (2 * z), CW - CW / (2 * z)), fy = cl(lerp(CH / 2, foc[1], 0.85), CH / (2 * z), CH - CH / (2 * z)); cx.translate(-fx, -fy); SCREENS[name](cx, t); cx.restore(); } };
    const panelAt = t => { let v = 0; PON.forEach(([a, b]) => { if (t >= a - 0.01 && t < b + 0.35) v = Math.max(v, t < b ? eo(pr(t, a, a + 0.45)) : 1 - sm(pr(t, b, b + 0.32))); }); return cl(v); };
    const bump = t => { let b = 0; SCR.forEach(([n, a]) => { b = Math.max(b, K.pulse(t, a, 0.3) * 0.02); }); return b; };
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
      const ti = TI[name]; tabX = si > 0 && ts < 0.4 ? lerp(TI[SCR[si - 1][0]], ti, sm(ts / 0.4)) : ti;
      const tw = (PW - 48) / 5; rr(c, PX + 24 + tabX * tw + 3, PY + 22, tw - 6, 50, 25, ORG);
      TABS.forEach((s2, i) => { const on = Math.abs(i - tabX) < 0.5; txt(c, (i < ti ? '✓ ' : '') + s2, PX + 24 + i * tw + tw / 2, PY + 48, 22, on ? INK : i < ti ? '#c9b8a3' : MUT, 900, 'center', `${SANS}, ${EMO}`); });
      c.save(); c.beginPath(); c.roundRect(PX, PY + CY0, PW, CH, [0, 0, 30, 30]); c.clip();
      if (swipe < 1) { c.drawImage(sB, PX - swipe * CW * 0.4, PY + CY0); c.drawImage(sA, PX + (1 - swipe) * CW, PY + CY0); } else c.drawImage(sA, PX, PY + CY0);
      c.restore(); c.restore(); };

    const hudDraw = t => { h.setTransform(1, 0, 0, 1, 0, 0); h.clearRect(0, 0, W, H); drawPanel(t); hTex.needsUpdate = true; };

    // ================= ACTING (serious, attentive) =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const smv = (a, b, k) => a + (b - a) * k;
    const toR = [0.75, 0.05], toCam = [-0.1, 0.02], down = [0.15, 0.35], toM = [-0.45, 0.06], rCam = [0.25, 0.0], away = [-0.6, -0.05];
    const P0 = { L: [-0.3, 0, -0.05, -0.1], R: [-0.3, 0, 0.05, -0.1] };
    const POSE = { rest: P0, chin: { L: [-0.3, 0, -0.05, -0.1], R: [-1.15, -0.55, 0.1, -2.0] }, slump: { L: [0.1, 0, -0.2, -0.05], R: [0.1, 0, 0.2, -0.05] },
      hold: { L: [-0.75, 0.3, -0.25, -1.35], R: [-0.75, -0.3, 0.25, -1.35] }, shrug: { L: [-0.55, 0.1, -0.55, -1.25], R: [-0.55, -0.1, 0.55, -1.25] } };
    const ACT = {
      m1: [['worried', 'hold', toR, 0.05, 0], ['calm', toM]], c1: [['neutral', 'hold', toR, 0.05, 0], ['calm', toM]],
      c2: [['worried', 'rest', toR, 0.1, 0], ['calm', toM]], c3: [['neutral', 'chin', toR, 0.15, 0], ['calm', rCam]],
      c4: [['worried', 'chin', toR, 0.15, 0], ['flat', toM]], c5: [['shock', 'rest', toR, -0.05, 0], ['flat', rCam]],
      m2: [['worried', 'shrug', toR, 0.05, 0], ['calm', toM]], c6: [['neutral', 'rest', toR, 0.05, 0], ['flat', rCam]],
      c7: [['neutral', 'rest', toR, 0.05, 0], ['calm', toM]], m3: [['worried', 'rest', toR, 0.05, 0], ['calm', toM]],
      c8: [['worried', 'chin', toR, 0.15, 0], ['flat', toM]], m4: [['neutral', 'rest', toR, 0.0, 0], ['calm', toM]],
      c9: [['neutral', 'rest', toR, 0.05, 0], ['calm', toM]], m5: [['neutral', 'shrug', toR, 0.0, 0], ['calm', toM]],
      c10: [['neutral', 'chin', toR, 0.1, 0], ['smile', toM]], c11: [['neutral', 'rest', toR, 0.05, 0], ['calm', toM]],
      m6: [['worried', 'slump', away, 0.2, 0], ['calm', toM]], c12: [['neutral', 'slump', toR, 0.15, 0], ['flat', toM]],
    };
    const curLine = t => { let id = 'm1'; window.SCENE.lines.forEach((l, i) => { if (t >= L[i].t - 0.12) id = l.id; }); return id; };
    let curPose = JSON.parse(JSON.stringify(P0));
    const acting = (t) => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 || Math.abs(t - last) > 0.2 ? 1 : cl((t - last) * 6); last = t;
      const id = curLine(t); let [[face, pose, mL, lean, bounce], [mood, rL, bob = 0]] = ACT[id];
      if (t > E('c12') + 0.3) { mL = away; face = 'neutral'; }
      mYaw = smv(mYaw, mL[0], k); mPitch = smv(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.9, face, look: [mYaw, mPitch], lean });
      const tgt = POSE[pose]; ['L', 'R'].forEach(s => { for (let i = 0; i < 4; i++) curPose[s][i] = smv(curPose[s][i], tgt[s][i], k); });
      const [aL, aR] = M.arms; aL.sh.rotation.set(curPose.L[0], curPose.L[1], curPose.L[2]); aL.el.rotation.x = curPose.L[3]; aR.sh.rotation.set(curPose.R[0], curPose.R[1], curPose.R[2]); aR.el.rotation.x = curPose.R[3];
      phone.visible = pose === 'hold';
      const sway = Math.sin(t * 1.7) * 0.004 + Math.sin(t * 5.3) * 0.0015;   // train rocking
      M.g.position.y = sway * 0.6; M.g.rotation.z = sway * 0.5;
      rYaw = smv(rYaw, rL[0], k); rPitch = smv(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood, bob }); R.g.rotation.z = sway * 2;
      handles.forEach((g, i) => { g.rotation.z = Math.sin(t * 1.7 + i * 0.2) * 0.09 + Math.sin(t * 4.1 + i) * 0.02; g.rotation.x = Math.sin(t * 1.1 + i * 0.4) * 0.04; });
      // a warm street light sweeps past the windows every ~2.6 s
      const ph = (t % 2.6) / 2.6; sweep.position.x = lerp(-4, 4, ph); sweep.intensity = 2.4 * Math.sin(ph * Math.PI) ** 2;
      panelL.intensity = 0.5 * panelAt(t);
    };

    // ================= CAMERA =================
    const Pp = (pos, look) => ({ pos, look });
    const MH = [MX, 1.22, MZ], RH = [RX, 1.2, RZ];
    const up = {
      two: [Pp([0.05, 1.56, MZ + 5.5], [0.04, 1.92, MZ]), Pp([0.04, 1.55, MZ + 5.25], [0.04, 1.91, MZ])],
      mad: [Pp([MX + 0.5, 1.5, MZ + 4.3], [MX + 0.24, 1.88, MZ]), Pp([MX + 0.48, 1.49, MZ + 4.05], [MX + 0.24, 1.87, MZ])],
      rob: [Pp([RX - 0.5, 1.5, RZ + 4.1], [RX - 0.34, 1.88, RZ]), Pp([RX - 0.48, 1.49, RZ + 3.85], [RX - 0.34, 1.87, RZ])],
    };
    const fs = {
      open: [Pp([0.9, 1.55, MZ + 4.6], [0.0, 1.15, MZ]), Pp([0.35, 1.36, MZ + 3.4], [-0.05, 1.12, MZ])],
      madcu: [Pp([MX + 0.48, 1.3, MZ + 3.0], [MX + 0.04, 1.16, MZ]), Pp([MX + 0.46, 1.3, MZ + 2.8], [MX + 0.04, 1.16, MZ])],
      robcu: [Pp([RX - 0.42, 1.3, RZ + 2.4], [RX - 0.05, 1.2, RZ]), Pp([RX - 0.4, 1.3, RZ + 2.15], [RX - 0.05, 1.2, RZ])],
      end: [Pp([RX - 0.4, 1.3, RZ + 2.15], [RX - 0.05, 1.2, RZ]), Pp([0.2, 1.5, MZ + 5.2], [0.0, 1.2, MZ])],
    };
    const SHOT = { m1: ['fs', 'open', 'm'], c1: ['up', 'two', 'two'], c2: ['up', 'rob', 'r'], c3: ['up', 'two', 'two'], c4: ['up', 'mad', 'm'], c5: ['up', 'two', 'two'],
      m2: ['fs', 'madcu', 'm'], c6: ['up', 'rob', 'r'], c7: ['up', 'two', 'two'], m3: ['fs', 'madcu', 'm'], c8: ['up', 'two', 'two'], m4: ['fs', 'madcu', 'm'], c9: ['up', 'rob', 'r'],
      m5: ['fs', 'madcu', 'm'], c10: ['up', 'two', 'two'], c11: ['up', 'mad', 'm'], m6: ['fs', 'madcu', 'm'], c12: ['fs', 'robcu', 'r'] };
    const ids = window.SCENE.lines.map(l => l.id);
    const plan = []; ids.forEach((id, i) => { const a = i ? B(id) - 0.12 : 0, b = i < ids.length - 1 ? B(ids[i + 1]) - 0.12 : E('c12') + 0.25; const [set, s, f] = SHOT[id]; plan.push([a, b, (set === 'up' ? up : fs)[s], f]); });
    plan.push([E('c12') + 0.25, D + 5, fs.end, 'two']);
    const shots = []; plan.forEach(([a, b, s, f]) => { const p = shots[shots.length - 1]; if (p && p.s === s && Math.abs(p.t[1] - a) < 0.01) { p.t[1] = b; } else shots.push({ t: [a, b], s, f, from: s[0], to: s[1], ease: sm, shake: null }); });
    shots.forEach(x => { x.shake = t => shakeAt(t); });
    const PUSH = ['c5', 'm2', 'c6', 'm6', 'c12'];
    const fovAt = t => { let f = 38; PUSH.forEach(id => { const a = B(id) - 0.1, b = E(id) + 0.35; if (t > a && t < b) f = Math.min(f, lerp(38, 33.5, sm(pr(t, a, b)))); });
      const ps = at('c5', 0.5); if (t > ps - 0.05 && t < ps + 0.6) f = Math.min(f, lerp(38, 34, Math.sin(pr(t, ps - 0.05, ps + 0.6) * Math.PI)));
      if (t > E('c12') + 0.25) f = lerp(38, 41, sm(pr(t, E('c12') + 0.25, D)));
      return f; };
    const shakeAt = t => 0.003 + 0.008 * K.pulse(t, at('c5', 0.5), 0.45);
    const shotAt = t => { let s = shots[shots.length - 1]; for (const x of shots) if (t >= x.t[0] && t < x.t[1]) { s = x; break; } return s; };
    const capZones = PON.map(([a, b]) => [a + 0.15, b, 1040]);

    // ================= UPDATE =================
    const tmp = new THREE.Vector3();
    const update = t => {
      K.shoot(t, shots);
      K.cam.fov = fovAt(t); K.cam.updateProjectionMatrix(); K.cam.updateMatrixWorld(true);
      acting(t); drawOut(t); drawLED(t);
      const f = shotAt(t).f, tgt = f === 'r' ? RH : f === 'm' ? MH : [(MX + RX) / 2, 1.2, (MZ + RZ) / 2];
      postU.focus.value = K.cam.position.distanceTo(tmp.set(...tgt)); postU.aper.value = f === 'two' ? 0.75 : 1.0;
      postU.time.value = t;
      postU.flash.value = 0.12 * Math.max(0, 1 - Math.abs(t - at('c5', 0.5)) / 0.08);
      postU.dark.value = Math.max(1 - sm(pr(t, 0, 0.5)), sm(pr(t, D - 0.6, D)));
      hudDraw(t);
    };

    // ================= SOUND (subdued, newsy) =================
    const sfx = [['train', 0, 0.22]];
    PON.forEach(([a, b]) => sfx.push(['whoosh', a - 0.05, 0.22], ['whoosh', b, 0.12]));
    SCR.forEach(([n, a], i) => { if (i > 0 && panelOn(a - 0.05)) sfx.push(['whoosh', a, 0.16]); });
    sfx.push(['beep', B('c1') - 0.05, 0.3], ['beep', B('c1') + 0.1, 0.3], ['riser', B('c1'), 0.12], ['bass', at('c1', 0.5), 0.35]);
    TL.forEach(([id]) => sfx.push(['tick', B(id) - 0.15, 0.35], ['pop', B(id) - 0.1, 0.12]));
    sfx.push(['thud', at('c5', 0.5), 0.7], ['bass', at('c5', 0.5), 0.5]);
    sfx.push(['thud', at('c6', 0.05), 0.5], ['pop', at('c6', 0.3), 0.15], ['ding', B('c7') + 0.05, 0.2]);
    sfx.push(['zap', at('c8', 0.4), 0.2], ['bass', at('c8', 0.55), 0.3]);
    sfx.push(['pop', B('c9'), 0.2], ['chime', at('c9', 0.6), 0.15]);
    ODDS.forEach((o, i) => sfx.push(['pop', at('c10', 0.05) + i * 0.18, 0.18]));
    ALSO.forEach(([n, s, i2, f]) => sfx.push(['pop', at('c11', f - 0.04), 0.16])); sfx.push(['chime', at('c11', 0.72), 0.2]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fraunces', capMarginV: 470, capSize: 58, capKey: '&H002E7AFF&', capOutline: 2, capShadow: 3, capZones };
  },
};
