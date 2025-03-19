import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const refreshCategoriesSlice = createSlice({
  name: 'refreshCategoriesState',
  initialState,
  reducers: {
    setRefreshCategories: (state) => {
      state.value = !state.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRefreshCategories } = refreshCategoriesSlice.actions

export default refreshCategoriesSlice.reducer
