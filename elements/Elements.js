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
        this.scene.elements.point.createPoint();
      },
      "Mover": () => {
        this.scene.elements.moveElement();
      },
      "Segment": () => {
        this.scene.elements.segment.createSegment();
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
    // Crea un nuevo punto utilizando el método "createPoint" de la instancia de Point en la escena
    this.point.movePoint();
    this.scene.elements.stopMovePoint();
    console.log("ya se llamó a parar")
  }
  stopMovePoint(){
    for (const point of this.scene.points.getChildren()) {
      console.log("se están buscando para parar")
      point.disableInteractive();
      this.scene.input.setDraggable(point, false);
  }
  console.log("se supone que ya pararon")
  }
    // Puedes agregar métodos comunes a todos los elementos aquí
    // Por ejemplo, para manejar restricciones y dependencias de movimiento
  
}