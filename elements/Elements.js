import { Point } from "./point.js";

export class Element {
  constructor(scene) {
    this.scene = scene;
    this.point = new Point(scene);
    this.init();
  }
  init() {  
    this.scene.point = new Point(this.scene);
  }
  Names(){
    this.scene.point.addName();
  } 
  createElement (){
    this.scene.point.createPoint(null);
  }
    // Puedes agregar métodos comunes a todos los elementos aquí
    // Por ejemplo, para manejar restricciones y dependencias de movimiento
}