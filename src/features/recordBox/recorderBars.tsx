import * as React from 'react'
import Paper from '@mui/material/Paper'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectBars, selectBar, selectedBarId, selectRecording, setMoving,
} from './recorderSlice'

function RecorderBars() {
  const dispatch = useAppDispatch()
  const bars = useAppSelector(selectBars)
  const selectedId = useAppSelector(selectedBarId)
  const recording = useAppSelector(selectRecording)
  const items = bars.map((bar) => {
    const {
      id, color, width, margin, src, repeat,
    } = bar
    const x = repeat ? ((1800 - margin) / (width)) - 1 : 1
    const repeats = []
    for (let i = 0; i < x; i += 1) {
      repeats.push(
        <Paper
          key={i}
          sx={{
            position: 'absolute',
            left: `${(width * i)}px`,
            top: '0px',
            height: '35px',
            width: `${width}px`,
            borderLeft: '1px solid white',
            background: `${src !== '' ? color : 'rgb(0,0,0,0.2)'}`,
            boxShadow: `${
              id === selectedId
                ? `0px 0px 5px
             ${src !== '' ? color : 'rgb(0,0,0,0.2)'}`
                : 'none'
            }`,
            '@media screen and (max-width: 720px)': {
              height: '40px',
            },
          }}
          elevation={0}
        />,
      )
    }

    const startMoving = (e: React.MouseEvent): void => {
      e.preventDefault()
      if (!recording && e.button === 0) {
        e.preventDefault()
        dispatch(setMoving(true))
        dispatch(selectBar(id))
      }
    }

    const contextMenu = (e: React.MouseEvent): void => {
      if (e.button === 2) {
        e.preventDefault()
      }
    }
    return (
      <Paper
        onMouseDown={startMoving}
        onContextMenu={contextMenu}
        key={id}
        elevation={0}
        sx={{
          height: '35px',
          cursor: 'pointer',
          position: 'relative',
          marginLeft: `${bar.margin}px`,
          '@media screen and (max-width: 720px)': {
            height: '40px',
          },
        }}
      >
        {repeats}
      </Paper>
    )
  })
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
      }}
      elevation={0}
    >
      {items}
    </Paper>
  )
}
export default RecorderBars
