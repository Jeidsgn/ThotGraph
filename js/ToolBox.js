import { Element } from "../elements/Elements.js";

export class ToolBox {
  constructor(scene) {
    this.scene = scene;
    this.elements = new Element(scene);
    this.scene.toolboxButtons = []; // Inicializa el array para almacenar los botones del cuadro de herramientas
    this.scene.activeButton = null; // Referencia al botón activo en el cuadro de herramientas
    this.scene.elementNames = []; // Array para almacenar los nombres de los elementos.
    this.buttonToFunction = this.scene.buttonToFunction;
  }

  // Crea los botones en el cuadro de herramientas
  createToolbox() {
    // Crea los botones base y los botones dependientes (según elementos en elements/)
    this.createBaseButtons();
    this.createDependentButtons();
  }

  createBaseButtons() {
    const center = (this.scene.cameras.main.width)/2;
    const moveButton = this.scene.add
      .sprite(center, this.scene.cameras.main.height - 180, 'Mover')
      .setInteractive()
      .on("pointerdown", () => {
        this.elements.buttonToFunction("Mover")
        moveButton.setFrame(3)      })
      .on("pointerover", () => {
        button.setFrame(1)}      );


    moveButton.setData('text',"Mover");
    this.scene.toolboxButtons.push(moveButton);
    this.scene.add.text(10, 550, "Mover", { fill: "#0000"});
  }
  
  createDependentButtons() {
    const activate = false;
    for (let i = 0; i < this.scene.elementNames.length; i++) {
      const center = (this.scene.cameras.main.width)/2;
      const button = this.scene.add      
        .sprite(center - (this.scene.elementNames.length - 1) * 90 / 2 + i * 90, this.scene.cameras.main.height - 90 , this.scene.elementNames[i])
        .setInteractive()
        .on("pointerdown", () => {
          this.elements.buttonToFunction(this.scene.elementNames[i])
          button.setFrame(2)
          activate = true;
        } )
        .on("pointerover", () => {
        button.setFrame(1)}      )
        .on("pointerout",() =>{
          if (activate==true){
            button.setFrame(3)
          } else { 
            button.setFrame(0)
          }
        })
      button.setData('text',this.scene.elementNames[i]);
      this.scene.toolboxButtons.push(button);
      this.scene.add.text(100 + i * 100, 550, this.scene.elementNames[i], {fill:"#0000"});
    }
  }
}
