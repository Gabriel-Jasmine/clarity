// Read-only entry controls. Visiting the homepage or guide never writes decision data.
(() => {
  const resume = document.querySelector('.home-resume');
  const guideLabel = document.querySelector('.guide-begin-label');
  if (!resume && !guideLabel) return;
  try {
    const saved = JSON.parse(localStorage.getItem('clarity-v1'));
    const hasWriting = saved && [saved.decision, saved.decisionAim, saved.objective]
      .some(value => typeof value === 'string' && value.trim());
    const hasReview = saved && Array.isArray(saved.reviewed) && saved.reviewed.length > 0;
    const hasWork = !!(hasWriting || hasReview);
    if (resume) resume.hidden = !hasWork;
    if (guideLabel && hasWork) guideLabel.textContent = 'Continue my decision';
  } catch {
    // The primary link remains usable when storage is blocked or malformed.
  }
})();
