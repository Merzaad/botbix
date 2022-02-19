import * as React from 'react'
import Box from '@mui/material/Box'
import Recorder from './features/recordBox/recorder'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {
  setMoving, selectMoving, selectRecording, addMargin,
} from './features/recordBox/recorderSlice'

function App() {
  const dispatch = useAppDispatch()
  const moving = useAppSelector(selectMoving)

  const recording = useAppSelector(selectRecording)
  const move = (e: React.MouseEvent): void => {
    if (moving && !recording) {
      dispatch(addMargin(e.movementX * 0.6))
    }
  }
  const stopMoving = (e: React.MouseEvent): void => {
    e.preventDefault()
    dispatch(setMoving(false))
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
            height: '75%',
          },
        }}
      >
        <Recorder />
      </Box>
    </Box>
  )
}

export default App
