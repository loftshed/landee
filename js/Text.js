// probably to bring up a game over message and a start again button

class Text {
  // takes page root & desired x/y pos
  constructor(root, xPos, yPos) {
    // this.root = root;  <<
    // this.xPos = xPos;  <<   necessary ???
    // this.yPos = yPos;  <<

    // creating our text element & applying attributes

    const div = document.createElement("div");

    div.style.position = "absolute";
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.color = "white";
    div.style.font = "40px 'Press Start 2P', cursive";
    div.style.zIndex = 90;
    div.style.transform = "translateX(-50%) translateY(-53.8%)";
    div.style.textAlign = "center";
    div.style.width = GAME_WIDTH;
    div.id = "text-alert";

    root.appendChild(div);

    this.domElement = div; // allows us to refer back to the element later as this.domElement
  }

  // updates text in element
  update(txt) {
    this.domElement.innerText = txt;
  }
}
