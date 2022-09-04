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
    dispatch({ 
        type: 'USERS_RESET' 
    })
}


export const register = (username, email, name, location, password) => async (dispatch) => {
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
                'location': location,
                // 'afm' : afk,
                // 'phone' : phone'
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


export const allUsers = (keyword='') => async (dispatch ,getState) => {
    try {
        dispatch({
            type: 'USERS_REQUEST'
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
            `/api/users${keyword}`,
            config
        )

        dispatch({
            type: 'USERS_SUCCESS',
            payload: data
        })


    } 
    catch (error) {
        dispatch({
            type: 'USERS_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteUser = (id) => async (dispatch ,getState) => {
    try {
        dispatch({
            type: 'USER_DELETE_REQUEST'
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
            `/api/users/delete/${id}/`,
            config
        )

        dispatch({
            type: 'USER_DELETE_SUCCESS',
            payload: data
        })


    } 
    catch (error) {
        dispatch({
            type: 'USER_DELETE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}