import axios from 'axios'


export const userListBidsAction = (keyword='') => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'USER_BIDS_REQUEST'
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
            `/api/users/bids${keyword}`,
            config
        )

        dispatch ({
            type: 'USER_BIDS_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'USER_BIDS_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const productListBidsAction = (id,keyword='') => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'PRODUCT_BIDS_REQUEST'
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
            `/api/user_products/bid_list/${id}${keyword}`,
            config
        )

        dispatch ({
            type: 'PRODUCT_BIDS_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'PRODUCT_BIDS_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const createBidAction = (id, value) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'BID_CREATE_REQUEST'
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
            `/api/users/bids/create/${id}/`,
            {'value': value},
            config
        )

        dispatch ({
            type: 'BID_CREATE_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'BID_CREATE_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}



export const deleteBidAction = (id) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'BID_DELETE_REQUEST'
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
            `/api/users/bids/delete/${id}/`,
            config
        )

        dispatch ({
            type: 'BID_DELETE_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'BID_DELETE_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}
