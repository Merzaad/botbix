/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import {
  Paper, Button, Slider, ButtonGroup,
} from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import StopIcon from '@mui/icons-material/Stop'
import RepeatIcon from '@mui/icons-material/Repeat'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addWidth, resetWidth, selectedBarId, addSrc,
  removeSrc, selectBars, setMargin, setRecording, setPlaying, selectPlaying, setRepeat,
} from './playboxSlice'

function PlayboxMenu() {
  const [preUrl, setPreUrl] = React.useState('')

  const bars = useAppSelector(selectBars)
  const playing = useAppSelector(selectPlaying)
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(selectedBarId)
  const marginValue = selectedId !== null ? bars[selectedId].margin / 10 : 0
  const selectedColor = selectedId !== null ? bars[selectedId].color : 'gray'
  const repeatBtnVariant = () => {
    if (selectedId !== null && bars[selectedId].repeat) {
      return 'outlined'
    } return 'text'
  }
  const {
    startRecording, stopRecording, status, mediaBlobUrl, clearBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
  })
  const record = () => {
    if (selectedId !== null && !playing && preUrl === '') {
      if (status !== 'recording') {
        dispatch(addWidth(-40))
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
    if (selectedId !== null && !playing && preUrl !== '') {
      const i = preUrl
      const x = new Audio(i)
      x.play()
    }
  }
  const remove = () => {
    if (selectedId !== null && !playing) {
      dispatch(resetWidth())
      dispatch(removeSrc())
      dispatch(setRepeat(false))
      dispatch(setMargin(0))
      setPreUrl('')
      clearBlobUrl()
    }
  }
  const delay = (event: Event, currentValue: number | number[]) => {
    if (selectedId !== null) {
      dispatch(setMargin(currentValue as number * 10))
    }
  }
  const repeat = () => {
    if (selectedId !== null && bars[selectedId].src !== '') {
      dispatch(setRepeat(!bars[selectedId].repeat))
    }
  }
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (status === 'recording') {
        dispatch(addWidth(2.5))
      }
    }, 250)
    return () => clearTimeout(timer)
  }, [status])
  React.useEffect(() => {
    if (mediaBlobUrl !== null) {
      setPreUrl(mediaBlobUrl)
      dispatch(addSrc(mediaBlobUrl))
    }
  }, [mediaBlobUrl])
  React.useEffect(() => {
    if (selectedId !== null) {
      if (bars[selectedId].src !== '') {
        setPreUrl(bars[selectedId].src)
      } else {
        setPreUrl('')
      }
    }
  }, [selectedId])
  React.useEffect(() => {
    const data = bars.map((x) => new Audio(x.src))
    const timeOuts: any[] = []
    const repeats: any[] = []
    bars.forEach((x) => {
      timeOuts.push(setTimeout(() => {
        if (playing && !x.repeat) data[x.id].play()
        if (playing && x.repeat) repeats.push(setInterval(() => { data[x.id].play() }))
      }, x.margin * 100))
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
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '5px',
        height: '100%',
      }}
      elevation={0}
    >
      <Paper
        sx={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '5px',
          height: '15%',
        }}
        elevation={0}
      >
        <ButtonGroup
          color="inherit"
          sx={{
            height: '60px',
          }}
        >
          <Button
            onClick={record}
            sx={{
              color: selectedColor,
            }}
          >
            {status === 'recording' ? <RadioButtonCheckedTwoToneIcon /> : <RadioButtonUncheckedTwoToneIcon /> }
          </Button>
          <Button
            onClick={play}
            sx={{
              color: selectedColor,
            }}
          >
            <PlayArrowRoundedIcon fontSize="large" />
          </Button>
          <Button
            onClick={remove}
            sx={{
              color: selectedColor,
              ':disabled': { borderColor: selectedColor },
            }}
            disabled={preUrl === ''}
          >
            <DeleteForeverOutlinedIcon fontSize="medium" />
          </Button>
        </ButtonGroup>
      </Paper>
      <Paper
        sx={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '30px',
          height: '85%',
        }}
        elevation={0}
      >
        <Slider
          valueLabelDisplay="auto"
          value={marginValue}
          step={2}
          min={0}
          max={180}
          onChange={delay}
          sx={{
            color: selectedColor,
            height: '1px',
            padding: '0px',
          }}
        />
        <Button
          variant={repeatBtnVariant()}
          color="inherit"
          sx={{
            color: selectedColor,
            ':disabled': { borderColor: selectedColor },
          }}
          disabled={preUrl === ''}
          onClick={repeat}
        >
          <RepeatIcon />
        </Button>
        <Button
          variant="contained"
          id="playAll"
          sx={{
            marginTop: '30px',
          }}
          onClick={() => {
            if (bars.filter((i) => i.src !== '').length > 0) {
              dispatch(setPlaying(!playing))
            }
          }}
        >
          {!playing ? <PlaylistPlayIcon fontSize="large" /> : <StopIcon fontSize="large" />}
        </Button>
      </Paper>
    </Paper>

  )
}
export default PlayboxMenu
