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
        });
    }
    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre al array de nombres de elementos en la escena
    }

    Startpoint(interactivePoint) {

        if (this.PointB == null) {
            const pt = interactivePoint;
        } else {
            const pt = this.pointA;
        }
        return pt
    }

    Startpoint(interactivePoint) {

        if (this.PointB == null) {
            const pt = interactivePoint;
        } else {
            const pt = this.pointA;
        }
        return pt
    }

    createSegment() {
        // Verifica si hay un punto almacenado como punto de inicio del segmento
        if (this.pointA === null) {
            // Itera a través de los puntos interactivos en la escena
            for (const interactivePoint of this.scene.interactivePoints) {
                // Verifica si el puntero se encuentra dentro del área del punto interactivo
                if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.scene.input.activePointer)) {
                    this.pointA = interactivePoint;
                    break; // Rompe el ciclo al encontrar el primer punto válido
                }
            }
        } else {
            // Asigna el punto actual del puntero como punto final del segmento
            this.pointB = new Point(this.scene, this.scene.input.activePointer.x, this.scene.input.activePointer.y);
            
            // Crea una nueva instancia de un segmento en base a los puntos A y B
            const newSegment = new Phaser.Geom.Line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
            this.segments.push(newSegment);
            
            // Reinicia los puntos de inicio y final para permitir la creación de otro segmento
            this.pointA = null;
            this.pointB = null;
        }
    }
}