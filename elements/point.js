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
        // Configura el evento de arrastre para los puntos
        this.points.setDepth(1); // Asegura que los puntos estén en primer plano
        scene.input.setDraggable(this.points.getChildren());
    
        // Maneja el evento de inicio de arrastre
        scene.input.on('dragstart', (pointer, gameObject) => {
          this.selectedPoint = gameObject;
          this.selectedPoint.setTint(0x00ff00); // Cambia el color del punto seleccionado
        });
    
        // Maneja el evento de arrastre
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
          if (this.selectedPoint) {
            this.selectedPoint.x = dragX;
            this.selectedPoint.y = dragY;
          }
        });
    
        // Maneja el evento de finalización de arrastre
        scene.input.on('dragend', () => {
          if (this.selectedPoint) {
            this.selectedPoint.clearTint(); // Restaura el color original
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

  movePoint() {
    if (this.selectedPoint) {
      // Already in drag mode, disable it
      this.selectedPoint.clearTint();
      this.selectedPoint = null;
    } else {
      // Enter drag mode
      this.scene.isDrawingEnabled = false; // Disable drawing mode
      this.textContainer.text = ''; // Clear textContainer
      this.points.setAlpha(0.5); // Dim points for better visibility
    }  
}
}