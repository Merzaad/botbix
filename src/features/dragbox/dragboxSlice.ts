/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { DragboxSlice } from '../../app/types'

const initialState: DragboxSlice = {
  records: [],
  result: [],
}
export const dragboxSlice = createSlice({
  name: 'dragbox',
  initialState,
  reducers: {
    reorder: (state, action: PayloadAction<any>) => {
      const x = state
      const y = action.payload
      const moved = x.records.splice(y.source, 1)
      x.records.splice(y.destination, 0, moved[0])
      const test = x.records.map((i) => i.game)
      test.sort((a: any, b: any) => a - b)
      for (let i = 0; i < x.records.length; i += 1) {
        if (test[i] === x.records[i].game) x.result[i] = true
        else x.result[i] = false
      }
      localStorage.setItem('gameResult', x.result.toString())
    },
    roll: (state) => {
      const x = state
      x.result = []
      if (x.records.length === 0) {
        for (let i = 0; i < 6; i += 1) {
          const y = Math.random() * 200
          const z = {
            id: `${i}`,
            title: `title${i}`,
            text: `text${i}`,
            color: `rgb(${y},254,200,.9)`,
            game: `${y}`,
            width: `${i * 40}px`,
          }
          x.records.push(z)
        }
      }
    },
    reset: (state) => {
      const x = state
      x.records = []
    },
  },
})

export const selectRecords = (state: RootState) => state.dragbox.records
export const selectResult = (state: RootState) => state.dragbox.result

export const { reorder, roll, reset } = dragboxSlice.actions
export default dragboxSlice.reducer
