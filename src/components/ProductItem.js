import { useState } from "react";
import { Link } from "react-router-dom";
import { editProduct,cancelEditProduct, handleUpdateProduct, handleDeleteProduct, addToCart } from "../actions";

export default function ProductItem(props){
    const {product,dispatch}=props;
    const {title,brand,price,rating,description,edit,image,id}=product;
    const [cTitle,setTitle]=useState(title);
    const [cBrand,setBrand]=useState(brand);
    const [cPrice,setPrice]=useState(price);
    const [cRating,setRating]=useState(rating);
    const [cDescription,setDescription]=useState(description);

    const handleEditButtonClick=()=>{
        dispatch(editProduct(id));
        // console.log(dispatch)
    }
    const handleCancelButtonClick=()=>{
        dispatch(cancelEditProduct(id));
        // console.log(dispatch)
    }
    const handleSaveButtonClick=()=>{
        dispatch(handleUpdateProduct(id,cBrand,cDescription,cPrice,cRating,cTitle));
        // console.log(dispatch)
    }
    const handleDeleteButtonClick=()=>{
        dispatch(handleDeleteProduct(id));
        // console.log(dispatch)
    }
    const handleAddToCartClick=()=>{
        console.log("fijob",product);
        dispatch(addToCart(product));
        // console.log(dispatch)
    }
      return (
        
          <div id="">
            <div>
                <img src={image} width={400} alt={`image-${title}`}/>
                <div>
                    {edit?
                    <div>
                        <input value={cTitle} onChange={(e)=>{setTitle(e.target.value)}}></input> 
                        <input value={cBrand} onChange={(e)=>{setBrand(e.target.value)}}></input>                
                        <input value={cPrice} onChange={(e)=>{setPrice(e.target.value)}}></input>                
                        <input value={cRating} onChange={(e)=>{setRating(e.target.value)}}></input> 
                    </div>:
                    <div>
                        <Link to={`/product/${product.id}`} >{title}</Link>
                        <p>{brand}</p>
                        <p>{price}</p>
                        <p>{rating}</p>
                    </div>
                    }
                    
                </div>
            </div>
            <div>
                {
                    edit?
                    <textarea value={cDescription} onChange={(e)=>{setDescription(e.target.value)}}></textarea> :
                    <p>{description}</p>

                }
                
                {edit?
                <div>
                    <button onClick={handleCancelButtonClick}>CANCEL</button>
                    <button onClick={handleSaveButtonClick} >SAVE</button>
                </div>:
                <div>
                    <button onClick={handleAddToCartClick} >ADD TO CART</button>
                    <img src="https://cdn-icons-png.flaticon.com/512/2919/2919592.png" onClick={handleEditButtonClick} alt="edit-icon" width={40} />
                    <img src="https://cdn-icons-png.flaticon.com/512/216/216658.png" onClick={handleDeleteButtonClick} alt="delete-icon" width={40} />
                </div>

                }
                
            </div>
          </div>
      )
  }