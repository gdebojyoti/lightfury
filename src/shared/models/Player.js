// model of Player

class Player {
  constructor (name) {
    this.name = name
    this.id = new Date().getTime()
    this.team = 0 // TODO: team which player belongs to; use Team model

    this.position = {
      x: null,
      y: null
    }
    this.isJumping = false
    this.isAttacking = false
    this.isFlipped = false // when true, player faces right
  }

  // public methods

  fetchDetails () {
    return {
      name: this.name,
      id: this.id
    }
  }
}

export default Player
