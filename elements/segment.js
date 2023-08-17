import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.segments = []; // Arreglo para almacenar los segmentos
        this.pointA = null;
        this.pointB = null;

        this.isClicking = false; // Variable para controlar si se está haciendo clic

        // Configura el evento de clic en la escena para capturar el puntero
        this.scene.input.on("pointerdown", (pointer) => {
            this.isClicking = true; // Se está haciendo clic
            this.createSegment(); // Intenta crear el segmento al hacer clic
        });

        // Configura el evento de liberación del clic para controlar cuando se deja de hacer clic
        this.scene.input.on("pointerup", () => {
            this.isClicking = false; // No se está haciendo clic
            if (this.pointA && this.pointB) {
                this.segments.push(new Phaser.Geom.Line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y));
            }
            this.pointA = null;
            this.pointB = null;
        });
    }
    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre al array de nombres de elementos en la escena
    }
    createSegment() {
        // Itera a través de los puntos interactivos en la escena
        for (const interactivePoint of this.scene.interactivePoints) {
            if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.scene.input.activePointer)) {
                // Cambia el aspecto visual del punto interactivo
                interactivePoint.point.clear();
                interactivePoint.point.fillStyle(0x00ff00); // Cambia el color a verde
                interactivePoint.point.fillCircle(
                    interactivePoint.x,
                    interactivePoint.y,
                    5
                );
                
                if (!this.pointA) {
                    this.pointA = new Phaser.Geom.Point(interactivePoint.x, interactivePoint.y);
                } else {
                    this.pointB = new Phaser.Geom.Point(interactivePoint.x, interactivePoint.y);
                }
            }
        }
    }
}
