import APIService from "./apiService"

const searchService = {
    getProductByName: (productName, callback) => {
        const params = new URLSearchParams
        params.append('string', productName)
        params.append('offset', 0)
        params.append('limit', 50)
        params.append('sort', '-cant_sucursales_disponible')

        return APIService.getData('/prod/productos', params)
    }
}

export default searchService