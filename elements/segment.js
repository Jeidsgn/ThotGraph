import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
      this.scene = scene;
      this.segments = []; // Arreglo para almacenar los segmentos
      this.point = new Point(scene);
      //this.scene.interactivePoints
      this.pointA = null;
      this.pointB = []; 
      
    this.isClicking = false; // Variable para controlar si se está haciendo clic
    this.elementalpointer = { x: 0, y: 0 }; // Almacena la posición del clic
    this.pointermove = { x: 0, y: 0 }; // Almacena la posición del puntero

    // Configura el evento de clic en la escena para capturar el puntero
    this.scene.input.on("pointerdown", (pointer) => {
      this.isClicking = true; // Se está haciendo clic
      this.elementalpointer = { x: pointer.x, y: pointer.y }; // Almacena la posición del puntero
    });
    // Capturar el puntero en la escena
    this.scene.input.on("pointermove", (pointer) => {
      this.pointermove = { x: pointer.x, y: pointer.y }; // Almacena la posición del puntero
    });

    // Configura el evento de liberación del clic para controlar cuando se deja de hacer clic
    this.scene.input.on("pointerup", () => {
      this.isClicking = false; // No se está haciendo clic
    });
    }
  
    addName() {
      this.scene.elementNames.push("Segment"); // Agrega el nombre al array de nombres de elementos en la escena
    }
  
    createSegment() {
        // Itera a través de los puntos interactivos en la escena
        for (const interactivePoint of this.scene.interactivePoints) {
          // Verifica si el puntero se encuentra dentro del área del punto interactivo
          if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.pointermove)) {
            // Cambia el aspecto visual del punto interactivo
            interactivePoint.point.clear();
            interactivePoint.point.fillStyle(0x00ff00); // Cambia el color a verde
            interactivePoint.point.fillCircle(interactivePoint.x, interactivePoint.y, 5);
            // Verifica si el usuario está haciendo clic
            if (this.isClicking) {
                if (!this.pointA) {
                    this.pointA = interactivePoint;
                    this.pointAOffsetX = this.pointermove.x - interactivePoint.x;
                    this.pointAOffsetY = this.pointermove.y - interactivePoint.y;
                  }
            // Si se está arrastrando el punto actual, actualiza su posición
            if (this.draggingPoint === interactivePoint) {
                const newPointX = this.pointermove.x - this.draggingOffsetX;
                const newPointY = this.pointermove.y - this.draggingOffsetY;
        
                // Actualiza la posición del punto interactivo
                interactivePoint.x = newPointX;
                interactivePoint.y = newPointY;
                interactivePoint.area.setPosition(newPointX - 10, newPointY - 8);
        
                // Actualiza el aspecto visual del punto mientras se mueve
                interactivePoint.point.clear();
                interactivePoint.point.fillStyle(0x00ff00); // Mantener el color verde mientras se mueve
                interactivePoint.point.fillRect(newPointX, newPointY, pointA.x, pointA.y);
        
                // Actualiza la posición del puntero elemental
                this.elementalpointer = {
                  x: this.pointermove.x,
                  y: this.pointermove.y,
                };
              }
            }
            // Si el usuario no está haciendo clic, deja de arrastrar el punto
            if (!this.isClicking) {
              this.draggingPoint = null;
            }
          }
        }
    }
}      