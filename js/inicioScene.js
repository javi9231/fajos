// import fajoBilletes from "../assets/fajoE.svg";
// import MedidorTiempo from "../../js/object/MedidorTiempo.js";

class inicioScene extends Phaser.Scene {
  constructor() {
    super('Juego');
    this.score = 200;
    this.escala = window.devicePixelRatio;
    this.totalWidth = window.innerWidth * this.escala;
    this.totalHeight= window.innerHeight * this.escala;
    this.preguntas = cuestionario[0].preguntas.slice();
    this.pregunta = this.resultadoAleatorio(this.preguntas);
    this.colores = juegoConfig.colores;
    this.nivelJuego = 1;
    console.log(this.colores);
  }

  preload(){
    this.load.image('fajoE', "./assets/fajoE.svg");
  }

  create() {
    this.cameras.main.setBackgroundColor(0xbababa);

    // this.medidorView = this.add.container();
    // this.medidorTiempo = new MedidorTiempo(this, this.medidorView,
    //   'MedidorTiempo', gameOptions);

    this.fontSize = 18 * this.escala;
    let preguntaText = this.add.text(40, 20,
      this.pregunta.pregunta, {
        fontSize: this.fontSize, //'40px',
        fill: '#000',
        align: 'center',
        wordWrap: {
          width: this.totalWidth - this.fontSize
        }
      });

      this.posicionRect = {
        posX: 50 * this.escala,
        posY: this.totalHeight / 4,
        rectW: 100 * this.escala,
        rectH: 100 * this.escala,
        escala : this.escala,
        fontSize: 18 * this.escala,
        posXfajos: (100 + this.fontSize) * this.escala,
        color: 0xff0000
      }

      this.gameView = this.add.container();
      this.timer = new reloj(this, this.gameView, 'reloj');
      this.timer.countdown(60);

      this.eventos = this.sys.events;
      this.eventos.on('countdown', () => {
        console.log('countdown!!');
        this.timer.abort();
      });


      this.posicionesRespuestas = [];

      while(this.pregunta.respuestas.length > 0){
        this.posicionRect.color = this.resultadoAleatorio(this.colores);
        this.posicionesRespuestas.push(Object.assign({} , this.posicionRect));
        let respuesta = this.resultadoAleatorio(this.pregunta.respuestas);
        this.res1 = new Respuesta(this, this.gameView, this.posicionRect, respuesta, this.posicionRect.color);
        this.posicionRect.posX += (100 + this.fontSize) * this.escala;
      }
      console.log(this.posicionesRespuestas);

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

      /**
       * Devuelve un objeto del array
       * eliminando el objeto del array original
       */
      resultadoAleatorio(arrayDatos){
        let longArray = arrayDatos.length;
        if(longArray < 1)
          return null;
        let aleatorio = Math.floor(Math.random()* longArray);
        let seleccion = arrayDatos[aleatorio];
        arrayDatos.splice(aleatorio, 1);
        return seleccion;
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

      update(){
        this.fajosEuros.children.iterate(fajo => {
          fajo.clearTint(); //(0xffffff);
        });

        this.posicionesRespuestas.forEach( elemento => {
          this.colorearFajos(this, elemento.posX, elemento.posY,
            elemento.rectW, elemento.rectH, elemento.color);

        });
          // this.colorearFajos(this, this.posicionRect.posX + this.posicionRect.posXdesplazado,
          //   this.posicionRect.posY, this.posicionRect.rectW, this.posicionRect.rectH, 0xff0000);
      }
}
