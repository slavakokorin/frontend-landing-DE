export function burgerMenu() {
  const menu = document.querySelector('.menu');
  const button = document.querySelector('.menu__button');
  // // let links = document.querySelector('.menu__link');
  // const overlay = document.querySelector('.menu__overlay');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // links.addEventListener('click', () => toggleMenu());
  // overlay.addEventListener('click', () => toggleMenu());

  function toggleMenu() {
    if (menu.classList.contains('menu--active')) {
      document.body.classList.remove('lock');
      menu.classList.remove('menu--active');
    } else {
      document.body.classList.add('lock');
      menu.classList.add('menu--active');
    }
  }
}