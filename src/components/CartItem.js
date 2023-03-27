import { Link } from "react-router-dom";
import {  addToCart } from "../actions";
import styles from '../styles/productItem.module.css';
import Stars_5 from '../images/5_stars.png';
import Stars_4 from '../images/4_stars.png';
import Stars_3 from '../images/3_stars.png';
import Stars_2 from '../images/2_stars.png';
import Star_1 from '../images/1_star.png';


export default function CartItem(props){
    const {cartItem,dispatch}=props;
    const {title,brand,price,rating,description,edit,image,id}=cartItem;
    
    const roundedRating=Math.round(rating);
    const ratingImage=roundedRating===5?Stars_5:roundedRating===4?Stars_4:roundedRating===3?Stars_3:roundedRating===2?Stars_2:Star_1

    
    const handleAddToCartClick=()=>{
        dispatch(addToCart(cartItem));
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
            

            <Link to={`/product/${cartItem.id}`} ><h2>{title}</h2></Link>
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
            <button onClick={handleAddToCartClick}>Add to cart</button>
            
          </div>
               
          
        </div>
      </div>
    </div>

      )
  }