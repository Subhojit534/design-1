import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

// ============================================================================
// 6 Curated Walkthrough Stages: Living -> Dining -> Panorama -> Master Suite
// ============================================================================
const WALKTHROUGH_STAGES = [
  {
    id: 1,
    floor: 'LEVEL 01 // LIVING LOUNGE',
    room: 'living',
    name: 'Living Lounge',
    pos: new THREE.Vector3(65.0, 48.0, 220.0),
    target: new THREE.Vector3(65.0, 32.0, 5.0),
    fov: 46.0,
    hotspots: [
      {
        id: 'sofa',
        pos: new THREE.Vector3(65.0, 30.0, 20.0),
        name: 'Modular Italian Sofa',
        category: 'CUSTOM FURNITURE',
        desc: 'Handcrafted high-density cushioning with textured linen-cotton weave and low-slung brushed architectural steel base.',
        mat: 'Charcoal Textured Linen & Steel',
        dim: '310cm x 110cm x 72cm',
        origin: 'Milan Atelier Bespoke'
      },
      {
        id: 'table',
        pos: new THREE.Vector3(65.0, 18.0, 12.0),
        name: 'Solid Walnut Coffee Table',
        category: 'CENTRAL FURNITURE',
        desc: 'Continuous grain American walnut timber slab with chamfered edge profiling, supported on minimalist darkened iron framework.',
        mat: 'American Black Walnut & Iron',
        dim: '140cm x 75cm x 36cm',
        origin: 'Hand-Finished Artisan Piece'
      },
      {
        id: 'gallery',
        pos: new THREE.Vector3(48.0, 88.0, -68.0),
        name: 'Wall Art Triptych',
        category: 'CURATED ARTWORK',
        desc: 'Museum-grade fine art giclée canvas prints presented in bespoke ebonized oak floating shadowbox frames.',
        mat: 'Giclée on Archival Canvas',
        dim: 'Three 70cm x 100cm Frames',
        origin: 'Contemporary Studio Series'
      }
    ]
  },
  {
    id: 2,
    floor: 'LEVEL 01 // CULINARY & DINING',
    room: 'living',
    name: 'Dining Room Suite',
    pos: new THREE.Vector3(145.0, 36.0, 140.0),
    target: new THREE.Vector3(55.0, 20.0, 82.0),
    fov: 48.0,
    hotspots: [
      {
        id: 'dining_table',
        pos: new THREE.Vector3(61.5, 20.0, 85.0),
        name: 'Solid Walnut Dining Table',
        category: 'DINING ARCHITECTURE',
        desc: 'Substantial American walnut slab dining table with hand-chamfered edge detailing, recessed steel framework, and natural matte oiled finish.',
        mat: 'Smoked American Walnut & Steel',
        dim: '240cm x 95cm x 76cm',
        origin: 'Artisan Workshop Craft'
      },
      {
        id: 'dining_teapot',
        pos: new THREE.Vector3(39.6, 28.0, 80.0),
        name: 'Artisan Ceramic Stoneware',
        category: 'CERAMIC SCULPTURE',
        desc: 'Hand-thrown architectural ceramic stoneware teapot and tableware with volcanic matte black textured glaze.',
        mat: 'High-Fired Volcanic Glaze Stoneware',
        dim: 'Sculptural Tableware Set',
        origin: 'Kyoto Studio Bespoke'
      },
      {
        id: 'dining_benches',
        pos: new THREE.Vector3(142.0, 15.0, 84.0),
        name: 'Low-Slung Dining Benches',
        category: 'DINING SEATING',
        desc: 'Minimalist low-profile timber dining benches with tailored charcoal linen upholstery and brushed steel support legs.',
        mat: 'Charcoal Linen & Smoked Oak',
        dim: '180cm x 45cm x 45cm',
        origin: 'Nordic Minimalist Line'
      }
    ]
  },
  {
    id: 3,
    floor: 'LEVEL 01 // ARCHITECTURAL PANORAMA',
    room: 'living',
    name: 'Grand Living & Dining Panorama',
    pos: new THREE.Vector3(200.0, 48.0, 195.0),
    target: new THREE.Vector3(40.0, 30.0, 10.0),
    fov: 54.0,
    hotspots: [
      {
        id: 'double_glazing',
        pos: new THREE.Vector3(-68.0, 65.0, 120.0),
        name: 'Double-Height Glazing Facade',
        category: 'STRUCTURAL ENVELOPE',
        desc: 'Floor-to-ceiling architectural thermal curtain wall with low-iron acoustic glazing, flooding both living and culinary suites with natural daylight.',
        mat: 'Low-Iron Acoustic Glass & Aluminum',
        dim: 'Full Double-Height Curtain Wall',
        origin: 'Architectural Glazing Studio'
      },
      {
        id: 'living_overview',
        pos: new THREE.Vector3(60.0, 20.0, 30.0),
        name: 'Continuous Oak Floorplan',
        category: 'INTERIOR ARCHITECTURE',
        desc: 'Seamless wide-plank French oak hardwood flooring unifying the open-concept ground pavilion with subtle clearcoat satin luster.',
        mat: 'Natural French Oak Wide Planks',
        dim: 'Ground Pavilion Coverage',
        origin: 'Bespoke Architectural Flooring'
      }
    ]
  },
  {
    id: 4,
    floor: 'LEVEL 02 // MASTER SUITE',
    room: 'bedroom',
    name: 'Master Bed Focal Suite',
    pos: new THREE.Vector3(-35.0, 42.0, 235.0),
    target: new THREE.Vector3(55.0, 28.0, 155.0),
    fov: 48.0,
    hotspots: [
      {
        id: 'bed',
        pos: new THREE.Vector3(48.0, 22.0, 154.0),
        name: 'King Master Platform Bed',
        category: 'BEDROOM SUITE',
        desc: 'Low-profile solid timber platform bed with tailored charcoal linen bedding, integrated floating walnut side tables, and ergonomic support mattress.',
        mat: 'Smoked Walnut & Woven Slate Linen',
        dim: '210cm x 200cm x 45cm',
        origin: 'Nordic Architectural Studio'
      },
      {
        id: 'pendant',
        pos: new THREE.Vector3(115.0, 52.0, 131.0),
        name: 'Translucent Opal Glass Pendants',
        category: 'AMBIENT LIGHTING',
        desc: 'Hand-blown satin opal glass diffusers emitting a warm 2700K ambient illumination with brushed champagne brass suspension fittings.',
        mat: 'Blown Opal Glass & Brushed Brass',
        dim: 'Dual 25cm Spherical Fixtures',
        origin: 'Scandinavian Lighting Lab'
      }
    ]
  },
  {
    id: 5,
    floor: 'LEVEL 02 // STUDIO & MEDIA',
    room: 'bedroom',
    name: 'Executive Workstation & Media',
    pos: new THREE.Vector3(15.0, 56.0, 85.0),
    target: new THREE.Vector3(95.0, 38.0, 12.0),
    fov: 52.0,
    hotspots: [
      {
        id: 'desk',
        pos: new THREE.Vector3(100.0, 38.0, 10.0),
        name: 'Executive Architectural Workstation',
        category: 'STUDIO FURNITURE',
        desc: 'Floating solid timber desktop with concealed cable raceway, soft-close stationery drawers, and sculpted ergonomic studio task chair.',
        mat: 'Solid Natural Oak & Graphite Frame',
        dim: '160cm x 70cm x 75cm',
        origin: 'Custom Joinery Workshop'
      },
      {
        id: 'media',
        pos: new THREE.Vector3(-93.0, 50.0, 158.0),
        name: 'Media Lounge Display Console',
        category: 'ENTERTAINMENT SUITE',
        desc: 'Acoustically treated wood panel feature wall with flush-mounted ultra-slim display and floating minimalist media credenza.',
        mat: 'Acoustic Fluted Panels & Matt Black Trim',
        dim: '220cm x 40cm x 65cm',
        origin: 'Hi-Fi Studio Integration'
      }
    ]
  },
  {
    id: 6,
    floor: 'LEVEL 02 // PRIVATE SALON',
    room: 'bedroom',
    name: 'Private Mezzanine Lounge',
    pos: new THREE.Vector3(28.0, 36.0, -195.0),
    target: new THREE.Vector3(-18.0, 24.0, -315.0),
    fov: 52.0,
    hotspots: [
      {
        id: 'lounge_sofa',
        pos: new THREE.Vector3(-10.0, 18.0, -365.0),
        name: 'Modular Sectional Sofa',
        category: 'BESPOKE SEATING',
        desc: 'Deep-seat L-shaped sectional sofa with charcoal textured woven fabric, ergonomic multi-density foam cushions, and low-profile smoked timber base.',
        mat: 'Charcoal Heather Weave & Smoked Timber',
        dim: '320cm x 220cm x 75cm',
        origin: 'Milan Atelier Bespoke'
      },
      {
        id: 'lounge_chair',
        pos: new THREE.Vector3(63.0, 22.0, -254.0),
        name: 'Sculptural Wire Accent Chair',
        category: 'DESIGNER SEATING',
        desc: 'Iconic curved architectural steel frame with upholstered ergonomic leather seat and tactile curved backrest contour.',
        mat: 'Graphite Tubular Steel & Saddle Leather',
        dim: '68cm x 65cm x 76cm',
        origin: 'Contemporary Studio Icon'
      },
      {
        id: 'lounge_table',
        pos: new THREE.Vector3(66.0, 12.0, -325.0),
        name: 'Artisan Low Coffee Table',
        category: 'LIVING FURNITURE',
        desc: 'Minimalist low-profile coffee table featuring solid natural oak slab surface with chamfered edge and brushed steel cylindrical supports.',
        mat: 'Solid Natural Oak & Brushed Steel',
        dim: '120cm x 70cm x 36cm',
        origin: 'Hand-Finished Artisan Joinery'
      },
      {
        id: 'lounge_gallery',
        pos: new THREE.Vector3(-104.0, 90.0, -284.0),
        name: 'Curated Gallery Triptych',
        category: 'FINE ART COLLECTION',
        desc: 'Museum-grade archival giclée canvas series in slim ebonized timber frames, illuminated by soft architectural wash lighting.',
        mat: 'Archival Canvas in Shadowbox Frames',
        dim: 'Three 75cm x 75cm Frames',
        origin: 'Private Gallery Curation'
      }
    ]
  }
];

