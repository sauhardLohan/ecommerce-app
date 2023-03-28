import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { editProduct,cancelEditProduct, handleUpdateProduct, handleDeleteProduct, addToCart, removeFromCart } from "../actions";
import styles from '../styles/productItem.module.css';
import Stars_5 from '../images/5_stars.png';
import Stars_4 from '../images/4_stars.png';
import Stars_3 from '../images/3_stars.png';
import Stars_2 from '../images/2_stars.png';
import Star_1 from '../images/1_star.png';
function ProductDetail(props) {
  const { products,cart } = props;
  const { productId } = useParams();
  if (products.length === 0) {
    return;
  }
  const product = products.filter((product) => {
    return product.id.toString() === productId;
  })[0];
  console.log(product);
  const {dispatch}=props;
    const {title,brand,price,rating,description,edit,image,id}=product;
    
    const roundedRating=Math.round(rating);
    const ratingImage=roundedRating===5?Stars_5:roundedRating===4?Stars_4:roundedRating===3?Stars_3:roundedRating===2?Stars_2:Star_1

    function isProductInCart(){
    return cart.indexOf(product)===-1?false:true
  }
    const handleAddToCartClick=()=>{
        console.log("fijob",product);
        dispatch(addToCart(product));
        // console.log(dispatch)
    } 
    const handleRemoveFromCartClick=()=>{
      console.log("fijob",product);
      dispatch(removeFromCart(product));
      // console.log(dispatch)
  }
  return (
    <div id={styles.container}>
    <div className={styles.productContainer}>
      <div className={styles.productDetail}>
        <div className={styles.productImage}>
          <img src={image}  alt={`image-${title}`}  />
        </div>
        <div className={styles.productHeading}>
          
          <Link to={`/product/${product.id}`} ><h2>{title}</h2></Link>
          <h4>{brand}</h4>
          <p>Price : {price}</p>
          <div className={styles.ratingContainer}>
            <img src={ratingImage} alt={`rating-${rating}`} className={styles.ratings}/>
          {/* <p>{rating}</p> */}
             {/* <img src="https://cdn-icons-png.flaticon.com/512/10125/10125652.png" />  */}
          </div>
          
        
        </div>
      </div>
      <div className={styles.productHelp}>
          
              
              <div className={styles.productDescription}>
        <p>{description}</p>
        </div>
        <div className={styles.productChange}>
        {isProductInCart()?<button className={styles.btnNotInCart} onClick={handleRemoveFromCartClick}>Remove from cart</button>:<button  onClick={handleAddToCartClick}>Add to cart</button>}

          
          
        </div>
           
        
      </div>
    </div>
  </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart
  };
}

const ConnectedProductDetailComponent = connect(mapStateToProps)(ProductDetail);
export default ConnectedProductDetailComponent;
