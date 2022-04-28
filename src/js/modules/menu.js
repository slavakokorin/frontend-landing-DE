import { scrollPosition, throttle } from "./functions.js";

const menuElements = {
  headerTop: "[data-js-header-top]",
  menuButton: "[data-js-menu-button]",
  menu: "[data-js-menu]",
  menuLinkButton: "[data-js-menu-link]",
}

export default class Menu {
  constructor() {
    this.bindEvents();
  }

  toggleMenu() {
    const menu = document.querySelector(menuElements.menu);
    const ACTIVE_SELECTOR = 'menu--active';

    if (menu.classList.contains(ACTIVE_SELECTOR)) {
      menu.classList.remove(ACTIVE_SELECTOR);
    } else {
      menu.classList.add(ACTIVE_SELECTOR);
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
        console.log('1');
        this.toggleMenu();
        break;
      case isMatches(menuElements.menuLinkButton):
        console.log('2');
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
