// Tab switching: shows one panel at a time and keeps the URL hash in sync.
const panels = [...document.querySelectorAll('.panel')];
const tabButtons = [...document.querySelectorAll('.tabs button')];
const lightbox = document.getElementById('lightbox');

function showTab(id) {
  if (!document.getElementById(id)) id = 'home';
  panels.forEach(p => p.classList.toggle('active', p.id === id));
  tabButtons.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
  if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Any element with data-tab switches tabs (nav, logo, buttons).
document.addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]');
  if (tab) {
    e.preventDefault();
    showTab(tab.dataset.tab);
    return;
  }

  // Open a phone screenshot in the lightbox.
  const shot = e.target.closest('.shot img');
  if (shot) {
    lightbox.querySelector('img').src = shot.src;
    lightbox.querySelector('img').alt = shot.alt;
    lightbox.hidden = false;
    return;
  }

  // Close the lightbox on backdrop or X click.
  if (e.target === lightbox || e.target.closest('.close')) lightbox.hidden = true;
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.hidden = true;
});

// Open the tab named in the URL, e.g. index.html#plans.
showTab(location.hash.replace('#', '') || 'home');
window.addEventListener('hashchange', () => showTab(location.hash.replace('#', '')));
