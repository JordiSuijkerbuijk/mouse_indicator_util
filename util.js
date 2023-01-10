import anime from 'animejs';

let lastY = 0;
let lastX = 0;

export function animateMouse(e, indicator) {
  const x2 = e.x;
  const y2 = e.y;

  const angle = getAngle(lastX, lastY, x2, y2);

  const speed = Math.max(Math.abs(e.movementX), Math.abs(e.movementY));

  let delta = (speed / 20) * 0.4;

  indicator.style.transform = `translateX(${e.x}px) translateY(${
    e.y
  }px) rotate(${angle}deg) scale(${Math.min(1.4, 1 + delta)}, ${Math.max(0.5, 1 - delta)})`;

  lastX = e.x;
  lastY = e.y;
}

export function toggleIndicator(e, indicator) {
  const scale = e.type === 'mouseenter' ? 1 : 0;

  anime({
    targets: indicator,
    scale,
  });
}

//Add on mouse enter function for hover effects
export function mouseEnter(scale = false) {
  const indicator = document.querySelector('#mouse-indicator');

  if (!indicator) return;

  if (scale) {
    indicator.classList.add('scale-50');
    return;
  }

  if (indicator.classList.includes('scale-50')) {
    indicator.classList.remove('scale-50');
    return;
  }
}

function getAngle(x1, y1, x2, y2) {
  const deltaX = x2 - x1; //opposite
  const deltaY = y2 - y1; //adjacent

  if (!deltaX < -3 || !deltaX > 3 || !deltaY < -3 || !deltaY > 3) return;

  const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

  return angle; //return angle in degrees
}
