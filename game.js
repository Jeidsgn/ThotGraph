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
  let textContainer; // Contenedor para mostrar letras
  let waitingForClick = true;  // Variable de espera
  let draggingPoint = null; // Punto actualmente siendo arrastrado
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    points = this.add.group();  // Crear un grupo para almacenar los puntos
    textContainer = this.add.text(10, 10, '', { fill: '#ffffff' }); // Crear el contenedor de texto
    
    // Agregar un botón para activar/desactivar el dibujo
    const toggleButton = this.add.text(10, 550, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
    
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', handlePointerDown.bind(this));
    this.input.on('pointerup', handlePointerUp.bind(this));
    this.input.on('pointermove', handlePointerMove.bind(this));
  }
  
  function update() {
    if (isDrawingEnabled) {
      if (!waitingForClick) {
        points.children.iterate(point => {
          if (point.dragging) {
            point.x = this.input.x;
            point.y = this.input.y;
          }
        });
      }
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
    waitingForClick = true;  // Cambiar a false después del primer clic
    // Cambiar el texto del botón según el estado del dibujo
    this.children.list[1].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  }
  
  function handlePointerDown(pointer) {
    if (isDrawingEnabled && waitingForClick) {
      waitingForClick = false;  // Cambiar a false después del primer clic
    } else if (isDrawingEnabled && !waitingForClick) {
      const newPoint = createPoint.call(this, pointer.x, pointer.y);  // Crear el punto sin esperar después del primer clic
      draggingPoint = newPoint;
    }
  }
  
  function handlePointerUp(pointer) {
    draggingPoint = null;
  }
  
  function handlePointerMove(pointer) {
    if (draggingPoint) {
      draggingPoint.x = pointer.x;
      draggingPoint.y = pointer.y;
    }
  }
  
  function createPoint(x, y) {
    const point = this.add.graphics();
    point.fillStyle(0xff0000);  // Color del punto
    point.fillCircle(x, y, 10);  // Dibujar un punto con radio de 10 píxeles
    points.add(point);  // Agregar el punto al grupo
  
    const letter = String.fromCharCode(65 + points.getLength() - 1); // Convertir número en letra (A, B, C, ...)
    textContainer.text += letter + ' '; // Agregar la letra al contenedor de texto
  
    point.setInteractive(); // Hacer el punto interactivo para arrastre
    point.dragging = true;  // Marcar el punto como arrastrable
    return point;
  }
  