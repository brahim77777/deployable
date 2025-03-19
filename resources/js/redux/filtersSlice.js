import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [
    { filterName: 'Color', value: [] },
    { filterName: 'Sizes', value: [] },
    { filterName: 'Category', value: [] },
  ]
}

export const filtersSlice = createSlice({
  name: 'filtersList',
  initialState,
  reducers: {
    setFiltersR: (state,action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFiltersR } = filtersSlice.actions

export default filtersSlice.reducer
