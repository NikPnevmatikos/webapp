import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation} from 'react-router-dom'
import { Table, Button, Row, Col, Image} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userListBidsAction, deleteBidAction } from '../actions/bidActions'
import PageButtons from './PageButtons';
import { FaTrash, FaMedal } from "react-icons/fa";
import { Link } from 'react-router-dom';

function MyBidScreen() {
  
    const location = useLocation()  
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [currentDate, setCurrent] = useState('')

    const userBids = useSelector(state => state.userBidsListReducer)
    const { error, loading, bids, page, pages} = userBids
    
    const deleteBid = useSelector(state => state.deleteBidReducer)
    const {error: delete_error, loading: delete_load, success } = deleteBid

    const singleuser = useSelector(state => state.userLoginReducer)
    const { userInfo } = singleuser
    
    let keyword = location.search
    useEffect(() => {
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
    }, [dispatch , navigate, userInfo, keyword, success])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this Product?')) {
            dispatch(deleteBidAction(id))
        }
    }

    const sendMessageHandler = (id) => {
        navigate(`/message/${id}`)
    }
    
    return (
        <div>
            <Row className="align-items-center my-3">
                <Col>
                    <h5>uwu my little kawaii Bid list uwu</h5>
                </Col>
                {/* <Col className='text-right'>
                    <Button className="btn btn-dark btn-lg float-right" style={{float: 'right'}} onClick={() => createProduct()}>
                        Create Product    
                    </Button>    
                </Col> */}
            </Row>

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
                                                        
                                                        <h5 className="text-success">
                                                            {bid.value}
                                                        </h5> 
                                                    :
                                                        <h5 className="text-danger">
                                                            {bid.value}
                                                        </h5> 
                                                    }
                                                </td>
                                                <td>
                                                    {(bid.end <= currentDate || bid.payed === true) ? (
                                                        bid.winningBid === true ? (
                                                            <div>
                                                                <h5 className="text-success">
                                                                    Winning Bid<FaMedal/>
                                                                </h5>

                                                                <Button variant= 'light' className='btn-sm' onClick = {() => sendMessageHandler(bid.owner)} >
                                                                    Message
                                                                </Button>
                                                            </div>
                                                        )
                                                        :
                                                            <h5 className="text-danger">
                                                                Lost Bid
                                                            </h5>
                                                    ) : 
                                                    <h5>
                                                        Pending...
                                                    </h5>
                                                    }
                                                </td>
                                                <td>
                                                    <Button disabled={currentDate >= bid.end || bid.payed === true} variant='danger' className='btn-sm' onClick={() => deleteHandler(bid._id)}>
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
                <h1>You Have No Bids Yet :( You Must Be Poor</h1> 
            }
    </div>
    )
}

export default MyBidScreen