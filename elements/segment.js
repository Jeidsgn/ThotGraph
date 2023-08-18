import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.segments = []; // Arreglo para almacenar los segmentos
        this.point = new Point(scene);
        //this.scene.interactivePoints
        this.pointB = null;
        this.pointA = null;

        this.isClicking = false; // Variable para controlar si se está haciendo clic
        this.pointermove = { x: 0, y: 0 }; // Almacena la posición del puntero

        // Configura el evento de clic en la escena para capturar el puntero
        this.scene.input.on("pointerdown", (pointer) => {
            this.isClicking = true; // Se está haciendo clic
        });
        // Capturar el puntero en la escena
        this.scene.input.on("pointermove", (pointer) => {
            this.pointermove = { x: pointer.x, y: pointer.y }; // Almacena la posición del puntero
        });

        // Configura el evento de liberación del clic para controlar cuando se deja de hacer clic
        this.scene.input.on("pointerup", () => {
            this.isClicking = false; // No se está haciendo clic
            this.draggingPoint = null;
        });
    }

    createSegment() {

        for (const interactivePoint of this.scene.interactivePoints) {
            if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.pointermove)) {
                if (this.pointB == null) {
                    this.pointA = interactivePoint;
                    this.pointA.point.fillStyle(0x732c02);
                    this.pointA.point.fillCircle(
                        this.pointA.x,
                        this.pointA.y,
                        5
                    );
                }
                else {
                    if (this.isClicking) {
                        this.pointB.x = this.pointermove.x + interactivePoint.x;
                        this.pointB.y = this.pointermove.y - interactivePoint.y;
                        // Actualiza el aspecto visual del punto mientras se mueve
                        this.segment = this.scene.add.graphics();
                        this.segment.clear();
                        this.segment = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });
                        this.line = new Phaser.Geom.Line(
                            this.pointB.x,
                            this.pointB.y,
                            this.pointA.x,
                            this.pointA.y
                        );
                        console.log(Phaser.Math.Distance.BetweenPoints(this.pointA.point, interactivePoint.point))
                    }
                }
            }
        }
    }
    addName() {
        this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
      }

}
