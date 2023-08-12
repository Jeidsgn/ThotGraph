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
  let selectedPoint = null; // Punto seleccionado para mover
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
          // Aplica aquí las modificaciones o actualizaciones que necesitas en cada punto
          // por ejemplo: point.x += 1; para mover el punto hacia la derecha
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
    if (isDrawingEnabled) {
      const clickedPoint = getClickedPoint(pointer);
      if (clickedPoint) {
        selectedPoint = clickedPoint;
      }
    }
  }
  
  function getClickedPoint(pointer) {
    let clickedPoint = null;
    points.children.iterate(point => {
      const radius = 5;
      const distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, point.x, point.y);
      if (distance <= radius) {
        clickedPoint = point;
        return false; // Detener la iteración
      }
    });
    return clickedPoint;
  }
  
  function createPoint(position) {
    const point = this.add.graphics();
    point.fillStyle(0xff0000);  // Color del punto
    point.fillCircle(position.x, position.y, 5);  // Dibujar un punto con radio de 5 píxeles
    points.add(point);  // Agregar el punto al grupo
  
    const letter = String.fromCharCode(65 + points.getLength() - 1); // Convertir número en letra (A, B, C, ...)
    textContainer.text += letter + ' '; // Agregar la letra al contenedor de texto
  }
  