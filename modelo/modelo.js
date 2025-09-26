const viewer = document.getElementById('viewer');
const loader = document.getElementById('loader');
const spinner = document.getElementById('spinner');
const loaderText = document.getElementById('loaderText');
const retryBtn = document.getElementById('retryBtn');
const rotateToggle = document.getElementById('rotateToggle');
const resetCam = document.getElementById('resetCam');
const fullscreenToggle = document.getElementById('fullscreenToggle');
const MAX_LOAD_TIME = 10000;
let loadTimer = null;
const originalSrc = viewer ? viewer.getAttribute('src') : '';

function showLoader(){
  loader.classList.remove('hidden');
  loader.classList.remove('error');
  spinner.style.display = 'block';
  loaderText.textContent = 'Cargando...';
  retryBtn.setAttribute('aria-hidden','true');
  retryBtn.style.display = 'none';
  startLoadTimer();
}
function hideLoader(){
  loader.classList.add('hidden');
  clearLoadTimer();
}
function showError(text){
  loader.classList.remove('hidden');
  loader.classList.add('error');
  spinner.style.display = 'none';
  loaderText.textContent = text;
  retryBtn.style.display = 'inline-block';
  retryBtn.setAttribute('aria-hidden','false');
  clearLoadTimer();
}
function startLoadTimer(){
  clearLoadTimer();
  loadTimer = setTimeout(()=>{
    showError('Tiempo de carga excedido. Puedes reintentar.');
  },MAX_LOAD_TIME);
}
function clearLoadTimer(){
  if(loadTimer){
    clearTimeout(loadTimer);
    loadTimer = null;
  }
}
function centerModelInViewer(){
  try{
    const m = viewer.model;
    if(!m) return;
    let min = null;
    let max = null;
    if(m.boundingBox && m.boundingBox.min && m.boundingBox.max){
      min = m.boundingBox.min;
      max = m.boundingBox.max;
    } else if(typeof m.getBoundingBox === 'function'){
      const b = m.getBoundingBox();
      if(b && b.min && b.max){
        min = b.min;
        max = b.max;
      }
    }
    if(min && max){
      const cx = (min.x + max.x) / 2;
      const cy = (min.y + max.y) / 2;
      const cz = (min.z + max.z) / 2;
      const sx = Math.abs(max.x - min.x);
      const sy = Math.abs(max.y - min.y);
      const sz = Math.abs(max.z - min.z);
      const maxSize = Math.max(sx, sy, sz);
      const distance = Math.max(1.5, maxSize * 1.6);
      viewer.cameraTarget = `${cx}m ${cy}m ${cz}m`;
      viewer.cameraOrbit = `0deg 75deg ${distance}m`;
      if(typeof viewer.jumpCameraToGoal === 'function'){
        viewer.jumpCameraToGoal();
      }
    }
  }catch(e){}
}
if(viewer){
  showLoader();
  viewer.addEventListener('load',()=>{
    centerModelInViewer();
    hideLoader();
  });
  viewer.addEventListener('progress',(e)=>{
    if(e.detail && e.detail.totalProgress === 1){
      centerModelInViewer();
      hideLoader();
    }
  });
  viewer.addEventListener('error',()=>{
    showError('Error al cargar el modelo. Pulsa reintentar.');
  });
  retryBtn.addEventListener('click',()=>{
    showLoader();
    const freshSrc = originalSrc + '?t=' + Date.now();
    viewer.setAttribute('src',freshSrc);
  });
  rotateToggle.addEventListener('click',()=>{
    const isRotating = viewer.hasAttribute('auto-rotate');
    if(isRotating){
      viewer.removeAttribute('auto-rotate');
      rotateToggle.textContent = 'Iniciar rotación';
      rotateToggle.setAttribute('aria-pressed','false');
    } else {
      viewer.setAttribute('auto-rotate','');
      rotateToggle.textContent = 'Detener rotación';
      rotateToggle.setAttribute('aria-pressed','true');
    }
  });
  resetCam.addEventListener('click',()=>{
    viewer.cameraOrbit = '0deg 75deg 2.5m';
    viewer.cameraTarget = '0m 0m 0m';
    if(typeof viewer.jumpCameraToGoal === 'function'){
      viewer.jumpCameraToGoal();
    }
  });
  fullscreenToggle.addEventListener('click',async()=>{
    const doc = document;
    if(doc.fullscreenElement){
      await doc.exitFullscreen();
      fullscreenToggle.textContent = 'Pantalla completa';
    } else {
      try{
        await viewer.requestFullscreen();
        fullscreenToggle.textContent = 'Salir pantalla';
      }catch{
        fullscreenToggle.textContent = 'Pantalla completa';
      }
    }
  });
  window.addEventListener('resize',()=>{
    viewer.style.width = '100vw';
    viewer.style.height = '100vh';
  });
} else {
  if(loader){
    loader.classList.add('hidden');
  }
}