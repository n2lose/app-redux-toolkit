import { createSlice } from "@reduxjs/toolkit";

const initialFiltersState = {
    search: '',
    status: 'All',
    priorities: []
}

export default createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        // Redux toolkit IMMER allow assign as muatation but it still immuatate
        // Redux toolkit will support create creators filers/filterSearch
        filterSearch: (state, action) => {
            state.search = action.payload
        },
        filterStatus: (state, action) => {
            state.status = action.payload
        },
        filterPriorities: (state, action) => {
            state.priorities = action.payload
        }
    }
})