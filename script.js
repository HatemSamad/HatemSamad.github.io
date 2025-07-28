// This file is currently empty, but can be used for any general JavaScript
// functionality for your portfolio that is not directly related to ColorThief.
// For example, mobile menu toggling logic could go here.

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle logic
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // ColorThief script block
    const imageUrl = 'HatemPicture111.jpg'; // The URL of your background image
    const colorThief = new ColorThief();
    const tempImage = new Image();
    tempImage.crossOrigin = 'Anonymous'; // Important for CORS if image is not on the same domain
    tempImage.src = imageUrl;

    tempImage.onload = function() {
        try {
            const dominantColor = colorThief.getColor(tempImage);
            console.log('Dominant Color (RGB):', dominantColor);
        } catch (error) {
            console.error('Error extracting dominant color:', error);
        }
    };

    tempImage.onerror = function() {
        console.error('Failed to load image for ColorThief:', imageUrl);
    };

    // Paper airplane scroll animation logic
    const experienceSection = document.getElementById('experience');
    const paperAirplane1 = document.getElementById('paper-airplane'); // Original plane
    const paperAirplane2 = document.getElementById('paper-airplane-2'); // New plane

    // Get references to the hero description and button
    const heroDescription = document.getElementById('heroDescription');
    const viewWorkButton = document.getElementById('viewWorkButton');

    // Set initial state for hero description and button (visible)
    if (heroDescription) heroDescription.classList.add('fade-in');
    if (viewWorkButton) viewWorkButton.classList.add('fade-in');


    if (experienceSection && paperAirplane1 && paperAirplane2) {
        window.addEventListener('scroll', function() {
            const sectionRect = experienceSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            let scrollProgress = 0;

            // To make the animation longer and start earlier, we adjust the scroll range
            // The animation will now span over 2 times the section's height for a longer effect.
            const animationScrollRange = experienceSection.offsetHeight * 2; 
            scrollProgress = (window.scrollY - (experienceSection.offsetTop - viewportHeight)) / (animationScrollRange + viewportHeight);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress)); // Clamp between 0 and 1

            const planeSize = 200; // Increased size of both airplanes
            paperAirplane1.style.width = `${planeSize}px`;
            paperAirplane1.style.height = `${planeSize}px`;
            paperAirplane2.style.width = `${planeSize}px`;
            paperAirplane2.style.height = `${planeSize}px`;

            const sectionWidth = experienceSection.offsetWidth;
            const sectionHeight = experienceSection.offsetHeight;

            // --- Logic for Paper Airplane 1 (Original: Right to Left, -45deg tilt) ---
            // Define the paper airplane's initial CSS position offsets (from right and top)
            const initialPlane1OffsetX = 20; // From right
            const initialPlane1OffsetY = 20; // From top

            // Define desired STARTING absolute position of the airplane within the experience section
            const desiredStartAbsoluteX1 = sectionWidth - planeSize - 100; // 100px from right edge
            const desiredStartAbsoluteY1 = 50; // 50px from top edge

            // Define desired ENDING absolute position of the airplane within the experience section
            const targetElement1 = document.querySelector('.left-timeline img[src="laptoppicdrawing.png"]');
            let desiredEndAbsoluteX1 = 100; // Default to 100px from left edge
            let desiredEndAbsoluteY1 = sectionHeight - planeSize - 50; // Default to bottom left if target not found

            if (targetElement1) {
                const targetRect1 = targetElement1.getBoundingClientRect();
                const experienceRect = experienceSection.getBoundingClientRect();
                const targetRelativeTop1 = targetRect1.top - experienceRect.top;
                const targetRelativeLeft1 = targetRect1.left - experienceRect.left;
                desiredEndAbsoluteX1 = targetRelativeLeft1 - planeSize / 2 - 20;
                desiredEndAbsoluteY1 = targetRelativeTop1 - planeSize / 2 - 50;
                desiredEndAbsoluteX1 = Math.max(20, desiredEndAbsoluteX1);
                desiredEndAbsoluteY1 = Math.max(20, desiredEndAbsoluteY1);
            }

            // Calculate the current absolute position based on scroll progress
            let currentAbsoluteX1 = desiredStartAbsoluteX1 + (desiredEndAbsoluteX1 - desiredStartAbsoluteX1) * scrollProgress;
            let currentAbsoluteY1 = desiredStartAbsoluteY1 + (desiredEndAbsoluteY1 - desiredStartAbsoluteY1) * scrollProgress;

            // Calculate the translate values needed from the *initial CSS position* (top:20px, right:20px)
            let translateX1 = currentAbsoluteX1 - (sectionWidth - planeSize - initialPlane1OffsetX);
            let translateY1 = currentAbsoluteY1 - initialPlane1OffsetY;

            const fixedRotationZ1 = -45; // Fixed rotation for the tilt
            paperAirplane1.style.transform = `translate(${translateX1}px, ${translateY1}px) rotateZ(${fixedRotationZ1}deg)`;


            // --- Logic for Paper Airplane 2 (New: Left to Right, -45deg tilt, flipped) ---
            // Define the paper airplane's initial CSS position offsets (from left and top)
            const initialPlane2OffsetX = 20; // From left
            const initialPlane2OffsetY = 20; // From top

            const cinemaCameraElement = document.querySelector('.left-timeline img[src="CinemaCamera.png"]');
            const medalsElement = document.querySelector('.right-timeline img[src="6medals.png"]');

            let desiredStartAbsoluteX2 = 50; // Default start from left edge
            let desiredStartAbsoluteY2 = 50; // Default start from top

            if (cinemaCameraElement) {
                const cinemaCameraRect = cinemaCameraElement.getBoundingClientRect();
                const experienceRect = experienceSection.getBoundingClientRect();

                // Start position: slightly to the right of cinema camera, and below it
                desiredStartAbsoluteX2 = (cinemaCameraRect.left - experienceRect.left) + (cinemaCameraRect.width / 2) + 20; // 20px right of camera's center
                desiredStartAbsoluteY2 = (cinemaCameraRect.top - experienceRect.top) + cinemaCameraRect.height + 30; // 30px below camera's bottom
            }

            let desiredEndAbsoluteX2 = sectionWidth - planeSize - 50; // 50px from right edge
            let desiredEndAbsoluteY2 = desiredStartAbsoluteY2; // Keep same vertical level initially

            if (medalsElement) {
                const medalsRect = medalsElement.getBoundingClientRect();
                const experienceRect = experienceSection.getBoundingClientRect();

                // End position: under the medals image
                desiredEndAbsoluteX2 = (medalsRect.left - experienceRect.left) + (medalsRect.width / 2) - (planeSize / 2); // Centered horizontally with medals
                desiredEndAbsoluteY2 = (medalsRect.top - experienceRect.top) + medalsRect.height + 30; // 30px below medals' bottom
            }

            let currentAbsoluteX2 = desiredStartAbsoluteX2 + (desiredEndAbsoluteX2 - desiredStartAbsoluteX2) * scrollProgress;
            let currentAbsoluteY2 = desiredStartAbsoluteY2 + (desiredEndAbsoluteY2 - desiredStartAbsoluteY2) * scrollProgress;

            // Calculate translate values for plane 2 from its assumed initial CSS position (top:20px, left:20px)
            let translateX2 = currentAbsoluteX2 - initialPlane2OffsetX;
            let translateY2 = currentAbsoluteY2 - initialPlane2OffsetY;

            const fixedRotationZ2 = -45; // Changed to -45 degrees tilt
            const flipY2 = 180; // Horizontal flip (180 degrees around Y-axis)

            paperAirplane2.style.transform = `translate(${translateX2}px, ${translateY2}px) rotateY(${flipY2}deg) rotateZ(${fixedRotationZ2}deg)`;
        });

        // Trigger scroll event once on load to set initial position
        window.dispatchEvent(new Event('scroll'));
    }

    // Navigation bar hide/show and resize/reposition on scroll logic
    const nav = document.querySelector('nav');
    // Ensure the nav element has an ID for easier selection if not already present in index.html
    if (!nav.id) {
        nav.id = 'main-nav';
    }

    // Get the "Hatem Samad" brand name link
    const navBrandName = nav.querySelector('a[href="#hero"]');

    // Define classes for the default (full) and compact states
    const navDefaultClasses = ['max-w-5xl', 'left-1/2', '-translate-x-1/2', 'top-4'];
    // Increased top-position (top-20) and adjusted right-position (right-8) for compact state
    // Added text-sm for smaller font size in compact state
    const navCompactClasses = ['max-w-xs', 'right-8', 'top-20', 'text-sm']; 
    const navHiddenClass = '-translate-y-full'; // Class to completely hide the nav

    let lastScrollY = window.scrollY; // Re-initialize lastScrollY here if it was only for trail dots
    let scrollTimeoutId = null;
    const scrollThreshold = 50; // How many pixels to scroll before action

    // Function to apply the full-size navigation bar state
    function applyFullNavState() {
        nav.classList.remove(...navCompactClasses, navHiddenClass);
        nav.classList.add(...navDefaultClasses);
        // Ensure text size for links reverts to default if needed (Tailwind default is base)
        nav.querySelectorAll('a').forEach(link => {
            link.classList.remove('text-sm');
            link.classList.add('text-lg'); // Assuming default link size is text-lg
        });
        if (navBrandName) {
            navBrandName.classList.remove('hidden'); // Show "Hatem Samad"
        }
    }

    // Function to apply the compact navigation bar state
    function applyCompactNavState() {
        nav.classList.remove(...navDefaultClasses, navHiddenClass);
        nav.classList.add(...navCompactClasses);
        // Apply smaller text size to links within the nav
        nav.querySelectorAll('a').forEach(link => {
            link.classList.remove('text-lg'); // Remove default link size
            link.classList.add('text-sm');
        });
        if (navBrandName) {
            navBrandName.classList.add('hidden'); // Hide "Hatem Samad"
        }
    }

    // Function to completely hide the navigation bar
    function hideNavCompletely() {
        nav.classList.add(navHiddenClass);
        // When completely hidden, ensure it's in the compact state for next appearance
        // This ensures that when it reappears (even from hidden), it's in the compact state if not at top.
        applyCompactNavState(); 
        nav.classList.add(navHiddenClass); // Re-add hidden class to actually hide it
    }

    // Initial state setup on page load
    if (lastScrollY === 0) {
        applyFullNavState();
    } else {
        applyCompactNavState();
        hideNavCompletely(); // Start hidden if not at top
    }

    // Event listener for scroll
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // Clear any existing timeout for hiding the nav
        clearTimeout(scrollTimeoutId);

        if (currentScrollY === 0) {
            // At the very top: full size, centered, visible
            applyFullNavState();
            // Show hero description and button
            if (heroDescription) heroDescription.classList.remove('fade-out');
            if (viewWorkButton) viewWorkButton.classList.remove('fade-out');
            if (heroDescription) heroDescription.classList.add('fade-in');
            if (viewWorkButton) viewWorkButton.classList.add('fade-in');

        } else if (currentScrollY < lastScrollY) {
            // Scrolling up, but not at the very top: smaller, right, visible
            applyCompactNavState();
            // Show hero description and button
            if (heroDescription) heroDescription.classList.remove('fade-out');
            if (viewWorkButton) viewWorkButton.classList.remove('fade-out');
            if (heroDescription) heroDescription.classList.add('fade-in');
            if (viewWorkButton) viewWorkButton.classList.add('fade-in');

        } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Scrolling down and past threshold: hide completely
            hideNavCompletely();
            // Hide hero description and button
            if (heroDescription) heroDescription.classList.remove('fade-in');
            if (viewWorkButton) viewWorkButton.classList.remove('fade-in');
            if (heroDescription) heroDescription.classList.add('fade-out');
            if (viewWorkButton) viewWorkButton.classList.add('fade-out');
        }

        // Set a timeout to hide the nav if scrolling stops (only if not at top)
        if (currentScrollY !== 0) {
            scrollTimeoutId = setTimeout(hideNavCompletely, 3000); // Hide after 3 seconds of no scrolling
        }

        lastScrollY = currentScrollY;

        // Call the overlap check for the nav bar
        checkNavBarOverlap();

        // Motion blur effect for experience section
        const fixedHeroContent = document.getElementById('fixedHeroContent');
        if (experienceSection) {
            const sectionRect = experienceSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const maxBlurExperience = 10; // Lowered max blur for experience section

            // Calculate blur amount: max blur when section.top is at viewport bottom, 0 when section.top is at viewport top
            let blurValue = 0;
            if (sectionRect.top < viewportHeight && sectionRect.bottom > 0) {
                // Calculate progress from bottom of viewport to top of viewport
                let progress = (viewportHeight - sectionRect.top) / viewportHeight;
                progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
                blurValue = (1 - progress) * maxBlurExperience; // Invert progress for blur: max at start, min at end
            }
            experienceSection.style.filter = `blur(${blurValue}px)`;
        }

        // Motion blur effect for Hero section
        if (fixedHeroContent) {
            const heroRect = fixedHeroContent.getBoundingClientRect();
            const maxBlurHero = 3; // Small amount of blur for hero section

            let blurValueHero = 0;
            // Apply blur as the hero section scrolls out of view (i.e., when its top goes negative)
            if (heroRect.top < 0 && heroRect.bottom > 0) {
                let progress = Math.abs(heroRect.top) / heroRect.height;
                progress = Math.min(1, progress); // Clamp to 1
                blurValueHero = progress * maxBlurHero; // Blur increases as it scrolls up
            } else if (heroRect.bottom <= 0) {
                blurValueHero = maxBlurHero; // Max blur when completely out of view
            }
            // Apply blur to the background image and transparent hatem pic within fixedHeroContent
            const heroBackground = document.getElementById('heroBackground');
            const hatemPic = fixedHeroContent.querySelector('img[src="hatemtransparentpic.png"]');
            if (heroBackground) heroBackground.style.filter = `brightness(0.7) blur(${blurValueHero}px)`;
            if (hatemPic) hatemPic.style.filter = `brightness(0.9) blur(${blurValueHero}px)`;
        }
    });

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
            const experienceSection = document.getElementById('experience');
            if (experienceSection) {
                experienceSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Mobile menu toggle logic
    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('-translate-x-full');
            // When mobile menu is open, always show the nav (in its current state)
            nav.classList.remove(navHiddenClass);
        });

        closeMobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('-translate-x-full');
            // After closing mobile menu, if not at top, hide nav after a short delay
            if (window.scrollY > 0) {
                scrollTimeoutId = setTimeout(hideNavCompletely, 500); // Short delay for hiding after menu close
            }
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('-translate-x-full');
                if (window.scrollY > 0) {
                    scrollTimeoutId = setTimeout(hideNavCompletely, 500);
                }
            });
        });
    }

    // Resume button visibility logic
    const resumeButton = document.getElementById('resume-button');
    const projectsSectionEl = document.getElementById('projects');

    function checkResumeButtonOverlap() {
        if (!resumeButton || !experienceSection || !projectsSectionEl) {
            return;
        }

        const resumeButtonRect = resumeButton.getBoundingClientRect();
        const experienceSectionRect = experienceSection.getBoundingClientRect();
        const projectsSectionElRect = projectsSectionEl.getBoundingClientRect(); // Corrected variable name

        // Check if the resume button overlaps vertically with the experience section
        const overlapsExperience = (
            resumeButtonRect.bottom > experienceSectionRect.top &&
            resumeButtonRect.top < experienceSectionRect.bottom
        );

        // Check if the resume button overlaps vertically with the projects section
        const overlapsProjects = (
            resumeButtonRect.bottom > projectsSectionElRect.top && // Corrected variable name
            resumeButtonRect.top < projectsSectionElRect.bottom // Corrected variable name
        );

        // If it overlaps with either section, apply the darker style
        if (overlapsExperience || overlapsProjects) {
            // Add darker classes and remove lighter ones
            resumeButton.classList.remove('bg-white', 'bg-opacity-10', 'text-white');
            resumeButton.classList.add('bg-gray-800', 'bg-opacity-50', 'text-white'); // Keeping text white for contrast on dark background
        } else {
            // Revert to original lighter classes
            resumeButton.classList.remove('bg-gray-800', 'bg-opacity-50');
            resumeButton.classList.add('bg-white', 'bg-opacity-10', 'text-white');
        }
    }

    // New function to check overlap for the navigation bar
    function checkNavBarOverlap() {
        if (!nav || !experienceSection || !projectsSectionEl) {
            return;
        }

        const navRect = nav.getBoundingClientRect();
        const experienceSectionRect = experienceSection.getBoundingClientRect();
        const projectsSectionElRect = projectsSectionEl.getBoundingClientRect(); // Corrected variable name

        const overlapsExperience = (
            navRect.bottom > experienceSectionRect.top &&
            navRect.top < experienceSectionRect.bottom
        );
        const overlapsProjects = (
            navRect.bottom > projectsSectionElRect.top && // Corrected variable name
            navRect.top < projectsSectionElRect.bottom // Corrected variable name
        );

        const isOverlapping = overlapsExperience || overlapsProjects;

        if (isOverlapping) {
            // Apply darker background to nav
            nav.classList.remove('bg-white', 'bg-opacity-10');
            nav.classList.add('nav-dark-state'); // Use the new CSS class for dark state
        } else {
            // Revert to original lighter background
            nav.classList.remove('nav-dark-state');
            nav.classList.add('bg-white', 'bg-opacity-10');
        }
    }

    // Attach the overlap checks to the scroll event
    window.addEventListener('scroll', checkResumeButtonOverlap);
    window.addEventListener('scroll', checkNavBarOverlap); // Add for nav bar

    // Run the checks once on load to set initial state
    checkResumeButtonOverlap();
    checkNavBarOverlap(); // Run for nav bar
});
