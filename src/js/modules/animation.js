import { throttle, offset } from "./functions.js";

const animItems = [...document.querySelectorAll('[data-js-anim-items]')];

export default class Animation {
  constructor() {
    this.bindEvents();
  }

  animOnScroll() {
    if (animItems.length <= 0) {
      return;
    }
    animItems.map((animItem) => {
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 8;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if(animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      
      const ACTIVE_SELECTOR = '_active';

      if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
        animItem.classList.add(ACTIVE_SELECTOR);
      } else {
        animItem.classList.remove(ACTIVE_SELECTOR);
      }
    })
  }

  bindEvents() {
    this.animOnScroll();
    window.addEventListener('scroll', throttle(this.animOnScroll, 200));
  }
}
