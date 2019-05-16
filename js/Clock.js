import barraContenedor from ('../assets/energycontainer.png');
import barra from ('../assets/energybar.png');
require ('../assets/energybar.png');

class Clock extends Phaser.GameObjects.Container {
    let gameOptions = {
      initialTime: 60
    }
    constructor(scene, x, y, children) {
       super(scene, x, y, children);
       // ...
       scene.add.existing(this);
   }
   preload(){
        this.load.image("energycontainer", barraContenedor);
        this.load.image("energybar", barra);
    }
    create(){
        this.timeLeft = gameOptions.initialTime;

        // the energy container. A simple sprite
        let energyContainer = this.add.sprite(game.config.width / 2, game.config.height / 2, "energycontainer");

        // the energy bar. Another simple sprite
        let energyBar = this.add.sprite(energyContainer.x + 46, energyContainer.y, "energybar");

        // a copy of the energy bar to be used as a mask. Another simple sprite but...
        this.energyMask = this.add.sprite(energyBar.x, energyBar.y, "energybar");

        // ...it's not visible...
        this.energyMask.visible = false;

        // and we assign it as energyBar's mask.
        energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);

        // a boring timer.
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: function(){
                this.timeLeft --;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;

                // moving the mask
                this.energyMask.x -= stepWidth;
                if(this.timeLeft == 0){
                    this.scene.start("PlayGame")
                }
            },
            callbackScope: this,
            loop: true
        });
    }
};
export default Clock;
