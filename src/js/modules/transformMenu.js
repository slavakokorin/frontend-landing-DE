import { throttle } from "./functions.js";

const headerTop = document.querySelector('.header__top--fixed');
const menuButton = document.querySelector('.burger__button');

const transformation = () => {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if(scrollPosition > 200){
    headerTop.classList.add('bg--gray-blue');
    menuButton.classList.add('bg--gray-blue');
    headerTop.classList.add('header__top--is-scrolled');
  }
  else if (scrollPosition < 200) {
    headerTop.classList.remove('bg--gray-blue');
    menuButton.classList.remove('bg--gray-blue');
    headerTop.classList.remove('header__top--is-scrolled');      
  }
}

const transformMenu = () => window.onscroll = throttle(transformation, 300);

export default transformMenu;
