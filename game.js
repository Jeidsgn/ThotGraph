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
let waitingForClick = true;  // Variable de espera

function preload() {
    // Cargar recursos como imágenes y sprites
}

function create() {
    points = this.add.group();  // Crear un grupo para almacenar los puntos

    // Agregar un botón para activar/desactivar el dibujo
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', toggleDrawing.bind(this));

    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', handlePointerDown.bind(this));
}

function update() {
    if (isDrawingEnabled) {
        if (!waitingForClick) {
            const pointer = this.input.activePointer;
            createPoint.call(this, pointer.x, pointer.y);  // Crear punto cuando se mueve el mouse
        }
    }
}

function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
    waitingForClick = true;  // Restablecer waitingForClick a true al desactivar el dibujo
    
    // Cambiar el texto del botón según el estado del dibujo
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
}

function handlePointerDown(pointer) {
    if (isDrawingEnabled && waitingForClick) {
        waitingForClick = false;  // Cambiar a false después del primer clic
        createPoint.call(this, pointer.x, pointer.y);  // Crear punto en el primer clic
    }
}

function createPoint(x, y) {
    const point = this.add.circle(x, y, 2, 0xff0000);  // Usar un círculo pequeño como punto
    points.add(point);  // Agregar el punto al grupo
}
