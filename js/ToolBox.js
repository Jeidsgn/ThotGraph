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
    const moveButton = this.scene.add
      .image(x, y, 'Button')
      .text(10, 550, "Mover", { fill: "#ffffff"})
      .setInteractive()
      .on("pointerdown", () => this.activateButton("Mover"));
  
    this.scene.toolboxButtons.push(moveButton);
  }
  
  createDependentButtons() {
    for (let i = 0; i < this.scene.elementNames.length; i++) {
      const button = this.scene.add
        .image(100 + i * 100, 550, 'Button')
        .text(100 + i * 100, 550, this.scene.elementNames[i], {fill:"#ffffff"})
        .setInteractive()
        .on("pointerdown", () =>
          this.activateButton(this.scene.elementNames[i])
        );
  
      this.scene.toolboxButtons.push(button);
    }
  }
  

  activateButton(buttonName) {
    if (this.scene.activeButton) {
      this.scene.activeButton.setStyle({ fill: "#ffffff" });
    }

    this.scene.activeButton = this.scene.toolboxButtons.find(
      (button) => button.text === buttonName
    );

    if (this.scene.activeButton) {
      this.scene.activeButton.setStyle({ fill: "#00ff00" });

      this.scene.isDrawingEnabled = !this.scene.isDrawingEnabled;
      this.scene.waitingForClick = true;

      /// Almacena el nombre de la función en una variable
      this.scene.activeButtonCallback = this.elements.buttonToFunction(buttonName);
    }
  }
}
