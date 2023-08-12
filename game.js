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
  
  let circles;  // Para almacenar los círculos dibujados
  let isDrawingEnabled = false;  // Estado del dibujo
  let isDrawingActive = false;   // Estado de dibujo activo
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    circles = this.add.group();  // Crear un grupo para almacenar los círculos
    
    // Agregar un botón para activar/desactivar el dibujo
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  }
  
  function update() {
    if (isDrawingActive) {
      circles.children.iterate(circle => {
        // Aplica aquí las modificaciones o actualizaciones que necesitas en cada círculo
        // por ejemplo: circle.x += 1; para mover el círculo hacia la derecha
      });
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
  
    // Cambiar el texto del botón según el estado del dibujo
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  
    if (isDrawingEnabled) {
      // Habilitar el dibujo
      isDrawingActive = true;
      this.input.on('pointerdown', createCircle.bind(this));
    } else {
      // Desactivar el dibujo
      isDrawingActive = false;
      this.input.off('pointerdown', createCircle.bind(this));
    }
  }
  
  function createCircle(pointer) {
    if (isDrawingActive) {
      const x = pointer.x;
      const y = pointer.y;
  
      const circle = this.add.circle(x, y, 20, 0xff0000);  // Usar this.add.circle
      circles.add(circle);  // Agregar el círculo al grupo
  
      // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el círculo
    }
  }
  