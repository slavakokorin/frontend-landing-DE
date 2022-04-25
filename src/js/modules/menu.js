export function displayMenu() {
  const menu = document.querySelector('.menu');
  const button = document.querySelector('.burger__button');

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