// ============================================================================
// Core State
// ============================================================================
let activeRoom = 'living'; // dynamically driven by scroll position
let activeAtmosphere = 'daylight';
let isOrbitMode = false;
let isAutoTour = false;
let autoTourAngle = 0;

let scene, camera, renderer, controls, composer, bloomPass;
let lights = {};
let models = { living: null, bedroom: null };
let activeMaterials = { living: {}, bedroom: {} };

let currentPos = new THREE.Vector3();
let currentTarget = new THREE.Vector3();
let currentFov = 46.0;

let desiredPos = new THREE.Vector3();
let desiredTarget = new THREE.Vector3();
let desiredFov = 46.0;

let scrollProgress = 0;

// DOM Elements
const canvas = document.getElementById('webgl-canvas');
const loaderOverlay = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderStatus = document.getElementById('loader-status');
const hudFloorBadge = document.getElementById('hud-floor-badge');
const roomTransitionOverlay = document.getElementById('room-transition-overlay');

// Interactive 360° Drag & Rotate State (Always Active!)
let isUserDragging = false;
let activePointerId = null;
let lastPointerX = 0;
let lastPointerY = 0;
let userYaw = 0;
let userPitch = 0;
let targetUserYaw = 0;
let targetUserPitch = 0;
let currentLookYaw = 0;
let currentLookPitch = 0;
let isLookInitialized = false;

let skyDome;

const btnMode = document.getElementById('btn-mode');
const modeText = document.getElementById('mode-text');
const btnReset = document.getElementById('btn-reset');
const btnToggleUI = document.getElementById('btn-toggle-ui');
const btnCustomizer = document.getElementById('btn-customizer');
const btnAutoTour = document.getElementById('btn-autotour');
const autoTourText = document.getElementById('autotour-text');

const navItems = document.querySelectorAll('.screen-nav-item');
const navIndicatorFill = document.getElementById('nav-indicator-fill');
const journeyPills = document.querySelectorAll('.journey-pill');

const hotspotsLayer = document.getElementById('hotspots-layer');
const hotspotModal = document.getElementById('hotspot-modal');
const btnCloseHotspot = document.getElementById('btn-close-hotspot');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalMat = document.getElementById('modal-mat');
const modalDim = document.getElementById('modal-dim');
const modalOrigin = document.getElementById('modal-origin');

const customizerDrawer = document.getElementById('customizer-drawer');
const btnCloseCustomizer = document.getElementById('btn-close-customizer');
const exposureSlider = document.getElementById('exposure-slider');
const exposureVal = document.getElementById('exposure-val');
const bloomSlider = document.getElementById('bloom-slider');
const bloomVal = document.getElementById('bloom-val');

let customTextures = {};

// ============================================================================
// Initialize Engine
// ============================================================================
function init() {
  // 1. Scene Setup with 360 Sky Atmosphere
  scene = new THREE.Scene();
  scene.background = null;
  scene.fog = new THREE.FogExp2(0xb0cce8, 0.00025);

  // 2. Camera Setup
  const aspect = window.innerWidth / window.innerHeight;
  const initial = WALKTHROUGH_STAGES[0];
  currentPos.copy(initial.pos);
  currentTarget.copy(initial.target);
  currentFov = initial.fov;

  desiredPos.copy(currentPos);
  desiredTarget.copy(currentTarget);
  desiredFov = currentFov;

  camera = new THREE.PerspectiveCamera(currentFov, aspect, 1.0, 2500.0);
  camera.position.copy(currentPos);
  camera.lookAt(currentTarget);

  // 3. Renderer with Deep Rich Contrast & Reduced Brightness
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.88; // Reduced exposure eliminates bright washout

  // 4. Subtle Ambient Environment
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const roomEnv = new RoomEnvironment();
  scene.environment = pmremGenerator.fromScene(roomEnv).texture;
  roomEnv.dispose();

  // 5. Post-Processing Pipeline
  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.22, // Subtle cinematic glow
    0.35, // Tight radius
    0.92  // High threshold ensures walls/bedsheets never bloom
  );
  composer.addPass(bloomPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  // 6. Orbit Controls
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.copy(currentTarget);
  controls.enabled = false;
  controls.maxPolarAngle = Math.PI / 2 + 0.05;
  controls.minDistance = 15;
  controls.maxDistance = 600;

  // 7. Textures & Procedural Finishes
  generateProceduralTextures();

  // 8. Lighting System & 360 Atmosphere
  setupLighting();

  // 9. Load Assets for Both Suites
  loadAllAssets();

  // 10. Events
  setupEvents();

  // 11. Render Loop
  animate();
}

// ============================================================================
// Lighting & High-Contrast Photorealistic Atmospheres
// ============================================================================
function setupLighting() {
  // Key Sunlight with Calibrated Soft Shadow Penumbra
  const sunLight = new THREE.DirectionalLight(0xfff1de, 2.1);
  sunLight.position.set(-220, 170, 130);
  sunLight.target.position.set(65, 20, 30);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 40;
  sunLight.shadow.camera.far = 750;
  sunLight.shadow.camera.left = -220;
  sunLight.shadow.camera.right = 220;
  sunLight.shadow.camera.top = 220;
  sunLight.shadow.camera.bottom = -220;
  sunLight.shadow.bias = -0.0001;
  sunLight.shadow.normalBias = 0.035;
  sunLight.shadow.radius = 2.2;
  scene.add(sunLight);
  scene.add(sunLight.target);
  lights.sunLight = sunLight;

  // Window Sky Portal Fill (Soft cool skylight spill)
  const windowFill = new THREE.DirectionalLight(0x8cb4e6, 0.7);
  windowFill.position.set(-160, 90, 140);
  windowFill.target.position.set(80, 45, 60);
  scene.add(windowFill);
  scene.add(windowFill.target);
  lights.windowFill = windowFill;

  // Global Illumination (GI) Floor Bounce Fill (Simulates warm light bouncing off wood floor)
  const floorBounce = new THREE.DirectionalLight(0xd4a56a, 0.75);
  floorBounce.position.set(65, -30, 60);
  floorBounce.target.position.set(65, 120, 60);
  scene.add(floorBounce);
  scene.add(floorBounce.target);
  lights.floorBounce = floorBounce;

  // Ambient Grounding Atmosphere
  const hemiLight = new THREE.HemisphereLight(0x90a8c8, 0x2a1c12, 0.55);
  hemiLight.position.set(0, 250, 0);
  scene.add(hemiLight);
  lights.hemiLight = hemiLight;

  // Living Ceiling Soft Downlight
  const ceilingLight = new THREE.PointLight(0xffe6c2, 0.75, 450, 1.4);
  ceilingLight.position.set(60, 150, 50);
  scene.add(ceilingLight);
  lights.ceilingLight = ceilingLight;

  // Dining Room Tabletop Warm Architectural Light
  const diningLight = new THREE.PointLight(0xffeedd, 1.4, 260, 1.4);
  diningLight.position.set(61.5, 90.0, 85.0);
  scene.add(diningLight);
  lights.diningLight = diningLight;

  // Bedside Warm Accent Lamp Light
  const bedLamp = new THREE.PointLight(0xff9933, 2.4, 220, 1.5);
  bedLamp.position.set(115, 52, 131);
  scene.add(bedLamp);
  lights.bedLamp = bedLamp;

  // Staircase Vertical Accent Light
  const stairLight = new THREE.PointLight(0xffdfb3, 1.0, 260, 1.4);
  stairLight.position.set(230, 80, -30);
  scene.add(stairLight);
  lights.stairLight = stairLight;

  // Private Mezzanine Lounge Soft Downlight
  const loungeLight = new THREE.PointLight(0xffeedd, 1.8, 380, 1.2);
  loungeLight.position.set(10, 110, -270);
  scene.add(loungeLight);
  lights.loungeLight = loungeLight;

  // Lounge Gallery Wall Accent Spotlight
  const loungeArtSpot = new THREE.SpotLight(0xfff4e0, 1.5, 260, Math.PI / 4, 0.4, 1.2);
  loungeArtSpot.position.set(-20, 100, -280);
  loungeArtSpot.target.position.set(-105, 88, -284);
  scene.add(loungeArtSpot);
  scene.add(loungeArtSpot.target);
  lights.loungeArtSpot = loungeArtSpot;

  // 360° Panoramic Sky & Landscape Dome (Surrounds entire property)
  const skyDomeGeo = new THREE.SphereGeometry(950, 48, 32);
  const skyDomeMat = new THREE.MeshBasicMaterial({
    map: customTextures.skyPanorama ? customTextures.skyPanorama.daylight : null,
    side: THREE.BackSide,
    depthWrite: false
  });
  skyDome = new THREE.Mesh(skyDomeGeo, skyDomeMat);
  skyDome.position.set(65, 40, 60);
  scene.add(skyDome);

  applyAtmosphere('daylight');
}

