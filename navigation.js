// Guide navigation does not initialize or modify decision data.
(() => {
  const slugToStep={"the-decision":0,"things-dear-to-you":1,"the-trade-offs":2,"carrot-on-the-stick":3,"what-compounds":4,"the-domino-effect":5,"the-devils-advocate":6,"wiggle-room":7,"tricks-of-the-mind":8,"reversibility":9,"decision-drivers":10,"decision-overview":11};
  const sectionSlugsFromLink=href=>slugToStep[new URL(href).pathname.replace(/\\/+$/,'').split('/').pop()];
  if (document.body.classList.contains('guide-page')) {
    const toggle = document.getElementById('mobileNavToggle');
    const nav = document.getElementById('nav');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('mobile-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    try {
      const saved = JSON.parse(localStorage.getItem('clarity-v1'));
      const reviewed = saved && Array.isArray(saved.reviewed) ? saved.reviewed : [];
      nav.querySelectorAll('.guide-section-link').forEach(link => {
        const section = Number(sectionSlugsFromLink(link.href));
        const complete = reviewed.includes(section);
        link.setAttribute('aria-label', link.querySelector('.nav-label').textContent + (complete ? ', reviewed' : ', not reviewed'));
        if (complete) link.querySelector('.nav-status').innerHTML = '<span class="cl-completion"><svg class="cl-icon" aria-hidden="true" focusable="false"><use href="assets/icons.svg#check"></use></svg></span>';
      });
    } catch {
      // Reading the guide remains available without saved state.
    }
    return;
  }

})();
