// import fajoBilletes from "../assets/fajoE.svg";
// import MedidorTiempo from "../../js/object/MedidorTiempo.js";

class FinalRespuesta extends Phaser.Scene {
  constructor() {
    super('FinalRespuesta');
    this.escala = window.devicePixelRatio;
    this.totalWidth = window.innerWidth * this.escala;
    this.totalHeight = window.innerHeight * this.escala;
    this.fontSize = 32 * this.escala;
  }

  init(datos) {
    this.score = datos.score || 'falta score';
    this.pregunta = datos.pregunta || 'falta pregunta';
    this.nivelJuego = datos.nivelJuego;

    console.log('datos: ');
    console.log(datos);
    console.log('Score: ' + this.score);
  }

  preload() {
    this.inicializarScene();
    this.load.image('fajoE', "./assets/fajoE.svg");
  }

  inicializarScene() {
    if (this.preguntaText) {
      this.preguntaText.setText(this.pregunta.pregunta + ' score: ' + this.score);
    } else {
      this.preguntaText = this.add.text(40, this.totalHeight / 4,
        this.pregunta.respuestas[this.pregunta.respuestaCorrecta] + '\n Puntos: ' + this.score, {
          fontSize: this.fontSize,
          fill: '#000',
          align: 'center',
          wordWrap: {
            width: this.totalWidth - this.fontSize
          }
        });
    }
    this.colores = juegoConfig.colores.slice();
  }

  create() {

    this.scale.on('orientationchange', function(orientation) {
      if (orientation === Phaser.Scale.PORTRAIT) {
        console.log('PORTRAIT');
      } else if (orientation === Phaser.Scale.LANDSCAPE) {
        console.log('LANDSCAPE');
      }
    });

    this.cameras.main.setBackgroundColor(0xbababa);
    this.tamanioRespuestaW = this.totalWidth / this.numeroRespuestas;
    this.tamanioRespuestaH = this.totalHeight / 4;

    this.posicionRect = {
      posX: 0,
      posY: this.totalHeight / 4,
      rectW: this.tamanioRespuestaW,
      rectH: this.tamanioRespuestaH,
      escala: this.escala,
      fontSize: 18 * this.escala,
      posXfajos: (100 + this.fontSize) * this.escala,
      color: 0xff0000
    }

    this.gameView = this.add.container();
    this.timer = new reloj(this, this.gameView, 'reloj');
    this.timer.countdown(juegoConfig.tiempoMuestraResultado);

    this.eventos = this.sys.events;
    this.eventos.on('countdown', () => {
      this.timer.abort();
      this.timeIsOver();
    });
  }

  timeIsOver() {
    console.log('Tiempo finalizado!!');
    if (this.score > 0) {
      this.add.displayList.removeAll();
      this.scene.start('dosScene', {
        score: this.score
      });
    } else {
      console.log('Sin money 1');
    }
  }

  pasaScene() {
    if (this.score > 0) {
      switch (this.nivelJuego) {
        case 1:
          // this.add.displayList.removeAll();
          this.scene.start('dosScene', {
            score: this.score
          });
          break;
        case 2:
          //this.add.displayList.removeAll();
          this.scene.start('tresScene', {
            score: this.score
          });
          break;
        case 3:
          // this.add.displayList.removeAll();
          this.scene.start('cuatroScene', {
            score: this.score
          });
          break;
        case 4:
          // this.add.displayList.removeAll();
          this.scene.start('cincoScene', {
            score: this.score
          });
          break;

        default:
          break;
      }
      this.scene.restart();
    }
    console.log('Fin');
  }

  update() {

  }

}
