window.addEventListener('load', () => {
    // Force the browser back to the top instantly on load so the smooth scroll works cleanly
    window.scrollTo(0, 0); 
    
    setTimeout(() => {
        const videoSection = document.getElementById('video-screen');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 3000); 
});

if (window.location.hash === '#title-screen') { 
  if (history.scrollRestoration) { 
    history.scrollRestoration = 'manual'; 
  } 
} else { 
  if (history.scrollRestoration) { 
    history.scrollRestoration = 'auto'; // Normal behavior for other sections 
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
    // CRITICAL FIX: Ignore the invisible duplicate click on the checkbox element itself 
    if (event.target === menuCheckbox) return; 
    
    // Only run if the menu checkbox is currently checked (open) 
    if (menuCheckbox && menuCheckbox.checked) { 
      // Check if the user clicked the toggle button wrapper or inside the link menu 
      const clickedToggle = menuToggle && menuToggle.contains(event.target); 
      const clickedInsideMenu = navLinks && navLinks.contains(event.target); 
      
      // If they clicked the layout background, close it 
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

  // 4. NAV DROPDOWN LINKS CLICK (Closes menu automatically when an option is selected) 
  document.querySelectorAll('.nav-links a').forEach(link => { 
    if (link.id === 'title-scroll') return; 
    link.addEventListener('click', () => { 
      closeMenu(); 
    }); 
  }); 

  // 5. CUSTOM DIALOG BUTTON DISMISS LOGIC

}); 

// --- FORM HANDLING ---
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', () => {
    // Let the form submit naturally to FormSubmit, but clear the fields right after
    setTimeout(() => {
      form.reset();
    }, 10);
  });
}