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

function preload() {
    // Cargar recursos como imágenes y sprites
}

function create() {
    // Crear el toolbox
    createToolbox.call(this);
}

function update() {
    // Lógica de actualización común, si es necesario
}

function createToolbox() {
    // Crear botones base y botones dependientes (según elementos en js/)
    createBaseButtons.call(this);
    createDependentButtons.call(this);
}

function createBaseButtons() {
    // Crear botones base y agregarlos al toolbox
    const moveButton = this.add.text(10, 550, 'Mover', { fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', activateButton.bind(this));

    toolboxButtons.push(moveButton);
}

function createDependentButtons() {
    // Array con los nombres de los elementos
    const elementNames = ['Point', 'Line', 'Circle'];

    // Crear botones dependientes según los elementos en js/
    for (let i = 0; i < elementNames.length; i++) {
        const button = this.add.text(100 + i * 100, 550, elementNames[i], { fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', activateButton.bind(this, elementNames[i]));

        toolboxButtons.push(button);
    }
}

function activateButton(buttonName) {
    // Desactivar el botón activo actual
    if (activeButton) {
        activeButton.setStyle({ fill: '#ffffff' });
    }

    // Activar el botón seleccionado y almacenar referencia
    activeButton = toolboxButtons.find(button => button.text === buttonName);
    activeButton.setStyle({ fill: '#00ff00' });
}
