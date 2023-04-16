function onLoad() {
  const dependencies = {
    screen: Screen,
    util: Util,
  };

  const memoryGame = new MemoryGame(dependencies);
  memoryGame.init();
}

window.onload = onLoad;
