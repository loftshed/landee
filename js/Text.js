// probably to bring up a game over message and a start again button
class Text {
  // takes page root & desired x/y pos
  constructor(root, xPos, yPos) {
    // creating our text element & applying attributes
    const div = document.createElement("div");

    div.style.position = "absolute";
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.color = "white";
    div.style.font = "bold 30px Impact";
    div.style.zIndex = 2000;

    root.appendChild(div);

    this.domElement = div; // allows us to refer back to the element later as this.domElement
  }

  // updates text in element
  update(txt) {
    this.domElement.innerText = txt;
  }
}
