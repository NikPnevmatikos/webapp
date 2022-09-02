import axios from 'axios'

export const listProductsAction = () => async(dispatch) =>{
    
    try {
        dispatch({
            type: 'PRODUCT_LIST_REQUEST'
        })
        
        const { data } = await axios.get('/api/product_list/')

        dispatch ({
            type: 'PRODUCT_LIST_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'PRODUCT_LIST_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}

export const userListProductsAction = () => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'USER_PRODUCTS_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            "/api/user_products/",
            config
        )

        dispatch ({
            type: 'USER_PRODUCTS_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'USER_PRODUCTS_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}

export const productsAction = (id) => async(dispatch) =>{
    
    try {
        dispatch({
            type: 'PRODUCT_REQUEST'
        })
        
        const { data } = await axios.get(`/api/product/${id}`)

        dispatch ({
            type: 'PRODUCT_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'PRODUCT_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }

}


export const createProductAction = (
                                name, 
                                brand, 
                                category, 
                                price, 
                                description, 
                                countInStock) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'CREATE_PRODUCT_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            "/api/product/create/",
            {
                'name': name,
                'brand': brand,
                'category': category,
                'price': price,
                'description' : description,
                'countInStock': countInStock,
            },
            config
        )

        dispatch ({
            type: 'CREATE_PRODUCT_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'CREATE_PRODUCT_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const deleteProductAction = (id) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'PRODUCT_DELETE_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/product/delete/${id}/`,
            config
        )

        dispatch ({
            type: 'PRODUCT_DELETE_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'PRODUCT_DELETE_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}
