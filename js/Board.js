import { ToolBox } from "./ToolBox.js";
import { Element } from "../elements/Elements.js";

export class Board extends Phaser.Scene {
  constructor() {
    super({ key: "scene" });
    // Propiedades para controlar el estado de la interacción en el tablero
    this.parabolic = null;
    this.activatebutton = null;
    this.toolboxButtons = []; // Inicializa el array para almacenar los botones del cuadro de herramientas
    this.toolbox = new ToolBox(this);
    this.elements = new Element(this);
  }



  preload() {
    // Cargar recursos como imágenes y sprites aquí, si es necesario
    this.load.spritesheet('point', './assets/point/Point.svg', { frameWidth: 28, frameHeight: 36 });
    this.load.spritesheet('Button', './assets/point/Button.svg', { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet('Point', './assets/toolbox/createpoint.svg', { frameWidth: 80, frameHeight: 85 });
    this.load.spritesheet('Mover', './assets/toolbox/movepoint.svg', { frameWidth: 80, frameHeight: 85 });
    this.load.spritesheet('Segment', './assets/toolbox/createsegment.svg', { frameWidth: 80, frameHeight: 85 });
    this.load.image('Bg', './assets/Bg.svg');
  }

  // Función que se ejecuta al crearse la escena
  create() {

    this.elements.Names();
    // Crea el cuadro de herramientas (toolbox)
    this.input.setDefaultCursor('pointer');
    this.toolbox.createToolbox();
    this.curvestyle = this.add.graphics({ lineStyle: { width: 5, color: 0x2AA4BF, alpha: 0.8 } });
    this.count = 0;
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
    if(this.activatebutton!==null){
      for (const button of this.toolboxButtons){
        if(this.activatebutton===button.data.values.text){
          this.elements.buttonToFunction(button.data.values.text);
          console.log(this.elements.buttonToFunction(button.data.values.text));
        }else{
        }
      }
      
    }
    this.vibration();
  }
  
  
  
  
  vibration() {
    //cuerda vibrante
    if (this.parabolic != null) {
        this.count += 0.15;
        let points = this.parabolic.getSpacedPoints(12);
        this.curvestyle.clear(); // Limpia el dibujo anterior
        this.curvestyle.lineStyle(5, 0x2AA4BF, 0.8); // Configura el estilo de línea
        this.path = new Phaser.Curves.Path(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
            points[i].y += Math.cos(i * 2 + this.count);
            points[i].x += Math.cos(i * 2 + this.count);
            this.path.lineTo(points[i].x, points[i].y);
        };
        this.path.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        this.path.draw(this.curvestyle);
    };
    // Configura la función de clic en el contenedor (tablero)
    // Lógica de actualización común, si es necesario
};

}
