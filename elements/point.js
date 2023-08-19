export class Point {
  constructor(scene) {
    this.scene = scene;
    this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
    this.textContainer = scene.add.text(10, 10, "", { fill: "#000000" }); // Contenedor de texto para las letras de los puntos
    this.isClicking = false; // Variable para controlar si se está haciendo clic
    this.elementalpointer = { x: 0, y: 0 }; // Almacena la posición del clic
    this.pointermove = { x: 0, y: 0 }; // Almacena la posición del puntero

    // Configura el evento de clic en la escena para capturar el puntero
    this.scene.input.on("pointerdown", (pointer) => {
      this.isClicking = true; // Se está haciendo clic
    });
    // Capturar el puntero en la escena
    this.scene.input.on("pointermove", (pointer) => {
      this.pointermove = { x: pointer.x, y: pointer.y }; // Almacena la posición del puntero
    });

    // Configura el evento de liberación del clic para controlar cuando se deja de hacer clic
    this.scene.input.on("pointerup", () => {
      this.isClicking = false; // No se está haciendo clic
    });
  }

  addName() {
    this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
  }

  createPoint() {
    if (this.isClicking) {
      const letter = String.fromCharCode(65 + this.points.getLength() - 1);
      this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
      this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
      // Crea la imagen del punto en las coordenadas del clic
      const point = this.scene.add.sprite(x, y, 'point', 0).setOrigin(0.5, 0.89);
      point.id = letter; // Agrega el nombre del punto
      this.points.add(point); // Agrega el punto al grupo
    }
  }
  

  movePoint() {
    // Esta función mueve los puntos interactivos en función de las interacciones del usuario
  
    // Itera a través de los puntos interactivos en la escena
    for (const interactivePoint of this.scene.interactivePoints) {
      // Verifica si el puntero se encuentra dentro del área del punto interactivo
      if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.pointermove)) {
        // Si el puntero está sobre el punto interactivo

        interactivePoint.image = this.scene.add.image(this.pointermove.x, this.pointermove.y,'point').setOrigin(0.5, 0.89);
  
        // Verifica si el usuario está haciendo clic
        if (this.isClicking) {
          // Si no se está arrastrando ningún punto, comienza el proceso de arrastre
          if (!this.draggingPoint) {
            this.draggingPoint = interactivePoint;
          }
        }
  
        // Si se está arrastrando el punto actual, actualiza su posición
        if (this.draggingPoint === interactivePoint) {  
          // Actualiza la posición del punto interactivo
          interactivePoint.x = this.pointermove.x;
          interactivePoint.y = this.pointermove.y;
          interactivePoint.area.setPosition(this.pointermove.x - 10, this.pointermove.y - 8);
  
          // Actualiza el aspecto visual del punto mientras se mueve

          interactivePoint.image = this.scene.add.image(interactivePoint.x, interactivePoint.y, 'point').setOrigin(0.5, 0.89);
        }
      } else {
        // Si el puntero no está sobre el punto interactivo, restaura su aspecto original
        this.scene.add.image(interactivePoint.x, interactivePoint.y, 'point').setOrigin(0.5, 0.89);
      }
    }
  
    // Si el usuario no está haciendo clic, deja de arrastrar el punto
    if (!this.isClicking) {
      this.draggingPoint = null;
    }
  }
  
}
