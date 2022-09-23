export const userBidsListReducer = (state = {bids:[]}, action) => {
    switch(action.type){
        case 'USER_BIDS_REQUEST' :
           return{loading: true, bids: [] }
        
        case 'USER_BIDS_SUCCESS' :
            return {                
                loading: false, 
                bids: action.payload.bids,
                pages:  action.payload.pages,
                page: action.payload.page
            }
        
        case 'USER_BIDS_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        }       
}

export const productBidsListReducer = (state = {bids:[]}, action) => {
    switch(action.type){
        case 'PRODUCT_BIDS_REQUEST' :
           return{loading: true, bids: [] }
        
        case 'PRODUCT_BIDS_SUCCESS' :
            return {                
                loading: false, 
                bids: action.payload.bids,
                pages:  action.payload.pages,
                page: action.payload.page
            }
        
        case 'PRODUCT_BIDS_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        }       
}

export const createBidReducer = (state = {}, action) => {
    switch(action.type) {
        case 'BID_CREATE_REQUEST' :
            return{loading: true}
        
        case 'BID_CREATE_SUCCESS' :
            return {loading: false, success: true, message: action.payload}
        
        case 'BID_CREATE_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
    }       
}


export const deleteBidReducer = (state = {}, action) => {
    switch(action.type) {
        case 'BID_DELETE_REQUEST' :
            return{loading: true}
        
        case 'BID_DELETE_SUCCESS' :
            return {loading: false, success: true}
        
        case 'BID_DELETE_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
    }       
}