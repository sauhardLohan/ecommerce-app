import { useState } from "react";
import { connect } from "react-redux";
import { handleAddProduct, showNotification } from "../actions";
import styles from "../styles/createProduct.module.css";
function CreateProduct(props) {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const { dispatch, addingAProduct } = props;
  const handleSubmit = (e) => {
    // dispatching action to add product if none of the fields are empty and price and rating are numbers with rating being between (1 to 5)
    e.preventDefault();
    let error = false;
    if (!title && !brand && !price && !rating && !image && !description) {
      dispatch(showNotification("Please fill all the fields", false));
      error = true;
    } else if (Number(rating) % 1 !== 0 || Number(price) % 1 !== 0) {
      dispatch(
        showNotification(
          "Price and Rating of Product should be a NUMBER",
          false
        )
      );
      error = true;
    }
    if (
      Number(rating) % 1 === 0 &&
      (Number(rating) > 5 || Number(rating) < 1)
    ) {
      dispatch(
        showNotification("Rating of Product should be between 1 and 5", false)
      );
      error = true;
    }
    if (error) {
      return;
    }
    dispatch(handleAddProduct(brand, description, price, rating, title, image));
  };
  return (
    <div id={styles.container}>
      <div id={styles.addProduct} onSubmit={handleSubmit}>
        <h1>Add a Product</h1>
        <form>
          <div id={styles.formField}>
            <label>
              Title <span id={styles.imp}>*</span>
            </label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div id={styles.formField}>
            <label>
              Brand <span id={styles.imp}>*</span>
            </label>
            <input
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
          <div id={styles.formField}>
            <label>
              Price <span id={styles.imp}>*</span>
            </label>
            <input
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div id={styles.formField}>
            <label>
              Rating (out of 5) <span id={styles.imp}>*</span>
            </label>
            <input
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>
          <div id={styles.formField}>
            <label>
              Image URL Address <span id={styles.imp}>*</span>
            </label>
            <input
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>
          <div id={styles.formField}>
            <label>
              Description <span id={styles.imp}>*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={addingAProduct}
            id={styles.addProductBtn}
          >
            {addingAProduct ? "Adding ..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    addingAProduct: state.addingAProduct,
  };
}
// using connect HOC to connect CreateProduct component to store with dispatch and addingAProduct as prop
const ConnectedCreateProductComponent = connect(mapStateToProps)(CreateProduct);
export default ConnectedCreateProductComponent;
