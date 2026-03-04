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
      
      document.addEventListener("DOMContentLoaded", function () {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

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

        // WWD Duda-style indicator & scroll links
        const wwdSlideDivs = document.querySelectorAll('.wwd-slide');
        const wwdIndicatorDots = document.querySelectorAll('.wwd-indicator-dot');
        const wwdIndicatorList = document.getElementById('wwdIndicator');
        const wwdStageEl = document.getElementById('wwdStage');

        if (wwdSlideDivs.length && wwdIndicatorList && wwdStageEl) {

          // Show / hide the fixed indicator based on stage visibility
          const wwdStageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              wwdIndicatorList.classList.toggle('wwd-indicator--visible', entry.isIntersecting);
            });
          }, { threshold: 0.02 });
          wwdStageObserver.observe(wwdStageEl);

          // Highlight active dot as each slide scrolls into view
          const wwdDotObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              const idx = Number(entry.target.dataset.slideIndex);
              if (!isNaN(idx) && wwdIndicatorDots[idx]) {
                const dot = wwdIndicatorDots[idx];
                dot.classList.toggle('active', entry.isIntersecting);
                if (entry.isIntersecting) {
                  dot.style.background = entry.target.dataset.accent || '#111827';
                } else {
                  dot.style.background = 'rgba(0,0,0,0.18)';
                }
              }
            });
          }, { threshold: 0.55 });
          wwdSlideDivs.forEach((s) => wwdDotObserver.observe(s));

          // Indicator dot click → lenis scroll to slide
          wwdIndicatorDots.forEach((dot) => {
            dot.addEventListener('click', () => {
              const targetId = dot.dataset.target;
              const target = document.getElementById(targetId);
              if (target && lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
            });
          });

          // Scroll-link click → scroll to next slide
          document.querySelectorAll('.wwd-scroll-link').forEach((link) => {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              const targetId = link.getAttribute('href').replace('#', '');
              const target = document.getElementById(targetId);
              if (target && lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
            });
          });
        }

        // Progress bar
        function updateProgress() {
          const scrollTop = window.scrollY;
          const docHeight = document.body.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          document.getElementById("progress").style.width = scrollPercent + "%";
        }

        window.addEventListener("scroll", updateProgress);

        // Navbar backdrop on scroll
        function updateNavbar() {
          const navbar = document.getElementById("navbar");
          if (window.scrollY > 50) {
            // Scrolled down - show white sticky header
            navbar.style.backdropFilter = "blur(12px)";
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.borderBottom = "1px solid rgba(0, 0, 0, 0.1)";
            navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
          } else {
            // At top - show gradient background matching hero section
            navbar.style.backdropFilter = "blur(12px)";
            navbar.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.95) 25%, rgba(254, 243, 248, 0.95) 50%, rgba(247, 255, 230, 0.95) 75%, rgba(255, 255, 255, 0.95) 100%)";
            navbar.style.borderBottom = "1px solid transparent";
            navbar.style.boxShadow = "none";
          }
        }

        // Initialize navbar state and listen for scroll
        updateNavbar();
        window.addEventListener("scroll", updateNavbar);

        // Lenis Smooth Scroll
        var lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        gsap.registerPlugin(ScrollTrigger);

        const clientsDebounce = (func, timeout = 200) => {
          let timer;
          return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
              func(...args);
            }, timeout);
          };
        };

        const equalizeClientsCards = () => {
          const cards = document.querySelectorAll('.clients-equal-card');
          if (!cards.length) {
            return;
          }

          cards.forEach((card) => {
            card.style.minHeight = '';
          });

          if (window.innerWidth < 768) {
            return;
          }

          let maxHeight = 0;
          cards.forEach((card) => {
            maxHeight = Math.max(maxHeight, card.offsetHeight);
          });

          cards.forEach((card) => {
            card.style.minHeight = `${maxHeight}px`;
          });
        };

        const initClientsBackgroundLogos = () => {
          const logosContainer = document.querySelector('.clients-floating-logos');
          if (!logosContainer) {
            return;
          }

          const sourceLogos = Array.from(logosContainer.querySelectorAll('.clients-float-logo'));
          if (!sourceLogos.length) {
            return;
          }

          const logoSources = sourceLogos
            .map((logo) => logo.getAttribute('src'))
            .filter(Boolean);
          if (!logoSources.length) {
            return;
          }

          const randomBetween = (min, max) => (Math.random() * (max - min)) + min;

          const targetCount = Math.max(36, logoSources.length * 4);
          const denseSources = [];
          let previousSource = '';

          while (denseSources.length < targetCount) {
            const candidate = logoSources[Math.floor(Math.random() * logoSources.length)];
            if (logoSources.length > 1 && candidate === previousSource) {
              continue;
            }
            denseSources.push(candidate);
            previousSource = candidate;
          }

          logosContainer.innerHTML = '';

          const placedBySource = new Map();
          const placedAll = [];

          const distance = (a, b) => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            return Math.sqrt((dx * dx) + (dy * dy));
          };

          const pickPosition = (source) => {
            const sameList = placedBySource.get(source) || [];
            const minSameDistance = 24;
            const minAnyDistance = 9;

            for (let attempt = 0; attempt < 50; attempt++) {
              const candidate = {
                x: randomBetween(4, 94),
                y: randomBetween(4, 94),
              };

              const tooCloseSame = sameList.some((pos) => distance(pos, candidate) < minSameDistance);
              if (tooCloseSame) {
                continue;
              }

              const tooCloseAny = placedAll.some((pos) => distance(pos, candidate) < minAnyDistance);
              if (tooCloseAny) {
                continue;
              }

              return candidate;
            }

            return {
              x: randomBetween(6, 92),
              y: randomBetween(6, 92),
            };
          };

          const generatedLogos = denseSources.map((source, index) => {
            const logo = document.createElement('img');
            logo.className = 'clients-float-logo';
            logo.src = source;
            logo.alt = '';
            logo.loading = 'lazy';

            const position = pickPosition(source);

            logo.style.top = `${position.y}%`;
            logo.style.left = `${position.x}%`;
            logo.style.width = `${randomBetween(62, 132)}px`;

            if (!placedBySource.has(source)) {
              placedBySource.set(source, []);
            }
            placedBySource.get(source).push(position);
            placedAll.push(position);

            logosContainer.appendChild(logo);
            return { logo, index };
          });

          generatedLogos.forEach(({ logo, index }) => {
            const drift = () => {
              gsap.to(logo, {
                x: randomBetween(-120, 120),
                y: randomBetween(-90, 90),
                rotation: randomBetween(-18, 18),
                scale: randomBetween(0.86, 1.12),
                duration: randomBetween(10, 18),
                ease: 'sine.inOut',
                onComplete: drift,
              });
            };

            gsap.set(logo, {
              x: randomBetween(-70, 70),
              y: randomBetween(-50, 50),
              rotation: randomBetween(-8, 8),
              transformOrigin: 'center center',
            });

            setTimeout(drift, index * 150);
          });
        };

        if (!prefersReduced.matches) {
          initClientsBackgroundLogos();
        }

        equalizeClientsCards();
        window.addEventListener('resize', clientsDebounce(equalizeClientsCards, 150));

        // GSAP Animations (only if user doesn't prefer reduced motion)
        if (!prefersReduced.matches) {
          // Hero Section Advanced GSAP Animations
          
          // Animated gradient background blobs with parallax
          gsap.to('.floating-element', {
            y: '20%',
            x: '10%',
            rotation: 15,
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            }
          });

          gsap.to('.floating-slow', {
            y: '-15%',
            x: '-5%',
            rotation: -10,
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 2,
            }
          });

          // Badge entrance with elastic bounce
          gsap.from('.glassy-badge', {
            scale: 0,
            opacity: 0,
            rotation: -180,
            duration: 1.2,
            ease: 'elastic.out(1, 0.6)',
            delay: 0.2,
          });

          // Brand name reveal with gradient shimmer
          gsap.from('.hero-brand-name', {
            opacity: 0,
            y: -30,
            scale: 0.8,
            duration: 1,
            ease: 'back.out(1.4)',
            delay: 0.5,
          });

          // Hero headline: clean cinematic reveal
          const heroHeadline = document.querySelector('#heroHeadline');
          const split = new SplitType(heroHeadline, { types: 'words' });

          gsap.set(split.words, {
            opacity: 0,
            yPercent: 55,
            filter: 'blur(8px)',
            willChange: 'transform, opacity, filter',
          });

          gsap.to(split.words, {
            opacity: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            stagger: 0.045,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.65,
            clearProps: 'willChange',
          });

          // Subtle emphasis reveal for highlighted words
          gsap.fromTo(
            '#heroHeadline span[style*="color"]',
            {
              opacity: 0,
              y: 14,
              filter: 'blur(4px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              stagger: 0.08,
              duration: 0.65,
              ease: 'power2.out',
              delay: 1.05,
            }
          );

          // Subtitle fade up
          gsap.from('#hero p.text-lg', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out',
            delay: 1.8,
          });

          // Buttons entrance with stagger
          const heroButtons = gsap.utils.toArray('#hero .magnetic-button');
          gsap.from(heroButtons, {
            scale: 0.8,
            opacity: 0,
            y: 40,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.5)',
            delay: 2.2,
          });

          // Feature cards stagger animation
          const heroCards = gsap.utils.toArray('.hero-card-hover');
          gsap.from(heroCards, {
            opacity: 0,
            y: 60,
            scale: 0.9,
            rotationY: -30,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            delay: 2.5,
            scrollTrigger: {
              trigger: '.hero-cards',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          });

          // Add 3D tilt effect on hero cards hover
          heroCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                scale: 1.05,
                rotationY: 5,
                rotationX: 5,
                duration: 0.4,
                ease: 'power2.out',
              });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                scale: 1,
                rotationY: 0,
                rotationX: 0,
                duration: 0.4,
                ease: 'power2.out',
              });
            });

            // Mouse move tilt effect
            card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 10;
              const rotateY = (centerX - x) / 10;

              gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                ease: 'power1.out',
              });
            });
          });

          // Magnetic button effect
          const magneticButtons = gsap.utils.toArray('.magnetic-button');
          magneticButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
              gsap.to(button, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out',
              });
            });

            button.addEventListener('mouseleave', () => {
              gsap.to(button, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
              });
            });

            button.addEventListener('mousemove', (e) => {
              const rect = button.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;

              gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          });

          // Continuous pulse animation on badge
          gsap.to('.glassy-badge', {
            scale: 1.05,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });

          // Background Particles Animation
          const particles = gsap.utils.toArray('.particle');
          particles.forEach((particle, i) => {
            // Random floating animation for each particle
            gsap.to(particle, {
              y: `random(-100, 100)`,
              x: `random(-50, 50)`,
              rotation: `random(-180, 180)`,
              scale: `random(0.5, 1.5)`,
              duration: `random(3, 6)`,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.2,
            });

            // Fade in/out animation
            gsap.to(particle, {
              opacity: `random(0.2, 0.7)`,
              duration: `random(2, 4)`,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
              delay: i * 0.3,
            });
          });

          // Geometric Shapes Animation
          const shapes = [
            { el: '.shape-circle', rotation: 360, duration: 20 },
            { el: '.shape-triangle', rotation: -360, duration: 25 },
            { el: '.shape-square', rotation: 360, duration: 18 },
            { el: '.shape-hexagon', rotation: -360, duration: 22 }
          ];

          shapes.forEach(shape => {
            // Rotation animation
            gsap.to(shape.el, {
              rotation: shape.rotation,
              duration: shape.duration,
              repeat: -1,
              ease: 'none',
            });

            // Scale pulse
            gsap.to(shape.el, {
              scale: 1.2,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });

            // Float animation
            gsap.to(shape.el, {
              y: '30',
              x: '20',
              duration: 5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          });

          // Enhanced blob morphing effect
          gsap.to('.floating-element', {
            scale: 1.3,
            opacity: 0.5,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: {
              each: 1,
              repeat: -1,
            }
          });

          gsap.to('.floating-slow', {
            scale: 1.2,
            opacity: 0.4,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          // SaaS Marketing Icons Animation
          const saasIcons = gsap.utils.toArray('.saas-icon');
          saasIcons.forEach((icon, i) => {
            // Floating animation
            gsap.to(icon, {
              y: `random(-80, 80)`,
              x: `random(-40, 40)`,
              rotation: `random(-20, 20)`,
              duration: `random(4, 7)`,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.3,
            });

            // Scale pulse
            gsap.to(icon, {
              scale: `random(1.1, 1.3)`,
              duration: `random(2, 3)`,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.2,
            });

            // Opacity fade
            gsap.to(icon, {
              opacity: `random(0.3, 0.6)`,
              duration: `random(2.5, 4)`,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
              delay: i * 0.4,
            });
          });

          // Data Streams Animation
          const dataStreams = gsap.utils.toArray('.data-stream');
          dataStreams.forEach((stream, i) => {
            // Vertical scrolling effect
            gsap.to(stream, {
              y: 100,
              opacity: 0,
              duration: `random(3, 5)`,
              repeat: -1,
              ease: 'none',
              delay: i * 0.5,
            });

            // Horizontal drift
            gsap.to(stream, {
              x: `random(-30, 30)`,
              duration: `random(4, 6)`,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.3,
            });
          });

          // Metric Boxes Animation
          const metricBoxes = gsap.utils.toArray('.metric-box');
          metricBoxes.forEach((box, i) => {
            // Entrance animation
            gsap.from(box, {
              scale: 0,
              opacity: 0,
              duration: 1,
              ease: 'back.out(1.7)',
              delay: 2.5 + (i * 0.3),
            });

            // Floating animation
            gsap.to(box, {
              y: -20,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.5,
            });

            // Subtle rotation
            gsap.to(box, {
              rotation: 3,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.4,
            });

            // Pulse effect
            gsap.to(box, {
              scale: 1.05,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.6,
            });

            // Number counter animation
            const numberEl = box.querySelector('div:last-child');
            if (numberEl) {
              gsap.to(numberEl, {
                color: '#000',
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                delay: i * 0.8,
              });
            }
          });


          // Anime.js for feature cards with advanced effects
          anime({
            targets: '.hero-cards > div',
            translateY: [60, 0],
            opacity: [0, 1],
            scale: [0.8, 1],
            rotateZ: [-5, 0],
            delay: anime.stagger(150, {start: 1800}),
            duration: 1200,
            easing: 'spring(1, 80, 10, 0)',
          });

          // Anime.js for buttons with hover effect
          const buttons = document.querySelectorAll('.mt-10 a');
          buttons.forEach((button, index) => {
            anime({
              targets: button,
              translateY: [30, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
              delay: 1500 + (index * 100),
              duration: 800,
              easing: 'easeOutElastic(1, .8)',
            });

            // Hover animation with anime.js
            button.addEventListener('mouseenter', () => {
              anime({
                targets: button,
                scale: 1.05,
                translateY: -5,
                duration: 300,
                easing: 'easeOutQuad',
              });
            });

            button.addEventListener('mouseleave', () => {
              anime({
                targets: button,
                scale: 1,
                translateY: 0,
                duration: 300,
                easing: 'easeOutQuad',
              });
            });
          });

          // Anime.js continuous floating animation for cards
          anime({
            targets: '.hero-cards > div',
            translateY: [-10, 10],
            duration: 3000,
            loop: true,
            direction: 'alternate',
            delay: anime.stagger(200),
            easing: 'easeInOutSine',
          });

          // Card hover effect with anime.js
          const cards = document.querySelectorAll('.hero-cards > div');
          cards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
              anime({
                targets: card,
                scale: 1.08,
                translateY: -15,
                duration: 400,
                easing: 'easeOutCubic',
              });
            });

            card.addEventListener('mouseleave', () => {
              anime({
                targets: card,
                scale: 1,
                translateY: 0,
                duration: 400,
                easing: 'easeOutCubic',
              });
            });
          });

          // Who We Are Section Animations
          // GSAP for heading with split text
          const whoHeading = document.querySelector('#whoHeading');
          if (whoHeading) {
            const whoSplit = new SplitType(whoHeading, { types: 'words, chars' });
            
            gsap.from(whoSplit.chars, {
              scrollTrigger: {
                trigger: '#who-we-are',
                start: 'top 80%',
              },
              opacity: 0,
              y: 30,
              rotateX: -45,
              stagger: 0.03,
              duration: 0.8,
              ease: 'back.out(1.5)',
            });
          }

          // Animate tagline
          gsap.from('.who-tagline', {
            scrollTrigger: {
              trigger: '#who-we-are',
              start: 'top 80%',
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
          });

          // Trigger content animation on scroll
          const whoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                anime({
                  targets: '.who-content > p',
                  translateX: [-50, 0],
                  opacity: [0, 1],
                  delay: anime.stagger(150, {start: 200}),
                  duration: 1000,
                  easing: 'easeOutExpo',
                });
                whoObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.2 });
          
          const whoContent = document.querySelector('.who-content');
          if (whoContent) {
            whoObserver.observe(whoContent);
          }

          // Anime.js for visual cards with stagger and bounce
          const whoCardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                anime({
                  targets: '.who-card',
                  translateY: [60, 0],
                  opacity: [0, 1],
                  scale: [0.8, 1],
                  rotate: [10, 0],
                  delay: anime.stagger(120, {start: 300}),
                  duration: 1200,
                  easing: 'spring(1, 70, 10, 0)',
                });
                whoCardsObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.2 });
          
          const whoVisual = document.querySelector('.who-visual');
          if (whoVisual) {
            whoCardsObserver.observe(whoVisual);
          }

          // Continuous floating animation for who cards
          anime({
            targets: '.who-card',
            translateY: [-8, 8],
            duration: 2500,
            loop: true,
            direction: 'alternate',
            delay: anime.stagger(150),
            easing: 'easeInOutSine',
          });

          // Hover effect for who cards
          const whoCards = document.querySelectorAll('.who-card');
          whoCards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
              anime({
                targets: card,
                scale: 1.1,
                translateY: -10,
                duration: 400,
                easing: 'easeOutCubic',
              });
            });

            card.addEventListener('mouseleave', () => {
              anime({
                targets: card,
                scale: 1,
                translateY: 0,
                duration: 400,
                easing: 'easeOutCubic',
              });
            });
          });

          // Highlight box animation
          const highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                anime({
                  targets: '.who-highlight',
                  translateX: [-50, 0],
                  opacity: [0, 1],
                  scale: [0.95, 1],
                  delay: 600,
                  duration: 1000,
                  easing: 'easeOutExpo',
                });
                highlightObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.2 });
          
          const whoHighlight = document.querySelector('.who-highlight');
          if (whoHighlight) {
            highlightObserver.observe(whoHighlight);
          }

          // What We Do Section Animations — Duda-style

          // Heading + tagline entrance
          const whatHeading = document.querySelector('#whatHeading');
          if (whatHeading) {
            const whatSplit = new SplitType(whatHeading, { types: 'words, chars' });
            gsap.from(whatSplit.chars, {
              scrollTrigger: { trigger: '.wwd-header-wrap', start: 'top 85%' },
              opacity: 0,
              y: 40,
              rotateX: -45,
              stagger: 0.02,
              duration: 0.9,
              ease: 'back.out(1.5)',
            });
          }
          gsap.from('.what-tagline', {
            scrollTrigger: { trigger: '.wwd-header-wrap', start: 'top 85%' },
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'power2.out',
          });

          // Per-slide entrance animations
          document.querySelectorAll('.wwd-slide').forEach((slide) => {
            const lineInners = slide.querySelectorAll('.wwd-title-line-inner');
            const textBlock  = slide.querySelector('.wwd-text-block');
            const scrollLink = slide.querySelector('.wwd-scroll-link');
            const scrollLine = slide.querySelector('.wwd-scroll-line');

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: slide,
                start: '40% 55%',
              }
            });

            tl.from(lineInners, {
              y: 220,
              duration: 2,
              ease: 'power4',
              stagger: 0.12,
            })
            .from(textBlock, {
              x: 100,
              opacity: 0,
              duration: 2,
              ease: 'power4',
            }, 0.35)
            .from(scrollLink, {
              y: 200,
              duration: 3,
              ease: 'power4',
            }, 0.35);

            if (scrollLine) {
              tl.to(scrollLine, {
                scaleY: 0.6,
                transformOrigin: 'bottom left',
                duration: 2.5,
                ease: 'elastic(1, 0.5)',
              }, 1.4);
            }
          });

          // Parallax on right-column images
          document.querySelectorAll('.wwd-slide').forEach((slide) => {
            const imageWrap = slide.querySelector('.wwd-col-right-inner');
            if (!imageWrap) return;
            gsap.fromTo(imageWrap,
              { y: '-30vh' },
              {
                y: '30vh',
                ease: 'none',
                scrollTrigger: {
                  trigger: slide,
                  scrub: true,
                  start: 'top bottom',
                }
              }
            );
          });

          // Scroll-link hover effects
          document.querySelectorAll('.wwd-scroll-link').forEach((link) => {
            const line = link.querySelector('.wwd-scroll-line');
            if (!line) return;
            link.addEventListener('mouseover', () => {
              gsap.to(line, { y: 40, transformOrigin: 'bottom center', duration: 0.6, ease: 'power4' });
            });
            link.addEventListener('mouseout', () => {
              gsap.to(line, { y: 0, transformOrigin: 'bottom center', duration: 0.6, ease: 'power4' });
            });
          });

          // Growth Stage Section Animations
          const growthHeading = document.querySelector('#growthHeading');
          if (growthHeading) {
            const growthSplit = new SplitType(growthHeading, { types: 'words, chars' });
            gsap.from(growthSplit.chars, {
              scrollTrigger: { trigger: '#growth-stage', start: 'top 80%' },
              opacity: 0, y: 30, rotateX: -45, stagger: 0.02, duration: 0.8, ease: 'back.out(1.5)',
            });
          }
          gsap.from('.growth-tagline', {
            scrollTrigger: { trigger: '#growth-stage', start: 'top 80%' },
            opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
          });
          gsap.from('#growth-stage .flex-auto.border-2', {
            scrollTrigger: { trigger: '#growth-stage', start: 'top 70%' },
            opacity: 0, y: 50, stagger: 0.2, duration: 1, ease: 'power3.out',
          });

          // Why HashLite Section Animations
          // GSAP for heading
          const whyHeading = document.querySelector('#whyHeading');
          if (whyHeading) {
            const whySplit = new SplitType(whyHeading, { types: 'words, chars' });
            
            gsap.from(whySplit.chars, {
              scrollTrigger: {
                trigger: '#why-hashlite',
                start: 'top 80%',
              },
              opacity: 0,
              y: 30,
              rotateX: -45,
              stagger: 0.02,
              duration: 0.8,
              ease: 'back.out(1.5)',
            });
          }

          // Animate tagline and subtitle
          gsap.from('.why-tagline', {
            scrollTrigger: {
              trigger: '#why-hashlite',
              start: 'top 80%',
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.from('.why-subtitle', {
            scrollTrigger: {
              trigger: '#why-hashlite',
              start: 'top 80%',
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.3,
            ease: 'power2.out',
          });

          // Animate timeline line draw-in
          gsap.from('.timeline-line', {
            scrollTrigger: {
              trigger: '.timeline-line',
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
            scaleY: 0,
            transformOrigin: 'top center',
            ease: 'none',
          });

          // Animate timeline items with stagger
          const timelineItems = gsap.utils.toArray('.timeline-item');
          timelineItems.forEach((item, index) => {
            const content = item.querySelector('.timeline-content');
            const dot = item.querySelector('.timeline-dot');
            const connector = item.querySelector('.timeline-connector');
            
            // Determine animation direction based on position (left or right)
            const isRight = index % 2 === 0;
            
            // Animate dot
            gsap.from(dot, {
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              scale: 0,
              opacity: 0,
              duration: 0.3,
              ease: 'back.out(2)',
            });

            // Animate connector line
            gsap.from(connector, {
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              scaleX: 0,
              transformOrigin: isRight ? 'left center' : 'right center',
              duration: 0.35,
              delay: 0.1,
              ease: 'power2.out',
            });

            // Animate content box with slide and fade
            gsap.from(content, {
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              x: isRight ? 100 : -100,
              opacity: 0,
              duration: 0.4,
              delay: 0.15,
              ease: 'power3.out',
            });

            // Hover effect for content
            content.addEventListener('mouseenter', () => {
              gsap.to(content, {
                y: -12,
                scale: 1.03,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                duration: 0.4,
                ease: 'power2.out',
              });
            });

            content.addEventListener('mouseleave', () => {
              gsap.to(content, {
                y: 0,
                scale: 1,
                boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
                duration: 0.4,
                ease: 'power2.out',
              });
            });
          });

          // Animate bottom statement
          gsap.from('.why-statement > div', {
            scrollTrigger: {
              trigger: '.why-statement',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            scale: 0.9,
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
          });

          // Who We Work With Section Animations
          // GSAP for heading
          const clientsHeading = document.querySelector('#clientsHeading');
          if (clientsHeading) {
            const clientsSplit = new SplitType(clientsHeading, { types: 'words, chars' });
            
            gsap.from(clientsSplit.chars, {
              scrollTrigger: {
                trigger: '#who-we-work-with',
                start: 'top 80%',
              },
              opacity: 0,
              y: 30,
              rotateX: -45,
              stagger: 0.02,
              duration: 0.8,
              ease: 'back.out(1.5)',
            });
          }

          // Animate tagline
          gsap.from('.clients-tagline', {
            scrollTrigger: {
              trigger: '#who-we-work-with',
              start: 'top 80%',
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
          });

          // Anime.js for client cards
          const clientCardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Removed - using GSAP for GTM cards instead
                clientCardsObserver.disconnect();
              }
            });
          }, { threshold: 0.2 });

          // Animate GTM cards from different directions with tilt
          const gtmCards = gsap.utils.toArray('.gtm-card');
          gtmCards.forEach((card) => {
            const direction = card.getAttribute('data-direction');
            let fromVars = { opacity: 0, duration: 1.2, ease: 'power3.out' };
            
            switch(direction) {
              case 'left':
                fromVars.x = -200;
                fromVars.rotation = -8;
                break;
              case 'right':
                fromVars.x = 200;
                fromVars.rotation = 8;
                break;
              case 'top':
                fromVars.y = -200;
                fromVars.rotation = -5;
                break;
              case 'bottom':
                fromVars.y = 200;
                fromVars.rotation = 5;
                break;
            }
            
            gsap.from(card, {
              scrollTrigger: {
                trigger: '#who-we-work-with',
                start: 'top 70%',
              },
              ...fromVars,
              delay: direction === 'left' ? 0.3 : 0.6,
            });
            
            // 3D Mouse tilt effect on hover
            card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -12;
              const rotateY = ((x - centerX) / centerX) * 12;
              
              gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.03,
                duration: 0.3,
                transformPerspective: 1000,
                ease: 'power2.out',
              });
            });
            
            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
              });
            });
          });

          // Animate quotes
          const gtmQuotes = gsap.utils.toArray('.gtm-quote');
          gtmQuotes.forEach((quote, index) => {
            const direction = quote.getAttribute('data-direction');
            let fromVars = { opacity: 0, duration: 1, ease: 'power2.out' };
            
            switch(direction) {
              case 'left':
                fromVars.x = -100;
                break;
              case 'right':
                fromVars.x = 100;
                break;
              case 'top':
                fromVars.y = -100;
                break;
              case 'bottom':
                fromVars.y = 100;
                break;
            }
            
            gsap.from(quote, {
              scrollTrigger: {
                trigger: '#who-we-work-with',
                start: 'top 70%',
              },
              ...fromVars,
              delay: 0.9 + (index * 0.2),
            });
          });

          const clientsGrid = document.querySelector('.clients-grid');
          if (clientsGrid) {
            clientCardsObserver.observe(clientsGrid);
          }

          // Hover effect for client cards (legacy - keeping for compatibility)
          const clientCards = document.querySelectorAll('.client-card');
          clientCards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
              anime({
                targets: card,
                translateY: -10,
                scale: 1.05,
                duration: 400,
                easing: 'easeOutCubic',
              });
            });

            card.addEventListener('mouseleave', () => {
              anime({
                targets: card,
                translateY: 0,
                scale: 1,
                duration: 400,
                easing: 'easeOutCubic',
              });
            });
          });

          // Animate clients statement
          const clientsStatementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                anime({
                  targets: '.clients-statement > div',
                  scale: [0.9, 1],
                  opacity: [0, 1],
                  duration: 1000,
                  easing: 'easeOutExpo',
                });
                clientsStatementObserver.disconnect();
              }
            });
          }, { threshold: 0.3 });
          
          const clientsStatement = document.querySelector('.clients-statement');
          if (clientsStatement) {
            clientsStatementObserver.observe(clientsStatement);
          }

          // Our Philosophy Section Animations
          // Animate tagline
          gsap.from('.philosophy-tagline', {
            scrollTrigger: {
              trigger: '#our-philosophy',
              start: 'top 80%',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
          });

          // Animate philosophy statements
          const philosophyStatements = document.querySelectorAll('.philosophy-statement');
          philosophyStatements.forEach((statement, index) => {
            gsap.from(statement, {
              scrollTrigger: {
                trigger: statement,
                start: 'top 85%',
              },
              opacity: 0,
              y: 50,
              scale: 0.95,
              duration: 1.2,
              delay: index * 0.3,
              ease: 'power3.out',
            });
          });

          // Animate gradient text highlight
          gsap.from('.philosophy-highlight', {
            scrollTrigger: {
              trigger: '.philosophy-highlight',
              start: 'top 85%',
            },
            backgroundPosition: '200% center',
            duration: 1.5,
            ease: 'power2.out',
          });

          // Animate decorative dots
          const philosophyDecoration = document.querySelector('.philosophy-decoration');
          if (philosophyDecoration) {
            gsap.from('.philosophy-decoration > div', {
              scrollTrigger: {
                trigger: philosophyDecoration,
                start: 'top 90%',
              },
              scale: 0,
              opacity: 0,
              stagger: 0.15,
              duration: 0.6,
              ease: 'back.out(2)',
            });
          }

          // Final CTA Section Animations
          // GSAP for heading with split text
          const ctaHeading = document.querySelector('#ctaHeading');
          if (ctaHeading) {
            const ctaSplit = new SplitType(ctaHeading, { types: 'words, chars' });
            
            gsap.from(ctaSplit.chars, {
              scrollTrigger: {
                trigger: '#final-cta',
                start: 'top 80%',
              },
              opacity: 0,
              y: 30,
              rotateX: -45,
              stagger: 0.015,
              duration: 0.8,
              ease: 'back.out(1.5)',
            });
          }

          // Anime.js for CTA buttons
          const ctaButtonsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                anime({
                  targets: '.cta-button',
                  translateY: [60, 0],
                  opacity: [0, 1],
                  scale: [0.9, 1],
                  delay: anime.stagger(150, {start: 400}),
                  duration: 1000,
                  easing: 'easeOutExpo',
                });
                ctaButtonsObserver.disconnect();
              }
            });
          }, { threshold: 0.3 });
          
          const ctaButtons = document.querySelector('.cta-buttons');
          if (ctaButtons) {
            ctaButtonsObserver.observe(ctaButtons);
          }

          // Hover effects for CTA buttons with anime.js
          const allCtaButtons = document.querySelectorAll('.cta-button');
          allCtaButtons.forEach((button) => {
            button.addEventListener('mouseenter', () => {
              anime({
                targets: button,
                scale: 1.08,
                translateY: -8,
                duration: 400,
                easing: 'easeOutCubic',
              });
            });

            button.addEventListener('mouseleave', () => {
              anime({
                targets: button,
                scale: 1,
                translateY: 0,
                duration: 400,
                easing: 'easeOutCubic',
              });
            });
          });

          // Animate subtext
          gsap.from('.cta-subtext', {
            scrollTrigger: {
              trigger: '.cta-subtext',
              start: 'top 90%',
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out',
          });
        }

        prefersReduced.addEventListener("change", () => {
          window.location.reload();
        });
      }); // End DOMContentLoaded
