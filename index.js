import {Board} from './js/Board.js';

// Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth * 0.9, // Usar el ancho de la ventana
    height: window.innerHeight * 0.9, // Usar la altura de la ventana
    parent: 'game-container',   
    scene: [Board],
    add: {
      graphics: true
    }
};

const game = new Phaser.Game(config);
