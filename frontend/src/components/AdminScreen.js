import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'
import { Table, Container, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser } from '../actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AdminScreen() {
  
    const location = useLocation()  
    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const allusers = useSelector(state => state.usersReducer)
    const {error, loading, users} = allusers

    const singleuser = useSelector(state => state.userLoginReducer)
    const { userInfo } = singleuser
    
    const deleteuser = useSelector(state => state.userDeleteReducer)
    const { success } = deleteuser
    
    useEffect(() => {
        if (userInfo != null && userInfo.is_staff == true) {
            dispatch(allUsers())
        }
        else {
            navigate('/login')
        }
    }, [dispatch , navigate, success])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
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

                    <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                            {/* na valw kapoio field gia verify user */}
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.is_staff ? (
                                    <h5>yes</h5>
                                    // <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                        // <i className='fas fa-check' style={{ color: 'red' }}></i>
                                        <h5>no</h5>
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
                        ))}
                    </tbody>
                </Table>       
                )
            }
    </div>
    )
}

export default AdminScreen