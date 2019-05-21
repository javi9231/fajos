class Respuesta extends Phaser.GameObjects.Container {
  constructor(scene, parent, children = null, respuesta = 'falta respuesta', rectColor=0xffff00) {
    super(scene);
    this.scene = scene;
    this.respuesta = respuesta;
    this.rectColor = rectColor;
    if (parent) {
      parent.add(this);
    }

    this.name = name;
    this.create();
    // scene.add.existing(this);
  }

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

    this.add(respuestaText);
    this.add(rect);
  }
}
