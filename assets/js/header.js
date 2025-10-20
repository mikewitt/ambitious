// assets/js/header.js

function handleThemeToggle() {
  const toggleButton = document.getElementById('appearance-switcher');
  if (!toggleButton) return;

  toggleButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  });
}

function handleMobileMenu() {
  const menuButton = document.getElementById('menu-button');
  const closeButton = document.getElementById('menu-close-button');
  const menuWrapper = document.getElementById('menu-wrapper');

  if (!menuButton || !closeButton || !menuWrapper) return;

  menuButton.addEventListener('click', () => {
    menuWrapper.classList.remove('invisible', 'opacity-0');
  });

  closeButton.addEventListener('click', () => {
    menuWrapper.classList.add('invisible', 'opacity-0');
  });
}

// Run the functions when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  handleThemeToggle();
  handleMobileMenu();
});