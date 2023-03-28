import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, CreateProduct, Cart, ProductDetail, Page404 } from "../pages";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { handleGetProducts } from "../actions";
class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleGetProducts());
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

const ConnectedAppComponent = connect(mapStateToProps)(App);
export default ConnectedAppComponent;
