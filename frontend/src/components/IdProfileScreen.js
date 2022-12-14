import React, { useState, useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Form, Container, Button, Col, Row, FormLabel } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from '../actions/userActions'
import { unreadMessageAction } from '../actions/MessagesActions'
import { Rating } from 'react-simple-star-rating'
import PhoneInput from 'react-phone-input-2'
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
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
    const [lat, setLat] = useState(0.0)
    const [lng, setLng] = useState(0.0)
    const [country, setCountry] = useState('')
    const [buyerRating, setBuyerRating] = useState(0)
    const [sellerRating, setSellerRating] = useState(0)

    const [verified, setVerified] = useState(false)
    
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.userProfileReducer)
    const {error, loading, user} = userprofile

    const userLogin = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLogin

    useEffect(() =>{
        if (userInfo == null || userInfo.is_staff === false) {
            navigate('/login')
        }
        else {
            if (user == null || !user.name || Number(user.id) !== Number(userId))  {
                dispatch(userProfile(`profile/${userId}`))
                dispatch(unreadMessageAction())
            }
            else {
                setUsername(user.username)
                setName(user.name)
                setEmail(user.email)
                setPhone(user.phone)
                setAfm(user.afm)
                setLocation(user.location)
                setLat(user.lat)
                setLng(user.lng)
                setCountry(user.country)
                setVerified(user.verified)
                setBuyerRating(user.buyer_rating)
                setSellerRating(user.seller_rating)
            }
        }
    }, [userInfo, navigate, dispatch, user, userId])

    const submitHandler = (e) =>{
        e.preventDefault()
        navigate(-1)
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

                        <Form.Group controlId='location' className='py-1'>
                            <Form.Label>Location:</Form.Label>
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
                        <FormLabel>Map Location:</FormLabel> 
                        <MapContainer 
                                style={{width:'100%', height:'35vh'}} 
                                center={[0.0,0.0]} 
                                zoom={13} 
                                scrollWheelZoom={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[lat, lng]}>
                                <Popup>
                                    Users Location.
                                </Popup>
                            </Marker>
                            <CenterMap lat={lat} lng = {lng} />
                        </MapContainer>
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

                        <Form.Group controlId='buyerRating' className='py-3'>
                            <Form.Label>Rating as Buyer : </Form.Label>
                            <Rating readonly={true} initialValue={buyerRating} />
                        </Form.Group>

                        <Form.Group controlId='sellerRating' className='py-3'>
                            <Form.Label>Rating as Seller : </Form.Label>
                            <Rating readonly={true} initialValue={sellerRating} />
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