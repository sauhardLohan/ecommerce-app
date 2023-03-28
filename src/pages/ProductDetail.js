import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions";
import styles from "../styles/productDetail.module.css";
import Stars_5 from "../images/5_stars.png";
import Stars_4 from "../images/4_stars.png";
import Stars_3 from "../images/3_stars.png";
import Stars_2 from "../images/2_stars.png";
import Star_1 from "../images/1_star.png";
function ProductDetail(props) {
  const { products, cart } = props;
  const { productId } = useParams();
  if (products.length === 0) {
    return;
  }
  const product = products.filter((product) => {
    return product.id.toString() === productId;
  })[0];
  const { dispatch } = props;
  const { title, brand, price, rating, description, image } = product;

  const roundedRating = Math.round(rating);
  const ratingImage =
    roundedRating === 5
      ? Stars_5
      : roundedRating === 4
      ? Stars_4
      : roundedRating === 3
      ? Stars_3
      : roundedRating === 2
      ? Stars_2
      : Star_1;

  function isProductInCart() {
    let a = [];
    if (cart.length > 0) {
      a = cart.filter((cartItem) => {
        return cartItem.id === product.id;
      });
    }

    return a.length === 0 ? false : true;
  }
  const handleAddToCartClick = () => {
    dispatch(addToCart(product));
  };
  const handleRemoveFromCartClick = () => {
    dispatch(removeFromCart(product));
  };
  return (
    <div id={styles.container}>
      <div id={styles.productContainer}>
        <div id={styles.productDetail}>
          <div id={styles.productImage}>
            <img src={image} alt={`${title}`} />
          </div>
        </div>
        <div id={styles.productHelp}>
          <div id={styles.productTitle}>
            <h1>{title}</h1>
            <p>Price : {price}</p>
          </div>

          <h2 id={styles.productBrand}>{brand}</h2>

          <div id={styles.productDescription}>
            <p>{description}</p>
            <img
              src={ratingImage}
              alt={`rating-${rating}`}
              id={styles.ratings}
            />
          </div>
          <div id={styles.productChange}>
            {isProductInCart() ? (
              <button
                id={styles.btnNotInCart}
                onClick={handleRemoveFromCartClick}
              >
                Remove from cart
              </button>
            ) : (
              <button onClick={handleAddToCartClick}>Add to cart</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart,
  };
}

const ConnectedProductDetailComponent = connect(mapStateToProps)(ProductDetail);
export default ConnectedProductDetailComponent;
