import axios from 'axios'

export const listProductsAction = (keyword='') => async(dispatch) =>{
    
    try {
        dispatch({
            type: 'PRODUCT_LIST_REQUEST'
        })
        
        const { data } = await axios.get(`/api/product_list${keyword}`)

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

export const userListProductsAction = (keyword='') => async(dispatch, getState) =>{
    
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
            `/api/user_products${keyword}`,
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


export const createProductAction = (form) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'CREATE_PRODUCT_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            '/api/product/create/',
            form,
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


export const editProductAction =(form) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'EDIT_PRODUCT_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/product/update/${form.get('_id')}/`,
            form,
            config
        )

        dispatch ({
            type: 'EDIT_PRODUCT_SUCCESS',
            payload: data
        })

        dispatch ({
            type: 'PRODUCT_SUCCESS',
            payload: data
        })


    }
    catch(error) {
        dispatch ({
            type: 'EDIT_PRODUCT_FAIL',
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


//bonus
export const recommendProductsAction = () => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'RECOMMEND_PRODUCTS_REQUEST'
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
            'api/users/recommended/',
            config
        )

        dispatch ({
            type: 'RECOMMEND_PRODUCTS_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'RECOMMEND_PRODUCTS_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const viewProductAction = (id) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'PRODUCT_VIEW_REQUEST'
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
            `/api/product_view/${id}/`,
            {},
            config
        )

        dispatch ({
            type: 'PRODUCT_VIEW_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'PRODUCT_VIEW_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}