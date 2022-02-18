import * as React from 'react'
import Box from '@mui/material/Box'
import Playbox from './features/recordBox/recorder'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {
  setMoving, selectMoving, selectRecording, addMargin, selectedBarId,
} from './features/recordBox/recorderSlice'

function App() {
  const dispatch = useAppDispatch()
  const moving = useAppSelector(selectMoving)
  const selectedId = useAppSelector(selectedBarId)

  const recording = useAppSelector(selectRecording)
  const move = (e: React.MouseEvent<Element, MouseEvent>): void => {
    if (moving && !recording && selectedId !== null) {
      dispatch(addMargin(e.movementX * 0.6))
    }
  }
  const stopMoving = (e: React.MouseEvent<Element, MouseEvent>): void => {
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
            height: '60%',
          },
        }}
      >
        <Playbox />
      </Box>
    </Box>
  )
}

export default App
