 import { connect } from "react-redux";
import ProductItem from "./ProductItem";
 function Products(props){
  const {products,dispatch}= props;
  // console.log(dispatch);
  // console.log(products);
    return (
        <div id="">
          {products.map((product)=>{ return <ProductItem product={product} dispatch={dispatch} key={`product-${product.id}`} />})}
        </div>
    )
}
function mapStateToProps(state)
{ 
  return {
    products:state.products
  }
}

const ConnectedProductsComponent=connect(mapStateToProps)(Products);
export default ConnectedProductsComponent