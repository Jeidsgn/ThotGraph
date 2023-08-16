export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
      this.selectedPoint = null; // Punto seleccionado para mover
  
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
        if (this.scene.movepoint) {
          this.checkPointSelection(pointer);
        }
      });
  
      this.scene.input.on("pointermove", (pointer) => {
        if (this.selectedPoint && this.scene.movepoint) {
          this.selectedPoint.x = pointer.x;
          this.selectedPoint.y = pointer.y;
        }
      });
  
      this.scene.input.on("pointerup", () => {
        this.selectedPoint = null;
        this.elementalpointer = null;
      });
    }
  
    addName() {
      this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }
  
    createPoint() {
      if (this.elementalpointer) {
        const x = this.elementalpointer.x || 0;
        const y = this.elementalpointer.y || 0;
        const point = this.scene.add.graphics();
        point.fillStyle(0xff0000);
        point.fillCircle(x, y, 5);
        point.setInteractive({ draggable: false });
        point.on("pointerover", () => {
          point.fillStyle(0x00ff00);
          point.fillCircle(x, y, 5);
        });
        point.on("pointerout", () => {
          point.fillStyle(0xff0000);
          point.fillCircle(x, y, 5);
        });
        this.points.add(point); // Añade el punto al grupo
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
      }
    }
  
    checkPointSelection(pointer) {
      const clickedPoint = this.points.getChildren().find((point) => {
        const bounds = point.getBounds();
        return bounds.contains(pointer.x, pointer.y);
      });
  
      if (clickedPoint) {
        this.selectedPoint = clickedPoint;
      }
    }
  
    movePoint() {
    }
}