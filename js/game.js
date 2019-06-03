
window.onload = function() {
  let config = {
    type: Phaser.AUTO,
    zoom: 1,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "juego",
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio
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
    scene: [
      unoScene,
      dosScene,
      tresScene,
      cuatroScene,
      cincoScene,
      FinalRespuesta,
      FinalNoMoney,
      FinalGanador
    ]
  };
  window.focus();
  const game = new Phaser.Game(config);
}
