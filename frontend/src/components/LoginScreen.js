import React, { useState, useEffect } from 'react'
import { Link , useNavigate, useLocation } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

function LoginScreen() {

    const location = useLocation()  
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')    
    

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLoginReducer)
    const {error, loading, userInfo} = userLogin

    useEffect(() =>{
        if (userInfo != null) {
            if(userInfo.verified === true){
                navigate(redirect)  
            }
            else{
                navigate('/verify')
            }
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
    <Container>
        <Row className = "justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Sign In</h1>
                {error && 
                    <div class="alert alert-dismissible alert-danger">
                    <strong>{error}</strong>
                    </div>
                }
                {loading &&
                    <Spinner 
                    animation="border" role="status" style={{ margin: 'auto',
                                                                display: 'block'
                                                            }}>
                        <span className="visually-hidden">Loading</span>
                    </Spinner>
                }
                
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username' className='py-1'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type='username' 
                            placeholder='Enter username' 
                            value={username}
                            onChange = {(e) => setUsername(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 
                    
                    <Form.Group controlId='password' className='py-1'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Enter Password' 
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}                            
                        >
                            
                        </Form.Control>
                    </Form.Group> 

                    <Button type='submit' className="btn btn-dark btn-lg float-right" style={{float: 'right'}}>
                        Sign In
                    </Button>
                </Form>

                <Row className='py-5'>
                    <Col>
                        Don't Have an Account? 
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Sign Up Now
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default LoginScreen