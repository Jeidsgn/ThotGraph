import { ToolBox } from "./ToolBox.js";
import { Element } from "../elements/Elements.js";

export class Board extends Phaser.Scene {
  constructor() {
    super({ key: "scene" });

    // Propiedades para controlar el estado de la interacción en el tablero
    this.waitingForClick = true;
    this.isDrawingEnabled = false;
    this.activeButtonCallback = null;  // Agregar una propiedad para almacenar la función activa del botón

        // Configura el evento de clic en la escena para capturar el puntero
        this.input.on("pointerdown", (pointer) => {
            this.isClicking = true; // Se está haciendo clic
            this.elementalpointer = { x: pointer.x, y: pointer.y }; // Almacena la posición del puntero
          });
          // Capturar el puntero en la escena
          this.input.on("pointermove", (pointer) => {
            this.pointermove = { x: pointer.x, y: pointer.y }; // Almacena la posición del puntero
          });
      
          // Configura el evento de liberación del clic para controlar cuando se deja de hacer clic
          this.input.on("pointerup", () => {
            this.isClicking = false; // No se está haciendo clic
          });

  }

  // Función de inicialización de la escena
  init() {
    // Crea instancias de las clases ToolBox y Element pasando "this" como referencia a la escena
    this.toolbox = new ToolBox(this);
    this.elements = new Element(this);
    // Inicializa los nombres y elementos
    this.elements.Names();
  }

  // Precarga de recursos (imágenes, sprites, etc.)
  preload() {
    // Cargar recursos como imágenes y sprites aquí, si es necesario
  }

  // Función que se ejecuta al crearse la escena
  create() {
    // Crea el cuadro de herramientas (toolbox)
    this.toolbox.createToolbox();
    // Configura el evento de clic en el contenedor (tablero)
    
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
