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
  let isPendingDrawing = false;
  
  function preload() {
    // ...
  }
  
  function create() {
    circles = this.add.group();
  
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  
    // Configuración del evento pointerdown solo después de activar el dibujo
    this.input.on('pointerdown', handlePointerDown.bind(this));
    this.input.off('pointerdown', handlePointerDown.bind(this));
  }
  
  function update() {
    if (isDrawingEnabled) {
      circles.children.iterate(circle => {
        // Actualizaciones de los círculos
      });
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
    
    // Activar o desactivar el evento pointerdown según el estado del dibujo
    if (isDrawingEnabled) {
      this.input.on('pointerdown', handlePointerDown.bind(this));
    } else {
      this.input.off('pointerdown', handlePointerDown.bind(this));
    }
  }
  
  function handlePointerDown(pointer) {
    if (isPendingDrawing) {
      createCircle.call(this, pointer);
      isPendingDrawing = false;
    } else {
      isPendingDrawing = true;
    }
  }
  
  function createCircle(pointer) {
    if (isDrawingEnabled) {
      const x = pointer.x;
      const y = pointer.y;
  
      const circle = this.add.circle(x, y, 20, 0xff0000);
      circles.add(circle);
  
      // Lógica adicional para dibujar el círculo
    }
  }
  