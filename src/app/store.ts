/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import dragboxReducer from '../features/dragbox/dragboxSlice'
import soundboxReducer from '../features/soundbox/soundboxSlice'

export const store = configureStore({
  reducer: {
    dragbox: dragboxReducer,
    soundbox: soundboxReducer,
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
