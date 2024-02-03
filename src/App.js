import { useEffect } from 'react'
import Router from './router/Router'

import { productsService } from './services/productsService';
import { setProducts, setProductsManagmentToInitialState,setLoading } from './redux/appCart';
import { useDispatch, useSelector } from 'react-redux';


function App(){
   const dispatch = useDispatch()
    const products = useSelector((state) => state.cart.products)
    const {isFetching,gettingProducts}=  productsService.getProducts(
        "get-products",
        {
          onSuccess: (response) => {
            if (response.status==200) {
                
                dispatch(setProducts(
                    response?.data
                  ))
                  dispatch(setLoading(false))
            } else {
              dispatch(setProductsManagmentToInitialState())
            }
          },
          onError: (error) => {
            
            dispatch(setProductsManagmentToInitialState())
          },
        }
      );
    
    return(
        
    <Router />
  
    )
}

export default App
