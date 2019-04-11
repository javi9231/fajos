let score = 200;
let scoreText;
let config = {
  type: Phaser.AUTO,
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  zoom: 1 / window.devicePixelRatio,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
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

let platforms;
let jump;
let fajoE;
let graphics;

let game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('fajoE', 'assets/fajoE.svg');
}

function create() {
  this.add.image(400, 300, 'sky');
  platforms = this.physics.add.staticGroup();

  platforms.create(0, window.innerHeight * window.devicePixelRatio, 'ground').setScale(4).refreshBody();

  // platforms.create(600, 400, 'ground');
  // platforms.create(50, 250, 'ground');
  // platforms.create(750, 220, 'ground');

  graphics = this.add.graphics();

  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  });

  let fajosEuros = this.physics.add.group({
    key: 'fajoE',
    repeat: (score / 10) - 1,
    setXY: {
      x: 300,
      y: 20
    }
  });
  // for (var i = 0; i < 10; i++) {
  //   fajosEuros.create(300 + Math.random() * 400, 120 + Math.random() * 200, 'fajoE').setScale(0.5);
  // }

  // Phaser.Actions.Call(fajosEuros.getChildren(), function(fajo) {
fajosEuros.children.iterate( (fajo) => {
    fajo.setInteractive({
      draggable: true
    });
    fajo.setScale(2);
    fajo.setCollideWorldBounds(true);
    fajo.on('drag', function(pointer, dragX, dragY) {
      this.x = dragX;
      this.y = dragY;
      console.log('Fajo pulsado');
    });
});
  // }, this);
  this.physics.add.collider(fajosEuros, fajosEuros);
  this.physics.add.collider(fajosEuros, platforms);
}

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Puntuación: ' + score);
  if (stars.countActive(true) === 0) {
    stars.children.iterate(function(child) {

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

  if (this.input.pointer1.isDown) {
    graphics.clear();
  }

}
