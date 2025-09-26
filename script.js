const viewer = document.getElementById('viewer');
const loader = document.getElementById('loader');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const btnRotate = document.getElementById('btnRotate');
const btnReset = document.getElementById('btnReset');
const speed = document.getElementById('speed');
const btnFullscreen = document.getElementById('btnFullscreen');
const btnTheme = document.getElementById('btnTheme');
let rotating = false;
let initialOrbit = null;
let userInteracting = false;
function setTheme(mode){
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('theme-mode', mode);
}
const savedTheme = localStorage.getItem('theme-mode');
if(savedTheme) setTheme(savedTheme);
else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
function updateRotateUI(){
  btnRotate.textContent = rotating ? 'Parar rotación' : 'Iniciar rotación';
  btnRotate.setAttribute('aria-pressed', String(rotating));
}
viewer.addEventListener('load', () => {
  initialOrbit = viewer.cameraOrbit || null;
  loader.classList.add('hidden');
  rotating = !!viewer.autoRotate || viewer.hasAttribute('auto-rotate');
  viewer.autoRotate = rotating;
  updateRotateUI();
});
viewer.addEventListener('progress', e => {
  const p = Math.min(1, e.detail && e.detail.totalProgress ? e.detail.totalProgress : 0);
  progressBar.style.width = (p * 100) + '%';
  progressText.textContent = 'Cargando ' + Math.round(p * 100) + '%';
});
viewer.addEventListener('error', () => {
  progressText.textContent = 'Error al cargar';
  progressBar.style.width = '100%';
});
btnRotate.addEventListener('click', () => {
  rotating = !rotating;
  viewer.autoRotate = rotating;
  if(rotating) viewer.setAttribute('auto-rotate', '');
  else viewer.removeAttribute('auto-rotate');
  updateRotateUI();
});
btnReset.addEventListener('click', () => {
  if(typeof viewer.resetTurntableRotation === 'function') viewer.resetTurntableRotation();
  if(initialOrbit) viewer.cameraOrbit = initialOrbit;
});
speed.addEventListener('change', () => {
  const val = parseFloat(speed.value);
  if(!Number.isNaN(val)) {
    viewer.rotationPerSecond = val;
    viewer.setAttribute('rotation-per-second', String(val));
  }
});
btnFullscreen.addEventListener('click', async () => {
  const wrap = document.getElementById('viewerWrap');
  try{
    if(!document.fullscreenElement) await wrap.requestFullscreen();
    else await document.exitFullscreen();
  }catch{}
});
btnTheme.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});
function interactionStart(){
  userInteracting = true;
  viewer.autoRotate = false;
}
function interactionEnd(){
  userInteracting = false;
  setTimeout(() => {
    if(rotating && !userInteracting){
      viewer.autoRotate = true;
      if(!viewer.hasAttribute('auto-rotate')) viewer.setAttribute('auto-rotate', '');
    }
  }, 700);
}
viewer.addEventListener('pointerdown', interactionStart);
viewer.addEventListener('pointerup', interactionEnd);
viewer.addEventListener('pointercancel', interactionEnd);
viewer.addEventListener('touchstart', interactionStart, {passive:true});
viewer.addEventListener('touchend', interactionEnd);
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => {
  if(e.matches) document.documentElement.classList.add('reduce-motion');
  else document.documentElement.classList.remove('reduce-motion');
});