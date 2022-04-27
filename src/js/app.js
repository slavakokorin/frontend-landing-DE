import Forms from "./modules/forms/index.js";
import * as flsFunctions from "./modules/functions.js";
import Menu from "./modules/menu.js";
import Modals from "./modules/modals.js";
// import transformMenu from "./modules/transformMenu.js"
// import { displayMenu } from "./modules/menu.js"

flsFunctions.isWebp();

document.addEventListener("DOMContentLoaded", () => {
  new Modals();
  new Forms();
  // transformMenu();
  // displayMenu();
  new Menu();
});
