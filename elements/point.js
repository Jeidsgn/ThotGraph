export class Point {
    constructor(scene) {
      this.scene = scene;
      this.points = scene.add.group(); // Grupo para almacenar los puntos en la escena
      this.textContainer = scene.add.text(10, 10, "", { fill: "#ffffff" }); // Contenedor de texto para las letras de los puntos
      this.isClicking = false; // Variable para controlar si se está haciendo clic
      this.elementalpointer = { x: 0, y: 0 }; // Almacena la posición del puntero
  
      // Configura el evento de clic en la escena para capturar el puntero
      this.scene.input.on("pointerdown", (pointer) => {
        this.isClicking = true; // Se está haciendo clic
        this.elementalpointer = { x: pointer.x, y: pointer.y }; // Almacena la posición del puntero
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
        const x = this.elementalpointer.x;
        const y = this.elementalpointer.y;
        const point = this.scene.add.graphics();
        point.fillStyle(0xff0000);
        point.fillCircle(x, y, 5);
        this.points.add(point); // Añade el punto al grupo
  
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + " "; // Agrega la letra asociada al punto al contenedor de texto
        this.isClicking = false; // Desactiva el clic para evitar creación continua en el mismo clic
      }
    }
  
    movePoint(x, y) { //aquí va la lógica del movimiento
      console.log("movepoint") //verificación
    }
  }