import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Input, Card, CardBody, Badge } from 'reactstrap';
import { setCart } from '../../../../../redux/appCart';
import InputNumber from 'rc-input-number';

const CartItem = ({ cartItem, handleMinusClick, handlePlusClick, deleteCartItem }) => {
  const currProduct = useSelector(state => state.cart.products.find(product => product.id === cartItem.id));

  return (
    <Card key={cartItem.id} className='mb-2'>
      <CardBody>
        <Row>
          <Col xs="1">
            <div className="item-image-placeholder" style={{ height: '100px' }}>
              <img className='d-block rounded me-1' src={cartItem.img} alt={cartItem.name} width='62' />
            </div>
          </Col>
          <Col xs="8">
            <div>{currProduct.name}</div>
            <Badge color='primary' pill>
              <div>Price: {currProduct.price}</div>
            </Badge>
          </Col>
          <Col xs="3">
            <div className='cart-item-qty'>
              <InputNumber
                min={1}
                max={10}
                className='cart-input'
                value={cartItem.quantity}
                upHandler={<Plus onClick={() => handlePlusClick(cartItem.id)} />}
                downHandler={<Minus onClick={() => handleMinusClick(cartItem.id)} />}
              />
            </div>
            <Button color="danger" size="sm" onClick={() => deleteCartItem(cartItem.id)}>
              Remove
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.cart);
  const cartItems = useSelector(state => state.cart.cart);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');

  const handleMinusClick = (id) => {
    const cartItemIndex = store.cart.findIndex(cartItem => cartItem.id === id);

    if (cartItemIndex !== -1 && store.cart[cartItemIndex].quantity > 1) {
      const updatedCartItems = [...store.cart];
      updatedCartItems[cartItemIndex] = {
        ...store.cart[cartItemIndex],
        quantity: store.cart[cartItemIndex].quantity - 1
      };

      dispatch(setCart(updatedCartItems));
      updateTotal();
    }
  };

  const handlePlusClick = (id) => {
    const cartItemIndex = store.cart.findIndex(cartItem => cartItem.id === id);

    if (cartItemIndex !== -1) {
      const updatedCartItems = [...store.cart];
      updatedCartItems[cartItemIndex] = {
        ...store.cart[cartItemIndex],
        quantity: store.cart[cartItemIndex].quantity + 1
      };

      dispatch(setCart(updatedCartItems));
      updateTotal();
    }
  };

  const deleteCartItem = (id) => {
    let updatedCartItems = [...store.cart];
    const cartItemIndex = updatedCartItems.findIndex(cartItem => cartItem.id === id);

    if (cartItemIndex !== -1) {
      updatedCartItems = updatedCartItems.filter(cartItem => cartItem.id !== id);
      dispatch(setCart(updatedCartItems));
      updateTotal();
    }
  };

  const updateTotal = () => {
    const newTotal = store.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal.toFixed(2));
  };

  useEffect(() => {
    // Calculate and set the total on page load
    updateTotal();
  }, [store.cart]);

  return (
    <Container>
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
      {(filter === '' ? cartItems : cartItems.filter(e => e.colour === filter)).map(cartItem => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          handleMinusClick={handleMinusClick}
          handlePlusClick={handlePlusClick}
          deleteCartItem={deleteCartItem}
        />
      ))}
      <Row className="text-end" style={{ marginRight: '13%' }}>
        <Col>
          <h3>Total: {total}</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
