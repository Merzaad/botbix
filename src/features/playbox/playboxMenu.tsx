/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import {
  IconButton, Paper, Button, Slider,
} from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone'
import { useReactMediaRecorder } from 'react-media-recorder'
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addWidth, resetWidth, selectedBarId, addSrc, removeSrc, selectBars, setMargin, setRecording,
} from './playboxSlice'

function PlayboxMenu() {
  const [preUrl, setPreUrl] = React.useState('')

  const bars = useAppSelector(selectBars)
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(selectedBarId)
  const marginValue = selectedId !== null ? bars[selectedId].margin / 10 : 0
  const selectedColor = selectedId !== null ? bars[selectedId].color : 'black'

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
  const playAll = () => {
    bars.forEach((x) => {
      if (bars[x.id].src) {
        const audio = new Audio(bars[x.id].src)
        const timeout = x.margin * 90
        setTimeout(() => audio.play(), timeout)
      }
    })
  }
  React.useEffect(() => {
    dispatch(addWidth(5))
    const timer = setInterval(() => {
      if (status === 'recording') {
        dispatch(addWidth(5))
      }
    }, 500)
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
        <IconButton
          onClick={record}
          sx={{
            color: 'black',
          }}
        >
          {status === 'recording' ? <RadioButtonCheckedTwoToneIcon /> : <RadioButtonUncheckedTwoToneIcon /> }
        </IconButton>
        <IconButton
          onClick={play}
          sx={{
            color: 'black',
          }}
        >
          <PlayCircleOutlineOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={remove}
          sx={{
            color: 'black',
          }}
          disabled={preUrl === ''}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Paper>
      <Paper
        sx={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '5px',
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
          }}
        />
        <Button
          color="warning"
          variant="outlined"
        >
          +repeat
        </Button>
        <Button
          color="error"
          variant="outlined"
          sx={{
            marginTop: '50px',
          }}
          onClick={playAll}
        >
          play
        </Button>
      </Paper>
    </Paper>

  )
}
export default PlayboxMenu
