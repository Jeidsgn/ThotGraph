import { Point } from "./point.js";

export class Element {
  constructor(scene) {
    this.scene = scene;
    // Crea una instancia de la clase Point y la almacena en la propiedad "point" de la instancia de Element
    this.point = new Point(scene);
    // Inicializa los elementos
    this.init();
  }

  // Inicialización de elementos
  init() {  
    // Crea una instancia de la clase Point y la asigna a la propiedad "point" de la escena
    this.scene.point = new Point(this.scene);
  }

  // Agrega nombres a los elementos
  Names(){
    // Agrega nombres a los puntos utilizando el método "addName" de la instancia de Point en la escena
    this.scene.point.addName();
  } 

  // Crea un nuevo elemento
  createElement (){
    // Crea un nuevo punto utilizando el método "createPoint" de la instancia de Point en la escena
    this.scene.point.createPoint(null);
  }
  
  // Puedes agregar métodos comunes a todos los elementos aquí
  // Por ejemplo, para manejar restricciones y dependencias de movimiento
}
