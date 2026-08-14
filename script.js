window.addEventListener('load' , () => { 
  setTimeout(() => { 
    document.querySelector('.video-screen').scrollIntoView({ behavior: 'smooth' }) 
  }, 3000); 
}) 

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
  form.addEventListener('submit', handleSubmit); 
}

function handleSubmit(event) { 
  event.preventDefault(); 
  
  const name = document.getElementById('name').value; 
  const email = document.getElementById('email').value; 
  const message = document.getElementById('message').value; 
  
  // Target the custom modal elements
  const customAlert = document.getElementById('custom-alert');
  
  if (customAlert) {
    // Dynamically update the modal text to use the visitor's name
    const alertParagraph = customAlert.querySelector('p');
    if (alertParagraph) {
      alertParagraph.textContent = `Thank you! I'll get back to you soon.`;
    }
    
    // Launch the beautiful custom dialog box
    customAlert.showModal();
  }

  // Clear out the user inputs inside the form fields 
  const inputs = document.querySelectorAll('#name, #email'); 
  inputs.forEach(input => { 
    input.value = ''; 
  }); 
  
  const textarea = document.getElementById('message'); 
  if (textarea) {
    textarea.value = ''; 
  }
}