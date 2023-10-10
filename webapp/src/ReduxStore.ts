import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import AppReducer from './AppSlice'
import AuthorizedAppReducer from './components/authorized/AuthorizedAppSlice'
import DataEditorPageSlice from './components/authorized/dataeditor/DataEditorPageSlice'

export const AppStore = configureStore({
    reducer: {
        app: AppReducer,
        authorizedApp: AuthorizedAppReducer,
        dataEditorPage: DataEditorPageSlice,
    },
})

export type AppState = ReturnType<typeof AppStore.getState>
export type AppDispatch = typeof AppStore.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
