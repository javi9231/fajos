// import fajoBilletes from "../assets/fajoE.svg";
// import MedidorTiempo from "../../js/object/MedidorTiempo.js";

class inicioScene extends Phaser.Scene {
  constructor() {
    super('Juego');
    this.score = 200;
    this.escala = window.devicePixelRatio;
    this.totalWidth = window.innerWidth * this.escala;
    this.totalHeight= window.innerHeight * this.escala;
  }
  preload(){
    this.load.image('fajoE', "./assets/fajoE.svg");
  }
  create() {
    this.cameras.main.setBackgroundColor(0xbababa);

      this.medidorView = this.add.container();
      this.medidorTiempo = new MedidorTiempo(this, this.medidorView,
        'MedidorTiempo', gameOptions);

      this.fontSize = 18 * this.escala;
      let preguntaText = this.add.text(40, 20,
        cuestionario[0].preguntas[0].pregunta, {
        fontSize: this.fontSize, //'40px',
        fill: '#000',
        align: 'center',
        wordWrap: {
          width: this.totalWidth - this.fontSize
        }
      });

      this.posicionRect = {
        escala : this.escala,
        fontSize: 18 * this.escala,
        posX: 50 * this.escala,
        posY: this.totalHeight / 4,
        posXfajos: (100 + this.fontSize) * this.escala
      }
      this.gameView = this.add.container();
      this.res1 = new Respuesta(this, this.gameView, this.posicionRect, cuestionario[0].preguntas[0].respuestas[0]);// this, this.posicionRect.posX, this.posicionRect.posY, null, cuestionario[0].preguntas[0].respuestas[0], 0xffff00);
      // this.respuesta(this, this.posicionRect.posX, cuestionario[0].preguntas[0].respuestas[0], 0xffff00);
      // this.respuesta(this, this.posicionRect.posX + this.posicionRect.posXdesplazado, cuestionario[0].preguntas[0].respuestas[1], 0xff0000);
      this.posicionRect.posX += (100 + this.fontSize) * this.escala;
      this.res2 = new Respuesta(this, this.gameView, this.posicionRect, cuestionario[0].preguntas[0].respuestas[1]);// this, this.posicionRect.posX, this.posicionRect.posY, null, cuestionario[0].preguntas[0].respuestas[0], 0xffff00);
      this.posicionRect.posX += (100 + this.fontSize) * this.escala;
      this.res3 = new Respuesta(this, this.gameView, this.posicionRect, cuestionario[0].preguntas[0].respuestas[2]);// this, this.posicionRect.posX, this.posicionRect.posY, null, cuestionario[0].preguntas[0].respuestas[0], 0xffff00);

      this.graphics = this.add.graphics();

      this.scoreText = this.add.text(this.totalWidth - 150 * this.escala,
        this.totalHeight - 50 * this.escala, 'score: ' + this.score, {
          fontSize: this.fontSize,
          fill: '#000'
        });

      this.fajosEuros = this.physics.add.group({
        key: 'fajoE',
        repeat: (this.score / 20) - 1,
        setXY: {
          x: this.totalWidth - this.posicionRect.posXfajos,
          y: this.posicionRect.posY - 100
        }
      });

      this.fajosEuros.children.iterate(fajo => {
        fajo.setInteractive({
          draggable: true
        });
        fajo.setScale(this.escala / 2);
        fajo.on('drag', function(pointer, dragX, dragY) {
          this.x = dragX;
          this.y = dragY;
        });
      });

  }
  colorearFajos(scene, zonaX, zonaY, rW, rH, color) {
    let within = scene.physics.overlapRect(zonaX, zonaY, rW, rH, true, true);
    within.forEach(function(body) {
      body.gameObject.setTint(color); //.destroy();
    });
  }


  checkOriention(orientation) {
    if (orientation === Phaser.Scale.PORTRAIT) {
      graphics.alpha = 0.2;
      console.log('PORTRAIT');
      //text.setVisible(true);
    } else if (orientation === Phaser.Scale.LANDSCAPE) {
      graphics.alpha = 1;
      console.log('LANDSCAPE');
      //text.setVisible(false);
    }
  }

  respuesta(scene, containerX, respuesta, rectColor){
    this.rectW = this.rectH = 100 * this.escala;

    this.posRectX = this.rectW / 2;
    this.posRectY = this.rectH / 2;

    let posXrespuestaTxt = (this.posRectX - respuesta.length * 32 /
      respuesta.length )/ this.escala - 25;

    let posYrespuestaTxt =  this.posRectY * 2 + this.fontSize;

    let respuestaText = scene.add.text(posXrespuestaTxt, posYrespuestaTxt, respuesta, {
      fontSize: this.fontSize,
      fill: '#000',
      align: 'center',
      wordWrap: {
        width: this.rectW
      }
    });
    let rect = scene.add.rectangle(this.posRectX, this.posRectY, this.rectW, this.rectH).setStrokeStyle(10, rectColor);
    var container = scene.add.container(containerX, this.posicionRect.posY, [respuestaText, rect]);
  }

  update(){
    this.fajosEuros.children.iterate(fajo => {
      fajo.clearTint(); //(0xffffff);
    });

    this.colorearFajos(this, this.posicionRect.posX, this.posicionRect.posY, this.rectW, this.rectH, 0xffff00);
    this.colorearFajos(this, this.posicionRect.posX + this.posicionRect.posXdesplazado, this.posicionRect.posY, this.rectW, this.rectH, 0xff0000);
  }
}
