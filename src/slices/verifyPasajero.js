import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const verifyPas = createAsyncThunk('verifyPas', async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const response = await axios.get(`${API_URL}/pasajero/verify/${data.dni}/${data.numeroContrato}/${data.id}`, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      }
    });
    // si el pasajero existe pero con otro numero de contrato
    if (response.status === 200) {
      return { data: response.data, status: response.status };
    }
    // el usuario ya se encuentra relacionado y se muestra en su lista de pasajeros
    if(response.status === 201){
      return { data: response.data.message, status: response.status };
    }
    // el usuario ya existe en ese mismo contrato pero esta asociado a otro usuario padre
    if( response.status === 202){
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    if (error.response) {
      return rejectWithValue({ data: error.response.data, status: error.response.status });
    }
    return rejectWithValue({ data: 'Network Error', status: null });
  }
});

const verifyPasajeroSlice = createSlice({
  name: 'verifyPasajeroSlice',
  initialState: {
    verifyPasajero: [],
    loading: false,
    error: null,
    status: null,
  },
  reducers: {
    clearState: (state) => {
      state.verifyPasajero = [];
      state.loading = false;
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyPas.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(verifyPas.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyPasajero = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(verifyPas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data || action.error.message;
        state.status = action.payload.status;
      });
  }
});
export const { clearState } = verifyPasajeroSlice.actions;

const verifyPasajeroReducer = verifyPasajeroSlice.reducer;
export default verifyPasajeroReducer;
