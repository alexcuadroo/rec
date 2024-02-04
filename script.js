const $startButton = document.querySelector('#start')
const $stopButton = document.querySelector('#stop')

let mediarecorder = null

$startButton.addEventListener('click', async () => {
  const width = prompt("Ingrese el ancho de la pantalla", "1920")
  const height = prompt("Ingrese la altura de la pantalla", "1080")

  const media = await navigator.mediaDevices.getDisplayMedia({
    video: { 
      frameRate: { ideal: 30 },
      width: { ideal: width },
      height: { ideal: height }
    },
    audio: true
  })
  mediarecorder = new MediaRecorder(media, {
    mimeType: 'video/webm;codecs=vp8,opus'
  })
  mediarecorder.start()

  $stopButton.disabled = false

  const [video] = media.getVideoTracks()
  video.addEventListener("ended", () => {
    mediarecorder.stop()
  })

  mediarecorder.addEventListener("dataavailable", (e) => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(e.data)
    link.download = "captura.webm"
    link.click()
  })
})

$stopButton.addEventListener('click', () => {
  if (mediarecorder) {
    mediarecorder.stop()
    $stopButton.disabled = true
  }
})
