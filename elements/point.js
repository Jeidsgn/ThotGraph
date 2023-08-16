export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
      this.selectedPoint = null; // Punto seleccionado para mover
      this.movePointActive = false; // Bandera para indicar si la función movePoint está activa
  
      // Configura el evento de clic en la escena para capturar el puntero
      this.scene.input.on("pointerdown", (pointer) => {
        if (this.movePointActive) {
          // Verifica si movePoint está activa y selecciona el punto si corresponde
          this.selectPoint(pointer);
        }
      });
  
      // Configura el evento de movimiento del puntero
      this.scene.input.on("pointermove", (pointer) => {
        if (this.movePointActive && this.selectedPoint) {
          // Verifica si movePoint está activa y un punto está seleccionado para mover
          this.moveSelectedPoint(pointer);
        } else if (!this.movePointActive) {
          // Si movePoint no está activa, cambia el color del punto al pasar el cursor por encima
          this.highlightPointOnHover(pointer);
        }
      });
    }
  
    addName() {
      this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }
  
    createPoint() {
        if (this.elementalpointer) {
          const x = this.elementalpointer.x || 0;
          const y = this.elementalpointer.y || 0;
          
          const point = this.scene.add.graphics();
          point.fillStyle(0xff0000);
          point.fillCircle(x, y, 5);
          this.points.add(point); // Añade el punto al grupo
      
          const letter = String.fromCharCode(65 + this.points.getChildren().length - 1);
          this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
        }
      }
      
  
    movePoint() {
      this.movePointActive = !this.movePointActive; // Alterna el estado de la función movePoint
      if (!this.movePointActive && this.selectedPoint) {
        // Si se desactiva movePoint y hay un punto seleccionado, lo deselecciona
        this.selectedPoint.clearTint();
        this.selectedPoint = null;
      }
    }
  
    selectPoint(pointer) {
      // Encuentra el punto más cercano al puntero y lo selecciona
      const closestPoint = this.getClosestPoint(pointer.x, pointer.y);
      if (closestPoint) {
        if (this.selectedPoint) {
          this.selectedPoint.clearTint(); // Limpia el tinte del punto previamente seleccionado
        }
        this.selectedPoint = closestPoint;
        this.selectedPoint.setTint(0x00ff00); // Aplica un tinte verde al punto seleccionado
      }
    }
  
    moveSelectedPoint(pointer) {
      if (this.selectedPoint) {
        this.selectedPoint.x = pointer.x;
        this.selectedPoint.y = pointer.y;
      }
    }
  
    highlightPointOnHover(pointer) {
      // Cambia el color del punto al pasar el cursor por encima
      const hoveredPoint = this.getClosestPoint(pointer.x, pointer.y);
      this.points.getChildren().forEach(point => {
        if (point === hoveredPoint) {
          point.setTint(0xffff00); // Aplica un tinte amarillo al punto sobre el cual está el cursor
        } else {
          point.clearTint(); // Limpia el tinte de otros puntos
        }
      });
    }
  
    getClosestPoint(x, y) {
      let closestPoint = null;
      let closestDistance = Number.MAX_VALUE;
  
      this.points.getChildren().forEach(point => {
        const distance = Phaser.Math.Distance.Between(x, y, point.x, point.y);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPoint = point;
        }
      });
  
      return closestPoint;
    }
  }
  