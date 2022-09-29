import React, { useState, useEffect} from 'react'
import { Link , useNavigate ,useParams} from 'react-router-dom'
import { Form, Container, Button, Col, Row, Image, FormLabel } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { productsAction , editProductAction} from '../actions/ProductActions';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'

function EditProduct() {

    const match = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')    
    const [description, setDescription] = useState('')   
    const [price, setPrice] = useState('')   
    const [firstBid, setFirstBid] = useState('')
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')
    const [startingdate, setstartingdate] = useState('');
    const [endingdate, setendingdate] = useState('');
    const [payed, setPayed] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [currentDate, setCurrent] = useState('')
    const [lat, setLat] = useState(0.0)
    const [lng, setLng] = useState(0.0)
    const [flag, setFlag] = useState(false)
    const [country, setCountry] = useState('')
    const [location, setLocation] = useState('')

    const dispatch = useDispatch()

    const singleProduct = useSelector(state => state.productReducer)
    const {error, loading, product} = singleProduct

    const editproduct = useSelector(state => state.editProductReducer)
    const { error: errorEdit, loading: loadingEdit, success: successEdit } = editproduct


    useEffect(() =>{

        let mydate = new Date()
        let month = mydate.getMonth()+1 <10 ? `0${mydate.getMonth()+1}`:`${mydate.getMonth()+1}`
        let day = mydate.getDate() <10 ? `0${mydate.getDate()}`:`${mydate.getDate()}`
        let hours = mydate.getHours() <10 ? `0${mydate.getHours()}`:`${mydate.getHours()}`
        let minutes = mydate.getMinutes() <10 ? `0${mydate.getMinutes()}`:`${mydate.getMinutes()}`
        let seconds = mydate.getSeconds() <10 ? `0${mydate.getSeconds()}`:`${mydate.getSeconds()}`
        
        setCurrent(`${mydate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`)

        if (startingdate != null && currentDate != null) {
            if (currentDate > startingdate || payed === true) {
                navigate('/myProducts')
            }
        }
        if (successEdit === true) {
            dispatch({ type: 'EDIT_PRODUCT_RESET' })
            navigate('/myProducts')
        }
        if (!product || product._id !== Number(match.id)) {
            dispatch(productsAction(match.id))
        }
        else {
            setName(product.name)
            setBrand(product.brand)
            setCategory(product.category)
            setImage(product.image)
            setPreview(product.image)
            setDescription(product.description)
            setFirstBid(product.first_bid)
            setPrice(product.price)
            setstartingdate(product.started)
            setendingdate(product.ended)
            setPayed(product.payed)
            setLat(product.lat)
            setLng(product.lng)
            setCountry(product.country)
            setLocation(product.location)
        }
    }, [dispatch, product, match, navigate, successEdit, startingdate, currentDate, payed])

    const upload = (e) => {
        setFlag(true)
        const file = e.target.files[0]
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

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

            form.append('_id', match.id)
            form.append('name', name)
            form.append('flag',flag)
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

            dispatch(editProductAction(form))
        }
    }


    const CenterMap = ({lat,lng}) => {
        const map = useMap()
        
        useEffect(() => {
          map.setView([lat,lng])
        }, [lat,lng, map])
        
        return null
    
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
                <h1>Edit a Little Product</h1>

                {errorMessage && 
                    <div className="alert alert-dismissible alert-danger">
                    <strong>{errorMessage}</strong>
                    </div>
                }

                {errorEdit && 
                    <div className="alert alert-dismissible alert-danger">
                    <strong>{errorEdit}</strong>
                    </div>
                }
                
                {loadingEdit &&
                    <Spinner 
                    animation="border" role="status" style={{ margin: 'auto',
                                                                display: 'block'
                                                            }}>
                        <span className="visually-hidden">Loading</span>
                    </Spinner>
                }
                

                {loading ? 
                    <Spinner 
                    animation="border" role="status" style={{ margin: 'auto',
                                                                display: 'block'
                                                            }}>
                        <span className="visually-hidden">Loading</span>
                    </Spinner>
                    : error ?
                        <div className="alert alert-dismissible alert-danger">
                            <strong>{errorEdit}</strong>
                        </div>   
                        : (
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
                                        <Form.Label>Image Preview:</Form.Label>
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

                                <Form.Group controlId='firstbid' className='py-1'>
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
                                    {/* <DateTimePicker 
                                        required
                                        // controls={['date', 'time']}
                                        // dateFormat="YYYY-MM-DD"
                                        // timeFormat="H:MM:ss"
                                        format = "y-MM-dd h:mm:ss"
                                        onChange={(e) => setstartingdate(new Date(e.target.value))} 
                                        value={startingdate} 
                                    /> */}
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
                            {/* <DateTimePicker 
                                required
                                // controls={['date', 'time']}
                                // dateFormat="YYYY-MM-DD"
                                // timeFormat="H:MM:ss"
                                format = "y-MM-dd h:mm:ss"
                                onChange={(e) => setendingdate(new Date(e.target.value))} 
                                value={endingdate} 
                            /> */}
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
                    
                    <Form.Group className='py-2'> 
                        <FormLabel>Map Location:</FormLabel>
                        <MapContainer 
                                required
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
                            <LocationSet/>
                            <Marker position={[lat, lng]}>
                                <Popup>
                                    Product Location.
                                </Popup>
                            </Marker>
                            <CenterMap lat={lat} lng = {lng} />
                        </MapContainer>
                    </Form.Group> 
            
                                <Button type='submit' className="btn btn-dark btn-lg float-right" style={{float: 'right'}}>
                                    Save Changes
                                </Button>
            
                                <Link to='/myProducts'>
                                        <Button type="button" className="btn btn-dark btn-lg">
                                            Discard Changes
                                        </Button>
                                </Link>
            
                            </Form>
                        )                     
                    }
            </Col>
        </Row>
    </Container>
  )
}

export default EditProduct