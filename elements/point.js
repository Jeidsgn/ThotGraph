export class Point {
    constructor(scene) {
        this.scene = scene;
        this.count = 1;
        this.scene.pointdraggable = [];
        this.scene.draggingPoint = null;
        this.scene.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
        this.isClicking = false; // Variable para controlar si se está haciendo clic
        this.coordenates = null;
        this.scene.input.on("pointermove", (pointer) => {
            this.pointer = pointer; // No se está haciendo clic
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
        let angle = Phaser.Math.RadToDeg((Phaser.Math.Angle.Between(circle.x, circle.y, p.x, p.y)));
        let np = null;
        if (angle > 0) {
            angle = angle / 360;
        } else {
            angle = (angle / 360) + 1;
        };
        np = circle.getPointAt(angle);
        np.t = angle;
        return np;

    }
    findIntersections(objects) {
        const intersections = [];
        for (let i = 0; i < objects.length; i++) {
            for (let j = i + 1; j < objects.length; j++) {
                let intersection = new Phaser.Geom.Point();
                // Verificar el tipo de objetos y calcular la intersección adecuada
                if (objects[i] instanceof Phaser.Curves.Line && objects[j] instanceof Phaser.Curves.Ellipse) {
                    // Convertir la curva a un objeto Geom para verificar la intersección
                    const geomLine = new Phaser.Geom.Line(objects[i].p0.x, objects[i].p0.y, objects[i].p1.x, objects[i].p1.y);
                    const geomCircle = new Phaser.Geom.Circle(objects[j].x, objects[j].y, objects[j].xRadius);
                    this.line_gr = this.scene.add.graphics({ lineStyle: { width: 5, color: 0xA9F250, alpha: 0.4 }, });
                    if (Phaser.Geom.Intersects.LineToCircle(geomLine, geomCircle)) {
                        for (let k = 0; k < Phaser.Geom.Intersects.GetLineToCircle(geomLine, geomCircle).length; k++) {
                            intersection = Phaser.Geom.Intersects.GetLineToCircle(geomLine, geomCircle)[k];
                            intersection.objects = [objects[i], objects[j]];
                            intersections.push(intersection);
                        };
                        console.log("LineToCircle");
                    }
                } else if (objects[i] instanceof Phaser.Curves.Line && objects[j] instanceof Phaser.Curves.Line) {
                    const geomLine1 = new Phaser.Geom.Line(objects[i].p0.x, objects[i].p0.y, objects[i].p1.x, objects[i].p1.y);
                    const geomLine2 = new Phaser.Geom.Line(objects[j].p0.x, objects[j].p0.y, objects[j].p1.x, objects[j].p1.y);

                    if (Phaser.Geom.Intersects.LineToLine(geomLine1, geomLine2)) {
                        intersection = Phaser.Geom.Intersects.GetLineToLine(geomLine1, geomLine2);
                        intersection.objects = [objects[i], objects[j]];
                        intersections.push(intersection);
                        console.log("LineToLine");
                    }
                } else if (objects[i] instanceof Phaser.Curves.Ellipse && objects[j] instanceof Phaser.Curves.Ellipse) {
                    // Convertir la curva a un objeto Geom para verificar la intersección
                    const geomCircle1 = new Phaser.Geom.Circle(objects[i].x, objects[i].y, objects[i].xRadius);
                    const geomCircle2 = new Phaser.Geom.Circle(objects[j].x, objects[j].y, objects[j].xRadius);
                    if (Phaser.Geom.Intersects.CircleToCircle(geomCircle1, geomCircle2)) {
                        for (let k = 0; k < Phaser.Geom.Intersects.GetCircleToCircle(geomCircle1, geomCircle2).length; k++) {
                            intersection = Phaser.Geom.Intersects.GetCircleToCircle(geomCircle1, geomCircle2)[k];
                            intersection.objects = [objects[i], objects[j]];
                            intersections.push(intersection);
                        };
                        console.log("CircleToCircle");
                    }
                }// Agregar casos para otros tipos de objetos (círculos, líneas, etc.)
            }
        };
        return intersections;
    }
    createPoint() {
        this.scene.input.on("pointerdown", () => {
            this.pointscreated = this.scene.points.getChildren().length;
        });
        this.scene.input.on("pointerup", () => {
            // Verifica si ya se ha creado un punto en este clic
            if (this.scene.activatebutton === "Point") {
                // Establece la bandera para indicar que se está haciendo clic
                const letter = this.count;
                this.count = this.count + 1;
                // Inicializa variables para rastrear la línea y el punto más cercano
                let nearsegment = null;
                let nearcircle = null;
                let nearline = null;
                let nearintersection = null;
                let nearpoint = null;
                let NearDistanceSegment = Number.MAX_VALUE;
                let NearDistanceLine = Number.MAX_VALUE;
                let NearDistanceCircle = Number.MAX_VALUE;
                let NearDistanceIntersection = Number.MAX_VALUE;
                let proportion = null;
                this.scene.objects = [].concat(this.scene.segments, this.scene.lines, this.scene.circles);
                this.scene.intersections = this.findIntersections(this.scene.objects);
                // Itera a través de las intersecciones y encuentra la más cercana
                for (let i = 0; i < this.scene.intersections.length; i++) {
                    let intersection = this.scene.intersections[i];
                    let distance = Phaser.Math.Distance.Between(
                        this.pointer.x,
                        this.pointer.y,
                        intersection.x,
                        intersection.y
                    );

                    if (distance < NearDistanceIntersection) {
                        NearDistanceIntersection = distance;
                        nearintersection = intersection;
                    }
                    // Si la distancia es menor a 22 píxeles, crea el punto en el punto más cercano en la línea
                    if (NearDistanceIntersection < 22 && this.pointscreated == this.scene.points.getChildren().length) {

                        const point = this.scene.add
                            .sprite(nearintersection.x, nearintersection.y, "point", 0)
                            .setOrigin(0.5, 0.58);
                        this.textContainer = this.scene.add.text(point.x, point.y - 26, "", {
                            fill: "#000000",
                        });
                        // Asigna el segmento al punto
                        point.intersection = true;
                        point.segment = null;
                        point.circle = null;
                        for (i in nearintersection.objects) {
                            nearintersection.objects[i].innerpoint.push(point);
                        }
                        point.objects = nearintersection.objects;
                        //nearsegment.innerpoint.push(point);
                        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
                        point.id = letter; // Agrega el nombre del punto
                        //point.setData("t", proportion);
                        this.scene.points.add(point); // Agrega el punto al grupo
                        // Establece la bandera para indicar que se ha creado un punto
                    }
                }
                // Itera a través de las líneas y encuentra la más cercana
                for (let i = 0; i < this.scene.lines.length; i++) {
                    let line = this.scene.lines[i];
                    let pointline = this.getNearestPointOnSegment(line.p0, line.p1, this.pointer);
                    let distance = Phaser.Math.Distance.Between(
                        this.pointer.x,
                        this.pointer.y,
                        pointline.x,
                        pointline.y
                    );

                    if (distance < NearDistanceLine) {
                        NearDistanceLine = distance;
                        nearline = line;
                        nearpoint = pointline;
                    }
                    proportion = (nearpoint.x - nearline.p0.x) / (nearline.p1.x - nearline.p0.x);
                    this.coordenates = nearline.getPointAt(proportion);
                    // Si la distancia es menor a 15 píxeles, crea el punto en el punto más cercano en la línea+

                    if (NearDistanceLine < 15 && this.pointscreated == this.scene.points.getChildren().length) {
                        const point = this.scene.add
                            .sprite(this.coordenates.x, this.coordenates.y, "point", 0)
                            .setOrigin(0.5, 0.58);
                        this.textContainer = this.scene.add.text(point.x, point.y - 26, "", {
                            fill: "#000000",
                        });
                        // Asigna la línea al punto
                        point.segment = nearline;
                        point.circle = null;
                        nearline.innerpoint.push(point);
                        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
                        point.id = letter; // Agrega el nombre del punto
                        point.setData("t", proportion);
                        this.scene.points.add(point); // Agrega el punto al grupo
                        // Establece la bandera para indicar que se ha creado un punto
                    }
                }
                // Itera a través de los segmentos y encuentra la más cercana
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
                    if (NearDistanceSegment < 15 && this.pointscreated == this.scene.points.getChildren().length && 0 < proportion && proportion < 1) {
                        const point = this.scene.add
                            .sprite(this.coordenates.x, this.coordenates.y, "point", 0)
                            .setOrigin(0.5, 0.58);
                        this.textContainer = this.scene.add.text(point.x, point.y - 26, "", {
                            fill: "#000000",
                        });
                        // Asigna el segmento al punto
                        point.segment = nearsegment;
                        point.circle = null;
                        nearsegment.innerpoint.push(point);
                        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
                        point.id = letter; // Agrega el nombre del punto
                        point.setData("t", proportion);
                        this.scene.points.add(point); // Agrega el punto al grupo
                        // Establece la bandera para indicar que se ha creado un punto
                    }
                }
                // Itera a través de los círculos y encuentra el más cercano
                for (let i = 0; i < this.scene.circles.length; i++) {
                    let circle = this.scene.circles[i];
                    let pointcircle = this.getNearestPointOnCircle(circle, this.pointer);
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
                    // Si la distancia es menor a 15 píxeles, crea el punto en el punto más cercano en la línea
                    if (NearDistanceCircle < 15 && this.pointscreated == this.scene.points.getChildren().length) {
                        const point = this.scene.add
                            .sprite(pointcircle.x, pointcircle.y, "point", 0)
                            .setOrigin(0.5, 0.58);
                        this.textContainer = this.scene.add.text(point.x, point.y - 26, "", {
                            fill: "#000000",
                        });
                        // Asigna el segmento al punto
                        point.circle = nearcircle;
                        point.segment = null;
                        nearcircle.innerpoint.push(point);
                        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
                        point.id = letter; // Agrega el nombre del punto
                        point.setData("t", nearpoint.t);
                        this.scene.points.add(point); // Agrega el punto al grupo
                        // Establece la bandera para indicar que se ha creado un punto
                    }
                }
            }
        });
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

                        if (segment !== null) {
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
                        if (circle !== null) {
                            let np = this.getNearestPointOnCircle(circle, pointer)
                            point.x = np.x;
                            point.y = np.y;
                            point.setData("t", np.t); // Actualiza la propiedad 't'
                        }
                    }
                });
                if (point.intersection == true) {
                    let nearDistance = Number.MAX_VALUE
                    let ip = this.findIntersections(point.objects);
                    let newIntersection = null;
                    for (let k = 0; k < ip.length; k++) {
                        let distance = Phaser.Math.Distance.Between(point.x, point.y, ip[k].x, ip[k].y);
                        if (distance < nearDistance) {
                            nearDistance = distance;
                            newIntersection = ip[k];
                        };
                    };
                    point.x = newIntersection.x;
                    point.y = newIntersection.y;
                };
            }
        }
    }

}
