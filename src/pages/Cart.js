import styles from '../styles/cart.module.css';
import {connect } from 'react-redux';
function Cart(props){
  const {cart}=props;
  console.log(cart);
    return (
        <div id="navbar">
            <h1>Cart</h1>
        </div>
    )
}
function mapStateToProps(state)
{
  return {
    cart:state.cart
  }
}

const ConnectedCartComponent=connect(mapStateToProps)(Cart);
export default ConnectedCartComponent