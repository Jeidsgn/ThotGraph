import { Point } from "./point.js";
import { Segment } from "./segment.js";

export class Element {
  constructor(scene) {
    this.scene = scene;
    this.scene.interactivePoints = []; // Arreglo para almacenar los puntos interactivos y sus áreas de acción
    this.point = new Point(scene); // Crea una instancia de la clase Point y la almacena en la propiedad "point" de la instancia de Element
    this.segment = new Segment(scene);
    this.scene.segment_gr = scene.add.graphics({
      lineStyle: { width: 5, color: 0x2aa4bf, alpha: 0.9 },
    });
  }
  buttonToFunction(buttonName) {
    // Define un objeto de mapeo entre nombres de botones y funciones
    const functions = {
      Point: () => {
        this.point.createPoint();
      },
      Move: () => {
        this.moveElement();
      },
      Segment: () => {
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
    this.point.movePoint();
    this.point.moveSegment();
  }

  // Puedes agregar métodos comunes a todos los elementos aquí
  // Por ejemplo, para manejar restricciones y dependencias de movimiento
  BaseElement() {
    const point1 = this.scene.add
      .sprite(
        this.scene.cameras.main.width / 3,
        this.scene.cameras.main.height / 2,
        "point",
        0
      )
      .setOrigin(0.5, 0.8);
    const point2 = this.scene.add
      .sprite(
        this.scene.cameras.main.width / (3 / 2),
        this.scene.cameras.main.height / 2,
        "point",
        0
      )
      .setOrigin(0.5, 0.8);
    point1.setData("vector", (point1.x, point1.y));
    point2.setData("vector", (point2.x, point2.y));
    this.scene.points.add(point1);
    this.scene.points.add(point2); // Agrega el punto al grupo
  }
}
