// contains data and methods related to enemy
class Enemy {
  // takes two arguments: DOM element and enemy position
  constructor(theRoot, enemySpot) {
    this.root = theRoot; // recorded so we can use removeChild to 86 the enemy later on
    this.spot = enemySpot; // takes spot from constructor arg to place enemy in
    this.x = enemySpot * ENEMY_WIDTH; // x pos of enemy determined by its spot and width. it is made a property so two enemies don't spawn in the same spot.
    this.y = -ENEMY_HEIGHT; // y pos begins at -enemy_height so they spawn above play area
    // then later this.y is used to make the enemy fall
    this.destroyed = false; // this.destroyed declared, beginning as false
    // once true the enemy will be removed from play
    this.domElement = document.createElement("img"); // creates DOM element representing enemy sprite, later used with removeChild
    this.domElement.src = "./images/enemy.png"; // enemy sprite
    this.domElement.style.position = "absolute"; // sets enemy pos absolute
    this.domElement.style.left = `${this.x}px`; // moves enemy l/r
    this.domElement.style.top = `${this.y}px`; // moves enemy up/down
    this.domElement.style.zIndex = 5; // gives z index of 5

    // appends element to to the html root
    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  // sets speed property of the enemy. called on enemy instance every few ms
  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed; // updates y property in proportion to amount of time since last update
    this.domElement.style.top = `${this.y}px`; // updates css top property to make sprite descend

    if (this.y > GAME_HEIGHT) {
      // if y pos is greater than gameplay area height
      this.root.removeChild(this.domElement); // remove the enemy
      this.destroyed = true; // and mark it as destroyed
    }
  }
}
