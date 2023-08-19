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
      this.elementalpointer = { x: pointer.x, y: pointer.y }; // Almacena la posición del puntero
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
      const x = this.elementalpointer.x;
      const y = this.elementalpointer.y;
  
      // Crea la imagen del punto en las coordenadas del clic
      const point = this.scene.add.image(x, y, 'point');
      point.setOrigin(0.5, 0.89);
      this.points.add(point); // Agrega el punto al grupo
  
      // Crear un área cuadrada de acción
      this.scene.interactivePoints.push({
        point: point,
        x: x,
        y: y,
        area: new Phaser.Geom.Rectangle(x - 10, y - 8, 20, 23),
      });
  
      const letter = String.fromCharCode(65 + this.points.getLength() - 1);
      this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
      this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
    }
  }
  

  movePoint() {
    // Esta función mueve los puntos interactivos en función de las interacciones del usuario
  
    // Itera a través de los puntos interactivos en la escena
    for (const interactivePoint of this.scene.interactivePoints) {
      // Verifica si el puntero se encuentra dentro del área del punto interactivo
      if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.pointermove)) {
        // Si el puntero está sobre el punto interactivo
        
        this.scene.add.image(interactivePoint.x, interactivePoint.y, 'point').setOrigin(0.5, 0.89);;
  
        // Verifica si el usuario está haciendo clic
        if (this.isClicking) {
          // Si no se está arrastrando ningún punto, comienza el proceso de arrastre
          if (!this.draggingPoint) {
            this.draggingPoint = interactivePoint;
            this.draggingOffsetX = this.pointermove.x - interactivePoint.x;
            this.draggingOffsetY = this.pointermove.y - interactivePoint.y;
          }
        }
  
        // Si se está arrastrando el punto actual, actualiza su posición
        if (this.draggingPoint === interactivePoint) {
          const newPointX = this.pointermove.x - this.draggingOffsetX;
          const newPointY = this.pointermove.y - this.draggingOffsetY;
  
          // Actualiza la posición del punto interactivo
          interactivePoint.x = newPointX;
          interactivePoint.y = newPointY;
          interactivePoint.area.setPosition(newPointX - 10, newPointY - 8);
  
          // Actualiza el aspecto visual del punto mientras se mueve
          interactivePoint.point.clear();
          interactivePoint.point.fillStyle(0x00ff00); // Mantener el color verde mientras se mueve
          interactivePoint.point.fillCircle(newPointX, newPointY, 5);
  
          // Actualiza la posición del puntero elemental
          this.elementalpointer = {
            x: this.pointermove.x,
            y: this.pointermove.y,
          };
        }
      } else {
        // Si el puntero no está sobre el punto interactivo, restaura su aspecto original
        interactivePoint.point.clear();
        interactivePoint.point.fillStyle(0xF2A950); // Cambia el color al original
        interactivePoint.point.fillCircle(interactivePoint.x, interactivePoint.y, 5);
      }
    }
  
    // Si el usuario no está haciendo clic, deja de arrastrar el punto
    if (!this.isClicking) {
      this.draggingPoint = null;
    }
  }
  
}
