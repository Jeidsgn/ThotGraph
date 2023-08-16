export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group();
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" });
      this.selectedPoint = null;
      this.movePointActive = false; // Indicador de si movePoint está activo
      this.elementalpointer = null;
  
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
      });
  
      this.scene.input.on("pointerup", () => {
        if (this.movePointActive && this.selectedPoint) {
          this.selectedPoint.clearTint(); // Restaura el color original al soltar el punto
          this.selectedPoint = null;
        }
      });
    }
  
    addName() {
      this.scene.elementNames.push("Point");
    }
  
    createPoint() {
      if (this.elementalpointer) {
        const x = this.elementalpointer.x || 0;
        const y = this.elementalpointer.y || 0;
        const point = this.scene.add.graphics();
        point.fillStyle(0xff0000);
        point.fillCircle(x, y, 5);
        this.points.add(point);
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " ";
        
        // Agrega eventos para cambiar el color al pasar el cursor sobre el punto
        point.setInteractive({ cursor: "pointer" });
        point.on("pointerover", () => {
          if (this.movePointActive) {
            point.setTint(0x00ff00); // Cambia el color al pasar el cursor
          }
        });
        point.on("pointerout", () => {
          if (this.movePointActive && point !== this.selectedPoint) {
            point.clearTint(); // Restaura el color original si no está seleccionado
          }
        });
  
        // Agrega evento para arrastrar el punto
        point.on("pointerdown", () => {
          if (this.movePointActive) {
            this.selectedPoint = point;
          }
        });
      }
    }
  
    movePoint() {
      this.movePointActive = !this.movePointActive; // Activa/desactiva movePoint
      if (!this.movePointActive && this.selectedPoint) {
        this.selectedPoint.clearTint(); // Restaura el color si se desactiva movePoint mientras un punto está seleccionado
        this.selectedPoint = null;
      }
    }
  }
  