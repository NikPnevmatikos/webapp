export const productListReducer = (state = {products:[]}, action) => {
    switch(action.type){
        case 'PRODUCT_LIST_REQUEST' :
           return{loading: true, products: [] }
        
        case 'PRODUCT_LIST_SUCCESS' :
            return {loading: false , products: action.payload }
        
        case 'PRODUCT_LIST_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        }       
}

export const userProductListReducer = (state = {products:[]}, action) => {
    switch(action.type){
        case 'USER_PRODUCTS_REQUEST' :
           return{loading: true, products: [] }
        
        case 'USER_PRODUCTS_SUCCESS' :
            return {loading: false , products: action.payload }
        
        case 'USER_PRODUCTS_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        }       
}

export const productReducer = (state = {product:{}}, action) => {
    switch(action.type){
        case 'PRODUCT_REQUEST' :
            return{loading: true, product: {} }  //previously -> '...state'
        
        case 'PRODUCT_SUCCESS' :
            return {loading: false , product: action.payload }
        
        case 'PRODUCT_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        }       
}

export const createProductReducer = (state = {}, action) => {
    switch(action.type){
        case 'CREATE_PRODUCT_REQUEST' :
            return{loading: true} 
        
        case 'CREATE_PRODUCT_SUCCESS' :
            return {loading: false , success: true ,product: action.payload }
        
        case 'CREATE_PRODUCT_FAIL' :
            return {loading: false, error: action.payload}
    
        case 'CREATE_PRODUCT_RESET' :
            return {}
            
        default:
            return state
        }       
}

export const deleteProductReducer = (state = {}, action) => {
    switch(action.type){
        case 'PRODUCT_DELETE_REQUEST' :
            return{loading: true}
        
        case 'PRODUCT_DELETE_SUCCESS' :
            return {loading: false , success: true}
        
        case 'PRODUCT_DELETE_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        }       
}



