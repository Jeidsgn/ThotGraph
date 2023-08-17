export class ToolBox {
  constructor(scene) {
    this.scene = scene;
    this.scene.toolboxButtons = []; // Inicializa el array para almacenar los botones del cuadro de herramientas
    this.scene.activeButton = null; // Referencia al botón activo en el cuadro de herramientas
    this.scene.elementNames = []; // Array para almacenar los nombres de los elementos.
  }

  // Crea los botones en el cuadro de herramientas
  createToolbox() {
    // Crea los botones base y los botones dependientes (según elementos en elements/)
    this.createBaseButtons();
    this.createDependentButtons();
  }

  // Crea los botones base y los agrega al cuadro de herramientas
  createBaseButtons() {
    const moveButton = this.scene.add
      .text(10, 550, "Mover", { fill: "#000000" })
      .setInteractive()
      .on("pointerdown", () => this.activateButton("Mover"));

    this.scene.toolboxButtons.push(moveButton); // Agrega el botón al array en la escena
  }

  // Crea los botones dependientes según los elementos disponibles y los agrega al cuadro de herramientas
  createDependentButtons() {
    for (let i = 0; i < this.scene.elementNames.length; i++) {
      const button = this.scene.add
        .text(100 + i * 100, 550, this.scene.elementNames[i], {
          fill: "#000000",
        })
        .setInteractive()
        .on("pointerdown", () =>
          this.activateButton(this.scene.elementNames[i])
        );

      this.scene.toolboxButtons.push(button); // Agrega el botón al array en la escena
    }
  }

  activateButton(buttonName) {
    if (this.scene.activeButton) {
      this.scene.activeButton.setStyle({ fill: "#f000000" });
    }

    this.scene.activeButton = this.scene.toolboxButtons.find(
      (button) => button.text === buttonName
    );

    if (this.scene.activeButton) {
      this.scene.activeButton.setStyle({ fill: "#00ff00" });

      this.scene.isDrawingEnabled = !this.scene.isDrawingEnabled;
      this.scene.waitingForClick = true;

      // Define un objeto de mapeo entre nombres de botones y funciones
      const buttonToFunction = {
        "Point": () => {
            this.scene.elements.point.createPoint(); 
        },
        "Mover": () => {
            this.scene.elements.point.movePoint();
        },
        // Agrega más mapeos para otros botones y funciones
      };
      /// Almacena el nombre de la función en una variable
      this.scene.activeButtonCallback = buttonToFunction[buttonName];
    }
  }
}
