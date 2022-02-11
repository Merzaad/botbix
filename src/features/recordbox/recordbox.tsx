/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useReactMediaRecorder } from 'react-media-recorder'
import { IconButton, Container } from '@mui/material'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setIsActive, selectRecords, setSrc } from './recordboxSlice'

function RecordBox(props: { item: number }) {
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
  const remove = () => {
    dispatch(setSrc({ value: undefined, target: item }))
  }
  React.useEffect(() => {
    if (mediaBlobUrl !== null) dispatch(setSrc({ value: mediaBlobUrl, target: item }))
  })
  return (
    <Container>
      <IconButton
        sx={{
          color: 'black',
        }}
      >
        {record[item].isActive === 1 ? <RadioButtonCheckedOutlinedIcon /> : <RadioButtonUncheckedOutlinedIcon />}
      </IconButton>
      <IconButton
        onClick={start}
        sx={{
          color: 'black',
        }}
      >
        <MicNoneOutlinedIcon />
      </IconButton>
      <IconButton
        onClick={pause}
        sx={{
          color: 'black',
        }}
      >
        {record[item].isActive === 1 ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton
        onClick={stop}
        sx={{
          color: 'black',
        }}
      >
        <StopIcon />
      </IconButton>
      <IconButton
        onClick={remove}
        sx={{
          color: 'black',
        }}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    </Container>
  )
}
export default RecordBox