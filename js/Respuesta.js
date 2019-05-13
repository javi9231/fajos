class Respuesta extends Phaser.GameObjects.Container {
  constructor(scene, x, y, respuesta) {
    super(scene, x, y);
    this.setPosition(x, y);
    this.respuesta;
  }
  
}
