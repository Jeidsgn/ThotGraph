import { Point } from "./point.js";

export class Line {
    constructor(scene) {
        this.scene = scene;
        this.scene.lines = []; // Grupo para almacenar los puntos en la escena
        this.scene.lines_gr = [];
        this.point = new Point(scene);
        //this.scene.points
        this.scene.pointB = null;
        this.scene.pointA = null;

        // Crear una propiedad graphics en la escena para mantener la instancia de Phaser.Graphics
        this.scene.shadow = scene.add.graphics({
            lineStyle: { width: 5, color: 0x000000, alpha: 0.5 },
        });
        this.line = null;
        this.isClicking = false; // Variable para controlar si se está haciendo clic
        this.pointermove = { x: 0, y: 0 }; // Almacena la posición del puntero
        // Configura el evento de clic en la escena para capturar el puntero
        this.scene.input.on("pointerdown", () => {
            this.isClicking = true; // Se está haciendo clic
        });
        // Configura el evento de liberación del clic para controlar cuando se deja de hacer clic
        this.scene.input.on("pointerup", () => {
            this.isClicking = false; // No se está haciendo clic
        });
    }
    getInfiniteLineCoordinates(p0, p1) {
        // Calcula la dirección de la línea original
        const direction = new Phaser.Math.Vector2(p1.x - p0.x, p1.y - p0.y).normalize();
        const extensionDistance = 3000;
        // Calcula los puntos extremos para simular la línea infinita
        const extendedP0 = new Phaser.Math.Vector2(p0.x - direction.x * extensionDistance, p0.y - direction.y * extensionDistance);
        const extendedP1 = new Phaser.Math.Vector2(p1.x + direction.x * extensionDistance, p1.y + direction.y * extensionDistance);

        return [extendedP0, extendedP1];

    }

    createLine() {
        if (this.scene.activatebutton == "Line") {
            const interactive = this.scene.points.getChildren();
            for (const point of interactive) {
                point.setInteractive({ draggable: true });
                point.input.dropZone = true;
                point.on("pointerdown", () => {
                    if (this.scene.activatebutton == "Line") {
                        point.input.dropZone = false; // Desactiva la propiedad de drop solo para este objeto
                        this.linescreated = this.scene.lines.length;
                    }
                });

                point.on("drag", (pointer) => {
                    if (this.scene.activatebutton == "Line") {
                        point.x = point.input.dragStartX;
                        point.y = point.input.dragStartY;
                        // Borrar la línea anterior
                        this.scene.shadow.clear();
                        // Actualiza el aspecto visual de la líne mientras se mueve
                        this.scene.shadow.lineStyle(5, 0xA9F250, 0.2);
                        // Define la línea
                        let infinitepts = this.getInfiniteLineCoordinates(point, pointer);
                        this.scene.line = new Phaser.Geom.Line(
                            infinitepts[0].x,
                            infinitepts[0].y,
                            infinitepts[1].x,
                            infinitepts[1].y,
                        );
                        this.scene.shadow.strokeLineShape(this.scene.line);
                    }
                });
                point.on("drop", (pointer, dropZone) => {
                    if (this.scene.activatebutton == "Line" && this.linescreated == this.scene.lines.length) {
                        if (dropZone != point) {
                            this.scene.shadow.clear();
                            this.scene.curvestyle.clear();
                            this.line_gr = this.scene.add.graphics({
                                lineStyle: { width: 5, color: 0xA9F250, alpha: 0.4 },
                            });
                            let infinitepts = this.getInfiniteLineCoordinates(point, dropZone);
                            this.line = new Phaser.Curves.Line(infinitepts[0], infinitepts[1]);
                            this.line.draw(this.line_gr);
                            this.line.innerpoint = [];
                            this.line.sp0 = point;
                            this.line.sp1 = dropZone;
                            this.scene.lines.push(this.line);
                            this.scene.lines_gr.push(this.line_gr);
                        }
                    }
                });
                point.on("dragend", (pointer) => {
                    if (this.scene.activatebutton == "line") {
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
    moveLine() {
        if (this.scene.activatebutton == "Move" && this.scene.lines.length > 0) {
            this.scene.shadow.clear();
            const interactive = this.scene.points.getChildren(); //
            for (const point of interactive) {
                if (this.scene.activatebutton == "Move") {
                    for (let i = 0; i < this.scene.lines.length; i++) {
                        let line = this.scene.lines[i];
                        if (point == line.sp0) {
                            this.scene.lines_gr[i].clear();
                            this.scene.lines_gr[i].lineStyle(5, 0xA9F250, 0.5);
                            let infinitepts = this.getInfiniteLineCoordinates(line.sp0, line.sp1);
                            line.p0 = infinitepts[0];
                            line.p1 = infinitepts[1];
                            line.sp0.x = point.x;
                            line.sp0.y = point.y;
                            line.draw(this.scene.lines_gr[i]);
                            // Actualiza los puntos internos asociados al lineo
                            for (const innerpoint of line.innerpoint) {
                                const t = innerpoint.getData("t"); // Obtiene la posición relativa t
                                const { x, y } = line.getPoint(t); // Calcula las nuevas coordenadas
                                innerpoint.x = x;
                                innerpoint.y = y;
                            }
                        } else if (point == line.sp1) {
                            this.scene.lines_gr[i].clear();
                            this.scene.lines_gr[i].lineStyle(5, 0xA9F250, 0.5);
                            let infinitepts = this.getInfiniteLineCoordinates(line.sp0, line.sp1);
                            line.p0 = infinitepts[0];
                            line.p1 = infinitepts[1];
                            line.sp1.x = point.x;
                            line.sp1.y = point.y;
                            line.draw(this.scene.lines_gr[i]);

                            // Actualiza los puntos internos asociados al lineo
                            for (const innerpoint of line.innerpoint) {
                                if (innerpoint.intersection == true) {

                                    let nearDistance = Number.MAX_VALUE
                                    console.log(point.object);
                                    let ip = this.point.findIntersections(point.objects);
                                    let newIntersection = null;
                                    for (let k = 0; k < ip.length; k++) {
                                        let distance = Phaser.Math.Distance.Between(innerpoint.x, innerpoint.y, ip[k].x, ip[k].y);
                                        if (distance < nearDistance) {
                                            nearDistance = distance;
                                            newIntersection = ip[k];
                                        };
                                    };
                                    innerpoint.x = newIntersection.x;
                                    innerpoint.y = newIntersection.y;
                                } else {
                                    const t = innerpoint.getData("t"); // Obtiene la posición relativa t
                                    const { x, y } = line.getPoint(t); // Calcula las nuevas coordenadas
                                    innerpoint.x = x;
                                    innerpoint.y = y;

                                }
                            }
                        }

                    }
                }
            }
        }
    }
    addName() {
        this.scene.elementNames.push("Line"); // Agrega el nombre "Line" al array de nombres de elementos en la escena
    }
}
