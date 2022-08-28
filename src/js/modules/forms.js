import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
  //получаем нужные нам элементы
  const form = document.querySelectorAll("form");
  const inputs = document.querySelectorAll("input"); // для очистки всех inputs

  checkNumInputs('input[name="user_phone"]');

  // проверка на ввод цифр

  const message = {
    // создаем обьект с сообщениями, которые понадобятся пользователю
    loading: "Завантаження...",
    success: "Дякуємо! Незабаром ми з вами зв'яжемось",
    failure: "Щось пішло не так...",
  };

  const postData = async (url, data) => {
    // ф-ция отвечающая за отправку запроса
    document.querySelector(".status").textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await res.text();
  };

  const clearInputs = () => {
    // ф-ция очищения всех input
    inputs.forEach((item) => {
      item.value = "";
    });
  };

  form.forEach(
    (
      item // перебираем все формы и навешиваем обработчик события submit
    ) =>
      item.addEventListener("submit", (event) => {
        event.preventDefault();

        // создаем пользователю блок с сообщением
        let statusMessage = document.createElement("div");
        statusMessage.classList.add("status");
        item.appendChild(statusMessage);

        const formData = new FormData(item); // собираем все данные из введенной формы
        if (item.getAttribute("data-calc") === "end") {
          for (let key in state) {
            formData.append(key, state[key]);
          }
        }

        postData("assets/server.php", formData) // отправляем запрос на сервер
          .then((res) => {
            console.log(res);
            statusMessage.textContent = message.success;
          })
          .catch(() => (statusMessage.textContent = message.failure))
          .finally(() => {
            clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 5000);
          });
      })
  );
};

export default forms;
