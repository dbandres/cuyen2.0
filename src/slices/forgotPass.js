import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';


const forgotPassSlice = createSlice({
  name: 'forgotPassSlice',
  initialState: {
    forgotPas: [],
    loading: false,
    error: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.forgotPas = []
    }
  },
  extraReducers: (buider) => {
    buider
      .addCase(postResetPassForm.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(postResetPassForm.fulfilled, (state, action) => {
        state.loading = false,
        state.forgotPas = action.payload
      })
      .addCase(postResetPassForm.rejected, (state, action) => {
        state.loading = false,
        state.error = action.error.message
      })
  }
})

const forgotPassReducer = forgotPassSlice.reducer;
export const { setStatus, setError, setLoading } = forgotPassSlice.actions;
export default forgotPassReducer;

export const postResetPassForm = createAsyncThunk('postResetPassForm', async (data) => {
  console.log(data);
  if (data) {
    try {
      const response = await axios.post(`${API_URL}/resetapp`,
        {
          usuario: data.dniUser
        },
        {
          headers: {
            'x-access-token': `${token}`,
            "Content-Type": "application/json",
          }
        })
      console.log('esto es response: ',response.data);
      return response.data;
    } catch (error) {
      throw error
    }
  } else {
    console.log('Errorrrr');
  }
})