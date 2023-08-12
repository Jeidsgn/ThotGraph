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
  
  let letters;  // Para almacenar las letras dibujadas
  let isDrawingEnabled = false;  // Estado del dibujo
  let waitingForClick = false;  // Variable de espera
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    letters = this.add.group();  // Crear un grupo para almacenar las letras
    
    // Agregar un botón para activar/desactivar el dibujo
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  
    // Crear un cuadro para mostrar las letras
    const letterBox = this.add.graphics();
    letterBox.fillStyle(0x000000);
    letterBox.fillRect(10, 40, 100, 100);
  
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', handlePointerDown.bind(this));
  }
  
  function update() {
    if (isDrawingEnabled) {
      letters.children.iterate(letter => {
        // Aplica aquí las modificaciones o actualizaciones que necesitas en cada letra
        // por ejemplo: letter.x += 1; para mover la letra hacia la derecha
      });
    }
  }
  
  function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
    
    // Cambiar el texto del botón según el estado del dibujo
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  }
  
  function handlePointerDown(pointer) {
    if (isDrawingEnabled) {
      createLetter.call(this, pointer);  // Crear la letra en la posición del clic
    }
  }
  
  function createLetter(pointer) {
    const x = pointer.x;
    const y = pointer.y;
    
    const letter = this.add.text(x, y, getRandomLetter(), { fill: '#ffffff' });  // Crear la letra
    letters.add(letter);  // Agregar la letra al grupo
  }
  
  function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet.charAt(randomIndex);
  }
  