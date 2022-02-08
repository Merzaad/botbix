/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface BoxbitState {
  items: {
    id: string
    title: string
    text: string
    color: string
    game: string
  }[]
  result: boolean[]
}

const initialState: BoxbitState = {
  items: [],
  result: [],
}
export const boxbitSlice = createSlice({
  name: 'boxbit',
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
    },
    roll: (state) => {
      const x = state
      x.result = []
      if (x.items.length === 0) {
        for (let i = 0; i < 5; i += 1) {
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

export const selectItems = (state: RootState) => state.boxbit.items
export const selectResult = (state: RootState) => state.boxbit.result

export const { reorder, roll, reset } = boxbitSlice.actions
export default boxbitSlice.reducer
