export class ControlsManager {
  constructor(viewerManager, btnRotate, btnReset, speed, btnFullscreen, viewerWrap) {
    this.viewerManager = viewerManager;
    this.btnRotate = btnRotate;
    this.btnReset = btnReset;
    this.speed = speed;
    this.btnFullscreen = btnFullscreen;
    this.viewerWrap = viewerWrap;
    this.setupControls();
  }

  setupControls() {
    if (this.btnRotate) {
      this.btnRotate.addEventListener('click', () => this.handleRotateToggle());
      this.updateRotateButton();
    }

    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        this.viewerManager.resetCamera();
      });
    }

    if (this.speed) {
      this.speed.addEventListener('change', () => {
        this.viewerManager.setRotationSpeed(this.speed.value);
      });
    }

    if (this.btnFullscreen && this.viewerWrap) {
      this.btnFullscreen.addEventListener('click', () => this.handleFullscreen());
      document.addEventListener('fullscreenchange', () => this.updateFullscreenButton());
    }
  }

  handleRotateToggle() {
    const isRotating = this.viewerManager.toggleRotation();
    this.updateRotateButton(isRotating);
  }

  updateRotateButton(isRotating = this.viewerManager.rotating) {
    if (!this.btnRotate) return;
    
    const span = this.btnRotate.querySelector('span');
    if (span) {
      span.textContent = isRotating ? 'Detener' : 'Rotar';
    }
    this.btnRotate.setAttribute('aria-pressed', String(isRotating));
  }

  async handleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await this.viewerWrap.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen not supported or denied');
    }
  }

  updateFullscreenButton() {
    if (!this.btnFullscreen) return;
    const isFullscreen = !!document.fullscreenElement;
    this.btnFullscreen.setAttribute('aria-label', isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa');
  }
}