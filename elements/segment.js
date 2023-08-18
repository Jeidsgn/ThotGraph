import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.segments = []; // Arreglo para almacenar los segmentos
        this.point = new Point(scene);
        //this.scene.interactivePoints
        this.scene.pointB = null;
        this.scene.pointA = null;
        // Crear una propiedad graphics en la escena para mantener la instancia de Phaser.Graphics
        this.graphics = scene.add.graphics({ lineStyle: { width: 5, color: 0x000000 } });

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
    catenary(x1, y1, x2, y2) {
        const a = 1.5; // Ajusta el valor de "a" para controlar la forma de la catenaria
        const numSegments = 100; // Número de segmentos para aproximar la catenaria
        
        this.graphics.clear(); // Borra cualquier dibujo anterior
        
        this.graphics.lineStyle(5, 0x000000); // Estilo de línea
        
        const step = (x2 - x1) / numSegments; // Paso entre los segmentos
        
        this.graphics.moveTo(x1, y1); // Mueve el lápiz al primer punto
        
        // Dibuja la curva catenaria utilizando la ecuación y = a * cosh((x - x1) / a) + y1
        for (let i = 0; i < numSegments; i++) {
            const x = x1 + i * step;
            const y = a * Math.cosh((x - x1) / a) + y1;
            this.graphics.lineTo(x, y);
        }
        
        this.graphics.lineTo(x2, y2); // Conecta el último punto
        
        this.graphics.strokePath(); // Dibuja la curva catenaria completa
    }

    createSegment() {
        for (const interactivePoint of this.scene.interactivePoints) {
            if (Phaser.Geom.Rectangle.ContainsPoint(interactivePoint.area, this.pointermove)) {
                console.log("over");
                if (this.scene.pointA == null) {
                    //console.log("this.scene.pointB == null");
                    this.scene.pointA = interactivePoint;
                    this.scene.pointB = this.pointermove;
                    this.scene.pointA.point.fillStyle(0x732c02);
                    this.scene.pointA.point.fillCircle(
                        this.scene.pointA.x,
                        this.scene.pointA.y,
                        5
                    );
                    console.log(this.scene.pointA.x);
                }
                else if (this.isClicking) {
                    this.scene.pointB = this.pointermove;
                }
            }
            else {
                if (this.isClicking && this.scene.pointB !== null) {
                    console.log(this.scene.pointA.x);
                    console.log(this.scene.pointB.x);
                    this.scene.pointB = this.pointermove;
                    // Borrar la línea anterior
                    this.graphics.clear();
                    // Actualiza el aspecto visual del punto mientras se mueve
                    const line = new Phaser.Geom.Line(
                        this.scene.pointA.x,
                        this.scene.pointA.y,
                        this.scene.pointB.x,
                        this.scene.pointB.y
                    );
                    this.catenary(
                        this.scene.pointA.x,
                        this.scene.pointA.y,
                        this.scene.pointB.x,
                        this.scene.pointB.y
                    );
                    this.graphics.strokeLineShape(line);
                    console.log(Phaser.Math.Distance.BetweenPoints(this.scene.pointA.point, this.scene.pointB));
                }

            }
        }
        if (!this.isClicking) {
            this.scene.pointB = null;
            this.scene.pointA = null;
        }
    }
    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }

}
