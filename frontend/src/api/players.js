export async function getPlayerList() {
  const playersResponse = await fetch('http://127.0.0.1:7778/players')

  console.log('Players', playersResponse)

  const p = await playersResponse.json()
  return p.players
}
export async function deletePlayer(idToDel) {
  const playersResponse = await fetch(
    `http://127.0.0.1:7778/player/${idToDel}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return playersResponse
}
