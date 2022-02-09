/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { SoundboxState } from '../../app/types'

const initialState: SoundboxState = {
  items: [],
}
export const soundboxSlice = createSlice({
  name: 'soundbox',
  initialState,
  reducers: {
    setSecond: (state, action: PayloadAction<number>) => {
      const x = state
      x.items[0].second = action.payload
    },
    setMinute: (state, action: PayloadAction<number>) => {
      const x = state
      x.items[0].minute = action.payload
    },
    setCounter: (state, action: PayloadAction<number>) => {
      const x = state
      x.items[0].counter = action.payload
    },
  },
})

export const selectRecords = (state: RootState) => state.soundbox.items
export const { setSecond, setMinute, setCounter } = soundboxSlice.actions
export default soundboxSlice.reducer
