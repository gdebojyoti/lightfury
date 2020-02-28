import express from 'express'
import Player from '../shared/Player'

const app = express()
const port = 8082

app.use('/', (req, res) => {
  console.log('req received...')
  res.send('no app defined')
})

app.listen(port, () => {
  console.log(`Server started on PORT ${port}`)
})

const player = new Player('server-player')
console.log('player details', player.fetchDetails())
