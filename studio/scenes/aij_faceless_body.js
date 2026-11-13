/* @maddiee.makess reel 14 v2 — "Faceless channels" (comment ANIMATE). Phone screen: types in portrait, turns sideways to play each video.
   NEW LOCATION: a vintage home screening room — maroon walls, red velvet curtains round a projection screen, a tufted green
   loveseat (Maddie sits), popcorn, an old reel-to-reel film projector with a dusty beam, a NOW SHOWING bulb sign, floor lamp.
   Layout like the viral references: a floating "command" panel pops out of the screen in the top half (Claude Code window,
   the command typed key by key, "Running…", then the finished clip plays big inside it); the room + characters sit below.
   3 clips made in 3 styles: Zack D (3D, knuckle crack), Kurzgesagt-like flat space (Sun vs Earth), TED-Ed-like storybook
   (Everest in the trench). Vintage pass: film grain, dust, scratches, gate weave, warm faded grade, vignette, flicker.
   Full 9:16, no bars, no blush dots, no handle, no name tags. Maddie in the blue tee. */
window.SCENE = {
  setup: { width: 1080, height: 1920, bg: 0x140a0a, fog: [9, 30], fov: 38, bloom: null },
  lines: window.JR_LINES,

  build(K, T) {
    const L = T.lines, N = L.length;
    const IX = id => { const i = window.SCENE.lines.findIndex(l => l.id === id); if (i < 0) throw new Error('no line ' + id); return i; };
    const B = id => L[IX(id)].t, E = id => L[IX(id)].end;
    const D = E('cta') + 2.0;
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
    const CPS = 26;   // typing speed on the phone keyboard (chars / s)
    const CM = [
      { cmd: '/zack-d-films', arg: 'what happens when you crack your knuckles', title: 'Zack D style', col: '#e0672b', a: E('h3') - 0.2 },
      { cmd: '/kurzgesagt', arg: 'how big is the Sun', title: 'Space explainer', col: '#3f9be8', a: E('z2') + 0.15 },
      { cmd: '/ted-ed', arg: 'the deepest point in the ocean', title: 'Storybook style', col: '#c9902c', a: E('k2') + 0.15 },
    ];
    const C = { PHONE: B('h1') + 0.25, MIL: B('h1') + 0.5 * (E('h1') - B('h1')), PAID: B('h1') + 0.8 * (E('h1') - B('h1')), APP: B('h3') - 0.15, CTA: B('cta') - 0.3 };
    CM.forEach((c, i) => { c.full = c.cmd + ' ' + c.arg; c.ts = c.a + (i ? 0.55 : 0.3); c.te = c.ts + c.full.length / CPS; c.send = c.te + 0.15; c.rot = c.te + 1.05; c.clip = c.rot + 0.55; c.endL = i < 2 ? CM[i + 1].a : C.CTA; });
    const cmdAt = t => { let k = -1; CM.forEach((c, i) => { if (t >= c.a && t < C.CTA) k = i; }); return k; };
    const land = t => { let v = 0; CM.forEach(c => { if (t >= c.rot && t < c.endL + 0.45) v = t < c.clip ? sm(pr(t, c.rot, c.clip)) : t < c.endL ? 1 : 1 - sm(pr(t, c.endL, c.endL + 0.45)); }); return v; };
    const clipAt = t => { let k = -1; CM.forEach((c, i) => { if (t >= c.clip && t < c.endL) k = i; }); return k; };

    // ================= SCREENING ROOM =================
    const GZ = -2.0;
    const floorTex = K.canvasTex(512, 512, (x, w, h) => { const r = K.rng(3); for (let i = 0; i < 8; i++) { const c = 46 + r() * 16; x.fillStyle = `rgb(${c + 26},${c + 8},${c - 6})`; x.fillRect(0, i * 64, w, 64);
      x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, i * 64, w, 2); for (let k = 0; k < 40; k++) { x.fillStyle = `rgba(0,0,0,${0.04 + r() * 0.06})`; x.fillRect(r() * w, i * 64 + r() * 60, 30 + r() * 120, 1.5); } x.fillStyle = 'rgba(0,0,0,0.4)'; x.fillRect(r() * w, i * 64, 2, 64); } });
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(3, 4);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), SM(0xffffff, 0.6, { map: floorTex })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; S.add(floor);
    const rugTex = K.canvasTex(512, 320, (x, w, h) => { x.fillStyle = '#6e1f22'; x.fillRect(0, 0, w, h); x.strokeStyle = '#c99a4a'; x.lineWidth = 10; x.strokeRect(22, 22, w - 44, h - 44); x.lineWidth = 3; x.strokeRect(44, 44, w - 88, h - 88);
      x.fillStyle = '#c99a4a'; for (let i = 0; i < 5; i++) { x.save(); x.translate(w / 2, h / 2); x.rotate(i * Math.PI / 5); x.beginPath(); x.ellipse(0, 0, 110, 26, 0, 0, 7); x.fill(); x.restore(); } x.fillStyle = '#6e1f22'; x.beginPath(); x.arc(w / 2, h / 2, 30, 0, 7); x.fill(); });
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.75), SM(0xffffff, 0.95, { map: rugTex })); rug.rotation.x = -Math.PI / 2; rug.position.set(0.0, 0.004, -0.15); rug.receiveShadow = true; S.add(rug);
    // damask walls + wood wainscot
    const wallTex = K.canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#5a1b1f'; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,190,140,0.07)';
      for (const [cx, cy] of [[64, 64], [192, 192], [192, 64], [64, 192]]) { x.beginPath(); x.moveTo(cx, cy - 46); x.quadraticCurveTo(cx + 30, cy, cx, cy + 46); x.quadraticCurveTo(cx - 30, cy, cx, cy - 46); x.fill(); x.beginPath(); x.arc(cx, cy, 9, 0, 7); x.fill(); } });
    wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping; wallTex.repeat.set(10, 4);
    const wallM = SM(0xffffff, 0.9, { map: wallTex });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(12, 5), wallM); back.position.set(0, 2.5, GZ); back.receiveShadow = true; S.add(back);
    const sideW = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallM); sideW.rotation.y = Math.PI / 2; sideW.position.set(-3.0, 2.5, 1.5); S.add(sideW);
    const sideR = sideW.clone(); sideR.rotation.y = -Math.PI / 2; sideR.position.x = 3.0; S.add(sideR);
    const woodD = SM(0x3a2216, 0.55), woodM = SM(0x6a4128, 0.5), gold = SM(0xc99a4a, 0.35, { metalness: 0.6 });
    rbox(12, 0.85, 0.05, woodD, 0, 0.425, GZ + 0.03, 0.01); rbox(12, 0.05, 0.08, woodM, 0, 0.87, GZ + 0.05, 0.01);
    // projection screen + velvet curtains + valance
    const SCW = 2.3, SCH = 1.3, SCY = 2.15;
    const scC = document.createElement('canvas'); scC.width = 512; scC.height = 290; const scx = scC.getContext('2d'); const scTex = new THREE.CanvasTexture(scC); scTex.colorSpace = THREE.SRGBColorSpace;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(SCW, SCH), new THREE.MeshBasicMaterial({ map: scTex, toneMapped: false })); screen.position.set(0, SCY, GZ + 0.04); S.add(screen);
    rbox(SCW + 0.12, SCH + 0.12, 0.03, SM(0x111111, 0.6), 0, SCY, GZ + 0.02, 0.01);
    const velvet = SM(0x8e1620, 0.85, { emissive: 0x1a0204 });
    const curtain = (x0, dir) => { const g = new THREE.Group(); g.position.set(x0, 0, GZ + 0.22); S.add(g);
      for (let i = 0; i < 9; i++) { const f = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 2.95, 10), velvet); f.position.set(dir * i * 0.075, 1.5 + 0.0, (i % 2) * 0.04); f.castShadow = f.receiveShadow = true; g.add(f); }
      const tie = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.022, 8, 20), gold); tie.position.set(dir * 0.3, 1.25, 0.08); tie.scale.set(2.6, 1, 1); g.add(tie); return g; };
    curtain(-SCW / 2 - 0.08, -1); curtain(SCW / 2 + 0.08, 1);
    const val = rbox(SCW + 1.7, 0.36, 0.14, velvet, 0, SCY + SCH / 2 + 0.3, GZ + 0.26, 0.04);
    for (let i = 0; i < 26; i++) { const tas = cyl(0.012, 0.03, 0.09, gold, -1.95 + i * 0.156, SCY + SCH / 2 + 0.08, GZ + 0.34, 6); }
    rbox(SCW + 1.7, 0.04, 0.16, gold, 0, SCY + SCH / 2 + 0.13, GZ + 0.27, 0.01);
    // NOW SHOWING bulb sign (right) + framed poster (left)
    const signG = new THREE.Group(); signG.position.set(2.15, 1.75, GZ + 0.06); S.add(signG);
    const signTex = K.canvasTex(512, 300, (x, w, h) => { x.fillStyle = '#1a0f0a'; x.fillRect(0, 0, w, h); x.fillStyle = '#f6e7c6'; x.fillRect(26, 70, w - 52, h - 96);
      x.fillStyle = '#b5161f'; x.font = '900 46px "Fraunces"'; x.textAlign = 'center'; x.fillText('NOW SHOWING', w / 2, 52); x.fillStyle = '#1a0f0a'; x.font = 'italic 700 64px "Fraunces"'; x.fillText('One Line', w / 2, 150); x.font = '600 34px "Courier Prime"'; x.fillText('a Claude picture', w / 2, 210); });
    rbox(0.95, 0.58, 0.06, SM(0xffffff, 0.5, { map: signTex, emissive: 0xffffff, emissiveMap: signTex, emissiveIntensity: 0.35 }), 0, 0, 0, 0.02, signG);
    const bulbs = []; for (let i = 0; i < 22; i++) { const p = i / 22, per = 2 * (0.95 + 0.58); let d = p * per, x, y; if (d < 0.95) { x = -0.475 + d; y = 0.29; } else if ((d -= 0.95) < 0.58) { x = 0.475; y = 0.29 - d; } else if ((d -= 0.58) < 0.95) { x = 0.475 - d; y = -0.29; } else { d -= 0.95; x = -0.475; y = -0.29 + d; }
      const b = sph(0.022, new THREE.MeshBasicMaterial({ color: 0xffd27a, toneMapped: false }), x, y, 0.045, signG, 10); bulbs.push(b); }
    const signL = new THREE.PointLight(0xffc070, 0.9, 2.6, 1.6); signL.position.set(2.0, 1.75, GZ + 0.6); S.add(signL);
    const posterTex = K.canvasTex(320, 460, (x, w, h) => { x.fillStyle = '#e9d8b4'; x.fillRect(0, 0, w, h); x.save(); x.translate(w / 2, 200); for (let i = 0; i < 24; i++) { x.rotate(Math.PI / 12); x.fillStyle = i % 2 ? '#d9542c' : '#e9a23b'; x.beginPath(); x.moveTo(0, 0); x.lineTo(-30, -260); x.lineTo(30, -260); x.fill(); } x.restore();
      x.fillStyle = '#1d3b4a'; x.beginPath(); x.arc(w / 2, 200, 70, 0, 7); x.fill(); x.fillStyle = '#e9d8b4'; x.font = '900 40px "Fraunces"'; x.textAlign = 'center'; x.fillText('★', w / 2, 214);
      x.fillStyle = '#e9d8b4'; x.fillRect(0, 330, w, 130); x.fillStyle = '#1d3b4a'; x.font = '900 44px "Fraunces"'; x.fillText('MIDNIGHT', w / 2, 380); x.fillStyle = '#b5161f'; x.font = 'italic 700 38px "Fraunces"'; x.fillText('Facts', w / 2, 425); });
    rbox(0.64, 0.9, 0.04, woodD, -2.15, 1.85, GZ + 0.04, 0.01); const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.82), SM(0xffffff, 0.8, { map: posterTex })); poster.position.set(-2.15, 1.85, GZ + 0.07); S.add(poster);
    // floor lamp (right back)
    const lampG = new THREE.Group(); lampG.position.set(1.75, 0, -1.35); S.add(lampG);
    cyl(0.16, 0.18, 0.03, gold, 0, 0.015, 0, 20, lampG); cyl(0.014, 0.014, 1.5, gold, 0, 0.76, 0, 8, lampG);
    const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.25, 0.26, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xe8b874, roughness: 0.8, side: THREE.DoubleSide, emissive: 0xffa040, emissiveIntensity: 0.55 })); shade.position.y = 1.55; lampG.add(shade);
    const lampL = new THREE.PointLight(0xffa857, 1.3, 4, 1.5); lampL.position.set(1.75, 1.45, -1.35); lampL.castShadow = false; S.add(lampL);

    // tufted green loveseat
    const MX = -0.22, MZ = -0.62, SY = 0.47;
    const sofaG = new THREE.Group(); sofaG.position.set(0.05, 0, MZ - 0.02); S.add(sofaG);
    const velG = SM(0x2c4a3c, 0.85, { emissive: 0x050a07 });
    rbox(1.6, 0.26, 0.74, velG, 0, 0.24, 0, 0.06, sofaG);
    [-0.39, 0.39].forEach(x => rbox(0.76, 0.12, 0.66, velG, x, 0.41, 0.03, 0.06, sofaG));
    rbox(1.6, 0.66, 0.2, velG, 0, 0.72, -0.3, 0.09, sofaG);
    [-1, 1].forEach(s => { rbox(0.18, 0.5, 0.74, velG, s * 0.8, 0.43, 0, 0.08, sofaG); const roll = cyl(0.11, 0.11, 0.74, velG, s * 0.8, 0.68, 0, 18, sofaG); roll.rotation.x = Math.PI / 2; });
    for (let i = 0; i < 7; i++) for (let j = 0; j < 2; j++) sph(0.016, SM(0x1b2f25, 0.5), -0.6 + i * 0.2 + j * 0.1, 0.65 + j * 0.16, -0.195, sofaG, 8);
    [[-0.72, -0.28], [0.72, -0.28], [-0.72, 0.3], [0.72, 0.3]].forEach(([x, z]) => cyl(0.025, 0.035, 0.12, woodM, x, 0.06, z, 10, sofaG));
    // popcorn tub on the sofa, beside Maddie
    const popTex = K.canvasTex(256, 128, (x, w, h) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#f3ead8' : '#c4161f'; x.fillRect(i * 32, 0, 32, h); } x.fillStyle = '#f3ead8'; x.fillRect(80, 40, 96, 46); x.fillStyle = '#c4161f'; x.font = '900 30px "Fraunces"'; x.textAlign = 'center'; x.fillText('POP', 128, 74); });
    const popG = new THREE.Group(); popG.position.set(0.22, SY, MZ + 0.05); S.add(popG);
    const tub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.22, 24, 1, true), SM(0xffffff, 0.6, { map: popTex, side: THREE.DoubleSide })); tub.position.y = 0.11; popG.add(tub);
    const pr2 = K.rng(11); for (let i = 0; i < 34; i++) { const a = pr2() * 7, r = Math.sqrt(pr2()) * 0.1; sph(0.022 + pr2() * 0.01, SM(0xf6e2a8, 0.8), Math.cos(a) * r, 0.21 + (0.1 - r) * 0.5 + pr2() * 0.03, Math.sin(a) * r, popG, 7); }
    // vintage film projector on a round side table (left foreground), throwing a dusty beam at the screen
    const PJ = V(-1.25, 0, 0.55);
    cyl(0.3, 0.3, 0.035, woodM, PJ.x, 0.7, PJ.z, 28); cyl(0.03, 0.04, 0.68, woodD, PJ.x, 0.35, PJ.z, 10); cyl(0.2, 0.22, 0.03, woodD, PJ.x, 0.015, PJ.z, 20);
    const pjG = new THREE.Group(); pjG.position.set(PJ.x, 0.72, PJ.z); S.add(pjG); pjG.lookAt(0, 0.72 + 0.6, GZ); pjG.rotateY(Math.PI);
    const pjM = SM(0x34413a, 0.45, { metalness: 0.5 }), pjD = SM(0x15191a, 0.4, { metalness: 0.5 });
    rbox(0.22, 0.2, 0.34, pjM, 0, 0.12, 0, 0.03, pjG);
    const pLens = cyl(0.05, 0.055, 0.16, pjD, 0, 0.13, -0.24, 18, pjG); pLens.rotation.x = Math.PI / 2;
    const lensGlow = new THREE.Mesh(new THREE.CircleGeometry(0.043, 20), BM(0xfff3d0)); lensGlow.position.set(0, 0.13, -0.322); lensGlow.rotation.y = Math.PI; pjG.add(lensGlow);
    const reelTex = K.canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#2a2f30'; x.beginPath(); x.arc(64, 64, 62, 0, 7); x.fill(); x.globalCompositeOperation = 'destination-out'; for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; x.beginPath(); x.arc(64 + Math.cos(a) * 34, 64 + Math.sin(a) * 34, 17, 0, 7); x.fill(); } x.beginPath(); x.arc(64, 64, 5, 0, 7); x.fill(); });
    const reels = [[0.17, 0.14], [0.17, -0.16]].map(([y, z], i) => { const arm = rbox(0.02, 0.16, 0.02, pjD, 0, 0.2 + i * 0.0, z * 0.7, 0.005, pjG); arm.rotation.x = i ? -0.5 : 0.5;
      const r = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), new THREE.MeshStandardMaterial({ map: reelTex, transparent: true, side: THREE.DoubleSide, roughness: 0.4, metalness: 0.6, alphaTest: 0.3 })); r.position.set(0.0, 0.3 + y * 0.5, z * 1.25); r.rotation.y = Math.PI / 2; pjG.add(r); return r; });
    // beam: soft cone from lens to the screen + floating dust
    const lensW = new THREE.Vector3(); S.updateMatrixWorld(true); lensGlow.getWorldPosition(lensW);
    const scrC = V(0, SCY, GZ + 0.05), beamLen = lensW.distanceTo(scrC);
    const beamTex = K.canvasTex(64, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,236,190,0.0)'); g.addColorStop(0.15, 'rgba(255,236,190,0.16)'); g.addColorStop(1, 'rgba(255,236,190,0.5)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.03, beamLen, 32, 1, true), new THREE.MeshBasicMaterial({ map: beamTex, transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false, blending: THREE.AdditiveBlending, opacity: 0.32 }));
    beam.position.copy(lensW.clone().add(scrC).multiplyScalar(0.5)); beam.lookAt(scrC); beam.rotateX(Math.PI / 2); S.add(beam);
    const dustN = 140, dustG = new THREE.BufferGeometry(), dustP = new Float32Array(dustN * 3), dSeed = []; const dr = K.rng(21);
    for (let i = 0; i < dustN; i++) dSeed.push([dr(), dr(), dr(), dr()]);
    dustG.setAttribute('position', new THREE.BufferAttribute(dustP, 3));
    const dustTex = K.canvasTex(32, 32, (x) => { const g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, 'rgba(255,240,210,1)'); g.addColorStop(1, 'rgba(255,240,210,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); });
    const dust = new THREE.Points(dustG, new THREE.PointsMaterial({ size: 0.018, map: dustTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, opacity: 0.8 })); S.add(dust);
    const bDir = scrC.clone().sub(lensW).normalize(), bSide = new THREE.Vector3().crossVectors(bDir, V(0, 1, 0)).normalize(), bUp = new THREE.Vector3().crossVectors(bSide, bDir).normalize();

    // ================= CHARACTERS =================
    const M = K.makeToyMaddie({ seatY: SY, shirt: 0x2f3e5c, pants: 0x7a8aa6 }); M.g.position.set(MX, 0, MZ + 0.05); M.g.rotation.y = 0.1; S.add(M.g);   // the blue tee from the viral reel
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
        drawFace(mood === 'smile' ? 'happy' : mood, talk * 1.3, blink && !['smile', 'wink', 'flat', 'star'].includes(mood));
        thr.material.opacity = 0.7 + 0.3 * Math.sin(t * 20); thr.scale.setScalar(1 + 0.1 * Math.sin(t * 13));
        glowL.intensity = 0.2 + talk * 0.6;
      };
      return r;
    })();
    R.g.traverse(o => { o.castShadow = false; });

    // ================= LIGHT =================
    const hemi = new THREE.HemisphereLight(0xffd9b8, 0x2a1210, 0.42); S.add(hemi);
    const key = new THREE.DirectionalLight(0xffd2a6, 1.05); key.position.set(1.4, 2.8, 2.6); key.target.position.set(0, 0.9, -0.6); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0006;
    key.shadow.camera.left = -2.5; key.shadow.camera.right = 2.5; key.shadow.camera.top = 2.8; key.shadow.camera.bottom = -2.5; S.add(key); S.add(key.target);
    const scrL = new THREE.SpotLight(0xdde6ff, 1.6, 6, 1.0, 0.8, 1.2); scrL.position.set(0, SCY - 0.2, GZ + 0.3); scrL.target.position.set(0, 1.0, 1.5); S.add(scrL); S.add(scrL.target);
    const rim = new THREE.DirectionalLight(0xff9a6a, 0.55); rim.position.set(-1.8, 2.2, -2.5); S.add(rim);
    const faceFill = new THREE.PointLight(0xffe2c8, 0.9, 4.5, 1.6); faceFill.position.set(0.0, 1.75, 1.3); S.add(faceFill);   // soft front fill so Maddie's face reads well

    // ================= ZACK D CLIP (a real 3D mini-scene, rendered to a texture) =================
    const CW = 960, CH = 540;
    const rtClip = new THREE.WebGLRenderTarget(CW, CH, { samples: 4 });
    const zS = new THREE.Scene(), zCam = new THREE.PerspectiveCamera(30, CW / CH, 0.01, 60);
    const zBg = K.canvasTex(256, 256, (x, w, h) => { const g = x.createRadialGradient(w * 0.5, h * 0.45, 10, w * 0.5, h * 0.5, w * 0.75); g.addColorStop(0, '#f2efe9'); g.addColorStop(1, '#9fa6b3'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    zS.background = zBg;
    zS.add(new THREE.HemisphereLight(0xffffff, 0x8a7a70, 1.25)); const zk = new THREE.DirectionalLight(0xfff1e2, 2.0); zk.position.set(2, 4, 3); zS.add(zk); const zr = new THREE.DirectionalLight(0xbcd4ff, 1.0); zr.position.set(-3, 2, -2); zS.add(zr);
    const skin = new THREE.MeshPhysicalMaterial({ color: 0xe6a184, roughness: 0.55, sheen: 0.6, sheenColor: new THREE.Color(0xffc6a6), sheenRoughness: 0.5, clearcoat: 0.15, clearcoatRoughness: 0.6 });
    const nail = new THREE.MeshPhysicalMaterial({ color: 0xf6d3c8, roughness: 0.25, clearcoat: 0.8 });
    const hand = new THREE.Group(); zS.add(hand);
    rbox(0.95, 0.24, 0.84, skin, 0, 0, 0, 0.11, hand);
    const knuckleBumps = [];
    const fingers = [0, 1, 2, 3].map(i => { const z = -0.3 + i * 0.2, lens = [[0.34, 0.22, 0.18], [0.38, 0.25, 0.19], [0.36, 0.24, 0.18], [0.28, 0.18, 0.15]][i], th = [0.175, 0.18, 0.172, 0.15][i];
      let parent = hand, x0 = 0.44; const joints = [];
      lens.forEach((len, k) => { const j = new THREE.Group(); j.position.set(x0, 0.02, k ? 0 : z); parent.add(j); joints.push(j);
        const seg = rbox(len, th - k * 0.012, th - k * 0.012, skin, len / 2, 0, 0, 0.07 - k * 0.008, j);
        if (k < 2) { const kb = sph(th * 0.38, skin, 0, 0.05, 0, j, 16); kb.scale.set(1, 0.6, 1); knuckleBumps.push(kb); }
        if (k === 2) { const n = rbox(len * 0.45, 0.02, th * 0.7, nail, len * 0.72, th / 2 - 0.02, 0, 0.01, j); }
        parent = j; x0 = len; });
      return joints; });
    const thumb = new THREE.Group(); thumb.position.set(0.15, -0.02, 0.43); thumb.rotation.y = -0.7; hand.add(thumb); rbox(0.36, 0.19, 0.19, skin, 0.18, 0, 0, 0.08, thumb); const th2 = new THREE.Group(); th2.position.x = 0.36; thumb.add(th2); rbox(0.25, 0.17, 0.17, skin, 0.12, 0, 0, 0.07, th2); rbox(0.1, 0.02, 0.12, nail, 0.18, 0.075, 0, 0.01, th2);
    const wrist = cyl(0.33, 0.36, 0.7, skin, -0.75, 0, 0, 32, hand); wrist.rotation.z = Math.PI / 2; wrist.scale.set(1, 1, 0.55);
    // the joint cross-section (cut to it after the crack)
    const JX = 20, jointG = new THREE.Group(); jointG.position.set(JX, 0, 0); zS.add(jointG);
    const boneM = SM(0xf1e5cc, 0.65), cartM = new THREE.MeshPhysicalMaterial({ color: 0xdfeaf2, roughness: 0.2, clearcoat: 1 });
    const bone = (dir) => { const g = new THREE.Group(); jointG.add(g); const sh = cyl(0.17, 0.2, 1.1, boneM, dir * 0.72, 0, 0, 28, g); sh.rotation.z = Math.PI / 2; const end = sph(0.24, boneM, dir * 0.18, 0, 0, g, 32); end.scale.set(0.8, 1, 1); const cap = sph(0.245, cartM, dir * 0.15, 0, 0, g, 32); cap.scale.set(0.55, 0.96, 0.96); return g; };
    const boneL = bone(-1), boneR = bone(1);
    const capsule = new THREE.Mesh(new THREE.SphereGeometry(0.5, 40, 28), new THREE.MeshPhysicalMaterial({ color: 0xff8f9f, roughness: 0.3, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide, clearcoat: 0.6 })); capsule.scale.set(1.15, 0.72, 0.72); jointG.add(capsule);
    const fluid = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 22), new THREE.MeshPhysicalMaterial({ color: 0xbfe0ff, roughness: 0.1, transparent: true, opacity: 0.22, depthWrite: false })); fluid.scale.set(0.6, 0.62, 0.62); jointG.add(fluid);
    const bubM = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.02, transmission: 0.0, transparent: true, opacity: 0.6, clearcoat: 1, emissive: 0x9fd8ff, emissiveIntensity: 0.25 });
    const bubbles = []; const br = K.rng(31); for (let i = 0; i < 9; i++) { const b = sph(1, bubM, 0, 0, 0, jointG, 20); b.userData = { y: (br() - 0.5) * 0.5, z: (br() - 0.5) * 0.4, x: (br() - 0.5) * 0.08, d: br() * 0.3, s: 0.02 + br() * 0.025 }; bubbles.push(b); }
    const bigBub = sph(1, bubM, 0, 0, 0, jointG, 32);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(1, 0.03, 8, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, toneMapped: false })); ringB.rotation.y = Math.PI / 2; jointG.add(ringB);
    const drops = []; for (let i = 0; i < 16; i++) { const d = sph(0.022, bubM, 0, 0, 0, jointG, 10); d.userData = { a: br() * 7, b: (br() - 0.5) * 2, v: 0.6 + br() * 0.7 }; drops.push(d); }
    const tissue = new THREE.Mesh(new THREE.PlaneGeometry(6, 3.5), new THREE.MeshBasicMaterial({ map: K.canvasTex(256, 256, (x, w, h) => { const g = x.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.7); g.addColorStop(0, '#f7c7c0'); g.addColorStop(1, '#9e4b55'); x.fillStyle = g; x.fillRect(0, 0, w, h); const r = K.rng(5); for (let i = 0; i < 60; i++) { x.strokeStyle = `rgba(150,40,60,${0.08 + r() * 0.1})`; x.lineWidth = 2 + r() * 3; x.beginPath(); x.moveTo(r() * w, r() * h); x.bezierCurveTo(r() * w, r() * h, r() * w, r() * h, r() * w, r() * h); x.stroke(); } }) })); tissue.position.set(JX, 0, -1.2); zS.add(tissue);
    const ZK = { CUT: 1.95, POP: 3.25 };   // clip-local times (s)
    const updZack = (ct) => {
      if (ct < ZK.CUT) {   // the hand cracks its knuckles, finger by finger, camera pushing in
        fingers.forEach((jn, i) => { const a = 0.45 + i * 0.3, k = ct < a ? 0 : ct < a + 0.12 ? eo((ct - a) / 0.12) : 1 - 0.25 * eo(pr(ct, a + 0.12, a + 0.5));
          jn[0].rotation.z = -0.95 * k; jn[1].rotation.z = -1.25 * k; jn[2].rotation.z = -0.7 * k; });
        const snap = [0, 1, 2, 3].reduce((m, i) => Math.max(m, K.pulse(ct, 0.45 + i * 0.3 + 0.1, 0.18)), 0);
        hand.position.y = -0.02 * snap; hand.rotation.set(0.05 * snap, 0, 0);
        const p = sm(pr(ct, 0, ZK.CUT));
        zCam.position.set(lerp(0.2, 0.75, p), lerp(1.7, 0.95, p), lerp(2.6, 1.35, p)); zCam.lookAt(lerp(0.3, 0.55, p), lerp(-0.05, 0.0, p), lerp(0.0, -0.2, p)); zCam.fov = 30;
      } else {   // cross-section: the joint stretches, gas bubbles form, one big one POPS
        const j = ct - ZK.CUT, gap = 0.04 + 0.07 * eo(pr(j, 0.3, 1.0)) - 0.05 * eo(pr(ct, ZK.POP, ZK.POP + 0.15));
        boneL.position.x = -gap; boneR.position.x = gap;
        bubbles.forEach(b => { const u = b.userData, k = eo(pr(j, 0.35 + u.d, 0.75 + u.d)) * (1 - eo(pr(ct, ZK.POP - 0.15, ZK.POP))); b.scale.setScalar(Math.max(0.0001, u.s * k)); b.position.set(u.x + Math.sin(j * 3 + u.d * 10) * 0.01, u.y * 0.7, u.z); });
        const bk = ct < ZK.POP ? eo(pr(j, 0.6, ZK.POP - ZK.CUT)) * (1 + 0.06 * Math.sin(j * 30)) : 0; bigBub.scale.setScalar(Math.max(0.0001, 0.13 * bk));
        const pk = pr(ct, ZK.POP, ZK.POP + 0.5); ringB.visible = ct >= ZK.POP && pk < 1; ringB.scale.setScalar(0.05 + 0.45 * eo(pk)); ringB.material.opacity = 1 - pk;
        drops.forEach(d => { const u = d.userData, q = pr(ct, ZK.POP, ZK.POP + 0.7); d.visible = ct >= ZK.POP && q < 1; d.position.set(Math.cos(u.a) * 0.4 * eo(q) * u.v * 0.3, Math.sin(u.a) * 0.4 * eo(q) * u.v, u.b * 0.25 * eo(q)); d.scale.setScalar(1 - q); });
        const sh = ct >= ZK.POP ? 0.02 * Math.exp(-(ct - ZK.POP) * 8) * Math.sin(ct * 90) : 0;
        const p = sm(pr(j, 0, 1.0)), q = eo(pr(ct, ZK.POP + 0.3, ZK.POP + 2.5));
        zCam.position.set(JX + lerp(0.6, 0.15, p) + sh - 0.25 * q, lerp(0.45, 0.25, p) + sh, lerp(2.4, 1.75, p) + 0.35 * q); zCam.lookAt(JX, 0, 0); zCam.fov = 32;
      }
      zCam.updateProjectionMatrix();
    };

    // ================= 2D CLIPS (flat space + storybook), drawn into a canvas texture =================
    const cc = document.createElement('canvas'); cc.width = CW; cc.height = CH; const c2 = cc.getContext('2d'); const ccTex = new THREE.CanvasTexture(cc); ccTex.colorSpace = THREE.SRGBColorSpace;
    const stars = []; { const r = K.rng(41); for (let i = 0; i < 160; i++) stars.push([r() * CW, r() * CH, 0.6 + r() * 1.8, r() * 7]); }
    const drawEarth = (x, y, r, c = c2) => { if (r < 1.2) { c.fillStyle = '#5fb3ff'; c.beginPath(); c.arc(x, y, 1.6, 0, 7); c.fill(); return; }
      c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.clip(); c.fillStyle = '#2f7fd8'; c.fillRect(x - r, y - r, 2 * r, 2 * r);
      c.fillStyle = '#4cbf74'; [[-0.35, -0.25, 0.42, 0.3, 0.4], [0.3, 0.15, 0.35, 0.45, -0.3], [-0.1, 0.55, 0.3, 0.16, 0.1], [0.45, -0.5, 0.22, 0.14, 0.6]].forEach(([dx, dy, a, b, rot]) => { c.beginPath(); c.ellipse(x + dx * r, y + dy * r, a * r, b * r, rot, 0, 7); c.fill(); });
      c.fillStyle = 'rgba(255,255,255,0.75)'; [[-0.5, 0.1, 0.3, 0.06], [0.1, -0.35, 0.36, 0.07], [0.2, 0.5, 0.28, 0.05]].forEach(([dx, dy, a, b]) => { c.beginPath(); c.ellipse(x + dx * r, y + dy * r, a * r, b * r, -0.2, 0, 7); c.fill(); });
      c.fillStyle = 'rgba(8,16,48,0.42)'; c.beginPath(); c.arc(x + r * 0.45, y + r * 0.35, r * 1.05, 0, 7); c.fill(); c.restore();
      c.strokeStyle = 'rgba(160,215,255,0.9)'; c.lineWidth = Math.max(1.5, r * 0.04); c.beginPath(); c.arc(x, y, r, Math.PI * 0.95, Math.PI * 1.7); c.stroke(); };
    const drawSun = (x, y, r, t, c = c2) => { [[2.2, 0.06], [1.6, 0.1], [1.25, 0.18]].forEach(([m, a]) => { c.fillStyle = `rgba(255,150,40,${a})`; c.beginPath(); c.arc(x, y, r * m, 0, 7); c.fill(); });
      c.fillStyle = '#ff8a1f'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.fillStyle = '#ffae2e'; c.beginPath(); c.arc(x - r * 0.06, y - r * 0.06, r * 0.86, 0, 7); c.fill(); c.fillStyle = '#ffcd4a'; c.beginPath(); c.arc(x - r * 0.14, y - r * 0.14, r * 0.62, 0, 7); c.fill();
      c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.clip(); const rr2 = K.rng(9); for (let i = 0; i < 40; i++) { const a = rr2() * 7, d = Math.sqrt(rr2()) * r; c.fillStyle = `rgba(255,${200 + rr2() * 40},${90 + rr2() * 60},0.35)`; c.beginPath(); c.ellipse(x + Math.cos(a) * d, y + Math.sin(a) * d, r * (0.04 + rr2() * 0.05), r * (0.025 + rr2() * 0.03), a + t * 0.2, 0, 7); c.fill(); } c.restore();
      c.fillStyle = '#ff7a1a'; for (let i = 0; i < 3; i++) { const a = -1.9 + i * 1.7 + Math.sin(t * 0.8 + i) * 0.05; c.save(); c.translate(x + Math.cos(a) * r, y + Math.sin(a) * r); c.rotate(a); c.beginPath(); c.moveTo(0, -r * 0.06); c.quadraticCurveTo(r * 0.18, 0, 0, r * 0.06); c.fill(); c.restore(); } };
    const KZ = { ZOOM0: 0.5, ZOOM1: 2.4, CNT0: 2.4, CNT1: 4.2 };
    const drawKurz = (ct) => { const c = c2; c.setTransform(1, 0, 0, 1, 0, 0);
      const bg = c.createRadialGradient(CW * 0.5, CH * 0.5, 40, CW * 0.5, CH * 0.5, CW * 0.7); bg.addColorStop(0, '#16285a'); bg.addColorStop(1, '#0a1230'); c.fillStyle = bg; c.fillRect(0, 0, CW, CH);
      stars.forEach(([x, y, s, ph]) => { c.fillStyle = `rgba(255,255,240,${0.35 + 0.35 * Math.sin(ct * 2 + ph)})`; c.beginPath(); c.arc(x, y, s, 0, 7); c.fill(); });
      const p = sm(pr(ct, KZ.ZOOM0, KZ.ZOOM1)); const s0 = 150, s1 = 1.9, sc = Math.exp(lerp(Math.log(s0), Math.log(s1), p));
      const ex0 = lerp(CW / 2, 300, p); const X = wx => ex0 + wx * sc, Y = CH / 2 + 10;
      drawSun(X(136), Y, 109 * sc, ct); drawEarth(X(0), Y, Math.max(1, sc * (1 + 0.02 * Math.sin(ct * 3))));
      // the "Earth" label follows the tiny planet
      const ex = X(0), er = sc; c.font = '800 30px "Inter Display"'; c.textAlign = 'center'; c.fillStyle = '#fff';
      if (p < 0.2) c.fillText('Earth', ex, Y + er + 46); else { const ky = Y - 70; c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 3; c.beginPath(); c.moveTo(ex, Y - Math.max(er, 3) - 6); c.lineTo(ex, ky + 14); c.stroke(); c.fillText('Earth', ex, ky); }
      // fill the Sun with Earths + count them
      const fp = pr(ct, KZ.CNT0, KZ.CNT1); if (fp > 0) { const sx = X(136), sr = 109 * sc, r3 = K.rng(77), n = Math.floor(900 * eo(fp)); c.save(); c.beginPath(); c.arc(sx, Y, sr, 0, 7); c.clip(); for (let i = 0; i < 900; i++) { const a = r3() * 7, d = Math.sqrt(r3()) * sr * 0.97; if (i < n) { c.fillStyle = i % 3 ? '#4aa3f0' : '#4cbf74'; c.beginPath(); c.arc(sx + Math.cos(a) * d, Y + Math.sin(a) * d, 3.2, 0, 7); c.fill(); } } c.restore();
        const val = Math.round(1300000 * eo(fp)); c.textAlign = 'center'; c.font = '900 64px "Inter Display"'; c.lineWidth = 10; c.strokeStyle = '#0a1230'; c.strokeText('× ' + val.toLocaleString('en-US'), CW / 2, 92); c.fillStyle = '#ffd34a'; c.fillText('× ' + val.toLocaleString('en-US'), CW / 2, 92);
        c.font = '800 30px "Inter Display"'; c.fillStyle = '#fff'; c.fillText('Earths fit inside the Sun', CW / 2, 138); }
      ccTex.needsUpdate = true; };
    // storybook (paper, ink lines that "boil" at 12 fps)
    const paper = document.createElement('canvas'); paper.width = CW; paper.height = CH; { const x = paper.getContext('2d'); x.fillStyle = '#efe2c4'; x.fillRect(0, 0, CW, CH); const r = K.rng(8); for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '120,90,50' : '255,250,235'},${0.05 + r() * 0.07})`; x.fillRect(r() * CW, r() * CH, 1 + r() * 2, 1 + r() * 2); } const g = x.createRadialGradient(CW / 2, CH / 2, CH * 0.3, CW / 2, CH / 2, CW * 0.65); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(90,55,20,0.35)'); x.fillStyle = g; x.fillRect(0, 0, CW, CH); }
    const TD = { SURF: 78, KM: 37.5, X0: 150 }, yKm = km => TD.SURF + km * TD.KM;
    const TE = { DIVE1: 1.4, DROP0: 1.55, DROP1: 2.35, SPARE: 2.8 };
    const drawTed = (ct) => { const c = c2; c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(paper, 0, 0); const fr = Math.floor(ct * 12), jr = K.rng(1000 + fr), j = (a = 1.6) => (jr() - 0.5) * a;
      const ink = '#3a2618'; c.lineJoin = c.lineCap = 'round';
      // sky band + sun
      c.fillStyle = '#f3c98a'; c.fillRect(0, 0, CW, TD.SURF); c.fillStyle = '#e8873a'; c.beginPath(); c.arc(820 + j(), 40 + j(), 22, 0, 7); c.fill();
      // ocean: water fills downward as we "dive"
      const dive = sm(pr(ct, 0, TE.DIVE1)), wy = TD.SURF + dive * (yKm(10.935) - TD.SURF + 10);
      const floorPts = [[60, yKm(3.7)], [330, yKm(3.9)], [380, yKm(6)], [430, yKm(10.935)], [600, yKm(10.935)], [650, yKm(6.2)], [700, yKm(3.8)], [CW, yKm(3.6)]];
      c.save(); c.beginPath(); c.rect(60, TD.SURF, CW - 60, wy - TD.SURF); c.clip();
      [['#9fc7c9', 0], ['#6fa5b3', 0.25], ['#457d96', 0.5], ['#2b5671', 0.75]].forEach(([col, k]) => { c.fillStyle = col; c.fillRect(60, yKm(k * 11), CW, CH); });
      c.restore();
      // seafloor + trench (ink outline, hatching)
      c.fillStyle = '#8c6a4a'; c.beginPath(); c.moveTo(60, CH); floorPts.forEach(([x, y]) => c.lineTo(x + j(), y + j())); c.lineTo(CW, CH); c.closePath(); c.fill();
      c.strokeStyle = ink; c.lineWidth = 3.2; c.beginPath(); floorPts.forEach(([x, y], i) => i ? c.lineTo(x + j(), y + j()) : c.moveTo(x + j(), y + j())); c.stroke();
      c.strokeStyle = 'rgba(58,38,24,0.35)'; c.lineWidth = 1.5; for (let i = 0; i < 40; i++) { const x = 70 + i * 22; c.beginPath(); c.moveTo(x + j(), CH - 4); c.lineTo(x + 14 + j(), CH - 30); c.stroke(); }
      // wavy surface line
      c.strokeStyle = ink; c.lineWidth = 3; c.beginPath(); for (let x = 60; x <= CW; x += 20) { const y = TD.SURF + Math.sin(x * 0.05 + ct * 3) * 2.5; x === 60 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke();
      // a little sketch submarine dives with the water line
      if (ct < TE.DROP0 + 0.4) { const sy = Math.min(wy - 18, yKm(10.4)), sx = 515; c.save(); c.translate(sx + j(), sy + j()); c.fillStyle = '#e6b54a'; c.strokeStyle = ink; c.lineWidth = 2.5; c.beginPath(); c.ellipse(0, 0, 34, 14, 0, 0, 7); c.fill(); c.stroke(); c.fillRect(-6, -22, 14, 10); c.strokeRect(-6, -22, 14, 10); c.fillStyle = 'rgba(255,240,180,0.35)'; c.beginPath(); c.moveTo(30, 0); c.lineTo(110, -30); c.lineTo(110, 30); c.fill(); c.restore(); }
      // depth ruler (left)
      c.strokeStyle = ink; c.lineWidth = 2.5; c.beginPath(); c.moveTo(60, TD.SURF); c.lineTo(60, yKm(11)); c.stroke(); c.font = 'italic 600 20px "Fraunces"'; c.fillStyle = ink; c.textAlign = 'right';
      for (let k = 0; k <= 11; k++) { c.beginPath(); c.moveTo(52, yKm(k)); c.lineTo(68, yKm(k)); c.stroke(); if (k % 2 === 0) c.fillText(k + ' km', 46, yKm(k) + 7); }
      const dm = Math.min(10935, Math.round(10935 * dive)); const my = yKm(dm / 1000); c.fillStyle = '#b5161f'; c.beginPath(); c.moveTo(70, my); c.lineTo(86, my - 9); c.lineTo(86, my + 9); c.fill();
      c.textAlign = 'left'; c.font = '700 24px "Courier Prime"'; c.fillStyle = '#b5161f'; c.fillText(dm.toLocaleString('en-US') + ' m', 92, my + 8);
      if (ct > TE.DIVE1) { c.globalAlpha = eo(pr(ct, TE.DIVE1, TE.DIVE1 + 0.3)); c.font = 'italic 700 24px "Fraunces"'; c.fillStyle = '#f3e7cc'; c.textAlign = 'center'; c.fillText('Challenger Deep', 515, yKm(10.935) - 14); c.globalAlpha = 1; }
      // Everest drops in from the sky and settles on the trench floor
      if (ct > TE.DROP0) { const q = pr(ct, TE.DROP0, TE.DROP1), b = q < 1 ? q * q : 1, bounce = ct > TE.DROP1 ? Math.exp(-(ct - TE.DROP1) * 7) * Math.sin((ct - TE.DROP1) * 30) * 8 : 0;
        const baseY = lerp(yKm(10.935) - 380, yKm(10.935), b) - bounce, peakY = baseY - 8.849 * TD.KM, cx = 515, hw = 92;
        c.save(); c.translate(j(), j()); c.fillStyle = '#7d7f86'; c.beginPath(); c.moveTo(cx - hw, baseY); c.lineTo(cx - 22, peakY + 40); c.lineTo(cx, peakY); c.lineTo(cx + 26, peakY + 46); c.lineTo(cx + hw, baseY); c.closePath(); c.fill();
        c.fillStyle = '#5e6068'; c.beginPath(); c.moveTo(cx, peakY); c.lineTo(cx + 26, peakY + 46); c.lineTo(cx + hw, baseY); c.lineTo(cx + 18, baseY); c.closePath(); c.fill();
        c.fillStyle = '#f6f1e4'; c.beginPath(); c.moveTo(cx - 30, peakY + 52); c.lineTo(cx - 22, peakY + 40); c.lineTo(cx, peakY); c.lineTo(cx + 26, peakY + 46); c.lineTo(cx + 34, peakY + 60); c.lineTo(cx + 12, peakY + 50); c.lineTo(cx - 4, peakY + 64); c.lineTo(cx - 16, peakY + 50); c.closePath(); c.fill();
        c.strokeStyle = ink; c.lineWidth = 3; c.beginPath(); c.moveTo(cx - hw, baseY); c.lineTo(cx - 22, peakY + 40); c.lineTo(cx, peakY); c.lineTo(cx + 26, peakY + 46); c.lineTo(cx + hw, baseY); c.stroke();
        c.lineWidth = 1.4; for (let i = 0; i < 9; i++) { const yy = peakY + 80 + i * 26; c.beginPath(); c.moveTo(cx + 10 + i * 6, yy); c.lineTo(cx + 30 + i * 6, yy + 16); c.stroke(); }
        c.fillStyle = '#b5161f'; c.fillRect(cx - 1, peakY - 30, 3, 30); c.beginPath(); c.moveTo(cx + 2, peakY - 30); c.lineTo(cx + 24, peakY - 23); c.lineTo(cx + 2, peakY - 16); c.fill(); c.restore();
        c.font = 'italic 700 26px "Fraunces"'; c.fillStyle = '#3a2618'; c.textAlign = 'left'; c.globalAlpha = eo(pr(ct, TE.DROP1, TE.DROP1 + 0.3)); c.fillText('Mt. Everest  8,849 m', cx + 105, baseY - 120); c.globalAlpha = 1;
        // "2 km to spare" bracket between the summit and the surface
        if (ct > TE.SPARE) { const k = eo(pr(ct, TE.SPARE, TE.SPARE + 0.35)), bx = cx + 70; c.strokeStyle = '#b5161f'; c.lineWidth = 3.5; c.beginPath(); c.moveTo(bx, TD.SURF + 4); c.lineTo(bx, lerp(TD.SURF + 4, peakY, k)); c.stroke();
          [[TD.SURF + 4, 1], [peakY, -1]].forEach(([y, s]) => { c.beginPath(); c.moveTo(bx - 9, y + s * 11); c.lineTo(bx, y); c.lineTo(bx + 9, y + s * 11); c.stroke(); });
          c.globalAlpha = k; c.save(); c.translate(bx + 18, (TD.SURF + peakY) / 2 + 9); c.rotate(-0.04); c.font = 'italic 800 34px "Fraunces"'; c.fillStyle = '#b5161f'; c.fillText('≈ 2 km to spare', 0, 0); c.restore(); c.globalAlpha = 1; } }
      ccTex.needsUpdate = true; };

    // ================= POST: 3D grade (warm, faded) =================
    const rtMain = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
    const bloom = new POST.UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.55, 0.6, 0.9);
    const oCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postU = { tC: { value: rtMain.texture }, res: { value: new THREE.Vector2(W, H) }, time: { value: 0 }, flash: { value: 0 }, weave: { value: new THREE.Vector2() } };
    const postM = new THREE.ShaderMaterial({ uniforms: postU, depthTest: false, depthWrite: false, toneMapped: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `
        precision highp float; varying vec2 vUv; uniform sampler2D tC; uniform vec2 res, weave; uniform float time, flash;
        vec3 aces(vec3 x){ return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14), 0., 1.); }
        vec3 srgb(vec3 c){ c = clamp(c, 0., 1.); return mix(c*12.92, 1.055*pow(c, vec3(1./2.4))-0.055, step(0.0031308, c)); }
        void main(){ vec2 uv = vUv + weave / res;
          vec3 c = srgb(aces(texture2D(tC, uv).rgb * 1.05));
          float l = dot(c, vec3(0.299, 0.587, 0.114)); c = mix(vec3(l), c, 0.82);                       // a little faded colour
          c = c * vec3(1.06, 0.98, 0.84) + vec3(0.035, 0.025, 0.01);                                     // warm + lifted blacks
          c = mix(c, vec3(1.), flash);
          gl_FragColor = vec4(clamp(c, 0., 1.), 1.); }` });
    const postScene = new THREE.Scene(); const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postM); quad.frustumCulled = false; postScene.add(quad);
    // HUD layers: panel canvas (under the clip) -> clip quad -> top canvas (clip captions, CTA) -> film overlay
    const mkCanvas = () => { const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; return [cv, cv.getContext('2d'), tx]; };
    const [hc, h, hTex] = mkCanvas(), [tc, ht, tTex] = mkCanvas();
    const hudScene = new THREE.Scene();
    const hudQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: hTex, transparent: true, toneMapped: false, depthTest: false })); hudQ.frustumCulled = false; hudQ.renderOrder = 1; hudScene.add(hudQ);
    const clipQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: rtClip.texture, transparent: true, toneMapped: false, depthTest: false })); clipQ.frustumCulled = false; clipQ.renderOrder = 2; hudScene.add(clipQ);
    const topQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: tTex, transparent: true, toneMapped: false, depthTest: false })); topQ.frustumCulled = false; topQ.renderOrder = 3; hudScene.add(topQ);
    const filmU = { time: { value: 0 }, res: { value: new THREE.Vector2(W, H) }, fr: { value: 0 }, flick: { value: 0 } };
    const filmQ = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ uniforms: filmU, transparent: true, depthTest: false, depthWrite: false, toneMapped: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `
        precision highp float; varying vec2 vUv; uniform vec2 res; uniform float time, fr, flick;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        void main(){ vec2 p = vUv * res; vec4 o = vec4(0.);
          float g = hash(floor(p / 2.) + fr * 13.1);                                   // grain
          o = vec4(vec3(step(0.5, g)), 0.07 * abs(g - 0.5) * 2.);
          vec2 q = vUv - 0.5; float v = smoothstep(0.32, 0.95, length(q * vec2(0.95, 0.8)));         // vignette
          o = mix(o, vec4(0.08, 0.04, 0.02, 1.), v * 0.62);
          for (int i = 0; i < 7; i++) {                                                // dust specks (change every frame)
            vec2 c = vec2(hash(vec2(fr, float(i))), hash(vec2(float(i), fr + 3.)));
            float r = 2.0 + 5.0 * hash(vec2(fr + float(i), 9.)); float d = length(p - c * res);
            if (hash(vec2(fr * 1.7, float(i) * 3.3)) < 0.45 && d < r) o = vec4(vec3(hash(vec2(float(i), fr)) < 0.6 ? 0.05 : 0.95), 0.55); }
          float sx = hash(vec2(floor(fr / 6.), 2.)); if (hash(vec2(floor(fr / 6.), 5.)) < 0.55 && abs(p.x - sx * res.x) < 1.2) o = vec4(vec3(0.92), 0.35);   // vertical scratch
          float leak = smoothstep(0.75, 0.0, length((vUv - vec2(0.0, 0.92)) * vec2(1.6, 2.4)));       // warm light leak, top-left
          o = mix(o, vec4(1.0, 0.55, 0.2, 1.), leak * (0.10 + 0.06 * sin(time * 1.3)));
          o = mix(o, vec4(0., 0., 0., 1.), flick);
          gl_FragColor = o; }` }));
    filmQ.frustumCulled = false; filmQ.renderOrder = 4; hudScene.add(filmQ);
    let clipOn = false, clipSrc = 'zack';
    K.draw = () => { const r = K.renderer;
      if (clipOn && clipSrc === 'zack') { r.setRenderTarget(rtClip); r.clear(); r.render(zS, zCam); }
      r.setRenderTarget(rtMain); r.clear(); r.render(S, K.cam); bloom.render(r, null, rtMain, 0, false);
      r.setRenderTarget(null); r.clear(); r.render(postScene, oCam); r.autoClear = false; r.render(hudScene, oCam); r.autoClear = true; };

    // ================= HUD helpers =================
    const CREAM = '#f3e7cc', INK = '#1d1410', RED = '#c4161f', GOLD = '#e0b04a', CLA = '#d97757';
    const SERIF = '"Fraunces", "DM Serif Display", serif', MONO = '"Courier Prime", "DejaVu Sans Mono"', SANS = '"Inter Display"';
    const rr = (c, x, y, w, hh, r, f, s, lw = 4) => { c.beginPath(); c.roundRect(x, y, w, hh, r); if (f) { c.fillStyle = f; c.fill(); } if (s) { c.strokeStyle = s; c.lineWidth = lw; c.stroke(); } };
    const txt = (c, s, x, y, size, col, wgt = 700, al = 'center', font = SANS) => { c.font = `${wgt} ${size}px ${font}`; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y); };
    const pop = (t, a, d = 0.35) => eb(pr(t, a, a + d));
    const wrap = (c, s, maxW) => { const out = []; let cur = ''; for (const w of s.split(' ')) { const tt = cur ? cur + ' ' + w : w; if (c.measureText(tt).width > maxW && cur) { out.push(cur); cur = w; } else cur = tt; } if (cur) out.push(cur); return out; };
    const scr = v3 => { const p = v3.clone().project(K.cam); return [(p.x * 0.5 + 0.5) * W, (1 - (p.y * 0.5 + 0.5)) * H]; };
    // the phone (portrait 580×1040; turns sideways to play each video full screen)
    const PCX = 540, PCY = 600, PWd = 580, PHt = 1040, SW = 540, SH = 1000;
    const CLW = 924, CLH = 520;                        // the playing video inside the landscape screen
    const statusBar = (c, dark = true) => { const col = dark ? '#f2efe9' : '#1d1410'; txt(c, '9:41', 62, 44, 26, col, 700); rr(c, SW - 92, 33, 44, 22, 6, null, col, 2.5); rr(c, SW - 88, 37, 30, 14, 3, col); c.fillStyle = col; c.fillRect(SW - 46, 40, 3, 8);
      for (let k = 0; k < 4; k++) c.fillRect(SW - 150 + k * 9, 52 - k * 5, 6, 6 + k * 5); };
    // screen 1: a feed of faceless animated videos with climbing views
    const FEED = [['How big is space?', '#1d3b6e', '#e0b04a', 2.4], ['Inside your knuckles', '#7a2c3a', '#ffb3a0', 8.1], ['Deepest place on Earth', '#1f5a66', '#9fd8e0', 11.2], ['What if the Sun vanished?', '#5a3a14', '#ffcf4a', 5.6]];
    const feedArt = (c, i, x, y, w, hh) => { const g = c.createLinearGradient(x, y, x, y + hh); g.addColorStop(0, FEED[i][1]); g.addColorStop(1, '#0d0b0a'); rr(c, x, y, w, hh, 26, g); const cx = x + w / 2, cy = y + hh * 0.42, a = FEED[i][2]; c.fillStyle = a; c.strokeStyle = a; c.lineWidth = 8;
      if (i === 0) { c.beginPath(); c.arc(cx, cy, 52, 0, 7); c.fill(); c.save(); c.translate(cx, cy); c.scale(1, 0.32); c.beginPath(); c.arc(0, 0, 92, 0, 7); c.stroke(); c.restore(); }
      else if (i === 1) { rr(c, cx - 60, cy - 10, 110, 70, 26, a); for (let k = 0; k < 4; k++) rr(c, cx - 58 + k * 28, cy - 70, 24, 70, 12, a); }
      else if (i === 2) { c.beginPath(); c.moveTo(cx - 90, cy + 60); c.lineTo(cx, cy - 60); c.lineTo(cx + 90, cy + 60); c.closePath(); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(cx - 22, cy - 30); c.lineTo(cx, cy - 60); c.lineTo(cx + 22, cy - 30); c.fill(); }
      else { c.beginPath(); c.arc(cx, cy, 60, 0, 7); c.fill(); for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; c.beginPath(); c.moveTo(cx + Math.cos(an) * 74, cy + Math.sin(an) * 74); c.lineTo(cx + Math.cos(an) * 96, cy + Math.sin(an) * 96); c.stroke(); } } };
    const drawFeed = (c, t) => { const g = c.createLinearGradient(0, 0, 0, SH); g.addColorStop(0, '#16120f'); g.addColorStop(1, '#0b0908'); c.fillStyle = g; c.fillRect(0, 0, SW, SH); statusBar(c);
      txt(c, 'For you', SW / 2, 104, 34, '#f2efe9', 800); rr(c, SW / 2 - 30, 128, 60, 5, 3, '#f2efe9');
      const sc = (t - C.PHONE) * 46, cardH = 360, gap = 24;
      c.save(); c.beginPath(); c.rect(0, 150, SW, SH - 150); c.clip();
      for (let k = -1; k < 4; k++) { const n = Math.floor(sc / (cardH + gap)) + k, i = ((n % 4) + 4) % 4, y = 170 + n * (cardH + gap) - sc; if (y > SH || y + cardH < 150) continue;
        feedArt(c, i, 26, y, SW - 52, cardH); txt(c, FEED[i][0], 50, y + cardH - 84, 30, '#fff', 800, 'left');
        const grow = cl((t - C.PHONE) / 4) * 0.35 + 0.65, v = FEED[i][3] * grow * (1 + 0.6 * eo(pr(t, C.MIL, C.MIL + 1.2)));
        rr(c, 46, y + cardH - 58, 180, 42, 21, 'rgba(0,0,0,0.55)'); txt(c, '▶ ' + v.toFixed(1) + 'M views', 136, y + cardH - 36, 22, '#fff', 800);
        rr(c, SW - 200, y + 22, 150, 38, 19, 'rgba(255,255,255,0.16)'); txt(c, 'faceless', SW - 125, y + 42, 22, '#fff', 700);
        if (t > C.PAID) { const kk = pop(t, C.PAID + (i % 2) * 0.15, 0.35); c.save(); c.translate(SW - 140, y + cardH - 36); c.scale(kk, kk); rr(c, -88, -22, 176, 44, 22, '#2fa35a'); txt(c, '$ paid ✓', 0, 1, 22, '#fff', 800); c.restore(); } }
      c.restore(); };
    // screen 2: the Claude app (Code tab), keyboard typing, the command sent, "Running…"
    const KB = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    const keyRect = ch => { const kw = 48, kh = 66, gx = 5, y0 = SH - 330; if (ch === ' ') return [SW / 2 - 140, y0 + 3 * (kh + 12), 280, kh];
      for (let r = 0; r < 3; r++) { const i = KB[r].indexOf(ch); if (i >= 0) { const rowW = KB[r].length * (kw + gx) - gx, x0 = (SW - rowW) / 2; return [x0 + i * (kw + gx), y0 + r * (kh + 12), kw, kh]; } } return null; };
    const drawApp = (c, t, i) => { c.fillStyle = '#262422'; c.fillRect(0, 0, SW, SH); statusBar(c);
      txt(c, '✻', SW / 2 - 66, 106, 38, CLA, 700); txt(c, 'Claude', SW / 2 + 14, 106, 34, '#f2efe9', 800);
      rr(c, SW / 2 - 120, 140, 240, 52, 26, '#34312e'); rr(c, SW / 2 - 4, 144, 120, 44, 22, '#4a4642'); txt(c, 'Chat', SW / 2 - 62, 166, 24, '#a59f97', 700); txt(c, 'Code', SW / 2 + 56, 166, 24, '#f2efe9', 800);
      const cm = i >= 0 ? CM[i] : null, n = cm ? Math.floor(cl((t - cm.ts) * CPS, 0, cm.full.length)) : 0, sent = cm && t >= cm.send;
      if (!cm || !sent) { c.globalAlpha = 0.55; txt(c, 'What do you want to make?', SW / 2, 420, 30, '#a59f97', 600); c.globalAlpha = 1; }
      if (sent) { // the command as a sent bubble, then Claude running it
        const k = eo(pr(t, cm.send, cm.send + 0.25)); c.font = `700 26px ${MONO}`; const lines = wrap(c, cm.full, SW - 150), bh = 28 + lines.length * 36, by = 230 + (1 - k) * 380;
        rr(c, 60, by, SW - 90, bh, 26, '#3d3935'); lines.forEach((ln, k2) => { const cp = k2 === 0 ? ln.slice(0, cm.cmd.length) : '', rest = k2 === 0 ? ln.slice(cp.length) : ln; c.font = `700 26px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = cm.col; c.fillText(cp, 84, by + 32 + k2 * 36); c.fillStyle = '#f2efe9'; c.fillText(rest, 84 + c.measureText(cp).width, by + 32 + k2 * 36); });
        if (t > cm.send + 0.2) { const y = by + bh + 60, rk = eo(pr(t, cm.send + 0.2, cm.send + 0.4)); c.globalAlpha = rk; txt(c, '✻✳✶✷'[Math.floor(t * 10) % 4], 40, y, 34, CLA, 700, 'left'); txt(c, 'Running ' + cm.cmd + '…', 84, y, 28, '#f2efe9', 700, 'left', MONO);
          const bp = cl(pr(t, cm.send + 0.25, cm.rot)); rr(c, 84, y + 34, 400, 12, 6, '#3d3935'); rr(c, 84, y + 34, Math.max(12, 400 * bp), 12, 6, cm.col);
          txt(c, ['writing the script', 'building the scenes', 'animating', 'rendering video'][Math.min(3, Math.floor(bp * 4))], 84, y + 74, 22, '#a59f97', 600, 'left', MONO); c.globalAlpha = 1; } }
      // input bar + keyboard
      const typed = sent ? '' : (cm ? cm.full.slice(0, n) : ''), cur = Math.floor(t * 3) % 2 ? '|' : '';
      c.font = `700 25px ${MONO}`; const tl = typed ? wrap(c, typed, SW - 150) : ['']; const ih = Math.max(76, 34 + tl.length * 34), iy = SH - 350 - ih;
      rr(c, 22, iy, SW - 44, ih, 30, '#34312e');
      if (!typed) txt(c, 'Type a message…' , 50, iy + ih / 2, 25, '#7d7770', 600, 'left'); else tl.forEach((ln, k2) => { c.font = `700 25px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'middle'; const y = iy + 34 + k2 * 34;
        if (k2 === 0) { const cp = ln.slice(0, Math.min(cm.cmd.length, ln.length)); c.fillStyle = cm.col; c.fillText(cp, 48, y); c.fillStyle = '#f2efe9'; c.fillText(ln.slice(cp.length) + (k2 === tl.length - 1 ? cur : ''), 48 + c.measureText(cp).width, y); } else { c.fillStyle = '#f2efe9'; c.fillText(ln + (k2 === tl.length - 1 ? cur : ''), 48, y); } });
      c.beginPath(); c.arc(SW - 62, iy + ih - 38, 26, 0, 7); c.fillStyle = typed ? CLA : '#4a4642'; c.fill(); txt(c, '↑', SW - 62, iy + ih - 37, 30, '#fff', 900);
      c.fillStyle = '#1c1a19'; c.fillRect(0, SH - 340, SW, 340);
      const hot = cm && t < cm.send && n > 0 && (t - cm.ts) * CPS - (n - 1) < 0.9 ? cm.full[n - 1].toLowerCase() : null;
      KB.forEach(row => [...row].forEach(ch => { const [x, y, w, hh] = keyRect(ch); rr(c, x, y, w, hh, 9, ch === hot ? '#6a6460' : '#4a4642'); txt(c, ch, x + w / 2, y + hh / 2 + 1, 28, '#f2efe9', 600); }));
      { const [x, y, w, hh] = keyRect(' '); rr(c, x, y, w, hh, 9, hot === ' ' ? '#6a6460' : '#4a4642'); txt(c, 'space', x + w / 2, y + hh / 2, 24, '#c9c3bb', 600); }
      if (hot && hot !== ' ' && keyRect(hot)) { const [x, y, w] = keyRect(hot); rr(c, x - 14, y - 96, w + 28, 100, 16, '#7a7470'); txt(c, hot, x + w / 2, y - 48, 50, '#fff', 700); } };
    // screen 3 (end): the 10-command pack
    const ALL = [['/zack-d-films', '#e0672b'], ['/kurzgesagt', '#3f9be8'], ['/ted-ed', '#c9902c'], ['/infographics-show', '#9b6bd6'], ['/scale', '#4cbf74'], ['/deep-dive', '#2b8fa8'], ['/data-race', '#e04a7a'], ['/map-history', '#b0763a'], ['/3blue1brown', '#4f6fe0'], ['/whiteboard', '#7a7a7a']];
    const drawPack = (c, t) => { const a = C.CTA + 0.45; c.fillStyle = CREAM; c.fillRect(0, 0, SW, SH); statusBar(c, false);
      txt(c, 'THE COMMAND PACK', SW / 2, 120, 24, RED, 800); c.font = `900 66px ${SERIF}`; c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.fillText('10 commands', SW / 2, 200);
      ALL.forEach(([s, col], i) => { const y = 236 + i * 60, kk = pop(t, a + 0.1 + i * 0.07, 0.25); c.save(); c.globalAlpha = kk; if (i >= 3) c.filter = 'blur(6px)';
        rr(c, 40, y, SW - 80, 50, 14, i < 3 ? col : '#d8c7a4'); txt(c, s, SW / 2, y + 26, 28, i < 3 ? '#fff8ea' : '#5a4632', 800, 'center', MONO); c.filter = 'none';
        if (i >= 3) txt(c, '🔒', SW / 2, y + 26, 24, '#5a4632', 700, 'center', '"DejaVu Sans"'); c.restore(); });
      const kb = pop(t, B('cta') + 0.4, 0.35), pul = 1 + 0.04 * Math.sin(t * 7) * (t > B('cta') + 0.8 ? 1 : 0); c.save(); c.translate(SW / 2, SH - 92); c.scale(kb * pul, kb * pul); c.shadowColor = 'rgba(196,22,31,0.5)'; c.shadowBlur = 26;
      rr(c, -230, -48, 460, 96, 48, RED); c.shadowBlur = 0; txt(c, 'Comment ANIMATE', 0, 2, 44, '#fff8ea', 900); c.restore(); };
    // the phone itself
    const drawPhone = (t) => { const c = h, k = pop(t, C.PHONE, 0.5), lv = land(t), ang = -Math.PI / 2 * lv, ci = cmdAt(t), bob = Math.sin(t * 1.3) * 4 * (1 - lv);
      if (k <= 0) return; const [sx, sy] = scr(scrC); const cx = lerp(sx, PCX, k), cy = lerp(sy, PCY, k) + bob, s = lerp(0.2, 1, k);
      c.save(); c.translate(cx, cy); c.rotate(ang); c.scale(s, s);
      c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 60; c.shadowOffsetY = 24; rr(c, -PWd / 2, -PHt / 2, PWd, PHt, 84, '#141210'); c.shadowColor = 'transparent';
      rr(c, -PWd / 2 + 2, -PHt / 2 + 2, PWd - 4, PHt - 4, 82, null, '#4a4440', 4); rr(c, PWd / 2 - 2, -260, 6, 110, 3, '#3a3430'); rr(c, -PWd / 2 - 4, -300, 6, 70, 3, '#3a3430'); rr(c, -PWd / 2 - 4, -210, 6, 70, 3, '#3a3430');
      c.save(); c.beginPath(); c.roundRect(-SW / 2, -SH / 2, SW, SH, 62); c.clip(); c.translate(-SW / 2, -SH / 2);
      if (lv > 0.001 && lv < 0.999) { const ri = CM.findIndex(q => t >= q.rot && t < q.clip); drawApp(c, t, ri >= 0 ? ri : ci); }
      else if (lv >= 0.999) { c.fillStyle = '#000'; c.fillRect(0, 0, SW, SH); }
      else if (t >= C.CTA) drawPack(c, t);
      else if (t < C.APP) drawFeed(c, t);
      else { drawApp(c, t, ci); if (t < C.APP + 0.3) { c.globalAlpha = 1 - pr(t, C.APP, C.APP + 0.3); drawFeed(c, t); c.globalAlpha = 1; } }
      c.restore(); rr(c, -62, -SH / 2 + 16, 124, 36, 18, '#000');
      c.restore();
      // landscape title above the phone
      const li = CM.findIndex(q => t >= q.rot && t < q.endL + 0.45); if (lv > 0.5 && li >= 0) { const cm = CM[li], a = cl((lv - 0.5) * 2); c.save(); c.globalAlpha = a; rr(c, W / 2 - 128, 150, 256, 54, 27, cm.col); txt(c, `COMMAND ${li + 1}/3`, W / 2, 178, 26, '#fff8ea', 800);
        c.font = `900 76px ${SERIF}`; c.fillStyle = CREAM; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.lineWidth = 10; c.strokeStyle = 'rgba(20,12,8,0.85)'; c.strokeText(cm.title, W / 2, 290); c.fillText(cm.title, W / 2, 290); c.restore(); }
      return { cx, cy, lv };
    };

    // the projection screen's own picture: film-leader countdown, then a flickering projected white
    const drawScreen = (t) => { const x = scx, w = 512, hh = 290;
      if (t < C.PHONE + 0.4) { const n = 5 - Math.floor(t / 1.1) % 5, ph = (t % 1.1) / 1.1; x.fillStyle = '#c9b48c'; x.fillRect(0, 0, w, hh);
        x.fillStyle = '#a99268'; x.beginPath(); x.moveTo(w / 2, hh / 2); x.arc(w / 2, hh / 2, 260, -Math.PI / 2, -Math.PI / 2 + ph * Math.PI * 2); x.fill();
        x.strokeStyle = '#2b2118'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, hh / 2); x.lineTo(w, hh / 2); x.moveTo(w / 2, 0); x.lineTo(w / 2, hh); x.stroke(); x.lineWidth = 6; [100, 120].forEach(r => { x.beginPath(); x.arc(w / 2, hh / 2, r, 0, 7); x.stroke(); });
        x.fillStyle = '#2b2118'; x.font = '900 150px "Fraunces"'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), w / 2, hh / 2 + 8); }
      else { const f = 0.82 + 0.06 * Math.sin(t * 37) + 0.04 * Math.sin(t * 13); const v = Math.round(235 * f); x.fillStyle = `rgb(${v},${v - 6},${v - 22})`; x.fillRect(0, 0, w, hh); }
      scTex.needsUpdate = true; };

    // ================= ACTING =================
    let mYaw = 0, mPitch = 0.1, rYaw = -0.4, rPitch = 0, last = -1; const smv = (a, b, k) => a + (b - a) * k;
    const toR = [0.75, 0.05], toCam = [-0.12, 0.02], up = [0.08, -0.4];
    const P0 = { L: [-0.3, 0, -0.05, -0.1], R: [-0.3, 0, 0.05, -0.1] };
    const POSE = { rest: P0, shrug: { L: [-0.55, 0.1, -0.55, -1.25], R: [-0.55, -0.1, 0.55, -1.25] }, both: { L: [-2.7, 0.15, -0.45, -0.35], R: [-2.7, -0.15, 0.45, -0.35] },
      chin: { L: [-0.3, 0, -0.05, -0.1], R: [-1.15, -0.55, 0.1, -2.0] }, slump: { L: [0.1, 0, -0.2, -0.05], R: [0.1, 0, 0.2, -0.05] },
      point: { L: [-0.3, 0, -0.05, -0.1], R: [-2.4, -0.2, 0.1, -0.2] }, hold: { L: [-0.75, 0.3, -0.25, -1.35], R: [-0.75, -0.3, 0.25, -1.35] } };
    let curPose = JSON.parse(JSON.stringify(P0));
    const acting = (t) => {
      const mT = K.voice('maddie', t), rT = K.voice('claude', t) * 0.6;
      const k = last < 0 || Math.abs(t - last) > 0.2 ? 1 : cl((t - last) * 5); last = t;
      let mL = toCam, face = 'neutral', lean = 0.05, pose = 'rest', bounce = 0, rL = [-0.4, 0.05], mood = 'calm';
      const ci = cmdAt(t);
      if (t < B('h2') - 0.1) { mL = t < C.MIL ? up : toCam; face = t > C.PAID ? 'worried' : 'neutral'; pose = t > C.PAID ? 'shrug' : 'hold'; lean = 0.1; rL = [-0.45, 0.06]; mood = 'calm'; }
      else if (t < B('h3') - 0.1) { mL = toCam; face = 'worried'; pose = 'slump'; lean = 0.25; rL = [-0.45, 0.06]; mood = 'flat'; }
      else if (ci < 0 && t < C.CTA) { mL = toR; face = 'neutral'; rL = [0.4, -0.05]; mood = 'smile'; }
      else if (ci >= 0 && t < B('e1') - 0.05) { const cm = CM[ci]; rL = [-0.15, -0.35]; mood = t > cm.clip ? 'happy' : 'smile';
        const react = (ci === 0 && t >= B('z2') - 0.05) || (ci === 1 && t >= B('k2') - 0.05 && t < CM[2].a);
        if (react) { mL = ci === 0 ? toCam : toR; face = 'shock'; pose = 'both'; bounce = 1.1; rL = [-0.45, 0.05]; mood = 'wink'; }
        else { mL = up; face = t > cm.clip + 1.2 ? 'shock' : 'neutral'; pose = t > cm.ts && t < cm.rot ? 'hold' : 'rest'; lean = -0.05; } }
      else if (t < C.CTA) { mL = toCam; face = mT > 0.05 ? 'neutral' : 'smile'; pose = 'both'; bounce = 1.3; rL = [-0.45, 0.05]; mood = 'happy'; }
      else { mL = t < B('cta') + 1.2 ? up : toCam; face = 'smile'; pose = t > B('cta') + 1.2 ? 'point' : 'rest'; rL = [-0.45, 0.05]; mood = t > E('cta') - 0.4 ? 'wink' : 'smile'; }
      if (face === 'smile' && mT > 0.05) face = 'neutral';
      mYaw = smv(mYaw, mL[0], k); mPitch = smv(mPitch, mL[1], k);
      M.update(t, { talk: mT * 0.9, face, look: [mYaw, mPitch], lean });
      const tgt = POSE[pose]; ['L', 'R'].forEach(s => { for (let i = 0; i < 4; i++) curPose[s][i] = smv(curPose[s][i], tgt[s][i], k); });
      const [aL, aR] = M.arms; const bx = pose === 'both' ? 0.16 * Math.sin(t * 12) : 0, tap = pose === 'hold' && ci >= 0 && t < CM[ci].te ? 0.08 * Math.sin(t * 22) : 0;
      aL.sh.rotation.set(curPose.L[0] + bx, curPose.L[1], curPose.L[2]); aL.el.rotation.x = curPose.L[3];
      aR.sh.rotation.set(curPose.R[0] + bx + tap, curPose.R[1], curPose.R[2]); aR.el.rotation.x = curPose.R[3];
      M.g.position.y = bounce * 0.022 * Math.abs(Math.sin(t * 9));
      rYaw = smv(rYaw, rL[0], k); rPitch = smv(rPitch, rL[1], k);
      R.update(t, { talk: rT, look: [rYaw, rPitch], mood });
      R.head.rotation.x += 0.12 * CM.reduce((m, c) => Math.max(m, K.pulse(t, c.clip, 0.4)), 0);
      reels.forEach((r, i) => { r.rotation.x = t * (i ? 2.2 : 1.6); });
      bulbs.forEach((b, i) => { const on = (Math.floor(t * 6) + i) % 3 !== 0; b.material.color.setHex(on ? 0xffd27a : 0x6a4a20); });
      const dp = dust.geometry.attributes.position; dSeed.forEach(([a, b, c, d], i) => { const s = (a + t * 0.02 * (0.5 + d)) % 1, rad = 0.03 + 0.7 * s; const p = lensW.clone().add(bDir.clone().multiplyScalar(s * beamLen)).add(bSide.clone().multiplyScalar((b - 0.5) * rad * 1.6 + Math.sin(t * 0.7 + i) * 0.02)).add(bUp.clone().multiplyScalar((c - 0.5) * rad * 1.6 + Math.cos(t * 0.5 + i) * 0.02)); dp.setXYZ(i, p.x, p.y, p.z); }); dp.needsUpdate = true;
      const fl = 0.9 + 0.08 * Math.sin(t * 31) + 0.05 * Math.sin(t * 17.3); beam.material.opacity = 0.3 * fl; scrL.intensity = 1.6 * fl; lensGlow.material.color.setScalar(fl);
    };

    // ================= CAMERA =================
    // the phone fills the top; frame the characters (head + shoulders, never a giant face) in the lower part
    const Pp = (pos, look, fov) => ({ pos, look, fov });
    const sh = {
      two: [Pp([0.2, 1.5, 4.1], [0.2, 1.97, -0.6], 38), Pp([0.18, 1.49, 3.85], [0.2, 1.95, -0.6], 38)],
      twoL: [Pp([-0.35, 1.48, 3.9], [0.15, 1.95, -0.6], 38), Pp([-0.3, 1.47, 3.65], [0.15, 1.93, -0.6], 38)],
      mad: [Pp([-0.02, 1.45, 3.2], [MX + 0.08, 1.86, MZ], 38), Pp([-0.04, 1.44, 3.0], [MX + 0.08, 1.84, MZ], 38)],
      rob: [Pp([0.42, 1.45, 3.2], [RX - 0.12, 1.86, RZ], 38), Pp([0.44, 1.44, 3.0], [RX - 0.12, 1.84, RZ], 38)],
      end: [Pp([0.2, 1.52, 4.3], [0.2, 2.0, -0.6], 38), Pp([0.18, 1.5, 4.05], [0.2, 1.97, -0.6], 38)],
    };
    const plan = [[0, B('h2') - 0.1, sh.two], [B('h2') - 0.1, B('h3') - 0.1, sh.mad], [B('h3') - 0.1, CM[0].a, sh.rob],
      [CM[0].a, B('z1') - 0.05, sh.two], [B('z1') - 0.05, B('z2') - 0.05, sh.rob], [B('z2') - 0.05, CM[1].a, sh.mad],
      [CM[1].a, B('k2') - 0.05, sh.twoL], [B('k2') - 0.05, CM[2].a, sh.mad],
      [CM[2].a, B('e1') - 0.05, sh.two], [B('e1') - 0.05, C.CTA, sh.mad], [C.CTA, D + 5, sh.end]];
    const shots = plan.map(([a, b, s]) => ({ t: [a, b], from: s[0], to: s[1], fov: s[0].fov, ease: sm, shake: null }));

    // ================= CLIP CAPTIONS (on top of the playing clip) =================
    const clipCap = (c, s, x, y, size, col = '#fff') => { c.font = `900 ${size}px ${SANS}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = size * 0.2; c.strokeStyle = 'rgba(10,8,6,0.95)'; c.strokeText(s, x, y); c.fillStyle = col; c.fillText(s, x, y); };
    const zackCaps = (c, ct, X, Y, S2) => { if (ct < ZK.CUT - 0.1) { ['What happens when you', 'crack your knuckles?'].forEach((s, i) => clipCap(c, s, X + 450 * S2, Y + (390 + i * 56) * S2, 46 * S2)); }
      else if (ct < ZK.POP) clipCap(c, 'Tiny gas bubbles form…', X + 450 * S2, Y + 440 * S2, 46 * S2);
      else { const k = eb(pr(ct, ZK.POP, ZK.POP + 0.3)); c.save(); c.translate(X + 450 * S2, Y + 140 * S2); c.rotate(-0.08); c.scale(k, k); clipCap(c, 'POP!', 0, 0, 110 * S2, '#ffd34a'); c.restore(); clipCap(c, '…and POP inside your joint', X + 450 * S2, Y + 440 * S2, 46 * S2); } };
    const kurzCaps = (c, ct, X, Y, S2) => { if (ct < KZ.ZOOM0 + 0.3) clipCap(c, 'How big is the Sun?', X + 450 * S2, Y + 440 * S2, 46 * S2); };

    // ================= HUD =================
    const reset = c => { if (c.reset) c.reset(); else { c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = 1; } c.clearRect(0, 0, W, H); };
    const hudDraw = (t, wv) => { reset(h); reset(ht); clipOn = false; clipQ.visible = false;
      const ph = drawPhone(t), ki = clipAt(t);
      if (ph && ki >= 0 && ph.lv >= 0.999) { const cm = CM[ki], ct = t - cm.clip, g = eo(pr(t, cm.clip, cm.clip + 0.3));
        const rw = CLW * lerp(0.92, 1, g), rh = CLH * lerp(0.92, 1, g), rx = ph.cx - rw / 2, ry = ph.cy - rh / 2;
        clipOn = true; clipQ.visible = true; clipSrc = ki === 0 ? 'zack' : 'flat';
        if (ki === 0) { updZack(ct); clipQ.material.map = rtClip.texture; } else { if (ki === 1) drawKurz(ct); else drawTed(ct); clipQ.material.map = ccTex; }
        clipQ.material.opacity = g;
        clipQ.position.set(((rx + rw / 2) / W) * 2 - 1 + wv.x * 2 / W, 1 - ((ry + rh / 2) / H) * 2 - wv.y * 2 / H, 0); clipQ.scale.set(rw / W, rh / H, 1);
        const cs = rw / 900; if (ki === 0) zackCaps(ht, ct, rx, ry, cs); else if (ki === 1) kurzCaps(ht, ct, rx, ry, cs); }
      topQ.visible = clipOn;
      hTex.needsUpdate = true; tTex.needsUpdate = true; };

    // ================= UPDATE =================
    const update = t => {
      K.shoot(t, shots); acting(t); drawScreen(t);
      K.cam.updateMatrixWorld(true);
      const fr = Math.floor(t * 24), wr = K.rng(fr * 7 + 3), wv = { x: (wr() - 0.5) * 2.2, y: (wr() - 0.5) * 2.6 };   // gate weave, 24 fps steps
      postU.time.value = t; postU.weave.value.set(wv.x, wv.y);
      postU.flash.value = CM.reduce((m, c) => Math.max(m, 0.3 * Math.max(0, 1 - Math.abs(t - c.clip) / 0.08)), 0);
      hudQ.position.set(wv.x * 2 / W, -wv.y * 2 / H, 0); topQ.position.copy(hudQ.position);
      filmU.time.value = t; filmU.fr.value = fr; filmU.flick.value = 0.03 * (0.5 + 0.5 * Math.sin(t * 41.0)) * (0.5 + 0.5 * Math.sin(t * 7.3));
      hudDraw(t, wv);
    };

    // ================= SOUND =================
    const sfx = [['whoosh', C.PHONE - 0.05, 0.35], ['pop', C.PHONE + 0.25, 0.3]];
    for (let i = 0; i < 4; i++) sfx.push(['pop', C.PAID + i * 0.15, 0.18]); sfx.push(['kaching', C.PAID + 0.05, 0.3]);
    sfx.push(['whoosh', C.APP, 0.25]);
    CM.forEach((c) => {
      for (let k = 0; k < c.full.length; k++) sfx.push(['tick', c.ts + k / CPS, 0.07]);
      sfx.push(['pop', c.send, 0.25], ['whoosh', c.send + 0.02, 0.2], ['riser', c.send + 0.2, 0.1], ['whoosh', c.rot, 0.35], ['zap', c.clip - 0.02, 0.25], ['chime', c.clip + 0.05, 0.22]);
      if (c.endL < C.CTA) sfx.push(['whoosh', c.endL, 0.25]);
    });
    [0, 1, 2, 3].forEach(i => sfx.push(['tick', CM[0].clip + 0.55 + i * 0.3, 0.45], ['pop', CM[0].clip + 0.55 + i * 0.3, 0.18]));
    sfx.push(['whoosh', CM[0].clip + ZK.CUT, 0.3], ['boing', CM[0].clip + ZK.POP, 0.5], ['pop', CM[0].clip + ZK.POP, 0.6], ['bass', CM[0].clip + ZK.POP + 0.02, 0.35]);
    sfx.push(['whoosh', CM[1].clip + KZ.ZOOM0, 0.35], ['riser', CM[1].clip + KZ.CNT0, 0.2], ['kaching', CM[1].clip + KZ.CNT1, 0.35]);
    sfx.push(['whoosh', CM[2].clip + TE.DROP0, 0.3], ['thud', CM[2].clip + TE.DROP1, 0.7], ['bass', CM[2].clip + TE.DROP1 + 0.02, 0.4], ['ding', CM[2].clip + TE.SPARE, 0.25]);
    sfx.push(['whoosh', C.CTA, 0.3], ['chime', C.CTA + 0.5, 0.3]); for (let i = 0; i < 10; i++) sfx.push(['pop', C.CTA + 0.55 + i * 0.07, 0.12]); sfx.push(['kaching', B('cta') + 0.4, 0.35]);

    return { duration: D, update, shots, sfx, watermark: false, endCard: false, capFont: 'DM Serif Display', capMarginV: 700, capSize: 66 };
  },
};
