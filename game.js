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
  
  let puntos;  // Para almacenar los puntos dibujados
  let isDrawingEnabled = false;  // Estado del dibujo
  let isMovingEnabled = false;   // Estado del movimiento
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    puntos = this.add.group();  // Crear un grupo para almacenar los puntos
    
    // Agregar un botón para activar/desactivar el dibujo
    const toggleDrawingButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
    
    // Agregar un botón para activar/desactivar el movimiento
    const toggleMovingButton = this.add.text(120, 10, 'Activar Mover', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleMoving.bind(this));
  }
  
  function update() {
    if (isMovingEnabled) {
      // Iterar sobre cada punto y actualizar su posición si está siendo arrastrado
      puntos.getChildren().forEach(point => {
        if (point.input.draggable && point.input.isDragged) {
          point.x = game.input.activePointer.x;
          point.y = game.input.activePointer.y;
        }
      });
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
    isMovingEnabled = false;  // Deshabilitar el movimiento al cambiar el estado de dibujo
    
    // Cambiar el texto del botón según el estado del dibujo
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
    // Cambiar el texto del botón de mover según el estado de movimiento
    this.children.list[1].setText(isMovingEnabled ? 'Desactivar Mover' : 'Activar Mover');
    
    if (isDrawingEnabled) {
      this.input.on('pointerdown', createPoint.bind(this));
    } else {
      this.input.off('pointerdown', createPoint.bind(this));
    }
  }
  
  function toggleMoving() {
    isMovingEnabled = !isMovingEnabled;  // Cambiar el estado del movimiento
    isDrawingEnabled = false;  // Deshabilitar el dibujo al cambiar el estado de movimiento
    
    // Cambiar el texto del botón de mover según el estado de movimiento
    this.children.list[1].setText(isMovingEnabled ? 'Desactivar Mover' : 'Activar Mover');
    // Cambiar el texto del botón de dibujo según el estado de dibujo
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  }
  
  function createPoint(pointer) {
    if (isDrawingEnabled) {
      const x = pointer.x;
      const y = pointer.y;
  
      const point = this.add.circle(x, y, 10, 0xff0000);  // Usar this.add.circle
      puntos.add(point);  // Agregar el punto al grupo
      point.setInteractive({ draggable: isMovingEnabled });  // Hacer el punto interactivo para arrastrar si el movimiento está habilitado
  
      // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el punto
    }
  }
  