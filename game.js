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
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    circles = this.add.group();
  
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  
    // No configurar el evento de clic aquí
  }
  
  function update() {
    // Actualizaciones del juego en cada fotograma
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;
  
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  
    if (isDrawingEnabled) {
      // Configurar el evento de clic aquí, después de cambiar el estado del dibujo
      this.input.on('pointerdown', createCircle.bind(this));
    } else {
      // Eliminar el evento de clic si el dibujo está desactivado
      this.input.off('pointerdown', createCircle.bind(this));
    }
  }
  
  function createCircle(pointer) {
    const x = pointer.x;
    const y = pointer.y;
  
    const circle = this.add.circle(x, y, 20, 0xff0000);
    circles.add(circle);
  }
  