import axios from 'axios'


export const newBid = (id, bid) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`)

    dispatch({
        type: 'BID_ITEM',
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            bid
        }
    })

    localStorage.setItem('bidItems', JSON.stringify(getState().bidReducer.bidItems))
}

export const removeBid = (id) => (dispatch, getState) => {
    dispatch({
        type: 'REMOVE_BID',
        payload: id,
    })

    localStorage.setItem('bidItems', JSON.stringify(getState().bidReducer.bidItems))
}



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
