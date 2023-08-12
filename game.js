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
  let selectedPoint; // Punto seleccionado
  let isDragging = false; // Estado del arrastre
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    points = this.add.group();  // Crear un grupo para almacenar los puntos
    textContainer = this.add.text(10, 10, '', { fill: '#ffffff' }); // Crear el contenedor de texto
    
    // Agregar dos puntos iniciales
    createPoint.call(this, { x: 100, y: 100 });
    createPoint.call(this, { x: 200, y: 200 });
  
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', handlePointerDown.bind(this));
    this.input.on('pointerup', handlePointerUp.bind(this));
  }
  
  function update() {
    if (isDrawingEnabled) {
      points.children.iterate(point => {
        // Aplica aquí las modificaciones o actualizaciones que necesitas en cada punto
        if (isDragging && selectedPoint === point) {
          point.x = this.input.x;
          point.y = this.input.y;
        }
      });
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
    // Cambiar el texto del botón según el estado del dibujo
    this.children.list[1].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  }
  
  function handlePointerDown(pointer) {
    if (isDrawingEnabled) {
      points.children.iterate(point => {
        if (Phaser.Geom.Circle.ContainsPoint(point.geom, pointer)) {
          selectedPoint = point;
          isDragging = true;
        }
      });
    }
  }
  
  function handlePointerUp(pointer) {
    if (isDrawingEnabled) {
      isDragging = false;
    }
  }
  
  function createPoint(initialPosition) {
    const x = initialPosition.x || 0;
    const y = initialPosition.y || 0;
  
    const point = this.add.graphics();
    point.fillStyle(0xff0000);  // Color del punto
    point.fillCircle(x, y, 5);  // Dibujar un punto con radio de 5 píxeles
    points.add(point);  // Agregar el punto al grupo
  
    const letter = String.fromCharCode(65 + points.getLength() - 1); // Convertir número en letra (A, B, C, ...)
    textContainer.text += letter + ' '; // Agregar la letra al contenedor de texto
  
    point.geom = new Phaser.Geom.Circle(x, y, 5); // Crear un círculo geométrico para el punto
  }
  