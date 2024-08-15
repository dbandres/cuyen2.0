import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const getHotelByNum = createAsyncThunk('getHotelByNum', async(num)=>{
  console.log( 'esto es num: ',num);
  try {
    const response = await axios.get(`${API_URL}/hoteles/${num}`,{
      headers: {
        'x-access-token': `${token}`,
        "Content-Type": "application/json",
      }
    })
    if(response.status === 200){
      return response.data;
    }
  } catch (error) {
    throw error
  }
})


const hotelSlice = createSlice({
  name: 'hotelSlice',
  initialState: {
    hotel: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearStateHotel: (state) => {
      state.hotel = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getHotelByNum.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getHotelByNum.fulfilled, (state, action) => {
        state.loading = false,
          state.hotel = action.payload
      })
      .addCase(getHotelByNum.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})
export const { clearStateHotel } = hotelSlice.actions;

const hotelReducer = hotelSlice.reducer
export default hotelReducer;