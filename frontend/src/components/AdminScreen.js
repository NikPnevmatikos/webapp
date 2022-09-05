import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'
import { Table, Container, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser, verifyUser } from '../actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageButtons from './PageButtons'

function AdminScreen() {
  
    const location = useLocation()  
    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const allusers = useSelector(state => state.usersReducer)
    const {error, loading, users, page, pages} = allusers

    const singleuser = useSelector(state => state.userLoginReducer)
    const { userInfo } = singleuser
    
    const deleteuser = useSelector(state => state.userDeleteReducer)
    const { success } = deleteuser

    const verifyuser = useSelector(state => state.userVerifyReducer)
    const { success: verifySuccess } = verifyuser

    let keyword = location.search
    
    useEffect(() => {
        if (userInfo != null && userInfo.is_staff == true) {
            dispatch(allUsers(keyword))
        }
        else {
            navigate('/login')
        }
    }, [dispatch , navigate, success, userInfo, keyword, verifySuccess])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    const verifyHandler = (id) => {
        if (window.confirm('Are you sure you want to verify this user?')) {
            dispatch(verifyUser(id))
        }
    }

    return (
        <div>
            uwu my little kawaii admin page uwu

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
                ) : (
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>VERIFIED</th>
                                <th></th>
                                {/* na valw kapoio field gia verify user */}
                            </tr>
                        </thead>

                        <tbody>

                            {Array.isArray(users)
                                ?
                                (users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.verified ? (
                                            <h5>yes</h5>
                                            // <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                // <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            <Button 
                                                variant='light' 
                                                className='btn-sm' 
                                                onClick={() => verifyHandler(user.id)}>
                                                {/* <i className='fas fa-trash'></i> */}
                                                <h5>verify</h5>
                                            </Button>
                                            )}</td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user.id}/`}>
                                                <Button variant='light' className='btn-sm'>
                                                    {/* <i className='fas fa-edit'></i> */}
                                                    <h5>Edit</h5>
                                                </Button>
                                            </LinkContainer>

                                            <Button disabled={user.is_staff === true} variant='danger' className='btn-sm' onClick={() => deleteHandler(user.id)}>
                                                {/* <i className='fas fa-trash'></i> */}
                                                <h5>X</h5>
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
                            page= {page}
                            pages={pages}
                            adminScreen={true}
                    />

                </div>     
                )
            }
    </div>
    )
}

export default AdminScreen