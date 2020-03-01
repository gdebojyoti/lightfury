import openSocket from 'socket.io'

class Socket {
  static initialize (server) {
    this.io = openSocket(server)

    this.addEvents()
  }

  static addEvents () {
    this.io.on('connection', this.onConnect.bind(this))
  }

  static onConnect (socket) {
    console.log('a user connected', socket)
    socket.on('disconnect', function () {
      console.log('user disconnected')
    })
  }
}

export default Socket
