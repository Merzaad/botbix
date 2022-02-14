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
        backgroundColor: 'red',
        width: '1px',
        marginLeft: `${margin}px`,
      }}
    />
  )
  for (let i = 0; i < 180; i += 1) {
    times.push(
      <Paper
        key={i}
        sx={{
          width: '1px',
          backgroundColor: 'black',
        }}
      />,
    )
  }
  React.useEffect(() => {
    if (!playing) setMargin(0)
    const timer = setInterval(() => {
      if (playing) {
        setMargin(margin + 5)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [playing, margin])
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '9.74px',
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
