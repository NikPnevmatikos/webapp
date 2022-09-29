import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'
import { Table, Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser, verifyUser } from '../actions/userActions'
import PageButtons from './PageButtons'
import { FaTrash } from "react-icons/fa";

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
        if (userInfo != null && userInfo.is_staff === true) {
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
            <h2>
                My <strong>Admin</strong> Page
            </h2>

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
                    <div className='py-3'>
                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>VERIFIED</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>

                            {Array.isArray(users)
                                ?
                                (users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td><div><strong>{user.name}</strong></div></td>
                                        <td>{user.email}</td>
                                        <td>{user.verified ? (
                                            <div className='text-primary'>Has Been Verified.</div>
                                        ) : (
                                            <Button  
                                                className='btn-sm btn-primary' 
                                                onClick={() => verifyHandler(user.id)}>
                                                {/* <i className='fas fa-trash'></i> */}
                                                verify user
                                            </Button>
                                            )}</td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user.id}/`}>
                                                <Button className='btn-default btn-secondary'>
                                                    <div>View</div>
                                                </Button>
                                            </LinkContainer>

                                            <Button disabled={user.is_staff === true} 
                                                    className='btn-default btn-danger' 
                                                    onClick={() => deleteHandler(user.id)}>
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