document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelector('.menuItems');
    if (!menuItems.classList.contains('hidden')) {
        menuItems.classList.add('hidden');
    }
  });
  
  function toggleMenu() {
    const menuItems = document.querySelector('.menuItems');
    menuItems.classList.toggle('hidden');
  }
  