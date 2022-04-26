export function displayMenu() {
  const menu = document.querySelector('[data-js-menu="list"]');
  const button = document.querySelector('[data-js-menu-button="display-menu"]');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  function toggleMenu() {
    if (menu.classList.contains('menu--active')) {
      menu.classList.remove('menu--active');
    } else {
      menu.classList.add('menu--active');
    }
  }
}
