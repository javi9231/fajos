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
  maletin, escala, zone, fajosEuros;

let game = new Phaser.Game(config);

let totalWidth = window.innerWidth;// * window.devicePixelRatio;
let totalHeight= window.innerHeight;// * window.devicePixelRatio;
console.log('totalWidth: ' + totalWidth + ' totalHeight: ' + totalHeight);
console.log('totalWidth/2: ' + totalWidth/2 + ' totalHeight/2: ' + totalHeight/2);
function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('fajoE', 'assets/fajoE.svg');

  this.load.spritesheet('maletin', 'assets/mapa.png', {
    frameWidth: 400,
    frameHeight: 400
  });
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

  respuestaText = this.add.text(0, 0, preguntas[0].respuestas[0].respuesta, {
    fontSize: '32px',
    fill: '#000'
  });
  let textoTamanio = 35;
  let rectW = 200;
  let rectH = 200;
  let posRectX = rectW / 2;
  let posRectY = rectH / 2 + textoTamanio;

  rect = this.add.rectangle(posRectX, posRectY, rectW, rectH).setStrokeStyle(2, 0xffff00);
  var container = this.add.container(100, totalHeight /2, [respuestaText, rect]);

  cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: 'open',
    frames: this.anims.generateFrameNumbers('maletin', {
      start: 0,
      end: 8
    }),
    frameRate: 9,
    repeat: 1
  });

  graphics = this.add.graphics();

  scoreText = this.add.text(16, 16, 'score: ' + score, {
    fontSize: '32px',
    fill: '#000'
  });

  // respuestas = this.
  fajosEuros = this.physics.add.group({
    key: 'fajoE',
    repeat: (score / 10) - 1,
    setXY: {
      x: totalWidth/2,
      y: 100
    }
  });

  fajosEuros.children.iterate(fajo => {
    fajo.setInteractive({
      draggable: true
    });
    console.log("ratio: " + window.devicePixelRatio);
    // fajo.setScale(1 * window.devicePixelRatio + 1);
    fajo.setScale(escala);
    // fajo.setCollideWorldBounds(true);
    fajo.on('drag', function(pointer, dragX, dragY) {
      this.x = dragX;
      this.y = dragY;
    });
  });

  // this.physics.add.collider(fajosEuros, fajosEuros);
  this.physics.add.collider(fajosEuros, platforms);
  // this.physics.add.collider(fajosEuros, zone);

  // this.physics.add.collider(maletin, fajosEuros);
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
      fajo.setTint(0xffffff);
  });

  let within = this.physics.overlapRect(250, 200, 300, 200, true, true);

  within.forEach(function(body) {
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

  function respuesta(){
    let respuesta;
    let rectangulo;
  }
}
