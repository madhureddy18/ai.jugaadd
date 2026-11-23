/* @maddiee.makess reel 28 — "I made a movie with one sentence" (Google Vids, Gemini Omni 1.2 Flash: 15-sec video with sound, 3 free/month).
   Real 3D scenes: studio → the typed line → a caped hero slams down on Charminar at sunset (dust ring, pigeons) → a giant copper handi tips
   and biryani pours in slow motion with a leg piece spinning past the camera → studio with golden tickets. Any comment → DM guide (p/vids/). */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x0a0f24, fog: [10, 40], fov: 36, bloom: { strength: 0.45, radius: 0.6, threshold: 0.985 } },
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
    const rng = K.rng(28);





    // ================= TIMELINE =================
    const C = { HOOK: 0, SHOW: B('show') - 0.1, TYPED: B('typed') - 0.1, SOUND: B('sound') - 0.1, VIDS: B('vids') - 0.12, FREE: B('free') - 0.1, THREE: B('three') - 0.1,
      BIR: B('biryani') - 0.12, SLEEP: B('sleep') - 0.1, CTA: B('cta') - 0.12 };
    const TYPE0 = B('typed') + 0.5, TYPE1 = Math.min(E('typed') - 0.2, TYPE0 + 2.2), LAND = Math.max(TYPE1 + 0.5, B('sound') - 0.3);
    const BTYPE0 = B('biryani') + 1.2, BTYPE1 = Math.min(E('biryani'), BTYPE0 + 1.6), POUR = BTYPE1 + 0.1;
    const CX = 20, BYX = 40;

    // ================= STUDIO (origin) =================
    const DY = 0.74;
    const stFloor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: 0x141a33, roughness: 0.25, metalness: 0.3 })); stFloor.rotation.x = -Math.PI / 2; stFloor.position.set(0, 0, -1); stFloor.receiveShadow = true; S.add(stFloor);
    const stWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), SM(0x111733, 0.8)); stWall.position.set(0, 2.5, -2.6); S.add(stWall);
    const ledTex = K.canvasTex(1024, 512, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#1b2d7a'); g.addColorStop(1, '#5b1f8f'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(255,255,255,0.08)'; for (let i = 0; i < w; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); }
      x.fillStyle = '#fff'; x.font = '900 96px sans-serif'; x.textAlign = 'center'; x.fillText('🎬 ONE LINE', w / 2, 200); x.fillStyle = '#ffd34a'; x.font = '900 104px sans-serif'; x.fillText('= A MOVIE', w / 2, 330);
      x.fillStyle = 'rgba(255,255,255,0.7)'; x.font = '600 34px sans-serif'; x.fillText('15 sec · with sound · free', w / 2, 410); });
    const ledM = new THREE.MeshBasicMaterial({ map: ledTex, toneMapped: false, color: 0x000000 });
    const led = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.3), ledM); led.position.set(-0.05, 2.0, -2.55); S.add(led);
    rbox(2.76, 1.46, 0.05, SM(0x23283d, 0.4, { metalness: 0.5 }), -0.05, 2.0, -2.6, 0.02);
    const stripM = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x4fb3ff).multiplyScalar(1.6), toneMapped: false });
    [-2.0, 1.9].forEach(x => { const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.6, 0.04), stripM); s2.position.set(x, 1.5, -2.5); S.add(s2); });
    rbox(1.1, 0.06, 0.36, SM(0x2c3350, 0.5), -0.2, 0.5, -0.98, 0.02); [-0.65, 0.25].forEach(x => cyl(0.02, 0.02, 0.48, SM(0x9aa3ab, 0.3, { metalness: 0.7 }), x, 0.24, -0.98, 8));
    cyl(0.26, 0.3, DY, SM(0x23283d, 0.4, { metalness: 0.5 }), 0.36, DY / 2, -0.45, 32);
    const podRing = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.012, 8, 40), stripM); podRing.rotation.x = Math.PI / 2; podRing.position.set(0.36, DY + 0.005, -0.45); S.add(podRing);
    const spotA = new THREE.SpotLight(0xffffff, 2.2, 8, 0.5, 0.6, 1.2); spotA.position.set(0.0, 3.6, 1.4); spotA.target.position.set(0, 1, -0.8); S.add(spotA); S.add(spotA.target);


    // golden tickets (studio, "three videos a month")
    const tkTex = K.canvasTex(256, 120, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#ffe27a'); g.addColorStop(1, '#f5a524'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a5a00'; x.setLineDash([8, 6]); x.lineWidth = 4; x.strokeRect(10, 10, w - 20, h - 20);
      x.fillStyle = '#5a3a00'; x.font = '900 40px sans-serif'; x.textAlign = 'center'; x.fillText('🎬 FREE', w / 2, 58); x.font = '700 24px sans-serif'; x.fillText('1 AI VIDEO', w / 2, 92); });
    const tickets = [0, 1, 2].map(i => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.14), new THREE.MeshBasicMaterial({ map: tkTex, side: THREE.DoubleSide, toneMapped: false })); m.visible = false; S.add(m); return m; });

    // ================= CHARMINAR AT SUNSET (x = CX) =================
    const ch = new THREE.Group(); ch.position.x = CX; S.add(ch);
    const skyTex = K.canvasTex(64, 512, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2a1f5c'); g.addColorStop(0.45, '#d9567a'); g.addColorStop(0.7, '#ff9a3d'); g.addColorStop(0.85, '#ffd27a'); g.addColorStop(1, '#ffe9b0'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(60, 32, 16), new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false, toneMapped: false })); sky.position.set(0, 6, -10); ch.add(sky);
    const sun = new THREE.Mesh(new THREE.CircleGeometry(3, 40), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffd27a).multiplyScalar(1.6), toneMapped: false, fog: false })); sun.position.set(6, 4, -45); ch.add(sun);
    const plaza = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), SM(0xb79a78, 0.9)); plaza.rotation.x = -Math.PI / 2; plaza.position.z = -6; plaza.receiveShadow = true; ch.add(plaza);
    const stone = SM(0xd8c4a2, 0.75), stone2 = SM(0xc8b08a, 0.8);
    const CZ = -6;   // Charminar centre
    const base = rbox(4.2, 3.4, 4.2, stone, 0, 1.7, CZ, 0.05, ch);
    [[0, 2.11], [0, -2.11], [2.11, 0], [-2.11, 0]].forEach(([x, z]) => { const a = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.3, 24, 1, false, 0, Math.PI), SM(0x3a2a1f, 0.9)); a.rotation.set(Math.PI / 2, 0, x ? Math.PI / 2 : 0); a.position.set(x, 1.9, CZ + z); ch.add(a);
      const arch = rbox(x ? 0.1 : 1.8, 2.4, x ? 1.8 : 0.1, SM(0x3a2a1f, 0.9), x * 1.0, 1.0, CZ + z * 1.0, 0.02, ch); });
    rbox(4.4, 0.25, 4.4, stone2, 0, 3.5, CZ, 0.03, ch); rbox(3.6, 0.8, 3.6, stone, 0, 4.0, CZ, 0.03, ch); rbox(3.8, 0.15, 3.8, stone2, 0, 4.45, CZ, 0.02, ch);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), stone); dome.position.set(0, 4.5, CZ); ch.add(dome);
    [[1.95, 1.95], [-1.95, 1.95], [1.95, -1.95], [-1.95, -1.95]].forEach(([x, z]) => { cyl(0.32, 0.38, 7.2, stone, x, 3.6, CZ + z, 20, ch);
      [2.2, 4.0, 5.6].forEach(y => cyl(0.48, 0.48, 0.12, stone2, x, y, CZ + z, 20, ch)); const dm = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), stone2); dm.position.set(x, 7.2, CZ + z); ch.add(dm);
      const sp = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.4, 8), stone2); sp.position.set(x, 7.75, CZ + z); ch.add(sp); });
    const chSun = new THREE.DirectionalLight(0xffb070, 2.0); chSun.position.set(CX + 8, 6, -2); chSun.target.position.set(CX, 2, -6); S.add(chSun); S.add(chSun.target);
    const chFill = new THREE.PointLight(0xff9adf, 1.2, 20, 1.2); chFill.position.set(-3, 4, 2); ch.add(chFill);
    // the superhero: body, head, cape; drops from the sky onto the top of Charminar
    const hero = new THREE.Group(); ch.add(hero);
    const suitM = SM(0x2244aa, 0.45), capeM = SM(0xd62839, 0.6, { side: THREE.DoubleSide });
    const hb = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.5, 8, 16), suitM); hb.position.y = 0.6; hero.add(hb);
    const hhd = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), SM(0xc68b5f, 0.6)); hhd.position.y = 1.15; hero.add(hhd);
    const hmask = new THREE.Mesh(new THREE.SphereGeometry(0.185, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), SM(0x111111, 0.5)); hmask.position.y = 1.17; hero.add(hmask);
    [-1, 1].forEach(s => { const lg = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.4, 6, 10), suitM); lg.position.set(s * 0.1, 0.15, 0); hero.add(lg); const ar = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.4, 6, 10), suitM); ar.position.set(s * 0.32, 0.65, 0); ar.rotation.z = s * 0.4; hero.add(ar); });
    const capeGeo = new THREE.PlaneGeometry(0.6, 0.9, 6, 10); const cape = new THREE.Mesh(capeGeo, capeM); cape.position.set(0, 0.55, -0.2); hero.add(cape); const capeP = capeGeo.attributes.position.array.slice();
    const embl = new THREE.Mesh(new THREE.CircleGeometry(0.08, 5), new THREE.MeshBasicMaterial({ color: 0xffd34a, toneMapped: false })); embl.position.set(0, 0.75, 0.215); hero.add(embl);
    const ROOF = 4.55;
    // dust ring + pigeons
    const dustTex = K.canvasTex(64, 64, (x, w, h) => { const g = x.createRadialGradient(32, 32, 2, 32, 32, 30); g.addColorStop(0, 'rgba(255,230,190,0.9)'); g.addColorStop(1, 'rgba(255,230,190,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const dust = Array.from({ length: 26 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: dustTex, transparent: true, opacity: 0, depthWrite: false })); ch.add(s); return { s, a: i / 26 * 6.283 }; });
    const shock = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.45, 48), new THREE.MeshBasicMaterial({ color: 0xffe9b0, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })); shock.rotation.x = -Math.PI / 2; shock.position.set(0.2, ROOF + 0.05, CZ + 1.45); ch.add(shock);
    const birds = Array.from({ length: 14 }, (_, i) => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), SM(0xe8e8ee, 0.7)); b.scale.set(1, 0.7, 1.4); g.add(b);
      const wl = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.08), SM(0xdedee6, 0.7, { side: THREE.DoubleSide })); wl.position.x = -0.12; g.add(wl); const wr = wl.clone(); wr.position.x = 0.12; g.add(wr);
      g.position.set((rng() - 0.5) * 3.5, ROOF + 0.1, CZ + (rng() - 0.5) * 3.5); ch.add(g); return { g, wl, wr, v: [(rng() - 0.5) * 2.5, 1.2 + rng() * 1.5, 0.5 + rng() * 2], p0: g.position.clone() }; });
    // the typed line floating in the sunset sky
    const pCan = document.createElement('canvas'); pCan.width = 1024; pCan.height = 160; const pX = pCan.getContext('2d'); const pTex = new THREE.CanvasTexture(pCan); pTex.colorSpace = THREE.SRGBColorSpace;
    const prompt = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.56), new THREE.MeshBasicMaterial({ map: pTex, transparent: true, toneMapped: false, depthWrite: false, fog: false })); S.add(prompt);
    const drawPrompt = (text, n, t) => { const x = pX; x.clearRect(0, 0, 1024, 160); x.fillStyle = 'rgba(15,20,40,0.9)'; x.beginPath(); x.roundRect(8, 8, 1008, 144, 72); x.fill(); x.strokeStyle = '#ffd34a'; x.lineWidth = 5; x.stroke();
      x.fillStyle = '#ffd34a'; x.font = '800 46px sans-serif'; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillText('✦', 50, 82); x.fillStyle = '#fff'; x.font = '600 44px sans-serif'; x.fillText(text.slice(0, n) + (Math.floor(t * 3) % 2 ? '|' : ''), 110, 84); pTex.needsUpdate = true; };
    const L1 = 'a superhero landing on Charminar at sunset', L2 = 'biryani falling in slow motion';

    // ================= SLOW-MOTION BIRYANI (x = BYX) =================
    const by = new THREE.Group(); by.position.x = BYX; S.add(by);
    const bbg = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), new THREE.MeshBasicMaterial({ color: 0x1a0d06 })); bbg.position.set(0, 4, -6); by.add(bbg);
    const table = rbox(4, 0.12, 3, SM(0x4a2a16, 0.6), 0, 0.6, -1.2, 0.03, by);
    const copper = SM(0xb8652f, 0.3, { metalness: 0.85 });
    const handiG = new THREE.Group(); handiG.position.set(-0.4, 0.66, -1.2); by.add(handiG);
    const handiPivot = new THREE.Group(); handiG.add(handiPivot);
    const handi = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.45, 0.02], [0.6, 0.2], [0.62, 0.45], [0.5, 0.65], [0.48, 0.72], [0.55, 0.76]].map(([r, y]) => new THREE.Vector2(r, y)), 40), copper); handi.castShadow = true; handiPivot.add(handi);
    const riceTop = new THREE.Mesh(new THREE.CircleGeometry(0.48, 32), SM(0xf3e2b5, 0.9)); riceTop.rotation.x = -Math.PI / 2; riceTop.position.y = 0.7; handiPivot.add(riceTop);
    const RC = 900, riceG = new THREE.BufferGeometry(), riceP = new Float32Array(RC * 3), riceC = new Float32Array(RC * 3), riceD = [];
    for (let i = 0; i < RC; i++) { riceD.push({ d: rng() * 1.6, vx: 0.4 + rng() * 1.4, vy: 0.2 + rng() * 1.0, vz: (rng() - 0.5) * 1.2 }); const saffron = rng() < 0.28; const c = new THREE.Color(saffron ? 0xff9a2a : 0xfff4dc); riceC.set([c.r, c.g, c.b], i * 3); }
    riceG.setAttribute('position', new THREE.BufferAttribute(riceP, 3)); riceG.setAttribute('color', new THREE.BufferAttribute(riceC, 3));
    const rice = new THREE.Points(riceG, new THREE.PointsMaterial({ size: 0.1, vertexColors: true })); rice.frustumCulled = false; by.add(rice);
    const leg = new THREE.Group(); by.add(leg);
    const legM = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 14), SM(0x8a4a1c, 0.5)); legM.scale.set(1.5, 0.9, 0.9); leg.add(legM);
    const bone = cyl(0.035, 0.035, 0.28, SM(0xf5efe0, 0.6), 0.32, 0, 0, 10, leg); bone.rotation.z = Math.PI / 2;
    const steamB = Array.from({ length: 10 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: dustTex, transparent: true, opacity: 0, depthWrite: false })); by.add(s); return { s, ph: i * 0.1 }; });
    const bKey = new THREE.SpotLight(0xffc98a, 6, 12, 0.6, 0.5, 1.2); bKey.position.set(1.5, 4, 2); bKey.target.position.set(-0.2, 1, -1.2); by.add(bKey); by.add(bKey.target);
    const bRim = new THREE.PointLight(0xff7a2a, 2, 6, 1.5); bRim.position.set(-2, 2, -2.5); by.add(bRim);

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




    // ================= LIGHT (shared) =================
    const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x302838, 0.75); S.add(hemi);
    const key = new THREE.DirectionalLight(0xfff2e6, 1.1); key.position.set(1.0, 2.8, 2.2); key.target.position.set(0, 0.9, -0.8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3; S.add(key); S.add(key.target);
    const front = new THREE.DirectionalLight(0xffffff, 0.55); front.position.set(-0.3, 1.4, 3); front.target.position.set(0, 1, -0.8); S.add(front); S.add(front.target);
    const rimB = new THREE.DirectionalLight(0x5a78ff, 1.0); rimB.position.set(-2, 2.2, -2.6); S.add(rimB);



    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const sm = (a, b, k) => a + (b - a) * k;
    const toR = [0.55, 0.08], toCam = [0.0, 0.06];
    const acting = t => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 ? 1 : cl((t - last) * 4); last = t;
      let mL = toR, face = 'neutral', lean = 0.15, cheer = 0;
      if (t < C.SHOW) { mL = toCam; face = 'shock'; lean = -0.1; cheer = 1; }
      else if (t < C.TYPED) { mL = toR; face = 'smile'; }
      else if (t < C.VIDS) { mL = toR; face = 'shock'; cheer = t >= C.SOUND ? 1 : 0; }
      else if (t < C.FREE) { mL = toR; face = 'neutral'; }
      else if (t < C.THREE) { mL = toCam; face = 'shock'; lean = -0.12; cheer = 0.6; }
      else if (t < C.BIR) { mL = toR; face = 'smile'; }
      else if (t < C.SLEEP) { mL = toCam; face = 'smile'; lean = 0.1; }
      else if (t < C.CTA) { mL = toCam; face = 'shock'; lean = -0.05; cheer = 1; }
      else { mL = toCam; face = 'smile'; lean = 0; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = sm(mYaw, mL[0], k); mPitch = sm(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.95, face, look: [mYaw, mPitch], type: 0, lean });
      phL.intensity = 0;
      const [aL, aR] = M.arms; if (cheer > 0) { const u = cheer * (0.85 + 0.15 * Math.sin(t * 9)); aL.sh.rotation.set(-0.3 - u * 1.9, 0.2, -0.05 - u * 0.5); aL.el.rotation.x = -0.1 - u * 0.6; aR.sh.rotation.set(-0.3 - u * 1.9, -0.2, 0.05 + u * 0.5); aR.el.rotation.x = -0.1 - u * 0.6; }
      let rL = [-0.15, 0.05]; if ((t >= C.VIDS && t < C.FREE) || (t >= C.THREE && t < C.BIR) || t >= C.CTA) rL = [0.42, 0.02];
      rYaw = sm(rYaw, rL[0], k); rPitch = sm(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood: t >= C.VIDS ? 'smile' : 'calm' });
      const on = fin(t, 0.15, 0.5); ledM.color.setRGB(on, on, on);
      // tickets fly to Maddie
      tickets.forEach((m, i) => { const t0 = B('three') + 0.9 + i * 0.35, p = eo(pr(t, t0, t0 + 0.7)); m.visible = t >= t0 && t < C.BIR; m.position.set(lerp(1.2 + i * 0.2, -0.05 + i * 0.12, p), lerp(2.0 + i * 0.2, 1.05 + i * 0.03, p), lerp(-0.2, -0.55, p)); m.rotation.set(0.3, -0.3, (1 - p) * 4 + i * 0.1); });
      // Charminar: prompt types in the sky, hero falls, lands, dust + pigeons
      const inCh = t >= C.TYPED + 0.3 && t < C.VIDS; prompt.visible = (inCh && t < LAND + 0.4) || (t >= C.BIR && t < POUR + 0.4);
      if (t < C.BIR) { prompt.position.set(CX, 3.2, -1.6); drawPrompt(L1, Math.floor(cl((t - TYPE0) / (TYPE1 - TYPE0)) * L1.length), t); } else { prompt.position.set(BYX, 2.4, 0.2); drawPrompt(L2, Math.floor(cl((t - BTYPE0) / (BTYPE1 - BTYPE0)) * L2.length), t); }
      prompt.material.opacity = t < C.BIR ? 1 - pr(t, LAND, LAND + 0.4) : 1 - pr(t, POUR, POUR + 0.4);
      const fall = pr(t, LAND - 0.7, LAND); hero.position.set(0.2, lerp(ROOF + 9, ROOF, ei(fall)), CZ + 1.45); hero.visible = t >= LAND - 0.7;
      const crouch = Math.exp(-Math.max(0, t - LAND) * 3) * (t >= LAND ? 1 : 0); hero.scale.set(1.7, 1.7 * (1 - crouch * 0.25), 1.7); hero.rotation.y = 0.35;
      const cp = capeGeo.attributes.position; for (let i = 0; i < cp.count; i++) { const ox = capeP[i * 3], oy = capeP[i * 3 + 1]; const lift = t < LAND ? 0.6 : 0.15; cp.setZ(i, -(0.45 - oy) * lift + Math.sin(t * 8 + ox * 6 + oy * 4) * 0.05 * (0.45 - oy)); } cp.needsUpdate = true;
      const dp = pr(t, LAND, LAND + 1.4); dust.forEach(o => { const r = 0.3 + dp * 2.4; o.s.position.set(0.2 + Math.cos(o.a) * r, ROOF + 0.15 + dp * 0.3, CZ + 1.45 + Math.sin(o.a) * r * 0.5); o.s.scale.setScalar(0.4 + dp * 1.0); o.s.material.opacity = t >= LAND ? 0.8 * (1 - dp) : 0; });
      shock.scale.setScalar(1 + dp * 9); shock.material.opacity = t >= LAND ? 0.8 * (1 - dp) : 0;
      birds.forEach(o => { const bt = Math.max(0, t - LAND - 0.05); o.g.position.set(o.p0.x + o.v[0] * bt, o.p0.y + o.v[1] * bt, o.p0.z + o.v[2] * bt); const f = Math.sin(t * 30 + o.p0.x * 5) * 0.8 * (bt > 0 ? 1 : 0); o.wl.rotation.y = f; o.wr.rotation.y = -f; });
      // biryani: handi tips, rice pours in slow motion, the leg piece spins toward the camera
      const tip = eo(pr(t, POUR, POUR + 1.2)); handiPivot.rotation.z = -tip * 1.25; handiPivot.position.y = tip * 0.3;
      for (let i = 0; i < RC; i++) { const d = riceD[i], tt = (t - POUR - 0.4 - d.d) * 0.45;
        if (tt <= 0) riceP.set([0, -9, 0], i * 3); else riceP.set([-0.1 + d.vx * tt * 1.6, 1.3 + d.vy * tt - 1.2 * tt * tt, -1.2 + d.vz * tt], i * 3); }
      riceG.attributes.position.needsUpdate = true;
      const lt = Math.max(0, t - POUR - 0.6) * 0.5; leg.position.set(0.1 + lt * 0.8, 1.4 + lt * 0.5, -1.2 + lt * 2.2); leg.rotation.set(t * 2.2, t * 1.4, t * 0.8); leg.visible = t >= POUR + 0.6;
      steamB.forEach(o => { const p = ((t * 0.3 + o.ph) % 1); o.s.position.set(-0.4 + Math.sin(o.ph * 9) * 0.2, 1.5 + p * 1.2, -1.2); o.s.scale.setScalar(0.3 + p * 0.6); o.s.material.opacity = 0.25 * Math.sin(p * Math.PI); });
    };


    // ================= CAMERA =================
    const P = (pos, look, fov) => ({ pos, look, fov });
    const MHL = [-0.2, 1.42, -0.94], RHL = [0.36, 1.1, -0.4];
    const sh = {
      est: [P([0.3, 1.7, 3.2], [-0.05, 1.5, -1.6], 44), P([-0.1, 1.47, 1.35], MHL, 33)],
      robo: [P([0.1, 1.22, 1.35], RHL, 30), P([0.12, 1.21, 1.18], RHL, 30)],
      wait: [P([-0.18, 1.43, 1.05], [-0.2, 1.4, -0.94], 30), P([-0.18, 1.42, 0.85], [-0.2, 1.4, -0.94], 30)],
      mad: [P([0.12, 1.44, 1.32], MHL, 32), P([0.1, 1.43, 1.15], MHL, 32)],
      two: [P([0.12, 1.55, 2.0], [0.05, 1.25, -0.6], 40), P([0.05, 1.55, 1.8], [0.05, 1.25, -0.6], 40)],
      cta: [P([0.06, 1.6, 2.6], [0.0, 1.45, -1.2], 44), P([0.06, 1.55, 2.3], [0.0, 1.4, -1.2], 44)],
      chSky: [P([CX + 0.5, 2.2, 6.5], [CX, 3.6, -6], 48), P([CX + 0.3, 2.6, 4.5], [CX, 4.4, -6], 48)],
      chLand: [P([CX + 3.0, 5.0, 4.2], [CX + 0.1, ROOF + 1.0, CZ + 0.8], 48), P([CX + 2.4, 5.1, 3.0], [CX + 0.1, ROOF + 1.1, CZ + 0.9], 46)],
      byPour: [P([BYX + 3.2, 2.2, 4.6], [BYX + 0.6, 1.3, -1.0], 46), P([BYX + 2.6, 2.0, 3.6], [BYX + 0.7, 1.4, -0.8], 44)],
    };
    const plan = [
      [C.HOOK, C.SHOW, sh.est], [C.SHOW, C.TYPED, sh.robo], [C.TYPED, C.TYPED + 0.3, sh.mad], [C.TYPED + 0.3, LAND - 0.15, sh.chSky], [LAND - 0.15, C.VIDS, sh.chLand],
      [C.VIDS, C.FREE, sh.robo], [C.FREE, C.THREE, sh.wait], [C.THREE, C.BIR, sh.two], [C.BIR, BTYPE0 - 0.1, sh.mad], [BTYPE0 - 0.1, C.SLEEP, sh.byPour],
      [C.SLEEP, C.CTA, sh.wait], [C.CTA, D + 5, sh.cta],
    ].filter(p => p[1] > p[0]);
    const SHAKE = [LAND - 0.15, C.FREE, C.SLEEP];
    const smooth = k => k * k * (3 - 2 * k);
    const lift = (p, dy) => ({ pos: [p.pos[0], p.pos[1] + dy, p.pos[2]], look: [p.look[0], p.look[1] + dy, p.look[2]], fov: p.fov });
    const DYS = new Map([[sh.mad, 0.085], [sh.wait, 0.075], [sh.robo, 0.035], [sh.est, 0.06], [sh.cta, 0.03], [sh.two, 0.05]]);
    plan.forEach(p => { if (DYS.has(p[2])) { const d = DYS.get(p[2]); p[2] = [lift(p[2][0], d), lift(p[2][1], d)]; } });
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: smooth, shake: SHAKE.includes(a) ? (t => (a === LAND - 0.15 ? 0.03 : 0.006) * Math.exp(-(t - a - (a === LAND - 0.15 ? 0.15 : 0)) * 6) * (t >= a + (a === LAND - 0.15 ? 0.15 : 0) ? 1 : 0)) : null }));
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



    // ---------- small HUD labels (the story is told by the 3D scenes) ----------
    const DARK = 'rgba(10,14,40,0.92)';
    const label = (t, t0, t1, s, bg = DARK, fg = '#fff', y = 230) => { if (t < t0 || t >= t1) return; chip(s, 540, y, 38, bg, fg, fin(t, t0, 0.25) * (1 - pr(t, t1 - 0.2, t1)), pop(t, t0, 0.35), 800); };
    const drawBeats = t => {
      if (t >= 0.5 && t < C.SHOW) stamp('🎬 1 SENTENCE = 1 MOVIE', 540, 360, 48, '#ffd34a', 0.6, t, -0.06, 'rgba(10,14,40,0.9)');
      if (t >= LAND + 0.05 && t < C.VIDS) stamp('🔊 WITH SOUND', 540, 380, 56, '#ffd34a', LAND + 0.6, t, -0.07, 'rgba(10,14,40,0.9)');
      label(t, C.VIDS + 0.1, C.BIR, '🎥 Google Vids · 15 sec from one line', '#1a73e8');
      if (t >= C.FREE && t < C.BIR) stamp('FREE ₹0', 540, 420, 80, '#2fbf71', B('free') + 0.1, t, -0.07, 'rgba(255,255,255,0.95)');
      if (t >= C.THREE + 0.2 && t < C.BIR) chip('3 videos a month · just a Google account', 540, 560, 32, DARK, '#fff', fin(t, C.THREE + 0.3, 0.25), pop(t, C.THREE + 0.3, 0.35), 700);
      if (t >= POUR + 0.8 && t < C.SLEEP) stamp('SLOW-MO 🍗', 540, 380, 56, '#ff9a2a', POUR + 0.8, t, 0.06, 'rgba(10,14,40,0.9)');
      if (t >= C.SLEEP + 0.3 && t < C.CTA) stamp('NEVER SLEEPING AGAIN 😵', 540, 380, 46, '#ffd34a', C.SLEEP + 0.3, t, -0.06, 'rgba(10,14,40,0.9)');
      if (t >= C.CTA) { const a = pop(t, C.CTA + 0.05, 0.45); scaleAt(540, 430, a, () => { h.save(); h.shadowColor = 'rgba(255,211,74,0.9)'; h.shadowBlur = 40; rr(140, 270, 800, 330, 40, DARK); h.restore();
        ft('🎬 Steps + 10 prompts', 540, 350, 52, '#fff', 700, 'center'); ft('that look insane', 540, 415, 44, '#ffd34a', 700, 'center');
        const pl = 1 + 0.05 * Math.sin(t * 7); scaleAt(540, 520, pl, () => { rr(190, 480, 700, 84, 42, '#ffd34a'); ft('💬 Comment anything', 540, 524, 42, '#1a1206', 800, 'center'); }); }); }
    };


    const vig = document.createElement('canvas'); vig.width = HW; vig.height = HH; { const x = vig.getContext('2d'), g = x.createRadialGradient(HW / 2, HH * 0.5, HH * 0.3, HW / 2, HH * 0.5, HH * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,10,0.35)'); x.fillStyle = g; x.fillRect(0, 0, HW, HH); }
    const cuts = [C.TYPED + 0.3, LAND - 0.15, BTYPE0 - 0.1, C.CTA];
    const flash = t => { let a = 0; cuts.forEach(c => { const d = t - c; if (d >= 0 && d < 0.18) a = Math.max(a, 1 - d / 0.18); }); return a; };
    const hudDraw = t => {
      h.clearRect(0, 0, HW, HH); h.globalAlpha = 1; h.drawImage(vig, 0, 0);
      drawBeats(t);
      const f = flash(t); if (f > 0) { h.fillStyle = `rgba(255,255,255,${f * 0.55})`; h.fillRect(0, 0, HW, HH); }
      const fi = 1 - pr(t, 0, 0.25); if (fi > 0) { h.fillStyle = `rgba(0,0,0,${fi})`; h.fillRect(0, 0, HW, HH); }
      h.fillStyle = 'rgba(255,255,255,0.14)'; h.fillRect(0, 0, HW, 6); const g = h.createLinearGradient(0, 0, HW, 0); g.addColorStop(0, '#ff9a3d'); g.addColorStop(1, '#ffd34a'); h.fillStyle = g; h.fillRect(0, 0, HW * cl(t / D), 6);
      hTex.needsUpdate = true; };
    const placeHud = t => { const visH = 2 * Math.tan(curFov(t) * Math.PI / 360); hud.scale.set(visH * HW / HH, visH, 1); hud.position.set(0, 0, -1); };
    const update = t => { K.shoot(t, shots); K.cam.updateMatrixWorld(true); acting(t); placeHud(t); hudDraw(t); };

    // ================= SOUND =================
    const sfx = [];
    sfx.push(['zap', 0.4, 0.2], ['pop', 0.6, 0.35], ['boing', B('show'), 0.2]);
    sfx.push(['whoosh', C.TYPED + 0.3, 0.3], ['type', TYPE0, 0.3], ['riser', LAND - 1.0, 0.3], ['whoosh', LAND - 0.5, 0.35], ['bass', LAND, 0.6], ['thud', LAND, 0.5], ['crunch', LAND + 0.05, 0.3], ['rustle', LAND + 0.2, 0.3], ['chime', LAND + 0.6, 0.3]);
    sfx.push(['whoosh', C.VIDS, 0.25], ['pop', C.VIDS + 0.1, 0.3], ['kaching', B('free') + 0.1, 0.4], ['boing', C.FREE, 0.2]);
    [0, 1, 2].forEach(i => sfx.push(['ding', B('three') + 0.9 + i * 0.35, 0.3]));
    sfx.push(['whoosh', BTYPE0 - 0.1, 0.3], ['type', BTYPE0, 0.3], ['riser', POUR, 0.3], ['rain', POUR + 0.4, 0.2], ['bass', POUR + 0.6, 0.4], ['whoosh', POUR + 1.2, 0.3]);
    sfx.push(['boing', C.SLEEP + 0.3, 0.3], ['whoosh', C.CTA, 0.3], ['chime', B('cta') + 0.5, 0.4]);
    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'Fredoka Light', capMarginV: 520, capSize: 66 };
  },
};
