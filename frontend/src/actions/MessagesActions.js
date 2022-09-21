import axios from 'axios'


export const userMessagesAction = (keyword='') => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'USER_MESSAGES_REQUEST'
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
            `/api/users/messages/received${keyword}`,
            config
        )

        dispatch ({
            type: 'USER_MESSAGES_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'USER_MESSAGES_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const userMessagesSendAction = (keyword='') => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'USER_MESSAGES_SEND_REQUEST'
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
            `/api/users/messages/sended${keyword}`,
            config
        )

        dispatch ({
            type: 'USER_MESSAGES_SEND_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'USER_MESSAGES_SEND_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const messageAction = (id) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'MESSAGE_REQUEST'
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
            `/api/users/messages/view/${id}/`,
            config
        )

        dispatch ({
            type: 'MESSAGE_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'MESSAGE_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }

}


export const createMessageAction = (id, context) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'CREATE_MESSAGE_REQUEST'
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
            `/api/users/messages/send/${id}/`,
            {
                'context': context,
            },
            config
        )

        dispatch ({
            type: 'CREATE_MESSAGE_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'CREATE_MESSAGE_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const unreadMessageAction = () => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'UNREAD_MESSAGE_REQUEST'
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
            `/api/users/messages/count/`,
            config
        )

        dispatch ({
            type: 'UNREAD_MESSAGE_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'UNREAD_MESSAGE_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}