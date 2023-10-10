import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DataEditorPageState = {
    isValidating: boolean
    selectedDataType?: string
    data?: unknown
    originalData?: unknown
}

const initialState: DataEditorPageState = {
    isValidating: false,
    selectedDataType: undefined,
    data: undefined,
    originalData: undefined,
}

const DataEditorPageSlice = createSlice({
    name: 'dataEditorPageSlice',
    initialState: initialState,
    reducers: {
        updateIsValidating(state, action: PayloadAction<boolean>) {
            state.isValidating = action.payload
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
})

export const {
    updateIsValidating,
    updateSelectedDataType,
    updateData,
    updateOriginalData,
} = DataEditorPageSlice.actions
export default DataEditorPageSlice.reducer
