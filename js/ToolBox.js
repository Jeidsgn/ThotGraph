export class ToolBox {
  constructor(scene) {
    this.scene = scene;
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
      .on("pointerdown", (buttonName) => activateButton.call(this.scene, buttonName));

    this.scene.toolboxButtons.push(moveButton);
  }

  createDependentButtons() {
    // Crear botones dependientes según los elementos en js/
    for (let i = 0; i < elementNames.length; i++) {
      const button = this.scene.add
        .text(100 + i * 100, 550, elementNames[i], { fill: "#ffffff" })
        .setInteractive()
        .on("pointerdown", (buttonName) =>
          activateButton.call(this.scene, buttonName)
        );

      toolboxButtons.push(button);
    }
  }

  activateButton(buttonName) {
    if (activeButton) {
      activeButton.setStyle({ fill: "#ffffff" });
    }

    activeButton = toolboxButtons.find((button) => button.text === buttonName);
    if (activeButton) {
      activeButton.setStyle({ fill: "#00ff00" });
      isDrawingEnabled = !isDrawingEnabled; // Cambiar el estado del dibujo
      waitingForClick = true; // Cambiar a false después del primer clic
      // Cambiar el texto del botón según el estado del dibujo
      this.scene.children.list[1].setText(
        isDrawingEnabled ? "Desactivar Dibujo" : "Activar Dibujo"
      );
    }
  }
}
