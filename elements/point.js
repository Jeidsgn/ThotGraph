export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group();
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" });
      this.letterIndex = 0; // Inicializamos el índice para las letras
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
        this.createPoint();
      });
    }
  
    addName() {
      this.scene.elementNames.push("Point");
    }
  
    createPoint() {
      if (this.elementalpointer) {
        const x = this.elementalpointer.x || 0;
        const y = this.elementalpointer.y || 0;
        const point = this.scene.add.graphics();
        point.fillStyle(0xff0000);
        point.fillCircle(x, y, 5);
        this.points.add(point);
  
        const letter = String.fromCharCode(65 + this.letterIndex);
        this.letterIndex++;
        this.textContainer.text += letter + " ";
      }
    }
  
    movePoint() {
      // Implement your point moving logic here
    }
  }
  