// contains all game logic relating to player/enemy interaactions
// and enemy generation + evolution over time
// constructor parameter is the page root
class Engine {
  constructor(theRoot) {
    this.root = theRoot; // stores reference to root
    this.player = new Player(this.root); // creates player in root, see player.js
    this.enemies = []; // sets this.enemies to blank array
    addBackground(this.root); // adds background image
  }

  // main game loop: updates enemy pos, detects collisions, removes enemies
  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime(); // records curr. time to this.lastFrame
    } // (as # of milliseconds since midnight jan 1. 1970)

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
      // checks if player is dead, if so returns from method (exiting game loop)
      // this.enemies.forEach((enemy) => {
      //   .removeChild(enemy);
      // });
      window.alert("Game over");
      return;
    }
    setTimeout(this.gameLoop, 20); // if player still alive, run another game loop in 20 ms
  };

  // determines if player is ded
  // if this function returns 'true' gameLoop will end
  isPlayerDead = () => {
    let playerDead;
    console.log(this.enemies);
    console.log(this.player);
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
}
