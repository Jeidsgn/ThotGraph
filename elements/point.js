export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
      this.selectedPoint = null; // Punto seleccionado para mover
      this.movePointActive = false; // Estado para indicar si la función movePoint está activa
      // Configura el evento de clic en la escena para capturar el puntero
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
        if (this.movePointActive) {
          this.selectPointToMove(pointer);
        }
      });
  
      // Agregar evento para cambiar el color del punto al pasar el cursor por encima
      this.points.setInteractive({ useHandCursor: true });
      this.points.on("pointerover", (pointer, gameObject) => {
        if (this.movePointActive) {
          gameObject.fillColor = 0x00ff00; // Cambia el color del punto al pasar el cursor por encima
        }
      });
      this.points.on("pointerout", (pointer, gameObject) => {
        if (this.movePointActive) {
          gameObject.fillColor = 0xff0000; // Restaura el color original del punto al salir el cursor
        }
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
        point.setInteractive({ useHandCursor: this.movePointActive }); // Hacer el punto interactivo solo si movePoint está activo
        this.points.add(point); // Añade el punto al grupo
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
      }
    }
  
    movePoint() {
      this.movePointActive = !this.movePointActive; // Cambiar el estado de movePoint
      this.points.getChildren().forEach(point => {
        point.setInteractive({ useHandCursor: this.movePointActive }); // Hacer los puntos interactivos o no según el estado de movePoint
      });
    }
  
    selectPointToMove(pointer) {
      const pointToMove = this.points.getChildren().find(point => point.getBounds().contains(pointer.x, pointer.y));
      if (pointToMove) {
        this.selectedPoint = pointToMove;
        this.scene.input.on("pointermove", this.moveSelectedPoint, this); // Agregar evento para mover el punto seleccionado
        this.scene.input.once("pointerup", () => {
          this.scene.input.off("pointermove", this.moveSelectedPoint, this); // Quitar evento de mover el punto al soltar el botón
          this.selectedPoint = null;
        });
      }
    }
  
    moveSelectedPoint(pointer) {
      if (this.selectedPoint) {
        this.selectedPoint.x = pointer.x;
        this.selectedPoint.y = pointer.y;
      }
    }
  }
  