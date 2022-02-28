import { ObjectId } from 'mongodb'

import { db } from './index.mjs'

export async function getPlayers() {
  const mongoPlayers = await db.collection('player').find().toArray()
  console.log(mongoPlayers)
  return mongoPlayers
}
export async function getPlayer(id) {
  const player = await db
    .collection('player')
    .find({ _id: ObjectId(id) })
    .toArray()
  console.log(player)
  return player
}

export function addPlayer(playerName) {
  const player = {
    name: playerName,
  }

  db.collection('player').insertOne(player)
}

export function editPlayer(idToEdit, playerName) {
  db.collection('player').updateOne(
    { _id: ObjectId(idToEdit) },
    { $set: { name: playerName } }
  )
}

export function deletePlayer(id) {
  db.collection('player').deleteOne({ _id: ObjectId(id) })
}
