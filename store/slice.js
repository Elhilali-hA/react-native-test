import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cle: '',
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCle: (state, action) => {
      state.cle = action.payload;
    },
  },
});

export const { setCle } = dataSlice.actions;

export default dataSlice.reducer;
