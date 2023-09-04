export class Point {
    constructor(scene) {
        this.scene = scene;
        this.count = 1;
        this.scene.pointdraggable = [];
        this.scene.draggingPoint = null;
        this.scene.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
        this.isClicking = false; // Variable para controlar si se está haciendo clic
        this.scene.input.on("pointerdown", () => {
            this.isClicking = true; // Se está haciendo clic
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
    getNearestPointOnSegment(pointX, pointY, segment) {
        const { x1, y1, x2, y2 } = segment;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const t = ((pointX - x1) * dx + (pointY - y1) * dy) / (dx * dx + dy * dy);
        
        const nearestX = Phaser.Math.Clamp(x1 + t * dx, Math.min(x1, x2), Math.max(x1, x2));
        const nearestY = Phaser.Math.Clamp(y1 + t * dy, Math.min(y1, y2), Math.max(y1, y2));
        
        return new Phaser.Math.Vector2(nearestX, nearestY);
    }
    
    createPoint() {
        if (this.isClicking) {
            const letter = this.count;
            this.count = this.count + 1;
            // Inicializa variables para rastrear la línea y el punto más cercano
            let nearsegment = null;
            let nearpoint = null;
            let neardistance = Number.MAX_VALUE;

            // Itera a través de las líneas y encuentra la más cercana
            for (let i = 0; i < this.scene.segments.length; i++) {
                let segment = this.scene.segments[i];
                let pointsegment = getNearestPointOnSegment(segment.p0, segment.p1, segment);
                let distance = Phaser.Math.Distance.Between(
                    segment.p0,
                    segment.p1,
                    pointsegment.x,
                    pointsegment.y
                );

                if (distance < neardistance) {
                    neardistance = distance;
                    nearsegment = segment;
                    nearpoint = pointsegment;
                }
            }

            // Si la distancia es menor a 15 píxeles, crea el punto en el punto más cercano en la línea
            if (neardistance < 15) {
                const point = this.scene.add
                    .sprite(nearpoint.x, nearpoint.y, "point", 0)
                    .setOrigin(0.5, 0.8);
                this.textContainer = this.scene.add.text(point.x, point.y - 26, "", {
                    fill: "#000000",
                });
                this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
                point.id = letter; // Agrega el nombre del punto
                point.setData("vector", { x: nearpoint.x, y: nearpoint.y });
                this.scene.points.add(point); // Agrega el punto al grupo
                this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
            }
        }
    }
    movePoint() {
        if (this.scene.activatebutton == "Move") {
            const interactive = this.scene.points.getChildren(); //
            for (const point of interactive) {
                point.setInteractive({ draggable: true });
                point.on("drag", (pointer, dragX, dragY) => {
                    if (this.scene.activatebutton == "Move") {
                        point.x = dragX;
                        point.y = dragY;
                    }
                });
            }
        }
    }
}
