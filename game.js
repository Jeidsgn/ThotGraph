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
  let waitingForClick = false;  // Variable de espera
  let textContainer; // Contenedor para mostrar letras
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    points = this.add.group();  // Crear un grupo para almacenar los puntos
    textContainer = this.add.text(10, 50, '', { fill: '#ffffff' }); // Crear el contenedor de texto
    
    // Agregar un botón para activar/desactivar el dibujo
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', handlePointerDown.bind(this));
  }
  
  function update() {
    if (isDrawingEnabled) {
      points.children.iterate(point => {
        // Aplica aquí las modificaciones o actualizaciones que necesitas en cada punto
        // por ejemplo: point.x += 1; para mover el punto hacia la derecha
      });
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
  
    // Cambiar el texto del botón según el estado del dibujo
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  }
  
  function handlePointerDown(pointer) {
    if (isDrawingEnabled && waitingForClick) {
      waitingForClick = false;  // Cambiar a false después del primer clic
    } else if (isDrawingEnabled && !waitingForClick) {
      createPoint.call(this, pointer);  // Crear el punto sin esperar después del primer clic
    }
  }
  
  function createPoint(pointer) {
    const x = pointer.x;
    const y = pointer.y;
  
    const point = this.add.graphics();
    point.fillStyle(0xff0000);  // Color del punto
    point.fillRect(x, y, 1, 1);  // Dibujar un punto de 1x1 píxel
    points.add(point);  // Agregar el punto al grupo
  
    const letter = String.fromCharCode(65 + points.getLength() - 1); // Convertir número en letra (A, B, C, ...)
    textContainer.text += letter; // Agregar la letra al contenedor de texto
  }
        