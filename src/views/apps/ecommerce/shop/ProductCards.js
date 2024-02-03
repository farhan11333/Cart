// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import { ShoppingCart } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Row, Col } from 'reactstrap';
import { setCart } from '../../../../redux/appCart';

import { useSelector } from 'react-redux';
import { useState } from 'react';

const ProductCards = (props) => {
  const cartItems = useSelector((store) => store.cart.cart);
  const storeProducts = useSelector((store) => store.cart.products);

  // State for filter and dropdown
  const [filter, setFilter] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  // Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      let cartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === id);

      if (cartItemIndex !== -1) {
        // If the item already exists in the cart
        const updatedCartItems = [...cartItems];
        updatedCartItems[cartItemIndex] = {
          ...cartItems[cartItemIndex],
          quantity: cartItems[cartItemIndex].quantity + 1,
        };

        dispatch(setCart(updatedCartItems));
      } else {
        // If the item is not in the cart, add a new entry
        let product = storeProducts.find((prod) => prod.id === id);

        if (product) {
          const updatedProductItem = { ...product, quantity: 1 };
          dispatch(setCart([...cartItems, updatedProductItem]));
        }
      }
    }
  };

  // Renders products based on filter
  const renderProducts = () => {
    const filteredProducts = filter ? props.products.filter((item) => item.colour === filter) : props.products;

    if (filteredProducts.length) {
      return filteredProducts.map((item) => {
        const CartBtnTag = item?.isInCart ? Link : 'button';

        return (
          <Card className='ecommerce-card  w-25 h-25' key={item.name}>
            <div>
              <div className='item-img text-center mx-auto '>
                <img className='img-fluid card-img-top height-250' src={item?.img} alt={item.name} />
              </div>
            </div>

            <CardBody>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h6 className='item-price'>${item.price}</h6>
                </div>
              </div>

              <h6 key={item.id} className='item-name text-truncate'>
                {item?.name}
              </h6>
              <CardText className='item-description'>{item?.colour}</CardText>
            </CardBody>
            <div className='item-options text-center pb-1'>
              <Button
                color='primary'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={() => handleCartBtn(item.id, false)}
              >
                <ShoppingCart className='me-50' size={14} />
                <span>{item?.isInCart ? 'View In Cart' : 'Add To Cart'}</span>
              </Button>
            </div>
          </Card>
        );
      });
    } else {
      return <p>No products match the selected filter.</p>;
    }
  };

  return (
    <div>
     <Row className='mb-2'>
        <Col sm={2}>
          <Input type="select" name="select" id="colorFilter" onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Stone">Stone</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
          </Input>
        </Col>
      </Row>
      <div
        className={classnames({
          'grid-view d-flex gap-2': props?.activeView === 'grid',
          'list-view': props?.activeView === 'list',
        })}
      >
        {renderProducts()}
      </div>
    </div>
  );
};

export default ProductCards;
