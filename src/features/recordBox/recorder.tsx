import * as React from 'react'
import Paper from '@mui/material/Paper'
import RecorderBars from './recorderBars'
import RecorderMenu from './recorderMenu'
import Timer from './recorderTimer'

function Recorder() {
  return (
    <Paper
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        '@media screen and (max-width: 720px)': {
          flexDirection: 'column-reverse',
        },
      }}
    >
      <Paper
        sx={{
          bottom: '0',
          width: '20%',
          display: 'grid',
          padding: '10px',
          '@media screen and (max-width: 720px)': {
            width: '100%',
          },
        }}
      >
        <Paper
          sx={{
            height: '100%',
          }}
          elevation={0}
        >
          <RecorderMenu />
        </Paper>
      </Paper>
      <Paper
        sx={{
          bottom: '0',
          width: '80%',
          display: 'grid',
          overflow: 'scroll',
          '@media screen and (max-width: 720px)': {
            width: '100%',
            height: '90%',
          },
        }}
        elevation={0}
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
            <RecorderBars />
          </Paper>
        </Paper>
      </Paper>
    </Paper>
  )
}
export default Recorder
