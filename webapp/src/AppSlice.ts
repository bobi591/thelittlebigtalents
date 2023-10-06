import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppComponentProps } from './AppComponentProps'
import FooterData from './datasource/models/FooterData'
import NavbarData from './datasource/models/NavbarData'

const initialAppState: AppComponentProps = {}

export const AppSlice = createSlice({
    name: 'appSlice',
    initialState: initialAppState,
    reducers: {
        provideNavbarData: (state, action: PayloadAction<NavbarData>) => {
            state.navbarData = action.payload
        },
        provideFooterData: (state, action: PayloadAction<FooterData>) => {
            state.footerData = action.payload
        },
        provideError: (state, action: PayloadAction<Error>) => {
            state.error = action.payload
        },
        providePageToShow: (state, action: PayloadAction<JSX.Element>) => {
            state.pageToShow = action.payload
        },
    },
})

export const {
    provideNavbarData,
    provideFooterData,
    provideError,
    providePageToShow,
} = AppSlice.actions
export default AppSlice.reducer
