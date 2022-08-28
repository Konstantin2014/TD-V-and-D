import "./slider";
import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from "./modules/forms";
import changeModalState from "./modules/changeModalState";
import timer from "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
  //глобальный обработчик событий
  "use strict";
  let modalState = {}; // переменная, которая является состоянием модального окна
  // где пользователь что-то выбирает. этот обьект постоянно модифицируется при
  // помощи changeModalState

  let deadline = "2023-02-02";

  changeModalState(modalState); //  валидация инпутов

  modals();

  tabs(".glazing_slider ", ".glazing_block", ".glazing_content", "active");
  tabs(
    ".decoration_slider",
    ".no_click",
    ".decoration_content > div > div",
    "after_click"
  );

  tabs(
    ".balcon_icons",
    ".balcon_icons_img",
    ".big_img > img",
    "do_image_more",
    "inline-block"
  );

  forms(modalState); // modalState чтобы отправляемая форма знала о тех данных
  // которые ввел пользователь на странице

  timer(".container1", deadline);
});
