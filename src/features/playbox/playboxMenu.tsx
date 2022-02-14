/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import {
  IconButton, Paper, Button,
} from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone'
import { useReactMediaRecorder } from 'react-media-recorder'
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addWidth, resetWidth, selectedBarId, addSrc, removeSrc, selectBars,
} from './playboxSlice'

function PlayboxMenu() {
  const [preUrl, setPreUrl] = React.useState('')
  const bars = useAppSelector(selectBars)
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(selectedBarId)
  const {
    startRecording, stopRecording, status, mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
  })
  const record = () => {
    if (selectedId !== null) {
      if (preUrl === '') {
        if (status !== 'recording') startRecording()
        if (status === 'recording') {
          stopRecording()
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
      setPreUrl('')
    }
  }
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (status === 'recording') {
        dispatch(addWidth(50))
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
          justifyContent: 'right',
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
        <Button
          color="secondary"
          variant="contained"
        >
          +5 seconds
        </Button>
        <Button
          color="info"
          variant="contained"
        >
          -5 seconds
        </Button>
        <Button
          color="warning"
          variant="contained"
        >
          repeat
        </Button>
      </Paper>
    </Paper>

  )
}
export default PlayboxMenu
