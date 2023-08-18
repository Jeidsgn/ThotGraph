import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.segments = []; // Arreglo para almacenar los segmentos
        this.point = new Point(scene);
        //this.scene.interactivePoints
        this.scene.pointB = null;
        this.scene.pointA = null;

        this.isClicking = false; // Variable para controlar si se está haciendo clic
        this.pointermove = { x: 0, y: 0 }; // Almacena la posición del puntero

        // Crear una instancia de Phaser.Graphics para dibujar el segmento
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 5, color: 0x000000 } });

        // Configura los eventos de interacción
        this.scene.input.on("pointerdown", () => {
            this.isClicking = true;
        });

        this.scene.input.on("pointermove", (pointer) => {
            this.pointermove = { x: pointer.x, y: pointer.y };
        });

        this.scene.input.on("pointerup", () => {
            this.isClicking = false;
            this.scene.pointB = null;
            this.scene.pointA = null;
            this.graphics.clear(); // Borra el contenido del gráfico al soltar el clic
        });
    }

    updateSegment() {
        if (this.scene.pointA && this.scene.pointB) {
            this.graphics.clear();
            const line = new Phaser.Geom.Line(
                this.scene.pointA.x,
                this.scene.pointA.y,
                this.scene.pointB.x,
                this.scene.pointB.y
            );
            this.graphics.strokeLineShape(line);
        }
    }

    createSegment() {
        for (const interactivePoint of this.scene.interactivePoints) {
            if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.pointermove)) {
                if (this.scene.pointA == null) {
                    this.scene.pointA = interactivePoint;
                    this.scene.pointB = this.pointermove;
                    this.scene.pointA.point.fillStyle(0x732c02);
                    this.scene.pointA.point.fillCircle(
                        this.scene.pointA.x,
                        this.scene.pointA.y,
                        5
                    );
                }
                else if (this.isClicking) {
                    this.scene.pointB = this.pointermove;
                }
            }
        }
    }

    addName() {
        this.scene.elementNames.push("Segment");
    }
}
