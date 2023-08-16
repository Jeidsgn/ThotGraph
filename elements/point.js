export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = [];
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" });
      this.movePointActive = false;
  
      this.scene.input.on("pointerdown", (pointer) => {
        this.elementalpointer = pointer;
        if (this.movePointActive) {
          this.selectPointToMove(pointer);
        }
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
        point.setInteractive({ useHandCursor: this.movePointActive });
  
        this.points.push({
          graphics: point,
          x: x,
          y: y,
        });
  
        const letter = String.fromCharCode(65 + this.points.length - 1);
        this.textContainer.text += letter + " ";
      }
    }
  
    movePoint() {
      this.movePointActive = !this.movePointActive;
      this.points.forEach(point => {
        point.graphics.setInteractive({ useHandCursor: this.movePointActive });
        point.graphics.on("pointerover", () => {
          if (this.movePointActive) {
            point.graphics.fillColor = 0x00ff00;
          }
        });
        point.graphics.on("pointerout", () => {
          if (this.movePointActive) {
            point.graphics.fillColor = 0xff0000;
          }
        });
      });
    }
  
    selectPointToMove(pointer) {
      const pointToMove = this.points.find(point => {
        const bounds = point.graphics.getBounds();
        return bounds.contains(pointer.x, pointer.y);
      });
  
      if (pointToMove) {
        this.selectedPoint = pointToMove;
        this.scene.input.on("pointermove", this.moveSelectedPoint, this);
        this.scene.input.once("pointerup", () => {
          this.scene.input.off("pointermove", this.moveSelectedPoint, this);
          this.selectedPoint = null;
        });
      }
    }
  
    moveSelectedPoint(pointer) {
      if (this.selectedPoint) {
        this.selectedPoint.graphics.x = pointer.x;
        this.selectedPoint.graphics.y = pointer.y;
      }
    }
  }
  