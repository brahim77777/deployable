import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    setRefresh: (state,action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRefresh } = refreshSlice.actions

export default refreshSlice.reducer
