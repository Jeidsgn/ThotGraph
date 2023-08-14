import { ToolBox } from "./ToolBox.js";
import { Element } from "../elements/BaseElements.js";

export class Board extends Phaser.Scene {
  constructor() {
    super({ key: "scene" });
    
    this.waitingForClick = true; 
    this.isDrawingEnabled = false;

  }

  init() {
    this.toolbox = new ToolBox(this);
    this.elements = new Element(this)
  }

  preload() {
    // Cargar recursos como imágenes y sprites
  }

  create() {
    // Crear el toolbox
    this.toolbox.createToolbox();
    // Configurar la función de clic en el contenedor
    this.input.on("pointerdown", (pointer) => this.BoardClic(pointer));
  }

  update() {
    // Lógica de actualización común, si es necesario
  }

  BoardClic(pointer) {
    if (this.isDrawingEnabled && this.waitingForClick) {
        this.waitingForClick = false;
      } else if (this.isDrawingEnabled && !this.waitingForClick) {
        this.elements.point.createPoint(pointer); // Usa this.elements.point
      }
  }
}
