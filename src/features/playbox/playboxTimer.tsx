/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '../../app/hooks'
import { selectPlaying } from './playboxSlice'

function Timer() {
  const playing = useAppSelector(selectPlaying)
  const [margin, setMargin] = React.useState(0)
  const times: any[] = []
  const movingThing = (
    <Paper
      sx={{
        position: 'absolute',
        height: '60vh',
        width: '1px',
        marginLeft: `${margin}px`,
        background: 'rgb(255,0,0,0.7)',
      }}
    />
  )
  for (let i = 0; i < 90; i += 1) {
    times.push(
      <Paper
        key={i}
        sx={{
          width: '2px',
          backgroundColor: 'rgb(0,0,0,0.5)',
        }}
      />,
    )
  }
  React.useEffect(() => {
    if (!playing) setMargin(0)
    const timer = setInterval(() => {
      if (playing) {
        setMargin(margin + 10)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [playing, margin])
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '18px',
        height: '100%',
        padding: '10px',
        position: 'relative',
      }}
    >
      {movingThing}
      {times}
    </Paper>
  )
}
export default Timer
