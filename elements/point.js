class Point {
    constructor(scene, x, y) {
      this.scene = scene;
      this.x = x;
      this.y = y;
  
      this.graphics = this.scene.add.graphics();
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.x, this.y, 5);
    }
  }

  function createPoint(pointer) {
    const x = pointer.x;
    const y = pointer.y;
    
    const point = new Point(this, x, y); // Crear un nuevo punto
  }  