// Require the framework and instantiate it
import fastify from 'fastify'
import cors from 'fastify-cors'

import { addPlayer, getPlayers, getPlayer } from './db.mjs'

const app = fastify({ logger: true })

// Get players
app.get('/players', async (request, reply) => {
  return { players: getPlayers() }
})

// Get specific players
app.get('/player/:id', async (request, reply) => {
  // Receive Id as url params
  // TODO
  const requestedID = parseInt(request.params.id)
  let requestedPlayer = getPlayer(requestedID)
  return requestedPlayer
})

// Add new player
app.post('/player', async (request, reply) => {
  // Receive body: {name: "Player Name"}
  if (!request.body.name) {
    reply.statusCode = 400
    return 'Bad Data'
  }
  const playerName = request.body.name
  const newPlayer = addPlayer(playerName)
  return { newPlayer: newPlayer }
})

// Edit specific player
app.put('/player/:id', async (request, reply) => {
  // Receive Id as url params
  // Receive body: {name: "Player Name"}
  // TODO
  return ''
})

// Delete specific player
app.delete('/player/:id', async (request, reply) => {
  // Receive Id as url params
  // TODO
  return ''
})

app.register(cors)

// Run the server!
const start = async () => {
  try {
    await app.listen(7778)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
