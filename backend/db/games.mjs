import { ObjectId } from 'mongodb'
import { db } from './index.mjs'

export async function getGames() {
  const mongoGames = await db.collection('game').find().toArray()
  console.log(mongoGames)
  return mongoGames
}
export async function getGame(id) {
  const game = await db
    .collection('game')
    .find({ _id: ObjectId(id) })
    .toArray()
  console.log(game)
  return game[0]
  // COMMENT JE RETIRE LE [0] ????
}

export function addGame(players, course, date) {
  const game = {
    players: players,
    course: course,
    date: date,
  }

  db.collection('game').insertOne(game)
}

export function editGame(idToEdit, playerName, courseName, date) {
  const editedGame = games.find((game) => idToEdit === game.id)
  editedGame.name = playerName
  editedGame.course = courseName
  editedGame.date = date
  return editedGame
}

export function deleteGame(id) {
  db.collection('game').deleteOne({ _id: ObjectId(id) })
}
