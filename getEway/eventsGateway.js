const baseUrl =
  'https://my-json-server.typicode.com/Pro100Dever/projectDatas/db'

export const detchEven = async () => {
  try {
    const response = await fetch(baseUrl)
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't delete event")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
console.log(detchEven())
