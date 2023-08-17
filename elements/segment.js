import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
      this.scene = scene;
      this.segments = []; // Arreglo para almacenar los segmentos
      this.point = new Point(scene);
      this.scene.interactivePoints
      this.pointA = [];
      this.pointB = []; 
    }
  
    addName() {
      this.scene.elementNames.push("Segment"); // Agrega el nombre al array de nombres de elementos en la escena
    }
  
    createSegment() {

    }

    movePoint(x, y){

    }
}      