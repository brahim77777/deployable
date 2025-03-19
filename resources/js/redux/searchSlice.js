import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const searchSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    search: (state,action) => {
      state.value = action.payload;
    },
  },
})

export const { search } = searchSlice.actions

export default searchSlice.reducer
