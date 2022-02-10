import {
  getPlayerGames,
  getPlayerGame,
  saveGame,
  getSpecificScore,
} from '../db/player_games.mjs'

function playerGamesRoutes(app, options, done) {
  // Get games
  app.get('/playergames', async (request, reply) => {
    return { playergames: getPlayerGames() }
  })

  //get specific games
  app.get('/playergames/:id', async (request, reply) => {
    const requestedID = request.params.id
    let requestedPlayerGame = getPlayerGame(requestedID)
    return requestedPlayerGame
  })

  app.post('/playergames/:id/score', async (request, reply) => {
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
  // get specific score (game/player/hole)
  app.get(
    '/playergames/:gameid/:playerid/:hole/score',
    async (request, reply) => {
      const ScoreParams = {
        playerId: request.params.playerid,
        hole: request.params.hole,
        gameId: request.params.gameid,
      }
      let requestedScore = getSpecificScore(ScoreParams)

      return requestedScore
    }
  )

  done()
}
export default playerGamesRoutes
