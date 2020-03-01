import openSocket from 'socket.io-client'

// TODO: make url dynamic
const remoteUrl = 'http://localhost:8082'

class Socket {
  static initialize () {
    this.socket = openSocket(remoteUrl)
    this.assignMethods()
  }

  static assignMethods () {
    this.socket.on('connect', () => {
      console.log('I got in!', this.socket)
    })
  }
}

export default Socket
