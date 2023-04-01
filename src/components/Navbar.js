import styles from "../styles/navbar.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function Navbar(props) {
  return (
    <div id={styles.nav}>
      <div id={styles.leftDiv}>
        <span id={styles.logo}>eCommerce</span>
        <Link to="/" style={{ marginLeft: 50 }}>
          Products
        </Link>
        <Link to="/create-product" style={{ marginLeft: 50 }}>
          Add a Product
        </Link>
      </div>

      <div id={styles.rightNav}>
        <div id={styles.cart}>
          <div id={styles.cartContainer}>
            {/* cart image is link to the cart  */}
            <Link to="/cart">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9374/9374328.png"
                alt=""
                id={styles.cartImage}
              />
              <div id={styles.cartNumber}>
                <p>{props.cartItemNumber}</p>
              </div>
            </Link>
          </div>

          <span>Sauhard Lohan</span>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    // cartItemNumber is the number of items in cart
    cartItemNumber: state.cart.length,
  };
}
// using connect HOC to connect Navbar component to store with dispatch and cartItemNumber as prop
const ConnectedNavbarComponent = connect(mapStateToProps)(Navbar);
export default ConnectedNavbarComponent;
