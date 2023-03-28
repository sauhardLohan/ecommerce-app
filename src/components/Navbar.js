import styles from "../styles/navbar.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function Navbar(props) {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <span id={styles.logo}>eCommerce</span>
        <Link to="/" style={{ marginLeft: 50 }}>
          Products
        </Link>
        <Link to="/create-product" style={{ marginLeft: 50 }}>
          Add a Product
        </Link>
      </div>

      <div className={styles.rightNav}>
        <div className={styles.user}>
          <div id={styles.cartContainer}>
            <Link to="/cart">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9374/9374328.png"
                alt=""
                className={styles.userDp}
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
    cartItemNumber: state.cart.length,
  };
}

const ConnectedNavbarComponent = connect(mapStateToProps)(Navbar);
export default ConnectedNavbarComponent;
