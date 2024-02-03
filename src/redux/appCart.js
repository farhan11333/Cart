import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  cart: [],
  products: [],
  isProductsLoading:true
  
 }
export const CartSlice = createSlice({
    name: 'appCart',
    initialState,
    reducers: {
      setProducts: (state, action) => {
        state.products = action.payload
      },
      setCart: (state, action) => {
        state.cart = action.payload
      }, 
      setProductsManagmentToInitialState: (state, action) => {
        state.products = initialState.products
      },
      setCartToInitialState: (state, action) => {
        state.cart = initialState.cart
      },
      setLoadingToInitialState: (state, action) => {
        state.isProductsLoading = initialState.isProductsLoading
      },
      setLoading: (state, action) => {
        state.isProductsLoading = action.payload
      }
  }
  })
  
  export default CartSlice.reducer
  export const { setProducts, setCart,setProductsManagmentToInitialState,setCartToInitialState,setLoadingToInitialState,setLoading} = CartSlice.actions;