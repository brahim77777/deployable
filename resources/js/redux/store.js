import { configureStore } from '@reduxjs/toolkit'
import productCounterReducer from './productImageSlice'
import addToCartReducer from './addToCartSlice'
import changeThemeReducer from './changeThemeSlice'
import changeImageReducer from './productImageSlice'
import changeLangReducer from './changeLangSlice'
import openStatReducer from './openStatSlice'
import sideBarReducer from './sideBarSlice'
import authReducer from './authSlice'
import refreshReducer from './refreshSlice'
import openProductsReducer from './openProductsSlice'
import searchReducer from './searchSlice'
import refreshCategoriesReduer from './refreshCategoriesSlice'
import pageReducer from './pageSlice'
import filtersReducer from './filtersSlice'
import dataToUpdateReducer from "./updateProductSlice"
import selectedCategoryReducer from "./selectCategorySlice"
import addToFavoriteReducer from "./addToFavorite"

export const store = configureStore({
  reducer: {
    productCounter: productCounterReducer,
    cart:addToCartReducer,
    changeTheme:changeThemeReducer,
    productImage:changeImageReducer,
    changeLang:changeLangReducer,
    openStatState:openStatReducer,
    sideBar:sideBarReducer,
    auth:authReducer,
    refresh:refreshReducer,
    openProductsState:openProductsReducer,
    products:searchReducer,
    refreshCategoriesState:refreshCategoriesReduer,
    page:pageReducer,
    filtersList:filtersReducer,
    dataToUpdate:dataToUpdateReducer,
    selectedCategory:selectedCategoryReducer,
    favorite:addToFavoriteReducer
  }
})
