import styles from "../styles/home.module.css";
import { connect } from "react-redux";
import { Products } from "../components";
import { handleGetProducts, sortProducts } from "../actions";

import Loader from "../components/Loader";
function Home(props) {
  const { sortProducs, dispatch, products, addingProducts } = props;
  const handleSortProducts = () => {
    dispatch(sortProducts(products));
  };
  const handleUnSortProducts = () => {
    dispatch(handleGetProducts());
  };
  if (addingProducts) {
    return <Loader />;
  }
  return (
    <div id={styles.homeContainer}>
      <div id={styles.sortUnsort}>
        {sortProducs ? (
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
    sortProducs: state.sortProducts,
    products: state.products,
    addingProducts: state.addingProducts,
  };
}

const ConnectedHomeComponent = connect(mapStateToProps)(Home);
export default ConnectedHomeComponent;
