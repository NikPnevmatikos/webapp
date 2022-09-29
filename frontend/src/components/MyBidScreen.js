import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation} from 'react-router-dom'
import { Table, Button, Row, Col, Image} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userListBidsAction, deleteBidAction } from '../actions/bidActions'
import { buyerReviewAction } from '../actions/userActions'
import PageButtons from './PageButtons';
import { FaTrash, FaMedal, FaSadCry } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'

function MyBidScreen() {
  
    const location = useLocation()  
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [currentDate, setCurrent] = useState('')
    const [rating, setRating] = useState(0) 
    const [ratingmessage, setRatingMessage] = useState('') 

    const userBids = useSelector(state => state.userBidsListReducer)
    const { error, loading, bids, page, pages} = userBids
    
    const deleteBid = useSelector(state => state.deleteBidReducer)
    const {error: delete_error, loading: delete_load, success } = deleteBid


    const singlerating = useSelector(state => state.buyerReviewReducer)
    const { success: ratesuccess, message: ratemessage } = singlerating

    const singleuser = useSelector(state => state.userLoginReducer)
    const { userInfo } = singleuser
    
    let keyword = location.search
    useEffect(() => {

        dispatch({type: 'BUYER_REVIEW_RESET'})
        let mydate = new Date()
        let month = mydate.getMonth()+1 <10 ? `0${mydate.getMonth()+1}`:`${mydate.getMonth()+1}`
        let day = mydate.getDate() <10 ? `0${mydate.getDate()}`:`${mydate.getDate()}`
        let hours = mydate.getHours() <10 ? `0${mydate.getHours()}`:`${mydate.getHours()}`
        let minutes = mydate.getMinutes() <10 ? `0${mydate.getMinutes()}`:`${mydate.getMinutes()}`
        let seconds = mydate.getSeconds() <10 ? `0${mydate.getSeconds()}`:`${mydate.getSeconds()}`
        
        setCurrent(`${mydate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`)

        if (userInfo != null) {
            if(userInfo.verified === true){
                dispatch(userListBidsAction(keyword)) 
            }
            else{
                navigate('/verify')
            }
        }
        else {
            navigate('/login')
        }

        if (ratesuccess === true) {
            setRatingMessage(ratemessage)
        }

    }, [dispatch, navigate, userInfo, keyword, success, ratesuccess, ratemessage])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this Product?')) {
            dispatch(deleteBidAction(id))
        }
    }

    const sendMessageHandler = (id) => {
        navigate(`/message/${id}`)
    }
    
    const handleRating = (number) => {
        setRating(number/20)

    }

    const submitHandler = (id, number) => {
        dispatch(buyerReviewAction(id, number))
    }
    
    return (
        <div>
            <Row className="align-items-center my-3">
                <Col>
                    <h1>My Bid List</h1>
                </Col>
            </Row>


            {ratingmessage &&
                <div className="alert alert-dismissible alert-success">
                    <strong>{ratingmessage}</strong>
                </div> 
            }

            {delete_load && 
                <Spinner 
                animation="border" role="status" style={{ margin: 'auto',
                                                            display: 'block'
                                                        }}>
                    <span className="visually-hidden">Loading</span>
                </Spinner>
            }

            {delete_error && 
                <div className="alert alert-dismissible alert-danger">
                    <strong>{error}</strong>
                </div>
            }


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
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>IMAGE</th>
                                    <th>NAME</th>
                                    <th>BRAND</th>
                                    <th>CURRENT BID</th>
                                    <th>YOUR BID</th>
                                    <th>STATE</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>

                                {Array.isArray(bids)
                                    ?
                                    (
                                        bids.map(bid => (
                                            <tr key={bid._id}>
                                                <td>
                                                    <LinkContainer to= {`/product/${bid.product}/`}>
                                                        <Image

                                                            src={bid.image} 
                                                            alt= {bid.name} 
                                                            width={150} 
                                                            height={150} 
                                                            fluid 
                                                            rounded
                                                        />
                                                    </LinkContainer>
                                                    
                                                </td>
                                                <td>
                                                    <Link to={`/product/${bid.product}/`} style={{color: 'black'}}>
                                                        {bid.name}
                                                    </Link>
                                                </td>
                                                <td>{bid.brand}</td>
                                                <td>{bid.currently}</td>                                               
                                                <td>{bid.currently === bid.value ?
                                                        
                                                        <div className="text-success">
                                                            {bid.value}
                                                        </div> 
                                                    :
                                                        <div className="text-primary">
                                                            {bid.value}
                                                        </div> 
                                                    }
                                                </td>
                                                <td>
                                                    {(bid.end <= currentDate || bid.payed === true) ? (
                                                        bid.winningBid === true ? (
                                                            <div>
                                                                <h5 className="text-success">
                                                                    Winning Bid <FaMedal/>
                                                                </h5>

                                                                <Button className="btn-default btn-secondary" onClick = {() => sendMessageHandler(bid.owner)} >
                                                                    Message
                                                                </Button>


                                                                <>
                                                                    
                                                                    <OverlayTrigger
                                                                        trigger="click"
                                                                        key='bottom'
                                                                        placement='bottom'
                                                                        overlay={
                                                                            <Popover id={`popover-positioned-bottom`}>
                                                                            <Popover.Header as="h3">{`Rate the Seller!`}</Popover.Header>
                                                                            <Popover.Body>
                                                                                <strong>Congratulations For Winning!</strong> Please leave a rating :
                                                                                <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
                                                                                <Button variant='light' onClick={() => submitHandler(bid.owner, rating)}>
                                                                                    Submit
                                                                                </Button>
                                                                            </Popover.Body>
                                                                            </Popover>
                                                                        }
                                                                    >

                                                                        <Button variant="light">Rate</Button>
                                                                    </OverlayTrigger>
                                                                    
                                                                </>
                                                                                                                                
                                                            </div>
                                                        )
                                                        :
                                                            <div className="text-primary">
                                                                Lost Bid
                                                            </div>
                                                    ) : 
                                                    <div>
                                                        Pending...
                                                    </div>
                                                    }
                                                </td>
                                                <td>
                                                    <Button disabled={currentDate >= bid.end || bid.payed === true} className="btn-default btn-danger" onClick={() => deleteHandler(bid._id)}>
                                                        <FaTrash/>
                                                    </Button>
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
                            bidScreen={true}
                        />
                    </div>  
                
                ):
                <h4>You Have <strong>No Bids</strong> Yet <FaSadCry/> </h4> 
            }
    </div>
    )
}

export default MyBidScreen