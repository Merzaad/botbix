import * as React from 'react'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '../../app/hooks'
import { selectPlaying } from './recorderSlice'

function RecorderTimer() {
  const playing = useAppSelector(selectPlaying)
  const [margin, setMargin] = React.useState(() => 0)
  const times: React.ReactElement[] = []
  const movingThing = (
    <Paper
      sx={{
        position: 'absolute',
        height: '800%',
        width: '2px',
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
        paddingTop: '10px',
        gap: '18px',
        height: '80%',
        position: 'relative',
      }}
      elevation={0}
    >
      {times}
      {movingThing}
    </Paper>
  )
}
export default RecorderTimer
