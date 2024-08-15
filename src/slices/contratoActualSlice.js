import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numero: null
};

const contratoActualSlice = createSlice({
  name: 'contratoActual',
  initialState,
  reducers: {
    setNumeroContrato(state, action) {
      state.numero = action.payload;
    }
  }
});

export const { setNumeroContrato } = contratoActualSlice.actions;
export default contratoActualSlice.reducer;
