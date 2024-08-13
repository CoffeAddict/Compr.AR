const DB_NAME = 'compr.ar_db'
const DB_VERSION = 1 // Increment this when upgrading schema
const libraryName = 'productsLibrary'
let DB = undefined

const DBService = {
    openDB: () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION)

            request.onupgradeneeded = (event) => {
                DB = event.target.result
                // Create object stores and indexes if they don't exist
                if (!DB.objectStoreNames.contains(libraryName)) {
                    DB.createObjectStore(libraryName, { keyPath: 'id' })
                }
            }

            request.onsuccess = (event) => {
                DB = event.target.result
                resolve(DB)
            }

            request.onerror = (event) => reject('Error opening database', event)
        })
    },
    initDB: async () => {
        if (!DB) DB = await DBService.openDB()
    },
    initTransaction: (DB) => {
        if (!DB) return new Error('DBService - initTransaction: Missing DB')
        return DB.transaction([libraryName], "readwrite")
    },
    initObjectStore: (transaction) => {
        if (!transaction) return new Error('DBService - initObjectStore: Missing transaction')
        return transaction.objectStore(libraryName)
    },
    addProduct: (product) => {
        return new Promise (async (resolve, reject) => {
            if (!product.id) return reject(new Error('DBService - addProduct: Missing product id'))

            await DBService.initDB()
            const transaction = DBService.initTransaction(DB)
            const objectStore = DBService.initObjectStore(transaction)
            const request = objectStore.add(product)

            request.onsuccess = (event) => resolve(event.returnValue)
            request.onerror = (event) => reject(new Error(event.target.error))
        })
    },
    getProduct: (productId) => {
        return new Promise (async (resolve, reject) => {
            if (!productId) return reject(new Error('DBService - getProduct: Missing product id'))

            await DBService.initDB()
            const transaction = DBService.initTransaction(DB)
            const objectStore = DBService.initObjectStore(transaction)
            const request = objectStore.get(productId)

            request.onsuccess = (event) => resolve(event.target.result)
            request.onerror = (event) => reject(new Error(event.target.error))
        })
    },
    getAll: () => {
        return new Promise (async (resolve, reject) => {
            await DBService.initDB()
            const transaction = DBService.initTransaction(DB)
            const objectStore = DBService.initObjectStore(transaction)
            const request = objectStore.getAll()

            request.onsuccess = (event) => resolve(event.target.result)
            request.onerror = (event) => reject(new Error(event.target.error))
        })
    },
    deleteProduct: (productId) => {
        return new Promise (async (resolve, reject) => {
            if (!productId) return reject(new Error('DBService - deleteProduct: Missing product id'))

            await DBService.initDB()
            const transaction = DBService.initTransaction(DB)
            const objectStore = DBService.initObjectStore(transaction)
            const request = objectStore.delete(productId)

            request.onsuccess = (event) => resolve(event.returnValue)
            request.onerror = (event) => reject(new Error(event.target.error))
        })
    }
}

export default DBService
