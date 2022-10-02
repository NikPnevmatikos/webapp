import React, { useState, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { createMessageAction, unreadMessageAction} from '../actions/MessagesActions'
import { userProfile } from '../actions/userActions'

function MessageReplyScreen() {

    const match = useParams()
    const navigate = useNavigate()

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [context, setContext] = useState('')    

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLogin

    const userId = match.id
    const userReceiver = useSelector(state => state.userProfileReducer)
    const {error, loading, user: receiver} = userReceiver

    useEffect(() =>{
        if (userInfo === null) {
            navigate('/login')
        }
        else {
            if (receiver == null || Number(userId) !== receiver.id )  {
                dispatch(userProfile(`profile/${userId}`))
                dispatch(unreadMessageAction())
            }
            else {
                if(userInfo.verified === true){
                    setFrom(userInfo.username)
                    setTo(receiver.username)
                }
                else{
                    navigate('/verify')
                }
            }
        }
    }, [userInfo, navigate, dispatch,userId, receiver])

    const replyHandler = (id) => {
        dispatch(createMessageAction(id,context))
        navigate('/sended/')
    }

    return (
    <Container>
        <Row className = "justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Reply</h1>

                {error && 
                    <div className="alert alert-dismissible alert-danger">
                        <strong>{error}</strong>
                    </div>
                }

                {loading &&
                    <Spinner 
                    animation="border" role="status" style={{ margin: 'auto',
                                                                display: 'block'
                                                            }}>
                        <span className="visually-hidden">Loading</span>
                    </Spinner>
                }
                
                <Form>

                    <Form.Group controlId='From' className='py-1'>
                        <Form.Label>From</Form.Label>
                        <Form.Control 
                            readOnly
                            type='text' 
                            value={from}                            
                        >        
                        </Form.Control>
                    </Form.Group> 
                    
                    <Form.Group controlId='To' className='py-1'>
                        <Form.Label>To</Form.Label>
                        <Form.Control 
                            type='text' 
                            value={to}
                            readOnly                   
                        >        
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='Context' className='py-1'>
                        <Form.Label>Context</Form.Label>
                        <Form.Control 
                            style = {{height: 100}}
                            type='text'   
                            value={context}
                            onChange = {(e) => setContext(e.target.value)}
                        >        
                        </Form.Control>           
                    </Form.Group> 

                    <Button onClick = {() => navigate(-1)} className="btn btn-dark btn-lg float-right">
                        Go back
                    </Button>

                    <Button onClick = {() => replyHandler(receiver.id)} className="btn btn-dark btn-lg float-right" style={{float: 'right'}}>
                        Reply
                    </Button>

                </Form>

            </Col>
        </Row>
    </Container>
  )
}

export default MessageReplyScreen