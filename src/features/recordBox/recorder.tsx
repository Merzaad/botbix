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
          width: '20%',
          display: 'flex',
          flexDirection: 'column',
          '@media screen and (max-width: 720px)': {
            width: '100%',
          },
        }}
      >
        <RecorderMenu />
      </Paper>
      <Paper
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'scroll',
          '@media screen and (max-width: 720px)': {
            height: '100%',
            width: '100%',

          },
        }}
        elevation={0}
      >
        <Paper
          sx={{
            display: 'flex',
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
            paddingTop: '5px',
          }}
          elevation={0}
        >
          <RecorderBars />
        </Paper>
      </Paper>
    </Paper>
  )
}
export default Recorder
