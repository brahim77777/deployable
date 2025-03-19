import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true,
}

export const openProductsSlice = createSlice({
  name: 'openProductsState',
  initialState,
  reducers: {
    openProducts: (state, action) => {
        if (typeof action.payload === 'undefined') {
          state.value = !state.value;
        } else {
          state.value = action.payload;
        }
      },
    },
  });

  
export const { openProducts } = openProductsSlice.actions

export default openProductsSlice.reducer
