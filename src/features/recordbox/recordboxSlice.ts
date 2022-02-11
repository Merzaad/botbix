/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { RecordboxState } from '../../app/types'

const initialState: RecordboxState = {
  records: [],
}
export const recordboxSlice = createSlice({
  name: 'recordbox',
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
          src: '',
        }
        x.records.push(z)
      }
    },
    setSrc: (state, action: PayloadAction<{ value: string | undefined; target: number }>) => {
      const x = state.records
      const y = action.payload
      x[y.target].src = y.value
    },
  },
})

export const selectRecords = (state: RootState) => state.recordbox.records

export const { setIsActive, rollSound, setSrc } = recordboxSlice.actions
export default recordboxSlice.reducer
