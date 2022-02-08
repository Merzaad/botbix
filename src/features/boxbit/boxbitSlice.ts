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
    addItem: (state, action: PayloadAction<any>) => {
      const x = state
      x.items.push(action.payload)
    },
    reorder: (state, action: PayloadAction<any>) => {
      const x = state
      const y = action.payload
      const moved = x.items.splice(y.source, 1)
      x.items.splice(y.destination, 0, moved[0])
    },
  },
})

export const selectItems = (state: RootState) => state.boxbit.items
export const { addItem, reorder } = boxbitSlice.actions
export default boxbitSlice.reducer
