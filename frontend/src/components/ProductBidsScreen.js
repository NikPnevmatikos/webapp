import React, { useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Table, Row, Col, Image} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { productsAction} from '../actions/ProductActions'
import { productListBidsAction } from '../actions/bidActions'
import { unreadMessageAction } from '../actions/MessagesActions'
import { Rating } from 'react-simple-star-rating'
import PageButtons from './PageButtons';
import { Link } from 'react-router-dom';

function ProductBidScreen() {
  
    const match = useParams()
    const location = useLocation()  
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const productBids = useSelector(state => state.productBidsListReducer)
    const { error, loading, bids, page, pages} = productBids

    const singleproduct = useSelector(state => state.productReducer)
    const { product } = singleproduct

    const singleuser = useSelector(state => state.userLoginReducer)
    const { userInfo } = singleuser
    
    let keyword = location.search
    useEffect(() => {
        if (userInfo != null) {
            if(userInfo.verified === true){
                dispatch(productListBidsAction(match.id,keyword)) 
                dispatch({ type: 'PRODUCT_RESET' })
                dispatch(productsAction(match.id))
                dispatch(unreadMessageAction())
            }
            else {
                navigate('/verify')
            }
        }
        else {
            navigate('/login')
        }
    }, [dispatch, match, navigate, userInfo, keyword])

    
    return (
        <div>
            <Link to='/myProducts'>
                <button type="button" className="btn btn-secondary my-3">
                    Go Back
                </button>
            </Link>

            {loading ? (
                <Spinner 
                animation="border" role="status" style={{ margin: 'auto',
                                                            display: 'block'
                                                        }}>
                    <span className="visually-hidden">Loading</span>
                </Spinner>
            ) : error   
                ? ( 
                    <div className="alert alert-dismissible alert-danger">
                    <strong>{error}</strong>
                    </div>
                ) : bids.length > 0 
                ? (
                    
                    <div>
                        <Row>
                            <Col md={3}>
                                <Image src={product.image} alt={product.name} fluid rounded />                     
                            </Col>
                            <Col md= {6}>
                                <h1>{product.name}</h1>

                            </Col>
                        </Row>
                        <Table striped bordered hover responsive className="table-sm my-3">

                            <thead>
                                <tr>
                                    <th>USER</th>
                                    <th>PLACED BID</th>
                                    <th>USER'S RATING</th>
                                </tr>
                            </thead>

                            <tbody>

                                {Array.isArray(bids)
                                    ?
                                    (bids.map(bid => (
                                            <tr key={bid._id}>
                                                <td style={{width:350}}>{bid.username}</td>
                                                <td>{bid.value}</td>
                                                <td>
                                                    <Rating readonly={true} initialValue={bid.seller_rating} />
                                                </td>
                                            </tr>
                                
                                    ))
                                    ):
                                        null
                                }
                            </tbody>
                    
                        </Table>     
                        <PageButtons 
                            page={page}
                            pages={pages}
                            productBidsScreen={true}
                            productid = {match.id}
                        />
                    </div>  
                
                ):
                <h1>There is no placed bids Yet</h1> 
            }
    </div>
    )
}

export default ProductBidScreen