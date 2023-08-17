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

    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre al array de nombres de elementos en la escena
    }

    createSegment() {
            if (this.isClicking && this.draggingPoint == null) {
                for (const interactivePoint of this.scene.interactivePoints) {
                    if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.pointermove)) {
                        this.pointA = interactivePoint;
                        break; // Sal del bucle una vez que se haya encontrado el punto A
                    }
                }
            }
    
            if (this.pointA) {
                if (this.draggingPoint == null) {
                    this.pointA.point.fillStyle(0x732c02);
                    this.pointA.point.fillCircle(this.pointA.x, this.pointA.y, 5);
                }
    
                if (this.draggingPoint === this.pointA) {
                    const newPointX = this.pointermove.x - this.draggingOffsetX;
                    const newPointY = this.pointermove.y - this.draggingOffsetY;
    
                    // Actualiza la posición del punto B
                    this.pointB = { x: newPointX, y: newPointY };
    
                    // Actualiza la línea con los nuevos puntos
                    this.line.setTo(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
    
                    // Limpia y dibuja la línea
                    this.segment.clear();
                    this.segment.strokeLineShape(this.line);
    
                    console.log(
                        Phaser.Math.Distance.Between(
                            this.pointA.x,
                            this.pointA.y,
                            this.pointB.x,
                            this.pointB.y
                        )
                    );
                }
            }
    
            // ... (resto de la lógica para actualizar la apariencia de los puntos interactivos)
        }
    
}
