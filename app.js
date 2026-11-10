const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
const overlay = document.querySelector('#overlay');
const navigationLinks = [...navigation.querySelectorAll('.drawer__link')];

const setMenu = (open, restoreFocus = false) => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú de secciones' : 'Abrir menú de secciones');
  navigation.setAttribute('aria-hidden', String(!open));
  navigation.toggleAttribute('inert', !open);
  navigation.classList.toggle('is-open', open);
  overlay.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);

  if (open) {
    navigationLinks[0].focus({ preventScroll: true });
  } else if (restoreFocus) {
    menuButton.focus({ preventScroll: true });
  }
};

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

overlay.addEventListener('click', () => setMenu(false, true));

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (link) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false, true);
  }
});

document.querySelector('#current-year').textContent = String(new Date().getFullYear());

const sections = [...document.querySelectorAll('.slide[id]')];
let activeSectionUpdatePending = false;

const updateActiveSection = () => {
  const marker = window.innerHeight / 2;
  const activeSection = sections.find((section) => {
    const bounds = section.getBoundingClientRect();
    return bounds.top <= marker && bounds.bottom > marker;
  });

  if (!activeSection) return;

  navigationLinks.forEach((link) => {
    const isActive = link.hash === `#${activeSection.id}`;
    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

window.addEventListener('scroll', () => {
  if (activeSectionUpdatePending) return;
  activeSectionUpdatePending = true;

  requestAnimationFrame(() => {
    activeSectionUpdatePending = false;
    updateActiveSection();
  });
}, { passive: true });

window.addEventListener('resize', updateActiveSection, { passive: true });
updateActiveSection();
