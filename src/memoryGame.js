class MemoryGame {
  constructor({ screen, util }) {
    this.screen = screen;
    this.util = util;
    this.initialHeroes = [
      { img: "./files/batman.png", name: "batman" },
      { img: "./files/flash.png", name: "flash" },
      { img: "./files/hellboy.png", name: "hellboy" },
      { img: "./files/deadpool.png", name: "deadpool" },
    ];
    this.defaultIcon = "./files/default.png";
    this.hiddenHeroes = [];
    this.selectedHeroes = [];
  }

  init() {
    this.screen.updateImages(this.initialHeroes);
    this.screen.configurePlayButton(this.play.bind(this));
    this.screen.configureCheckSelectionButton(this.checkSelection.bind(this));
    this.screen.configureShowAllButton(this.showHiddenHeroes.bind(this));
  }

  play() {
    this.shuffle();
  }

  async shuffle() {
    const copies = this.initialHeroes
      .concat(this.initialHeroes)
      .map((item) => {
        return Object.assign({}, item, { id: Math.random() / 0.5 });
      })
      .sort(() => Math.random() - 0.5);

    this.screen.updateImages(copies);
    this.screen.showLoading();

    const intervalId = this.screen.startTimer();

    await this.util.timeout(3000);
    this.screen.clearTimer(intervalId);
    this.hideHeroes(copies);
    this.screen.showLoading(false);
  }

  hideHeroes(heroes) {
    const hiddenHeroes = heroes.map(({ name, id }) => ({
      id,
      name,
      img: this.defaultIcon,
    }));
    this.screen.updateImages(hiddenHeroes);
    this.hiddenHeroes = hiddenHeroes;
  }

  checkSelection(id, name) {
    const item = { id, name };
    const selectedHeroes = this.selectedHeroes.length;
    switch (selectedHeroes) {
      case 0:
        this.selectedHeroes.push(item);
        break;
      case 1:
        const [option1] = this.selectedHeroes;
        this.selectedHeroes = [];

        if (option1.name === item.name && option1.id !== id) {
          this.showHeroes(item.name);
          this.screen.showMessage();
          return;
        }

        this.screen.showMessage(false);
        break;
    }
  }

  showHeroes(heroName) {
    const { img } = this.initialHeroes.find(({ name }) => heroName === name);
    this.screen.showHeroes(heroName, img);
  }

  showHiddenHeroes() {
    const hiddenHeroes = this.hiddenHeroes;

    for (const hero of hiddenHeroes) {
      const { img } = this.initialHeroes.find(
        (item) => item.name === hero.name
      );
      hero.img = img;
    }

    this.screen.updateImages(hiddenHeroes);
  }
}
