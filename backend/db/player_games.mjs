import { ObjectId } from 'mongodb'
import { db } from './index.mjs'
const playerGames = [
  // {
  //   gameId: '9uD4mOkk-pTo9HqrDagz-',
  //   hole: 1,
  //   score: 0,
  //   playerId: '-JNsUyQ0E7Hiujjx5icG-',
  // },
  // {
  //   gameId: 'gjvgjh',
  //   hole: 2,
  //   score: 2,
  //   playerId: 'fghk',
  // },
]

export async function getPlayerGames() {
  const mongoPlayerGames = await db.collection('playergames').find().toArray()
  console.log(mongoPlayerGames)
}

export function getPlayerGame(pgid) {
  let pgArray = []

  for (let game of playerGames) {
    if (game.gameId === pgid) {
      pgArray.push(game)
    }
  }
  return pgArray
}

export async function saveGame(playerId, hole, score, gameId) {
  let found = false
  const savedGame = {
    gameId: gameId,
    playerId: playerId,
    hole: hole,
    score: score,
  }
  let test = await db
    .collection('playergames')
    .find({ gameId: gameId, playerId: playerId, hole: hole })
    .toArray()
  console.log('test ====', test)

  if (found === false) {
    db.collection('playergames').insertOne(savedGame)
  }

  return savedGame
}

export function getSpecificScore(ScoreParams) {
  for (const score of playerGames) {
    if (
      score.gameId === ScoreParams.gameId &&
      score.playerId === ScoreParams.playerId &&
      score.hole === Number(ScoreParams.hole)
    ) {
      return score.score
    }
  }
}
