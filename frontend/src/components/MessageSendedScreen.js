import React, {useEffect } from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import { Table,Row, Col, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import PageButtons from './PageButtons';
import { userMessagesSendAction } from '../actions/MessagesActions'

function MessageSendedScreen() {

    const location = useLocation()  
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const receivedMessages = useSelector(state => state.userMessageSendReducer)
    const { error, loading,page,pages, messages} = receivedMessages

    const singleuser = useSelector(state => state.userLoginReducer)
    const { userInfo } = singleuser
    
    let keyword = location.search
    useEffect(() => {
        dispatch({type: 'MESSAGE_RESET'})
        if (userInfo != null) {
            if(userInfo.verified === true){
                dispatch(userMessagesSendAction(keyword)) 
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
                    <h5>Sended Messages</h5>
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
                                    <th>To</th>
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
                                                    {message.receiverName}
                                                </td>
                                                <td>    
                                                    {(message.context).substring(0,50) + '...'}
                                                </td>
                                                <td>
                                                    <Button variant='light' className='btn-sm' onClick={() => previewHandler(message._id)}>
                                                        <h5>View</h5>
                                                    </Button>

                                                    <Button variant='light' className='btn-sm' onClick={() => replyHandler(message.senderName, message.sender, message.receiver)}>
                                                        <h5>Reply</h5>
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
                            messageSend={true}
                        />
                    </div>  
                
                ):
                <h1>You Have No Messages</h1> 
            }
    </div>
    )
}

export default MessageSendedScreen