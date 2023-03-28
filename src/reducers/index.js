import {
  ADDING_A_PRODUCT,
  ADDING_PRODUCTS,
  ADD_PRODUCT,
  ADD_PRODUCTS,
  ADD_TO_CART,
  CANCEL_EDIT_PRODUCT,
  DELETE_PRODUCT,
  DELETING_PRODUCT,
  DONE_ADDING_A_PRODUCT,
  DONE_ADDING_PRODUCTS,
  DONE_DELETING_PRODUCT,
  DONE_UPDATING_PRODUCT,
  REMOVE_FROM_CART,
  SAVE_EDIT_PRODUCT,
  SETTING_CART,
  SET_EDIT_PRODUCT,
  SORT_PRODUCTS,
  UPDATING_PRODUCT,
} from "../actions";

const initialState = {
  products: [],
  sortProducts: false,
  cart: [],
  deletingProduct: false,
  updatingProduct: false,
  addingProducts: false,
  addingAProduct: false,
};

function findProduct(id, products) {
  return products.filter((product) => product.id === id)[0];
}

function setEdit(id, products, edit) {
  const product = findProduct(id, products);
  product.edit = edit;
  return products;
}

function setUpdateProduct(products, newProduct) {
  let product = findProduct(newProduct.id, products);
  newProduct.edit = false;
  Object.assign(product, newProduct);
  return products;
}

function setDeleteProduct(id, products) {
  return products.filter((product) => product.id !== id);
}

export default function productsReducer(state = initialState, action) {
  let updatedCart;
  switch (action.type) {
    case ADD_PRODUCTS:
      return { ...state, products: action.products, sortProducts: false };
    case ADDING_PRODUCTS:
      return {
        ...state,
        addingProducts: true,
      };
    case DONE_ADDING_PRODUCTS:
      return {
        ...state,
        addingProducts: false,
      };
    case SORT_PRODUCTS:
      return {
        ...state,
        products: action.products,
        sortProducts: true,
      };
    case SET_EDIT_PRODUCT:
      return {
        ...state,
        products: [...setEdit(action.id, state.products, true)],
      };

    case CANCEL_EDIT_PRODUCT:
      return {
        ...state,
        products: [...setEdit(action.id, state.products, false)],
      };
    case SAVE_EDIT_PRODUCT:
      return {
        ...state,
        products: [...setUpdateProduct(state.products, action.product)],
      };
    case UPDATING_PRODUCT:
      return {
        ...state,
        updatingProduct: true,
      };
    case DONE_UPDATING_PRODUCT:
      return {
        ...state,
        updatingProduct: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: [...setDeleteProduct(action.id, state.products)],
      };
    case DELETING_PRODUCT:
      return {
        ...state,
        deletingProduct: true,
      };
    case DONE_DELETING_PRODUCT:
      return {
        ...state,
        deletingProduct: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.product, ...state.products],
      };
    case ADDING_A_PRODUCT:
      return {
        ...state,
        addingAProduct: true,
      };
    case DONE_ADDING_A_PRODUCT:
      return {
        ...state,
        addingAProduct: false,
      };
    case ADD_TO_CART:
      updatedCart = [action.product, ...state.cart];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };
    case REMOVE_FROM_CART:
      updatedCart = state.cart.filter((cartItem) => {
        return cartItem.id !== action.product.id;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };
    case SETTING_CART:
      return {
        ...state,
        cart: action.cart,
      };

    default:
      return state;
  }
}
