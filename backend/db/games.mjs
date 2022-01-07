import { nanoid } from 'nanoid'

const games = [
  {
    id: 'DIQo93t3Z6Ml36jVj6qm-',
    player: 'JEAN GUY LE COQUIN',
    course: 'A LAVAL MAUDIT',
    date: '2022-01-26',
  },
  {
    id: 'DIQo93t3Z6Ml3j6qm-',
    player: 'JEAN ',
    course: 'joliette',
    date: '2022-03-26',
  },
  {
    id: '93t3Z6Ml36jVj6qm-',
    player: 'jesus',
    course: 'tremblant',
    date: '2022-01-24',
  },
]

export function getGames() {
  return games
}
export function getGame(id) {
  const game = games.find((game) => id === game.id)
  console.log(game)
  return game
}

export function addGame(playerName, courseName, date) {
  const game = {
    id: nanoid(),
    player: playerName,
    course: courseName,
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
