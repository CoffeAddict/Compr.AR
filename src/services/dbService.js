const DB_NAME = 'myDatabase'
const DB_VERSION = 1 // Increment this when upgrading schema
const DB = undefined

const DBService = {
    openDB: () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION)

            request.onupgradeneeded = (event) => {
                DB = event.target.result
                // Create object stores and indexes if they don't exist
                if (!DB.objectStoreNames.contains('myStore')) {
                    DB.createObjectStore('myStore', { keyPath: 'id' })
                }
            }

            request.onsuccess = (event) => {
                DB = event.target.result
                resolve(DB)
            }

            request.onerror = (event) => {
                reject('Error opening database')
            }
        })
    },
    getDB: async () => {
        if (!DB) {
            DB = await openDB()
        }
        return DB
    }
}

export default DBService

// const getData = async (key) => {
    //   const db = await getDB()
//   return new Promise((resolve, reject) => {
    //     const transaction = db.transaction('myStore', 'readonly')
//     const store = transaction.objectStore('myStore')
//     const request = store.get(key)

//     request.onsuccess = () => resolve(request.result)
//     request.onerror = () => reject('Error retrieving data')
//   })
// }

// const putData = async (data) => {
    //   const db = await getDB()
//   return new Promise((resolve, reject) => {
    //     const transaction = db.transaction('myStore', 'readwrite')
//     const store = transaction.objectStore('myStore')
//     const request = store.put(data)

//     request.onsuccess = () => resolve()
//     request.onerror = () => reject('Error storing data')
//   })
// }
