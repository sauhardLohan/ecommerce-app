 import { connect } from "react-redux";
import ProductItem from "./ProductItem";
 function Products(props){
  const {products,dispatch,cart,updatingProduct,deletingProduct}= props;
  // console.log(dispatch);
  // console.log(products);
  function isProductInCart(product){
    return cart.indexOf(product)===-1?false:true
  }
    return (
        <div >
          {products.map((product)=>{ return <ProductItem product={product} productInCart={isProductInCart(product)} updatingProduct={updatingProduct} deletingProduct={deletingProduct} dispatch={dispatch} key={`product-${product.id}`} />})}
        </div>
    )
}
function mapStateToProps(state)
{ 
  return {
    products:state.products,
    cart:state.cart,
    updatingProduct:state.updatingProduct,
    deletingProduct:state.deletingProduct
  }
}

const ConnectedProductsComponent=connect(mapStateToProps)(Products);
export default ConnectedProductsComponent