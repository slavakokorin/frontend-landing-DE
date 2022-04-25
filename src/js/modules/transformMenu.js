import { throttle } from "./functions.js";

function transformMenu() {
  window.onscroll = throttle(function() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(scrolled > 200){
      document.querySelector('.header__top--fixed').classList.add('bg--gray-blue');
      document.querySelector('.burger__button').classList.add('bg--gray-blue');
      document.querySelector('.header__top--fixed').classList.add('header__top--min');
    }
    else if (scrolled < 200) {
      document.querySelector('.header__top--fixed').classList.remove('bg--gray-blue');
      document.querySelector('.burger__button').classList.remove('bg--gray-blue');
      document.querySelector('.header__top--fixed').classList.remove('header__top--min');      
    }
  }, 300)
}

export default transformMenu;