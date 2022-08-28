import React, { useState, useEffect } from 'react'
import { Link , useNavigate, useLocation } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

function LoginScreen() {

    const location = useLocation()  
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')    
    
    const userLogin = useSelector(state => state.userLoginReducer)
    const {error, loading, userInfo} = userLogin
    const dispatch = useDispatch()

    useEffect(() =>{
        if (userInfo != null) {
            navigate('/')
            console.log("eimai to if")
        }
        else{
            console.log("eimai to else")
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log("hello")
        dispatch(login(email, password))
    }

    return (
    <Container>
        <Row className = "justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Sign In </h1>
                
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type='email' 
                            placeholder='Enter Email' 
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 
                    
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Enter Password' 
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}                            
                        >
                            
                        </Form.Control>
                    </Form.Group> 

                    <Button type='submit' className='btn btn-dark'>
                        Sign In
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        Don't Have an Account? 
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Sign Up Now
                        </Link>
                        {userInfo}
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default LoginScreen