
export class Point {
    constructor(scene) {
      this.scene = scene;
      // Crea un grupo para almacenar los puntos en la escena
      this.points = scene.add.group();
      // Crea un contenedor de texto para mostrar las letras asociadas a los puntos
      this.textContainer = scene.add.text(10, 10, '', { fill: '#ffffff' });
    } 
  
    // Agrega el nombre "Point" al array de nombres de elementos en la escena
    addName(){
      this.scene.elementNames.push('Point');
    }
  
    // Crea un nuevo punto en las coordenadas del puntero (si se proporciona)
    createPoint(pointer) {
      if (pointer) {
        // Obtiene las coordenadas x e y del puntero, o establece valores predeterminados en caso de que no se proporcionen
        const x = pointer.x || 0;
        const y = pointer.y || 0;
    
        // Crea un gráfico para representar el punto y lo añade al grupo de puntos en la escena
        const point = this.scene.add.graphics();
        point.fillStyle(0xff0000); // Color rojo
        point.fillCircle(x, y, 5); // Dibuja un círculo en las coordenadas del puntero
        this.points.add(point);
    
        // Calcula la letra asociada al punto en función de la cantidad de puntos en el grupo y la agrega al contenedor de texto
        const letter = String.fromCharCode(65 + this.points.getLength() - 1);
        this.textContainer.text += letter + ' ';
      }
    }
}
