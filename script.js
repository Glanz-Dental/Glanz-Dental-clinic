const toggle = document.getElementById('language-toggle');
const html = document.documentElement;
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

function setLanguage(language) {
  const isArabic = language === 'ar';
  html.lang = language;
  html.dir = isArabic ? 'rtl' : 'ltr';
  document.title = isArabic ? 'عيادة GLANZ للأسنان | هليوبوليس' : 'GLANZ Dental Clinic | Heliopolis';
  document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
    element.textContent = element.dataset[isArabic ? 'ar' : 'en'];
  });
  toggle.textContent = isArabic ? 'English' : 'العربية';
  toggle.setAttribute('aria-label', isArabic ? 'Switch to English' : 'Switch to Arabic');
  localStorage.setItem('glanz-language', language);
}

toggle.addEventListener('click', () => setLanguage(html.lang === 'ar' ? 'en' : 'ar'));
setLanguage(localStorage.getItem('glanz-language') || 'en');
