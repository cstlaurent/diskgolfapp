import { nanoid } from 'nanoid'

const games = []

export function getGames() {
  return games
}
export function getGame(id) {
  const game = games.find((game) => id === game.id)
  console.log(game)
  return game
}

export function addGame(players, course, date) {
  const game = {
    id: nanoid(),
    players: players,
    course: course,
    date: date,
  }

  games.push(game)

  return game
}

export function editGame(idToEdit, playerName, courseName, date) {
  const editedGame = games.find((game) => idToEdit === game.id)
  editedGame.name = playerName
  editedGame.course = courseName
  editedGame.date = date
  return editedGame
}

export function deleteGame(id) {
  const gameIndex = games.findIndex((game) => id === game.id)

  games.splice(gameIndex, 1)
}
