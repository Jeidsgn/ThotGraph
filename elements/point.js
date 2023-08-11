class Point {
    constructor(scene, x, y) {
      this.scene = scene;
      this.x = x;
      this.y = y;
  
      this.graphics = this.scene.add.graphics();
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.x, this.y, 5);
    }
  
    // Aquí puedes agregar métodos para la interacción y lógica específica del punto
  }
  
  let points; // Para almacenar los puntos dibujados

  function createPoint(pointer) {
    const x = pointer.x;
    const y = pointer.y;
  
    const point = new Point(this, x, y); // Crear un nuevo punto
    points.add(point); // Agregar el punto al grupo
  
    // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el punto
  }  