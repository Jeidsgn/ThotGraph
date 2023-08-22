export class Animations {

    vibration() {
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
    reduction() {
        //cuerda vibrante
        if (reductionparabole==true) {
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
