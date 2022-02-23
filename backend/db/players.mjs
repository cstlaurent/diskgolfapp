import { nanoid } from 'nanoid'
import { db } from './index.mjs'

const players = [
  {
    id: '-JNsUyQ0E7Hiujjx5icG-',
    name: 'Mick',
  },
  {
    id: 'uYMqZXiFzbrkjhV-yWiO_',
    name: 'Carl',
  },
  {
    id: 'uYMqZXiFzbr-yWiO_',
    name: 'Gary',
  },
]

export async function getPlayers() {
  const mongoPlayers = await db.collection('player').find().toArray()
  console.log(mongoPlayers)
  return mongoPlayers
}
export function getPlayer(id) {
  const player = players.find((player) => id === player.id)
  console.log(player)
  return player
}

export function addPlayer(playerName) {
  const player = {
    id: nanoid(),
    name: playerName,
  }

  players.push(player)

  return player
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
  const playerIndex = players.findIndex((player) => id === player.id)

  players.splice(playerIndex, 1)
}
