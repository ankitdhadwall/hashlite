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

      // Animate contact cards
      gsap.utils.toArray('.contact-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: 50,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out',
        });
      });

      // Animate form fields
      gsap.utils.toArray('.form-input').forEach((input, index) => {
        gsap.from(input, {
          scrollTrigger: {
            trigger: input,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.05,
          ease: 'power2.out',
        });
      });

      // Form submission handler
      document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        this.reset();
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
