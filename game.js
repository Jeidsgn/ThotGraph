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
  let selectedPoint = null; // Punto seleccionado
  let isDrawingEnabled = false;  // Estado del dibujo
  let textContainer; // Contenedor para mostrar letras
  let waitingForClick = true;  // Variable de espera
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    points = this.add.group();  // Crear un grupo para almacenar los puntos
    textContainer = this.add.text(10, 10, '', { fill: '#ffffff' }); // Crear el contenedor de texto
  
    // Crear dos puntos iniciales
    createPoint.call(this, { x: 100, y: 100 });
    createPoint.call(this, { x: 200, y: 200 });
  
    // Agregar un botón para activar/desactivar el dibujo
    const toggleButton = this.add.text(10, 550, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', handlePointerDown.bind(this));
  }
  
  function update() {
    if (isDrawingEnabled) {
      if (!waitingForClick) {
        points.children.iterate(point => {
          // Actualiza la posición del punto seleccionado mientras se mantenga el clic
          if (selectedPoint === point) {
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
  
      // Comprobar si se hizo clic en un punto existente
      points.children.iterate(point => {
        if (Phaser.Geom.Circle.ContainsPoint(point.getBounds(), pointer)) {
          selectedPoint = point; // Marcar el punto como seleccionado
        }
      });
    }
  }
  
  function createPoint(position) {
    const point = this.add.graphics();
    point.fillStyle(0xff0000);  // Color del punto
    point.fillCircle(position.x, position.y, 10);  // Dibujar un punto con radio de 10 píxeles
    points.add(point);  // Agregar el punto al grupo
  
    const letter = String.fromCharCode(65 + points.getLength() - 1); // Convertir número en letra (A, B, C, ...)
    textContainer.text += letter + ' '; // Agregar la letra al contenedor de texto
  }
  