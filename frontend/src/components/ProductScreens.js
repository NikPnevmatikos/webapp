import React, {useState, useEffect} from 'react'
import { Link , useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card ,Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productsAction } from '../actions/ProductActions'
import { createBidAction } from '../actions/bidActions'
import Spinner from 'react-bootstrap/Spinner';


function ProductScreens() {
  const [bid, setBid] = useState('')
  const [Message, setMessage] = useState('')

  const match = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const singleproduct = useSelector(state => state.productReducer)
  const { loading, error, product } = singleproduct
  //const {error, loading, product} = singleproduct

  const mybid = useSelector(state => state.createBidReducer)
  const { loading: bidload, error: biderror, success, message } = mybid

  useEffect(() => {
    dispatch({ type: 'PRODUCT_RESET' })
    dispatch(productsAction(match.id))
    if (success == true) {
      setMessage(message)
    }
  } , [dispatch, match, success])

  const addBidHandler = () => {
    //navigate(`/myBids/${match.id}?bid=${bid}`)
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

  //let product = {}
  return (
    <div>
      <Link to='/'>
        <button type="button" className="btn btn-secondary my-3">
          Go Back
        </button>
      </Link>

      {Message && 
          <div className="alert alert-dismissible alert-success">
          <strong>{Message}</strong>
          </div>
      }
      {biderror && 
          <div className="alert alert-dismissible alert-danger">
          <strong>{biderror}</strong>
          </div>
      }    
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
                        disabled={product.countInStock===0}
                      >
                        Add Bid plz uwu
                      </Button>
                      
                    </ListGroup.Item>
                  </ListGroup>
                </Card>

              </Col>
            </Row>
            
      }                            
    </div>
  )
}

export default ProductScreens