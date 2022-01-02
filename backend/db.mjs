import { nanoid } from 'nanoid'

// Player database
const players = [
  {
    id: '-JNsUyQ0E7Hiujjx5icG-',
    name: 'Mick',
  },
  {
    id: 'uYMqZXiFzbrkjhV-yWiO_',
    name: 'Carl',
  },
]

export function getPlayers() {
  return players
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
  editedPlayer.name = playerName
}

export function deletePlayer(id) {
  const playerIndex = players.findIndex((player) => id === player.id)

  players.splice(playerIndex, 1)
}
