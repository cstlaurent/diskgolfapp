export async function getPlayerList() {
  const playersResponse = await fetch('http://127.0.0.1:7778/players')

  console.log('Players', playersResponse)

  const p = await playersResponse.json()
  return p.players
}
