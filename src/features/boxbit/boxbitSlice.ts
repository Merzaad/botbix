/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface BoxbitState {
  value: number
  items: {
    id: string
    title: string
    text: string
    color: string
  }[]
}

const initialState: BoxbitState = {
  value: 0,
  items: [],
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
    },
    roll: (state) => {
      const x = state
      if (x.items.length === 0) {
        for (let i = 0; i < 5; i += 1) {
          const z = {
            id: `${i}`,
            title: `title${i}`,
            text: `text${i}`,
            color: `rgb(${Math.random() * 200},255,200,.9)`,
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
export const { reorder, roll, reset } = boxbitSlice.actions
export default boxbitSlice.reducer
