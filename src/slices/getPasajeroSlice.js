import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const getPasajero = createAsyncThunk('getPasajero', async (data) => {
  try {
    const response = await axios.get(`${API_URL}/pasajero/relationbyNum/${data.userdata}/${data.num}`, {
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

export const resetPasajero = () => ({
  type: 'resetPasajero/reset'
});

const pasajeroSlice = createSlice({
  name: 'pasajeroSlice',
  initialState: {
    pasajero: '',
    loading: false,
    error: null,
  },
  reducers: {
    resetPasajeroState: (state) => {
      state.pasajero = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getPasajero.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getPasajero.fulfilled, (state, action) => {
        state.loading = false,
          state.pasajero = action.payload
      })
      .addCase(getPasajero.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

export const { resetPasajeroState } = pasajeroSlice.actions;

const pasajeroReducer = pasajeroSlice.reducer
export default pasajeroReducer;