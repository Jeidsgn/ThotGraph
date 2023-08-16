export class Point {
  constructor(scene) {
    this.scene = scene;
    this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
    this.interactivePoints = []; // Arreglo para almacenar los puntos interactivos y sus áreas de acción
    this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
    this.isClicking = this.scene.isClicking; // Variable para controlar si se está haciendo clic
    this.elementalpointer = this.scene.elementalpointer; // Almacena la posición del clic
    this.pointermove = this.scene.pointermove; // Almacena la posición del puntero
  }

  addName() {
    this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
  }

  createPoint() {
    if (this.isClicking) {
      const x = this.elementalpointer.x;
      const y = this.elementalpointer.y;
      const point = this.scene.add.graphics();
      point.fillStyle(0xff0000);
      point.fillCircle(x, y, 5);
      this.points.add(point); // Añade el punto al grupo
      // Crear un área cuadrada de acción
      this.interactivePoints.push({ 
        point: point, 
        x: x, 
        y: y, 
        area: new Phaser.Geom.Rectangle(x - 10, y - 8, 20, 23)});

      const letter = String.fromCharCode(65 + this.points.getLength() - 1);
      this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
      this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
    }
  }

  movePoint(x, y) {
    //aquí va la lógica del movimiento
    //console.log("movepoint") //verificación
    for (const interactivePoint of this.interactivePoints) {
      if (
        Phaser.Geom.Rectangle.ContainsPoint(
          interactivePoint.area,
          this.pointermove
        )
      ) {
        console.log("punto overleado");
        interactivePoint.point.clear();
        interactivePoint.point.fillStyle(0x00ff00); // Cambia el color a verde
        interactivePoint.point.fillCircle( interactivePoint.x, interactivePoint.y, 5 );
        if (this.isClicking) {
          const dx = this.pointermove.x - this.elementalpointer.x;
          const dy = this.pointermove.y - this.elementalpointer.y;
          interactivePoint.x += dx;
          interactivePoint.y += dy;
          interactivePoint.area.setPosition( interactivePoint.x - 10, interactivePoint.y - 8);
          interactivePoint.point.clear();
          interactivePoint.point.fillCircle( interactivePoint.x, interactivePoint.y, 5);
          this.elementalpointer = { x: this.pointermove.x, y: this.pointermove.y,};
        }
        interactivePoint.point.clear(); // Cambia el color de vuelta a rojo
        interactivePoint.point.fillCircle( interactivePoint.x, interactivePoint.y, 5);
      }
    }
  }
}
