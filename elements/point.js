export class Point {
  constructor(scene) {
    this.scene = scene;
    this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
    this.scene.interactivePoints = []; // Arreglo para almacenar los puntos interactivos y sus áreas de acción
    this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
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
      const point = this.scene.add.graphics();
      point.fillStyle(0xff0000);
      point.fillCircle(x, y, 5);
      this.points.add(point); // Añade el punto al grupo
      // Crear un área cuadrada de acción
      this.scene.interactivePoints.push({ 
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
