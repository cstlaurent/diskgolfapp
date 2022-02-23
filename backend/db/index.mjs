import mongodb from 'mongodb'

let mongo
export let db

export async function init(mongoDbUrl) {
  mongo = new mongodb.MongoClient(mongoDbUrl)
  await mongo.connect()

  db = mongo.db()
}
