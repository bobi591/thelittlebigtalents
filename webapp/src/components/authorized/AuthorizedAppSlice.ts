import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Session from '../../datasource/security/Session'

export type ToastPopup = {
    header: string
    message: string
}

export type AuthorizedAppState = {
    username?: string
    password?: string
    session?: Session
    pageToShow?: JSX.Element
    toastPopup?: ToastPopup
}

const initialAppState: AuthorizedAppState = {
    username: undefined,
    password: undefined,
    session: undefined,
    toastPopup: undefined,
}

export const AuthorizedAppSlice = createSlice({
    name: 'authorizedAppSlice',
    initialState: initialAppState,
    reducers: {
        updateUsername(state, action: PayloadAction<string>) {
            state.username = action.payload
        },
        updatePassword(state, action: PayloadAction<string>) {
            state.password = action.payload
        },
        updateSession(state, action: PayloadAction<Session>) {
            state.session = action.payload
        },
        showToast(state, action: PayloadAction<ToastPopup | undefined>) {
            state.toastPopup = action.payload
        },
    },
})

export const { updateUsername, updatePassword, updateSession, showToast } =
    AuthorizedAppSlice.actions
export default AuthorizedAppSlice.reducer
