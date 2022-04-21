import Forms from "./index.js";
import { getAttr } from "../functions.js";

export default class Validation {
  static getInputs(form) {
    return [...form.querySelectorAll(Forms.els.input)];
  };

  static expression = {
    // email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    email: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
    name: /^[A-Za-z0-9]+$/,
  };

  static patterns = new Map([
    ["", (input) => Validation.isValidateEmpty(input)],
    ["email", (input) => Validation.isValidateEmail(input)],
    ["name", (input) => Validation.isValidateName(input)],
    ["message", (input) => input.value.length < 12],
  ]);

  static isValid(form, isHighlight = true) {
    //1. получаем ноды c полями ввода
    const inputs = Validation.getInputs(form);
    console.log(`1 ${inputs}`);

    let result = true;

    //2. идём циклом по нодам
    inputs.forEach(input => {

      //2.2 получаем название поля ввода
      const validateType = input.getAttribute(getAttr(Forms.els.input));
      console.log(`2.2 ${validateType}`);

      //2.1 вызываем функцию или условие проверки, исходя из названия поля ввода или вызываем проверку на пустату
      const validationFn = Validation.patterns.has(validateType)
        ? Validation.patterns.get(validateType)
        : Validation.patterns.get("");
        console.log(`2.1.1 ${Validation.patterns.get(validateType)}`);
        console.log(`2.1.2 ${Validation.patterns.get("")}`);

      // 2.0 определяем валидность поля, для этого
      const isValid = validationFn(input);
      console.log(`res: ${isValid}`);
      
      // 3.1 запускаем функцию для подсвечивания поля ввода, сюда передаём поле и результат валидации поля
      if (isHighlight) {
        Validation.setInputState(input, isValid);
      }

      //4. если поле не валидно, возвращаем неудачу
      if (!isValid) {
        result = false;
      }
    });

    return result;
  };

  //3.2 запускаем функцию для подсвечивания полей
  static setInputState(input, isValid = true) {
    isValid
      ? input.classList.remove(Forms.stateClasses.invalid)
      : input.classList.add(Forms.stateClasses.invalid);
  };

  static isValidateEmpty(input) {
    return !!input.value.trim().length;
  };

  static isValidateEmail(input) {
    return Validation.expression.email.test(input.value);
  };

  static isValidateName(input) {
    return Validation.expression.name.test(input.value) 
      && (input.value.length > 1 && input.value.length < 20);
  }
};
