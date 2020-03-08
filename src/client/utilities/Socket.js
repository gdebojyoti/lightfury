import openSocket from 'socket.io-client'

import Messenger from './Messenger'
import Ui from './Ui'

// TODO: make url dynamic
const remoteUrl = `http://${window.location.hostname}:8082`

class Socket {
  static initialize () {
    this.socket = openSocket(remoteUrl)
    this.initializeUi()
    this.assignMethods()
  }

  static initializeUi () {
    Ui.initialize()
  }

  static assignMethods () {
    this.socket.on('connect', () => {
      console.log('I got in!', this.socket)
      Messenger.publish('INITIALIZE_PLAYER')
    })

    this.socket.on('pong', latency => {
      Ui.updatePing(latency)
    })

    this.socket.on('MOVE_PLAYER', (data) => {
      Messenger.publish('MOVE_PLAYER', data)
    })
  }

  static onPlayerInput (directions) {
    console.log('directions', directions)
    this.socket.emit('PLAYER_INPUT', {
      directions
    })
  }
}

export default Socket
