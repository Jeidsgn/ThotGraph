export class Point {
  constructor(scene) {
    this.scene = scene;
    this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
    this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
    this.selectedPoint = null; // Punto seleccionado para mover
    // Configura el evento de clic en la escena para capturar el puntero
    this.scene.input.on("pointerdown", (pointer) => {
      this.elementalpointer = pointer;
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

  movePoint() {
    this.points.getChildren().forEach(point => {
      point.setInteractive();
  
      point.on('pointerdown', (pointer) => {
        this.selectedPoint = point;
        this.offsetX = pointer.x - point.x;
        this.offsetY = pointer.y - point.y;
      });
  
      this.scene.input.on('pointermove', (pointer) => {
        if (this.selectedPoint) {
          this.selectedPoint.x = pointer.x - this.offsetX;
          this.selectedPoint.y = pointer.y - this.offsetY;
        }
      });
  
      this.scene.input.on('pointerup', () => {
        this.selectedPoint = null;
      });
    });
  }
  
  
  
  
}
