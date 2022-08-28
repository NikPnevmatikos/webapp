import React, {useState, useEffect} from 'react'
import { Link , useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card ,Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productsAction } from '../actions/ProductActions'
import Spinner from 'react-bootstrap/Spinner';


function ProductScreens() {
  const [bid, setBid] = useState(0)

  const match = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const singleproduct = useSelector(state => state.productReducer)
  const { loading, error, product } = singleproduct
  //const {error, loading, product} = singleproduct

  useEffect(() => {
    dispatch(productsAction(match.id))
  } , [dispatch, match])

  const addBidHandler = () => {
    navigate(`/myBids/${match.id}?bid=${bid}`)
  }

  //let product = {}
  return (
    <div>
      <Link to='/'>
        <button type="button" className="btn btn-secondary my-3">
          Go Back
        </button>
      </Link>
      
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
                    Price: ${product.price}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Published by: {product.User}
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
                            ${product.price}
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