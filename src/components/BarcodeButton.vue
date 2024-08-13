<template>
    <button class="button-xs" type="button" @click="toggleScanner">Read Code</button>
    <div ref="refCameraContainer" id="video-stream-container">
        <video id="video" autoplay class="fullscreen-controls-hidden"></video>
    </div>
</template>

<script>
import { ref } from 'vue'
import * as ZXing from '@zxing/library'

export default {
    setup () {
        const codeReader = ref(null)
        const videoOptionId = ref(null)

        const activateFullscreen = (el) => el.requestFullscreen()

        const onResult = (data) => {
            if (!data) return
            console.log(data)
            document.exitFullscreen()
        }

        const toggleScanner = () => {
            codeReader.value = new ZXing.BrowserMultiFormatReader()
            console.log('ZXing code reader initialized')

            codeReader.value.listVideoInputDevices()
            .then(videoInputDevices => {
                console.log(videoInputDevices)
                if (videoInputDevices.length == 0) return

                // uses the back camera when possible, defaults to main one
                const videoInput = videoInputDevices.find(input => input.label.includes('back')) || videoInputDevices[0]

                videoOptionId.value = videoInput.deviceId
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
                if (err && !(err instanceof ZXing.NotFoundException)) console.error(err)
            })

            console.log(`Started continous decode from camera on element => ${videoOptionId.value}`)
            activateFullscreen(document.getElementById('video'))
        }

        return { onResult, toggleScanner, activateFullscreen }
    }
}
</script>

<style>
/* Hide controls when video is in fullscreen */
video::-webkit-media-controls {
    display: none !important;
}
video::-webkit-media-controls-enclosure {
    display: none !important;
}
video::-webkit-media-controls-play-button {
    display: none !important;
}
video::-webkit-media-controls-volume-slider {
    display: none !important;
}
video::-webkit-media-controls-fullscreen-button {
    display: none !important;
}
</style>
