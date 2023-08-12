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
  
  let points;
  let isDrawingEnabled = false;
  let textContainer;
  let waitingForClick = true;
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    points = this.add.group();
    textContainer = this.add.text(10, 10, '', { fill: '#ffffff' });
  
    const toggleButton = this.add.text(10, 550, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  
    this.input.on('pointerdown', handlePointerDown.bind(this));
  }
  
  function update() {
    if (isDrawingEnabled) {
      if (!waitingForClick) {
        points.children.iterate(point => {
          // Aplica aquí las modificaciones o actualizaciones que necesitas en cada punto
          // por ejemplo: point.x += 1; para mover el punto hacia la derecha
        });
      }
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;
    waitingForClick = true;
    this.children.list[1].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  }
  
  function handlePointerDown(pointer) {
    if (isDrawingEnabled && waitingForClick) {
      waitingForClick = false;
    } else if (isDrawingEnabled && !waitingForClick) {
      createPoint.call(this, pointer);
    }
  }
  
  function createPoint(pointer) {
    if (pointer) {
      const x = pointer.x || 0;
      const y = pointer.y || 0;
  
      const point = this.add.graphics();
      point.fillStyle(0xff0000);
      point.fillCircle(x, y, 10);
      points.add(point);
  
      point.setInteractive({ draggable: true });
      point.on('dragstart', function(pointer) {
        isDrawingEnabled = false;
      });
      point.on('drag', function(pointer, dragX, dragY) {
        this.x = dragX;
        this.y = dragY;
      });
  
      const letter = String.fromCharCode(65 + points.getLength() - 1);
      textContainer.text += letter + ' ';
    }
  }
  