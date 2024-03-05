import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppComponentProps } from './AppComponentProps'
import Backend from './datasource/Backend'
import FooterData from './datasource/models/FooterData'
import NavbarData from './datasource/models/NavbarData'
import PageMetadata from './datasource/models/PageMetadata'
import { AppState } from './ReduxStore'

const initialAppState: AppComponentProps = {
    isSubPageLoaded: false,
}

export const fetchBookings = createAsyncThunk(
    'appSlice/fetchBookings',
    async () => {
        try {
            return await Backend.getBookings()
        } catch (error) {
            provideError(error as Error)
            return undefined
        }
    }
)

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

export const fetchPagesMetadata = createAsyncThunk(
    'appSlice/fetchPagesMetadata',
    async (_, { getState }): Promise<Map<string, PageMetadata> | undefined> => {
        const {
            app: { pagesMetadata: pagesMetadataInState },
        } = getState() as AppState
        if (!pagesMetadataInState || pagesMetadataInState.size === 0) {
            try {
                const pagesMetadataArray = await Backend.getPagesMetadata()
                const pagesMetadataNew = new Map()
                pagesMetadataArray.forEach((x) =>
                    pagesMetadataNew.set(x.url, x)
                )
                return pagesMetadataNew
            } catch (error) {
                provideError(error as Error)
                return undefined
            }
        }
        return pagesMetadataInState
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
        isSubPageLoaded: (state, action: PayloadAction<boolean>) => {
            state.isSubPageLoaded = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInformationPageData.fulfilled, (state, action) => {
            state.informationPageData = action.payload
            state.isSubPageLoaded = true
        })
        builder.addCase(
            fetchInformationPageGalleryBottomData.fulfilled,
            (state, action) => {
                state.informationPageGalleryBottomData = action.payload
                state.isSubPageLoaded = true
            }
        )
        builder.addCase(fetchPagesMetadata.fulfilled, (state, action) => {
            const { payload } = action
            state.pagesMetadata = payload
        })
    },
})

export const {
    provideNavbarData,
    provideFooterData,
    provideError,
    providePageToShow,
    isSubPageLoaded,
} = AppSlice.actions
export default AppSlice.reducer
