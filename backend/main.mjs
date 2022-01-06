// Require the framework and instantiate it
import fastify from 'fastify'
import cors from 'fastify-cors'

import {
  addPlayer,
  getPlayers,
  getPlayer,
  deletePlayer,
  editPlayer,
  getCourses,
  getCourse,
  addCourse,
  editCourse,
  deleteCourse,
  getGames,
  getGame,
  addGame,
  editGame,
  deleteGame,
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
  return 'player deleted'
})

//___________________________________________________________________________________________________________________________
// Courses
// Get courses
app.get('/courses', async (request, reply) => {
  return { courses: getCourses() }
})

//Get specific course________________________________________________________________________________________________________

app.get('/course/:id', async (request, reply) => {
  const requestedID = request.params.id
  let requestedCourse = getCourse(requestedID)
  return requestedCourse
})

// Add new course_____________________________________________________________________________________________________________
app.post('/course', async (request, reply) => {
  if (!request.body.name) {
    reply.statusCode = 400
    return 'Bad Data'
  }
  const courseName = request.body.name
  const newCourse = addCourse(courseName)
  return { newCourse: newCourse }
})
// Edit specific Course__________________________________________________________________________________________________
app.put('/course/:id', async (request, reply) => {
  // Receive Id as url params
  const requestedID = request.params.id
  // Receive body: {name: "Player Name"}
  if (!request.body.name) {
    reply.statusCode = 400
    return 'Bad Data'
  }
  const courseName = request.body.name
  const editedCourse = editCourse(requestedID, courseName)

  return { editedCourse: editedCourse }
})

// // Delete specific course____________________________________________________________________________________________
app.delete('/course/:id', async (request, reply) => {
  // Receive Id as url params
  const requestedID = request.params.id
  deleteCourse(requestedID)
  return 'course deleted'
})

// GAMES_________________________________________________________________________________________________________________
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
