import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const openStatSlice = createSlice({
  name: 'openStatState',
  initialState,
  reducers: {
    openStat: (state, action) => {
      if (typeof action.payload === 'undefined') {
        state.value = !state.value;
      } else {
        state.value = action.payload;
      }
    },
  },
});

export const { openStat } = openStatSlice.actions;

export default openStatSlice.reducer;