function applyAtmosphere(mode) {
  activeAtmosphere = mode;
  document.querySelectorAll('.atmos-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-atmos') === mode);
  });

  if (skyDome && customTextures.skyPanorama && customTextures.skyPanorama[mode]) {
    skyDome.material.map = customTextures.skyPanorama[mode];
    skyDome.material.needsUpdate = true;
  }

  if (mode === 'daylight') {
    lights.sunLight.color.setHex(0xfff1de);
    lights.sunLight.intensity = 2.1;
    lights.sunLight.position.set(-220, 170, 130);

    lights.windowFill.color.setHex(0x8cb4e6);
    lights.windowFill.intensity = 0.7;

    lights.floorBounce.color.setHex(0xd4a56a);
    lights.floorBounce.intensity = 0.75;

    lights.hemiLight.color.setHex(0x90a8c8);
    lights.hemiLight.groundColor.setHex(0x2a1c12);
    lights.hemiLight.intensity = 0.55;

    lights.ceilingLight.intensity = 0.75;
    lights.diningLight.intensity = 1.4;
    lights.bedLamp.intensity = 1.5;
    lights.stairLight.intensity = 0.9;
    lights.loungeLight.intensity = 1.6;
    lights.loungeLight.color.setHex(0xffeedd);
    lights.loungeArtSpot.intensity = 1.4;

    scene.fog.color.setHex(0xb0cce8);
    scene.fog.density = 0.00022;
    scene.background = null;
    renderer.toneMappingExposure = 1.05;
    bloomPass.strength = 0.22;
  } else if (mode === 'sunset') {
    // Golden Hour: Rich amber grazing light, long dramatic shadows
    lights.sunLight.color.setHex(0xff7722);
    lights.sunLight.intensity = 2.6;
    lights.sunLight.position.set(-260, 80, 70);

    lights.windowFill.color.setHex(0xcc6622);
    lights.windowFill.intensity = 0.95;

    lights.floorBounce.color.setHex(0xb3551e);
    lights.floorBounce.intensity = 0.95;

    lights.hemiLight.color.setHex(0xb36633);
    lights.hemiLight.groundColor.setHex(0x1a0a03);
    lights.hemiLight.intensity = 0.48;

    lights.ceilingLight.intensity = 0.85;
    lights.diningLight.intensity = 1.8;
    lights.bedLamp.intensity = 2.2;
    lights.stairLight.intensity = 1.2;
    lights.loungeLight.intensity = 2.2;
    lights.loungeLight.color.setHex(0xffdfb8);
    lights.loungeArtSpot.intensity = 1.8;

    scene.fog.color.setHex(0x5a2318);
    scene.fog.density = 0.00028;
    scene.background = null;
    renderer.toneMappingExposure = 1.08;
    bloomPass.strength = 0.32;
  } else if (mode === 'night') {
    // Velvet Night: Moody warm interior lamps, soft blue moonlight
    lights.sunLight.color.setHex(0x223859);
    lights.sunLight.intensity = 0.35;
    lights.sunLight.position.set(-200, 140, 90);

    lights.windowFill.color.setHex(0x111e30);
    lights.windowFill.intensity = 0.25;

    lights.floorBounce.color.setHex(0x332014);
    lights.floorBounce.intensity = 0.2;

    lights.hemiLight.color.setHex(0x131a26);
    lights.hemiLight.groundColor.setHex(0x080605);
    lights.hemiLight.intensity = 0.35;

    lights.ceilingLight.color.setHex(0xffaa44);
    lights.ceilingLight.intensity = 1.9;

    lights.diningLight.color.setHex(0xffb866);
    lights.diningLight.intensity = 2.4;

    lights.bedLamp.color.setHex(0xff8c1a);
    lights.bedLamp.intensity = 3.6;

    lights.stairLight.color.setHex(0xffaa44);
    lights.stairLight.intensity = 2.2;
    lights.loungeLight.intensity = 2.8;
    lights.loungeLight.color.setHex(0xffc88a);
    lights.loungeArtSpot.intensity = 2.2;

    scene.fog.color.setHex(0x0a101d);
    scene.fog.density = 0.00032;
    scene.background = null;
    renderer.toneMappingExposure = 0.95;
    bloomPass.strength = 0.28;
  }
}

