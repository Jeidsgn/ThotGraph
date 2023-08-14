export class ToolBox {
  constructor(scene) {
    this.scene = scene;
    this.scene.toolboxButtons = []; // Initialize the array here
    this.scene.activeButton = null; // Referencia al botón activo
    this.scene.elementNames = []; // Array para almacenar los nombres de los elementos.
  }

  createToolbox() {// Crear botones base y botones dependientes (según elementos en elements/)
    this.createBaseButtons();
    this.createDependentButtons();
  }

  createBaseButtons() {// Crear botones base y agregarlos al toolbox
    const moveButton = this.scene.add
      .text(10, 550, "Mover", { fill: "#ffffff" })
      .setInteractive()
      .on("pointerdown", () => this.activateButton("Mover"));

    this.scene.toolboxButtons.push(moveButton); // Use the scene's array
  }

  createDependentButtons() {
    for (let i = 0; i < this.scene.elementNames.length; i++) {
      // Use this.scene.elementNames.length
      const button = this.scene.add
        .text(100 + i * 100, 550, this.scene.elementNames[i], {
          fill: "#ffffff",
        })
        .setInteractive()
        .on("pointerdown", () =>
          this.activateButton(this.scene.elementNames[i])
        ); // Use this.scene.elementNames[i]

      this.scene.toolboxButtons.push(button);
    }
  }

  activateButton(buttonName) {
    if (this.scene.activeButton) {
      this.scene.activeButton.setStyle({ fill: "#ffffff" });
    }
  
    this.scene.activeButton = this.scene.toolboxButtons.find(button => button.text === buttonName);
    if (this.scene.activeButton) {
      this.scene.activeButton.setStyle({ fill: "#00ff00" });
      this.scene.isDrawingEnabled = !this.scene.isDrawingEnabled;
      this.scene.waitingForClick = true;
    }
  }
}
