import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    login: [],
    loading: false,
    error: null,
  },
  extraReducers: (buider) => {
    buider
      .addCase(loginAut.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(loginAut.fulfilled, (state, action) => {
        state.loading = false,
          state.login = action.payload
      })
      .addCase(loginAut.rejected, (state, action) => {
        state.loading = false,
          state.error = action.error.message
      })
  }
})

const loginReducer = loginSlice.reducer;
export default loginReducer;

export const loginAut = createAsyncThunk('loginAut', async (data) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/${data.dniUser}/${data.passUser}`,
      {
        headers: {
          'x-access-token': `${token}`,
          "Content-Type": "application/json",
        }
      })
    if (response.status === 200) {
      AsyncStorage.setItem('userStorage', JSON.stringify(response.data))
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error
  }
})