// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, Fragment, useState } from 'react'

// ** Third Party Components
import InputNumber from 'rc-input-number'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ShoppingCart, X, Plus, Minus } from 'react-feather'

// ** Reactstrap Imports
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Badge, Button } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/libs/input-number/input-number.scss'
import { setCart } from '../../../../redux/appCart'

const CartDropdown = () => {
  // ** State
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [total, setTotal] = useState(0);
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.cart)
  // ** ComponentDidMount
  const updateTotal = () => {
    let newTotal = 0;
    store.cart.forEach(item => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal.toFixed(2));
  };

  const handleMinusClick = (id) => {

    let cartItemIndex = store.cart.findIndex(cartItem => cartItem.id === id);

    if (cartItemIndex !== -1 && store.cart[cartItemIndex].quantity > 1) {
      // If the item already exists in the cart
      const updatedCartItems = [...store.cart];

      updatedCartItems[cartItemIndex] = {
        ...store.cart[cartItemIndex],
        quantity: store.cart[cartItemIndex].quantity - 1
      };

      dispatch(setCart(updatedCartItems));
      updateTotal();
    }
  }
  const handlePlusClick = (id) => {

    let cartItemIndex = store.cart.findIndex(cartItem => cartItem.id === id);

    if (cartItemIndex !== -1) {
      // If the item already exists in the cart
      const updatedCartItems = [...store.cart];
      updatedCartItems[cartItemIndex] = {
        ...store.cart[cartItemIndex],
        quantity: store.cart[cartItemIndex].quantity + 1
      };

      dispatch(setCart(updatedCartItems));
      updateTotal();
    }
  }
  const deleteCartItem = (id) => {
    let updatedCartItems = [...store.cart];
    const cartItemIndex = updatedCartItems.findIndex(cartItem => cartItem.id === id);

    if (cartItemIndex !== -1) {



      // Remove the item from the cart when the quantity becomes zero or negative
      updatedCartItems = updatedCartItems.filter(cartItem => cartItem.id !== id);


      dispatch(setCart(updatedCartItems));
      updateTotal();
    }
  }

  // ** Function to toggle Dropdown
  const toggle = () => setDropdownOpen(prevState => !prevState)

  
  useEffect(() => {
    // Calculate and set the total on page load
    updateTotal();
  }, [store.cart]);
  // ** Loops through Cart Array to return Cart Items
  const renderCartItems = () => {
    if (store.cart.length) {


      return (
        <Fragment>
          <PerfectScrollbar
            className='scrollable-container media-list'
            options={{
              wheelPropagation: false
            }}
          >
            {store.cart.map(item => {


              return (
                <div key={item.id} className='list-item align-items-center'>
                  <img className='d-block rounded me-1' src={item.img} alt={item.name} width='62' />
                  <div className='list-item-body flex-grow-1'>
                    <X size={14} className='cart-item-remove' onClick={() => deleteCartItem(item.id)} />
                    <div className='media-heading'>
                      <h6 className='cart-item-title'>

                        {item.name}

                      </h6>
                    </div>
                    <div className='cart-item-qty'>
                      <InputNumber
                        min={1}
                        max={10}
                        upHandler={<Plus onClick={() => handlePlusClick(item.id)} />}
                        className='cart-input'
                        defaultValue={item.quantity}
                        downHandler={<Minus onClick={() => handleMinusClick(item.id)} />}
                      />
                    </div>
                    <h5 className='cart-item-price'>${item.price}</h5>
                  </div>
                </div>
              )
            })}
          </PerfectScrollbar>
          <li className='dropdown-menu-footer'>
            <div className='d-flex justify-content-between mb-1'>
              <h6 className='fw-bolder mb-0'>Total:</h6>
              <h6 className='text-primary fw-bolder mb-0'>${Number(total)}</h6>
            </div>
            <Button tag={Link} to='/checkout' color='primary' block onClick={toggle}>
              Checkout
            </Button>
          </li>
        </Fragment>
      )
    } else {
      return <p className='m-0 p-1 text-center'>Your cart is empty</p>
    }
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} tag='li' className='dropdown-cart nav-item me-25'>
      <DropdownToggle tag='a' className='nav-link position-relative'>
        <ShoppingCart className='ficon' />
        {store.cart.length > 0 ? (
          <Badge pill color='primary' className='badge-up'>
            {store.cart.length}
          </Badge>
        ) : null}
      </DropdownToggle>
      <DropdownMenu end tag='ul' className='dropdown-menu-media dropdown-cart mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem tag='div' className='d-flex' header>
            <h4 className='notification-title mb-0 me-auto'>My Cart</h4>
            <Badge color='light-primary' pill>
              {store.cart.length || 0} Items
            </Badge>
          </DropdownItem>
        </li>
        {renderCartItems()}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CartDropdown
