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

    drawParabola(x2, y2, x1, y1, n) {
        if (x1 !== x2) {
            this.curve.clear(); // Borra cualquier dibujo anterior
            this.curve.lineStyle(5, 0x2AA4BF, 0.9); // Estilo de línea

            const a = (4 * n) / Math.pow(x1 - x2, 2);
            const b = (-4 * n * (x1 + x2) + (x1 - x2) * (y1 - y2)) / Math.pow(x1 - x2, 2);
            const c = (4 * n * x1 * x2 + (x1 - x2) * (-x2 * y1 + x1 * y2)) / Math.pow(x1 - x2, 2);

            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);

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
        //Se revisan todos los puntos hechos
        for (const point of interactive){
            //Puntero sobre el area del puntos
            if (Phaser.Geom.Rectangle.ContainsPoint(point.area, this.pointermove)) {
                //Si no hay seleccionado
                if (this.scene.pointA == null) {
                    //se agrega el punto fijo A y se crea el puntoB
                    this.scene.pointA = point;
                    this.scene.pointB = this.pointermove;
                }//si hace clic se sigue el cursor
                else if (this.isClicking) {
                    this.scene.pointB = this.pointermove;
                }
            }
            else {//Si hay clic y hay B
                if (this.scene.pointB !== null) {
                    if (this.isClicking == true) {
                        this.scene.pointB = this.pointermove;
                        // Borrar la línea anterior
                        this.graphics.clear();
                        // Actualiza el aspecto visual de la líne mientras se mueve
                        this.graphics.lineStyle(5, 0x2AA4BF, 0.05);
                        const line = new Phaser.Geom.Line(
                            this.scene.pointA.x,
                            this.scene.pointA.y,
                            this.scene.pointB.x,
                            this.scene.pointB.y
                        );
                        this.drawParabola(
                            this.scene.pointA.x,
                            this.scene.pointA.y,
                            this.scene.pointB.x,
                            this.scene.pointB.y,
                            -20 //Distancia de "caida"
                        );
                        this.graphics.strokeLineShape(line);
                    }else{
                        this.curve.clear();
                        this.graphics.clear();
                        this.graphics.lineStyle(5, 0x2AA4BF, 0.9);
                        const line = new Phaser.Geom.Line(
                            this.scene.pointA.x,
                            this.scene.pointA.y,
                            this.scene.pointB.x,
                            this.scene.pointB.y
                        );
                        this.graphics.strokeLineShape(line);
                        this.scene.pointB = null;
                        this.scene.pointA = null;
                    }
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
