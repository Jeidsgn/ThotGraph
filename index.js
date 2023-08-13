import {Board} from './js/Board.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [Board],
};

const game = new Phaser.Game(config);