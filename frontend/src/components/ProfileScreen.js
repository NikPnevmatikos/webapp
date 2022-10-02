import React, { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from '../actions/userActions'
import { unreadMessageAction } from '../actions/MessagesActions'
import { Rating } from 'react-simple-star-rating'
import PhoneInput from 'react-phone-input-2'
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import 'react-phone-input-2/lib/style.css'

function ProfileScreen() {

    const navigate = useNavigate()
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')   
    const [phone, setPhone] = useState(0)
    const [afm , setAfm] = useState('') 
    const [buyerRating, setBuyerRating] = useState(0)
    const [sellerRating, setSellerRating] = useState(0)
    const [lat, setLat] = useState(0.0)
    const [lng, setLng] = useState(0.0)
    const [country, setCountry] = useState('')
    const [location, setLocation] = useState('')
    
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
            if (user == null || !user.name || Number(userInfo.id) !== Number(user.id))  {
                    dispatch(userProfile('profile'))
                    dispatch(unreadMessageAction())
            }
            else {
                if(user.verified === true){
                    setUsername(user.username)
                    setName(user.name)
                    setEmail(user.email)
                    setPhone(user.phone)
                    setAfm(user.afm)
                    setBuyerRating(user.buyer_rating)
                    setSellerRating(user.seller_rating)
                    setLat(user.lat)
                    setLng(user.lng)
                    setCountry(user.country)
                    setLocation(user.location)
                }
                else{
                    navigate('/verify')
                }
            }
        }
    }, [userInfo, navigate, dispatch, user])

    const submitHandler = (e) =>{
        e.preventDefault()
        navigate('/profile/update')
    }

    const CenterMap = ({lat,lng}) => {
        const map = useMap()
        
        useEffect(() => {
          map.setView([lat,lng])
        }, [lat,lng, map])
        
        return null
    
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
                            <Form.Label>Username:</Form.Label>
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
                            <Form.Label>Name:</Form.Label>
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
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type='Email'   
                                placeholder='Disabled input' 
                                value={email}
                                disabled
                                readOnly  
                            >        
                            </Form.Control>           
                        </Form.Group> 

                        <Form.Group controlId='afm' className='py-1'>
                            <Form.Label>AFM:</Form.Label>
                            <Form.Control 
                                type='text'   
                                placeholder='Disabled input' 
                                value={afm}
                                disabled
                                readOnly  
                            >        
                            </Form.Control>           
                        </Form.Group> 
                        
                    <Form.Group controlId='phone' className='py-1'>
                        <Form.Label>Phone:</Form.Label>
                            <PhoneInput
                                required
                                disabled
                                placeholder='Enter your Phone'
                                value={phone}
                                onChange = {setPhone}
                                inputStyle = {{
                                    background: "#f8f5f0"
                                }}
                            />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Country:</Form.Label>
                        <Form.Control
                            disabled
                            readOnly 
                            type='text' 
                            placeholder='Enter Country' 
                            value={country}
                            onChange = {(e) => setCountry(e.target.value)}   
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Location:</Form.Label>
                        <Form.Control
                            disabled
                            readOnly 
                            type='text' 
                            placeholder='Enter Location' 
                            value={location}
                            onChange = {(e) => setLocation(e.target.value)}   
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group className='py-2'> 
                        <Form.Label>Map Location:</Form.Label>
                        <MapContainer 
                                style={{width:'100%', height:'35vh'}} 
                                center={[0.0,0.0]} 
                                zoom={13} 
                                scrollWheelZoom={false}
                                //onClick={clickHandler}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[lat, lng]}>
                                <Popup>
                                    Product Location.
                                </Popup>
                            </Marker>
                            <CenterMap lat={lat} lng = {lng} />
                        </MapContainer>
                    </Form.Group> 
                    <Form.Group controlId='buyerRating' className='py-3'>
                        <Form.Label>Rating as Buyer : </Form.Label>
                        <Rating readonly={true} initialValue={buyerRating} />
                    </Form.Group>

                    <Form.Group controlId='sellerRating' className='py-3'>
                        <Form.Label>Rating as Seller : </Form.Label>
                        <Rating readonly={true} initialValue={sellerRating} />
                    </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen