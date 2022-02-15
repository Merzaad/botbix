/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import {
  Paper, Button, Slider,
} from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols'
import RepeatIcon from '@mui/icons-material/Repeat'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addWidth, resetWidth, selectedBarId, addSrc, removeSrc, selectBars, setMargin, setRecording, setPlaying, selectPlaying,
} from './playboxSlice'

function PlayboxMenu() {
  const [preUrl, setPreUrl] = React.useState('')

  const bars = useAppSelector(selectBars)
  const playing = useAppSelector(selectPlaying)
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(selectedBarId)
  const marginValue = selectedId !== null ? bars[selectedId].margin / 10 : 0
  const selectedColor = selectedId !== null ? bars[selectedId].color : 'gray'

  const {
    startRecording, stopRecording, status, mediaBlobUrl, clearBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
  })
  const record = () => {
    if (selectedId !== null) {
      if (preUrl === '') {
        if (status !== 'recording') {
          dispatch(addWidth(-20))
          startRecording()
          dispatch(setRecording(true))
        }
        if (status === 'recording') {
          stopRecording()
          dispatch(setRecording(false))
        }
      }
    }
  }
  const play = () => {
    if (selectedId !== null) {
      if (preUrl !== '') {
        const i = preUrl
        const x = new Audio(i)
        x.play()
      }
    }
  }
  const remove = () => {
    if (selectedId !== null) {
      dispatch(resetWidth())
      dispatch(removeSrc())
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
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (status === 'recording') {
        dispatch(addWidth(1.25))
      }
    }, 125)
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
    const delay2 = bars.map((x) => x.margin)
    const one = setTimeout(() => { if (playing) data[0].play() }, delay2[0] * 100)
    const two = setTimeout(() => { if (playing) data[1].play() }, delay2[1] * 100)
    const three = setTimeout(() => { if (playing) data[2].play() }, delay2[2] * 100)
    const four = setTimeout(() => { if (playing) data[3].play() }, delay2[3] * 100)
    const five = setTimeout(() => { if (playing) data[4].play() }, delay2[4] * 100)
    const six = setTimeout(() => { if (playing) data[5].play() }, delay2[5] * 100)
    return () => {
      data[0].pause()
      data[1].pause()
      data[2].pause()
      data[3].pause()
      data[4].pause()
      data[5].pause()
      clearTimeout(one)
      clearTimeout(two)
      clearTimeout(three)
      clearTimeout(four)
      clearTimeout(five)
      clearTimeout(six)
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
          }}
          disabled={preUrl === ''}
        >
          <DeleteForeverOutlinedIcon fontSize="large" />
        </Button>
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
            color: `${selectedColor}`,
            height: '1px',
            padding: '0px',
          }}
        />
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            color: selectedColor,
          }}
        >
          <RepeatIcon />
        </Button>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(90deg, rgba(255,68,186,0.5) 0%, rgba(106,0,106,0.5) 100%)',
          }}
          onClick={() => dispatch(setPlaying(!playing))}
        >
          {!playing ? <PlaylistPlayIcon fontSize="large" /> : <EmojiSymbolsIcon fontSize="large" />}
        </Button>
      </Paper>
    </Paper>

  )
}
export default PlayboxMenu