// ============================================================================
// Procedural Textures
// ============================================================================
function generateProceduralTextures() {
  const marbleCanvas = document.createElement('canvas');
  marbleCanvas.width = 1024;
  marbleCanvas.height = 1024;
  const mCtx = marbleCanvas.getContext('2d');
  mCtx.fillStyle = '#d0d4dc';
  mCtx.fillRect(0, 0, 1024, 1024);

  mCtx.strokeStyle = 'rgba(70, 75, 88, 0.4)';
  mCtx.lineWidth = 3.5;
  mCtx.beginPath();
  mCtx.moveTo(0, 200);
  mCtx.bezierCurveTo(300, 150, 600, 450, 1024, 380);
  mCtx.stroke();

  const marbleTex = new THREE.CanvasTexture(marbleCanvas);
  marbleTex.wrapS = THREE.RepeatWrapping;
  marbleTex.wrapT = THREE.RepeatWrapping;
  marbleTex.repeat.set(4, 4);
  customTextures.marble = marbleTex;

  const walnutCanvas = document.createElement('canvas');
  walnutCanvas.width = 1024;
  walnutCanvas.height = 1024;
  const wCtx = walnutCanvas.getContext('2d');
  wCtx.fillStyle = '#1c120c';
  wCtx.fillRect(0, 0, 1024, 1024);

  for (let i = 0; i < 1024; i += 12) {
    wCtx.fillStyle = i % 24 === 0 ? 'rgba(10, 5, 2, 0.6)' : 'rgba(35, 20, 12, 0.4)';
    wCtx.fillRect(0, i, 1024, 6);
  }
  const walnutTex = new THREE.CanvasTexture(walnutCanvas);
  walnutTex.wrapS = THREE.RepeatWrapping;
  walnutTex.wrapT = THREE.RepeatWrapping;
  walnutTex.repeat.set(3, 3);
  customTextures.walnut = walnutTex;

  // 360° Photorealistic Exterior Panoramic Sky & Landscape Textures
  const skyTextures = {};
  ['daylight', 'sunset', 'night'].forEach(mode => {
    const w = 2048;
    const h = 1024;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    const horizonY = h * 0.52;

    // 1. Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY + 60);
    if (mode === 'daylight') {
      skyGrad.addColorStop(0.0, '#155bb5');
      skyGrad.addColorStop(0.35, '#3e8fe0');
      skyGrad.addColorStop(0.70, '#86c2f5');
      skyGrad.addColorStop(0.92, '#cce6fa');
      skyGrad.addColorStop(1.0, '#fff4de');
    } else if (mode === 'sunset') {
      skyGrad.addColorStop(0.0, '#1b092b');
      skyGrad.addColorStop(0.28, '#46144e');
      skyGrad.addColorStop(0.55, '#8c2445');
      skyGrad.addColorStop(0.78, '#d4491d');
      skyGrad.addColorStop(0.94, '#f59331');
      skyGrad.addColorStop(1.0, '#ffcf6b');
    } else {
      skyGrad.addColorStop(0.0, '#040711');
      skyGrad.addColorStop(0.35, '#081122');
      skyGrad.addColorStop(0.70, '#0f1f3d');
      skyGrad.addColorStop(0.92, '#182b4f');
      skyGrad.addColorStop(1.0, '#263b61');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, horizonY + 80);

    // 2. Stars & Moon (Night only)
    if (mode === 'night') {
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 700; i++) {
        const sx = (Math.sin(i * 997) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 613) * 0.5 + 0.5) * (horizonY * 0.85);
        const sRad = (i % 7 === 0) ? 1.6 : (i % 3 === 0 ? 1.0 : 0.6);
        ctx.globalAlpha = 0.35 + (Math.sin(i * 43) * 0.5 + 0.5) * 0.65;
        ctx.beginPath();
        ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      const mx = w * 0.28;
      const my = h * 0.22;
      const moonGlow = ctx.createRadialGradient(mx, my, 8, mx, my, 90);
      moonGlow.addColorStop(0, 'rgba(235, 245, 255, 0.9)');
      moonGlow.addColorStop(0.2, 'rgba(180, 210, 255, 0.4)');
      moonGlow.addColorStop(1, 'rgba(100, 160, 255, 0)');
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(mx, my, 90, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(mx, my, 14, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Sun & Atmospheric Glow (Daylight & Sunset)
    if (mode === 'daylight') {
      const sx = w * 0.26;
      const sy = horizonY * 0.45;
      const sunGlow = ctx.createRadialGradient(sx, sy, 12, sx, sy, 320);
      sunGlow.addColorStop(0, 'rgba(255, 255, 245, 1.0)');
      sunGlow.addColorStop(0.12, 'rgba(255, 248, 210, 0.85)');
      sunGlow.addColorStop(0.40, 'rgba(255, 235, 170, 0.35)');
      sunGlow.addColorStop(1.0, 'rgba(255, 220, 140, 0.0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sx, sy, 320, 0, Math.PI * 2);
      ctx.fill();
    } else if (mode === 'sunset') {
      const sx = w * 0.26;
      const sy = horizonY * 0.82;
      const sunGlow = ctx.createRadialGradient(sx, sy, 16, sx, sy, 420);
      sunGlow.addColorStop(0, 'rgba(255, 250, 220, 1.0)');
      sunGlow.addColorStop(0.15, 'rgba(255, 180, 70, 0.9)');
      sunGlow.addColorStop(0.45, 'rgba(235, 80, 20, 0.45)');
      sunGlow.addColorStop(1.0, 'rgba(160, 30, 20, 0.0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sx, sy, 420, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Soft Panoramic Cumulus Clouds
    if (mode !== 'night') {
      ctx.fillStyle = mode === 'daylight' ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 190, 140, 0.32)';
      for (let c = 0; c < 16; c++) {
        const cx = (c / 16) * w + (Math.sin(c * 19) * 80);
        const cy = horizonY * 0.35 + (Math.cos(c * 31) * 70);
        const cw = 160 + (Math.sin(c * 7) * 70);
        const ch = 38 + (Math.cos(c * 11) * 16);
        ctx.beginPath();
        ctx.ellipse(cx, cy, cw, ch, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 5. Layer 1: Distant Mountain Ranges
    ctx.fillStyle = mode === 'daylight' ? '#688ca8' : (mode === 'sunset' ? '#5a223c' : '#0c1626');
    ctx.beginPath();
    ctx.moveTo(0, horizonY + 20);
    for (let x = 0; x <= w; x += 40) {
      const my = horizonY - 45 + Math.sin(x * 0.006) * 35 + Math.sin(x * 0.015) * 18;
      ctx.lineTo(x, my);
    }
    ctx.lineTo(w, horizonY + 50);
    ctx.lineTo(0, horizonY + 50);
    ctx.closePath();
    ctx.fill();

    // 6. Layer 2: Middle Foothills & Alpine Ridges
    ctx.fillStyle = mode === 'daylight' ? '#446e58' : (mode === 'sunset' ? '#3d1627' : '#070f1a');
    ctx.beginPath();
    ctx.moveTo(0, horizonY + 30);
    for (let x = 0; x <= w; x += 30) {
      const fy = horizonY - 20 + Math.sin(x * 0.011 + 2) * 22 + Math.cos(x * 0.024) * 12;
      ctx.lineTo(x, fy);
    }
    ctx.lineTo(w, horizonY + 50);
    ctx.lineTo(0, horizonY + 50);
    ctx.closePath();
    ctx.fill();

    // 7. Layer 3: Lush Green Treetops along horizon
    ctx.fillStyle = mode === 'daylight' ? '#254a2a' : (mode === 'sunset' ? '#230e16' : '#040810');
    ctx.beginPath();
    ctx.moveTo(0, horizonY + 40);
    for (let x = 0; x <= w; x += 12) {
      const ty = horizonY - 5 + Math.sin(x * 0.05) * 7 + Math.sin(x * 0.02) * 9;
      ctx.lineTo(x, ty);
    }
    ctx.lineTo(w, horizonY + 50);
    ctx.lineTo(0, horizonY + 50);
    ctx.closePath();
    ctx.fill();

    // 8. Distant City / Villa Night Lights (Night only)
    if (mode === 'night') {
      ctx.fillStyle = '#ffdf88';
      for (let i = 0; i < 180; i++) {
        const lx = (i / 180) * w + (Math.sin(i * 37) * 15);
        const ly = horizonY - 4 + (Math.cos(i * 53) * 6);
        ctx.globalAlpha = 0.4 + (Math.sin(i * 71) * 0.5 + 0.5) * 0.6;
        ctx.fillRect(lx, ly, 2.2, 2.2);
      }
      ctx.globalAlpha = 1.0;
    }

    // 9. Ground below horizon
    const groundGrad = ctx.createLinearGradient(0, horizonY, 0, h);
    if (mode === 'daylight') {
      groundGrad.addColorStop(0, '#2e3a2b');
      groundGrad.addColorStop(0.3, '#1d261b');
      groundGrad.addColorStop(1, '#0e140d');
    } else if (mode === 'sunset') {
      groundGrad.addColorStop(0, '#2a1210');
      groundGrad.addColorStop(0.4, '#190a09');
      groundGrad.addColorStop(1, '#0d0505');
    } else {
      groundGrad.addColorStop(0, '#0a0f16');
      groundGrad.addColorStop(1, '#040609');
    }
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, horizonY + 30, w, h - horizonY);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    skyTextures[mode] = tex;
  });
  customTextures.skyPanorama = skyTextures;
}

// ============================================================================
// Load Textures & High-Contrast Physical Materials
// ============================================================================
function loadAllAssets() {
  const manager = new THREE.LoadingManager();
  const texLoader = new THREE.TextureLoader(manager);

  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const pct = Math.round((itemsLoaded / itemsTotal) * 100);
    loaderBar.style.width = `${pct}%`;
    loaderStatus.textContent = `Loading architectural suites: ${pct}%`;
  };

  manager.onLoad = () => {
    loaderStatus.textContent = 'Calibrating high-contrast architectural lighting...';
    setTimeout(() => {
      loaderOverlay.classList.add('hidden');
      updateScroll();
    }, 400);
  };

  function loadTex(path, repeatX = 1, repeatY = 1) {
    const t = texLoader.load(path);
    t.colorSpace = THREE.SRGBColorSpace;
    if (repeatX !== 1 || repeatY !== 1) {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeatX, repeatY);
    }
    return t;
  }

  // Textures
  const floorOakTex = loadTex('./textures/floor_wood.jpg');
  customTextures.floorOak = floorOakTex;

  const tableWoodTex = loadTex('./textures/table_wood.jpg');
  const sofaWoodTex = loadTex('./textures/sofa_wood.jpg');
  const sofaWoodRightTex = loadTex('./textures/sofa_wood_right.jpg');
  const sofaWoodBaseTex = loadTex('./textures/sofa_wood_base.jpg');
  const wallTex = loadTex('./textures/wall.jpg');

  const painting1Tex = loadTex('./textures/painting_1.jpg');
  const painting2Tex = loadTex('./textures/painting_2.jpg');
  const painting3Tex = loadTex('./textures/painting_3.jpg');

  // Living Room Materials (Photorealistic PBR Properties)
  const livingMats = {
    floor: new THREE.MeshPhysicalMaterial({
      map: floorOakTex,
      roughness: 0.26,
      metalness: 0.02,
      clearcoat: 0.38,
      clearcoatRoughness: 0.22,
      envMapIntensity: 0.85
    }),
    tableWood: new THREE.MeshStandardMaterial({
      map: tableWoodTex,
      roughness: 0.32,
      metalness: 0.03,
      envMapIntensity: 0.65
    }),
    tableFrame: new THREE.MeshStandardMaterial({
      color: 0x121417,
      roughness: 0.18,
      metalness: 0.92,
      envMapIntensity: 0.9
    }),
    vase: new THREE.MeshPhysicalMaterial({
      color: 0x141518,
      roughness: 0.06,
      metalness: 0.04,
      clearcoat: 0.95,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.0
    }),
    painting1: new THREE.MeshStandardMaterial({ map: painting1Tex, roughness: 0.42 }),
    painting2: new THREE.MeshStandardMaterial({ map: painting2Tex, roughness: 0.42 }),
    painting3: new THREE.MeshStandardMaterial({ map: painting3Tex, roughness: 0.42 }),
    cushion: new THREE.MeshStandardMaterial({
      color: 0x363432,
      roughness: 0.86,
      metalness: 0.01,
      envMapIntensity: 0.2
    }),
    sofaWoodBase: new THREE.MeshStandardMaterial({ map: sofaWoodBaseTex, roughness: 0.36 }),
    sofaWoodRight: new THREE.MeshStandardMaterial({ map: sofaWoodRightTex, roughness: 0.36 }),
    sofaWoodPuff: new THREE.MeshStandardMaterial({ map: sofaWoodTex, roughness: 0.36 }),
    chromeLegs: new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      roughness: 0.06,
      metalness: 0.96,
      envMapIntensity: 1.1
    }),
    backWall: new THREE.MeshStandardMaterial({
      map: wallTex,
      color: 0x6e6b66,
      roughness: 0.82,
      metalness: 0.02,
      envMapIntensity: 0.25
    }),
    ceiling: new THREE.MeshStandardMaterial({
      color: 0x222429,
      roughness: 0.92,
      metalness: 0.0
    }),
    stairs: new THREE.MeshStandardMaterial({
      color: 0x3e4248,
      roughness: 0.4,
      metalness: 0.3
    }),
    stairCables: new THREE.MeshStandardMaterial({
      color: 0x828892,
      roughness: 0.2,
      metalness: 0.92,
      envMapIntensity: 0.9
    }),
    windowFrame: new THREE.MeshStandardMaterial({
      color: 0x0c0e10,
      roughness: 0.3,
      metalness: 0.88
    }),
    windowGlass: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.16,
      roughness: 0.03,
      transmission: 0.92,
      ior: 1.52,
      reflectivity: 0.6
    })
  };
  activeMaterials.living = livingMats;

  // Bedroom Textures
  const bedTex = loadTex('./textures/bedroom/bed_texture.jpg');
  const bedBoxTex = loadTex('./textures/bedroom/beds_box_texture.jpg');
  const woodWallTex = loadTex('./textures/bedroom/wood_wall.jpg');
  const scenreTex = loadTex('./textures/bedroom/scenre.jpg');
  const alhmariTex = loadTex('./textures/bedroom/alhmari.jpg');
  const studyTableTex = loadTex('./textures/bedroom/study_table_wood.jpg');
  const doorTex = loadTex('./textures/bedroom/door.jpg');
  const toiletTileTex = loadTex('./textures/bedroom/toilet_tile.jpg');
  const toiletBumpTex = loadTex('./textures/bedroom/toilet_tile_bump.jpg');
  const toiletWood1Tex = loadTex('./textures/bedroom/toilet_wood_stor_1.jpg');
  const toiletWood2Tex = loadTex('./textures/bedroom/toilet_wood_stor_2.jpg');
  const tvDesktopTex = loadTex('./textures/bedroom/tv_desktop.jpg');
  const tvBackWallTex = loadTex('./textures/bedroom/tvs_back_wall.jpg');
  const sophaWoodBedTex = loadTex('./textures/bedroom/sopha_wood_uv_texture.jpg');
  const doubleSophaRightTex = loadTex('./textures/bedroom/double_sopha_wood_right_uv_texture_.jpg');
  const doubleSophaBaseTex = loadTex('./textures/bedroom/double_sopha_wood_base_bace_uv_.jpg');

  // Bedroom Materials (Photorealistic PBR Properties)
  const bedroomMats = {
    floor: new THREE.MeshPhysicalMaterial({
      map: floorOakTex,
      roughness: 0.26,
      metalness: 0.02,
      clearcoat: 0.38,
      clearcoatRoughness: 0.22,
      envMapIntensity: 0.85
    }),
    bedFrame: new THREE.MeshStandardMaterial({
      map: bedTex,
      roughness: 0.42,
      metalness: 0.02
    }),
    bedDuvet: new THREE.MeshStandardMaterial({
      color: 0x2e3138,
      roughness: 0.84,
      metalness: 0.02
    }),
    pillow: new THREE.MeshStandardMaterial({
      color: 0x4e525c,
      roughness: 0.78,
      metalness: 0.02
    }),
    bedBox: new THREE.MeshStandardMaterial({
      map: bedBoxTex,
      roughness: 0.42,
      metalness: 0.04
    }),
    woodWall: new THREE.MeshStandardMaterial({
      map: woodWallTex,
      roughness: 0.38,
      metalness: 0.03,
      envMapIntensity: 0.5
    }),
    scenre: new THREE.MeshStandardMaterial({
      map: scenreTex,
      roughness: 0.45
    }),
    alhmari: new THREE.MeshStandardMaterial({
      map: alhmariTex,
      roughness: 0.3,
      metalness: 0.12,
      envMapIntensity: 0.6
    }),
    studyTable: new THREE.MeshStandardMaterial({
      map: studyTableTex,
      roughness: 0.34,
      metalness: 0.04,
      envMapIntensity: 0.55
    }),
    door: new THREE.MeshStandardMaterial({
      map: doorTex,
      roughness: 0.42
    }),
    toiletTile: new THREE.MeshPhysicalMaterial({
      map: toiletTileTex,
      bumpMap: toiletBumpTex,
      bumpScale: 0.04,
      roughness: 0.18,
      clearcoat: 0.65,
      clearcoatRoughness: 0.12,
      envMapIntensity: 0.8
    }),
    toiletWood1: new THREE.MeshStandardMaterial({ map: toiletWood1Tex, roughness: 0.42 }),
    toiletWood2: new THREE.MeshStandardMaterial({ map: toiletWood2Tex, roughness: 0.42 }),
    tvDesktop: new THREE.MeshStandardMaterial({
      map: tvDesktopTex,
      roughness: 0.22,
      emissive: new THREE.Color(0x0e1e33),
      emissiveIntensity: 0.9
    }),
    tvBackWall: new THREE.MeshStandardMaterial({ map: tvBackWallTex, roughness: 0.6 }),
    tvPlastic: new THREE.MeshStandardMaterial({ color: 0x0c0e11, roughness: 0.25, metalness: 0.75 }),
    lamp: new THREE.MeshPhysicalMaterial({
      color: 0xffe2bd,
      emissive: new THREE.Color(0xff8c1a),
      emissiveIntensity: 2.2,
      roughness: 0.18,
      transmission: 0.5,
      ior: 1.45
    }),
    ceramicBowl: new THREE.MeshPhysicalMaterial({
      color: 0x141518,
      roughness: 0.08,
      clearcoat: 0.95,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.0
    }),
    chrome: new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      roughness: 0.06,
      metalness: 0.96,
      envMapIntensity: 1.1
    }),
    sophaWood: new THREE.MeshStandardMaterial({ map: sophaWoodBedTex, roughness: 0.38 }),
    doubleSophaRight: new THREE.MeshStandardMaterial({ map: doubleSophaRightTex, roughness: 0.38 }),
    doubleSophaBase: new THREE.MeshStandardMaterial({ map: doubleSophaBaseTex, roughness: 0.38 }),
    cushion: new THREE.MeshStandardMaterial({ color: 0x363432, roughness: 0.85, metalness: 0.02 }),
    wallMat: new THREE.MeshStandardMaterial({
      color: 0x34312f,
      roughness: 0.85,
      metalness: 0.0,
      envMapIntensity: 0.25
    }),
    painting1: new THREE.MeshStandardMaterial({ map: painting1Tex, roughness: 0.42 }),
    painting2: new THREE.MeshStandardMaterial({ map: painting2Tex, roughness: 0.42 }),
    painting3: new THREE.MeshStandardMaterial({ map: painting3Tex, roughness: 0.42 })
  };
  activeMaterials.bedroom = bedroomMats;

  // Function to build full architectural enclosure & exterior garden terrace
  function buildLivingRoomEnclosure(mats) {
    const enclosure = new THREE.Group();
    enclosure.name = 'architectural_enclosure';

    // 1. Under-Stairs Floor Extension (fills the void where the floor dropped off at X=289)
    const floorExtGeo = new THREE.PlaneGeometry(140, 440);
    const floorExtMesh = new THREE.Mesh(floorExtGeo, mats.floor);
    floorExtMesh.rotation.x = -Math.PI / 2;
    floorExtMesh.position.set(350, 0.4, 135);
    floorExtMesh.receiveShadow = true;
    enclosure.add(floorExtMesh);

    // 2. Right Enclosing Wall (enclosing the staircase area)
    const rightWallGeo = new THREE.PlaneGeometry(440, 245);
    const rightWallMesh = new THREE.Mesh(rightWallGeo, mats.backWall);
    rightWallMesh.rotation.y = -Math.PI / 2;
    rightWallMesh.position.set(408, 122, 135);
    rightWallMesh.receiveShadow = true;
    enclosure.add(rightWallMesh);

    // 3. Front Enclosing Wall (closes the front 4th side of the ground floor)
    const frontWallGeo = new THREE.PlaneGeometry(485, 245);
    const frontWallMesh = new THREE.Mesh(frontWallGeo, mats.backWall);
    frontWallMesh.rotation.y = Math.PI;
    frontWallMesh.position.set(168, 122, 355);
    frontWallMesh.receiveShadow = true;
    enclosure.add(frontWallMesh);

    // 4. Upper Ceiling Enclosure Slab
    const ceilingGeo = new THREE.PlaneGeometry(485, 440);
    const ceilingMesh = new THREE.Mesh(ceilingGeo, mats.ceiling);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.set(168, 244, 135);
    ceilingMesh.receiveShadow = true;
    enclosure.add(ceilingMesh);

    // 5. Exterior Garden Terrace Deck (outside the double-height glass window at X = -70)
    const terraceDeckGeo = new THREE.PlaneGeometry(320, 440);
    const terraceDeckMat = new THREE.MeshStandardMaterial({
      color: 0x3d3832,
      roughness: 0.65,
      metalness: 0.05
    });
    const terraceDeckMesh = new THREE.Mesh(terraceDeckGeo, terraceDeckMat);
    terraceDeckMesh.rotation.x = -Math.PI / 2;
    terraceDeckMesh.position.set(-225, 0.2, 135);
    terraceDeckMesh.receiveShadow = true;
    enclosure.add(terraceDeckMesh);

    // 6. Terrace Outer Glass Balustrade & Graphite Railing
    const glassRailGeo = new THREE.PlaneGeometry(440, 24);
    const glassRailMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      transmission: 0.9,
      ior: 1.5
    });
    const glassRailMesh = new THREE.Mesh(glassRailGeo, glassRailMat);
    glassRailMesh.rotation.y = Math.PI / 2;
    glassRailMesh.position.set(-382, 12, 135);
    enclosure.add(glassRailMesh);

    const topRailGeo = new THREE.BoxGeometry(4, 2, 440);
    const topRailMat = new THREE.MeshStandardMaterial({
      color: 0x1c1f24,
      roughness: 0.25,
      metalness: 0.92
    });
    const topRailMesh = new THREE.Mesh(topRailGeo, topRailMat);
    topRailMesh.position.set(-382, 24, 135);
    enclosure.add(topRailMesh);

    // 7. Architectural Stone Planters & Lush Green Foliage outside the window
    const planterMat = new THREE.MeshStandardMaterial({
      color: 0x22252a,
      roughness: 0.85
    });
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x3d743a,
      roughness: 0.45,
      envMapIntensity: 0.6
    });

    const planterPositions = [35, 135, 235];
    planterPositions.forEach(pz => {
      const troughGeo = new THREE.BoxGeometry(22, 16, 80);
      const troughMesh = new THREE.Mesh(troughGeo, planterMat);
      troughMesh.position.set(-92, 8, pz);
      troughMesh.castShadow = true;
      troughMesh.receiveShadow = true;
      enclosure.add(troughMesh);

      for (let p = -28; p <= 28; p += 14) {
        const plantH = 34 + (Math.sin(p * 3) * 10);
        const plantGeo = new THREE.CylinderGeometry(1.2, 2.0, plantH, 6);
        const plantMesh = new THREE.Mesh(plantGeo, foliageMat);
        plantMesh.position.set(-92 + (Math.sin(p) * 2), 16 + plantH / 2, pz + p);
        plantMesh.rotation.z = (Math.sin(p * 5) * 0.08);
        plantMesh.castShadow = true;
        enclosure.add(plantMesh);
      }
    });

    // Warm Terrace Uplight
    const terraceLight = new THREE.PointLight(0xffeedd, 1.2, 320, 1.4);
    terraceLight.position.set(-110, 30, 135);
    enclosure.add(terraceLight);

    return enclosure;
  }

  // Load Living Room OBJ
  const objLoader = new OBJLoader(manager);
  objLoader.load('./models/house_interior.obj', (obj) => {
    models.living = obj;
    obj.add(buildLivingRoomEnclosure(livingMats));
    obj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const name = child.name;

        if (name === 'Plane001') child.material = livingMats.floor;
        else if (name === 'Plane003') child.material = livingMats.backWall;
        else if (name === 'Plane002' || name === 'Plane004' || name === 'Box001' || name === 'Box002') child.material = livingMats.ceiling;
        else if (name === 'Box038') child.material = livingMats.painting1;
        else if (name === 'Box043') child.material = livingMats.painting2;
        else if (name === 'Box044') child.material = livingMats.painting3;
        else if (name === 'Box032') child.material = livingMats.tableWood;
        else if (name === 'Box033') child.material = livingMats.tableFrame;
        else if (name === 'Teapot001') child.material = livingMats.vase;
        else if (name === 'Box028' || name === 'Box045') child.material = livingMats.sofaWoodPuff;
        else if (name === 'Box027' || name === 'Box029') child.material = livingMats.cushion;
        else if (name === 'Box017') child.material = livingMats.sofaWoodBase;
        else if (name === 'Box020' || name === 'Box022' || name === 'Box046') child.material = livingMats.sofaWoodRight;
        else if (name === 'Box019' || name === 'Box021' || name === 'Box023' || name === 'Box024' || name === 'Box025' || name === 'Box026') child.material = livingMats.cushion;
        else if (name.startsWith('Cylinder05') || name.startsWith('Cylinder06')) child.material = livingMats.chromeLegs;
        else if (name.startsWith('Box00') || name.startsWith('Box01') || name.startsWith('Cylinder00') || name.startsWith('Cylinder010') || name.startsWith('Cylinder011')) child.material = livingMats.stairs;
        else if (name.startsWith('Cylinder01') || name.startsWith('Cylinder02') || name.startsWith('Cylinder03')) child.material = livingMats.stairCables;
        else if (name === 'Box037') child.material = livingMats.windowFrame;
        else if (name === 'Plane005') child.material = livingMats.windowGlass;
        else child.material = livingMats.stairs;
      }
    });

    if (activeRoom === 'living') {
      scene.add(obj);
    }
  });

  // Load Bedroom OBJ
  objLoader.load('./models/bedroom_interior.obj', (obj) => {
    models.bedroom = obj;

    // Architectural back wall enclosure for the private lounge
    const backWallGeo = new THREE.PlaneGeometry(240, 160);
    const backWallMesh = new THREE.Mesh(backWallGeo, bedroomMats.wallMat);
    backWallMesh.position.set(5.0, 75.0, -386.0);
    backWallMesh.receiveShadow = true;
    obj.add(backWallMesh);

    // Upper suite right enclosing wall
    const upperRightGeo = new THREE.PlaneGeometry(350, 170);
    const upperRightMesh = new THREE.Mesh(upperRightGeo, bedroomMats.wallMat);
    upperRightMesh.rotation.y = -Math.PI / 2;
    upperRightMesh.position.set(125.0, 80.0, -250.0);
    upperRightMesh.receiveShadow = true;
    obj.add(upperRightMesh);

    // Upper suite ceiling
    const upperCeilGeo = new THREE.PlaneGeometry(260, 350);
    const upperCeilMesh = new THREE.Mesh(upperCeilGeo, bedroomMats.wallMat);
    upperCeilMesh.rotation.x = Math.PI / 2;
    upperCeilMesh.position.set(5.0, 160.0, -250.0);
    upperCeilMesh.receiveShadow = true;
    obj.add(upperCeilMesh);

    obj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const name = child.name;

        if (name === 'Box002') child.material = bedroomMats.bedFrame;
        else if (name === 'Box038') child.material = bedroomMats.bedDuvet; // Bed duvet/mattress: textured dark charcoal
        else if (name === 'Box039' || name === 'Box040') child.material = bedroomMats.pillow; // Pillows: slate accent
        else if (name === 'Line001') child.material = bedroomMats.ceramicBowl; // Nightstand bowl
        else if (name === 'Object004') child.material = bedroomMats.bedBox;
        else if (name === 'Object005') child.material = bedroomMats.woodWall;
        else if (name === 'Box035') child.material = bedroomMats.scenre;
        else if (name === 'Box018' || name === 'Box061') child.material = bedroomMats.alhmari;
        else if (name === 'Box003') child.material = bedroomMats.studyTable;
        else if (name === 'Object006') child.material = bedroomMats.door;
        else if (name === 'Object007') child.material = bedroomMats.floor;
        else if (name === 'Object002') child.material = bedroomMats.toiletTile;
        else if (name === 'Object003') child.material = bedroomMats.toiletWood1;
        else if (name === 'Box026') child.material = bedroomMats.toiletWood2;
        else if (name === 'Box034') child.material = bedroomMats.tvDesktop;
        else if (name === 'Box029') child.material = bedroomMats.tvBackWall;
        else if (name === 'Box032') child.material = bedroomMats.tvPlastic;
        // Lounge Art Gallery Triptych
        else if (name === 'Box063') child.material = bedroomMats.painting1;
        else if (name === 'Box064') child.material = bedroomMats.painting2;
        else if (name === 'Box065') child.material = bedroomMats.painting3;
        // Lounge Artisan Coffee Table
        else if (name === 'Box044' || name === 'Cylinder060') child.material = bedroomMats.studyTable;
        else if (name === 'Cylinder059' || name === 'Cylinder061' || name === 'Cylinder062') child.material = bedroomMats.chrome;
        // Lounge Sculptural Wire Chair
        else if (name === 'Cylinder090' || name === 'Cylinder097') child.material = bedroomMats.cushion;
        else if (name === 'Cylinder085' || name === 'Cylinder089' || name === 'Cylinder091' || name === 'Cylinder092' || name === 'Cylinder093' || name === 'Cylinder094' || name === 'Cylinder095' || name === 'Cylinder096' || name === 'Cylinder098' || name === 'Box068' || name === 'Box069') child.material = bedroomMats.chrome;
        // Lamps & Chrome Fittings
        else if (name.startsWith('Cylinder001') || name.startsWith('Cylinder002') || name.startsWith('Cylinder003') || name === 'Sphere001') child.material = bedroomMats.lamp;
        else if (name.startsWith('Cylinder05') || name.startsWith('Cylinder06') || name.startsWith('Cylinder07') || name.startsWith('Cylinder004') || name.startsWith('Cylinder018') || name.startsWith('Cylinder019') || name === 'Sphere002') child.material = bedroomMats.chrome;
        // Modular Sofas
        else if (name === 'Box045' || name === 'Box048') child.material = bedroomMats.sophaWood;
        else if (name === 'Box020' || name === 'Box022' || name === 'Box046' || name === 'Box054' || name === 'Box056' || name === 'Box058') child.material = bedroomMats.doubleSophaRight;
        else if (name === 'Box017' || name === 'Box057') child.material = bedroomMats.doubleSophaBase;
        else if (name.startsWith('Box043') || name.startsWith('Box062') || name.startsWith('Box066') || name.startsWith('Box067') || name.startsWith('Cylinder08') || name.startsWith('Cylinder09')) child.material = bedroomMats.cushion;
        else child.material = bedroomMats.wallMat;
      }
    });

    if (activeRoom === 'bedroom') {
      scene.add(obj);
    }
  });
}

