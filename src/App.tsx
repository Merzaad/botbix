/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Box from '@mui/material/Box'
import Playbox from './features/playbox/playbox'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { setMoving, selectMoving, selectRecording, addMargin } from './features/playbox/playboxSlice'

function App() {
  const dispatch = useAppDispatch()
  const moving = useAppSelector(selectMoving)
  const recording = useAppSelector(selectRecording)
  const move = (e: React.MouseEvent<Element, MouseEvent>):void => {
    if (moving && !recording) dispatch(addMargin(e.movementX * 0.63))
  }
  const stopMoving = () => {
    dispatch(setMoving(false))
  }
  return (
    <Box
      onMouseUp={stopMoving}
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
        }}
      >
        <Playbox />
      </Box>
    </Box>
  )
}

export default App
