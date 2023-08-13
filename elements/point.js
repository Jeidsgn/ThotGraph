class Point extends BaseElement {
    constructor(scene) {
        this.scene = scene;
        this.points = scene.add.group();
        this.isDrawingEnabled = false;
        this.textContainer = scene.add.text(10, 10, '', { fill: '#ffffff' });
        this.waitingForClick = true;

        // Agregar botón para activar/desactivar el dibujo
        const toggleButton = scene.add.text(10, 550, 'Activar Dibujo', { fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', this.toggleDrawing.bind(this));

        // Configurar la función de clic en el contenedor
        scene.input.on('pointerdown', this.handlePointerDown.bind(this));
    }

    // Métodos específicos de puntos
        toggleDrawing() {
        isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
        waitingForClick = true;  // Cambiar a false después del primer clic
        // Cambiar el texto del botón según el estado del dibujo
        this.children.list[1].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
      }
      
      handlePointerDown(pointer) {
        if (isDrawingEnabled && waitingForClick) {
          waitingForClick = false;  // Cambiar a false después del primer clic
        } else if (isDrawingEnabled && !waitingForClick) {
          createPoint.call(this, pointer);  // Crear el círculo sin esperar después del primer clic
        }
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

