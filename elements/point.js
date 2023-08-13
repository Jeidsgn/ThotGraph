class Point extends BaseElement {
    constructor(scene, x, y) {
        super(scene);
        this.x = x || 0;
        this.y = y || 0;
        this.fillStyle(0xff0000);  // Color del punto
        this.fillCircle(this.x, this.y, 5);  // Dibujar un punto con radio de 5 píxeles
    }

    static getButton(scene) {
        const button = scene.add.text(10, 570, 'Punto', { fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => {
                // Lógica específica para la creación del punto
                // Por ejemplo, activar la creación de puntos
                scene.waitingForClick = false;
                scene.isDrawingEnabled = true;
            });
        return button;
    }
}
