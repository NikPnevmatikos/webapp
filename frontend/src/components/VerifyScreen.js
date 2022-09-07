import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'


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
        <div className="alert alert-dismissible alert-warning py-10">
            <motion.div animate={{ p: -100 }}>
                <h4 className="alert-heading">Warning!</h4>
                <p className="mb-0">You have yet to be verified. You must wait for the Admin to verify your account to have access to this page! <a href="/" className="alert-link">Go Back To Homescreen</a>.</p>
            </motion.div>
        </div>
    )
}

export default VerifyScreen