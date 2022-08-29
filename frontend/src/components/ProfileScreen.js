import React, { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from '../actions/userActions'

function ProfileScreen() {

    const navigate = useNavigate()
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')    
    
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.userProfileReducer)
    const {error, loading, user} = userprofile

    const userLogin = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLogin

    useEffect(() =>{
        if (userInfo == null) {
            navigate('/login')
        }
        else {
            if (user == null || !user.name)  {
                dispatch(userProfile('profile'))
            }
            else {
                setUsername(user.username)
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, navigate, dispatch, user])

    const submitHandler = (e) =>{
        e.preventDefault()
        navigate('/profile/update')
    }

    return (
        <Container>
            <Row className = "justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>My <strong>eDay</strong> Profile</h1>

                    {error && 
                        <div className="alert alert-dismissible alert-danger">
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
                        <Button type='submit' className="btn btn-dark btn-lg float-right" style={{float: 'right'}}>
                            Edit Your Profile
                        </Button>

                        <Form.Group controlId='username' className='py-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type='username' 
                                placeholder='Disabled input' 
                                value={username}
                                disabled
                                readOnly                           
                            >        
                            </Form.Control>
                        </Form.Group> 
                        
                        <Form.Group controlId='name' className='py-1'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type='name'   
                                placeholder='Disabled input' 
                                value={name}
                                disabled
                                readOnly                           
                            >        
                            </Form.Control>
                        </Form.Group> 

                        <Form.Group controlId='email' className='py-1'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type='Email'   
                                placeholder='Disabled input' 
                                value={email}
                                disabled
                                readOnly  
                            >        
                            </Form.Control>
                        </Form.Group> 

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen