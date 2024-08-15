import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

const promoSlice = createSlice({
  name: 'promo',
  initialState:{
    promos:[],
    loading: false,
    error: null,
    headers: {},
  },
  reducers:{
    setPromos: (state, action) => {
      state.promos = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setHeaders: (state, action) => {
      state.headers = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
    .addCase(fetchPromos.pending, (state)=>{
      state.loading = true,
      state.error = null
    })
    .addCase(fetchPromos.fulfilled, (state, action)=>{
      state.loading = false,
      state.promos = action.payload
    })
    .addCase(fetchPromos.rejected, (state, action)=>{
      state.loading = false,
      state.error = action.error.message
    })
  }
});
const promoReducer = promoSlice.reducer;
export const {setPromos, setError, setLoading, setHeaders} = promoSlice.actions;
export default promoReducer;

export const fetchPromos = createAsyncThunk('fetchPromos', async()=>{
  try {
    const response = await axios.get(`${API_URL}/inicio/order`,{
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

