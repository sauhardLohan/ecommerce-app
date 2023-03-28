import { addProduct, deleteProduct, getProducts, updateProduct } from "../api";

export const ADD_PRODUCTS="ADD_PRODUCTS";
export const SORT_PRODUCTS="SORT_PRODUCTS";
export const SET_EDIT_PRODUCT="SET_EDIT_PRODUCT";
export const CANCEL_EDIT_PRODUCT="CANCEL_EDIT_PRODUCT";
export const SAVE_EDIT_PRODUCT="SAVE_EDIT_PRODUCT";
export const DELETE_PRODUCT="DELETE_PRODUCT";
export const ADD_PRODUCT="ADD_PRODUCT";

export const ADDING_PRODUCTS="ADDING_PRODUCTS";
export const UPDATING_PRODUCT="UPDATING_PRODUCT";
export const DELETING_PRODUCT="DELETING_PRODUCT";
export const ADDING_A_PRODUCT="ADDING_A_PRODUCT";


export const ADD_TO_CART="ADD_TO_CART"
export const REMOVE_FROM_CART="REMOVE_FROM_CART"

export const SHOW_NOTIFICATION="SHOW_NOTIFICATION"

export function showNotification(message,success)
{
    return{
        type:SHOW_NOTIFICATION,
        notification:{
            message,
            success
        }
    }
}




export function addProducts(products)
{
    return{
        type:ADD_PRODUCTS,
        products
    }
}
const sortByAscending=(products)=>{
    console.log(products.sort(function(a, b){return a.price-b.price}));
    return products.sort(function(a, b){return a.price-b.price})
}
export function sortProducts(products)
{
    return{
        type:SORT_PRODUCTS,
        products:[...sortByAscending(products)]
    }
}

export function editProduct(id)
{
    return{
        type:SET_EDIT_PRODUCT,
        id
    }
}

export function cancelEditProduct(id)
{
    return{
        type:CANCEL_EDIT_PRODUCT,
        id
    }
}

export function saveEditProduct(product)
{
    return{
        type:SAVE_EDIT_PRODUCT,
        product
    }
}

export function deleteAProduct(id)
{
    return{
        type:DELETE_PRODUCT,
        id
    }
}

export function addAProduct(product)
{
    return{
        type:ADD_PRODUCT,
        product
    }
}

export function addingProducts()
{
    return{
        type:ADDING_PRODUCTS,
    }
}

export function updatingProduct()
{
    return{
        type:UPDATING_PRODUCT,
    }
}

export function deletingProduct()
{
    return{
        type:DELETING_PRODUCT,
    }
}

export function addingAProduct()
{
    return{
        type:ADDING_A_PRODUCT,
    }
}

export function addToCart(product)
{
    return{
        type:ADD_TO_CART,
        product
    }
}
export function removeFromCart(product)
{
    return{
        type:REMOVE_FROM_CART,
        product
    }
}



export function handleGetProducts(){
    return async function(dispatch){
        dispatch(addingProducts());
        const response= await getProducts();
        if(response.success)
        {
            console.log(response.data);
            const newProducts=response.data.map((product)=>{
                return{
                    ...product,
                    edit:false
                }
            })
            dispatch(addProducts(newProducts));
        }
    }
    
}

export function handleDeleteProduct(id){
    return async function(dispatch){
        dispatch(deletingProduct());
        const response= await deleteProduct(id);
        if(response.success)
        {
            console.log(response);
            dispatch(deleteAProduct(id));
            dispatch(showNotification("Product Deleted Successfully",true))
        }
    }
    
}

export function handleUpdateProduct(id,brand,description,price,rating,title){
    return async function(dispatch){
        dispatch(updatingProduct());
        const response= await updateProduct(id,brand,description,price,rating,title);
        if(response.success)
        {
            console.log(response.data);
            dispatch(saveEditProduct(response.data));
            dispatch(showNotification("Product Updated Successfully",true))
        }
        else{
            dispatch(showNotification("Product Not Updated Successfully",false))
        }
    }
    
}

export function handleAddProduct(brand,description,price,rating,title,image){
    return async function(dispatch){
        console.log("fgjpofb");
        dispatch(addingAProduct());
        const response= await addProduct(brand,description,price,rating,title,image);
        if(response.success)
        {
            console.log(response.data);
            dispatch(addAProduct(response.data));
            dispatch(showNotification("Product Added Successfully",true))
        }
    }
    
}