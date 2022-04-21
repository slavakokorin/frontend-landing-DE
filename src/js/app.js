import Forms from "./modules/forms/index.js";
import * as flsFunctions from "./modules/functions.js";
import Modals from "./modules/modals.js";
import transformMenu from "./modules/transformMenu.js"
import { burgerMenu } from "./modules/menu.js"

flsFunctions.isWebp();

document.addEventListener("DOMContentLoaded", () => {
  new Modals();
  new Forms();
  transformMenu();
  burgerMenu();
});
