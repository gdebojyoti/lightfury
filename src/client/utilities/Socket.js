import openSocket from 'socket.io-client'

import Messenger from './Messenger'

// TODO: make url dynamic
const remoteUrl = `http://${window.location.hostname}:8082`

const colors = ['red', 'blue', 'yellow']
let colorIndex = 0

class Socket {
  static initialize () {
    this.socket = openSocket(remoteUrl)
    this.assignMethods()
  }

  static assignMethods () {
    this.socket.on('connect', () => {
      console.log('I got in!', this.socket)

      this.socket.emit('CONNECTED', {
        username: 'deb'
      })
    })

    this.socket.on('TEST_VERIFIED', () => {
      colorIndex = colorIndex === colors.length - 1 ? 0 : colorIndex + 1
      document.body.style.background = colors[colorIndex]
    })

    this.socket.on('MOVE_PLAYER', (data) => {
      Messenger.publish('MOVE_PLAYER', data)
    })
  }

  static handleInput () {
    console.log('inputt')
    this.socket.emit('TEST', {
      dummy: false
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
