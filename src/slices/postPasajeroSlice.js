import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';
import { getPasajero } from './getPasajeroSlice';

export const pasajeroPost = createAsyncThunk('pasajeroPost', async (data,{ dispatch }) => {
  try {
    const response = await axios.post(`${API_URL}/pasajero`,data,
      {
        headers: {
          'x-access-token': `${token}`,
          "Content-Type": "application/json",
        }
      })
    if (response.status === 200) {
      const datos = {userdata: data.loginId, num: data.contrato[0]}
      dispatch(getPasajero(datos))
      return response.status;
    }
  } catch (error) {
    throw error
  }
})

const postPasajeroSlice = createSlice({
  name: 'postPasajeroSlice',
  initialState: {
    postPasajero: '',
    loading: false,
    error: null,
  },
  reducers: {
    resetPostPasajero: (state) => {
      state.postPasajero = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(pasajeroPost.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(pasajeroPost.fulfilled, (state, action) => {
        state.loading = false,
          state.postPasajero = action.payload
      })
      .addCase(pasajeroPost.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

export const { resetPostPasajero } = postPasajeroSlice.actions;

const postPasajeroReducer = postPasajeroSlice.reducer;
export default postPasajeroReducer;
