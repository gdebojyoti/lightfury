// model of Match

const states = {
  PREMATCH: 1,
  LIVE: 2,
  PAUSE: 3, // some kind of server-triggered event which cause match to pause
  COMPLETED: 4
}

class Match {
  constructor () {
    this.id = 31291 // TODO: temporary ID
    this.state = states.PREMATCH // current state of match
    this.players = [] // details of players in current match
    this.host = 0 // id of host player
    this.map = 0 // id of current map
  }

  // public methods

  start () {
    this.state = states.LIVE
  }

  finish () {
    this.state = states.COMPLETED
  }
}

export default Match
