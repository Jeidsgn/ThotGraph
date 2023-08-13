import {Board} from './js/Board.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [Board],
};

const game = new Phaser.Game(config);

let toolboxButtons = []; // Array para almacenar los botones en el toolbox
let activeButton = null; // Referencia al botón activo
let elementNames = []; // Array para almacenar los nombres de los elementos
let isDrawingEnabled = false;
let waitingForClick = true;