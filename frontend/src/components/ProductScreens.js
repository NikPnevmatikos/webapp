import React, {useState, useEffect} from 'react'
import { Link , useParams} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card ,Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productsAction } from '../actions/ProductActions'
import Spinner from 'react-bootstrap/Spinner';


function ProductScreens() {
  const [qty, setQty] = useState(1)

  const match = useParams()

  const dispatch = useDispatch()
  const singleproduct = useSelector(state => state.productReducer)
  const { loading, error, product } = singleproduct
  //const {error, loading, product} = singleproduct

  useEffect(() => {
    dispatch(productsAction(match.id))
  } , [dispatch, match])

  //let product = {}
// paciently waiting for bebe to come back to meeee uUu me back
  return (
    <div>
      <Link to='/'>
        <button type="button" class="btn btn-secondary my-3">
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
          <div class="alert alert-dismissible alert-danger">
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
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as = "select"
                              value = {qty}
                              onChange = {(e) = ? setQt}
                              >
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                                
                    
                    <ListGroup.Item className='d-grid gap-2'>
                      <Button className='btn btn-dark btn-lg' type='button' disabled={product.countInStock===0}>Add to Cart</Button>
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