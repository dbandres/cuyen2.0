import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

const infoSlice = createSlice({
  name: 'info',
  initialState:{
    info:[],
    loading: false,
    error: null,
    headers: {},
  },
  reducers:{
    setInfo: (state, action) => {
      state.promos = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.loading = action.payload
    },
    setHeaders: (state, action) => {
      state.headers = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
    .addCase(fetchInfo.pending, (state)=>{
      state.loading = true,
      state.error = null
    })
    .addCase(fetchInfo.fulfilled, (state, action)=>{
      state.loading = false,
      state.info = action.payload
    })
    .addCase(fetchInfo.rejected, (state, action)=>{
      state.loading = false,
      state.error = action.error.message
    })
  }
});
const infoReducer = infoSlice.reducer;
export const {setInfo, setError, setLoading, setHeaders} = infoSlice.actions;
export default infoReducer;

export const fetchInfo = createAsyncThunk('fetchInfo', async()=>{
  try {
    const response = await axios.get(`${API_URL}/texto/order`,{
      headers: {
        'x-access-token': `${token}`,
        "Content-Type": "application/json",
      }
    })
    return response.data;
  } catch (error) {
    throw error
  }
})
