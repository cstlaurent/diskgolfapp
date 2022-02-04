const playerGames = [
  {
    gameId: 'gfhfg',
    hole: 1,
    score: 0,
    playerId: 'ghjgjhhj',
  },
  {
    gameId: 'gjvgjh',
    hole: 2,
    score: 2,
    playerId: 'fghk',
  },
]

export function getPlayerGames() {
  return playerGames
}

//je dois filter si il y a deja le score du trou. seulement remplacer. IF PLAYER ID  || GAME ID
export function saveGame(playerId, hole, score, gameId) {
  const savedGame = {
    playerId: playerId,
    hole: hole,
    score: score,
    gameId: gameId,
  }

  playerGames.push(savedGame)

  for (const game of playerGames) {
    console.log(game.gameId)
  }

  return savedGame
}
