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
        .text(10, 550, "Mover", { fill: "#ffffff" })
        .setInteractive()
        .on("pointerdown", () => this.activateButton("Mover"));
  
      this.scene.toolboxButtons.push(moveButton); // Agrega el botón al array en la escena
    }
  
    // Crea los botones dependientes según los elementos disponibles y los agrega al cuadro de herramientas
    createDependentButtons() {
      for (let i = 0; i < this.scene.elementNames.length; i++) {
        const button = this.scene.add
          .text(100 + i * 100, 550, this.scene.elementNames[i], {
            fill: "#ffffff",
          })
          .setInteractive()
          .on("pointerdown", () =>
            this.activateButton(this.scene.elementNames[i])
          );
  
        this.scene.toolboxButtons.push(button); // Agrega el botón al array en la escena
      }
    }

    // Activa el botón seleccionado en el cuadro de herramientas
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
    
          if (buttonName === "Point") {
            console.log("El punto se seleccionó bien"); 
            this.scene.activeFunction() = this.scene.elements.point.createPoint();
          } else if (buttonName === "Mover") {
            console.log("El mover se seleccionó bien"); 
            this.scene.elements.point.movePoint();
          } else {
            // Agrega más condiciones aquí para otros botones y funciones
          }
        }
      }
      
  }
  