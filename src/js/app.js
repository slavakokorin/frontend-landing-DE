import Forms from "./modules/forms/index.js";
import * as flsFunctions from "./modules/functions.js";
import Menu from "./modules/menu.js";
import Modals from "./modules/modals.js";
import Animation from "./modules/animation.js";

flsFunctions.isWebp();

document.addEventListener("DOMContentLoaded", () => {
  new Modals();
  new Forms();
  new Menu();
  new Animation();
});
