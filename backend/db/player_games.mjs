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

export function getPlayerGames() {
  return playerGames
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

export function saveGame(playerId, hole, score, gameId) {
  let found = false
  const savedGame = {
    gameId: gameId,
    playerId: playerId,
    hole: hole,
    score: score,
  }
  for (let game of playerGames) {
    if (
      game.gameId === gameId &&
      game.playerId === playerId &&
      game.hole === hole
    ) {
      game.score = score
      found = true
      break
    }
  }
  if (found === false) {
    playerGames.push(savedGame)
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
