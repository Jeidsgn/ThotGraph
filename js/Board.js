import { ToolBox } from "./ToolBox.js";
import { Element } from "../elements/Elements.js";

export class Board extends Phaser.Scene {
  constructor() {
    super({ key: "scene" });

    // Propiedades para controlar el estado de la interacción en el tablero
    this.waitingForClick = true;
    this.isDrawingEnabled = false;
    this.activeButtonCallback = null; // Agregar una propiedad para almacenar la función activa del botón
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

    // Crea el degradado vertical en el fondo
    this.createVerticalGradient();
  }

  // Función para crear el degradado vertical en el fondo
  createVerticalGradient() {
    const gradient = this.add.container(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );

    gradient.setDepth(-1); // Coloca el degradado detrás de otros elementos

    // Define los colores del degradado
    const colorStops = [
      { color: 0x082934, offset: 0 },
      { color: 0x081C34, offset: 0.5 },
      { color: 0x081A34, offset: 1 }
    ];

    // Crea un gráfico y aplica el degradado de relleno
    const graphics = this.make.graphics();
    graphics.fillStyle(colorStops);
    graphics.fillRect(
      -this.cameras.main.width / 2,
      -this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height
    );

    gradient.add(graphics);
  }

  // Función de actualización que se ejecuta en cada frame
  update() {
    if (this.isDrawingEnabled && !this.waitingForClick) {
      // Llama a la función activa correspondiente
      if (this.activeButtonCallback) {
        // Comprobamos si la función está definida
        this.activeButtonCallback(); // Ejecutamos la función activa
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
