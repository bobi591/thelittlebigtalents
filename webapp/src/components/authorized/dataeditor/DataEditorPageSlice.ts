import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DataEditorPageState = {
    jsonEditorKey: number
    selectedDataType?: string
    data?: unknown
    originalData?: unknown
}

const initialState: DataEditorPageState = {
    jsonEditorKey: 100,
    selectedDataType: undefined,
    data: undefined,
    originalData: undefined,
}

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
})

export const {
    updateJsonEditorKey,
    updateSelectedDataType,
    updateData,
    updateOriginalData,
} = DataEditorPageSlice.actions
export default DataEditorPageSlice.reducer
