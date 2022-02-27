import {
  addPlayer,
  getPlayers,
  getPlayer,
  deletePlayer,
  editPlayer,
} from '../db/players.mjs'

function playerRoutes(app, options, done) {
  // Get players

  app.get('/players', async (request, reply) => {
    return { players: await getPlayers() }
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

  // Edit specific player
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

    if (editedPlayer === null) {
      reply.statusCode = 404
      return 'Bad Data'
    }

    return { editedPlayer: editedPlayer }
  })

  // Delete specific player
  app.delete('/player/:id', async (request, reply) => {
    // Receive Id as url params

    const requestedID = request.params.id
    deletePlayer(requestedID)
    return 'player deleted'
  })

  done()
}

export default playerRoutes
