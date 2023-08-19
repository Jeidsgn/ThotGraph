import { ToolBox } from "./ToolBox.js";
import { Element } from "../elements/Elements.js";

export class Board extends Phaser.Scene {
  constructor() {
    super({ key: "scene" });
    
    // Propiedades para controlar el estado de la interacción en el tablero
    this.waitingForClick = true;
    this.isDrawingEnabled = false;
    this.activeButtonCallback = null;  // Agregar una propiedad para almacenar la función activa del botón
  }

  // Función de inicialización de la escena
  init() {
    // Crea instancias de las clases ToolBox y Element pasando "this" como referencia a la escena
    this.toolbox = new ToolBox(this);
    this.elements = new Element(this);
    // Inicializa los nombres y elementos
    this.elements.Names();
  }

  preload() {
    // Cargar recursos como imágenes y sprites aquí, si es necesario
  }

  // Función que se ejecuta al crearse la escena
  create() {
    // Crea el cuadro de herramientas (toolbox)
    this.toolbox.createToolbox();

    // Establece el fondo con degradado vertical
    const gradient = this.add.graphics();
    gradient.fillStyle(0x082934, 1); // Color superior
    gradient.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    gradient.fillStyle(0x081C34, 1); // Color medio
    gradient.fillRect(0, 0.33 * this.cameras.main.height, this.cameras.main.width, 0.34 * this.cameras.main.height);
    gradient.fillStyle(0x081A34, 1); // Color inferior
    gradient.fillRect(0, 0.67 * this.cameras.main.height, this.cameras.main.width, 0.34 * this.cameras.main.height);

    // Establece el color de fondo de la escena
    this.cameras.main.transparent = true;
  }

  // Función de actualización que se ejecuta en cada frame
  update() {
    if (this.isDrawingEnabled && !this.waitingForClick) {
      // Llama a la función activa correspondiente
      if (this.activeButtonCallback) {  // Comprobamos si la función está definida
        this.activeButtonCallback();  // Ejecutamos la función activa
      } else {
        console.log("Error en activeButtonCallback");
      }
    } else if (this.isDrawingEnabled && this.waitingForClick) {
      // Si el dibujo está habilitado y se espera un clic, marca que ya no se espera más
      this.input.on("pointerdown", () => {
        this.waitingForClick = false;
      });
    }
    // Configura la función de clic en el contenedor (tablero)
    // Lógica de actualización común, si es necesario
  }
}
