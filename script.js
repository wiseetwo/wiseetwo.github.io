window.addEventListener('load', () => {
    // 1. Clear out scroll restrictions instantly on site load
    if (history.scrollRestoration) {
        history.scrollRestoration = 'auto';
    }

    // 2. Force browser view to the exact top right away
    window.scrollTo(0, 0); 
    
    // 3. Drop down to the video after 3 seconds, accounting for image layout rendering
    setTimeout(() => {
        const videoSection = document.getElementById('video-screen');
        if (videoSection) {
            // Check if element positioning is finalized by forcing a clean coordinate map
            const targetPosition = videoSection.getBoundingClientRect().top + window.scrollY;
            
            // Execute fallback window scroll if standard element scroll into view fails
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Restore manual history overrides seamlessly safely after scroll initialization
            if (window.location.hash === '#title-screen' && history.scrollRestoration) {
                history.scrollRestoration = 'manual';
            }
        }
    }, 3000); 
});

// Safe conditional fallback check for history loads
if (window.location.hash === '#title-screen') {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
} else {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuCheckbox = document.getElementById('menu-checkbox');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const titlelink = document.getElementById('title-scroll');

    function closeMenu() {
        if (menuCheckbox && menuCheckbox.checked) {
            menuCheckbox.checked = false;
            console.log('Menu closed successfully');
        }
    }

    // Outside Click Logic
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

    // Hash check initialization
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

    // Dropdown Links
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.id === 'title-scroll') return;
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
});