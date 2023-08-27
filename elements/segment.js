import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.scene.segments = []; // Grupo para almacenar los puntos en la escena
        this.point = new Point(scene);
        //this.scene.points
        this.scene.pointB = null;
        this.scene.pointA = null;

        // Crear una propiedad graphics en la escena para mantener la instancia de Phaser.Graphics
        this.scene.shadow = scene.add.graphics({
            lineStyle: { width: 5, color: 0x000000, alpha: 0.8 },
        });
        this.segment_gr = this.scene.segment_gr;
        this.segment = null;
        this.scene.vertex = []; //vertices en el tiempo
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

    drawParabola(x1, y1, x2, y2, n) {
        if (x1 !== x2) {
            this.scene.curvestyle.clear();
            const p0 = new Phaser.Math.Vector2(x1, y1);
            const p2 = new Phaser.Math.Vector2(x2, y2);
            let p1 = new Phaser.Math.Vector2((x1 + x2) / 2, (y1 + y2) / 2 - n);
            let delay = 500;
            console.log(this.scene.counter)
            if (this.scene.vertex.length < delay) {
                this.scene.vertex.push(p1);
                this.scene.counter = 0
                this.scene.parabolic = new Phaser.Curves.QuadraticBezier(p0, this.scene.vertex[this.scene.counter], p2);
            } else {
                if (this.scene.counter < (delay + 1)) {
                    this.scene.counter++
                } else {
                    this.scene.counter = this.scene.counter - (delay + 1);
                }
                this.scene.parabolic = new Phaser.Curves.QuadraticBezier(p0, this.scene.vertex[this.scene.counter], p2);
                this.scene.vertex[this.scene.counter] = p1;
            }
        }
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
            point.on("pointerdown", () => {
                if (this.scene.activatebutton == "Segment") {
                    draggingPoint = point; // Establece el punto que se está arrastrando
                    point.input.dropZone = false; // Desactiva la propiedad de drop solo para este objeto
                }
            });

            point.on("drag", (pointer) => {
                if (this.scene.activatebutton == "Segment") {
                    if (draggingPoint === point) {
                        point.x = point.input.dragStartX;
                        point.y = point.input.dragStartY;
                        // Borrar la línea anterior
                        this.scene.shadow.clear();
                        // Actualiza el aspecto visual de la líne mientras se mueve
                        this.scene.shadow.lineStyle(5, 0x2aa4bf, 0.1);
                        // Define la línea
                        this.scene.line = new Phaser.Geom.Line(
                            point.input.dragStartX,
                            point.input.dragStartY,
                            pointer.x,
                            pointer.y
                        );
                        this.scene.shadow.strokeLineShape(this.scene.line);
                        // Dibuja parábola
                        this.drawParabola(point.x, point.y, pointer.x, pointer.y, -30);
                    }
                }
            });
            point.on("drop", (pointer, dropZone) => {
                if (this.scene.activatebutton == "Segment") {
                    if (draggingPoint !== point) {
                        this.scene.vertex = [];
                        drop = true;
                        this.scene.parabolic = null;
                        this.scene.shadow.clear();
                        this.scene.curvestyle.clear();
                        //this.scene.segment_gr.lineStyle(5, 0x2aa4bf, 0.9);
                        this.segment = new Phaser.Curves.Line(point, dropZone);
                        this.segment.draw(this.scene.segment_gr);
                        this.scene.segments.push(this.segment);
                    }
                }
            });
            point.on("dragend", (pointer) => {
                if (this.scene.activatebutton == "Segment") {
                this.scene.vertex = [];
                this.scene.parabolic = null;
                this.scene.shadow.clear();
                this.scene.curvestyle.clear();
                draggingPoint = null;
                this.reductionparabole == true;
                }
            });
        }
        if (this.isClicking == false) {
            this.scene.vertex = [];
            this.scene.parabolic = null;
            this.scene.shadow.clear();

        }
    }
    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }
}
