export class Point {
  constructor(scene) {
    this.scene = scene;
    this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
    this.textContainer = scene.add.text(10, 10, "", { fill: "#000000" }); // Contenedor de texto para las letras de los puntos
  }

  addName() {
    this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
  }

  createPoint() {
    if (this.isClicking) {
      const x = this.elementalpointer.x;
      const y = this.elementalpointer.y;
      const point = this.scene.add.graphics();
      point.fillStyle(0x732c02);
      point.fillCircle(x, y, 5);
      this.points.add(point); // Añade el punto al grupo
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

  movePoint(x, y) {
    // Esta función mueve los puntos interactivos en función de las interacciones del usuario
  
    // Itera a través de los puntos interactivos en la escena
    for (const interactivePoint of this.scene.interactivePoints) {
      // Verifica si el puntero se encuentra dentro del área del punto interactivo
      if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.pointermove)) {
        // Si el puntero está sobre el punto interactivo
  
        // Cambia el aspecto visual del punto interactivo
        interactivePoint.point.clear();
        interactivePoint.point.fillStyle(0x00ff00); // Cambia el color a verde
        interactivePoint.point.fillCircle(interactivePoint.x, interactivePoint.y, 5);
  
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
        interactivePoint.point.fillStyle(0x732c02); // Cambia el color al original
        interactivePoint.point.fillCircle(interactivePoint.x, interactivePoint.y, 5);
      }
    }
  
    // Si el usuario no está haciendo clic, deja de arrastrar el punto
    if (!this.isClicking) {
      this.draggingPoint = null;
    }
  }
  
}
