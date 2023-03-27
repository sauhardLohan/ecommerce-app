import { addProduct, deleteProduct, getProducts, updateProduct } from "../api";

export const ADD_PRODUCTS="ADD_PRODUCTS";
export const SORT_PRODUCTS="SORT_PRODUCTS";
export const SET_EDIT_PRODUCT="SET_EDIT_PRODUCT";
export const CANCEL_EDIT_PRODUCT="CANCEL_EDIT_PRODUCT";
export const SAVE_EDIT_PRODUCT="SAVE_EDIT_PRODUCT";
export const DELETE_PRODUCT="DELETE_PRODUCT";
export const ADD_PRODUCT="ADD_PRODUCT";


export const ADD_TO_CART="ADD_TO_CART"


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

export function addToCart(product)
{
    return{
        type:ADD_TO_CART,
        product
    }
}

export function addAProduct(product)
{
    return{
        type:ADD_PRODUCT,
        product
    }
}

export function handleGetProducts(){
    return async function(dispatch){
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
            // console.log("new Products",newProducts);
            dispatch(addProducts(newProducts));
        }
    }
    
}

export function handleDeleteProduct(id){
    return async function(dispatch){
        const response= await deleteProduct(id);
        if(response.success)
        {
            console.log(response);
            // const newProducts=response.data.map((product)=>{
            //     return{
            //         ...product,
            //         edit:false
            //     }
            // })
            // console.log("new Products",newProducts);
            dispatch(deleteAProduct(id));
        }
    }
    
}

export function handleUpdateProduct(id,brand,description,price,rating,title){
    return async function(dispatch){
        const response= await updateProduct(id,brand,description,price,rating,title);
        if(response.success)
        {
            console.log(response.data);
            // const newProducts=response.data.map((product)=>{
            //     return{
            //         ...product,
            //         edit:false
            //     }
            // })
            // console.log("new Products",newProducts);
            dispatch(saveEditProduct(response.data));
            // dispatch(cancelEditProduct(response.data.id));
        }
    }
    
}

export function handleAddProduct(brand,description,price,rating,title,image){
    return async function(dispatch){
        console.log("fgjpofb");
        const response= await addProduct(brand,description,price,rating,title,image);
        if(response.success)
        {
            console.log(response.data);
            dispatch(addAProduct(response.data));
            // const newProducts=response.data.map((product)=>{
            //     return{
            //         ...product,
            //         edit:false
            //     }
            // })
            // console.log("new Products",newProducts);
            // dispatch(saveEditProduct(response.data));
            // dispatch(cancelEditProduct(response.data.id));
        }
    }
    
}