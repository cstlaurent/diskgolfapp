// Require the framework and instantiate it
import fastify from 'fastify'
import cors from 'fastify-cors'
import playerRoutes from './web/players.mjs'
import courseRoutes from './web/courses.mjs'
import gamesRoutes from './web/games.mjs'
import playergameRoutes from './web/player_games.mjs'

import { init as initMongo } from './db/index.mjs'

const app = fastify({ logger: true })

app.register(cors)
app.register(playerRoutes)
app.register(courseRoutes)
app.register(gamesRoutes)
app.register(playergameRoutes)

// Run the server!
const start = async () => {
  try {
    await initMongo('mongodb://localhost:27017/dgapp')
    await app.listen(7778)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
