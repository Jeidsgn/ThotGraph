export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
      this.selectedPoint = null; // Punto seleccionado para mover
      this.movepoint = false; // Variable para habilitar el modo de movimiento
      this.elementalpointer = null; // Puntero actual
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      // Configura el evento de clic en la escena para capturar el puntero
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
        if (!this.movepoint) {
          this.createPoint();
        } else {
          this.selectPointToMove();
        }
      });
  
      // Configura evento para cambiar el color del punto al pasar el cursor por encima
      this.scene.input.on("pointerover", (pointer) => {
        if (!this.movepoint) return;
        const overPoint = this.getPointAtPosition(pointer.x, pointer.y);
        if (overPoint) {
          overPoint.setFillStyle(0x00ff00);
        }
      });
  
      // Configura evento para restaurar el color original del punto al salir del cursor
      this.scene.input.on("pointerout", (pointer) => {
        if (!this.movepoint) return;
        const overPoint = this.getPointAtPosition(pointer.x, pointer.y);
        if (overPoint) {
          overPoint.setFillStyle(0xff0000);
        }
      });
    }
  
    getPointAtPosition(x, y) {
      return this.points.getChildren().find((point) => {
        const bounds = point.getBounds();
        return bounds.contains(x, y);
      });
    }
  
    addName() {
      this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }
  
    createPoint() {
      if (!this.elementalpointer) return;
  
      const x = this.elementalpointer.x || 0;
      const y = this.elementalpointer.y || 0;
      const point = this.scene.add.graphics();
      point.fillStyle(0xff0000);
      point.fillCircle(x, y, 5);
      this.points.add(point); // Añade el punto al grupo
  
      const letter = String.fromCharCode(65 + this.points.getLength() - 1);
      this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
    }
  
    selectPointToMove() {
      const selectedPoint = this.getPointAtPosition(
        this.elementalpointer.x,
        this.elementalpointer.y
      );
      if (selectedPoint) {
        this.selectedPoint = selectedPoint;
        this.selectedPoint.setFillStyle(0x00ff00);
      }
    }
  
    movePoint() {
      if (this.selectedPoint && this.elementalpointer) {
        this.selectedPoint.x = this.elementalpointer.x;
        this.selectedPoint.y = this.elementalpointer.y;
      }
    }
  }
  