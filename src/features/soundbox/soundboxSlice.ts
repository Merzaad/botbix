/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { SoundboxState } from '../../app/types'

const initialState: SoundboxState = {
  record: {
    second: 0,
    minute: 0,
    isActive: 0,
    counter: 0,
  },
}
export const soundboxSlice = createSlice({
  name: 'soundbox',
  initialState,
  reducers: {
    setSecond: (state, action: PayloadAction<number>) => {
      const x = state
      x.record.second = action.payload
    },
    setMinute: (state, action: PayloadAction<number>) => {
      const x = state
      x.record.minute = action.payload
    },
    setCounter: (state, action: PayloadAction<number>) => {
      const x = state
      x.record.counter = action.payload
    },
    setIsActive: (state, action: PayloadAction<number>) => {
      const x = state
      x.record.isActive = action.payload
    },
  },
})

export const selectRecord = (state: RootState) => state.soundbox.record
export const {
  setSecond, setMinute, setCounter, setIsActive,
} = soundboxSlice.actions
export default soundboxSlice.reducer
