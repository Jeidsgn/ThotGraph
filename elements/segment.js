import { Point } from "./point.js";

export class Segment {
    constructor(scene) {
        this.scene = scene;
        this.segments = scene.add.group(); // Grupo para almacenar los puntos en la escena
        this.point = new Point(scene);
        //this.scene.points
        this.scene.pointB = null;
        this.scene.pointA = null;

        // Crear una propiedad graphics en la escena para mantener la instancia de Phaser.Graphics
        this.graphics = scene.add.graphics({ lineStyle: { width: 5, color: 0x000000, alpha: 0.8 } });
        this.curve = scene.add.graphics({ lineStyle: { width: 5, color: 0x000000, alpha: 0.8 } });

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
        console.log("entra a la fución");
        if (x1 !== x2) {
            this.curve.clear(); // Borra cualquier dibujo anterior
            this.curve.lineStyle(5, 0x2AA4BF, 0.9); // Estilo de línea

            const a = (4 * n) / (x1 - x2) ** 2;
            const b = (-4 * n * (x1 + x2) + (x1 - x2) * (y1 - y2)) / (x1 - x2) ** 2;
            const c = (4 * n * x1 * x2 + (x1 - x2) * (-x2 * y1 + x1 * y2)) / (x1 - x2) ** 2;
            
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            console.log("coeficientes "+x2+" "+y2+" "+x1);
            console.log("coeficientes "+a+" "+b+" "+c);
            // Dibuja la parábola utilizando la ecuación y = ax^2 + bx + c
            for (let x = minX; x <= maxX; x++) {
                const y = a * x * x + b * x + c;
                this.curve.lineTo(x, y);
            }
            this.curve.strokePath(); // Dibuja la parábola completa
        }
    }
    createSegment() {
        this.point.stopMovePoint();
        const interactive = this.scene.points.getChildren();
        for (const point of interactive) {
            point.setInteractive({ draggable: true });
        };
        // Habilita el arrastre para el punto
        this.scene.input.on('drag', (pointer, gameObject) => {
            // Borrar la línea anterior
            this.graphics.clear();
            // Actualiza el aspecto visual de la líne mientras se mueve
            this.graphics.lineStyle(5, 0x2AA4BF, 0.5);
            const line = new Phaser.Geom.Line(
                gameObject.x,
                gameObject.y,
                pointer.x,
                pointer.y
            );
            this.drawParabola(
                gameObject.x,
                gameObject.y,
                pointer.x,
                pointer.y
                -20 //Distancia de "caida"
            );
            this.graphics.strokeLineShape(line);
        });

    }
    addName() {
        this.scene.elementNames.push("Segment"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }

}
