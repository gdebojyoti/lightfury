import Player from '../shared/models/Player'
import Game from './components/Game'

const player = new Player('client-player')
console.log('client player details', player.fetchDetails())

window.onload = () => {
  console.log('loaded..')
  Game.initialize()
}
