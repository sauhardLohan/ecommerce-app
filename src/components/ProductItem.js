import { useState } from "react";
import { Link } from "react-router-dom";
import { editProduct,cancelEditProduct, handleUpdateProduct, handleDeleteProduct, addToCart } from "../actions";
import styles from '../styles/productItem.module.css';
import Stars_5 from '../images/5_stars.png';
import Stars_4 from '../images/4_stars.png';
import Stars_3 from '../images/3_stars.png';
import Stars_2 from '../images/2_stars.png';
import Star_1 from '../images/1_star.png';


export default function ProductItem(props){
    const {product,dispatch}=props;
    const {title,brand,price,rating,description,edit,image,id}=product;
    const [cTitle,setTitle]=useState(title);
    const [cBrand,setBrand]=useState(brand);
    const [cPrice,setPrice]=useState(price);
    const [cRating,setRating]=useState(rating);
    const [cDescription,setDescription]=useState(description);
    const roundedRating=Math.round(rating);
    const ratingImage=roundedRating===5?Stars_5:roundedRating===4?Stars_4:roundedRating===3?Stars_3:roundedRating===2?Stars_2:Star_1

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
        
        //   <div id="">
        //     <div>
        //         <img src={image} width={400} alt={`image-${title}`}/>
        //         <div>
        //             {edit?
        //             <div>
        //                 <input value={cTitle} onChange={(e)=>{setTitle(e.target.value)}}></input> 
        //                 <input value={cBrand} onChange={(e)=>{setBrand(e.target.value)}}></input>                
        //                 <input value={cPrice} onChange={(e)=>{setPrice(e.target.value)}}></input>                
        //                 <input value={cRating} onChange={(e)=>{setRating(e.target.value)}}></input> 
        //             </div>:
        //             <div>
        //                 <Link to={`/product/${product.id}`} >{title}</Link>
        //                 <p>{brand}</p>
        //                 <p>{price}</p>
        //                 <p>{rating}</p>
        //             </div>
        //             }
                    
        //         </div>
        //     </div>
        //     <div>
        //         {
        //             edit?
        //             <textarea value={cDescription} onChange={(e)=>{setDescription(e.target.value)}}></textarea> :
        //             <p>{description}</p>

        //         }
                
        //         {edit?
        //         <div>
        //             <button onClick={handleCancelButtonClick}>CANCEL</button>
        //             <button onClick={handleSaveButtonClick} >SAVE</button>
        //         </div>:
        //         <div>
        //             <button onClick={handleAddToCartClick} >ADD TO CART</button>
        //             <img src="https://cdn-icons-png.flaticon.com/512/2919/2919592.png" onClick={handleEditButtonClick} alt="edit-icon" width={40} />
        //             <img src="https://cdn-icons-png.flaticon.com/512/216/216658.png" onClick={handleDeleteButtonClick} alt="delete-icon" width={40} />
        //         </div>

        //         }
                
        //     </div>
        //   </div>
    <div id={styles.container}>
      <div className={styles.productContainer}>
        <div className={styles.productDetail}>
          <div className={styles.productImage}>
            <img src={image}  alt={`image-${title}`}  />
          </div>
          <div className={styles.productHeading}>
            {edit?
            <div className={styles.editHeading} >
                <input value={cTitle} onChange={(e)=>{setTitle(e.target.value)}}></input> 
                <input value={cBrand} onChange={(e)=>{setBrand(e.target.value)}}></input>                
                <input value={cPrice} onChange={(e)=>{setPrice(e.target.value)}}></input>                
                <input value={cRating} onChange={(e)=>{setRating(e.target.value)}}></input> 
            </div>:
            <>
            <Link to={`/product/${product.id}`} ><h2>{title}</h2></Link>
            <h4>{brand}</h4>
            <p>Price : {price}</p>
            <div className={styles.ratingContainer}>
              <img src={ratingImage} alt={`rating-${rating}`} className={styles.ratings}/>
            {/* <p>{rating}</p> */}
               {/* <img src="https://cdn-icons-png.flaticon.com/512/10125/10125652.png" />  */}
            </div>
            </>
        
        }
          
          </div>
        </div>
        <div className={styles.productHelp}>
            {
                edit?
                <>
                <div className={styles.productDescription}>
                <textarea value={cDescription} onChange={(e)=>{setDescription(e.target.value)}}></textarea> 
          </div>
          <div className={styles.productChange}>
            <div>
            <button onClick={handleCancelButtonClick} style={{marginRight:40}}>CANCEL</button>
            <button onClick={handleSaveButtonClick} >SAVE</button>
            </div>
            
          </div>
                </>:
                <>
                <div className={styles.productDescription}>
          <p>{description}</p>
          </div>
          <div className={styles.productChange}>
            <button onClick={handleAddToCartClick}>Add to cart</button>
            <img src="https://cdn-icons-png.flaticon.com/512/2919/2919592.png" onClick={handleEditButtonClick} alt="edit-icon" />
            <img src="https://cdn-icons-png.flaticon.com/512/1632/1632602.png" onClick={handleDeleteButtonClick} alt="delete-icon" />
          </div>
                </>

            }
          
        </div>
      </div>
    </div>

      )
  }