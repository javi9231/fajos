class Respuesta extends Phaser.GameObjects.Container {
  constructor(scene, parent, posicionRect, respuesta = 'falta respuesta', rectColor=0xffff00) {
    super(scene, posicionRect.posX, posicionRect.posY);
    this.scene = scene;
    if (parent) {
      parent.add(this);
    }
    this.posX = posicionRect.posX;
    this.posY = posicionRect.posY;
    this.escala = posicionRect.escala;
    this.respuesta = respuesta;
    this.rectColor = rectColor;
    this.fontSize = 32;
    this.name = name;
    this.create();
  }
  //
  // this.posicionRect = {
  //   escala : this.escala,
  //   fontSize: 18 * this.escala,
  //   posX: 50 * this.escala,
  //   posY: this.totalHeight / 4,
  //   posXdesplazado: (100 + this.fontSize) * this.escala
  // }
  create () {
    this.rectW = this.rectH = 100 * this.escala;

    this.posRectX = this.rectW / 2;
    this.posRectY = this.rectH / 2;

    let posXrespuestaTxt = (this.posRectX - this.respuesta.length * 32 /
      this.respuesta.length )/ this.escala - 25;

    let posYrespuestaTxt =  this.posRectY * 2 + this.fontSize;

    const respuestaText = this.scene.add.text(posXrespuestaTxt, posYrespuestaTxt, this.respuesta, {
      fontSize: this.fontSize,
      fill: '#000',
      align: 'center',
      wordWrap: {
        width: this.rectW
      }
    });
    const rect = this.scene.add.rectangle(this.posRectX, this.posRectY, this.rectW, this.rectH).setStrokeStyle(10, this.rectColor);

    this.add(rect);
    this.add(respuestaText);
  }
}
