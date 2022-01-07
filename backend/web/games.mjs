import {
  getGames,
  getGame,
  addGame,
  editGame,
  deleteGame,
} from '../db/games.mjs'

// Get games
app.get('/games', async (request, reply) => {
  return { games: getGames() }
})

// Get specific game
app.get('/game/:id', async (request, reply) => {
  const requestedID = request.params.id
  let requestedGame = getGame(requestedID)
  return requestedGame
})

// Add new game
app.post('/game', async (request, reply) => {
  // Receive body: {name: "Player Name"}
  if (!request.body.course) {
    reply.statusCode = 400
    return 'Bad Data'
  }
  const playerName = request.body.player
  const courseName = request.body.course
  const date = request.body.date
  const newGame = addGame(playerName, courseName, date)
  return { newGame: newGame }
})

// Edit specific game-----------------------------------------------------------------------------------------------------
app.put('/game/:id', async (request, reply) => {
  // Receive Id as url params
  const requestedID = request.params.id
  // Receive body: {name: "Player Name"}
  if (!request.body.player || !request.body.date) {
    reply.statusCode = 400
    return 'Bad Data'
  }
  const playerName = request.body.name
  const courseName = request.body.course
  const date = request.body.date
  const editedGame = editGame(requestedID, playerName, courseName, date)

  return { editedGame: editedGame }
})
// //--------------------------------------------------------------------------------------------------------------------------
// // Delete specific game
app.delete('/game/:id', async (request, reply) => {
  // Receive Id as url params
  const requestedID = request.params.id
  deleteGame(requestedID)
  return 'game deleted'
})
