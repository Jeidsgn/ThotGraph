import { Point } from "./point.js";
import { Segment } from "./segment.js";

export class Element {
  constructor(scene) {
    this.scene = scene;
    this.scene.interactivePoints = []; // Arreglo para almacenar los puntos interactivos y sus áreas de acción
    this.point = new Point(scene); // Crea una instancia de la clase Point y la almacena en la propiedad "point" de la instancia de Element
    this.segment = new Segment(scene);
  }
  buttonToFunction(buttonName) {
    // Define un objeto de mapeo entre nombres de botones y funciones
    const functions = {
      "Point": () => {
        this.point.createPoint();
      },
      "Mover": () => {
        this.moveElement();
      },
      "Segment": () => {
        this.segment.createSegment();
      },
    };
    return functions[buttonName];
  }

  // Agrega nombres a los elementos
  Names() {
    // Agrega nombres a los puntos utilizando el método "addName" de la instancia de Point en la escena
    this.point.addName();
    this.segment.addName();
  }

  // Crea un nuevo elemento
  moveElement() {
    this.scene.parabolic = null;
    this.scene.shadow.clear();
    this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      gameObject.setData('vector',(dragX, dragY));
      console.log(gameObject);
    });

    // Actualizar y redibujar los segmentos existentes
    this.scene.segment_gr.clear();
    this.scene.segment_gr.lineStyle(5, 0x2aa4bf, 0.9);

    for (const segment of this.scene.segments) {
      segment.draw(this.scene.segment_gr);
    }
  }


// Puedes agregar métodos comunes a todos los elementos aquí
// Por ejemplo, para manejar restricciones y dependencias de movimiento
BaseElement() {
  const point1 = this.scene.add.sprite(this.scene.cameras.main.width / 3, this.scene.cameras.main.height / 2, 'point', 0).setOrigin(0.5, 0.80);
  const point2 = this.scene.add.sprite(this.scene.cameras.main.width / (3 / 2), this.scene.cameras.main.height / 2, 'point', 0).setOrigin(0.5, 0.80);
  point1.setData('vector', (point1.x, point1.y));
  point2.setData('vector', (point2.x, point2.y));
  this.scene.points.add(point1);
  this.scene.points.add(point2); // Agrega el punto al grupo 
}
}