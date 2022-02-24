export default function testrecorder() {
  let recorder = null
  let base64 = null

  const onsuccess = (stream) => {
    recorder = new MediaRecorder(stream, {
      type: 'audio/ogg; codecs=opus',
    })

    recorder.start()

    recorder.ondataavailable = (e) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        base64 = reader.result
      }

      reader.readAsDataURL(e.data)
    }
  }

  navigator.getUserMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia
    || navigator.msGetUserMedia

  navigator.getUserMedia(
    {
      audio: true,
    },
    onsuccess,
    (error) => {
      console.log(error)
    },
  )

  setTimeout(() => {
    recorder.stop()
    console.log(base64)
    localStorage.setItem('testRecord', base64)
  }, 5000)
}
