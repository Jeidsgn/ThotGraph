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
      .sprite(100, 550, 'Button')
      .setInteractive()
      .on("pointerdown", () => this.activateButton("Mover"));
    moveButton.setData('text',"Mover");
    this.scene.toolboxButtons.push(moveButton);
    const text = this.scene.add.text(10, 550, "Mover", { fill: "#0000"});
  }
  
  createDependentButtons() {
    for (let i = 0; i < this.scene.elementNames.length; i++) {
      
      const button = this.scene.add
        .sprite(100 + i * 100, 550, 'Button')
        .setInteractive()
        .on("pointerdown", () =>
          this.activateButton(this.scene.elementNames[i])
        );
      button.setData('text',this.scene.elementNames[i]);
      this.scene.toolboxButtons.push(button);
      const texti = this.scene.add.text(100 + i * 100, 550, this.scene.elementNames[i], {fill:"#0000"});
    }
  }
  

  activateButton(buttonName) {
    if (this.scene.activeButton) {
      this.scene.activeButton.setStyle({ fill: "#ffffff" });
    }

    this.scene.activeButton = this.scene.toolboxButtons.find(
      (button) => button.data.values.text === buttonName
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
