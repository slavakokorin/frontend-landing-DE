// export function displayMenu() {
//   const menu = document.querySelector('[data-js-menu]');
//   const button = document.querySelector('[data-js-menu-button]');

//   button.addEventListener('click', (e) => {
//     e.preventDefault();
//     toggleMenu();
//   });

//   function toggleMenu() {
//     if (menu.classList.contains('menu--active')) {
//       menu.classList.remove('menu--active');
//     } else {
//       menu.classList.add('menu--active');
//     }
//   }
// }




import { scrollPosition, throttle } from "./functions.js";

const menuElements = {
  headerTop: "[data-js-header-top]",
  menuButton: "[data-js-menu-button]",
  menu: "[data-js-menu]",
}

export default class Menu {
  constructor() {
    this.bindEvents();
  }

  toggleMenu() {
    const menu = document.querySelector(menuElements.menu);

    if (menu.classList.contains('menu--active')) {
      menu.classList.remove('menu--active');
    } else {
      menu.classList.add('menu--active');
    }
  }

  transformation() {
    const menuBody = document.querySelector(menuElements.headerTop);
    const button = document.querySelector(menuElements.menuButton);
    const position = scrollPosition();
    
    if(position > 200){
      menuBody.classList.add('bg--gray-blue');
      button.classList.add('bg--gray-blue');
      menuBody.classList.add('header__top--is-scrolled');
    }
    else if (position < 200) {
      menuBody.classList.remove('bg--gray-blue');
      button.classList.remove('bg--gray-blue');
      menuBody.classList.remove('header__top--is-scrolled');      
    }
  }

  handleClick(event) {
    const { target } = event;
    const isMatches = (selector) => target.matches(selector);

    switch (true) {
      case isMatches(menuElements.menuButton):
        this.toggleMenu();
        break;
      default:
        break;
    }
  }

  bindEvents() {
    document.addEventListener('click', (event) => {
      this.handleClick(event);
    })

    window.onscroll = throttle(this.transformation, 300);
  }
}
