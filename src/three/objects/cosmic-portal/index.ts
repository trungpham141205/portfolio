import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Points,
  PointsMaterial,
  ShaderMaterial,
  TorusGeometry,
} from "three";
import gsap from "gsap";
import { scene } from "../../core/scene";
import { sceneWeights } from "../../../animations/scenes";
import { sizes } from "../../../utils/sizes";
import portalVertexShader from "../../shaders/cosmic-portal/vertex.glsl";
import portalFragmentShader from "../../shaders/cosmic-portal/fragment.glsl";

const portalGroup = new Group();
const starsGroup = new Group();
const ringMaterials: MeshBasicMaterial[] = [];
const rings: Mesh<TorusGeometry, MeshBasicMaterial>[] = [];
const streamCount = 420;
const streamPositions = new Float32Array(streamCount * 3);
const streamPhases = new Float32Array(streamCount);
const streamSeeds = new Float32Array(streamCount);
const streamSpeeds = new Float32Array(streamCount);
const streamWidths = new Float32Array(streamCount);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let initialized = false;
let auraMaterial: ShaderMaterial | null = null;
let starsMaterial: PointsMaterial | null = null;
let streamGeometry: BufferGeometry | null = null;
let streamMaterial: PointsMaterial | null = null;
let emblem: Mesh<IcosahedronGeometry, MeshBasicMaterial> | null = null;
let randomState = 0x51f15e;

const random = () => {
  randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
  return randomState / 4294967296;
};

const makeRing = (radius: number, tube: number, color: string, opacity: number) => {
  const material = new MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const ring = new Mesh(new TorusGeometry(radius, tube, 8, 192), material);
  ring.userData.baseOpacity = opacity;
  ringMaterials.push(material);
  rings.push(ring);
  portalGroup.add(ring);
};

const initAura = () => {
  auraMaterial = new ShaderMaterial({
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: AdditiveBlending,
    side: DoubleSide,
  });

  const aura = new Mesh(new PlaneGeometry(13.5, 13.5), auraMaterial);
  aura.position.z = -0.2;
  aura.renderOrder = -220;
  portalGroup.add(aura);
};

