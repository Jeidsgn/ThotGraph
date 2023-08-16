export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
      this.selectedPoint = null; // Punto seleccionado para mover
  
      // Configura el evento de clic en la escena para capturar el puntero
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
  
        // Si movepoint está activo y hay un punto seleccionado, inicia el arrastre
        if (this.selectedPoint && this.scene.movepoint) {
          this.scene.input.on("pointermove", this.moveSelectedPoint, this);
        }
      });
  
      // Configura el evento de soltar el puntero para finalizar el arrastre
      this.scene.input.on("pointerup", () => {
        if (this.selectedPoint && this.scene.movepoint) {
          this.scene.input.off("pointermove", this.moveSelectedPoint, this);
          this.selectedPoint = null;
        }
      });
    }
  
    addName() {
      this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }
  
    createPoint(x, y) {
      const point = this.scene.add.graphics();
      point.fillStyle(0xff0000);
      point.fillCircle(x, y, 5);
      point.setInteractive(new Phaser.Geom.Circle(x, y, 10), Phaser.Geom.Circle.Contains);
      point.on("pointerover", () => {
        point.fillStyle(0xffff00); // Cambia el color al pasar el cursor por encima
        point.fillCircle(x, y, 5);
      });
      point.on("pointerout", () => {
        point.fillStyle(0xff0000); // Restaura el color cuando el cursor sale
        point.fillCircle(x, y, 5);
      });
  
      this.points.add(point); // Añade el punto al grupo
  
      const letter = String.fromCharCode(65 + this.points.getLength() - 1);
      this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
    }
  
    moveSelectedPoint(pointer) {
      this.selectedPoint.x = pointer.x;
      this.selectedPoint.y = pointer.y;
    }
  }
  