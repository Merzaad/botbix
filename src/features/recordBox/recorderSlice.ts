import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { RecorderSlice } from '../../app/types'

const colors: string[] = ['#f9c74f', '#90be6d', '#43aa8b', '#4d908e', '#577590', '#277da1']
const initialBars = []
for (let i = 0; i < 6; i += 1) {
  const test = localStorage.getItem(`audio${i}`)
  const audio = test ? JSON.parse(test) : {
    width: 40, src: '', margin: 0, repeat: false,
  }

  initialBars.push({
    id: i,
    title: '',
    color: colors[i],
    width: audio.width,
    margin: audio.margin,
    src: audio.src,
    repeat: audio.repeat,
  })
}

const initialState: RecorderSlice = {
  bars: initialBars,
  selectedBarId: null,
  recording: false,
  playing: false,
  moving: false,
}

export const recorderSlice = createSlice({
  name: 'recorder',
  initialState,
  reducers: {
    selectBar: (state, action: PayloadAction<number>) => {
      const x = state
      x.selectedBarId = action.payload
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      const x = state
      x.playing = action.payload
    },
    setRecording: (state, action: PayloadAction<boolean>) => {
      const x = state
      x.recording = action.payload
    },
    setMoving: (state, action: PayloadAction<boolean>) => {
      const x = state
      x.moving = action.payload
    },
    setRepeat: (state, action: PayloadAction<boolean>) => {
      const x = state
      const id = x.selectedBarId!
      x.bars[id].repeat = action.payload
    },
    addWidth: (state, action: PayloadAction<number>) => {
      const x = state
      const id = x.selectedBarId!
      x.bars[id].width += Math.floor(action.payload)
    },
    setWidth: (state, action: PayloadAction<number>) => {
      const x = state
      const id = x.selectedBarId!
      x.bars[id].width = action.payload
    },
    addSrc: (state, action: PayloadAction<string>) => {
      const x = state
      const id = x.selectedBarId!
      x.bars[id].src = action.payload
    },
    removeSrc: (state) => {
      const x = state
      const id = x.selectedBarId!
      x.bars[id].src = ''
      const audio = {
        width: 40,
        src: '',
        margin: 0,
        repeat: false,
      }
      localStorage.setItem(`audio${id}`, JSON.stringify(audio))
    },
    setMargin: (state, action: PayloadAction<number>) => {
      const x = state
      const id = x.selectedBarId!
      x.bars[id].margin = action.payload
    },
    addMargin: (state, action: PayloadAction<number>) => {
      const x = state
      const id = x.selectedBarId!
      x.bars[id].margin += Math.floor(action.payload * 0.6)
      if (x.bars[id].margin < 0) {
        x.bars[id].margin = 0
        x.moving = false
      }
      if (x.bars[id].margin + x.bars[id].width > 1790) {
        x.bars[id].margin = 1790 - x.bars[id].width
        x.moving = false
      }
    },
    setStorage: (state) => {
      const x = state
      const id = x.selectedBarId
      if (id !== null) {
        const audio = {
          width: x.bars[id].width,
          src: x.bars[id].src,
          margin: x.bars[id].margin,
          repeat: x.bars[id].repeat,
        }
        localStorage.setItem(`audio${id}`, JSON.stringify(audio))
      }
    },
  },
})

export const selectBars = (state: RootState) => state.recorder.bars
export const selectedBarId = (state: RootState) => state.recorder.selectedBarId
export const selectRecording = (state: RootState) => state.recorder.recording
export const selectPlaying = (state: RootState) => state.recorder.playing
export const selectMoving = (state: RootState) => state.recorder.moving

export const {
  selectBar,
  setRecording,
  setPlaying,
  setMoving,
  setRepeat,
  addWidth,
  setWidth,
  addSrc,
  removeSrc,
  setMargin,
  addMargin,
  setStorage,
} = recorderSlice.actions
export default recorderSlice.reducer
