class BaseElement extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
    }

    // Lógica y métodos comunes a todos los elementos
}
