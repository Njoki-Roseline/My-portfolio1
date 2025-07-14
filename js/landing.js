// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Preloader Animation
    const preloader = document.querySelector('.preloader');
    const nameParts = document.querySelectorAll('.name-part');
    
    // Set index for each name part for staggered animation
    nameParts.forEach((part, index) => {
        part.style.setProperty('--i', index);
    });
    
    // Hide preloader after animation completes
    const loadingDuration = 2.5; // Match this with CSS animation duration
    
    setTimeout(() => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'visible';
                // Start other animations after preloader
                initAnimations();
            }
        });
    }, (loadingDuration * 1000) + 500); // Add 500ms delay after loading bar completes
    
    // Typewriter effect
    function initTypewriter() {
        const texts = ['Frontend Developer', 'UI/UX Enthusiast', 'Creative Technologist', 'Web Developer'];
        let count = 0;
        let index = 0;
        let currentText = '';
        let isDeleting = false;
        let typeSpeed = 100; // Typing speed in ms
        let waitTime = 2000; // Time to wait before deleting
        let cursorVisible = true;
        
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.textContent = '|';
        
        const textElement = document.querySelector('.typewriter .line2');
        if (!textElement) return;
        
        // Add cursor after text
        textElement.parentNode.insertBefore(cursor, textElement.nextSibling);
        
        // Cursor blinking effect
        setInterval(() => {
            cursor.style.opacity = cursorVisible ? '0' : '1';
            cursorVisible = !cursorVisible;
        }, 500);
        
        function type() {
            // Get current text
            const current = count % texts.length;
            const fullText = texts[current];
            
            // Check if deleting
            if (isDeleting) {
                // Remove char
                currentText = fullText.substring(0, index - 1);
                index--;
                typeSpeed = 30; // Faster when deleting
            } else {
                // Add char
                currentText = fullText.substring(0, index + 1);
                index++;
                typeSpeed = Math.random() * 50 + 50; // Random typing speed for natural feel
            }
            
            // Update text
            textElement.textContent = currentText;
            
            // Position cursor
            cursor.style.marginLeft = '2px';
            
            // Check if word is complete
            if (!isDeleting && currentText === fullText) {
                // Pause at end of word
                typeSpeed = waitTime;
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                // Move to next word
                isDeleting = false;
                count++;
                typeSpeed = 500; // Pause before starting next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start the typewriter effect after a short delay
        setTimeout(type, 1000);
    }
    
    // Initialize all animations
    function initAnimations() {
        // Start typewriter effect
        initTypewriter();
        
        // Hero section animations
        const heroTl = gsap.timeline();
        
        heroTl.from('.glitch span', {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.1
        })
        .from('.typewriter .line', {
            width: 0,
            duration: 1,
            ease: 'power4.inOut',
            stagger: 0.3
        }, '-=0.8')
        .from('.hero-description', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.cta-buttons a', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.4')
        .from('.hero-image', {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.8')
        .from('.shape', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            stagger: 0.2
        }, '-=1');
        
        // Floating shapes animation
        gsap.to('.shape-1', {
            y: '20px',
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        gsap.to('.shape-2', {
            y: '-30px',
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.5
        });
        
        gsap.to('.shape-3', {
            y: '25px',
            duration: 4.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.8
        });
        
        // Glow effect on profile image
        setInterval(() => {
            gsap.to('.glow', {
                scale: 1.1,
                opacity: 0.6,
                duration: 1.5,
                repeat: 1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }, 3000);
        
        // Magnetic button effect
        const magneticButtons = document.querySelectorAll('[data-magnetic]');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / 10;
                const deltaY = (y - centerY) / 10;
                
                gsap.to(button, {
                    x: deltaX,
                    y: deltaY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
                // Custom cursor effect
                const cursor = document.querySelector('.cursor');
                cursor.classList.add('active');
                cursor.style.left = `${e.pageX}px`;
                cursor.style.top = `${e.pageY}px`;
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)'
                });
                
                // Reset cursor
                const cursor = document.querySelector('.cursor');
                cursor.classList.remove('active');
            });
        });
        
        // Custom cursor
        const cursor = document.querySelector('.cursor');
        const cursorInner = document.querySelector('.cursor-inner');
        
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            gsap.to(cursorInner, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: 'power2.out'
            });
        });
        
        // Hover effects for links
        const links = document.querySelectorAll('a:not([data-magnetic])');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorInner.textContent = link.getAttribute('data-cursor') || 'View';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorInner.textContent = '';
            });
        });
        
        // Scroll animations
        gsap.utils.toArray('[data-scroll]').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                delay: section.dataset.delay || 0
            });
        });
        
        // Update current year in footer
        document.querySelector('.current-year').textContent = new Date().getFullYear();
    }
    
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#6c63ff' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6c63ff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
