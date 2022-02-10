/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useReactMediaRecorder } from 'react-media-recorder'
import { Button, Container } from '@mui/material'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setIsActive, selectRecords, setSrc } from './soundboxSlice'

function SoundBox(props: { item: number }) {
  const { item } = props
  const dispatch = useAppDispatch()
  const record = useAppSelector(selectRecords)
  const { pauseRecording, resumeRecording, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
  })
  const start = () => {
    dispatch(setIsActive({ value: 1, target: item }))
    startRecording()
  }
  const pause = () => {
    switch (record[item].isActive) {
      case 0:
        break
      case 1:
        dispatch(setIsActive({ value: 2, target: item }))
        pauseRecording()
        break
      case 2:
        dispatch(setIsActive({ value: 1, target: item }))
        resumeRecording()
        break
      default:
        alert('pause error')
    }
  }
  const stop = () => {
    dispatch(setIsActive({ value: 0, target: item }))
    stopRecording()
  }
  React.useEffect(() => {
    const x = mediaBlobUrl || undefined
    dispatch(setSrc({ value: x, target: item }))
  })
  return (
    <Container
      sx={{
        color: 'white',
        border: '1px solid',
        borderRadius: '10px',
      }}
    >
      <Button
        onClick={start}
        sx={{
          color: 'white',
        }}
      >
        <MicNoneOutlinedIcon />
      </Button>
      <Button
        onClick={pause}
        sx={{
          color: 'white',
        }}
      >
        {record[item].isActive === 1 ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
      <Button
        onClick={stop}
        sx={{
          color: 'white',
        }}
      >
        <StopIcon />
      </Button>
      <Button
        sx={{
          color: 'white',
        }}
      >
        {record[item].isActive === 1 ? <RadioButtonCheckedOutlinedIcon /> : <RadioButtonUncheckedOutlinedIcon />}
      </Button>
    </Container>
  )
}
export default SoundBox
