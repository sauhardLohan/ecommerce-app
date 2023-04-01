import { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {
  editProduct,
  cancelEditProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  addToCart,
  removeFromCart,
} from "../actions";
import styles from "../styles/productItem.module.css";
import Stars_5 from "../images/5_stars.png";
import Stars_4 from "../images/4_stars.png";
import Stars_3 from "../images/3_stars.png";
import Stars_2 from "../images/2_stars.png";
import Star_1 from "../images/1_star.png";
import Delete_Image from "../images/delete.png";
import Deleting_Image from "../images/deleting.png";

export default function ProductItem(props) {
  const { product, dispatch, productInCart, updatingProduct, deletingProduct } =
    props;
  const { title, brand, price, rating, description, edit, image, id } = product;
  // adding changed properties to state so that on clicking of save button dispatch an action to update product
  const [changedTitle, setTitle] = useState(title);
  const [changedBrand, setBrand] = useState(brand);
  const [changedPrice, setPrice] = useState(price);
  const [changedRating, setRating] = useState(rating);
  const [changedDescription, setDescription] = useState(description);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
  // on edit button (pencil button) setting on edit mode for the product to be true
  const handleEditButtonClick = () => {
    dispatch(editProduct(id));
  };
  // cancelling the changes
  const handleCancelButtonClick = () => {
    dispatch(cancelEditProduct(id));
  };
  // saving the changes
  const handleSaveButtonClick = () => {
    setUpdating(true);
    dispatch(
      handleUpdateProduct(
        id,
        changedBrand,
        changedDescription,
        changedPrice,
        changedRating,
        changedTitle
      )
    );
  };
  // deleting product on click of garbage button
  const handleDeleteButtonClick = () => {
    setDeleting(true);
    dispatch(handleDeleteProduct(id));
  };
  // adding to cart button
  const handleAddToCartClick = () => {
    dispatch(addToCart(product));
  };
  // removing from cart
  const handleRemoveFromCartClick = () => {
    dispatch(removeFromCart(product));
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.productContainer}>
          <div className={styles.productDetail}>
            <div className={styles.productImage}>
              <img src={image} alt={`${title}`} />
            </div>
            <div className={styles.productHeading}>
              {edit ? (
                <div className={styles.editHeading}>
                  <input
                    value={changedTitle}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  ></input>
                  <input
                    value={changedBrand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                  ></input>
                  <input
                    value={changedPrice}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  ></input>
                  <input
                    value={changedRating}
                    onChange={(e) => {
                      setRating(e.target.value);
                    }}
                  ></input>
                </div>
              ) : (
                <>
                {
                  id<=28 ? <Link to={`/product/${product.id}`}>
                  <h2>{title}</h2>
                </Link>
                : 
                <h2>{title}</h2>

                }
                  
                  <h4>{brand}</h4>
                  <p>Price : {price}</p>
                  <div className={styles.ratingContainer}>
                    <img
                      src={ratingImage}
                      alt={`rating-${rating}`}
                      className={styles.ratings}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles.productHelp}>
            {edit && id <= 28 ? (
              <>
                <div className={styles.productDescription}>
                  <textarea
                    value={changedDescription}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className={styles.productChange}>
                  <div>
                    <button
                      onClick={handleCancelButtonClick}
                      style={{ marginRight: 40 }}
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={handleSaveButtonClick}
                      disabled={updatingProduct}
                    >
                      {updating && updatingProduct ? "SAVING..." : "SAVE"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.productDescription}>
                  <p>{description}</p>
                </div>
                {id <= 28 && (
                  <div className={styles.productChange}>
                    {productInCart ? (
                      <button
                        className={styles.btnNotInCart}
                        onClick={handleRemoveFromCartClick}
                      >
                        Remove from cart
                      </button>
                    ) : (
                      <button onClick={handleAddToCartClick}>
                        Add to cart
                      </button>
                    )}

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2919/2919592.png"
                      onClick={handleEditButtonClick}
                      alt="edit-icon"
                    />
                    {deleting && deletingProduct ? (
                      <img
                        src={Deleting_Image}
                        style={{ cursor: "default" }}
                        alt="deleting-icon"
                      />
                    ) : (
                      <img
                        src={Delete_Image}
                        onClick={handleDeleteButtonClick}
                        alt="delete-icon"
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
