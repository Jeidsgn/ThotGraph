export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
      this.selectedPoint = null; // Punto seleccionado para mover
      this.movePointActive = false; // Estado de la función movepoint
  
      // Configura el evento de clic en la escena para capturar el puntero
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
  
        if (this.movePointActive) {
          this.points.getChildren().forEach((point) => {
            const bounds = point.getBounds();
            if (Phaser.Geom.Rectangle.ContainsPoint(bounds, pointer)) {
              this.selectedPoint = point;
              point.setTint(0x00ff00); // Cambia el color del punto cuando se selecciona
            } else {
              point.clearTint();
            }
          });
        }
      });
  
      // Configura el evento de movimiento del puntero
      this.scene.input.on("pointermove", (pointer) => {
        if (this.movePointActive && this.selectedPoint) {
          this.selectedPoint.x = pointer.x;
          this.selectedPoint.y = pointer.y;
        }
      });
  
      // Configura el evento de liberación del puntero
      this.scene.input.on("pointerup", () => {
        if (this.movePointActive && this.selectedPoint) {
          this.selectedPoint.clearTint();
          this.selectedPoint = null;
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
        this.points.add(point); // Añade el punto al grupo
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
      }
    }
  
    movePointActiveToggle(active) {
      this.movePointActive = active;
    }
  }
  