import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.scene.segments = scene.add.group(); // Grupo para almacenar los puntos en la escena
        this.point = new Point(scene);
        //this.scene.points
        this.scene.pointB = null;
        this.scene.pointA = null;

        // Crear una propiedad graphics en la escena para mantener la instancia de Phaser.Graphics
        this.shadow = scene.add.graphics({ lineStyle: { width: 5, color: 0x000000, alpha: 0.8 } });
        this.graphics = scene.add.graphics({ lineStyle: { width: 5, color: 0x000000, alpha: 0.8 } });
        this.segment = scene.add.graphics({ lineStyle: { width: 5, color: 0x000000, alpha: 0.8 } });
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
            if (this.p3 == null) {
                this.scene.parabolic = new Phaser.Curves.QuadraticBezier(p0, p1, p2);
            } else {
                this.scene.parabolic = new Phaser.Curves.QuadraticBezier(p0, this.p3, p2);
            }            // Calcula p1 usando el valor anterior si está disponible
            this.scene.parabolic = new Phaser.Curves.QuadraticBezier(p0, p1, p2);
            this.p3 = p1;
        };
        //this.scene.parabolic.draw(this.scene.curvestyle, 64);
        // Dibuja la parábola completa
    }

    createSegment() {
        let drop = false;
        let draggingPoint = null; // Punto que se está arrastrando
        const interactive = this.scene.points.getChildren();
        for (const point of interactive) {
            point.setInteractive({ draggable: true });
            point.input.dropZone = true;
            point.on('pointerdown', () => {
                draggingPoint = point; // Establece el punto que se está arrastrando
                point.input.dropZone = false; // Desactiva la propiedad de drop solo para este objeto
            });

            point.on('drag', (pointer, dragX, dragY) => {
                if (draggingPoint === point) {
                    point.x=point.input.dragStartX;
                    point.y=point.input.dragStartY;
                    // Borrar la línea anterior
                    this.shadow.clear();
                    // Actualiza el aspecto visual de la líne mientras se mueve
                    this.shadow.lineStyle(5, 0x2AA4BF, 0.1);
                    // Define la línea
                    this.scene.line = new Phaser.Geom.Line(point.input.dragStartX, point.input.dragStartY, pointer.x, pointer.y);
                    this.shadow.strokeLineShape(this.scene.line);
                    // Dibuja parábola
                    this.drawParabola(point.x, point.y, pointer.x, pointer.y, -60);
                };
            });
            point.on('drop', (pointer, dropZone) => {
                if (draggingPoint !== point) {
                    drop = true;
                    this.scene.parabolic = null;
                    this.shadow.clear();
                    this.graphics.clear();
                    this.scene.curvestyle.clear();
                    this.segment.lineStyle(5, 0x2AA4BF, 0.9);
                    const newSegment = new Phaser.Geom.Line(point.x, point.y, dropZone.x, dropZone.y);
                    this.segment.strokeLineShape(newSegment);
                    this.scene.segments.add(this.segment);
                };
            });
            point.on('dragend', (pointer) => {
                // Borrar la línea anterior
                if (drop == true) { // Asegura que solo estamos manejando el evento de finalización de arrastre para el punto correcto
                    // Borrar la línea anterior       
                    this.shadow.clear();
                    this.scene.curvestyle.clear();
                    //this.graphics.clear();
                    this.scene.parabolic = null;
                    draggingPoint = null;
                    this.reductionparabole == true;
                    // Restablece el punto que se está arrastrando
                };
            });
        };
        if (this.isClicking == false) {
            this.scene.parabolic = null;
            this.shadow.clear();
        };
    }
    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }
    moveSegment(){
        this.shadow.clear();
        this.scene.curvestyle.clear();
        this.scene.parabolic = null;
    }

}
