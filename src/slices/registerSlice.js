import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

const registerSlice = createSlice({
  name: 'registerSlice',
  initialState: {
    register: [],
    loading: false,
    error: null,
  },
  extraReducers: (buider) => {
    buider
      .addCase(registerAuth.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(registerAuth.fulfilled, (state, action) => {
        state.loading = false,
          state.register = action.payload
      })
      .addCase(registerAuth.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

const registerReducer = registerSlice.reducer;
export default registerReducer;

export const registerAuth = createAsyncThunk('loginAut', async (data) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios`,data,
      {
        headers: {
          'x-access-token': `${token}`,
          "Content-Type": "application/json",
        }
      })
    if (response.status === 200) {
      console.log(data);
      //const respFirebase = await auth().createUserWithEmailAndPassword(data.email, data.password)
      return response.data;
    }
  } catch (error) {
    throw error
  }
})