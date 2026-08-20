/**
 * ComplyVerse AI — Digital Risk Twin (enterprise intelligence environment)
 * Architectural grids, luminous rails, data dust, twin graph, atlas stations,
 * AI agent path, comparison plane, holographic product screens
 */
(function () {
  const THREE = window.THREE;
  if (!THREE) {
    console.error('Three.js required');
    return;
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MISSION_LAYOUT = {
    govern: { cx: -5.2, cy: 1.6, cz: -1.5, color: 0x12d8ff },
    assure: { cx: 4.8, cy: 1.2, cz: -2.2, color: 0x0057ff },
    risk: { cx: -3.5, cy: -1.4, cz: -4.0, color: 0xe8a030 },
    secure: { cx: 3.8, cy: -1.8, cz: -5.2, color: 0xe8a030 },
    orchestrate: { cx: 0.2, cy: 2.4, cz: -6.5, color: 0x0057ff }
  };

  function smoothstep(t) {
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
  }

  function smootherstep(t) {
    const x = Math.max(0, Math.min(1, t));
    return x * x * x * (x * (x * 6 - 15) + 10);
  }

  function expoOut(t) {
    const x = Math.max(0, Math.min(1, t));
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /** Frame-rate independent exponential smoothing (no jitter at high FPS) */
  function damp(current, target, lambda, dt) {
    return lerp(current, target, 1 - Math.exp(-lambda * dt));
  }

  function dampVec3(v, target, lambda, dt) {
    v.x = damp(v.x, target.x, lambda, dt);
    v.y = damp(v.y, target.y, lambda, dt);
    v.z = damp(v.z, target.z, lambda, dt);
    return v;
  }

  class ComplyWorld {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.options = options;
      this.progress = options.initialProgress || 0;
      this.targetProgress = this.progress;
      this.clock = new THREE.Clock();
      this.mouse = { x: 0, y: 0 };
      this.targetMouse = { x: 0, y: 0 };
      this.nodeMeshes = [];
      this.nodeMap = {};
      this.edgeLines = [];
      this.screens = [];
      this.stationMeshes = [];
      this.stationMap = {};
      this.expPlanes = [];
      this.comparePlane = null;
      this.dataDust = null;
      this.parallaxGroups = [];
      this.agentPulse = null;
      this.agentPath = [];
      this.agentT = 0;
      this.agentActive = false;
      this.focusedStation = null;
      this.onStationSelect = options.onStationSelect || null;
      this.onScreenSelect = options.onScreenSelect || null;
      this._raf = 0;
      this._look = null;
      this._camPos = new THREE.Vector3();
      this._camLook = new THREE.Vector3();
      this._tmpV = new THREE.Vector3();
      this.chapterBlend = 0;
      this.activeChapter = 'chapter-birth';
      this.activeChapterProgress = 0;
      this.fogDensity = 0.022;
      this.lightVolumes = [];
      this.gridPlanes = [];
      this.rails = [];
      this.fragmentParts = [];
      this.fragmentLines = [];
      this.fragmentPulses = [];
      this.fragmentGroup = null;
      this._fragmentTarget = new THREE.Vector3();
      this._fragmentForward = new THREE.Vector3();
      this._fragmentRight = new THREE.Vector3();

      this.init();
      this.bind();
      this.animate();
    }

    init() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setSize(w, h);
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.08;

      this.scene = new THREE.Scene();
      // Deep enterprise atrium fog — not outer-space black
      this.scene.fog = new THREE.FogExp2(0x061018, 0.022);

      this.camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 180);
      this.camera.position.set(0, 2.2, 15);
      this._look = new THREE.Vector3(0, 0.4, 0);
      this._camPos.copy(this.camera.position);
      this._camLook.copy(this._look);

      this.root = new THREE.Group();
      this.scene.add(this.root);

      this.buildLights();
      this.buildArchitecture();
      this.buildVolumetricAtmosphere();
      this.buildDataDust();
      this.buildFragmentedSignals();
      this.buildTwin();
      this.buildAtlasStations();
      this.buildHoloScreens();
      this.buildComparePlane();
      this.buildExperiencePlanes();
      this.buildAgentPulse();
      this.buildPlatformRings();

      // 10 waypoints — fly through atrium depth; hero looks down at floor grid, not “sky”
      this.rail = [
        { p: new THREE.Vector3(0, 2.8, 14.2), l: new THREE.Vector3(0, -0.8, -2.5) },
        { p: new THREE.Vector3(-3.8, 2.6, 10.5), l: new THREE.Vector3(1.2, -0.2, -2.5) },
        { p: new THREE.Vector3(0.2, 1.1, 7.0), l: new THREE.Vector3(0, 0.05, -1.8) },
        { p: new THREE.Vector3(-1.2, 1.9, 2.2), l: new THREE.Vector3(-1.8, 0.5, -3) },
        { p: new THREE.Vector3(4.2, 0.1, 1.2), l: new THREE.Vector3(2.2, -0.8, -4) },
        { p: new THREE.Vector3(1.2, 1.9, -0.6), l: new THREE.Vector3(0.2, 1.2, -5.2) },
        { p: new THREE.Vector3(-2.2, 0.6, -1.8), l: new THREE.Vector3(0, 0.2, -4) },
        { p: new THREE.Vector3(0.4, 2.3, 3.8), l: new THREE.Vector3(0, 0.6, -3.2) },
        { p: new THREE.Vector3(2.0, 0.4, 5.8), l: new THREE.Vector3(1.0, -0.2, -2.2) },
        { p: new THREE.Vector3(0, 1.8, 10.2), l: new THREE.Vector3(0, 0.2, -1) }
      ];

      if (this.progress > 0) {
        this.snapCameraToProgress(this.progress);
      }
    }

    buildLights() {
      this.ambient = new THREE.AmbientLight(0x1a3048, 0.42);
      this.scene.add(this.ambient);

      this.keyLight = new THREE.PointLight(0x12d8ff, 2.0, 48);
      this.keyLight.position.set(3.5, 5.5, 7);
      this.scene.add(this.keyLight);

      this.rimLight = new THREE.PointLight(0x0057ff, 1.35, 40);
      this.rimLight.position.set(-5.5, 2.8, -3.5);
      this.scene.add(this.rimLight);

      this.accentLight = new THREE.PointLight(0xe8a030, 0.85, 30);
      this.accentLight.position.set(2, -1.5, 2);
      this.scene.add(this.accentLight);

      this.fillLight = new THREE.DirectionalLight(0x0057ff, 0.35);
      this.fillLight.position.set(-2, 8, 4);
      this.scene.add(this.fillLight);

      this.hemi = new THREE.HemisphereLight(0x12d8ff, 0x081018, 0.28);
      this.scene.add(this.hemi);

      // Soft rect-ish volume proxies (glow spheres as light shafts)
      this.narrativeSpot = new THREE.PointLight(0x12d8ff, 0.6, 22);
      this.narrativeSpot.position.set(0, 3, 0);
      this.scene.add(this.narrativeSpot);
    }

    /** Floor / wall grids + luminous topology rails — Digital Risk Twin atrium */
    buildArchitecture() {
      this.archGroup = new THREE.Group();
      this.root.add(this.archGroup);

      const gridMat = (opacity) =>
        new THREE.LineBasicMaterial({
          color: 0x12d8ff,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

      const makeGrid = (size, divisions, y, rotX, opacity) => {
        const step = size / divisions;
        const half = size / 2;
        const pts = [];
        for (let i = 0; i <= divisions; i++) {
          const v = -half + i * step;
          pts.push(-half, 0, v, half, 0, v);
          pts.push(v, 0, -half, v, 0, half);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        const lines = new THREE.LineSegments(geo, gridMat(opacity));
        lines.position.y = y;
        lines.rotation.x = rotX;
        this.archGroup.add(lines);
        this.gridPlanes.push(lines);
        return lines;
      };

      makeGrid(32, 32, -3.2, 0, 0.12);
      makeGrid(20, 20, 5.2, Math.PI, 0.055);
      // Far depth plane (network wall)
      const wall = makeGrid(24, 18, 0, Math.PI / 2, 0.08);
      wall.position.z = -14;
      wall.position.y = 1;
      // Mid depth shelves — reads as floor plates of an intelligence atrium
      makeGrid(14, 14, -1.6, 0, 0.06).position.z = -6;

      // Vertical luminous rails (structure beams)
      const railMat = new THREE.MeshBasicMaterial({
        color: 0x0057ff,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const railGeo = new THREE.CylinderGeometry(0.018, 0.018, 12, 6);
      [
        [-8, 1, -2],
        [8, 1, -3],
        [-6, 0.5, -8],
        [6.5, 0.8, -9],
        [0, 1.2, -12]
      ].forEach(([x, y, z], i) => {
        const rail = new THREE.Mesh(railGeo, railMat.clone());
        rail.position.set(x, y, z);
        rail.material.opacity = 0.14 + (i % 3) * 0.04;
        if (i % 2) rail.material.color = new THREE.Color(0x12d8ff);
        this.archGroup.add(rail);
        this.rails.push(rail);
      });

      // Horizontal topology spines connecting twin z-depths
      const spinePts = [
        new THREE.Vector3(-7, -2.4, 2),
        new THREE.Vector3(-2, -2.1, -2),
        new THREE.Vector3(2, -1.9, -5),
        new THREE.Vector3(6, -2.2, -8)
      ];
      const spine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(spinePts),
        new THREE.LineBasicMaterial({
          color: 0x0057ff,
          transparent: true,
          opacity: 0.28,
          blending: THREE.AdditiveBlending
        })
      );
      this.archGroup.add(spine);

      // Side topology conduits
      [
        [
          new THREE.Vector3(-9, 0, 4),
          new THREE.Vector3(-5, 2, -1),
          new THREE.Vector3(-2, 1.5, -6)
        ],
        [
          new THREE.Vector3(9, -0.5, 3),
          new THREE.Vector3(5, 1.2, -2),
          new THREE.Vector3(2, 2, -7)
        ]
      ].forEach((pts, i) => {
        const curve = new THREE.CatmullRomCurve3(pts);
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 32, 0.012, 5, false),
          new THREE.MeshBasicMaterial({
            color: i ? 0x12d8ff : 0x0057ff,
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        this.archGroup.add(tube);
        this.rails.push(tube);
      });

      this.parallaxGroups.push({ obj: this.archGroup, factor: 0.12 });
    }

    /** Soft light volumes / fog plazas — not nebulae */
    buildVolumetricAtmosphere() {
      this.volGroup = new THREE.Group();
      this.root.add(this.volGroup);

      const makeVolume = (color, scale, pos, opacity) => {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(1, 20, 20),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity,
            depthWrite: false,
            blending: THREE.AdditiveBlending
          })
        );
        mesh.position.copy(pos);
        mesh.scale.set(scale.x, scale.y, scale.z);
        this.volGroup.add(mesh);
        this.lightVolumes.push({ mesh, baseOpacity: opacity, phase: Math.random() * Math.PI * 2 });
        return mesh;
      };

      makeVolume(0x0e3a42, { x: 11, y: 1.1, z: 8 }, new THREE.Vector3(0, 0.2, -2), 0.07);
      makeVolume(0x122840, { x: 9, y: 0.9, z: 7 }, new THREE.Vector3(-4, 1.2, -8), 0.055);
      makeVolume(0x0f3830, { x: 8, y: 0.85, z: 6 }, new THREE.Vector3(5, -0.4, -5), 0.05);
      makeVolume(0x1a2040, { x: 7, y: 0.75, z: 5 }, new THREE.Vector3(0, 2.2, -10), 0.04);

      // Soft ground glow disc + secondary plate
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(7, 64),
        new THREE.MeshBasicMaterial({
          color: 0x12d8ff,
          transparent: true,
          opacity: 0.055,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide
        })
      );
      disc.rotation.x = -Math.PI / 2;
      disc.position.y = -3.05;
      this.volGroup.add(disc);

      const plate = new THREE.Mesh(
        new THREE.PlaneGeometry(22, 22),
        new THREE.MeshBasicMaterial({
          color: 0x0a1c28,
          transparent: true,
          opacity: 0.45,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      plate.rotation.x = -Math.PI / 2;
      plate.position.y = -3.18;
      this.volGroup.add(plate);

      this.parallaxGroups.push({ obj: this.volGroup, factor: 0.28 });
    }

    /** Sparse teal data motes near structure — soft discs, not star points */
    buildDataDust() {
      const count = reduced ? 40 : 120;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // Almost exclusively along floor + mid rails
        const alongRail = Math.random() < 0.7;
        if (alongRail) {
          positions[i * 3] = (Math.random() - 0.5) * 16;
          positions[i * 3 + 1] = -2.9 + Math.random() * 0.9;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 1;
        } else {
          positions[i * 3] = (Math.random() - 0.5) * 8;
          positions[i * 3 + 1] = -1.2 + Math.random() * 2.2;
          positions[i * 3 + 2] = -3 - Math.random() * 8;
        }
        colors[i * 3] = 0.22 + Math.random() * 0.08;
        colors[i * 3 + 1] = 0.78 + Math.random() * 0.12;
        colors[i * 3 + 2] = 0.74 + Math.random() * 0.12;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      this.dataDust = new THREE.Points(
        geo,
        new THREE.PointsMaterial({
          size: 0.09,
          vertexColors: true,
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true
        })
      );
      this.root.add(this.dataDust);
      this.parallaxGroups.push({ obj: this.dataDust, factor: 0.14 });
    }

    /** Chapter 2 visual: two internally connected towers with a broken cross-silo signal. */
    buildFragmentedSignals() {
      this.fragmentGroup = new THREE.Group();
      this.fragmentGroup.position.set(-2, 0.25, 4);
      this.fragmentGroup.scale.setScalar(0.68);
      this.root.add(this.fragmentGroup);

      const material = (color, wireframe = false) =>
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.62,
          metalness: 0.62,
          roughness: 0.3,
          wireframe,
          transparent: true,
          opacity: 0,
          depthTest: false,
          depthWrite: false
        });

      const register = (object, detail = false) => {
        object.userData.fragmentDetail = detail;
        this.fragmentParts.push(object);
        return object;
      };

      const text = (label, color, width = 1.25, small = false) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${small ? 500 : 700} ${small ? 42 : 54}px "JetBrains Mono", monospace`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(label, 512, 80);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0,
            depthTest: false,
            depthWrite: false
          })
        );
        sprite.scale.set(width, small ? 0.16 : 0.22, 1);
        sprite.userData.fragmentLabel = true;
        this.fragmentParts.push(sprite);
        return sprite;
      };

      const edges = (mesh, color) => {
        const outline = new THREE.LineSegments(
          new THREE.EdgesGeometry(mesh.geometry),
          new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: 0,
            depthTest: false,
            depthWrite: false,
            blending: THREE.AdditiveBlending
          })
        );
        mesh.add(outline);
        outline.userData.fragmentFrame = true;
        this.fragmentParts.push(outline);
      };

      const beam = (parent, a, b, color, radius = 0.025) => {
        const direction = b.clone().sub(a);
        const midpoint = a.clone().add(b).multiplyScalar(0.5);
        const mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(radius, radius, direction.length(), 8),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0,
            depthTest: false,
            depthWrite: false,
            blending: THREE.AdditiveBlending
          })
        );
        mesh.position.copy(midpoint);
        mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
        parent.add(mesh);
        this.fragmentLines.push(mesh);
        return mesh;
      };

      const compliance = new THREE.Group();
      compliance.position.set(-1.18, 0, 0);
      compliance.userData = { base: compliance.position.clone(), phase: 0.4 };
      this.fragmentGroup.add(compliance);
      this.fragmentParts.push(compliance);

      for (let i = 0; i < 3; i++) {
        const page = register(
          new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.62, 0.055), material(0x12d8ff)),
          true
        );
        page.position.set(-0.04 + i * 0.05, 0.96 + i * 0.045, -i * 0.07);
        page.rotation.set(-0.08, 0.16, -0.08);
        compliance.add(page);
        if (i === 0) edges(page, 0x8af0ff);
      }
      const policyLabel = text('POLICY / NCA ECC', '#8af0ff', 1.28, true);
      policyLabel.position.set(0, 1.4, 0.1);
      compliance.add(policyLabel);

      const control = register(new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.52, 0.52), material(0x0057ff)));
      control.position.set(0, 0.05, 0);
      control.rotation.set(0.48, 0.58, 0.14);
      compliance.add(control);
      edges(control, 0x65a4ff);
      const controlLabel = text('CONTROL / 74%', '#65a4ff', 1.05, true);
      controlLabel.position.set(0, 0.46, 0.1);
      compliance.add(controlLabel);

      const folder = register(new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.52, 0.16), material(0x0057ff)), true);
      folder.position.set(0, -0.9, 0);
      folder.rotation.set(-0.08, -0.18, 0.06);
      compliance.add(folder);
      edges(folder, 0x65a4ff);
      const tab = register(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.14, 0.17), material(0x12d8ff)), true);
      tab.position.set(-0.25, 0.3, 0);
      folder.add(tab);
      const evidenceLabel = text('EVIDENCE / UNLINKED', '#ffb36f', 1.42, true);
      evidenceLabel.position.set(0, -1.34, 0.1);
      compliance.add(evidenceLabel);
      const complianceTitle = text('COMPLIANCE SILO', '#12d8ff', 1.52);
      complianceTitle.position.set(0, -1.7, 0.1);
      compliance.add(complianceTitle);
      beam(compliance, new THREE.Vector3(0, 0.7, 0), new THREE.Vector3(0, 0.34, 0), 0x12d8ff);
      beam(compliance, new THREE.Vector3(0, -0.24, 0), new THREE.Vector3(0, -0.62, 0), 0x0057ff);

      const security = new THREE.Group();
      security.position.set(1.18, 0, -0.12);
      security.userData = { base: security.position.clone(), phase: 2.1 };
      this.fragmentGroup.add(security);
      this.fragmentParts.push(security);

      const server = register(new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.72, 0.36), material(0xe8a030)), true);
      server.position.set(0, 0.98, 0);
      server.rotation.set(-0.06, -0.2, 0.05);
      security.add(server);
      edges(server, 0xffc36f);
      for (let i = 0; i < 3; i++) {
        const slot = register(new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.035, 0.02), material(0xffc36f)), true);
        slot.position.set(0, 0.18 - i * 0.17, 0.2);
        server.add(slot);
      }
      const assetLabel = text('ASSET / PAYMENTS API', '#ffc36f', 1.42, true);
      assetLabel.position.set(0, 1.42, 0.1);
      security.add(assetLabel);

      const vuln = register(new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), material(0xe8a030)));
      vuln.position.set(0, 0.02, 0);
      vuln.rotation.set(0.3, 0.5, 0.2);
      security.add(vuln);
      edges(vuln, 0xffb36f);
      const vulnLabel = text('VULNERABILITY / EPSS .91', '#ffb36f', 1.62, true);
      vulnLabel.position.set(0, 0.47, 0.1);
      security.add(vulnLabel);

      const risk = register(new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 0), material(0xe87930, true)));
      risk.position.set(0, -0.9, 0);
      risk.rotation.set(0.2, 0.5, 0.2);
      security.add(risk);
      const riskLabel = text('RISK / CONTEXT MISSING', '#ff9a64', 1.5, true);
      riskLabel.position.set(0, -1.36, 0.1);
      security.add(riskLabel);
      const securityTitle = text('SECURITY SILO', '#e8a030', 1.42);
      securityTitle.position.set(0, -1.7, 0.1);
      security.add(securityTitle);
      beam(security, new THREE.Vector3(0, 0.68, 0), new THREE.Vector3(0, 0.34, 0), 0xe8a030);
      beam(security, new THREE.Vector3(0, -0.34, 0), new THREE.Vector3(0, -0.58, 0), 0xe87930);

      const leftBreak = new THREE.Vector3(-0.2, 0.02, 0.12);
      const rightBreak = new THREE.Vector3(0.2, 0.02, 0.12);
      beam(this.fragmentGroup, new THREE.Vector3(-0.92, 0.02, 0.12), leftBreak, 0x12d8ff, 0.035);
      beam(this.fragmentGroup, rightBreak, new THREE.Vector3(0.92, 0.02, 0.12), 0xe8a030, 0.035);
      beam(this.fragmentGroup, new THREE.Vector3(-0.11, 0.14, 0.14), new THREE.Vector3(0.11, -0.1, 0.14), 0xe8a030, 0.02);
      beam(this.fragmentGroup, new THREE.Vector3(-0.11, -0.1, 0.14), new THREE.Vector3(0.11, 0.14, 0.14), 0xe8a030, 0.02);

      const lostLabel = text('SIGNAL LOST', '#ffb36f', 0.94);
      lostLabel.position.set(0, -0.28, 0.16);
      this.fragmentGroup.add(lostLabel);

      const board = register(new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 1), material(0x64748b, true)));
      board.position.set(0, 1.62, -0.18);
      this.fragmentGroup.add(board);
      const boardLabel = text('BOARD / NO SIGNAL', '#94a3b8', 1.18, true);
      boardLabel.position.set(0, 1.96, 0.1);
      this.fragmentGroup.add(boardLabel);

      const makePulse = (from, to, color, phase) => {
        const pulse = new THREE.Mesh(
          new THREE.SphereGeometry(0.07, 10, 10),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0,
            depthTest: false,
            depthWrite: false,
            blending: THREE.AdditiveBlending
          })
        );
        pulse.userData = { from, to, phase };
        this.fragmentGroup.add(pulse);
        this.fragmentPulses.push(pulse);
      };
      makePulse(new THREE.Vector3(-0.9, 0.02, 0.16), leftBreak, 0x12d8ff, 0);
      makePulse(new THREE.Vector3(0.9, 0.02, 0.16), rightBreak, 0xe8a030, 0.5);

      this.fragmentWarning = new THREE.Mesh(
        new THREE.TorusGeometry(0.28, 0.025, 8, 24),
        new THREE.MeshBasicMaterial({
          color: 0xe8a030,
          transparent: true,
          opacity: 0,
          depthTest: false,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      );
      this.fragmentWarning.position.set(0, 0.02, 0.12);
      this.fragmentGroup.add(this.fragmentWarning);
      this.fragmentGroup.renderOrder = 8;
    }

    nodePosition(i, total) {
      const t = i / Math.max(total - 1, 1);
      const angle = t * Math.PI * 2.2;
      const radius = 2.2 + t * 1.4;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.3) * 1.1,
        -t * 3.5
      );
    }

    buildTwin() {
      if (!window.CV || !CV.TWIN_NODES) return;
      this.twinGroup = new THREE.Group();
      this.root.add(this.twinGroup);

      const nodes = CV.TWIN_NODES;
      nodes.forEach((n, i) => {
        const pos = this.nodePosition(i, nodes.length);
        this.nodeMap[n.id] = pos.clone();

        const core = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.2, 0),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(n.color),
            emissive: new THREE.Color(n.color),
            emissiveIntensity: 0.9,
            roughness: 0.28,
            metalness: 0.55,
            transparent: true,
            opacity: 0.25
          })
        );
        core.position.copy(pos);

        const halo = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.34, 0),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(n.color),
            transparent: true,
            opacity: 0.1,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            wireframe: true
          })
        );
        core.add(halo);

        const label = this.makeLabel(n.label, n.color);
        label.position.set(0, 0.55, 0);
        core.add(label);

        core.userData = { id: n.id, kind: 'twin', base: pos.clone(), phase: i * 0.7 };
        this.twinGroup.add(core);
        this.nodeMeshes.push(core);
      });

      CV.TWIN_EDGES.forEach((pair) => {
        const a = this.nodeMap[pair[0]];
        const b = this.nodeMap[pair[1]];
        if (!a || !b) return;
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([a, b]),
          new THREE.LineBasicMaterial({
            color: 0x12d8ff,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
          })
        );
        line.userData = { a: pair[0], b: pair[1], targetOpacity: 0.15 };
        this.twinGroup.add(line);
        this.edgeLines.push(line);
      });

      this.parallaxGroups.push({ obj: this.twinGroup, factor: 0.5 });
    }

    buildAtlasStations() {
      if (!window.CV || !CV.CAPABILITIES) return;
      this.atlasGroup = new THREE.Group();
      this.root.add(this.atlasGroup);

      const byMission = {};
      CV.CAPABILITIES.forEach((c) => {
        (byMission[c.mission] = byMission[c.mission] || []).push(c);
      });

      Object.entries(byMission).forEach(([mission, caps]) => {
        const layout = MISSION_LAYOUT[mission];
        if (!layout) return;

        // Mission hub — architectural diamond ring (not orbital torus)
        const hub = new THREE.Mesh(
          new THREE.RingGeometry(1.05, 1.14, 4),
          new THREE.MeshBasicMaterial({
            color: layout.color,
            transparent: true,
            opacity: 0.32,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        hub.position.set(layout.cx, layout.cy, layout.cz);
        hub.rotation.x = Math.PI / 2.15;
        hub.rotation.z = Math.PI / 4;
        hub.userData = { mission, kind: 'hub' };
        this.atlasGroup.add(hub);

        const hubPlate = new THREE.Mesh(
          new THREE.CircleGeometry(0.35, 6),
          new THREE.MeshBasicMaterial({
            color: layout.color,
            transparent: true,
            opacity: 0.16,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        hubPlate.position.copy(hub.position);
        hubPlate.rotation.x = Math.PI / 2.15;
        this.atlasGroup.add(hubPlate);

        const hubLabel = this.makeLabel(
          CV.MISSIONS[mission].label,
          '#' + layout.color.toString(16).padStart(6, '0')
        );
        hubLabel.position.set(layout.cx, layout.cy + 1.35, layout.cz);
        hubLabel.scale.set(2.2, 0.5, 1);
        this.atlasGroup.add(hubLabel);

        caps.forEach((cap, i) => {
          const angle = (i / Math.max(caps.length, 1)) * Math.PI * 2 - Math.PI / 2;
          const r = 0.85 + (caps.length > 3 ? 0.15 : 0);
          const pos = new THREE.Vector3(
            layout.cx + Math.cos(angle) * r,
            layout.cy + Math.sin(angle) * r * 0.55,
            layout.cz + Math.sin(angle * 0.5) * 0.25
          );

          const isAuditor = cap.id === 'auditor';
          const size = isAuditor ? 0.14 : 0.09;
          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(size * 1.6, size * 1.6, size * 1.6),
            new THREE.MeshStandardMaterial({
              color: new THREE.Color(layout.color),
              emissive: new THREE.Color(isAuditor ? 0x0057ff : layout.color),
              emissiveIntensity: isAuditor ? 1.4 : 0.7,
              roughness: 0.28,
              metalness: 0.55,
              transparent: true,
              opacity: 0.2
            })
          );
          mesh.position.copy(pos);
          mesh.rotation.set(0.4, 0.6, 0.2);

          if (isAuditor) {
            const crown = new THREE.Mesh(
              new THREE.RingGeometry(0.2, 0.26, 6),
              new THREE.MeshBasicMaterial({
                color: 0x0057ff,
                transparent: true,
                opacity: 0.55,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
                depthWrite: false
              })
            );
            crown.rotation.x = Math.PI / 2;
            mesh.add(crown);
          }

          const short = cap.title.length > 18 ? cap.title.slice(0, 16) + '…' : cap.title;
          const label = this.makeLabel(short, '#' + layout.color.toString(16).padStart(6, '0'));
          label.position.set(0, size + 0.28, 0);
          label.scale.set(1.35, 0.34, 1);
          mesh.add(label);

          mesh.userData = {
            kind: 'station',
            id: cap.id,
            mission,
            title: cap.title,
            base: pos.clone(),
            phase: i * 0.55 + mission.length,
            displayOpacity: 0.2
          };
          this.atlasGroup.add(mesh);
          this.stationMeshes.push(mesh);
          this.stationMap[cap.id] = mesh;

          const spoke = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(layout.cx, layout.cy, layout.cz),
              pos
            ]),
            new THREE.LineBasicMaterial({
              color: layout.color,
              transparent: true,
              opacity: 0.12,
              blending: THREE.AdditiveBlending
            })
          );
          spoke.userData = { kind: 'spoke', mission };
          this.atlasGroup.add(spoke);
        });
      });

      this.parallaxGroups.push({ obj: this.atlasGroup, factor: 0.38 });
    }

    makeLabel(text, color) {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 128;
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, 512, 128);
      ctx.font = '600 40px Inter, sans-serif';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(text, 256, 72);
      const tex = new THREE.CanvasTexture(c);
      const spr = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0 })
      );
      spr.userData = { kind: 'label' };
      spr.scale.set(1.8, 0.45, 1);
      return spr;
    }

    makeScreenTexture(title, lines, accent) {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 640;
      const ctx = c.getContext('2d');
      const g = ctx.createLinearGradient(0, 0, 1024, 640);
      g.addColorStop(0, '#0c1628');
      g.addColorStop(1, '#071018');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1024, 640);
      ctx.strokeStyle = accent || 'rgba(18,216,255,0.35)';
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, 992, 608);

      ctx.fillStyle = '#0057ff';
      ctx.font = '600 28px "JetBrains Mono", monospace';
      ctx.fillText('COMPLYVERSE', 48, 70);
      ctx.fillStyle = '#e8eef8';
      ctx.font = '700 48px Montserrat, sans-serif';
      ctx.fillText(title, 48, 140);

      ctx.fillStyle = 'rgba(232,238,248,0.55)';
      ctx.font = '400 28px Inter, sans-serif';
      lines.forEach((line, i) => ctx.fillText(line, 48, 220 + i * 52));

      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `rgba(18,216,255,${0.12 + i * 0.05})`;
        ctx.fillRect(48, 420 + i * 36, 400 + (3 - i) * 80, 18);
      }

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    buildHoloScreens() {
      const specs = [
        {
          id: 'auditor',
          title: 'Auditor Portal',
          lines: ['Journey-scoped certification review', 'Controls · Evidence · Approve / Reject', 'Shareable tenant-safe deep links'],
          pos: new THREE.Vector3(5.6, 0.6, -2.0),
          rot: -0.4,
          chapter: 'atlas'
        },
        {
          id: 'controls',
          title: 'Control Library',
          lines: ['Map once across every obligation', 'AI grouping · evidence reuse', 'ISO · NCA · SAMA · PCI'],
          pos: new THREE.Vector3(-6.0, 1.1, -1.2),
          rot: 0.42,
          chapter: 'atlas'
        },
        {
          id: 'complychat',
          title: 'ComplyChat',
          lines: ['Ask live GRC in business language', 'Grounded · role-scoped · source-linked', 'CRO-ready answers in seconds'],
          pos: new THREE.Vector3(0.8, 2.8, -6.8),
          rot: -0.1,
          chapter: 'ai'
        }
      ];

      specs.forEach((s) => {
        const mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(2.8, 1.75),
          new THREE.MeshStandardMaterial({
            map: this.makeScreenTexture(s.title, s.lines),
            emissive: new THREE.Color(0x0a2030),
            emissiveIntensity: 0.35,
            roughness: 0.4,
            metalness: 0.2,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide
          })
        );
        mesh.position.copy(s.pos);
        mesh.rotation.y = s.rot;
        const frame = new THREE.Mesh(
          new THREE.PlaneGeometry(2.95, 1.9),
          new THREE.MeshBasicMaterial({
            color: 0x12d8ff,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        frame.position.z = -0.02;
        mesh.add(frame);
        mesh.userData = { kind: 'holo', id: s.id, chapter: s.chapter, baseRot: s.rot, displayOpacity: 0.15 };
        this.twinGroup.add(mesh);
        this.screens.push(mesh);
      });
    }

    buildComparePlane() {
      const c = document.createElement('canvas');
      c.width = 1280;
      c.height = 720;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#07101a';
      ctx.fillRect(0, 0, 1280, 720);
      ctx.strokeStyle = 'rgba(18,216,255,0.4)';
      ctx.lineWidth = 3;
      ctx.strokeRect(12, 12, 1256, 696);
      ctx.fillStyle = '#0057ff';
      ctx.font = '600 26px "JetBrains Mono", monospace';
      ctx.fillText('CAPABILITY SIGNAL', 40, 56);
      ctx.fillStyle = '#e8eef8';
      ctx.font = '700 42px Montserrat, sans-serif';
      ctx.fillText('ComplyVerse vs market', 40, 110);

      const rows = (window.CV && CV.COMPARE_ROWS ? CV.COMPARE_ROWS : []).slice(0, 8);
      ctx.font = '500 22px Inter, sans-serif';
      rows.forEach((r, i) => {
        const y = 170 + i * 58;
        ctx.fillStyle = 'rgba(232,238,248,0.7)';
        ctx.fillText(r[1], 40, y);
        ctx.fillStyle = '#12d8ff';
        ctx.fillText(r[2], 520, y);
        ctx.fillStyle = 'rgba(139,155,180,0.8)';
        ctx.fillText(r[3] + '  ' + r[4] + '  ' + r[5], 620, y);
      });
      ctx.fillStyle = 'rgba(0,87,255,0.9)';
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillText('Includes Auditor Portal / certification review', 40, 680);

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      this.comparePlane = new THREE.Mesh(
        new THREE.PlaneGeometry(5.2, 2.9),
        new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          opacity: 0.05,
          emissive: new THREE.Color(0x0a1828),
          emissiveIntensity: 0.3,
          side: THREE.DoubleSide
        })
      );
      this.comparePlane.position.set(0, 1.2, -3.5);
      this.comparePlane.userData = { kind: 'compare', chapter: 'compare', displayOpacity: 0.05 };
      this.root.add(this.comparePlane);
    }

    buildExperiencePlanes() {
      if (!window.CV || !CV.LIVE_ROUTES) return;
      const picks = CV.LIVE_ROUTES.filter((r) =>
        ['dashboard', 'auditor', 'controls', 'evidence', 'chat', 'vulns'].includes(r.id)
      );
      picks.forEach((route, i) => {
        const angle = (i / picks.length) * Math.PI * 2;
        const mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(2.2, 1.35),
          new THREE.MeshStandardMaterial({
            map: this.makeScreenTexture(
              route.label,
              [route.path, 'Interactive product plane', 'Scroll or click to open'],
              'rgba(0,87,255,0.4)'
            ),
            transparent: true,
            opacity: 0.08,
            emissive: new THREE.Color(0x101828),
            emissiveIntensity: 0.25,
            side: THREE.DoubleSide
          })
        );
        mesh.position.set(
          Math.cos(angle) * 3.4,
          Math.sin(angle) * 1.1 - 0.4,
          -7.2 + Math.sin(angle) * 0.8
        );
        mesh.rotation.y = -angle + Math.PI;
        mesh.userData = {
          kind: 'experience',
          id: route.id,
          route,
          base: mesh.position.clone(),
          displayOpacity: 0.08
        };
        this.root.add(mesh);
        this.expPlanes.push(mesh);
      });
    }

    buildAgentPulse() {
      this.agentPulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshBasicMaterial({
          color: 0x0057ff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending
        })
      );
      this.agentPulse.visible = false;
      this.root.add(this.agentPulse);
    }

    buildPlatformRings() {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(4.5, 0.02, 12, 120),
        new THREE.MeshBasicMaterial({
          color: 0x12d8ff,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending
        })
      );
      ring.rotation.x = Math.PI / 2.4;
      ring.position.y = -2.6;
      this.root.add(ring);
      this.platformRing = ring;

      const ring2 = ring.clone();
      ring2.scale.set(1.35, 1.35, 1.35);
      ring2.material = ring.material.clone();
      ring2.material.color = new THREE.Color(0x0057ff);
      ring2.material.opacity = 0.1;
      this.root.add(ring2);
      this.platformRing2 = ring2;
    }

    setProgress(t) {
      this.targetProgress = Math.max(0, Math.min(1, t));
      if (reduced) this.progress = this.targetProgress;
    }

    setChapterState(id, progress) {
      this.activeChapter = id || '';
      this.activeChapterProgress = Math.max(0, Math.min(1, progress || 0));
    }

    /** Immediate camera place (deep links / reduced motion) */
    snapCameraToProgress(t) {
      this.progress = Math.max(0, Math.min(1, t));
      this.targetProgress = this.progress;
      const { pos, look } = this.sampleRail(this.progress);
      this.camera.position.copy(pos);
      this._camPos.copy(pos);
      this._look.copy(look);
      this._camLook.copy(look);
      this.camera.lookAt(this._look);
    }

    sampleRail(progress) {
      const rail = this.rail;
      const max = rail.length - 1;
      const f = progress * max;
      const i = Math.floor(f);
      const local = f - i;
      // Blend smootherstep → slight expo for premium settle without overshoot
      const ease = expoOut(smootherstep(local));
      const a = rail[i];
      const b = rail[Math.min(i + 1, max)];
      const pos = a.p.clone().lerp(b.p, ease);
      const look = a.l.clone().lerp(b.l, ease);
      return { pos, look };
    }

    focusCapability(id) {
      const mesh = this.stationMap[id];
      if (!mesh) return;
      this.focusedStation = id;
      this.stationMeshes.forEach((m) => {
        const on = m.userData.id === id;
        m.material.emissiveIntensity = on ? 2.2 : 0.45;
        m.scale.setScalar(on ? 1.55 : 1);
      });
      if (this.onStationSelect) this.onStationSelect(id);
    }

    clearFocus() {
      this.focusedStation = null;
      this.stationMeshes.forEach((m) => {
        m.material.emissiveIntensity = m.userData.id === 'auditor' ? 1.4 : 0.7;
        m.scale.setScalar(1);
      });
    }

    runAgentPath(nodeIds) {
      const pts = (nodeIds || [])
        .map((id) => this.nodeMap[id])
        .filter(Boolean)
        .map((p) => p.clone());
      if (pts.length < 2) {
        this.agentActive = false;
        this.agentPulse.visible = false;
        return;
      }
      this.agentPath = pts;
      this.agentT = 0;
      this.agentActive = true;
      this.agentPulse.visible = true;
      this.agentPulse.material.opacity = 1;
    }

    stopAgentPath() {
      this.agentActive = false;
      if (this.agentPulse) {
        this.agentPulse.visible = false;
        this.agentPulse.material.opacity = 0;
      }
    }

    updateCamera(dt) {
      if (!reduced) {
        // Soft chase toward scrubbed progress (avoids frame pops when scroll spikes)
        this.progress = damp(this.progress, this.targetProgress, 10, dt);
      }

      const { pos, look } = this.sampleRail(this.progress);
      pos.x += this.mouse.x * 0.55;
      pos.y += this.mouse.y * 0.32;

      if (reduced) {
        this.camera.position.copy(pos);
        this._look.copy(look);
        this.camera.lookAt(this._look);
        return;
      }

      // Responsive damp — higher lambda than 0.08 lerp, still butter-smooth
      dampVec3(this._camPos, pos, 14, dt);
      dampVec3(this._camLook, look, 12, dt);
      this.camera.position.copy(this._camPos);
      this.camera.lookAt(this._camLook);
      this._look.copy(this._camLook);
    }

    /** Soft opacity ramp — no hard on/off pops */
    softOpacity(mat, target, dt, lambda = 8) {
      mat.opacity = damp(mat.opacity, target, lambda, dt);
    }

    updateNarrativeLighting(p, dt, t) {
      // Chapter-tinted atmosphere
      const birth = 1 - smoothstep(p / 0.12);
      const twin = smoothstep((p - 0.1) / 0.2) * (1 - smoothstep((p - 0.35) / 0.2));
      const atlas = smoothstep((p - 0.28) / 0.18) * (1 - smoothstep((p - 0.5) / 0.18));
      const ai = smoothstep((p - 0.48) / 0.15) * (1 - smoothstep((p - 0.68) / 0.15));
      const late = smoothstep((p - 0.7) / 0.25);

      const keyTarget = 1.6 + birth * 0.5 + twin * 0.7 + atlas * 0.4 + Math.sin(t * 0.6) * 0.12;
      const rimTarget = 1.0 + atlas * 0.5 + ai * 0.8 + Math.cos(t * 0.45) * 0.1;
      const accentTarget = 0.5 + late * 0.7 + (1 - twin) * 0.15;
      const fogTarget = 0.018 + birth * 0.008 + late * 0.006;

      this.keyLight.intensity = damp(this.keyLight.intensity, keyTarget, 4, dt);
      this.rimLight.intensity = damp(this.rimLight.intensity, rimTarget, 4, dt);
      this.accentLight.intensity = damp(this.accentLight.intensity, accentTarget, 4, dt);
      this.fogDensity = damp(this.fogDensity, fogTarget, 3, dt);
      if (this.scene.fog) this.scene.fog.density = this.fogDensity;

      this.narrativeSpot.intensity = damp(
        this.narrativeSpot.intensity,
        0.4 + twin * 0.9 + ai * 0.6,
        3,
        dt
      );
      this.narrativeSpot.position.x = Math.sin(t * 0.25) * 2;
      this.narrativeSpot.position.z = -2 - p * 6;

      // Sync light volumes with chapter energy
      this.lightVolumes.forEach((v) => {
        const pulse = reduced ? 1 : 0.92 + Math.sin(t * 0.4 + v.phase) * 0.08;
        const chapterBoost = 0.7 + twin * 0.35 + ai * 0.25;
        v.mesh.material.opacity = damp(
          v.mesh.material.opacity,
          v.baseOpacity * pulse * chapterBoost,
          3,
          dt
        );
      });

      // Grid / rail breathing with story
      const railOp = 0.12 + twin * 0.12 + atlas * 0.1 + ai * 0.08;
      this.rails.forEach((r, i) => {
        if (r.material) {
          r.material.opacity = damp(r.material.opacity, railOp + (i % 3) * 0.03, 3, dt);
        }
      });
      this.gridPlanes.forEach((g, i) => {
        if (g.material) {
          const base = i === 0 ? 0.1 : 0.05;
          g.material.opacity = damp(
            g.material.opacity,
            base + twin * 0.06 + birth * 0.04 + i * 0.008,
            3,
            dt
          );
        }
      });
    }

    updateTwinState(dt, t) {
      const p = this.progress;
      const fragmentOn = this.activeChapter === 'chapter-fragment' ? 1 : 0;
      const fragmentZoom = smoothstep(this.activeChapterProgress);
      const fragmentSeparation = fragmentZoom;
      if (this.fragmentGroup) {
        // Camera-relative placement guarantees the visual stays in frame even when
        // a slow device takes several frames to catch up with scroll progress.
        this.camera.getWorldDirection(this._fragmentForward);
        this._fragmentRight.crossVectors(this._fragmentForward, this.camera.up).normalize();
        this._fragmentTarget
          .copy(this.camera.position)
          .addScaledVector(this._fragmentForward, lerp(6.3, 4.9, fragmentZoom))
          .addScaledVector(this._fragmentRight, lerp(-2.25, -1.9, fragmentZoom));
        this._fragmentTarget.y += 0.15;
        dampVec3(this.fragmentGroup.position, this._fragmentTarget, 12, dt);
        this.fragmentGroup.lookAt(this.camera.position);
        const fragmentScale = damp(this.fragmentGroup.scale.x, lerp(0.72, 1.04, fragmentZoom), 9, dt);
        this.fragmentGroup.scale.setScalar(fragmentScale);

        this.fragmentParts.forEach((part) => {
          const base = part.userData.base;
          const phase = part.userData.phase || 0;
          const isLabel = part.userData.fragmentLabel;
          const target = fragmentOn * (isLabel ? 0.96 : part.userData.fragmentFrame ? 0.52 : part.userData.fragmentDetail ? 0.86 : 0.92);
          if (part.material) this.softOpacity(part.material, target, dt, 7);
          if (!reduced && base) {
            const drift = Math.sin(t * 0.55 + phase) * 0.045;
            const side = base.x > 0 ? fragmentSeparation * 0.1 : -fragmentSeparation * 0.1;
            part.position.x = base.x + side;
            part.position.y = base.y + drift;
          }
        });
        this.fragmentLines.forEach((line, i) => {
          this.softOpacity(line.material, fragmentOn * (0.28 + (i % 2) * 0.08), dt, 7);
        });
        this.fragmentPulses.forEach((pulse) => {
          const travel = (t * 0.34 + pulse.userData.phase) % 1;
          pulse.position.lerpVectors(pulse.userData.from, pulse.userData.to, travel);
          const dieAtGap = 1 - smoothstep((travel - 0.62) / 0.34);
          this.softOpacity(pulse.material, fragmentOn * dieAtGap * 0.95, dt, 12);
          pulse.scale.setScalar(0.85 + Math.sin(t * 5 + pulse.userData.phase) * 0.18);
        });
        if (this.fragmentWarning) {
          this.softOpacity(this.fragmentWarning.material, fragmentOn * (0.3 + Math.abs(Math.sin(t * 2.2)) * 0.18), dt, 7);
          this.fragmentWarning.rotation.z = t * 0.25;
          this.fragmentWarning.scale.setScalar(0.9 + Math.sin(t * 2.2) * 0.08);
        }
      }
      const edgeOn = smoothstep((p - 0.1) / 0.26);
      const lateLabelFade = 1 - smoothstep((p - 0.72) / 0.12);

      this.edgeLines.forEach((line, idx) => {
        const stagger = smoothstep(edgeOn * this.edgeLines.length - idx);
        const target = 0.08 + stagger * 0.52;
        line.userData.targetOpacity = target;
        this.softOpacity(line.material, target, dt, 7);
      });

      this.nodeMeshes.forEach((m, i) => {
        const appear = smoothstep((p - 0.05) * 3.2 - i * 0.05);
        const nodeTarget = 0.15 + appear * 0.75;
        this.softOpacity(m.material, nodeTarget, dt, 7);
        m.material.emissiveIntensity = damp(
          m.material.emissiveIntensity,
          0.4 + appear * 1.2,
          6,
          dt
        );
        if (!reduced) {
          const floatY = Math.sin(t * 0.8 + m.userData.phase) * 0.06;
          m.position.y = m.userData.base.y + floatY;
        }
        const sc = 0.72 + appear * 0.33;
        const cur = m.scale.x;
        const next = damp(cur, sc, 8, dt);
        m.scale.setScalar(next);
        m.children.forEach((child) => {
          if (!child.material || child.userData?.kind !== 'label') return;
          this.softOpacity(child.material, appear * 0.78 * lateLabelFade, dt, 7);
        });
      });

      const atlasOn = smoothstep((p - 0.2) / 0.22);
      if (this.atlasGroup) {
        this.atlasGroup.visible = atlasOn > 0.02;
        this.stationMeshes.forEach((m, i) => {
          const local = smoothstep(atlasOn * 1.35 - i * 0.018);
          const target = 0.12 + local * 0.75;
          m.userData.displayOpacity = target;
          this.softOpacity(m.material, target, dt, 7);
          if (!reduced) {
            m.position.y =
              m.userData.base.y + Math.sin(t * 0.7 + m.userData.phase) * 0.04;
          }
        });
      }

      const screenOn = smoothstep((p - 0.26) / 0.24);
      this.screens.forEach((s, i) => {
        const target = 0.08 + screenOn * 0.84;
        s.userData.displayOpacity = target;
        this.softOpacity(s.material, target, dt, 6);
        if (!reduced) {
          s.rotation.y = s.userData.baseRot + Math.sin(t * 0.28 + i) * 0.035;
        }
      });

      if (this.comparePlane) {
        const cOn = smoothstep((p - 0.6) / 0.16);
        const target = 0.02 + cOn * 0.9;
        this.comparePlane.userData.displayOpacity = target;
        this.softOpacity(this.comparePlane.material, target, dt, 6);
        if (!reduced) {
          this.comparePlane.rotation.y = Math.sin(t * 0.14) * 0.07;
        }
      }

      const eOn = smoothstep((p - 0.73) / 0.16);
      this.expPlanes.forEach((pl, i) => {
        const target = 0.04 + eOn * 0.88;
        pl.userData.displayOpacity = target;
        this.softOpacity(pl.material, target, dt, 6);
        if (!reduced) {
          pl.position.y = pl.userData.base.y + Math.sin(t * 0.48 + i) * 0.045;
        }
      });

      if (this.agentActive && this.agentPath.length > 1) {
        this.agentT += reduced ? 0.02 : 0.0055;
        if (this.agentT >= 1) this.agentT = 0;
        const segs = this.agentPath.length - 1;
        const f = this.agentT * segs;
        const i = Math.floor(f);
        const local = smoothstep(f - i);
        const a = this.agentPath[i];
        const b = this.agentPath[Math.min(i + 1, segs)];
        this.agentPulse.position.lerpVectors(a, b, local);
        this.agentPulse.material.opacity = 0.7 + Math.sin(t * 5) * 0.25;
      }

      if (this.dataDust && this.dataDust.material) {
        const dustOn = smoothstep((p - 0.08) / 0.18) * (1 - softstepLate(p));
        this.dataDust.visible = dustOn > 0.04;
        this.softOpacity(this.dataDust.material, 0.12 + dustOn * 0.28, dt, 3);
      }

      this.updateNarrativeLighting(p, dt, t);
    }

    bind() {
      window.addEventListener('resize', () => this.onResize());
      window.addEventListener(
        'pointermove',
        (e) => {
          this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
          this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        },
        { passive: true }
      );

      this.raycaster = new THREE.Raycaster();
      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera({ x, y }, this.camera);

        const clickables = [
          ...this.stationMeshes,
          ...this.screens,
          ...this.expPlanes,
          ...(this.comparePlane ? [this.comparePlane] : [])
        ];
        const hits = this.raycaster.intersectObjects(clickables, false);
        if (!hits.length) return;

        const obj = hits[0].object;
        const data = obj.userData || {};

        if (data.kind === 'station') {
          this.focusCapability(data.id);
          return;
        }
        if (data.kind === 'holo' || data.kind === 'experience') {
          if (this.onScreenSelect) this.onScreenSelect(data);
          else if (data.id === 'auditor') {
            document
              .getElementById('chapter-atlas')
              ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
            this.focusCapability('auditor');
          }
          return;
        }
        if (data.kind === 'compare') {
          document
            .getElementById('chapter-compare')
            ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        }
      });

      this.canvas.addEventListener('pointermove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera({ x, y }, this.camera);
        const hits = this.raycaster.intersectObjects(
          [...this.stationMeshes, ...this.screens, ...this.expPlanes],
          false
        );
        this.canvas.style.cursor = hits.length ? 'pointer' : '';
      });
    }

    onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }

    animate() {
      this._raf = requestAnimationFrame(() => this.animate());
      const dt = Math.min(this.clock.getDelta(), 0.05);
      const t = this.clock.elapsedTime;

      this.mouse.x = damp(this.mouse.x, this.targetMouse.x, 8, dt);
      this.mouse.y = damp(this.mouse.y, this.targetMouse.y, 8, dt);

      if (this.dataDust && !reduced) {
        // Gentle drift only — no sky-sphere spin
        const positions = this.dataDust.geometry.attributes.position;
        if ((this._dustTick = (this._dustTick || 0) + 1) % 4 === 0) {
          for (let i = 0; i < positions.count; i += 11) {
            positions.array[i * 3 + 1] += Math.sin(t * 0.35 + i) * 0.0015;
          }
          positions.needsUpdate = true;
        }
      }

      if (this.platformRing && !reduced) {
        this.platformRing.rotation.z = t * 0.06;
        this.platformRing2.rotation.z = -t * 0.04;
      }

      this.parallaxGroups.forEach((g) => {
        const tx = this.mouse.x * g.factor * 0.75;
        const ty = this.mouse.y * g.factor * 0.45;
        g.obj.position.x = damp(g.obj.position.x, tx, 6, dt);
        g.obj.position.y = damp(g.obj.position.y, ty, 6, dt);
      });

      if (!reduced) {
        this.accentLight.position.x = Math.sin(t * 0.35) * 2.8;
      }

      this.updateCamera(dt);
      this.updateTwinState(dt, t);
      this.renderer.render(this.scene, this.camera);
    }

    destroy() {
      cancelAnimationFrame(this._raf);
      this.renderer.dispose();
    }
  }

  function twinLift(p) {
    return smoothstep((p - 0.08) / 0.25) * (1 - smoothstep((p - 0.55) / 0.3));
  }

  function softstepLate(p) {
    return smoothstep((p - 0.78) / 0.18);
  }

  window.ComplyWorld = ComplyWorld;
})();
