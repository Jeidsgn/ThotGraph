export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group();
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" });
  
      this.isPointerDown = false;
  
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
        this.isPointerDown = true;
      });
  
      this.scene.input.on("pointerup", () => {
        this.isPointerDown = false;
      });
    }
  
    addName() {
      this.scene.elementNames.push("Point");
    }
  
    createPoint() {
      if (this.isPointerDown && this.elementalpointer) {
        const x = this.elementalpointer.x || 0;
        const y = this.elementalpointer.y || 0;
        const point = this.scene.add.graphics();
        point.fillStyle(0xff0000);
        point.fillCircle(x, y, 5);
        this.points.add(point);
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " ";
      }
    }
  
    movePoint() {
      // Implement your point moving logic here
    }
  }
  