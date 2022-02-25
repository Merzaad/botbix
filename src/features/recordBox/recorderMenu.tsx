import * as React from 'react'
import { Paper, Button } from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import StopIcon from '@mui/icons-material/Stop'
import RepeatIcon from '@mui/icons-material/Repeat'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addWidth,
  setWidth,
  selectedBarId,
  addSrc,
  removeSrc,
  selectBars,
  setMargin,
  setRecording,
  setPlaying,
  selectPlaying,
  setRepeat,
  selectRecording,
  setStorage,
} from './recorderSlice'

function RecorderMenu() {
  const [preUrl, setPreUrl] = React.useState('')
  const selectedId = useAppSelector(selectedBarId)
  const bars = useAppSelector(selectBars)
  const dispatch = useAppDispatch()
  const playing = useAppSelector(selectPlaying)
  const recording = useAppSelector(selectRecording)
  const selectedColor = selectedId !== null ? bars[selectedId].color : 'gray'

  const handleRecord = () => {
    if (!playing && selectedId !== null) {
      if (recording) {
        dispatch(setRecording(false))
      } else {
        dispatch(setRecording(true))
        dispatch(setWidth(0))
      }
    }
  }
  const handlePlay = () => {
    if (!playing && preUrl) {
      const i = preUrl
      const x = new Audio(i)
      x.play()
    }
  }
  const handleRemove = () => {
    if (!playing) {
      dispatch(setWidth(40))
      dispatch(removeSrc())
      dispatch(setRepeat(false))
      dispatch(setMargin(0))
      setPreUrl('')
    }
  }
  const handleRepeate = () => {
    dispatch(setRepeat(!bars[selectedId!].repeat))
  }

  React.useEffect(() => {
    const nav: any = navigator
    let recorder: MediaRecorder
    let base64 = null

    if (recording) {
      const onsuccess = (stream: any) => {
        recorder = new MediaRecorder(stream)
        recorder.start()
        recorder.ondataavailable = (e) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            base64 = reader.result
            dispatch(addSrc(String(base64)))
            setPreUrl(String(base64))
          }
          reader.readAsDataURL(e.data)
        }
      }

      nav.getUserMedia(
        {
          audio: true,
        },
        onsuccess,
        (error: any) => {
          console.log(error.name)
        },
      )
    }
    return () => { if (recorder) recorder.stop() }
  }, [recording])
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (recording) {
        dispatch(addWidth(5))
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [recording])
  React.useEffect(() => {
    if (selectedId !== null) {
      if (bars[selectedId].src) {
        setPreUrl(bars[selectedId].src)
      } else {
        setPreUrl('')
      }
    }
  }, [selectedId])
  React.useEffect(() => {
    const data = bars.map((bar) => new Audio(bar.src))
    const timeOuts: any[] = []
    const repeats: any[] = []
    bars.forEach((bar) => {
      timeOuts.push(
        setTimeout(() => {
          if (playing && bar.src) data[bar.id].play()
          if (playing && bar.repeat) {
            repeats.push(
              setInterval(() => {
                data[bar.id].play()
              }),
            )
          }
        }, ((bar.margin) * 100)),
      )
    })
    return () => {
      data.forEach((x) => {
        x.pause()
      })
      timeOuts.forEach((x) => {
        clearTimeout(x)
      })
      repeats.forEach((x) => {
        clearInterval(x)
      })
    }
  }, [playing])
  React.useEffect(() => {
    dispatch(setStorage())
  })
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        paddingBottom: '10px',
        gap: '10px',
        height: '100%',
        '@media screen and (max-width: 720px)': {
          padding: '10px',
          flexDirection: 'row',
          gap: '3px',
          flexWrap: 'wrap',
        },
      }}
      elevation={0}
    >
      <Button
        className="recorder"
        onClick={handleRecord}
        sx={{
          color: selectedColor,
          ':disabled': { color: 'gray' },
        }}
        disabled={!!preUrl}
      >
        {recording ? (
          <RadioButtonCheckedTwoToneIcon fontSize="large" />
        ) : (
          <RadioButtonUncheckedTwoToneIcon fontSize="large" />
        )}
      </Button>
      <Button
        className="recorder"
        onClick={handlePlay}
        sx={{
          color: selectedColor,
          ':disabled': { color: 'gray' },
        }}
        disabled={!preUrl}
      >
        <PlayArrowRoundedIcon fontSize="large" />
      </Button>
      <Button
        className="recorder"
        onClick={handleRemove}
        sx={{
          color: selectedColor,
          ':disabled': { color: 'gray' },
        }}
        disabled={!preUrl}
      >
        <DeleteForeverOutlinedIcon fontSize="large" />
      </Button>
      <Button
        className="recorder"
        color="inherit"
        sx={{
          color: selectedColor,
          ':disabled': { color: 'gray' },
        }}
        disabled={!preUrl}
        onClick={handleRepeate}
      >
        <RepeatIcon fontSize="large" />
      </Button>
      <Button
        variant="contained"
        id="playAll"
        onClick={() => {
          if (bars.filter((i) => i.src !== '').length > 0) {
            dispatch(setPlaying(!playing))
          }
        }}
      >
        {!playing ? <PlaylistPlayIcon fontSize="large" /> : <StopIcon fontSize="large" />}
      </Button>
    </Paper>
  )
}
export default RecorderMenu
