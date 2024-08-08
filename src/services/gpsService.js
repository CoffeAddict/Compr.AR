const GPSService = {
    getPosition: () => {
        return new Promise((resolve, reject) => {
            const successFunction = (position) => {
                const gpsPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                resolve(gpsPos)
            }

            const errorFunction = () => {
                reject('GPSService: Error getting the geolocation data from browser')
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successFunction, errorFunction)
            } else {
                alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.')
            }
        })
    }
}

export default GPSService