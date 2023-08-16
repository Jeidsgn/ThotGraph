import {Board} from './js/Board.js';

// Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, // Usar el ancho de la ventana
    height: window.innerHeight, // Usar la altura de la ventana
    parent: 'game-container',
    scene: [Board],
    add: {
      graphics: true
    }
};

const game = new Phaser.Game(config);
