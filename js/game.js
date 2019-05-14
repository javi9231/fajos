let config = {
  type: Phaser.AUTO,
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  zoom: 1,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let graphics, score = 200, escala, fajosEuros, textoTamanio, rectW, rectH, posRectY;

let game = new Phaser.Game(config);

let totalWidth = window.innerWidth;
let totalHeight= window.innerHeight;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('fajoE', 'assets/fajoE.svg');
}

function create() {
  this.cameras.main.setBackgroundColor(0xbababa);
  escala = window.devicePixelRatio;

  preguntaText = this.add.text(40, 20, preguntas[0].pregunta, {
    fontSize: '40px',
    fill: '#000',
    align: 'center',
    wordWrap: {
      width: totalWidth * window.devicePixelRatio
    }
  });

  respuesta(this, 100, preguntas[0].respuestas[0].respuesta, 0xffff00);
  respuesta(this, 100 + 250, preguntas[3].respuestas[0].respuesta, 0xff0000);

  cursors = this.input.keyboard.createCursorKeys();

  graphics = this.add.graphics();

  scoreText = this.add.text((totalWidth - 250)*window.devicePixelRatio,
  (totalHeight - 50)*window.devicePixelRatio, 'score: ' + score, {
    fontSize: '32px',
    fill: '#000'
  });

  fajosEuros = this.physics.add.group({
    key: 'fajoE',
    repeat: (score / 20) - 1,
    setXY: {
      x: totalWidth/20,
      y: 400
    }
  });

  fajosEuros.children.iterate(fajo => {
    fajo.setInteractive({
      draggable: true
    });
    fajo.setScale(window.devicePixelRatio/2);
    fajo.on('drag', function(pointer, dragX, dragY) {
      this.x = dragX;
      this.y = dragY;
    });
  });
}
function pintarFajos (scene, zonaX, zonaY, rW, rH, color){
  let within = scene.physics.overlapRect(zonaX, zonaY, rW, rH, true, true);
  within.forEach(function(body) {
    body.gameObject.setTint(color);//.destroy();
  });
}

function update() {

  fajosEuros.children.iterate(fajo => {
      fajo.clearTint();//(0xffffff);
  });

  pintarFajos(this, 100, totalHeight /2 + totalHeight/4 + textoTamanio, rectW, rectH, 0xffff00);
  pintarFajos(this, 100 + 250, totalHeight /2 + totalHeight/4+ textoTamanio, rectW, rectH, 0xff0000);
}

function checkOriention(orientation) {
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

  function respuesta(scene, containerX, respuesta, rectColor){
    textoTamanio = 35;
    rectW = 200;
    rectH = 200;
    posRectX = rectW / 2;
    posRectY = rectH / 2 + textoTamanio;
    console.log('posicion texto respuesta: ' + (posRectX - respuesta.length * 32 / 2));
    let posXrespuestaTxt =  (posRectX - respuesta.length * 32 /
      (respuesta.length ))/ window.devicePixelRatio;
    let posYrespuestaTxt = respuesta.length > 10? -100 : -20;

    console.log(totalWidth * totalHeight /100000);
    let respuestaText = scene.add.text(posXrespuestaTxt, posYrespuestaTxt, respuesta, {
      fontSize: '32px',
      fill: '#000',
      align: 'center',
      wordWrap: {
        width: rectW
      }
    });
    let rect = scene.add.rectangle(posRectX, posRectY, rectW, rectH).setStrokeStyle(4, rectColor);
    var container = scene.add.container(containerX, totalHeight /2 + totalHeight/4, [respuestaText, rect]);
  }
