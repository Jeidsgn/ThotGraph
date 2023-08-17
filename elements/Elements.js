import { Point } from "./point.js";
import { Segment } from "./segment.js";

export class Element {
  constructor(scene) {
    this.scene = scene;
    // Crea una instancia de la clase Point y la almacena en la propiedad "point" de la instancia de Element
    this.point = new Point(scene);
    this.segment = new Segment(scene);
    // Define un objeto de mapeo entre nombres de botones y funciones
    this.scene.buttonToFunction = {
      "Point": () => {
          this.scene.elements.point.createPoint(); 
      },
      "Mover": () => {
          this.scene.elements.point.movePoint();
      },
      "Segment": () => {
          this.scene.elements.point.createSegment();
      },
      // Agrega más mapeos para otros botones y funciones
    };
  }

  // Agrega nombres a los elementos
  Names(){
    // Agrega nombres a los puntos utilizando el método "addName" de la instancia de Point en la escena
    this.point.addName();
    this.segment.addName();
  } 

  // Crea un nuevo elemento
  createElement (){
    // Crea un nuevo punto utilizando el método "createPoint" de la instancia de Point en la escena
    this.point.createPoint(null);
  }
  
  // Puedes agregar métodos comunes a todos los elementos aquí
  // Por ejemplo, para manejar restricciones y dependencias de movimiento
}
