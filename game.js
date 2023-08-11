function create() {
    circles = this.add.group();  // Crear un grupo para almacenar los círculos
    
    // Agregar un botón para activar/desactivar el dibujo
    const toggleButton = this.add.text(10, 10, 'Activar Dibujo', { fill: '#ffffff' })
      .setInteractive()
      .on('pointerdown', toggleDrawing.bind(this));
}
  
function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;  // Cambiar el estado del dibujo
  
    // Cambiar el texto del botón según el estado del dibujo
    this.children.list[0].setText(isDrawingEnabled ? 'Desactivar Dibujo' : 'Activar Dibujo');
  
    if (isDrawingEnabled) {
        this.input.on('pointerdown', createCircle, this); // Agregar el evento de clic en el contenedor
    } else {
        this.input.off('pointerdown', createCircle, this); // Remover el evento de clic en el contenedor
    }
}
  
function createCircle(pointer) {
    if (isDrawingEnabled) {
        const x = pointer.x;
        const y = pointer.y;
    
        const circle = this.add.circle(x, y, 20, 0xff0000);  // Usar this.add.circle
        circles.add(circle);  // Agregar el círculo al grupo
    
        // Aquí puedes realizar las verificaciones y lógica adicional para dibujar el círculo
    }
}
