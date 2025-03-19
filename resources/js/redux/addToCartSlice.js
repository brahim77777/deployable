// addToCartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
};

const addToCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      // Check if the item is already in the cart
      const existingItem = state.value.find(item => item.slug === action.payload.slug);
      if (existingItem) {
        // If item exists, increase the quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // If item does not exist, add it to the cart
        state.value.push(action.payload);
      }
    },
    remove: (state, action) => {
      state.value = state.value.filter(item => item.slug !== action.payload.slug);
    },
    updateQuantity: (state, action) => {
      const existingItem = state.value.find(item => item.slug === action.payload[0]);
      if (existingItem) {
        existingItem.quantity = action.payload[1];
      }
    },
  },
});

export const { add, remove, updateQuantity } = addToCartSlice.actions


export default addToCartSlice.reducer;

// 'id':product.id,
// 'title' : product.title,
// 'category_id':product.category,
// 'main_image':product.main_image,
// 'description':product.description,
// 'color':color,
// 'size':size,
// 'price':product.price,
// 'rating':product.rating,
// 'slug':product.slug,
// 'quantity':qnt,
