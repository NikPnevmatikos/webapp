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