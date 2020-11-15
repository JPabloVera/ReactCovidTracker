import { createSlice,configureStore, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchCountry} from './hooks'

const trackState = {
    countrySearch: 'world',
    searching: false,
    cache: {},
    error: null,
}

export const loadCountryAsync = createAsyncThunk("track/loadCountryAsync",async (country)=>{
        const reponse =  fetchCountry(country)
        return await reponse
})

export const trackSlice = createSlice({
    name:'track',
    initialState: trackState,
    reducers: {
        setCountry: (state,action) => {state.countrySearch = action.payload},
        setSearchingState: (state,action) => {
            state.searching = action.payload
        }
    },
    extraReducers: {
        [loadCountryAsync.pending] : (state,action) => {
            console.log(action)
        },
        [loadCountryAsync.fulfilled] : (state,action) => {
            state.cache[action.payload.Country] = action.payload
        },
        [loadCountryAsync.rejected] : (state,action) => {
            state.error = action.payload
        }
    }
})


export const store = configureStore({
    reducer:{
        search: trackSlice.reducer
    }
  });
