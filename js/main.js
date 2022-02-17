// creates a new instance of engine class with id "app"

const gameEngine = new Engine(document.getElementById("app"));
const remoteMask = document.getElementById("remote-mask");
const gameAreaOverlay = document.getElementById("game-area-overlay");
const gameAreaOverlay2 = document.getElementById("game-area-overlay2");
const tvStatic = document.getElementById("tv-static");
const tvOn = document.getElementById("tv-on");
const testTone = document.getElementById("test-tone");

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

// initiates remote pulsing so ya know what to do
remoteMask.classList.add("mask-pulse");

// some overlay crap
gameAreaOverlay.style.width = `${GAME_WIDTH}px`;
gameAreaOverlay.style.height = `${GAME_HEIGHT}px`;
gameAreaOverlay2.style.width = `${GAME_WIDTH}px`;
gameAreaOverlay2.style.height = `${GAME_HEIGHT}px`;
gameAreaOverlay2.style.zIndex = "97";
gameAreaOverlay2.style.display = "inline";

turnOn = () => {
  remoteMask.removeEventListener("click", turnOn);
  remoteMask.classList.remove("mask-pulse");
  gameAreaOverlay2.style.display = "none";
  gameAreaOverlay.style.transition = "none";
  gameAreaOverlay.style.opacity = "100%";
  tvStatic.volume = 0;
  tvOn.volume = 0.5;
  tvOn.play();
  setTimeout(() => {
    tvStatic.play();
    setInterval(() => {
      if (tvStatic.volume < 0.3) {
        tvStatic.volume += 0.01;
      } else {
        clearInterval();
      }
    }, 2);
    setTimeout(() => {
      tvStatic.pause();
      gameAreaOverlay2.style.display = "inline";
      gameAreaOverlay2.style.boxShadow = "none";
      gameAreaOverlay.style.opacity = "35%";
      gameAreaOverlay2.style.filter = "blur (3px) sepia(90%)";
      gameAreaOverlay2.style.backgroundImage = "url(assets/color-test.png)";
      testTone.volume = 0.1;
      testTone.play();
      //// display colour bars
      setTimeout(() => {
        testTone.pause();
        gameAreaOverlay2.style.display = "none";
        gameEngine.firstRun();
      }, 250);
    }, 500);
  }, 1000);
};

document.addEventListener("keydown", keydownHandler);
remoteMask.addEventListener("click", turnOn);
