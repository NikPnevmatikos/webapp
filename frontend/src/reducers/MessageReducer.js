export const userMessageListReducer = (state = {messages:[]}, action) => {
    switch(action.type){
        case 'USER_MESSAGES_REQUEST' :
           return{loading: true, messages: [] }
        
        case 'USER_MESSAGES_SUCCESS' :
            return {                
                loading: false , 
                messages: action.payload.messages,
                pages:  action.payload.pages,
                page: action.payload.page
            }
        
        case 'USER_MESSAGES_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        }       
}

export const userMessageSendReducer = (state = {messages:[]}, action) => {
    switch(action.type){
        case 'USER_MESSAGES_SEND_REQUEST' :
           return{loading: true, messages: [] }
        
        case 'USER_MESSAGES_SEND_SUCCESS' :
            return {                
                loading: false , 
                messages: action.payload.messages,
                pages:  action.payload.pages,
                page: action.payload.page
            }
        
        case 'USER_MESSAGES_SEND_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        }       
}


export const messageReducer = (state = {message:{}}, action) => {
    switch(action.type){
        case 'MESSAGE_REQUEST' :
            return{loading: true, ...state }  //previously -> '...state'
        
        case 'MESSAGE_SUCCESS' :
            return {loading: false , message: action.payload }
        
        case 'MESSAGE_FAIL' :
            return {loading: false, error: action.payload}

        case 'MESSAGE_RESET' :
            return {message: {}}
            
        default:
            return state
        }       
}


export const createMessageReducer = (state = {}, action) => {
    switch(action.type){
        case 'CREATE_MESSAGE_REQUEST' :
            return{loading: true} 
        
        case 'CREATE_MESSAGE_SUCCESS' :
            return {loading: false, success: true, message: action.payload }
        
        case 'CREATE_MESSAGE_FAIL' :
            return {loading: false, error: action.payload}
    
        case 'CREATE_MESSAGE_RESET' :
            return {}
            
        default:
            return state
        }       
}


export const unreadMessageReducer = (state = {}, action) => {
    switch(action.type){
        case 'UNREAD_MESSAGE_REQUEST' :
            return{loading: true} 
        
        case 'UNREAD_MESSAGE_SUCCESS' :
            return {loading: false, success: true, message: action.payload }
        
        case 'UNREAD_MESSAGE_FAIL' :
            return {loading: false, error: action.payload}
    
        case 'UNREAD_MESSAGE_RESET' :
            return {}
            
        default:
            return state
        }       
}

