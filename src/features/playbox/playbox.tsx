/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Box } from '@material-ui/core'
import PlayboxBars from './playboxBars'
import PlayboxMenu from './playboxMenu'
import Timer from './playboxTimer'

function Playbox() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          bottom: '0',
          width: '20%',
          display: 'grid',
          padding: '10px',
        }}
      >
        <Paper
          sx={{
            height: '100%',
          }}
          elevation={0}
        >
          <PlayboxMenu />
        </Paper>
      </Box>
      <Box
        sx={{
          bottom: '0',
          width: '80%',
          display: 'grid',
          overflow: 'scroll',
        }}
      >
        <Paper
          sx={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '7px',
          }}
          elevation={0}
        >
          <Paper
            sx={{
              height: '15%',
            }}
            elevation={0}
          >
            <Timer />
          </Paper>
          <Paper
            sx={{
              height: '85%',
              display: 'flex',
              alignItems: 'center',
              padding: '0px',
            }}
            elevation={0}
          >
            <PlayboxBars />
          </Paper>
        </Paper>
      </Box>
    </Box>
  )
}
export default Playbox
