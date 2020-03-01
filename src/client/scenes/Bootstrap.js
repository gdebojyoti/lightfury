import Phaser from 'phaser'

class BootstrapScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Bootstrap' })
  }

  preload () {
    console.log('preloading...')
  }

  create () {
    console.log('creating...')
  }
}

export default BootstrapScene
