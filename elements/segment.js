import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.scene.segments = scene.add.group(); // Grupo para almacenar los puntos en la escena
        this.scene.segment = null;
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
            const p1 = new Phaser.Math.Vector2((x1 + x2) / 2, ((y1 + y2) / 2) - n);
            if (this.p3 = null) {
                this.scene.parabolic = new Phaser.Curves.QuadraticBezier(p0, p1, p2);
            } else {
                this.scene.parabolic = new Phaser.Curves.QuadraticBezier(p0, this.p3, p2);
            }            // Calcula p1 usando el valor anterior si está disponible
            this.scene.parabolic = new Phaser.Curves.QuadraticBezier(p0, p1, p2);
            this.p3 = p1;
        };
    }

    createSegment() {
        const interactive = this.scene.points.getChildren();
        for (const point of interactive) {
            point.setInteractive({ draggable: true });
            point.input.dropZone = true;
            point.on('pointerdown', (point) => {
                point.input.dropZone = false; // Desactiva la propiedad de drop solo para este objeto
                console.log('dropZone:', point.input.dropZone);
            });
        };
        this.scene.input.on('drag', (pointer, gameObject) => {
            // Borrar la línea anterior
            this.graphics.clear();
            // Actualiza el aspecto visual de la líne mientras se mueve
            this.graphics.lineStyle(5, 0x2AA4BF, 0.1);
            this.scene.line = new Phaser.Geom.Line(
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
            this.graphics.strokeLineShape(this.scene.line);
        });
        this.scene.points.on('drop', (gameObject, dropZone) => {
            this.graphics.clear();
            console.log(dropZone.x)
            this.scene.curvestyle.clear();
            this.scene.parabolic.destroy();
            this.scene.parabolic = null;            
            this.graphics.lineStyle(5, 0x2AA4BF, 0.9);
            this.scene.line = new Phaser.Geom.Line(
                gameObject.downX,
                gameObject.downY,
                dropZone.x,
                dropZone.y,
            );
            this.graphics.strokeLineShape(this.scene.line);
        });
        this.scene.input.on('dragend', (dropped) => {
            // Borrar la línea anterior
            if (!dropped) {
                console.log("!dropped")
                this.graphics.clear();
            }
            this.scene.curvestyle.clear();
            this.scene.parabolic.destroy();
            this.scene.parabolic = null;
        });
        if (this.isClicking == false) {
            this.scene.parabolic = null;
        };
    }
    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }

}