// ============================================================================
// Multi-Stage Spline Interpolation across All 7 Walkthrough Screens
// ============================================================================
function interpolateView(progress) {
  // 7 stages = 6 intervals of width (1 / 6)
  const totalIntervals = WALKTHROUGH_STAGES.length - 1; // 6
  const scaledProgress = progress * totalIntervals;
  const idx = Math.min(Math.floor(scaledProgress), totalIntervals - 1);
  const localT = scaledProgress - idx;

  // Smooth cosine easing
  const easeT = 0.5 - 0.5 * Math.cos(localT * Math.PI);

  const stageA = WALKTHROUGH_STAGES[idx];
  const stageB = WALKTHROUGH_STAGES[idx + 1];

  const pos = new THREE.Vector3().lerpVectors(stageA.pos, stageB.pos, easeT);
  const target = new THREE.Vector3().lerpVectors(stageA.target, stageB.target, easeT);
  const fov = THREE.MathUtils.lerp(stageA.fov, stageB.fov, easeT);

  return { pos, target, fov, currentStage: stageA, nextStage: stageB };
}

// ============================================================================
// Scroll Calculation & Seamless Room Switching
// ============================================================================
function updateScroll() {
  if (isOrbitMode || isAutoTour) return;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const currentScroll = window.scrollY;
  scrollProgress = maxScroll > 0 ? Math.min(Math.max(currentScroll / maxScroll, 0), 1) : 0;

  const interpolated = interpolateView(scrollProgress);
  desiredPos.copy(interpolated.pos);
  desiredTarget.copy(interpolated.target);
  desiredFov = interpolated.fov;

  // Update Nav indicator fill line
  if (navIndicatorFill) {
    navIndicatorFill.style.height = `${scrollProgress * 100}%`;
  }

  // Active Stage Index (1 to 6)
  const activeStageIndex = Math.min(Math.floor(scrollProgress * 6) + 1, 6);

  // Determine Active Room (Stages 1-3: Living & Dining; Stages 4-6: Upper Master Suite)
  const neededRoom = scrollProgress < 0.50 ? 'living' : 'bedroom';
  if (neededRoom !== activeRoom) {
    activeRoom = neededRoom;
    if (models.living && models.bedroom) {
      if (activeRoom === 'living') {
        scene.remove(models.bedroom);
        scene.add(models.living);
        lights.sunLight.target.position.set(65, 20, 30);
      } else {
        scene.remove(models.living);
        scene.add(models.bedroom);
        lights.sunLight.target.position.set(40, 20, 100);
      }
    }
  }

  // Smooth cinematic cross-fade overlay between Ground Floor and Upper Suite
  if (roomTransitionOverlay) {
    if (scrollProgress >= 0.43 && scrollProgress <= 0.57) {
      const distToMid = Math.abs(scrollProgress - 0.50) / 0.07;
      const opacity = Math.sin((1 - distToMid) * (Math.PI / 2));
      roomTransitionOverlay.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(3);
    } else {
      roomTransitionOverlay.style.opacity = '0';
    }
  }

  // Update Floor Badge & Journey Pills
  const currentFloor = scrollProgress < 0.50 ? 'LEVEL 01 // GROUND' : 'LEVEL 02 // UPPER SUITE';
  hudFloorBadge.textContent = currentFloor;

  // Update Journey Pills active state (1: Living & Dining, 4: Master Suite, 6: Private Salon)
  journeyPills.forEach(pill => {
    const target = parseInt(pill.getAttribute('data-target-screen'));
    const isPillActive = (target === 1 && activeStageIndex <= 3) ||
                         (target === 4 && (activeStageIndex === 4 || activeStageIndex === 5)) ||
                         (target === 6 && activeStageIndex === 6);
    pill.classList.toggle('active', isPillActive);
  });

  // Update Screen Nav items active state
  navItems.forEach((btn, idx) => {
    btn.classList.toggle('active', (idx + 1) === activeStageIndex);
  });

  // Render Hotspots for the active stage
  renderHotspotsForStage(activeStageIndex);
}

