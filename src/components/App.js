import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, CreateProduct, Cart, ProductDetail, Page404 } from "../pages";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { handleGetProducts } from "../actions";
class App extends React.Component {
  componentDidMount() {
    // getting products by dispatching action
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

// using connect HOC to connect App component to store with dispatch as prop
const ConnectedAppComponent = connect((state) => {
  return {};
})(App);
export default ConnectedAppComponent;
