import axios from 'axios'


export const login = (username, password) => async (dispatch) => {
    try {


        console.log("mpika")
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
    // dispatch({ 
    //     type: USER_DETAILS_RESET 
    // })
    // dispatch({ 
    //     type: ORDER_LIST_MY_RESET 
    // })
    // dispatch({ 
    //     type: USER_LIST_RESET 
    // })
}
