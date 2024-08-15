import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const resetUserVerify = () => ({
  type: 'userVerify/reset'
});

export const getVerifyUser = createAsyncThunk('getVerifyUser', async(num)=>{
  try {
    const response = await axios.get(`${API_URL}/usuarios/verify/${num}`,{
      headers: {
        'x-access-token': `${token}`,
        "Content-Type": "application/json",
      }
    })
    if(response.status === 200){
      return 'Usted ya cuenta con un usuario existente, si olvidó la contraseña presione el botón “Olvidé mi contraseña” o comuníquese con el  4293-8080'
    }
  } catch (error) {
    throw error
  }
})


const verifyUserSlice = createSlice({
  name: 'userVerify',
  initialState: {
    userVerify: '',
    loading: false,
    error: null,
  },
  reducers: {
    resetUserVerifyState: (state) => {
      state.userVerify = '';
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (buider) => {
    buider
      .addCase(getVerifyUser.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getVerifyUser.fulfilled, (state, action) => {
        state.loading = false,
          state.userVerify = action.payload
      })
      .addCase(getVerifyUser.rejected, (state, action) => {
        state.loading = false,
        state.error = 'No existe ningún Usuario registrado.';
      })
  }
})

const userVerifyReducer = verifyUserSlice.reducer
export const { resetUserVerifyState } = verifyUserSlice.actions;
export default userVerifyReducer;