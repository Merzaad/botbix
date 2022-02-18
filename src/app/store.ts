import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import playboxReducer from '../features/recordBox/recorderSlice'

export const store = configureStore({
  reducer: {
    playbox: playboxReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
