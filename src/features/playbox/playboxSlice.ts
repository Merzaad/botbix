/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { PlayBoxSlice } from '../../app/types'

const initialBars = []
for (let i = 0; i < 6; i += 1) {
  const y = Math.random() * 200
  initialBars.push(
    {
      id: i,
      title: '',
      text: '',
      color: `rgb(${y},254,200,.9)`,
      width: 50,
      margin: 0,
      src: '',
    },

  )
}
const initialState: PlayBoxSlice = {
  bars: initialBars,
  selectedBarId: null,
}

export const playboxSlice = createSlice({
  name: 'playbox',
  initialState,
  reducers: {
    selectBar: (state, action: PayloadAction<number>) => {
      const x = state
      x.selectedBarId = action.payload
    },
    addWidth: (state, action: PayloadAction<number>) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].width += action.payload
    },
    resetWidth: (state) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].width = 50
    },
    addSrc: (state, action: PayloadAction<string>) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].src = action.payload
    },
    removeSrc: (state) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].width = 50
    },
  },
})

export const selectBars = (state: RootState) => state.playbox.bars
export const selectedBarId = (state: RootState) => state.playbox.selectedBarId

export const { addWidth, selectBar, resetWidth, addSrc, removeSrc } = playboxSlice.actions
export default playboxSlice.reducer
