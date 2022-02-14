/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { DragboxSlice } from '../../app/types'

const initialState: DragboxSlice = {
  items: [],
  result: [],
  reapeatPlay: false,
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
    rollDrag: (state) => {
      const x = state
      x.items = []
      x.result = []
      for (let i = 0; i < 6; i += 1) {
        const y = Math.random() * 200
        const z = {
          id: i,
          title: `title${i}`,
          text: `text${i}`,
          color: `rgb(${y},254,200,.9)`,
          game: `${y}`,
          width: 50,
          margin: 0,
        }
        x.items.push(z)
      }
    },
    resetWidth: (state, action: PayloadAction<number>) => {
      const x = state
      const target = action.payload
      x.items[target].width = 50
    },
    resetMargin: (state, action: PayloadAction<number>) => {
      const x = state
      const target = action.payload
      x.items[target].margin = 0
    },
    addMargin: (state, action: PayloadAction<number>) => {
      const x = state
      const id = action.payload
      const w = x.items[id].width
      const m = x.items[id].margin
      if (m >= 0 && m < 350 - w) {
        x.items[id].margin += 50
      }
    },
    removeMargin: (state, action: PayloadAction<number>) => {
      const x = state
      const id = action.payload
      const w = x.items[id].width
      const m = x.items[id].margin
      if (m > 0 && m > w - 350) {
        x.items[id].margin -= 50
      }
    },
    addWidth: (state, action: PayloadAction<number>) => {
      const x = state
      const id = action.payload
      x.items[id].width += 50
    },
    toggleRepeatPLay: (state) => {
      const x = state
      x.reapeatPlay = !!x.reapeatPlay === false
    },
  },
})

export const selectItems = (state: RootState) => state.dragbox.items
export const selectResult = (state: RootState) => state.dragbox.result
export const selectRepeatPlay = (state: RootState) => state.dragbox.reapeatPlay

export const {
  reorder, rollDrag, resetWidth, addMargin, removeMargin, addWidth, resetMargin, toggleRepeatPLay,
} = dragboxSlice.actions
export default dragboxSlice.reducer
