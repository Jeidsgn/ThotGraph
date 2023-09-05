export class Point {
    constructor(scene) {
        this.scene = scene;
        this.count = 1;
        this.scene.pointdraggable = [];
        this.scene.draggingPoint = null;
        this.scene.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
        this.isClicking = false; // Variable para controlar si se está haciendo clic
        this.coordenates = null;
        this.scene.input.on("pointerdown", () => {
            this.isClicking = true; // Se está haciendo clic
            this.pointCreated = false; // No hay punto creado
        });
        this.scene.input.on("pointermove", (pointer) => {
            this.pointer = pointer; // No se está haciendo clic
        });
        this.scene.input.on("pointerup", () => {
            this.isClicking = false; // No se está haciendo clic
        });
    }
    addName() {
        this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }
    getNearestPointOnSegment(p0, p1, p) {
        let line = new Phaser.Geom.Line(p0.x, p0.y, p1.x, p1.y);
        let np = Phaser.Geom.Line.GetNearestPoint(line, new Phaser.Geom.Point(p.x, p.y));
        return np;

    }
    getNearestPointOnCircle(circle, p) {
        let angle = (Phaser.Math.Angle.Between(circle.x, circle.y, p.x, p.y));
        let np = null;
        if (angle > 0) {
            np = circle.getPointAt((0.18 * angle));
        } else {
            np = circle.getPointAt((0.16 * angle) + 1);
        };
        np.setData("t", angle)
        return np;

    }

    createPoint() {
        if (this.isClicking && !this.pointCreated) {
            const letter = this.count;
            this.count = this.count + 1;
            // Inicializa variables para rastrear la línea y el punto más cercano
            let nearsegment = null;
            let nearcircle = null;
            let nearpoint = null;
            let NearDistanceSegment = Number.MAX_VALUE;
            let NearDistanceCircle = Number.MAX_VALUE;
            let proportion = null;

            // Itera a través de las líneas y encuentra la más cercana
            for (let i = 0; i < this.scene.segments.length; i++) {
                let segment = this.scene.segments[i];
                let pointsegment = this.getNearestPointOnSegment(segment.p0, segment.p1, this.pointer);
                let distance = Phaser.Math.Distance.Between(
                    this.pointer.x,
                    this.pointer.y,
                    pointsegment.x,
                    pointsegment.y
                );

                if (distance < NearDistanceSegment) {
                    NearDistanceSegment = distance;
                    nearsegment = segment;
                    nearpoint = pointsegment;
                }
                proportion = (nearpoint.x - nearsegment.p0.x) / (nearsegment.p1.x - nearsegment.p0.x);
                this.coordenates = nearsegment.getPointAt(proportion);
                // Si la distancia es menor a 15 píxeles, crea el punto en el punto más cercano en la línea
                if (NearDistanceSegment < 15) {

                    const point = this.scene.add
                        .sprite(this.coordenates.x, this.coordenates.y, "point", 0)
                        .setOrigin(0.5, 0.52);
                    this.textContainer = this.scene.add.text(point.x, point.y - 26, "", {
                        fill: "#000000",
                    });
                    // Asigna el segmento al punto
                    point.segment = nearsegment;
                    nearsegment.innerpoint.push(point);
                    this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
                    point.id = letter; // Agrega el nombre del punto
                    point.setData("t", proportion);
                    this.scene.points.add(point); // Agrega el punto al grupo
                    this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
                    this.pointCreated = true; // Establece la bandera para indicar que se ha creado un punto
                }
            }

            // Itera a través de los circulos y encuentra el más cercana
            for (let i = 0; i < this.scene.circles.length; i++) {
                let circle = this.scene.circles[i];
                let pointcircle = this.getNearestPointOnCircle(circle, this.pointer);//El punto más cercano dentro de los circulos
                let distance = Phaser.Math.Distance.Between(
                    this.pointer.x,
                    this.pointer.y,
                    pointcircle.x,
                    pointcircle.y
                );
                if (distance < NearDistanceCircle) {
                    NearDistanceCircle = distance;
                    nearcircle = circle;
                    nearpoint = pointcircle;
                }
                proportion = (Phaser.Math.Angle.Between(nearcircle.x, nearcircle.y, nearpoint.x, nearpoint.y))
                if (proportion > 0) {
                    this.coordenates = nearcircle.getPointAt((0.17 * proportion));
                } else {
                    this.coordenates = nearcircle.getPointAt((0.16 * proportion) + 1);
                };
                // Si la distancia es menor a 15 píxeles, crea el punto en el punto más cercano en la línea
                if (NearDistanceCircle < 15) {

                    const point = this.scene.add
                        .sprite(this.coordenates.x, this.coordenates.y, "point", 0)
                        .setOrigin(0.5, 0.52);
                    this.textContainer = this.scene.add.text(point.x, point.y - 26, "", {
                        fill: "#000000",
                    });
                    // Asigna el segmento al punto
                    point.circle = nearcircle;
                    nearcircle.innerpoint.push(point);
                    //console.log(point);
                    this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
                    point.id = letter; // Agrega el nombre del punto
                    point.setData("t", nearpoint.getData("t"));
                    this.scene.points.add(point); // Agrega el punto al grupo
                    this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
                }
            }


        }
    }
    movePoint() {
        if (this.scene.activatebutton === "Move") {
            const interactive = this.scene.points.getChildren();
            for (const point of interactive) {
                point.setInteractive({ draggable: true });
                point.on("drag", (pointer, dragX, dragY) => {
                    if (this.scene.activatebutton === "Move") {
                        // Obtén el segmento al que pertenece el punto
                        const segment = point.segment;

                        if (segment) {
                            // Calcula la posición relativa 't' dentro del segmento
                            let t = (dragX - segment.p0.x) / (segment.p1.x - segment.p0.x);
                            t = Phaser.Math.Clamp(t, 0, 1);

                            // Calcula las coordenadas del punto en el segmento
                            const { x, y } = segment.getPointAt(t);

                            // Actualiza la posición del punto solo dentro del segmento
                            point.x = x;
                            point.y = y;
                            point.setData("t", t); // Actualiza la propiedad 't'
                        }
                        // Obtén el circulo al que pertenece el punto
                        let circle = point.circle;
                        if (circle) {
                            let point_circle = this.getNearestPointOnCircle(circle, pointer);
                            point.x = point_circle.x;
                            point.y = point_circle.y;
                            point.setData("t", point_circle.getData("t")); // Actualiza la propiedad 't'
                        }
                    }
                });
            }
        }
    }

}
