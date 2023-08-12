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
  let isDrawingQueued = false;
  
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
    if (isDrawingQueued && isDrawingEnabled) {
      createCircle.call(this, this.input.activePointer);
      isDrawingQueued = false;
    }
  
    circles.children.iterate(circle => {
      // Actualizar círculos si es necesario
    });
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  }
  
  function createCircle(pointer) {
    if (isDrawingEnabled) {
      const x = pointer.x;
      const y = pointer.y;
  
      const circle = this.add.circle(x, y, 20, 0xff0000);
      circles.add(circle);
  
      // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el círculo
    }
  }
  
  // Configurar la función de clic en el contenedor para agregar un círculo si el dibujo está habilitado
  this.input.on('pointerdown', function (pointer) {
    if (isDrawingEnabled) {
      isDrawingQueued = true;
    }
  });
  