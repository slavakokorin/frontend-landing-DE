import Validation from './validation.js';
import FormSend from './send.js';

export default class Forms {
  static instance = '[data-js-form]';

  static formElements = {
    input: '[data-js-input-required]',
  };

  // static stateClasses = {
  //   invalid: 'is-invalid',
  // };

  constructor() {
    this.constructor.bindEvents();
  }

  static handleSubmit(event) {
    const { target } = event;
    if (target.matches(Forms.instance)) {
      event.preventDefault();
      if (Validation.isValid(target)) {
        FormSend.send(target)
          .then(
            (json) => FormSend.onSuccess(json),
            (err) => FormSend.onError(err),
          );
        target.reset();
      }
    }
  }

  static bindEvents() {
    document.addEventListener('submit', (event) => {
      this.handleSubmit(event);
    });
  }
}
