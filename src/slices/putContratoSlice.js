import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';
import { getContrato } from './getContratoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const putContratoRequest = createAsyncThunk('putContratoRequest', async (data, { dispatch }) => {
  console.log(data);
  try {
    const response = await axios.put(`/usuarios/${data.id}`,
      {
        contrato: data.allContratos
      }
      , {
        headers: {
          'x-access-token': `${token}`,
          "Content-Type": "application/json",
        }
      })
    if (response.status === 200) {
      const dato = await AsyncStorage.getItem("userStorage")
      const parseado = JSON.parse(dato)
      parseado.usuario.contrato = data.allContratos,
        AsyncStorage.setItem('userStorage', JSON.stringify(parseado))
      dispatch(getContrato(data.allContratos))
      return response.data;
    }
  } catch (error) {
    throw error
  }
})

const putContratoSlice = createSlice({
  name: 'putContratoSlice',
  initialState: {
    putContrato: '',
    loading: false,
    error: null,
  },
  extraReducers: (buider) => {
    buider
      .addCase(putContratoRequest.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(putContratoRequest.fulfilled, (state, action) => {
        state.loading = false,
          state.putContrato = action.payload
      })
      .addCase(putContratoRequest.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

const putContratoReducer = putContratoSlice.reducer;
export default putContratoReducer