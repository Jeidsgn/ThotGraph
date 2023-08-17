import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
      this.scene = scene;
      this.segments = []; // Arreglo para almacenar los segmentos
      this.point = new Point(scene);
    }
  
    addName() {
      this.scene.elementNames.push("Segment"); // Agrega el nombre al array de nombres de elementos en la escena
    }
  
    createPoint() {
      if (this.isClicking) {
        const x = this.elementalpointer.x;
        const y = this.elementalpointer.y;
        const point = this.scene.add.graphics();
        point.fillStyle(0x732C02);
        point.fillCircle(x, y, 5);
        this.points.add(point); // Añade el punto al grupo
        // Crear un área cuadrada de acción
        this.interactivePoints.push({ 
          point: point, 
          x: x, 
          y: y, 
          area: new Phaser.Geom.Rectangle(x - 10, y - 8, 20, 23)});
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
        this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
      }
    }
  
    movePoint(x, y) {
        for (const interactivePoint of this.scene.interactivePoints) {
          if (
            Phaser.Geom.Rectangle.ContainsPoint(
              interactivePoint.area,
              this.pointermove
            )
          ) {
            if (this.isClicking) {
              if (!this.draggingPoint) {
                this.draggingPoint = interactivePoint;
                this.draggingOffsetX = this.pointermove.x - interactivePoint.x;
                this.draggingOffsetY = this.pointermove.y - interactivePoint.y;
              }
            }
            
            interactivePoint.point.clear();
            if (this.draggingPoint === interactivePoint) {
              // Cambiar el color solo del punto seleccionado mientras lo mueves
              interactivePoint.point.fillStyle(0x00ff00);
            } else {
              interactivePoint.point.fillStyle(0x732C02);
            }
            interactivePoint.point.fillCircle(interactivePoint.x, interactivePoint.y, 5);
      
            if (this.isClicking && this.draggingPoint === interactivePoint) {
              const newPointX = this.pointermove.x - this.draggingOffsetX;
              const newPointY = this.pointermove.y - this.draggingOffsetY;
              
              interactivePoint.x = newPointX;
              interactivePoint.y = newPointY;
              interactivePoint.area.setPosition(newPointX - 10, newPointY - 8);
              
              interactivePoint.point.clear();
              interactivePoint.point.fillStyle(0x00ff00); // Mantener el color verde mientras se mueve
              interactivePoint.point.fillCircle(newPointX, newPointY, 5);
              
              this.elementalpointer = { x: this.pointermove.x, y: this.pointermove.y };
            }
          } else {
            interactivePoint.point.clear();
            interactivePoint.point.fillStyle(0x732C02);
            interactivePoint.point.fillCircle(interactivePoint.x, interactivePoint.y, 5);
          }
        }
        
        // Restablecer la información del punto en movimiento si se suelta el clic del mouse
        if (!this.isClicking) {
          this.draggingPoint = null;
        }
      }









    }      