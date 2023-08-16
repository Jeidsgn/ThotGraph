export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
      this.selectedPoint = null; // Punto seleccionado para mover
      this.elementalpointer = null; // Puntero capturado al hacer clic
      
      // Configura el evento de clic en la escena para capturar el puntero
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
        this.checkPointSelection(pointer);
      });
      
      // Configura el evento de movimiento del puntero para mover el punto seleccionado
      this.scene.input.on("pointermove", (pointer) => {
        this.movePoint(pointer);
      });
      
      // Configura el evento de liberación del puntero para dejar de mover el punto
      this.scene.input.on("pointerup", () => {
        this.selectedPoint = null;
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
        point.setInteractive({ useHandCursor: true }); // Hace que el punto sea interactivo y muestre el cursor de mano
        point.on("pointerover", () => point.setFillStyle(0xffff00)); // Cambia el color al pasar el cursor
        point.on("pointerout", () => point.setFillStyle(0xff0000)); // Cambia el color al salir el cursor
        point.on("pointerdown", () => this.selectedPoint = point); // Selecciona el punto al hacer clic
        this.points.add(point); // Añade el punto al grupo
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
      }
    }
  
    movePoint(pointer) {
      if (this.selectedPoint) {
        this.selectedPoint.x = pointer.x;
        this.selectedPoint.y = pointer.y;
      }
    }
    
    checkPointSelection(pointer) {
      // Comprueba si el puntero está sobre algún punto y lo selecciona
      const pointUnderPointer = this.points.getChildren().find((point) => point.getBounds().contains(pointer.x, pointer.y));
      if (pointUnderPointer) {
        this.selectedPoint = pointUnderPointer;
      }
    }
  }
  