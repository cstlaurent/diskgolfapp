import { nanoid } from 'nanoid'

// Player database
const players = []

export function getPlayers() {
  return players
}

export function addPlayer(playerName) {
  const player = {
    id: nanoid,
    name: playerName,
  }

  players.push(player)

  return player
}

export function editPlayer(id, playerName) {
  // TODO
}

export function deletePlayer(id) {
  // TODO
}
