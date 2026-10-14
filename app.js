/**
 * ECO-DESERT - Lógica de Navegación de Láminas Oficiales
 * Transformando residuos en recursos
 */

document.addEventListener('DOMContentLoaded', () => {
  const TOTAL_SLIDES = 8;
  const slideSections = Array.from(document.querySelectorAll('.slide-section'));
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const indicatorDots = document.querySelectorAll('.slide-indicator-nav .indicator-dot');
  const slideBadge = document.getElementById('slideBadge');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const header = document.getElementById('header');

  let currentSlideIndex = 1;

  // 1. DETECCIÓN DE SCROLL & SLIDE ACTIVA (SCROLLSPY)
  const updateActiveSlide = () => {
    // Header shadow
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Identificar cuál lámina está más cerca del centro de la pantalla
    const viewportMiddle = window.scrollY + window.innerHeight / 2;
    let closestIndex = 1;
    let minDistance = Infinity;

    slideSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const sectionCenter = window.scrollY + rect.top + rect.height / 2;
      const distance = Math.abs(viewportMiddle - sectionCenter);
      const index = parseInt(sec.getAttribute('data-index'), 10);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== currentSlideIndex) {
      currentSlideIndex = closestIndex;
      updateUI();
    }
  };

  const updateUI = () => {
    // Actualizar badge 'X / 8'
    if (slideBadge) {
      slideBadge.textContent = `${currentSlideIndex} / ${TOTAL_SLIDES}`;
    }

    // Actualizar enlaces del header
    navLinks.forEach(link => {
      const idx = parseInt(link.getAttribute('data-slide'), 10);
      if (idx === currentSlideIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Actualizar dots laterales
    indicatorDots.forEach((dot, i) => {
      if (i + 1 === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveSlide, { passive: true });
  updateActiveSlide();

  // 2. NAVEGACIÓN ANTERIOR / SIGUIENTE
  const goToSlide = (index) => {
    if (index < 1) index = 1;
    if (index > TOTAL_SLIDES) index = TOTAL_SLIDES;
    const targetSection = document.getElementById(`slide-${index}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      goToSlide(currentSlideIndex - 1);
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      goToSlide(currentSlideIndex + 1);
    });
  }

  // Soporte para flechas del teclado
  window.addEventListener('keydown', (e) => {
    // Si el modal de contacto está abierto, no capturar flechas
    if (contactModal && contactModal.classList.contains('active')) {
      if (e.key === 'Escape') closeContactModal();
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      goToSlide(currentSlideIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goToSlide(currentSlideIndex - 1);
    }
  });

  // 3. MODO PANTALLA COMPLETA
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        fullscreenBtn.querySelector('.btn-text').textContent = 'Salir';
      } else {
        document.exitFullscreen().catch(() => {});
        fullscreenBtn.querySelector('.btn-text').textContent = 'Presentación';
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        fullscreenBtn.querySelector('.btn-text').textContent = 'Presentación';
      }
    });
  }

  // 4. MENÚ MÓVIL
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 5. MODAL DE CONTACTO
  const contactModal = document.getElementById('contactModal');
  const openContactBtn = document.getElementById('openContactBtn');
  const mobileContactBtn = document.getElementById('mobileContactBtn');
  const hotspotContactBtn = document.getElementById('hotspotContactBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const openContactModal = () => {
    if (contactModal) {
      contactModal.classList.add('active');
      contactModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Si el menú móvil estaba abierto, cerrarlo
      if (mobileMenu) {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
      }
    }
  };

  const closeContactModal = () => {
    if (contactModal) {
      contactModal.classList.remove('active');
      contactModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (openContactBtn) openContactBtn.addEventListener('click', openContactModal);
  if (mobileContactBtn) mobileContactBtn.addEventListener('click', openContactModal);
  if (hotspotContactBtn) hotspotContactBtn.addEventListener('click', openContactModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeContactModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeContactModal);

  // 6. VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const resetModalFormBtn = document.getElementById('resetModalFormBtn');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nombre = document.getElementById('nombre');
      const empresa = document.getElementById('empresa');
      const industria = document.getElementById('industria');
      const email = document.getElementById('email');
      const mensaje = document.getElementById('mensaje');

      const nombreError = document.getElementById('nombreError');
      const empresaError = document.getElementById('empresaError');
      const industriaError = document.getElementById('industriaError');
      const emailError = document.getElementById('emailError');
      const mensajeError = document.getElementById('mensajeError');

      [nombreError, empresaError, industriaError, emailError, mensajeError].forEach(el => {
        if (el) el.textContent = '';
      });

      if (!nombre.value.trim()) {
        nombreError.textContent = 'Por favor ingresa tu nombre.';
        isValid = false;
      }

      if (!empresa.value.trim()) {
        empresaError.textContent = 'Ingresa el nombre de tu empresa.';
        isValid = false;
      }

      if (!industria.value) {
        industriaError.textContent = 'Selecciona una industria.';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Ingresa un correo electrónico válido.';
        isValid = false;
      }

      if (!mensaje.value.trim() || mensaje.value.trim().length < 8) {
        mensajeError.textContent = 'Escribe tu consulta o requerimiento.';
        isValid = false;
      }

      if (isValid) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando requerimiento...</span>`;

        setTimeout(() => {
          contactForm.style.display = 'none';
          formSuccess.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Enviar Mensaje</span>`;
        }, 700);
      }
    });

    if (resetModalFormBtn) {
      resetModalFormBtn.addEventListener('click', () => {
        contactForm.reset();
        contactForm.style.display = 'flex';
        formSuccess.style.display = 'none';
      });
    }
  }

  console.log('ECO-DESERT Presentation Mode Initialized.');
});
