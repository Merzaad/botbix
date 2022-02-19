import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import recorderReducer from '../features/recordBox/recorderSlice'

export const store = configureStore({
  reducer: {
    recorder: recorderReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
