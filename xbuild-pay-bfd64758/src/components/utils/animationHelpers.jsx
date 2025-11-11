export function animateCountUp(targetValue, currentValue, onUpdate, duration = 600) {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onUpdate(targetValue);
    return;
  }

  const startValue = currentValue || 0;
  const diff = targetValue - startValue;
  const startTime = performance.now();

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const value = startValue + (diff * easedProgress);

    onUpdate(Math.round(value));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}