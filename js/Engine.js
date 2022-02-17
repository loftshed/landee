// contains all game logic relating to player/enemy interaactions
// and enemy generation + evolution over time
// constructor parameter is the page root
class Engine {
  constructor(theRoot) {
    this.root = theRoot; // stores reference to root
    this.player = new Player(this.root); // creates player in root, see player.js
    this.enemies = []; // sets this.enemies to blank array
    this.extraLives = 3;
    this.gameAreaOverlay = document.getElementById("game-area-overlay");
    this.gameAreaOverlay2 = document.getElementById("game-area-overlay2");
    this.playerChar = document.getElementById("player-character");
    this.gameTheme = document.getElementById("game-theme");
    this.tvStatic = document.getElementById("tv-static");
    this.tvOn = document.getElementById("tv-static");
    addBackground(this.root); // adds background image
  }

  firstRun = () => {
    this.gameTheme.play();
    this.gameTheme.volume = 0;
    const textAlert = new Text(this.root, "50%", "50%");
    textAlert.update(`PRESS ANY KEY\nTO START`);
    this.playerChar.style.display = "none";
    document.addEventListener("keydown", this.gameLoop);
  };

  // main game loop: updates enemy pos, detects collisions, removes enemies
  gameLoop = () => {
    const textAlertNode = document.getElementById("text-alert");
    const textAlert = new Text(this.root, "50%", "50%");
    this.root.removeChild(textAlertNode);
    this.gameTheme.volume = 0.3;

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }
    this.playerChar.style.display = "inline";
    ////////////////////////////
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    // uses # of milliseconds since run of gameLoop() to update enemy pos
    // if enemy is below game board, enemy.destroyed will be set to 'true' in enemy.js
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed; // runs this.enemies through array.filter
    }); // and overwrites with new array of remaining enemies
    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies); // uses nextEnemySpot to find open column
      this.enemies.push(new Enemy(this.root, spot)); // & adds an enemy to it
    } // while there are less enemies than max onscreen enemies (defined in data.js),

    if (this.isPlayerDead()) {
      // const gameAreaOverlay = document.getElementById("game-area-overlay");
      // const gameAreaOverlay2 = document.getElementById("game-area-overlay2");
      document.removeEventListener("keydown", this.gameLoop);
      this.playerChar.classList.add("death-anim");

      if (this.extraLives > 0) {
        document.removeEventListener("keydown", keydownHandler);
        setTimeout(() => {
          this.gameTheme.volume = 0.1;
          if (this.extraLives > 1) {
            textAlert.update(
              `${this.extraLives} LIVES REMAINING\n\nPRESS ANY KEY TO\nSTART NEXT ROUND`
            );
          } else {
            textAlert.update(
              `${this.extraLives} LIFE REMAINING\n\nPRESS ANY KEY TO\nSTART NEXT ROUND`
            );
          }
        }, 500);

        document.addEventListener("keydown", this.playAgain);
        return;
      } else if (this.extraLives === 0) {
        document.removeEventListener("keydown", keydownHandler);
        setTimeout(() => {
          this.gameTheme.volume = 0.1;
          textAlert.update("GAME OVER");
          setTimeout(() => {
            this.gameTheme.volume = 0;
            this.tvStatic.play();
            this.tvStatic.volume = 0.3;
            this.gameAreaOverlay.style.opacity = "100%";
            this.gameAreaOverlay2.style.background = "";
            this.gameAreaOverlay2.style.display = "inline";
            setTimeout(() => {
              this.gameAreaOverlay.style.transform =
                "scale(0.1) translatex(-637%) translatey(-538%)";
              this.gameAreaOverlay.style.borderRadius = "25%";
              this.gameAreaOverlay.style.filter = "blur(1px) brightness: 5000%";
              setInterval(() => {
                if (this.tvStatic.volume >= 0.01) {
                  this.tvStatic.volume -= 0.01;
                } else {
                  clearInterval();
                }
              }, 2);
              this.tvStatic.volume = 0;
              setTimeout(() => {
                this.gameAreaOverlay.style.opacity = "0%";
              }, 1000);
            }, 3000);
          }, 2000);
        }, 500);
        return;
      }
    }
    setTimeout(this.gameLoop, 20); // if player still alive, run another game loop in 20 ms
  };

  isPlayerDead = () => {
    let playerDead;
    // function to determine if player ded based exclusively x/y coords, no hitbox
    this.enemies.forEach((enemy) => {
      if (
        enemy.y >= GAME_HEIGHT - PLAYER_HEIGHT - ENEMY_HEIGHT &&
        enemy.x === this.player.x
      ) {
        playerDead = true;
      }
    });
    return playerDead;
  };

  playAgain = () => {
    document.removeEventListener("keydown", this.playAgain);
    console.log(this.extraLives);
    this.extraLives = this.extraLives - 1;
    setTimeout(() => {
      document.addEventListener("keydown", keydownHandler);
      this.playerChar.classList.remove("death-anim");
      this.gameLoop();
    }, 500);
  };
}
