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
  
  let points;  // Para almacenar los puntos dibujados
  let isDrawingEnabled = false;  // Estado del dibujo
  let isMovingEnabled = false; // Estado del movimiento
  let textContainer; // Contenedor para mostrar letras
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    points = this.add.group();  // Crear un grupo para almacenar los puntos
    textContainer = this.add.text(10, 10, '', { fill: '#ffffff' }); // Crear el contenedor de texto
    
    // Agregar un botón para activar/desactivar el dibujo
    const toggleDrawingButton = this.add.text(10, 550, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  
    // Agregar un botón para activar/desactivar el movimiento
    const toggleMovingButton = this.add.text(120, 550, 'Activar Mover', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleMoving.bind(this));
      
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', handlePointerDown.bind(this));
  }
  
  function update() {
    if (isMovingEnabled) {
      // Mueve los puntos si el modo de movimiento está habilitado
      points.children.iterate(point => {
        // Aplica aquí las modificaciones o actualizaciones que necesitas en cada punto
        // por ejemplo: point.x += 1; para mover el punto hacia la derecha
      });
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
    isMovingEnabled = false;  // Deshabilitar el movimiento al activar el dibujo
    // Cambiar el texto de los botones según el estado del dibujo y el movimiento
    this.children.list[1].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
    this.children.list[2].setText(isMovingEnabled ? 'Desactivar Mover' : 'Activar Mover');
  }
  
  function toggleMoving() {
    isMovingEnabled = !isMovingEnabled;  // Cambiar el estado del movimiento
    isDrawingEnabled = false;  // Deshabilitar el dibujo al activar el movimiento
    // Cambiar el texto de los botones según el estado del dibujo y el movimiento
    this.children.list[1].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
    this.children.list[2].setText(isMovingEnabled ? 'Desactivar Mover' : 'Activar Mover');
  }
  
  function handlePointerDown(pointer) {
    if (isDrawingEnabled && !isMovingEnabled) {
      createPoint.call(this, pointer);  // Crear el punto si el dibujo está habilitado y no se está en modo de movimiento
    }
  }
  
  function createPoint(pointer) {
    if (pointer) {
      const x = pointer.x || 0;  // Si pointer.x no está definido, usa 0 como valor predeterminado
      const y = pointer.y || 0;  // Si pointer.y no está definido, usa 0 como valor predeterminado
  
      const point = this.add.graphics();
      point.fillStyle(0xff0000);  // Color del punto
      point.fillCircle(x, y, 10);  // Dibujar un punto con radio de 10 píxeles
      points.add(point);  // Agregar el punto al grupo
  
      const letter = String.fromCharCode(65 + points.getLength() - 1); // Convertir número en letra (A, B, C, ...)
      textContainer.text += letter + ' '; // Agregar la letra al contenedor de texto
    }
  }
  