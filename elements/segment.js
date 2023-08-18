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
        });
    }

    createSegment() {
        for (const interactivePoint of this.scene.interactivePoints) {
            if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.pointermove)) {
                console.log("over");
                if (this.scene.pointA == null) {
                    //console.log("this.scene.pointB == null");
                    this.scene.pointA = interactivePoint;
                    this.scene.pointA.point.fillStyle(0x732c02);
                    this.scene.pointA.point.fillCircle(
                        this.scene.pointA.x,
                        this.scene.pointA.y,
                        5
                    );
                    console.log(this.scene.pointA.x);
                }
                else {
                    console.log("this.scene.pointB =! null");
                    if (this.isClicking) {
                        console.log("isClicking");
                        this.scene.pointB.x = this.pointermove.x + interactivePoint.x;
                        this.scene.pointB.y = this.pointermove.y + interactivePoint.y;
                    }
                }
            } else {
                if (this.isClicking && this.scene.pointA != null) {
                    console.log(this.scene.pointA.x);
                    this.scene.pointB.x = this.pointermove.x + interactivePoint.x;
                    this.scene.pointB.y = this.pointermove.y + interactivePoint.y;
                    // Actualiza el aspecto visual del punto mientras se mueve
                    this.segment = this.scene.add.graphics();
                    this.segment.clear();
                    this.segment = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });
                    this.line = new Phaser.Geom.Line(
                        this.scene.pointB.x,
                        this.scene.pointB.y,
                        this.scene.pointA.x,
                        this.scene.pointA.y
                    );
                    console.log(Phaser.Math.Distance.BetweenPoints(this.scene.pointA.point, this.scene.pointB.point));
                }

            }
        }
    }
    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }

}
