// functions to be used in the engine.js file

// determines slot for next enemy [0, 1, 2, 3, or 4]
const nextEnemySpot = (enemies) => {
  // determines # of x-pos gradations by dividing game board by enemy width
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;
  // to avoid placing 2 enemies in same lane, determines which spots available
  // by creating array of 5 false elements, then iterating through enemies array with forEach
  // every enemy instance has an spot property w/ which we can use to modify spotsTaken array
  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  let candidate = undefined; // declare variable 'candidate' to store randomly checked spot
  // while a candidate is undefined or || candidate spot taken === true
  while (candidate === undefined || spotsTaken[candidate]) {
    // assigns candidate a # between 0 & value of enemySpots, rounded down w/ Math.floor
    candidate = Math.floor(Math.random() * enemySpots); // # maxes out at 1 less than enemySpots
  }
  return candidate; // returns number corresponding to free spot
};

// function that displays game play area, argument is a DOM node
const addBackground = (root) => {
  const bg = document.createElement("img"); // creates img DOM node
  bg.src = "images/stars.png"; // sets game bg img src
  bg.style.height = `${GAME_HEIGHT}px`; // sets game bg height
  bg.style.width = `${GAME_WIDTH}px`; // sets game bg width
  root.append(bg); // appends bg to root of DOM node

  // creates a white box beneath gameplay area with crazy high Z index
  // so that enemies disappear behind it as they pass the edge of gameplay area
  const whiteBox = document.createElement("div");
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = "absolute";
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = "#fff";
  root.append(whiteBox);
};
