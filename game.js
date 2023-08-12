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
let isDrawing = false; // Variable para controlar si se está dibujando actualmente

function preload() {
    // Cargar recursos como imágenes y sprites
}

function create() {
    circles = this.add.group();  // Crear un grupo para almacenar los círculos
    
    // Agregar un botón para activar/desactivar el dibujo
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
  
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', handlePointerDown.bind(this));
}

function update() {
    if (isDrawing && isDrawingEnabled) {
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
    if (isDrawingEnabled) {
        isDrawing = true; // Comenzar a dibujar
        createCircle.call(this, pointer);
    }
}

function createCircle(pointer) {
    if (isDrawingEnabled && isDrawing) {
        const x = pointer.x;
        const y = pointer.y;

        const circle = this.add.circle(x, y, 20, 0xff0000);  // Usar this.add.circle
        circles.add(circle);  // Agregar el círculo al grupo

        // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el círculo
    }
}

// Evento para detener el dibujo cuando se suelta el botón del mouse
game.canvas.addEventListener('pointerup', () => {
    isDrawing = false;
});
