      // Hide page loader when DOM is ready
      window.addEventListener('load', function() {
        const loader = document.getElementById('page-loader');
        setTimeout(() => {
          loader.classList.add('hidden');
        }, 300);
      });

      // Cursor Glow Effect
      const cursorGlow = document.getElementById('cursor-glow');
      let mouseX = 0;
      let mouseY = 0;
      let glowX = 0;
      let glowY = 0;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.classList.add('active');
      });

      document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
      });

      function animateGlow() {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
      }
      animateGlow();

      // Mobile Menu Toggle
      const hamburgerBtn = document.getElementById('hamburger-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      
      if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('active');
          hamburgerBtn.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
          link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
          });
        });
      }

      // Portfolio Hero Slider
      (function () {
        const carousel = document.getElementById('pfCarousel');
        const list = document.getElementById('pfList');
        const nextBtn = document.querySelector('.pf-next');
        const prevBtn = document.querySelector('.pf-prev');
        const runningTime = document.getElementById('pfTimeRunning');

        if (!carousel || !list || !nextBtn || !prevBtn || !runningTime) return;

        const timeRunning = 1000;
        const timeAutoNext = 7000;
        let runTimeOut;
        let runNextAuto;

        function resetTimeAnimation() {
          runningTime.style.animation = 'none';
          runningTime.offsetHeight;
          runningTime.style.animation = null;
          runningTime.style.animation = 'pfRunningTime 7s linear 1 forwards';
        }

        function showSlider(type) {
          const sliderItemsDom = list.querySelectorAll('.pf-item');
          if (!sliderItemsDom.length) return;

          if (type === 'next') {
            list.appendChild(sliderItemsDom[0]);
            carousel.classList.add('next');
          } else {
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            carousel.classList.add('prev');
          }

          clearTimeout(runTimeOut);
          runTimeOut = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
          }, timeRunning);

          clearTimeout(runNextAuto);
          runNextAuto = setTimeout(() => {
            nextBtn.click();
          }, timeAutoNext);

          resetTimeAnimation();
        }

        nextBtn.addEventListener('click', () => showSlider('next'));
        prevBtn.addEventListener('click', () => showSlider('prev'));

        runNextAuto = setTimeout(() => {
          nextBtn.click();
        }, timeAutoNext);

        resetTimeAnimation();
      })();

      // Progress bar
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progress').style.width = scrolled + '%';
      });

      // GSAP Scroll Animations
      gsap.registerPlugin(ScrollTrigger);

      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
