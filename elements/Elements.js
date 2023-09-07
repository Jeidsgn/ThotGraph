import { Point } from "./point.js";
import { Segment } from "./segment.js";
import { Circle } from "./circle.js";
import { Line } from "./line.js";

export class Element {
  constructor(scene) {
    this.scene = scene;
    this.scene.interactivePoints = []; // Arreglo para almacenar los puntos interactivos y sus áreas de acción
    this.point = new Point(scene); // Crea una instancia de la clase Point y la almacena en la propiedad "point" de la instancia de Element
    this.segment = new Segment(scene);
    this.circle = new Circle(scene);
    this.line = new Line(scene);
    this.scene.segment_gr = scene.add.graphics({
      lineStyle: { width: 5, color: 0x2aa4bf, alpha: 0.9 },
    });
  }
  buttonToFunction(buttonName) {
    // Define un objeto de mapeo entre nombres de botones y funciones
    const functions = {
      Move: () => {
        this.moveElement();
      },
      Segment: () => {
        this.segment.createSegment();
      },
      Circle: () => {
        this.circle.createCircle();
      },
      Line: () => {
        this.line.createLine();
      },
      Point: () => {
        this.point.createPoint();
      },
    };
    return functions[buttonName];
  }

  // Agrega nombres a los elementos
  Names() {
    // Agrega nombres a los puntos utilizando el método "addName" de la instancia de Point en la escena
    this.point.addName();
    this.segment.addName();
    this.circle.addName();
    this.line.addName();
  }
  // Crea un nuevo elemento
  moveElement() {
    this.point.movePoint();
    this.segment.moveSegment();
    this.circle.moveCircle();
    this.line.moveLine();
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
      .setOrigin(0.5, 0.48);
    const point2 = this.scene.add
      .sprite(
        this.scene.cameras.main.width / (3 / 2),
        this.scene.cameras.main.height / 2,
        "point",
        0
      )
      .setOrigin(0.5, 0.48);
    point1.setInteractive({ draggable: true });
    point2.setInteractive({ draggable: true });
    point1.on("drag", (pointer, dragX, dragY) => {
      if (this.scene.activatebutton === "Move") {
        point1.x = dragX;
        point1.y = dragY;
      }
    });
    point2.on("drag", (pointer, dragX, dragY) => {
      if (this.scene.activatebutton === "Move") {
        point2.x = dragX;
        point2.y = dragY;
      }
    });
    this.scene.points.add(point1);
    this.scene.points.add(point2); // Agrega el punto al grupo
  }
}
