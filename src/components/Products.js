import { connect } from "react-redux";
import ProductItem from "./ProductItem";
function Products(props) {
  const { products, dispatch, cart, updatingProduct, deletingProduct } = props;
  if (products.length === 0) {
    return <h1 style={{ textAlign: "center" }}>No Products In List</h1>;
  }
  function isProductInCart(product) {
    let a = [];
    if (cart.length > 0) {
      a = cart.filter((cartItem) => {
        return cartItem.id === product.id;
      });
    }

    return a.length === 0 ? false : true;
  }
  return (
    <div>
      {products.map((product) => {
        return (
          <ProductItem
            product={product}
            productInCart={isProductInCart(product)}
            updatingProduct={updatingProduct}
            deletingProduct={deletingProduct}
            dispatch={dispatch}
            key={`product-${product.id}`}
          />
        );
      })}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart,
    updatingProduct: state.updatingProduct,
    deletingProduct: state.deletingProduct,
  };
}

const ConnectedProductsComponent = connect(mapStateToProps)(Products);
export default ConnectedProductsComponent;
