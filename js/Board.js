import { ToolBox } from "./js/ToolBox.js";

export class Board extends Phaser.Scene {
  constructor() {
    super({ key: "scene" });

  }

  init() {
    this.toolbox = new ToolBox(this);
  }

  preload() {
    // Cargar recursos como imágenes y sprites
  }

  create() {
    // Crear el toolbox
    createToolbox.call(this);
    // Configurar la función de clic en el contenedor
    this.input.on("pointerdown", (pointer) => this.BoardClic(pointer));
  }

  update() {
    // Lógica de actualización común, si es necesario
  }

  createToolbox() {
    this.ToolBox.createToolbox();
  }
  BoardClic(pointer) {
    if (isDrawingEnabled && waitingForClick) {
      waitingForClick = false; // Cambiar a false después del primer clic
    } else if (isDrawingEnabled && !waitingForClick) {
      createPoint.call(this, pointer); // Crear el círculo sin esperar después del primer clic
    }
  }
}
