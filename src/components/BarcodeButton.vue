<template>
    <button class="button-xs" type="button" @click="toggleScanner">Read Code</button>
    <div ref="refCameraContainer">
        <video ref="refCameraResult" id="video"></video>
    </div>
</template>

<script>
import { ref } from 'vue'
import * as ZXing from '@zxing/library'

export default {
    setup () {
        const activateFullscreen = (el) => {
            el.requestFullscreen()
        }

        const onResult = (data) => {
            if (!data) return
            console.log(data)
            document.exitFullscreen()
        }

        const codeReader = ref(null)
        const videoOptionId = ref(null)
        const refCameraResult = ref(null)

        const toggleScanner = () => {
            codeReader.value = new ZXing.BrowserMultiFormatReader()
            console.log('ZXing code reader initialized')

            codeReader.value.listVideoInputDevices()
            .then(videoInputDevices => {
                console.log(videoInputDevices)
                if (videoInputDevices.length == 0) return

                const videoInput = videoInputDevices.find(input => input.label.includes('back')) || videoInputDevices[0]

                videoOptionId.value = videoInput.deviceId

                console.log(refCameraResult.value);

                startDecoding();
            })
        }

        const startDecoding = () => {
            codeReader.value.decodeFromVideoDevice(videoOptionId.value, 'video', (result, err) => {
                if (result) {
                    // formData.value.search = result.toString().padStart(13,'0')
                    console.log(result.toString().padStart(13,'0'))
                    codeReader.value.reset()
                }
                if (err && !(err instanceof ZXing.NotFoundException)) {
                    console.error(err)
                }
            })

            console.log(`Started continous decode from camera on element => ${videoOptionId.value}`)
        }

        return { onResult, toggleScanner, activateFullscreen }
    }
}
</script>
