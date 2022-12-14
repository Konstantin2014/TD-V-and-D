const modals = () => {
  function bindModal( // ф-ция отвечает за привязку окна к определенному триггеру
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true
  ) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);

    const windows = document.querySelectorAll("[data-modal]"); // для получения все хмодальных окон чтобы их впоследствии закрыть

    const scroll = calcScroll();

    trigger.forEach((item) => {
      // forEach т к использовался querySelectorAll
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        windows.forEach((item) => {
          // перебираем псевдомассив
          item.style.display = "none";
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
        // document.body.classList.add('modal-open');
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
      // document.body.classList.remove('modal-open');
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal && closeClickOverlay) {
        // если пользователь кликнет на подложку и если closeClickOverlay равно true
        windows.forEach((item) => {
          item.style.display = "none";
        });

        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
        // document.body.classList.remove('modal-open');
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      document.querySelector(selector).style.display = "block";
      document.body.style.overflow = "hidden";
    }, time);
  }

  function calcScroll() {
    // ф-ция подсчитывающая растояния скрола в px чтобы убрать скачки при появлении модалки
    let div = document.createElement("div"); // создаем блок

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth; // offsetWidth это полная ширина минус clientWidth,
    // включающая padding? content и не включается прокрутка и в результате получаем ширину самой прокрутки
    div.remove();

    return scrollWidth; // возвращаем полученное значение ширины скрола
  }

  bindModal(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );
  bindModal(".phone_link", ".popup", ".popup .popup_close");
  bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");

  bindModal(
    ".popup_calc_button",
    ".popup_calc_profile",
    ".popup_calc_profile_close",
    false
  );
  bindModal(
    ".popup_calc_profile_button",
    ".popup_calc_end",
    ".popup_calc_end_close",
    false
  );
  // showModalByTime('.popup', 60000);
};

export default modals;
