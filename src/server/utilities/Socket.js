import openSocket from 'socket.io'

import Messenger from './Messenger'

class Socket {
  static initialize (server) {
    this.io = openSocket(server, { pingInterval: 1000 })

    this.subscribeToMessages()
    this.addEvents()
  }

  static addEvents () {
    this.io.on('connection', this.onConnect.bind(this))
  }

  static onConnect (socket) {
    console.log('a user connected', socket.id)
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('PLAYER_INPUT', (data) => {
      console.log('player input received', data)

      Messenger.publish('MSG_PLAYER_INPUT', data)
    })
  }

  static subscribeToMessages () {
    const messages = ['MOVE_PLAYER']
    messages.forEach(message => { Messenger.subscribe(message, data => this.listenToMessages(message, data)) })
  }

  static listenToMessages (message, data) {
    switch (message) {
      // ask client to move player
      case 'MOVE_PLAYER': {
        console.log('moving player according to calculated data', data)

        // send to all clients
        this.io.emit('MOVE_PLAYER', data)
        break
      }
    }
  }
}

export default Socket
