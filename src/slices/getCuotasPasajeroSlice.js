import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const getCuotaPasajero = createAsyncThunk('getCuotaPasajero', async (data) => {
  try {
    const response = await axios.get(`${API_URL}/cuotas/statusfee/${data.num}/${data.id}`, {
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

export const resetcuotasPasajero = () => ({
  type: 'resetcuotasPasajero/reset'
});

const cuotasPasajeroSlice = createSlice({
  name: 'cuotasPasajeroSlice',
  initialState: {
    cuotasPasajero: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetcuotasPasajeroState: (state) => {
      state.cuotasPasajero = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getCuotaPasajero.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getCuotaPasajero.fulfilled, (state, action) => {
        state.loading = false,
          state.cuotasPasajero = action.payload
      })
      .addCase(getCuotaPasajero.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

export const { resetcuotasPasajeroState } = cuotasPasajeroSlice.actions;

const cuotasPasajeroReducer = cuotasPasajeroSlice.reducer
export default cuotasPasajeroReducer;