import { Element } from "../elements/Elements.js";

export class ToolBox {
  constructor(scene) {
    this.scene = scene;
    this.elements = new Element(scene);
    this.scene.toolboxButtons = []; // Inicializa el array para almacenar los botones del cuadro de herramientas
    this.scene.activeButton = null; // Referencia al botón activo en el cuadro de herramientas
    this.scene.elementNames = []; // Array para almacenar los nombres de los elementos.
    this.buttonToFunction = this.scene.buttonToFunction;
  }

  // Crea los botones en el cuadro de herramientas
  createToolbox() {
    // Crea los botones base y los botones dependientes (según elementos en elements/)
    this.createBaseButtons();
    this.createDependentButtons();
  }

  createBaseButtons() {
    // Crea el botón Mover
    const moveButton = this.createButton(10, this.scene.sys.game.config.height - 50, "Mover");
    this.scene.toolboxButtons.push(moveButton);
  }

  createDependentButtons() {
    for (let i = 0; i < this.scene.elementNames.length; i++) {
      const x = 100 + i * 100;
      const y = this.scene.sys.game.config.height - 50;
      const button = this.createButton(x, y, this.scene.elementNames[i]);
      this.scene.toolboxButtons.push(button);
    }
  }

  createButton(x, y, text) {
    const button = this.scene.add.rectangle(x, y, 80, 80, 0xF2A950);
    button.setInteractive();
    
    const buttonText = this.scene.add.text(x, y, text, { fill: "#ffffff" });
    buttonText.setOrigin(0.5);
    
    button.on("pointerdown", () => this.activateButton(text));

    return button;
  }

  activateButton(buttonName) {
    if (this.scene.activeButton) {
      this.scene.activeButton.setFillStyle(0xF2A950);
    }

    this.scene.activeButton = this.scene.toolboxButtons.find(
      (button) => button.name === buttonName
    );

    if (this.scene.activeButton) {
      this.scene.activeButton.setFillStyle(0x5ACEE8);

      this.scene.isDrawingEnabled = !this.scene.isDrawingEnabled;
      this.scene.waitingForClick = true;

      // Almacena el nombre de la función en una variable
      this.scene.activeButtonCallback = this.elements.buttonToFunction(buttonName);
    }
  }
}
