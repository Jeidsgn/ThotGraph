const config = {
    type: Phaser.AUTO,
    width: '100%', // Cambio aquí para que el juego ocupe todo el ancho
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
    // Configurar la interfaz de usuario y la mecánica del juego
  }
  
  function update() {
    // Actualizaciones del juego en cada fotograma
  }
  