import React, { useState, useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { Form, Container, Button, Col, Row, Image } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'
import { unreadMessageAction } from '../actions/MessagesActions'
import { createProductAction } from '../actions/ProductActions';

function CreateProductScreen() {
 
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')    
    const [description, setDescription] = useState('')   
    const [price, setPrice] = useState(0)   
    const [preview, setPreview] = useState('')
    const [image, setImage] = useState()
    const [firstBid, setFirstBid] = useState(0)
    const [startingdate, setstartingdate] = useState('');
    const [endingdate, setendingdate] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [currentDate, setCurrent] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [country, setCountry] = useState('')
    const [location, setLocation] = useState('')


    const dispatch = useDispatch()

    const createProduct = useSelector(state => state.createProductReducer)
    const {error, loading, product} = createProduct

    const userLogin = useSelector(state => state.userLoginReducer)
    const {userInfo} = userLogin

    useEffect(() =>{
        let mydate = new Date()
        let month = mydate.getMonth()+1 <10 ? `0${mydate.getMonth()+1}`:`${mydate.getMonth()+1}`
        let day = mydate.getDate() <10 ? `0${mydate.getDate()}`:`${mydate.getDate()}`
        let hours = mydate.getHours() <10 ? `0${mydate.getHours()}`:`${mydate.getHours()}`
        let minutes = mydate.getMinutes() <10 ? `0${mydate.getMinutes()}`:`${mydate.getMinutes()}`
        let seconds = mydate.getSeconds() <10 ? `0${mydate.getSeconds()}`:`${mydate.getSeconds()}`
        
        setCurrent(`${mydate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`)

        dispatch({type:'CREATE_PRODUCT_RESET'})
        if (userInfo == null) {
            navigate('/login/')
        }
        else {
            if (product != null) {
                navigate('/myProducts')
            }
            dispatch(unreadMessageAction())
        }

        console.log(lat,lng)
    }, [dispatch, userInfo, navigate, product,lat,lng])


    const submitHandler = (e) => {
        e.preventDefault()
        if (startingdate < currentDate) {
            setErrorMessage("Starting date should be after today's date or today!")
        }
        else if (startingdate >= endingdate) {
            setErrorMessage("Endend date should be after starting date.")
        }
        else {
           const form = new FormData()

            form.append('name', name)
            form.append('brand', brand)
            form.append('category', category)
            form.append('price', price)
            form.append('description', description)
            form.append('image', image)
            form.append('firstBid', firstBid)
            form.append('startingdate', startingdate)
            form.append('endingdate', endingdate)
            form.append('lat', lat)
            form.append('lng', lng)
            form.append('country', country)
            form.append('location', location)

            dispatch(createProductAction(form))
        }
    }

    const upload = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setPreview(URL.createObjectURL(file))
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
                <h1>Create A Product</h1>

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
                    <Form.Group controlId='name' className='py-1'>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control 
                            required
                            type='name' 
                            placeholder='Enter Name' 
                            value={name}
                            onChange = {(e) => setName(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 

                    {preview && 
                        <Form.Group>
                            <Form.Label>Preview:</Form.Label>
                            <Image 
                                src={preview} 
                                alt= {preview} 
                                width={150} 
                                height={150} 
                                fluid 
                                rounded
                            />
                            
                        </Form.Group>}

                    <Form.Group controlId='image' className='py-1'>
                        <Form.Label>Image:</Form.Label>
                        <Form.Control 
                            required
                            type='file' 
                            onChange = {upload}                            
                        >        
                        </Form.Control>
                    </Form.Group> 
                    
                    <Form.Group controlId='brand' className='py-1'>
                        <Form.Label>Brand:</Form.Label>
                        <Form.Control 
                            required
                            type='brand' 
                            placeholder='Enter Brand' 
                            value={brand}
                            onChange = {(e) => setBrand(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='category' className='py-1'>
                        <Form.Label>Category:</Form.Label>
                        <Form.Control 
                            required
                            type='Category' 
                            placeholder='Enter Category' 
                            value={category}
                            onChange = {(e) => setCategory(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 
                    
                    <Form.Group controlId='price' className='py-1'>
                        <Form.Label>Buy Price:</Form.Label>
                        <Form.Control 
                            required
                            type='number' 
                            placeholder='Enter Buy Price' 
                            value={price}
                            onChange = {(e) => setPrice(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='bid' className='py-1'>
                        <Form.Label>Starting Bid:</Form.Label>
                        <Form.Control 
                            required
                            type='number' 
                            placeholder='Enter Starting Bid' 
                            value={firstBid}
                            onChange = {(e) => setFirstBid(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='description' className='py-1'>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control 
                            required
                            type='text' 
                            placeholder='Enter Description' 
                            value={description}
                            onChange = {(e) => setDescription(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='startingdate' className='py-1'>
                        <Form.Label>Starting Date:</Form.Label>                        
                        <Form.Control 
                            required
                            type='text' 
                            placeholder='Enter YYYY-MM-DD HH:MM:ss' 
                            value={startingdate}
                            onChange = {(e) => setstartingdate(e.target.value)}                            
                        ></Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='endingdate' className='py-1'>
                        <Form.Label>Ending Date:</Form.Label>                        
                        <Form.Control 
                            required
                            type='text' 
                            placeholder='Enter YYYY-MM-DD HH:MM:ss' 
                            value={endingdate}
                            onChange = {(e) => setendingdate(e.target.value)}                            
                        ></Form.Control>
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

                    <Form.Group>
                        <Form.Label>Location:</Form.Label>
                        <Form.Control
                            required
                            type='text' 
                            placeholder='Enter Location' 
                            value={location}
                            onChange = {(e) => setLocation(e.target.value)}   
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='map' className='py-1'>
                        <Form.Label>Map data:</Form.Label>    
                        <MapContainer 
                                required
                                style={{width:'100%', height:'35vh'}} 
                                center={[37.962687, 23.721688]} 
                                zoom={7} 
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
                        Create
                    </Button>

                    <Link to='/myProducts'>
                            <Button type="button" className="btn btn-dark btn-lg">
                                Discard
                            </Button>
                    </Link>

                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default CreateProductScreen