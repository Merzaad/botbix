/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import AudioPlayer from 'material-ui-audio-player'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined'
import { useReactMediaRecorder } from 'react-media-recorder'
import { Button, Container } from '@mui/material'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeMuteIcon from '@mui/icons-material/VolumeMute'
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
import { AudioPlayerIcons } from '../../app/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setIsActive, selectRecord } from './soundboxSlice'

const icons: AudioPlayerIcons = {
  PlayIcon: PlayArrowIcon,
  ReplayIcon: PlayArrowIcon,
  PauseIcon,
  VolumeUpIcon,
  VolumeOffIcon: VolumeMuteIcon,
  CloseIcon: CasinoOutlinedIcon,
}
function SoundBox() {
  const dispatch = useAppDispatch()
  const record = useAppSelector(selectRecord)
  const {
    pauseRecording, resumeRecording, startRecording, stopRecording, mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
  })
  const start = () => {
    dispatch(setIsActive(1))
    startRecording()
  }
  const pause = () => {
    switch (record.isActive) {
      case 0:
        break
      case 1:
        dispatch(setIsActive(2))
        pauseRecording()
        break
      case 2:
        dispatch(setIsActive(1))
        resumeRecording()
        break
      default:
        alert('pause error')
    }
  }
  const stop = () => {
    dispatch(setIsActive(0))
    stopRecording()
  }
  const src = mediaBlobUrl ? String(mediaBlobUrl) : []
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <AudioPlayer icons={icons} width="60%" src={src} />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '40%',
          color: 'white',
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
          {record.isActive === 1 ? <PauseIcon /> : <PlayArrowIcon />}
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
          {record.isActive === 1 ? (
            <RadioButtonCheckedOutlinedIcon />
          ) : (
            <RadioButtonUncheckedOutlinedIcon />
          )}
        </Button>
      </Container>
    </Container>
  )
}
export default SoundBox
