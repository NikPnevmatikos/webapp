import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap' 
import { newBid, removeBid} from '../actions/bidActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function MyBids( ) {
    const match = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const product = match.id
    const bidvalue = location.search ? Number(location.search.split('=')[1]) : 0
    
    const dispatch = useDispatch()
    const singleproduct = useSelector(state => state.bidReducer)
    const { bidItems } = singleproduct
    
    useEffect(() => {
        if (product && bidvalue) {
            dispatch(newBid(product, bidvalue))
        }
    }, [dispatch, product, bidvalue])

    const removeItem = (tobeRemoved) => {
      dispatch(removeBid(tobeRemoved))
    }
    
    return (
        <Row>
          <Col md={10}>
            <h1 className ='my-3'>My Bids</h1>
            {bidItems.length === 0 ? (
                <h5>
                  There is no added bids. 
                  <Link to='/'>Go Back</Link>
                </h5>
                ) : (
                    <ListGroup>
                        {bidItems.map(item => (
                            <ListGroup.Item  key={item.product}>
                                <Row>
                                    <Col md={2}>
                                      <Link style={{color:'black'}} to={`/product/${item.product}`}>
                                        <Image src={item.image} alt= {item.name} fluid rounded/>
                                      </Link>
                                    </Col>
                                    <Col md={3}>
                                        <Link style={{color:'black'}} to={`/product/${item.product}`}>
                                          {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2} >
                                        Placed bid: <strong>{item.bid}</strong>$
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={()=> removeItem(item.product)}
                                        >
                                          <h5>x</h5>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
                
            }
            
            </Col>
        </Row>
    )
}

export default MyBids