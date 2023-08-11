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
let pointerDown = false;  // Estado del clic del puntero

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
    this.input.on('pointerdown', () => {
        pointerDown = true;
    });
    
    this.input.on('pointerup', () => {
        if (pointerDown && isDrawingEnabled) {
            createPoint.call(this);
        }
        pointerDown = false;
    });
}

function update() {
    // Actualizaciones del juego en cada fotograma
}

function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo

    // Cambiar el texto del botón según el estado del dibujo
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
}

function createPoint() {
    const x = this.input.x;
    const y = this.input.y;

    const point = this.add.circle(x, y, 3, 0xff0000);  // Usar this.add.circle
    points.add(point);  // Agregar el punto al grupo

    // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el punto
}
