export class Point {
  constructor(scene) {
    this.scene = scene;
    this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
    this.scene.interactivePoints = []; // Arreglo para almacenar los puntos interactivos y sus áreas de acción
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
    //aquí va la lógica del movimiento
    //console.log("movepoint") //verificación
    for (const interactivePoint of this.scene.interactivePoints) {
      if (
        Phaser.Geom.Rectangle.ContainsPoint(
          interactivePoint.area,
          this.pointermove
        )
      ) {
        console.log("punto overleado");
        interactivePoint.point.clear();
        interactivePoint.point.fillStyle(0x00ff00); // Cambia el color a verde
        interactivePoint.point.fillCircle(
          interactivePoint.x,
          interactivePoint.y,
          5
        );
        if (this.isClicking) {
          if (!this.draggingPoint) {
            this.draggingPoint = interactivePoint;
            this.draggingOffsetX = this.pointermove.x - interactivePoint.x;
            this.draggingOffsetY = this.pointermove.y - interactivePoint.y;
          }
        }
        if (this.draggingPoint === interactivePoint) {
          const newPointX = this.pointermove.x - this.draggingOffsetX;
          const newPointY = this.pointermove.y - this.draggingOffsetY;

          interactivePoint.x = newPointX;
          interactivePoint.y = newPointY;
          interactivePoint.area.setPosition(newPointX - 10, newPointY - 8);

          interactivePoint.point.clear();
          interactivePoint.point.fillStyle(0x00ff00); // Mantener el color verde mientras se mueve
          interactivePoint.point.fillCircle(newPointX, newPointY, 5);

          this.elementalpointer = {
            x: this.pointermove.x,
            y: this.pointermove.y,
          };
        }
      } else {
      interactivePoint.point.clear();
      interactivePoint.point.fillStyle(0x732c02); // Cambia el color aL origial
      interactivePoint.point.fillCircle(
      interactivePoint.x, interactivePoint.y, 5);
      }
    }
    if (!this.isClicking) {
      this.draggingPoint = null;
    }
  }
}
