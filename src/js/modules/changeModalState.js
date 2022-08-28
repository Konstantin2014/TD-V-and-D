import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
  //доступ ко всем пяти єлементам с которых получаем данные со страницы
  const windowForm = document.querySelectorAll(".balcon_icons_img");
  const windowWidth = document.querySelectorAll("#width");
  const windowHeight = document.querySelectorAll("#height");
  const windowType = document.querySelectorAll("#view_type");
  const windowProfile = document.querySelectorAll(".checkbox");

  checkNumInputs("#width"); // валидируем данные введенные в поля
  checkNumInputs("#height"); // валидируем данные введенные в поля

  function bindActionToElems(event, elem, prop) {
    // ф-ция которая на определенный elem навязывает обработчик события event и
    // записывает в prop определенное свойство в нашем глобальном обьекте стэйта
    elem.forEach((item, i) => {
      item.addEventListener(event, () => {
        switch (
          item.nodeName // в зависимости от того элемента на который кликнул пользователь совершаем разные операции
        ) {
          case "SPAN":
            state[prop] = i;
            break;
          case "INPUT":
            if (item.getAttribute("type") === "checkbox") {
              i === 0 ? (state[prop] = "Холодне") : (state[prop] = "Тепле");
              elem.forEach((box, j) => {
                box.checked = false;
                if (i == j) {
                  box.checked = true;
                }
              });
            } else {
              state[prop] = item.value;
            }
            break;
          case "SELECT":
            state[prop] = item.value;
            break;
        }

        console.log(state);
      });
    });
  }
  // привязываем все действия к определенным элементам сопределенными событиями
  bindActionToElems("click", windowForm, "form");
  bindActionToElems("input", windowHeight, "height");
  bindActionToElems("input", windowWidth, "width");
  bindActionToElems("change", windowType, "type");
  bindActionToElems("change", windowProfile, "profile");
};

export default changeModalState;
