import { getConfig } from "./functions.js";

export const els = {
  modal: "[data-js-modal]",
  openButton: "[data-js-modal-open-button]",
  closeButton: "[data-js-modal-close-button]",
}

export default class Modals {
  constructor() {
    this.bindEvents();
  }

  handleOpenButtonClick(event) {
    event.preventDefault();
    const config = getConfig(event.target, els.openButton);
    
    //const src = config.src;
    const { src } = config
    if (!src) {
      console.debug("Selector is not found data-js attribute of element:");
      console.debug(event.targret);
      return;
    }

    const modalElement = document.querySelector(src);
    if (!modalElement) {
      console.debug("Modal element by `${src}` selector is not found");
      return;
    }
    
    modalElement.classList.add('active-modal');
    document.body.classList.add('lock');
  }

  static closeLastModal() {
    const allOpenedModals = document.querySelectorAll('.active-modal')
    const lastModal = [...allOpenedModals].at(-1)
    if (!lastModal) {
      return;
    }

    lastModal.classList.remove('active-modal');
    document.body.classList.remove('lock');
  }

  handleCloseButtonClick(event) {
    event.preventDefault();
    Modals.closeLastModal();
  }

  handleClick(event) {
    //const target = event.target;
    const { target } = event;
    const isMatches = (selector) => target.matches(selector);

    switch (true) {
      case isMatches(els.openButton):
        this.handleOpenButtonClick(event);
        break;
      case isMatches(els.closeButton):
        this.handleCloseButtonClick(event);
        break;
      case isMatches(els.modal):
        this.handleCloseButtonClick(event);
        break;
      default:
        break;
    }
  }

  bindEvents() {
    document.addEventListener('click', (event) => {
      this.handleClick(event);
    })

    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape') {
        event.preventDefault();
        Modals.closeLastModal();
      }
    })
  }
}