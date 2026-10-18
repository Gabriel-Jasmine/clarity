// Guide navigation does not initialize or modify decision data.
(() => {
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
        const section = Number(new URL(link.href).searchParams.get('section'));
        const complete = reviewed.includes(section);
        link.setAttribute('aria-label', link.querySelector('.nav-label').textContent + (complete ? ', reviewed' : ', not reviewed'));
        if (complete) link.querySelector('.nav-status').innerHTML = '<span class="cl-completion"><svg class="cl-icon" aria-hidden="true" focusable="false"><use href="assets/icons.svg#check"></use></svg></span>';
      });
    } catch {
      // Reading the guide remains available without saved state.
    }
    return;
  }

  // A guide section link uses the tool's existing navigation handler.
  // Consume only this parameter so a later reload resumes the latest section.
  const url = new URL(location.href);
  const requested = url.searchParams.get('section');
  if (requested === null) return;
  if (/^(?:[0-9]|1[01])$/.test(requested)) {
    const button = document.querySelector('#nav button[data-step="' + requested + '"]');
    if (button) button.click();
  }
  url.searchParams.delete('section');
  history.replaceState(history.state, '', url.pathname + url.search + url.hash);
})();
