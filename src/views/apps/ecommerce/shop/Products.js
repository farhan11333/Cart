// ** React Imports
import { Fragment } from 'react'

// ** Product components
import ProductCards from './ProductCards'
import ProductsHeader from './ProductsHeader'

// ** Reactstrap Imports
import {  Spinner } from 'reactstrap'


const ProductsPage = props => {
  // ** Props
  const {
    store,
    dispatch,
    addToCart,
    activeView,
    setActiveView,
    deleteCartItem,
    setSidebarOpen,
    deleteWishlistItem
  } = props


 

  const Loader = () => {
    return (
      <Fragment >
        <div className='text-center justify-content-center'>


          <Spinner color='primary' />
        </div>
      </Fragment>
    )
  }
  return (
    <div className='content-detached '>
      <div className='content-body'>
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />

        {store.isProductsLoading ? (

          <Loader />
        ) : store.products.length ? (
          <Fragment>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={store.products}
              deleteCartItem={deleteCartItem}
            />

          </Fragment>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
