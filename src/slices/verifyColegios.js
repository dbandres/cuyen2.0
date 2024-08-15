import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const resetcolegioVerify = () => ({
  type: 'colegioVerify/reset'
});

export const postVerifyColegio = createAsyncThunk(
  'postVerifyColegio',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/colegios/verify`,
        {
          contrato: data.contrato,
          colegio: data.colegioSeleccionado.nombre
        },
        {
          headers: {
            'x-access-token': `${token}`,
            "Content-Type": "application/json",
          }
        }
      );
      if (response.status === 202) {
        return response.status;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.mensaje);
    }
  }
);

const verifycolegioSlice = createSlice({
  name: 'colegioVerify',
  initialState: {
    colegioVerify: '',
    loading: false,
    error: null,
  },
  reducers: {
    resetColegioVerifyState: (state) => {
      state.colegioVerify = '';
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postVerifyColegio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postVerifyColegio.fulfilled, (state, action) => {
        state.loading = false;
        state.colegioVerify = action.payload;
      })
      .addCase(postVerifyColegio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

const colegioVerifyReducer = verifycolegioSlice.reducer;
export const { resetColegioVerifyState } = verifycolegioSlice.actions;
export default colegioVerifyReducer;
