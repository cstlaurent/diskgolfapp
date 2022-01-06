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
  {
    id: 'uYMqZXiFzbrkjhV-yWiO_',
    name: 'Garry',
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
  return playerName
}

export function deletePlayer(id) {
  const playerIndex = players.findIndex((player) => id === player.id)

  players.splice(playerIndex, 1)
}

//Courses database_____________________________________________________________________________________________________________
const courses = [
  {
    id: '-JNsUyQ0E7Hiujjx5',
    name: 'terrebonne',
  },
  {
    id: 'uYMqZXiFzbrkjh',
    name: 'mirabel',
  },
  {
    id: 'uYMqZXiFzb',
    name: 'ile Charron',
  },
]

export function getCourses() {
  return courses
}
export function getCourse(id) {
  const course = courses.find((course) => id === course.id)
  console.log(course)
  return course
}

export function addCourse(courseName) {
  const course = {
    id: nanoid(),
    name: courseName,
  }

  courses.push(course)

  return course
}

export function editCourse(idToEdit, courseName) {
  const editedCourse = courses.find((course) => idToEdit === course.id)
  editedCourse.name = courseName
  return courseName
}

export function deleteCourse(id) {
  const courseIndex = courses.findIndex((course) => id === course.id)

  courses.splice(courseIndex, 1)
}

// GAME DATABASE??????_______________________________________________________________________________________________________
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
