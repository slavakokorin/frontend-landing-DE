import Modals from '../modals.js';

export default class FormSend {
  constructor() {}

  static async send(form) {
    const  {action = window.location.href, method = 'GET' } = form;
    const body = new FormData(form);
    console.debug([...body]);
    return await fetch(action, {
      method,
      body: method === 'POST' ? body : null,
    })
      .then(
        response => {
          return Promise.resolve(response.json());
        },
        err => {
          console.debug(err);
          return Promise.reject(err);
        },
      );
  }

  static onSuccess(json) {
    console.debug(json);
    Modals.closeLastModal();
    document.body.classList.add('lock');
    const modalElement = document.querySelector('[data-js-modal="send-sucess"]');
    modalElement.classList.add('active-modal');
  }

  static onError() {
    Modals.closeLastModal();
    document.body.classList.add('lock');
    const modalElement = document.querySelector('[data-js-modal="send-error"]');
    modalElement.classList.add('active-modal');
  }
}
