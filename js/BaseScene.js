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

let toolboxButtons = [];  // Array para almacenar los botones en el toolbox
let activeButton = null;  // Referencia al botón activo
let elementNames = []; // Array para almacenar los nombres de los elementos
let isDrawingEnabled = false;
let waitingForClick = true;

function preload() {
    // Cargar recursos como imágenes y sprites
}

function create() {
    // Crear el toolbox
    createToolbox.call(this);
    // Configurar la función de clic en el contenedor
    this.input.on('pointerdown', (pointer) => this.BoardClic(pointer)); 
}

function update() {
    // Lógica de actualización común, si es necesario
}

function createToolbox() {
    // Crear botones base y botones dependientes (según elementos en elements/)
    createBaseButtons.call(this);
    createDependentButtons.call(this);
}

function createBaseButtons() {
    // Crear botones base y agregarlos al toolbox
    const moveButton = this.add.text(10, 550, 'Mover', { fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', this.activateButton.bind(this));

    this.toolboxButtons.push(moveButton);
}

function createDependentButtons() {
    // Crear botones dependientes según los elementos en js/
    for (let i = 0; i < elementNames.length; i++) {
        const button = this.add.text(100 + i * 100, 550, elementNames[i], { fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', (buttonName) => activateButton.call(this, buttonName));

        toolboxButtons.push(button);
    }
}

function activateButton(buttonName) {
    if (activeButton) {
        activeButton.setStyle({ fill: '#ffffff' });
    }

    activeButton = toolboxButtons.find(button => button.text === buttonName);
    if (activeButton) {
        activeButton.setStyle({ fill: '#00ff00' });
        isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
        waitingForClick = true;  // Cambiar a false después del primer clic
        // Cambiar el texto del botón según el estado del dibujo
        this.children.list[1].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');

    }
}
function BoardClic(pointer) {
    if (isDrawingEnabled && waitingForClick) {
      waitingForClick = false;  // Cambiar a false después del primer clic
    } else if (isDrawingEnabled && !waitingForClick) {
      createPoint.call(this, pointer);  // Crear el círculo sin esperar después del primer clic
    }
  }