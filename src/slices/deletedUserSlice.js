import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';

export const putDeleteUser = createAsyncThunk('putDeleteUser', async (data) => {

  if (data) {
    try {
      const response = await axios.put(`${API_URL}/usuarios/${data.id}`,
        {
          estado: false
        },
        {
          headers: {
            'x-access-token': `${token}`,
            "Content-Type": "application/json",
          }
        })
        console.log('esto es data de respuesta: ', response.data);
      return response.data;
    } catch (error) {
      throw error
    }
  } else {
    console.log('Errorrrr');
  }
})

const deletedUserSlice = createSlice({
  name: 'deletedUser',
  initialState: {
    deleteUser: [],
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
      state.deleteUser = []
    }
  },
  extraReducers: (buider) => {
    buider
      .addCase(putDeleteUser.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(putDeleteUser.fulfilled, (state, action) => {
        state.loading = false,
        state.deleteUser = action.payload
      })
      .addCase(putDeleteUser.rejected, (state, action) => {
        state.loading = false,
        state.error = action.error.message
      })
  }
})

const deletedUserReducer = deletedUserSlice.reducer;
export const { setStatus, setError, setLoading } = deletedUserSlice.actions;
export default deletedUserReducer;