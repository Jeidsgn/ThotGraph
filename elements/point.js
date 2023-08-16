export class Point {
    constructor(scene) {
        this.scene = scene;
        this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
        this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
        this.selectedPoint = null; // Punto seleccionado para mover
        this.isMovePointActive = false; // Variable para indicar si movePoint está activo
        // Configura el evento de clic en la escena para capturar el puntero
        this.scene.input.on("pointerdown", (pointer) => {
          if (this.isMovePointActive) {
            this.selectPointToMove(pointer);
          } else {
            this.elementalpointer = pointer;
          }
        });
      }
  
    addName() {
      this.scene.elementNames.push("Point");
    }  createPoint() {
        if (this.elementalpointer) {
          const x = this.elementalpointer.x || 0;
          const y = this.elementalpointer.y || 0;
          const point = this.scene.add.graphics();
          point.fillStyle(0xff0000);
          point.fillCircle(x, y, 5);
    
          // Agrega interacción al punto
          point.setInteractive({ draggable: true });
    
          // Cambia el color del punto al pasar el cursor por encima
          point.on("pointerover", () => {
            if (this.isMovePointActive && this.selectedPoint !== point) {
              point.clear();
              point.fillStyle(0x00ff00); // Cambia el color al pasar el cursor por encima
              point.fillCircle(x, y, 5);
            }
          });
    
          point.on("pointerout", () => {
            if (this.isMovePointActive && this.selectedPoint !== point) {
              point.clear();
              point.fillStyle(0xff0000); // Cambia el color al salir del cursor
              point.fillCircle(x, y, 5);
            }
          });
    
          this.points.add(point); // Añade el punto al grupo
    
          const letter = String.fromCharCode(65 + this.points.getLength() - 1);
          this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
        }
      }
    
      movePoint() {
        this.isMovePointActive = !this.isMovePointActive; // Alterna el estado de movePoint
        this.resetPointColors();
      }
    
      resetPointColors() {
        this.points.getChildren().forEach((point) => {
          point.clear();
          point.fillStyle(this.isMovePointActive ? 0xff0000 : 0x0000ff); // Cambia el color según si movePoint está activo
          point.fillCircle(point.x, point.y, 5);
        });
      }
    
      selectPointToMove(pointer) {
        const clickedPoint = this.points.getChildren().find((point) => point.getBounds().contains(pointer.x, pointer.y));
    
        if (clickedPoint) {
          if (this.selectedPoint) {
            this.selectedPoint.clear();
            this.selectedPoint.fillStyle(0xff0000);
            this.selectedPoint.fillCircle(this.selectedPoint.x, this.selectedPoint.y, 5);
          }
    
          this.selectedPoint = clickedPoint;
          this.selectedPoint.clear();
          this.selectedPoint.fillStyle(0x00ff00); // Cambia el color del punto seleccionado
          this.selectedPoint.fillCircle(this.selectedPoint.x, this.selectedPoint.y, 5);
        }
      }
}
  