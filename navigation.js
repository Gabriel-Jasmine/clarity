// Guide navigation does not initialize or modify decision data.
(() => {
 const slugToStep=Object.fromEntries(["the-decision","things-dear-to-you","the-trade-offs","carrot-on-the-stick","what-compounds","the-domino-effect","the-devils-advocate","wiggle-room","tricks-of-the-mind","reversibility","decision-drivers","decision-overview"].map((slug,id)=>[slug,id]));
 const sectionSlugsFromLink=href=>slugToStep[new URL(href).pathname.split('/').filter(Boolean).pop()];
  if (document.body.classList.contains('guide-page')) {
    const toggle = document.getElementById('mobileNavToggle');
    const nav = document.getElementById('nav');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('mobile-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    try {
      const saved = JSON.parse(localStorage.getItem('clarity-v1'));
      const completedSections = ClarityCompletionCache.read(saved);
      nav.querySelectorAll('.guide-section-link').forEach(link => {
        const section = Number(sectionSlugsFromLink(link.href));
        const complete = completedSections[section] === true;
        link.setAttribute('aria-label', link.querySelector('.nav-label').textContent + (complete ? ', completed' : ', incomplete'));
        link.querySelector('.nav-status').innerHTML = complete ? '<span class="cl-completion"><svg class="cl-icon" aria-hidden="true" focusable="false"><use href="assets/icons.svg#check"></use></svg></span>' : '';
      });
    } catch {
      // Reading the guide remains available without saved state.
    }
    return;
  }

})();
