import { addProduct, deleteProduct, getProducts, updateProduct } from "../api";

export const ADD_PRODUCTS = "ADD_PRODUCTS";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const SET_EDIT_PRODUCT = "SET_EDIT_PRODUCT";
export const CANCEL_EDIT_PRODUCT = "CANCEL_EDIT_PRODUCT";
export const SAVE_EDIT_PRODUCT = "SAVE_EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";

export const ADDING_PRODUCTS = "ADDING_PRODUCTS";
export const UPDATING_PRODUCT = "UPDATING_PRODUCT";
export const DELETING_PRODUCT = "DELETING_PRODUCT";
export const ADDING_A_PRODUCT = "ADDING_A_PRODUCT";

export const DONE_ADDING_PRODUCTS = "DONE_ADDING_PRODUCTS";
export const DONE_UPDATING_PRODUCT = "DONE_UPDATING_PRODUCT";
export const DONE_DELETING_PRODUCT = "DONE_DELETING_PRODUCT";
export const DONE_ADDING_A_PRODUCT = "DONE_ADDING_A_PRODUCT";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SETTING_CART = "SETTING_CART";

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";

export function showNotification(message, success) {
  return {
    type: SHOW_NOTIFICATION,
    notification: {
      message,
      success,
    },
  };
}

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}
const sortByAscending = (products) => {
  return products.sort(function (a, b) {
    return a.price - b.price;
  });
};
export function sortProducts(products) {
  return {
    type: SORT_PRODUCTS,
    products: [...sortByAscending(products)],
  };
}

export function editProduct(id) {
  return {
    type: SET_EDIT_PRODUCT,
    id,
  };
}

export function cancelEditProduct(id) {
  return {
    type: CANCEL_EDIT_PRODUCT,
    id,
  };
}

export function saveEditProduct(product) {
  return {
    type: SAVE_EDIT_PRODUCT,
    product,
  };
}

export function deleteAProduct(id) {
  return {
    type: DELETE_PRODUCT,
    id,
  };
}

export function addAProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function addingProducts() {
  return {
    type: ADDING_PRODUCTS,
  };
}

export function updatingProduct() {
  return {
    type: UPDATING_PRODUCT,
  };
}

export function deletingProduct() {
  return {
    type: DELETING_PRODUCT,
  };
}

export function addingAProduct() {
  return {
    type: ADDING_A_PRODUCT,
  };
}

export function doneAddingProducts() {
  return {
    type: DONE_ADDING_PRODUCTS,
  };
}

export function doneUpdatingProduct() {
  return {
    type: DONE_UPDATING_PRODUCT,
  };
}

export function doneDeletingProduct() {
  return {
    type: DONE_DELETING_PRODUCT,
  };
}

export function doneAddingAProduct() {
  return {
    type: DONE_ADDING_A_PRODUCT,
  };
}

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product,
  };
}
export function removeFromCart(product) {
  return {
    type: REMOVE_FROM_CART,
    product,
  };
}
export function settingCart(cart) {
  return {
    type: SETTING_CART,
    cart,
  };
}

export function handleGetProducts() {
  return async function (dispatch) {
    dispatch(addingProducts());
    if (localStorage.getItem("products")) {
      // localStorage.removeItem("products");
      const dataLS = JSON.parse(localStorage.getItem("products"));
      dispatch(addProducts(dataLS));
    } else {
      const response = await getProducts();
      if (response.success) {
        const newProducts = response.data.map((product) => {
          return {
            ...product,
            edit: false,
          };
        });
        localStorage.setItem("products", JSON.stringify(newProducts));
        dispatch(addProducts(newProducts));
      } else {
        dispatch(showNotification("Error while Showing Products", false));
      }
    }
    // localStorage.removeItem("cart");
    if (localStorage.getItem("cart")) {
      dispatch(settingCart(JSON.parse(localStorage.getItem("cart"))));
    }
    dispatch(doneAddingProducts());
  };
}

export function handleDeleteProduct(id) {
  return async function (dispatch) {
    dispatch(deletingProduct());
    const response = await deleteProduct(id);
    if (response.success) {
      let a = [],
        cart = [];
      cart = JSON.parse(localStorage.getItem("cart"));
      if (cart.length > 0) {
        a = cart.filter((cartItem) => {
          return cartItem.id === id;
        });
        if (a.length !== 0) {
          dispatch(removeFromCart(a[0]));
        }
      }

      localStorage.removeItem("products");
      dispatch(deleteAProduct(id));
      dispatch(showNotification("Product Deleted Successfully", true));
    } else {
      dispatch(showNotification("Error while Deleting Product", false));
    }
    dispatch(doneDeletingProduct());
  };
}

export function handleUpdateProduct(
  id,
  brand,
  description,
  price,
  rating,
  title
) {
  return async function (dispatch) {
    dispatch(updatingProduct());
    const response = await updateProduct(
      id,
      brand,
      description,
      price,
      rating,
      title
    );
    if (response.success) {
      localStorage.removeItem("products");
      dispatch(saveEditProduct(response.data));
      dispatch(showNotification("Product Updated Successfully", true));
    } else {
      dispatch(showNotification("Error while Updating Product", false));
    }
    dispatch(doneUpdatingProduct());
  };
}

export function handleAddProduct(
  brand,
  description,
  price,
  rating,
  title,
  image
) {
  return async function (dispatch) {
    dispatch(addingAProduct());
    const response = await addProduct(
      brand,
      description,
      price,
      rating,
      title,
      image
    );
    if (response.success) {
      localStorage.removeItem("products");
      dispatch(addAProduct(response.data));
      dispatch(showNotification("Product Added Successfully", true));
    } else {
      dispatch(showNotification("Error while Adding Product", false));
    }
    dispatch(doneAddingAProduct());
  };
}
