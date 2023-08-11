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
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    circles = this.add.group();  // Crear un grupo para almacenar los círculos
  
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', createCircle);
  }
  
  function update() {
    // Actualizaciones del juego en cada fotograma
  }
  
  function createCircle(pointer) {
    const x = pointer.x;
    const y = pointer.y;
  
    const circle = this.add.circle(x, y, 20, 0xff0000);  // Crear un círculo rojo
    circles.add(circle);  // Agregar el círculo al grupo
  
    // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el círculo
  }
  