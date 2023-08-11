class Point {
    constructor(scene, x, y) {
      this.scene = scene;
      this.x = x;
      this.y = y;
  
      this.graphics = this.scene.add.graphics();
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.x, this.y, 5);
  
      this.active = false; // Estado inicial del modo de dibujo
  
      // Agregar el botón para alternar el modo de dibujo
      this.toggleButton = this.scene.add.text(10, 10, 'Modo Dibujo: Desactivado', {
        fontSize: '16px',
        fill: '#000',
      });
      this.toggleButton.setInteractive();
      this.toggleButton.on('pointerdown', this.toggleDrawingMode, this);
    }
  
    toggleDrawingMode() {
      this.active = !this.active;
      if (this.active) {
        this.toggleButton.setText('Modo Dibujo: Activado');
      } else {
        this.toggleButton.setText('Modo Dibujo: Desactivado');
      }
    }
  
    // Otras funciones y lógica específicas del punto
  }
  