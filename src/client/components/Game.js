import Phaser from 'phaser'

import BootstrapScene from '../scenes/Bootstrap'

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 980
      },
      debug: true
    }
  },
  scene: [BootstrapScene],
  title: 'Project Lightfury',
  backgroundColor: '#06C6F8',
  transparent: true,
  disableContextMenu: true
}

class Game {
  static initialize () {
    (() => new Phaser.Game(config))()
  }
}

export default Game
