import styles from "../styles/productDetail.module.css";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
function ProductDetail(props) {
  const { products } = props;
  const { productId } = useParams();
  if (products.length === 0) {
    return;
  }
  const product = products.filter((product) => {
    return product.id.toString() === productId;
  })[0];
  console.log(product);
  return (
    <div>
      
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

const ConnectedProductDetailComponent = connect(mapStateToProps)(ProductDetail);
export default ConnectedProductDetailComponent;
