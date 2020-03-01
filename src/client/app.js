import Player from '../shared/Player'
import Socket from './utilities/Socket'
import Game from './components/Game'

const player = new Player('client-player')
console.log('client player details', player.fetchDetails())

window.onload = () => {
  console.log('loaded..')
  Socket.initialize()
  Game.initialize()
}
