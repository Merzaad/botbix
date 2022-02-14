/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Paper from '@mui/material/Paper'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectBars, selectBar, selectedBarId } from './playboxSlice'

function PlayboxBars() {
  const dispatch = useAppDispatch()
  const bars = useAppSelector(selectBars)
  const selectedId = useAppSelector(selectedBarId)
  const test = bars.map((bar) => {
    const select = () => {
      dispatch(selectBar(bar.id))
    }
    return (
      <Paper
        onClick={select}
        key={bar.id}
        sx={{
          height: '35px',
          background: `${bar.color}`,
          width: `${bar.width}px`,
          marginLeft: `${bar.margin}px`,
          boxShadow: `${bar.id === selectedId ? '0px 0px 5px gray' : 'none'}`,
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
        gap: '10px',
        width: '100%',
      }}
      elevation={0}
    >
      {test}
    </Paper>
  )
}
export default PlayboxBars
