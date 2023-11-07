import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppComponentProps } from './AppComponentProps'
import Backend from './datasource/Backend'
import FooterData from './datasource/models/FooterData'
import NavbarData from './datasource/models/NavbarData'

const initialAppState: AppComponentProps = {
    isSubPageLoading: false,
}

export const fetchInformationPageData = createAsyncThunk(
    'appSlice/fetchInformationPageData',
    async (pageName: string) => {
        try {
            return await Backend.getInformationPageData(pageName)
        } catch (error) {
            provideError(error as Error)
            return undefined
        }
    }
)

export const fetchInformationPageGalleryBottomData = createAsyncThunk(
    'appSlice/fetchInformationPageGalleryBottomData',
    async (pageName: string) => {
        try {
            return await Backend.getInformationPageGalleryBottomData(pageName)
        } catch (error) {
            provideError(error as Error)
            return undefined
        }
    }
)

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
        isSubPageLoading: (state, action: PayloadAction<boolean>) => {
            state.isSubPageLoading = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInformationPageData.fulfilled, (state, action) => {
            isSubPageLoading(true)
            state.informationPageData = action.payload
            isSubPageLoading(false)
        })
        builder.addCase(
            fetchInformationPageGalleryBottomData.fulfilled,
            (state, action) => {
                isSubPageLoading(true)
                state.informationPageGalleryBottomData = action.payload
                isSubPageLoading(false)
            }
        )
    },
})

export const {
    provideNavbarData,
    provideFooterData,
    provideError,
    providePageToShow,
    isSubPageLoading,
} = AppSlice.actions
export default AppSlice.reducer
