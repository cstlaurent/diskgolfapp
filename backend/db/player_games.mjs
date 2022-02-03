const playerGames = [
  {
    playerid: 22,
    gameid: 33,
    score: { h1: 1, h2: 2 },
  },
]

export function getPlayerGames() {
  return playerGames
}

//je dois filter si il y a deja le score du trou. seulement remplacer. IF PLAYER ID  || GAME ID
export function saveGame(playerId, hole, score) {
  const savedGame = {
    playerId: playerId,
    hole: hole,
    score: score,
  }
  playerGames.push(savedGame)
  return savedGame
}
