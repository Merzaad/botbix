import * as React from 'react'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '../../app/hooks'
import { selectPlaying } from './recorderSlice'

function Timer() {
  const playing = useAppSelector(selectPlaying)
  const [margin, setMargin] = React.useState(0)
  const times: any[] = []
  const movingThing = (
    <Paper
      sx={{
        position: 'absolute',
        height: '650%',
        width: '1px',
        marginLeft: `${margin}px`,
        background: `linear-gradient(90deg, rgba(35,255,231,0.8) 0%,
        rgba(6,255,144,0.5) 100%)`,
        zIndex: '1',
      }}
    />
  )
  for (let i = 0; i < 90; i += 1) {
    times.push(
      <Paper
        key={i}
        sx={{
          width: '2px',
          background: 'rgb(0,0,0,0.2)',
        }}
        elevation={0}
      />,
    )
  }
  React.useEffect(() => {
    if (!playing) setMargin(0)
    const timer = setInterval(() => {
      if (playing) {
        setMargin(margin + 1.25)
      }
    }, 125)
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
      elevation={0}
    >
      {movingThing}
      {times}
    </Paper>
  )
}
export default Timer
