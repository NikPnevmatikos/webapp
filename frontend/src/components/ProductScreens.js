import React, {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card ,Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productsAction } from '../actions/ProductActions'
import { createBidAction } from '../actions/bidActions'
import { xmlAction,jsonAction } from '../actions/userActions'
import { Rating } from 'react-simple-star-rating'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Spinner from 'react-bootstrap/Spinner';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'


function ProductScreens() {
  const [bid, setBid] = useState('')
  const [Message, setMessage] = useState('')
  const [currentDate, setCurrent] = useState('')


  const match = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const singleproduct = useSelector(state => state.productReducer)
  const { loading, error, product } = singleproduct

  const userLogin = useSelector(state => state.userLoginReducer)
  const { userInfo } = userLogin

  const mybid = useSelector(state => state.createBidReducer)
  const { loading: bidload, error: biderror, success, message } = mybid

  useEffect(() => {

    let mydate = new Date()
    let month = mydate.getMonth()+1 <10 ? `0${mydate.getMonth()+1}`:`${mydate.getMonth()+1}`
    let day = mydate.getDate() <10 ? `0${mydate.getDate()}`:`${mydate.getDate()}`
    let hours = mydate.getHours() <10 ? `0${mydate.getHours()}`:`${mydate.getHours()}`
    let minutes = mydate.getMinutes() <10 ? `0${mydate.getMinutes()}`:`${mydate.getMinutes()}`
    let seconds = mydate.getSeconds() <10 ? `0${mydate.getSeconds()}`:`${mydate.getSeconds()}`
    
    setCurrent(`${mydate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`)

    dispatch({ type: 'PRODUCT_RESET' })
    dispatch(productsAction(match.id))


    if (success === true) {
      setMessage(message)
    }
  } , [dispatch, match, success, message])

  const addBidHandler = () => {
    if (Number(product.currently) <= 0) {
      if (Number(bid) < Number(product.first_bid)) {
        window.alert('Your bid must be higher or equal to starting bid price!')
      }
      else {
        dispatch(createBidAction(product._id, bid))
      }
    }
    else {
      if (Number(bid) <= Number(product.currently)) {
        window.alert('Your bid must be higher than the current bid price!')
      }
      else {
        dispatch(createBidAction(product._id, bid))
      }
    }
  }

  const downloadHandler = (format,id,name) => {
    window.alert('Added to downloads')
    if(format === 'xml'){
      dispatch(xmlAction(id,name))
    }
    else{
      dispatch(jsonAction(id,name))
    }
  }

  const CenterMap = ({lat,lng}) => {
    const map = useMap()
    
    useEffect(() => {
      map.setView([lat,lng])
    }, [lat,lng, map])
    
    return null

  } 
  
  return (
    <div>

        <Button onClick = {() => navigate(-1)} type="button" className="btn btn-secondary my-3">
          Go Back
        </Button>

        {(userInfo && userInfo.is_staff === true) &&
            <OverlayTrigger
              trigger="click"
              key='bottom'
              placement='bottom'
              overlay={
                  <Popover id={`popover-positioned-bottom`}>
                  <Popover.Header as="h3">{'Choose Format'}</Popover.Header>
                  <Popover.Body>
                      <Button variant='light' onClick={() => downloadHandler('xml',product._id,product.name)}>
                          XML
                      </Button>
                      <Button variant='light' onClick={() => downloadHandler('json',product._id,product.name)}>
                          JSON
                      </Button>
                  </Popover.Body>
                  </Popover>
              }
            >
              <Button 
                    className="btn btn-secondary my-3"
                    style={{float: 'right'}}
              >
                XML/JSON
              </Button>
            </OverlayTrigger>
        }
      {biderror ? (
          <div className="alert alert-dismissible alert-danger">
            <strong>{biderror}</strong>
          </div>
        ) : (
          Message && 
          <div className="alert alert-dismissible alert-success">
            <strong>{Message}</strong>
          </div>
      )} 

      {bidload &&
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
            <strong>{error}</strong>
          </div>
          :
          <div>
            <Row>
              {product.started > currentDate  ? 
                <div className="alert alert-dismissible alert-primary">
                <strong>Auction has not started yet</strong>
                </div>
                : 
                (product.ended < currentDate || product.payed === true) &&
                  <div className="alert alert-dismissible alert-primary">
                  <strong>Auction has ended</strong>
                  </div>
              } 
            </Row>
            <Row>
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>

              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <strong>Buy Price: </strong>{product.price}$ 
                    <p className='text-muted'><small>If you bid higher or the same price as the buy price, you automatically win the auction.</small></p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Current Bid: </strong> { product.currently}$
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Starting Bid: </strong> {product.first_bid}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Starting date: </strong> {product.started}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Ending Date: </strong> {product.ended}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Description: </strong> {product.description}
                  </ListGroup.Item>

                </ListGroup>
              </Col>
              
              <Col md={3}>
                
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Current Bid:
                        </Col>
                        <Col>
                          <strong>
                            ${product.currently}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Bid:</Col>
                          <Col>
                            <Form.Control 
                              type='number' 
                              placeholder='Bid'
                              value = {bid}
                              onChange= {(e) => setBid(e.target.value)}  
                            />                              
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                              
                    <ListGroup.Item className='d-grid gap-2'>
                      <Button 
                        onClick={addBidHandler}
                        className='btn btn-dark btn-lg'
                        type='button' 
                        disabled={product.started > currentDate || product.ended < currentDate || product.payed === true}
                      >
                        Add Bid plz uwu
                      </Button>
                      
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
                
                <Card className='mt-3'>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                          <Col>
                            Published By:
                          </Col>
                          <Col>
                            <strong>
                              {product.owner}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Seller's Rating:
                          </Col>
                          <Col>
                            <Rating readonly={true} initialValue={product.ownerrating} />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                  </ListGroup>
                
                </Card>

              </Col>
            </Row>
            <Row>
              {product &&
                <MapContainer 
                        style={{width:'60vw', height:'60vh'}} 
                        center={[0.0,0.0]} 
                        zoom={13} 
                        scrollWheelZoom={false}
                        //onClick={clickHandler}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[product.lat, product.lng]}>
                        <Popup>
                            {product.location} in {product.country}.
                        </Popup>
                    </Marker>
                    <CenterMap lat={product.lat} lng = {product.lng} />
                </MapContainer>
            }
            </Row>
          </div>
      }                            
    </div>
  )
}

export default ProductScreens