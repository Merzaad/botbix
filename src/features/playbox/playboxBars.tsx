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
          background: `${bar.src !== '' ? bar.color : '#c0c0c0'}`,
          width: `${bar.width}px`,
          marginLeft: `${bar.margin + 10}px`,
          boxShadow: `${bar.id === selectedId ? `0px 0px 5px ${bar.src !== '' ? bar.color : 'rgba(35,255,231,0.6)'}` : 'none'}`,
          cursor: 'pointer',
          position: 'relative',
          border: 'none',
        }}
      >
        {bar.repeat ? (
          <Paper
            sx={{
              position: 'absolute',
              left: '0',
              top: '12px',
              height: '10px',
              width: `${1790 - bar.margin}px`,
              background: `${bar.src !== '' ? bar.color : 'rgb(0,0,0,0.2)'}`,
              boxShadow: `${bar.id === selectedId ? `0px 0px 5px
               ${bar.src !== '' ? bar.color : '#06b79e'}` : 'none'}`,
            }}
            elevation={0}
          />
        ) : null}
      </Paper>
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
