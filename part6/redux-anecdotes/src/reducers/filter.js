import { createSlice } from "@reduxjs/toolkit"


const filterSlice = createSlice({
    name : 'filer',
    initialState : '',
    reducers : {
        setSearchFilter (state , action ){
            return action.payload
        },
        clearSearchFilter ( state , action) {
            return ''
        }
    }
})

export const { setSearchFilter  , clearSearchFilter} = filterSlice.actions

export default filterSlice.reducer