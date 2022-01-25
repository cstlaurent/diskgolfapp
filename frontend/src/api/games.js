export async function getGameList() {
  const gamesResponse = await fetch('http://127.0.0.1:7778/games')

  console.log('games', gamesResponse)
  const g = await gamesResponse.json()
  return g.games
}

export function deleteGame(idToDel) {
  const gamesResponse = await fetch(`http://127.0.0.1:7778/game/${idToDel}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return gamesResponse
}
