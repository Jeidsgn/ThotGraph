import {Board} from './js/Board.js';

// Configuración del juego
const config = {
    // Tipo de renderizado
    type: Phaser.AUTO,
    // Ancho y alto de la ventana del juego en píxeles.
    width: 800,
    height: 600,
    // ID del elemento HTML en el que se insertará el juego.
    parent: 'game-container',
    // Escenas del juego.
    scene: [Board],
    add: {
        graphics: true // Asegúrate de que esta configuración esté presente y sea verdadera
      }
};

// Crea una nueva instancia de Phaser.Game pasando la configuración definida.
const game = new Phaser.Game(config);
