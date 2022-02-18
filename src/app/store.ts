/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import playboxReducer from '../features/playbox/playboxSlice'

export const store = configureStore({
  reducer: {
    playbox: playboxReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
