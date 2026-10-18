// Presentation-only shortcut. Visiting the homepage never writes decision data.
(() => {
  const resume = document.querySelector('.home-resume');
  if (!resume) return;
  try {
    const saved = JSON.parse(localStorage.getItem('clarity-v1'));
    const hasWriting = saved && [saved.decision, saved.decisionAim, saved.objective]
      .some(value => typeof value === 'string' && value.trim());
    const hasReview = saved && Array.isArray(saved.reviewed) && saved.reviewed.length > 0;
    resume.hidden = !(hasWriting || hasReview);
  } catch {
    // The primary link remains usable when storage is blocked or malformed.
  }
})();
