// 1. Immediately determine exactly HOW the user landed on the page
const navigationEntries = performance.getEntriesByType("navigation");
const isBrowserRefresh = navigationEntries.length > 0 && navigationEntries[0].type === "reload";

// Detect if they are currently sitting at the top of the viewport
const isCurrentlyAtTop = window.scrollY < 50;

// Turn off default browser scroll jumping instantly
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    // 2. Play intro scroll ONLY if it's a fresh visit OR if they refreshed while looking at the top title screen
    const shouldPlayIntro = !isBrowserRefresh || (isBrowserRefresh && isCurrentlyAtTop);

    if (shouldPlayIntro) {
        if (history.scrollRestoration) {
            history.scrollRestoration = 'auto';
        }
        
        // Ensure we anchor cleanly at 0,0 for the timeline initiation
        window.scrollTo(0, 0); 
        
        // Execute the smooth slide-down exactly 3 seconds later
        setTimeout(() => {
            const videoSection = document.getElementById('video-screen');
            if (videoSection) {
                const targetPosition = videoSection.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (window.location.hash === '#title-screen' && history.scrollRestoration) {
                    history.scrollRestoration = 'manual';
                }
            }
        }, 3000);
    } else {
        // 3. If they explicitly refreshed while viewing a lower section, leave them exactly there.
        // This stops the code from firing on scroll adjustments or asset paints.
        if (history.scrollRestoration) {
            history.scrollRestoration = 'auto';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuCheckbox = document.getElementById('menu-checkbox');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const titlelink = document.getElementById('title-scroll');

    function closeMenu() {
        if (menuCheckbox && menuCheckbox.checked) {
            menuCheckbox.checked = false;
        }
    }

    // Outside Click Layout Logic
    document.addEventListener('click', (event) => {
        if (event.target === menuCheckbox) return;

        if (menuCheckbox && menuCheckbox.checked) {
            const clickedToggle = menuToggle && menuToggle.contains(event.target);
            const clickedInsideMenu = navLinks && navLinks.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        }
    });

    if (window.location.hash === '#title-screen') {
        closeMenu();
    }

    // Logo Click Logic
    if (titlelink) {
        titlelink.addEventListener('click', () => {
            closeMenu();
            window.addEventListener('scrollend', () => {
                location.reload();
            }, { once: true });
        });
    }

    // Dropdown Navigation Links
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.id === 'title-scroll') return;
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
});
