import { ToolBox } from "./ToolBox.js";
import { Element } from "../elements/Elements.js";

export class Board extends Phaser.Scene {
  constructor() {
    super({ key: "scene" });

    // Propiedades para controlar el estado de la interacción en el tablero
    this.waitingForClick = true;
    this.isDrawingEnabled = false;
    this.activeButtonCallback = null;  // Agregar una propiedad para almacenar la función activa del botón
    this.parabolic = null;
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
    this.load.spritesheet('point', './assets/point/Point.svg', { frameWidth: 28, frameHeight: 45 });
    this.load.image('Bg', './assets/Bg.svg');
  }

  // Función que se ejecuta al crearse la escena
  create() {
    // Crea el cuadro de herramientas (toolbox)
    this.input.setDefaultCursor('pointer');
    this.toolbox.createToolbox();
    // Establece el color de fondo
    const background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Bg'
    );
    background.setDepth(-1);
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
    //cuerda vibrante
    if (this.parabolic != null) {
      this.count += 0.3;
      let points = this.parabolic.getSpacedPoints(10);
      for (let i = 1; i < points.length - 1; i++) {
        points[i].x += Math.cos(i * 0.5 + this.count);
        if (i === 1) {
          this.curvestyle.moveTo(points[i].x, points[i].y);
        } else {
          this.curvestyle.lineTo(points[i].x, points[i].y);
        }
      }
      this.curvestyle.strokePath();
    };
    // Configura la función de clic en el contenedor (tablero)
    // Lógica de actualización común, si es necesario
  }


}
