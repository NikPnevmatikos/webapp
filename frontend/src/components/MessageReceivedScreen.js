import React, {useEffect } from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import { Table,Row, Col, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import PageButtons from './PageButtons';
import { userMessagesAction, unreadMessageAction } from '../actions/MessagesActions'
import {FaMailBulk} from "react-icons/fa";

function MessageReceivedScreen() {

    const location = useLocation()  
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const receivedMessages = useSelector(state => state.userMessageListReducer)
    const { error, loading, page, pages, messages} = receivedMessages

    const unreadMessages = useSelector(state => state.unreadMessageReducer)
    const {message:unread} = unreadMessages

    const singleuser = useSelector(state => state.userLoginReducer)
    const { userInfo } = singleuser
    
    let keyword = location.search
    useEffect(() => {
        dispatch({type: 'MESSAGE_RESET'})
        if (userInfo != null) {
            if(userInfo.verified === true){
                dispatch(unreadMessageAction())
                dispatch(userMessagesAction(keyword)) 
            }
            else{
                navigate('/verify')
            }
        }
        else {
            navigate('/login')
        }
    }, [dispatch , navigate, userInfo, keyword])

    const previewHandler = (id) => {
        navigate(`preview/${id}`)
    }
    
    const replyHandler = (senderName, sender, receiver) => {
        if(userInfo.username === senderName){
            navigate(`/message/${receiver}`)
        }
        else{
            navigate(`/message/${sender}`)
        }
    }


    return (
        <div>
            <Row className="align-items-center my-3">
                <Col>
                    <div>
                        <h3>
                            <strong>
                                Received Messages <FaMailBulk/>
                            </strong>
                        </h3>
                        <h5 className="text-muted">
                            You Have <strong>{unread}</strong> Unread Messages
                        </h5>
                    </div>
                </Col>
            </Row>

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
                ) : messages.length > 0 
                ? (
                    
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>Preview</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>

                                {Array.isArray(messages)
                                    ?
                                    (
                                        messages.map(message => (
                                            <tr key={message._id}>
                                                <td>
                                                    {message.read === false ? 
                                                        <div className="text-primary">
                                                            {message.senderName}
                                                        </div>
                                                    :
                                                        message.senderName
                                                    }
                                                
                                                </td>
                                                <td>
                                                    {message.read === false ? (
                                                        message.context.length > 50 ?
                                                            <div className="text-primary">
                                                                {(message.context).substring(0, 50) + '...'}
                                                            </div>
                                                            
                                                        :
                                                            <div className="text-primary">
                                                                {(message.context)}
                                                            </div>
                                                        )
                                                    : (
                                                        (message.context.length > 50) ?
                                                            (message.context).substring(0, 50) + '...'
                                                        :
                                                            (message.context)
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    <Button className="btn-sm btn-secondary" onClick={() => previewHandler(message._id)}>
                                                        View
                                                    </Button>

                                                    <Button className="btn-sm btn-secondary" onClick={() => replyHandler(message.senderName, message.sender, message.receiver)}>
                                                        Reply
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
                            messageReceive={true}
                        />
                    </div>  
                
                ):
                <h1>You Have No Messages</h1> 
            }
    </div>
    )
}

export default MessageReceivedScreen