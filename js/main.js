import { CONFIG, ELEMENTS, initializeElements } from './config.js';
import { initializeTheme } from './theme.js';
import { ViewerManager } from './viewer.js';
import { ControlsManager } from './controls.js';
import { InteractionManager } from './interactions.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    initializeElements();
    
    if (!ELEMENTS.viewer) {
      console.error('Viewer element not found');
      return;
    }

    this.themeManager = initializeTheme(ELEMENTS.btnTheme);
    
    this.viewerManager = new ViewerManager(
      ELEMENTS.viewer,
      ELEMENTS.loader,
      ELEMENTS.progressBar,
      ELEMENTS.progressText
    );

    this.controlsManager = new ControlsManager(
      this.viewerManager,
      ELEMENTS.btnRotate,
      ELEMENTS.btnReset,
      ELEMENTS.speed,
      ELEMENTS.btnFullscreen,
      ELEMENTS.viewerWrap
    );

    this.interactionManager = new InteractionManager(
      ELEMENTS.viewer,
      this.viewerManager
    );

    this.setupAccessibility();
  }

  setupAccessibility() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreference = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion');
        if (ELEMENTS.viewer) {
          ELEMENTS.viewer.autoRotate = false;
        }
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    handleMotionPreference(mediaQuery);
    mediaQuery.addEventListener('change', handleMotionPreference);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}