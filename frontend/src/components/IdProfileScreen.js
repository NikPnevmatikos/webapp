import React, { useState, useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from '../actions/userActions'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function IdProfileScreen() {

    const match = useParams()
    const navigate = useNavigate()
    

    const userId = match.id
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')  
    const [phone, setPhone] = useState(0)
    const [afm , setAfm] = useState('') 
    const [location, setLocation] = useState('')  
    const [verified, setVerified] = useState(false)
    
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.userProfileReducer)
    const {error, loading, user} = userprofile

    const userLogin = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLogin

    useEffect(() =>{
        if (userInfo == null || userInfo.is_staff == false) {
            navigate('/login')
        }
        else {
            if (user == null || !user.name || user.id != userId)  {
                dispatch(userProfile(`profile/${userId}`))
            }
            else {
                setUsername(user.username)
                setName(user.name)
                setEmail(user.email)
                setPhone(user.phone)
                setAfm(user.afm)
                setLocation(user.location)
                setVerified(user.verified)
            }
        }
    }, [userInfo, navigate, dispatch, user])

    const submitHandler = (e) =>{
        e.preventDefault()
        navigate('/admin')
    }

    return (
        <Container>
            <Row className = "justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>User's Profile</h1>

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

                        <Form.Group controlId='location' className='py-1'>
                            <Form.Label>Location</Form.Label>
                            <Form.Control 
                                type='Location'   
                                placeholder='Disabled input' 
                                value={location}
                                disabled
                                readOnly  
                            >        
                            </Form.Control>           
                        </Form.Group> 

                        <Form.Group controlId='phone' className='py-1'>
                            <Form.Label>Phone</Form.Label>
                                <PhoneInput
                                    required
                                    disabled
                                    placeholder='Enter your Phone'
                                    value={phone}
                                    onChange = {setPhone}
                                    inputStyle={{
                                        width: "535px",
                                        height: "40px",
                                    }}
                                    
                                />
                        </Form.Group>

                        <Form.Group controlId='afm' className='py-1'>
                            <Form.Label>AFM</Form.Label>
                            <Form.Control 
                                type='text'   
                                placeholder='Disabled input' 
                                value={afm}
                                disabled
                                readOnly  
                            >        
                            </Form.Control>           
                        </Form.Group> 
                        

                        <Form.Group controlId='verified' className='py-1'>
                            <Form.Label>Is Verified</Form.Label>
                            <Form.Check 
                                type='checkbox'   
                                checked={verified}
                                disabled
                                readOnly  
                            >        
                            </Form.Check>           
                        </Form.Group> 


                        <Button type='submit' className="btn btn-dark btn-lg float-right" style={{float: 'right'}}>
                            Go Back
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default IdProfileScreen