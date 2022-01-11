// Require the framework and instantiate it
import fastify from 'fastify'
import cors from 'fastify-cors'
import playerRoutes from './web/players.mjs'
import courseRoutes from './web/courses.mjs'
const app = fastify({ logger: true })

app.register(cors)
app.register(playerRoutes)
app.register(courseRoutes)

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
