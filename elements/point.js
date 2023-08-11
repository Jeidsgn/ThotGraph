class Point {
    constructor(scene, x, y) {
      this.scene = scene;
      this.x = x;
      this.y = y;
  
      this.graphics = this.scene.add.graphics();
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.x, this.y, 5);
  
      this.active = false; // Estado inicial del modo de dibujo
    }
  
    toggleDrawingMode() {
      this.active = !this.active;
    }
  
    // Otras funciones y lógica específicas del punto
  }
  
  // Crear un nuevo punto y configurar el botón fuera de la clase
  let point;
  let toggleButton;
  
  function createPoint(pointer) {
    const x = pointer.x;
    const y = pointer.y;
    
    point = new Point(this, x, y);
    toggleButton = this.add.text(10, 10, 'Modo Dibujo: Desactivado', {
      fontSize: '16px',
      fill: '#000',
    });
    toggleButton.setInteractive();
    toggleButton.on('pointerdown', toggleDrawingMode, this);
  }
  
  function toggleDrawingMode() {
    point.toggleDrawingMode();
    if (point.active) {
      toggleButton.setText('Modo Dibujo: Activado');
    } else {
      toggleButton.setText('Modo Dibujo: Desactivado');
    }
  }
  
  export { createPoint }; // Exportar la función de creación del punto
  