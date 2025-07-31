// script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Global Element References ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.getElementById('main-nav');
    const navBrandName = nav ? nav.querySelector('.nav-brand') : null; // Get the "Hatem Samad" brand name link
    const heroDescription = document.getElementById('heroDescription');
    const viewWorkButton = document.getElementById('viewWorkButton');
    const experienceSection = document.getElementById('experience');
    const projectsSectionEl = document.getElementById('projects');
    const resumeButton = document.getElementById('resume-button');
    const fixedHeroContent = document.getElementById('fixedHeroContent');
    const heroBackground = document.getElementById('heroBackground');
    const hatemPic = fixedHeroContent ? fixedHeroContent.querySelector('img[alt="Hatem Samad Transparent"]') : null;
    const paperAirplane1 = document.getElementById('paper-airplane');
    const paperAirplane2 = document.getElementById('paper-airplane-2');
    const backToTopButton = document.getElementById('backToTopButton'); // Back to Top Button reference

    // Slider elements
    const sliderWrapper = document.getElementById('projects-slider-wrapper');
    const sliderPrevBtn = document.getElementById('slider-prev');
    const sliderNextBtn = document.getElementById('slider-next');
    const sliderPagination = document.getElementById('slider-pagination');
    let slides = []; // Will be populated after DOM is ready
    let currentSlideIndex = 0;
    let startX = 0;
    let endX = 0;

    // --- Mobile Menu Toggle Logic ---
    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('is-open'); // Add class to show menu
            // When mobile menu is open, ensure the nav is visible (in its current state)
            if (nav) nav.classList.remove('hidden-nav');
        });

        closeMobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('is-open'); // Remove class to hide menu
            // After closing mobile menu, if not at top, hide nav after a short delay
            if (window.scrollY > 0 && nav) {
                scrollTimeoutId = setTimeout(hideNavCompletely, 500); // Short delay for hiding after menu close
            }
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('is-open');
                if (window.scrollY > 0 && nav) {
                    scrollTimeoutId = setTimeout(hideNavCompletely, 500);
                }
            });
        });
    }

    // --- Navigation Bar Hide/Show and Resize/Reposition Logic ---
    let lastScrollY = window.scrollY;
    let scrollTimeoutId = null;
    const scrollThreshold = 50; // How many pixels to scroll before action

    // Function to apply the full-size navigation bar state
    function applyFullNavState() {
        if (!nav) return;
        nav.classList.remove('hidden-nav'); // Only remove hidden-nav
        // Ensure text size for links reverts to default if needed
        nav.querySelectorAll('a').forEach(link => {
            link.style.fontSize = ''; // Remove inline style
        });
        if (navBrandName) {
            navBrandName.style.display = 'flex'; // Show "Hatem Samad"
        }
    }

    // Function to completely hide the navigation bar (now only fades)
    function hideNavCompletely() {
        if (!nav) return;
        nav.classList.add('hidden-nav');
    }

    // Initial state setup on page load
    if (nav) {
        if (lastScrollY === 0) {
            applyFullNavState();
        } else {
            hideNavCompletely(); // Start hidden if not at top
        }
    }

    // --- Hero Section Text/Button Fade Logic ---
    // Set initial state for hero description and button (visible)
    if (heroDescription) heroDescription.classList.add('fade-in');
    if (viewWorkButton) viewWorkButton.classList.add('fade-in');

    // Click event for "View My Work" button
    if (viewWorkButton) {
        viewWorkButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            // Hide hero description and button
            if (heroDescription) heroDescription.classList.remove('fade-in');
            if (viewWorkButton) viewWorkButton.classList.remove('fade-in');
            if (heroDescription) heroDescription.classList.add('fade-out');
            if (viewWorkButton) viewWorkButton.classList.add('fade-out');

            // Scroll to the experience section
            if (experienceSection) {
                experienceSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- Overlap Check Functions for Nav and Buttons ---
    function checkResumeButtonOverlap() {
        if (!resumeButton || !experienceSection || !projectsSectionEl) {
            return;
        }

        const resumeButtonRect = resumeButton.getBoundingClientRect();
        const experienceSectionRect = experienceSection.getBoundingClientRect();
        const projectsSectionElRect = projectsSectionEl.getBoundingClientRect();

        const overlapsExperience = (
            resumeButtonRect.bottom > experienceSectionRect.top &&
            resumeButtonRect.top < experienceSectionRect.bottom
        );
        const overlapsProjects = (
            resumeButtonRect.bottom > projectsSectionElRect.top &&
            resumeButtonRect.top < projectsSectionElRect.bottom
        );

        if (overlapsExperience || overlapsProjects) {
            resumeButton.classList.add('dark-state');
        } else {
            resumeButton.classList.remove('dark-state');
        }
    }

    function checkNavBarOverlap() {
        if (!nav || !experienceSection || !projectsSectionEl) {
            return;
        }

        const navRect = nav.getBoundingClientRect();
        const experienceSectionRect = experienceSection.getBoundingClientRect();
        const projectsSectionElRect = projectsSectionEl.getBoundingClientRect();

        const overlapsExperience = (
            navRect.bottom > experienceSectionRect.top &&
            navRect.top < experienceSectionRect.bottom
        );
        const overlapsProjects = (
            navRect.bottom > projectsSectionElRect.top &&
            navRect.top < projectsSectionElRect.bottom
        );

        const isOverlapping = overlapsExperience || overlapsProjects;

        if (isOverlapping) {
            nav.classList.add('nav-dark-state');
        } else {
            nav.classList.remove('nav-dark-state');
        }
    }

    function checkBackToTopButtonOverlap() {
        if (!backToTopButton || !experienceSection || !projectsSectionEl) {
            return;
        }

        const buttonRect = backToTopButton.getBoundingClientRect();
        const experienceSectionRect = experienceSection.getBoundingClientRect();
        const projectsSectionElRect = projectsSectionEl.getBoundingClientRect();

        const overlapsExperience = (
            buttonRect.bottom > experienceSectionRect.top &&
            buttonRect.top < experienceSectionRect.bottom
        );
        const overlapsProjects = (
            buttonRect.bottom > projectsSectionElRect.top &&
            buttonRect.top < projectsSectionElRect.bottom
        );

        if (overlapsExperience || overlapsProjects) {
            backToTopButton.classList.add('dark-state');
        } else {
            backToTopButton.classList.remove('dark-state');
        }
    }

    // --- Paper Airplane Scroll Animation Logic ---
    if (experienceSection && paperAirplane1 && paperAirplane2) {
        window.addEventListener('scroll', function() {
            const sectionRect = experienceSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate scroll progress within the experience section
            // 0 when the top of the section enters the viewport
            // 1 when the bottom of the section leaves the viewport
            const scrollStart = experienceSection.offsetTop - viewportHeight;
            const scrollEnd = experienceSection.offsetTop + experienceSection.offsetHeight;
            let scrollProgress = (window.scrollY - scrollStart) / (scrollEnd - scrollStart);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress)); // Clamp between 0 and 1

            const planeSize = 200; // Increased size of both airplanes
            paperAirplane1.style.width = `${planeSize}px`;
            paperAirplane1.style.height = `${planeSize}px`;
            paperAirplane2.style.width = `${planeSize}px`;
            paperAirplane2.style.height = `${planeSize}px`;

            const sectionWidth = experienceSection.offsetWidth;
            const sectionHeight = experienceSection.offsetHeight;

            // --- Logic for Paper Airplane 1 (Right to Left, -45deg tilt, flipped) ---
            // Starts off-screen right, moves across to off-screen left
            const startX1 = sectionWidth + 100; // Start further off-screen right
            const endX1 = -planeSize - 100; // End further off-screen left
            const startY1 = 50; // Fixed Y position relative to section top
            const endY1 = 50 + (sectionHeight * 0.1); // Slight diagonal down

            let currentX1 = startX1 + (endX1 - startX1) * scrollProgress;
            let currentY1 = startY1 + (endY1 - startY1) * scrollProgress;

            const fixedRotationZ1 = -45; // Downward tilt for right-to-left movement
            const flipY1 = 180; // Horizontal flip to make it face left
            paperAirplane1.style.transform = `translate(${currentX1}px, ${currentY1}px) rotateY(${flipY1}deg) rotateZ(${fixedRotationZ1}deg)`;

            // --- Logic for Paper Airplane 2 (Left to Right, -45deg tilt, slightly offset) ---
            // Starts off-screen left, moves to the right edge
            const startX2 = -planeSize * 2; // Start further left for a staggered effect and slower perceived speed
            const endX2 = sectionWidth + planeSize; // End further right
            const startY2 = sectionHeight * 0.4; // Raised up
            const endY2 = sectionHeight * 0.4 + (sectionHeight * 0.15); // Slight diagonal down

            let currentX2 = startX2 + (endX2 - startX2) * scrollProgress;
            let currentY2 = startY2 + (endY2 - startY2) * scrollProgress;

            const fixedRotationZ2 = -45; // Downward tilt
            const flipY2 = 180; // Horizontal flip (180 degrees around Y-axis) to make it face right
            paperAirplane2.style.transform = `translate(${currentX2}px, ${currentY2}px) rotateY(${flipY2}deg) rotateZ(${fixedRotationZ2}deg)`;
        });

        // Trigger scroll event once on load to set initial position
        window.dispatchEvent(new Event('scroll'));
    }

    // --- Motion Blur Effect for Sections and Hero Content Visibility ---
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        const heroSectionHeight = window.innerHeight; // Assuming hero section is 100vh

        // Clear any existing timeout for hiding the nav
        clearTimeout(scrollTimeoutId);

        // Nav bar logic
        if (currentScrollY === 0) {
            applyFullNavState();
            // Show hero description and button when at the very top
            if (heroDescription) heroDescription.classList.remove('fade-out');
            if (viewWorkButton) viewWorkButton.classList.remove('fade-out');
            if (heroDescription) heroDescription.classList.add('fade-in');
            if (viewWorkButton) viewWorkButton.classList.add('fade-in');
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up, remove hidden-nav to fade in
            nav.classList.remove('hidden-nav');
            // Show hero description and button when scrolling up from hero section
            if (currentScrollY < heroSectionHeight) {
                if (heroDescription) heroDescription.classList.remove('fade-out');
                if (viewWorkButton) viewWorkButton.classList.remove('fade-out');
                if (heroDescription) heroDescription.classList.add('fade-in');
                if (viewWorkButton) viewWorkButton.classList.add('fade-in');
            }
        } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Scrolling down, add hidden-nav to fade out
            nav.classList.add('hidden-nav');
            // Hide hero description and button when scrolling down past hero section
            if (currentScrollY >= heroSectionHeight) {
                if (heroDescription) heroDescription.classList.remove('fade-in');
                if (viewWorkButton) viewWorkButton.classList.remove('fade-in');
                if (heroDescription) heroDescription.classList.add('fade-out');
                if (viewWorkButton) viewWorkButton.classList.add('fade-out');
            }
        }

        if (currentScrollY !== 0) {
            scrollTimeoutId = setTimeout(hideNavCompletely, 3000); // Hide after 3 seconds of no scrolling
        }

        lastScrollY = currentScrollY;

        // Call the overlap checks for nav bar and buttons
        checkNavBarOverlap();
        checkResumeButtonOverlap();
        checkBackToTopButtonOverlap(); // Call for back-to-top button

        // --- Back to Top Button Visibility Logic ---
        if (backToTopButton) {
            const scrollShowThreshold = window.innerHeight * 0.5; // Show after scrolling half a viewport
            if (currentScrollY > scrollShowThreshold) {
                backToTopButton.classList.add('is-visible');
            } else {
                backToTopButton.classList.remove('is-visible');
            }
        }
        // --- End Back to Top Button Visibility Logic ---

        // Motion blur effect for experience section
        if (experienceSection) {
            const sectionRect = experienceSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const maxBlurExperience = 10; // Lowered max blur for experience section

            let blurValue = 0;
            if (sectionRect.top < viewportHeight && sectionRect.bottom > 0) {
                let progress = (viewportHeight - sectionRect.top) / viewportHeight;
                progress = Math.max(0, Math.min(1, progress));
                blurValue = (1 - progress) * maxBlurExperience;
            }
            experienceSection.style.filter = `blur(${blurValue}px)`;
        }

        // Motion blur effect and visibility for Hero section content
        if (fixedHeroContent) {
            const heroRect = fixedHeroContent.getBoundingClientRect();
            const maxBlurHero = 3; // Small amount of blur for hero section

            let blurValueHero = 0;
            if (heroRect.top < 0 && heroRect.bottom > 0) {
                let progress = Math.abs(heroRect.top) / heroRect.height;
                progress = Math.min(1, progress);
                blurValueHero = progress * maxBlurHero;
            } else if (heroRect.bottom <= 0) {
                blurValueHero = maxBlurHero;
            }
            if (heroBackground) heroBackground.style.filter = `brightness(0.7) blur(${blurValueHero}px)`;
            if (hatemPic) hatemPic.style.filter = `brightness(0.9) blur(${blurValueHero}px)`;

            // Control visibility of fixedHeroContent based on scroll
            if (currentScrollY >= heroSectionHeight - 100) { // Fade out when approaching the end of hero section
                fixedHeroContent.classList.add('hidden-hero');
            } else {
                fixedHeroContent.classList.remove('hidden-hero');
            }
        }
    });

    // --- Back to Top Button Click Logic ---
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll to the top
            });
        });
    }
    // --- End Back to Top Button Click Logic ---

    // --- Contact Modal Logic ---
    const contactMeButton = document.getElementById('contact-me-button');
    const contactModalOverlay = document.getElementById('contact-modal-overlay');
    const modalCloseButton = document.getElementById('modal-close-button');
    const contactForm = document.getElementById('contact-form');
    const formStatusMessage = document.getElementById('form-status-message');

    if (contactMeButton && contactModalOverlay && modalCloseButton && contactForm && formStatusMessage) {
        // Open modal
        contactMeButton.addEventListener('click', function() {
            contactModalOverlay.classList.add('active');
        });

        // Close modal via close button
        modalCloseButton.addEventListener('click', function() {
            contactModalOverlay.classList.remove('active');
            formStatusMessage.textContent = ''; // Clear message on close
            contactForm.reset(); // Clear form fields
        });

        // Close modal by clicking outside content
        contactModalOverlay.addEventListener('click', function(event) {
            if (event.target === contactModalOverlay) {
                contactModalOverlay.classList.remove('active');
                formStatusMessage.textContent = ''; // Clear message on close
                contactForm.reset(); // Clear form fields
            }
        });

        // Handle form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name && email && subject && message) {
                const mailtoLink = `mailto:hatemanassamad@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Attempt to open the user's email client
                window.location.href = mailtoLink;

                formStatusMessage.textContent = 'Your email client should open shortly. Please send the email manually.';
                formStatusMessage.classList.remove('error');
                formStatusMessage.classList.add('success');

                // Optionally, clear the form after a short delay
                setTimeout(() => {
                    contactForm.reset();
                    contactModalOverlay.classList.remove('active');
                    formStatusMessage.textContent = '';
                }, 3000); // Clear form and close modal after 3 seconds
            } else {
                formStatusMessage.textContent = 'Please fill in all fields.';
                formStatusMessage.classList.remove('success');
                formStatusMessage.classList.add('error');
            }
        });
    }
    // --- End Contact Modal Logic ---

    // --- Project Slider Logic ---
    if (sliderWrapper && sliderPrevBtn && sliderNextBtn && sliderPagination) {
        slides = Array.from(sliderWrapper.querySelectorAll('.slider-slide'));
        
        // Create pagination dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => showSlide(index));
            sliderPagination.appendChild(dot);
        });

        const dots = Array.from(sliderPagination.querySelectorAll('.dot'));

        function showSlide(index) {
            if (index < 0) {
                currentSlideIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentSlideIndex = 0;
            } else {
                currentSlideIndex = index;
            }

            const offset = -currentSlideIndex * 100;
            sliderWrapper.style.transform = `translateX(${offset}%)`;

            // Update active dot
            dots.forEach((dot, i) => {
                if (i === currentSlideIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        sliderPrevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));
        sliderNextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));

        // Touch/Swipe functionality
        sliderWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        sliderWrapper.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        sliderWrapper.addEventListener('touchend', () => {
            const diff = startX - endX;
            if (diff > 50) { // Swiped left
                showSlide(currentSlideIndex + 1);
            } else if (diff < -50) { // Swiped right
                showSlide(currentSlideIndex - 1);
            }
            startX = 0;
            endX = 0;
        });

        // Initial display
        showSlide(0);
    }
    // --- End Project Slider Logic ---

    // Run the checks once on load to set initial state
    checkResumeButtonOverlap();
    checkNavBarOverlap();
    checkBackToTopButtonOverlap(); // Call for back-to-top button on load
    window.dispatchEvent(new Event('scroll')); // Trigger scroll on load for initial plane positions and hero visibility
});
