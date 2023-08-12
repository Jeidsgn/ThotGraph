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
  let lastPointerPosition; // Última posición de clic cuando se desactivó el dibujo
  
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
    if (isDrawingEnabled) {
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
      this.input.on('pointerdown', createCircle.bind(this));
    } else {
      lastPointerPosition = null; // Reiniciar la última posición al desactivar el dibujo
      this.input.off('pointerdown', createCircle.bind(this));
    }
  }
  
  function createCircle(pointer) {
    if (isDrawingEnabled) {
      if (lastPointerPosition) {
        // Calcular la distancia entre la última posición y la posición actual
        const distance = Phaser.Math.Distance.Between(
          lastPointerPosition.x,
          lastPointerPosition.y,
          pointer.x,
          pointer.y
        );
  
        if (distance > 10) { // Solo dibujar si la distancia es mayor a un umbral
          const circle = this.add.circle(pointer.x, pointer.y, 20, 0xff0000);  // Usar this.add.circle
          circles.add(circle);  // Agregar el círculo al grupo
          lastPointerPosition = { x: pointer.x, y: pointer.y }; // Actualizar la última posición
        }
      } else {
        const circle = this.add.circle(pointer.x, pointer.y, 20, 0xff0000);
        circles.add(circle);
        lastPointerPosition = { x: pointer.x, y: pointer.y };
      }
    }
  }
  