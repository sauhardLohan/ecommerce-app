import styles from '../styles/navbar.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
function Navbar(props){
    return (
        <div id={styles.navbar}>
            <div>
                <span>eCommerce</span>
                
                <Link to="/" style={{marginLeft:50}} >Products</Link>
                <Link to="/create-product" style={{marginLeft:50}} >Add a Product</Link>
            </div>
            <div>
                <Link to="/cart" style={{marginRight:50}} >Cart</Link>
                <span>{props.cartItemNumber}</span>
                <span>Sauhard Lohan</span>
                <img src='https://cdn-icons-png.flaticon.com/512/4128/4128176.png' width={50} />
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
      cartItemNumber: state.cart.length,
    };
  }
  
  const ConnectedNavbarComponent = connect(mapStateToProps)(Navbar);
  export default ConnectedNavbarComponent;
  