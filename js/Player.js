class Player {
  // contains data and methods related to player character - only takes one parameter;
  constructor(root) {
    // ^^ the parent DOM node
    // establishes initial x pos (dist. from left margin) and stores it in player class
    this.x = 5 * PLAYER_WIDTH;
    // establishes initial y pos (always remains the same in default game config)
    const y = GAME_HEIGHT - PLAYER_HEIGHT - 10; // y pos is distance from top margin
    // creates a DOM node and assigns it properties
    this.domElement = document.createElement("img");
    this.domElement.src = "images/player.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${y}px`;
    this.domElement.style.zIndex = "10";
    root.appendChild(this.domElement);
  }

  // function to move player left by subtracting player width from current l-pos
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }

  // function to move player left by adding player width to current l-pos
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }
}
