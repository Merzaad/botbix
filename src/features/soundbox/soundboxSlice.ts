/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { SoundboxState } from '../../app/types'

const initialState: SoundboxState = {
  records: [],
}
export const soundboxSlice = createSlice({
  name: 'soundbox',
  initialState,
  reducers: {
    setIsActive: (state, action: PayloadAction<{ value: number; target: number }>) => {
      const x = state
      x.records[action.payload.target].isActive = action.payload.value
    },
    rollSound: (state) => {
      const x = state
      x.records = []
      for (let i = 0; i < 6; i += 1) {
        const z = {
          id: `${i}`,
          second: 0,
          minute: 0,
          isActive: 0,
          counter: 0,
        }
        x.records.push(z)
      }
    },
  },
})

export const selectRecords = (state: RootState) => state.soundbox.records

export const { setIsActive, rollSound } = soundboxSlice.actions
export default soundboxSlice.reducer
