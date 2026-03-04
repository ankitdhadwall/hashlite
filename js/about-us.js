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

      // Progress bar
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progress').style.width = scrolled + '%';
      });

      // GSAP Scroll Animations
      gsap.registerPlugin(ScrollTrigger);

      // Animate process steps
      gsap.utils.toArray('.process-step').forEach((step, index) => {
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out',
        });
      });

      // Animate service categories
      gsap.utils.toArray('.service-category').forEach((category, index) => {
        gsap.from(category, {
          scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power2.out',
        });
      });

      // Animate stats
      gsap.utils.toArray('.stat-card').forEach((stat, index) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'back.out(2)',
        });
      });

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
