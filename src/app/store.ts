/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import boxbitReducer from '../features/boxbit/boxbitSlice'

export const store = configureStore({
  reducer: {
    boxbit: boxbitReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
