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
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    points = this.add.group(); // Crear un grupo para almacenar los puntos
    
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', createPoint.bind(this));
  }
  
  function update() {
    // Actualizaciones del juego en cada fotograma
  }