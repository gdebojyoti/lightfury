import Phaser from 'phaser'

import Messenger from '../utilities/Messenger'

class BootstrapScene extends Phaser.Scene {
  constructor () {
    super({ key: 'bootstrap' })
  }

  preload () {
    console.log('preloading...')
  }

  create () {
    console.log('creating...')
    this.subscribeToMessages()
  }

  update () {
    console.log('updating...')
  }

  subscribeToMessages () {
    const messages = ['MSG_PLAYER_INPUT']
    messages.forEach(message => { Messenger.subscribe(message, data => this.listenToMessages(message, data)) })
  }

  listenToMessages (message, data) {
    switch (message) {
      case 'MSG_PLAYER_INPUT': {
        console.log('calculating player position', data)
        Messenger.publish('MOVE_PLAYER', data)
        break
      }
    }
  }
}

export default BootstrapScene
