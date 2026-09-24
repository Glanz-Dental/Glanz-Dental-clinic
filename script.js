(() => {
  const html = document.documentElement;
  const languageToggle = document.getElementById('language-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const doctorSelect = document.getElementById('doctor');
  const bookingForm = document.getElementById('booking-form');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  function applyLanguage(lang) {
    const isAr = lang === 'ar';
    html.lang = lang;
    html.dir = isAr ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      el.textContent = isAr ? el.dataset.ar : el.dataset.en;
    });
    languageToggle.textContent = isAr ? 'English' : 'العربية';
    languageToggle.setAttribute('aria-label', isAr ? 'Switch to English' : 'Switch to Arabic');
    localStorage.setItem('glanz-language', lang);
  }

  applyLanguage(localStorage.getItem('glanz-language') || 'en');
  languageToggle.addEventListener('click', () => applyLanguage(html.lang === 'en' ? 'ar' : 'en'));

  menuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('.book-doctor').forEach(btn => {
    btn.addEventListener('click', () => {
      doctorSelect.value = btn.dataset.doctor;
      document.getElementById('booking').scrollIntoView({behavior:'smooth'});
      setTimeout(() => document.getElementById('name').focus({preventScroll:true}), 500);
    });
  });

  document.querySelectorAll('.faq-item').forEach(item => item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll('.faq-item').forEach(other => { if (other !== item) other.open = false; });
  }));

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const doctor = doctorSelect.value || 'Not sure yet';
    const date = document.getElementById('date').value || 'Not selected';
    const time = document.getElementById('time').value || 'Not selected';
    const concern = document.getElementById('concern').value.trim() || 'Not provided';
    const message = `GLANZ booking request\nName: ${name}\nPhone: ${phone}\nDentist: ${doctor}\nPreferred date: ${date}\nPreferred time: ${time}\nConcern: ${concern}`;
    window.open(`https://wa.me/201553774852?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
})();
