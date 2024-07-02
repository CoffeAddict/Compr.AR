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
    <div ref="refCameraContainer">
      <StreamQrcodeBarcodeReader
        ref="refCamera"
        :show-on-stream="true"
        capture="shoot"
        @loaded="activateFullscreen"
        @result="onResult"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { StreamQrcodeBarcodeReader } from 'vue3-barcode-qrcode-reader'

const API_URL = import.meta.env.VITE_APP_API_URL

export default {
  components: {
    StreamQrcodeBarcodeReader
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

    const refCamera = ref(null)
    const refCameraContainer = ref(null)

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
        .catch(error => {
          alert(error)
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

    const toggleScanner = () => {
      refCamera.value?.onCanPlay()
    }

    let flag = 0

    const activateFullscreen = () => {
      refCameraContainer.value.requestFullscreen()
      // if (flag < 2) refCamera.value?.onChangeFacemode()
      // flag++
    }

    const onResult = (data) => {
      if (!data) return
      formData.value.search = data
      refCamera.value?.onCanStop()
      document.exitFullscreen()
    }

    return { productList, formData, formSubmit, onResult, refCamera, refCameraContainer, toggleScanner, activateFullscreen }
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
