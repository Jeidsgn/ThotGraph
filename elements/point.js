export class Point {
  constructor(scene) {
    this.scene = scene;
    this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
    this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
    this.selectedPoint = null; // Punto seleccionado para mover
    this.pointer = scene.pointer; // Variable para almacenar el puntero
    // Configura el evento de clic en la escena para capturar el puntero

  }

  addName() {
    this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
  }

  createPoint() {
    if (this.pointer) {
      const x = this.pointer.x || 0;
      const y = this.pointer.y || 0;

      const point = this.scene.add.graphics();
      point.fillStyle(0xff0000);
      point.fillCircle(x, y, 5);
      this.points.add(point); // Añade el punto al grupo

      const letter = String.fromCharCode(65 + this.points.getLength() - 1);
      this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
    }
  }

  movePoint() {
    this.points.getChildren().forEach((point) => {
      point.setInteractive({ draggable: true }); // Habilita la interacción de arrastre para cada punto

      point.on("drag", (pointer, dragX, dragY) => {
        if (this.selectedPoint === point) {
          point.clear();
          point.fillStyle(0xff0000);
          point.fillCircle(dragX, dragY, 5); // Actualiza la posición mientras se arrastra
        }
      });

      point.on("dragend", () => {
        this.selectedPoint = null; // Al soltar, se desactiva la selección
      });

      point.on("dragstart", () => {
        this.selectedPoint = point; // Al comenzar el arrastre, se selecciona el punto
      });
    });
  }
}
