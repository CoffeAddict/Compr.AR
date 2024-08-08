import GPSService from "./gpsService"

const API_URL = import.meta.env.VITE_APP_API_URL

const APIService = {
  async getData(endpoint, params) {
    if (!endpoint) throw new Error('APIService: Missing endpoint path')
    if (typeof params !== 'object') throw new Error('APIService: Params format not correct')

    try {
      const position = await GPSService.getPosition()
      params = new URLSearchParams({ ...params, lat: position.lat, lng: position.lng })

      const response = await fetch(`${API_URL}${endpoint}?${params}`)
      if (!response.ok) {
        throw new Error(`APIService: Request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      throw new Error(`APIService: ${error.message}`)
    }
  }
}

export default APIService
