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
export function getPlayer(id) {
  const player = players.find((player) => id === player.id)

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

export async function deletePlayer(id) {
  console.log('IDIDIDID', id)
  let foundP = await db.collection('player').deleteOne({ _id: id })
  return foundP
}
