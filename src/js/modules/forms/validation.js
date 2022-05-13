import Forms from './index.js';
import { getAttr } from '../functions.js';

export default class Validation {
  static stateClasses = {
    invalid: 'is-invalid',
  };

  static getInputs(form) {
    return [...form.querySelectorAll(Forms.formElements.input)];
  }

  static expression = {
    email: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
    name: /^[A-Za-z0-9]+$/,
  };

  static patterns = new Map([
    ['', (input) => Validation.isValidateEmpty(input)],
    ['email', (input) => Validation.isValidateEmail(input)],
    ['name', (input) => Validation.isValidateName(input)],
    ['message', (input) => input.value.length < 120],
  ]);

  static isValid(form, isHighlight = true) {
    const inputs = Validation.getInputs(form);

    let result = true;

    inputs.forEach((input) => {
      const validateType = input.getAttribute(getAttr(Forms.formElements.input));
      const validationFn = Validation.patterns.has(validateType)
        ? Validation.patterns.get(validateType)
        : Validation.patterns.get('');

      const isValid = validationFn(input);
      if (isHighlight) {
        Validation.setInputState(input, isValid);
      }

      if (!isValid) {
        result = false;
      }
    });

    return result;
  }

  static setInputState(input, isValid = true) {
    return isValid
      ? input.classList.remove(Validation.stateClasses.invalid)
      : input.classList.add(Validation.stateClasses.invalid);
  }

  static isValidateEmpty(input) {
    return !!input.value.trim().length;
  }

  static isValidateEmail(input) {
    return Validation.expression.email.test(input.value);
  }

  static isValidateName(input) {
    return Validation.expression.name.test(input.value)
      && (input.value.length > 1 && input.value.length < 20);
  }
}
