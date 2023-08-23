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
    const interactivePoints = this.scene.points.getChildren();

    for (const point of interactivePoints) {
        point.setInteractive({ draggable: true });

        point.on('drag', (pointer, dragX, dragY) => {
            point.x = dragX;
            point.y = dragY;
            point.data.set('vector', new Phaser.Math.Vector2(dragX, dragY));

            // Actualizar los segmentos que contienen este punto
            for (const segment of this.scene.segments) {
                if (segment.pointA === point || segment.pointB === point) {
                    segment.pointA = new Phaser.Math.Vector2(segment.x1, segment.y1);
                    segment.pointB = new Phaser.Math.Vector2(dragX, dragY);
                }
            }

            // Luego de actualizar los segmentos, redibujar todos los segmentos
            this.scene.segment_gr.clear();
            this.scene.segment_gr.lineStyle(5, 0x2aa4bf, 0.9);
            for (const segment of this.scene.segments) {
                this.scene.segment_gr.strokeLineShape(segment);
            }
        });
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