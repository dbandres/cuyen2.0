import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, token } from '../api';


const contratosSlice = createSlice({
  name:'contratosSlice',
  initialState:{
    contratos:[],
    loading: false,
    error: null,
    headers: {},
  },
  reducers:{
    setContratos: (state, action) => {
      state.contratos = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setHeaders: (state, action) => {
      state.headers = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
    .addCase(fetchContratos.pending, (state)=>{
      state.loading = true,
      state.error = null
    })
    .addCase(fetchContratos.fulfilled, (state, action)=>{
      state.loading = false,
      state.contratos = action.payload
    })
    .addCase(fetchContratos.rejected, (state, action)=>{
      state.loading = false,
      state.error = action.error.message
    })
  }
})

const contratosReducer = contratosSlice.reducer;
export const {setContratos, setError, setLoading, setHeaders} = contratosSlice.actions;
export default contratosReducer;

export const fetchContratos = createAsyncThunk('fetchContratos', async()=>{
  try {
    const response = await axios.get(`${API_URL}/contrato`,{
      headers: {
        'x-access-token': `${token}`,
        "Content-Type": "application/json",
      }
    })
    return response.data;
  } catch (error) {
    throw error
  }
})