import axios from 'axios'


export const login = (username, password) => async (dispatch) => {
    try {

        dispatch({
            type: 'USER_LOGIN_REQUEST'
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': username, 'password': password },
            config
        )

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    
    dispatch({ 
        type: 'USER_LOGOUT'
    })
    
    dispatch({ 
        type: 'USER_PROFILE_RESET' 
    })
    // dispatch({ 
    //     type: ORDER_LIST_MY_RESET 
    // })
    // dispatch({ 
    //     type: USER_LIST_RESET 
    // })
}


export const register = (username, email, name, password) => async (dispatch) => {
    try {

        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            {   'username': username, 
                'name': name, 
                'email': email,
                'password': password 
            },
            config
        )

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const userProfile = (id) => async (dispatch ,getState) => {
    try {
        dispatch({
            type: 'USER_PROFILE_REQUEST'
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
            `/api/users/${id}/`,
            config
        )

        dispatch({
            type: 'USER_PROFILE_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'USER_PROFILE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const userUpdate = (user) => async (dispatch ,getState) => {
    try {
        dispatch({
            type: 'USER_UPDATE_REQUEST'
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

        const { data } = await axios.put(
            '/api/users/update/',
            user,
            config
        )

        dispatch({
            type: 'USER_UPDATE_SUCCESS',
            payload: data
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } 
    catch (error) {
        dispatch({
            type: 'USER_UPDATE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}