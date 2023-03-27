import styles from '../styles/cart.module.css';
import {connect } from 'react-redux';
import CartItem from '../components/CartItem';
function Cart(props){
  const {cart,dispatch}=props;
  console.log(cart);
  if(cart.length===0)
  {
    return (<h1 style={{textAlign:"center"}}>No Items In Cart</h1>)
  }
    return (
      <div >

      {cart.map((cartItem)=>{ return <CartItem cartItem={cartItem} dispatch={dispatch} key={`product-${cartItem.id}`} />})}
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