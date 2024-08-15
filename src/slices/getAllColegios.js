import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const getColegios = createAsyncThunk('getColegios', async(num)=>{
  try {
    const response = await axios.get(`${API_URL}/colegios`,{
      headers: {
        'x-access-token': `${token}`,
        "Content-Type": "application/json",
      }
    })
    if(response.status === 200){
      return response.data
    }
  } catch (error) {
    throw error
  }
})
const allColegiosSlice = createSlice({
  name: 'colegios',
  initialState: {
    colegios: [],
    loading: false,
    error: null,
  },
  extraReducers: (buider) => {
    buider
      .addCase(getColegios.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getColegios.fulfilled, (state, action) => {
        state.loading = false,
          state.colegios = action.payload
      })
      .addCase(getColegios.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload;
      })
  }
})

const allColegiosReducer = allColegiosSlice.reducer
export default allColegiosReducer;