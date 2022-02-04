import { getPlayerGames, saveGame } from '../db/player_games.mjs'

function playerGamesRoutes(app, options, done) {
  // Get games
  app.get('/playergames', async (request, reply) => {
    return { playergames: getPlayerGames() }
  })
  done()

  app.post('/game/:id/score', async (request, reply) => {
    if (!request.body) {
      reply.statusCode = 400
      return 'Bad Data'
    }
    const playerId = request.body.playerId
    const hole = request.body.hole
    const playerScore = request.body.score
    const gameId = request.body.gameId

    const savedGame = saveGame(playerId, hole, playerScore, gameId)
    return { savedGame: savedGame }
  })
}
export default playerGamesRoutes
