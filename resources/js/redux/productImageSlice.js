import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: import.meta.env.VITE_APP_PRODUCT_IMAGE1,
}

export const productImageSlice = createSlice({
  name: 'productImage',
  initialState,
  reducers: {
    changeImage: (state,action) => {
      state.value = action.payload;
    },
    refresh: (state) => {
      state.value = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeImage ,refresh} = productImageSlice.actions

export default productImageSlice.reducer
