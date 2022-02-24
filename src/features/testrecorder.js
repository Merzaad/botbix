export default function testrecorder() {
  let recorder = null
  let test
  const onsuccess = (stream) => {
    recorder = new MediaRecorder(stream, {
      type: 'audio/ogg; codecs=opus',
    })
    recorder.start() // Starting the record
    recorder.ondataavailable = (e) => {
      // Converting audio blob to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        test = reader.result
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
    (e) => {
      console.log(e)
    },
  )

  setTimeout(() => {
    recorder.stop()
  }, 5000)
  return test
}
