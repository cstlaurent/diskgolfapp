// Require the framework and instantiate it
import fastify from 'fastify'
import cors from 'fastify-cors'

import {
  addPlayer,
  getPlayers,
  getPlayer,
  deletePlayer,
  editPlayer,
} from './db.mjs'

const app = fastify({ logger: true })

// Get players
app.get('/players', async (request, reply) => {
  return { players: getPlayers() }
})

// Get specific players
app.get('/player/:id', async (request, reply) => {
  const requestedID = request.params.id
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

// Edit specific player-----------------------------------------------------------------------------------------------------
app.put('/player/:id', async (request, reply) => {
  // Receive Id as url params
  const requestedID = request.params.id
  // Receive body: {name: "Player Name"}
  if (!request.body.name) {
    reply.statusCode = 400
    return 'Bad Data'
  }
  const playerName = request.body.name
  const editedPlayer = editPlayer(requestedID, playerName)

  return { editedPlayer: editedPlayer }
})
//--------------------------------------------------------------------------------------------------------------------------
// Delete specific player
app.delete('/player/:id', async (request, reply) => {
  // Receive Id as url params
  const requestedID = request.params.id
  deletePlayer(requestedID)
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

// parse.int()  A VOIR. MODIFIE STRING EN NUM
