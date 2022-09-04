import React, { useState, useEffect } from 'react'
import { Link , useNavigate, useLocation } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userProfile, userUpdate } from '../actions/userActions'

function RegisterScreen() {

    const location = useLocation()  
    const navigate = useNavigate()


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')    
    // const [phone, setPhone] = useState(0)
    // const [afm , setAfm] = useState(0) 
    const [userlocation, setLocation] = useState('')
    const [password, setPassword] = useState('')   
    const [confirmPassword, setConfirmPassword] = useState('')   
    const [errorMessage, setErrorMessage] = useState('')
    
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.userProfileReducer)
    const {error, loading, user} = userprofile

    const userLogin = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLogin

    
    const userupdate = useSelector(state => state.userUpdateReducer)
    const {success} = userupdate

    useEffect(() =>{
        if (userInfo == null) {
            navigate('/login')
        }
        else {
            if (user == null || user.name == null || success == true)  {
                if(success == true){
                    navigate('/profile')
                }
                dispatch({type:'USER_UPDATE_RESET'})
                dispatch(userProfile('profile'))
            }
            else {
                setUsername(user.username)
                setName(user.name)
                setEmail(user.email)
                // setPhone(user.phone)
                // setAfm(user.afm)
                setLocation(user.location)
            }
        }
    }, [userInfo, navigate, dispatch, user])


    const submitHandler = (e) =>{
        e.preventDefault()
        if (password !== confirmPassword) {
            setErrorMessage("Password does not match.")
        }
        else{
            dispatch(userUpdate({
                'id': user._id,
                'username': username,
                'name': name,
                'password': password,
                'email': email,
                'location': userlocation,
                // 'afm' : afk,
                // 'phone' : phone
            }))
        }
    }

    return (
    <Container>
        <Row className = "justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Edit your Profile</h1>

                {errorMessage && 
                    <div className="alert alert-dismissible alert-danger">
                    <strong>{errorMessage}</strong>
                    </div>
                }

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
                    
                    <Form.Group controlId='username' className='py-1'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            required
                            type='username' 
                            placeholder='Enter username' 
                            value={username}
                            onChange = {(e) => setUsername(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 
                    
                    <Form.Group controlId='name' className='py-1'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='name' 
                            placeholder='Enter name' 
                            value={name}
                            onChange = {(e) => setName(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='email' className='py-1'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            required
                            type='Email' 
                            placeholder='Enter email' 
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='location' className='py-1'>
                        <Form.Label>Location</Form.Label>
                        <Form.Control 
                            required
                            type='Location'   
                            placeholder='Disabled input' 
                            value={userlocation}
                            onChange = {(e) => setLocation(e.target.value)}
                        >        
                        </Form.Control>           
                    </Form.Group> 

                    {/* <Form.Group controlId='afm' className='py-1'>
                        <Form.Label>AFM</Form.Label>
                        <Form.Control 
                            required
                            type='text'   
                            placeholder='Disabled input' 
                            value={afm}
                            onChange = {(e) => setAfm(e.target.value)}
                        >        
                        </Form.Control>           
                    </Form.Group> 
                    
                    <Form.Group controlId='phone' className='py-1'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                            required
                            type='integer'   
                            placeholder='Disabled input' 
                            value={phone}
                            onChange = {(e) => setPhone(e.target.value)} 
                        >        
                        </Form.Control>           
                    </Form.Group>  */}
                
                    <Form.Group controlId='password' className='py-1'>
                        <Form.Label>New Password (Optional)</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Enter Password' 
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='passwordConfirm' className='py-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Confirm Password' 
                            value={confirmPassword}
                            onChange = {(e) => setConfirmPassword(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 
                        <Button type='submit' className="btn btn-dark btn-lg" style={{float: 'right'}}>
                            Save Changes
                        </Button>

                        <Link to='/profile'>
                            <Button type="button" className="btn btn-dark btn-lg">
                                Discard Changes
                            </Button>
                        </Link>

                </Form>

                
            </Col>
        </Row>
    </Container>
  )
}

export default RegisterScreen