import * as React from 'react'
import Box from '@mui/material/Box'
import Recorder from './features/recordBox/recorder'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {
  setMoving, selectMoving, selectRecording, addMargin, selectBars, selectedBarId, selectPlaying, setMargin,
} from './features/recordBox/recorderSlice'

function App() {
  const dispatch = useAppDispatch()
  const bars = useAppSelector(selectBars)
  const selectedId = useAppSelector(selectedBarId)
  const moving = useAppSelector(selectMoving)
  const playing = useAppSelector(selectPlaying)
  const recording = useAppSelector(selectRecording)
  const move = (e: React.MouseEvent): void => {
    if (moving && !recording && bars[selectedId!].src && !playing) {
      dispatch(addMargin(e.movementX))
    }
  }
  const stopMoving = (e: React.MouseEvent): void => {
    if (selectedId !== null) {
      e.preventDefault()
      dispatch(setMoving(false))
      const newMargin = (Math.floor(bars[selectedId].margin / 20)) * 20
      dispatch(setMargin(newMargin))
    }
  }
  return (
    <Box
      onMouseUp={stopMoving}
      onMouseLeave={stopMoving}
      onMouseMove={(e) => move(e)}
      sx={{
        position: 'fixed',
        bottom: '0',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          bottom: '0',
          height: '60%',
          width: '100%',
          background: 'white',
          '@media screen and (max-width: 720px)': {
            gap: '0px',
            height: '100%',
          },
        }}
      >
        <Recorder />
      </Box>
    </Box>
  )
}

export default App
