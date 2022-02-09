/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { DragboxSlice } from '../../app/types'

const initialState: DragboxSlice = {
  items: [],
  result: [],
}
export const dragboxSlice = createSlice({
  name: 'dragbox',
  initialState,
  reducers: {
    reorder: (state, action: PayloadAction<any>) => {
      const x = state
      const y = action.payload
      const moved = x.items.splice(y.source, 1)
      x.items.splice(y.destination, 0, moved[0])
      const test = x.items.map((i) => i.game)
      test.sort((a: any, b: any) => a - b)
      for (let i = 0; i < x.items.length; i += 1) {
        if (test[i] === x.items[i].game) x.result[i] = true
        else x.result[i] = false
      }
      localStorage.setItem('gameResult', x.result.toString())
    },
    roll: (state) => {
      const x = state
      x.result = []
      if (x.items.length === 0) {
        for (let i = 0; i < 6; i += 1) {
          const y = Math.random() * 200
          const z = {
            id: `${i}`,
            title: `title${i}`,
            text: `text${i}`,
            color: `rgb(${y},254,200,.9)`,
            game: `${y}`,
          }
          x.items.push(z)
        }
      }
    },
    reset: (state) => {
      const x = state
      x.items = []
    },
  },
})

export const selectItems = (state: RootState) => state.dragbox.items
export const selectResult = (state: RootState) => state.dragbox.result

export const { reorder, roll, reset } = dragboxSlice.actions
export default dragboxSlice.reducer
