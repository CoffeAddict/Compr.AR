import GPSService from "./gpsService"
import responseHandler from "./responseHandler"

const API_URL = import.meta.env.VITE_APP_API_URL

const APIService = {
    async getData(endpoint, params, callback) {
        if (!endpoint) throw new Error('APIService: Missing endpoint path')
        if (typeof params !== 'object') throw new Error('APIService: Params format not correct')

        try {
            const position = await GPSService.getPosition()
            params.append('lat', position.lat)
            params.append('lng', position.lng)

            const data = responseHandler(await fetch(`${API_URL}${endpoint}?${params}`))

            if (callback && typeof callback === 'function') callback(data)

            return data
        } catch (error) {
            throw new Error(`APIService: ${error.message}`)
        }
    }
}

export default APIService
