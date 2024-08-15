import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const getContrato = createAsyncThunk('getContrato', async(num)=>{
  console.log('get Contrato: ', num);
  try {
    if (Array.isArray(num)) {
      // Realizar todas las solicitudes HTTP en paralelo
      const promises = num.map(async (numItem) => {
        return await axios.get(`/contrato/${numItem}`, {
          headers: {
            'x-access-token': `${token}`,
            'Content-Type': 'application/json',
          }
        });
      });

      // Esperar a que todas las solicitudes se completen y obtener las respuestas
      const responses = await Promise.all(promises)
      return responses.map(response => response.data)
    }
  } catch (error) {
    console.log('Error de Axios getContratoByNum:', error);
  }
})


const contratoSlice = createSlice({
  name: 'contratoSlice',
  initialState: {
    contrato: [],
    loading: false,
    error: null,
  },
  extraReducers: (buider) => {
    buider
      .addCase(getContrato.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getContrato.fulfilled, (state, action) => {
        state.loading = false,
          state.contrato = action.payload
      })
      .addCase(getContrato.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

const contratoReducer = contratoSlice.reducer
export default contratoReducer;