const initRings = () => {
  makeRing(3.84, 0.018, "#65e8ff", 0.62);
  makeRing(4.02, 0.009, "#f36fdd", 0.3);
  makeRing(4.3, 0.006, "#ffffff", 0.16);

  rings[1]!.rotation.x = 0.12;
  rings[1]!.rotation.y = -0.18;
  rings[2]!.rotation.x = -0.16;
  rings[2]!.rotation.y = 0.12;

  emblem = new Mesh(
    new IcosahedronGeometry(1.08, 1),
    new MeshBasicMaterial({
      color: "#c6c6c6",
      wireframe: true,
      transparent: true,
      opacity: 0.16,
      blending: AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  emblem.position.z = 0.08;
  portalGroup.add(emblem);
};

const initStars = () => {
  const count = 760;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cyan = new Color("#78dff5");
  const gold = new Color("#d8bd70");
  const white = new Color("#c6c6c6");

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (random() - 0.5) * 38;
    positions[offset + 1] = (random() - 0.35) * 23;
    positions[offset + 2] = -6 - random() * 25;

    const roll = random();
    const color = roll > 0.92 ? gold : roll > 0.75 ? cyan : white;
    const intensity = 0.32 + random() * 0.68;
    colors[offset] = color.r * intensity;
    colors[offset + 1] = color.g * intensity;
    colors[offset + 2] = color.b * intensity;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

  starsMaterial = new PointsMaterial({
    size: 0.035,
    transparent: true,
    opacity: 0.48,
    vertexColors: true,
    blending: AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
    toneMapped: false,
  });

  const stars = new Points(geometry, starsMaterial);
  stars.renderOrder = -300;
  starsGroup.add(stars);
  scene.instance.add(starsGroup);
};

const initStream = () => {
  const colors = new Float32Array(streamCount * 3);
  const cyan = new Color("#65e8ff");
  const gold = new Color("#d8bd70");
  const violet = new Color("#8d93cb");

  for (let index = 0; index < streamCount; index += 1) {
    const offset = index * 3;
    streamPhases[index] = random();
    streamSeeds[index] = random() * Math.PI * 2;
    streamSpeeds[index] = 0.035 + random() * 0.09;
    streamWidths[index] = 0.35 + random() * 0.12;

    const roll = random();
    const color = roll > 0.83 ? gold : roll > 0.48 ? cyan : violet;
    const intensity = 0.45 + random() * 0.55;
    colors[offset] = color.r * intensity;
    colors[offset + 1] = color.g * intensity;
    colors[offset + 2] = color.b * intensity;
  }

  streamGeometry = new BufferGeometry();
  streamGeometry.setAttribute("position", new Float32BufferAttribute(streamPositions, 3));
  streamGeometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

  streamMaterial = new PointsMaterial({
    size: 0.055,
    transparent: true,
    opacity: 0.66,
    vertexColors: true,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });

  const stream = new Points(streamGeometry, streamMaterial);
  stream.renderOrder = -120;
  portalGroup.add(stream);
  updateStream(0, true);
};

const updateStream = (time: number, force = false) => {
  if (!streamGeometry || (reduceMotion.matches && !force)) return;

  for (let index = 0; index < streamCount; index += 1) {
    const offset = index * 3;
    const progress = (streamPhases[index]! + time * streamSpeeds[index]!) % 1;
    const fall = progress * 10.5;
    const spread = 0.28 + progress * 3.7;
    const seed = streamSeeds[index]!;

    streamPositions[offset] = Math.sin(seed * 1.73 + fall * 0.32) * spread * streamWidths[index]!;
    streamPositions[offset + 1] = -3.1 - fall;
    streamPositions[offset + 2] = Math.cos(seed * 1.17 + fall * 0.26) * spread * 0.22;
  }

  streamGeometry.attributes.position!.needsUpdate = true;
};

const handleResize = () => {
  const isLandscape = sizes.isLandscape;
  portalGroup.position.set(isLandscape ? 2.5 : 0, isLandscape ? 3.25 : 5.1, -3.8);
  portalGroup.scale.setScalar(isLandscape ? 1 : 0.92);
};

const tick = () => {
  const time = gsap.ticker.time;
  const weight = Math.min(1, sceneWeights.hero + sceneWeights.about * 0.72 + sceneWeights.contact * 0.55);
  portalGroup.visible = weight > 0.001;
  starsGroup.visible = weight > 0.001;

  if (!portalGroup.visible) return;

  const pulse = 0.92 + Math.sin(time * 0.55) * 0.08;
  ringMaterials.forEach((material, index) => {
    material.opacity = Number(rings[index]!.userData.baseOpacity) * weight * pulse;
  });

  if (auraMaterial) {
    auraMaterial.uniforms.uTime!.value = time;
    auraMaterial.uniforms.uOpacity!.value = weight;
  }
  if (starsMaterial) starsMaterial.opacity = (0.24 + sceneWeights.hero * 0.24) * weight;
  if (streamMaterial) streamMaterial.opacity = 0.62 * weight;

  if (!reduceMotion.matches) {
    portalGroup.rotation.z = Math.sin(time * 0.09) * 0.035;
    rings[0]!.rotation.z = time * 0.035;
    rings[1]!.rotation.z = -time * 0.026;
    rings[2]!.rotation.z = time * 0.014;
    starsGroup.rotation.y = Math.sin(time * 0.035) * 0.025;

    if (emblem) {
      emblem.rotation.x = time * 0.12;
      emblem.rotation.y = time * 0.16;
      emblem.material.opacity = (0.12 + Math.sin(time * 0.7) * 0.025) * weight;
    }
  }

  updateStream(time);
};

const init = () => {
  if (initialized) return;
  initialized = true;
  initAura();
  initRings();
  initStars();
  initStream();
  handleResize();
  scene.instance.add(portalGroup);
  sizes.on("resize", handleResize);
  gsap.ticker.add(tick);
};

const destroy = () => {
  sizes.off("resize", handleResize);
  gsap.ticker.remove(tick);
};

export const cosmicPortal = { init, destroy, group: portalGroup };
