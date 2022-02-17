// functions to be used in the engine.js file

// determines slot for next enemy [0, 1, 2, 3, or 4]
const nextEnemySpot = (enemies) => {
  // determines # of x-pos gradations by dividing game board by enemy width
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;
  // to avoid placing 2 enemies in same lane, determines which spots available
  // by creating array of 5 false elements, then iterating through enemies array with forEach
  // every enemy instance has an spot property w/ which we can use to modify spotsTaken array
  const spotsTaken = [false, false, false, false, false, false, false, false];
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
  const gameBorder = document.getElementById("game-border");
  const pngBorder = document.getElementById("png-border");
  // const gameAreaOverlay = document.getElementById("game-area-overlay");
  // const gameAreaOverlay2 = document.getElementById("game-area-overlay2");
  const bg = document.createElement("img"); // creates img DOM node

  bg.src = "assets/title.png"; // sets game bg img src
  bg.style.height = `${GAME_HEIGHT}px`; // sets game bg height
  bg.style.width = `${GAME_WIDTH}px`; // sets game bg width
  bg.id = "game-bg";
  root.append(bg); // appends bg to root of DOM node

  // sets game border height and width to size of gameplay area
  // for easier fuckwithability
  pngBorder.style.width = `${GAME_WIDTH * 1.41}px`;
  gameBorder.style.height = `${GAME_HEIGHT}px`;
  gameBorder.style.width = `${GAME_WIDTH}px`;
  // gameAreaOverlay.style.width = `${GAME_WIDTH}px`;
  // gameAreaOverlay.style.height = `${GAME_HEIGHT}px`;
  // gameAreaOverlay2.style.width = `${GAME_WIDTH}px`;
  // gameAreaOverlay2.style.height = `${GAME_HEIGHT}px`;
};

// audio = (source, id) => {
//   const newAudio = document.createElement("audio");
//   newAudio.src = source;
//   newAudio.id = id;
//   document.body.appendChild(newAudio);
// };
