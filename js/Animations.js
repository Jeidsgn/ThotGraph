export class Animations {
    
    vibration() {
    if (this.isDrawingEnabled && !this.waitingForClick) {
    // Llama a la función activa correspondiente
    if (this.activeButtonCallback) {  // Comprobamos si la función está definida
      this.activeButtonCallback();  // Ejecutamos la función activa
    } else {
      console.log("Error en activeButtonCallback");
    }
  } else if (this.isDrawingEnabled && this.waitingForClick) {
    // Si el dibujo está habilitado y se espera un clic, marca que ya no se espera más
    this.input.on("pointerdown", () => {
      this.waitingForClick = false;
    });
  }
  //cuerda vibrante
  if (this.parabolic != null) {
    this.count += 0.15;
    let points = this.parabolic.getSpacedPoints(12);
    this.curvestyle.clear(); // Limpia el dibujo anterior
    this.curvestyle.lineStyle(5, 0x2AA4BF, 0.8); // Configura el estilo de línea
    this.path = new Phaser.Curves.Path(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      points[i].y += Math.cos(i * 2 + this.count);
      points[i].x += Math.cos(i * 2 + this.count);
      this.path.lineTo(points[i].x, points[i].y);
    };
    this.path.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    this.path.draw(this.curvestyle);
  };
  // Configura la función de clic en el contenedor (tablero)
  // Lógica de actualización común, si es necesario
};


}
