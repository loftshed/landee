class Text {
  constructor(root, xPos, yPos) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.color = "#56ffff";
    // div.style.backgroundColor = "#55FFFF";
    div.style.padding = "10px 0px";
    div.style.font = "30px 'Press Start 2P', cursive";
    div.style.zIndex = 90;
    div.style.transform = "translateX(-50%) translateY(-53.8%)";
    div.style.textAlign = "center";
    div.style.width = GAME_WIDTH;
    div.id = "text-alert";

    root.appendChild(div);

    this.domElement = div;
  }

  update(txt) {
    this.domElement.innerText = txt;
  }
}
