/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Box from '@mui/material/Box'
import Playbox from './features/playbox/playbox'

function App() {
  return (
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
  )
}

export default App
