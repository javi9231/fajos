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

let platforms, jump, fajoE, graphics, scoreText, score = 200,
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

  console.log('window.innerWidth ' + window.innerWidth +
    ' window.devicePixelRatio ' + window.devicePixelRatio +
    ' window.innerWidth * window.devicePixelRatio ' + window.innerWidth * window.devicePixelRatio);


  platforms = this.physics.add.staticGroup();
  platforms.create(0, window.innerHeight * window.devicePixelRatio, 'ground')
    .setScale(4).refreshBody();


  textoTamanio = 35;
  rectW = 200;
  rectH = 200;
  posRectX = rectW / 2;
  posRectY = rectH / 2 + textoTamanio;

  preguntaText = this.add.text(30, 65, preguntas[0].pregunta, {
    fontSize: '40px',
    fill: '#000',
    align: 'center',
    wordWrap: {
      width: totalWidth * window.devicePixelRatio
    }
  });

  respuesta(this, 100, preguntas[0].respuestas[0].respuesta, 0xffff00);
  respuesta(this, 100 + 250, preguntas[0].respuestas[1].respuesta, 0xff0000);

  cursors = this.input.keyboard.createCursorKeys();

  graphics = this.add.graphics();

  scoreText = this.add.text(16, 16, 'score: ' + score, {
    fontSize: '32px',
    fill: '#000'
  });

  // respuestas = this.
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

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Puntuación: ' + score);
  if (stars.countActive(true) === 0) {
    stars.children.iterate(child => {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  }
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
    console.log('posicion texto respuesta: ' + (rectW / 2 - (respuesta.length + 2) * 32/ 2));
    let respuestaText = scene.add.text(rectW / 2 - 20, 0, respuesta, {
      fontSize: '32px',
      fill: '#000',
      align: 'center',
      wordWrap: {
        width: totalWidth
      }
    });
    let rect = scene.add.rectangle(posRectX, posRectY, rectW, rectH).setStrokeStyle(2, rectColor);
    var container = scene.add.container(containerX, totalHeight /2, [respuestaText, rect]);
  }
