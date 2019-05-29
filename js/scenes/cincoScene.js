class cincoScene extends Phaser.Scene {
  constructor(datos) {
    super('cincoScene');
    console.log(datos);
    this.score = 200;
    this.escala = window.devicePixelRatio;
    this.totalWidth = window.innerWidth * this.escala;
    this.totalHeight = window.innerHeight * this.escala;
    this.preguntas = cuestionario[0].preguntas.slice();
  }

  init(datos) {
    this.score = datos.score;
    console.log('datos: ');
    console.log(datos);
    console.log('Score: ' + this.score);
  }

  preload(datos) {
    console.log('preload:' + datos);

    this.inicializarScene();
    this.load.image('fajoE', "./assets/fajoE.svg");
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
    this.fontSize = 18 * this.escala;
    // this.muestraPregunta();
    if (!this.preguntaText) {
      this.preguntaText = this.add.text(40, 20,
        this.pregunta.pregunta + ' score: ' + this.score, {
          fontSize: this.fontSize, //'40px',
          fill: '#000',
          align: 'center',
          wordWrap: {
            width: this.totalWidth - this.fontSize
          }
        });
    }
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
    this.timer.countdown(juegoConfig.tiempoPregunta);

    this.eventos = this.sys.events;
    this.eventos.on('countdown', () => {
      this.timer.abort();
      this.timeIsOver();
    });
    this.eventos.on('resize', this.resize, this);

    this.posicionesRespuestas = [];

    this.pregunta.respuestas.forEach(respuesta => {
      if (respuesta != null) {
        this.posicionRect.color = this.resultadoAleatorio(this.colores);
        this.posicionesRespuestas.push(Object.assign({}, this.posicionRect));

        this.res1 = new Respuesta(this, this.gameView, this.posicionRect, respuesta, this.posicionRect.color);
        this.posicionRect.posX += (this.tamanioRespuestaW);
        console.log(this.posicionesRespuestas);
      } else {
        this.posicionesRespuestas.push(null);
      }
    });

    this.graphics = this.add.graphics();

    this.fajosEuros = this.physics.add.group({
      key: 'fajoE',
      repeat: (this.score / juegoConfig.valorFajo) - 1,
      setXY: {
        x: this.totalWidth - this.posicionRect.posXfajos,
        y: this.posicionRect.posY - 100
      }
    });

    this.fajosEuros.children.iterate(fajo => {
      fajo.setInteractive({
        draggable: true
      });
      fajo.setCollideWorldBounds(true);
      fajo.setScale(this.escala / 2);
      fajo.on('drag', function(pointer, dragX, dragY) {
        this.x = dragX;
        this.y = dragY;
      });
    });
    var canvas = this.sys.game.canvas;
  }

  inicializarScene() {
    this.pregunta = this.resultadoAleatorio(this.preguntas);
    if (this.preguntaText) {
      this.preguntaText.setText(this.pregunta.pregunta + ' score: ' + this.score);
    }

    this.comodin5050();

    this.colores = juegoConfig.colores.slice();
    this.nivelJuego = 5;
    this.numeroRespuestas = 2;
  }

  timeIsOver() {
    console.log('countdown!!');
    this.eliminarFajosMalColocados();
    this.scene.start('FinalRespuesta', {
      score: this.score,
      pregunta: this.pregunta,
      nivelJuego: this.nivelJuego
    });
  }

  eliminarFajosMalColocados() {
    for (let i = 0; i < 4; i++) {
      if (i != this.pregunta.respuestaCorrecta) {
        this.eliminarFajos(this, this.posicionesRespuestas[i]);
      } else {
        this.score = this.contarFajos() * juegoConfig.valorFajo;

      }
    }
  }

  resize() {
    let width = window.innerWidth * window.devicePixelRatio;
    let height = window.innerHeight * window.devicePixelRatio;
    this.cameras.main.setBounds(0, 0, width, height);
    console.log(width + ' ' + height);
  }

  contarFajos(scene, elemento) {
    let within = scene.physics.overlapRect(elemento.posX, elemento.posY,
      elemento.rectW, elemento.rectH, true, true);
    let contador = 0;
    within.forEach(function(body) {
      contador++;
    });
    return contador;
  }

  eliminarFajos(scene, elemento) {
    let within = scene.physics.overlapRect(elemento.posX, elemento.posY,
      elemento.rectW, elemento.rectH, true, true);
    within.forEach(function(body) {
      body.gameObject.destroy();
    });
  }

  colorearFajos(scene, elemento) {
    let within = scene.physics.overlapRect(elemento.posX, elemento.posY,
      elemento.rectW, elemento.rectH, true, true);
    within.forEach(function(body) {
      body.gameObject.setTint(elemento.color); //.destroy();
    });
  }

  /**
   * Devuelve un objeto del array
   * eliminando el objeto del array original
   */
  resultadoAleatorio(arrayDatos) {
    let longArray = arrayDatos.length;
    if (longArray < 1)
      return null;
    let aleatorio = Math.floor(Math.random() * longArray);
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

  comodin5050() {
    this.pregunta.comodines[1]._5050.sort().forEach(eliminar =>
      this.pregunta.respuestas.slice(eliminar, 1));
    console.log(this.pregunta);
  }

  update() {
    this.fajosEuros.children.iterate(fajo => {
      fajo.clearTint(); // es lo mismo pintar de blanco (0xffffff);
    });

    this.posicionesRespuestas.forEach(elemento => {
      this.colorearFajos(this, elemento);
    });
  }
}
