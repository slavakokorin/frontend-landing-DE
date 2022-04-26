import Validation from "./validation.js";
import FormSend from "./send.js";

export default class Forms {
  static instance = "[data-js-form]";
  static els = {
    input: "[data-js-input-required]",
  };

  static stateClasses = {
    invalid: "is-invalid",
  };

  constructor() {
    this.bindEvents();
  };

  handleSubmit(e) {
    //const target = e.target;
    const {target} = e;
    if (target.matches(Forms.instance)) {
      e.preventDefault();
      if (Validation.isValid(target)) {
        FormSend.send(target)
        .then(
          json => FormSend.onSuccess(json),
          err => FormSend.onError(err)
        )
        target.reset();
      }
    }
  };

  bindEvents() {
    document.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    })
  };
}
