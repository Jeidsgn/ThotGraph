class Line extends BaseElement {
    constructor(scene, x1, y1, x2, y2) {
        super(scene);
        // Lógica específica para el elemento Line
    }

    static getButton(scene) {
        // Crear y configurar el botón para el elemento Line
        const button = scene.add.button(...);
        return button;
    }
}
