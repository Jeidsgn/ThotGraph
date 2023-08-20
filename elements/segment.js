import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.segments = scene.add.group(); // Grupo para almacenar los puntos en la escena
        this.point = new Point(scene);
        //this.scene.points
        this.scene.pointB = null;
        this.scene.pointA = null;

        // Crear una propiedad graphics en la escena para mantener la instancia de Phaser.Graphics
        this.graphics = scene.add.graphics({ lineStyle: { width: 5, color: 0x000000, alpha: 0.8 } });
        this.p3 = null;

        this.isClicking = false; // Variable para controlar si se está haciendo clic
        this.pointermove = { x: 0, y: 0 }; // Almacena la posición del puntero
        // Configura el evento de clic en la escena para capturar el puntero
        this.scene.input.on("pointerdown", () => {
            this.isClicking = true; // Se está haciendo clic
        });
        // Capturar el puntero en la escena
        this.scene.input.on("pointermove", (pointer) => {
            this.pointermove = { x: pointer.x, y: pointer.y }; // Almacena la posición del puntero
        });
        // Configura el evento de liberación del clic para controlar cuando se deja de hacer clic
        this.scene.input.on("pointerup", () => {
            this.isClicking = false; // No se está haciendo clic
        });
    }
    // Supongamos que ya tienes una escena de Phaser configurada y has inicializado this.graphics adecuadamente.

    drawParabola(x1, y1, x2, y2, n) {
        if (x1 !== x2) {
            this.scene.curvestyle.clear();
            const p0 = new Phaser.Math.Vector2(x1, y1);
            const p2 = new Phaser.Math.Vector2(x2, y2);
            // Calcula p1 usando el valor anterior si está disponible
            const prevP1 = this.scene.parabolic ? this.scene.parabolic.getPoint(0.5) : null;
            const p1 = prevP1 ? new Phaser.Math.Vector2(prevP1.x, prevP1.y) : new Phaser.Math.Vector2((x1 + x2) / 2, ((y1 + y2) / 2) - n);

            this.scene.parabolic = new Phaser.Curves.QuadraticBezier(p0, p1, p2);
        };
        //this.scene.parabolic.draw(this.scene.curvestyle, 64);
        // Dibuja la parábola completa
    }

    createSegment() {
        this.point.stopMovePoint();
        const interactive = this.scene.points.getChildren();
        for (const point of interactive) {
            point.setInteractive({ draggable: true });
            point.input.dropZone = true;
        };
        // Habilita el arrastre para el punto
        this.scene.input.on('drag', (pointer, gameObject) => {
            // Borrar la línea anterior
            this.graphics.clear();
            // Actualiza el aspecto visual de la líne mientras se mueve
            this.graphics.lineStyle(5, 0x2AA4BF, 0.1);
            this.scene.pointA.x = gameObject.x;
            this.scene.pointA.y = gameObject.y;
            const line = new Phaser.Geom.Line(
                gameObject.x,
                gameObject.y,
                pointer.x,
                pointer.y
            );
            this.drawParabola(
                gameObject.x,
                gameObject.y,
                pointer.x,
                pointer.y,
                -60 //Distancia de "caida"
            );
            this.graphics.strokeLineShape(line);
        });
        this.input.on('drop', (pointer, gameObject, dropZone) => {
            // Borrar la línea anterior
            this.graphics.clear();
            // Actualiza el aspecto visual de la líne mientras se mueve
            this.graphics.lineStyle(5, 0x2AA4BF);
            const line = new Phaser.Geom.Line(
                this.scene.pointA.x,
                this.scene.pointA.y,
                gameObject.x,
                gameObject.y,
            );
            gameObject.input.enabled = false;
        });



    }
    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }

}
