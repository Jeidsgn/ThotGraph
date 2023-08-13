import { Point } from "point.js";

class Element {
    constructor(scene) {
        this.scene = scene;
    }
    init() {
        this.scene.point = new Point(this.scene);
    }
    Names(){
        this.scene.point.addName();
    }
    createElement (){

    }
    // Puedes agregar métodos comunes a todos los elementos aquí
    // Por ejemplo, para manejar restricciones y dependencias de movimiento
}