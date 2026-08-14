window.addEventListener('load', () => {
    // 1. Temporarily allow the browser to accept code-driven scrolling
    if (history.scrollRestoration) {
        history.scrollRestoration = 'auto';
    }

    // 2. Force screen to the top instantly so the downward scroll has space to move
    window.scrollTo(0, 0); 
    
    // 3. Drop down to the video after 3 seconds
    setTimeout(() => {
        const videoSection = document.getElementById('video-screen');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 3000); 
});

// Keep this below to safely handle standard browser click histories
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

    // Helper function to safely uncheck the menu
    function closeMenu() {
        if (menuCheckbox && menuCheckbox.checked) {
            menuCheckbox.checked = false;
            console.log('Menu closed successfully');
        }
    }

    // 1. OUTSIDE CLICK LOGIC
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

    // 2. URL HASH CHECK
    if (window.location.hash === '#title-screen') {
        closeMenu();
    }

    // 3. LOGO LINK CLICK
    if (titlelink) {
        titlelink.addEventListener('click', () => {
            closeMenu();
            window.addEventListener('scrollend', () => {
                location.reload();
            }, { once: true });
        });
    }

    // 4. NAV DROPDOWN LINKS CLICK
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.id === 'title-scroll') return;
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
});