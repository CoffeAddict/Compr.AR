<template>
  <div class="">
    <h1>Compr.AR</h1>
    <form id="search-bar" @submit.prevent="formSubmit">
      <input type="text" placeholder="7799155000173, 7799145459123..." v-model="formData.search">
      <button>Search</button>
      <button type="button" @click="toggleScanner">📷</button>
    </form>
    <h2>Results</h2>
    <ul>
      <li v-for="(product, i) in productList" :key="i">
        {{ product.nombre }}
      </li>
    </ul>
    <!-- <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"/> -->
    <StreamBarcodeReader @decode="onDecode" v-if="enableScanner"/>
  </div>
</template>

<script>
import { ref } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'

const API_URL = import.meta.env.VITE_APP_API_URL

console.log('API_URL',API_URL);

export default {
  components: {
    StreamBarcodeReader
  },
  setup () {
    const productList = ref([])

    const formData = ref({
      search: ''
    })

    const gpsPos = ref({
      lat: null,
      lng: null
    })

    const enableScanner = ref(false)

    const toggleScanner = () => { alert(navigator); enableScanner.value = true }

    const formSubmit = async () => {
      await checkGPSPos()

      const query = new URLSearchParams()
      query.append('id_producto', formData.value.search)
      query.append('limit', 10)
      query.append('lat', gpsPos.value.lat)
      query.append('lng', gpsPos.value.lng)

      fetch(API_URL + `/prod/producto?${query}`)
        .then(resp => resp.json())
        .then(data => {
          productList.value = [data.producto]
        })
    }

    const checkGPSPos = () => {
      return new Promise(resolve => {
        const successFunction = (position) => {
          gpsPos.value.lat = position.coords.latitude
          gpsPos.value.lng = position.coords.longitude

          resolve()
        }

        const errorFunction = () => {
          alert('GPS Position is required to use this app, enable it and reload the app')
          resolve()
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(successFunction, errorFunction)
        } else {
          alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.')
        }
      })
    }

    const onDecode = (result) => {
      alert(result)
      formData.value.search = result
    }

    return { productList, formData, formSubmit, onDecode, enableScanner, toggleScanner }
  }
}
</script>

<style lang="scss">
#search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 600px;

  input {
    flex: 1 1 auto;
    min-width: 200px;
  }

  button {
    flex: 1 1 75px;
  }

  &::after {
    content: "";
    flex-basis: 100%;
    height: 0;
  }
}
</style>
