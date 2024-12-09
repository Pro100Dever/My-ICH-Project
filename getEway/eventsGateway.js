const baseUrl = 'https://'

export const detchEvent = async () => {
  try {
    const response = await fetch(`${baseUrl}?_limit=4`)
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't delete event")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
