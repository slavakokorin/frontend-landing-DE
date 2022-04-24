export function displayMenu() {
  const menu = document.querySelector('.menu');
  const button = document.querySelector('.burger__button');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  function toggleMenu() {
    if (menu.classList.contains('menu--active')) {
      // document.body.classList.remove('lock');
      menu.classList.remove('menu--active');
    } else {
      // document.body.classList.add('lock');
      menu.classList.add('menu--active');
    }
  }
}