export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
      this.isClicking = false; // Variable para controlar si se está haciendo clic
  
      // Configura el evento de clic en la escena para capturar el puntero
      this.scene.input.on("pointerdown", (pointer) => {
        this.isClicking = true; // Se está haciendo clic
        this.elementalpointer = pointer;
      });
  
      // Configura el evento de liberación del clic para controlar cuando se deja de hacer clic
      this.scene.input.on("pointerup", () => {
        this.isClicking = false; // No se está haciendo clic
      });
    }
  
    addName() {
      this.scene.elementNames.push("Point"); // Agrega el nombre "Point" al array de nombres de elementos en la escena
    }
  
    createPoint() {
        if (this.isClicking) {
      const x = this.elementalpointer.x || 0;
      const y = this.elementalpointer.y || 0;
      const point = this.scene.add.graphics();
      point.fillStyle(0xff0000);
      point.fillCircle(x, y, 5);
      this.points.add(point); // Añade el punto al grupo
  
      const letter = String.fromCharCode(65 + this.points.getLength() - 1);
      this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
        } else {
            return;
        }
    }
  
    movePoint() {
      // Implementa la lógica para mover los puntos interactivamente
    }
  }
  