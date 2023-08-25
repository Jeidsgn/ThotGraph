export class Point {
    constructor(scene) {
        this.scene = scene;
        this.count = 1;
        this.scene.pointdraggable = [];
        this.scene.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
         // Contenedor de texto para las letras de los puntos
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

    createPoint() {
        if (this.isClicking) {
            const letter = this.count;
            this.count = this.count + 1;
            // Crea la imagen del punto en las coordenadas del clic
            const point = this.scene.add.sprite(this.pointer.x, this.pointer.y, 'point', 0).setOrigin(0.5, 0.80);
            this.textContainer = this.scene.add.text(point.x, point.y-26, "", { fill: "#000000" });
            this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
            point.id = letter; // Agrega el nombre del punto
            point.setData('vector', (this.pointer.x, this.pointer.y));
            point.setInteractive({ 
                hitArea: new Phaser.Geom.Rectangle(
                28,
                60,
                point.width + 28 * 2,
                point.height + 60 * 2 ),
            //Check hitarea
            hitAreaCallback: function(hitArea, x, y){
                return Phaser.Geom.Rectangle.Contains(hitArea, x, y);
            }});
           
            this.scene.points.add(point); // Agrega el punto al grupo
            this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
            
        }
    }

}
