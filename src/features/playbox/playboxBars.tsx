/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Paper from '@mui/material/Paper'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  selectBars, selectBar, selectedBarId, selectRecording,
} from './playboxSlice'

function PlayboxBars() {
  const dispatch = useAppDispatch()
  const bars = useAppSelector(selectBars)
  const selectedId = useAppSelector(selectedBarId)
  const recording = useAppSelector(selectRecording)
  const items = bars.map((bar) => {
    const select = () => {
      if (!recording) dispatch(selectBar(bar.id))
    }
    return (
      <Paper
        onClick={select}
        key={bar.id}
        sx={{
          height: '35px',
          background: `${bar.src !== '' ? bar.color : 'gray'}`,
          width: `${bar.width}px`,
          marginLeft: `${bar.margin}px`,
          boxShadow: `${bar.id === selectedId ? `0px 0px 5px ${bar.color}` : 'none'}`,
          cursor: 'pointer',
        }}
        elevation={0}
      />
    )
  })
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
      }}
      elevation={0}
    >
      {items}
    </Paper>
  )
}
export default PlayboxBars
