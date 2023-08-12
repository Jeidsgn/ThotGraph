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
  let letters;  // Para almacenar las letras
  let isDrawingEnabled = false;  // Estado del dibujo
  let waitingForClick = false;  // Variable de espera
  let lettersText;  // Para mostrar las letras en un cuadro
  
  function preload() {
    // Cargar recursos como imágenes y sprites
  }
  
  function create() {
    circles = this.add.group();  // Crear un grupo para almacenar los círculos
    letters = this.add.group();   // Crear un grupo para almacenar las letras
    
    // Agregar un botón para activar/desactivar el dibujo
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', handlePointerDown.bind(this));
    
    // Crear el cuadro para las letras
    lettersText = this.add.text(10, 40, '', { fill: '#000000', wordWrap: { width: 200 } });
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
  }
  
  function handlePointerDown(pointer) {
    if (isDrawingEnabled && waitingForClick) {
      waitingForClick = false;  // Cambiar a false después del primer clic
    } else if (isDrawingEnabled && !waitingForClick) {
      createCircle.call(this, pointer);  // Crear el círculo sin esperar después del primer clic
    }
  }
  
  function createCircle(pointer) {
    const x = pointer.x;
    const y = pointer.y;
  
    const circle = this.add.circle(x, y, 20, 0xff0000);  // Usar this.add.circle
    circles.add(circle);  // Agregar el círculo al grupo
  
    const letter = String.fromCharCode(65 + letters.getLength());  // Obtener la siguiente letra del alfabeto
    const letterText = this.add.text(x - 8, y - 8, letter, { fill: '#000000' });  // Crear el objeto de texto para la letra
    letters.add(letterText);  // Agregar la letra al grupo
  
    updateLettersText();  // Actualizar el cuadro de letras
  }
  
  function updateLettersText() {
    const letterStrings = letters.getChildren().map(text => text.text);
    lettersText.setText('Letras:\n' + letterStrings.join(', '));
  }
  