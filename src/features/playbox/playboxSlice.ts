/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { PlayBoxSlice } from '../../app/types'

const colors: string[] = ['#97ccfe', '#934df9', '#ff9d97', '#facb00', '#ffce92', '#8dd400']
const initialBars = []
for (let i = 0; i < 6; i += 1) {
  initialBars.push(
    {
      id: i,
      title: '',
      text: '',
      color: colors[i],
      width: 20,
      margin: 0,
      src: '',
    },

  )
}

const initialState: PlayBoxSlice = {
  bars: initialBars,
  selectedBarId: null,
  recording: false,
}

export const playboxSlice = createSlice({
  name: 'playbox',
  initialState,
  reducers: {
    selectBar: (state, action: PayloadAction<number>) => {
      const x = state
      x.selectedBarId = action.payload
    },
    setRecording: (state, action: PayloadAction<boolean>) => {
      const x = state
      x.recording = action.payload
    },
    addWidth: (state, action: PayloadAction<number>) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) {
        x.bars[id].width += action.payload
      }
    },
    resetWidth: (state) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].width = 20
    },
    addSrc: (state, action: PayloadAction<string>) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].src = action.payload
    },
    removeSrc: (state) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].src = ''
    },
    setMargin: (state, action: PayloadAction<number>) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].margin = action.payload
    },
  },
})

export const selectBars = (state: RootState) => state.playbox.bars
export const selectedBarId = (state: RootState) => state.playbox.selectedBarId
export const selectRecording = (state: RootState) => state.playbox.recording

export const { addWidth, selectBar, resetWidth, addSrc, removeSrc, setMargin, setRecording } = playboxSlice.actions
export default playboxSlice.reducer
