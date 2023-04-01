import { connect } from "react-redux";
import CartItem from "../components/CartItem";
function Cart(props) {
  const { cart, dispatch } = props;
  if (cart.length === 0) {
    // if cart is empty
    return <h1 style={{ textAlign: "center" }}>No Items In Cart</h1>;
  }
  return (
    <div>
      {cart.map((cartItem) => {
        return (
          <CartItem
            cartItem={cartItem}
            dispatch={dispatch}
            key={`product-${cartItem.id}`}
          />
        );
      })}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}
// using connect HOC to connect Cart component to store with dispatch and cart as prop
const ConnectedCartComponent = connect(mapStateToProps)(Cart);
export default ConnectedCartComponent;
