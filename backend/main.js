// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { players: [
      'Carl',
      'Mick',
      'Gary',
      'Andrea',
      'Shanna',
      'Ghislaine'
  ] }
})

fastify.get('/hello', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.register(require('fastify-cors'), { 
    
  })

// Run the server!
const start = async () => {
  try {
    await fastify.listen(7778)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()