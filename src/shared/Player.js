class Player {
  constructor (name) {
    this.name = name
    this.id = new Date().getTime()
  }

  fetchDetails () {
    return {
      name: this.name,
      id: this.id
    }
  }
}

export default Player
