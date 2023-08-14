export class ToolBox {
    constructor(scene) {
      this.scene = scene;
      this.scene.toolboxButtons = []; // Initialize the array here
      this.scene.activeButton = null; // Referencia al botón activo
    }
  
    createToolbox() {
      // Crear botones base y botones dependientes (según elementos en elements/)
      this.createBaseButtons();
      this.createDependentButtons();
    }
  
    createBaseButtons() {
      // Crear botones base y agregarlos al toolbox
      const moveButton = this.scene.add
        .text(10, 550, "Mover", { fill: "#ffffff" })
        .setInteractive()
        .on("pointerdown", () => this.activateButton("Mover"));
  
      this.scene.toolboxButtons.push(moveButton); // Use the scene's array
    }
  
    createDependentButtons() {
      // Crear botones dependientes según los elementos en js/
      for (let i = 0; i < elementNames.length; i++) {
        const button = this.scene.add
          .text(100 + i * 100, 550, elementNames[i], { fill: "#ffffff" })
          .setInteractive()
          .on("pointerdown", () => this.activateButton(elementNames[i]));
  
        this.scene.toolboxButtons.push(button); // Use the scene's array
      }
    }
  
    activateButton(buttonName) {
      if (activeButton) {
        activeButton.setStyle({ fill: "#ffffff" });
      }
  
      activeButton = this.scene.toolboxButtons.find(button => button.text === buttonName);
      if (activeButton) {
        activeButton.setStyle({ fill: "#00ff00" });
        isDrawingEnabled = !isDrawingEnabled;
        waitingForClick = true;
  
        this.scene.children.list[1].setText(
          isDrawingEnabled ? "Desactivar Dibujo" : "Activar Dibujo"
        );
      }
    }
  }
  