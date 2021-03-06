export function isWebp() {
  function testWebP(callback) {
    const webP = new Image();
    webP.onerror = () => {
      callback(webP.height === 2);
    };

    webP.onload = webP.onerror;
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP((support) => {
    const className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

export const getConfig = (element, selector) => {
  const attribute = selector.substring(1, selector.length - 1);
  const attributeValue = element.getAttribute(attribute);
  let json = {};

  try {
    json = JSON.parse(attributeValue);
  } catch (error) {
    console.debug(error);
  }

  return json;
};

export const getAttr = (selector) => selector.substring(1, selector.length - 1);

export const throttle = (func, ms) => {
  let isLocked = false;

  return function () {
    if (isLocked) {
      return;
    }

    const context = this;
    const args = arguments;
    isLocked = true;

    setTimeout(() => {
      func.apply(context, args);
      isLocked = false;
    }, ms);
  };
};

export const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

export const offset = (el) => {
  const rect = el.getBoundingClientRect();
  const scrollTop = scrollPosition();
  return { top: rect.top + scrollTop };
};
