import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



function VerifyScreen() {

    const navigate = useNavigate()

    const singleuser = useSelector(state => state.userLoginReducer)
    const { userInfo } = singleuser

    useEffect(() =>{
        if(userInfo == null){
            navigate('/login')
        }
        else{
            if(userInfo.verified == true){
                navigate('/')
            }
        }
    
    } , [userInfo,navigate])

    return (
        <div>You are not verified. Wait for admin to verify you...</div>
    )
}

export default VerifyScreen