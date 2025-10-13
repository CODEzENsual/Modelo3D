export const CONFIG = {
  viewer: {
    autoRotate: true,
    rotationSpeed: 0.5,
    exposure: 1.2,
    shadowIntensity: 1.2,
    shadowSoftness: 0.8,
    environmentImage: 'neutral',
    interactionPrompt: 'auto'
  },
  
  speeds: {
    slow: 0.25,
    normal: 0.5,
    fast: 1,
    veryFast: 1.5
  },
  
  timing: {
    interactionDelay: 700,
    loadTimeout: 15000
  },
  
  storage: {
    themeKey: 'theme-mode-v2',
    cameraKey: 'camera-orbit-v1'
  }
};

export const ELEMENTS = {
  viewer: null,
  loader: null,
  progressBar: null,
  progressText: null,
  btnRotate: null,
  btnReset: null,
  speed: null,
  btnFullscreen: null,
  btnTheme: null,
  viewerWrap: null
};

export function initializeElements() {
  ELEMENTS.viewer = document.getElementById('viewer');
  ELEMENTS.loader = document.getElementById('loader');
  ELEMENTS.progressBar = document.getElementById('progressBar');
  ELEMENTS.progressText = document.getElementById('progressText');
  ELEMENTS.btnRotate = document.getElementById('btnRotate');
  ELEMENTS.btnReset = document.getElementById('btnReset');
  ELEMENTS.speed = document.getElementById('speed');
  ELEMENTS.btnFullscreen = document.getElementById('btnFullscreen');
  ELEMENTS.btnTheme = document.getElementById('btnTheme');
  ELEMENTS.viewerWrap = document.getElementById('viewerWrap');
}