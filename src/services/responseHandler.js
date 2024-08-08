const responseHandler = async (response) => {
    if (!response.ok) {
        throw new Error(`responseHandler: Request failed with status ${response.status}`)
    }

    const raw = await response.json()

    const formatted = { status: raw.status }

    if (raw.productos)  formatted.products = formatProducts(raw.productos)
    if (raw.producto)  formatted.product = formatProduct(raw.producto)

    return formatted
}

const formatProducts = (productList) => {
    return productList.map(product => {
        return {
            brand: product.marca || '-',
            id: product.id,
            priceMin: product.precioMin || null,
            priceMax: product.precioMax || null,
            name: product.nombre || '-',
            amount: product.presentacion || null
        }
    })
}

const formatProduct = (product) => {
    return {
        brand: product.marca || '-',
        id: product.id,
        name: product.nombre || '-',
        amount: product.presentacion || null
    }
}

export default responseHandler