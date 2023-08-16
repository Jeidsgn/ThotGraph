export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group();
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" });
      this.isClicking = false;
      this.elementalpointer = { x: 0, y: 0 };
      this.interactivePoints = [];
  
      this.scene.input.on("pointerdown", (pointer) => {
        this.isClicking = true;
        this.elementalpointer = { x: pointer.x, y: pointer.y };
      });
  
      this.scene.input.on("pointerup", () => {
        this.isClicking = false;
      });
  
      this.scene.input.on("pointermove", (pointer) => {
        this.movePoint(pointer.x, pointer.y);
      });
    }
  
    addName() {
      this.scene.elementNames.push("Point");
    }
  
    createPoint() {
      if (this.isClicking) {
        const x = this.elementalpointer.x;
        const y = this.elementalpointer.y;
        const point = this.scene.add.graphics();
        point.fillStyle(0xff0000);
        point.fillCircle(x, y, 5);
        this.points.add(point);
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " ";
  
        this.interactivePoints.push({
          circle: point,
          isHovered: false
        });
  
        this.isClicking = false;
      }
    }
  
    movePoint(x, y) {
      for (const interactivePoint of this.interactivePoints) {
        const circle = interactivePoint.circle;
        const distance = Phaser.Math.Distance.Between(x, y, circle.x, circle.y);
  
        if (distance <= 5) {
          if (!interactivePoint.isHovered) {
            interactivePoint.isHovered = true;
            circle.clear();
            circle.fillStyle(0x00ff00);
            circle.fillCircle(circle.x, circle.y, 5);
          }
        } else {
          if (interactivePoint.isHovered) {
            interactivePoint.isHovered = false;
            circle.clear();
            circle.fillStyle(0xff0000);
            circle.fillCircle(circle.x, circle.y, 5);
          }
        }
      }
    }
  }
  