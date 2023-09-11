import { Segment } from "./segment.js";

export class Circle {
    constructor(scene) {
        this.scene = scene;
        this.scene.circles = []; // Grupo para almacenar los puntos en la escena
        this.scene.circles_gr = [];
        this.segment = new Segment(scene);
        //this.scene.points
        this.scene.pointB = null;
        this.scene.pointA = null;

        // Crear una propiedad graphics en la escena para mantener la instancia de Phaser.Graphics
        this.scene.shadow = scene.add.graphics({
            lineStyle: { width: 5, color: 0x000000, alpha: 0.8 },
        });
        this.circle = null;
        this.isClicking = false; // Variable para controlar si se está haciendo clic
        // Configura el evento de clic en la escena para capturar el puntero
        this.scene.input.on("pointerdown", () => {
            this.isClicking = true; // Se está haciendo clic
        });
        // Configura el evento de liberación del clic para controlar cuando se deja de hacer clic
        this.scene.input.on("pointerup", () => {
            this.isClicking = false; // No se está haciendo clic
        });
    }
    createCircle() {
        if (this.scene.activatebutton == "Circle") {
            const interactive = this.scene.points.getChildren();
            for (const point of interactive) {
                point.setInteractive({ draggable: true });
                point.input.dropZone = true;
                point.on("pointerdown", () => {
                    if (this.scene.activatebutton == "Circle") {
                        point.input.dropZone = false; // Desactiva la propiedad de drop solo para este objeto
                        this.circlescreated = this.scene.circles.length;
                    }
                });

                point.on("drag", (pointer) => {
                    if (this.scene.activatebutton == "Circle") {
                        point.x = point.input.dragStartX;
                        point.y = point.input.dragStartY;
                        // Borrar la línea anterior
                        this.scene.shadow.clear();
                        // Actualiza el aspecto visual de la líne mientras se mueve
                        this.scene.circle= new Phaser.Curves.Path();
                        this.scene.shadow.lineStyle(3, 0xF250DA, 0.3);

                        // Define la línea
                        let ratio = Phaser.Math.Distance.Between(point.x, point.y, pointer.x, pointer.y);
                        this.scene.circle.add(new Phaser.Curves.Ellipse(point.x, point.y, ratio))
                        this.scene.circle.draw(this.scene.shadow);
                        this.scene.shadow.fillStyle(0xF250DA, 0.1);
                        this.scene.shadow.fillCircle(point.x, point.y, ratio);
                    }
                });
                point.on("drop", (pointer, dropZone) => {
                    if (this.scene.activatebutton == "Circle" && this.circlescreated == this.scene.circles.length) {
                        if (dropZone != point) {
                            this.scene.shadow.clear();
                            this.circle_gr = this.scene.add.graphics({
                                lineStyle: { width: 3, color: 0xF250DA, alpha: 0.3 },
                            });

                            let ratio = Phaser.Math.Distance.Between(point.x, point.y, dropZone.x, dropZone.y);
                            this.circle = new Phaser.Curves.Ellipse(point.x,point.y,ratio);
                            this.circle.draw(this.circle_gr);
                            this.circle.innerpoint = [];
                            this.circle.p0 = point;
                            this.circle.p1 = dropZone;
                            this.scene.circles.push(this.circle);
                            this.scene.circles_gr.push(this.circle_gr);
                        }
                    }
                });
                point.on("dragend", (pointer) => {
                    if (this.scene.activatebutton == "Circle") {
                        this.scene.shadow.clear();
                        this.scene.curvestyle.clear();
                    }
                });
            }
            if (this.isClicking == false) {
                this.scene.shadow.clear();
            }
        }
    }
    moveCircle() {
        if (this.scene.activatebutton == "Move" && this.scene.circles.length > 0) {
            this.scene.shadow.clear();
            const interactive = this.scene.points.getChildren(); //
            for (const point of interactive) {
                    if (this.scene.activatebutton == "Move") {
                        for (let i = 0; i < this.scene.circles.length; i++) {
                            let circle = this.scene.circles[i];
                            if (point == circle.p0) {
                                this.scene.circles_gr[i].clear();
                                this.scene.circles_gr[i].lineStyle(3, 0xF250DA, 0.3);
                                circle.p0.x = point.x;
                                circle.p0.y = point.y;
                                circle.x = circle.p0.x
                                circle.y = circle.p0.y
                                let ratio = Phaser.Math.Distance.Between(circle.x, circle.y, circle.p1.x, circle.p1.y)
                                circle.xRadius = ratio;
                                circle.yRadius = ratio;
                                circle.draw(this.scene.circles_gr[i]);
                                                            // Actualiza los puntos internos asociados al segmento
                            for (const innerpoint of circle.innerpoint) {
                                const t = innerpoint.getData("t"); // Obtiene la posición relativa t
                                const { x, y } = circle.getPoint(t); // Calcula las nuevas coordenadas
                                innerpoint.x = x;
                                innerpoint.y = y;
                            }
                            } else if (point == circle.p1) {
                                this.scene.circles_gr[i].clear();
                                this.scene.circles_gr[i].lineStyle(3, 0xF250DA, 0.3);
                                let ratio = Phaser.Math.Distance.Between(circle.x, circle.y, circle.p1.x, circle.p1.y)
                                circle.xRadius = ratio;
                                circle.yRadius = ratio;
                                circle.draw(this.scene.circles_gr[i]);

                                                            // Actualiza los puntos internos asociados al segmento
                            for (const innerpoint of circle.innerpoint) {
                                const t = innerpoint.getData("t"); // Obtiene la posición relativa t
                                const { x, y } = circle.getPoint(t); // Calcula las nuevas coordenadas
                                innerpoint.x = x;
                                innerpoint.y = y;
                            }

                              }

                        }
                    }
            }
        }
    }
    addName() {
        this.scene.elementNames.push("Circle"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }
}