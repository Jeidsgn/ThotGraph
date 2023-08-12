const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  const game = new Phaser.Game(config);
  
  let circles;
  let isDrawingEnabled = false;
  let waitForNextClick = false;  // Variable de espera
  
  function preload() {
    // Cargar recursos
  }
  
  function create() {
    circles = this.add.group();
    
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  }
  
  function update() {
    if (isDrawingEnabled && !waitForNextClick) {
      circles.children.iterate(circle => {
        // Actualizar círculos si es necesario
      });
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;
    waitForNextClick = false;  // Reiniciar la variable de espera
    
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  
    if (isDrawingEnabled) {
      this.input.on('pointerdown', createCircle.bind(this));
    } else {
      this.input.off('pointerdown', createCircle.bind(this));
    }
  }
  
  function createCircle(pointer) {
    if (isDrawingEnabled && !waitForNextClick) {
      waitForNextClick = true;  // Establecer la variable de espera
  
      const x = pointer.x;
      const y = pointer.y;
  
      const circle = this.add.circle(x, y, 20, 0xff0000);
      circles.add(circle);
  
      // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el círculo
    }
  }
  