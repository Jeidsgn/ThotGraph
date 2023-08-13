elementNames.push('Point'); // Agregar el nombre 'Point' al array de elementos

class Point extends BaseElement {
    constructor(scene) {
        this.scene = scene;
        this.points = scene.add.group();
        this.textContainer = scene.add.text(10, 10, '', { fill: '#ffffff' });
    }     
      createPoint(pointer) {
        if (pointer) {
          const x = pointer.x || 0;  // Si pointer.x no está definido, usa 0 como valor predeterminado
          const y = pointer.y || 0;  // Si pointer.y no está definido, usa 0 como valor predeterminado
      
          const point = this.add.graphics();
          point.fillStyle(0xff0000);  // Color del punto
          point.fillCircle(x, y, 5);  // Dibujar un punto con radio de 5 píxeles
          points.add(point);  // Agregar el punto al grupo
      
          const letter = String.fromCharCode(65 + points.getLength() - 1); // Convertir número en letra (A, B, C, ...)
          textContainer.text += letter + ' '; // Agregar la letra al contenedor de texto
        }
      }
}