function jumpToScreen(screenNumber) {
  if (isOrbitMode) toggleOrbitMode(false);
  if (isAutoTour) toggleAutoTour(false);

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const targetScroll = ((screenNumber - 1) / (WALKTHROUGH_STAGES.length - 1)) * maxScroll;

  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
}

// ============================================================================
// 3D Hotspots Rendering & Interaction
// ============================================================================
let currentHotspots = [];

function renderHotspotsForStage(stageIdx) {
  const stage = WALKTHROUGH_STAGES[stageIdx - 1];
  if (!stage) return;

  currentHotspots = stage.hotspots || [];
  hotspotsLayer.innerHTML = '';

  currentHotspots.forEach(spot => {
    const el = document.createElement('div');
    el.className = 'hotspot-marker';
    el.id = `hotspot-${spot.id}`;
    el.innerHTML = `
      <div class="hotspot-pin">
        <div class="hotspot-core"></div>
      </div>
      <div class="hotspot-label">${spot.name}</div>
    `;

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      openHotspotModal(spot);
    });

    hotspotsLayer.appendChild(el);
  });
}

function updateHotspotsPositions() {
  if (isOrbitMode || isAutoTour) {
    hotspotsLayer.style.display = 'none';
    return;
  }
  hotspotsLayer.style.display = 'block';

  const tempVec = new THREE.Vector3();

  currentHotspots.forEach(spot => {
    const el = document.getElementById(`hotspot-${spot.id}`);
    if (!el) return;

    tempVec.copy(spot.pos);
    tempVec.project(camera);

    if (tempVec.z > 1.0 || tempVec.x < -1.1 || tempVec.x > 1.1 || tempVec.y < -1.1 || tempVec.y > 1.1) {
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
      return;
    }

    const x = (tempVec.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-tempVec.y * 0.5 + 0.5) * window.innerHeight;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.opacity = '1';
    el.style.pointerEvents = 'auto';
  });
}

