/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import AudioPlayer from 'material-ui-audio-player'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined'
import { useReactMediaRecorder } from 'react-media-recorder'
import { Button, Container } from '@mui/material'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined'
import { AudioPlayerIcons } from '../../app/types'

const icons: AudioPlayerIcons = {
  PlayIcon: PlayArrowIcon,
  ReplayIcon: PlayArrowIcon,
  PauseIcon,
  VolumeUpIcon: SportsEsportsOutlinedIcon,
  VolumeOffIcon: CasinoOutlinedIcon,
  CloseIcon: CasinoOutlinedIcon,
}
function SoundBox() {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
  })
  const src = mediaBlobUrl ? String(mediaBlobUrl) : []
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <AudioPlayer icons={icons} width="100%" src={src} />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '30%',
        }}
      >
        <Button
          onClick={startRecording}
          sx={{
            color: 'white',
          }}
        >
          <MicNoneOutlinedIcon />
        </Button>
        <Button
          onClick={stopRecording}
          sx={{
            color: 'white',
          }}
        >
          <MicOffOutlinedIcon />
        </Button>
      </Container>
    </Container>
  )
}
export default SoundBox
