import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const selectCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {
    setSelectedCategory: (state,action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedCategory} = selectCategorySlice.actions

export default selectCategorySlice.reducer
