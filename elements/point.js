export class Point {
  constructor(scene) {
    this.scene = scene;
    this.count = 1;
    this.scene.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
    this.textContainer = scene.add.text(10, 10, "", { fill: "#000000" }); // Contenedor de texto para las letras de los puntos
    this.isClicking = false; // Variable para controlar si se está haciendo clic
    this.scene.input.on("pointerdown", () => {
        this.isClicking = true; // Se está haciendo clic
    });
    this.scene.input.on("pointerup", () => {
        this.isClicking = false; // No se está haciendo clic
    });
  }
  addName() {
    this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
  }

  createPoint() {
    if (this.isClicking) {
      const letter = this.count;
      this.count = this.count+1;
      this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
      // Crea la imagen del punto en las coordenadas del clic
      const point = this.scene.add.sprite(pointer.x, pointer.y, 'point', 0).setOrigin(0.5, 0.89);
      point.id = letter; // Agrega el nombre del punto
      this.scene.points.add(point); // Agrega el punto al grupo
      this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
    }
  }
  

  movePoint() {
    // Esta función mueve los puntos interactivos en función de las interacciones del usuario
    // Itera a través de los puntos interactivos en la escena
    for (const point of this.scene.points) {
        point.setInteractive();
        // Habilita el arrastre para el punto
        this.input.setDraggable(punto);
        point.on('drag', (pointer, dragX, dragY) =>
        {
            point.x = dragX;
            point.y = dragY;

        });
    }
  }
  
}
