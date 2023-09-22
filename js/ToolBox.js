import { Element } from "../elements/Elements.js";

export class ToolBox {
  constructor(scene) {
    this.scene = scene;
    this.elements = new Element(scene);
    this.scene.elementNames = []; // Array para almacenar los nombres de los elementos.
  }

  // Crea los botones en el cuadro de herramientas
  createToolbox() {
    // Crea los botones base y los botones dependientes (según elementos en elements/)
    this.createBaseButtons();
    this.createDependentButtons();
    this.scene.input.on("pointerup", () => {
      this.elements.buttonToFunction()
      for (const button of this.scene.toolboxButtons) {
      if(this.scene.activatebutton==button.data.values.text){
        this.scene.callbackfunction = this.elements.buttonToFunction(button.data.values.text)
        button.setFrame(3);
      }else{
        button.setFrame(0);
      }}
    })
  }

  createBaseButtons() {
    const center = (this.scene.cameras.main.width)/2;
    const moveButton = this.scene.add
      .sprite(center-60, this.scene.cameras.main.height - 180, 'Move')
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.callbackfunction = this.elements.buttonToFunction("Move")
        moveButton.setFrame(2)
        this.scene.activatebutton = "Move"})
      .on("pointerover", () => {
        moveButton.setFrame(1)})
      .on("pointerout",() =>{
          if (this.scene.activatebutton =="Move"){
            moveButton.setFrame(3)
          } else { 
            moveButton.setFrame(0)
          }});
    moveButton.setData('text',"Move");
    this.scene.toolboxButtons.push(moveButton);
    
    const destroyButton = this.scene.add
    .sprite(center+60, this.scene.cameras.main.height - 180, 'Destroy')
    .setInteractive()
    .on("pointerdown", () => {
      this.scene.callbackfunction = this.elements.buttonToFunction("Destroy")
      destroyButton.setFrame(2)
      this.scene.activatebutton = "Destroy"})
    .on("pointerover", () => {
      destroyButton.setFrame(1)})
    .on("pointerout",() =>{
        if (this.scene.activatebutton =="Destroy"){
          destroyButton.setFrame(3)
        } else { 
          destroyButton.setFrame(0)
        }});
  destroyButton.setData('text',"Destroy");
  this.scene.toolboxButtons.push(destroyButton);
  }
  
  createDependentButtons() {
    for (let i = 0; i < this.scene.elementNames.length; i++) {
      const center = (this.scene.cameras.main.width)/2;
      const button = this.scene.add      
        .sprite(center - (this.scene.elementNames.length - 1) * 90 / 2 + i * 90, this.scene.cameras.main.height - 90 , this.scene.elementNames[i])
        .setInteractive()
        .on("pointerdown", () => {
          this.scene.callbackfunction = this.elements.buttonToFunction(this.scene.elementNames[i])
          button.setFrame(2)
          this.scene.activatebutton = this.scene.elementNames[i];
        } )
        .on("pointerover", () => {
        button.setFrame(1)}      )
        .on("pointerout",() =>{
          if (this.scene.activatebutton ==this.scene.elementNames[i]){
            button.setFrame(3)
          } else { 
            button.setFrame(0)
          }})

      button.setData('text',this.scene.elementNames[i]);
      this.scene.toolboxButtons.push(button);
    }
  }
}
