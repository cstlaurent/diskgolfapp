export async function getGameList() {
  const gamesResponse = await fetch('http://127.0.0.1:7778/games')

  console.log('games', gamesResponse)
  const g = await gamesResponse.json()
  return g.games
}
