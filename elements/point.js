class Point {
    constructor(scene, x, y) {
      this.scene = scene;
      this.x = x;
      this.y = y;
  
      this.graphics = this.scene.add.graphics();
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(this.x, this.y, 5);
  
      this.canDraw = false; // Inicialmente no se puede dibujar
      this.drawButton = this.scene.add.text(10, 10, 'Dibujar Puntos', {
        font: '16px Arial',
        fill: '#000'
      });
  
      this.drawButton.setInteractive();
      this.drawButton.on('pointerdown', this.toggleDraw, this); // Cambio aquí
    }
  
    toggleDraw() {
      this.canDraw = !this.canDraw;
      this.drawButton.setText(this.canDraw ? 'Dibujando' : 'Dibujar Puntos');
    }
  
    allowDrawing() {
      return this.canDraw;
    }
  }
  
  // En game.js, donde se crea el punto:
  function createPoint(pointer) {
    if (points.getChildren().length === 0 || points.getFirstAlive().allowDrawing()) { // Verificar si se puede dibujar
      const x = pointer.x;
      const y = pointer.y;
  
      const newPoint = new Point(this, x, y); // Cambio aquí
      points.add(newPoint);
    }
  }
  