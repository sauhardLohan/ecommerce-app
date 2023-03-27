import url from '../utils/constants'

const customFetch =async(url,{body,...customConfig})=>{
    const headers={
        'Content-type': 'application/json; charset=UTF-8',
    }
    const config={
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers
        }
    }
    if(body)
    {
        config.body=JSON.stringify(body);
    }
    try{
        const response=await fetch(url,config);
        if(response.ok)
        {
            const data =await response.json();
            return{
                data,
                success:true
            }
        }
        throw new Error(response);
    }
    catch(error)
    {
        console.error("ERROR :",error);
        return{
            error,
            success:false
        }
    }
}

export const getProducts=()=>{
    return customFetch(url,{
        method:'GET'
    })
}

export const deleteProduct=(id)=>{
    return customFetch(`${url}/${id}`,{
        method:'DELETE'
    })
}

export const updateProduct=(id,brand,description,price,rating,title)=>{
    return customFetch(`${url}/${id}`,{
        method:'PUT',
        body:{
            brand,
            description,
            price,
            rating,
            title
        }
    })
}

export const addProduct=(brand,description,price,rating,title,image)=>{
    return customFetch(url,{
        method:'POST',
        body:{
            brand,
            description,
            price,
            rating,
            title,
            image
        }
    })
}
