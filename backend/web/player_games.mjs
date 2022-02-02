import { getPlayerGames } from '../db/player_games.mjs'

function playerGamesRoutes(app, options, done) {
  // Get games
  app.get('/playergames', async (request, reply) => {
    return { playergames: getPlayerGames() }
  })
  done()
}
export default playerGamesRoutes
