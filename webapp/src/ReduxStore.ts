import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import AppReducer from './AppSlice'

export const AppStore = configureStore({
    reducer: {
        app: AppReducer,
    },
})

export type AppState = ReturnType<typeof AppStore.getState>
export type AppDispatch = typeof AppStore.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector