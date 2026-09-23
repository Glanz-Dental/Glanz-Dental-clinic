
      const languageToggle = document.getElementById('language-toggle');
      const menuToggle = document.getElementById('menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      function setLanguage(language){
        const lang = language === 'ar' ? 'ar' : 'en';
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.title = lang === 'ar' ? 'عيادة GLANZ للأسنان | هليوبوليس' : 'GLANZ Dental Clinic | Heliopolis';
        document.querySelectorAll('[data-en][data-ar]').forEach(element => element.textContent = element.dataset[lang]);
        document.querySelectorAll('[data-alt-en]').forEach(element => element.alt = element.getAttribute('data-alt-' + lang));
        languageToggle.textContent = lang === 'ar' ? 'English' : 'العربية';
        languageToggle.setAttribute('aria-label' , lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
        try{localStorage.setItem('glanz-language' , lang)}catch(error){}
      }
      languageToggle.addEventListener('click' , () => setLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar'));
      menuToggle.addEventListener('click' , () => {
        const open = mobileMenu.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded' , String(open));
      });
      mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click' , () => {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded' , 'false');
      }));
      document.querySelectorAll('.faq-item').forEach(item => item.addEventListener('toggle' , () => {
        if(item.open) document.querySelectorAll('.faq-item').forEach(other => {if(other !== item) other.open = false});
      }));
      let savedLanguage = 'en';
      try{savedLanguage = localStorage.getItem('glanz-language') || 'en'}catch(error){}
      setLanguage(savedLanguage);
      document.getElementById('year').textContent = new Date().getFullYear();
    