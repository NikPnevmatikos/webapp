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

