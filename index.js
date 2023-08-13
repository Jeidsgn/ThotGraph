const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [Level1]
};

const game = new Phaser.Game(config);
