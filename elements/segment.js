import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.segments = scene.add.group(); // Grupo para almacenar los puntos en la escena
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
        this.graphics.clear(); // Borra cualquier dibujo anterior
        
        this.graphics.lineStyle(5, 0x000000); // Estilo de línea
        
        const a = (y2 - y1) / Math.pow((x2 - x1), 2); // Coeficiente de la parábola
        const startY = Math.min(y1, y2); // Asegúrate de comenzar desde el punto más bajo
        
        this.graphics.moveTo(x1, startY); // Mueve el lápiz al primer punto
        
        // Dibuja la parábola utilizando la ecuación y = a * (x - x1)^2 + startY
        for (let x = x1; x <= x2; x++) {
            const y = -a * Math.pow((x - x1), 2) - startY;
            this.graphics.lineTo(x, y);
        }
        
        this.graphics.strokePath(); // Dibuja la parábola completa
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
