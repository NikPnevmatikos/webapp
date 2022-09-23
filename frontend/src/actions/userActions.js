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


export const register = (username, email, name, location,phone,afm, password) => async (dispatch) => {
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
                'afm' : afm,
                'phone' : phone,
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


export const verifyUser = (id) => async (dispatch ,getState) => {
    try {
        dispatch({
            type: 'USER_VERIFY_REQUEST'
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
            `/api/users/verify/${id}/`,
            {},
            config
        )

        dispatch({
            type: 'USER_VERIFY_SUCCESS',
            payload: data
        })


    } 
    catch (error) {
        dispatch({
            type: 'USER_VERIFY_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const buyerReviewAction = (id,rating) => async (dispatch ,getState) => {
    try {
        dispatch({
            type: 'BUYER_REVIEW_REQUEST'
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
            `/api/users/rating/${id}/`,
            {rating: rating},
            config
        )

        dispatch({
            type: 'BUYER_REVIEW_SUCCESS',
            payload: data
        })


    } 
    catch (error) {
        dispatch({
            type: 'BUYER_REVIEW_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const sellerReviewAction = (id,rating) => async (dispatch ,getState) => {
    try {
        dispatch({
            type: 'SELLER_REVIEW_REQUEST'
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
            `/api/users/seller_rating/${id}/`,
            {rating: rating},
            config
        )

        dispatch({
            type: 'SELLER_REVIEW_SUCCESS',
            payload: data
        })


    } 
    catch (error) {
        dispatch({
            type: 'SELLER_REVIEW_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

var fileDownload = require('js-file-download');

export const xmlAction = (id,name) => async (dispatch ,getState) => {
    try {
        dispatch({
            type: 'XML_REQUEST'
        })

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                responseType: 'blob',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/admin/xml/${id}/`,
            config
        ).then(res  => {
            fileDownload(res.data, name+".xml")
        })

        dispatch({
            type: 'XML_SUCCESS',
            payload: data
        })


    } 
    catch (error) {
        dispatch({
            type: 'XML_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const jsonAction = (id,name) => async (dispatch ,getState) => {
    try {
        dispatch({
            type: 'JSON_REQUEST'
        })

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                responseType: 'blob',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/admin/json/${id}/`,
            config
        ).then(res  => {
            fileDownload(res.data, name+".json")
        })

        dispatch({
            type: 'JSON_SUCCESS',
            payload: data
        })


    } 
    catch (error) {
        dispatch({
            type: 'JSON_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}