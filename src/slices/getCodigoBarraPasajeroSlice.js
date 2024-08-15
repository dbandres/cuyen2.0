import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const getCodigoBarraPasajero = createAsyncThunk('getCodigoBarraPasajero', async (data) => {
  try {
    const response = await axios.get(`${API_URL}/cuotas/allfee/${data.num}/${data.id}`, {
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

export const resetcodigoBarra = () => ({
  type: 'resetcodigoBarra/reset'
});

const codigoBarraSlice = createSlice({
  name: 'codigoBarraSlice',
  initialState: {
    codigoBarra: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetcodigoBarraState: (state) => {
      state.codigoBarra = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getCodigoBarraPasajero.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getCodigoBarraPasajero.fulfilled, (state, action) => {
        state.loading = false,
          state.codigoBarra = action.payload
      })
      .addCase(getCodigoBarraPasajero.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

export const { resetcodigoBarraState } = codigoBarraSlice.actions;

const codigoBarraReducer = codigoBarraSlice.reducer
export default codigoBarraReducer;