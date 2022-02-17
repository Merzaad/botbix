/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { PlayBoxSlice } from '../../app/types'

const colors: string[] = ['#63c9d5', '#d8532a', '#f2b193', '#e4a139', '#6eb7a3', '#a7bb74']
const initialBars = []
for (let i = 0; i < 6; i += 1) {
  initialBars.push(
    {
      id: i,
      title: '',
      text: '',
      color: colors[i],
      width: 40,
      margin: 0,
      src: '',
      repeat: false,
    },

  )
}

const initialState: PlayBoxSlice = {
  bars: initialBars,
  selectedBarId: null,
  recording: false,
  playing: false,
  moving: false,
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
      if (id !== null) x.bars[id].width = 40
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
    setPlaying: (state, action: PayloadAction<boolean>) => {
      const x = state
      x.playing = action.payload
    },
    setRepeat: (state, action: PayloadAction<boolean>) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].repeat = action.payload
    },
    addMargin: (state, action: PayloadAction<number>) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) x.bars[id].margin += action.payload
      if (id !== null && x.bars[id].margin < 0) {
        x.bars[id].margin = 0
        x.moving = false
      }
    },
    setMoving: (state, action: PayloadAction<boolean>) => {
      const x = state
      x.moving = action.payload
    },
  },
})

export const selectBars = (state: RootState) => state.playbox.bars
export const selectedBarId = (state: RootState) => state.playbox.selectedBarId
export const selectRecording = (state: RootState) => state.playbox.recording
export const selectPlaying = (state: RootState) => state.playbox.playing
export const selectMoving = (state: RootState) => state.playbox.moving

export const {
  addWidth, selectBar, resetWidth, addSrc, removeSrc, setMargin, setRecording, setPlaying, setRepeat, addMargin, setMoving,
} = playboxSlice.actions
export default playboxSlice.reducer
