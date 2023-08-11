class Point {
    constructor(scene, x, y) {
      this.scene = scene;
      this.x = x;
      this.y = y;
      this.create();
    }
  
    createCircle(pointer) {
      const x = this.x;
      const y = this.y;
  
      const circle = this.scene.add.circle(x, y, 20, 0xff0000);  // Usar this.scene.add.circle
      // Agregar la lógica para almacenar el círculo o realizar verificaciones adicionales
  
      return circle;
    }
  
    destroy() {
      this.pointGraphic.destroy();
    }
  }
  
  export default Point;
  