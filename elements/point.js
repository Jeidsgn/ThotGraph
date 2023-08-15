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
  
      this.scene.input.setDraggable(point);
  
      point.on('dragstart', (pointer) => {
        this.selectedPoint = point;
        point.setTint(0x00ff00); // Cambia el color del punto mientras se arrastra
      });
  
      point.on('drag', (pointer, dragX, dragY) => {
        if (this.selectedPoint === point) {
          point.x = dragX;
          point.y = dragY;
        }
      });
  
      point.on('dragend', () => {
        this.selectedPoint = null;
        point.clearTint(); // Restaura el color del punto después de arrastrarlo
      });
    });
  }
  
  
  
}
