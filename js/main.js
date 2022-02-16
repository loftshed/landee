// creates a new instance of engine class with id "app"

const gameEngine = new Engine(document.getElementById("app"));

// tells the game what to do when keydown event is detected
const keydownHandler = (event) => {
  // checks event code and calls appropriate function inPlayer.js
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
};

// add event listener

document.addEventListener("keydown", keydownHandler);

gameEngine.firstRun();
