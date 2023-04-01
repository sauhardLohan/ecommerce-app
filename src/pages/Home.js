import styles from "../styles/home.module.css";
import { connect } from "react-redux";
import { Products } from "../components";
import { handleGetProducts, sortProducts } from "../actions";

import Loader from "../components/Loader";
function Home(props) {
  const { isSortProducts, dispatch, products, addingProducts } = props;
  // dispatching action to sort products
  const handleSortProducts = () => {
    dispatch(sortProducts(products));
  };
  // dispatching action to unsort products
  const handleUnSortProducts = () => {
    dispatch(handleGetProducts());
  };
  if (addingProducts) {
    // showing loader if fetching of products is taking place
    return <Loader />;
  }
  return (
    <div id={styles.homeContainer}>
      <div id={styles.sortUnsort}>
        {isSortProducts ? (
          <div id={styles.unsort}>
            <span>Sort by price </span>
            <button onClick={handleUnSortProducts}> X </button>
          </div>
        ) : (
          <button onClick={handleSortProducts}>Sort by price</button>
        )}
      </div>

      <Products />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    isSortProducts: state.isSortProducts,
    products: state.products,
    addingProducts: state.addingProducts,
  };
}
// using connect HOC to connect CreateProduct component to store with dispatch,isSortProducts,products as prop
const ConnectedHomeComponent = connect(mapStateToProps)(Home);
export default ConnectedHomeComponent;
