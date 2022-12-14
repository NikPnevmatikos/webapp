import React, { useState, useEffect } from 'react'
import { Link , useNavigate, useLocation } from 'react-router-dom'
import { Form, Container, Button, Col, Row, FormLabel } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import PhoneInput from 'react-phone-input-2'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'react-phone-input-2/lib/style.css'

function RegisterScreen() {

    const location = useLocation()  
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')    
    const [phone, setPhone] = useState()
    const [afm , setAfm] = useState('')
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [country, setCountry] = useState('')
    const [userlocation, setUserLocation] = useState('')

    const [password, setPassword] = useState('')   
    const [confirmPassword, setConfirmPassword] = useState('')   
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegisterReducer)
    const {error, loading, userInfo} = userRegister

    useEffect(() =>{
        if (userInfo != null) {
            if(userInfo.verified === true){
                navigate(redirect)  
            }
            else {
                navigate('/verify')
            }
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        if (password !== confirmPassword) {
            setErrorMessage("Password does not match.")
        }
        else {
            dispatch(register(username, email, name, userlocation, country, lat, lng, phone, afm, password))
        }
    }


    const LocationSet = () => {
        const map = useMapEvents({
            click(e) {
              const {lat, lng} = e.latlng
              setLat(lat)
              setLng(lng)
              map.flyTo(e.latlng, map.getZoom())
            },
        })
        return null
    }


    return (
    <Container>
        <Row className = "justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Sign Up</h1>

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
                        <Form.Label>Username:</Form.Label>
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
                        <Form.Label>Name:</Form.Label>
                        <Form.Control 
                            type='name' 
                            placeholder='Enter name' 
                            value={name}
                            onChange = {(e) => setName(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='afm' className='py-1'>
                        <Form.Label>AFM:</Form.Label>
                        <Form.Control 
                            required
                            type='text'   
                            placeholder='Enter Your AFM' 
                            value={afm}
                            onChange = {(e) => setAfm(e.target.value)}
                        >        
                        </Form.Control>           
                    </Form.Group> 
                    
                    <Form.Group controlId='phone' className='py-1'>
                            <Form.Label>Phone:</Form.Label>
                                <PhoneInput
                                    required
                                    placeholder='Enter your Phone'
                                    value={phone}
                                    onChange = {setPhone}                                   
                                />
                        </Form.Group>

                    <Form.Group controlId='email' className='py-1'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            required
                            type='Email' 
                            placeholder='Enter email' 
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 
                    
                    <Form.Group controlId='password' className='py-1'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            required
                            type='password' 
                            placeholder='Enter Password' 
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='passwordConfirm' className='py-1'>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control 
                            required
                            type='password' 
                            placeholder='Confirm Password' 
                            value={confirmPassword}
                            onChange = {(e) => setConfirmPassword(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 


                    <Form.Group controlId='location' className='py-1'>
                        <Form.Label>Location:</Form.Label>
                        <Form.Control 
                            required
                            type='Location'   
                            placeholder='Enter your Location' 
                            value={userlocation}
                            onChange = {(e) => setUserLocation(e.target.value)}
                        >        
                        </Form.Control>           
                    </Form.Group> 
                    
                    <Form.Group>
                        <Form.Label>Country:</Form.Label>
                        <Form.Control
                            required
                            type='text' 
                            placeholder='Enter Country' 
                            value={country}
                            onChange = {(e) => setCountry(e.target.value)}   
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='py-3'> 
                        <FormLabel>Map Location:</FormLabel>
                        <MapContainer 
                                required
                                style={{width:'100%', height:'35vh'}} 
                                center={[37.962687, 23.721688]} 
                                zoom={13} 
                                scrollWheelZoom={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationSet/>
                            {(lat != null && lng != null) &&
                                <Marker position={[lat, lng]}>
                                    <Popup>
                                        You are Here.
                                    </Popup>
                                </Marker>

                            }
                        </MapContainer>
                    </Form.Group> 
            

                    <Button type='submit' className="btn btn-dark btn-lg float-right" style={{float: 'right'}}>
                        Register
                    </Button>
                </Form>

                <Row className='py-5'>
                    <Col>
                        Already Have an Account? 
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Sign In
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default RegisterScreen