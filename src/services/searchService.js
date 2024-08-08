import APIService from "./apiService"

const searchService = {
    getProductByName: (productName, callback) => {
        const params = new URLSearchParams
        params.append('string', productName)

        return APIService.getData('/prod/productos', params)
    },
    getProductByCode: (productCode, callback) => {
        const params = new URLSearchParams
        params.append('id_producto', productCode)

        return APIService.getData('/prod/producto', params)
    }
}

export default searchService