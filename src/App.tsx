/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Box from '@mui/material/Box'
import Playbox from './features/playbox/playbox'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { setMoving, selectMoving, selectRecording, addMargin, selectBars, selectedBarId } from './features/playbox/playboxSlice'

function App() {
  const dispatch = useAppDispatch()
  const moving = useAppSelector(selectMoving)
  // eslint-disable-next-line no-unused-vars
  const bars = useAppSelector(selectBars)
  const selectedId = useAppSelector(selectedBarId)

  const recording = useAppSelector(selectRecording)
  const move = (e: React.MouseEvent<Element, MouseEvent>):void => {
    if (moving && !recording && selectedId !== null) {
      dispatch(addMargin(e.movementX * 0.6))
    }
  }
  const stopMoving = (e: React.MouseEvent<Element, MouseEvent>):void => {
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
