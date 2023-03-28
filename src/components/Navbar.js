import styles from '../styles/navbar.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
function Navbar(props){
    return (
        // <div id={styles.navbar}>
        //     <div>
        //         <span>eCommerce</span>
                
        //         <Link to="/" style={{marginLeft:50}} >Products</Link>
        //         <Link to="/create-product" style={{marginLeft:50}} >Add a Product</Link>
        //     </div>
        //     <div>
        //         <Link to="/cart" style={{marginRight:50}} >Cart</Link>
        //         <span>{props.cartItemNumber}</span>
        //         <span>Sauhard Lohan</span>
        //         <img src='https://cdn-icons-png.flaticon.com/512/4128/4128176.png' width={50} />
        //     </div>
        // </div>
        <div className={styles.nav}>
      <div className={styles.leftDiv}>
          <span id={styles.logo}>eCommerce</span>
          <Link to="/" style={{marginLeft:50}} >Products</Link>
          <Link to="/create-product" style={{marginLeft:50}} >Add a Product</Link>
      </div>
      

      <div className={styles.rightNav}>
       
          <div className={styles.user}>
            <div id={styles.cartContainer} >
            <Link to="/cart">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9374/9374328.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <div id={styles.cartNumber}> 
            <p>{props.cartItemNumber}</p>
                
            </div>
            </div>
            
            <span>Sauhard Lohan</span>
          </div>
        

        {/* <div className={styles.navLinks}>
          <ul>
            
              <>
                <li>
                  <button className={styles.logOut} >
                    Log out
                  </button>
                </li>
              </>
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            
          </ul>
        </div> */}
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
  