function openHotspotModal(spot) {
  modalCategory.textContent = spot.category;
  modalTitle.textContent = spot.name;
  modalDesc.textContent = spot.desc;
  modalMat.textContent = spot.mat;
  modalDim.textContent = spot.dim;
  modalOrigin.textContent = spot.origin;
  hotspotModal.classList.remove('hidden');

  targetUserYaw = 0;
  targetUserPitch = 0;
  desiredTarget.copy(spot.pos);
  const offset = new THREE.Vector3().subVectors(camera.position, spot.pos).normalize().multiplyScalar(65);
  offset.y = Math.max(offset.y, 16);
  desiredPos.copy(spot.pos).add(offset);
  desiredFov = 42.0;
}

function closeHotspotModal() {
  hotspotModal.classList.add('hidden');
  updateScroll();
}

// ============================================================================
// Material Customizer Logic
// ============================================================================
function applyFloorFinish(finishKey) {
  document.querySelectorAll('.swatch-btn[data-type="floor"]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-val') === finishKey);
  });

  ['living', 'bedroom'].forEach(room => {
    const activeMat = activeMaterials[room].floor;
    if (!activeMat) return;

    if (finishKey === 'oak') {
      activeMat.map = customTextures.floorOak;
      activeMat.roughness = 0.32;
      activeMat.clearcoat = 0.38;
      activeMat.color.setHex(0xffffff);
    } else if (finishKey === 'walnut') {
      activeMat.map = customTextures.walnut;
      activeMat.roughness = 0.35;
      activeMat.clearcoat = 0.45;
      activeMat.color.setHex(0xdddddd);
    } else if (finishKey === 'marble') {
      activeMat.map = customTextures.marble;
      activeMat.roughness = 0.12;
      activeMat.clearcoat = 0.9;
      activeMat.color.setHex(0xffffff);
    }
    activeMat.needsUpdate = true;
  });
}

