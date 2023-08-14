import { ToolBox } from "./ToolBox.js";
import { Element } from "../elements/Elements.js";

export class Board extends Phaser.Scene {
  constructor() {
    super({ key: "scene" });

    // Propiedades para controlar el estado de la interacción en el tablero
    this.waitingForClick = true;
    this.isDrawingEnabled = false;
  }

  // Función de inicialización de la escena
  init() {
    // Crea instancias de las clases ToolBox y Element pasando "this" como referencia a la escena
    this.toolbox = new ToolBox(this);
    this.elements = new Element(this);
    // Inicializa los nombres y elementos
    this.elements.Names();
    this.elements.init();
  }

  // Precarga de recursos (imágenes, sprites, etc.)
  preload() {
    // Cargar recursos como imágenes y sprites aquí, si es necesario
  }

  // Función que se ejecuta al crearse la escena
  create() {
    // Crea el cuadro de herramientas (toolbox)
    this.toolbox.createToolbox();
    // Configura la función de clic en el contenedor (tablero)
    this.input.on("pointerdown", (pointer) => this.BoardClic(pointer));
  }

  // Función de actualización que se ejecuta en cada frame
  update() {
    // Lógica de actualización común, si es necesario
  }

  // Función para manejar el clic en el tablero
  BoardClic(pointer) {
    if (this.isDrawingEnabled && !this.waitingForClick) {
      // Llama a la función activa correspondiente
      if (this.scene.activeFunction) {
        this.scene.activeFunction(pointer);
      }
    } else if (this.isDrawingEnabled && this.waitingForClick) {
      // Si el dibujo está habilitado y se espera un clic, marca que ya no se espera más
      this.waitingForClick = false;
    }
  }  
}
