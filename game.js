import Point from './elements/point.js';

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
  
  let points;  // Para almacenar los círculos dibujados
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    points = this.add.group();
  
    const point = new Point(this, 0, 0);
  
    this.input.on('pointerdown', (pointer) => {
      const circle = point.createCircle(pointer);
      points.add(circle);
    });
  }
  
  function update() {
    // Actualizaciones del juego en cada fotograma
  }
  
  function createCircle(pointer) {
    const x = pointer.x;
    const y = pointer.y;
  
    const circle = this.add.circle(x, y, 20, 0xff0000);  // Usar this.add.circle
    points.add(circle);  // Agregar el círculo al grupo
  
    // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el círculo
  }
  