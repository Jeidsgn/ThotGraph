export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group();
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" });
    }
  
    addName() {
      this.scene.elementNames.push("Point");
    }
  
    createPoint() {
      this.scene.input.on("pointerdown", (pointer) => {
        const x = pointer.x || 0;
        const y = pointer.y || 0;
        const point = this.scene.add.graphics();
        point.fillStyle(0xff0000);
        point.fillCircle(x, y, 5);
        this.points.add(point);
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " ";
      });
    }
  
    movePoint() {
      // Implement your point moving logic here
    }
  }
  