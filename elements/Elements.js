import { Point } from "./point.js";
import { Segment } from "./segment.js";

export class Element {
  constructor(scene) {
    this.scene = scene;
    this.scene.interactivePoints = []; // Arreglo para almacenar los puntos interactivos y sus áreas de acción
    this.point = new Point(scene); // Crea una instancia de la clase Point y la almacena en la propiedad "point" de la instancia de Element
    this.segment = new Segment(scene);
    this.scene.segment_gr = scene.add.graphics({
      lineStyle: { width: 5, color: 0x2aa4bf, alpha: 0.9 }
    });
  }
  buttonToFunction(buttonName) {
    // Define un objeto de mapeo entre nombres de botones y funciones
    const functions = {
      "Point": () => {
        this.point.createPoint();
      },
      "Move": () => {
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
    if (this.scene.activatebutton == "Move") {
      this.scene.parabolic = null;
      this.scene.shadow.clear();
      let draggingPoint = null; // Punto que se está arrastrando
      const interactive = this.scene.points.getChildren();
      for (const point of interactive) {
        point.on("pointerdown", () => {
          if (this.scene.activatebutton == "Move") {
            draggingPoint = point;
          }
        });
        point.on("drag", (pointer, dragX, dragY) => {
          if (draggingPoint === point) {
            if (this.scene.activatebutton == "Move") {
              this.scene.segment_gr.clear();
              point.x = dragX;
              point.y = dragY;
              point.data.values.vector = (dragX, dragY);
              for (let i = 0; i < this.scene.segments.length; i++) {
                if (point == this.scene.segments[i].p0) {
                  this.scene.segments_gr[i].clear();
                  this.scene.segments_gr[i].lineStyle(5, 0x2aa4bf, 0.9);
                  this.scene.segments[i].p0.x = dragX
                  this.scene.segments[i].p0.y = dragY
                  this.scene.segments[i].draw(this.scene.segments_gr[i]);
                } else if (point == this.scene.segments[i].p1) {
                  this.scene.segments_gr[i].clear();
                  this.scene.segments_gr[i].lineStyle(5, 0x2aa4bf, 0.9);
                  this.scene.segments[i].p1.x = dragX
                  this.scene.segments[i].p1.y = dragY
                  this.scene.segments[i].draw(this.scene.segments_gr[i]);
                }
              }
            }
          };
        }
        )
      }
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