import { Element } from "../elements/Elements.js";

export class ToolBox {
  constructor(scene) {
    this.scene = scene;
    this.elements = new Element(scene);
    this.scene.toolboxButtons = []; // Inicializa el array para almacenar los botones del cuadro de herramientas
    this.scene.activeButton = null; // Referencia al botón activo en el cuadro de herramientas
    this.scene.elementNames = []; // Array para almacenar los nombres de los elementos.
    this.buttonToFunction = this.scene.buttonToFunction;
    this.activatebutton=null;
  }

  // Crea los botones en el cuadro de herramientas
  createToolbox() {
    // Crea los botones base y los botones dependientes (según elementos en elements/)
    this.createBaseButtons();
    this.createDependentButtons();
    this.scene.input.on("pointerup", () => {
      this.elements.buttonToFunction()
      for (const button of this.scene.toolboxButton) {
      if(this.activatebutton==button.data.values.text){
        this.elements.buttonToFunction(button.data.values.text)
        button.setFrame(3);
      }else{
        button.setFrame(0);
      }}
    })
  }

  createBaseButtons() {
    const center = (this.scene.cameras.main.width)/2;
    const moveButton = this.scene.add
      .sprite(center, this.scene.cameras.main.height - 180, 'Mover')
      .setInteractive()
      .on("pointerdown", () => {
        this.elements.buttonToFunction("Mover")
        moveButton.setFrame(3)
        this.activatebutton = "Mover"})
      .on("pointerover", () => {
        moveButton.setFrame(1)})
      .on("pointerout",() =>{
          if (this.activatebutton =="Mover"){
            moveButton.setFrame(3)
          } else { 
            moveButton.setFrame(0)
          }});
    moveButton.setData('text',"Mover");
    this.scene.toolboxButtons.push(moveButton);
  }
  
  createDependentButtons() {
    for (let i = 0; i < this.scene.elementNames.length; i++) {
      const center = (this.scene.cameras.main.width)/2;
      const button = this.scene.add      
        .sprite(center - (this.scene.elementNames.length - 1) * 90 / 2 + i * 90, this.scene.cameras.main.height - 90 , this.scene.elementNames[i])
        .setInteractive()
        .on("pointerdown", () => {
          this.elements.buttonToFunction(this.scene.elementNames[i])
          button.setFrame(2)
          this.activatebutton = this.scene.elementNames[i];
        } )
        .on("pointerover", () => {
        button.setFrame(1)}      )
        .on("pointerout",() =>{
          if (this.activatebutton ==this.scene.elementNames[i]){
            button.setFrame(3)
          } else { 
            button.setFrame(0)
          }})

      button.setData('text',this.scene.elementNames[i]);
      this.scene.toolboxButtons.push(button);
    }
  }
}
