import Phaser from 'phaser'

// import BootstrapScene from '../scenes/Bootstrap'

const config = {
  type: Phaser.HEADLESS,
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
  // scene: [BootstrapScene],
  scene: {
    preload: () => { console.log('server preload') },
    create: () => { console.log('server create') },
    update: () => { console.log('server update') }
  },
  title: 'Project Lightfury',
  backgroundColor: '#06C6F8',
  transparent: true,
  disableContextMenu: true
}

class Game {
  static initialize () {
    console.log('initializing server game');
    (() => new Phaser.Game(config))()
  }
}

export default Game
