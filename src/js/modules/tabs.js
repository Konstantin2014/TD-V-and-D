const tabs = (
  headerSelector,
  tabSelector,
  contentSelector,
  activeClass,
  display = "block"
) => {
  const header = document.querySelector(headerSelector);
  const tab = document.querySelectorAll(tabSelector);
  const content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach((item) => {
      item.style.display = "none";
    });

    tab.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    content[i].style.display = display;
    tab[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  header.addEventListener("click", (event) => {
    // навешиваем обработчик событий на общую область обьединяющую все tab
    const target = event.target; // элемент на котором произошло событие
    if (
      // проверяем что мы кликнули в один из tab-ов, т к могут быть и другие элементы
      target &&
      (target.classList.contains(tabSelector.replace(/\./, "")) || // т к мы передаем класс, то нуно убрать точку
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))
    ) {
      tab.forEach((item, i) => {
        // перебираем tab и запоминаем его и его номер по порядку
        if (target == item || target.parentNode == item) {
          // если tab на который кликнул подьзователь равен тому tab который сейчас
          // перебирается запрминаем индекс и используем его
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};

export default tabs;
