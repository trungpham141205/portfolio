import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";
import { renderTarget } from "./core/renderTarget";
import { threeSizes } from "./utils/sizes";
import { resources } from "../utils/resources";
import { raycast } from "./utils/raycast";

let canvas: HTMLCanvasElement | null = null;
let webglReady = false;

const supportsWebGL = (_canvas: HTMLCanvasElement) => {
  try {
    return Boolean(_canvas.getContext("webgl2") || _canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

const init = (_canvas: HTMLCanvasElement) => {
  canvas = _canvas;

  resources.once("ready", () => {
    threeSizes.init(_canvas);
    camera.init();

    if (!supportsWebGL(_canvas)) {
      _canvas.style.display = "none";
      _canvas.dataset.renderer = "css-fallback";
      return;
    }

    try {
      renderTarget.init();
      renderer.init(canvas);
      objects.init();
      raycast.init();
      webglReady = true;
      _canvas.dataset.renderer = "webgl";
    } catch (error) {
      _canvas.style.display = "none";
      _canvas.dataset.renderer = "css-fallback";
      console.warn("WebGL scene unavailable; using the CSS portfolio backdrop.", error);
    }
  });
};

const destroy = () => {
  threeSizes.destroy();
  camera.destroy();
  if (webglReady) {
    renderTarget.destroy();
    renderer.destroy();
    objects.destroy();
  }
  webglReady = false;
  canvas = null;
};

export const three = { init, destroy };
