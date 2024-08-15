import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';


const contactFormSlice = createSlice({
  name: 'contactFormSlice',
  initialState: {
    status: '',
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
    }
  },
  extraReducers: (buider) => {
    buider
      .addCase(postContactForm.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(postContactForm.fulfilled, (state, action) => {
        console.log('Action payload:', action.payload);
        state.loading = false,
        state.status = action.payload
      })
      .addCase(postContactForm.rejected, (state, action) => {
        state.loading = false,
        state.error = action.error.message
      })
  }
})

const formContactReducer = contactFormSlice.reducer;
export const { setStatus, setError, setLoading } = contactFormSlice.actions;
export default formContactReducer;

export const postContactForm = createAsyncThunk('postContactForm', async (data) => {
  if (data.mensaje && data.namecomplete && data.phone && data.useremail) {
    try {
      const response = await axios.post(`${API_URL}/contacto`,
        {
          nombre: data.namecomplete,
          mail: data.useremail,
          telefono: data.phone,
          comentario: data.mensaje,
          horario: "",
          leido: false
        },
        {
          headers: {
            'x-access-token': `${token}`,
            "Content-Type": "application/json",
          }
        })
      console.log('esto es response: ',response.status);
      return response.status;
    } catch (error) {
      throw error
    }
  } else {
    console.log('Errorrrr');
  }
})