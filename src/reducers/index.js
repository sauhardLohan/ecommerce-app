import { ADD_PRODUCT, ADD_PRODUCTS, ADD_TO_CART, CANCEL_EDIT_PRODUCT, DELETE_PRODUCT, SAVE_EDIT_PRODUCT, SET_EDIT_PRODUCT, SORT_PRODUCTS } from "../actions";

const initialState={
    products:[],
    sortProducts:false,
    cart:[]
}

function findProduct(id,products)
{
    return products.filter((product)=>product.id===id)[0];
}

function setEdit(id,products,edit){
    const product=findProduct(id,products);
    product.edit=edit;
    return products;
}

function setUpdateProduct(products,newProduct)
{
    let product=findProduct(newProduct.id,products);
    newProduct.edit=false;
    Object.assign(product,newProduct);
    console.log(product);
    return products
}

function setDeleteProduct(id,products)
{
    return products.filter((product)=>product.id!==id);
}

export default function productsReducer(state=initialState,action){
    switch(action.type)
    {
        case ADD_PRODUCTS:
            return{...state,
                products:action.products,
                sortProducts:false
            }
        case SORT_PRODUCTS:
            return{
                ...state,
                products:action.products,
                sortProducts:true
            }
        case SET_EDIT_PRODUCT:
            return{
                ...state,
                products:[...setEdit(action.id,state.products,true)]
            }
        
        case CANCEL_EDIT_PRODUCT:
            return{
                ...state,
                products:[...setEdit(action.id,state.products,false)]
            }
        case SAVE_EDIT_PRODUCT:
            return{
                ...state,
                products:[...setUpdateProduct(state.products,action.product)],

            }
        case DELETE_PRODUCT:
            return{
                ...state,
                products:[...setDeleteProduct(action.id,state.products)]
            }
        case ADD_PRODUCT:
        return{
            ...state,
            products:[action.product,...state.products]
        }
        case ADD_TO_CART:
            return{
                ...state,
                cart:[action.product,...state.cart]
            }
        default:
            return state;
    }
}