import url from "../utils/constants";

// creating custom fetch function to perform all actions with single function
const customFetch = async (url, { body, ...customConfig }) => {
  const headers = {
    "Content-type": "application/json; charset=UTF-8",
  };
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    // getting response from API service with configurations provided
    const response = await fetch(url, config);
    if (response.ok) {
      // if successfull, return with data else return with success as false
      const data = await response.json();
      return {
        data,
        success: true,
      };
    }
    throw new Error(response);
  } catch (error) {
    return {
      error,
      success: false,
    };
  }
};

// fetching products from API service
export const getProducts = () => {
  return customFetch(url, {
    method: "GET",
  });
};
// deleting product from API service
export const deleteProduct = (id) => {
  return customFetch(`${url}/${id}`, {
    method: "DELETE",
  });
};
// updating product in API service
export const updateProduct = (id, brand, description, price, rating, title) => {
  return customFetch(`${url}/${id}`, {
    method: "PUT",
    body: {
      brand,
      description,
      price,
      rating,
      title,
    },
  });
};
// adding a new product in API service
export const addProduct = (brand, description, price, rating, title, image) => {
  return customFetch(url, {
    method: "POST",
    body: {
      brand,
      description,
      price,
      rating,
      title,
      image,
    },
  });
};
