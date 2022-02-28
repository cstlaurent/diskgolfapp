import { ObjectId } from 'mongodb'
import { nanoid } from 'nanoid'
import { db } from './index.mjs'

const players = [
  // {
  //   id: '-JNsUyQ0E7Hiujjx5icG-',
  //   name: 'Mick',
  // },
  // {
  //   id: 'uYMqZXiFzbrkjhV-yWiO_',
  //   name: 'Carl',
  // },
  // {
  //   id: 'uYMqZXiFzbr-yWiO_',
  //   name: 'Gary',
  // },
]

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
  const editedPlayer = players.find((player) => idToEdit === player.id)
  if (editedPlayer === undefined) {
    return null
  }
  editedPlayer.name = playerName
  return playerName
}

export function deletePlayer(id) {
  db.collection('player').deleteOne({ _id: ObjectId(id) })
}
