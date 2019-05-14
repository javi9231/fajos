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
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let platforms, jump, fajoE, graphics, scoreText, score = 2000,
  maletin, escala, zone, fajosEuros, textoTamanio, rectW, rectH, posRectX, posRectY, respuestaText;

let game = new Phaser.Game(config);

let totalWidth = window.innerWidth;// * window.devicePixelRatio;
let totalHeight= window.innerHeight;// * window.devicePixelRatio;
console.log('totalWidth: ' + totalWidth + ' totalHeight: ' + totalHeight);
console.log('totalWidth/2: ' + totalWidth/2 + ' totalHeight/2: ' + totalHeight/2);


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
    console.log("ratio: " + window.devicePixelRatio);
    // fajo.setScale(1 * window.devicePixelRatio + 1);
    fajo.setScale(window.devicePixelRatio/2);
    // fajo.setCollideWorldBounds(true);
    fajo.on('drag', function(pointer, dragX, dragY) {
      this.x = dragX;
      this.y = dragY;
    });
  });

  this.physics.add.collider(fajosEuros, platforms);
}

function update() {

  fajosEuros.children.iterate(fajo => {
      fajo.clearTint();//(0xffffff);
  });

  let within = this.physics.overlapRect(100, totalHeight /2 + textoTamanio, rectW, rectH, true, true);
  let within2 = this.physics.overlapRect(100 + 250, totalHeight /2 + textoTamanio, rectW, rectH, true, true);

  within.forEach(function(body) {
    body.gameObject.setTint(0xffff00);//.destroy();
  });
  within2.forEach(function(body) {
    body.gameObject.setTint(0xff0000);//.destroy();
  });


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
    let respuestaText = scene.add.text((posRectX - respuesta.length * 32 / (respuesta.length - 1))/ window.devicePixelRatio, -100 / window.devicePixelRatio , respuesta, {
      fontSize: '32px',
      fill: '#000',
      align: 'center',
      wordWrap: {
        width: 32*5* window.devicePixelRatio
      }
    });
    let rect = scene.add.rectangle(posRectX, posRectY, rectW, rectH).setStrokeStyle(2, rectColor);
    var container = scene.add.container(containerX, totalHeight /2, [respuestaText, rect]);
  }
