import { getConfig } from './functions.js';

export const modalElements = {
  modal: '[data-js-modal]',
  openButton: '[data-js-modal-open-button]',
  closeButton: '[data-js-modal-close-button]',
};

const { body } = document;
const menu = document.querySelector('[data-js-header-top]');

export default class Modals {
  constructor() {
    this.constructor.bindEvents();
  }

  static handleOpenButtonClick(event) {
    event.preventDefault();
    const config = getConfig(event.target, modalElements.openButton);
    const { src } = config;
    if (!src) {
      console.debug('Selector is not found data-js attribute of element:');
      console.debug(event.targret);
      return;
    }

    const modalElement = document.querySelector(src);

    if (!modalElement) {
      console.debug(`Modal element by ${src} selector is not found`);
      return;
    }

    modalElement.classList.add('active-modal');
    menu.classList.remove('header__top--fixed');
    body.classList.add('compensation-padd');
    body.classList.add('lock');
  }

  static closeLastModal() {
    const allOpenedModals = document.querySelectorAll('.active-modal');
    const lastModal = [...allOpenedModals].at(-1);

    if (!lastModal) {
      return;
    }

    lastModal.classList.remove('active-modal');
    body.classList.remove('compensation-padd');
    menu.classList.add('header__top--fixed');
    body.classList.remove('lock');
  }

  static handleCloseButtonClick(event) {
    event.preventDefault();
    Modals.closeLastModal();
  }

  static handleClick(event) {
    const { target } = event;
    const isMatches = (selector) => target.matches(selector);

    switch (true) {
      case isMatches(modalElements.openButton):
        Modals.handleOpenButtonClick(event);
        break;
      case isMatches(modalElements.closeButton):
        Modals.handleCloseButtonClick(event);
        break;
      case isMatches(modalElements.modal):
        Modals.handleCloseButtonClick(event);
        break;
      default:
        break;
    }
  }

  static bindEvents() {
    document.addEventListener('click', (event) => {
      this.handleClick(event);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.closeLastModal();
      }
    });
  }
}
