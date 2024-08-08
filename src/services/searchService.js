import APIService from "./apiService"

const searchService = {
    getProductByName: (productName, callback) => {
        const params = new URLSearchParams
        params.append('string', productName)
        params.append('offset', 0)
        params.append('limit', 50)
        params.append('sort', '-cant_sucursales_disponible')

        APIService.getData('/prod/productos', params)
            .then(resp => console.log(resp))
            .catch(resp => console.log(resp))

        if (callback && typeof callback === 'function') callback(result)
    }
}

export default searchService