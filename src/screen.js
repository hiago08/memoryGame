const util = Util;

const CONTENT_ID = "content";
const PLAY_BUTTON_ID = "start";
const MESSAGE_ID = "message";
const INVISIBLE_CLASS = "invisible";
const LOADING_ID = "loading";
const TIMER_ID = "timer";
const SHOW_ALL_BUTTON_ID = "showAll";

const MESSAGES = {
  success: {
    text: "Match!",
    class: "alert-success",
  },
  error: {
    text: "Oops, don't match!",
    class: "alert-danger",
  },
};

class Screen {
  static getHtml(item) {
    return `
      <div class="col-md-3">
        <div class="card" style="width: 50%" onclick="window.checkSelection('${item.id}','${item.name}')">
          <img src="${item.img}" name="${item.name}" class="card-img-top" alt="..." />
        </div>
        <br />
      </div>
    `;
  }

  static changeHtmlContent(html) {
    const content = document.getElementById(CONTENT_ID);
    content.innerHTML = html;
  }

  static generateHtmlStringFromImage(items) {
    return items.map(Screen.getHtml).join("");
  }

  static updateImages(items) {
    const html = Screen.generateHtmlStringFromImage(items);
    Screen.changeHtmlContent(html);
  }

  static configurePlayButton(onClickFunction) {
    const playButton = document.getElementById(PLAY_BUTTON_ID);
    playButton.onclick = onClickFunction;
  }

  static configureCheckSelectionButton(onClickFunction) {
    window.checkSelection = onClickFunction;
  }

  static showHeroes(heroName, img) {
    const htmlElements = document.getElementsByName(heroName);
    htmlElements.forEach((item) => (item.src = img));
  }

  static async showMessage(success = true) {
    const element = document.getElementById(MESSAGE_ID);
    if (success) {
      element.classList.remove(MESSAGES.error.class);
      element.classList.add(MESSAGES.success.class);
      element.innerText = MESSAGES.success.text;
    } else {
      element.classList.remove(MESSAGES.success.class);
      element.classList.add(MESSAGES.error.class);
      element.innerText = MESSAGES.error.text;
    }
    element.classList.remove(INVISIBLE_CLASS);

    await util.timeout(1500);
    element.classList.add(INVISIBLE_CLASS);
  }

  static showLoading(show = true) {
    const loading = document.getElementById(LOADING_ID);
    if (show) {
      loading.classList.remove(INVISIBLE_CLASS);
      return;
    }
    loading.classList.add(INVISIBLE_CLASS);
  }

  static startTimer() {
    let timerRange = 3;
    const timerElement = document.getElementById(TIMER_ID);
    const textIdentifier = "$$timer";
    const defaultText = `Starting in ${textIdentifier} seconds...`;

    const updateMessage = () => {
      timerElement.innerHTML = defaultText.replace(
        textIdentifier,
        timerRange--
      );
    };

    updateMessage();
    const intervalId = setInterval(updateMessage, 1000);
    return intervalId;
  }

  static clearTimer(intervalId) {
    clearInterval(intervalId);
    document.getElementById(TIMER_ID).innerHTML = "";
  }

  static configureShowAllButton(onClickFunction) {
    const showAllButton = document.getElementById(SHOW_ALL_BUTTON_ID);
    showAllButton.onclick = onClickFunction;
  }
}
