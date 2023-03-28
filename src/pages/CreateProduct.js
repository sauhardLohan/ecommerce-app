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
    const {dispatch,addingAProduct}=props;
    console.log(addingAProduct);
    const handleSubmit=(e)=>{
      if(rating>5)
      {
        return;
      }
      
        console.log("jdjdjdj");
        e.preventDefault();
        dispatch(handleAddProduct(brand,description,price,rating,title,image));
    }
    return (
        
      <div className={styles.container}>
       
        <div className={styles.createPost} onSubmit={handleSubmit}>
          <h1>Add a Product</h1>
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
                Rating (out of 5) <span className={styles.imp}>*</span>
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
            <button type='submit' disabled={addingAProduct} className={styles.createPostBtn} >
              {addingAProduct?"Adding ...":"Add"}
            </button>
          </form>
        </div>
      </div>
    )
}


function mapStateToProps(state) {
    return {
      addingAProduct:state.addingAProduct
    };
  }
  
  const ConnectedCreateProductComponent = connect(mapStateToProps)(CreateProduct);
  export default ConnectedCreateProductComponent;