function applyFabricTone(toneKey) {
  document.querySelectorAll('.swatch-btn[data-type="fabric"]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-val') === toneKey);
  });

  const toneMap = {
    charcoal: 0x32353c,
    greige: 0x5a534d,
    sand: 0x8a7b69
  };
  const colorHex = toneMap[toneKey] || 0x32353c;

  if (activeMaterials.living.cushion) {
    activeMaterials.living.cushion.color.setHex(colorHex);
    activeMaterials.living.cushion.needsUpdate = true;
  }
  if (activeMaterials.bedroom.cushion) {
    activeMaterials.bedroom.cushion.color.setHex(colorHex);
    activeMaterials.bedroom.cushion.needsUpdate = true;
  }
  if (activeMaterials.bedroom.bedDuvet) {
    activeMaterials.bedroom.bedDuvet.color.setHex(colorHex);
    activeMaterials.bedroom.bedDuvet.needsUpdate = true;
  }
}

// ============================================================================
// Mode Switching
// ============================================================================
function toggleOrbitMode(forceState) {
  isOrbitMode = typeof forceState === 'boolean' ? forceState : !isOrbitMode;
  if (isOrbitMode && isAutoTour) toggleAutoTour(false);

  if (isOrbitMode) {
    document.body.classList.add('orbit-mode');
    modeText.textContent = '360° Active';
    controls.enabled = true;
    controls.target.copy(currentTarget);
  } else {
    document.body.classList.remove('orbit-mode');
    modeText.textContent = 'Scroll Tour';
    controls.enabled = false;
    updateScroll();
  }
}

function toggleAutoTour(forceState) {
  isAutoTour = typeof forceState === 'boolean' ? forceState : !isAutoTour;
  btnAutoTour.classList.toggle('active', isAutoTour);
  autoTourText.textContent = isAutoTour ? 'Touring...' : 'Auto Tour';

  if (isAutoTour && isOrbitMode) toggleOrbitMode(false);
  if (!isAutoTour) updateScroll();
}

// ============================================================================
// Event Listeners
// ============================================================================
function setupEvents() {
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', onWindowResize, false);

  // Journey Jump Pills
  journeyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const target = parseInt(pill.getAttribute('data-target-screen'));
      jumpToScreen(target);
    });
  });

  // Nav items quick jump
  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      jumpToScreen(parseInt(btn.getAttribute('data-screen')));
    });
  });

  // Atmosphere Switching
  document.querySelectorAll('.atmos-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyAtmosphere(btn.getAttribute('data-atmos'));
    });
  });

  // Controls
  btnMode.addEventListener('click', () => toggleOrbitMode());
  btnAutoTour.addEventListener('click', () => toggleAutoTour());
  btnReset.addEventListener('click', () => {
    targetUserYaw = 0;
    targetUserPitch = 0;
    jumpToScreen(1);
  });

  // Bulletproof Continuous 360° Drag & Rotate Anywhere on Screen
  window.addEventListener('pointerdown', (e) => {
    if (isOrbitMode) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    // Don't drag if clicking actual interactive buttons or controls
    if (e.target.closest('button, input, a, .swatch-btn, .hotspot-marker, .modal-box, .drawer-panel, .screen-navigator, .atmosphere-bar, .journey-pill')) {
      return;
    }
    isUserDragging = true;
    activePointerId = e.pointerId;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    document.body.classList.add('is-dragging');

    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (err) {}

    if (e.cancelable) e.preventDefault();
  }, { passive: false });

  window.addEventListener('pointermove', (e) => {
    if (!isUserDragging) return;
    if (activePointerId !== null && e.pointerId !== activePointerId) return;

    const dx = e.clientX - lastPointerX;
    const dy = e.clientY - lastPointerY;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;

    targetUserYaw += dx * 0.0035;
    targetUserPitch -= dy * 0.0035;
    targetUserPitch = Math.max(-1.28, Math.min(1.28, targetUserPitch));

    if (e.cancelable) e.preventDefault();
  }, { passive: false });

  const endDrag = (e) => {
    if (!isUserDragging) return;
    if (activePointerId !== null && e.pointerId && e.pointerId !== activePointerId) return;
    isUserDragging = false;
    activePointerId = null;
    document.body.classList.remove('is-dragging');
  };

  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  window.addEventListener('blur', endDrag);

  // Double-click to reset 360 orientation to curated forward view
  window.addEventListener('dblclick', (e) => {
    if (e.target.closest('button, input, a, .swatch-btn, .hotspot-marker, .modal-box, .drawer-panel')) {
      return;
    }
    targetUserYaw = 0;
    targetUserPitch = 0;
  });

  // Toggle UI
  btnToggleUI.addEventListener('click', () => {
    document.body.classList.toggle('hide-cards');
    const isHidden = document.body.classList.contains('hide-cards');
    btnToggleUI.style.opacity = isHidden ? '0.5' : '1.0';
  });

  // Customizer Drawer
  btnCustomizer.addEventListener('click', () => {
    customizerDrawer.classList.toggle('hidden');
    btnCustomizer.classList.toggle('active', !customizerDrawer.classList.contains('hidden'));
  });

  btnCloseCustomizer.addEventListener('click', () => {
    customizerDrawer.classList.add('hidden');
    btnCustomizer.classList.remove('active');
  });

  document.querySelectorAll('.swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      const val = btn.getAttribute('data-val');
      if (type === 'floor') applyFloorFinish(val);
      else if (type === 'fabric') applyFabricTone(val);
    });
  });

  // Exposure & Bloom Sliders
  exposureSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    exposureVal.textContent = `${Math.round(val)}%`;
    renderer.toneMappingExposure = (val / 100);
  });

  bloomSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    bloomVal.textContent = `${Math.round(val)}%`;
    bloomPass.strength = (val / 100) * 0.8;
  });

  // Hotspot Modal
  btnCloseHotspot.addEventListener('click', closeHotspotModal);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  composer.setSize(window.innerWidth, window.innerHeight);
  updateScroll();
}

// ============================================================================
// Render & Physics Loop
// ============================================================================
function animate() {
  requestAnimationFrame(animate);

  if (isAutoTour) {
    autoTourAngle += 0.005;
    const center = activeRoom === 'living' ? new THREE.Vector3(65, 45, 100) : new THREE.Vector3(30, 40, 60);
    const radius = activeRoom === 'living' ? 220 : 160;
    camera.position.x = center.x + Math.cos(autoTourAngle) * radius;
    camera.position.z = center.z + Math.sin(autoTourAngle) * radius;
    camera.position.y = center.y + Math.sin(autoTourAngle * 0.5) * 35;
    camera.lookAt(center);
  } else if (isOrbitMode) {
    controls.update();
  } else {
    currentPos.lerp(desiredPos, 0.08);
    currentTarget.lerp(desiredTarget, 0.08);
    currentFov = THREE.MathUtils.lerp(currentFov, desiredFov, 0.08);

    // Smooth inertia interpolation for user yaw and pitch offsets
    userYaw = THREE.MathUtils.lerp(userYaw, targetUserYaw, 0.12);
    userPitch = THREE.MathUtils.lerp(userPitch, targetUserPitch, 0.12);

    // Compute base direction vector from stage interpolation
    const baseDir = new THREE.Vector3().subVectors(currentTarget, currentPos).normalize();
    const stageYaw = Math.atan2(baseDir.x, -baseDir.z);
    const stagePitch = Math.asin(THREE.MathUtils.clamp(baseDir.y, -0.96, 0.96));

    const targetLookYaw = stageYaw + userYaw;
    const targetLookPitch = THREE.MathUtils.clamp(stagePitch + userPitch, -1.35, 1.35);

    if (!isLookInitialized) {
      currentLookYaw = targetLookYaw;
      currentLookPitch = targetLookPitch;
      isLookInitialized = true;
    } else {
      currentLookYaw = THREE.MathUtils.lerp(currentLookYaw, targetLookYaw, 0.14);
      currentLookPitch = THREE.MathUtils.lerp(currentLookPitch, targetLookPitch, 0.14);
    }

    const cosP = Math.cos(currentLookPitch);
    const fx = Math.sin(currentLookYaw) * cosP;
    const fy = Math.sin(currentLookPitch);
    const fz = -Math.cos(currentLookYaw) * cosP;

    const effectiveTarget = new THREE.Vector3(
      currentPos.x + fx * 150,
      currentPos.y + fy * 150,
      currentPos.z + fz * 150
    );

    camera.position.copy(currentPos);
    camera.lookAt(effectiveTarget);

    if (Math.abs(camera.fov - currentFov) > 0.01) {
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
    }
  }

  updateHotspotsPositions();
  composer.render();
}

// Start
init();
