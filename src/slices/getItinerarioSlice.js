import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const getItinerario = createAsyncThunk('getItinerario', async (num) => {
  try {
    const response = await axios.get(`${API_URL}/itinerario/contract/${num}`, {
      headers: {
        'x-access-token': `${token}`,
        "Content-Type": "application/json",
      }
    })
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error
  }
})

export const resetItinerario = () => ({
  type: 'resetItinerario/reset'
});

const itinerarioSlice = createSlice({
  name: 'itinerarioSlice',
  initialState: {
    itinerario: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetItinerarioState: (state) => {
      state.itinerario = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getItinerario.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getItinerario.fulfilled, (state, action) => {
        state.loading = false,
          state.itinerario = action.payload
      })
      .addCase(getItinerario.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

export const { resetItinerarioState } = itinerarioSlice.actions;

const itinerarioReducer = itinerarioSlice.reducer
export default itinerarioReducer;