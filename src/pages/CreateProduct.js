import { useState } from 'react';
import { connect } from 'react-redux';
import { handleAddProduct } from '../actions';
import styles from '../styles/createProduct.module.css'
function CreateProduct(props){
    const [title,setTitle]=useState("");
    const [brand,setBrand]=useState("");
    const [price,setPrice]=useState("");
    const [rating,setRating]=useState("");
    const [image,setImage]=useState("");
    const [description,setDescription]=useState("");
    const {dispatch}=props;
    const handleSubmit=(e)=>{
        console.log("jdjdjdj");
        e.preventDefault();
        dispatch(handleAddProduct(brand,description,price,rating,title,image));
    }
    return (
        
      <div className={styles.container}>
       
        <div className={styles.createPost} onSubmit={handleSubmit}>
          <h1>Create Post</h1>
          <form>
            <div className={styles.formField}>
              <label>
                Title <span className={styles.imp}>*</span>
              </label>
              <input required value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            </div>
            <div className={styles.formField}>
              <label>
                Brand <span className={styles.imp}>*</span>
              </label>
              <input required value={brand} onChange={(e)=>{setBrand(e.target.value)}} />
            </div>
            <div className={styles.formField}>
              <label>
                Price <span className={styles.imp}>*</span>
              </label>
              <input required value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            </div>
            <div className={styles.formField}>
              <label>
                Rating <span className={styles.imp}>*</span>
              </label>
              <input required value={rating} onChange={(e)=>{setRating(e.target.value)}} />
            </div>
            <div className={styles.formField}>
              <label>
                Image URL Address <span className={styles.imp}>*</span>
              </label>
              <input required value={image} onChange={(e)=>{setImage(e.target.value)}} />
            </div>
            <div className={styles.formField}>
              <label>
                Description <span className={styles.imp}>*</span>
              </label>
              <textarea required value={description} onChange={(e)=>{setDescription(e.target.value)}} ></textarea>
            </div>
            <button type='submit' className={styles.createPostBtn}  >
              Add
            </button>
          </form>
        </div>
      </div>
    )
}


function mapStateToProps(state) {
    return {
      products: state.products,
    };
  }
  
  const ConnectedCreateProductComponent = connect(mapStateToProps)(CreateProduct);
  export default ConnectedCreateProductComponent;