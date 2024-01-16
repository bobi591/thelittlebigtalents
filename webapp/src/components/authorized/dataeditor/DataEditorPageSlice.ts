import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { provideError } from '../../../AppSlice'
import Backend from '../../../datasource/Backend'
import InformationPageData from '../../../datasource/models/InformationPageData'
import InformationPageGalleryBottomData from '../../../datasource/models/InformationPageGalleryBottomData'

export type DataEditorPageState = {
    jsonEditorKey: number
    selectedDataType?: string
    data?: unknown
    originalData?: unknown
    editPagesActions?: Map<
        string,
        (
            pageName: string
        ) => Promise<InformationPageData | InformationPageGalleryBottomData>
    >
}

const initialState: DataEditorPageState = {
    jsonEditorKey: 100,
    selectedDataType: undefined,
    data: undefined,
    originalData: undefined,
    editPagesActions: undefined,
}

export const fetchEditPageActions = createAsyncThunk(
    'dataEditorPageSlice/fetchEditPageActions',
    async () => {
        try {
            const pageMetadata = await Backend.getPagesMetadata()
            const actions = new Map<
                string,
                (
                    pageName: string
                ) => Promise<
                    InformationPageData | InformationPageGalleryBottomData
                >
            >()
            pageMetadata.map((pageMetadata) => {
                if (pageMetadata.typeName === 'InformationPage') {
                    actions.set(
                        pageMetadata.pageName,
                        Backend.getInformationPageData.bind(Backend)
                    )
                    return
                }
                if (pageMetadata.typeName === 'InformationPageGalleryBottom') {
                    actions.set(
                        pageMetadata.pageName,
                        Backend.getInformationPageGalleryBottomData.bind(
                            Backend
                        )
                    )
                    return
                }
                throw 'Page type not recognized! ' + pageMetadata.typeName
            })
            return actions
        } catch (error) {
            provideError(error as Error)
            return undefined
        }
    }
)

const DataEditorPageSlice = createSlice({
    name: 'dataEditorPageSlice',
    initialState: initialState,
    reducers: {
        updateJsonEditorKey(state) {
            state.jsonEditorKey = state.jsonEditorKey + 1
        },
        updateSelectedDataType(state, action: PayloadAction<string>) {
            state.selectedDataType = action.payload
        },
        updateData(state, action: PayloadAction<unknown>) {
            state.data = action.payload
        },
        updateOriginalData(state, action: PayloadAction<unknown>) {
            state.originalData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEditPageActions.fulfilled, (state, action) => {
            state.editPagesActions = action.payload
        })
    },
})

export const {
    updateJsonEditorKey,
    updateSelectedDataType,
    updateData,
    updateOriginalData,
} = DataEditorPageSlice.actions
export default DataEditorPageSlice.reducer
