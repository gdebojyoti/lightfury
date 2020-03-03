import express from 'express'

import Socket from './utilities/Socket'
import Game from './components/Game'

const port = 8082

const server = express()
  .use('/', (req, res) => {
    console.log('req received...')
    res.send('no app defined')
  })
  .listen(port, () => {
    console.log(`Server started on PORT ${port}`)
  })

Socket.initialize(server)
Game.initialize()
