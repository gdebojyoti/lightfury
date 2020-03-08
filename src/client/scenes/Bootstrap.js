import Phaser from 'phaser'

import Socket from '../utilities/Socket'
import Messenger from '../utilities/Messenger'
import Player from '../prefabs/Player'
import { getSearchParam } from '../utilities'

import ground from '../assets/ground.png'

class BootstrapScene extends Phaser.Scene {
  constructor () {
    super({ key: 'bootstrap' })
  }

  preload () {
    this.loadImages()
    this.subscribeToMessages()
  }

  create () {
    console.log('creating game.. setting up socket connection..')
    Socket.initialize()

    // keyboard listeners
    this.cursors = this.input.keyboard.createCursorKeys()

    // ground
    const ground = this.physics.add.staticGroup()
    ground.add(this.add.tileSprite(128, 384, 768, 128, 'ground').setOrigin(0, 0))

    // test player
    this.initPlayer({
      staticProps: ground
    })
  }

  update () {
    this.player.update({ cursors: this.cursors })
  }

  // images to be loaded during preload phase
  loadImages () {
    this.load.image('ground', ground)
  }

  initPlayer ({ staticProps, passiveProps }) {
    this.player = new Player({
      scene: this,
      config: {
        name: 'Boogyman',
        position: { x: 80, y: 100 },
        scale: 0.25
      },
      staticProps,
      passiveProps,
      isActivePlayer: true
    })
  }

  subscribeToMessages () {
    const messages = ['INITIALIZE_PLAYER', 'MOVE_PLAYER']
    messages.forEach(message => { Messenger.subscribe(message, data => this.listenToMessages(message, data)) })
  }

  listenToMessages (message, data) {
    switch (message) {
      case 'INITIALIZE_PLAYER': {
        console.log('init player', getSearchParam('name'))
        break
      }
      case 'MOVE_PLAYER': {
        console.log('move player', data)
        this.player.updatePosition(data)
        break
      }
    }
  }

  // public methods
}

export default BootstrapScene
