// Client-side JavaScript for blog app

document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic date to the footer
    const footerYear = document.querySelector('footer .container p');
    if (footerYear) {
      footerYear.innerHTML = `&copy; ${new Date().getFullYear()} My Blog. All rights reserved.`;
    }
  
    // Add responsive menu toggle for mobile if needed
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '&#9776;';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    const nav = document.querySelector('nav');
    if (window.innerWidth < 768 && nav) {
      const header = document.querySelector('header .container');
      header.appendChild(menuToggle);
      
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
      });
    }
  
    // Fade in post cards for a nicer effect
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
      }, index * 100);
    });
  
    // Add confirmation to delete buttons (backup to the HTML onclick)
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        if (!confirm('Are you sure you want to delete this post?')) {
          e.preventDefault();
        }
      });
    });
  });