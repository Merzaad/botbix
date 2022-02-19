import * as React from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
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
  resetWidth,
  selectedBarId,
  addSrc,
  removeSrc,
  selectBars,
  setMargin,
  setRecording,
  setPlaying,
  selectPlaying,
  setRepeat,
} from './recorderSlice'

function RecorderMenu() {
  const [preUrl, setPreUrl] = React.useState('')

  const bars = useAppSelector(selectBars)
  const playing = useAppSelector(selectPlaying)
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(selectedBarId)!
  const selectedColor = selectedId ? bars[selectedId].color : 'gray'
  const {
    startRecording, stopRecording, status, mediaBlobUrl, clearBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
  })
  const record = () => {
    if (!playing && !preUrl) {
      if (status !== 'recording') {
        dispatch(addWidth(-39))
        startRecording()
        dispatch(setRecording(true))
      }
      if (status === 'recording') {
        stopRecording()
        dispatch(setRecording(false))
      }
    }
  }
  const play = () => {
    if (!playing && preUrl) {
      const i = preUrl
      const x = new Audio(i)
      x.play()
    }
  }
  const remove = () => {
    if (!playing) {
      dispatch(resetWidth())
      dispatch(removeSrc())
      dispatch(setRepeat(false))
      dispatch(setMargin(0))
      setPreUrl('')
      clearBlobUrl()
    }
  }
  const repeat = () => {
    if (bars[selectedId].src) {
      dispatch(setRepeat(!bars[selectedId].repeat))
    }
  }
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (status === 'recording') {
        dispatch(addWidth(1.21))
      }
    }, 125)
    return () => clearTimeout(timer)
  }, [status])
  React.useEffect(() => {
    if (mediaBlobUrl) {
      setPreUrl(mediaBlobUrl)
      dispatch(addSrc(mediaBlobUrl))
    }
  }, [mediaBlobUrl])
  React.useEffect(() => {
    if (selectedId) {
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
        }, bar.margin * 100),
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
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
        '@media screen and (max-width: 720px)': {
          flexDirection: 'row',
          gap: '2px',
          flexWrap: 'wrap',
        },
      }}
      elevation={0}
    >
      <Button
        className="recorder"
        onClick={record}
        sx={{
          color: selectedColor,
        }}
      >
        {status === 'recording' ? (
          <RadioButtonCheckedTwoToneIcon fontSize="large" />
        ) : (
          <RadioButtonUncheckedTwoToneIcon fontSize="large" />
        )}
      </Button>
      <Button
        className="recorder"
        onClick={play}
        sx={{
          color: selectedColor,
        }}
      >
        <PlayArrowRoundedIcon fontSize="large" />
      </Button>
      <Button
        className="recorder"
        onClick={remove}
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
        onClick={repeat}
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
