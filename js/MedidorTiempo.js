// import barraContenedor from '../assets/energycontainer.png';
// import barra from ('../assets/energybar.png');

class MedidorTiempo extends Phaser.GameObjects.Container {
  constructor(scene, parent = null, name, gameOptions) {
      super(scene);
      if (parent) parent.add(this);
      this.scene = scene;
      this.name = name;
      this.gameOptions = gameOptions;
      this.create();
  }

  preload(){
    this.load.image('barraContenedor', '../assets/energycontainer.png');
    this.load.image('barra', '../assets/energybar.png');
  }
  create() {
    this.timeLeft = this.gameOptions.initialTime;
    console.log(gameOptions);

    // the energy container. A simple sprite
    let energyContainer = this.scene.add.sprite(0, 0, 'barraContenedor');

    // the energy bar. Another simple sprite
    this.energyBar = this.scene.add.sprite(energyContainer.x + 46, energyContainer.y, 'barra');

    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    this.energyMask = this.scene.add.sprite(this.energyBar.x, this.energyBar.y, "barra");

    // ...it's not visible...
    this.energyMask.visible = false;

    // and we assign it as energyBar's mask.
    this.energyBar.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.energyMask);

    // a boring timer.
    this.gameTimer = this.scene.time.addEvent({
        delay: 1000,
        callback: function(){
            this.timeLeft --;

            // dividing enery bar width by the number of seconds gives us the amount
            // of pixels we need to move the energy bar each second
            let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;

            // moving the mask
            this.energyMask.x -= stepWidth;
            if(this.timeLeft == 0){
                console.log('FIN');
            }
        },
        callbackScope: this,
        loop: true
    });
    this.add(this.energyBar);
  }
  update() {
  }

}
